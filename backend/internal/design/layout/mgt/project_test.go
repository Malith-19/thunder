// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package layoutmgt

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"

	"github.com/stretchr/testify/mock"

	"github.com/thunder-id/thunderid/internal/project"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// stubProjectResolver stands in for the project service: a requested project is
// accepted and nothing falls back to "prj-default".
type stubProjectResolver struct{}

func (stubProjectResolver) ResolveProjectID(
	_ context.Context, requested, _ string,
) (string, *tidcommon.ServiceError) {
	if requested == "" {
		return "prj-default", nil
	}
	return requested, nil
}

var projectTestLayoutJSON = json.RawMessage(`{"colors":{"primary":"#007bff"}}`)

func (suite *LayoutServiceTestSuite) TestCreateLayout_Project() {
	suite.mockStore.On("IsLayoutHandleConflict", testCtx(), mock.Anything, "").Return(false, nil)
	suite.mockStore.On("CreateLayout", testCtx(), mock.Anything, mock.MatchedBy(func(req CreateLayoutRequest) bool {
		return req.ProjectID == "prj-1"
	})).Return(nil).Once()
	suite.mockStore.On("CreateLayout", testCtx(), mock.Anything, mock.MatchedBy(func(req CreateLayoutRequest) bool {
		return req.ProjectID == "prj-default"
	})).Return(nil).Once()

	labeled := CreateLayoutRequestWithID{Handle: "labeled", DisplayName: "Labeled", Layout: projectTestLayoutJSON,
		ProjectID: "prj-1"}
	result, svcErr := suite.service.CreateLayout(testCtx(), labeled)
	suite.Nil(svcErr)
	suite.Equal("prj-1", result.ProjectID, "without a project resolver the project ID is kept as given")

	suite.service.(*layoutMgtService).projects = stubProjectResolver{}
	defaulted := CreateLayoutRequestWithID{Handle: "defaulted", DisplayName: "Defaulted", Layout: projectTestLayoutJSON}
	result, svcErr = suite.service.CreateLayout(testCtx(), defaulted)
	suite.Nil(svcErr)
	suite.Equal("prj-default", result.ProjectID, "the project service puts it in the default project")
}

func (suite *LayoutServiceTestSuite) TestUpdateLayout_Project() {
	suite.service.(*layoutMgtService).projects = stubProjectResolver{}
	existing := Layout{ID: "layout-1", Handle: "classic", DisplayName: "Classic", ProjectID: "prj-1"}
	suite.mockStore.On("IsLayoutDeclarative", testCtx(), "layout-1").Return(false)
	suite.mockStore.On("GetLayout", testCtx(), "layout-1").Return(existing, nil)
	suite.mockStore.On("UpdateLayout", testCtx(), "layout-1", mock.MatchedBy(func(req UpdateLayoutRequest) bool {
		return req.ProjectID == "prj-1"
	})).Return(nil).Once()

	kept := UpdateLayoutRequest{DisplayName: "Classic", Layout: projectTestLayoutJSON}
	result, svcErr := suite.service.UpdateLayout(testCtx(), "layout-1", kept)
	suite.Nil(svcErr)
	suite.Equal("prj-1", result.ProjectID, "an update without a project keeps the current one")

	moved := UpdateLayoutRequest{DisplayName: "Classic", Layout: projectTestLayoutJSON, ProjectID: "prj-2"}
	_, svcErr = suite.service.UpdateLayout(testCtx(), "layout-1", moved)
	suite.Require().NotNil(svcErr)
	suite.Equal(project.ErrorProjectChangeNotAllowed.Code, svcErr.Code)
}

func (suite *LayoutServiceTestSuite) TestUpdateLayout_ProjectLabelKeptWithoutResolver() {
	existing := Layout{ID: "layout-1", Handle: "classic", DisplayName: "Classic", ProjectID: "prj-1"}
	suite.mockStore.On("IsLayoutDeclarative", testCtx(), "layout-1").Return(false)
	suite.mockStore.On("GetLayout", testCtx(), "layout-1").Return(existing, nil)
	suite.mockStore.On("UpdateLayout", testCtx(), "layout-1", mock.Anything).Return(nil)

	relabeled := UpdateLayoutRequest{DisplayName: "Classic", Layout: projectTestLayoutJSON, ProjectID: "prj-2"}
	result, svcErr := suite.service.UpdateLayout(testCtx(), "layout-1", relabeled)
	suite.Nil(svcErr)
	suite.Equal("prj-2", result.ProjectID, "without a project resolver the project ID is a plain label")
}

func (suite *LayoutServiceTestSuite) TestGetLayoutList_ByProject() {
	layouts := []Layout{{ID: "layout-1", ProjectID: "prj-1"}}
	suite.mockStore.On("GetLayoutListCountByProject", testCtx(), "prj-1").Return(3, nil)
	suite.mockStore.On("GetLayoutListByProject", testCtx(), "prj-1", 1, 1).Return(layouts, nil)

	result, svcErr := suite.service.GetLayoutList(testCtx(), 1, 1, "prj-1")
	suite.Nil(svcErr)
	suite.Equal(3, result.TotalResults)
	suite.Equal(layouts, result.Layouts)
	suite.Require().Len(result.Links, 2)
	suite.Equal("/design/layouts?limit=1&offset=0&projectId=prj-1", result.Links[0].Href)
	suite.Equal("/design/layouts?limit=1&offset=2&projectId=prj-1", result.Links[1].Href)
}

func (suite *LayoutServiceTestSuite) TestGetLayoutList_ByProjectErrors() {
	suite.mockStore.On("GetLayoutListCountByProject", testCtx(), "prj-1").Return(0, errors.New("db down")).Once()
	_, svcErr := suite.service.GetLayoutList(testCtx(), 10, 0, "prj-1")
	suite.Equal(&tidcommon.InternalServerError, svcErr)

	suite.mockStore.On("GetLayoutListCountByProject", testCtx(), "prj-1").Return(1, nil).Once()
	suite.mockStore.On("GetLayoutListByProject", testCtx(), "prj-1", 10, 0).Return(nil, errors.New("db down"))
	_, svcErr = suite.service.GetLayoutList(testCtx(), 10, 0, "prj-1")
	suite.Equal(&tidcommon.InternalServerError, svcErr)
}

func (suite *LayoutServiceTestSuite) TestProjectUsageChecker() {
	suite.mockStore.On("GetLayoutListCountByProject", mock.Anything, "prj-1").Return(1, nil).Once()
	suite.mockStore.On("GetLayoutListCountByProject", mock.Anything, "prj-2").Return(0, nil).Once()
	checker := &projectUsageChecker{store: suite.mockStore}

	inUse, err := checker.HasResourcesInProject(context.Background(), "prj-1")
	suite.NoError(err)
	suite.True(inUse)

	inUse, err = checker.HasResourcesInProject(context.Background(), "prj-2")
	suite.NoError(err)
	suite.False(inUse)

	suite.mockStore.On("GetLayoutListCountByProject", mock.Anything, "prj-1").Return(0, errors.New("db down")).Once()
	_, err = checker.HasResourcesInProject(context.Background(), "prj-1")
	suite.Error(err)
}

func (suite *LayoutStoreTestSuite) TestCreateAndUpdateLayout_Project() {
	suite.mockDBProvider.On("GetConfigDBClient").Return(suite.mockDBClient, nil)
	suite.mockDBClient.On("Execute", queryCreateLayout, "layout-1", "classic", "Test", "Desc",
		mock.Anything, "prj-1", "test-deployment").Return(int64(1), nil)
	suite.mockDBClient.On("Execute", queryUpdateLayout, "Test", "Desc", mock.Anything, "prj-1",
		"layout-1", "test-deployment").Return(int64(1), nil)

	suite.NoError(suite.store.CreateLayout(context.Background(), "layout-1", CreateLayoutRequest{
		Handle: "classic", DisplayName: "Test", Description: "Desc", Layout: projectTestLayoutJSON, ProjectID: "prj-1",
	}))
	suite.NoError(suite.store.UpdateLayout(context.Background(), "layout-1", UpdateLayoutRequest{
		DisplayName: "Test", Description: "Desc", Layout: projectTestLayoutJSON, ProjectID: "prj-1",
	}))
}

func (suite *LayoutStoreTestSuite) TestGetLayoutListByProject() {
	rows := []map[string]interface{}{{
		"id": "layout-1", "handle": "classic", "display_name": "Classic", "description": "",
		"layout": `{}`, "project_id": "prj-1",
		"created_at": "2024-01-15T10:30:00Z", "updated_at": "2024-01-15T10:30:00Z",
	}}
	suite.mockDBProvider.On("GetConfigDBClient").Return(suite.mockDBClient, nil)
	suite.mockDBClient.On("Query", queryGetLayoutListCountByProject, "prj-1", "test-deployment").
		Return([]map[string]interface{}{{"total": int64(1)}}, nil)
	suite.mockDBClient.On("Query", queryGetLayoutListByProject, "prj-1", 10, 0, "test-deployment").
		Return(rows, nil)

	count, err := suite.store.GetLayoutListCountByProject(context.Background(), "prj-1")
	suite.NoError(err)
	suite.Equal(1, count)

	layouts, err := suite.store.GetLayoutListByProject(context.Background(), "prj-1", 10, 0)
	suite.NoError(err)
	suite.Require().Len(layouts, 1)
	suite.Equal("prj-1", layouts[0].ProjectID)
}

func (suite *LayoutStoreTestSuite) TestGetLayoutListByProject_Errors() {
	suite.mockDBProvider.On("GetConfigDBClient").Return(nil, errors.New("connection error")).Twice()
	_, err := suite.store.GetLayoutListCountByProject(context.Background(), "prj-1")
	suite.Error(err)
	_, err = suite.store.GetLayoutListByProject(context.Background(), "prj-1", 10, 0)
	suite.Error(err)

	suite.mockDBProvider.On("GetConfigDBClient").Return(suite.mockDBClient, nil)
	suite.mockDBClient.On("Query", queryGetLayoutListCountByProject, "prj-1", "test-deployment").
		Return(nil, errors.New("query error"))
	suite.mockDBClient.On("Query", queryGetLayoutListByProject, "prj-1", 10, 0, "test-deployment").
		Return(nil, errors.New("query error"))
	_, err = suite.store.GetLayoutListCountByProject(context.Background(), "prj-1")
	suite.Error(err)
	_, err = suite.store.GetLayoutListByProject(context.Background(), "prj-1", 10, 0)
	suite.Error(err)
}

func (suite *LayoutStoreTestSuite) TestBuildLayoutFromResultRow_Project() {
	layout, err := suite.store.buildLayoutFromResultRow(map[string]interface{}{
		"id": "layout-1", "display_name": "Classic", "layout": `{}`, "project_id": "prj-1",
		"created_at": "2024-01-15T10:30:00Z", "updated_at": "2024-01-15T10:30:00Z",
	})
	suite.NoError(err)
	suite.Equal("prj-1", layout.ProjectID)
	suite.Nil(nullableProjectID(""))
	suite.Equal("prj-1", nullableProjectID("prj-1"))
}

func (suite *LayoutFileBasedStoreTestSuite) TestGetLayoutListByProject() {
	for id, projectID := range map[string]string{"layout-a": "prj-1", "layout-b": "prj-2", "layout-c": "prj-1"} {
		req := suite.createTestLayout(id)
		req.Handle = id
		req.ProjectID = projectID
		suite.Require().NoError(suite.store.CreateLayout(context.Background(), id, req))
	}

	count, err := suite.store.GetLayoutListCountByProject(context.Background(), "prj-1")
	suite.NoError(err)
	suite.Equal(2, count)

	layouts, err := suite.store.GetLayoutListByProject(context.Background(), "prj-1", 10, 0)
	suite.NoError(err)
	suite.Len(layouts, 2)
	for _, layout := range layouts {
		suite.Equal("prj-1", layout.ProjectID)
	}

	layouts, err = suite.store.GetLayoutListByProject(context.Background(), "prj-1", 1, 1)
	suite.NoError(err)
	suite.Len(layouts, 1)
}

func (suite *CompositeLayoutStoreTestSuite) TestGetLayoutListByProject_MergesStores() {
	suite.mockDBStore.On("GetLayoutListCountByProject", testCtx(), "prj-1").Return(1, nil)
	suite.mockFileStore.On("GetLayoutListCountByProject", testCtx(), "prj-1").Return(1, nil)
	suite.mockDBStore.On("GetLayoutListByProject", testCtx(), "prj-1", 1, 0).
		Return([]Layout{{ID: "db-1", ProjectID: "prj-1"}}, nil)
	suite.mockFileStore.On("GetLayoutListByProject", testCtx(), "prj-1", 1, 0).
		Return([]Layout{{ID: "file-1", ProjectID: "prj-1"}}, nil)

	count, err := suite.store.GetLayoutListCountByProject(testCtx(), "prj-1")
	suite.NoError(err)
	suite.Equal(2, count)

	layouts, err := suite.store.GetLayoutListByProject(testCtx(), "prj-1", 10, 0)
	suite.NoError(err)
	suite.Require().Len(layouts, 2)
	suite.Equal("file-1", layouts[0].ID)
	suite.True(layouts[0].IsReadOnly)
	suite.Equal("db-1", layouts[1].ID)
}

func (suite *CompositeLayoutStoreTestSuite) TestGetLayoutListByProject_Error() {
	suite.mockDBStore.On("GetLayoutListCountByProject", testCtx(), "prj-1").Return(0, errors.New("db down"))

	_, err := suite.store.GetLayoutListByProject(testCtx(), "prj-1", 10, 0)
	suite.Error(err)
}

func (suite *LayoutHandlerTestSuite) TestHandleLayoutListRequest_Project() {
	mockSvc := &mockLayoutService{
		getLayoutListFunc: func(limit, offset int) (*LayoutList, *tidcommon.ServiceError) {
			return &LayoutList{TotalResults: 1, StartIndex: 1, Count: 1,
				Layouts: []Layout{{ID: "layout-1", ProjectID: "prj-1"}}}, nil
		},
	}

	handler := newLayoutMgtHandler(mockSvc)
	req := httptest.NewRequest(http.MethodGet, "/design/layouts?projectId=prj-1", nil)
	w := httptest.NewRecorder()
	handler.HandleLayoutListRequest(w, req)

	suite.Equal(http.StatusOK, w.Code)
	suite.Equal("prj-1", mockSvc.listProjectID)
	var response LayoutListResponse
	suite.Require().NoError(json.Unmarshal(w.Body.Bytes(), &response))
	suite.Require().Len(response.Layouts, 1)
	suite.Equal("prj-1", response.Layouts[0].ProjectID)
}

func (suite *LayoutHandlerTestSuite) TestHandleLayoutPostRequest_Project() {
	var received CreateLayoutRequestWithID
	mockSvc := &mockLayoutService{
		createLayoutFunc: func(layout CreateLayoutRequestWithID) (*Layout, *tidcommon.ServiceError) {
			received = layout
			return &Layout{ID: "layout-1", Handle: layout.Handle, DisplayName: layout.DisplayName,
				Layout: layout.Layout, ProjectID: layout.ProjectID}, nil
		},
	}

	handler := newLayoutMgtHandler(mockSvc)
	body := `{"handle":"classic","displayName":"Classic","layout":{},"projectId":"prj-1"}`
	req := httptest.NewRequest(http.MethodPost, "/design/layouts", strings.NewReader(body))
	w := httptest.NewRecorder()
	handler.HandleLayoutPostRequest(w, req)

	suite.Equal(http.StatusCreated, w.Code)
	suite.Equal("prj-1", received.ProjectID)
	var response Layout
	suite.Require().NoError(json.Unmarshal(w.Body.Bytes(), &response))
	suite.Equal("prj-1", response.ProjectID)
}

func (suite *DeclarativeResourceTestSuite) TestParseToLayout_Project() {
	layout, err := parseToLayout([]byte("id: layout-1\ndisplayName: Classic\nprojectId: prj-1\nlayout: {}\n"))
	suite.NoError(err)
	suite.Equal("prj-1", layout.ProjectID)
}
