// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package projectscope

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/thunder-id/thunderid/internal/ou"
	"github.com/thunder-id/thunderid/internal/system/constants"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// fakeOUs is an organization unit tree: finance is a project with a payroll unit beneath it.
type fakeOUs struct {
	units  map[string]ou.OrganizationUnit
	err    *tidcommon.ServiceError
	lookup int
}

func newFakeOUs() *fakeOUs {
	finance := "finance"
	return &fakeOUs{units: map[string]ou.OrganizationUnit{
		"finance": {ID: "finance"},
		"payroll": {ID: "payroll", Parent: &finance},
		"hr":      {ID: "hr"},
	}}
}

func (f *fakeOUs) GetOrganizationUnit(_ context.Context, id string) (ou.OrganizationUnit, *tidcommon.ServiceError) {
	f.lookup++
	if f.err != nil {
		return ou.OrganizationUnit{}, f.err
	}
	unit, ok := f.units[id]
	if !ok {
		return ou.OrganizationUnit{}, &ou.ErrorOrganizationUnitNotFound
	}
	return unit, nil
}

// recordingHandler captures what reached the routes and answers with a fixed JSON body.
type recordingHandler struct {
	query    string
	body     string
	response string
	status   int
}

func (h *recordingHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.query = r.URL.RawQuery
	if r.Body != nil {
		body, _ := io.ReadAll(r.Body)
		h.body = string(body)
	}
	w.Header().Set(constants.ContentTypeHeaderName, constants.ContentTypeJSON)
	if h.status != 0 {
		w.WriteHeader(h.status)
	}
	_, _ = w.Write([]byte(h.response))
}

type ControlPlaneMiddlewareTestSuite struct {
	suite.Suite
	ous  *fakeOUs
	next *recordingHandler
}

func TestControlPlaneMiddlewareTestSuite(t *testing.T) {
	suite.Run(t, new(ControlPlaneMiddlewareTestSuite))
}

func (s *ControlPlaneMiddlewareTestSuite) SetupTest() {
	s.ous = newFakeOUs()
	s.next = &recordingHandler{response: `{}`}
}

func (s *ControlPlaneMiddlewareTestSuite) serve(method, target, body string) *httptest.ResponseRecorder {
	var reader io.Reader
	if body != "" {
		reader = strings.NewReader(body)
	}
	req := httptest.NewRequest(method, target, reader)
	rec := httptest.NewRecorder()
	ControlPlaneMiddleware(s.ous)(s.next).ServeHTTP(rec, req)
	return rec
}

func errorCode(rec *httptest.ResponseRecorder) string {
	var resp struct {
		Code string `json:"code"`
	}
	_ = json.Unmarshal(rec.Body.Bytes(), &resp)
	return resp.Code
}

func (s *ControlPlaneMiddlewareTestSuite) TestListFilterByProject() {
	rec := s.serve(http.MethodGet, "/applications?limit=10&projectId=finance", "")

	s.Equal(http.StatusOK, rec.Code)
	s.Equal("limit=10&ouId=finance", s.next.query)
}

func (s *ControlPlaneMiddlewareTestSuite) TestListFilterRejectsBothAndNonProjects() {
	rec := s.serve(http.MethodGet, "/users?projectId=finance&ouId=payroll", "")
	s.Equal(http.StatusBadRequest, rec.Code)
	s.Equal(ErrorProjectAndOUBothSet.Code, errorCode(rec))

	rec = s.serve(http.MethodGet, "/users?projectId=payroll", "")
	s.Equal(http.StatusBadRequest, rec.Code)
	s.Equal(ErrorNotAProject.Code, errorCode(rec))

	rec = s.serve(http.MethodGet, "/users?projectId=missing", "")
	s.Equal(http.StatusBadRequest, rec.Code)
	s.Equal(ErrorProjectNotFound.Code, errorCode(rec))
}

func (s *ControlPlaneMiddlewareTestSuite) TestCreateWithProject() {
	rec := s.serve(http.MethodPost, "/roles", `{"name":"Auditor","projectId":"finance"}`)

	s.Equal(http.StatusOK, rec.Code)
	var forwarded map[string]string
	s.Require().NoError(json.Unmarshal([]byte(s.next.body), &forwarded))
	s.Equal(map[string]string{"name": "Auditor", "ouId": "finance"}, forwarded)
}

func (s *ControlPlaneMiddlewareTestSuite) TestCreateRejectsBoth() {
	rec := s.serve(http.MethodPost, "/roles", `{"projectId":"finance","ouId":"payroll"}`)

	s.Equal(http.StatusBadRequest, rec.Code)
	s.Equal(ErrorProjectAndOUBothSet.Code, errorCode(rec))
	s.Empty(s.next.body, "the request never reaches the route")
}

func (s *ControlPlaneMiddlewareTestSuite) TestCreateWithOUIsPassedThrough() {
	body := `{"name":"Auditor","ouId":"payroll"}`
	s.serve(http.MethodPost, "/roles", body)

	s.Equal(body, s.next.body)
}

func (s *ControlPlaneMiddlewareTestSuite) TestNonJSONBodyIsPassedThrough() {
	s.serve(http.MethodPost, "/users", "not json")

	s.Equal("not json", s.next.body)
}

func (s *ControlPlaneMiddlewareTestSuite) TestLookupFailureIsAServerError() {
	s.ous.err = &tidcommon.InternalServerError

	rec := s.serve(http.MethodPost, "/roles", `{"projectId":"finance"}`)
	s.Equal(http.StatusInternalServerError, rec.Code)
}

func (s *ControlPlaneMiddlewareTestSuite) TestResponseCarriesProjectOfResource() {
	s.next.response = `{"id":"app-1","ouId":"payroll"}`

	rec := s.serve(http.MethodGet, "/applications/app-1", "")

	var resp map[string]string
	s.Require().NoError(json.Unmarshal(rec.Body.Bytes(), &resp))
	s.Equal("finance", resp["projectId"])
	s.Equal("payroll", resp["ouId"])
}

func (s *ControlPlaneMiddlewareTestSuite) TestListResponseCarriesProjectOfEachItem() {
	s.next.response = `{"totalResults":3,"users":[{"id":"u1","ouId":"payroll"},{"id":"u2","ouId":"hr"},` +
		`{"id":"u3"}]}`

	rec := s.serve(http.MethodGet, "/users", "")

	var resp struct {
		TotalResults int                 `json:"totalResults"`
		Users        []map[string]string `json:"users"`
	}
	s.Require().NoError(json.Unmarshal(rec.Body.Bytes(), &resp))
	s.Equal(3, resp.TotalResults)
	s.Equal("finance", resp.Users[0]["projectId"])
	s.Equal("hr", resp.Users[1]["projectId"])
	s.NotContains(resp.Users[2], "projectId", "an item without an organization unit has no project")
}

func (s *ControlPlaneMiddlewareTestSuite) TestProjectLookupsAreCachedPerRequest() {
	s.next.response = `{"users":[{"ouId":"payroll"},{"ouId":"payroll"},{"ouId":"finance"}]}`

	s.serve(http.MethodGet, "/users", "")

	s.Equal(2, s.ous.lookup, "payroll and finance are each read once")
}

func (s *ControlPlaneMiddlewareTestSuite) TestErrorResponseIsUnchanged() {
	s.next.status = http.StatusNotFound
	s.next.response = `{"code":"APP-1001","ouId":"payroll"}`

	rec := s.serve(http.MethodGet, "/applications/missing", "")

	s.Equal(http.StatusNotFound, rec.Code)
	s.Equal(s.next.response, rec.Body.String())
}

func (s *ControlPlaneMiddlewareTestSuite) TestOtherPathsAreUntouched() {
	s.next.response = `{"ouId":"payroll"}`

	rec := s.serve(http.MethodGet, "/flows?projectId=finance", "")

	s.Equal("projectId=finance", s.next.query)
	s.Equal(s.next.response, rec.Body.String())
}

func TestDataPlaneMiddleware(t *testing.T) {
	cases := []struct {
		name     string
		method   string
		target   string
		body     string
		rejected bool
	}{
		{name: "list filter by project", method: http.MethodGet, target: "/users?projectId=finance", rejected: true},
		{name: "create with project", method: http.MethodPost, target: "/applications",
			body: `{"projectId":"finance"}`, rejected: true},
		{name: "create with organization unit", method: http.MethodPost, target: "/applications",
			body: `{"ouId":"finance"}`},
		{name: "list filter by organization unit", method: http.MethodGet, target: "/users?ouId=finance"},
		{name: "other path", method: http.MethodGet, target: "/flows?projectId=finance"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			next := &recordingHandler{response: `{}`}
			var reader io.Reader
			if tc.body != "" {
				reader = strings.NewReader(tc.body)
			}
			rec := httptest.NewRecorder()
			DataPlaneMiddleware()(next).ServeHTTP(rec, httptest.NewRequest(tc.method, tc.target, reader))

			if tc.rejected {
				if rec.Code != http.StatusBadRequest || errorCode(rec) != ErrorProjectIDNotSupported.Code {
					t.Fatalf("expected %s, got %d %s", ErrorProjectIDNotSupported.Code, rec.Code, rec.Body.String())
				}
				return
			}
			if rec.Code != http.StatusOK || next.body != tc.body {
				t.Fatalf("expected the request to pass through unchanged, got %d body %q", rec.Code, next.body)
			}
		})
	}
}
