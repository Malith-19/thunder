// Copyright 2026 The ThunderID Authors
// SPDX-License-Identifier: Apache-2.0

package mgt

import (
	"context"
	"errors"
	"net/http"

	"github.com/stretchr/testify/mock"

	tidcommon "github.com/thunder-id/thunderid/pkg/thunderidengine/common"

	"github.com/thunder-id/thunderid/internal/project"
	"github.com/thunder-id/thunderid/internal/system/config"
)

const testProjectID = "prj-1"

// stubProjectRegistry stands in for the project service: a requested project is accepted, nothing
// falls back to "prj-default", and registered usage checkers are recorded.
type stubProjectRegistry struct {
	checkers []project.ProjectUsageChecker
}

func (*stubProjectRegistry) ResolveProjectID(
	_ context.Context, requested, _ string,
) (string, *tidcommon.ServiceError) {
	if requested == "" {
		return "prj-default", nil
	}
	return requested, nil
}

func (r *stubProjectRegistry) AddUsageChecker(checker project.ProjectUsageChecker) {
	r.checkers = append(r.checkers, checker)
}

func (suite *I18nMgtServiceTestSuite) withProjects() {
	suite.service.(*i18nService).projects = &stubProjectRegistry{}
}

func (suite *I18nMgtServiceTestSuite) TestListLanguagesByProject() {
	suite.mockStore.On("GetDistinctLanguages", mock.Anything, testProjectID).Return([]string{"fr-FR"}, nil)

	result, err := suite.service.ListLanguagesByProject(context.Background(), testProjectID)

	suite.Nil(err)
	suite.Equal([]string{"fr-FR", SystemLanguage}, result, "the system language is always listed")
}

func (suite *I18nMgtServiceTestSuite) TestSetTranslationOverrideForKey_ProjectLabelKept() {
	suite.mockStore.On("GetTranslationsByKey", mock.Anything, "welcome", "common").
		Return(map[string]Translation{}, nil)
	suite.mockStore.On("UpsertTranslation", mock.Anything, mock.MatchedBy(func(t Translation) bool {
		return t.ProjectID == testProjectID
	})).Return(nil)

	result, err := suite.service.SetTranslationOverrideForKey(
		context.Background(), "fr-FR", "common", "welcome", "Bonjour", testProjectID)

	suite.Nil(err)
	suite.Equal(testProjectID, result.ProjectID, "without a project resolver the project ID is kept as given")
}

func (suite *I18nMgtServiceTestSuite) TestSetTranslationOverrideForKey_Project() {
	suite.withProjects()
	suite.mockStore.On("GetTranslationsByKey", mock.Anything, "welcome", "common").
		Return(map[string]Translation{"en-US": {Key: "welcome", Language: "en-US", ProjectID: testProjectID}}, nil)
	suite.mockStore.On("UpsertTranslation", mock.Anything, mock.Anything).Return(nil)

	result, err := suite.service.SetTranslationOverrideForKey(
		context.Background(), "fr-FR", "common", "welcome", "Bonjour", "")
	suite.Nil(err)
	suite.Equal("prj-default", result.ProjectID, "a new override goes to the default project")

	result, err = suite.service.SetTranslationOverrideForKey(
		context.Background(), "en-US", "common", "welcome", "Hi", "")
	suite.Nil(err)
	suite.Equal(testProjectID, result.ProjectID, "an update without a project keeps the current one")

	result, err = suite.service.SetTranslationOverrideForKey(
		context.Background(), "en-US", "common", "welcome", "Hi", "prj-2")
	suite.Nil(result)
	suite.Require().NotNil(err)
	suite.Equal(project.ErrorProjectChangeNotAllowed.Code, err.Code)
}

func (suite *I18nMgtServiceTestSuite) TestSetTranslationOverrideForKey_ExistingLookupError() {
	suite.mockStore.On("GetTranslationsByKey", mock.Anything, "welcome", "common").
		Return(nil, errors.New("db error"))

	result, err := suite.service.SetTranslationOverrideForKey(
		context.Background(), "fr-FR", "common", "welcome", "Bonjour", "")

	suite.Nil(result)
	suite.Equal(tidcommon.InternalServerError.Code, err.Code)
}

func (suite *I18nMgtServiceTestSuite) TestSetTranslationOverrides_Project() {
	suite.withProjects()
	suite.mockStore.On("GetTranslations", mock.Anything).Return(map[string]map[string]Translation{
		"common|ok":  {"fr-FR": {Key: "ok", Language: "fr-FR", Namespace: "common", ProjectID: testProjectID}},
		"common|bye": {"fr-FR": {Key: "bye", Language: "fr-FR", Namespace: "common"}},
	}, nil)
	suite.mockStore.On("UpsertTranslationsByLanguage", mock.Anything, "fr-FR", testProjectID,
		mock.MatchedBy(func(ts []Translation) bool {
			return len(ts) == 2 && ts[0].ProjectID == testProjectID && ts[1].ProjectID == testProjectID
		})).Return(nil).Once()

	_, err := suite.service.SetTranslationOverrides(context.Background(), "fr-FR", "",
		map[string]map[string]string{"common": {"ok": "D'accord", "bye": "Au revoir"}})
	suite.Nil(err, "a request without a project targets the project the language already belongs to")

	_, err = suite.service.SetTranslationOverrides(context.Background(), "fr-FR", "prj-2",
		map[string]map[string]string{"common": {"ok": "OK"}})
	suite.Require().NotNil(err)
	suite.Equal(project.ErrorProjectChangeNotAllowed.Code, err.Code)
}

func (suite *I18nMgtServiceTestSuite) TestSetTranslationOverrides_OtherProjectKeepsItsOverrides() {
	suite.withProjects()
	suite.mockStore.On("GetTranslations", mock.Anything).Return(map[string]map[string]Translation{
		"common|ok": {"fr-FR": {Key: "ok", Language: "fr-FR", Namespace: "common", ProjectID: testProjectID}},
	}, nil)
	suite.mockStore.On("UpsertTranslationsByLanguage", mock.Anything, "fr-FR", "prj-2",
		mock.Anything).Return(nil)

	_, err := suite.service.SetTranslationOverrides(context.Background(), "fr-FR", "prj-2",
		map[string]map[string]string{"common": {"no": "Non"}})

	suite.Nil(err, "another project can override keys the first project does not own")
}

func (suite *I18nMgtServiceTestSuite) TestSetTranslationOverrides_ExistingLookupError() {
	suite.mockStore.On("GetTranslations", mock.Anything).Return(nil, errors.New("db error"))

	result, err := suite.service.SetTranslationOverrides(context.Background(), "fr-FR", "",
		map[string]map[string]string{"common": {"ok": "OK"}})

	suite.Nil(result)
	suite.Equal(tidcommon.InternalServerError.Code, err.Code)
}

func (suite *I18nMgtServiceTestSuite) TestClearTranslationOverrides_Project() {
	suite.mockStore.On("DeleteTranslationsByLanguage", mock.Anything, "fr-FR", testProjectID).Return(nil)

	err := suite.service.ClearTranslationOverrides(context.Background(), "fr-FR", testProjectID)

	suite.Nil(err)
}

func (suite *I18nMgtServiceTestSuite) TestLanguageProjectID() {
	translations := map[string]map[string]Translation{
		"common|ok": {
			"fr-FR": {ProjectID: testProjectID},
			"de-DE": {ProjectID: testProjectID},
		},
		"common|no": {
			"fr-FR": {},
			"de-DE": {ProjectID: "prj-2"},
		},
	}
	suite.Equal(testProjectID, languageProjectID(translations, "fr-FR"))
	suite.Empty(languageProjectID(translations, "de-DE"), "a language split across projects has none")
	suite.Empty(languageProjectID(translations, "es-ES"))
}

func (suite *I18nMgtServiceTestSuite) TestProjectUsageChecker() {
	suite.mockStore.On("GetDistinctLanguages", mock.Anything, testProjectID).Return([]string{"fr-FR"}, nil).Once()
	suite.mockStore.On("GetDistinctLanguages", mock.Anything, "prj-2").Return([]string{}, nil).Once()
	suite.mockStore.On("GetDistinctLanguages", mock.Anything, "prj-3").Return(nil, errors.New("db down")).Once()
	checker := &projectUsageChecker{store: suite.mockStore}

	inUse, err := checker.HasResourcesInProject(context.Background(), testProjectID)
	suite.NoError(err)
	suite.True(inUse)

	inUse, err = checker.HasResourcesInProject(context.Background(), "prj-2")
	suite.NoError(err)
	suite.False(inUse)

	_, err = checker.HasResourcesInProject(context.Background(), "prj-3")
	suite.Error(err)
}

func (suite *InitTestSuite) TestInitialize_RegistersProjectUsageChecker() {
	registry := &stubProjectRegistry{}

	service, _, err := Initialize(http.NewServeMux(), config.GetServerRuntime().Config.Translation, registry)

	suite.NoError(err)
	suite.Len(registry.checkers, 1)
	suite.Equal(registry, service.(*i18nService).projects)
}
