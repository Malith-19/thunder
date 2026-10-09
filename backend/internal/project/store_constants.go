// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import dbmodel "github.com/thunder-id/thunderid/internal/system/database/model"

var (
	queryCreateProject = dbmodel.DBQuery{
		ID: "PRJQ-01",
		Query: `INSERT INTO "PROJECT" (ID, HANDLE, NAME, DESCRIPTION, DEPLOYMENT_ID) ` +
			`VALUES ($1, $2, $3, $4, $5)`,
	}

	queryGetProject = dbmodel.DBQuery{
		ID:    "PRJQ-02",
		Query: `SELECT ID, HANDLE, NAME, DESCRIPTION FROM "PROJECT" WHERE ID = $1 AND DEPLOYMENT_ID = $2`,
	}

	queryGetProjectList = dbmodel.DBQuery{
		ID: "PRJQ-03",
		Query: `SELECT ID, HANDLE, NAME, DESCRIPTION FROM "PROJECT" ` +
			`WHERE DEPLOYMENT_ID = $3 ORDER BY NAME LIMIT $1 OFFSET $2`,
	}

	queryGetProjectListCount = dbmodel.DBQuery{
		ID:    "PRJQ-04",
		Query: `SELECT COUNT(*) as total FROM "PROJECT" WHERE DEPLOYMENT_ID = $1`,
	}

	queryUpdateProject = dbmodel.DBQuery{
		ID: "PRJQ-05",
		Query: `UPDATE "PROJECT" SET HANDLE = $2, NAME = $3, DESCRIPTION = $4, UPDATED_AT = NOW() ` +
			`WHERE ID = $1 AND DEPLOYMENT_ID = $5`,
		SQLiteQuery: `UPDATE "PROJECT" SET HANDLE = $2, NAME = $3, DESCRIPTION = $4, ` +
			`UPDATED_AT = datetime('now') WHERE ID = $1 AND DEPLOYMENT_ID = $5`,
	}

	queryDeleteProject = dbmodel.DBQuery{
		ID:    "PRJQ-06",
		Query: `DELETE FROM "PROJECT" WHERE ID = $1 AND DEPLOYMENT_ID = $2`,
	}

	queryCheckProjectHandleConflict = dbmodel.DBQuery{
		ID: "PRJQ-07",
		Query: `SELECT COUNT(*) as total FROM "PROJECT" ` +
			`WHERE HANDLE = $1 AND ID <> $2 AND DEPLOYMENT_ID = $3`,
	}
)
