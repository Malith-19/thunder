const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_FlowMetaContext = require('./FlowMetaContext.cjs');
const require_useI18n = require('../I18n/useI18n.cjs');
const require_useThunderID = require('../ThunderID/useThunderID.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/contexts/FlowMeta/FlowMetaProvider.tsx
/**
* FlowMetaProvider fetches flow metadata from the `GET /flow/meta` endpoint
* (v2 API) and makes it available to child components through `FlowMetaContext`.
*
* It is designed to be used in v2 embedded-flow scenarios and integrates with
* `ThemeProvider` so that theme settings (colors, direction, typography, …)
* from the server-side design configuration are applied automatically.
*
* @example
* ```tsx
* <FlowMetaProvider
*   config={{
*     baseUrl: 'https://localhost:8090',
*     type: FlowMetaType.App,
*     id: 'your-app-id',
*   }}
* >
*   <ThemeProvider>
*     <App />
*   </ThemeProvider>
* </FlowMetaProvider>
* ```
*/
const FlowMetaProvider = ({ children, enabled = true }) => {
	const { baseUrl, applicationId, platform, isInitialized } = require_useThunderID.default();
	const i18nContext = require_useI18n.default();
	const [meta, setMeta] = (0, react.useState)(null);
	const [isLoading, setIsLoading] = (0, react.useState)(true);
	const [error, setError] = (0, react.useState)(null);
	const [pendingLanguage, setPendingLanguage] = (0, react.useState)(null);
	const lastFetchedRef = (0, react.useRef)(null);
	const fetchFlowMeta = (0, react.useCallback)(async () => {
		if (!enabled || platform !== __thunderid_browser.Platform.ThunderID) {
			setMeta(null);
			setIsLoading(false);
			return;
		}
		if (!isInitialized && !applicationId) return;
		setIsLoading(true);
		setError(null);
		try {
			setMeta(await (0, __thunderid_browser.getFlowMetaV2)({
				baseUrl,
				...applicationId ? {
					id: applicationId,
					type: __thunderid_browser.FlowMetaType.App
				} : {},
				language: i18nContext?.currentLanguage
			}));
		} catch (err) {
			setError(err instanceof Error ? err : new Error(String(err)));
		} finally {
			setIsLoading(false);
		}
	}, [
		enabled,
		platform,
		baseUrl,
		applicationId,
		isInitialized,
		i18nContext?.currentLanguage
	]);
	const switchLanguage = (0, react.useCallback)(async (language) => {
		if (!enabled || platform !== __thunderid_browser.Platform.ThunderID) return;
		setIsLoading(true);
		setError(null);
		try {
			const result = await (0, __thunderid_browser.getFlowMetaV2)({
				baseUrl,
				...applicationId ? {
					id: applicationId,
					type: __thunderid_browser.FlowMetaType.App
				} : {},
				language
			});
			if (result.i18n?.translations && i18nContext?.injectBundles) {
				const flatTranslations = {};
				Object.entries(result.i18n.translations).forEach(([namespace, keys]) => {
					Object.entries(keys).forEach(([key, value$1]) => {
						flatTranslations[`${namespace}.${key}`] = value$1;
					});
				});
				const bundle = { translations: flatTranslations };
				i18nContext.injectBundles({ [language]: bundle });
			}
			setPendingLanguage(language);
			setMeta(result);
		} catch (err) {
			setError(err instanceof Error ? err : new Error(String(err)));
		} finally {
			setIsLoading(false);
		}
	}, [
		enabled,
		platform,
		baseUrl,
		applicationId,
		i18nContext
	]);
	(0, react.useEffect)(() => {
		if (pendingLanguage && i18nContext?.setLanguage) {
			i18nContext.setLanguage(pendingLanguage);
			setPendingLanguage(null);
		}
	}, [pendingLanguage, i18nContext?.setLanguage]);
	(0, react.useEffect)(() => {
		if (lastFetchedRef.current === fetchFlowMeta) return;
		lastFetchedRef.current = fetchFlowMeta;
		fetchFlowMeta();
	}, [fetchFlowMeta]);
	(0, react.useEffect)(() => {
		if (!meta?.i18n?.translations || !i18nContext?.injectBundles) return;
		const metaLanguage = meta.i18n.language || __thunderid_browser.TranslationBundleConstants.FALLBACK_LOCALE;
		const flatTranslations = {};
		Object.entries(meta.i18n.translations).forEach(([namespace, keys]) => {
			Object.entries(keys).forEach(([key, value$1]) => {
				flatTranslations[`${namespace}.${key}`] = value$1;
			});
		});
		const bundle = { translations: flatTranslations };
		const bundlesToInject = { [metaLanguage]: bundle };
		if (i18nContext.currentLanguage && i18nContext.currentLanguage !== metaLanguage) bundlesToInject[i18nContext.currentLanguage] = bundle;
		if (i18nContext.fallbackLanguage && i18nContext.fallbackLanguage !== metaLanguage) bundlesToInject[i18nContext.fallbackLanguage] = bundle;
		i18nContext.injectBundles(bundlesToInject);
	}, [meta?.i18n?.translations, i18nContext?.injectBundles]);
	const value = {
		error,
		fetchFlowMeta,
		isLoading,
		meta,
		switchLanguage
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FlowMetaContext.default.Provider, {
		value,
		children
	});
};
var FlowMetaProvider_default = FlowMetaProvider;

//#endregion
exports.default = FlowMetaProvider_default;
//# sourceMappingURL=FlowMetaProvider.cjs.map