// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package notification

import (
	"context"
	"errors"

	"github.com/stretchr/testify/mock"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"github.com/thunder-id/thunderid/internal/notification/common"
	"github.com/thunder-id/thunderid/internal/project"
)

const testProjectID = "prj-1"

// stubProjectRegistry stands in for the project service: a requested project is accepted, nothing
// falls back to "prj-default", and registered usage checkers are kept for inspection.
type stubProjectRegistry struct {
	checkers []project.ProjectUsageChecker
}

func (r *stubProjectRegistry) ResolveProjectID(
	_ context.Context, requested, _ string,
) (string, *tidcommon.ServiceError) {
	if requested == "" {
		return "prj-default", nil
	}
	return requested, nil
}

func (r *stubProjectRegistry) AddUsageChecker(checker project.ProjectUsageChecker) {
	r.checkers = append(r.checkers, checker)
}

func (suite *NotificationSenderMgtServiceTestSuite) TestCreateSender_Project() {
	suite.mockStore.EXPECT().getSenderByName(mock.Anything, mock.Anything).Return(nil, nil)
	suite.mockStore.EXPECT().createSender(mock.Anything, mock.Anything).Return(nil)

	labeled := suite.getValidTwilioSender()
	labeled.ProjectID = testProjectID
	result, svcErr := suite.service.CreateSender(context.Background(), labeled)
	suite.Nil(svcErr)
	suite.Equal(testProjectID, result.ProjectID, "without a project resolver the project ID is kept as given")

	suite.service.projects = &stubProjectRegistry{}
	result, svcErr = suite.service.CreateSender(context.Background(), suite.getValidTwilioSender())
	suite.Nil(svcErr)
	suite.Equal("prj-default", result.ProjectID, "the project service puts it in the default project")
}

func (suite *NotificationSenderMgtServiceTestSuite) TestUpdateSender_Project() {
	suite.service.projects = &stubProjectRegistry{}
	existing := suite.getValidTwilioSender()
	existing.ID = testSenderID
	existing.ProjectID = testProjectID
	suite.mockStore.EXPECT().getSenderByID(mock.Anything, testSenderID).Return(&existing, nil)
	suite.mockStore.EXPECT().updateSender(mock.Anything, testSenderID,
		mock.MatchedBy(func(s common.NotificationSenderDTO) bool { return s.ProjectID == testProjectID })).
		Return(nil).Once()

	result, svcErr := suite.service.UpdateSender(context.Background(), testSenderID, suite.getValidTwilioSender())
	suite.Nil(svcErr)
	suite.Equal(testProjectID, result.ProjectID, "an update without a project keeps the current one")

	moved := suite.getValidTwilioSender()
	moved.ProjectID = "prj-2"
	_, svcErr = suite.service.UpdateSender(context.Background(), testSenderID, moved)
	suite.Require().NotNil(svcErr)
	suite.Equal(project.ErrorProjectChangeNotAllowed.Code, svcErr.Code)
}

func (suite *NotificationSenderMgtServiceTestSuite) TestUpdateSender_ProjectLabelWithoutResolver() {
	existing := suite.getValidTwilioSender()
	existing.ID = testSenderID
	existing.ProjectID = testProjectID
	suite.mockStore.EXPECT().getSenderByID(mock.Anything, testSenderID).Return(&existing, nil).Once()
	suite.mockStore.EXPECT().updateSender(mock.Anything, testSenderID, mock.Anything).Return(nil).Once()

	relabeled := suite.getValidTwilioSender()
	relabeled.ProjectID = "prj-2"
	result, svcErr := suite.service.UpdateSender(context.Background(), testSenderID, relabeled)
	suite.Nil(svcErr)
	suite.Equal("prj-2", result.ProjectID, "without a project resolver the label is kept as given")
}

func (suite *NotificationSenderMgtServiceTestSuite) TestProjectUsageChecker() {
	suite.mockStore.EXPECT().listSenders(mock.Anything).
		Return([]common.NotificationSenderDTO{{ID: "s1", ProjectID: testProjectID}}, nil).Twice()
	checker := &projectUsageChecker{store: suite.mockStore}

	inUse, err := checker.HasResourcesInProject(context.Background(), testProjectID)
	suite.NoError(err)
	suite.True(inUse)

	inUse, err = checker.HasResourcesInProject(context.Background(), "prj-2")
	suite.NoError(err)
	suite.False(inUse)

	suite.mockStore.EXPECT().listSenders(mock.Anything).Return(nil, errors.New("db down")).Once()
	_, err = checker.HasResourcesInProject(context.Background(), testProjectID)
	suite.Error(err)
}

func (suite *InitTestSuite) TestInitialize_RegistersProjectUsageChecker() {
	registry := &stubProjectRegistry{}
	mgtService, _, _, err := Initialize(suite.mockJWTService, registry)
	suite.Require().NoError(err)

	suite.Equal(registry, mgtService.(*notificationSenderMgtService).projects)
	suite.Len(registry.checkers, 1)
}

func (suite *StoreTestSuite) TestCreateSender_Project() {
	sender := common.NotificationSenderDTO{ID: "s1", Name: "n1", ProjectID: testProjectID}
	suite.mockDBProvider.EXPECT().GetConfigDBClient().Return(suite.mockDBClient, nil).Once()
	suite.mockDBClient.EXPECT().ExecuteContext(context.Background(), queryCreateNotificationSender,
		sender.Name, sender.ID, sender.Description, string(sender.Type), string(sender.Provider), "",
		testProjectID, testDeploymentID).Return(int64(1), nil).Once()

	suite.NoError(suite.store.createSender(context.Background(), sender))
}

func (suite *StoreTestSuite) TestUpdateSender_Project() {
	sender := common.NotificationSenderDTO{ID: "s1", Name: "n1", ProjectID: testProjectID}
	suite.mockDBProvider.EXPECT().GetConfigDBClient().Return(suite.mockDBClient, nil).Once()
	suite.mockDBClient.EXPECT().ExecuteContext(context.Background(), queryUpdateNotificationSender,
		sender.Name, sender.Description, string(sender.Provider), "", testProjectID, "s1", string(sender.Type),
		testDeploymentID).Return(int64(1), nil).Once()

	suite.NoError(suite.store.updateSender(context.Background(), "s1", sender))
}

func (suite *StoreTestSuite) TestBuildSenderFromResultRow_Project() {
	sender, err := suite.store.buildSenderFromResultRow(map[string]interface{}{
		"id": "s1", "name": "n1", "description": "", "type": "message", "provider": "twilio",
		"project_id": testProjectID,
	})
	suite.NoError(err)
	suite.Equal(testProjectID, sender.ProjectID)

	sender, err = suite.store.buildSenderFromResultRow(map[string]interface{}{
		"id": "s1", "name": "n1", "description": "", "type": "message", "provider": "twilio",
		"project_id": nil,
	})
	suite.NoError(err)
	suite.Empty(sender.ProjectID)

	suite.Nil(nullableProjectID(""))
	suite.Equal(testProjectID, nullableProjectID(testProjectID))
}
