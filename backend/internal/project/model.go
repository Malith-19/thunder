// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package project

import (
	"time"

	"github.com/thunder-id/thunderid/internal/system/utils"
)

// Project groups the configuration of one product. It is backed by exactly one root organization
// unit, and resources belong to the project through that unit.
type Project struct {
	ID          string    `json:"id"`
	Handle      string    `json:"handle"`
	Name        string    `json:"name"`
	Description string    `json:"description,omitempty"`
	RootOUID    string    `json:"rootOuId"`
	IsReadOnly  bool      `json:"isReadOnly"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

// CreateProjectRequest is the body of a project creation request.
type CreateProjectRequest struct {
	ID          string `json:"id,omitempty"`
	Handle      string `json:"handle"                native:"required,min=1,max=100"`
	Name        string `json:"name"                  native:"required,min=1,max=100"`
	Description string `json:"description,omitempty" native:"omitempty,max=255"`
}

// ProjectListResponse is a page of projects.
type ProjectListResponse struct {
	TotalResults int          `json:"totalResults"`
	StartIndex   int          `json:"startIndex"`
	Count        int          `json:"count"`
	Projects     []Project    `json:"projects"`
	Links        []utils.Link `json:"links"`
}
