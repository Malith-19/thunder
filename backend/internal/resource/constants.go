// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package resource

// projectIDQueryParam is the query parameter that lists the resource servers of one project.
const projectIDQueryParam = "projectId"

// Error codes the project service returns when it resolves the organization unit of a project. They
// are matched by value, since the Data Plane must not link the Control Plane only project package.
const (
	projectNotFoundErrorCode = "PRJ-1002"
	ouNotInProjectErrorCode  = "PRJ-1010"
)
