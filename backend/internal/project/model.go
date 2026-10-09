// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Package project manages projects, which group the organization units, users, applications and
// roles that make up one product or workload within a deployment.
package project

import sysutils "github.com/thunder-id/thunderid/internal/system/utils"

// Project groups the resources that make up one product or workload within a deployment.
//
// A resource belongs to a project by carrying its ID. A resource without a project ID sits at the
// organization level, outside every project.
type Project struct {
	ID          string `json:"id"`
	Handle      string `json:"handle"`
	Name        string `json:"name"`
	Description string `json:"description,omitempty"`
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
