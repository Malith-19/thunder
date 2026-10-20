// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Package project manages projects, the control plane grouping of one product's configuration. Each
// project is backed by one root organization unit.
package project

import (
	"net/http"

	"github.com/thunder-id/thunderid/internal/system/middleware"
)

// Initialize registers the project management API and returns the middleware that scopes the project
// aware management APIs to the project a request names. requireProject makes those APIs refuse a request
// that names no project, as a control plane does.
func Initialize(mux *http.ServeMux, ouService ouCreator, requireProject bool) (
	ServiceInterface, func(http.Handler) http.Handler) {
	service := newService(newStore(), ouService)
	registerRoutes(mux, newHandler(service))
	return service, ScopeMiddleware(service, systemPermissionDecider{}, requireProject)
}

func registerRoutes(mux *http.ServeMux, h *handler) {
	noContent := func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusNoContent)
	}

	collectionOpts := middleware.CORSOptions{
		AllowedMethods:   []string{"GET", "POST"},
		AllowedHeaders:   middleware.DefaultAllowedHeaders,
		AllowCredentials: true,
		MaxAge:           600,
	}
	mux.HandleFunc(middleware.WithCORS("GET /projects", h.handleList, collectionOpts))
	mux.HandleFunc(middleware.WithCORS("POST /projects", h.handleCreate, collectionOpts))
	mux.HandleFunc(middleware.WithCORS("OPTIONS /projects", noContent, collectionOpts))

	itemOpts := middleware.CORSOptions{
		AllowedMethods:   []string{"GET"},
		AllowedHeaders:   middleware.DefaultAllowedHeaders,
		AllowCredentials: true,
		MaxAge:           600,
	}
	mux.HandleFunc(middleware.WithCORS("GET /projects/{id}", h.handleGet, itemOpts))
	mux.HandleFunc(middleware.WithCORS("OPTIONS /projects/{id}", noContent, itemOpts))
}
