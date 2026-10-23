// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package controlplane

import (
	"net/http"
)

// Projects are a control plane concept: a Control Plane creates a project together with the root
// organization unit that backs it, and deletes both together.
func (ts *ControlPlaneTestSuite) TestAProjectIsCreatedWithItsRootOrganizationUnit() {
	var created struct {
		ID       string `json:"id"`
		RootOUID string `json:"rootOuId"`
	}
	status, raw := ts.call(http.MethodPost, "/projects",
		map[string]any{"handle": unique("cp-project"), "displayName": "Control Plane project"}, &created)
	ts.Require().Equal(http.StatusCreated, status, string(raw))
	ts.NotEmpty(created.RootOUID)

	var rootOU struct {
		Parent *string `json:"parent"`
	}
	status, raw = ts.call(http.MethodGet, "/organization-units/"+created.RootOUID, nil, &rootOU)
	ts.Require().Equal(http.StatusOK, status, string(raw))
	ts.Nil(rootOU.Parent, "a project's organization unit must be a root")

	status, raw = ts.call(http.MethodDelete, "/projects/"+created.ID, nil, nil)
	ts.Require().Equal(http.StatusNoContent, status, string(raw))

	status, _ = ts.call(http.MethodGet, "/organization-units/"+created.RootOUID, nil, nil)
	ts.Equal(http.StatusNotFound, status, "deleting a project must delete its root organization unit")
}
