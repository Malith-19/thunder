// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Package sysauthz provides system-level authorization services for protecting
// system operations management.
package sysauthz

import (
	"context"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"github.com/thunder-id/thunderid/internal/system/log"
	"github.com/thunder-id/thunderid/internal/system/projectscope"
	"github.com/thunder-id/thunderid/internal/system/security"
)

// SystemAuthorizationServiceInterface defines the contract for system-level authorization.
type SystemAuthorizationServiceInterface interface {
	// IsActionAllowed checks whether the authenticated caller is permitted to perform
	// the given action. Returns true if allowed, false if denied. A non-nil ServiceError
	// indicates a processing failure, not an authorization denial.
	IsActionAllowed(ctx context.Context, action security.Action,
		actionCtx *ActionContext) (bool, *tidcommon.ServiceError)

	// GetAccessibleResources returns the set of resources the caller may access for the
	// given action and resource type. The result must be applied as a store-level filter
	// before pagination so that page sizes and total counts remain correct.
	//
	// When AllAllowed is true, no ID filter should be applied.
	// When AllAllowed is false, the store should restrict results to the returned IDs.
	GetAccessibleResources(ctx context.Context, action security.Action,
		resourceType security.ResourceType) (*AccessibleResources, *tidcommon.ServiceError)

	// SetOUHierarchyResolver injects the OU hierarchy resolver used by inheritance-based
	// policies. This must be called once at application startup after the ou package has
	// been initialized, completing the two-phase initialization that avoids an import cycle
	// between sysauthz (which ou already imports) and the ou package itself.
	SetOUHierarchyResolver(resolver OUHierarchyResolver)

	// CanGrantPermissions refuses an operation that would confer permissions the caller does not
	// itself hold. Use it where the granted permissions are already known, such as when defining a
	// role's permission list.
	//
	// A nil return permits the operation. Any non-nil ServiceError is a refusal, including
	// InternalServerError: an incomplete check is not a pass.
	CanGrantPermissions(ctx context.Context, granted security.PermissionSet) *tidcommon.ServiceError

	// CanGrantMembership refuses adding or removing a member of a group or role whose permissions
	// the caller does not itself hold. It resolves what the container confers, including through
	// group nesting.
	CanGrantMembership(ctx context.Context, principalType PrincipalType,
		containerID string) *tidcommon.ServiceError

	// SetPermissionResolver injects the effective-permission resolver used by the two checks above.
	// It must be called once at startup after the role and group packages are initialized,
	// completing the same two-phase initialization used by SetOUHierarchyResolver. Until it is
	// called, both checks refuse.
	SetPermissionResolver(resolver PermissionResolver)
}

// systemAuthorizationService is the default implementation of SystemAuthorizationServiceInterface.
type systemAuthorizationService struct {
	logger   *log.Logger
	policies *policies
	// permissionResolver enumerates effective permissions for the grant checks. nil until
	// SetPermissionResolver is called at startup, in which case those checks refuse.
	permissionResolver PermissionResolver
	// ouResolver answers whether an organization unit sits beneath a project's root. nil until
	// SetOUHierarchyResolver is called, in which case only the root itself is in a project.
	ouResolver OUHierarchyResolver
}

type policies struct {
	// membershipPolicy enforces same-OU access for standard operations.
	// Declared as an interface so that tests can inject stubs without importing
	// the concrete type directly.
	membershipPolicy authorizationPolicy
	// inheritancePolicy grants child-OU callers read access to parent-OU resources.
	// nil when no OUHierarchyResolver has been injected yet.
	inheritancePolicy authorizationPolicy
}

// newSystemAuthorizationService returns a new systemAuthorizationService.
func newSystemAuthorizationService() SystemAuthorizationServiceInterface {
	return &systemAuthorizationService{
		logger: log.GetLogger().With(log.String("component", "SystemAuthorizationService")),
		policies: &policies{
			membershipPolicy: &ouMembershipPolicy{},
		},
	}
}

// SetOUHierarchyResolver injects the OU hierarchy resolver into the service.
// It is called once at application startup after the ou package is initialized.
// The ouInheritancePolicy is built once here and reused for every subsequent authz call.
func (s *systemAuthorizationService) SetOUHierarchyResolver(resolver OUHierarchyResolver) {
	if resolver == nil {
		return
	}
	s.policies.inheritancePolicy = &ouInheritancePolicy{resolver: resolver}
	s.ouResolver = resolver
}

// IsActionAllowed evaluates whether the authenticated caller may perform the given action.
func (s *systemAuthorizationService) IsActionAllowed(ctx context.Context, action security.Action,
	actionCtx *ActionContext) (bool, *tidcommon.ServiceError) {
	logger := s.logger.WithContext(ctx)

	// Step 1: Check if this is an internal runtime caller.
	if security.IsRuntimeContext(ctx) {
		logger.Debug(ctx, "Authorization granted: runtime context for the action",
			log.String("action", string(action)))
		return true, nil
	}

	// Step 2: Verify the caller is authenticated.
	subject := security.GetSubject(ctx)
	if subject == "" {
		logger.Debug(ctx, "Authorization denied: unauthenticated caller",
			log.String("action", string(action)))
		return false, nil
	}

	permissions := security.GetPermissions(ctx)

	// A control plane request scoped to a project is decided against the project instead of the
	// caller's own organization unit. This comes before the system permission short-circuit, so a
	// system administrator acting in one project cannot reach the resources of another.
	if scope, ok := projectscope.FromContext(ctx); ok {
		return s.isActionAllowedInProject(ctx, scope, action, actionCtx, permissions)
	}

	// Step 3: Short-circuit: the "system" permission grants access to all system operations.
	if security.HasSystemPermission(permissions) {
		return true, nil
	}

	// Step 4: Allow resource owners to access their own resources (self-service).
	if isResourceOwner(ctx, actionCtx) {
		if logger.IsDebugEnabled() {
			logger.Debug(ctx, "Authorization granted: resource owner",
				log.String("action", string(action)),
				log.MaskedString("subject", subject))
		}
		return true, nil
	}

	// Step 5: Resolve required permission for the action and evaluate using hierarchical matching.
	requiredPermission := security.ResolveActionPermission(action)
	if !security.HasSufficientPermission(permissions, requiredPermission) {
		if logger.IsDebugEnabled() {
			logger.Debug(ctx, "Authorization denied: insufficient permissions",
				log.String("action", string(action)),
				log.MaskedString("subject", subject))
		}
		return false, nil
	}

	// Step 6: Evaluate global policies (e.g., OU scope check).
	allowed, svcErr := isActionAllowedByPolicies(ctx, s.policies, action, actionCtx)
	if svcErr != nil {
		return false, svcErr
	}
	if !allowed {
		if logger.IsDebugEnabled() {
			logger.Debug(ctx, "Authorization denied: policy evaluation failed",
				log.String("action", string(action)),
				log.MaskedString("subject", subject))
		}
		return false, nil
	}

	if logger.IsDebugEnabled() {
		logger.Debug(ctx, "Authorization granted",
			log.String("action", string(action)),
			log.MaskedString("subject", subject))
	}

	return true, nil
}

// isActionAllowedInProject decides an action of a request scoped to a project. The organization unit
// the action targets must be the project's root or one beneath it; the caller's permissions are then
// checked as usual. The caller's own organization unit plays no part: access to the project itself was
// decided before the scope was set.
func (s *systemAuthorizationService) isActionAllowedInProject(ctx context.Context, scope projectscope.Scope,
	action security.Action, actionCtx *ActionContext, permissions []string) (bool, *tidcommon.ServiceError) {
	if actionCtx != nil && actionCtx.OUID != "" {
		inProject, svcErr := s.isOUInProject(ctx, scope, actionCtx.OUID)
		if svcErr != nil {
			return false, svcErr
		}
		if !inProject {
			s.logger.Debug(ctx, "Authorization denied: organization unit is outside the project",
				log.String("action", string(action)), log.String("projectID", scope.ProjectID))
			return false, nil
		}
	}

	if security.HasSystemPermission(permissions) || isResourceOwner(ctx, actionCtx) {
		return true, nil
	}
	return security.HasSufficientPermission(permissions, security.ResolveActionPermission(action)), nil
}

// isOUInProject reports whether ouID is the project's root organization unit or one beneath it.
func (s *systemAuthorizationService) isOUInProject(ctx context.Context, scope projectscope.Scope,
	ouID string) (bool, *tidcommon.ServiceError) {
	if ouID == scope.RootOUID {
		return true, nil
	}
	if s.ouResolver == nil {
		return false, nil
	}
	return s.ouResolver.IsAncestor(ctx, scope.RootOUID, ouID)
}

// isResourceOwner checks whether the authenticated caller is the owner of the resource
// being acted upon. This enables self-service operations (e.g., a user accessing their own
// profile) without requiring system-level permissions.
//
// Returns true only when:
//   - The ActionContext carries a non-empty ResourceID.
//   - The resource type supports owner-based access (currently only ResourceTypeUser).
//   - The caller's subject matches the ResourceID.
func isResourceOwner(ctx context.Context, actionCtx *ActionContext) bool {
	if actionCtx == nil || actionCtx.ResourceID == "" {
		return false
	}

	// Currently only user resources support owner-based access.
	if actionCtx.ResourceType != security.ResourceTypeUser {
		return false
	}

	return security.GetSubject(ctx) == actionCtx.ResourceID
}

// GetAccessibleResources returns the set of resources the caller can access for the given
// action and resource type.
func (s *systemAuthorizationService) GetAccessibleResources(ctx context.Context, action security.Action,
	resourceType security.ResourceType) (*AccessibleResources, *tidcommon.ServiceError) {
	logger := s.logger.WithContext(ctx)

	// Step 1: Check if this is an internal runtime caller — return all resources.
	if security.IsRuntimeContext(ctx) {
		logger.Debug(ctx, "GetAccessibleResources: runtime context, returning all resources",
			log.String("action", string(action)),
			log.String("resourceType", string(resourceType)))
		return &AccessibleResources{AllAllowed: true}, nil
	}

	// Step 2: Verify the caller is authenticated.
	subject := security.GetSubject(ctx)
	if subject == "" {
		logger.Debug(ctx, "GetAccessibleResources denied: unauthenticated caller",
			log.String("action", string(action)),
			log.String("resourceType", string(resourceType)))
		return &AccessibleResources{AllAllowed: false, IDs: []string{}}, nil
	}

	permissions := security.GetPermissions(ctx)

	// A control plane request scoped to a project sees the project's root organization unit, whatever
	// organization unit the caller's token names and even when the caller holds the system permission.
	if scope, ok := projectscope.FromContext(ctx); ok && resourceType == security.ResourceTypeOU {
		if !security.HasSystemPermission(permissions) &&
			!security.HasSufficientPermission(permissions, security.ResolveActionPermission(action)) {
			return &AccessibleResources{AllAllowed: false, IDs: []string{}}, nil
		}
		return &AccessibleResources{AllAllowed: false, IDs: []string{scope.RootOUID}}, nil
	}

	// Step 3: Short-circuit: the "system" permission grants access to all resources.
	if security.HasSystemPermission(permissions) {
		return &AccessibleResources{AllAllowed: true}, nil
	}

	// Step 4: Verify the caller holds an adequate permission for the action using hierarchical matching.
	requiredPermission := security.ResolveActionPermission(action)
	if !security.HasSufficientPermission(permissions, requiredPermission) {
		if logger.IsDebugEnabled() {
			logger.Debug(ctx, "GetAccessibleResources denied: insufficient permissions",
				log.String("action", string(action)),
				log.String("resourceType", string(resourceType)),
				log.MaskedString("subject", subject))
		}
		return &AccessibleResources{AllAllowed: false, IDs: []string{}}, nil
	}

	// Step 5: Delegate to the policy chain to determine the accessible resource set.
	result, svcErr := getAccessibleResourcesByPolicies(ctx, s.policies, action, resourceType)
	if svcErr != nil {
		return nil, svcErr
	}
	if logger.IsDebugEnabled() && !result.AllAllowed {
		logger.Debug(ctx, "GetAccessibleResources: restricted by policy",
			log.String("action", string(action)),
			log.String("resourceType", string(resourceType)),
			log.MaskedString("subject", subject),
			log.Int("accessibleCount", len(result.IDs)))
	}
	return result, nil
}
