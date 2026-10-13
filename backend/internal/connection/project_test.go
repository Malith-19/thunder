// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package connection

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"

	"github.com/stretchr/testify/mock"
	"gopkg.in/yaml.v3"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
	"github.com/thunder-id/thunderid/pkg/thunderidengine/providers"

	"github.com/thunder-id/thunderid/internal/connection/authzenpdp"
	"github.com/thunder-id/thunderid/internal/idp"
	ncommon "github.com/thunder-id/thunderid/internal/notification/common"
	serverconst "github.com/thunder-id/thunderid/internal/system/constants"
)

// mockProjectFixtures registers one connection of every kind in the finance project and another
// in the HR project.
func (s *ServiceTestSuite) mockProjectFixtures() {
	s.mockIDP.On("GetIdentityProviderList", mock.Anything).Return([]idp.BasicIDPDTO{
		{ID: "1", Name: "Finance Google", Type: providers.IDPTypeGoogle, ProjectID: "prj-finance"},
		{ID: "2", Name: "HR Google", Type: providers.IDPTypeGoogle, ProjectID: "prj-hr"},
	}, (*tidcommon.ServiceError)(nil)).Maybe()
	s.mockNotif.On("ListSendersByType", mock.Anything, ncommon.NotificationSenderTypeMessage).
		Return([]ncommon.NotificationSenderDTO{
			{ID: "s1", Name: "Finance SMS", Type: ncommon.NotificationSenderTypeMessage,
				Provider: ncommon.NotificationProviderTypeTwilio, ProjectID: "prj-finance"},
			{ID: "s2", Name: "HR SMS", Type: ncommon.NotificationSenderTypeMessage,
				Provider: ncommon.NotificationProviderTypeTwilio, ProjectID: "prj-hr"},
		}, (*tidcommon.ServiceError)(nil)).Maybe()
	s.mockNotif.On("ListSendersByType", mock.Anything, ncommon.NotificationSenderTypeEmail).
		Return([]ncommon.NotificationSenderDTO{
			{ID: "e1", Name: "Finance SMTP", Type: ncommon.NotificationSenderTypeEmail,
				Provider: ncommon.NotificationProviderTypeSMTP, ProjectID: "prj-finance"},
			{ID: "e2", Name: "HR SMTP", Type: ncommon.NotificationSenderTypeEmail,
				Provider: ncommon.NotificationProviderTypeSMTP, ProjectID: "prj-hr"},
		}, (*tidcommon.ServiceError)(nil)).Maybe()
	s.svc.authZENPDPService = &authZENPDPServiceStub{connections: []authzenpdp.AuthZENPDPConnection{
		{ID: "p1", Name: "Finance PDP", ProjectID: "prj-finance"},
		{ID: "p2", Name: "HR PDP", ProjectID: "prj-hr"},
	}}
}

func (s *ServiceTestSuite) TestListInstancesByProject() {
	s.mockProjectFixtures()

	got, svcErr := s.svc.listInstances(context.Background(), "", "prj-finance", serverconst.DefaultPageSize, 0)

	s.Nil(svcErr)
	ids := make([]string, 0, len(got.Connections))
	for _, instance := range got.Connections {
		ids = append(ids, instance.ID)
		s.Equal("prj-finance", instance.ProjectID, instance.ID)
	}
	s.ElementsMatch([]string{"1", "s1", "e1", "p1"}, ids)
}

func (s *ServiceTestSuite) TestListInstancesWithoutProjectListsEveryProject() {
	s.mockProjectFixtures()

	got, svcErr := s.svc.listInstances(context.Background(), "", "", serverconst.DefaultPageSize, 0)

	s.Nil(svcErr)
	s.Len(got.Connections, 8)
}

func (s *ServiceTestSuite) TestListInstancesByProjectKeepsProjectInLinks() {
	s.mockProjectFixtures()

	got, svcErr := s.svc.listInstances(context.Background(), "", "prj-finance", 1, 0)

	s.Nil(svcErr)
	s.Require().NotEmpty(got.Links)
	for _, link := range got.Links {
		s.Contains(link.Href, "projectId=prj-finance")
	}
}

func (s *ServiceTestSuite) TestPerTypeListingsByProject() {
	s.mockProjectFixtures()
	ctx := context.Background()

	idps, svcErr := s.svc.listByType(ctx, providers.IDPTypeGoogle, "prj-hr")
	s.Nil(svcErr)
	s.Require().Len(idps, 1)
	s.Equal("2", idps[0].ID)

	senders, svcErr := s.svc.listSendersByProvider(ctx, ncommon.NotificationSenderTypeMessage,
		ncommon.NotificationProviderTypeTwilio, "prj-hr")
	s.Nil(svcErr)
	s.Require().Len(senders, 1)
	s.Equal("s2", senders[0].ID)

	pdps, svcErr := s.svc.listAuthZENPDP(ctx, "prj-hr")
	s.Nil(svcErr)
	s.Require().Len(pdps, 1)
	s.Equal("p2", pdps[0].ID)

	pdps, svcErr = s.svc.listAuthZENPDP(ctx, "")
	s.Nil(svcErr)
	s.Len(pdps, 2)
}

func (s *HandlerTestSuite) TestListConnectionsByProject() {
	s.mockIDP.On("GetIdentityProviderList", mock.Anything).Return([]idp.BasicIDPDTO{
		{ID: "1", Name: "HR Google", Type: providers.IDPTypeGoogle, ProjectID: "prj-hr"},
	}, (*tidcommon.ServiceError)(nil))
	s.mockNotif.On("ListSendersByType", mock.Anything, ncommon.NotificationSenderTypeMessage).
		Return([]ncommon.NotificationSenderDTO{
			{ID: "s1", Name: "Finance SMS", Type: ncommon.NotificationSenderTypeMessage,
				Provider: ncommon.NotificationProviderTypeTwilio, ProjectID: "prj-finance"},
		}, (*tidcommon.ServiceError)(nil))
	s.mockNotif.On("ListSendersByType", mock.Anything, ncommon.NotificationSenderTypeEmail).
		Return([]ncommon.NotificationSenderDTO{}, (*tidcommon.ServiceError)(nil))

	rr, resp := s.listConnections("/connections?projectId=prj-finance")

	s.Equal(http.StatusOK, rr.Code)
	s.Require().Len(resp.Connections, 1)
	s.Equal("s1", resp.Connections[0].ID)
	s.Equal("prj-finance", resp.Connections[0].ProjectID)
}

func (s *HandlerTestSuite) TestListSenderInstancesByProject() {
	s.mockNotif.On("ListSendersByType", mock.Anything, ncommon.NotificationSenderTypeMessage).
		Return([]ncommon.NotificationSenderDTO{
			{ID: "s1", Provider: ncommon.NotificationProviderTypeTwilio, ProjectID: "prj-finance"},
			{ID: "s2", Provider: ncommon.NotificationProviderTypeTwilio, ProjectID: "prj-hr"},
		}, (*tidcommon.ServiceError)(nil))

	req := httptest.NewRequest(http.MethodGet, "/connections/twilio?projectId=prj-hr", nil)
	rr := httptest.NewRecorder()
	s.handler.listSenderInstances(ncommon.NotificationSenderTypeMessage, ncommon.NotificationProviderTypeTwilio)(
		rr, req)

	s.Equal(http.StatusOK, rr.Code)
	var summaries []connectionInstanceSummary
	s.Require().NoError(json.NewDecoder(rr.Body).Decode(&summaries))
	s.Require().Len(summaries, 1)
	s.Equal("s2", summaries[0].ID)
}

func (s *HandlerTestSuite) TestListAuthZENPDPConnectionsByProject() {
	s.handler.svc.authZENPDPService = &authZENPDPServiceStub{connections: []authzenpdp.AuthZENPDPConnection{
		{ID: "p1", ProjectID: "prj-finance"},
		{ID: "p2", ProjectID: "prj-hr"},
	}}

	req := httptest.NewRequest(http.MethodGet, "/connections/authzen-pdp?projectId=prj-finance", nil)
	rr := httptest.NewRecorder()
	s.handler.listAuthZENPDPConnections(rr, req)

	s.Equal(http.StatusOK, rr.Code)
	var summaries []connectionInstanceSummary
	s.Require().NoError(json.NewDecoder(rr.Body).Decode(&summaries))
	s.Require().Len(summaries, 1)
	s.Equal("p1", summaries[0].ID)
}

func (s *DeclarativeResourceTestSuite) TestProjectSurvivesExportAndImport() {
	for _, idpType := range []providers.IDPType{
		providers.IDPTypeGoogle, providers.IDPTypeGitHub, providers.IDPTypeOIDC, providers.IDPTypeOAuth,
	} {
		model, err := connectionModelFromIDPDTO(providers.IDPDTO{
			ID: "idp-1", Name: "IdP", Type: idpType, ProjectID: "prj-finance",
		})
		s.Require().NoError(err)
		s.Equal("prj-finance", model.ProjectID)

		dto, _, err := connectionModelToDTO(model)
		s.Require().NoError(err)
		s.Equal("prj-finance", dto.ProjectID, string(idpType))
	}
}

func (s *DeclarativeResourceTestSuite) TestSenderProjectSurvivesExportAndImport() {
	smtpDTO, err := emailSMTPToSenderDTO(emailSMTPConnectionRequest{
		Name: "smtp", Host: "smtp.example.com", Port: 587, FromAddress: "no-reply@example.com",
	})
	s.Require().NoError(err)

	for _, sender := range []ncommon.NotificationSenderDTO{
		{ID: "s1", Name: "Twilio", Type: ncommon.NotificationSenderTypeMessage,
			Provider: ncommon.NotificationProviderTypeTwilio},
		{ID: "s2", Name: "Vonage", Type: ncommon.NotificationSenderTypeMessage,
			Provider: ncommon.NotificationProviderTypeVonage},
		{ID: "s3", Name: "Gateway", Type: ncommon.NotificationSenderTypeMessage,
			Provider: ncommon.NotificationProviderTypeCustom},
		{ID: "e1", Name: "SMTP", Type: ncommon.NotificationSenderTypeEmail,
			Provider: ncommon.NotificationProviderTypeSMTP, Properties: smtpDTO.Properties},
	} {
		sender.ProjectID = "prj-finance"
		model, err := connectionModelFromSenderDTO(sender)
		s.Require().NoError(err)
		s.Equal("prj-finance", model.ProjectID, string(sender.Provider))

		_, dto, err := connectionModelToDTO(model)
		s.Require().NoError(err)
		s.Equal("prj-finance", dto.ProjectID, string(sender.Provider))
	}
}

func (s *DeclarativeResourceTestSuite) TestAuthZENPDPProjectSurvivesExportAndImport() {
	model := connectionModelFromAuthZENPDP(authzenpdp.AuthZENPDPConnection{
		ID: "pdp-1", Name: "PDP", Endpoint: "https://pdp.example.com", ProjectID: "prj-finance",
	})
	s.Equal("prj-finance", model.ProjectID)

	data, err := yaml.Marshal(model)
	s.Require().NoError(err)
	var node yaml.Node
	s.Require().NoError(yaml.Unmarshal(data, &node))
	parsed, err := ParseAuthZENPDPConnectionFromNode(node.Content[0])
	s.Require().NoError(err)
	s.Require().NotNil(parsed)
	s.Equal("prj-finance", parsed.ProjectID)

	loaded, err := parseToConnectionDTOWrapper(data)
	s.Require().NoError(err)
	s.Equal("prj-finance", loaded.(*authzenpdp.AuthZENPDPConnection).ProjectID)
}

func (s *DeclarativeResourceTestSuite) TestVendorMappingsCarryProject() {
	googleDTO, err := googleToIDPDTO(googleConnectionRequest{Name: "g", ProjectID: "prj-1"})
	s.Require().NoError(err)
	googleResp, err := googleFromIDPDTO(*googleDTO)
	s.Require().NoError(err)
	s.Equal("prj-1", googleResp.ProjectID)

	githubDTO, err := githubToIDPDTO(githubConnectionRequest{Name: "gh", ProjectID: "prj-1"})
	s.Require().NoError(err)
	githubResp, err := githubFromIDPDTO(*githubDTO)
	s.Require().NoError(err)
	s.Equal("prj-1", githubResp.ProjectID)

	oidcDTO, err := oidcToIDPDTO(oidcConnectionRequest{Name: "o", ProjectID: "prj-1"})
	s.Require().NoError(err)
	oidcResp, err := oidcFromIDPDTO(*oidcDTO)
	s.Require().NoError(err)
	s.Equal("prj-1", oidcResp.ProjectID)

	oauthDTO, err := oauthToIDPDTO(oauthConnectionRequest{Name: "a", ProjectID: "prj-1"})
	s.Require().NoError(err)
	oauthResp, err := oauthFromIDPDTO(*oauthDTO)
	s.Require().NoError(err)
	s.Equal("prj-1", oauthResp.ProjectID)
}

func (s *DeclarativeResourceTestSuite) TestSenderVendorMappingsCarryProject() {
	twilioDTO, err := twilioToSenderDTO(twilioConnectionRequest{Name: "t", ProjectID: "prj-1"})
	s.Require().NoError(err)
	twilioResp, err := twilioFromSenderDTO(*twilioDTO)
	s.Require().NoError(err)
	s.Equal("prj-1", twilioResp.ProjectID)

	vonageDTO, err := vonageToSenderDTO(vonageConnectionRequest{Name: "v", ProjectID: "prj-1"})
	s.Require().NoError(err)
	vonageResp, err := vonageFromSenderDTO(*vonageDTO)
	s.Require().NoError(err)
	s.Equal("prj-1", vonageResp.ProjectID)

	gatewayDTO, err := smsGatewayToSenderDTO(smsGatewayConnectionRequest{Name: "g", ProjectID: "prj-1"})
	s.Require().NoError(err)
	gatewayResp, err := smsGatewayFromSenderDTO(*gatewayDTO)
	s.Require().NoError(err)
	s.Equal("prj-1", gatewayResp.ProjectID)

	smtpDTO, err := emailSMTPToSenderDTO(emailSMTPConnectionRequest{Name: "e", Port: 587, ProjectID: "prj-1"})
	s.Require().NoError(err)
	smtpResp, err := emailSMTPFromSenderDTO(*smtpDTO)
	s.Require().NoError(err)
	s.Equal("prj-1", smtpResp.ProjectID)
}
