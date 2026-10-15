// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package projectscope

import tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

// Client errors for requests that name a project.
var (
	// ErrorProjectAndOUBothSet is returned when a request names both a project and an organization unit.
	ErrorProjectAndOUBothSet = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRS-1001",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectscope.project_and_ou_both_set",
			DefaultValue: "Invalid request format",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectscope.project_and_ou_both_set_description",
			DefaultValue: "Specify either projectId or ouId, not both",
		},
	}
	// ErrorProjectNotFound is returned when the named project does not exist.
	ErrorProjectNotFound = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRS-1002",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectscope.project_not_found",
			DefaultValue: "Invalid project",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectscope.project_not_found_description",
			DefaultValue: "The project does not exist",
		},
	}
	// ErrorNotAProject is returned when the named ID is an organization unit inside a project.
	ErrorNotAProject = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRS-1003",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectscope.not_a_project",
			DefaultValue: "Invalid project",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key:          "error.projectscope.not_a_project_description",
			DefaultValue: "The ID belongs to an organization unit inside a project. Use ouId to name it",
		},
	}
	// ErrorProjectIDNotSupported is returned by the data plane, which takes organization units only.
	ErrorProjectIDNotSupported = tidcommon.ServiceError{
		Type: tidcommon.ClientErrorType,
		Code: "PRS-1004",
		Error: tidcommon.I18nMessage{
			Key:          "error.projectscope.project_id_not_supported",
			DefaultValue: "Unsupported parameter",
		},
		ErrorDescription: tidcommon.I18nMessage{
			Key: "error.projectscope.project_id_not_supported_description",
			DefaultValue: "projectId is accepted by the control plane only. Use ouId; a project's ID is " +
				"also the ID of its root organization unit",
		},
	}
)
