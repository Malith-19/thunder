// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"github.com/stretchr/testify/require"

	"github.com/thunder-id/thunderid/internal/system/projectscope"
)

type stubProjectService struct {
	projects map[string]Project
}

func (s stubProjectService) CreateProject(context.Context, CreateProjectRequest) (*Project, *tidcommon.ServiceError) {
	return nil, &tidcommon.InternalServerError
}

func (s stubProjectService) GetProject(_ context.Context, id string) (*Project, *tidcommon.ServiceError) {
	project, ok := s.projects[id]
	if !ok {
		return nil, &ErrorProjectNotFound
	}
	return &project, nil
}

func (s stubProjectService) ListProjects(context.Context, int, int) (*ProjectListResponse, *tidcommon.ServiceError) {
	return nil, &tidcommon.InternalServerError
}

type stubDecider struct {
	allowed bool
	err     error
}

func (d stubDecider) CanAccessProject(context.Context, string) (bool, error) {
	return d.allowed, d.err
}

// capture records what the wrapped handler saw.
type capture struct {
	called bool
	scope  projectscope.Scope
	scoped bool
	body   map[string]interface{}
}

func newScopeTestHandler(decider AccessDecider) (http.Handler, *capture) {
	seen := &capture{}
	service := stubProjectService{projects: map[string]Project{
		"project-1": {ID: "project-1", RootOUID: "root-ou-1"},
	}}
	next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		seen.called = true
		seen.scope, seen.scoped = projectscope.FromContext(r.Context())
		if r.Body != nil {
			raw, _ := io.ReadAll(r.Body)
			_ = json.Unmarshal(raw, &seen.body)
		}
		w.WriteHeader(http.StatusOK)
	})
	return ScopeMiddleware(service, decider, true)(next), seen
}

func TestScopeMiddleware_ListWithProjectQuery(t *testing.T) {
	handler, seen := newScopeTestHandler(stubDecider{allowed: true})
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/users?projectId=project-1", nil))

	require.Equal(t, http.StatusOK, rec.Code)
	require.True(t, seen.scoped)
	require.Equal(t, projectscope.Scope{ProjectID: "project-1", RootOUID: "root-ou-1"}, seen.scope)
}

func TestScopeMiddleware_CreatePlacesResourceInProjectRoot(t *testing.T) {
	handler, seen := newScopeTestHandler(stubDecider{allowed: true})
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, httptest.NewRequest(http.MethodPost, "/users",
		strings.NewReader(`{"projectId":"project-1","type":"person"}`)))

	require.Equal(t, http.StatusOK, rec.Code)
	require.Equal(t, "root-ou-1", seen.body["ouId"])
	require.NotContains(t, seen.body, "projectId")
	require.Equal(t, "person", seen.body["type"])
}

func TestScopeMiddleware_CreateKeepsGivenOU(t *testing.T) {
	handler, seen := newScopeTestHandler(stubDecider{allowed: true})
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, httptest.NewRequest(http.MethodPost, "/users",
		strings.NewReader(`{"projectId":"project-1","ouId":"child-ou","type":"person"}`)))

	require.Equal(t, http.StatusOK, rec.Code)
	require.Equal(t, "child-ou", seen.body["ouId"])
	require.NotContains(t, seen.body, "projectId")
}

func TestScopeMiddleware_Refusals(t *testing.T) {
	tests := []struct {
		name       string
		decider    stubDecider
		target     string
		wantStatus int
		wantCode   string
	}{
		{name: "no project ID", decider: stubDecider{allowed: true}, target: "/users",
			wantStatus: http.StatusBadRequest, wantCode: ErrorProjectIDRequired.Code},
		{name: "access denied", decider: stubDecider{allowed: false}, target: "/users?projectId=project-1",
			wantStatus: http.StatusForbidden, wantCode: ErrorProjectAccessDenied.Code},
		{name: "decision failed", decider: stubDecider{err: errors.New("unreachable")},
			target: "/users?projectId=project-1", wantStatus: http.StatusForbidden,
			wantCode: ErrorProjectAccessDenied.Code},
		{name: "unknown project", decider: stubDecider{allowed: true}, target: "/users?projectId=missing",
			wantStatus: http.StatusNotFound, wantCode: ErrorProjectNotFound.Code},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			handler, seen := newScopeTestHandler(tc.decider)
			rec := httptest.NewRecorder()
			handler.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, tc.target, nil))

			require.Equal(t, tc.wantStatus, rec.Code)
			require.Contains(t, rec.Body.String(), tc.wantCode)
			require.False(t, seen.called)
		})
	}
}

func TestScopeMiddleware_PassesUnscopedPaths(t *testing.T) {
	for _, target := range []string{"/users/me", "/users/tree/default", "/applications", "/projects"} {
		t.Run(target, func(t *testing.T) {
			handler, seen := newScopeTestHandler(stubDecider{allowed: false})
			rec := httptest.NewRecorder()
			handler.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, target, nil))

			require.Equal(t, http.StatusOK, rec.Code)
			require.True(t, seen.called)
			require.False(t, seen.scoped)
		})
	}
}

func TestScopeMiddleware_OptionalProjectServesUnscoped(t *testing.T) {
	service := stubProjectService{projects: map[string]Project{"project-1": {ID: "project-1", RootOUID: "root-ou-1"}}}
	seen := &capture{}
	next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		seen.called = true
		seen.scope, seen.scoped = projectscope.FromContext(r.Context())
		raw, _ := io.ReadAll(r.Body)
		_ = json.Unmarshal(raw, &seen.body)
		w.WriteHeader(http.StatusOK)
	})
	handler := ScopeMiddleware(service, stubDecider{allowed: true}, false)(next)

	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, httptest.NewRequest(http.MethodPost, "/users",
		strings.NewReader(`{"ouId":"some-ou","type":"person"}`)))

	require.Equal(t, http.StatusOK, rec.Code)
	require.True(t, seen.called)
	require.False(t, seen.scoped)
	require.Equal(t, "some-ou", seen.body["ouId"])
}
