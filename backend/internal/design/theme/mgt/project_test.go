// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package thememgt

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

var projectTestThemeJSON = json.RawMessage(`{"colors":{"primary":"#007bff"}}`)

func (suite *ThemeServiceTestSuite) TestCreateTheme_Project() {
	suite.mockStore.On("IsThemeHandleConflict", testCtx(), mock.Anything, "").Return(false, nil)
	suite.mockStore.On("CreateTheme", testCtx(), mock.Anything, mock.MatchedBy(func(req CreateThemeRequest) bool {
		return req.ProjectID == "prj-1"
	})).Return(nil).Once()
	suite.mockStore.On("CreateTheme", testCtx(), mock.Anything, mock.MatchedBy(func(req CreateThemeRequest) bool {
		return req.ProjectID == "prj-default"
	})).Return(nil).Once()

	labeled := CreateThemeRequestWithID{Handle: "labeled", DisplayName: "Labeled", Theme: projectTestThemeJSON,
		ProjectID: "prj-1"}
	result, svcErr := suite.service.CreateTheme(testCtx(), labeled)
	suite.Nil(svcErr)
	suite.Equal("prj-1", result.ProjectID, "without a project resolver the project ID is kept as given")

	suite.service.(*themeMgtService).projects = stubProjectResolver{}
	defaulted := CreateThemeRequestWithID{Handle: "defaulted", DisplayName: "Defaulted", Theme: projectTestThemeJSON}
	result, svcErr = suite.service.CreateTheme(testCtx(), defaulted)
	suite.Nil(svcErr)
	suite.Equal("prj-default", result.ProjectID, "the project service puts it in the default project")
}

func (suite *ThemeServiceTestSuite) TestUpdateTheme_Project() {
	suite.service.(*themeMgtService).projects = stubProjectResolver{}
	existing := Theme{ID: "theme-1", Handle: "classic", DisplayName: "Classic", ProjectID: "prj-1"}
	suite.mockStore.On("IsThemeDeclarative", testCtx(), "theme-1").Return(false)
	suite.mockStore.On("GetTheme", testCtx(), "theme-1").Return(existing, nil)
	suite.mockStore.On("UpdateTheme", testCtx(), "theme-1", mock.MatchedBy(func(req UpdateThemeRequest) bool {
		return req.ProjectID == "prj-1"
	})).Return(nil).Once()

	kept := UpdateThemeRequest{DisplayName: "Classic", Theme: projectTestThemeJSON}
	result, svcErr := suite.service.UpdateTheme(testCtx(), "theme-1", kept)
	suite.Nil(svcErr)
	suite.Equal("prj-1", result.ProjectID, "an update without a project keeps the current one")

	moved := UpdateThemeRequest{DisplayName: "Classic", Theme: projectTestThemeJSON, ProjectID: "prj-2"}
	_, svcErr = suite.service.UpdateTheme(testCtx(), "theme-1", moved)
	suite.Require().NotNil(svcErr)
	suite.Equal(project.ErrorProjectChangeNotAllowed.Code, svcErr.Code)
}

func (suite *ThemeServiceTestSuite) TestUpdateTheme_ProjectLabelKeptWithoutResolver() {
	existing := Theme{ID: "theme-1", Handle: "classic", DisplayName: "Classic", ProjectID: "prj-1"}
	suite.mockStore.On("IsThemeDeclarative", testCtx(), "theme-1").Return(false)
	suite.mockStore.On("GetTheme", testCtx(), "theme-1").Return(existing, nil)
	suite.mockStore.On("UpdateTheme", testCtx(), "theme-1", mock.Anything).Return(nil)

	relabeled := UpdateThemeRequest{DisplayName: "Classic", Theme: projectTestThemeJSON, ProjectID: "prj-2"}
	result, svcErr := suite.service.UpdateTheme(testCtx(), "theme-1", relabeled)
	suite.Nil(svcErr)
	suite.Equal("prj-2", result.ProjectID, "without a project resolver the project ID is a plain label")
}

func (suite *ThemeServiceTestSuite) TestGetThemeList_ByProject() {
	themes := []Theme{{ID: "theme-1", ProjectID: "prj-1"}}
	suite.mockStore.On("GetThemeListCountByProject", testCtx(), "prj-1").Return(3, nil)
	suite.mockStore.On("GetThemeListByProject", testCtx(), "prj-1", 1, 1).Return(themes, nil)

	result, svcErr := suite.service.GetThemeList(testCtx(), 1, 1, "prj-1")
	suite.Nil(svcErr)
	suite.Equal(3, result.TotalResults)
	suite.Equal(themes, result.Themes)
	suite.Require().Len(result.Links, 2)
	suite.Equal("/design/themes?limit=1&offset=0&projectId=prj-1", result.Links[0].Href)
	suite.Equal("/design/themes?limit=1&offset=2&projectId=prj-1", result.Links[1].Href)
}

func (suite *ThemeServiceTestSuite) TestGetThemeList_ByProjectErrors() {
	suite.mockStore.On("GetThemeListCountByProject", testCtx(), "prj-1").Return(0, errors.New("db down")).Once()
	_, svcErr := suite.service.GetThemeList(testCtx(), 10, 0, "prj-1")
	suite.Equal(&tidcommon.InternalServerError, svcErr)

	suite.mockStore.On("GetThemeListCountByProject", testCtx(), "prj-1").Return(1, nil).Once()
	suite.mockStore.On("GetThemeListByProject", testCtx(), "prj-1", 10, 0).Return(nil, errors.New("db down"))
	_, svcErr = suite.service.GetThemeList(testCtx(), 10, 0, "prj-1")
	suite.Equal(&tidcommon.InternalServerError, svcErr)
}

func (suite *ThemeServiceTestSuite) TestProjectUsageChecker() {
	suite.mockStore.On("GetThemeListCountByProject", mock.Anything, "prj-1").Return(1, nil).Once()
	suite.mockStore.On("GetThemeListCountByProject", mock.Anything, "prj-2").Return(0, nil).Once()
	checker := &projectUsageChecker{store: suite.mockStore}

	inUse, err := checker.HasResourcesInProject(context.Background(), "prj-1")
	suite.NoError(err)
	suite.True(inUse)

	inUse, err = checker.HasResourcesInProject(context.Background(), "prj-2")
	suite.NoError(err)
	suite.False(inUse)

	suite.mockStore.On("GetThemeListCountByProject", mock.Anything, "prj-1").Return(0, errors.New("db down")).Once()
	_, err = checker.HasResourcesInProject(context.Background(), "prj-1")
	suite.Error(err)
}

func (suite *ThemeStoreTestSuite) TestCreateAndUpdateTheme_Project() {
	suite.mockDBProvider.On("GetConfigDBClient").Return(suite.mockDBClient, nil)
	suite.mockDBClient.On("Execute", queryCreateTheme, "theme-1", "classic", "Test", "Desc",
		mock.Anything, "prj-1", "test-deployment").Return(int64(1), nil)
	suite.mockDBClient.On("Execute", queryUpdateTheme, "Test", "Desc", mock.Anything, "prj-1",
		"theme-1", "test-deployment").Return(int64(1), nil)

	suite.NoError(suite.store.CreateTheme(context.Background(), "theme-1", CreateThemeRequest{
		Handle: "classic", DisplayName: "Test", Description: "Desc", Theme: projectTestThemeJSON, ProjectID: "prj-1",
	}))
	suite.NoError(suite.store.UpdateTheme(context.Background(), "theme-1", UpdateThemeRequest{
		DisplayName: "Test", Description: "Desc", Theme: projectTestThemeJSON, ProjectID: "prj-1",
	}))
}

func (suite *ThemeStoreTestSuite) TestGetThemeListByProject() {
	rows := []map[string]interface{}{{
		"id": "theme-1", "handle": "classic", "display_name": "Classic", "description": "",
		"theme": `{}`, "project_id": "prj-1",
		"created_at": "2024-01-15T10:30:00Z", "updated_at": "2024-01-15T10:30:00Z",
	}}
	suite.mockDBProvider.On("GetConfigDBClient").Return(suite.mockDBClient, nil)
	suite.mockDBClient.On("Query", queryGetThemeListCountByProject, "prj-1", "test-deployment").
		Return([]map[string]interface{}{{"total": int64(1)}}, nil)
	suite.mockDBClient.On("Query", queryGetThemeListByProject, "prj-1", 10, 0, "test-deployment").
		Return(rows, nil)

	count, err := suite.store.GetThemeListCountByProject(context.Background(), "prj-1")
	suite.NoError(err)
	suite.Equal(1, count)

	themes, err := suite.store.GetThemeListByProject(context.Background(), "prj-1", 10, 0)
	suite.NoError(err)
	suite.Require().Len(themes, 1)
	suite.Equal("prj-1", themes[0].ProjectID)
}

func (suite *ThemeStoreTestSuite) TestGetThemeListByProject_Errors() {
	suite.mockDBProvider.On("GetConfigDBClient").Return(nil, errors.New("connection error")).Twice()
	_, err := suite.store.GetThemeListCountByProject(context.Background(), "prj-1")
	suite.Error(err)
	_, err = suite.store.GetThemeListByProject(context.Background(), "prj-1", 10, 0)
	suite.Error(err)

	suite.mockDBProvider.On("GetConfigDBClient").Return(suite.mockDBClient, nil)
	suite.mockDBClient.On("Query", queryGetThemeListCountByProject, "prj-1", "test-deployment").
		Return(nil, errors.New("query error"))
	suite.mockDBClient.On("Query", queryGetThemeListByProject, "prj-1", 10, 0, "test-deployment").
		Return(nil, errors.New("query error"))
	_, err = suite.store.GetThemeListCountByProject(context.Background(), "prj-1")
	suite.Error(err)
	_, err = suite.store.GetThemeListByProject(context.Background(), "prj-1", 10, 0)
	suite.Error(err)
}

func (suite *ThemeStoreTestSuite) TestBuildThemeFromResultRow_Project() {
	theme, err := suite.store.buildThemeFromResultRow(map[string]interface{}{
		"id": "theme-1", "display_name": "Classic", "theme": `{}`, "project_id": "prj-1",
		"created_at": "2024-01-15T10:30:00Z", "updated_at": "2024-01-15T10:30:00Z",
	})
	suite.NoError(err)
	suite.Equal("prj-1", theme.ProjectID)
	suite.Nil(nullableProjectID(""))
	suite.Equal("prj-1", nullableProjectID("prj-1"))
}

func (suite *ThemeFileBasedStoreTestSuite) TestGetThemeListByProject() {
	for id, projectID := range map[string]string{"theme-a": "prj-1", "theme-b": "prj-2", "theme-c": "prj-1"} {
		req := suite.createTestTheme(id)
		req.Handle = id
		req.ProjectID = projectID
		suite.Require().NoError(suite.store.CreateTheme(context.Background(), id, req))
	}

	count, err := suite.store.GetThemeListCountByProject(context.Background(), "prj-1")
	suite.NoError(err)
	suite.Equal(2, count)

	themes, err := suite.store.GetThemeListByProject(context.Background(), "prj-1", 10, 0)
	suite.NoError(err)
	suite.Len(themes, 2)
	for _, theme := range themes {
		suite.Equal("prj-1", theme.ProjectID)
	}

	themes, err = suite.store.GetThemeListByProject(context.Background(), "prj-1", 1, 1)
	suite.NoError(err)
	suite.Len(themes, 1)
}

func (suite *CompositeThemeStoreTestSuite) TestGetThemeListByProject_MergesStores() {
	suite.mockDBStore.On("GetThemeListCountByProject", testCtx(), "prj-1").Return(1, nil)
	suite.mockFileStore.On("GetThemeListCountByProject", testCtx(), "prj-1").Return(1, nil)
	suite.mockDBStore.On("GetThemeListByProject", testCtx(), "prj-1", 1, 0).
		Return([]Theme{{ID: "db-1", ProjectID: "prj-1"}}, nil)
	suite.mockFileStore.On("GetThemeListByProject", testCtx(), "prj-1", 1, 0).
		Return([]Theme{{ID: "file-1", ProjectID: "prj-1"}}, nil)

	count, err := suite.store.GetThemeListCountByProject(testCtx(), "prj-1")
	suite.NoError(err)
	suite.Equal(2, count)

	themes, err := suite.store.GetThemeListByProject(testCtx(), "prj-1", 10, 0)
	suite.NoError(err)
	suite.Require().Len(themes, 2)
	suite.Equal("file-1", themes[0].ID)
	suite.True(themes[0].IsReadOnly)
	suite.Equal("db-1", themes[1].ID)
}

func (suite *CompositeThemeStoreTestSuite) TestGetThemeListByProject_Error() {
	suite.mockDBStore.On("GetThemeListCountByProject", testCtx(), "prj-1").Return(0, errors.New("db down"))

	_, err := suite.store.GetThemeListByProject(testCtx(), "prj-1", 10, 0)
	suite.Error(err)
}

func (suite *ThemeHandlerTestSuite) TestHandleThemeListRequest_Project() {
	mockSvc := &mockThemeService{
		getThemeListFunc: func(limit, offset int) (*ThemeList, *tidcommon.ServiceError) {
			return &ThemeList{TotalResults: 1, StartIndex: 1, Count: 1,
				Themes: []Theme{{ID: "theme-1", ProjectID: "prj-1"}}}, nil
		},
	}

	handler := newThemeMgtHandler(mockSvc)
	req := httptest.NewRequest(http.MethodGet, "/design/themes?projectId=prj-1", nil)
	w := httptest.NewRecorder()
	handler.HandleThemeListRequest(w, req)

	suite.Equal(http.StatusOK, w.Code)
	suite.Equal("prj-1", mockSvc.listProjectID)
	var response ThemeListResponse
	suite.Require().NoError(json.Unmarshal(w.Body.Bytes(), &response))
	suite.Require().Len(response.Themes, 1)
	suite.Equal("prj-1", response.Themes[0].ProjectID)
}

func (suite *ThemeHandlerTestSuite) TestHandleThemePostRequest_Project() {
	var received CreateThemeRequestWithID
	mockSvc := &mockThemeService{
		createThemeFunc: func(theme CreateThemeRequestWithID) (*Theme, *tidcommon.ServiceError) {
			received = theme
			return &Theme{ID: "theme-1", Handle: theme.Handle, DisplayName: theme.DisplayName,
				Theme: theme.Theme, ProjectID: theme.ProjectID}, nil
		},
	}

	handler := newThemeMgtHandler(mockSvc)
	body := `{"handle":"classic","displayName":"Classic","theme":{},"projectId":"prj-1"}`
	req := httptest.NewRequest(http.MethodPost, "/design/themes", strings.NewReader(body))
	w := httptest.NewRecorder()
	handler.HandleThemePostRequest(w, req)

	suite.Equal(http.StatusCreated, w.Code)
	suite.Equal("prj-1", received.ProjectID)
	var response Theme
	suite.Require().NoError(json.Unmarshal(w.Body.Bytes(), &response))
	suite.Equal("prj-1", response.ProjectID)
}

func (suite *ThemeDeclarativeSuite) TestParseToTheme_Project() {
	theme, err := parseToTheme([]byte("id: theme-1\ndisplayName: Classic\nprojectId: prj-1\ntheme: {}\n"))
	suite.NoError(err)
	suite.Equal("prj-1", theme.ProjectID)
}
