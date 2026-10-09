// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"errors"
	"testing"

	"github.com/stretchr/testify/suite"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// fakeStore is an in-memory projectStoreInterface for the service tests.
type fakeStore struct {
	projects map[string]Project
	err      error
}

func newFakeStore(projects ...Project) *fakeStore {
	s := &fakeStore{projects: map[string]Project{}}
	for _, p := range projects {
		s.projects[p.ID] = p
	}
	return s
}

func (f *fakeStore) CreateProject(_ context.Context, p Project) error {
	if f.err != nil {
		return f.err
	}
	f.projects[p.ID] = p
	return nil
}

func (f *fakeStore) GetProject(_ context.Context, id string) (Project, error) {
	if f.err != nil {
		return Project{}, f.err
	}
	p, ok := f.projects[id]
	if !ok {
		return Project{}, errProjectNotFound
	}
	return p, nil
}

func (f *fakeStore) GetProjectList(_ context.Context, limit, offset int) ([]Project, error) {
	if f.err != nil {
		return nil, f.err
	}
	list := make([]Project, 0, len(f.projects))
	for _, p := range f.projects {
		list = append(list, p)
	}
	if offset >= len(list) {
		return []Project{}, nil
	}
	end := offset + limit
	if end > len(list) {
		end = len(list)
	}
	return list[offset:end], nil
}

func (f *fakeStore) GetProjectListCount(_ context.Context) (int, error) {
	return len(f.projects), f.err
}

func (f *fakeStore) UpdateProject(_ context.Context, p Project) error {
	if f.err != nil {
		return f.err
	}
	if _, ok := f.projects[p.ID]; !ok {
		return errProjectNotFound
	}
	f.projects[p.ID] = p
	return nil
}

func (f *fakeStore) DeleteProject(_ context.Context, id string) error {
	if f.err != nil {
		return f.err
	}
	delete(f.projects, id)
	return nil
}

func (f *fakeStore) IsHandleTaken(_ context.Context, handle, exceptID string) (bool, error) {
	if f.err != nil {
		return false, f.err
	}
	for _, p := range f.projects {
		if p.Handle == handle && p.ID != exceptID {
			return true, nil
		}
	}
	return false, nil
}

type fakeUsageChecker struct {
	inUse bool
	err   error
}

func (c fakeUsageChecker) HasResourcesInProject(context.Context, string) (bool, error) {
	return c.inUse, c.err
}

type ProjectServiceTestSuite struct {
	suite.Suite
	ctx context.Context
}

func TestProjectServiceTestSuite(t *testing.T) {
	suite.Run(t, new(ProjectServiceTestSuite))
}

func (s *ProjectServiceTestSuite) SetupTest() {
	s.ctx = context.Background()
}

func (s *ProjectServiceTestSuite) newService(store projectStoreInterface) *projectService {
	svc := newProjectService(store)
	svc.uuidGenerator = func() (string, error) { return "prj-1", nil }
	return svc
}

func (s *ProjectServiceTestSuite) TestCreateProject() {
	store := newFakeStore()
	svc := s.newService(store)

	created, svcErr := svc.CreateProject(s.ctx, ProjectRequest{Name: " Finance ", Handle: "finance"})

	s.Nil(svcErr)
	s.Equal(Project{ID: "prj-1", Name: "Finance", Handle: "finance"}, *created)
	s.Contains(store.projects, "prj-1")
}

func (s *ProjectServiceTestSuite) TestCreateProject_Validation() {
	svc := s.newService(newFakeStore(Project{ID: "prj-0", Handle: "finance", Name: "Finance"}))

	cases := []struct {
		name    string
		request ProjectRequest
		code    string
	}{
		{"missing name", ProjectRequest{Handle: "hr"}, ErrorInvalidName.Code},
		{"invalid handle", ProjectRequest{Name: "HR", Handle: "Human Resources"}, ErrorInvalidHandle.Code},
		{"missing handle", ProjectRequest{Name: "HR"}, ErrorInvalidHandle.Code},
		{"taken handle", ProjectRequest{Name: "Finance 2", Handle: "finance"}, ErrorHandleConflict.Code},
	}
	for _, tc := range cases {
		s.Run(tc.name, func() {
			_, svcErr := svc.CreateProject(s.ctx, tc.request)
			s.Require().NotNil(svcErr)
			s.Equal(tc.code, svcErr.Code)
		})
	}
}

func (s *ProjectServiceTestSuite) TestCreateProject_StoreErrors() {
	store := newFakeStore()
	store.err = errors.New("db down")
	_, svcErr := s.newService(store).CreateProject(s.ctx, ProjectRequest{Name: "HR", Handle: "hr"})
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)

	svc := s.newService(newFakeStore())
	svc.uuidGenerator = func() (string, error) { return "", errors.New("no entropy") }
	_, svcErr = svc.CreateProject(s.ctx, ProjectRequest{Name: "HR", Handle: "hr"})
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)
}

func (s *ProjectServiceTestSuite) TestGetProject() {
	svc := s.newService(newFakeStore(Project{ID: "prj-1", Handle: "hr", Name: "HR"}))

	p, svcErr := svc.GetProject(s.ctx, "prj-1")
	s.Nil(svcErr)
	s.Equal("hr", p.Handle)

	_, svcErr = svc.GetProject(s.ctx, "missing")
	s.Equal(ErrorProjectNotFound.Code, svcErr.Code)
}

func (s *ProjectServiceTestSuite) TestGetProjectList() {
	svc := s.newService(newFakeStore(
		Project{ID: "prj-1", Handle: "hr", Name: "HR"},
		Project{ID: "prj-2", Handle: "finance", Name: "Finance"},
	))

	list, svcErr := svc.GetProjectList(s.ctx, 1, 0)
	s.Nil(svcErr)
	s.Equal(2, list.TotalResults)
	s.Equal(1, list.Count)
	s.Equal(1, list.StartIndex)

	for _, bad := range [][2]int{{0, 0}, {101, 0}, {10, -1}} {
		_, svcErr = svc.GetProjectList(s.ctx, bad[0], bad[1])
		s.Equal(ErrorInvalidPagination.Code, svcErr.Code)
	}
}

func (s *ProjectServiceTestSuite) TestUpdateProject() {
	store := newFakeStore(
		Project{ID: "prj-1", Handle: "hr", Name: "HR"},
		Project{ID: "prj-2", Handle: "finance", Name: "Finance"},
	)
	svc := s.newService(store)

	updated, svcErr := svc.UpdateProject(s.ctx, "prj-1", ProjectRequest{Name: "People", Handle: "hr"})
	s.Nil(svcErr)
	s.Equal("People", updated.Name)
	s.Equal("People", store.projects["prj-1"].Name)

	_, svcErr = svc.UpdateProject(s.ctx, "prj-1", ProjectRequest{Name: "People", Handle: "finance"})
	s.Equal(ErrorHandleConflict.Code, svcErr.Code)

	_, svcErr = svc.UpdateProject(s.ctx, "missing", ProjectRequest{Name: "X", Handle: "x"})
	s.Equal(ErrorProjectNotFound.Code, svcErr.Code)
}

func (s *ProjectServiceTestSuite) TestDeleteProject() {
	store := newFakeStore(Project{ID: "prj-1", Handle: "hr", Name: "HR"})
	svc := s.newService(store)
	svc.AddUsageChecker(fakeUsageChecker{})

	s.Nil(svc.DeleteProject(s.ctx, "prj-1"))
	s.NotContains(store.projects, "prj-1")

	s.Equal(ErrorProjectNotFound.Code, svc.DeleteProject(s.ctx, "prj-1").Code)
}

func (s *ProjectServiceTestSuite) TestDeleteProject_InUse() {
	store := newFakeStore(Project{ID: "prj-1", Handle: "hr", Name: "HR"})
	svc := s.newService(store)
	svc.AddUsageChecker(fakeUsageChecker{})
	svc.AddUsageChecker(fakeUsageChecker{inUse: true})

	s.Equal(ErrorProjectInUse.Code, svc.DeleteProject(s.ctx, "prj-1").Code)
	s.Contains(store.projects, "prj-1")

	failing := s.newService(store)
	failing.AddUsageChecker(fakeUsageChecker{err: errors.New("db down")})
	s.Equal(tidcommon.InternalServerError.Code, failing.DeleteProject(s.ctx, "prj-1").Code)
}

func (s *ProjectServiceTestSuite) TestIsProjectExists() {
	store := newFakeStore(Project{ID: "prj-1", Handle: "hr", Name: "HR"})
	svc := s.newService(store)

	exists, svcErr := svc.IsProjectExists(s.ctx, "prj-1")
	s.True(exists)
	s.Nil(svcErr)

	exists, svcErr = svc.IsProjectExists(s.ctx, "missing")
	s.False(exists)
	s.Nil(svcErr)

	store.err = errors.New("db down")
	_, svcErr = svc.IsProjectExists(s.ctx, "prj-1")
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)
}

func (s *ProjectServiceTestSuite) TestResolveProjectID() {
	svc := s.newService(newFakeStore(Project{ID: "prj-1", Handle: "hr", Name: "HR"}))

	cases := []struct {
		name        string
		checker     ExistenceChecker
		requested   string
		ouProjectID string
		want        string
		code        string
	}{
		{"organization unit project wins when none requested", svc, "", "prj-9", "prj-9", ""},
		{"matching request is accepted", svc, "prj-9", "prj-9", "prj-9", ""},
		{"request differing from the organization unit is rejected", svc, "prj-1", "prj-9", "",
			ErrorProjectMismatch.Code},
		{"organization level resource without a project", svc, "", "", "", ""},
		{"organization level resource joins an existing project", svc, "prj-1", "", "prj-1", ""},
		{"unknown project is rejected", svc, "missing", "", "", ErrorProjectNotFound.Code},
		{"no checker rejects a requested project", nil, "prj-1", "", "", ErrorProjectNotFound.Code},
	}
	for _, tc := range cases {
		s.Run(tc.name, func() {
			got, svcErr := ResolveProjectID(s.ctx, tc.checker, tc.requested, tc.ouProjectID)
			if tc.code != "" {
				s.Require().NotNil(svcErr)
				s.Equal(tc.code, svcErr.Code)
				return
			}
			s.Nil(svcErr)
			s.Equal(tc.want, got)
		})
	}
}
