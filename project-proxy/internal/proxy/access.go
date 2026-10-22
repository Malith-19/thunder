// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package proxy

import "context"

// AccessDecider decides whether a caller may act on a project. On the cloud it is backed by the
// platform's authorization service.
type AccessDecider interface {
	CanAccessProject(ctx context.Context, claims *Claims, projectID string) (bool, error)
}

// claimDecider allows the projects listed in a claim of the platform token.
type claimDecider struct {
	claim string
}

// NewClaimDecider returns a decider that allows the project IDs listed in the given claim.
func NewClaimDecider(claim string) AccessDecider {
	return claimDecider{claim: claim}
}

func (d claimDecider) CanAccessProject(_ context.Context, claims *Claims, projectID string) (bool, error) {
	projects, _ := claims.Raw[d.claim].([]any)
	for _, p := range projects {
		if id, _ := p.(string); id == projectID {
			return true, nil
		}
	}
	return false, nil
}
