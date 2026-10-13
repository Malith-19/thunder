// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package authzenpdp

import (
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"

	"github.com/thunder-id/thunderid/internal/project"
	"github.com/thunder-id/thunderid/internal/system/config"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
	"github.com/thunder-id/thunderid/tests/mocks/database/providermock"
)

// stubProjectResolver stands in for the project service: a requested project is accepted and
// nothing falls back to "prj-default".
type stubProjectResolver struct{}

func (stubProjectResolver) ResolveProjectID(
	_ context.Context, requested, _ string,
) (string, *tidcommon.ServiceError) {
	if requested == "" {
		return "prj-default", nil
	}
	return requested, nil
}

func projectTestRequest(projectID string) ConnectionRequest {
	return ConnectionRequest{
		Name:      "AuthZEN PDP",
		Endpoint:  "https://pdp.example.com/evaluation",
		ProjectID: projectID,
	}
}

func TestCreateConnectionProject(t *testing.T) {
	store := &serviceStoreStub{}
	service := newTestAuthZENPDPService(store, config.AuthZENPDPConfig{})

	created, svcErr := service.CreateAuthZENPDPConnection(context.Background(), projectTestRequest("prj-1"))
	require.Nil(t, svcErr)
	require.Equal(t, "prj-1", created.ProjectID, "without a project resolver the project ID is kept as given")
	require.Equal(t, "prj-1", store.connection.ProjectID)

	store = &serviceStoreStub{}
	service = newTestAuthZENPDPService(store, config.AuthZENPDPConfig{})
	service.projects = stubProjectResolver{}
	created, svcErr = service.CreateAuthZENPDPConnection(context.Background(), projectTestRequest(""))
	require.Nil(t, svcErr)
	require.Equal(t, "prj-default", created.ProjectID, "the project service puts it in the default project")
}

func TestUpdateConnectionProject(t *testing.T) {
	store := &serviceStoreStub{connection: AuthZENPDPConnection{
		ID: "pdp-1", Name: "AuthZEN PDP", Endpoint: "https://pdp.example.com/evaluation", ProjectID: "prj-1",
	}}
	service := newTestAuthZENPDPService(store, config.AuthZENPDPConfig{})
	service.projects = stubProjectResolver{}

	updated, svcErr := service.UpdateAuthZENPDPConnection(context.Background(), "pdp-1", projectTestRequest(""))
	require.Nil(t, svcErr)
	require.Equal(t, "prj-1", updated.ProjectID, "an update without a project keeps the current one")

	_, svcErr = service.UpdateAuthZENPDPConnection(context.Background(), "pdp-1", projectTestRequest("prj-2"))
	require.NotNil(t, svcErr)
	require.Equal(t, project.ErrorProjectChangeNotAllowed.Code, svcErr.Code)
	require.Equal(t, 1, store.updateCalls)
}

func TestUpdateConnectionProjectLabelWithoutResolver(t *testing.T) {
	store := &serviceStoreStub{connection: AuthZENPDPConnection{
		ID: "pdp-1", Name: "AuthZEN PDP", Endpoint: "https://pdp.example.com/evaluation", ProjectID: "prj-1",
	}}
	service := newTestAuthZENPDPService(store, config.AuthZENPDPConfig{})

	updated, svcErr := service.UpdateAuthZENPDPConnection(context.Background(), "pdp-1", projectTestRequest("prj-2"))
	require.Nil(t, svcErr)
	require.Equal(t, "prj-2", updated.ProjectID, "without a project resolver the label is kept as given")
}

func TestProjectUsageChecker(t *testing.T) {
	store := &serviceStoreStub{connections: []AuthZENPDPConnection{{ID: "pdp-1", ProjectID: "prj-1"}}}
	checker := &projectUsageChecker{store: store}

	inUse, err := checker.HasResourcesInProject(context.Background(), "prj-1")
	require.NoError(t, err)
	require.True(t, inUse)

	inUse, err = checker.HasResourcesInProject(context.Background(), "prj-2")
	require.NoError(t, err)
	require.False(t, inUse)

	store.err = fmt.Errorf("store unavailable")
	_, err = checker.HasResourcesInProject(context.Background(), "prj-1")
	require.Error(t, err)
}

func TestConnectionResponseCarriesProject(t *testing.T) {
	require.Equal(t, "prj-1", ToResponse(AuthZENPDPConnection{ID: "pdp-1", ProjectID: "prj-1"}).ProjectID)
}

func TestStorePersistsProject(t *testing.T) {
	dbProvider := providermock.NewDBProviderInterfaceMock(t)
	dbClient := providermock.NewDBClientInterfaceMock(t)
	dbProvider.EXPECT().GetConfigDBClient().Return(dbClient, nil)
	store := &authZENPDPStore{dbProvider: dbProvider}
	connection := AuthZENPDPConnection{ID: "pdp-1", Name: "PDP", ProjectID: "prj-1"}

	dbClient.EXPECT().ExecuteContext(mock.Anything, queryCreateAuthZENPDPConnection, "pdp-1", "PDP", "",
		authZENPDPConnectionType, mock.Anything, "prj-1", mock.Anything).Return(int64(1), nil).Once()
	require.NoError(t, store.CreateAuthZENPDP(context.Background(), connection))

	dbClient.EXPECT().ExecuteContext(mock.Anything, queryUpdateAuthZENPDPConnection, "PDP", "",
		mock.Anything, nil, "pdp-1", authZENPDPConnectionType, mock.Anything).Return(int64(1), nil).Once()
	connection.ProjectID = ""
	require.NoError(t, store.UpdateAuthZENPDP(context.Background(), "pdp-1", connection))
}

func TestBuildAuthZENPDPConnectionReadsProject(t *testing.T) {
	connection, err := (&authZENPDPStore{}).buildAuthZENPDPConnection(map[string]interface{}{
		"id": "pdp-1", "properties": `{}`, "project_id": "prj-1",
	})
	require.NoError(t, err)
	require.Equal(t, "prj-1", connection.ProjectID)

	connection, err = (&authZENPDPStore{}).buildAuthZENPDPConnection(map[string]interface{}{
		"id": "pdp-1", "properties": `{}`, "project_id": nil,
	})
	require.NoError(t, err)
	require.Empty(t, connection.ProjectID)

	require.Nil(t, nullableProjectID(""))
	require.Equal(t, "prj-1", nullableProjectID("prj-1"))
}
