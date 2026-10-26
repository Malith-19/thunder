// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// defaultOUID is the default organization unit the bootstrap declares
// (backend/cmd/server/bootstrap/01-default-resources.yaml).
const defaultOUID = "01900000-0000-7000-8000-000000000001"

// The bootstrap imports the default organization unit, a root, so the Control Plane creates the
// Default project for it.
func (ts *ProjectAPITestSuite) TestBootstrapCreatesTheDefaultProject() {
	defaultProject := ts.projectWithRootOU(defaultOUID)
	ts.Require().NotNil(defaultProject, "the default organization unit has no project")
	ts.Equal("default", defaultProject.Handle)
	ts.NotEqual(defaultOUID, defaultProject.ID)
}

// Importing a root organization unit creates it with its project, and importing it again keeps the
// same project. A child organization unit is imported on its own.
func (ts *ProjectAPITestSuite) TestImportedRootOUGetsItsProject() {
	rootID := "019a0000-0000-7000-8000-0000000001a0"
	childID := "019a0000-0000-7000-8000-0000000001a1"
	content := fmt.Sprintf("resource_type: organization_unit\nid: %s\nhandle: %s\nname: Imported\n"+
		"---\nresource_type: organization_unit\nid: %s\nhandle: %s\nname: Imported child\nparent: %s\n",
		rootID, ts.handle("imported"), childID, ts.handle("imported-child"), rootID)

	ts.importContent(content)
	imported := ts.projectWithRootOU(rootID)
	ts.Require().NotNil(imported, "the imported root organization unit has no project")
	ts.projects = append(ts.projects, imported.ID)
	ts.childOUs = append(ts.childOUs, childID)
	ts.Equal(ts.handle("imported"), imported.Handle)
	ts.Nil(ts.projectWithRootOU(childID), "a child organization unit must not get a project")

	ts.importContent(content)
	again := ts.projectWithRootOU(rootID)
	ts.Require().NotNil(again)
	ts.Equal(imported.ID, again.ID, "importing the organization unit again must keep its project")
}

// An exported root organization unit is a plain organization unit, so importing the export into a
// Control Plane without it brings the organization unit back with a new project.
func (ts *ProjectAPITestSuite) TestExportedRootOUImportsWithItsProject() {
	created := ts.create(fmt.Sprintf(`{"handle":%q,"displayName":"Exported","description":"Round trip"}`,
		ts.handle("exported")))

	body, err := json.Marshal(map[string]any{"organizationUnits": []string{created.RootOUID}})
	ts.Require().NoError(err)
	status, resp := ts.do(http.MethodPost, "/export", string(body))
	ts.Require().Equal(http.StatusOK, status, resp)
	var exported struct {
		Resources string `json:"resources"`
	}
	ts.Require().NoError(json.Unmarshal([]byte(resp), &exported))
	ts.Contains(exported.Resources, "resource_type: organization_unit")
	ts.Contains(exported.Resources, created.RootOUID)
	ts.NotContains(exported.Resources, created.ID, "the export carries no project")

	status, resp = ts.do(http.MethodDelete, "/projects/"+created.ID, "")
	ts.Require().Equal(http.StatusNoContent, status, resp)

	ts.importContent(exported.Resources)
	imported := ts.projectWithRootOU(created.RootOUID)
	ts.Require().NotNil(imported, "the imported organization unit has no project")
	ts.projects = append(ts.projects, imported.ID)
	ts.NotEqual(created.ID, imported.ID)
	ts.Equal(created.Handle, imported.Handle)
	ts.Equal("Exported", imported.DisplayName)
	ts.Equal("Round trip", imported.Description)
}

// importContent imports YAML resources with upsert, as the bootstrap does, and requires every one to
// succeed.
func (ts *ProjectAPITestSuite) importContent(content string) {
	body, err := json.Marshal(map[string]any{
		"content": content,
		"options": map[string]any{"target": "runtime", "upsert": true},
	})
	ts.Require().NoError(err)

	status, resp := ts.do(http.MethodPost, "/import", string(body))
	ts.Require().Equal(http.StatusOK, status, resp)
	var outcome struct {
		Summary struct {
			Failed int `json:"failed"`
		} `json:"summary"`
	}
	ts.Require().NoError(json.Unmarshal([]byte(resp), &outcome))
	ts.Require().Equal(0, outcome.Summary.Failed, resp)
}

// projectWithRootOU returns the project whose root organization unit is the given one, or nil.
func (ts *ProjectAPITestSuite) projectWithRootOU(rootOUID string) *project {
	var list projectList
	ts.Require().Equal(http.StatusOK, ts.getJSON("/projects?limit=100", &list))
	for _, p := range list.Projects {
		if p.RootOUID == rootOUID {
			return &p
		}
	}
	ts.Require().LessOrEqual(list.TotalResults, len(list.Projects), "more projects than one page holds")
	return nil
}
