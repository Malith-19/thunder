import FlowMetaContext_default from "./FlowMetaContext.js";
import useI18n_default from "../I18n/useI18n.js";
import useThunderID_default from "../ThunderID/useThunderID.js";
import { FlowMetaType, Platform, TranslationBundleConstants, getFlowMetaV2 } from "@thunderid/browser";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";

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
	const { baseUrl, applicationId, platform, isInitialized } = useThunderID_default();
	const i18nContext = useI18n_default();
	const [meta, setMeta] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [pendingLanguage, setPendingLanguage] = useState(null);
	const lastFetchedRef = useRef(null);
	const fetchFlowMeta = useCallback(async () => {
		if (!enabled || platform !== Platform.ThunderID) {
			setMeta(null);
			setIsLoading(false);
			return;
		}
		if (!isInitialized && !applicationId) return;
		setIsLoading(true);
		setError(null);
		try {
			setMeta(await getFlowMetaV2({
				baseUrl,
				...applicationId ? {
					id: applicationId,
					type: FlowMetaType.App
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
	const switchLanguage = useCallback(async (language) => {
		if (!enabled || platform !== Platform.ThunderID) return;
		setIsLoading(true);
		setError(null);
		try {
			const result = await getFlowMetaV2({
				baseUrl,
				...applicationId ? {
					id: applicationId,
					type: FlowMetaType.App
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
	useEffect(() => {
		if (pendingLanguage && i18nContext?.setLanguage) {
			i18nContext.setLanguage(pendingLanguage);
			setPendingLanguage(null);
		}
	}, [pendingLanguage, i18nContext?.setLanguage]);
	useEffect(() => {
		if (lastFetchedRef.current === fetchFlowMeta) return;
		lastFetchedRef.current = fetchFlowMeta;
		fetchFlowMeta();
	}, [fetchFlowMeta]);
	useEffect(() => {
		if (!meta?.i18n?.translations || !i18nContext?.injectBundles) return;
		const metaLanguage = meta.i18n.language || TranslationBundleConstants.FALLBACK_LOCALE;
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
	return /* @__PURE__ */ jsx(FlowMetaContext_default.Provider, {
		value,
		children
	});
};
var FlowMetaProvider_default = FlowMetaProvider;

//#endregion
export { FlowMetaProvider_default as default };
//# sourceMappingURL=FlowMetaProvider.js.map