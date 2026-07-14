const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_I18nContext = require('../contexts/I18n/I18nContext.cjs');
const require_ComponentPreferencesContext = require('../contexts/I18n/ComponentPreferencesContext.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/hooks/useTranslation.ts
/**
* Hook for accessing translation functions and language management.
* Must be used within an I18nProvider context.
*
* @param componentPreferences - Optional component-level i18n preferences to merge with global ones
* @returns An object containing translation function and language management utilities
* @throws Error if used outside of I18nProvider context
*/
const useTranslation = (componentPreferences) => {
	const context = (0, react.useContext)(require_I18nContext.default);
	const contextPreferences = (0, react.useContext)(require_ComponentPreferencesContext.default)?.i18n;
	if (!context) throw new Error("useTranslation must be used within an I18nProvider. Make sure your component is wrapped with ThunderIDProvider which includes I18nProvider.");
	const effectivePreferences = componentPreferences ?? contextPreferences;
	const { t: globalT, currentLanguage, setLanguage, bundles: globalBundles, fallbackLanguage } = context;
	const mergedBundles = (0, react.useMemo)(() => {
		if (!effectivePreferences?.bundles) return globalBundles;
		const merged = {};
		Object.entries(globalBundles).forEach(([key, bundle]) => {
			merged[key] = bundle;
		});
		Object.entries(effectivePreferences.bundles).forEach(([key, componentBundle]) => {
			const normalizedTranslations = (0, __thunderid_browser.normalizeTranslations)(componentBundle.translations);
			if (merged[key]) merged[key] = {
				...merged[key],
				metadata: componentBundle.metadata ? {
					...merged[key].metadata,
					...componentBundle.metadata
				} : merged[key].metadata,
				translations: (0, __thunderid_browser.deepMerge)(merged[key].translations, normalizedTranslations)
			};
			else merged[key] = {
				...componentBundle,
				translations: normalizedTranslations
			};
		});
		return merged;
	}, [globalBundles, effectivePreferences?.bundles]);
	const enhancedT = (0, react.useMemo)(() => {
		if (!effectivePreferences?.bundles) return globalT;
		return (key, params) => {
			let translation;
			const currentBundle = mergedBundles[currentLanguage];
			if (currentBundle?.translations?.[key]) translation = currentBundle.translations[key];
			if (!translation && currentLanguage !== fallbackLanguage) {
				const fallbackBundle = mergedBundles[fallbackLanguage];
				if (fallbackBundle?.translations?.[key]) translation = fallbackBundle.translations[key];
			}
			if (!translation) translation = key;
			if (params && Object.keys(params).length > 0) return Object.entries(params).reduce((acc, [paramKey, paramValue]) => acc.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue)), translation);
			return translation;
		};
	}, [
		mergedBundles,
		currentLanguage,
		fallbackLanguage,
		globalT,
		effectivePreferences?.bundles
	]);
	return {
		availableLanguages: Object.keys(mergedBundles),
		currentLanguage,
		setLanguage,
		t: enhancedT
	};
};
var useTranslation_default = useTranslation;

//#endregion
exports.default = useTranslation_default;
//# sourceMappingURL=useTranslation.cjs.map