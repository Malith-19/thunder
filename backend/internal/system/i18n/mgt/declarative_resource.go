// Copyright 2025 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package mgt

import (
	"context"
	"fmt"
	"slices"
	"strings"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"gopkg.in/yaml.v3"

	declarativeresource "github.com/thunder-id/thunderid/internal/system/declarative_resource"
	"github.com/thunder-id/thunderid/internal/system/log"
)

const (
	paramTypeTranslation    = "Translation"
	resourceTypeTranslation = "translation"
	// translationProjectSeparator joins a language and a project in the ID of the translations of a
	// language that are split across projects.
	translationProjectSeparator = "@"
)

// translationExporter implements declarativeresource.ResourceExporter for translations.
type translationExporter struct {
	store i18nStoreInterface
}

// newTranslationExporter creates a new Translation exporter.
func newTranslationExporter(store i18nStoreInterface) *translationExporter {
	return &translationExporter{store: store}
}

// GetResourceType returns the resource type for translations.
func (e *translationExporter) GetResourceType() string {
	return resourceTypeTranslation
}

// GetParameterizerType returns the parameterizer type for translations.
func (e *translationExporter) GetParameterizerType() string {
	return paramTypeTranslation
}

// GetAllResourceIDs retrieves all languages from the database store.
// One file per language, or one per language and project when the translations of a language belong
// to more than one project.
func (e *translationExporter) GetAllResourceIDs(ctx context.Context) ([]string, *tidcommon.ServiceError) {
	translations, err := e.store.GetTranslations(ctx)
	if err != nil {
		return nil, &tidcommon.ServiceError{
			Code: "I18N_EXPORT_ERROR",
			Type: tidcommon.ServerErrorType,
			Error: tidcommon.I18nMessage{
				Key:          "error.i18nservice.export_error",
				DefaultValue: "Failed to fetch translation languages for export",
			},
		}
	}

	projectsByLanguage := make(map[string]map[string]bool)
	for _, translationsByLang := range translations {
		for _, translation := range translationsByLang {
			if projectsByLanguage[translation.Language] == nil {
				projectsByLanguage[translation.Language] = make(map[string]bool)
			}
			projectsByLanguage[translation.Language][translation.ProjectID] = true
		}
	}

	ids := make([]string, 0, len(projectsByLanguage))
	for language, projects := range projectsByLanguage {
		if len(projects) == 1 {
			ids = append(ids, language)
			continue
		}
		for projectID := range projects {
			ids = append(ids, language+translationProjectSeparator+projectID)
		}
	}
	slices.Sort(ids)
	return ids, nil
}

// GetResourceByID retrieves all translations for a specific language, or for a language in a project
// when the ID names one.
func (e *translationExporter) GetResourceByID(ctx context.Context, id string) (
	interface{}, string, *tidcommon.ServiceError,
) {
	translations, err := e.store.GetTranslations(ctx)
	if err != nil {
		return nil, "", &tidcommon.ServiceError{
			Code: "I18N_FETCH_ERROR",
			Type: tidcommon.ServerErrorType,
			Error: tidcommon.I18nMessage{
				Key:          "error.i18nservice.fetch_error",
				DefaultValue: "Failed to fetch translations for export",
			},
		}
	}

	language, projectID, inProject := strings.Cut(id, translationProjectSeparator)
	result := make(map[string]map[string]string)
	projects := make(map[string]bool)

	for _, translationsByLang := range translations {
		for _, translation := range translationsByLang {
			if translation.Language == language && (!inProject || translation.ProjectID == projectID) {
				projects[translation.ProjectID] = true
				if result[translation.Namespace] == nil {
					result[translation.Namespace] = make(map[string]string)
				}
				result[translation.Namespace][translation.Key] = translation.Value
			}
		}
	}

	if len(result) == 0 {
		return nil, "", &tidcommon.ServiceError{
			Code: "TRANSLATION_NOT_FOUND",
			Type: tidcommon.ClientErrorType,
			Error: tidcommon.I18nMessage{
				Key:          "error.i18nservice.translation_not_found_for_language",
				DefaultValue: "Translation not found for {{param(id)}}",
				Params:       map[string]string{"id": id},
			},
		}
	}

	if !inProject && len(projects) == 1 {
		for p := range projects {
			projectID = p
		}
	}

	return &LanguageTranslations{
		Language:     language,
		ProjectID:    projectID,
		Translations: result,
	}, id, nil
}

// ValidateResource validates a translation resource.
func (e *translationExporter) ValidateResource(ctx context.Context,
	resource interface{}, id string, logger *log.Logger,
) (string, *declarativeresource.ExportError) {
	trans, ok := resource.(*LanguageTranslations)
	if !ok {
		return "", declarativeresource.CreateTypeError(e.GetResourceType(), id)
	}

	if trans.Language == "" || trans.Translations == nil {
		return "", &declarativeresource.ExportError{
			ResourceType: e.GetResourceType(),
			ResourceID:   id,
			Code:         "INVALID_TRANSLATION",
			Error:        "Translation missing required fields",
		}
	}

	return id, nil
}

// GetResourceRules returns the parameterization rules for translations.
func (e *translationExporter) GetResourceRules() *declarativeresource.ResourceRules {
	return &declarativeresource.ResourceRules{
		Variables:      []string{},
		ArrayVariables: []string{},
	}
}

// loadDeclarativeResources loads immutable translation resources from files.
func loadDeclarativeResources(fileStore i18nStoreInterface) error {
	// Type assert to get the file-based store for resource loading
	store, ok := fileStore.(*fileBasedStore)
	if !ok {
		return fmt.Errorf("fileStore must be a file-based store implementation")
	}

	resourceConfig := declarativeresource.ResourceConfig{
		ResourceType:  "Translation",
		DirectoryName: "translations",
		Parser:        parseToTranslationWrapper,
		Validator: func(data interface{}) error {
			return validateTranslationWrapper(data, store)
		},
		IDExtractor: func(data interface{}) string {
			return declarativeTranslationID(data.(*LanguageTranslations))
		},
	}

	loader := declarativeresource.NewResourceLoader(resourceConfig, store)
	if err := loader.LoadResources(); err != nil {
		return fmt.Errorf("failed to load translation resources: %w", err)
	}

	return nil
}

// parseToTranslationWrapper wraps parseToTranslation to match the expected signature.
func parseToTranslationWrapper(data []byte) (interface{}, error) {
	return parseToLangTranslation(data)
}

// parseToLangTranslation parses YAML data to Translation.
func parseToLangTranslation(data []byte) (*LanguageTranslations, error) {
	var transRequest struct {
		Language     string                       `yaml:"language"`
		ProjectID    string                       `yaml:"projectId"`
		Translations map[string]map[string]string `yaml:"translations"`
	}

	err := yaml.Unmarshal(data, &transRequest)
	if err != nil {
		return nil, err
	}

	trans := &LanguageTranslations{
		Language:     transRequest.Language,
		ProjectID:    transRequest.ProjectID,
		Translations: transRequest.Translations,
	}

	return trans, nil
}

// declarativeTranslationID identifies a declarative translation file: its language, and its project
// when it names one, so the translations of a language can be split across projects.
func declarativeTranslationID(trans *LanguageTranslations) string {
	if trans.ProjectID == "" {
		return trans.Language
	}
	return trans.Language + translationProjectSeparator + trans.ProjectID
}

// validateTranslationWrapper wraps validation logic.
func validateTranslationWrapper(data interface{}, fileStore *fileBasedStore) error {
	trans, ok := data.(*LanguageTranslations)
	if !ok {
		return fmt.Errorf("invalid type: expected *LanguageTranslations")
	}

	if trans.Language == "" {
		return fmt.Errorf("translation language is required")
	}
	if trans.Translations == nil {
		return fmt.Errorf("translation translations is required")
	}

	id := declarativeTranslationID(trans)

	// Check for duplicate ID in the file store
	if existingData, err := fileStore.GenericFileBasedStore.Get(id); err == nil && existingData != nil {
		return fmt.Errorf("duplicate translation ID '%s': "+
			"a translation with this ID already exists in declarative resources", id)
	}

	return nil
}
