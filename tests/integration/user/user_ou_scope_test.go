// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package user

import (
	"encoding/json"
	"fmt"
	"net/http"
	"testing"

	"github.com/stretchr/testify/suite"
	"github.com/thunder-id/thunderid/tests/integration/testutils"
)

const (
	ouScopeRootHandle     = "ou-scope-root"
	ouScopeChildHandle    = "ou-scope-child"
	ouScopeSiblingHandle  = "ou-scope-sibling"
	ouScopeUserTypePrefix = "ou-scope-user-type-"
)

// UserOUScopeTestSuite covers scoping the user listing to the users of one organization unit.
type UserOUScopeTestSuite struct {
	suite.Suite

	rootOUID    string
	childOUID   string
	siblingOUID string
	userTypeIDs []string

	rootUserID    string
	childUserID   string
	siblingUserID string
}

func TestUserOUScopeTestSuite(t *testing.T) {
	suite.Run(t, new(UserOUScopeTestSuite))
}

func (ts *UserOUScopeTestSuite) SetupSuite() {
	rootOUID, err := testutils.CreateOrganizationUnit(testutils.OrganizationUnit{
		Handle: ouScopeRootHandle,
		Name:   "OU Scope Root",
	})
	ts.Require().NoError(err, "create root OU")
	ts.rootOUID = rootOUID

	childOUID, err := testutils.CreateOrganizationUnit(testutils.OrganizationUnit{
		Handle: ouScopeChildHandle,
		Name:   "OU Scope Child",
		Parent: &ts.rootOUID,
	})
	ts.Require().NoError(err, "create child OU")
	ts.childOUID = childOUID

	siblingOUID, err := testutils.CreateOrganizationUnit(testutils.OrganizationUnit{
		Handle: ouScopeSiblingHandle,
		Name:   "OU Scope Sibling",
	})
	ts.Require().NoError(err, "create sibling OU")
	ts.siblingOUID = siblingOUID

	ts.rootUserID = ts.createUser(ts.rootOUID, ouScopeRootHandle, "Root User")
	ts.childUserID = ts.createUser(ts.childOUID, ouScopeChildHandle, "Child User")
	ts.siblingUserID = ts.createUser(ts.siblingOUID, ouScopeSiblingHandle, "Sibling User")
}

func (ts *UserOUScopeTestSuite) TearDownSuite() {
	for _, id := range []string{ts.rootUserID, ts.childUserID, ts.siblingUserID} {
		if id != "" {
			_ = testutils.DeleteUser(id)
		}
	}
	for _, id := range ts.userTypeIDs {
		_ = testutils.DeleteUserType(id)
	}
	for _, id := range []string{ts.childOUID, ts.rootOUID, ts.siblingOUID} {
		if id != "" {
			_ = testutils.DeleteOrganizationUnit(id)
		}
	}
}

// createUser creates a user in ouID, together with a user type owned by that OU.
func (ts *UserOUScopeTestSuite) createUser(ouID, ouHandle, displayName string) string {
	userType := ouScopeUserTypePrefix + ouHandle
	userTypeID, err := testutils.CreateUserType(testutils.UserType{
		Handle:      userType,
		DisplayName: displayName + " Type",
		OUID:        ouID,
		Schema: map[string]interface{}{
			"display_name": map[string]interface{}{"type": "string"},
		},
	})
	ts.Require().NoError(err, "create user type for %q", ouHandle)
	ts.userTypeIDs = append(ts.userTypeIDs, userTypeID)

	userID, err := testutils.CreateUser(testutils.User{
		Type:       userType,
		OUID:       ouID,
		Attributes: json.RawMessage(fmt.Sprintf(`{"display_name": %q}`, displayName)),
	})
	ts.Require().NoError(err, "create user %q", displayName)
	return userID
}

func (ts *UserOUScopeTestSuite) listUserIDs(query string) (int, []string, testutils.UserListResponse) {
	resp, err := testutils.GetHTTPClient().Get(testutils.TestServerURL + "/users?limit=100" + query)
	ts.Require().NoError(err)
	defer resp.Body.Close()

	var listResp testutils.UserListResponse
	if resp.StatusCode == http.StatusOK {
		ts.Require().NoError(json.NewDecoder(resp.Body).Decode(&listResp))
	}

	ids := make([]string, 0, len(listResp.Users))
	for _, u := range listResp.Users {
		ids = append(ids, u.ID)
	}
	return resp.StatusCode, ids, listResp
}

// TestListUsersScopedToOU verifies that scoping to an OU returns only that OU's users, leaving out
// users of its child OUs and of other OUs.
func (ts *UserOUScopeTestSuite) TestListUsersScopedToOU() {
	status, ids, listResp := ts.listUserIDs("&ouId=" + ts.rootOUID)

	ts.Require().Equal(http.StatusOK, status)
	ts.ElementsMatch([]string{ts.rootUserID}, ids)
	ts.Equal(1, listResp.TotalResults)
}

// TestListUsersScopedToChildOU verifies that scoping to a child OU returns only that OU's users.
func (ts *UserOUScopeTestSuite) TestListUsersScopedToChildOU() {
	status, ids, _ := ts.listUserIDs("&ouId=" + ts.childOUID)

	ts.Require().Equal(http.StatusOK, status)
	ts.ElementsMatch([]string{ts.childUserID}, ids)
}

// TestListUsersWithoutScope verifies that the listing is unchanged when no OU is given.
func (ts *UserOUScopeTestSuite) TestListUsersWithoutScope() {
	status, ids, _ := ts.listUserIDs("")

	ts.Require().Equal(http.StatusOK, status)
	ts.Subset(ids, []string{ts.rootUserID, ts.childUserID, ts.siblingUserID})
}

// TestListUsersScopedToUnknownOU verifies that scoping to an OU that does not exist is rejected.
func (ts *UserOUScopeTestSuite) TestListUsersScopedToUnknownOU() {
	status, _, _ := ts.listUserIDs("&ouId=00000000-0000-0000-0000-000000000000")

	ts.Equal(http.StatusNotFound, status)
}
