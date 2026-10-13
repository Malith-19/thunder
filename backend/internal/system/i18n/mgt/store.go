// Copyright 2025 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package mgt

import (
	"context"
	"errors"
	"fmt"

	"github.com/thunder-id/thunderid/internal/system/database/provider"
	"github.com/thunder-id/thunderid/internal/system/deployment"
)

// i18nStoreInterface defines the interface for i18n store operations.
type i18nStoreInterface interface {
	GetDistinctLanguages(ctx context.Context, projectID string) ([]string, error)
	GetTranslations(ctx context.Context) (map[string]map[string]Translation, error)
	GetTranslationsByNamespace(ctx context.Context, namespace string) (map[string]map[string]Translation, error)
	GetTranslationsByKey(ctx context.Context, key string, namespace string) (map[string]Translation, error)
	UpsertTranslationsByLanguage(ctx context.Context, language string, projectID string,
		translations []Translation) error
	UpsertTranslation(ctx context.Context, trans Translation) error
	UpsertTranslations(ctx context.Context, translations []Translation) error
	DeleteTranslationsByLanguage(ctx context.Context, language string, projectID string) error
	DeleteTranslation(ctx context.Context, language string, key string, namespace string) error
	DeleteTranslationsByNamespace(ctx context.Context, namespace string) error
	DeleteTranslationsByKey(ctx context.Context, namespace string, key string) error
}

// i18nStore is the default implementation of i18nStoreInterface.
type i18nStore struct {
	dbProvider provider.DBProviderInterface
}

// scope returns the deployment id this request acts for. The id is put on the context at the
// edge, so a request scopes by what it names; a context that never passed through the edge,
// such as a start-up task or a background job, falls back to the configured identifier.
func (s *i18nStore) scope(ctx context.Context) string {
	return deployment.Resolve(ctx)
}

// newI18nStore creates a new instance of i18nStore.
func newI18nStore() i18nStoreInterface {
	return &i18nStore{
		dbProvider: provider.GetDBProvider(),
	}
}

// getDBClient is a helper method to get the database client.
func (s *i18nStore) getDBClient() (provider.DBClientInterface, error) {
	dbClient, err := s.dbProvider.GetConfigDBClient()
	if err != nil {
		return nil, fmt.Errorf("failed to get database client: %w", err)
	}
	return dbClient, nil
}

// GetDistinctLanguages retrieves all distinct language codes that have translations, only those with
// translations in the project when a project ID is given.
func (s *i18nStore) GetDistinctLanguages(ctx context.Context, projectID string) ([]string, error) {
	dbClient, err := s.getDBClient()
	if err != nil {
		return nil, err
	}

	var results []map[string]interface{}
	if projectID != "" {
		results, err = dbClient.Query(queryGetDistinctLanguagesByProject, projectID, s.scope(ctx))
	} else {
		results, err = dbClient.Query(queryGetDistinctLanguages, s.scope(ctx))
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get distinct languages: %w", err)
	}

	languages := make([]string, 0, len(results))
	for _, row := range results {
		lang, ok := row["language_code"].(string)
		if !ok {
			return nil, fmt.Errorf("failed to parse language_code")
		}
		languages = append(languages, lang)
	}
	return languages, nil
}

// GetTranslations retrieves all translations.
// This implements TranslationStoreInterface.
func (s *i18nStore) GetTranslations(ctx context.Context) (map[string]map[string]Translation, error) {
	dbClient, err := s.getDBClient()
	if err != nil {
		return nil, err
	}

	results, err := dbClient.Query(queryGetTranslations, s.scope(ctx))

	if err != nil {
		return nil, fmt.Errorf("failed to get translations: %w", err)
	}

	return transformResults(results)
}

// GetTranslations retrieves all translations of the given namespace.
// This implements TranslationStoreInterface.
func (s *i18nStore) GetTranslationsByNamespace(ctx context.Context,
	namespace string) (map[string]map[string]Translation, error) {
	dbClient, err := s.getDBClient()
	if err != nil {
		return nil, err
	}

	results, err := dbClient.Query(queryGetTranslationsByNamespace, namespace, s.scope(ctx))

	if err != nil {
		return nil, fmt.Errorf("failed to get translations: %w", err)
	}

	return transformResults(results)
}

// GetTranslationsByKey retrieves a single translation by key, and namespace.
func (s *i18nStore) GetTranslationsByKey(ctx context.Context, key string, namespace string) (map[string]Translation,
	error) {
	dbClient, err := s.getDBClient()
	if err != nil {
		return nil, err
	}

	results, err := dbClient.Query(queryGetTranslation, key, namespace, s.scope(ctx))
	if err != nil {
		return nil, fmt.Errorf("failed to get translation: %w", err)
	}

	return buildTranslationsMap(results)
}

// UpsertTranslationsByLanguage replaces the translations of a language that belong to the project
// (or to no project when the project ID is empty) with the given ones. Translations of the language
// in other projects are kept.
func (s *i18nStore) UpsertTranslationsByLanguage(ctx context.Context, language string, projectID string,
	translations []Translation) error {
	dbClient, err := s.getDBClient()
	if err != nil {
		return err
	}

	tx, err := dbClient.BeginTx()
	if err != nil {
		return fmt.Errorf("failed to begin transaction: %w", err)
	}

	if projectID != "" {
		_, err = tx.Exec(queryDeleteTranslationsByLanguageAndProject, language, projectID, s.scope(ctx))
	} else {
		_, err = tx.Exec(queryDeleteUnownedTranslationsByLanguage, language, s.scope(ctx))
	}
	if err != nil {
		if rollbackErr := tx.Rollback(); rollbackErr != nil {
			err = errors.Join(err, fmt.Errorf("failed to rollback transaction: %w", rollbackErr))
		}
		return fmt.Errorf("failed to delete translations: %w", err)
	}

	for _, trans := range translations {
		_, err = tx.Exec(queryUpsertTranslation, trans.Key, trans.Language, trans.Namespace,
			trans.Value, nullableProjectID(trans.ProjectID), s.scope(ctx))
		if err != nil {
			if rollbackErr := tx.Rollback(); rollbackErr != nil {
				err = errors.Join(err, fmt.Errorf("failed to rollback transaction: %w", rollbackErr))
			}
			return fmt.Errorf("failed to insert translation: %w", err)
		}
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}

// UpsertTranslation creates or updates a translation.
// Used for bulk operations where we want to insert or update as needed.
func (s *i18nStore) UpsertTranslation(ctx context.Context, trans Translation) error {
	dbClient, err := s.getDBClient()
	if err != nil {
		return err
	}

	_, err = dbClient.Execute(queryUpsertTranslation, trans.Key, trans.Language, trans.Namespace,
		trans.Value, nullableProjectID(trans.ProjectID), s.scope(ctx))
	if err != nil {
		return fmt.Errorf("failed to upsert translation: %w", err)
	}
	return nil
}

// UpsertTranslations creates or updates multiple translations.
// When ctx carries an outer configDB transaction the upserts join it atomically.
// Without an outer transaction each upsert runs independently.
func (s *i18nStore) UpsertTranslations(ctx context.Context, translations []Translation) error {
	dbClient, err := s.getDBClient()
	if err != nil {
		return err
	}

	for _, trans := range translations {
		if _, err = dbClient.ExecuteContext(ctx, queryUpsertTranslation, trans.Key, trans.Language,
			trans.Namespace, trans.Value, nullableProjectID(trans.ProjectID), s.scope(ctx)); err != nil {
			return fmt.Errorf("failed to upsert translation: %w", err)
		}
	}
	return nil
}

// DeleteTranslation deletes a translation by language, key, and namespace.
func (s *i18nStore) DeleteTranslation(ctx context.Context, language string, key string, namespace string) error {
	dbClient, err := s.getDBClient()
	if err != nil {
		return err
	}

	_, err = dbClient.Execute(queryDeleteTranslation, language, key, namespace, s.scope(ctx))
	if err != nil {
		return fmt.Errorf("failed to delete translation: %w", err)
	}
	return nil
}

// DeleteTranslationsByLanguage deletes all translations for the given language, only those in the
// project when a project ID is given.
func (s *i18nStore) DeleteTranslationsByLanguage(ctx context.Context, language string, projectID string) error {
	dbClient, err := s.getDBClient()
	if err != nil {
		return err
	}

	if projectID != "" {
		_, err = dbClient.Execute(queryDeleteTranslationsByLanguageAndProject, language, projectID, s.scope(ctx))
	} else {
		_, err = dbClient.Execute(queryDeleteTranslationsByLanguage, language, s.scope(ctx))
	}
	if err != nil {
		return fmt.Errorf("failed to delete translation: %w", err)
	}
	return nil
}

// DeleteTranslationsByKey deletes all translations for the given namespace and key.
// When ctx carries an outer configDB transaction the delete joins it atomically.
func (s *i18nStore) DeleteTranslationsByKey(ctx context.Context, namespace string, key string) error {
	dbClient, err := s.getDBClient()
	if err != nil {
		return err
	}

	_, err = dbClient.ExecuteContext(ctx, queryDeleteTranslationsByKey, namespace, key, s.scope(ctx))
	if err != nil {
		return fmt.Errorf("failed to delete translations by namespace and key: %w", err)
	}
	return nil
}

// DeleteTranslationsByNamespace deletes all translations for the given namespace.
// When ctx carries an outer configDB transaction the delete joins it atomically.
func (s *i18nStore) DeleteTranslationsByNamespace(ctx context.Context, namespace string) error {
	dbClient, err := s.getDBClient()
	if err != nil {
		return err
	}

	_, err = dbClient.ExecuteContext(ctx, queryDeleteTranslationsByNamespace, namespace, s.scope(ctx))
	if err != nil {
		return fmt.Errorf("failed to delete translations by namespace: %w", err)
	}
	return nil
}

// buildTranslationFromRow constructs a Translation from a database result row.
func buildTranslationFromRow(row map[string]interface{}) (*Translation, error) {
	key, ok := row["message_key"].(string)
	if !ok {
		return nil, fmt.Errorf("failed to parse message_key")
	}

	lang, ok := row["language_code"].(string)
	if !ok {
		return nil, fmt.Errorf("failed to parse language_code")
	}

	namespace, ok := row["namespace"].(string)
	if !ok {
		return nil, fmt.Errorf("failed to parse namespace")
	}

	value, ok := row["value"].(string)
	if !ok {
		return nil, fmt.Errorf("failed to parse value")
	}

	projectID, _ := row["project_id"].(string)

	return &Translation{
		Key:       key,
		Language:  lang,
		Namespace: namespace,
		Value:     value,
		ProjectID: projectID,
	}, nil
}

// nullableProjectID stores a translation outside every project as SQL NULL.
func nullableProjectID(projectID string) interface{} {
	if projectID == "" {
		return nil
	}
	return projectID
}

func transformResults(results []map[string]interface{}) (map[string]map[string]Translation, error) {
	translations := make(map[string]map[string]Translation)
	for _, row := range results {
		trans, err := buildTranslationFromRow(row)
		if err != nil {
			return nil, err
		}

		compositeKey := trans.Namespace + "|" + trans.Key
		if translations[compositeKey] == nil {
			translations[compositeKey] = make(map[string]Translation)
		}
		translations[compositeKey][trans.Language] = *trans
	}

	return translations, nil
}

func buildTranslationsMap(results []map[string]interface{}) (map[string]Translation, error) {
	translations := make(map[string]Translation)
	for _, row := range results {
		trans, err := buildTranslationFromRow(row)
		if err != nil {
			return nil, err
		}
		translations[trans.Language] = *trans
	}
	return translations, nil
}
