// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Package project covers projects on the all-in-one server, where a management request that names a
// project acts on it and one that does not is served as before.
package project

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"testing"
	"time"

	"github.com/stretchr/testify/suite"

	"github.com/thunder-id/thunderid/tests/integration/testutils"
)

type projectResponse struct {
	ID       string `json:"id"`
	RootOUID string `json:"rootOuId"`
}

type userResponse struct {
	ID   string `json:"id"`
	OUID string `json:"ouId"`
}

type userListResponse struct {
	TotalResults int            `json:"totalResults"`
	Users        []userResponse `json:"users"`
}

type ProjectTestSuite struct {
	suite.Suite
	projectA, rootA string
	projectB, rootB string
	userA, userB    string
}

func TestProjectTestSuite(t *testing.T) {
	suite.Run(t, new(ProjectTestSuite))
}

func unique(prefix string) string {
	return fmt.Sprintf("%s-%d", prefix, time.Now().UnixNano())
}

func (ts *ProjectTestSuite) call(method, path string, in, out any) (int, []byte) {
	ts.T().Helper()
	var body io.Reader
	if in != nil {
		encoded, err := json.Marshal(in)
		ts.Require().NoError(err)
		body = bytes.NewReader(encoded)
	}
	req, err := http.NewRequest(method, testutils.TestServerURL+path, body)
	ts.Require().NoError(err)
	req.Header.Set("Content-Type", "application/json")
	resp, err := testutils.GetHTTPClient().Do(req)
	ts.Require().NoError(err)
	defer func() { _ = resp.Body.Close() }()
	raw, err := io.ReadAll(resp.Body)
	ts.Require().NoError(err)
	if out != nil && resp.StatusCode < http.StatusBadRequest {
		ts.Require().NoError(json.Unmarshal(raw, out), string(raw))
	}
	return resp.StatusCode, raw
}

func (ts *ProjectTestSuite) createProject(name string) (string, string) {
	var created projectResponse
	status, raw := ts.call(http.MethodPost, "/projects", map[string]any{"handle": unique("project"), "name": name},
		&created)
	ts.Require().Equal(http.StatusCreated, status, string(raw))
	return created.ID, created.RootOUID
}

func (ts *ProjectTestSuite) createUser(projectID, rootOUID string) string {
	userType := unique("project-person")
	typeID, err := testutils.CreateUserType(testutils.UserType{
		Handle:      userType,
		DisplayName: "Project person",
		OUID:        rootOUID,
		Schema: map[string]interface{}{
			"username": map[string]interface{}{"type": "string", "required": true, "unique": true},
		},
	})
	ts.Require().NoError(err)
	ts.T().Cleanup(func() { _ = testutils.DeleteUserType(typeID) })

	var created userResponse
	status, raw := ts.call(http.MethodPost, "/users", map[string]any{
		"projectId": projectID, "type": userType, "attributes": map[string]any{"username": unique("user")},
	}, &created)
	ts.Require().Equal(http.StatusCreated, status, string(raw))
	return created.ID
}

func (ts *ProjectTestSuite) SetupSuite() {
	ts.projectA, ts.rootA = ts.createProject("Project A")
	ts.projectB, ts.rootB = ts.createProject("Project B")
	ts.userA = ts.createUser(ts.projectA, ts.rootA)
	ts.userB = ts.createUser(ts.projectB, ts.rootB)
}

func (ts *ProjectTestSuite) TearDownSuite() {
	for _, id := range []string{ts.userA, ts.userB} {
		if id != "" {
			_ = testutils.DeleteUser(id)
		}
	}
	for _, id := range []string{ts.rootA, ts.rootB} {
		if id != "" {
			_ = testutils.DeleteOrganizationUnit(id)
		}
	}
}

func (ts *ProjectTestSuite) listUserIDs(path string) []string {
	var listed userListResponse
	status, raw := ts.call(http.MethodGet, path, nil, &listed)
	ts.Require().Equal(http.StatusOK, status, string(raw))
	ids := make([]string, 0, len(listed.Users))
	for _, u := range listed.Users {
		ids = append(ids, u.ID)
	}
	return ids
}

// A user created with only a project ID is placed in the project's root organization unit.
func (ts *ProjectTestSuite) TestAUserIsPlacedInTheProjectRoot() {
	var fetched userResponse
	status, raw := ts.call(http.MethodGet, "/users/"+ts.userA, nil, &fetched)
	ts.Require().Equal(http.StatusOK, status, string(raw))
	ts.Equal(ts.rootA, fetched.OUID)
}

// A user listing that names a project returns only that project's users.
func (ts *ProjectTestSuite) TestUsersAreListedWithinTheProject() {
	ts.Equal([]string{ts.userA}, ts.listUserIDs("/users?limit=100&projectId="+ts.projectA))
	ts.Equal([]string{ts.userB}, ts.listUserIDs("/users?limit=100&projectId="+ts.projectB))
}

// A user listing that names no project is served as before.
func (ts *ProjectTestSuite) TestUsersAreListedAsBeforeWithoutAProject() {
	ids := ts.listUserIDs("/users?limit=100")
	ts.Contains(ids, ts.userA)
	ts.Contains(ids, ts.userB)
}

// A user of one project cannot be read, or placed, while acting on another project.
func (ts *ProjectTestSuite) TestAUserOutsideTheProjectIsRefused() {
	status, _ := ts.call(http.MethodGet, "/users/"+ts.userB+"?projectId="+ts.projectA, nil, nil)
	ts.Equal(http.StatusForbidden, status)

	status, _ = ts.call(http.MethodPost, "/users", map[string]any{
		"projectId": ts.projectA, "ouId": ts.rootB, "type": "person",
		"attributes": map[string]any{"username": unique("user")},
	}, nil)
	ts.Equal(http.StatusForbidden, status)
}

// An unknown project is refused.
func (ts *ProjectTestSuite) TestAnUnknownProjectIsRefused() {
	status, raw := ts.call(http.MethodGet, "/users?projectId=0193a5c3-1b2d-7c4e-8f5a-6b7c8d9e0f12", nil, nil)
	ts.Equal(http.StatusNotFound, status)
	ts.Contains(string(raw), "PRJ-1002")
}
