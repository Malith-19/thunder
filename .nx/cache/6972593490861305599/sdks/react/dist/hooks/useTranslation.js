import I18nContext_default from "../contexts/I18n/I18nContext.js";
import ComponentPreferencesContext_default from "../contexts/I18n/ComponentPreferencesContext.js";
import { deepMerge, normalizeTranslations } from "@thunderid/browser";
import { useContext, useMemo } from "react";

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
	const context = useContext(I18nContext_default);
	const contextPreferences = useContext(ComponentPreferencesContext_default)?.i18n;
	if (!context) throw new Error("useTranslation must be used within an I18nProvider. Make sure your component is wrapped with ThunderIDProvider which includes I18nProvider.");
	const effectivePreferences = componentPreferences ?? contextPreferences;
	const { t: globalT, currentLanguage, setLanguage, bundles: globalBundles, fallbackLanguage } = context;
	const mergedBundles = useMemo(() => {
		if (!effectivePreferences?.bundles) return globalBundles;
		const merged = {};
		Object.entries(globalBundles).forEach(([key, bundle]) => {
			merged[key] = bundle;
		});
		Object.entries(effectivePreferences.bundles).forEach(([key, componentBundle]) => {
			const normalizedTranslations = normalizeTranslations(componentBundle.translations);
			if (merged[key]) merged[key] = {
				...merged[key],
				metadata: componentBundle.metadata ? {
					...merged[key].metadata,
					...componentBundle.metadata
				} : merged[key].metadata,
				translations: deepMerge(merged[key].translations, normalizedTranslations)
			};
			else merged[key] = {
				...componentBundle,
				translations: normalizedTranslations
			};
		});
		return merged;
	}, [globalBundles, effectivePreferences?.bundles]);
	const enhancedT = useMemo(() => {
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
export { useTranslation_default as default };
//# sourceMappingURL=useTranslation.js.map