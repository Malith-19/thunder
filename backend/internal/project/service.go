// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"strings"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"github.com/thunder-id/thunderid/internal/ou"
	"github.com/thunder-id/thunderid/internal/system/log"
	"github.com/thunder-id/thunderid/internal/system/utils"
)

const loggerComponentName = "ProjectService"

// ServiceInterface manages projects.
type ServiceInterface interface {
	CreateProject(ctx context.Context, request CreateProjectRequest) (*Project, *tidcommon.ServiceError)
	GetProject(ctx context.Context, id string) (*Project, *tidcommon.ServiceError)
	ListProjects(ctx context.Context, limit, offset int) (*ProjectListResponse, *tidcommon.ServiceError)
}

// ouCreator is the part of the organization unit service a project needs for its root.
type ouCreator interface {
	CreateOrganizationUnit(ctx context.Context, request ou.OrganizationUnitRequestWithID) (
		ou.OrganizationUnit, *tidcommon.ServiceError)
	IsOrganizationUnitExists(ctx context.Context, id string) (bool, *tidcommon.ServiceError)
	DeleteOrganizationUnit(ctx context.Context, id string) *tidcommon.ServiceError
}

type service struct {
	store     storeInterface
	ouService ouCreator
	logger    *log.Logger
}

func newService(store storeInterface, ouService ouCreator) ServiceInterface {
	return &service{
		store:     store,
		ouService: ouService,
		logger:    log.GetLogger().With(log.String(log.LoggerKeyComponentName, loggerComponentName)),
	}
}

// CreateProject creates the project's root organization unit and then the project. The two live in
// different databases, so a project that cannot be recorded removes the root it created.
func (s *service) CreateProject(ctx context.Context, request CreateProjectRequest) (
	*Project, *tidcommon.ServiceError) {
	request.Handle = strings.TrimSpace(request.Handle)
	request.Name = strings.TrimSpace(request.Name)
	if request.Handle == "" || request.Name == "" || strings.Contains(request.Handle, "/") {
		return nil, &ErrorInvalidRequestFormat
	}

	projectID, svcErr := s.resolveNewProjectID(ctx, request.ID)
	if svcErr != nil {
		return nil, svcErr
	}

	existing, err := s.store.GetByHandle(ctx, request.Handle)
	if err != nil {
		s.logger.Error(ctx, "Failed to check the project handle", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	if existing != nil {
		return nil, &ErrorHandleConflict
	}

	rootOUID, err := utils.GenerateUUIDv7()
	if err != nil {
		s.logger.Error(ctx, "Failed to generate the root organization unit ID", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	rootOU, svcErr := s.ouService.CreateOrganizationUnit(ctx, ou.OrganizationUnitRequestWithID{
		ID:          rootOUID,
		Handle:      request.Handle,
		Name:        request.Name,
		Description: request.Description,
	})
	if svcErr != nil {
		return nil, svcErr
	}

	project := Project{
		ID:          projectID,
		Handle:      request.Handle,
		Name:        request.Name,
		Description: request.Description,
		RootOUID:    rootOU.ID,
	}
	if err := s.store.Create(ctx, project); err != nil {
		s.logger.Error(ctx, "Failed to record the project", log.Error(err), log.String("projectID", projectID))
		if delErr := s.ouService.DeleteOrganizationUnit(ctx, rootOU.ID); delErr != nil {
			s.logger.Error(ctx, "Failed to remove the root organization unit of an unrecorded project",
				log.String("ouID", rootOU.ID), log.Any("error", delErr))
		}
		return nil, &tidcommon.InternalServerError
	}

	return s.GetProject(ctx, projectID)
}

// resolveNewProjectID validates a caller-supplied project ID, or generates one.
func (s *service) resolveNewProjectID(ctx context.Context, requestedID string) (string, *tidcommon.ServiceError) {
	if requestedID == "" {
		id, err := utils.GenerateUUIDv7()
		if err != nil {
			s.logger.Error(ctx, "Failed to generate the project ID", log.Error(err))
			return "", &tidcommon.InternalServerError
		}
		return id, nil
	}
	if !utils.IsValidUUID(requestedID) {
		return "", &ErrorInvalidProjectID
	}
	existing, err := s.store.GetByID(ctx, requestedID)
	if err != nil {
		s.logger.Error(ctx, "Failed to check the project ID", log.Error(err))
		return "", &tidcommon.InternalServerError
	}
	if existing != nil {
		return "", &ErrorIDConflict
	}
	ouExists, svcErr := s.ouService.IsOrganizationUnitExists(ctx, requestedID)
	if svcErr != nil {
		return "", svcErr
	}
	if ouExists {
		return "", &ErrorIDConflict
	}
	return requestedID, nil
}

// GetProject returns one project.
func (s *service) GetProject(ctx context.Context, id string) (*Project, *tidcommon.ServiceError) {
	project, err := s.store.GetByID(ctx, id)
	if err != nil {
		s.logger.Error(ctx, "Failed to read the project", log.Error(err), log.String("projectID", id))
		return nil, &tidcommon.InternalServerError
	}
	if project == nil {
		return nil, &ErrorProjectNotFound
	}
	return project, nil
}

// ListProjects returns a page of projects.
func (s *service) ListProjects(ctx context.Context, limit, offset int) (
	*ProjectListResponse, *tidcommon.ServiceError) {
	total, err := s.store.Count(ctx)
	if err != nil {
		s.logger.Error(ctx, "Failed to count the projects", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	projects, err := s.store.List(ctx, limit, offset)
	if err != nil {
		s.logger.Error(ctx, "Failed to list the projects", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	return &ProjectListResponse{
		TotalResults: total,
		StartIndex:   offset + 1,
		Count:        len(projects),
		Projects:     projects,
		Links:        utils.BuildPaginationLinks("/projects", limit, offset, total, ""),
	}, nil
}
