// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"net/http"
	"strconv"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"github.com/thunder-id/thunderid/internal/system/error/apierror"
	sysutils "github.com/thunder-id/thunderid/internal/system/utils"
)

const defaultPageSize = 30

type handler struct {
	service ServiceInterface
}

func newHandler(service ServiceInterface) *handler {
	return &handler{service: service}
}

func (h *handler) handleCreate(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	request, err := sysutils.DecodeJSONBody[CreateProjectRequest](r)
	if err != nil {
		writeServiceError(ctx, w, &ErrorInvalidRequestFormat)
		return
	}
	request.ID = sysutils.SanitizeString(request.ID)
	request.Handle = sysutils.SanitizeString(request.Handle)
	request.Name = sysutils.SanitizeString(request.Name)
	request.Description = sysutils.SanitizeString(request.Description)

	project, svcErr := h.service.CreateProject(ctx, *request)
	if svcErr != nil {
		writeServiceError(ctx, w, svcErr)
		return
	}
	sysutils.WriteSuccessResponse(ctx, w, http.StatusCreated, project)
}

func (h *handler) handleGet(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	project, svcErr := h.service.GetProject(ctx, r.PathValue("id"))
	if svcErr != nil {
		writeServiceError(ctx, w, svcErr)
		return
	}
	sysutils.WriteSuccessResponse(ctx, w, http.StatusOK, project)
}

func (h *handler) handleList(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	limit, offset := defaultPageSize, 0
	if v := r.URL.Query().Get("limit"); v != "" {
		parsed, err := strconv.Atoi(v)
		if err != nil || parsed < 1 {
			writeServiceError(ctx, w, &ErrorInvalidRequestFormat)
			return
		}
		limit = parsed
	}
	if v := r.URL.Query().Get("offset"); v != "" {
		parsed, err := strconv.Atoi(v)
		if err != nil || parsed < 0 {
			writeServiceError(ctx, w, &ErrorInvalidRequestFormat)
			return
		}
		offset = parsed
	}
	list, svcErr := h.service.ListProjects(ctx, limit, offset)
	if svcErr != nil {
		writeServiceError(ctx, w, svcErr)
		return
	}
	sysutils.WriteSuccessResponse(ctx, w, http.StatusOK, list)
}

func writeServiceError(ctx context.Context, w http.ResponseWriter, svcErr *tidcommon.ServiceError) {
	statusCode := http.StatusInternalServerError
	if svcErr.Type == tidcommon.ClientErrorType {
		statusCode = http.StatusBadRequest
	}
	switch svcErr.Code {
	case ErrorProjectNotFound.Code:
		statusCode = http.StatusNotFound
	case ErrorHandleConflict.Code, ErrorIDConflict.Code:
		statusCode = http.StatusConflict
	case ErrorProjectAccessDenied.Code:
		statusCode = http.StatusForbidden
	}
	sysutils.WriteErrorResponse(ctx, w, statusCode, apierror.ErrorResponse{
		Code:        svcErr.Code,
		Message:     svcErr.Error,
		Description: svcErr.ErrorDescription,
	})
}
