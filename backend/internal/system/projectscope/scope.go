// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Package projectscope carries the project a control plane request acts on.
//
// A control plane request names a project instead of an organization unit. Once the project has been
// authorized and resolved, its scope travels on the request context, so authorization decisions and
// service-to-service calls made for the request all see the same project. A data plane never sets a
// scope; there the caller's token decides the organization unit.
package projectscope

import "context"

// Scope is the project a request acts on and the root organization unit that backs it.
type Scope struct {
	ProjectID string
	RootOUID  string
}

type ctxKey struct{}

// WithScope returns a copy of ctx that carries the project scope.
func WithScope(ctx context.Context, scope Scope) context.Context {
	return context.WithValue(ctx, ctxKey{}, scope)
}

// FromContext returns the project scope ctx carries, if any.
func FromContext(ctx context.Context) (Scope, bool) {
	scope, ok := ctx.Value(ctxKey{}).(Scope)
	return scope, ok && scope.RootOUID != ""
}
