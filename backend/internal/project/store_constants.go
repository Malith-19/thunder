// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import dbmodel "github.com/thunder-id/thunderid/internal/system/database/model"

var (
	// queryInsertProject records a project and its root organization unit.
	queryInsertProject = dbmodel.DBQuery{
		ID: "PRJ-01",
		Query: `INSERT INTO "PROJECT" (ID, HANDLE, NAME, DESCRIPTION, ROOT_OU_ID, DEPLOYMENT_ID) ` +
			`VALUES ($1, $2, $3, $4, $5, $6)`,
	}
	// queryGetProjectByID returns one project.
	queryGetProjectByID = dbmodel.DBQuery{
		ID: "PRJ-02",
		Query: `SELECT ID, HANDLE, NAME, DESCRIPTION, ROOT_OU_ID, CREATED_AT, UPDATED_AT FROM "PROJECT" ` +
			`WHERE ID = $1 AND DEPLOYMENT_ID = $2`,
	}
	// queryGetProjectByHandle returns the project with a handle, used to refuse a duplicate.
	queryGetProjectByHandle = dbmodel.DBQuery{
		ID: "PRJ-03",
		Query: `SELECT ID, HANDLE, NAME, DESCRIPTION, ROOT_OU_ID, CREATED_AT, UPDATED_AT FROM "PROJECT" ` +
			`WHERE HANDLE = $1 AND DEPLOYMENT_ID = $2`,
	}
	// queryListProjects returns a page of projects, oldest first.
	queryListProjects = dbmodel.DBQuery{
		ID: "PRJ-04",
		Query: `SELECT ID, HANDLE, NAME, DESCRIPTION, ROOT_OU_ID, CREATED_AT, UPDATED_AT FROM "PROJECT" ` +
			`WHERE DEPLOYMENT_ID = $3 ORDER BY CREATED_AT, ID LIMIT $1 OFFSET $2`,
	}
	// queryCountProjects returns the number of projects.
	queryCountProjects = dbmodel.DBQuery{
		ID:    "PRJ-05",
		Query: `SELECT COUNT(*) AS total FROM "PROJECT" WHERE DEPLOYMENT_ID = $1`,
	}
)
