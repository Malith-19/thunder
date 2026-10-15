// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package ou

import (
	"context"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"github.com/thunder-id/thunderid/internal/system/sysauthz"
)

// ScopeToSubtree narrows the organization units a caller may list resources from to the subtree
// rooted at ouID. An empty ouID leaves the access unchanged.
//
// The result is never wider than the access it is given: a caller allowed every unit gets exactly the
// subtree, and a caller limited to some units gets only those of them that are in the subtree.
func ScopeToSubtree(
	ctx context.Context, ouService OrganizationUnitServiceInterface, accessible *sysauthz.AccessibleResources,
	ouID string,
) (*sysauthz.AccessibleResources, *tidcommon.ServiceError) {
	if ouID == "" {
		return accessible, nil
	}

	subtree, svcErr := ouService.GetOrganizationUnitSubtreeIDs(ctx, ouID)
	if svcErr != nil {
		return nil, svcErr
	}

	if accessible == nil || accessible.AllAllowed {
		return &sysauthz.AccessibleResources{IDs: subtree}, nil
	}

	allowed := make(map[string]struct{}, len(accessible.IDs))
	for _, id := range accessible.IDs {
		allowed[id] = struct{}{}
	}
	scoped := make([]string, 0, len(subtree))
	for _, id := range subtree {
		if _, ok := allowed[id]; ok {
			scoped = append(scoped, id)
		}
	}
	return &sysauthz.AccessibleResources{IDs: scoped}, nil
}
