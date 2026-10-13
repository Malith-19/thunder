// Copyright 2025 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package mgt

// --- HTTP Request/Response Models ---

// LanguageListResponse represents the response for listing languages.
type LanguageListResponse struct {
	Languages []string `json:"languages"`
}

// TranslationResponse represents a single translation.
type TranslationResponse struct {
	Language  string `json:"language"`
	Namespace string `json:"namespace"`
	Key       string `json:"key"`
	Value     string `json:"value"`
	ProjectID string `json:"projectId,omitempty"`
}

// SetTranslationRequest represents the request body for setting a single translation override.
type SetTranslationRequest struct {
	Value     string `json:"value"`
	ProjectID string `json:"projectId,omitempty"`
}

// SetTranslationsRequest represents the request body for setting custom translations for a language.
type SetTranslationsRequest struct {
	Translations map[string]map[string]string `json:"translations"`
	ProjectID    string                       `json:"projectId,omitempty"`
}

// --- Service Models ---

// Translation represents a translation entity in the service layer.
type Translation struct {
	Key       string `yaml:"id"`
	Language  string `yaml:"language"`
	Namespace string `yaml:"namespace"`
	Value     string `yaml:"value"`
	ProjectID string `yaml:"projectId,omitempty"`
}

// LanguageTranslations represents the translations of a single language that belong to one project.
type LanguageTranslations struct {
	Language     string                       `yaml:"language"`
	ProjectID    string                       `yaml:"projectId,omitempty"`
	Translations map[string]map[string]string `yaml:"translations"`
}
