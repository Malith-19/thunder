// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package flowmgt

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"

	"github.com/stretchr/testify/mock"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
	"github.com/thunder-id/thunderid/pkg/thunderidengine/providers"

	"github.com/thunder-id/thunderid/internal/project"
)

// stubProjectResolver stands in for the project service: a requested project is
// accepted and nothing falls back to "prj-default".
type stubProjectResolver struct {
	err *tidcommon.ServiceError
}

func (r stubProjectResolver) ResolveProjectID(
	_ context.Context, requested, _ string,
) (string, *tidcommon.ServiceError) {
	if r.err != nil {
		return "", r.err
	}
	if requested == "" {
		return "prj-default", nil
	}
	return requested, nil
}

func (s *FlowMgtServiceTestSuite) TestCreateFlow_Project() {
	s.mockValidator.EXPECT().ValidateFlowDefinition(mock.Anything, mock.Anything).Return(nil)
	s.mockStore.EXPECT().IsFlowExistsByHandle(mock.Anything, mock.Anything, mock.Anything).Return(false, nil)
	s.mockStore.EXPECT().CreateFlow(mock.Anything, mock.Anything, mock.Anything).
		RunAndReturn(func(_ context.Context, id string, def *FlowDefinition) (
			*providers.CompleteFlowDefinition, error) {
			return &providers.CompleteFlowDefinition{ID: id, ProjectID: def.ProjectID}, nil
		})

	labeled := &FlowDefinition{Handle: "labeled", Name: "Labeled", FlowType: providers.FlowTypeAuthentication,
		Nodes: validFlowNodes(), ProjectID: "prj-1"}
	result, svcErr := s.service.CreateFlow(context.Background(), labeled)
	s.Nil(svcErr)
	s.Equal("prj-1", result.ProjectID, "without a project resolver the project ID is kept as given")

	s.service.(*flowMgtService).projects = stubProjectResolver{}
	defaulted := &FlowDefinition{Handle: "defaulted", Name: "Defaulted", FlowType: providers.FlowTypeAuthentication,
		Nodes: validFlowNodes()}
	result, svcErr = s.service.CreateFlow(context.Background(), defaulted)
	s.Nil(svcErr)
	s.Equal("prj-default", result.ProjectID, "the project service puts it in the default project")
}

func (s *FlowMgtServiceTestSuite) TestCreateFlow_ProjectNotResolved() {
	s.service.(*flowMgtService).projects = stubProjectResolver{err: &project.ErrorProjectNotFound}
	s.mockValidator.EXPECT().ValidateFlowDefinition(mock.Anything, mock.Anything).Return(nil)

	flowDef := &FlowDefinition{Handle: "flow", Name: "Flow", FlowType: providers.FlowTypeAuthentication,
		Nodes: validFlowNodes(), ProjectID: "prj-missing"}
	_, svcErr := s.service.CreateFlow(context.Background(), flowDef)
	s.Require().NotNil(svcErr)
	s.Equal(project.ErrorProjectNotFound.Code, svcErr.Code)
}

func (s *FlowMgtServiceTestSuite) TestUpdateFlow_Project() {
	s.service.(*flowMgtService).projects = stubProjectResolver{}
	existing := &providers.CompleteFlowDefinition{ID: testFlowIDService, Handle: "test-handle",
		FlowType: providers.FlowTypeAuthentication, ProjectID: "prj-1"}
	s.mockValidator.EXPECT().ValidateFlowDefinition(mock.Anything, mock.Anything).Return(nil)
	s.mockStore.EXPECT().GetFlowByID(mock.Anything, testFlowIDService).Return(existing, nil)
	s.mockStore.EXPECT().UpdateFlow(mock.Anything, testFlowIDService, mock.Anything).
		RunAndReturn(func(_ context.Context, id string, def *FlowDefinition) (
			*providers.CompleteFlowDefinition, error) {
			return &providers.CompleteFlowDefinition{ID: id, ProjectID: def.ProjectID}, nil
		}).Once()
	s.mockGraphBuilder.EXPECT().InvalidateCache(mock.Anything, testFlowIDService).Once()

	kept := &FlowDefinition{Handle: "test-handle", Name: "Updated", FlowType: providers.FlowTypeAuthentication,
		Nodes: validFlowNodes()}
	result, svcErr := s.service.UpdateFlow(context.Background(), testFlowIDService, kept)
	s.Nil(svcErr)
	s.Equal("prj-1", result.ProjectID, "an update without a project keeps the current one")

	moved := &FlowDefinition{Handle: "test-handle", Name: "Updated", FlowType: providers.FlowTypeAuthentication,
		Nodes: validFlowNodes(), ProjectID: "prj-2"}
	_, svcErr = s.service.UpdateFlow(context.Background(), testFlowIDService, moved)
	s.Require().NotNil(svcErr)
	s.Equal(project.ErrorProjectChangeNotAllowed.Code, svcErr.Code)
}

func (s *FlowMgtServiceTestSuite) TestUpdateFlow_ProjectLabelWithoutResolver() {
	existing := &providers.CompleteFlowDefinition{ID: testFlowIDService, Handle: "test-handle",
		FlowType: providers.FlowTypeAuthentication, ProjectID: "prj-1"}
	s.mockValidator.EXPECT().ValidateFlowDefinition(mock.Anything, mock.Anything).Return(nil)
	s.mockStore.EXPECT().GetFlowByID(mock.Anything, testFlowIDService).Return(existing, nil)
	s.mockStore.EXPECT().UpdateFlow(mock.Anything, testFlowIDService, mock.Anything).
		RunAndReturn(func(_ context.Context, id string, def *FlowDefinition) (
			*providers.CompleteFlowDefinition, error) {
			return &providers.CompleteFlowDefinition{ID: id, ProjectID: def.ProjectID}, nil
		})
	s.mockGraphBuilder.EXPECT().InvalidateCache(mock.Anything, testFlowIDService)

	relabeled := &FlowDefinition{Handle: "test-handle", Name: "Updated", FlowType: providers.FlowTypeAuthentication,
		Nodes: validFlowNodes(), ProjectID: "prj-2"}
	result, svcErr := s.service.UpdateFlow(context.Background(), testFlowIDService, relabeled)
	s.Nil(svcErr)
	s.Equal("prj-2", result.ProjectID, "without a project resolver the project ID is kept as given")
}

func (s *FlowMgtServiceTestSuite) TestListFlows_ProjectFilter() {
	s.mockStore.EXPECT().ListFlows(mock.Anything, 10, 10, "", "prj-1").
		Return([]BasicFlowDefinition{{ID: "flow-1", ProjectID: "prj-1"}}, 30, nil)

	result, svcErr := s.service.ListFlows(context.Background(), 10, 10, "", "prj-1")

	s.Nil(svcErr)
	s.Require().Len(result.Flows, 1)
	s.Equal("prj-1", result.Flows[0].ProjectID)
	s.Require().NotEmpty(result.Links)
	for _, link := range result.Links {
		s.Contains(link.Href, "&projectId=prj-1", "pagination links keep the project filter")
	}
}

func (s *FlowMgtServiceTestSuite) TestProjectUsageChecker() {
	checker := &projectUsageChecker{store: s.mockStore}
	s.mockStore.EXPECT().ListFlows(mock.Anything, 1, 0, "", "prj-1").
		Return([]BasicFlowDefinition{{ID: "flow-1"}}, 1, nil).Once()
	s.mockStore.EXPECT().ListFlows(mock.Anything, 1, 0, "", "prj-2").
		Return([]BasicFlowDefinition{}, 0, nil).Once()

	inUse, err := checker.HasResourcesInProject(context.Background(), "prj-1")
	s.NoError(err)
	s.True(inUse)

	inUse, err = checker.HasResourcesInProject(context.Background(), "prj-2")
	s.NoError(err)
	s.False(inUse)

	s.mockStore.EXPECT().ListFlows(mock.Anything, 1, 0, "", "prj-3").Return(nil, 0, errors.New("db down")).Once()
	_, err = checker.HasResourcesInProject(context.Background(), "prj-3")
	s.Error(err)
}

func (s *FlowMgtHandlerTestSuite) TestListFlows_ProjectFilter() {
	s.mockService.EXPECT().ListFlows(mock.Anything, 30, 0, providers.FlowType(""), "prj-1").
		Return(&FlowListResponse{}, nil)

	req := httptest.NewRequest(http.MethodGet, "/flows?projectId=prj-1", nil)
	w := httptest.NewRecorder()

	s.handler.listFlows(w, req)

	s.Equal(http.StatusOK, w.Code)
}

func (s *FlowMgtHandlerTestSuite) TestSanitizeFlowDefinitionRequest_Project() {
	sanitized := sanitizeFlowDefinitionRequest(&FlowDefinitionRequest{
		Handle: "flow", Name: "Flow", FlowType: providers.FlowTypeAuthentication, ProjectID: "prj-1",
	})
	s.Equal("prj-1", sanitized.ProjectID)
}

func (s *FlowStoreTestSuite) TestListFlowsByProject() {
	row := map[string]interface{}{
		colFlowID: "flow-1", colHandle: "handle-1", colName: "Flow 1",
		colFlowType: string(providers.FlowTypeAuthentication), colActiveVersion: int64(1),
		colProjectID: "prj-1", colCreatedAt: "2025-01-01T00:00:00Z", colUpdatedAt: "2025-01-01T00:00:00Z",
	}
	s.mockDBProvider.EXPECT().GetConfigDBClient().Return(s.mockDBClient, nil)
	s.mockDBClient.EXPECT().QueryContext(mock.Anything, queryCountFlowsByProject, "prj-1", "test-deployment").
		Return([]map[string]interface{}{{colCount: int64(1)}}, nil).Once()
	s.mockDBClient.EXPECT().QueryContext(mock.Anything, queryListFlowsByProject, "prj-1", "test-deployment", 10, 0).
		Return([]map[string]interface{}{row}, nil).Once()

	flows, count, err := s.store.ListFlows(context.Background(), 10, 0, "", "prj-1")

	s.NoError(err)
	s.Equal(1, count)
	s.Require().Len(flows, 1)
	s.Equal("prj-1", flows[0].ProjectID)
}

func (s *FlowStoreTestSuite) TestListFlowsByProjectWithType() {
	authType := string(providers.FlowTypeAuthentication)
	s.mockDBProvider.EXPECT().GetConfigDBClient().Return(s.mockDBClient, nil)
	s.mockDBClient.EXPECT().QueryContext(mock.Anything, queryCountFlowsByProjectWithType,
		"prj-1", authType, "test-deployment").
		Return([]map[string]interface{}{{colCount: int64(0)}}, nil).Once()
	s.mockDBClient.EXPECT().QueryContext(mock.Anything, queryListFlowsByProjectWithType,
		"prj-1", authType, "test-deployment", 10, 0).
		Return([]map[string]interface{}{}, nil).Once()

	flows, count, err := s.store.ListFlows(context.Background(), 10, 0, authType, "prj-1")

	s.NoError(err)
	s.Equal(0, count)
	s.Empty(flows)
}

func (s *FlowStoreTestSuite) TestBuildCompleteFlowDefinitionFromRow_Project() {
	row := map[string]interface{}{
		colFlowID: "flow-1", colHandle: "handle-1", colName: "Flow 1",
		colFlowType: string(providers.FlowTypeAuthentication), colActiveVersion: int64(1),
		colNodes: "[]", colCreatedAt: "2025-01-01T00:00:00Z", colUpdatedAt: "2025-01-01T00:00:00Z",
	}

	flow, err := s.store.buildCompleteFlowDefinitionFromRow(row)
	s.NoError(err)
	s.Empty(flow.ProjectID, "a NULL project reads as no project")

	row[colProjectID] = "prj-1"
	flow, err = s.store.buildCompleteFlowDefinitionFromRow(row)
	s.NoError(err)
	s.Equal("prj-1", flow.ProjectID)

	s.Nil(nullableProjectID(""))
	s.Equal("prj-1", nullableProjectID("prj-1"))
}

func (s *FileBasedStoreTestSuite) TestListFlows_WithProjectFilter() {
	inProject := s.createTestFlow("in-project")
	inProject.ProjectID = "prj-1"
	_, err := s.store.CreateFlow(context.Background(), "flow-001", inProject)
	s.Require().NoError(err)
	_, err = s.store.CreateFlow(context.Background(), "flow-002", s.createTestFlow("no-project"))
	s.Require().NoError(err)

	flows, count, err := s.store.ListFlows(context.Background(), 10, 0, "", "prj-1")

	s.Require().NoError(err)
	s.Equal(1, count)
	s.Require().Len(flows, 1)
	s.Equal("flow-001", flows[0].ID)
	s.Equal("prj-1", flows[0].ProjectID)

	stored, err := s.store.GetFlowByID(context.Background(), "flow-001")
	s.Require().NoError(err)
	s.Equal("prj-1", stored.ProjectID)
}

func (s *FileBasedStoreTestSuite) TestCreate_KeepsProject() {
	err := s.store.(*fileBasedStore).Create("flow-003", &providers.CompleteFlowDefinition{
		ID: "flow-003", Handle: "declared", Name: "Declared", FlowType: providers.FlowTypeAuthentication,
		ProjectID: "prj-1",
	})
	s.Require().NoError(err)

	stored, err := s.store.GetFlowByID(context.Background(), "flow-003")
	s.Require().NoError(err)
	s.Equal("prj-1", stored.ProjectID, "a declarative flow keeps the project it was exported with")
}

func (s *FileBasedStoreTestSuite) TestParseToCompleteFlowDefinition_Project() {
	parsed, err := parseToCompleteFlowDefinition([]byte("id: flow-1\nhandle: declared\nname: Declared\n" +
		"flowType: AUTHENTICATION\nprojectId: prj-1\n"))
	s.Require().NoError(err)
	s.Equal("prj-1", parsed.(*providers.CompleteFlowDefinition).ProjectID)
}
