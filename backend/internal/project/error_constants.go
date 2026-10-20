// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

var (
	// ErrorInvalidRequestFormat is returned when a request body is malformed or misses a required field.
	ErrorInvalidRequestFormat = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1001",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_request_format",
			DefaultValue: "Invalid request format",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_request_format_description",
			DefaultValue: "The request body is malformed, or a required field is missing",
		},
	}
	// ErrorProjectNotFound is returned when no project of the given ID exists.
	ErrorProjectNotFound = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1002",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_not_found",
			DefaultValue: "Project not found",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_not_found_description",
			DefaultValue: "The project with the specified ID does not exist",
		},
	}
	// ErrorHandleConflict is returned when a project with the same handle already exists.
	ErrorHandleConflict = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1003",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.handle_conflict",
			DefaultValue: "Project handle conflict",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.handle_conflict_description",
			DefaultValue: "A project with the same handle already exists",
		},
	}
	// ErrorIDConflict is returned when a supplied project ID is already in use.
	ErrorIDConflict = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1004",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.id_conflict",
			DefaultValue: "Project ID conflict",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.id_conflict_description",
			DefaultValue: "A project or organization unit with the same ID already exists",
		},
	}
	// ErrorInvalidProjectID is returned when a supplied project ID is not a UUID.
	ErrorInvalidProjectID = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1007",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_project_id",
			DefaultValue: "Invalid project ID",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.invalid_project_id_description",
			DefaultValue: "The supplied project ID must be a UUID",
		},
	}
	// ErrorProjectIDRequired is returned when a project-scoped management request names no project.
	ErrorProjectIDRequired = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1011",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_id_required",
			DefaultValue: "Project ID required",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_id_required_description",
			DefaultValue: "This operation acts on a project, so the request must carry projectId",
		},
	}
	// ErrorProjectAccessDenied is returned when the caller may not act on the requested project.
	ErrorProjectAccessDenied = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRJ-1012",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_access_denied",
			DefaultValue: "Project access denied",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectservice.project_access_denied_description",
			DefaultValue: "The caller is not allowed to act on this project",
		},
	}
)
