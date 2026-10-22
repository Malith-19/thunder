// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package proxy

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"sync"
	"testing"
)

// fakeVerifier treats the bearer token as "<subject>:<project>,<project>".
type fakeVerifier struct{}

func (fakeVerifier) Verify(_ context.Context, token string) (*Claims, error) {
	sub, projects, _ := strings.Cut(token, ":")
	if sub == "bad" {
		return nil, errInvalidToken
	}
	var list []any
	for _, p := range strings.Split(projects, ",") {
		if p != "" {
			list = append(list, p)
		}
	}
	return &Claims{Subject: sub, Raw: map[string]any{"projects": list}}, nil
}

// fakeTokens issues "ou:<id>" project tokens.
type fakeTokens struct{ err error }

func (f fakeTokens) ProjectToken(_ context.Context, ouID string) (string, error) {
	return "ou:" + ouID, f.err
}

type upstreamCall struct {
	method, path, query, auth, projectHeader string
	body                                     map[string]any
}

// fakeThunderID records the requests it receives.
type fakeThunderID struct {
	mu    sync.Mutex
	calls []upstreamCall
}

func newTestServer(t *testing.T, tokens TokenSource) (http.Handler, *fakeThunderID) {
	t.Helper()
	f := &fakeThunderID{}
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		call := upstreamCall{
			method: r.Method, path: r.URL.Path, query: r.URL.RawQuery,
			auth: r.Header.Get("Authorization"), projectHeader: r.Header.Get(HeaderProjectID),
		}
		data, _ := io.ReadAll(r.Body)
		_ = json.Unmarshal(data, &call.body)
		f.mu.Lock()
		f.calls = append(f.calls, call)
		f.mu.Unlock()
		w.WriteHeader(http.StatusOK)
	}))
	t.Cleanup(srv.Close)
	target, _ := url.Parse(srv.URL)
	return NewServer(target, fakeVerifier{}, NewClaimDecider("projects"), tokens, http.DefaultTransport,
		slog.New(slog.NewTextHandler(io.Discard, nil))), f
}

func (f *fakeThunderID) last(t *testing.T) upstreamCall {
	t.Helper()
	f.mu.Lock()
	defer f.mu.Unlock()
	if len(f.calls) == 0 {
		t.Fatal("ThunderID received no request")
	}
	return f.calls[len(f.calls)-1]
}

func (f *fakeThunderID) count() int {
	f.mu.Lock()
	defer f.mu.Unlock()
	return len(f.calls)
}

func do(h http.Handler, method, target, token, body string, projects ...string) *httptest.ResponseRecorder {
	var reader io.Reader
	if body != "" {
		reader = strings.NewReader(body)
	}
	req := httptest.NewRequest(method, target, reader)
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	if body != "" {
		req.Header.Set("Content-Type", "application/json")
	}
	for _, p := range projects {
		req.Header.Add(HeaderProjectID, p)
	}
	rec := httptest.NewRecorder()
	h.ServeHTTP(rec, req)
	return rec
}

func TestForwardActsInProject(t *testing.T) {
	h, upstream := newTestServer(t, fakeTokens{})

	rec := do(h, http.MethodGet, "/users?limit=5", "alice:p1", "", "p1")
	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, body = %s", rec.Code, rec.Body)
	}
	call := upstream.last(t)
	if call.auth != "Bearer ou:p1" {
		t.Errorf("Authorization = %q, want the project token", call.auth)
	}
	if call.projectHeader != "" {
		t.Error("the project header was forwarded")
	}
	if call.path != "/users" || call.query != "limit=5" {
		t.Errorf("forwarded %s?%s", call.path, call.query)
	}
}

func TestForwardPlacesCreatesInProjectRoot(t *testing.T) {
	tests := []struct {
		name, path, body, field, want string
	}{
		{"user without ouId", "/users", `{"type":"p1-person"}`, fieldOUID, "p1"},
		{"user with ouId", "/users", `{"type":"p1-person","ouId":"ou-child"}`, fieldOUID, "ou-child"},
		{"group without ouId", "/groups", `{"name":"g"}`, fieldOUID, "p1"},
		{"ou without parent", "/organization-units", `{"handle":"eng","name":"Eng"}`, fieldParent, "p1"},
		{"ou with null parent", "/organization-units", `{"handle":"eng","parent":null}`, fieldParent, "p1"},
		{"ou with parent", "/organization-units", `{"handle":"eng","parent":"ou-child"}`, fieldParent, "ou-child"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			h, upstream := newTestServer(t, fakeTokens{})

			rec := do(h, http.MethodPost, tt.path, "alice:p1", tt.body, "p1")
			if rec.Code != http.StatusOK {
				t.Fatalf("status = %d", rec.Code)
			}
			if got := upstream.last(t).body[tt.field]; got != tt.want {
				t.Errorf("%s = %v, want %s", tt.field, got, tt.want)
			}
		})
	}
}

func TestForwardRefuses(t *testing.T) {
	tests := []struct {
		name     string
		path     string
		token    string
		projects []string
		tokens   TokenSource
		want     int
	}{
		{"path not forwarded", "/flows", "alice:p1", []string{"p1"}, fakeTokens{}, http.StatusNotFound},
		{"no token", "/users", "", []string{"p1"}, fakeTokens{}, http.StatusUnauthorized},
		{"invalid token", "/users", "bad:p1", []string{"p1"}, fakeTokens{}, http.StatusUnauthorized},
		{"no project", "/users", "alice:p1", nil, fakeTokens{}, http.StatusBadRequest},
		{"two projects", "/users", "alice:p1,p2", []string{"p1", "p2"}, fakeTokens{}, http.StatusBadRequest},
		{"project not granted", "/users", "alice:p2", []string{"p1"}, fakeTokens{}, http.StatusNotFound},
		{"token refused", "/users", "alice:p1", []string{"p1"}, fakeTokens{err: errors.New("x")},
			http.StatusBadGateway},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			h, upstream := newTestServer(t, tt.tokens)

			rec := do(h, http.MethodGet, tt.path, tt.token, "", tt.projects...)
			if rec.Code != tt.want {
				t.Fatalf("status = %d, want %d", rec.Code, tt.want)
			}
			if upstream.count() != 0 {
				t.Error("the request reached ThunderID")
			}
		})
	}
}

func TestForwardRefusesLargeBody(t *testing.T) {
	h, upstream := newTestServer(t, fakeTokens{})

	body := `{"type":"p1-person","pad":"` + strings.Repeat("x", maxBody) + `"}`
	if rec := do(h, http.MethodPost, "/users", "alice:p1", body, "p1"); rec.Code !=
		http.StatusRequestEntityTooLarge {
		t.Fatalf("status = %d, want 413", rec.Code)
	}
	if upstream.count() != 0 {
		t.Error("the request reached ThunderID")
	}
}
