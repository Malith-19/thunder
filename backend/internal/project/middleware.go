// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/thunder-id/thunderid/internal/system/log"
	"github.com/thunder-id/thunderid/internal/system/projectscope"
	sysutils "github.com/thunder-id/thunderid/internal/system/utils"
)

const (
	fieldProjectID = "projectId"
	fieldOUID      = "ouId"
	// maxScopedBody bounds the request bodies read to find the project ID.
	maxScopedBody = 1 << 20
)

// scopedCollections are the management APIs whose resources live in a project.
var scopedCollections = []string{"/users", "/groups"}

// unscopedPaths are routes under a scoped collection that act on the caller or on a handle path
// rather than on a project.
var unscopedPaths = []string{"/users/me", "/users/tree", "/groups/tree"}

// ScopeMiddleware makes the project scoped management APIs act on the project the request names.
//
// For a request to a scoped API it reads the project ID from the query, or from a JSON body, asks the
// access decider whether the caller may act on that project, resolves the project's root organization
// unit, and puts the project scope on the request context. Authorization then decides every action of
// the request against that project. A create that names the project but no organization unit is placed
// in the project's root organization unit.
//
// When requireProject is set, as on the control plane, a request that names no project is refused.
// Otherwise it is served unscoped, so the caller's token decides the organization unit as before.
func ScopeMiddleware(service ServiceInterface, decider AccessDecider,
	requireProject bool) func(http.Handler) http.Handler {
	logger := log.GetLogger().With(log.String(log.LoggerKeyComponentName, "ProjectScope"))
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Method == http.MethodOptions || !isScopedPath(r.URL.Path) {
				next.ServeHTTP(w, r)
				return
			}
			ctx := r.Context()

			projectID := sysutils.SanitizeString(r.URL.Query().Get(fieldProjectID))
			body, fields := readJSONBody(r)
			if projectID == "" {
				if v, ok := fields[fieldProjectID].(string); ok {
					projectID = sysutils.SanitizeString(v)
				}
			}
			if projectID == "" {
				if requireProject {
					writeServiceError(ctx, w, &ErrorProjectIDRequired)
					return
				}
				restoreBody(r, body)
				next.ServeHTTP(w, r)
				return
			}

			allowed, err := decider.CanAccessProject(ctx, projectID)
			if err != nil {
				logger.Error(ctx, "Failed to decide project access", log.Error(err))
				writeServiceError(ctx, w, &ErrorProjectAccessDenied)
				return
			}
			if !allowed {
				writeServiceError(ctx, w, &ErrorProjectAccessDenied)
				return
			}

			project, svcErr := service.GetProject(ctx, projectID)
			if svcErr != nil {
				writeServiceError(ctx, w, svcErr)
				return
			}

			if fields != nil {
				body = placeInProject(fields, body, project.RootOUID, r.Method)
			}
			restoreBody(r, body)

			ctx = projectscope.WithScope(ctx, projectscope.Scope{ProjectID: project.ID, RootOUID: project.RootOUID})
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func isScopedPath(path string) bool {
	for _, p := range unscopedPaths {
		if path == p || strings.HasPrefix(path, p+"/") {
			return false
		}
	}
	for _, p := range scopedCollections {
		if path == p || strings.HasPrefix(path, p+"/") {
			return true
		}
	}
	return false
}

// readJSONBody reads a JSON object body. It returns the raw body, and the decoded fields when the body is
// a JSON object.
func readJSONBody(r *http.Request) ([]byte, map[string]interface{}) {
	if r.Body == nil || r.Body == http.NoBody {
		return nil, nil
	}
	body, err := io.ReadAll(io.LimitReader(r.Body, maxScopedBody))
	_ = r.Body.Close()
	if err != nil || len(body) == 0 {
		return body, nil
	}
	var fields map[string]interface{}
	if err := json.Unmarshal(body, &fields); err != nil {
		return body, nil
	}
	return body, fields
}

// placeInProject drops the project ID from a JSON body and, for a create that names no organization
// unit, places the new resource in the project's root organization unit.
func placeInProject(fields map[string]interface{}, body []byte, rootOUID, method string) []byte {
	_, hadProject := fields[fieldProjectID]
	ouID, _ := fields[fieldOUID].(string)
	if !hadProject && (method != http.MethodPost || ouID != "") {
		return body
	}
	delete(fields, fieldProjectID)
	if method == http.MethodPost && ouID == "" {
		fields[fieldOUID] = rootOUID
	}
	rewritten, err := json.Marshal(fields)
	if err != nil {
		return body
	}
	return rewritten
}

func restoreBody(r *http.Request, body []byte) {
	if body == nil {
		return
	}
	r.Body = io.NopCloser(bytes.NewReader(body))
	r.ContentLength = int64(len(body))
	r.Header.Set("Content-Length", strconv.Itoa(len(body)))
}
