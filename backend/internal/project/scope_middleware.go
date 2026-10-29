// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/thunder-id/thunderid/internal/system/filter"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// projectScope lets a request to a project-scoped collection name a project where the collection
// expects an organization unit. It rewrites the request to name the project's root organization unit
// instead, so the collection's handler and service work with organization units only.
type projectScope struct {
	service ProjectServiceInterface
}

// newProjectScope creates a project scope over the given project service.
func newProjectScope(service ProjectServiceInterface) *projectScope {
	return &projectScope{service: service}
}

// Middleware rewrites a project-scoped request before passing it to next. A listing's projectId query
// parameter becomes an ouId filter, and a create or update body's projectId field becomes its ouId.
func (p *projectScope) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		scoped, svcErr := p.rewrite(r)
		if svcErr != nil {
			writeProjectError(r.Context(), w, svcErr)
			return
		}
		next.ServeHTTP(w, scoped)
	})
}

// rewrite returns the request to pass on, rewritten when it names a project.
func (p *projectScope) rewrite(r *http.Request) (*http.Request, *tidcommon.ServiceError) {
	isItem, ok := matchProjectScopedPath(r.URL.Path)
	if !ok {
		return r, nil
	}
	switch {
	case !isItem && r.Method == http.MethodGet:
		return p.rewriteListQuery(r)
	case !isItem && r.Method == http.MethodPost, isItem && r.Method == http.MethodPut:
		return p.rewriteBody(r)
	default:
		return r, nil
	}
}

// rewriteListQuery replaces a projectId query parameter with a filter on the project's root
// organization unit.
func (p *projectScope) rewriteListQuery(r *http.Request) (*http.Request, *tidcommon.ServiceError) {
	query := r.URL.Query()
	if !query.Has(projectIDParam) {
		return r, nil
	}
	if query.Has(filterQueryParam) {
		return nil, &ErrorProjectAndOUConflict
	}
	rootOUID, svcErr := p.rootOUID(r.Context(), query.Get(projectIDParam))
	if svcErr != nil {
		return nil, svcErr
	}

	query.Del(projectIDParam)
	query.Set(filterQueryParam, fmt.Sprintf("%s eq %q", filter.AttributeOUID, rootOUID))
	scoped := r.Clone(r.Context())
	scoped.URL.RawQuery = query.Encode()
	return scoped, nil
}

// rewriteBody replaces a projectId body field with the project's root organization unit as ouId. A
// body that is not a JSON object passes on unchanged, for the handler to refuse.
func (p *projectScope) rewriteBody(r *http.Request) (*http.Request, *tidcommon.ServiceError) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		return nil, &ErrorInvalidRequestFormat
	}
	var fields map[string]json.RawMessage
	if err := json.Unmarshal(body, &fields); err != nil || fields[projectIDParam] == nil {
		return withBody(r, body), nil
	}

	var projectID string
	if err := json.Unmarshal(fields[projectIDParam], &projectID); err != nil {
		return nil, &ErrorUnknownProject
	}
	if fields[ouIDField] != nil || fields[ouHandleField] != nil {
		return nil, &ErrorProjectAndOUConflict
	}
	rootOUID, svcErr := p.rootOUID(r.Context(), projectID)
	if svcErr != nil {
		return nil, svcErr
	}

	delete(fields, projectIDParam)
	if fields[ouIDField], err = json.Marshal(rootOUID); err != nil {
		return nil, &tidcommon.InternalServerError
	}
	if body, err = json.Marshal(fields); err != nil {
		return nil, &tidcommon.InternalServerError
	}
	return withBody(r, body), nil
}

// rootOUID returns the root organization unit of the named project, or ErrorUnknownProject when no
// such project exists.
func (p *projectScope) rootOUID(ctx context.Context, projectID string) (string, *tidcommon.ServiceError) {
	if projectID == "" {
		return "", &ErrorUnknownProject
	}
	rootOUID, svcErr := p.service.GetProjectRootOUID(ctx, projectID)
	if svcErr != nil {
		if svcErr.Code == ErrorProjectNotFound.Code {
			return "", &ErrorUnknownProject
		}
		return "", svcErr
	}
	return rootOUID, nil
}

// matchProjectScopedPath reports whether the path is a project-scoped collection or one of its items,
// and which of the two it is.
func matchProjectScopedPath(path string) (isItem bool, ok bool) {
	for _, collection := range projectScopedCollections {
		if path == collection {
			return false, true
		}
		if id, found := strings.CutPrefix(path, collection+"/"); found && id != "" && !strings.Contains(id, "/") {
			return true, true
		}
	}
	return false, false
}

// withBody returns a copy of the request that carries the given body.
func withBody(r *http.Request, body []byte) *http.Request {
	scoped := r.Clone(r.Context())
	scoped.Body = io.NopCloser(bytes.NewReader(body))
	scoped.ContentLength = int64(len(body))
	return scoped
}
