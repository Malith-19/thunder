// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"context"
	"errors"
	"regexp"
	"strings"

	serverconst "github.com/thunder-id/thunderid/internal/system/constants"
	"github.com/thunder-id/thunderid/internal/system/log"
	sysutils "github.com/thunder-id/thunderid/internal/system/utils"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// DefaultProjectHandle is the handle of the project that holds the resources created without one.
// It is created the first time it is needed.
const DefaultProjectHandle = "default"

const (
	defaultProjectName  = "Default"
	loggerComponentName = "ProjectService"
	maxNameLength       = 100
	maxHandleLength     = 100
	basePath            = "/projects"
)

var handlePattern = regexp.MustCompile(`^[a-z0-9]+(-[a-z0-9]+)*$`)

// ProjectServiceInterface manages projects.
type ProjectServiceInterface interface {
	CreateProject(ctx context.Context, request ProjectRequest) (*Project, *tidcommon.ServiceError)
	GetProject(ctx context.Context, id string) (*Project, *tidcommon.ServiceError)
	GetProjectList(ctx context.Context, limit, offset int) (*ProjectListResponse, *tidcommon.ServiceError)
	UpdateProject(ctx context.Context, id string, request ProjectRequest) (*Project, *tidcommon.ServiceError)
	DeleteProject(ctx context.Context, id string) *tidcommon.ServiceError
	// IsProjectExists reports whether a project with the ID exists. Resources that carry a project ID
	// use it to validate the reference.
	IsProjectExists(ctx context.Context, id string) (bool, *tidcommon.ServiceError)
}

// ProjectUsageChecker reports whether a resource type still has resources in a project. Each
// resource type that carries a project ID registers one, so a project cannot be deleted from under
// its resources.
type ProjectUsageChecker interface {
	HasResourcesInProject(ctx context.Context, projectID string) (bool, error)
}

type projectService struct {
	store         projectStoreInterface
	usageCheckers []ProjectUsageChecker
	uuidGenerator func() (string, error)
	logger        *log.Logger
}

func newProjectService(store projectStoreInterface) *projectService {
	return &projectService{
		store:         store,
		uuidGenerator: sysutils.GenerateUUIDv7,
		logger:        log.GetLogger().With(log.String(log.LoggerKeyComponentName, loggerComponentName)),
	}
}

// AddUsageChecker registers a resource type whose resources keep a project from being deleted.
func (s *projectService) AddUsageChecker(checker ProjectUsageChecker) {
	s.usageCheckers = append(s.usageCheckers, checker)
}

func (s *projectService) CreateProject(
	ctx context.Context, request ProjectRequest,
) (*Project, *tidcommon.ServiceError) {
	// The default project claims its handle first, so no other project can take it.
	if _, svcErr := s.defaultProjectID(ctx); svcErr != nil {
		return nil, svcErr
	}
	p, svcErr := s.validateRequest(ctx, "", request)
	if svcErr != nil {
		return nil, svcErr
	}

	id, err := s.uuidGenerator()
	if err != nil {
		s.logger.Error(ctx, "Failed to generate project ID", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	p.ID = id

	if err := s.store.CreateProject(ctx, p); err != nil {
		s.logger.Error(ctx, "Failed to create project", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	return &p, nil
}

func (s *projectService) GetProject(ctx context.Context, id string) (*Project, *tidcommon.ServiceError) {
	p, err := s.store.GetProject(ctx, id)
	if err != nil {
		if errors.Is(err, errProjectNotFound) {
			return nil, &ErrorProjectNotFound
		}
		s.logger.Error(ctx, "Failed to get project", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	return &p, nil
}

func (s *projectService) GetProjectList(
	ctx context.Context, limit, offset int,
) (*ProjectListResponse, *tidcommon.ServiceError) {
	if limit < 1 || limit > serverconst.MaxPageSize || offset < 0 {
		return nil, &ErrorInvalidPagination
	}
	if _, svcErr := s.defaultProjectID(ctx); svcErr != nil {
		return nil, svcErr
	}

	total, err := s.store.GetProjectListCount(ctx)
	if err != nil {
		s.logger.Error(ctx, "Failed to count projects", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	projects, err := s.store.GetProjectList(ctx, limit, offset)
	if err != nil {
		s.logger.Error(ctx, "Failed to list projects", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}

	return &ProjectListResponse{
		TotalResults: total,
		StartIndex:   offset + 1,
		Count:        len(projects),
		Projects:     projects,
		Links:        sysutils.BuildPaginationLinks(basePath, limit, offset, total, ""),
	}, nil
}

func (s *projectService) UpdateProject(
	ctx context.Context, id string, request ProjectRequest,
) (*Project, *tidcommon.ServiceError) {
	existing, svcErr := s.GetProject(ctx, id)
	if svcErr != nil {
		return nil, svcErr
	}
	if existing.IsDefault && request.Handle != DefaultProjectHandle {
		return nil, &ErrorDefaultProjectProtected
	}
	if !existing.IsDefault {
		if _, svcErr := s.defaultProjectID(ctx); svcErr != nil {
			return nil, svcErr
		}
	}

	p, svcErr := s.validateRequest(ctx, id, request)
	if svcErr != nil {
		return nil, svcErr
	}
	p.ID = id
	p.IsDefault = existing.IsDefault

	if err := s.store.UpdateProject(ctx, p); err != nil {
		if errors.Is(err, errProjectNotFound) {
			return nil, &ErrorProjectNotFound
		}
		s.logger.Error(ctx, "Failed to update project", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	return &p, nil
}

func (s *projectService) DeleteProject(ctx context.Context, id string) *tidcommon.ServiceError {
	existing, svcErr := s.GetProject(ctx, id)
	if svcErr != nil {
		return svcErr
	}
	if existing.IsDefault {
		return &ErrorDefaultProjectProtected
	}

	for _, checker := range s.usageCheckers {
		inUse, err := checker.HasResourcesInProject(ctx, id)
		if err != nil {
			s.logger.Error(ctx, "Failed to check project usage", log.Error(err))
			return &tidcommon.InternalServerError
		}
		if inUse {
			return &ErrorProjectInUse
		}
	}

	if err := s.store.DeleteProject(ctx, id); err != nil {
		s.logger.Error(ctx, "Failed to delete project", log.Error(err))
		return &tidcommon.InternalServerError
	}
	return nil
}

func (s *projectService) IsProjectExists(ctx context.Context, id string) (bool, *tidcommon.ServiceError) {
	if _, svcErr := s.GetProject(ctx, id); svcErr != nil {
		if svcErr.Code == ErrorProjectNotFound.Code {
			return false, nil
		}
		return false, svcErr
	}
	return true, nil
}

// ResolveProjectID returns the project of a resource. A resource owned by an organization unit in a
// project belongs to that project, and a request naming another one is rejected. Any other resource
// belongs to the project the request names, which must exist, or to the default project.
func (s *projectService) ResolveProjectID(
	ctx context.Context, requested, ownerProjectID string,
) (string, *tidcommon.ServiceError) {
	if ownerProjectID != "" {
		if requested != "" && requested != ownerProjectID {
			return "", &ErrorProjectMismatch
		}
		return ownerProjectID, nil
	}
	if requested == "" {
		return s.defaultProjectID(ctx)
	}
	exists, svcErr := s.IsProjectExists(ctx, requested)
	if svcErr != nil {
		return "", svcErr
	}
	if !exists {
		return "", &ErrorProjectNotFound
	}
	return requested, nil
}

// AssignUnassignedToDefault moves the organization units and configuration resources that belong to no
// project into the default project, creating the project the first time. Resources created where there
// are no projects, such as by the data plane's bootstrap or before projects existed, carry no project.
func (s *projectService) AssignUnassignedToDefault(ctx context.Context) error {
	defaultID, svcErr := s.defaultProjectID(ctx)
	if svcErr != nil {
		return errors.New("failed to get the default project: " + svcErr.Code)
	}
	return s.store.AssignUnassignedResources(ctx, defaultID)
}

// defaultProjectID returns the ID of the default project, creating the project the first time.
func (s *projectService) defaultProjectID(ctx context.Context) (string, *tidcommon.ServiceError) {
	p, err := s.store.GetProjectByHandle(ctx, DefaultProjectHandle)
	if err == nil {
		return p.ID, nil
	}
	if !errors.Is(err, errProjectNotFound) {
		s.logger.Error(ctx, "Failed to get the default project", log.Error(err))
		return "", &tidcommon.InternalServerError
	}

	id, err := s.uuidGenerator()
	if err != nil {
		s.logger.Error(ctx, "Failed to generate project ID", log.Error(err))
		return "", &tidcommon.InternalServerError
	}
	created := Project{ID: id, Handle: DefaultProjectHandle, Name: defaultProjectName, IsDefault: true}
	if err := s.store.CreateProject(ctx, created); err != nil {
		// A concurrent request may have created it first.
		if p, getErr := s.store.GetProjectByHandle(ctx, DefaultProjectHandle); getErr == nil {
			return p.ID, nil
		}
		s.logger.Error(ctx, "Failed to create the default project", log.Error(err))
		return "", &tidcommon.InternalServerError
	}
	return id, nil
}

// validateRequest checks a create or update request and returns the project it describes. exceptID
// is the project being updated, so its own handle is not reported as taken.
func (s *projectService) validateRequest(
	ctx context.Context, exceptID string, request ProjectRequest,
) (Project, *tidcommon.ServiceError) {
	p := Project{
		Handle:      strings.TrimSpace(request.Handle),
		Name:        strings.TrimSpace(request.Name),
		Description: strings.TrimSpace(request.Description),
	}
	if p.Name == "" || len(p.Name) > maxNameLength {
		return Project{}, &ErrorInvalidName
	}
	if len(p.Handle) > maxHandleLength || !handlePattern.MatchString(p.Handle) {
		return Project{}, &ErrorInvalidHandle
	}

	taken, err := s.store.IsHandleTaken(ctx, p.Handle, exceptID)
	if err != nil {
		s.logger.Error(ctx, "Failed to check project handle", log.Error(err))
		return Project{}, &tidcommon.InternalServerError
	}
	if taken {
		return Project{}, &ErrorHandleConflict
	}
	return p, nil
}
