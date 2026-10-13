// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"net/http"

	"github.com/thunder-id/thunderid/internal/system/middleware"
)

// ConfigurableProjectService extends ProjectServiceInterface with the registration of the resource
// types that keep a project from being deleted. It is separate so consumers do not see it.
type ConfigurableProjectService interface {
	ProjectServiceInterface
	Registry
}

// Initialize builds the project service and registers its routes. Only the control plane calls it:
// the data plane has no projects. Resources that belong to no project are moved into the default
// project, so they show there.
func Initialize(mux *http.ServeMux) (ConfigurableProjectService, error) {
	service := newProjectService(newProjectStore())
	if err := service.AssignUnassignedToDefault(context.Background()); err != nil {
		return nil, err
	}
	registerRoutes(mux, newProjectHandler(service))
	return service, nil
}

func registerRoutes(mux *http.ServeMux, h *projectHandler) {
	collectionCORS := middleware.CORSOptions{
		AllowedMethods:   []string{"GET", "POST"},
		AllowedHeaders:   middleware.DefaultAllowedHeaders,
		AllowCredentials: true,
		MaxAge:           600,
	}
	itemCORS := middleware.CORSOptions{
		AllowedMethods:   []string{"GET", "PUT", "DELETE"},
		AllowedHeaders:   middleware.DefaultAllowedHeaders,
		AllowCredentials: true,
		MaxAge:           600,
	}

	mux.HandleFunc(middleware.WithCORS("GET "+basePath, h.HandleProjectListRequest, collectionCORS))
	mux.HandleFunc(middleware.WithCORS("POST "+basePath, h.HandleProjectPostRequest, collectionCORS))
	mux.HandleFunc(middleware.WithCORS("OPTIONS "+basePath, noContent, collectionCORS))

	mux.HandleFunc(middleware.WithCORS("GET "+basePath+"/{id}", h.HandleProjectGetRequest, itemCORS))
	mux.HandleFunc(middleware.WithCORS("PUT "+basePath+"/{id}", h.HandleProjectPutRequest, itemCORS))
	mux.HandleFunc(middleware.WithCORS("DELETE "+basePath+"/{id}", h.HandleProjectDeleteRequest, itemCORS))
	mux.HandleFunc(middleware.WithCORS("OPTIONS "+basePath+"/{id}", noContent, itemCORS))
}

func noContent(w http.ResponseWriter, _ *http.Request) {
	w.WriteHeader(http.StatusNoContent)
}
