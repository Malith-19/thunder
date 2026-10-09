// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"net/http"
	"strconv"

	serverconst "github.com/thunder-id/thunderid/internal/system/constants"
	"github.com/thunder-id/thunderid/internal/system/error/apierror"
	sysutils "github.com/thunder-id/thunderid/internal/system/utils"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

type projectHandler struct {
	service ProjectServiceInterface
}

func newProjectHandler(service ProjectServiceInterface) *projectHandler {
	return &projectHandler{service: service}
}

// HandleProjectListRequest lists projects.
func (h *projectHandler) HandleProjectListRequest(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	limit, offset, ok := parsePagination(r)
	if !ok {
		h.handleError(ctx, w, &ErrorInvalidPagination)
		return
	}

	response, svcErr := h.service.GetProjectList(ctx, limit, offset)
	if svcErr != nil {
		h.handleError(ctx, w, svcErr)
		return
	}
	sysutils.WriteSuccessResponse(ctx, w, http.StatusOK, response)
}

// HandleProjectPostRequest creates a project.
func (h *projectHandler) HandleProjectPostRequest(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	request, err := sysutils.DecodeJSONBody[ProjectRequest](r)
	if err != nil {
		h.handleError(ctx, w, &ErrorInvalidRequestFormat)
		return
	}

	created, svcErr := h.service.CreateProject(ctx, *request)
	if svcErr != nil {
		h.handleError(ctx, w, svcErr)
		return
	}
	sysutils.WriteSuccessResponse(ctx, w, http.StatusCreated, created)
}

// HandleProjectGetRequest returns one project.
func (h *projectHandler) HandleProjectGetRequest(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	p, svcErr := h.service.GetProject(ctx, r.PathValue("id"))
	if svcErr != nil {
		h.handleError(ctx, w, svcErr)
		return
	}
	sysutils.WriteSuccessResponse(ctx, w, http.StatusOK, p)
}

// HandleProjectPutRequest updates a project.
func (h *projectHandler) HandleProjectPutRequest(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	request, err := sysutils.DecodeJSONBody[ProjectRequest](r)
	if err != nil {
		h.handleError(ctx, w, &ErrorInvalidRequestFormat)
		return
	}

	updated, svcErr := h.service.UpdateProject(ctx, r.PathValue("id"), *request)
	if svcErr != nil {
		h.handleError(ctx, w, svcErr)
		return
	}
	sysutils.WriteSuccessResponse(ctx, w, http.StatusOK, updated)
}

// HandleProjectDeleteRequest deletes a project.
func (h *projectHandler) HandleProjectDeleteRequest(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	if svcErr := h.service.DeleteProject(ctx, r.PathValue("id")); svcErr != nil {
		h.handleError(ctx, w, svcErr)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// parsePagination reads limit and offset, defaulting the limit to the server page size.
func parsePagination(r *http.Request) (int, int, bool) {
	limit, offset := serverconst.DefaultPageSize, 0
	query := r.URL.Query()
	if raw := query.Get("limit"); raw != "" {
		parsed, err := strconv.Atoi(raw)
		if err != nil {
			return 0, 0, false
		}
		limit = parsed
	}
	if raw := query.Get("offset"); raw != "" {
		parsed, err := strconv.Atoi(raw)
		if err != nil {
			return 0, 0, false
		}
		offset = parsed
	}
	return limit, offset, true
}

func (h *projectHandler) handleError(ctx context.Context, w http.ResponseWriter, svcErr *tidcommon.ServiceError) {
	statusCode := http.StatusInternalServerError
	if svcErr.Type == tidcommon.ClientErrorType {
		switch svcErr.Code {
		case ErrorProjectNotFound.Code:
			statusCode = http.StatusNotFound
		case ErrorHandleConflict.Code, ErrorProjectInUse.Code:
			statusCode = http.StatusConflict
		default:
			statusCode = http.StatusBadRequest
		}
	}

	sysutils.WriteErrorResponse(ctx, w, statusCode, apierror.ErrorResponse{
		Code:        svcErr.Code,
		Message:     svcErr.Error,
		Description: svcErr.ErrorDescription,
	})
}
