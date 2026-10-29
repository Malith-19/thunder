// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

const (
	// projectIDParam names a project in a query parameter or a request body field.
	projectIDParam = "projectId"
	// filterQueryParam is the query parameter that carries a listing's filter expression.
	filterQueryParam = "filter"
	// ouIDField and ouHandleField are the request body fields that name an organization unit.
	ouIDField     = "ouId"
	ouHandleField = "ouHandle"
)

// projectScopedCollections are the collections whose requests may name a project in place of the
// project's root organization unit.
var projectScopedCollections = []string{"/applications"}
