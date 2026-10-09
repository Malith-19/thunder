// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package ou

import (
	"context"
	"errors"
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

type fakeProjectResolver struct {
	known map[string]bool
	err   *tidcommon.ServiceError
}

func (r fakeProjectResolver) IsProjectExists(_ context.Context, id string) (bool, *tidcommon.ServiceError) {
	return r.known[id], r.err
}

type OUProjectTestSuite struct {
	suite.Suite
	ctx context.Context
}

func TestOUProjectTestSuite(t *testing.T) {
	suite.Run(t, new(OUProjectTestSuite))
}

func (s *OUProjectTestSuite) SetupTest() {
	s.ctx = context.Background()
}

func (s *OUProjectTestSuite) service(store organizationUnitStoreInterface) *organizationUnitService {
	svc := &organizationUnitService{ouStore: store}
	svc.SetProjectResolver(fakeProjectResolver{known: map[string]bool{"prj-1": true}})
	return svc
}

func (s *OUProjectTestSuite) TestResolveProjectID_Root() {
	svc := s.service(newOrganizationUnitStoreInterfaceMock(s.T()))

	got, svcErr := svc.resolveProjectID(s.ctx, "", nil)
	s.Nil(svcErr)
	s.Empty(got)

	got, svcErr = svc.resolveProjectID(s.ctx, "prj-1", nil)
	s.Nil(svcErr)
	s.Equal("prj-1", got)

	_, svcErr = svc.resolveProjectID(s.ctx, "missing", nil)
	s.Equal(ErrorInvalidProject.Code, svcErr.Code)
}

func (s *OUProjectTestSuite) TestResolveProjectID_ResolverErrors() {
	svc := &organizationUnitService{ouStore: newOrganizationUnitStoreInterfaceMock(s.T())}
	_, svcErr := svc.resolveProjectID(s.ctx, "prj-1", nil)
	s.Equal(ErrorInvalidProject.Code, svcErr.Code)

	svc.SetProjectResolver(fakeProjectResolver{err: &tidcommon.InternalServerError})
	_, svcErr = svc.resolveProjectID(s.ctx, "prj-1", nil)
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)
}

func (s *OUProjectTestSuite) TestResolveProjectID_ChildInheritsParentProject() {
	parent := "ou-parent"
	store := newOrganizationUnitStoreInterfaceMock(s.T())
	store.On("GetOrganizationUnit", mock.Anything, parent).
		Return(OrganizationUnit{ID: parent, ProjectID: "prj-1"}, nil)
	svc := s.service(store)

	got, svcErr := svc.resolveProjectID(s.ctx, "", &parent)
	s.Nil(svcErr)
	s.Equal("prj-1", got)

	got, svcErr = svc.resolveProjectID(s.ctx, "prj-1", &parent)
	s.Nil(svcErr)
	s.Equal("prj-1", got)

	_, svcErr = svc.resolveProjectID(s.ctx, "prj-2", &parent)
	s.Equal(ErrorProjectMismatch.Code, svcErr.Code)
}

func (s *OUProjectTestSuite) TestResolveProjectID_ParentLookupFails() {
	missing, broken := "ou-missing", "ou-broken"
	store := newOrganizationUnitStoreInterfaceMock(s.T())
	store.On("GetOrganizationUnit", mock.Anything, missing).Return(OrganizationUnit{}, ErrOrganizationUnitNotFound)
	store.On("GetOrganizationUnit", mock.Anything, broken).Return(OrganizationUnit{}, errors.New("db down"))
	svc := s.service(store)

	_, svcErr := svc.resolveProjectID(s.ctx, "", &missing)
	s.Equal(ErrorParentOrganizationUnitNotFound.Code, svcErr.Code)

	_, svcErr = svc.resolveProjectID(s.ctx, "", &broken)
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)
}

func (s *OUProjectTestSuite) TestProjectUsageChecker() {
	svc := NewOrganizationUnitServiceInterfaceMock(s.T())
	svc.On("GetOrganizationUnitList", mock.Anything, 1, 0, mock.MatchedBy(func(f *tidcommon.FilterGroup) bool {
		return f.Clauses[0].Expr.Attribute == "projectId" && f.Clauses[0].Expr.Value == "prj-1"
	})).Return(&OrganizationUnitListResponse{TotalResults: 1}, nil).Once()
	svc.On("GetOrganizationUnitList", mock.Anything, 1, 0, mock.Anything).
		Return(nil, &tidcommon.InternalServerError).Once()

	checker := NewProjectUsageChecker(svc)

	inUse, err := checker.HasResourcesInProject(s.ctx, "prj-1")
	s.NoError(err)
	s.True(inUse)

	_, err = checker.HasResourcesInProject(s.ctx, "prj-2")
	s.Error(err)
}

func (s *OUProjectTestSuite) TestFileFilterMatchesProject() {
	g := &tidcommon.FilterGroup{Clauses: []tidcommon.FilterClause{{
		Expr: tidcommon.FilterExpression{Attribute: "projectId", Operator: tidcommon.OperatorEq, Value: "prj-1"},
	}}}
	s.True(matchesOUBasicFilter(OrganizationUnitBasic{ProjectID: "prj-1"}, g))
	s.False(matchesOUBasicFilter(OrganizationUnitBasic{ProjectID: "prj-2"}, g))
}
