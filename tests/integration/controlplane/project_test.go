// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package controlplane

import (
	"encoding/json"
	"net/http"

	"github.com/thunder-id/thunderid/tests/integration/testutils"
)

type project struct {
	ID       string `json:"id"`
	Handle   string `json:"handle"`
	RootOUID string `json:"rootOuId"`
}

type projectUser struct {
	ID   string `json:"id"`
	OUID string `json:"ouId"`
}

type projectUserList struct {
	TotalResults int           `json:"totalResults"`
	Users        []projectUser `json:"users"`
}

// createProject creates a project and returns its ID and the ID of its root organization unit.
func (ts *ControlPlaneTestSuite) createProject(handle, name string) (string, string) {
	ts.T().Helper()
	var created project
	status, raw := ts.call(http.MethodPost, "/projects", map[string]any{"handle": handle, "name": name}, &created)
	ts.Require().Equal(http.StatusCreated, status, string(raw))
	return created.ID, created.RootOUID
}

// createUserTypeIn creates a user type owned by ouID, so users can be created in that unit.
func (ts *ControlPlaneTestSuite) createUserTypeIn(ouID string) string {
	ts.T().Helper()
	handle := unique("cp-project-person")
	typeID, err := testutils.CreateUserType(testutils.UserType{
		Handle:      handle,
		DisplayName: "Project person",
		OUID:        ouID,
		Schema: map[string]interface{}{
			"username": map[string]interface{}{"type": "string", "required": true, "unique": true},
		},
	})
	ts.Require().NoError(err)
	ts.T().Cleanup(func() { _ = testutils.DeleteUserType(typeID) })
	return handle
}

// createUserInProject creates a user in a project, naming the project instead of an organization unit.
func (ts *ControlPlaneTestSuite) createUserInProject(projectID, userType string, attributes json.RawMessage) string {
	ts.T().Helper()
	var created projectUser
	status, raw := ts.call(http.MethodPost, "/users",
		map[string]any{"projectId": projectID, "type": userType, "attributes": attributes}, &created)
	ts.Require().Equal(http.StatusCreated, status, string(raw))
	return created.ID
}

func (ts *ControlPlaneTestSuite) deleteUserInProject(projectID, userID string) {
	_, _ = ts.call(http.MethodDelete, "/users/"+userID+"?projectId="+projectID, nil, nil)
}

func (ts *ControlPlaneTestSuite) usernameAttributes() json.RawMessage {
	attributes, err := json.Marshal(map[string]any{"username": unique("cp-project-user")})
	ts.Require().NoError(err)
	return attributes
}

// A project is created together with its own root organization unit.
func (ts *ControlPlaneTestSuite) TestAProjectIsCreatedWithItsRootOrganizationUnit() {
	projectID, rootOUID := ts.createProject(unique("cp-project"), "CP project")
	defer func() { _ = testutils.DeleteOrganizationUnit(rootOUID) }()

	ts.NotEqual(projectID, rootOUID)

	var fetched project
	status, raw := ts.call(http.MethodGet, "/projects/"+projectID, nil, &fetched)
	ts.Require().Equal(http.StatusOK, status, string(raw))
	ts.Equal(rootOUID, fetched.RootOUID)

	status, _ = ts.call(http.MethodGet, "/organization-units/"+rootOUID, nil, nil)
	ts.Equal(http.StatusOK, status, "the project's root organization unit does not exist")
}

// A user created with only a project ID is placed in the project's root organization unit, and a user
// listing names a project and returns only that project's users.
func (ts *ControlPlaneTestSuite) TestUsersAreCreatedAndListedWithinTheirProject() {
	projectA, rootA := ts.createProject(unique("cp-project-a"), "CP project A")
	projectB, rootB := ts.createProject(unique("cp-project-b"), "CP project B")
	defer func() { _ = testutils.DeleteOrganizationUnit(rootA) }()
	defer func() { _ = testutils.DeleteOrganizationUnit(rootB) }()

	userA := ts.createUserInProject(projectA, ts.createUserTypeIn(rootA), ts.usernameAttributes())
	defer ts.deleteUserInProject(projectA, userA)
	userB := ts.createUserInProject(projectB, ts.createUserTypeIn(rootB), ts.usernameAttributes())
	defer ts.deleteUserInProject(projectB, userB)

	var fetched projectUser
	status, raw := ts.call(http.MethodGet, "/users/"+userA+"?projectId="+projectA, nil, &fetched)
	ts.Require().Equal(http.StatusOK, status, string(raw))
	ts.Equal(rootA, fetched.OUID, "the user was not placed in the project's root organization unit")

	var listed projectUserList
	status, raw = ts.call(http.MethodGet, "/users?projectId="+projectA, nil, &listed)
	ts.Require().Equal(http.StatusOK, status, string(raw))
	ids := make([]string, 0, len(listed.Users))
	for _, u := range listed.Users {
		ids = append(ids, u.ID)
	}
	ts.Equal([]string{userA}, ids, "the listing of project A holds users of other projects")
	ts.Equal(1, listed.TotalResults)
}

// A user of one project cannot be read, or placed, while acting on another project.
func (ts *ControlPlaneTestSuite) TestAUserOutsideTheProjectIsRefused() {
	projectA, rootA := ts.createProject(unique("cp-project-a"), "CP project A")
	projectB, rootB := ts.createProject(unique("cp-project-b"), "CP project B")
	defer func() { _ = testutils.DeleteOrganizationUnit(rootA) }()
	defer func() { _ = testutils.DeleteOrganizationUnit(rootB) }()

	typeB := ts.createUserTypeIn(rootB)
	userB := ts.createUserInProject(projectB, typeB, ts.usernameAttributes())
	defer ts.deleteUserInProject(projectB, userB)

	status, _ := ts.call(http.MethodGet, "/users/"+userB+"?projectId="+projectA, nil, nil)
	ts.Equal(http.StatusForbidden, status, "a user of project B was readable through project A")

	status, _ = ts.call(http.MethodPost, "/users",
		map[string]any{"projectId": projectA, "ouId": rootB, "type": typeB, "attributes": ts.usernameAttributes()},
		nil)
	ts.Equal(http.StatusForbidden, status, "a user was placed in project B through project A")
}

// A user request on the control plane must name the project it acts on.
func (ts *ControlPlaneTestSuite) TestAUserRequestWithoutAProjectIsRefused() {
	status, raw := ts.call(http.MethodGet, "/users", nil, nil)
	ts.Equal(http.StatusBadRequest, status)
	ts.Contains(string(raw), "PRJ-1011")

	status, raw = ts.call(http.MethodGet, "/users?projectId=0193a5c3-1b2d-7c4e-8f5a-6b7c8d9e0f12", nil, nil)
	ts.Equal(http.StatusNotFound, status)
	ts.Contains(string(raw), "PRJ-1002")
}
