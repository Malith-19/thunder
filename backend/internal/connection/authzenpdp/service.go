// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package authzenpdp

import (
	"context"
	"errors"
	"fmt"
	"net/url"
	"strings"

	"github.com/thunder-id/thunderid/internal/entitytype"
	"github.com/thunder-id/thunderid/internal/project"
	"github.com/thunder-id/thunderid/internal/system/config"
	declarativeresource "github.com/thunder-id/thunderid/internal/system/declarative_resource"
	"github.com/thunder-id/thunderid/internal/system/log"
	sysutils "github.com/thunder-id/thunderid/internal/system/utils"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
	"github.com/thunder-id/thunderid/pkg/thunderidengine/providers"
)

// AuthZENPDPServiceInterface defines AuthZEN PDP connection management operations.
type AuthZENPDPServiceInterface interface {
	CreateAuthZENPDPConnection(
		ctx context.Context,
		request ConnectionRequest,
	) (*AuthZENPDPConnection, *tidcommon.ServiceError)
	UpdateAuthZENPDPConnection(
		ctx context.Context,
		id string,
		request ConnectionRequest,
	) (*AuthZENPDPConnection, *tidcommon.ServiceError)
	DeleteAuthZENPDPConnection(ctx context.Context, id string) *tidcommon.ServiceError
	ListAuthZENPDPs(ctx context.Context) ([]AuthZENPDPConnection, *tidcommon.ServiceError)
	GetAuthZENPDP(ctx context.Context, id string) (*AuthZENPDPConnection, *tidcommon.ServiceError)
}

// AuthZENPDPService provides storage operations for AuthZEN PDP connections.
type AuthZENPDPService struct {
	store         authZENPDPStoreInterface
	defaults      config.AuthZENPDPConfig
	transactioner providers.Transactioner
	entityTypes   entitytype.EntityTypeServiceInterface
	logger        *log.Logger
	// projects decides the project of a connection.
	projects project.Resolver
}

var _ AuthZENPDPServiceInterface = (*AuthZENPDPService)(nil)

const reservedSubjectGroupsAttribute = "groups"

// newAuthZENPDPService creates an AuthZEN PDP connection service.
func newAuthZENPDPService(
	store authZENPDPStoreInterface,
	defaults config.AuthZENPDPConfig,
	transactioner providers.Transactioner,
	entityTypes entitytype.EntityTypeServiceInterface,
) *AuthZENPDPService {
	return &AuthZENPDPService{
		store:         store,
		defaults:      defaults,
		transactioner: transactioner,
		entityTypes:   entityTypes,
		logger:        log.GetLogger().With(log.String(log.LoggerKeyComponentName, "AuthZENPDPService")),
	}
}

// CreateAuthZENPDPConnection validates and stores an AuthZEN PDP connection.
func (s *AuthZENPDPService) CreateAuthZENPDPConnection(
	ctx context.Context,
	request ConnectionRequest,
) (*AuthZENPDPConnection, *tidcommon.ServiceError) {
	connection := s.fromRequest(request)
	if svcErr := declarativeresource.CheckDeclarativeCreate(); svcErr != nil {
		return nil, svcErr
	}
	if connection.Name == "" {
		return nil, &ErrorInvalidName
	}
	if err := normalizeEndpoints(&connection); err != nil {
		return nil, &ErrorInvalidEndpoint
	}
	if svcErr := s.validateSubjectAttributeMappings(ctx, connection.SubjectAttributeMappings); svcErr != nil {
		return nil, svcErr
	}
	projectID, svcErr := project.ResolveProjectID(ctx, s.projects, connection.ProjectID, "")
	if svcErr != nil {
		return nil, svcErr
	}
	connection.ProjectID = projectID
	if connection.ID == "" {
		connection.ID = sysutils.GenerateUUID()
	}
	err := s.transactioner.Transact(ctx, func(txCtx context.Context) error {
		existing, getErr := s.GetAuthZENPDPByName(txCtx, connection.Name)
		if getErr != nil {
			return getErr
		}
		if existing != nil {
			svcErr = &ErrorAlreadyExists
			return errors.New("AuthZEN PDP connection already exists")
		}
		return s.store.CreateAuthZENPDP(txCtx, connection)
	})
	if svcErr != nil {
		return nil, svcErr
	}
	if err != nil {
		s.logger.Error(ctx, "Failed to create AuthZEN PDP connection",
			log.Error(err), log.String("connectionName", connection.Name))
		return nil, &tidcommon.InternalServerError
	}
	return &connection, nil
}

// UpdateAuthZENPDPConnection validates and replaces an AuthZEN PDP connection.
func (s *AuthZENPDPService) UpdateAuthZENPDPConnection(
	ctx context.Context,
	id string,
	request ConnectionRequest,
) (*AuthZENPDPConnection, *tidcommon.ServiceError) {
	connection := s.fromRequest(request)
	if svcErr := declarativeresource.CheckDeclarativeUpdate(); svcErr != nil {
		return nil, svcErr
	}
	if connection.Name == "" {
		return nil, &ErrorInvalidName
	}
	current, svcErr := s.GetAuthZENPDP(ctx, id)
	if svcErr != nil {
		return nil, svcErr
	}
	if current == nil {
		return nil, &ErrorNotFound
	}
	if err := normalizeEndpoints(&connection); err != nil {
		return nil, &ErrorInvalidEndpoint
	}
	if svcErr := s.validateSubjectAttributeMappings(ctx, connection.SubjectAttributeMappings); svcErr != nil {
		return nil, svcErr
	}
	existing, err := s.GetAuthZENPDPByName(ctx, connection.Name)
	if err != nil {
		s.logger.Error(ctx, "Failed to get AuthZEN PDP connection by name",
			log.Error(err), log.String("connectionName", connection.Name))
		return nil, &tidcommon.InternalServerError
	}
	if existing != nil && existing.ID != id {
		return nil, &ErrorAlreadyExists
	}
	projectID, svcErr := s.resolveUpdatedProjectID(ctx, current, connection)
	if svcErr != nil {
		return nil, svcErr
	}
	connection.ProjectID = projectID
	connection.ID = id
	if err := s.store.UpdateAuthZENPDP(ctx, id, connection); err != nil {
		if errors.Is(err, ErrAuthZENPDPIsImmutable) {
			return nil, &declarativeresource.ErrorDeclarativeResourceUpdateOperation
		}
		s.logger.Error(ctx, "Failed to update AuthZEN PDP connection", log.Error(err), log.String("connectionID", id))
		return nil, &tidcommon.InternalServerError
	}
	updated, svcErr := s.GetAuthZENPDP(ctx, id)
	if svcErr != nil {
		return nil, svcErr
	}
	if updated == nil {
		return nil, &tidcommon.InternalServerError
	}
	return updated, nil
}

// resolveUpdatedProjectID returns the project of an updated connection. An update that leaves the
// project out keeps the current one, and a connection stays in the project it was created in.
func (s *AuthZENPDPService) resolveUpdatedProjectID(
	ctx context.Context, existing *AuthZENPDPConnection, updated AuthZENPDPConnection,
) (string, *tidcommon.ServiceError) {
	requested := updated.ProjectID
	if requested == "" {
		requested = existing.ProjectID
	}
	projectID, svcErr := project.ResolveProjectID(ctx, s.projects, requested, "")
	if svcErr != nil {
		return "", svcErr
	}
	if s.projects != nil && existing.ProjectID != "" && projectID != existing.ProjectID {
		return "", &project.ErrorProjectChangeNotAllowed
	}
	return projectID, nil
}

// DeleteAuthZENPDPConnection deletes an AuthZEN PDP connection.
func (s *AuthZENPDPService) DeleteAuthZENPDPConnection(ctx context.Context, id string) *tidcommon.ServiceError {
	if svcErr := declarativeresource.CheckDeclarativeDelete(); svcErr != nil {
		return svcErr
	}
	if err := s.store.DeleteAuthZENPDP(ctx, id); err != nil {
		if errors.Is(err, ErrAuthZENPDPIsImmutable) {
			return &declarativeresource.ErrorDeclarativeResourceDeleteOperation
		}
		s.logger.Error(ctx, "Failed to delete AuthZEN PDP connection", log.Error(err), log.String("connectionID", id))
		return &tidcommon.InternalServerError
	}
	return nil
}

// ListAuthZENPDPs returns all AuthZEN PDP connections.
func (s *AuthZENPDPService) ListAuthZENPDPs(ctx context.Context) ([]AuthZENPDPConnection, *tidcommon.ServiceError) {
	connections, err := s.store.ListAuthZENPDPs(ctx)
	if err != nil {
		s.logger.Error(ctx, "Failed to list AuthZEN PDP connections", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	for i := range connections {
		s.applyDefaults(&connections[i])
	}
	return connections, nil
}

// GetAuthZENPDP returns an AuthZEN PDP connection by ID.
func (s *AuthZENPDPService) GetAuthZENPDP(
	ctx context.Context, id string,
) (*AuthZENPDPConnection, *tidcommon.ServiceError) {
	connection, err := s.store.GetAuthZENPDP(ctx, id)
	if err != nil {
		s.logger.Error(ctx, "Failed to get AuthZEN PDP connection", log.Error(err), log.String("connectionID", id))
		return nil, &tidcommon.InternalServerError
	}
	if connection == nil {
		return nil, nil
	}
	s.applyDefaults(connection)
	return connection, nil
}

// GetAuthZENPDPByName returns an AuthZEN PDP connection by name.
func (s *AuthZENPDPService) GetAuthZENPDPByName(
	ctx context.Context, name string,
) (*AuthZENPDPConnection, error) {
	connection, err := s.store.GetAuthZENPDPByName(ctx, name)
	if err != nil || connection == nil {
		return connection, err
	}
	s.applyDefaults(connection)
	return connection, nil
}

// retryCountDefault returns the configured retry count, defaulting to zero.
func retryCountDefault(defaults config.AuthZENPDPConfig) int {
	if defaults.RetryCount == nil {
		return 0
	}
	return *defaults.RetryCount
}

// normalizeEndpoints trims and validates the configured PDP endpoints.
func normalizeEndpoints(connection *AuthZENPDPConnection) error {
	if connection == nil {
		return fmt.Errorf("connection is required")
	}
	connection.Endpoint = strings.TrimSpace(connection.Endpoint)
	connection.BatchEndpoint = strings.TrimSpace(connection.BatchEndpoint)
	return validateConnection(*connection)
}

// validateConnection validates the required single and optional batch PDP endpoints.
func validateConnection(connection AuthZENPDPConnection) error {
	if err := validateEndpoint(connection.Endpoint); err != nil {
		return fmt.Errorf("invalid access evaluation endpoint: %w", err)
	}
	if connection.BatchEndpoint != "" {
		if err := validateEndpoint(connection.BatchEndpoint); err != nil {
			return fmt.Errorf("invalid access evaluations endpoint: %w", err)
		}
	}
	return nil
}

// validateEndpoint accepts only absolute HTTP or HTTPS endpoints.
func validateEndpoint(endpoint string) error {
	parsedEndpoint, err := url.Parse(endpoint)
	if err != nil || parsedEndpoint.Host == "" ||
		(parsedEndpoint.Scheme != "http" && parsedEndpoint.Scheme != "https") {
		return fmt.Errorf("endpoint must be an absolute URL")
	}
	return nil
}

// validateSubjectAttributeMappings verifies mapped attributes against the declared subject type.
func (s *AuthZENPDPService) validateSubjectAttributeMappings(
	ctx context.Context,
	mappings []SubjectAttributeMapping,
) *tidcommon.ServiceError {
	if len(mappings) == 0 {
		return nil
	}
	if s.entityTypes == nil {
		return &tidcommon.InternalServerError
	}
	for _, mapping := range mappings {
		if mapping.EntityType == "" {
			return &ErrorInvalidSubjectAttributeMapping
		}
		attributes, svcErr := s.getSubjectTypeAttributes(ctx, mapping.EntityType)
		if svcErr != nil {
			return svcErr
		}
		allowed := make(map[string]struct{}, len(attributes))
		for _, attribute := range attributes {
			allowed[attribute.Attribute] = struct{}{}
		}
		for _, attribute := range mapping.Attributes {
			if attribute.Attribute == reservedSubjectGroupsAttribute {
				continue
			}
			if _, ok := allowed[attribute.Attribute]; !ok {
				return &ErrorInvalidSubjectAttributeMapping
			}
		}
	}
	return nil
}

// getSubjectTypeAttributes resolves attributes for an unambiguous entity type.
func (s *AuthZENPDPService) getSubjectTypeAttributes(
	ctx context.Context,
	entityType string,
) ([]entitytype.AttributeInfo, *tidcommon.ServiceError) {
	filter := entitytype.AttributeFilter{AllowNonCredential: true}
	attributesByCategory, svcErr := s.entityTypes.GetAttributesForEntityType(ctx, entityType, filter)
	if svcErr != nil {
		if svcErr.Code == entitytype.ErrorEntityTypeNotFound.Code {
			return nil, &ErrorInvalidSubjectAttributeMapping
		}
		return nil, &tidcommon.InternalServerError
	}
	if len(attributesByCategory) != 1 {
		return nil, &ErrorInvalidSubjectAttributeMapping
	}
	for _, attributes := range attributesByCategory {
		return attributes, nil
	}
	return nil, &ErrorInvalidSubjectAttributeMapping
}

// fromRequest converts an API request into the internal connection model with configured defaults.
func (s *AuthZENPDPService) fromRequest(req ConnectionRequest) AuthZENPDPConnection {
	timeoutMS := req.TimeoutMS
	if timeoutMS <= 0 {
		timeoutMS = s.defaults.TimeoutMS
	}
	retryCount := retryCountDefault(s.defaults)
	if req.RetryCount != nil {
		retryCount = *req.RetryCount
	}
	connection := AuthZENPDPConnection{
		ID:                       req.ID,
		Name:                     strings.TrimSpace(req.Name),
		Description:              req.Description,
		ProjectID:                req.ProjectID,
		Endpoint:                 req.Endpoint,
		BatchEndpoint:            req.BatchEndpoint,
		TimeoutMS:                timeoutMS,
		RetryCount:               retryCount,
		SubjectAttributeMappings: sanitizeSubjectAttributeMappings(req.SubjectAttributeMappings),
	}
	return connection
}

// cloneSubjectAttributeMappings returns an independent copy of subject attribute mappings.
func cloneSubjectAttributeMappings(groups []SubjectAttributeMapping) []SubjectAttributeMapping {
	if len(groups) == 0 {
		return nil
	}
	clone := make([]SubjectAttributeMapping, 0, len(groups))
	for _, group := range groups {
		clone = append(clone, SubjectAttributeMapping{
			EntityType: group.EntityType,
			Attributes: append([]SubjectAttributeRow(nil), group.Attributes...),
		})
	}
	return clone
}

// sanitizeSubjectAttributeMappings trims mapping values and drops empty attribute rows.
func sanitizeSubjectAttributeMappings(groups []SubjectAttributeMapping) []SubjectAttributeMapping {
	if len(groups) == 0 {
		return nil
	}
	result := make([]SubjectAttributeMapping, 0, len(groups))
	for _, group := range groups {
		attributes := make([]SubjectAttributeRow, 0, len(group.Attributes))
		for _, attribute := range group.Attributes {
			name := strings.TrimSpace(attribute.Attribute)
			if name == "" {
				continue
			}
			attributes = append(attributes, SubjectAttributeRow{
				Attribute:    name,
				PDPAttribute: strings.TrimSpace(attribute.PDPAttribute),
			})
		}
		entityType := strings.TrimSpace(group.EntityType)
		if entityType == "" && len(attributes) == 0 {
			continue
		}
		result = append(result, SubjectAttributeMapping{
			EntityType: entityType,
			Attributes: attributes,
		})
	}
	if len(result) == 0 {
		return nil
	}
	return result
}

// applyDefaults fills unset settings from stored connections with configured defaults.
func (s *AuthZENPDPService) applyDefaults(connection *AuthZENPDPConnection) {
	if connection.TimeoutMS <= 0 {
		connection.TimeoutMS = s.defaults.TimeoutMS
	}
	if connection.RetryCount < 0 {
		connection.RetryCount = retryCountDefault(s.defaults)
	}
}
