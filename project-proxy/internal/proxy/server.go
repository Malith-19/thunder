// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package proxy

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strconv"
	"strings"
)

const (
	// HeaderProjectID names the project a request acts on. A project ID is the ID of the project's
	// root organization unit.
	HeaderProjectID = "X-Project-Id"

	fieldOUID   = "ouId"
	fieldParent = "parent"

	pathOUs = "/organization-units"

	maxBody = 1 << 20
)

// forwardedCollections are the ThunderID APIs the proxy serves. Everything else is refused, so an API
// is reachable through the proxy only once its authorization is known to stay inside a project.
var forwardedCollections = []string{"/users", "/groups", pathOUs, "/user-types"}

// Server proxies requests to ThunderID, acting in the project each request names.
type Server struct {
	verifier TokenVerifier
	decider  AccessDecider
	tokens   TokenSource
	proxy    *httputil.ReverseProxy
	logger   *slog.Logger
}

// NewServer returns a server that fronts the ThunderID server at target.
func NewServer(target *url.URL, verifier TokenVerifier, decider AccessDecider, tokens TokenSource,
	transport http.RoundTripper, logger *slog.Logger) *Server {
	return &Server{
		verifier: verifier,
		decider:  decider,
		tokens:   tokens,
		logger:   logger,
		proxy: &httputil.ReverseProxy{
			Rewrite: func(r *httputil.ProxyRequest) {
				r.SetURL(target)
				r.Out.Host = target.Host
			},
			Transport: transport,
			ErrorHandler: func(w http.ResponseWriter, r *http.Request, err error) {
				logger.Error("ThunderID request failed", "path", r.URL.Path, "error", err)
				writeError(w, http.StatusBadGateway, "PRX-5002", "ThunderID is unavailable")
			},
		},
	}
}

// ServeHTTP verifies the caller's platform token, checks the caller may act on the named project, and
// forwards the request with a ThunderID token bound to the project's root organization unit. ThunderID's
// own authorization then keeps the request inside the project.
func (s *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !isForwarded(r.URL.Path) {
		writeError(w, http.StatusNotFound, "PRX-4040", "The resource was not found")
		return
	}

	token, ok := strings.CutPrefix(r.Header.Get("Authorization"), "Bearer ")
	if !ok || strings.TrimSpace(token) == "" {
		writeError(w, http.StatusUnauthorized, "PRX-4010", "A bearer token is required")
		return
	}
	claims, err := s.verifier.Verify(r.Context(), strings.TrimSpace(token))
	if err != nil {
		s.logger.Debug("Platform token rejected", "error", err)
		writeError(w, http.StatusUnauthorized, "PRX-4011", "The bearer token is not valid")
		return
	}

	projectIDs := r.Header.Values(HeaderProjectID)
	if len(projectIDs) != 1 || projectIDs[0] == "" {
		writeError(w, http.StatusBadRequest, "PRX-4003", "The request must name exactly one project")
		return
	}
	projectID := projectIDs[0]

	allowed, err := s.decider.CanAccessProject(r.Context(), claims, projectID)
	if err != nil {
		s.logger.Error("Failed to decide project access", "error", err)
		writeError(w, http.StatusInternalServerError, "PRX-5000", "Failed to decide project access")
		return
	}
	if !allowed {
		// Reported as not found, so the existence of a project the caller cannot use is not disclosed.
		writeError(w, http.StatusNotFound, "PRX-4041", "The project was not found")
		return
	}

	thunderIDToken, err := s.tokens.ProjectToken(r.Context(), projectID)
	if err != nil {
		s.logger.Error("Failed to obtain a project token", "projectId", projectID, "error", err)
		writeError(w, http.StatusBadGateway, "PRX-5003", "Failed to obtain a ThunderID token for the project")
		return
	}

	if err := placeInProject(r, projectID); err != nil {
		if errors.Is(err, errBodyTooLarge) {
			writeError(w, http.StatusRequestEntityTooLarge, "PRX-4130", "The request body is too large")
			return
		}
		writeError(w, http.StatusBadRequest, "PRX-4001", "The request body could not be read")
		return
	}

	s.logger.Info("Forwarding", "subject", claims.Subject, "projectId", projectID, "method", r.Method,
		"path", r.URL.Path)
	r.Header.Del(HeaderProjectID)
	r.Header.Set("Authorization", "Bearer "+thunderIDToken)
	s.proxy.ServeHTTP(w, r)
}

func isForwarded(path string) bool {
	for _, c := range forwardedCollections {
		if path == c || strings.HasPrefix(path, c+"/") {
			return true
		}
	}
	return false
}

var errBodyTooLarge = errors.New("request body too large")

// placeInProject rewrites a JSON create request that names no organization unit so that it lands in
// the project's root: a new organization unit becomes a child of the root, and any other resource is
// placed in the root.
func placeInProject(r *http.Request, rootOUID string) error {
	if r.Method != http.MethodPost || r.Body == nil || r.Body == http.NoBody ||
		!strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		return nil
	}
	body, err := io.ReadAll(io.LimitReader(r.Body, maxBody+1))
	_ = r.Body.Close()
	if err != nil {
		return err
	}
	if len(body) > maxBody {
		return errBodyTooLarge
	}
	var fields map[string]any
	if json.Unmarshal(body, &fields) == nil && fields != nil {
		field := fieldOUID
		if strings.TrimSuffix(r.URL.Path, "/") == pathOUs {
			field = fieldParent
		}
		if v, _ := fields[field].(string); v == "" {
			fields[field] = rootOUID
			if rewritten, err := json.Marshal(fields); err == nil {
				body = rewritten
			}
		}
	}
	r.Body = io.NopCloser(bytes.NewReader(body))
	r.ContentLength = int64(len(body))
	r.Header.Set("Content-Length", strconv.Itoa(len(body)))
	return nil
}

func writeError(w http.ResponseWriter, status int, code, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(map[string]string{"code": code, "message": message})
}
