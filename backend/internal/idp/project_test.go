// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package idp

import (
	"context"
	"errors"

	"github.com/stretchr/testify/mock"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
	"github.com/thunder-id/thunderid/pkg/thunderidengine/providers"

	"github.com/thunder-id/thunderid/internal/project"
)

// stubProjectResolver stands in for the project service: a requested project is
// accepted and nothing falls back to "prj-default".
type stubProjectResolver struct{}

func (stubProjectResolver) ResolveProjectID(
	_ context.Context, requested, _ string,
) (string, *tidcommon.ServiceError) {
	if requested == "" {
		return "prj-default", nil
	}
	return requested, nil
}

func (s *IDPServiceTestSuite) TestCreateIdentityProvider_Project() {
	s.mockStore.On("GetIdentityProviderByName", mock.Anything, mock.Anything).
		Return((*providers.IDPDTO)(nil), ErrIDPNotFound)
	s.mockStore.On("CreateIdentityProvider", mock.Anything, mock.Anything).Return(nil)

	labeled := &providers.IDPDTO{Name: "Labeled", Type: providers.IDPTypeOIDC,
		Properties: createOIDCProperties(), ProjectID: "prj-1"}
	result, svcErr := s.idpService.CreateIdentityProvider(context.Background(), labeled)
	s.Nil(svcErr)
	s.Equal("prj-1", result.ProjectID, "without a project resolver the project ID is kept as given")

	s.idpService.projects = stubProjectResolver{}
	defaulted := &providers.IDPDTO{Name: "Defaulted", Type: providers.IDPTypeOIDC,
		Properties: createOIDCProperties()}
	result, svcErr = s.idpService.CreateIdentityProvider(context.Background(), defaulted)
	s.Nil(svcErr)
	s.Equal("prj-default", result.ProjectID, "the project service puts it in the default project")
}

func (s *IDPServiceTestSuite) TestUpdateIdentityProvider_Project() {
	s.idpService.projects = stubProjectResolver{}
	existing := &providers.IDPDTO{ID: "idp-1", Name: "Google", Type: providers.IDPTypeOIDC,
		Properties: createOIDCProperties(), ProjectID: "prj-1"}
	s.mockStore.On("GetIdentityProvider", mock.Anything, "idp-1").Return(existing, nil)
	s.mockStore.On("UpdateIdentityProvider", mock.Anything, mock.Anything).Return(nil).Once()

	kept := &providers.IDPDTO{Name: "Google", Type: providers.IDPTypeOIDC, Properties: createOIDCProperties()}
	result, svcErr := s.idpService.UpdateIdentityProvider(context.Background(), "idp-1", kept)
	s.Nil(svcErr)
	s.Equal("prj-1", result.ProjectID, "an update without a project keeps the current one")

	moved := &providers.IDPDTO{Name: "Google", Type: providers.IDPTypeOIDC, Properties: createOIDCProperties(),
		ProjectID: "prj-2"}
	_, svcErr = s.idpService.UpdateIdentityProvider(context.Background(), "idp-1", moved)
	s.Require().NotNil(svcErr)
	s.Equal(project.ErrorProjectChangeNotAllowed.Code, svcErr.Code)
}

func (s *IDPServiceTestSuite) TestProjectUsageChecker() {
	s.mockStore.On("GetIdentityProviderList", mock.Anything).
		Return([]BasicIDPDTO{{ID: "idp-1", ProjectID: "prj-1"}}, nil).Twice()
	checker := &projectUsageChecker{store: s.mockStore}

	inUse, err := checker.HasResourcesInProject(context.Background(), "prj-1")
	s.NoError(err)
	s.True(inUse)

	inUse, err = checker.HasResourcesInProject(context.Background(), "prj-2")
	s.NoError(err)
	s.False(inUse)

	s.mockStore.On("GetIdentityProviderList", mock.Anything).Return(nil, errors.New("db down")).Once()
	_, err = checker.HasResourcesInProject(context.Background(), "prj-1")
	s.Error(err)
}

func (s *IDPStoreTestSuite) TestBuildIDPFromResultRow_Project() {
	idp, err := buildIDPFromResultRow(map[string]interface{}{
		"id": "idp-1", "name": "Google", "description": "", "type": "GOOGLE", "project_id": "prj-1",
	})
	s.NoError(err)
	s.Equal("prj-1", idp.ProjectID)
	s.Nil(nullableProjectID(""))
	s.Equal("prj-1", nullableProjectID("prj-1"))
}
