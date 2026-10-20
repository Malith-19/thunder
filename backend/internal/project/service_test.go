// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"errors"
	"testing"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"github.com/stretchr/testify/require"

	"github.com/thunder-id/thunderid/internal/ou"
)

type memoryStore struct {
	projects  map[string]Project
	createErr error
}

func newMemoryStore() *memoryStore {
	return &memoryStore{projects: map[string]Project{}}
}

func (m *memoryStore) Create(_ context.Context, project Project) error {
	if m.createErr != nil {
		return m.createErr
	}
	m.projects[project.ID] = project
	return nil
}

func (m *memoryStore) GetByID(_ context.Context, id string) (*Project, error) {
	if project, ok := m.projects[id]; ok {
		return &project, nil
	}
	return nil, nil
}

func (m *memoryStore) GetByHandle(_ context.Context, handle string) (*Project, error) {
	for _, project := range m.projects {
		if project.Handle == handle {
			return &project, nil
		}
	}
	return nil, nil
}

func (m *memoryStore) List(context.Context, int, int) ([]Project, error) {
	projects := make([]Project, 0, len(m.projects))
	for _, project := range m.projects {
		projects = append(projects, project)
	}
	return projects, nil
}

func (m *memoryStore) Count(context.Context) (int, error) {
	return len(m.projects), nil
}

type stubOUService struct {
	created []string
	deleted []string
	exists  map[string]bool
}

func (s *stubOUService) CreateOrganizationUnit(_ context.Context, request ou.OrganizationUnitRequestWithID) (
	ou.OrganizationUnit, *tidcommon.ServiceError) {
	s.created = append(s.created, request.ID)
	return ou.OrganizationUnit{ID: request.ID, Handle: request.Handle, Name: request.Name}, nil
}

func (s *stubOUService) IsOrganizationUnitExists(_ context.Context, id string) (bool, *tidcommon.ServiceError) {
	return s.exists[id], nil
}

func (s *stubOUService) DeleteOrganizationUnit(_ context.Context, id string) *tidcommon.ServiceError {
	s.deleted = append(s.deleted, id)
	return nil
}

func TestCreateProject_CreatesRootOU(t *testing.T) {
	store, ous := newMemoryStore(), &stubOUService{}
	service := newService(store, ous)

	project, svcErr := service.CreateProject(context.Background(),
		CreateProjectRequest{Handle: "car-insurance", Name: "Car Insurance"})

	require.Nil(t, svcErr)
	require.NotEmpty(t, project.ID)
	require.Len(t, ous.created, 1)
	require.Equal(t, ous.created[0], project.RootOUID)
	require.NotEqual(t, project.ID, project.RootOUID)
}

func TestCreateProject_KeepsSuppliedID(t *testing.T) {
	service := newService(newMemoryStore(), &stubOUService{})
	id := "0193a5c3-1b2d-7c4e-8f5a-6b7c8d9e0f12"

	project, svcErr := service.CreateProject(context.Background(),
		CreateProjectRequest{ID: id, Handle: "car-insurance", Name: "Car Insurance"})

	require.Nil(t, svcErr)
	require.Equal(t, id, project.ID)
}

func TestCreateProject_Refusals(t *testing.T) {
	existingID := "0193a5c3-1b2d-7c4e-8f5a-6b7c8d9e0f12"
	ouID := "0193a5c3-1b2d-7c4e-8f5a-6b7c8d9e0f13"

	tests := []struct {
		name     string
		request  CreateProjectRequest
		wantCode string
	}{
		{name: "missing name", request: CreateProjectRequest{Handle: "a"}, wantCode: ErrorInvalidRequestFormat.Code},
		{name: "handle with a slash", request: CreateProjectRequest{Handle: "a/b", Name: "A"},
			wantCode: ErrorInvalidRequestFormat.Code},
		{name: "ID that is not a UUID", request: CreateProjectRequest{ID: "abc", Handle: "a", Name: "A"},
			wantCode: ErrorInvalidProjectID.Code},
		{name: "duplicate handle", request: CreateProjectRequest{Handle: "taken", Name: "A"},
			wantCode: ErrorHandleConflict.Code},
		{name: "ID used by a project", request: CreateProjectRequest{ID: existingID, Handle: "a", Name: "A"},
			wantCode: ErrorIDConflict.Code},
		{name: "ID used by an organization unit", request: CreateProjectRequest{ID: ouID, Handle: "a", Name: "A"},
			wantCode: ErrorIDConflict.Code},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			store := newMemoryStore()
			store.projects[existingID] = Project{ID: existingID, Handle: "taken"}
			ous := &stubOUService{exists: map[string]bool{ouID: true}}

			project, svcErr := newService(store, ous).CreateProject(context.Background(), tc.request)

			require.Nil(t, project)
			require.NotNil(t, svcErr)
			require.Equal(t, tc.wantCode, svcErr.Code)
			require.Empty(t, ous.created)
		})
	}
}

func TestCreateProject_RemovesRootWhenProjectIsNotRecorded(t *testing.T) {
	store, ous := newMemoryStore(), &stubOUService{}
	store.createErr = errors.New("insert failed")

	project, svcErr := newService(store, ous).CreateProject(context.Background(),
		CreateProjectRequest{Handle: "car-insurance", Name: "Car Insurance"})

	require.Nil(t, project)
	require.Equal(t, tidcommon.InternalServerError.Code, svcErr.Code)
	require.Equal(t, ous.created, ous.deleted)
}

func TestGetProject_NotFound(t *testing.T) {
	_, svcErr := newService(newMemoryStore(), &stubOUService{}).GetProject(context.Background(), "missing")
	require.Equal(t, ErrorProjectNotFound.Code, svcErr.Code)
}
