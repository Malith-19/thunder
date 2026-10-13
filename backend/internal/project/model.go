// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Package project manages projects. In the control plane a project is a collection of organization
// units plus the resources that are not bound to one (connections, flows, themes, layouts, translations,
// notification templates). A resource bound to an organization unit belongs to the unit's project and
// carries no project ID of its own. The data plane has no projects; it keeps the project ID each
// resource arrived with as a label.
package project

import sysutils "github.com/thunder-id/thunderid/internal/system/utils"

// Project groups the resources that make up one product or workload within a deployment.
type Project struct {
	ID          string `json:"id"`
	Handle      string `json:"handle"`
	Name        string `json:"name"`
	Description string `json:"description,omitempty"`
	// IsDefault marks the project that holds the resources created without one.
	IsDefault bool `json:"isDefault"`
}

// ProjectRequest is the body of a create or update request.
type ProjectRequest struct {
	Handle      string `json:"handle"`
	Name        string `json:"name"`
	Description string `json:"description,omitempty"`
}

// ProjectListResponse is one page of projects.
type ProjectListResponse struct {
	TotalResults int             `json:"totalResults"`
	StartIndex   int             `json:"startIndex"`
	Count        int             `json:"count"`
	Projects     []Project       `json:"projects"`
	Links        []sysutils.Link `json:"links"`
}
