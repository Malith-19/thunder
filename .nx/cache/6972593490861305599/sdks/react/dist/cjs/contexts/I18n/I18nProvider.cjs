const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_I18nContext = require('./I18nContext.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/contexts/I18n/I18nProvider.tsx
const logger = (0, __thunderid_browser.createPackageComponentLogger)("@thunderid/react", "I18nProvider");
const DEFAULT_STORAGE_KEY = "thunderid-i18n-language";
const DEFAULT_URL_PARAM = "lang";
const detectBrowserLanguage = () => {
	if (typeof window !== "undefined" && window.navigator) return window.navigator.language || __thunderid_browser.TranslationBundleConstants.FALLBACK_LOCALE;
	return __thunderid_browser.TranslationBundleConstants.FALLBACK_LOCALE;
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
					logger.warn("Failed to persist language preference to localStorage.");
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
	const defaultBundles = (0, __thunderid_browser.getDefaultI18nBundles)();
	const storageStrategy = preferences?.storageStrategy ?? "cookie";
	const storageKey = preferences?.storageKey ?? DEFAULT_STORAGE_KEY;
	const urlParamConfig = preferences?.urlParam === void 0 ? DEFAULT_URL_PARAM : preferences.urlParam;
	const resolvedCookieDomain = (0, react.useMemo)(() => {
		if (storageStrategy !== "cookie") return void 0;
		if (preferences?.cookieDomain) return preferences.cookieDomain;
		return typeof window !== "undefined" ? deriveRootDomain(window.location.hostname) : void 0;
	}, [storageStrategy, preferences?.cookieDomain]);
	const storage = (0, react.useMemo)(() => createStorageAdapter(storageStrategy, storageKey, resolvedCookieDomain), [
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
		return preferences?.fallbackLanguage || __thunderid_browser.TranslationBundleConstants.FALLBACK_LOCALE;
	};
	const [currentLanguage, setCurrentLanguage] = (0, react.useState)(determineInitialLanguage);
	const [injectedBundles, setInjectedBundles] = (0, react.useState)({});
	const injectBundles = (0, react.useCallback)((newBundles) => {
		setInjectedBundles((prev) => {
			const merged = { ...prev };
			Object.entries(newBundles).forEach(([key, bundle]) => {
				const normalizedTranslations = (0, __thunderid_browser.normalizeTranslations)(bundle.translations);
				if (merged[key]) merged[key] = {
					...merged[key],
					translations: (0, __thunderid_browser.deepMerge)(merged[key].translations, normalizedTranslations)
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
	const mergedBundles = (0, react.useMemo)(() => {
		const merged = {};
		Object.entries(defaultBundles).forEach(([key, bundle]) => {
			const languageKey = key.replace("_", "-");
			merged[languageKey] = bundle;
		});
		Object.entries(injectedBundles).forEach(([key, bundle]) => {
			const normalizedTranslations = (0, __thunderid_browser.normalizeTranslations)(bundle.translations);
			if (merged[key]) merged[key] = {
				...merged[key],
				translations: (0, __thunderid_browser.deepMerge)(merged[key].translations, normalizedTranslations)
			};
			else merged[key] = {
				...bundle,
				translations: normalizedTranslations
			};
		});
		if (preferences?.bundles) Object.entries(preferences.bundles).forEach(([key, userBundle]) => {
			const normalizedTranslations = (0, __thunderid_browser.normalizeTranslations)(userBundle.translations);
			if (merged[key]) merged[key] = {
				...merged[key],
				metadata: userBundle.metadata ? {
					...merged[key].metadata,
					...userBundle.metadata
				} : merged[key].metadata,
				translations: (0, __thunderid_browser.deepMerge)(merged[key].translations, normalizedTranslations)
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
	const fallbackLanguage = preferences?.fallbackLanguage || __thunderid_browser.TranslationBundleConstants.FALLBACK_LOCALE;
	(0, react.useEffect)(() => {
		storage.write(currentLanguage);
	}, [currentLanguage, storage]);
	const t = (0, react.useCallback)((key, params) => {
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
	const setLanguage = (0, react.useCallback)((language) => {
		if (mergedBundles[language]) setCurrentLanguage(language);
		else logger.warn(`Language '${language}' is not available. Available languages: ${Object.keys(mergedBundles).join(", ")}`);
	}, [mergedBundles]);
	const contextValue = (0, react.useMemo)(() => ({
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_I18nContext.default.Provider, {
		value: contextValue,
		children
	});
};
var I18nProvider_default = I18nProvider;

//#endregion
exports.default = I18nProvider_default;
//# sourceMappingURL=I18nProvider.cjs.map