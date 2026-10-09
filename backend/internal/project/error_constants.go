// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"errors"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// Client errors returned by the project service. The PRJ prefix names the service.
var (
	// ErrorInvalidRequestFormat is returned when a request body cannot be read as a project.
	ErrorInvalidRequestFormat = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1001",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_request_format",
			DefaultValue: "Invalid request format",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_request_format_description",
			DefaultValue: "The request body is malformed or a required field is missing",
		},
	}
	// ErrorInvalidName is returned when a project name is missing or too long.
	ErrorInvalidName = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1002",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_name",
			DefaultValue: "Invalid project name",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_name_description",
			DefaultValue: "A project name is required and must be at most 100 characters",
		},
	}
	// ErrorInvalidHandle is returned when a project handle is missing or shaped wrongly.
	ErrorInvalidHandle = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1003",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_handle",
			DefaultValue: "Invalid project handle",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_handle_description",
			DefaultValue: "A project handle is required and may only contain lowercase letters, digits and hyphens",
		},
	}
	// ErrorProjectNotFound is returned when no project has the given ID.
	ErrorProjectNotFound = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1004",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_not_found",
			DefaultValue: "Project not found",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_not_found_description",
			DefaultValue: "The project with the specified ID does not exist",
		},
	}
	// ErrorHandleConflict is returned when another project already uses the handle.
	ErrorHandleConflict = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1005",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.handle_conflict",
			DefaultValue: "Project handle already exists",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.handle_conflict_description",
			DefaultValue: "A project with the same handle already exists",
		},
	}
	// ErrorInvalidPagination is returned when limit or offset is out of range.
	ErrorInvalidPagination = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1006",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_pagination",
			DefaultValue: "Invalid pagination parameters",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_pagination_description",
			DefaultValue: "The limit must be between 1 and 100 and the offset must not be negative",
		},
	}
	// ErrorProjectInUse is returned when a project still has resources and cannot be deleted.
	ErrorProjectInUse = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1007",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_in_use",
			DefaultValue: "Project is in use",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_in_use_description",
			DefaultValue: "The project still has resources. Move or delete them before deleting the project",
		},
	}
	// ErrorProjectMismatch is returned when a resource names a project other than the one its
	// organization unit belongs to.
	ErrorProjectMismatch = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1008",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_mismatch",
			DefaultValue: "Project does not match the organization unit",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_mismatch_description",
			DefaultValue: "A resource owned by an organization unit in a project belongs to that project",
		},
	}
)

// errProjectNotFound is returned by the store when no row matches.
var errProjectNotFound = errors.New("project not found")
