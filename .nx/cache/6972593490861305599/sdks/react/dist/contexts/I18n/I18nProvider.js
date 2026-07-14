import I18nContext_default from "./I18nContext.js";
import { TranslationBundleConstants, createPackageComponentLogger, deepMerge, getDefaultI18nBundles, normalizeTranslations } from "@thunderid/browser";
import { useCallback, useEffect, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/I18n/I18nProvider.tsx
const logger$1 = createPackageComponentLogger("@thunderid/react", "I18nProvider");
const DEFAULT_STORAGE_KEY = "thunderid-i18n-language";
const DEFAULT_URL_PARAM = "lang";
const detectBrowserLanguage = () => {
	if (typeof window !== "undefined" && window.navigator) return window.navigator.language || TranslationBundleConstants.FALLBACK_LOCALE;
	return TranslationBundleConstants.FALLBACK_LOCALE;
};
const deriveRootDomain = (hostname) => {
	const parts = hostname.split(".");
	return parts.length > 1 ? parts.slice(-2).join(".") : hostname;
};
const getCookie = (name) => {
	if (typeof document === "undefined") return null;
	const match = (/* @__PURE__ */ new RegExp(`(?:^|; )${name.replace(/([.*+?^${}()|[\]\\])/g, "\\$1")}=([^;]*)`)).exec(document.cookie);
	return match ? decodeURIComponent(match[1]) : null;
};
const setCookie = (name, value, domain) => {
	if (typeof document === "undefined") return;
	const maxAge = 365 * 24 * 60 * 60;
	const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
	document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; Domain=${domain}; SameSite=Lax${secure}`;
};
const createStorageAdapter = (strategy, key, cookieDomain) => {
	switch (strategy) {
		case "cookie": return {
			read: () => getCookie(key),
			write: (language) => {
				const domain = cookieDomain ?? (typeof window !== "undefined" ? deriveRootDomain(window.location.hostname) : "");
				if (domain) setCookie(key, language, domain);
			}
		};
		case "localStorage": return {
			read: () => {
				if (typeof window === "undefined" || !window.localStorage) return null;
				try {
					return window.localStorage.getItem(key);
				} catch {
					return null;
				}
			},
			write: (language) => {
				if (typeof window === "undefined" || !window.localStorage) return;
				try {
					window.localStorage.setItem(key, language);
				} catch {
					logger$1.warn("Failed to persist language preference to localStorage.");
				}
			}
		};
		case "none":
		default: return {
			read: () => null,
			write: () => {}
		};
	}
};
const detectUrlParamLanguage = (paramName) => {
	if (typeof window === "undefined") return null;
	try {
		return new URLSearchParams(window.location.search).get(paramName);
	} catch {
		return null;
	}
};
/**
* I18nProvider component that manages internationalization state and provides
* translation functions to child components.
*/
const I18nProvider = ({ children, preferences }) => {
	const defaultBundles = getDefaultI18nBundles();
	const storageStrategy = preferences?.storageStrategy ?? "cookie";
	const storageKey = preferences?.storageKey ?? DEFAULT_STORAGE_KEY;
	const urlParamConfig = preferences?.urlParam === void 0 ? DEFAULT_URL_PARAM : preferences.urlParam;
	const resolvedCookieDomain = useMemo(() => {
		if (storageStrategy !== "cookie") return void 0;
		if (preferences?.cookieDomain) return preferences.cookieDomain;
		return typeof window !== "undefined" ? deriveRootDomain(window.location.hostname) : void 0;
	}, [storageStrategy, preferences?.cookieDomain]);
	const storage = useMemo(() => createStorageAdapter(storageStrategy, storageKey, resolvedCookieDomain), [
		storageStrategy,
		storageKey,
		resolvedCookieDomain
	]);
	const determineInitialLanguage = () => {
		if (preferences?.language) return preferences.language;
		if (urlParamConfig !== false) {
			const urlLanguage = detectUrlParamLanguage(urlParamConfig);
			if (urlLanguage) {
				storage.write(urlLanguage);
				return urlLanguage;
			}
		}
		const storedLanguage = storage.read();
		if (storedLanguage) return storedLanguage;
		const browserLanguage = detectBrowserLanguage();
		if (browserLanguage) return browserLanguage;
		return preferences?.fallbackLanguage || TranslationBundleConstants.FALLBACK_LOCALE;
	};
	const [currentLanguage, setCurrentLanguage] = useState(determineInitialLanguage);
	const [injectedBundles, setInjectedBundles] = useState({});
	const injectBundles = useCallback((newBundles) => {
		setInjectedBundles((prev) => {
			const merged = { ...prev };
			Object.entries(newBundles).forEach(([key, bundle]) => {
				const normalizedTranslations = normalizeTranslations(bundle.translations);
				if (merged[key]) merged[key] = {
					...merged[key],
					translations: deepMerge(merged[key].translations, normalizedTranslations)
				};
				else merged[key] = {
					...bundle,
					translations: normalizedTranslations
				};
			});
			return merged;
		});
	}, []);
	/**
	* Merge bundles in priority order: defaults → injected (meta) → prop-provided
	*/
	const mergedBundles = useMemo(() => {
		const merged = {};
		Object.entries(defaultBundles).forEach(([key, bundle]) => {
			const languageKey = key.replace("_", "-");
			merged[languageKey] = bundle;
		});
		Object.entries(injectedBundles).forEach(([key, bundle]) => {
			const normalizedTranslations = normalizeTranslations(bundle.translations);
			if (merged[key]) merged[key] = {
				...merged[key],
				translations: deepMerge(merged[key].translations, normalizedTranslations)
			};
			else merged[key] = {
				...bundle,
				translations: normalizedTranslations
			};
		});
		if (preferences?.bundles) Object.entries(preferences.bundles).forEach(([key, userBundle]) => {
			const normalizedTranslations = normalizeTranslations(userBundle.translations);
			if (merged[key]) merged[key] = {
				...merged[key],
				metadata: userBundle.metadata ? {
					...merged[key].metadata,
					...userBundle.metadata
				} : merged[key].metadata,
				translations: deepMerge(merged[key].translations, normalizedTranslations)
			};
			else merged[key] = {
				...userBundle,
				translations: normalizedTranslations
			};
		});
		return merged;
	}, [
		defaultBundles,
		injectedBundles,
		preferences?.bundles
	]);
	const fallbackLanguage = preferences?.fallbackLanguage || TranslationBundleConstants.FALLBACK_LOCALE;
	useEffect(() => {
		storage.write(currentLanguage);
	}, [currentLanguage, storage]);
	const t = useCallback((key, params) => {
		let translation;
		const currentBundle = mergedBundles[currentLanguage];
		if (currentBundle?.translations[key]) translation = currentBundle.translations[key];
		if (!translation && currentLanguage !== fallbackLanguage) {
			const fallbackBundle = mergedBundles[fallbackLanguage];
			if (fallbackBundle?.translations[key]) translation = fallbackBundle.translations[key];
		}
		if (!translation) translation = key;
		if (params && Object.keys(params).length > 0) return Object.entries(params).reduce((acc, [paramKey, paramValue]) => acc.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(paramValue)), translation);
		return translation;
	}, [
		mergedBundles,
		currentLanguage,
		fallbackLanguage
	]);
	const setLanguage = useCallback((language) => {
		if (mergedBundles[language]) setCurrentLanguage(language);
		else logger$1.warn(`Language '${language}' is not available. Available languages: ${Object.keys(mergedBundles).join(", ")}`);
	}, [mergedBundles]);
	const contextValue = useMemo(() => ({
		bundles: mergedBundles,
		currentLanguage,
		fallbackLanguage,
		injectBundles,
		setLanguage,
		t
	}), [
		currentLanguage,
		fallbackLanguage,
		injectBundles,
		mergedBundles,
		setLanguage,
		t
	]);
	return /* @__PURE__ */ jsx(I18nContext_default.Provider, {
		value: contextValue,
		children
	});
};
var I18nProvider_default = I18nProvider;

//#endregion
export { I18nProvider_default as default };
//# sourceMappingURL=I18nProvider.js.map