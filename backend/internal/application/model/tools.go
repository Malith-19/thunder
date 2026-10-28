// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package model

// ApplicationListOutput represents the output for list_applications tool.
type ApplicationListOutput struct {
	TotalCount   int                        `json:"total_count" jsonschema:"Total number of applications available."`
	Applications []BasicApplicationResponse `json:"applications" jsonschema:"List of applications."`
}

// ApplicationListInput represents the optional scope of the list_applications tool.
//
//nolint:lll
type ApplicationListInput struct {
	ProjectID string `json:"projectId,omitempty" jsonschema:"Project ID. Lists the applications of the project's root organization unit, or of the given ouId when it is that unit or one below it."`
	OUID      string `json:"ouId,omitempty" jsonschema:"Organization unit ID. Lists the applications this organization unit owns, followed by the ones shared into it."`
}

// ClientIDInput represents input for client ID-based lookups.
type ClientIDInput struct {
	ClientID string `json:"client_id" jsonschema:"OAuth client ID to search for"`
}
