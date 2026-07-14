import { t as en_US_default } from "./en-US-CAambf8w.js";
import { useThunderID } from "@thunderid/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useTranslation } from "react-i18next";

//#region src/models/index.ts
/**
* Language metadata
*/
const LANGUAGE_CONFIGS = { "en-US": {
	code: "en-US",
	name: "English (US)",
	nativeName: "English (US)",
	direction: "ltr"
} };
/**
* Type guard to check if a string is a supported language
*/
function isSupportedLanguage(lang) {
	return lang in LANGUAGE_CONFIGS;
}

//#endregion
//#region src/constants/i18n-query-keys.ts
/**
* Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
* Query key constants for i18n feature cache management.
*
* @public
* @remarks
* These constants are used with TanStack Query to manage caching,
* invalidation, and refetching of i18n translation data.
*/
const I18nQueryKeys = {
	TRANSLATIONS: "i18n-translations",
	LANGUAGES: "i18n-languages"
};
var i18n_query_keys_default = I18nQueryKeys;

//#endregion
//#region src/api/useGetTranslations.ts
/**
* Custom hook to fetch translations for a language.
*
* @param options - Options for fetching translations
* @returns TanStack Query object for fetching translations
*
* @example
* ```tsx
* function TranslationsDisplay() {
*   const { data, isLoading, error } = useGetTranslations({
*     language: 'en',
*     namespace: 'flowCustomI18n',
*   });
*
*   if (isLoading) return <Spinner />;
*   if (error) return <Error message={error.message} />;
*
*   return (
*     <ul>
*       {Object.entries(data?.translations || {}).map(([ns, keys]) => (
*         Object.entries(keys).map(([key, value]) => (
*           <li key={`${ns}.${key}`}>{key}: {value}</li>
*         ))
*       ))}
*     </ul>
*   );
* }
* ```
*/
function useGetTranslations({ language, namespace, enabled = true }) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
		queryKey: namespace ? [
			i18n_query_keys_default.TRANSLATIONS,
			language,
			namespace
		] : [i18n_query_keys_default.TRANSLATIONS, language],
		queryFn: async () => {
			let url = `${getServerUrl()}/i18n/languages/${language}/translations/resolve`;
			if (namespace) url += `?namespace=${encodeURIComponent(namespace)}`;
			return (await http.request({
				url,
				method: "GET",
				attachToken: false,
				credentials: "omit"
			})).data;
		},
		enabled: enabled && !!language
	});
}

//#endregion
//#region src/api/useGetLanguages.ts
/**
* Custom hook to fetch available languages.
*
* @param options - Options for fetching languages
* @returns TanStack Query object for fetching languages
*
* @example
* ```tsx
* function LanguageSelector() {
*   const { data, isLoading, error } = useGetLanguages();
*
*   if (isLoading) return <Spinner />;
*   if (error) return <Error message={error.message} />;
*
*   return (
*     <Select>
*       {data?.languages.map(lang => (
*         <Option key={lang} value={lang}>{lang}</Option>
*       ))}
*     </Select>
*   );
* }
* ```
*/
function useGetLanguages(options) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const { enabled = true } = options ?? {};
	return useQuery({
		queryKey: [i18n_query_keys_default.LANGUAGES],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/i18n/languages`,
				method: "GET",
				attachToken: false,
				credentials: "omit"
			})).data;
		},
		enabled
	});
}

//#endregion
//#region src/api/useUpdateTranslation.ts
/**
* Custom hook to create or update a single translation.
*
* @param options - Options for the mutation
* @returns TanStack Query mutation object for updating translations
*
* @example
* ```tsx
* function CreateTranslationForm() {
*   const updateTranslation = useUpdateTranslation({
*     onMutationSuccess: () => {
*       // Invalidate app-specific caches
*       invalidateI18nCache();
*     },
*   });
*
*   const handleSubmit = (data: UpdateTranslationVariables) => {
*     updateTranslation.mutate(data, {
*       onSuccess: (translation) => {
*         console.log('Translation created:', translation);
*       },
*       onError: (error) => {
*         console.error('Failed to create translation:', error);
*       }
*     });
*   };
*
*   return <form onSubmit={handleSubmit}>...</form>;
* }
* ```
*/
function useUpdateTranslation(options) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { onMutationSuccess } = options ?? {};
	return useMutation({
		mutationFn: async ({ language, namespace, key, value }) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/i18n/languages/${language}/translations/ns/${namespace}/keys/${key}`,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				data: { value }
			})).data;
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: [i18n_query_keys_default.TRANSLATIONS] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [i18n_query_keys_default.TRANSLATIONS, variables.language] }).catch(() => {});
			onMutationSuccess?.(data, variables);
		}
	});
}

//#endregion
//#region src/api/useCreateTranslations.ts
/**
* Custom hook to bulk-create translations for a new language.
*
* Sends a single POST request with the full translations bundle to
* `POST /i18n/languages/{language}/translations`.
*
* @returns TanStack Query mutation object for creating translations
*
* @example
* ```tsx
* function CreateLanguagePage() {
*   const createTranslations = useCreateTranslations();
*
*   const handleCreate = () => {
*     createTranslations.mutate(
*       {language: 'fr-FR', translations: {'common': {'hello': 'Bonjour'}}},
*       {
*         onSuccess: () => navigate('/translations/fr-FR'),
*         onError: (error) => console.error('Failed to create:', error),
*       },
*     );
*   };
* }
* ```
*/
function useCreateTranslations() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ language, translations }) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/i18n/languages/${language}/translations`,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				data: { translations }
			})).data;
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: [i18n_query_keys_default.TRANSLATIONS] });
			queryClient.invalidateQueries({ queryKey: [i18n_query_keys_default.TRANSLATIONS, variables.language] });
			queryClient.invalidateQueries({ queryKey: [i18n_query_keys_default.LANGUAGES] });
		}
	});
}

//#endregion
//#region src/api/useDeleteTranslations.ts
/**
* Custom hook to delete all custom translations for a language.
*
* Calls DELETE /i18n/languages/{language}/translations which removes all
* custom translation overrides for the language, resetting it to defaults.
*
* @returns TanStack Query mutation object for deleting translations
*
* @example
* ```tsx
* function DeleteLanguageButton({ language }: { language: string }) {
*   const deleteTranslations = useDeleteTranslations();
*
*   const handleDelete = () => {
*     deleteTranslations.mutate(language, {
*       onSuccess: () => console.log('Translations deleted'),
*       onError: (error) => console.error('Failed to delete:', error),
*     });
*   };
*
*   return (
*     <button onClick={handleDelete} disabled={deleteTranslations.isPending}>
*       {deleteTranslations.isPending ? 'Deleting...' : 'Delete Language'}
*     </button>
*   );
* }
* ```
*/
function useDeleteTranslations() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (language) => {
			const serverUrl = getServerUrl();
			await http.request({
				url: `${serverUrl}/i18n/languages/${language}/translations`,
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
		},
		onSuccess: (_data, language) => {
			queryClient.invalidateQueries({ queryKey: [i18n_query_keys_default.TRANSLATIONS] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [i18n_query_keys_default.TRANSLATIONS, language] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [i18n_query_keys_default.LANGUAGES] }).catch(() => {});
		}
	});
}

//#endregion
//#region src/api/useLanguage.ts
/**
* Hook to manage language switching in the application.
*
* Uses react-i18next internally for language management.
*
* @returns Language management utilities including the current language, available languages, and a setter function.
*
* @example
* ```tsx
* function LanguageSwitcher() {
*   const { currentLanguage, availableLanguages, setLanguage } = useLanguage();
*
*   return (
*     <select
*       value={currentLanguage}
*       onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
*     >
*       {availableLanguages.map((lang) => (
*         <option key={lang.code} value={lang.code}>
*           {lang.nativeName}
*         </option>
*       ))}
*     </select>
*   );
* }
* ```
*
* @public
*/
function useLanguage() {
	const { i18n } = useTranslation();
	const currentLanguage = i18n.language;
	const availableLanguages = Object.values(LANGUAGE_CONFIGS);
	const setLanguage = async (language) => {
		await i18n.changeLanguage(language);
	};
	return {
		currentLanguage,
		availableLanguages,
		setLanguage
	};
}

//#endregion
//#region src/constants/NamespaceConstants.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
* i18n namespace constants for i18n translations.
*
* @public
* @remarks
* These constants define the translation namespaces used for
* i18n-related translations. Use these to reference
* the correct i18n namespace when rendering or processing
* i18n content.
*
* @example
* // Using in a translation function
* t(`${NamespaceConstants.CUSTOM_NAMESPACE}:form.title`)
*/
const NamespaceConstants = {
	CUSTOM_NAMESPACE: "custom",
	HOME: "home"
};
var NamespaceConstants_default = NamespaceConstants;

//#endregion
//#region src/constants/I18nDefaultConstants.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
* The BCP 47 locale code used as the fallback language across all applications.
*/
const I18nDefaultConstants = { FALLBACK_LANGUAGE: "en-US" };
var I18nDefaultConstants_default = I18nDefaultConstants;

//#endregion
//#region src/utils/commonLocales.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
* Curated list of common BCP 47 locale codes used to populate language pickers.
*/
const COMMON_LOCALES = [
	"af-ZA",
	"ar-AE",
	"ar-SA",
	"az-AZ",
	"be-BY",
	"bg-BG",
	"bn-BD",
	"ca-ES",
	"cs-CZ",
	"cy-GB",
	"da-DK",
	"de-AT",
	"de-CH",
	"de-DE",
	"el-GR",
	"en-AU",
	"en-CA",
	"en-GB",
	"en-IN",
	"en-US",
	"en-ZA",
	"es-AR",
	"es-CO",
	"es-ES",
	"es-MX",
	"es-US",
	"et-EE",
	"eu-ES",
	"fa-IR",
	"fi-FI",
	"fr-BE",
	"fr-CA",
	"fr-CH",
	"fr-FR",
	"ga-IE",
	"gl-ES",
	"gu-IN",
	"he-IL",
	"hi-IN",
	"hr-HR",
	"hu-HU",
	"hy-AM",
	"id-ID",
	"is-IS",
	"it-CH",
	"it-IT",
	"ja-JP",
	"ka-GE",
	"kk-KZ",
	"km-KH",
	"kn-IN",
	"ko-KR",
	"lt-LT",
	"lv-LV",
	"mk-MK",
	"ml-IN",
	"mn-MN",
	"mr-IN",
	"ms-MY",
	"mt-MT",
	"my-MM",
	"nb-NO",
	"ne-NP",
	"nl-BE",
	"nl-NL",
	"pa-IN",
	"pl-PL",
	"pt-BR",
	"pt-PT",
	"ro-RO",
	"ru-RU",
	"si-LK",
	"sk-SK",
	"sl-SI",
	"sq-AL",
	"sr-RS",
	"sv-SE",
	"sw-KE",
	"ta-IN",
	"te-IN",
	"th-TH",
	"tr-TR",
	"uk-UA",
	"ur-PK",
	"uz-UZ",
	"vi-VN",
	"zh-CN",
	"zh-HK",
	"zh-TW",
	"zu-ZA"
];
var commonLocales_default = COMMON_LOCALES;

//#endregion
//#region src/utils/regionLocales.ts
/**
* Map of ISO 3166-1 alpha-2 region code → BCP 47 locale codes for that region,
* derived from {@link COMMON_LOCALES}.
*
* @example REGION_LOCALES['FR'] // ['fr-FR']
* @example REGION_LOCALES['BE'] // ['fr-BE', 'nl-BE']
*/
const REGION_LOCALES = commonLocales_default.reduce((acc, code) => {
	const region = code.split("-")[1]?.toUpperCase();
	if (region) (acc[region] ??= []).push(code);
	return acc;
}, {});
var regionLocales_default = REGION_LOCALES;

//#endregion
//#region src/utils/toFlagEmoji.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
* Convert a BCP 47 locale code or ISO 3166-1 alpha-2 region code to a flag
* emoji using regional indicator symbol letters (Unicode range 0x1F1E6–0x1F1FF).
*
* When given a full locale code the region part is extracted first.
* Language-only codes with no region part return 🌐.
*
* @example toFlagEmoji('de-CH') // '🇨🇭'
* @example toFlagEmoji('en-US') // '🇺🇸'
* @example toFlagEmoji('en')    // '🌐'
*/
function toFlagEmoji(localeOrRegionCode) {
	const lastPart = localeOrRegionCode.split("-").at(-1);
	const regionCode = /^[A-Z]{2}$/.test(lastPart) ? lastPart : null;
	if (!regionCode) return "🌐";
	return [...regionCode.toUpperCase()].map((c) => String.fromCodePoint(127462 + c.charCodeAt(0) - 65)).join("");
}

//#endregion
//#region src/utils/buildCountryOptions.ts
/**
* Builds a sorted list of {@link CountryOption} objects derived from {@link REGION_LOCALES},
* with display names resolved via {@link Intl.DisplayNames} and flag emojis.
*
* @returns Sorted array of country options for use in pickers and forms.
*
* @example
* ```ts
* const options = buildCountryOptions();
* // [{ regionCode: 'FR', name: 'France', flag: '🇫🇷' }, ...]
* ```
*
* @public
*/
function buildCountryOptions() {
	const dn = new Intl.DisplayNames(["en"], { type: "region" });
	return Object.keys(regionLocales_default).map((regionCode) => ({
		regionCode,
		name: dn.of(regionCode) ?? regionCode,
		flag: toFlagEmoji(regionCode)
	})).sort((a, b) => a.name.localeCompare(b.name));
}

//#endregion
//#region src/utils/buildLocaleOptions.ts
/**
* Build a sorted list of {@link LocaleOption}.
*
* When `regionCode` is provided the list is scoped to locales that belong to
* that region (from {@link REGION_LOCALES}); otherwise all
* {@link COMMON_LOCALES} are returned.
*
* @param regionCode - Optional ISO 3166-1 alpha-2 region code to filter by.
*/
function buildLocaleOptions(regionCode) {
	const dn = new Intl.DisplayNames(["en"], { type: "language" });
	return (regionCode ? regionLocales_default[regionCode] ?? [] : commonLocales_default).map((code) => ({
		code,
		displayName: dn.of(code) ?? code,
		flag: toFlagEmoji(code.split("-")[1]?.toUpperCase() ?? "")
	})).sort((a, b) => a.displayName.localeCompare(b.displayName));
}

//#endregion
//#region src/utils/getDisplayNameForCode.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
*
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/
/**
* Resolve a human-readable English display name for a BCP 47 locale code using
* {@link Intl.DisplayNames}. Returns `null` when the code is empty, invalid,
* or when the resolved name equals the raw code (i.e. Intl has no data for it).
*
* Uses {@link Intl.getCanonicalLocales} internally to validate the tag before
* attempting resolution.
*
* @example getDisplayNameForCode('fr-FR') // 'French (France)'
* @example getDisplayNameForCode('xyz')   // null
*/
function getDisplayNameForCode(code) {
	if (!code.trim()) return null;
	try {
		Intl.getCanonicalLocales(code);
		const name = new Intl.DisplayNames(["en"], { type: "language" }).of(code);
		return name && name !== code ? name : null;
	} catch {
		return null;
	}
}

//#endregion
export { commonLocales_default as COMMON_LOCALES, I18nDefaultConstants_default as I18nDefaultConstants, i18n_query_keys_default as I18nQueryKeys, LANGUAGE_CONFIGS, NamespaceConstants_default as NamespaceConstants, regionLocales_default as REGION_LOCALES, buildCountryOptions, buildLocaleOptions, en_US_default as enUS, getDisplayNameForCode, isSupportedLanguage, toFlagEmoji, useCreateTranslations, useDeleteTranslations, useGetLanguages, useGetTranslations, useLanguage, useUpdateTranslation };