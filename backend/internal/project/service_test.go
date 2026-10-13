// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"errors"
	"fmt"
	"testing"

	"github.com/stretchr/testify/suite"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// fakeStore is an in-memory projectStoreInterface for the service tests.
type fakeStore struct {
	projects map[string]Project
	err      error
	// assignedTo records the project the unassigned resources were moved into.
	assignedTo string
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

func (f *fakeStore) GetProjectByHandle(_ context.Context, handle string) (Project, error) {
	if f.err != nil {
		return Project{}, f.err
	}
	for _, p := range f.projects {
		if p.Handle == handle {
			return p, nil
		}
	}
	return Project{}, errProjectNotFound
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

func (f *fakeStore) AssignUnassignedResources(_ context.Context, projectID string) error {
	if f.err != nil {
		return f.err
	}
	f.assignedTo = projectID
	return nil
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

// sequentialIDs returns a generator of the IDs prefix-1, prefix-2, and so on.
func sequentialIDs(prefix string) func() (string, error) {
	next := 0
	return func() (string, error) {
		next++
		return fmt.Sprintf("%s-%d", prefix, next), nil
	}
}

func (s *ProjectServiceTestSuite) newService(store projectStoreInterface) *projectService {
	svc := newProjectService(store)
	svc.uuidGenerator = sequentialIDs("new")
	return svc
}

func (s *ProjectServiceTestSuite) TestCreateProject() {
	store := newFakeStore()
	svc := s.newService(store)

	created, svcErr := svc.CreateProject(s.ctx, ProjectRequest{Name: " Finance ", Handle: "finance"})

	s.Nil(svcErr)
	s.Equal(Project{ID: "new-2", Name: "Finance", Handle: "finance"}, *created)
	s.Contains(store.projects, "new-2")
	s.Equal(Project{ID: "new-1", Name: "Default", Handle: DefaultProjectHandle, IsDefault: true},
		store.projects["new-1"])
}

func (s *ProjectServiceTestSuite) TestCreateProject_DefaultHandleIsTaken() {
	svc := s.newService(newFakeStore())

	_, svcErr := svc.CreateProject(s.ctx, ProjectRequest{Name: "Mine", Handle: DefaultProjectHandle})

	s.Require().NotNil(svcErr)
	s.Equal(ErrorHandleConflict.Code, svcErr.Code)
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
	s.Equal(3, list.TotalResults, "the default project is created on first use")
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

func (s *ProjectServiceTestSuite) TestUpdateProject_Default() {
	store := newFakeStore(Project{ID: "prj-0", Handle: DefaultProjectHandle, Name: "Default", IsDefault: true})
	svc := s.newService(store)

	updated, svcErr := svc.UpdateProject(s.ctx, "prj-0", ProjectRequest{Name: "Shared", Handle: DefaultProjectHandle})
	s.Nil(svcErr)
	s.True(updated.IsDefault)
	s.Equal("Shared", store.projects["prj-0"].Name)

	_, svcErr = svc.UpdateProject(s.ctx, "prj-0", ProjectRequest{Name: "Shared", Handle: "shared"})
	s.Equal(ErrorDefaultProjectProtected.Code, svcErr.Code)
}

func (s *ProjectServiceTestSuite) TestDeleteProject() {
	store := newFakeStore(Project{ID: "prj-1", Handle: "hr", Name: "HR"})
	svc := s.newService(store)
	svc.AddUsageChecker(fakeUsageChecker{})

	s.Nil(svc.DeleteProject(s.ctx, "prj-1"))
	s.NotContains(store.projects, "prj-1")

	s.Equal(ErrorProjectNotFound.Code, svc.DeleteProject(s.ctx, "prj-1").Code)
}

func (s *ProjectServiceTestSuite) TestDeleteProject_Default() {
	store := newFakeStore(Project{ID: "prj-0", Handle: DefaultProjectHandle, Name: "Default", IsDefault: true})

	s.Equal(ErrorDefaultProjectProtected.Code, s.newService(store).DeleteProject(s.ctx, "prj-0").Code)
	s.Contains(store.projects, "prj-0")
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
	store := newFakeStore(Project{ID: "prj-0", Handle: "hr", Name: "HR"})
	svc := s.newService(store)

	cases := []struct {
		name      string
		requested string
		owner     string
		want      string
		code      string
	}{
		{"owner project wins when none requested", "", "prj-9", "prj-9", ""},
		{"request matching the owner is accepted", "prj-9", "prj-9", "prj-9", ""},
		{"request differing from the owner is rejected", "prj-0", "prj-9", "", ErrorProjectMismatch.Code},
		{"requested project without an owner", "prj-0", "", "prj-0", ""},
		{"unknown project is rejected", "missing", "", "", ErrorProjectNotFound.Code},
		{"neither falls back to the default project", "", "", "new-1", ""},
	}
	for _, tc := range cases {
		s.Run(tc.name, func() {
			got, svcErr := ResolveProjectID(s.ctx, svc, tc.requested, tc.owner)
			if tc.code != "" {
				s.Require().NotNil(svcErr)
				s.Equal(tc.code, svcErr.Code)
				return
			}
			s.Nil(svcErr)
			s.Equal(tc.want, got)
		})
	}

	again, svcErr := svc.ResolveProjectID(s.ctx, "", "")
	s.Nil(svcErr)
	s.Equal("new-1", again, "the default project is created once")
}

func (s *ProjectServiceTestSuite) TestResolveProjectID_Label() {
	got, svcErr := ResolveProjectID(s.ctx, nil, "prj-1", "prj-9")
	s.Nil(svcErr)
	s.Equal("prj-1", got, "without a resolver the project ID is kept as given")

	got, svcErr = ResolveProjectID(s.ctx, nil, "", "prj-9")
	s.Nil(svcErr)
	s.Equal("prj-9", got)

	got, svcErr = ResolveProjectID(s.ctx, nil, "", "")
	s.Nil(svcErr)
	s.Empty(got)
}

func (s *ProjectServiceTestSuite) TestResolveProjectID_StoreErrors() {
	store := newFakeStore()
	store.err = errors.New("db down")
	svc := s.newService(store)

	_, svcErr := svc.ResolveProjectID(s.ctx, "", "")
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)

	_, svcErr = svc.ResolveProjectID(s.ctx, "prj-1", "")
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)

	svc = s.newService(newFakeStore())
	svc.uuidGenerator = func() (string, error) { return "", errors.New("no entropy") }
	_, svcErr = svc.ResolveProjectID(s.ctx, "", "")
	s.Equal(tidcommon.InternalServerError.Code, svcErr.Code)
}

func (s *ProjectServiceTestSuite) TestAssignUnassignedToDefault_CreatesTheDefaultProject() {
	store := newFakeStore()
	svc := s.newService(store)

	s.Require().NoError(svc.AssignUnassignedToDefault(context.Background()))

	defaultProject, err := store.GetProjectByHandle(context.Background(), DefaultProjectHandle)
	s.Require().NoError(err)
	s.Equal(defaultProject.ID, store.assignedTo)
}

func (s *ProjectServiceTestSuite) TestAssignUnassignedToDefault_ExistingDefaultProject() {
	store := newFakeStore(Project{ID: "prj-default", Handle: DefaultProjectHandle, Name: "Default"})
	svc := s.newService(store)

	s.Require().NoError(svc.AssignUnassignedToDefault(context.Background()))
	s.Equal("prj-default", store.assignedTo)
}

func (s *ProjectServiceTestSuite) TestAssignUnassignedToDefault_StoreError() {
	store := newFakeStore()
	store.err = errors.New("db down")
	svc := s.newService(store)

	s.Error(svc.AssignUnassignedToDefault(context.Background()))
	s.Empty(store.assignedTo)
}
