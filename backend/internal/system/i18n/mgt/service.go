// Copyright 2025 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

// Package mgt provides internationalization functionality.
package mgt

import (
	"context"
	"slices"
	"strings"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"
	"github.com/thunder-id/thunderid/pkg/thunderidengine/providers"

	goi18n "golang.org/x/text/language"

	"github.com/thunder-id/thunderid/internal/project"
	declarativeresource "github.com/thunder-id/thunderid/internal/system/declarative_resource"
	sysi18n "github.com/thunder-id/thunderid/internal/system/i18n/core"
	"github.com/thunder-id/thunderid/internal/system/log"
)

const loggerComponentName = "I18nMgtService"

// I18nServiceInterface defines the interface for the i18n service.
type I18nServiceInterface interface {
	ListLanguages(ctx context.Context) ([]string, *tidcommon.ServiceError)
	// ListLanguagesByProject lists the languages that have translations in a project, all languages
	// when the project ID is empty. The system language is always included.
	ListLanguagesByProject(ctx context.Context, projectID string) ([]string, *tidcommon.ServiceError)
	ResolveTranslations(ctx context.Context, language string, namespace string) (
		*providers.LanguageTranslationsResponse, *tidcommon.ServiceError)
	SetTranslationOverrides(ctx context.Context, language string, projectID string,
		translations map[string]map[string]string) (*providers.LanguageTranslationsResponse, *tidcommon.ServiceError)
	ClearTranslationOverrides(ctx context.Context, language string, projectID string) *tidcommon.ServiceError
	ResolveTranslationsForKey(ctx context.Context, language string, namespace string, key string) (
		*TranslationResponse, *tidcommon.ServiceError)
	SetTranslationOverrideForKey(ctx context.Context, language string, namespace string, key string, value string,
		projectID string) (*TranslationResponse, *tidcommon.ServiceError)
	SetTranslationOverridesForNamespace(ctx context.Context, namespace string,
		entries map[string]map[string]string) *tidcommon.ServiceError
	ClearTranslationOverrideForKey(ctx context.Context,
		language string, namespace string, key string) *tidcommon.ServiceError
	DeleteTranslationsByNamespace(ctx context.Context, namespace string) *tidcommon.ServiceError
	DeleteTranslationsByKey(ctx context.Context, namespace string, key string) *tidcommon.ServiceError
	// GetTranslationsByNamespace returns all raw translations for a namespace as
	// map[key]map[language]value without locale resolution or best-match logic.
	GetTranslationsByNamespace(ctx context.Context,
		namespace string) (map[string]map[string]string, *tidcommon.ServiceError)
	// GetTranslationsByKeys returns the raw translations of the given keys in a namespace as
	// map[key]map[language]value, without locale resolution or best-match logic. A caller that
	// needs a known set of keys uses this rather than reading the whole namespace.
	GetTranslationsByKeys(ctx context.Context, namespace string,
		keys []string) (map[string]map[string]string, *tidcommon.ServiceError)
}

// i18nService is the default implementation of I18nServiceInterface.
type i18nService struct {
	store    i18nStoreInterface
	projects project.Resolver
	logger   *log.Logger
}

// newI18nService creates a new instance of i18nService with injected dependencies.
func newI18nService(store i18nStoreInterface) I18nServiceInterface {
	return &i18nService{
		store:  store,
		logger: log.GetLogger().With(log.String(log.LoggerKeyComponentName, loggerComponentName)),
	}
}

// ListLanguages retrieves all locale codes that have translations in the system.
// The default locale is always included in the response, even if it has no translations in the DB.
func (s *i18nService) ListLanguages(ctx context.Context) ([]string, *tidcommon.ServiceError) {
	return s.ListLanguagesByProject(ctx, "")
}

// ListLanguagesByProject retrieves the locale codes that have translations in a project, or in the
// system when the project ID is empty. The default locale is always included in the response.
func (s *i18nService) ListLanguagesByProject(ctx context.Context, projectID string) (
	[]string, *tidcommon.ServiceError) {
	localeCodes, err := s.store.GetDistinctLanguages(ctx, projectID)
	if err != nil {
		s.logger.Error(ctx, "Failed to get locales from store", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}

	// Ensure default language is always in the list
	hasDefaultLanguage := false
	for _, code := range localeCodes {
		if code == SystemLanguage {
			hasDefaultLanguage = true
			break
		}
	}

	if !hasDefaultLanguage {
		localeCodes = append(localeCodes, SystemLanguage)
	}

	return localeCodes, nil
}

// ResolveTranslationsForKey resolves a single translation by language, namespace, and key.
// It merges custom overrides with default values.
func (s *i18nService) ResolveTranslationsForKey(ctx context.Context,
	language string, namespace string, key string) (*TranslationResponse, *tidcommon.ServiceError) {
	if err := validate(language, namespace, key); err != nil {
		return nil, err
	}

	trans, err := s.store.GetTranslationsByKey(ctx, key, namespace)
	if err != nil {
		s.logger.Error(ctx, "Failed to get translation from store", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}

	if _, exists := trans[SystemLanguage]; !exists {
		if namespace == SystemNamespace {
			// If no custom override for system language, use default translation for system language
			defaultValue, exists := sysi18n.GetDefault(key)
			if exists {
				trans[SystemLanguage] = Translation{
					Key:       key,
					Language:  SystemLanguage,
					Namespace: SystemNamespace,
					Value:     defaultValue,
				}
			}
		}
	}

	requestedLang := goi18n.Make(language)

	bestTranslation := selectBestTranslation(trans, requestedLang)

	if bestTranslation.Value != "" {
		return &TranslationResponse{
			Language:  language,
			Namespace: bestTranslation.Namespace,
			Key:       bestTranslation.Key,
			Value:     bestTranslation.Value,
		}, nil
	}

	return nil, &ErrorTranslationNotFound
}

// SetTranslationOverrideForKey creates or updates a custom override for a single translation. A new
// override goes to the requested project; an existing one stays in its project.
func (s *i18nService) SetTranslationOverrideForKey(ctx context.Context,
	language string, namespace string, key string, value string, projectID string) (
	*TranslationResponse, *tidcommon.ServiceError) {
	if isDeclarativeModeEnabled() {
		return nil, &declarativeresource.ErrorDeclarativeResourceUpdateOperation
	}
	if err := validate(language, namespace, key); err != nil {
		return nil, err
	}
	if value == "" {
		return nil, &ErrorMissingValue
	}

	existing, err := s.store.GetTranslationsByKey(ctx, key, namespace)
	if err != nil {
		s.logger.Error(ctx, "Failed to get translation from store", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	projectID, svcErr := s.resolveProjectID(ctx, projectID, existing[language].ProjectID)
	if svcErr != nil {
		return nil, svcErr
	}

	trans := Translation{
		Key:       key,
		Language:  language,
		Namespace: namespace,
		Value:     value,
		ProjectID: projectID,
	}

	// Use upsert to create or update
	if err := s.store.UpsertTranslation(ctx, trans); err != nil {
		s.logger.Error(ctx, "Failed to set translation override", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}

	return &TranslationResponse{
		Language:  language,
		Namespace: namespace,
		Key:       key,
		Value:     value,
		ProjectID: projectID,
	}, nil
}

// SetTranslationOverridesForNamespace creates or updates all provided key/language/value entries
// for a single namespace. When ctx carries an outer configDB transaction the writes join it.
// entries is map[key]map[language]value.
func (s *i18nService) SetTranslationOverridesForNamespace(
	ctx context.Context, namespace string, entries map[string]map[string]string) *tidcommon.ServiceError {
	if isDeclarativeModeEnabled() {
		return &declarativeresource.ErrorDeclarativeResourceUpdateOperation
	}
	if !ValidateNamespace(namespace) {
		return &ErrorInvalidNamespace
	}
	translations := make([]Translation, 0)
	for key, langMap := range entries {
		if !ValidateKey(key) {
			return &ErrorInvalidKey
		}
		for language, value := range langMap {
			if language == "" {
				return &ErrorMissingLanguage
			}
			if !ValidateLanguage(language) {
				return &ErrorInvalidLanguage
			}
			if value == "" {
				return &ErrorMissingValue
			}
			translations = append(translations, Translation{
				Key:       key,
				Language:  language,
				Namespace: namespace,
				Value:     value,
			})
		}
	}
	if len(translations) == 0 {
		return nil
	}
	if err := s.store.UpsertTranslations(ctx, translations); err != nil {
		s.logger.Error(ctx, "Failed to set translation overrides for namespace", log.Error(err))
		return &tidcommon.InternalServerError
	}
	return nil
}

// ClearTranslationOverrideForKey removes the custom override for a single translation.
func (s *i18nService) ClearTranslationOverrideForKey(ctx context.Context,
	language string, namespace string, key string) *tidcommon.ServiceError {
	if isDeclarativeModeEnabled() {
		return &declarativeresource.ErrorDeclarativeResourceDeleteOperation
	}
	if err := validate(language, namespace, key); err != nil {
		return err
	}

	if err := s.store.DeleteTranslation(ctx, language, key, namespace); err != nil {
		s.logger.Error(ctx, "Failed to clear translation override", log.Error(err))
		return &tidcommon.InternalServerError
	}

	return nil
}

// ResolveTranslations resolves all translations for a language, organized by namespace.
// Merges custom overrides with default values.
func (s *i18nService) ResolveTranslations(ctx context.Context,
	language string, namespace string) (*providers.LanguageTranslationsResponse, *tidcommon.ServiceError) {
	if language == "" {
		language = SystemLanguage
	}
	if !ValidateLanguage(language) {
		return nil, &ErrorInvalidLanguage
	}

	// If namespace is provided, validate it and filter by it
	if namespace != "" && !ValidateNamespace(namespace) {
		return nil, &ErrorInvalidNamespace
	}

	requestedLang := goi18n.Make(language)

	var allTranslations map[string]map[string]Translation
	var err error

	if namespace == "" {
		// Get all namespaces
		allTranslations, err = s.store.GetTranslations(ctx)
		if err != nil {
			s.logger.Error(ctx, "Failed to get translations from store", log.Error(err))
			return nil, &tidcommon.InternalServerError
		}
	} else {
		allTranslations, err = s.store.GetTranslationsByNamespace(ctx, namespace)
		if err != nil {
			s.logger.Error(ctx, "Failed to get translations from store", log.Error(err))
			return nil, &tidcommon.InternalServerError
		}
	}

	if namespace == "" || namespace == SystemNamespace {
		// Get system default translations
		systemDefaults := sysi18n.GetAllDefaults()

		for key, value := range systemDefaults {
			compositeKey := SystemNamespace + "|" + key
			if allTranslations[compositeKey] == nil {
				allTranslations[compositeKey] = make(map[string]Translation)
			}
			if _, exists := allTranslations[compositeKey][SystemLanguage]; !exists {
				allTranslations[compositeKey][SystemLanguage] = Translation{
					Key:       key,
					Language:  SystemLanguage,
					Namespace: SystemNamespace,
					Value:     value,
				}
			}
		}
	}

	result := make(map[string]map[string]string)
	for _, translations := range allTranslations {
		translation := selectBestTranslation(translations, requestedLang)

		if translation.Value == "" {
			continue
		}
		if result[translation.Namespace] == nil {
			result[translation.Namespace] = make(map[string]string)
		}
		result[translation.Namespace][translation.Key] = translation.Value
	}

	return &providers.LanguageTranslationsResponse{
		Language:     language,
		TotalResults: len(allTranslations),
		Translations: result,
	}, nil
}

// SetTranslationOverrides replaces the custom overrides a project has for a language with the provided
// values. Overrides of the language in other projects are kept, and an override that already belongs
// to another project cannot be moved into this one.
func (s *i18nService) SetTranslationOverrides(ctx context.Context,
	language string, projectID string, translations map[string]map[string]string) (
	*providers.LanguageTranslationsResponse, *tidcommon.ServiceError) {
	if isDeclarativeModeEnabled() {
		return nil, &declarativeresource.ErrorDeclarativeResourceUpdateOperation
	}
	if language == "" {
		return nil, &ErrorMissingLanguage
	}
	if !ValidateLanguage(language) {
		return nil, &ErrorInvalidLanguage
	}
	if len(translations) == 0 {
		return nil, &ErrorEmptyTranslations
	}

	// Validate all entries first
	for ns, keys := range translations {
		if !ValidateNamespace(ns) {
			return nil, &ErrorInvalidNamespace
		}
		for key, value := range keys {
			if !ValidateKey(key) {
				return nil, &ErrorInvalidKey
			}
			if value == "" {
				return nil, &ErrorMissingValue
			}
		}
	}

	existing, err := s.store.GetTranslations(ctx)
	if err != nil {
		s.logger.Error(ctx, "Failed to get translations from store", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	// A request without a project targets the project the language's overrides already belong to.
	if projectID == "" {
		projectID = languageProjectID(existing, language)
	}
	projectID, svcErr := project.ResolveProjectID(ctx, s.projects, projectID, "")
	if svcErr != nil {
		return nil, svcErr
	}

	flattenedTranslations := []Translation{}
	for ns, keys := range translations {
		for key, value := range keys {
			current := existing[ns+"|"+key][language].ProjectID
			if s.projects != nil && current != "" && current != projectID {
				return nil, &project.ErrorProjectChangeNotAllowed
			}
			flattenedTranslations = append(flattenedTranslations, Translation{
				Key:       key,
				Language:  language,
				Namespace: ns,
				Value:     value,
				ProjectID: projectID,
			})
		}
	}

	if err := s.store.UpsertTranslationsByLanguage(ctx, language, projectID, flattenedTranslations); err != nil {
		s.logger.Error(ctx, "Failed to upsert translations", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}

	// TODO: return actual stored translations from DB
	return &providers.LanguageTranslationsResponse{
		Language:     language,
		TotalResults: len(flattenedTranslations),
		Translations: translations,
	}, nil
}

// ClearTranslationOverrides removes all custom overrides for a language, only those of the project when
// a project ID is given.
func (s *i18nService) ClearTranslationOverrides(ctx context.Context, language string,
	projectID string) *tidcommon.ServiceError {
	if isDeclarativeModeEnabled() {
		return &declarativeresource.ErrorDeclarativeResourceDeleteOperation
	}
	if language == "" {
		return &ErrorMissingLanguage
	}
	if !ValidateLanguage(language) {
		return &ErrorInvalidLanguage
	}

	if err := s.store.DeleteTranslationsByLanguage(ctx, language, projectID); err != nil {
		s.logger.Error(ctx, "Failed to clear overrides", log.Error(err))
		return &tidcommon.InternalServerError
	}

	return nil
}

// DeleteTranslationsByKey removes all translations for a specific namespace+key pair.
func (s *i18nService) DeleteTranslationsByKey(
	ctx context.Context, namespace string, key string) *tidcommon.ServiceError {
	if !ValidateNamespace(namespace) {
		return &ErrorInvalidNamespace
	}
	if !ValidateKey(key) {
		return &ErrorInvalidKey
	}
	if err := s.store.DeleteTranslationsByKey(ctx, namespace, key); err != nil {
		s.logger.Error(ctx, "Failed to delete translations by namespace and key", log.Error(err))
		return &tidcommon.InternalServerError
	}
	return nil
}

// DeleteTranslationsByNamespace removes all translations under the given namespace.
// When ctx carries an outer configDB transaction the delete joins it.
func (s *i18nService) DeleteTranslationsByNamespace(
	ctx context.Context, namespace string) *tidcommon.ServiceError {
	if !ValidateNamespace(namespace) {
		return &ErrorInvalidNamespace
	}
	if err := s.store.DeleteTranslationsByNamespace(ctx, namespace); err != nil {
		s.logger.Error(ctx, "Failed to delete translations by namespace", log.Error(err))
		return &tidcommon.InternalServerError
	}
	return nil
}

// GetTranslationsByNamespace returns all raw translations for a namespace as
// map[key]map[language]value without locale resolution. Used to load all locale
// variants for a resource in a single query.
func (s *i18nService) GetTranslationsByNamespace(ctx context.Context,
	namespace string) (map[string]map[string]string, *tidcommon.ServiceError) {
	if !ValidateNamespace(namespace) {
		return nil, &ErrorInvalidNamespace
	}
	byNs, err := s.store.GetTranslationsByNamespace(ctx, namespace)
	if err != nil {
		s.logger.Error(ctx, "Failed to get translations by namespace", log.Error(err))
		return nil, &tidcommon.InternalServerError
	}
	result := make(map[string]map[string]string, len(byNs))
	for compositeKey, langs := range byNs {
		// compositeKey is "namespace|key" — drop the namespace prefix.
		idx := strings.Index(compositeKey, "|")
		if idx < 0 {
			continue
		}
		fieldKey := compositeKey[idx+1:]
		for lang, trans := range langs {
			if result[fieldKey] == nil {
				result[fieldKey] = make(map[string]string)
			}
			result[fieldKey][lang] = trans.Value
		}
	}
	return result, nil
}

// GetTranslationsByKeys returns the raw translations of the given keys in a namespace. It reads one
// key at a time through the store rather than fetching the namespace and discarding most of it, so
// the cost is proportional to what the caller asked for. Keys with no translations are absent from
// the result rather than present and empty.
func (s *i18nService) GetTranslationsByKeys(ctx context.Context, namespace string,
	keys []string) (map[string]map[string]string, *tidcommon.ServiceError) {
	if !ValidateNamespace(namespace) {
		return nil, &ErrorInvalidNamespace
	}
	result := make(map[string]map[string]string, len(keys))
	for _, key := range keys {
		if !ValidateKey(key) {
			return nil, &ErrorInvalidKey
		}
		trans, err := s.store.GetTranslationsByKey(ctx, key, namespace)
		if err != nil {
			s.logger.Error(ctx, "Failed to get translations by key", log.Error(err))
			return nil, &tidcommon.InternalServerError
		}
		if len(trans) == 0 {
			continue
		}
		langs := make(map[string]string, len(trans))
		for lang, t := range trans {
			langs[lang] = t.Value
		}
		result[key] = langs
	}
	return result, nil
}

// resolveProjectID returns the project of a translation override. A write that leaves the project out
// keeps the current one, and an override stays in the project it was created in.
func (s *i18nService) resolveProjectID(ctx context.Context, requested, current string) (
	string, *tidcommon.ServiceError) {
	if requested == "" {
		requested = current
	}
	projectID, svcErr := project.ResolveProjectID(ctx, s.projects, requested, "")
	if svcErr != nil {
		return "", svcErr
	}
	if s.projects != nil && current != "" && projectID != current {
		return "", &project.ErrorProjectChangeNotAllowed
	}
	return projectID, nil
}

// languageProjectID returns the project the overrides of a language belong to, or an empty string when
// the language has none or they are split across projects.
func languageProjectID(translations map[string]map[string]Translation, language string) string {
	projectID := ""
	for _, byLanguage := range translations {
		trans, ok := byLanguage[language]
		if !ok || trans.ProjectID == "" {
			continue
		}
		if projectID != "" && projectID != trans.ProjectID {
			return ""
		}
		projectID = trans.ProjectID
	}
	return projectID
}

func validate(language string, namespace string, key string) *tidcommon.ServiceError {
	if language == "" {
		return &ErrorMissingLanguage
	}
	if !ValidateLanguage(language) {
		return &ErrorInvalidLanguage
	}
	if !ValidateNamespace(namespace) {
		return &ErrorInvalidNamespace
	}
	if !ValidateKey(key) {
		return &ErrorInvalidKey
	}
	return nil
}

func selectBestTranslation(availableTranslations map[string]Translation, requestedLang goi18n.Tag) Translation {
	if len(availableTranslations) == 0 {
		return Translation{}
	}

	availableLangTags := make([]string, 0, len(availableTranslations))
	for langTag := range availableTranslations {
		availableLangTags = append(availableLangTags, langTag)
	}
	slices.SortFunc(availableLangTags, compareLangs)

	availableLangs := make([]goi18n.Tag, 0, len(availableLangTags))

	for _, langTag := range availableLangTags {
		availableLangs = append(availableLangs, goi18n.BCP47.Make(langTag))
	}

	matcher := goi18n.NewMatcher(availableLangs)
	_, index, _ := matcher.Match(requestedLang)

	return availableTranslations[availableLangTags[index]]
}

func compareLangs(langA, langB string) int {
	langAPref, aExists := LanguagePreferenceOrder[langA]
	langBPref, bExists := LanguagePreferenceOrder[langB]

	if aExists && bExists {
		return langAPref - langBPref
	}
	if aExists {
		return -1
	}
	if bExists {
		return 1
	}
	return 0
}
