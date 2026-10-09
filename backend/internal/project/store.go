// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"fmt"

	"github.com/thunder-id/thunderid/internal/system/database/provider"
	"github.com/thunder-id/thunderid/internal/system/deployment"
)

// projectStoreInterface is what the service needs of persistence.
type projectStoreInterface interface {
	CreateProject(ctx context.Context, p Project) error
	GetProject(ctx context.Context, id string) (Project, error)
	GetProjectList(ctx context.Context, limit, offset int) ([]Project, error)
	GetProjectListCount(ctx context.Context) (int, error)
	UpdateProject(ctx context.Context, p Project) error
	DeleteProject(ctx context.Context, id string) error
	IsHandleTaken(ctx context.Context, handle, exceptID string) (bool, error)
}

type projectStore struct {
	dbProvider provider.DBProviderInterface
}

func newProjectStore() projectStoreInterface {
	return &projectStore{dbProvider: provider.GetDBProvider()}
}

// scope is the deployment this request acts for.
func (s *projectStore) scope(ctx context.Context) string {
	return deployment.Resolve(ctx)
}

func (s *projectStore) client() (provider.DBClientInterface, error) {
	dbClient, err := s.dbProvider.GetConfigDBClient()
	if err != nil {
		return nil, fmt.Errorf("failed to get database client: %w", err)
	}
	return dbClient, nil
}

func (s *projectStore) CreateProject(ctx context.Context, p Project) error {
	dbClient, err := s.client()
	if err != nil {
		return err
	}
	if _, err := dbClient.ExecuteContext(ctx, queryCreateProject,
		p.ID, p.Handle, p.Name, p.Description, s.scope(ctx)); err != nil {
		return fmt.Errorf("failed to create project: %w", err)
	}
	return nil
}

func (s *projectStore) GetProject(ctx context.Context, id string) (Project, error) {
	dbClient, err := s.client()
	if err != nil {
		return Project{}, err
	}
	rows, err := dbClient.QueryContext(ctx, queryGetProject, id, s.scope(ctx))
	if err != nil {
		return Project{}, fmt.Errorf("failed to get project: %w", err)
	}
	if len(rows) == 0 {
		return Project{}, errProjectNotFound
	}
	return projectFromRow(rows[0]), nil
}

func (s *projectStore) GetProjectList(ctx context.Context, limit, offset int) ([]Project, error) {
	dbClient, err := s.client()
	if err != nil {
		return nil, err
	}
	rows, err := dbClient.QueryContext(ctx, queryGetProjectList, limit, offset, s.scope(ctx))
	if err != nil {
		return nil, fmt.Errorf("failed to list projects: %w", err)
	}
	projects := make([]Project, 0, len(rows))
	for _, row := range rows {
		projects = append(projects, projectFromRow(row))
	}
	return projects, nil
}

func (s *projectStore) GetProjectListCount(ctx context.Context) (int, error) {
	dbClient, err := s.client()
	if err != nil {
		return 0, err
	}
	rows, err := dbClient.QueryContext(ctx, queryGetProjectListCount, s.scope(ctx))
	if err != nil {
		return 0, fmt.Errorf("failed to count projects: %w", err)
	}
	return countFromRows(rows), nil
}

func (s *projectStore) UpdateProject(ctx context.Context, p Project) error {
	dbClient, err := s.client()
	if err != nil {
		return err
	}
	updated, err := dbClient.ExecuteContext(ctx, queryUpdateProject,
		p.ID, p.Handle, p.Name, p.Description, s.scope(ctx))
	if err != nil {
		return fmt.Errorf("failed to update project: %w", err)
	}
	if updated == 0 {
		return errProjectNotFound
	}
	return nil
}

func (s *projectStore) DeleteProject(ctx context.Context, id string) error {
	dbClient, err := s.client()
	if err != nil {
		return err
	}
	if _, err := dbClient.ExecuteContext(ctx, queryDeleteProject, id, s.scope(ctx)); err != nil {
		return fmt.Errorf("failed to delete project: %w", err)
	}
	return nil
}

func (s *projectStore) IsHandleTaken(ctx context.Context, handle, exceptID string) (bool, error) {
	dbClient, err := s.client()
	if err != nil {
		return false, err
	}
	rows, err := dbClient.QueryContext(ctx, queryCheckProjectHandleConflict, handle, exceptID, s.scope(ctx))
	if err != nil {
		return false, fmt.Errorf("failed to check project handle: %w", err)
	}
	return countFromRows(rows) > 0, nil
}

func projectFromRow(row map[string]interface{}) Project {
	return Project{
		ID:          stringValue(row["id"]),
		Handle:      stringValue(row["handle"]),
		Name:        stringValue(row["name"]),
		Description: stringValue(row["description"]),
	}
}

func stringValue(v interface{}) string {
	switch value := v.(type) {
	case string:
		return value
	case []byte:
		return string(value)
	default:
		return ""
	}
}

// countFromRows reads a COUNT(*) as total result, which Postgres returns as int64 and SQLite as a
// float64.
func countFromRows(rows []map[string]interface{}) int {
	if len(rows) == 0 {
		return 0
	}
	switch total := rows[0]["total"].(type) {
	case int64:
		return int(total)
	case float64:
		return int(total)
	default:
		return 0
	}
}
