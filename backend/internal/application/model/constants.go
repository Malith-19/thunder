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
	"errors"

	"github.com/thunder-id/thunderid/pkg/thunderidengine/providers"
)

// ApplicationType identifies the platform/client class of an application. It is the canonical
// discriminator the backend uses to apply type-specific behavior. The free-form Template string
// remains display metadata only. It aliases providers.ApplicationType so the engine and the
// application module share a single definition.
type ApplicationType = providers.ApplicationType

// Supported application types.
const (
	ApplicationTypeBrowser   = providers.ApplicationTypeBrowser
	ApplicationTypeFullStack = providers.ApplicationTypeFullStack
	ApplicationTypeMobile    = providers.ApplicationTypeMobile
	ApplicationTypeM2M       = providers.ApplicationTypeM2M
	ApplicationTypeCustom    = providers.ApplicationTypeCustom
)

// DefaultApplicationType is assigned to applications that do not declare a type, including those
// created before the type attribute was introduced.
const DefaultApplicationType = providers.ApplicationTypeCustom

// IsValidApplicationType reports whether t is a recognized application type.
func IsValidApplicationType(t ApplicationType) bool {
	return providers.IsSupportedApplicationType(t)
}

// ApplicationNotFoundError is the error returned when an application is not found.
var ApplicationNotFoundError error = errors.New("application not found")

// ApplicationDataCorruptedError is the error returned when application data is corrupted.
var ApplicationDataCorruptedError error = errors.New("application data is corrupted")

// Constants for MCP tool defaults
var (
	// DefaultUserAttributes are the standard user attributes for application templates.
	DefaultUserAttributes = []string{
		"email", "name", "given_name", "family_name",
		"profile", "picture", "phone_number", "address", "created_at",
	}
	// DefaultScopes are the standard OAuth scopes for application templates.
	DefaultScopes = []string{"openid", "profile", "email"}
)
