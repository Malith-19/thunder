// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"

	"github.com/thunder-id/thunderid/internal/system/error/apierror"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

type ScopeMiddlewareTestSuite struct {
	suite.Suite
	mockService *ProjectServiceInterfaceMock
	handler     http.Handler
	// received is the request the wrapped handler saw, and receivedBody its body.
	received     *http.Request
	receivedBody string
}

func TestScopeMiddlewareTestSuite(t *testing.T) {
	suite.Run(t, new(ScopeMiddlewareTestSuite))
}

func (suite *ScopeMiddlewareTestSuite) SetupTest() {
	suite.mockService = NewProjectServiceInterfaceMock(suite.T())
	suite.received, suite.receivedBody = nil, ""
	suite.handler = newProjectScope(suite.mockService).Middleware(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			body, err := io.ReadAll(r.Body)
			suite.Require().NoError(err)
			suite.received, suite.receivedBody = r, string(body)
			w.WriteHeader(http.StatusOK)
		}))
}

func (suite *ScopeMiddlewareTestSuite) serve(method, target, body string) *httptest.ResponseRecorder {
	req := httptest.NewRequest(method, target, strings.NewReader(body))
	w := httptest.NewRecorder()
	suite.handler.ServeHTTP(w, req)
	return w
}

func (suite *ScopeMiddlewareTestSuite) assertError(w *httptest.ResponseRecorder, status int, code string) {
	suite.Equal(status, w.Code)
	var errResp apierror.ErrorResponse
	suite.Require().NoError(json.Unmarshal(w.Body.Bytes(), &errResp))
	suite.Equal(code, errResp.Code)
	suite.Nil(suite.received)
}

func (suite *ScopeMiddlewareTestSuite) TestListWithProjectBecomesOUFilter() {
	suite.mockService.On("GetProjectRootOUID", mock.Anything, testProjectID).Return(testRootOUID, nil)

	w := suite.serve(http.MethodGet, "/applications?limit=5&projectId="+testProjectID, "")

	suite.Equal(http.StatusOK, w.Code)
	query := suite.received.URL.Query()
	suite.False(query.Has(projectIDParam))
	suite.Equal(`ouId eq "`+testRootOUID+`"`, query.Get(filterQueryParam))
	suite.Equal("5", query.Get("limit"))
}

func (suite *ScopeMiddlewareTestSuite) TestListWithProjectAndFilterConflicts() {
	w := suite.serve(http.MethodGet,
		"/applications?projectId="+testProjectID+"&filter="+url.QueryEscape(`ouId eq "ou-1"`), "")

	suite.assertError(w, http.StatusBadRequest, ErrorProjectAndOUConflict.Code)
}

func (suite *ScopeMiddlewareTestSuite) TestCreateWithProjectBecomesOUID() {
	suite.mockService.On("GetProjectRootOUID", mock.Anything, testProjectID).Return(testRootOUID, nil)

	w := suite.serve(http.MethodPost, "/applications", `{"name":"App","projectId":"`+testProjectID+`"}`)

	suite.Equal(http.StatusOK, w.Code)
	var fields map[string]interface{}
	suite.Require().NoError(json.Unmarshal([]byte(suite.receivedBody), &fields))
	suite.Equal(map[string]interface{}{"name": "App", "ouId": testRootOUID}, fields)
	suite.Equal(int64(len(suite.receivedBody)), suite.received.ContentLength)
}

func (suite *ScopeMiddlewareTestSuite) TestUpdateWithProjectBecomesOUID() {
	suite.mockService.On("GetProjectRootOUID", mock.Anything, testProjectID).Return(testRootOUID, nil)

	w := suite.serve(http.MethodPut, "/applications/app-1", `{"name":"App","projectId":"`+testProjectID+`"}`)

	suite.Equal(http.StatusOK, w.Code)
	suite.JSONEq(`{"name":"App","ouId":"`+testRootOUID+`"}`, suite.receivedBody)
}

func (suite *ScopeMiddlewareTestSuite) TestBodyWithProjectAndOUConflicts() {
	for name, body := range map[string]string{
		"an organization unit ID":     `{"projectId":"` + testProjectID + `","ouId":"ou-1"}`,
		"an organization unit handle": `{"projectId":"` + testProjectID + `","ouHandle":"default"}`,
	} {
		suite.Run(name, func() {
			suite.SetupTest()

			w := suite.serve(http.MethodPost, "/applications", body)

			suite.assertError(w, http.StatusBadRequest, ErrorProjectAndOUConflict.Code)
		})
	}
}

func (suite *ScopeMiddlewareTestSuite) TestUnknownProject() {
	for name, tc := range map[string]struct {
		method, target, body string
		lookup               bool
	}{
		"a listing":           {http.MethodGet, "/applications?projectId=" + testProjectID, "", true},
		"a create":            {http.MethodPost, "/applications", `{"projectId":"` + testProjectID + `"}`, true},
		"an empty project ID": {http.MethodGet, "/applications?projectId=", "", false},
		"a non-string ID":     {http.MethodPost, "/applications", `{"projectId":5}`, false},
	} {
		suite.Run(name, func() {
			suite.SetupTest()
			if tc.lookup {
				suite.mockService.On("GetProjectRootOUID", mock.Anything, testProjectID).
					Return("", &ErrorProjectNotFound)
			}

			w := suite.serve(tc.method, tc.target, tc.body)

			suite.assertError(w, http.StatusBadRequest, ErrorUnknownProject.Code)
		})
	}
}

func (suite *ScopeMiddlewareTestSuite) TestLookupFailure() {
	suite.mockService.On("GetProjectRootOUID", mock.Anything, testProjectID).
		Return("", &tidcommon.InternalServerError)

	w := suite.serve(http.MethodGet, "/applications?projectId="+testProjectID, "")

	suite.assertError(w, http.StatusInternalServerError, tidcommon.InternalServerError.Code)
}

func (suite *ScopeMiddlewareTestSuite) TestPassesThroughUntouched() {
	for name, tc := range map[string]struct {
		method, target, body string
	}{
		"a listing without a project":      {http.MethodGet, "/applications?filter=x", ""},
		"a body without a project":         {http.MethodPost, "/applications", `{"name":"App","ouId":"ou-1"}`},
		"a body that is not a JSON object": {http.MethodPost, "/applications", `{`},
		"a collection that is not scoped":  {http.MethodPost, "/users", `{"projectId":"p"}`},
		"a sub-resource of an item":        {http.MethodPost, "/applications/app-1/overlay", `{"projectId":"p"}`},
		"an item read":                     {http.MethodGet, "/applications/app-1?projectId=p", ""},
		"a delete":                         {http.MethodDelete, "/applications/app-1", `{"projectId":"p"}`},
	} {
		suite.Run(name, func() {
			suite.SetupTest()

			w := suite.serve(tc.method, tc.target, tc.body)

			suite.Equal(http.StatusOK, w.Code)
			suite.Require().NotNil(suite.received)
			suite.Equal(tc.target, suite.received.URL.RequestURI())
			suite.Equal(tc.body, suite.receivedBody)
		})
	}
}

func (suite *ScopeMiddlewareTestSuite) TestMatchProjectScopedPath() {
	for path, want := range map[string]struct{ isItem, ok bool }{
		"/applications":                 {false, true},
		"/applications/app-1":           {true, true},
		"/applications/":                {false, false},
		"/applications/app-1/overlay":   {false, false},
		"/applicationsx":                {false, false},
		"/organization-units/ou-1/apps": {false, false},
	} {
		isItem, ok := matchProjectScopedPath(path)
		suite.Equal(want.isItem, isItem, path)
		suite.Equal(want.ok, ok, path)
	}
}
