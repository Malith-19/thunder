/*
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package application

import (
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/thunder-id/thunderid/internal/application/model"
	inboundmodel "github.com/thunder-id/thunderid/internal/inboundclient/model"
	"github.com/thunder-id/thunderid/pkg/thunderidengine/providers"
)

type ApplicationTypeTestSuite struct {
	suite.Suite
}

func TestApplicationTypeTestSuite(t *testing.T) {
	suite.Run(t, new(ApplicationTypeTestSuite))
}

// TestToInboundClientPersistsType verifies the application type is packed into the inbound client
// properties for persistence.
func (s *ApplicationTypeTestSuite) TestToInboundClientPersistsType() {
	dto := &model.ApplicationProcessedDTO{ID: "app-1", Type: model.ApplicationTypeMobile}

	dao := toInboundClient(dto)

	s.Equal("mobile", dao.Properties[propType])
}

// TestToInboundClientOmitsEmptyType verifies an unset type is not written to properties.
func (s *ApplicationTypeTestSuite) TestToInboundClientOmitsEmptyType() {
	dto := &model.ApplicationProcessedDTO{ID: "app-1"}

	dao := toInboundClient(dto)

	_, ok := dao.Properties[propType]
	s.False(ok)
}

// TestToProcessedDTOReadsType verifies a persisted type is read back onto the DTO.
func (s *ApplicationTypeTestSuite) TestToProcessedDTOReadsType() {
	dao := &inboundmodel.InboundClient{
		ID:         "app-1",
		Properties: map[string]interface{}{propType: "browser"},
	}

	dto := toProcessedDTO(nil, dao, nil)

	s.Equal(model.ApplicationTypeBrowser, dto.Type)
}

// TestToProcessedDTODefaultsLegacyType verifies applications without a stored type resolve to the
// default type (covers apps created before the type attribute existed).
func (s *ApplicationTypeTestSuite) TestToProcessedDTODefaultsLegacyType() {
	withProps := toProcessedDTO(nil, &inboundmodel.InboundClient{
		ID:         "app-1",
		Properties: map[string]interface{}{},
	}, nil)
	s.Equal(model.DefaultApplicationType, withProps.Type)

	nilProps := toProcessedDTO(nil, &inboundmodel.InboundClient{ID: "app-2"}, nil)
	s.Equal(model.DefaultApplicationType, nilProps.Type)
}

// TestBuildBasicApplicationResponseType verifies the list-view response reads the type and defaults
// legacy applications to the default type.
func (s *ApplicationTypeTestSuite) TestBuildBasicApplicationResponseType() {
	withType := buildBasicApplicationResponse(inboundmodel.InboundClient{
		ID:         "app-1",
		Properties: map[string]interface{}{propType: "m2m"},
	}, nil)
	s.Equal(model.ApplicationTypeM2M, withType.Type)

	legacy := buildBasicApplicationResponse(inboundmodel.InboundClient{ID: "app-2"}, nil)
	s.Equal(model.DefaultApplicationType, legacy.Type)
}

// TestMobileAppNotFlowSecretEligible verifies mobile applications are never issued a Flow Secret,
// even when their OAuth config shape would otherwise qualify. Mobile apps authenticate to the Flow
// Execution API via platform attestation instead.
func (s *ApplicationTypeTestSuite) TestMobileAppNotFlowSecretEligible() {
	s.False(isFlowSecretEligible(model.ApplicationTypeMobile, nil))

	confidential := &providers.InboundAuthConfigWithSecret{
		Type: providers.OAuthInboundAuthType,
		OAuthConfig: &providers.OAuthConfigWithSecret{
			GrantTypes: []providers.GrantType{
				providers.GrantTypeClientCredentials,
				providers.GrantTypeTokenExchange,
			},
			TokenEndpointAuthMethod: providers.TokenEndpointAuthMethodClientSecretBasic,
		},
	}
	s.False(isFlowSecretEligible(model.ApplicationTypeMobile, confidential))
}

// TestM2MAppNotFlowSecretEligible verifies m2m applications are never issued a Flow Secret by their
// type. m2m apps obtain tokens directly and do not initiate flows.
func (s *ApplicationTypeTestSuite) TestM2MAppNotFlowSecretEligible() {
	s.False(isFlowSecretEligible(model.ApplicationTypeM2M, nil))
}

// TestNonMobileAppFlowSecretEligibility verifies the config-shape eligibility rules still apply for
// non-mobile applications.
func (s *ApplicationTypeTestSuite) TestNonMobileAppFlowSecretEligibility() {
	// Embedded app with no OAuth config is eligible.
	s.True(isFlowSecretEligible(model.ApplicationTypeFullStack, nil))

	// Public client (browser) is not eligible.
	s.False(isFlowSecretEligible(model.ApplicationTypeBrowser, &providers.InboundAuthConfigWithSecret{
		Type:        providers.OAuthInboundAuthType,
		OAuthConfig: &providers.OAuthConfigWithSecret{PublicClient: true},
	}))
}
