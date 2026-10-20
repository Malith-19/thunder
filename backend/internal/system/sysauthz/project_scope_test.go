// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package sysauthz

import (
	"context"
	"testing"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"github.com/stretchr/testify/require"

	"github.com/thunder-id/thunderid/internal/system/projectscope"
	"github.com/thunder-id/thunderid/internal/system/security"
)

const (
	scopeRootOU  = "project-root-ou"
	scopeChildOU = "project-child-ou"
	scopeOtherOU = "other-project-ou"
)

// stubHierarchy places scopeChildOU beneath scopeRootOU.
type stubHierarchy struct{}

func (stubHierarchy) IsAncestor(_ context.Context, ancestor, descendant string) (bool, *tidcommon.ServiceError) {
	return ancestor == scopeRootOU && descendant == scopeChildOU, nil
}

func (stubHierarchy) GetAncestorOUIDs(_ context.Context, ouID string) ([]string, *tidcommon.ServiceError) {
	if ouID == scopeChildOU {
		return []string{scopeRootOU}, nil
	}
	return nil, nil
}

func newScopedService(t *testing.T) SystemAuthorizationServiceInterface {
	service, err := Initialize()
	require.NoError(t, err)
	service.SetOUHierarchyResolver(stubHierarchy{})
	return service
}

func scopedCtx(permissions, tokenOUID string) context.Context {
	return projectscope.WithScope(buildCtxWithOU(permissions, tokenOUID),
		projectscope.Scope{ProjectID: "project-1", RootOUID: scopeRootOU})
}

func TestIsActionAllowed_ProjectScope(t *testing.T) {
	service := newScopedService(t)
	system := security.GetSystemRootPermission()

	tests := []struct {
		name        string
		ctx         context.Context
		ouID        string
		wantAllowed bool
	}{
		{name: "system caller in the project root", ctx: scopedCtx(system, ""), ouID: scopeRootOU,
			wantAllowed: true},
		{name: "system caller beneath the project root", ctx: scopedCtx(system, ""), ouID: scopeChildOU,
			wantAllowed: true},
		{name: "system caller outside the project", ctx: scopedCtx(system, ""), ouID: scopeOtherOU,
			wantAllowed: false},
		{name: "permitted caller whose token names another unit", ctx: scopedCtx("system:user", scopeOtherOU),
			ouID: scopeRootOU, wantAllowed: true},
		{name: "caller without the permission", ctx: scopedCtx("system:group", ""), ouID: scopeRootOU,
			wantAllowed: false},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			allowed, svcErr := service.IsActionAllowed(tc.ctx, security.ActionReadUser,
				&ActionContext{OUID: tc.ouID, ResourceType: security.ResourceTypeUser})
			require.Nil(t, svcErr)
			require.Equal(t, tc.wantAllowed, allowed)
		})
	}
}

func TestGetAccessibleResources_ProjectScope(t *testing.T) {
	service := newScopedService(t)

	t.Run("system caller sees only the project root", func(t *testing.T) {
		result, svcErr := service.GetAccessibleResources(scopedCtx(security.GetSystemRootPermission(), ""),
			security.ActionListUsers, security.ResourceTypeOU)
		require.Nil(t, svcErr)
		require.False(t, result.AllAllowed)
		require.Equal(t, []string{scopeRootOU}, result.IDs)
	})

	t.Run("permitted caller sees the project root, not its token unit", func(t *testing.T) {
		result, svcErr := service.GetAccessibleResources(scopedCtx("system:user", scopeOtherOU),
			security.ActionListUsers, security.ResourceTypeOU)
		require.Nil(t, svcErr)
		require.Equal(t, []string{scopeRootOU}, result.IDs)
	})

	t.Run("caller without the permission sees nothing", func(t *testing.T) {
		result, svcErr := service.GetAccessibleResources(scopedCtx("system:group", ""),
			security.ActionListUsers, security.ResourceTypeOU)
		require.Nil(t, svcErr)
		require.Empty(t, result.IDs)
	})

	t.Run("without a scope the system caller sees everything", func(t *testing.T) {
		result, svcErr := service.GetAccessibleResources(buildCtx(security.GetSystemRootPermission()),
			security.ActionListUsers, security.ResourceTypeOU)
		require.Nil(t, svcErr)
		require.True(t, result.AllAllowed)
	})
}
