/*
 * Copyright (c) 2025-2026, WSO2 LLC. (https://www.wso2.com).
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

package model

import (
	"testing"

	"github.com/stretchr/testify/suite"
)

type ApplicationTypeConstantsTestSuite struct {
	suite.Suite
}

func TestApplicationTypeConstantsTestSuite(t *testing.T) {
	suite.Run(t, new(ApplicationTypeConstantsTestSuite))
}

func (s *ApplicationTypeConstantsTestSuite) TestIsValidApplicationType() {
	tests := []struct {
		name    string
		appType ApplicationType
		want    bool
	}{
		{name: "browser is valid", appType: ApplicationTypeBrowser, want: true},
		{name: "fullstack is valid", appType: ApplicationTypeFullStack, want: true},
		{name: "mobile is valid", appType: ApplicationTypeMobile, want: true},
		{name: "m2m is valid", appType: ApplicationTypeM2M, want: true},
		{name: "custom is valid", appType: ApplicationTypeCustom, want: true},
		{name: "empty is invalid", appType: "", want: false},
		{name: "spa is invalid", appType: "spa", want: false},
		{name: "web_app is invalid", appType: "web_app", want: false},
		{name: "embedded suffix is invalid", appType: "mobile-embedded", want: false},
		{name: "unknown is invalid", appType: "unknown", want: false},
	}

	for _, tt := range tests {
		s.Run(tt.name, func() {
			s.Equal(tt.want, IsValidApplicationType(tt.appType))
		})
	}
}

func (s *ApplicationTypeConstantsTestSuite) TestDefaultApplicationType() {
	s.Equal(ApplicationTypeCustom, DefaultApplicationType)
}
