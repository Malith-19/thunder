// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"fmt"
	"time"

	dbmodel "github.com/thunder-id/thunderid/internal/system/database/model"
	dbprovider "github.com/thunder-id/thunderid/internal/system/database/provider"
	"github.com/thunder-id/thunderid/internal/system/deployment"
)

// storeInterface is the persistence the project service needs.
type storeInterface interface {
	Create(ctx context.Context, project Project) error
	GetByID(ctx context.Context, id string) (*Project, error)
	GetByHandle(ctx context.Context, handle string) (*Project, error)
	List(ctx context.Context, limit, offset int) ([]Project, error)
	Count(ctx context.Context) (int, error)
}

type store struct {
	dbProvider dbprovider.DBProviderInterface
}

func newStore() storeInterface {
	return &store{dbProvider: dbprovider.GetDBProvider()}
}

func (s *store) Create(ctx context.Context, project Project) error {
	dbClient, err := s.dbProvider.GetConfigDBClient()
	if err != nil {
		return fmt.Errorf("failed to get database client: %w", err)
	}
	_, err = dbClient.ExecuteContext(ctx, queryInsertProject, project.ID, project.Handle, project.Name,
		project.Description, project.RootOUID, deployment.Resolve(ctx))
	if err != nil {
		return fmt.Errorf("failed to create the project: %w", err)
	}
	return nil
}

func (s *store) GetByID(ctx context.Context, id string) (*Project, error) {
	return s.getOne(ctx, queryGetProjectByID, id)
}

func (s *store) GetByHandle(ctx context.Context, handle string) (*Project, error) {
	return s.getOne(ctx, queryGetProjectByHandle, handle)
}

func (s *store) getOne(ctx context.Context, query dbmodel.DBQuery, key string) (*Project, error) {
	dbClient, err := s.dbProvider.GetConfigDBClient()
	if err != nil {
		return nil, fmt.Errorf("failed to get database client: %w", err)
	}
	rows, err := dbClient.QueryContext(ctx, query, key, deployment.Resolve(ctx))
	if err != nil {
		return nil, fmt.Errorf("failed to read the project: %w", err)
	}
	if len(rows) == 0 {
		return nil, nil
	}
	project := projectFromRow(rows[0])
	return &project, nil
}

func (s *store) List(ctx context.Context, limit, offset int) ([]Project, error) {
	dbClient, err := s.dbProvider.GetConfigDBClient()
	if err != nil {
		return nil, fmt.Errorf("failed to get database client: %w", err)
	}
	rows, err := dbClient.QueryContext(ctx, queryListProjects, limit, offset, deployment.Resolve(ctx))
	if err != nil {
		return nil, fmt.Errorf("failed to list the projects: %w", err)
	}
	projects := make([]Project, 0, len(rows))
	for _, row := range rows {
		projects = append(projects, projectFromRow(row))
	}
	return projects, nil
}

func (s *store) Count(ctx context.Context) (int, error) {
	dbClient, err := s.dbProvider.GetConfigDBClient()
	if err != nil {
		return 0, fmt.Errorf("failed to get database client: %w", err)
	}
	rows, err := dbClient.QueryContext(ctx, queryCountProjects, deployment.Resolve(ctx))
	if err != nil {
		return 0, fmt.Errorf("failed to count the projects: %w", err)
	}
	if len(rows) == 0 {
		return 0, nil
	}
	switch total := rows[0]["total"].(type) {
	case int64:
		return int(total), nil
	case int:
		return total, nil
	default:
		return 0, fmt.Errorf("unexpected project count type %T", total)
	}
}

func projectFromRow(row map[string]interface{}) Project {
	return Project{
		ID:          asString(row["id"]),
		Handle:      asString(row["handle"]),
		Name:        asString(row["name"]),
		Description: asString(row["description"]),
		RootOUID:    asString(row["root_ou_id"]),
		CreatedAt:   asTime(row["created_at"]),
		UpdatedAt:   asTime(row["updated_at"]),
	}
}

func asString(v interface{}) string {
	switch value := v.(type) {
	case string:
		return value
	case []byte:
		return string(value)
	}
	return ""
}

// asTime reads a timestamp stored as a time by PostgreSQL and as text by SQLite.
func asTime(v interface{}) time.Time {
	switch value := v.(type) {
	case time.Time:
		return value
	case string:
		for _, layout := range []string{time.RFC3339, "2006-01-02 15:04:05"} {
			if parsed, err := time.Parse(layout, value); err == nil {
				return parsed
			}
		}
	}
	return time.Time{}
}
