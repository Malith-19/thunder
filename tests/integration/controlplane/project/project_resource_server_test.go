// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"

	"github.com/thunder-id/thunderid/tests/integration/testutils"
)

// projectResourceServer is the part of a resource server create or update response these tests read.
type projectResourceServer struct {
	ID        string `json:"id"`
	OUID      string `json:"ouId"`
	ProjectID string `json:"projectId"`
}

// projectResourceServerList is the part of a resource server list response these tests read.
type projectResourceServerList struct {
	TotalResults    int `json:"totalResults"`
	ResourceServers []struct {
		ID        string `json:"id"`
		ProjectID string `json:"projectId"`
	} `json:"resourceServers"`
}

// A project lists only its own resource servers, and the list without a project leaves them out.
func (ts *ProjectAPITestSuite) TestCreateResourceServerInProject() {
	shop := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"Shop"}`, ts.handle("rs-shop")))
	other := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"Other"}`, ts.handle("rs-other")))

	inShop := ts.createServer(ts.serverBody("shop", `"projectId":%q`, shop.ID))
	ts.Equal(defaultOUID, inShop.OUID)
	ts.Equal(shop.ID, inShop.ProjectID)
	inOther := ts.createServer(ts.serverBody("other", `"projectId":%q`, other.ID))
	unscoped := ts.createServer(ts.serverBody("unscoped", `"ouId":%q`, defaultOUID))

	shopList := ts.listServers("?projectId=" + url.QueryEscape(shop.ID))
	ts.Equal([]string{inShop.ID}, ts.serverIDs(shopList))
	ts.Equal(shop.ID, shopList.ResourceServers[0].ProjectID)
	ts.Equal([]string{inOther.ID}, ts.serverIDs(ts.listServers("?projectId="+url.QueryEscape(other.ID))))

	orgView := ts.serverIDs(ts.listServers("?limit=100"))
	ts.Contains(orgView, unscoped.ID)
	ts.NotContains(orgView, inShop.ID, "a resource server in a project is not listed outside it")
	ts.NotContains(orgView, inOther.ID, "a resource server in a project is not listed outside it")

	var fetched projectResourceServer
	ts.Require().Equal(http.StatusOK, ts.getJSON("/resource-servers/"+inShop.ID, &fetched))
	ts.Equal(shop.ID, fetched.ProjectID)
}

// An update keeps a resource server in its project, and a different project moves it.
func (ts *ProjectAPITestSuite) TestUpdateResourceServerWithProject() {
	first := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"First"}`, ts.handle("rs-first")))
	second := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"Second"}`, ts.handle("rs-second")))
	server := ts.createServer(ts.serverBody("updated", `"projectId":%q`, first.ID))

	kept := ts.updateServer(server.ID, fmt.Sprintf(`{"name":%q}`, ts.handle("rs-updated")))
	ts.Equal(first.ID, kept.ProjectID)

	moved := ts.updateServer(server.ID, fmt.Sprintf(`{"name":%q,"projectId":%q}`, ts.handle("rs-updated"),
		second.ID))
	ts.Equal(second.ID, moved.ProjectID)
	ts.Equal([]string{server.ID}, ts.serverIDs(ts.listServers("?projectId="+url.QueryEscape(second.ID))))
	ts.Empty(ts.serverIDs(ts.listServers("?projectId=" + url.QueryEscape(first.ID))))
}

// A project with a resource server can't be deleted until the resource server is gone.
func (ts *ProjectAPITestSuite) TestDeleteProjectWithResourceServerIsRefused() {
	created := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"Busy"}`, ts.handle("rs-busy")))
	server := ts.createServer(ts.serverBody("busy", `"projectId":%q`, created.ID))

	status, body := ts.do(http.MethodDelete, "/projects/"+created.ID, "")
	ts.Equal(http.StatusConflict, status, body)
	ts.Equal("PRJ-1013", codeOf(ts.T(), body))

	ts.Require().NoError(testutils.DeleteResourceServer(server.ID))
	status, body = ts.do(http.MethodDelete, "/projects/"+created.ID, "")
	ts.Equal(http.StatusNoContent, status, body)
}

func (ts *ProjectAPITestSuite) TestResourceServerWithUnknownProject() {
	const unknownProjectID = "019a0000-0000-7000-8000-00000000dead"

	status, body := ts.do(http.MethodPost, "/resource-servers",
		ts.serverBody("unknown", `"projectId":%q`, unknownProjectID))
	ts.Equal(http.StatusBadRequest, status, body)
	ts.Equal("RES-1025", codeOf(ts.T(), body))

	list := ts.listServers("?projectId=" + unknownProjectID)
	ts.Zero(list.TotalResults)
	ts.Empty(list.ResourceServers)
}

// An exported resource server carries its project, so importing the export brings it back in the
// same project.
func (ts *ProjectAPITestSuite) TestExportedResourceServerKeepsItsProject() {
	created := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"Export"}`, ts.handle("rs-export")))
	server := ts.createServer(ts.serverBody("exported", `"projectId":%q`, created.ID))

	body, err := json.Marshal(map[string]any{"resourceServers": []string{server.ID}})
	ts.Require().NoError(err)
	status, resp := ts.do(http.MethodPost, "/export", string(body))
	ts.Require().Equal(http.StatusOK, status, resp)
	var exported struct {
		Resources string `json:"resources"`
	}
	ts.Require().NoError(json.Unmarshal([]byte(resp), &exported))
	ts.Contains(exported.Resources, "projectId: "+created.ID)

	ts.Require().NoError(testutils.DeleteResourceServer(server.ID))
	ts.importContent(exported.Resources)
	var imported projectResourceServer
	ts.Require().Equal(http.StatusOK, ts.getJSON("/resource-servers/"+server.ID, &imported))
	ts.Equal(created.ID, imported.ProjectID)
}

// serverBody builds a resource server request with the given placement fields spliced in.
func (ts *ProjectAPITestSuite) serverBody(name, placement string, args ...interface{}) string {
	return fmt.Sprintf(`{"name":%q,"identifier":%q,%s}`, ts.handle("rs-"+name),
		"urn:"+strings.ReplaceAll(ts.handle("rs-"+name), "-", ":"), fmt.Sprintf(placement, args...))
}

// createServer posts a resource server, requires a 201, and records it for cleanup.
func (ts *ProjectAPITestSuite) createServer(body string) projectResourceServer {
	status, resp := ts.do(http.MethodPost, "/resource-servers", body)
	ts.Require().Equal(http.StatusCreated, status, resp)
	var created projectResourceServer
	ts.Require().NoError(json.Unmarshal([]byte(resp), &created))
	ts.servers = append(ts.servers, created.ID)
	return created
}

// updateServer puts a resource server and requires a 200.
func (ts *ProjectAPITestSuite) updateServer(id, body string) projectResourceServer {
	status, resp := ts.do(http.MethodPut, "/resource-servers/"+id, body)
	ts.Require().Equal(http.StatusOK, status, resp)
	var updated projectResourceServer
	ts.Require().NoError(json.Unmarshal([]byte(resp), &updated))
	return updated
}

// listServers lists resource servers with the given query and requires a 200.
func (ts *ProjectAPITestSuite) listServers(query string) projectResourceServerList {
	var list projectResourceServerList
	ts.Require().Equal(http.StatusOK, ts.getJSON("/resource-servers"+query, &list))
	return list
}

// serverIDs returns the IDs of the listed resource servers.
func (ts *ProjectAPITestSuite) serverIDs(list projectResourceServerList) []string {
	ids := []string{}
	for _, server := range list.ResourceServers {
		ids = append(ids, server.ID)
	}
	return ids
}
