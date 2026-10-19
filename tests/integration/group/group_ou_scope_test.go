// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package group

import (
	"encoding/json"
	"net/http"
	"testing"

	"github.com/stretchr/testify/suite"
	"github.com/thunder-id/thunderid/tests/integration/testutils"
)

const (
	groupOUScopeRootHandle    = "group-ou-scope-root"
	groupOUScopeChildHandle   = "group-ou-scope-child"
	groupOUScopeSiblingHandle = "group-ou-scope-sibling"
)

// GroupOUScopeTestSuite covers scoping the group listing to the groups of one organization unit.
type GroupOUScopeTestSuite struct {
	suite.Suite

	rootOUID    string
	childOUID   string
	siblingOUID string

	rootGroupID    string
	childGroupID   string
	siblingGroupID string
}

func TestGroupOUScopeTestSuite(t *testing.T) {
	suite.Run(t, new(GroupOUScopeTestSuite))
}

func (ts *GroupOUScopeTestSuite) SetupSuite() {
	rootOUID, err := testutils.CreateOrganizationUnit(testutils.OrganizationUnit{
		Handle: groupOUScopeRootHandle,
		Name:   "Group OU Scope Root",
	})
	ts.Require().NoError(err, "create root OU")
	ts.rootOUID = rootOUID

	childOUID, err := testutils.CreateOrganizationUnit(testutils.OrganizationUnit{
		Handle: groupOUScopeChildHandle,
		Name:   "Group OU Scope Child",
		Parent: &ts.rootOUID,
	})
	ts.Require().NoError(err, "create child OU")
	ts.childOUID = childOUID

	siblingOUID, err := testutils.CreateOrganizationUnit(testutils.OrganizationUnit{
		Handle: groupOUScopeSiblingHandle,
		Name:   "Group OU Scope Sibling",
	})
	ts.Require().NoError(err, "create sibling OU")
	ts.siblingOUID = siblingOUID

	ts.rootGroupID = ts.createGroup(ts.rootOUID, "Root Group")
	ts.childGroupID = ts.createGroup(ts.childOUID, "Child Group")
	ts.siblingGroupID = ts.createGroup(ts.siblingOUID, "Sibling Group")
}

func (ts *GroupOUScopeTestSuite) TearDownSuite() {
	for _, id := range []string{ts.rootGroupID, ts.childGroupID, ts.siblingGroupID} {
		if id != "" {
			_ = testutils.DeleteGroup(id)
		}
	}
	for _, id := range []string{ts.childOUID, ts.rootOUID, ts.siblingOUID} {
		if id != "" {
			_ = testutils.DeleteOrganizationUnit(id)
		}
	}
}

func (ts *GroupOUScopeTestSuite) createGroup(ouID, name string) string {
	groupID, err := testutils.CreateGroup(testutils.Group{Name: name, OUID: ouID})
	ts.Require().NoError(err, "create group %q", name)
	return groupID
}

func (ts *GroupOUScopeTestSuite) listGroupIDs(query string) (int, []string, GroupListResponse) {
	resp, err := testutils.GetHTTPClient().Get(testutils.TestServerURL + "/groups?limit=100" + query)
	ts.Require().NoError(err)
	defer resp.Body.Close()

	var listResp GroupListResponse
	if resp.StatusCode == http.StatusOK {
		ts.Require().NoError(json.NewDecoder(resp.Body).Decode(&listResp))
	}

	ids := make([]string, 0, len(listResp.Groups))
	for _, g := range listResp.Groups {
		ids = append(ids, g.Id)
	}
	return resp.StatusCode, ids, listResp
}

// TestListGroupsScopedToOU verifies that scoping to an OU returns only that OU's groups, leaving out
// groups of its child OUs and of other OUs.
func (ts *GroupOUScopeTestSuite) TestListGroupsScopedToOU() {
	status, ids, listResp := ts.listGroupIDs("&ouId=" + ts.rootOUID)

	ts.Require().Equal(http.StatusOK, status)
	ts.ElementsMatch([]string{ts.rootGroupID}, ids)
	ts.Equal(1, listResp.TotalResults)
}

// TestListGroupsScopedToChildOU verifies that scoping to a child OU returns only that OU's groups.
func (ts *GroupOUScopeTestSuite) TestListGroupsScopedToChildOU() {
	status, ids, _ := ts.listGroupIDs("&ouId=" + ts.childOUID)

	ts.Require().Equal(http.StatusOK, status)
	ts.ElementsMatch([]string{ts.childGroupID}, ids)
}

// TestListGroupsWithoutScope verifies that the listing is unchanged when no OU is given.
func (ts *GroupOUScopeTestSuite) TestListGroupsWithoutScope() {
	status, ids, _ := ts.listGroupIDs("")

	ts.Require().Equal(http.StatusOK, status)
	ts.Subset(ids, []string{ts.rootGroupID, ts.childGroupID, ts.siblingGroupID})
}

// TestListGroupsScopedToUnknownOU verifies that scoping to an OU that does not exist is rejected.
func (ts *GroupOUScopeTestSuite) TestListGroupsScopedToUnknownOU() {
	status, _, _ := ts.listGroupIDs("&ouId=00000000-0000-0000-0000-000000000000")

	ts.Equal(http.StatusBadRequest, status)
}
