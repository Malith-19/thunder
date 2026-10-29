// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

// projectApplication is the part of an application create or update response these tests read.
type projectApplication struct {
	ID   string `json:"id"`
	OUID string `json:"ouId"`
}

// projectApplicationList is the part of an application list response these tests read.
type projectApplicationList struct {
	TotalResults int `json:"totalResults"`
	Applications []struct {
		ID          string `json:"id"`
		IsOwnedByOU *bool  `json:"isOwnedByOU"`
	} `json:"applications"`
}

func (ts *ProjectAPITestSuite) TestCreateApplicationInProject() {
	shop := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"Shop"}`, ts.handle("app-shop")))
	other := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"Other"}`, ts.handle("app-other")))

	inShop := ts.createApp(ts.appBody("shop", `"projectId":%q`, shop.ID))
	ts.Equal(shop.RootOUID, inShop.OUID)
	inOther := ts.createApp(ts.appBody("other", `"ouId":%q`, other.RootOUID))

	list := ts.listApps("?projectId=" + url.QueryEscape(shop.ID))

	ts.Equal(1, list.TotalResults)
	ts.Require().Len(list.Applications, 1)
	ts.Equal(inShop.ID, list.Applications[0].ID)
	ts.Equal(new(true), list.Applications[0].IsOwnedByOU)

	list = ts.listApps("?projectId=" + url.QueryEscape(other.ID))
	ts.Require().Len(list.Applications, 1)
	ts.Equal(inOther.ID, list.Applications[0].ID)
}

func (ts *ProjectAPITestSuite) TestUpdateApplicationWithProject() {
	created := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"Updated"}`, ts.handle("app-updated")))
	app := ts.createApp(ts.appBody("updated", `"ouId":%q`, created.RootOUID))

	status, body := ts.do(http.MethodPut, "/applications/"+app.ID,
		ts.appBody("renamed", `"projectId":%q`, created.ID))

	ts.Require().Equal(http.StatusOK, status, body)
	var updated projectApplication
	ts.Require().NoError(json.Unmarshal([]byte(body), &updated))
	ts.Equal(created.RootOUID, updated.OUID)
	list := ts.listApps("?projectId=" + url.QueryEscape(created.ID))
	ts.Require().Len(list.Applications, 1)
	ts.Equal(app.ID, list.Applications[0].ID)

	status, body = ts.do(http.MethodPut, "/applications/"+app.ID,
		ts.appBody("renamed", `"projectId":%q`, "019a0000-0000-7000-8000-00000000dead"))
	ts.Equal(http.StatusBadRequest, status, body)
	ts.Equal("PRJ-1010", codeOf(ts.T(), body))
}

func (ts *ProjectAPITestSuite) TestApplicationProjectValidation() {
	created := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"Checked"}`, ts.handle("app-checked")))
	const unknownProjectID = "019a0000-0000-7000-8000-00000000dead"

	cases := map[string]struct {
		method string
		path   string
		body   string
		code   string
	}{
		"create with a project and an organization unit": {
			http.MethodPost, "/applications",
			ts.appBody("both", `"projectId":%q,"ouId":%q`, created.ID, created.RootOUID), "PRJ-1011",
		},
		"create with an unknown project": {
			http.MethodPost, "/applications", ts.appBody("unknown", `"projectId":%q`, unknownProjectID), "PRJ-1010",
		},
		"list with a project and a filter": {
			http.MethodGet, "/applications?projectId=" + url.QueryEscape(created.ID) + "&filter=" +
				url.QueryEscape(fmt.Sprintf("ouId eq %q", created.RootOUID)), "", "PRJ-1011",
		},
	}
	for name, tc := range cases {
		ts.Run(name, func() {
			status, body := ts.do(tc.method, tc.path, tc.body)
			ts.Equal(http.StatusBadRequest, status, body)
			ts.Equal(tc.code, codeOf(ts.T(), body))
		})
	}

	status, body := ts.do(http.MethodGet, "/applications?projectId="+unknownProjectID, "")
	ts.Equal(http.StatusBadRequest, status, body)
	ts.Equal("PRJ-1010", codeOf(ts.T(), body))
}

// appBody builds an application request without inbound authentication, with the given placement
// fields spliced in.
func (ts *ProjectAPITestSuite) appBody(name, placement string, args ...interface{}) string {
	return fmt.Sprintf(`{"name":%q,"type":"fullstack",%s}`, ts.handle("app-"+name), fmt.Sprintf(placement, args...))
}

// createApp posts an application, requires a 201, and records it for cleanup.
func (ts *ProjectAPITestSuite) createApp(body string) projectApplication {
	status, resp := ts.do(http.MethodPost, "/applications", body)
	ts.Require().Equal(http.StatusCreated, status, resp)
	var created projectApplication
	ts.Require().NoError(json.Unmarshal([]byte(resp), &created))
	ts.apps = append(ts.apps, created.ID)
	return created
}

// listApps lists applications with the given query and requires a 200.
func (ts *ProjectAPITestSuite) listApps(query string) projectApplicationList {
	var list projectApplicationList
	ts.Require().Equal(http.StatusOK, ts.getJSON("/applications"+query, &list))
	return list
}
