// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package ou

import (
	"context"
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/thunder-id/thunderid/internal/system/sysauthz"
)

type ScopeToSubtreeTestSuite struct {
	suite.Suite
}

func TestScopeToSubtreeTestSuite(t *testing.T) {
	suite.Run(t, new(ScopeToSubtreeTestSuite))
}

func (suite *ScopeToSubtreeTestSuite) TestEmptyOUIDLeavesAccessUnchanged() {
	ouService := NewOrganizationUnitServiceInterfaceMock(suite.T())
	accessible := &sysauthz.AccessibleResources{IDs: []string{"ou-1"}}

	scoped, svcErr := ScopeToSubtree(context.Background(), ouService, accessible, "")

	suite.Nil(svcErr)
	suite.Same(accessible, scoped)
	ouService.AssertNotCalled(suite.T(), "GetOrganizationUnitSubtreeIDs")
}

func (suite *ScopeToSubtreeTestSuite) TestEmptyOUIDWithNilAccessReturnsNil() {
	ouService := NewOrganizationUnitServiceInterfaceMock(suite.T())

	scoped, svcErr := ScopeToSubtree(context.Background(), ouService, nil, "")

	suite.Nil(svcErr)
	suite.Nil(scoped)
}

func (suite *ScopeToSubtreeTestSuite) TestNilAccessReturnsSubtree() {
	ouService := NewOrganizationUnitServiceInterfaceMock(suite.T())
	ouService.EXPECT().GetOrganizationUnitSubtreeIDs(context.Background(), "root").
		Return([]string{"root", "child"}, nil).Once()

	scoped, svcErr := ScopeToSubtree(context.Background(), ouService, nil, "root")

	suite.Nil(svcErr)
	suite.Require().NotNil(scoped)
	suite.False(scoped.AllAllowed)
	suite.Equal([]string{"root", "child"}, scoped.IDs)
}

func (suite *ScopeToSubtreeTestSuite) TestAllAllowedReturnsSubtree() {
	ouService := NewOrganizationUnitServiceInterfaceMock(suite.T())
	ouService.EXPECT().GetOrganizationUnitSubtreeIDs(context.Background(), "root").
		Return([]string{"root", "child"}, nil).Once()

	scoped, svcErr := ScopeToSubtree(context.Background(), ouService,
		&sysauthz.AccessibleResources{AllAllowed: true}, "root")

	suite.Nil(svcErr)
	suite.Require().NotNil(scoped)
	suite.False(scoped.AllAllowed)
	suite.Equal([]string{"root", "child"}, scoped.IDs)
}

func (suite *ScopeToSubtreeTestSuite) TestRestrictedAccessIntersectsSubtree() {
	ouService := NewOrganizationUnitServiceInterfaceMock(suite.T())
	ouService.EXPECT().GetOrganizationUnitSubtreeIDs(context.Background(), "root").
		Return([]string{"root", "child-a", "child-b"}, nil).Once()

	scoped, svcErr := ScopeToSubtree(context.Background(), ouService,
		&sysauthz.AccessibleResources{IDs: []string{"child-b", "outside", "child-a"}}, "root")

	suite.Nil(svcErr)
	suite.Require().NotNil(scoped)
	suite.False(scoped.AllAllowed)
	suite.Equal([]string{"child-a", "child-b"}, scoped.IDs)
}

func (suite *ScopeToSubtreeTestSuite) TestRestrictedAccessOutsideSubtreeReturnsEmpty() {
	ouService := NewOrganizationUnitServiceInterfaceMock(suite.T())
	ouService.EXPECT().GetOrganizationUnitSubtreeIDs(context.Background(), "root").
		Return([]string{"root"}, nil).Once()

	scoped, svcErr := ScopeToSubtree(context.Background(), ouService,
		&sysauthz.AccessibleResources{IDs: []string{"outside"}}, "root")

	suite.Nil(svcErr)
	suite.Require().NotNil(scoped)
	suite.NotNil(scoped.IDs)
	suite.Empty(scoped.IDs)
}

func (suite *ScopeToSubtreeTestSuite) TestSubtreeErrorIsReturned() {
	ouService := NewOrganizationUnitServiceInterfaceMock(suite.T())
	ouService.EXPECT().GetOrganizationUnitSubtreeIDs(context.Background(), "missing").
		Return(nil, &ErrorOrganizationUnitNotFound).Once()

	scoped, svcErr := ScopeToSubtree(context.Background(), ouService,
		&sysauthz.AccessibleResources{AllAllowed: true}, "missing")

	suite.Nil(scoped)
	suite.Require().NotNil(svcErr)
	suite.Equal(ErrorOrganizationUnitNotFound.Code, svcErr.Code)
}
