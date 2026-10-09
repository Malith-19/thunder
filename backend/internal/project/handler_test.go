// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/suite"
)

type ProjectHandlerTestSuite struct {
	suite.Suite
	store *fakeStore
	mux   *http.ServeMux
}

func TestProjectHandlerTestSuite(t *testing.T) {
	suite.Run(t, new(ProjectHandlerTestSuite))
}

func (s *ProjectHandlerTestSuite) SetupTest() {
	s.store = newFakeStore(Project{ID: "prj-1", Handle: "hr", Name: "HR"})
	service := newProjectService(s.store)
	service.uuidGenerator = func() (string, error) { return "prj-2", nil }
	s.mux = http.NewServeMux()
	registerRoutes(s.mux, newProjectHandler(service))
}

func (s *ProjectHandlerTestSuite) serve(method, target, body string) *httptest.ResponseRecorder {
	req := httptest.NewRequest(method, target, strings.NewReader(body))
	w := httptest.NewRecorder()
	s.mux.ServeHTTP(w, req)
	return w
}

func (s *ProjectHandlerTestSuite) TestList() {
	w := s.serve(http.MethodGet, "/projects?limit=10", "")
	s.Equal(http.StatusOK, w.Code)

	var response ProjectListResponse
	s.Require().NoError(json.Unmarshal(w.Body.Bytes(), &response))
	s.Equal(1, response.TotalResults)
	s.Equal("hr", response.Projects[0].Handle)

	s.Equal(http.StatusBadRequest, s.serve(http.MethodGet, "/projects?limit=abc", "").Code)
	s.Equal(http.StatusBadRequest, s.serve(http.MethodGet, "/projects?offset=abc", "").Code)
	s.Equal(http.StatusBadRequest, s.serve(http.MethodGet, "/projects?limit=0", "").Code)
}

func (s *ProjectHandlerTestSuite) TestCreate() {
	w := s.serve(http.MethodPost, "/projects", `{"name":"Finance","handle":"finance"}`)
	s.Equal(http.StatusCreated, w.Code)
	s.Contains(s.store.projects, "prj-2")

	s.Equal(http.StatusConflict, s.serve(http.MethodPost, "/projects", `{"name":"Again","handle":"hr"}`).Code)
	s.Equal(http.StatusBadRequest, s.serve(http.MethodPost, "/projects", `{"name":"","handle":"x"}`).Code)
	s.Equal(http.StatusBadRequest, s.serve(http.MethodPost, "/projects", `not json`).Code)
}

func (s *ProjectHandlerTestSuite) TestGet() {
	s.Equal(http.StatusOK, s.serve(http.MethodGet, "/projects/prj-1", "").Code)
	s.Equal(http.StatusNotFound, s.serve(http.MethodGet, "/projects/missing", "").Code)
}

func (s *ProjectHandlerTestSuite) TestUpdate() {
	w := s.serve(http.MethodPut, "/projects/prj-1", `{"name":"People","handle":"hr"}`)
	s.Equal(http.StatusOK, w.Code)
	s.Equal("People", s.store.projects["prj-1"].Name)

	s.Equal(http.StatusNotFound, s.serve(http.MethodPut, "/projects/missing", `{"name":"X","handle":"x"}`).Code)
	s.Equal(http.StatusBadRequest, s.serve(http.MethodPut, "/projects/prj-1", `not json`).Code)
}

func (s *ProjectHandlerTestSuite) TestDelete() {
	s.Equal(http.StatusNoContent, s.serve(http.MethodDelete, "/projects/prj-1", "").Code)
	s.Equal(http.StatusNotFound, s.serve(http.MethodDelete, "/projects/prj-1", "").Code)
}

func (s *ProjectHandlerTestSuite) TestPreflight() {
	s.Equal(http.StatusNoContent, s.serve(http.MethodOptions, "/projects", "").Code)
	s.Equal(http.StatusNoContent, s.serve(http.MethodOptions, "/projects/prj-1", "").Code)
}
