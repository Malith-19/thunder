// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"errors"
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"

	"github.com/thunder-id/thunderid/internal/system/config"
	engineconfig "github.com/thunder-id/thunderid/pkg/thunderidengine/config"
	"github.com/thunder-id/thunderid/tests/mocks/database/providermock"
)

const testDeploymentID = "test-deployment"

type ProjectStoreTestSuite struct {
	suite.Suite
	ctx      context.Context
	provider *providermock.DBProviderInterfaceMock
	client   *providermock.DBClientInterfaceMock
	store    *projectStore
}

func TestProjectStoreTestSuite(t *testing.T) {
	suite.Run(t, new(ProjectStoreTestSuite))
}

func (s *ProjectStoreTestSuite) SetupTest() {
	config.ResetServerRuntime()
	_ = config.InitializeServerRuntime("", &config.Config{
		Server: engineconfig.ServerConfig{Identifier: testDeploymentID},
	})
	s.ctx = context.Background()
	s.provider = providermock.NewDBProviderInterfaceMock(s.T())
	s.client = providermock.NewDBClientInterfaceMock(s.T())
	s.store = &projectStore{dbProvider: s.provider}
}

func (s *ProjectStoreTestSuite) expectClient() {
	s.provider.On("GetConfigDBClient").Return(s.client, nil)
}

func row(id, handle, name string, description interface{}) map[string]interface{} {
	return map[string]interface{}{"id": id, "handle": handle, "name": name, "description": description}
}

func (s *ProjectStoreTestSuite) TestCreateProject() {
	s.expectClient()
	s.client.On("ExecuteContext", s.ctx, queryCreateProject, "prj-1", "hr", "HR", "People", testDeploymentID).
		Return(int64(1), nil)

	s.NoError(s.store.CreateProject(s.ctx, Project{ID: "prj-1", Handle: "hr", Name: "HR", Description: "People"}))
}

func (s *ProjectStoreTestSuite) TestGetProject() {
	s.expectClient()
	s.client.On("QueryContext", s.ctx, queryGetProject, "prj-1", testDeploymentID).
		Return([]map[string]interface{}{row("prj-1", "hr", "HR", []byte("People"))}, nil)

	p, err := s.store.GetProject(s.ctx, "prj-1")
	s.NoError(err)
	s.Equal(Project{ID: "prj-1", Handle: "hr", Name: "HR", Description: "People"}, p)
}

func (s *ProjectStoreTestSuite) TestGetProject_NotFound() {
	s.expectClient()
	s.client.On("QueryContext", s.ctx, queryGetProject, "missing", testDeploymentID).
		Return([]map[string]interface{}{}, nil)

	_, err := s.store.GetProject(s.ctx, "missing")
	s.ErrorIs(err, errProjectNotFound)
}

func (s *ProjectStoreTestSuite) TestGetProjectList() {
	s.expectClient()
	s.client.On("QueryContext", s.ctx, queryGetProjectList, 10, 0, testDeploymentID).
		Return([]map[string]interface{}{row("prj-1", "hr", "HR", nil)}, nil)
	s.client.On("QueryContext", s.ctx, queryGetProjectListCount, testDeploymentID).
		Return([]map[string]interface{}{{"total": int64(1)}}, nil)

	projects, err := s.store.GetProjectList(s.ctx, 10, 0)
	s.NoError(err)
	s.Len(projects, 1)
	s.Empty(projects[0].Description)

	count, err := s.store.GetProjectListCount(s.ctx)
	s.NoError(err)
	s.Equal(1, count)
}

func (s *ProjectStoreTestSuite) TestUpdateProject() {
	s.expectClient()
	s.client.On("ExecuteContext", s.ctx, queryUpdateProject, "prj-1", "hr", "People", "", testDeploymentID).
		Return(int64(1), nil).Once()
	s.client.On("ExecuteContext", s.ctx, queryUpdateProject, "missing", "x", "X", "", testDeploymentID).
		Return(int64(0), nil).Once()

	s.NoError(s.store.UpdateProject(s.ctx, Project{ID: "prj-1", Handle: "hr", Name: "People"}))
	s.ErrorIs(s.store.UpdateProject(s.ctx, Project{ID: "missing", Handle: "x", Name: "X"}), errProjectNotFound)
}

func (s *ProjectStoreTestSuite) TestDeleteProject() {
	s.expectClient()
	s.client.On("ExecuteContext", s.ctx, queryDeleteProject, "prj-1", testDeploymentID).Return(int64(1), nil)

	s.NoError(s.store.DeleteProject(s.ctx, "prj-1"))
}

func (s *ProjectStoreTestSuite) TestIsHandleTaken() {
	s.expectClient()
	s.client.On("QueryContext", s.ctx, queryCheckProjectHandleConflict, "hr", "", testDeploymentID).
		Return([]map[string]interface{}{{"total": float64(1)}}, nil)

	taken, err := s.store.IsHandleTaken(s.ctx, "hr", "")
	s.NoError(err)
	s.True(taken)
}

func (s *ProjectStoreTestSuite) TestQueryErrors() {
	s.expectClient()
	dbErr := errors.New("db down")
	s.client.On("QueryContext", mock.Anything, mock.Anything, mock.Anything, mock.Anything).Return(nil, dbErr)
	s.client.On("QueryContext", mock.Anything, mock.Anything, mock.Anything, mock.Anything, mock.Anything).
		Return(nil, dbErr)
	s.client.On("QueryContext", mock.Anything, mock.Anything, mock.Anything).Return(nil, dbErr)
	s.client.On("ExecuteContext", mock.Anything, mock.Anything, mock.Anything, mock.Anything, mock.Anything,
		mock.Anything, mock.Anything).Return(int64(0), dbErr)
	s.client.On("ExecuteContext", mock.Anything, mock.Anything, mock.Anything, mock.Anything).
		Return(int64(0), dbErr)

	_, err := s.store.GetProject(s.ctx, "prj-1")
	s.Error(err)
	_, err = s.store.GetProjectList(s.ctx, 10, 0)
	s.Error(err)
	_, err = s.store.GetProjectListCount(s.ctx)
	s.Error(err)
	_, err = s.store.IsHandleTaken(s.ctx, "hr", "")
	s.Error(err)
	s.Error(s.store.CreateProject(s.ctx, Project{ID: "prj-1"}))
	s.Error(s.store.UpdateProject(s.ctx, Project{ID: "prj-1"}))
	s.Error(s.store.DeleteProject(s.ctx, "prj-1"))
}

func (s *ProjectStoreTestSuite) TestClientError() {
	s.provider.On("GetConfigDBClient").Return(nil, errors.New("no client"))

	s.Error(s.store.CreateProject(s.ctx, Project{}))
	_, err := s.store.GetProject(s.ctx, "prj-1")
	s.Error(err)
	_, err = s.store.GetProjectList(s.ctx, 10, 0)
	s.Error(err)
	_, err = s.store.GetProjectListCount(s.ctx)
	s.Error(err)
	s.Error(s.store.UpdateProject(s.ctx, Project{}))
	s.Error(s.store.DeleteProject(s.ctx, "prj-1"))
	_, err = s.store.IsHandleTaken(s.ctx, "hr", "")
	s.Error(err)
}
