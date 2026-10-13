// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package notificationtemplate

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"

	"github.com/stretchr/testify/mock"

	"github.com/thunder-id/thunderid/internal/project"
	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
)

// stubProjectResolver stands in for the project service: a requested project is accepted and a
// template without one falls back to "prj-default".
type stubProjectResolver struct{}

func (stubProjectResolver) ResolveProjectID(
	_ context.Context, requested, _ string,
) (string, *tidcommon.ServiceError) {
	if requested == "" {
		return "prj-default", nil
	}
	return requested, nil
}

func (s *NotificationTemplateServiceTestSuite) TestCreateTemplate_Project() {
	s.mockStore.On("IsHandleExists", mock.Anything, ChannelTypeEmail, mock.Anything).Return(false, nil)
	s.mockStore.On("CreateTemplate", mock.Anything, mock.Anything).Return(nil)

	labeled, err := s.svc.CreateTemplate(s.ctx, ChannelTypeEmail, CreateTemplateRequest{
		Handle: "labeled", DisplayName: "Labeled", Content: TemplateContent{Subject: "s", Body: "b"},
		ProjectID: "prj-1"})
	s.Require().Nil(err)
	s.Equal("prj-1", labeled.ProjectID, "without a project resolver the project ID is kept as given")

	s.svc.(*notificationTemplateService).projects = stubProjectResolver{}
	defaulted, err := s.svc.CreateTemplate(s.ctx, ChannelTypeEmail, CreateTemplateRequest{
		Handle: "defaulted", DisplayName: "Defaulted", Content: TemplateContent{Subject: "s", Body: "b"}})
	s.Require().Nil(err)
	s.Equal("prj-default", defaulted.ProjectID, "the project service puts it in the default project")
}

func (s *NotificationTemplateServiceTestSuite) TestUpdateTemplate_Project() {
	s.svc.(*notificationTemplateService).projects = stubProjectResolver{}
	s.mockStore.On("GetTemplate", mock.Anything, ChannelTypeEmail, "t1").Return(templateDAO{
		ID: "t1", Channel: ChannelTypeEmail, Handle: "otp", DisplayName: "OTP",
		Content: TemplateContent{Subject: "s", Body: "b"}, ProjectID: "prj-1",
	}, nil)
	s.mockStore.On("UpdateTemplate", mock.Anything, mock.MatchedBy(func(d templateDAO) bool {
		return d.ProjectID == "prj-1"
	})).Return(nil).Once()

	kept, err := s.svc.UpdateTemplate(s.ctx, ChannelTypeEmail, "t1", UpdateTemplateRequest{
		DisplayName: "OTP", Content: TemplateContent{Subject: "s", Body: "b"}})
	s.Require().Nil(err)
	s.Equal("prj-1", kept.ProjectID, "an update without a project keeps the current one")

	_, err = s.svc.UpdateTemplate(s.ctx, ChannelTypeEmail, "t1", UpdateTemplateRequest{
		DisplayName: "OTP", Content: TemplateContent{Subject: "s", Body: "b"}, ProjectID: "prj-2"})
	s.Require().NotNil(err)
	s.Equal(project.ErrorProjectChangeNotAllowed.Code, err.Code)
}

func (s *NotificationTemplateServiceTestSuite) TestUpdateTemplate_ProjectLabelKeptWithoutResolver() {
	s.mockStore.On("GetTemplate", mock.Anything, ChannelTypeEmail, "t1").Return(templateDAO{
		ID: "t1", Channel: ChannelTypeEmail, Handle: "otp", DisplayName: "OTP",
		Content: TemplateContent{Subject: "s", Body: "b"}, ProjectID: "prj-1",
	}, nil)
	s.mockStore.On("UpdateTemplate", mock.Anything, mock.Anything).Return(nil)

	relabeled, err := s.svc.UpdateTemplate(s.ctx, ChannelTypeEmail, "t1", UpdateTemplateRequest{
		DisplayName: "OTP", Content: TemplateContent{Subject: "s", Body: "b"}, ProjectID: "prj-2"})
	s.Require().Nil(err)
	s.Equal("prj-2", relabeled.ProjectID, "without a project resolver the project ID is a plain label")
}

func (s *NotificationTemplateServiceTestSuite) TestListTemplates_ByProject() {
	s.mockStore.On("CountTemplates", mock.Anything, ChannelTypeEmail, "prj-1").Return(3, nil)
	s.mockStore.On("ListTemplates", mock.Anything, ChannelTypeEmail, 1, 1, "prj-1").Return([]templateDAO{
		{ID: "t1", Channel: ChannelTypeEmail, Handle: "otp", DisplayName: "OTP", ProjectID: "prj-1"},
	}, nil)

	list, err := s.svc.ListTemplates(s.ctx, ChannelTypeEmail, 1, 1, "prj-1")
	s.Require().Nil(err)
	s.Equal(3, list.TotalResults)
	s.Require().Len(list.Templates, 1)
	s.Equal("prj-1", list.Templates[0].ProjectID)
	for _, link := range list.Links {
		s.Contains(link.Href, "projectId=prj-1")
	}
}

func (s *NotificationTemplateServiceTestSuite) TestProjectUsageChecker() {
	s.mockStore.On("CountTemplates", mock.Anything, ChannelTypeEmail, "prj-1").Return(1, nil).Maybe()
	s.mockStore.On("CountTemplates", mock.Anything, ChannelTypeSMS, "prj-1").Return(0, nil).Maybe()
	s.mockStore.On("CountTemplates", mock.Anything, mock.Anything, "prj-2").Return(0, nil)
	s.mockStore.On("CountTemplates", mock.Anything, mock.Anything, "prj-3").Return(0, errors.New("db down"))
	checker := &projectUsageChecker{store: s.mockStore}

	inUse, err := checker.HasResourcesInProject(s.ctx, "prj-1")
	s.NoError(err)
	s.True(inUse)

	inUse, err = checker.HasResourcesInProject(s.ctx, "prj-2")
	s.NoError(err)
	s.False(inUse)

	_, err = checker.HasResourcesInProject(s.ctx, "prj-3")
	s.Error(err)
}

func (s *HandlerTestSuite) TestHandleTemplateList_ByProject() {
	s.mockService.On("ListTemplates", mock.Anything, ChannelTypeEmail, 30, 0, "prj-1").
		Return(&TemplateListResponse{}, nil)

	req := httptest.NewRequest(http.MethodGet, "/notification-templates/email/templates?projectId=prj-1", nil)
	req.SetPathValue("channel", string(ChannelTypeEmail))
	w := httptest.NewRecorder()
	s.handler.HandleTemplateListRequest(w, req)

	s.Equal(http.StatusOK, w.Code)
}

func (s *NotificationTemplateStoreTestSuite) TestProjectQueries() {
	s.mockDBProvider.On("GetConfigDBClient").Return(s.mockDBClient, nil)
	s.mockDBClient.On("QueryContext", mock.Anything, queryListTemplatesByProject, "email", 10, 0,
		"test-deployment", "prj-1").Return([]map[string]interface{}{
		{"id": "a", "channel": "email", "handle": "a", "display_name": "A", "project_id": "prj-1"},
	}, nil)
	s.mockDBClient.On("QueryContext", mock.Anything, queryCountTemplatesByProject, "email", "prj-1",
		"test-deployment").Return([]map[string]interface{}{{"total": int64(1)}}, nil)
	s.mockDBClient.On("ExecuteContext", mock.Anything, queryCreateTemplate,
		"id-1", "email", "otp", "OTP", "", `{"body":"b"}`, "{}", "prj-1", "test-deployment").
		Return(int64(1), nil)

	list, err := s.store.ListTemplates(depCtx("test-deployment"), ChannelTypeEmail, 10, 0, "prj-1")
	s.Require().NoError(err)
	s.Require().Len(list, 1)
	s.Equal("prj-1", list[0].ProjectID)

	n, err := s.store.CountTemplates(depCtx("test-deployment"), ChannelTypeEmail, "prj-1")
	s.Require().NoError(err)
	s.Equal(1, n)

	s.Require().NoError(s.store.CreateTemplate(depCtx("test-deployment"), templateDAO{
		ID: "id-1", Channel: ChannelTypeEmail, Handle: "otp", DisplayName: "OTP",
		Content: TemplateContent{Body: "b"}, ProjectID: "prj-1",
	}))
}

const declaredProjectYAML = `resource_type: notification_template
id: project-email
channel: email
handle: in-project
displayName: In project
projectId: prj-1
content:
  subject: P
  body: p
`

func (s *FileBasedStoreTestSuite) TestListAndCountByProject() {
	loadDeclared(s.T(), s.fileStore, declaredAlphaYAML)
	loadDeclared(s.T(), s.fileStore, declaredProjectYAML)

	inProject, err := s.fileStore.ListTemplates(s.ctx, ChannelTypeEmail, 100, 0, "prj-1")
	s.Require().NoError(err)
	s.Equal([]string{"in-project"}, handlesOf(inProject))
	s.Equal("prj-1", inProject[0].ProjectID)

	count, err := s.fileStore.CountTemplates(s.ctx, ChannelTypeEmail, "prj-1")
	s.Require().NoError(err)
	s.Equal(1, count)

	all, err := s.fileStore.CountTemplates(s.ctx, ChannelTypeEmail, "")
	s.Require().NoError(err)
	s.Equal(2, all)
}
