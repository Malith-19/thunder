// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package ou

import (
	"context"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"github.com/thunder-id/thunderid/internal/system/sysauthz"
)

// ScopeToProject narrows the organization units a caller may list resources from to those of a
// project. A resource bound to an organization unit belongs to the unit's project, so this is how a
// listing of such resources is scoped to a project. An empty projectID leaves the access unchanged.
//
// The result is never wider than the access it is given: a caller allowed every unit gets exactly the
// project's units, and a caller limited to some units gets only those of them that are in the project.
func ScopeToProject(
	ctx context.Context, ouService OrganizationUnitServiceInterface, accessible *sysauthz.AccessibleResources,
	projectID string,
) (*sysauthz.AccessibleResources, *tidcommon.ServiceError) {
	if projectID == "" {
		return accessible, nil
	}

	projectOUs, svcErr := ouService.GetOrganizationUnitIDsByProject(ctx, projectID)
	if svcErr != nil {
		return nil, svcErr
	}

	if accessible == nil || accessible.AllAllowed {
		return &sysauthz.AccessibleResources{IDs: projectOUs}, nil
	}

	allowed := make(map[string]struct{}, len(accessible.IDs))
	for _, id := range accessible.IDs {
		allowed[id] = struct{}{}
	}
	scoped := make([]string, 0, len(projectOUs))
	for _, id := range projectOUs {
		if _, ok := allowed[id]; ok {
			scoped = append(scoped, id)
		}
	}
	return &sysauthz.AccessibleResources{IDs: scoped}, nil
}
