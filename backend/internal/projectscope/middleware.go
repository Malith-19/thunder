// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Package projectscope lets callers of the management APIs name a project wherever an organization
// unit is taken. A project is a root organization unit, and its ID is that unit's ID.
//
// The translation happens at the HTTP edge, so services and stores only ever see organization
// units. On the control plane a request may carry projectId instead of ouId, in a JSON body or as a
// list filter, and responses report the project of each resource next to its ouId. The data plane
// takes organization units only and rejects projectId.
package projectscope

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"strings"

	"github.com/thunder-id/thunderid/internal/ou"
	"github.com/thunder-id/thunderid/internal/system/constants"
	"github.com/thunder-id/thunderid/internal/system/error/apierror"
	"github.com/thunder-id/thunderid/internal/system/log"
	"github.com/thunder-id/thunderid/internal/system/security"
	sysutils "github.com/thunder-id/thunderid/internal/system/utils"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

const (
	fieldProjectID = "projectId"
	fieldOUID      = "ouId"

	// maxRewrittenBody bounds the request bodies read to translate projectId. A larger body is passed
	// on unchanged.
	maxRewrittenBody = 10 << 20
	// maxHierarchyDepth stops the walk to a project root on a malformed hierarchy.
	maxHierarchyDepth = 100
)

// managedPaths are the management API collections that place a resource in an organization unit.
var managedPaths = []string{
	"/applications", "/users", "/agents", "/groups", "/roles", "/user-types", "/agent-types",
	"/resource-servers",
}

// ouReader is the part of the organization unit service the control plane adapter needs.
type ouReader interface {
	GetOrganizationUnit(ctx context.Context, id string) (ou.OrganizationUnit, *tidcommon.ServiceError)
}

// ControlPlaneMiddleware accepts projectId in place of ouId on the management APIs and adds
// projectId to their responses.
func ControlPlaneMiddleware(ouService ouReader) func(http.Handler) http.Handler {
	a := &controlPlaneAdapter{ouService: ouService, logger: log.GetLogger().With(
		log.String(log.LoggerKeyComponentName, "ProjectScope"))}
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if !isManagedPath(r.URL.Path) {
				next.ServeHTTP(w, r)
				return
			}
			a.serveHTTP(w, r, next)
		})
	}
}

// DataPlaneMiddleware rejects projectId on the management APIs, so a caller is not silently given an
// unfiltered list or a resource placed without its project.
func DataPlaneMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if !isManagedPath(r.URL.Path) {
				next.ServeHTTP(w, r)
				return
			}
			if r.URL.Query().Has(fieldProjectID) {
				writeError(r.Context(), w, &ErrorProjectIDNotSupported)
				return
			}
			body, fields, ok := readJSONObject(r)
			if ok {
				if _, has := fields[fieldProjectID]; has {
					writeError(r.Context(), w, &ErrorProjectIDNotSupported)
					return
				}
			}
			restoreBody(r, body)
			next.ServeHTTP(w, r)
		})
	}
}

type controlPlaneAdapter struct {
	ouService ouReader
	logger    *log.Logger
}

func (a *controlPlaneAdapter) serveHTTP(w http.ResponseWriter, r *http.Request, next http.Handler) {
	ctx := r.Context()
	roots := map[string]string{}

	if svcErr := a.rewriteQuery(ctx, r, roots); svcErr != nil {
		writeError(ctx, w, svcErr)
		return
	}
	if svcErr := a.rewriteBody(ctx, r, roots); svcErr != nil {
		writeError(ctx, w, svcErr)
		return
	}

	recorder := &bufferedResponse{header: w.Header(), status: http.StatusOK}
	next.ServeHTTP(recorder, r)

	body := recorder.body.Bytes()
	if recorder.status >= http.StatusOK && recorder.status < http.StatusMultipleChoices &&
		strings.HasPrefix(w.Header().Get(constants.ContentTypeHeaderName), constants.ContentTypeJSON) {
		body = a.addProjectIDs(ctx, body, roots)
		w.Header().Del("Content-Length")
	}
	w.WriteHeader(recorder.status)
	_, _ = w.Write(body)
}

// rewriteQuery turns a projectId list filter into the ouId filter the services take.
func (a *controlPlaneAdapter) rewriteQuery(ctx context.Context, r *http.Request,
	roots map[string]string) *tidcommon.ServiceError {
	query := r.URL.Query()
	if !query.Has(fieldProjectID) {
		return nil
	}
	if query.Has(fieldOUID) {
		return &ErrorProjectAndOUBothSet
	}
	projectID := sysutils.SanitizeString(query.Get(fieldProjectID))
	if svcErr := a.validateProject(ctx, projectID, roots); svcErr != nil {
		return svcErr
	}
	query.Del(fieldProjectID)
	query.Set(fieldOUID, projectID)
	r.URL.RawQuery = query.Encode()
	return nil
}

// rewriteBody turns projectId in a JSON request body into the ouId the services take.
func (a *controlPlaneAdapter) rewriteBody(ctx context.Context, r *http.Request,
	roots map[string]string) *tidcommon.ServiceError {
	body, fields, ok := readJSONObject(r)
	if !ok {
		restoreBody(r, body)
		return nil
	}
	rawProjectID, has := fields[fieldProjectID]
	if !has {
		restoreBody(r, body)
		return nil
	}
	if rawOUID, hasOU := fields[fieldOUID]; hasOU && string(rawOUID) != "null" && string(rawOUID) != `""` {
		return &ErrorProjectAndOUBothSet
	}
	var projectID string
	if err := json.Unmarshal(rawProjectID, &projectID); err != nil {
		return &ErrorProjectNotFound
	}
	if svcErr := a.validateProject(ctx, projectID, roots); svcErr != nil {
		return svcErr
	}

	delete(fields, fieldProjectID)
	fields[fieldOUID] = rawProjectID
	rewritten, err := json.Marshal(fields)
	if err != nil {
		restoreBody(r, body)
		return nil
	}
	restoreBody(r, rewritten)
	return nil
}

// validateProject checks that the ID names a project: an existing root organization unit.
func (a *controlPlaneAdapter) validateProject(ctx context.Context, projectID string,
	roots map[string]string) *tidcommon.ServiceError {
	if projectID == "" {
		return &ErrorProjectNotFound
	}
	unit, svcErr := a.ouService.GetOrganizationUnit(security.WithRuntimeContext(ctx), projectID)
	if svcErr != nil {
		if svcErr.Type == tidcommon.ClientErrorType {
			return &ErrorProjectNotFound
		}
		return svcErr
	}
	if unit.Parent != nil && *unit.Parent != "" {
		return &ErrorNotAProject
	}
	roots[projectID] = projectID
	return nil
}

// projectOf returns the project an organization unit belongs to: the root of its tree.
func (a *controlPlaneAdapter) projectOf(ctx context.Context, ouID string, roots map[string]string) (string, bool) {
	if root, ok := roots[ouID]; ok {
		return root, true
	}
	runtimeCtx := security.WithRuntimeContext(ctx)
	visited := []string{}
	current := ouID
	for depth := 0; depth < maxHierarchyDepth; depth++ {
		if root, ok := roots[current]; ok {
			for _, id := range visited {
				roots[id] = root
			}
			return root, true
		}
		visited = append(visited, current)
		unit, svcErr := a.ouService.GetOrganizationUnit(runtimeCtx, current)
		if svcErr != nil {
			a.logger.Debug(ctx, "Could not resolve the project of an organization unit",
				log.String("ouId", ouID), log.String("code", svcErr.Code))
			return "", false
		}
		if unit.Parent == nil || *unit.Parent == "" {
			for _, id := range visited {
				roots[id] = current
			}
			return current, true
		}
		current = *unit.Parent
	}
	return "", false
}

// addProjectIDs adds projectId next to every ouId at the top level of a JSON response object and in
// the objects of its top-level arrays, which covers both single resources and lists. A response it
// cannot read is returned unchanged.
func (a *controlPlaneAdapter) addProjectIDs(ctx context.Context, body []byte, roots map[string]string) []byte {
	var top map[string]json.RawMessage
	if err := json.Unmarshal(body, &top); err != nil {
		return body
	}
	changed := a.addProjectID(ctx, top, roots)
	for key, value := range top {
		if len(value) == 0 || value[0] != '[' {
			continue
		}
		var items []map[string]json.RawMessage
		if err := json.Unmarshal(value, &items); err != nil {
			continue
		}
		itemsChanged := false
		for _, item := range items {
			if a.addProjectID(ctx, item, roots) {
				itemsChanged = true
			}
		}
		if !itemsChanged {
			continue
		}
		if encoded, err := json.Marshal(items); err == nil {
			top[key] = encoded
			changed = true
		}
	}
	if !changed {
		return body
	}
	encoded, err := json.Marshal(top)
	if err != nil {
		return body
	}
	return encoded
}

func (a *controlPlaneAdapter) addProjectID(ctx context.Context, object map[string]json.RawMessage,
	roots map[string]string) bool {
	if object == nil {
		return false
	}
	if _, has := object[fieldProjectID]; has {
		return false
	}
	var ouID string
	if err := json.Unmarshal(object[fieldOUID], &ouID); err != nil || ouID == "" {
		return false
	}
	projectID, ok := a.projectOf(ctx, ouID, roots)
	if !ok {
		return false
	}
	encoded, err := json.Marshal(projectID)
	if err != nil {
		return false
	}
	object[fieldProjectID] = encoded
	return true
}

func isManagedPath(path string) bool {
	for _, managed := range managedPaths {
		if path == managed || strings.HasPrefix(path, managed+"/") {
			return true
		}
	}
	return false
}

// readJSONObject reads the body of a request that may carry one and decodes it as a JSON object.
// It returns the bytes read, so the caller can restore the body, and whether it is an object.
func readJSONObject(r *http.Request) ([]byte, map[string]json.RawMessage, bool) {
	if r.Body == nil || r.Body == http.NoBody ||
		(r.Method != http.MethodPost && r.Method != http.MethodPut && r.Method != http.MethodPatch) {
		return nil, nil, false
	}
	body, err := io.ReadAll(io.LimitReader(r.Body, maxRewrittenBody+1))
	if err != nil {
		return body, nil, false
	}
	if len(body) > maxRewrittenBody {
		r.Body = io.NopCloser(io.MultiReader(bytes.NewReader(body), r.Body))
		return nil, nil, false
	}
	var fields map[string]json.RawMessage
	if err := json.Unmarshal(body, &fields); err != nil || fields == nil {
		return body, nil, false
	}
	return body, fields, true
}

// restoreBody puts a body read by readJSONObject back on the request. A nil body leaves the request
// as it is.
func restoreBody(r *http.Request, body []byte) {
	if body == nil {
		return
	}
	r.Body = io.NopCloser(bytes.NewReader(body))
	r.ContentLength = int64(len(body))
}

func writeError(ctx context.Context, w http.ResponseWriter, svcErr *tidcommon.ServiceError) {
	statusCode := http.StatusInternalServerError
	if svcErr.Type == tidcommon.ClientErrorType {
		statusCode = http.StatusBadRequest
	}
	sysutils.WriteErrorResponse(ctx, w, statusCode, apierror.ErrorResponse{
		Code:        svcErr.Code,
		Message:     svcErr.Error,
		Description: svcErr.ErrorDescription,
	})
}

// bufferedResponse holds a handler's response so projectId can be added before it is sent.
type bufferedResponse struct {
	header http.Header
	status int
	body   bytes.Buffer
}

func (b *bufferedResponse) Header() http.Header { return b.header }

func (b *bufferedResponse) WriteHeader(status int) { b.status = status }

func (b *bufferedResponse) Write(p []byte) (int, error) { return b.body.Write(p) }
