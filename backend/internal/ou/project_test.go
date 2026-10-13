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

	"github.com/thunder-id/thunderid/internal/project"
	"github.com/thunder-id/thunderid/internal/system/log"
)

// fakeProjectResolver stands in for the project service: an owner's project wins,
// a known project is accepted and nothing falls back to "prj-default".
type fakeProjectResolver struct {
	known map[string]bool
	err   *tidcommon.ServiceError
}

func (r fakeProjectResolver) ResolveProjectID(
	_ context.Context, requested, ownerProjectID string,
) (string, *tidcommon.ServiceError) {
	if r.err != nil {
		return "", r.err
	}
	if ownerProjectID != "" {
		if requested != "" && requested != ownerProjectID {
			return "", &project.ErrorProjectMismatch
		}
		return ownerProjectID, nil
	}
	if requested == "" {
		return "prj-default", nil
	}
	if !r.known[requested] {
		return "", &project.ErrorProjectNotFound
	}
	return requested, nil
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

// withProjects returns a service with a project resolver, as the servers wire it.
func (s *OUProjectTestSuite) withProjects(store organizationUnitStoreInterface) *organizationUnitService {
	svc := &organizationUnitService{ouStore: store}
	svc.SetProjectResolver(fakeProjectResolver{known: map[string]bool{"prj-1": true}})
	return svc
}

func (s *OUProjectTestSuite) TestResolveProjectID_Root() {
	svc := s.withProjects(newOrganizationUnitStoreInterfaceMock(s.T()))

	got, svcErr := svc.resolveProjectID(s.ctx, "", nil)
	s.Nil(svcErr)
	s.Equal("prj-default", got)

	got, svcErr = svc.resolveProjectID(s.ctx, "prj-1", nil)
	s.Nil(svcErr)
	s.Equal("prj-1", got)

	_, svcErr = svc.resolveProjectID(s.ctx, "missing", nil)
	s.Equal(project.ErrorProjectNotFound.Code, svcErr.Code)

	svc.SetProjectResolver(fakeProjectResolver{err: &tidcommon.InternalServerError})
	_, svcErr = svc.resolveProjectID(s.ctx, "prj-1", nil)
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)
}

func (s *OUProjectTestSuite) TestResolveProjectID_WithoutResolver() {
	parent := "ou-parent"
	store := newOrganizationUnitStoreInterfaceMock(s.T())
	store.On("GetOrganizationUnit", mock.Anything, parent).
		Return(OrganizationUnit{ID: parent, ProjectID: "prj-1"}, nil)
	svc := &organizationUnitService{ouStore: store}

	got, svcErr := svc.resolveProjectID(s.ctx, "", nil)
	s.Nil(svcErr)
	s.Empty(got)

	got, svcErr = svc.resolveProjectID(s.ctx, "anything", nil)
	s.Nil(svcErr)
	s.Equal("anything", got)

	got, svcErr = svc.resolveProjectID(s.ctx, "", &parent)
	s.Nil(svcErr)
	s.Equal("prj-1", got)
}

func (s *OUProjectTestSuite) TestResolveProjectID_ChildInheritsParentProject() {
	parent := "ou-parent"
	store := newOrganizationUnitStoreInterfaceMock(s.T())
	store.On("GetOrganizationUnit", mock.Anything, parent).
		Return(OrganizationUnit{ID: parent, ProjectID: "prj-1"}, nil)
	svc := s.withProjects(store)

	got, svcErr := svc.resolveProjectID(s.ctx, "", &parent)
	s.Nil(svcErr)
	s.Equal("prj-1", got)

	got, svcErr = svc.resolveProjectID(s.ctx, "prj-1", &parent)
	s.Nil(svcErr)
	s.Equal("prj-1", got)

	_, svcErr = svc.resolveProjectID(s.ctx, "prj-2", &parent)
	s.Equal(project.ErrorProjectMismatch.Code, svcErr.Code)
}

func (s *OUProjectTestSuite) TestResolveProjectID_ParentLookupFails() {
	missing, broken := "ou-missing", "ou-broken"
	store := newOrganizationUnitStoreInterfaceMock(s.T())
	store.On("GetOrganizationUnit", mock.Anything, missing).Return(OrganizationUnit{}, ErrOrganizationUnitNotFound)
	store.On("GetOrganizationUnit", mock.Anything, broken).Return(OrganizationUnit{}, errors.New("db down"))
	svc := s.withProjects(store)

	_, svcErr := svc.resolveProjectID(s.ctx, "", &missing)
	s.Equal(ErrorParentOrganizationUnitNotFound.Code, svcErr.Code)

	_, svcErr = svc.resolveProjectID(s.ctx, "", &broken)
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)
}

func (s *OUProjectTestSuite) TestResolveUpdatedProjectID_WithResolver() {
	sameProject, otherProject, broken := "ou-same", "ou-other", "ou-broken"
	store := newOrganizationUnitStoreInterfaceMock(s.T())
	store.On("GetOrganizationUnit", mock.Anything, sameProject).
		Return(OrganizationUnit{ID: sameProject, ProjectID: "prj-1"}, nil)
	store.On("GetOrganizationUnit", mock.Anything, otherProject).
		Return(OrganizationUnit{ID: otherProject, ProjectID: "prj-2"}, nil)
	store.On("GetOrganizationUnit", mock.Anything, broken).Return(OrganizationUnit{}, errors.New("db down"))
	svc := s.withProjects(store)
	existing := OrganizationUnit{ID: "ou-1", ProjectID: "prj-1"}
	logger := log.GetLogger()

	got, svcErr := svc.resolveUpdatedProjectID(s.ctx, existing, OrganizationUnitRequestWithID{}, logger)
	s.Nil(svcErr)
	s.Equal("prj-1", got)

	got, svcErr = svc.resolveUpdatedProjectID(s.ctx, existing,
		OrganizationUnitRequestWithID{ProjectID: "prj-1", Parent: &sameProject}, logger)
	s.Nil(svcErr)
	s.Equal("prj-1", got)

	_, svcErr = svc.resolveUpdatedProjectID(s.ctx, existing, OrganizationUnitRequestWithID{ProjectID: "prj-2"}, logger)
	s.Equal(ErrorProjectChangeNotAllowed.Code, svcErr.Code)

	_, svcErr = svc.resolveUpdatedProjectID(s.ctx, existing,
		OrganizationUnitRequestWithID{Parent: &otherProject}, logger)
	s.Equal(project.ErrorProjectMismatch.Code, svcErr.Code)

	_, svcErr = svc.resolveUpdatedProjectID(s.ctx, existing, OrganizationUnitRequestWithID{Parent: &broken}, logger)
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)
}

func (s *OUProjectTestSuite) TestResolveUpdatedProjectID_WithoutResolver() {
	svc := &organizationUnitService{ouStore: newOrganizationUnitStoreInterfaceMock(s.T())}
	existing := OrganizationUnit{ID: "ou-1", ProjectID: "prj-1"}
	logger := log.GetLogger()

	got, svcErr := svc.resolveUpdatedProjectID(s.ctx, existing, OrganizationUnitRequestWithID{}, logger)
	s.Nil(svcErr)
	s.Equal("prj-1", got)

	got, svcErr = svc.resolveUpdatedProjectID(s.ctx, existing,
		OrganizationUnitRequestWithID{ProjectID: "prj-2"}, logger)
	s.Nil(svcErr)
	s.Equal("prj-2", got, "without a project resolver the project ID is kept as given")
}

func (s *OUProjectTestSuite) TestGetOrganizationUnitIDsByProject() {
	isProjectFilter := func(f *tidcommon.FilterGroup) bool {
		return f != nil && f.Clauses[0].Expr.Attribute == "projectId" && f.Clauses[0].Expr.Value == "prj-1"
	}
	store := newOrganizationUnitStoreInterfaceMock(s.T())
	store.On("GetOrganizationUnitList", mock.Anything, hierarchyPageSize, 0, mock.MatchedBy(isProjectFilter)).
		Return([]OrganizationUnitBasic{{ID: "ou-root"}}, nil)
	store.On("GetOrganizationUnitChildrenList", mock.Anything, "ou-root", hierarchyPageSize, 0,
		(*tidcommon.FilterGroup)(nil)).Return([]OrganizationUnitBasic{{ID: "ou-child"}}, nil)
	store.On("GetOrganizationUnitChildrenList", mock.Anything, "ou-child", hierarchyPageSize, 0,
		(*tidcommon.FilterGroup)(nil)).Return([]OrganizationUnitBasic{}, nil)
	svc := &organizationUnitService{ouStore: store}

	ids, svcErr := svc.GetOrganizationUnitIDsByProject(s.ctx, "prj-1")
	s.Nil(svcErr)
	s.Equal([]string{"ou-root", "ou-child"}, ids)

	ids, svcErr = svc.GetOrganizationUnitIDsByProject(s.ctx, "")
	s.Nil(svcErr)
	s.Empty(ids)
}

func (s *OUProjectTestSuite) TestGetOrganizationUnitIDsByProject_StoreError() {
	store := newOrganizationUnitStoreInterfaceMock(s.T())
	store.On("GetOrganizationUnitList", mock.Anything, hierarchyPageSize, 0, mock.Anything).
		Return(nil, errors.New("db down"))
	svc := &organizationUnitService{ouStore: store}

	_, svcErr := svc.GetOrganizationUnitIDsByProject(s.ctx, "prj-1")
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
