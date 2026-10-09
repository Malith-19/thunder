// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// ExistenceChecker reports whether a project exists. ProjectServiceInterface satisfies it.
type ExistenceChecker interface {
	IsProjectExists(ctx context.Context, id string) (bool, *tidcommon.ServiceError)
}

// Registry is what a resource type that carries a project ID needs of the project service: checking
// a reference and registering itself so a project cannot be deleted from under its resources.
type Registry interface {
	ExistenceChecker
	AddUsageChecker(checker ProjectUsageChecker)
}

// ResolveProjectID returns the project a resource owned by an organization unit belongs to.
//
// An organization unit that belongs to a project takes everything it owns with it, so the resource
// is in that project and a request naming another one is rejected. An organization unit outside
// every project holds people shared across projects, so a resource it owns may join any project, or
// none when requested is empty.
func ResolveProjectID(
	ctx context.Context, checker ExistenceChecker, requested, ouProjectID string,
) (string, *tidcommon.ServiceError) {
	if ouProjectID != "" {
		if requested != "" && requested != ouProjectID {
			return "", &ErrorProjectMismatch
		}
		return ouProjectID, nil
	}

	if requested == "" {
		return "", nil
	}
	if checker == nil {
		return "", &ErrorProjectNotFound
	}
	exists, svcErr := checker.IsProjectExists(ctx, requested)
	if svcErr != nil {
		return "", svcErr
	}
	if !exists {
		return "", &ErrorProjectNotFound
	}
	return requested, nil
}
