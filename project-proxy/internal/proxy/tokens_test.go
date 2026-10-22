// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package proxy

import (
	"context"
	"net/http"
	"net/http/httptest"
	"sync/atomic"
	"testing"
	"time"
)

func TestClientCredentialsSource(t *testing.T) {
	var calls atomic.Int32
	var lastPath, lastScope, lastGrant, lastUser, lastResource string
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		calls.Add(1)
		_ = r.ParseForm()
		lastPath, lastScope, lastGrant = r.URL.Path, r.FormValue("scope"), r.FormValue("grant_type")
		lastResource = r.FormValue("resource")
		lastUser, _, _ = r.BasicAuth()
		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"access_token":"tok-` + r.URL.Path + `","expires_in":3600}`))
	}))
	defer srv.Close()

	src := NewClientCredentialsSource(srv.URL+"/", ClientConfig{
		ClientID: "proxy", ClientSecret: "secret", Resource: "https://ids/system",
		Scopes: []string{"system:user", "system:group"},
	}, srv.Client())

	tok, err := src.ProjectToken(context.Background(), "ou-1")
	if err != nil {
		t.Fatal(err)
	}
	if lastPath != "/ou/ou-1/oauth2/token" || lastScope != "system:user system:group" ||
		lastGrant != "client_credentials" || lastUser != "proxy" || lastResource != "https://ids/system" {
		t.Errorf("request path=%s scope=%q grant=%s user=%s resource=%s", lastPath, lastScope, lastGrant,
			lastUser, lastResource)
	}
	if tok != "tok-/ou/ou-1/oauth2/token" {
		t.Errorf("token = %q", tok)
	}

	if _, err := src.ProjectToken(context.Background(), "ou-1"); err != nil {
		t.Fatal(err)
	}
	if calls.Load() != 1 {
		t.Errorf("token endpoint called %d times, want the cached token reused", calls.Load())
	}

	if _, err := src.ProjectToken(context.Background(), "ou-2"); err != nil {
		t.Fatal(err)
	}
	if calls.Load() != 2 || lastPath != "/ou/ou-2/oauth2/token" {
		t.Errorf("another organization unit reused a cached token: calls=%d path=%s", calls.Load(), lastPath)
	}
}

func TestClientCredentialsSourceRefreshesNearExpiry(t *testing.T) {
	var calls atomic.Int32
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		calls.Add(1)
		_, _ = w.Write([]byte(`{"access_token":"tok","expires_in":10}`))
	}))
	defer srv.Close()

	src := NewClientCredentialsSource(srv.URL, ClientConfig{ClientID: "c", ClientSecret: "s"}, srv.Client())
	for range 2 {
		if _, err := src.ProjectToken(context.Background(), "ou-1"); err != nil {
			t.Fatal(err)
		}
	}
	if calls.Load() != 2 {
		t.Errorf("token endpoint called %d times, want a token inside the refresh margin replaced", calls.Load())
	}
}

func TestClientCredentialsSourceRefused(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusUnauthorized)
		_, _ = w.Write([]byte(`{"error":"unauthorized_client"}`))
	}))
	defer srv.Close()

	src := NewClientCredentialsSource(srv.URL, ClientConfig{ClientID: "c", ClientSecret: "s"}, srv.Client())
	src.(*clientCredentialsSource).now = func() time.Time { return time.Unix(0, 0) }
	if _, err := src.ProjectToken(context.Background(), "ou-1"); err == nil {
		t.Fatal("ProjectToken() succeeded, want an error")
	}
}
