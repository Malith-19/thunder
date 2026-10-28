// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"time"

	"github.com/thunder-id/thunderid/internal/system/utils"
)

// Project is a group of identity configuration backed by exactly one root organization unit. Its
// handle, display name, description and settings are the root organization unit's handle, name,
// description and settings.
type Project struct {
	ID          string    `json:"id"`
	Handle      string    `json:"handle"`
	DisplayName string    `json:"displayName"`
	Description string    `json:"description,omitempty"`
	RootOUID    string    `json:"rootOuId"`
	CreatedAt   time.Time `json:"createdAt"`
	ProjectSettings
}

// ProjectRequest is the body of a create or update project request.
// ID is honored only on create, so a caller that manages projects across systems can keep one ID.
type ProjectRequest struct {
	ID          string `json:"id,omitempty"`
	Handle      string `json:"handle"`
	DisplayName string `json:"displayName"`
	Description string `json:"description,omitempty"`
	ProjectSettings
}

// ProjectSettings are the theme, layout, default flows and branding links of a project, kept on its
// root organization unit.
type ProjectSettings struct {
	ThemeID                   string `json:"themeId,omitempty"`
	LayoutID                  string `json:"layoutId,omitempty"`
	AuthFlowID                string `json:"authFlowId,omitempty"`
	RegistrationFlowID        string `json:"registrationFlowId,omitempty"`
	IsRegistrationFlowEnabled bool   `json:"isRegistrationFlowEnabled"`
	RecoveryFlowID            string `json:"recoveryFlowId,omitempty"`
	IsRecoveryFlowEnabled     bool   `json:"isRecoveryFlowEnabled"`
	SignOutFlowID             string `json:"signOutFlowId,omitempty"`
	UserOnboardingFlowID      string `json:"userOnboardingFlowId,omitempty"`
	LogoURL                   string `json:"logoUrl,omitempty"`
	TosURI                    string `json:"tosUri,omitempty"`
	PolicyURI                 string `json:"policyUri,omitempty"`
	CookiePolicyURI           string `json:"cookiePolicyUri,omitempty"`
}

// ProjectListResponse is a page of projects.
type ProjectListResponse struct {
	TotalResults int          `json:"totalResults"`
	StartIndex   int          `json:"startIndex"`
	Count        int          `json:"count"`
	Projects     []Project    `json:"projects"`
	Links        []utils.Link `json:"links"`
}

// projectRecord is what the store keeps for a project: its ID and the root organization unit that
// backs it. Everything else about a project is read from that organization unit.
type projectRecord struct {
	ID        string
	RootOUID  string
	CreatedAt time.Time
}
