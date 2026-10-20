// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"

	"github.com/thunder-id/thunderid/internal/system/security"
)

// AccessDecider decides whether the caller of a request may act on a project.
//
// A management token does not carry a project, and one caller can work with several projects using the
// same token, so the decision is made for every request. A deployment can plug in its own decider, for
// example one that asks an external authorization service.
type AccessDecider interface {
	CanAccessProject(ctx context.Context, projectID string) (bool, error)
}

// systemPermissionDecider is the default decider: a caller with the system permission may act on every
// project, and no other caller may act on any.
type systemPermissionDecider struct{}

func (systemPermissionDecider) CanAccessProject(ctx context.Context, _ string) (bool, error) {
	return security.HasSystemPermission(security.GetPermissions(ctx)), nil
}
