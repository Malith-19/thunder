// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// Resolver decides the project a resource belongs to. The control plane's project service is one.
type Resolver interface {
	// ResolveProjectID returns the project of a resource, given the project the request names and
	// the project of the organization unit that owns the resource (empty when there is none).
	ResolveProjectID(ctx context.Context, requested, ownerProjectID string) (string, *tidcommon.ServiceError)
}

// Registry is what a resource type that belongs to projects needs of the project service: resolving
// a resource's project and registering itself so a project cannot be deleted from under it.
type Registry interface {
	Resolver
	AddUsageChecker(checker ProjectUsageChecker)
}

// ResolveProjectID returns the project of a resource.
//
// With a resolver, which is the control plane, the resolver enforces ownership. Without one, which is
// the data plane, the project ID is a label: the requested one is kept as it is, otherwise the owner's.
func ResolveProjectID(
	ctx context.Context, resolver Resolver, requested, ownerProjectID string,
) (string, *tidcommon.ServiceError) {
	if resolver == nil {
		if requested != "" {
			return requested, nil
		}
		return ownerProjectID, nil
	}
	return resolver.ResolveProjectID(ctx, requested, ownerProjectID)
}
