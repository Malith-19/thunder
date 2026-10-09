// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package ou

import (
	"context"
	"errors"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// projectUsageChecker keeps a project from being deleted while organization units still belong to
// it. A child organization unit always shares its root's project, so checking the roots is enough.
type projectUsageChecker struct {
	service OrganizationUnitServiceInterface
}

// NewProjectUsageChecker returns a checker that reports whether any organization unit belongs to a
// project.
func NewProjectUsageChecker(service OrganizationUnitServiceInterface) interface {
	HasResourcesInProject(ctx context.Context, projectID string) (bool, error)
} {
	return &projectUsageChecker{service: service}
}

// HasResourcesInProject reports whether any root organization unit belongs to the project.
func (c *projectUsageChecker) HasResourcesInProject(ctx context.Context, projectID string) (bool, error) {
	filter := &tidcommon.FilterGroup{Clauses: []tidcommon.FilterClause{{
		Expr: tidcommon.FilterExpression{Attribute: "projectId", Operator: tidcommon.OperatorEq, Value: projectID},
	}}}
	list, svcErr := c.service.GetOrganizationUnitList(ctx, 1, 0, filter)
	if svcErr != nil {
		return false, errors.New(svcErr.Error.DefaultValue)
	}
	return list.TotalResults > 0, nil
}
