import { ApplicationNativeAuthenticationConstants, DEFAULT_THEME, EmbeddedFlowActionVariantV2 as EmbeddedFlowActionVariant, EmbeddedFlowComponentType as EmbeddedFlowComponentType$1, EmbeddedFlowComponentTypeV2, EmbeddedFlowComponentTypeV2 as EmbeddedFlowComponentType, EmbeddedFlowEventTypeV2, EmbeddedFlowEventTypeV2 as EmbeddedFlowEventType, EmbeddedFlowResponseType, EmbeddedFlowStatus, EmbeddedFlowTextVariantV2 as EmbeddedFlowTextVariant, EmbeddedFlowType, EmbeddedSignInFlowAuthenticatorKnownIdPType, EmbeddedSignInFlowAuthenticatorParamType, EmbeddedSignInFlowAuthenticatorPromptType, EmbeddedSignInFlowStatus as EmbeddedSignInFlowStatus$1, EmbeddedSignInFlowStatusV2, EmbeddedSignInFlowStatusV2 as EmbeddedSignInFlowStatus, EmbeddedSignInFlowStepType, EmbeddedSignInFlowTypeV2, EmbeddedSignInFlowTypeV2 as EmbeddedSignInFlowType, FetchHttpClient, FieldType, FieldType as FieldType$1, FlowMetaType, Platform, ThunderIDAPIError, ThunderIDBrowserClient, ThunderIDError, ThunderIDRuntimeError, ThunderIDRuntimeError as ThunderIDRuntimeError$1, TranslationBundleConstants, WellKnownSchemaIds, arrayBufferToBase64url, base64urlToArrayBuffer, createClassObserver, createClassObserver as createClassObserver$1, createMediaQueryListener, createMediaQueryListener as createMediaQueryListener$1, createPackageComponentLogger, createPackageLogger, createTheme, deepMerge, deriveOrganizationHandleFromBaseUrl, detectThemeMode, detectThemeMode as detectThemeMode$1, executeEmbeddedSignInFlowV2, executeEmbeddedSignUpFlowV2, extractEmojiFromUri, extractUserClaimsFromIdToken, flattenUserSchema, generateFlattenedUserProfile, generateUserProfile, get, getActiveTheme, getAllOrganizations, getDefaultI18nBundles, getFlowMetaV2, getMeOrganizations, getSchemas, getScim2Me, handleWebAuthnAuthentication, handleWebAuthnAuthentication as handleWebAuthnAuthentication$1, hasAuthParamsInUrl, hasAuthParamsInUrl as hasAuthParamsInUrl$1, hasCalledForThisInstanceInUrl, http, isEmojiUri, isEmpty, navigate, navigate as navigate$1, normalizeTranslations, resolveFlowTemplateLiterals, transformBrandingPreferenceToTheme, updateMeProfile, withVendorCSSClassPrefix } from "@thunderid/browser";
import { Fragment, computed, defineComponent, h, inject, nextTick, onBeforeUnmount, onMounted, onUnmounted, provide, readonly, ref, shallowReadonly, shallowRef, watch } from "vue";
import DOMPurify from "dompurify";

//#region src/keys.ts
/**
* Injection key for the core ThunderID authentication context.
*/
const THUNDERID_KEY = Symbol("thunderid");
/**
* Injection key for the User context (profile, schemas, update operations).
*/
const USER_KEY = Symbol("thunderid-user");
/**
* Injection key for the Organization context (list, current org, switching).
*/
const ORGANIZATION_KEY = Symbol("thunderid-organization");
/**
* Injection key for the Flow context (embedded flow UI state).
*/
const FLOW_KEY = Symbol("thunderid-flow");
/**
* Injection key for the FlowMeta context (server-driven flow metadata).
*/
const FLOW_META_KEY = Symbol("thunderid-flow-meta");
/**
* Injection key for the Theme context (color scheme, CSS variables, toggle).
*/
const THEME_KEY = Symbol("thunderid-theme");
/**
* Injection key for the Branding context (branding preferences from server).
*/
const BRANDING_KEY = Symbol("thunderid-branding");
/**
* Injection key for the I18n context (translation function, language switching).
*/
const I18N_KEY = Symbol("thunderid-i18n");

//#endregion
//#region src/providers/BrandingProvider.ts
/**
* BrandingProvider manages branding preference state and makes branding data
* available to child components via `useBranding()`.
*
* It receives branding preferences from a parent component (typically
* `<ThunderIDProvider>`) and transforms them into `Theme` objects.
*
* @internal — This provider is mounted automatically by `<ThunderIDProvider>`.
*/
const BrandingProvider = defineComponent({
	name: "BrandingProvider",
	props: {
		brandingPreference: {
			default: null,
			type: Object
		},
		enabled: {
			default: true,
			type: Boolean
		},
		error: {
			default: null,
			type: Object
		},
		forceTheme: {
			default: void 0,
			type: String
		},
		isLoading: {
			default: false,
			type: Boolean
		},
		refetch: {
			default: void 0,
			type: Function
		}
	},
	setup(props, { slots }) {
		const theme = ref(null);
		const activeTheme = ref(null);
		const processBranding = () => {
			if (!props.enabled || !props.brandingPreference) {
				theme.value = null;
				activeTheme.value = null;
				return;
			}
			const activeThemeFromBranding = props.brandingPreference?.preference?.theme?.activeTheme;
			if (activeThemeFromBranding) {
				const mode = activeThemeFromBranding.toLowerCase();
				activeTheme.value = mode === "light" || mode === "dark" ? mode : null;
			} else activeTheme.value = null;
			theme.value = transformBrandingPreferenceToTheme(props.brandingPreference, props.forceTheme);
		};
		watch(() => [
			props.brandingPreference,
			props.forceTheme,
			props.enabled
		], processBranding, { immediate: true });
		const fetchBranding = async () => {
			if (props.refetch) await props.refetch();
		};
		provide(BRANDING_KEY, {
			activeTheme: readonly(activeTheme),
			brandingPreference: readonly(computed(() => props.brandingPreference)),
			error: readonly(computed(() => props.error)),
			fetchBranding,
			isLoading: readonly(computed(() => props.isLoading)),
			refetch: props.refetch ?? fetchBranding,
			theme: shallowReadonly(theme)
		});
		return () => h("div", { style: "display:contents" }, slots["default"]?.());
	}
});
var BrandingProvider_default = BrandingProvider;

//#endregion
//#region src/providers/FlowMetaProvider.ts
const FlowMetaProvider = defineComponent({
	name: "FlowMetaProvider",
	props: { enabled: {
		default: true,
		type: Boolean
	} },
	setup(props, { slots }) {
		const thunderIDContext = inject(THUNDERID_KEY);
		const i18nContext = inject(I18N_KEY, null);
		const meta = ref(null);
		const isLoading = ref(false);
		const error = ref(null);
		const pendingLanguage = ref(null);
		const baseUrl = thunderIDContext?.baseUrl;
		const applicationId = thunderIDContext?.applicationId;
		const fetchFlowMeta = async () => {
			if (!props.enabled) {
				meta.value = null;
				return;
			}
			isLoading.value = true;
			error.value = null;
			try {
				meta.value = await getFlowMetaV2({
					baseUrl,
					id: applicationId,
					type: FlowMetaType.App
				});
			} catch (err) {
				error.value = err instanceof Error ? err : new Error(String(err));
			} finally {
				isLoading.value = false;
			}
		};
		const switchLanguage = async (language) => {
			if (!props.enabled) return;
			isLoading.value = true;
			error.value = null;
			try {
				const result = await getFlowMetaV2({
					baseUrl,
					id: applicationId,
					language,
					type: FlowMetaType.App
				});
				if (result.i18n?.translations && i18nContext?.injectBundles) {
					const flatTranslations = {};
					Object.entries(result.i18n.translations).forEach(([namespace, keys]) => {
						Object.entries(keys).forEach(([key, value]) => {
							flatTranslations[`${namespace}.${key}`] = value;
						});
					});
					const bundle = { translations: flatTranslations };
					i18nContext.injectBundles({ [language]: bundle });
				}
				pendingLanguage.value = language;
				meta.value = result;
			} catch (err) {
				error.value = err instanceof Error ? err : new Error(String(err));
			} finally {
				isLoading.value = false;
			}
		};
		watch(pendingLanguage, (lang) => {
			if (lang && i18nContext?.setLanguage) {
				i18nContext.setLanguage(lang);
				pendingLanguage.value = null;
			}
		});
		watch(() => meta.value?.i18n?.translations, (translations) => {
			if (!translations || !i18nContext?.injectBundles) return;
			const metaLanguage = (meta.value?.i18n)?.language || TranslationBundleConstants.FALLBACK_LOCALE;
			const flatTranslations = {};
			Object.entries(translations).forEach(([namespace, keys]) => {
				Object.entries(keys).forEach(([key, value]) => {
					flatTranslations[`${namespace}.${key}`] = value;
				});
			});
			const bundle = { translations: flatTranslations };
			const bundlesToInject = { [metaLanguage]: bundle };
			const currentLang = i18nContext.currentLanguage.value;
			const fallbackLang = i18nContext.fallbackLanguage;
			if (currentLang && currentLang !== metaLanguage) bundlesToInject[currentLang] = bundle;
			if (fallbackLang && fallbackLang !== metaLanguage) bundlesToInject[fallbackLang] = bundle;
			i18nContext.injectBundles(bundlesToInject);
		});
		onMounted(() => {
			fetchFlowMeta();
		});
		provide(FLOW_META_KEY, {
			error: readonly(error),
			fetchFlowMeta,
			isLoading: readonly(isLoading),
			meta: shallowReadonly(meta),
			switchLanguage
		});
		return () => h("div", { style: "display:contents" }, slots["default"]?.());
	}
});
var FlowMetaProvider_default = FlowMetaProvider;

//#endregion
//#region src/providers/FlowProvider.ts
const FlowProvider = defineComponent({
	name: "FlowProvider",
	props: {
		initialStep: {
			default: null,
			type: Object
		},
		initialSubtitle: {
			default: void 0,
			type: String
		},
		initialTitle: {
			default: "",
			type: String
		},
		onFlowChange: {
			default: void 0,
			type: Function
		}
	},
	setup(props, { slots }) {
		const currentStep = ref(props.initialStep ?? null);
		const title = ref(props.initialTitle ?? "");
		const subtitle = ref(props.initialSubtitle);
		const messages = ref([]);
		const error = ref(null);
		const isLoading = ref(false);
		const showBackButton = ref(false);
		const onGoBack = ref(void 0);
		const setCurrentStep = (step) => {
			currentStep.value = step;
			if (step) {
				title.value = step.title;
				subtitle.value = step.subtitle;
				showBackButton.value = step.canGoBack ?? false;
			}
			props.onFlowChange?.(step);
		};
		const setTitle = (newTitle) => {
			title.value = newTitle;
		};
		const setSubtitle = (newSubtitle) => {
			subtitle.value = newSubtitle;
		};
		const setError = (newError) => {
			error.value = newError;
		};
		const setIsLoading = (loading) => {
			isLoading.value = loading;
		};
		const setShowBackButton = (show) => {
			showBackButton.value = show;
		};
		const setOnGoBack = (callback) => {
			onGoBack.value = callback;
		};
		const addMessage = (message) => {
			const messageWithId = {
				...message,
				id: message.id ?? `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
			};
			messages.value = [...messages.value, messageWithId];
		};
		const removeMessage = (messageId) => {
			messages.value = messages.value.filter((msg) => msg.id !== messageId);
		};
		const clearMessages = () => {
			messages.value = [];
		};
		const reset = () => {
			currentStep.value = props.initialStep ?? null;
			title.value = props.initialTitle ?? "";
			subtitle.value = props.initialSubtitle;
			messages.value = [];
			error.value = null;
			isLoading.value = false;
			showBackButton.value = false;
			onGoBack.value = void 0;
		};
		const navigateToFlow = (flowType, options) => {
			const stepId = `${flowType}-${Date.now()}`;
			setCurrentStep({
				canGoBack: flowType !== "signin",
				id: stepId,
				metadata: options?.metadata,
				subtitle: options?.subtitle,
				title: options?.title ?? "",
				type: flowType
			});
			clearMessages();
			error.value = null;
		};
		provide(FLOW_KEY, {
			addMessage,
			clearMessages,
			currentStep: readonly(currentStep),
			error: readonly(error),
			isLoading: readonly(isLoading),
			messages: shallowReadonly(messages),
			navigateToFlow,
			onGoBack: readonly(onGoBack),
			removeMessage,
			reset,
			setCurrentStep,
			setError,
			setIsLoading,
			setOnGoBack,
			setShowBackButton,
			setSubtitle,
			setTitle,
			showBackButton: readonly(showBackButton),
			subtitle: readonly(subtitle),
			title: readonly(title)
		});
		return () => h("div", { style: "display:contents" }, slots["default"]?.());
	}
});
var FlowProvider_default = FlowProvider;

//#endregion
//#region src/utils/logger.ts
const PACKAGE_NAME = "@thunderid/vue";
/**
* Package-level logger for `@thunderid/vue`.
* Use this when logging is not tied to a specific component.
*/
const logger$7 = createPackageLogger(PACKAGE_NAME);
/**
* Creates a component-scoped logger prefixed with `@thunderid/vue - <component>`.
*
* @param component - The component or module name (e.g. `'ThunderIDProvider'`).
*/
const createVueLogger = (component) => createPackageComponentLogger(PACKAGE_NAME, component);

//#endregion
//#region src/providers/I18nProvider.ts
const logger$6 = createVueLogger("I18nProvider");
const DEFAULT_STORAGE_KEY = "thunderid-i18n-language";
const DEFAULT_URL_PARAM = "lang";
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
					logger$6.warn("Failed to persist language preference to localStorage.");
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
const detectBrowserLanguage = () => {
	if (typeof window !== "undefined" && window.navigator) return window.navigator.language || TranslationBundleConstants.FALLBACK_LOCALE;
	return TranslationBundleConstants.FALLBACK_LOCALE;
};
const I18nProvider = defineComponent({
	name: "I18nProvider",
	props: { preferences: {
		default: void 0,
		type: Object
	} },
	setup(props, { slots }) {
		const defaultBundles = getDefaultI18nBundles();
		const storageStrategy = props.preferences?.storageStrategy ?? "cookie";
		const storageKey = props.preferences?.storageKey ?? DEFAULT_STORAGE_KEY;
		const urlParamConfig = props.preferences?.urlParam === void 0 ? DEFAULT_URL_PARAM : props.preferences.urlParam;
		const storage = createStorageAdapter(storageStrategy, storageKey, storageStrategy === "cookie" ? props.preferences?.cookieDomain ?? (typeof window !== "undefined" ? deriveRootDomain(window.location.hostname) : void 0) : void 0);
		const determineInitialLanguage = () => {
			if (props.preferences?.language) return props.preferences.language;
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
			return props.preferences?.fallbackLanguage || TranslationBundleConstants.FALLBACK_LOCALE;
		};
		const currentLanguage = ref(determineInitialLanguage());
		const fallbackLanguage = props.preferences?.fallbackLanguage || TranslationBundleConstants.FALLBACK_LOCALE;
		const injectedBundles = ref({});
		const injectBundles = (newBundles) => {
			const mergedBundles = { ...injectedBundles.value };
			Object.entries(newBundles).forEach(([languageKey, bundle]) => {
				const normalizedTranslations = normalizeTranslations(bundle.translations);
				if (mergedBundles[languageKey]) mergedBundles[languageKey] = {
					...mergedBundles[languageKey],
					translations: deepMerge(mergedBundles[languageKey].translations, normalizedTranslations)
				};
				else mergedBundles[languageKey] = {
					...bundle,
					translations: normalizedTranslations
				};
			});
			injectedBundles.value = mergedBundles;
		};
		/**
		* Merge bundles: defaults → injected (meta) → prop-provided (highest priority)
		*/
		const mergedBundlesComputed = computed(() => {
			const merged = {};
			Object.entries(defaultBundles).forEach(([key, bundle]) => {
				const languageKey = key.replace("_", "-");
				merged[languageKey] = bundle;
			});
			Object.entries(injectedBundles.value).forEach(([key, bundle]) => {
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
			if (props.preferences?.bundles) Object.entries(props.preferences.bundles).forEach(([key, userBundle]) => {
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
		});
		watch(currentLanguage, (lang) => {
			storage.write(lang);
		});
		const t = (key, params) => {
			let translation;
			const currentBundle = mergedBundlesComputed.value[currentLanguage.value];
			if (currentBundle?.translations[key]) translation = currentBundle.translations[key];
			if (!translation && currentLanguage.value !== fallbackLanguage) {
				const fallbackBundle = mergedBundlesComputed.value[fallbackLanguage];
				if (fallbackBundle?.translations[key]) translation = fallbackBundle.translations[key];
			}
			if (!translation) translation = key;
			if (params && Object.keys(params).length > 0) return Object.entries(params).reduce((acc, [paramKey, paramValue]) => acc.replaceAll(`{${paramKey}}`, String(paramValue)), translation);
			return translation;
		};
		const setLanguage = (language) => {
			if (mergedBundlesComputed.value[language]) currentLanguage.value = language;
			else logger$6.warn(`Language '${language}' is not available. Available languages: ${Object.keys(mergedBundlesComputed.value).join(", ")}`);
		};
		provide(I18N_KEY, {
			bundles: readonly(mergedBundlesComputed),
			currentLanguage: readonly(currentLanguage),
			fallbackLanguage,
			injectBundles,
			setLanguage,
			t
		});
		return () => h("div", { style: "display:contents" }, slots["default"]?.());
	}
});
var I18nProvider_default = I18nProvider;

//#endregion
//#region src/providers/OrganizationProvider.ts
const OrganizationProvider = defineComponent({
	name: "OrganizationProvider",
	props: {
		createOrganization: {
			default: void 0,
			type: Function
		},
		currentOrganization: {
			default: null,
			type: Object
		},
		getAllOrganizations: {
			default: void 0,
			type: Function
		},
		myOrganizations: {
			default: () => [],
			type: Array
		},
		onError: {
			default: void 0,
			type: Function
		},
		onOrganizationSwitch: {
			default: void 0,
			type: Function
		},
		revalidateMyOrganizations: {
			default: async () => [],
			type: Function
		}
	},
	setup(props, { slots }) {
		const isLoading = ref(false);
		const error = ref(null);
		const switchOrganization = async (organization) => {
			if (!props.onOrganizationSwitch) throw new ThunderIDRuntimeError$1("onOrganizationSwitch callback is required", "OrganizationProvider-SwitchError-001", "vue", "The onOrganizationSwitch callback must be provided to handle organization switching.");
			isLoading.value = true;
			error.value = null;
			try {
				await props.onOrganizationSwitch(organization);
			} catch (switchError) {
				const errorMessage = switchError instanceof Error ? switchError.message : "Failed to switch organization";
				error.value = errorMessage;
				if (props.onError) props.onError(errorMessage);
				throw switchError;
			} finally {
				isLoading.value = false;
			}
		};
		const getAllOrgs = async () => {
			if (props.getAllOrganizations) return props.getAllOrganizations();
			return { organizations: [] };
		};
		const currentOrganizationRef = computed(() => props.currentOrganization);
		const myOrganizationsRef = computed(() => props.myOrganizations);
		provide(ORGANIZATION_KEY, {
			createOrganization: props.createOrganization,
			currentOrganization: currentOrganizationRef,
			error: readonly(error),
			getAllOrganizations: getAllOrgs,
			isLoading: readonly(isLoading),
			myOrganizations: myOrganizationsRef,
			revalidateMyOrganizations: props.revalidateMyOrganizations,
			switchOrganization
		});
		return () => h("div", { style: "display:contents" }, slots["default"]?.());
	}
});
var OrganizationProvider_default = OrganizationProvider;

//#endregion
//#region src/providers/ThemeProvider.ts
const logger$5 = createVueLogger("ThemeProvider");
const ThemeProvider = defineComponent({
	name: "ThemeProvider",
	props: {
		detection: {
			default: () => ({}),
			type: Object
		},
		inheritFromBranding: {
			default: true,
			type: Boolean
		},
		mode: {
			default: DEFAULT_THEME,
			type: String
		},
		theme: {
			default: void 0,
			type: Object
		}
	},
	setup(props, { slots }) {
		const brandingContext = inject(BRANDING_KEY, null);
		const initColorScheme = () => {
			if (props.mode === "light" || props.mode === "dark") return props.mode;
			if (props.mode === "branding") return detectThemeMode$1("system", props.detection);
			return detectThemeMode$1(props.mode, props.detection);
		};
		const colorScheme = ref(initColorScheme());
		watch(() => brandingContext?.activeTheme.value, (brandingActiveTheme) => {
			if (!props.inheritFromBranding || !brandingActiveTheme) return;
			if (props.mode === "branding") colorScheme.value = brandingActiveTheme;
			else if (props.mode === "system" && !brandingContext?.isLoading.value) colorScheme.value = brandingActiveTheme;
		});
		if (props.inheritFromBranding && !brandingContext) logger$5.warn("ThemeProvider: inheritFromBranding is enabled but BrandingProvider is not available. Make sure to wrap your app with BrandingProvider or ThunderIDProvider.");
		const finalThemeConfig = computed(() => {
			const themeConfig = props.theme;
			const brandingTheme = props.inheritFromBranding ? brandingContext?.theme.value : null;
			if (!brandingTheme) return themeConfig;
			const brandingThemeConfig = {
				borderRadius: brandingTheme.borderRadius,
				colors: brandingTheme.colors,
				components: brandingTheme.components,
				images: brandingTheme.images,
				shadows: brandingTheme.shadows,
				spacing: brandingTheme.spacing
			};
			return {
				...brandingThemeConfig,
				...themeConfig,
				borderRadius: {
					...brandingThemeConfig.borderRadius,
					...themeConfig?.borderRadius
				},
				colors: {
					...brandingThemeConfig.colors,
					...themeConfig?.colors
				},
				components: {
					...brandingThemeConfig.components,
					...themeConfig?.components
				},
				images: {
					...brandingThemeConfig.images,
					...themeConfig?.images
				},
				shadows: {
					...brandingThemeConfig.shadows,
					...themeConfig?.shadows
				},
				spacing: {
					...brandingThemeConfig.spacing,
					...themeConfig?.spacing
				}
			};
		});
		const resolvedTheme = computed(() => createTheme(finalThemeConfig.value, colorScheme.value === "dark"));
		const direction = computed(() => finalThemeConfig.value?.direction || "ltr");
		const toggleTheme = () => {
			colorScheme.value = colorScheme.value === "light" ? "dark" : "light";
		};
		const applyToDom = (theme) => {
			if (typeof document === "undefined") return;
			const root = document.documentElement;
			Object.entries(theme.cssVariables).forEach(([key, value]) => {
				root.style.setProperty(key, value);
			});
		};
		watch(resolvedTheme, (theme) => applyToDom(theme), { immediate: true });
		watch(direction, (dir) => {
			if (typeof document !== "undefined") document.documentElement.dir = dir;
		}, { immediate: true });
		let classObserver = null;
		let mediaQuery = null;
		const handleThemeChange = (isDark) => {
			colorScheme.value = isDark ? "dark" : "light";
		};
		onMounted(() => {
			if (props.mode === "branding") return;
			if (props.mode === "class") {
				const targetElement = props.detection.targetElement || document.documentElement;
				if (targetElement) classObserver = createClassObserver$1(targetElement, handleThemeChange, props.detection);
			} else if (props.mode === "system") {
				if (!props.inheritFromBranding || !brandingContext?.activeTheme.value) mediaQuery = createMediaQueryListener$1(handleThemeChange);
			}
		});
		onBeforeUnmount(() => {
			if (classObserver) classObserver.disconnect();
			if (mediaQuery?.removeEventListener) mediaQuery.removeEventListener("change", handleThemeChange);
		});
		provide(THEME_KEY, {
			brandingError: brandingContext?.error ?? readonly(ref(null)),
			colorScheme: readonly(colorScheme),
			direction: readonly(direction),
			inheritFromBranding: props.inheritFromBranding,
			isBrandingLoading: brandingContext?.isLoading ?? readonly(ref(false)),
			theme: shallowReadonly(resolvedTheme),
			toggleTheme
		});
		return () => h("div", { style: "display:contents" }, slots["default"]?.());
	}
});
var ThemeProvider_default = ThemeProvider;

//#endregion
//#region src/providers/UserProvider.ts
const UserProvider = defineComponent({
	name: "UserProvider",
	props: {
		onUpdateProfile: {
			default: void 0,
			type: Function
		},
		profile: {
			default: null,
			type: Object
		},
		revalidateProfile: {
			default: async () => {},
			type: Function
		},
		updateProfile: {
			default: void 0,
			type: Function
		}
	},
	setup(props, { slots }) {
		const profileRef = computed(() => props.profile);
		const flattenedProfileRef = computed(() => props.profile?.flattenedProfile ?? null);
		const schemasRef = computed(() => props.profile?.schemas ?? null);
		provide(USER_KEY, {
			flattenedProfile: flattenedProfileRef,
			onUpdateProfile: props.onUpdateProfile ?? (() => {}),
			profile: profileRef,
			revalidateProfile: props.revalidateProfile,
			schemas: schemasRef,
			updateProfile: props.updateProfile ?? (async () => ({
				data: { user: {} },
				error: "updateProfile callback not provided",
				success: false
			}))
		});
		return () => h("div", { style: "display:contents" }, slots["default"]?.());
	}
});
var UserProvider_default = UserProvider;

//#endregion
//#region src/api/getAllOrganizations.ts
const getAllOrganizations$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await FetchHttpClient.getInstance(instanceId).request({
			headers: config.headers,
			method: config.method || "GET",
			url
		});
		return {
			json: () => Promise.resolve(response.data),
			ok: response.status >= 200 && response.status < 300,
			status: response.status,
			statusText: response.statusText || "",
			text: () => Promise.resolve(typeof response.data === "string" ? response.data : JSON.stringify(response.data))
		};
	};
	return getAllOrganizations({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getAllOrganizations_default = getAllOrganizations$1;

//#endregion
//#region src/api/getMeOrganizations.ts
const getMeOrganizations$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await FetchHttpClient.getInstance(instanceId).request({
			headers: config.headers,
			method: config.method || "GET",
			url
		});
		return {
			json: () => Promise.resolve(response.data),
			ok: response.status >= 200 && response.status < 300,
			status: response.status,
			statusText: response.statusText || "",
			text: () => Promise.resolve(typeof response.data === "string" ? response.data : JSON.stringify(response.data))
		};
	};
	return getMeOrganizations({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getMeOrganizations_default = getMeOrganizations$1;

//#endregion
//#region src/api/getSchemas.ts
const getSchemas$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await FetchHttpClient.getInstance(instanceId).request({
			headers: config.headers,
			method: config.method || "GET",
			url
		});
		return {
			json: () => Promise.resolve(response.data),
			ok: response.status >= 200 && response.status < 300,
			status: response.status,
			statusText: response.statusText || "",
			text: () => Promise.resolve(typeof response.data === "string" ? response.data : JSON.stringify(response.data))
		};
	};
	return getSchemas({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getSchemas_default = getSchemas$1;

//#endregion
//#region src/api/getScim2Me.ts
const getScim2Me$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await FetchHttpClient.getInstance(instanceId).request({
			headers: config.headers,
			method: config.method || "GET",
			url
		});
		return {
			json: () => Promise.resolve(response.data),
			ok: response.status >= 200 && response.status < 300,
			status: response.status,
			statusText: response.statusText || "",
			text: () => Promise.resolve(typeof response.data === "string" ? response.data : JSON.stringify(response.data))
		};
	};
	return getScim2Me({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getScim2Me_default = getScim2Me$1;

//#endregion
//#region src/ThunderIDVueClient.ts
/**
* Client for implementing ThunderID in Vue applications.
* This class provides the core functionality for managing user authentication and sessions.
*
* @typeParam T - Configuration type that extends ThunderIDVueConfig.
*/
var ThunderIDVueClient = class extends ThunderIDBrowserClient {
	loadingState = false;
	constructor(instanceId = 0) {
		super(instanceId);
	}
	setLoading(loading) {
		this.loadingState = loading;
	}
	async withLoading(operation) {
		this.setLoading(true);
		try {
			return await operation();
		} finally {
			this.setLoading(false);
		}
	}
	initialize(config) {
		let resolvedOrganizationHandle = config?.organizationHandle;
		if (!resolvedOrganizationHandle) resolvedOrganizationHandle = deriveOrganizationHandleFromBaseUrl(config?.baseUrl);
		return this.withLoading(async () => super.initialize({
			...config,
			organizationHandle: resolvedOrganizationHandle
		}));
	}
	reInitialize(config) {
		return this.withLoading(async () => {
			let isInitialized;
			try {
				await super.reInitialize(config);
				isInitialized = true;
			} catch (error) {
				throw new ThunderIDRuntimeError$1(`Failed to check if the client is initialized: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDVueClient-reInitialize-RuntimeError-001", "vue", "An error occurred while checking the initialization status of the client.");
			}
			return isInitialized;
		});
	}
	async updateUserProfile() {
		throw new Error("Not implemented");
	}
	async getUser(options) {
		try {
			let baseUrl = options?.baseUrl;
			if (!baseUrl) baseUrl = this.getStorageManager().getConfigData()?.baseUrl;
			return generateUserProfile(await getScim2Me_default({ baseUrl }), flattenUserSchema(await getSchemas_default({ baseUrl })));
		} catch (error) {
			return extractUserClaimsFromIdToken(await this.getDecodedIdToken());
		}
	}
	async getDecodedIdToken(sessionId) {
		return await super.getDecodedIdToken(sessionId);
	}
	async getIdToken() {
		return this.withLoading(async () => super.getIdToken());
	}
	async getUserProfile(options) {
		return this.withLoading(async () => {
			try {
				let baseUrl = options?.baseUrl;
				if (!baseUrl) baseUrl = this.getStorageManager().getConfigData()?.baseUrl;
				const profile = await getScim2Me_default({
					baseUrl,
					instanceId: this.getInstanceId()
				});
				const processedSchemas = flattenUserSchema(await getSchemas_default({
					baseUrl,
					instanceId: this.getInstanceId()
				}));
				return {
					flattenedProfile: generateFlattenedUserProfile(profile, processedSchemas),
					profile,
					schemas: processedSchemas
				};
			} catch (error) {
				return {
					flattenedProfile: extractUserClaimsFromIdToken(await this.getDecodedIdToken()),
					profile: extractUserClaimsFromIdToken(await this.getDecodedIdToken()),
					schemas: []
				};
			}
		});
	}
	async getMyOrganizations(options) {
		try {
			let baseUrl = options?.baseUrl;
			if (!baseUrl) baseUrl = this.getStorageManager().getConfigData()?.baseUrl;
			return await getMeOrganizations_default({
				baseUrl,
				instanceId: this.getInstanceId()
			});
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Failed to fetch the user's associated organizations: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDVueClient-getMyOrganizations-RuntimeError-001", "vue", "An error occurred while fetching associated organizations of the signed-in user.");
		}
	}
	async getAllOrganizations(options) {
		try {
			let baseUrl = options?.baseUrl;
			if (!baseUrl) baseUrl = this.getStorageManager().getConfigData()?.baseUrl;
			return await getAllOrganizations_default({
				baseUrl,
				instanceId: this.getInstanceId()
			});
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Failed to fetch all organizations: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDVueClient-getAllOrganizations-RuntimeError-001", "vue", "An error occurred while fetching all the organizations associated with the user.");
		}
	}
	async getCurrentOrganization() {
		try {
			return await this.withLoading(async () => {
				const idToken = await this.getDecodedIdToken();
				return {
					id: idToken?.org_id ?? "",
					name: idToken?.org_name ?? "",
					orgHandle: idToken?.org_handle ?? ""
				};
			});
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Failed to fetch the current organization: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDVueClient-getCurrentOrganization-RuntimeError-001", "vue", "An error occurred while fetching the current organization of the signed-in user.");
		}
	}
	async switchOrganization(organization) {
		return this.withLoading(async () => {
			try {
				const sourceInstanceId = this.getStorageManager().getConfigData()?.organizationChain?.sourceInstanceId;
				if (!organization.id) throw new ThunderIDRuntimeError$1("Organization ID is required for switching organizations", "vue-ThunderIDVueClient-SwitchOrganizationError-001", "vue", "The organization object must contain a valid ID to perform the organization switch.");
				const exchangeConfig = {
					attachToken: false,
					data: {
						client_id: "{{clientId}}",
						grant_type: "organization_switch",
						scope: "{{scopes}}",
						switching_organization: organization.id,
						token: "{{accessToken}}"
					},
					id: "organization-switch",
					returnsSession: true,
					signInRequired: sourceInstanceId === void 0
				};
				return await super.exchangeToken(exchangeConfig);
			} catch (error) {
				throw new ThunderIDRuntimeError$1(`Failed to switch organization: ${error.message || error}`, "vue-ThunderIDVueClient-SwitchOrganizationError-003", "vue", "An error occurred while switching to the specified organization. Please try again.");
			}
		});
	}
	isLoading() {
		return this.loadingState || super.isLoading();
	}
	async isInitialized() {
		return super.isInitialized();
	}
	async isSignedIn() {
		return await super.isSignedIn();
	}
	async exchangeToken(config) {
		return this.withLoading(async () => await super.exchangeToken(config));
	}
	async signIn(...args) {
		return this.withLoading(async () => {
			const arg1 = args[0];
			const arg2 = args[1];
			if (typeof arg1 === "object" && arg1 !== null && arg1.callOnlyOnRedirect === true) return;
			if (typeof arg1 === "object" && arg1 !== null && !isEmpty(arg1) && ("executionId" in arg1 || "applicationId" in arg1)) {
				const configData = this.getStorageManager().getConfigData();
				const authIdFromUrl = new URL(window.location.href).searchParams.get("authId");
				const authIdFromStorage = sessionStorage.getItem("thunderid_auth_id");
				const authId = authIdFromUrl || authIdFromStorage || "";
				const baseUrlFromStorage = sessionStorage.getItem("thunderid_base_url");
				const response = await executeEmbeddedSignInFlowV2({
					authId,
					baseUrl: configData?.baseUrl || baseUrlFromStorage || "",
					payload: arg1,
					url: arg2?.url
				});
				if (response && typeof response === "object" && response.flowStatus === EmbeddedSignInFlowStatusV2.Complete && response.assertion) {
					const decodedAssertion = await this.decodeJwtToken(response.assertion);
					const createdAt = decodedAssertion.iat ? decodedAssertion.iat * 1e3 : Date.now();
					const expiresIn = decodedAssertion.exp && decodedAssertion.iat ? decodedAssertion.exp - decodedAssertion.iat : 3600;
					await this.setSession({
						access_token: response.assertion,
						created_at: createdAt,
						expires_in: expiresIn,
						id_token: response.assertion,
						scope: decodedAssertion.scope,
						token_type: "Bearer"
					});
					this.notifySignIn(extractUserClaimsFromIdToken(decodedAssertion));
				}
				return response;
			}
			return await super.signIn(arg1);
		});
	}
	async signInSilently(options) {
		return await super.signInSilently(options);
	}
	async signUp(...args) {
		const configData = this.getStorageManager().getConfigData();
		const firstArg = args[0];
		const baseUrl = configData?.baseUrl;
		const authIdFromUrl = new URL(window.location.href).searchParams.get("authId");
		const authIdFromStorage = sessionStorage.getItem("thunderid_auth_id");
		const authId = authIdFromUrl || authIdFromStorage || "";
		if (authIdFromUrl && !authIdFromStorage) sessionStorage.setItem("thunderid_auth_id", authIdFromUrl);
		return executeEmbeddedSignUpFlowV2({
			authId,
			baseUrl,
			payload: typeof firstArg === "object" && "flowType" in firstArg ? {
				...firstArg,
				verbose: true
			} : firstArg
		});
	}
	async request(requestConfig) {
		return await this.httpRequest(requestConfig);
	}
	async requestAll(requestConfigs) {
		return await this.httpRequestAll(requestConfigs);
	}
	async getAccessToken(sessionId) {
		return super.getAccessToken(sessionId);
	}
	clearSession(sessionId) {
		super.clearSession(sessionId);
	}
	async setSession(sessionData, sessionId) {
		return this.getStorageManager().setSessionData(sessionData, sessionId);
	}
	decodeJwtToken(token) {
		return super.decodeJwtToken(token);
	}
	getStorageManager() {
		return super.getStorageManager();
	}
};
var ThunderIDVueClient_default = ThunderIDVueClient;

//#endregion
//#region src/providers/ThunderIDProvider.ts
/**
* Checks if the current URL contains authentication parameters.
*/
function hasAuthParams(url, afterSignInUrl) {
	return hasAuthParamsInUrl$1() && !!afterSignInUrl && new URL(url.origin + url.pathname).toString() === new URL(afterSignInUrl).toString() || url.searchParams.get("error") !== null;
}
/**
* Root provider component for the ThunderID Vue SDK.
*
* This component initializes the client, manages authentication state,
* and provides the ThunderID context to child components via Vue's provide/inject.
*
* @example
* ```vue
* <template>
*   <ThunderIDProvider v-bind="config">
*     <router-view />
*   </ThunderIDProvider>
* </template>
* ```
*/
const ThunderIDProvider = defineComponent({
	name: "ThunderIDProvider",
	props: {
		afterSignInUrl: {
			default: void 0,
			type: String
		},
		afterSignOutUrl: {
			default: void 0,
			type: String
		},
		applicationId: {
			default: void 0,
			type: String
		},
		baseUrl: {
			required: true,
			type: String
		},
		clientId: {
			required: true,
			type: String
		},
		instanceId: {
			default: 0,
			type: Number
		},
		organizationChain: {
			default: void 0,
			type: Object
		},
		organizationHandle: {
			default: void 0,
			type: String
		},
		platform: {
			default: void 0,
			type: String
		},
		scopes: {
			default: void 0,
			type: Array
		},
		signInOptions: {
			default: void 0,
			type: Object
		},
		signInUrl: {
			default: void 0,
			type: String
		},
		signUpUrl: {
			default: void 0,
			type: String
		},
		storage: {
			default: void 0,
			type: String
		},
		syncSession: {
			default: void 0,
			type: Boolean
		}
	},
	setup(props, { slots }) {
		const client = new ThunderIDVueClient_default(props.instanceId);
		const isSignedIn = ref(false);
		const isInitialized = ref(false);
		const isLoading = ref(true);
		const user = shallowRef(null);
		const currentOrganization = shallowRef(null);
		const myOrganizations = shallowRef([]);
		const userProfile = shallowRef(null);
		const resolvedBaseUrl = ref(props.baseUrl);
		let isUpdatingSession = false;
		let signInCheckInterval;
		let loadingCheckInterval;
		function buildConfig() {
			return {
				afterSignInUrl: props.afterSignInUrl,
				afterSignOutUrl: props.afterSignOutUrl,
				applicationId: props.applicationId,
				baseUrl: props.baseUrl,
				clientId: props.clientId,
				organizationChain: props.organizationChain,
				organizationHandle: props.organizationHandle,
				scopes: props.scopes,
				signInOptions: props.signInOptions,
				signInUrl: props.signInUrl,
				signUpUrl: props.signUpUrl,
				storage: props.storage,
				syncSession: props.syncSession
			};
		}
		async function updateSession() {
			try {
				isUpdatingSession = true;
				isLoading.value = true;
				let baseUrl = resolvedBaseUrl.value;
				const decodedToken = await client.getDecodedIdToken();
				if (decodedToken?.["user_org"]) {
					baseUrl = `${(await client.getConfiguration()).baseUrl}/o`;
					resolvedBaseUrl.value = baseUrl;
				}
				const claims = extractUserClaimsFromIdToken(decodedToken);
				user.value = claims;
				userProfile.value = {
					flattenedProfile: claims,
					profile: claims,
					schemas: []
				};
				isSignedIn.value = await client.isSignedIn();
			} catch {} finally {
				isUpdatingSession = false;
				isLoading.value = client.isLoading();
			}
		}
		async function signIn(...args) {
			const arg1 = args[0];
			const isV2FlowRequest = typeof arg1 === "object" && arg1 !== null && ("executionId" in arg1 || "applicationId" in arg1);
			try {
				if (!isV2FlowRequest) {
					isUpdatingSession = true;
					isLoading.value = true;
				}
				return await client.signIn(...args);
			} catch (error) {
				throw new ThunderIDRuntimeError$1(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signIn-Error", "vue", "An error occurred while trying to sign in.");
			} finally {
				if (!isV2FlowRequest) {
					isUpdatingSession = false;
					isLoading.value = client.isLoading();
				}
			}
		}
		async function signOut(...args) {
			return client.signOut(...args);
		}
		async function signUp(...args) {
			return client.signUp(...args);
		}
		async function signInSilently(options) {
			try {
				isUpdatingSession = true;
				isLoading.value = true;
				return await client.signInSilently(options);
			} catch (error) {
				throw new ThunderIDRuntimeError$1(`Error while signing in silently: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signInSilently-Error", "vue", "An error occurred while trying to sign in silently.");
			} finally {
				isUpdatingSession = false;
				isLoading.value = client.isLoading();
			}
		}
		async function switchOrganization(organization) {
			try {
				isUpdatingSession = true;
				isLoading.value = true;
				const response = await client.switchOrganization(organization);
				if (await client.isSignedIn()) await updateSession();
				return response;
			} catch (error) {
				throw new ThunderIDRuntimeError$1(`Failed to switch organization: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-switchOrganization-Error", "vue", "An error occurred while switching to the specified organization.");
			} finally {
				isUpdatingSession = false;
				isLoading.value = client.isLoading();
			}
		}
		provide(THUNDERID_KEY, {
			afterSignInUrl: props.afterSignInUrl,
			applicationId: props.applicationId,
			baseUrl: props.baseUrl,
			clearSession: async (...args) => {
				await client.clearSession(...args);
			},
			clientId: props.clientId,
			exchangeToken: (config) => client.exchangeToken(config),
			getAccessToken: () => client.getAccessToken(),
			getDecodedIdToken: () => client.getDecodedIdToken(),
			getIdToken: () => client.getIdToken(),
			http: {
				request: (requestConfig) => client.request(requestConfig),
				requestAll: (requestConfigs) => client.requestAll(requestConfigs)
			},
			instanceId: props.instanceId,
			isInitialized,
			isLoading,
			isSignedIn,
			organization: currentOrganization,
			organizationHandle: props.organizationHandle,
			platform: Platform.ThunderID,
			reInitialize: async (config) => {
				const result = await client.reInitialize(config);
				return typeof result === "boolean" ? result : true;
			},
			signIn,
			signInOptions: props.signInOptions,
			signInSilently,
			signInUrl: props.signInUrl,
			signOut,
			signUp,
			signUpUrl: props.signUpUrl,
			storage: props.storage,
			switchOrganization,
			user
		});
		onMounted(async () => {
			const config = buildConfig();
			await client.initialize(config);
			const initializedConfig = client.getConfiguration();
			if (initializedConfig?.baseUrl) sessionStorage.setItem("thunderid_base_url", initializedConfig.baseUrl);
			try {
				isInitialized.value = await client.isInitialized();
			} catch {
				isInitialized.value = false;
			}
			await client.on("sign-in", async () => {
				await updateSession();
			});
			if (await client.isSignedIn()) await updateSession();
			else {
				const currentUrl = new URL(window.location.href);
				if (hasAuthParams(currentUrl, initializedConfig?.afterSignInUrl) && hasCalledForThisInstanceInUrl(props.instanceId ?? 0, currentUrl.search)) try {
					const urlParams = currentUrl.searchParams;
					const code = urlParams.get("code");
					const executionIdFromUrl = urlParams.get("executionId");
					const storedExecutionId = sessionStorage.getItem("thunderid_execution_id");
					if (code && !executionIdFromUrl && !storedExecutionId) await signIn();
				} catch (error) {
					throw new ThunderIDRuntimeError$1(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signIn-Error", "vue", "An error occurred while trying to sign in.");
				}
			}
			try {
				const status = await client.isSignedIn();
				isSignedIn.value = status;
				if (!status) signInCheckInterval = setInterval(async () => {
					if (await client.isSignedIn()) {
						isSignedIn.value = true;
						if (signInCheckInterval) {
							clearInterval(signInCheckInterval);
							signInCheckInterval = void 0;
						}
					}
				}, 1e3);
			} catch {
				isSignedIn.value = false;
			}
			loadingCheckInterval = setInterval(() => {
				if (isUpdatingSession) return;
				const currentUrl = new URL(window.location.href);
				if (!isSignedIn.value && hasAuthParams(currentUrl, initializedConfig?.afterSignInUrl)) return;
				isLoading.value = client.isLoading();
			}, 100);
		});
		onUnmounted(() => {
			if (signInCheckInterval) clearInterval(signInCheckInterval);
			if (loadingCheckInterval) clearInterval(loadingCheckInterval);
		});
		return () => h(I18nProvider_default, null, { default: () => h(FlowMetaProvider_default, { enabled: true }, { default: () => h(BrandingProvider_default, null, { default: () => h(ThemeProvider_default, null, { default: () => h(FlowProvider_default, null, { default: () => h(UserProvider_default, {
			onUpdateProfile: (updatedUser) => {
				user.value = updatedUser;
				userProfile.value = {
					flattenedProfile: generateFlattenedUserProfile(updatedUser, userProfile.value?.schemas ?? []),
					profile: updatedUser,
					schemas: userProfile.value?.schemas ?? []
				};
			},
			profile: userProfile.value,
			revalidateProfile: async () => {
				try {
					const claims = extractUserClaimsFromIdToken(await client.getDecodedIdToken());
					user.value = claims;
					userProfile.value = {
						flattenedProfile: claims,
						profile: claims,
						schemas: []
					};
				} catch {}
			}
		}, { default: () => h(OrganizationProvider_default, {
			currentOrganization: currentOrganization.value,
			getAllOrganizations: async () => client.getAllOrganizations({ baseUrl: resolvedBaseUrl.value }),
			myOrganizations: myOrganizations.value,
			onOrganizationSwitch: switchOrganization,
			revalidateMyOrganizations: async () => {
				const baseUrl = resolvedBaseUrl.value;
				try {
					const orgs = await client.getMyOrganizations({ baseUrl });
					myOrganizations.value = orgs || [];
					return orgs || [];
				} catch {
					return [];
				}
			}
		}, { default: () => slots["default"]?.() }) }) }) }) }) }) });
	}
});
var ThunderIDProvider_default = ThunderIDProvider;

//#endregion
//#region src/styles/animations.css.ts
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
* Shared CSS keyframe animations used by multiple primitive components.
*
* `thunder-spin`          - used by Spinner (__svg) and Button (__spinner)
* `thunder-spinner-dash`  - used by Spinner (__circle)
*
* Defined once here rather than in each component's CSS file to avoid
* duplicate `@keyframes` blocks in the injected stylesheet.
*/
const ANIMATIONS_CSS = `
/* ============================================================
   ThunderID Vue SDK – shared keyframe animations
   ============================================================ */

@keyframes thunder-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes thunder-spinner-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
`;
var animations_css_default = ANIMATIONS_CSS;

//#endregion
//#region src/styles/defaults.css.ts
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
* Default CSS custom property fallback values.
*
* These are written into a `:root` rule so that every ThunderID Vue primitive
* renders correctly even when no ThemeProvider is mounted. When ThemeProvider
* IS present it calls `document.documentElement.style.setProperty(...)` which
* has higher specificity than a stylesheet `:root` rule and therefore wins
* automatically — no special cascade tricks required.
*
* Design token naming follows the pattern:
*   --thunder-{category}-{sub}-{scale?}
*/
const DEFAULTS_CSS = `
/* ============================================================
   ThunderID Vue SDK – CSS variable defaults
   (ThemeProvider overrides these at runtime via inline styles)
   ============================================================ */
:root {
  /* --- Colors: Primary --- */
  --thunder-color-primary-main: #4b6ef5;
  --thunder-color-primary-light: #eef1fe;
  --thunder-color-primary-dark: #3451d1;
  --thunder-color-primary-contrastText: #ffffff;

  /* --- Colors: Secondary --- */
  --thunder-color-secondary-main: #4b5563;
  --thunder-color-secondary-light: #f3f4f6;
  --thunder-color-secondary-contrastText: #ffffff;

  /* --- Colors: Background --- */
  --thunder-color-background-surface: #ffffff;
  --thunder-color-background-body: #f9fafb;
  --thunder-color-background-disabled: #f3f4f6;
  --thunder-color-background-muted: #f1f3f5;

  /* --- Colors: Text --- */
  --thunder-color-text-primary: #111827;
  --thunder-color-text-secondary: #6b7280;

  /* --- Colors: Border --- */
  --thunder-color-border: #e5e7eb;
  --thunder-color-border-focus: var(--thunder-color-primary-main);

  /* --- Colors: Action states --- */
  --thunder-color-action-hover: rgba(0, 0, 0, 0.04);
  --thunder-color-action-selected: rgba(75, 110, 245, 0.08);
  --thunder-color-action-focus: rgba(75, 110, 245, 0.12);
  --thunder-color-action-disabled: rgba(0, 0, 0, 0.26);
  --thunder-color-action-disabledBackground: rgba(0, 0, 0, 0.08);

  /* --- Colors: Semantic --- */
  --thunder-color-error-main: #ef4444;
  --thunder-color-error-light: #fef2f2;
  --thunder-color-error-contrastText: #991b1b;
  --thunder-color-success-main: #22c55e;
  --thunder-color-success-light: #f0fdf4;
  --thunder-color-success-contrastText: #166534;
  --thunder-color-warning-main: #f59e0b;
  --thunder-color-warning-light: #fffbeb;
  --thunder-color-warning-contrastText: #92400e;
  --thunder-color-info-main: #3b82f6;
  --thunder-color-info-light: #eff6ff;
  --thunder-color-info-contrastText: #1e40af;

  /* --- Spacing --- */
  --thunder-spacing-unit: 8px;

  /* --- Border Radius --- */
  --thunder-border-radius-xs: 4px;
  --thunder-border-radius-small: 6px;
  --thunder-border-radius-medium: 10px;
  --thunder-border-radius-large: 14px;
  --thunder-border-radius-full: 9999px;

  /* --- Shadows --- */
  --thunder-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --thunder-shadow-small: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --thunder-shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05);
  --thunder-shadow-large: 0 10px 25px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05);

  /* --- Transitions --- */
  --thunder-transition-fast: 120ms ease;
  --thunder-transition-normal: 180ms ease;
  --thunder-transition-slow: 280ms ease;

  /* --- Focus Ring --- */
  --thunder-focus-ring-width: 2px;
  --thunder-focus-ring-offset: 2px;
  --thunder-focus-ring-color: rgba(75, 110, 245, 0.35);

  /* --- Typography: Font Family --- */
  --thunder-typography-fontFamily: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  /* --- Typography: Font Sizes --- */
  --thunder-typography-fontSize-xs: 0.6875rem;  /* 11px */
  --thunder-typography-fontSize-sm: 0.8125rem;  /* 13px */
  --thunder-typography-fontSize-md: 0.875rem;   /* 14px */
  --thunder-typography-fontSize-lg: 1rem;       /* 16px */
  --thunder-typography-fontSize-xl: 1.125rem;   /* 18px */
  --thunder-typography-fontSize-2xl: 1.375rem;  /* 22px */
  --thunder-typography-fontSize-3xl: 1.75rem;   /* 28px */

  /* --- Typography: Font Weights --- */
  --thunder-typography-fontWeight-normal: 400;
  --thunder-typography-fontWeight-medium: 500;
  --thunder-typography-fontWeight-semibold: 600;
  --thunder-typography-fontWeight-bold: 700;

  /* --- Typography: Line Heights --- */
  --thunder-typography-lineHeight-tight: 1.25;
  --thunder-typography-lineHeight-normal: 1.5;
  --thunder-typography-lineHeight-relaxed: 1.625;

  /* --- Typography: Letter Spacing --- */
  --thunder-typography-letterSpacing-tight: -0.01em;
  --thunder-typography-letterSpacing-normal: 0;
  --thunder-typography-letterSpacing-wide: 0.025em;

  /* --- Component: Button --- */
  --thunder-button-borderRadius: var(--thunder-border-radius-small);
  --thunder-button-fontWeight: var(--thunder-typography-fontWeight-medium);
  --thunder-button-sm-height: 30px;
  --thunder-button-sm-paddingX: calc(var(--thunder-spacing-unit) * 1.25);
  --thunder-button-sm-fontSize: var(--thunder-typography-fontSize-sm);
  --thunder-button-md-height: 36px;
  --thunder-button-md-paddingX: calc(var(--thunder-spacing-unit) * 2);
  --thunder-button-md-fontSize: var(--thunder-typography-fontSize-md);
  --thunder-button-lg-height: 42px;
  --thunder-button-lg-paddingX: calc(var(--thunder-spacing-unit) * 2.5);
  --thunder-button-lg-fontSize: var(--thunder-typography-fontSize-lg);

  /* --- Component: Input fields --- */
  --thunder-input-borderRadius: var(--thunder-border-radius-small);
  --thunder-input-height: 36px;
  --thunder-input-paddingX: calc(var(--thunder-spacing-unit) * 1.25);
  --thunder-input-fontSize: var(--thunder-typography-fontSize-md);
  --thunder-input-borderColor: var(--thunder-color-border);
  --thunder-input-focusBorderColor: var(--thunder-color-primary-main);
  --thunder-input-focusRing: 0 0 0 3px var(--thunder-focus-ring-color);

  /* --- Component: Card --- */
  --thunder-card-borderRadius: var(--thunder-border-radius-medium);
  --thunder-card-padding: calc(var(--thunder-spacing-unit) * 2.5);
  --thunder-card-shadow: var(--thunder-shadow-small);
  --thunder-card-borderColor: var(--thunder-color-border);

  /* --- Component: Alert --- */
  --thunder-alert-borderRadius: var(--thunder-border-radius-small);
  --thunder-alert-paddingX: calc(var(--thunder-spacing-unit) * 1.5);
  --thunder-alert-paddingY: calc(var(--thunder-spacing-unit) * 1.25);

  /* --- Component: Checkbox --- */
  --thunder-checkbox-size: 16px;

  /* --- Component: Avatar --- */
  --thunder-avatar-size: 64px;
  --thunder-avatar-fontSize: 1.375rem;

  /* --- Component: Dropdown --- */
  --thunder-dropdown-borderRadius: var(--thunder-border-radius-medium);
  --thunder-dropdown-shadow: var(--thunder-shadow-medium);
  --thunder-dropdown-itemPaddingX: calc(var(--thunder-spacing-unit) * 1.5);
  --thunder-dropdown-itemPaddingY: calc(var(--thunder-spacing-unit) * 1);

  /* --- Component overrides (set by ThemeProvider when configured) --- */
  --thunder-component-button-root-borderRadius: var(--thunder-button-borderRadius);
  --thunder-component-field-root-borderRadius: var(--thunder-input-borderRadius);
}
`;
var defaults_css_default = DEFAULTS_CSS;

//#endregion
//#region src/components/presentation/create-organization/CreateOrganization.css.ts
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
* Styles for the CreateOrganization presentation component.
*
* BEM block: `.thunderid-create-organization`
*
* The root element is a Card, whose padding is intentionally kept
* as this is a full form panel.
*
* Elements:
*   __title        – form heading (Typography h6)
*   __description  – optional sub-heading (Typography body2)
*   __error        – error Alert
*   __input        – the org-name TextField
*   __submit       – the submit Button
*/
const CREATE_ORGANIZATION_CSS = `
/* ============================================================
   CreateOrganization
   ============================================================ */

.thunderid-create-organization {
  display: flex;
  flex-direction: column;
  gap: calc(var(--thunder-spacing-unit) * 1.75);
  max-width: 440px;
  width: 100%;
}

/* Title & description --------------------------------------- */

.thunderid-create-organization__description {
  margin-top: calc(var(--thunder-spacing-unit) * -0.75);
  color: var(--thunder-color-text-secondary);
}

/* Input ----------------------------------------------------- */

.thunderid-create-organization__input {
  width: 100%;
}

/* Submit ---------------------------------------------------- */

.thunderid-create-organization__submit {
  align-self: flex-start;
}
`;
var CreateOrganization_css_default = CREATE_ORGANIZATION_CSS;

//#endregion
//#region src/components/presentation/language-switcher/LanguageSwitcher.css.ts
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
* Styles for the LanguageSwitcher presentation component.
*
* BEM block: `.thunderid-language-switcher`
*
* The root element is a Card (`.thunderid-card`). We override its default
* padding to 0 so the trigger button fills the surface edge-to-edge,
* and apply `position: relative` to anchor the absolute dropdown.
* The Card's border-radius and shadow are intentionally kept.
*
* Elements:
*   __trigger        – compact trigger button (globe icon + language label + chevron)
*   __trigger-label  – the current language name Typography inside the trigger
*   __dropdown       – absolute-positioned dropdown listbox
*   __item           – each selectable language row
*   __item--active   – the currently selected language
*/
const LANGUAGE_SWITCHER_CSS = `
/* ============================================================
   LanguageSwitcher
   ============================================================ */

/* Override Card's default padding so the trigger fills the surface */
.thunderid-language-switcher.thunderid-card {
  padding: 0;
  position: relative;
  display: inline-block;
}

/* Trigger ---------------------------------------------------- */

.thunderid-language-switcher__trigger {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 0.5);
  padding: var(--thunder-dropdown-itemPaddingY) var(--thunder-dropdown-itemPaddingX);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--thunder-color-text-primary);
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-typography-fontSize-md);
  border-radius: var(--thunder-dropdown-borderRadius);
  transition: background-color var(--thunder-transition-fast);
  white-space: nowrap;
  box-sizing: border-box;
}

.thunderid-language-switcher__trigger:hover {
  background-color: var(--thunder-color-action-hover);
}

.thunderid-language-switcher__trigger:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);
  border-radius: var(--thunder-dropdown-borderRadius);
}

.thunderid-language-switcher__trigger-label {
  flex: 0 0 auto;
}

/* Dropdown --------------------------------------------------- */

.thunderid-language-switcher__dropdown {
  position: absolute;
  top: calc(100% + calc(var(--thunder-spacing-unit) * 0.5));
  right: 0;
  z-index: 1000;
  background-color: var(--thunder-color-background-surface);
  border: 1px solid var(--thunder-color-border);
  border-radius: var(--thunder-dropdown-borderRadius);
  box-shadow: var(--thunder-dropdown-shadow);
  overflow: hidden;
  min-width: 130px;
  display: flex;
  flex-direction: column;
  padding: calc(var(--thunder-spacing-unit) * 0.5) 0;
}

/* Items ----------------------------------------------------- */

.thunderid-language-switcher__item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--thunder-dropdown-itemPaddingY) var(--thunder-dropdown-itemPaddingX);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-typography-fontSize-md);
  color: var(--thunder-color-text-primary);
  transition: background-color var(--thunder-transition-fast);
  box-sizing: border-box;
}

.thunderid-language-switcher__item:hover {
  background-color: var(--thunder-color-action-hover);
}

.thunderid-language-switcher__item--active {
  background-color: var(--thunder-color-action-selected);
  color: var(--thunder-color-primary-main);
  font-weight: var(--thunder-typography-fontWeight-medium);
}

.thunderid-language-switcher__item--active:hover {
  background-color: var(--thunder-color-action-focus);
}
`;
var LanguageSwitcher_css_default = LANGUAGE_SWITCHER_CSS;

//#endregion
//#region src/components/presentation/organization-list/OrganizationList.css.ts
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
* Styles for the OrganizationList presentation component.
*
* BEM block: `.thunderid-organization-list`
*
* The root element is a plain `div`. There is no Card wrapper here,
* so this file provides the full layout including border and spacing.
*
* Elements:
*   __loading  – loading state container (centred Spinner)
*   __empty    – empty state message (Typography body2)
*   __item     – each selectable organization row button
*/
const ORGANIZATION_LIST_CSS = `
/* ============================================================
   OrganizationList
   ============================================================ */

.thunderid-organization-list {
  display: flex;
  flex-direction: column;
  gap: calc(var(--thunder-spacing-unit) * 0.5);
  font-family: var(--thunder-typography-fontFamily);
}

/* Loading / Empty ------------------------------------------- */

.thunderid-organization-list__loading,
.thunderid-organization-list__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--thunder-spacing-unit) * 3);
  color: var(--thunder-color-text-secondary);
}

/* Items ----------------------------------------------------- */

.thunderid-organization-list__item {
  display: flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 1.25);
  width: 100%;
  padding: calc(var(--thunder-spacing-unit) * 1.25) calc(var(--thunder-spacing-unit) * 1.5);
  background: var(--thunder-color-background-surface);
  border: 1px solid var(--thunder-color-border);
  border-radius: var(--thunder-border-radius-small);
  cursor: pointer;
  text-align: left;
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-typography-fontSize-md);
  color: var(--thunder-color-text-primary);
  transition:
    background-color var(--thunder-transition-fast),
    border-color var(--thunder-transition-fast),
    box-shadow var(--thunder-transition-fast);
  box-sizing: border-box;
}

.thunderid-organization-list__item:hover {
  background-color: var(--thunder-color-primary-light);
  border-color: var(--thunder-color-primary-main);
}

.thunderid-organization-list__item:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);
}
`;
var OrganizationList_css_default = ORGANIZATION_LIST_CSS;

//#endregion
//#region src/components/presentation/organization-profile/OrganizationProfile.css.ts
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
* Styles for the OrganizationProfile presentation component.
*
* BEM block: `.thunderid-organization-profile`
*/
const ORGANIZATION_PROFILE_CSS = `
/* ============================================================
   OrganizationProfile
   ============================================================ */

.thunderid-organization-profile {
  display: flex;
  flex-direction: column;
  min-width: 320px;
  padding: 0;
  overflow: hidden;
}

/* Header: title + divider ------------------------------------ */

.thunderid-organization-profile__header {
  padding: calc(var(--thunder-spacing-unit) * 2) calc(var(--thunder-spacing-unit) * 2.5);
  padding-bottom: calc(var(--thunder-spacing-unit) * 1.5);
}

.thunderid-organization-profile__title {
  margin: 0;
}

.thunderid-organization-profile__header-divider {
  margin: 0;
}

/* Identity: avatar + org name + handle ----------------------- */

.thunderid-organization-profile__identity {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--thunder-spacing-unit) * 2) 0 calc(var(--thunder-spacing-unit) * 1.5);
  gap: calc(var(--thunder-spacing-unit) * 0.5);
}

.thunderid-organization-profile__avatar {
  width: var(--thunder-avatar-size);
  height: var(--thunder-avatar-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: calc(var(--thunder-spacing-unit) * 0.375);
}

.thunderid-organization-profile__avatar-initials {
  color: #ffffff;
  font-size: var(--thunder-avatar-fontSize);
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.02em;
  pointer-events: none;
  user-select: none;
}

.thunderid-organization-profile__org-name {
  margin: 0;
  text-align: center;
}

.thunderid-organization-profile__org-handle {
  color: var(--thunder-color-text-secondary);
  text-align: center;
}

.thunderid-organization-profile__identity-divider {
  margin: 0;
}

/* Fields ---------------------------------------------------- */

.thunderid-organization-profile__fields {
  display: flex;
  flex-direction: column;
}

.thunderid-organization-profile__field {
  display: grid;
  grid-template-columns: 36% 64%;
  align-items: center;
  padding: calc(var(--thunder-spacing-unit) * 1.25) calc(var(--thunder-spacing-unit) * 2.5);
  gap: calc(var(--thunder-spacing-unit) * 0.75);
  box-sizing: border-box;
  transition: background-color var(--thunder-transition-fast);
}

.thunderid-organization-profile__field:hover {
  background-color: var(--thunder-color-action-hover);
}

.thunderid-organization-profile__field + .thunderid-organization-profile__field {
  border-top: 1px solid var(--thunder-color-border);
}

.thunderid-organization-profile__field-label-col {
  /* label column */
}

.thunderid-organization-profile__field-label {
  color: var(--thunder-color-text-secondary);
  font-size: var(--thunder-typography-fontSize-sm);
}

.thunderid-organization-profile__field-value-col {
  /* value column */
}

.thunderid-organization-profile__field-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--thunder-spacing-unit) * 0.5);
  min-height: 1.5rem;
}

.thunderid-organization-profile__field-value {
  color: var(--thunder-color-text-primary);
  word-break: break-word;
  flex: 1;
  font-size: var(--thunder-typography-fontSize-sm);
}

.thunderid-organization-profile__field-value--id {
  font-size: calc(var(--thunder-typography-fontSize-sm) * 0.9);
  color: var(--thunder-color-text-secondary);
  font-family: monospace;
  word-break: break-all;
}

.thunderid-organization-profile__field-placeholder {
  color: var(--thunder-color-primary-main);
  font-style: italic;
  font-size: var(--thunder-typography-fontSize-sm);
  flex: 1;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
}

/* Edit button (pencil icon) --------------------------------- */

.thunderid-organization-profile__field-edit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--thunder-color-text-secondary);
  flex-shrink: 0;
  padding: calc(var(--thunder-spacing-unit) * 0.375);
  border-radius: var(--thunder-border-radius-small);
  transition:
    color var(--thunder-transition-fast),
    background-color var(--thunder-transition-fast),
    opacity var(--thunder-transition-fast);
  opacity: 0;
  line-height: 0;
}

.thunderid-organization-profile__field:hover .thunderid-organization-profile__field-edit-btn {
  opacity: 1;
}

.thunderid-organization-profile__field-edit-btn:hover {
  color: var(--thunder-color-primary-main);
  background-color: var(--thunder-color-primary-light);
}

.thunderid-organization-profile__field-edit-btn:focus-visible {
  opacity: 1;
  outline: none;
  box-shadow: 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);
}

/* Edit mode ------------------------------------------------- */

.thunderid-organization-profile__field-edit {
  display: flex;
  flex-direction: column;
  gap: calc(var(--thunder-spacing-unit) * 0.75);
}

.thunderid-organization-profile__field-edit-actions {
  display: flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 0.75);
}
`;
var OrganizationProfile_css_default = ORGANIZATION_PROFILE_CSS;

//#endregion
//#region src/components/presentation/organization-switcher/OrganizationSwitcher.css.ts
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
* Styles for the OrganizationSwitcher presentation component.
*
* BEM block: `.thunderid-organization-switcher`
*
* The root element is a Card (`.thunderid-card`), so we override its
* default padding to let the trigger button fill the surface edge-to-edge,
* and apply `position: relative` to anchor the absolute dropdown.
*
* Modifiers:  (none — state is controlled via isOpen in component logic)
*
* Elements:
*   __trigger        – the clickable trigger button showing current org
*   __trigger-label  – the org name Typography inside the trigger
*   __dropdown       – the absolute-positioned dropdown listbox
*   __loading        – loading state container (Spinner)
*   __empty          – empty state message (Typography)
*   __item           – each selectable organization row
*   __item--active   – currently selected organization
*/
const ORGANIZATION_SWITCHER_CSS = `
/* ============================================================
   OrganizationSwitcher
   ============================================================ */

/* Override Card's default padding so the trigger button fills the surface */
.thunderid-organization-switcher.thunderid-card {
  padding: 0;
  position: relative;
  display: inline-block;
  min-width: 180px;
}

/* Trigger ---------------------------------------------------- */

.thunderid-organization-switcher__trigger {
  display: flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 0.75);
  width: 100%;
  padding: var(--thunder-dropdown-itemPaddingY) var(--thunder-dropdown-itemPaddingX);
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--thunder-dropdown-borderRadius);
  color: var(--thunder-color-text-primary);
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-typography-fontSize-md);
  transition: background-color var(--thunder-transition-fast);
  text-align: left;
  box-sizing: border-box;
}

.thunderid-organization-switcher__trigger:hover {
  background-color: var(--thunder-color-action-hover);
}

.thunderid-organization-switcher__trigger:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);
  border-radius: var(--thunder-dropdown-borderRadius);
}

.thunderid-organization-switcher__trigger-label {
  flex: 1;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* Dropdown --------------------------------------------------- */

.thunderid-organization-switcher__dropdown {
  position: absolute;
  top: calc(100% + calc(var(--thunder-spacing-unit) * 0.5));
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--thunder-color-background-surface);
  border: 1px solid var(--thunder-color-border);
  border-radius: var(--thunder-dropdown-borderRadius);
  box-shadow: var(--thunder-dropdown-shadow);
  overflow: hidden;
  min-width: 160px;
  display: flex;
  flex-direction: column;
  padding: calc(var(--thunder-spacing-unit) * 0.5) 0;
}

/* Loading / Empty states ------------------------------------ */

.thunderid-organization-switcher__loading,
.thunderid-organization-switcher__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--thunder-spacing-unit) * 2);
  color: var(--thunder-color-text-secondary);
}

/* Items ----------------------------------------------------- */

.thunderid-organization-switcher__item {
  display: flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 0.75);
  width: 100%;
  padding: var(--thunder-dropdown-itemPaddingY) var(--thunder-dropdown-itemPaddingX);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-typography-fontSize-md);
  color: var(--thunder-color-text-primary);
  transition: background-color var(--thunder-transition-fast);
  box-sizing: border-box;
}

.thunderid-organization-switcher__item:hover {
  background-color: var(--thunder-color-action-hover);
}

.thunderid-organization-switcher__item--active {
  background-color: var(--thunder-color-action-selected);
  color: var(--thunder-color-primary-main);
  font-weight: var(--thunder-typography-fontWeight-medium);
}

.thunderid-organization-switcher__item--active:hover {
  background-color: var(--thunder-color-action-focus);
}
`;
var OrganizationSwitcher_css_default = ORGANIZATION_SWITCHER_CSS;

//#endregion
//#region src/components/presentation/user-dropdown/UserDropdown.css.ts
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
* Styles for the UserDropdown presentation component.
*
* BEM block: `.thunderid-user-dropdown`
*
* Trigger modifiers:
*   __trigger--open               – ring + border while menu is visible
*   __avatar--sm / --lg           – trigger avatar size variants (default is 32 px)
*
* Menu modifiers:
*   __menu--align-left            – panel opens to the left of the trigger
*   __menu--size-sm               – compact menu (180 px min-width, tighter padding)
*   __menu--size-lg               – spacious menu (280 px min-width, more padding)
*
* Item modifiers:
*   __item--danger                – destructive action (red text/hover)
*
* Elements:
*   __chevron                     – rotates 180° when menu is open
*   __menu-header                 – user identity section at top of menu
*   __menu-header-avatar          – gradient avatar circle in header
*   __menu-header-info            – name + subtitle column
*   __menu-header-name            – bold display name
*   __menu-header-subtitle        – muted email / username
*   __menu-divider                – thin horizontal separator
*/
const USER_DROPDOWN_CSS = `
/* ============================================================
   UserDropdown
   ============================================================ */

.thunderid-user-dropdown {
  position: relative;
  display: inline-block;
  font-family: var(--thunder-typography-fontFamily);
}

/* ── Trigger ─────────────────────────────────────────────────── */

.thunderid-user-dropdown__trigger {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 0.5);
  padding: 3px;
  background: none;
  border: 2px solid transparent;
  border-radius: var(--thunder-border-radius-full);
  cursor: pointer;
  color: var(--thunder-color-text-primary);
  transition:
    border-color var(--thunder-transition-fast),
    box-shadow var(--thunder-transition-fast);
  box-sizing: border-box;
  outline: none;
}

.thunderid-user-dropdown__trigger:hover {
  border-color: var(--thunder-color-primary-main);
}

.thunderid-user-dropdown__trigger--open {
  border-color: var(--thunder-color-primary-main);
  box-shadow: 0 0 0 3px var(--thunder-focus-ring-color);
}

.thunderid-user-dropdown__trigger:focus-visible {
  border-color: var(--thunder-color-primary-main);
  box-shadow: 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);
}

/* ── Trigger avatar ──────────────────────────────────────────── */

.thunderid-user-dropdown__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #ffffff;
  flex-shrink: 0;
  font-size: var(--thunder-typography-fontSize-sm);
  font-weight: var(--thunder-typography-fontWeight-semibold);
  line-height: 1;
  user-select: none;
  pointer-events: none;
}

/* sm — 28 px */
.thunderid-user-dropdown__avatar--sm {
  width: 28px;
  height: 28px;
  font-size: var(--thunder-typography-fontSize-xs);
}

/* lg — 38 px */
.thunderid-user-dropdown__avatar--lg {
  width: 38px;
  height: 38px;
  font-size: var(--thunder-typography-fontSize-md);
}

/* ── Chevron ─────────────────────────────────────────────────── */

.thunderid-user-dropdown__chevron {
  display: inline-flex;
  align-items: center;
  color: var(--thunder-color-text-secondary);
  transition: transform var(--thunder-transition-normal);
  padding-right: calc(var(--thunder-spacing-unit) * 0.25);
}

.thunderid-user-dropdown__trigger--open .thunderid-user-dropdown__chevron {
  transform: rotate(180deg);
}

/* ── Dropdown menu ───────────────────────────────────────────── */

.thunderid-user-dropdown__menu {
  position: absolute;
  top: calc(100% + calc(var(--thunder-spacing-unit) * 0.75));
  right: 0;
  z-index: 1000;
  background-color: var(--thunder-color-background-surface);
  border: 1px solid var(--thunder-color-border);
  border-radius: var(--thunder-dropdown-borderRadius);
  box-shadow: var(--thunder-dropdown-shadow);
  overflow: hidden;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  animation: thunderid-dropdown-enter var(--thunder-transition-fast) ease;
}

/* Alignment */

.thunderid-user-dropdown__menu--align-left {
  right: auto;
  left: 0;
}

/* Size: sm */

.thunderid-user-dropdown__menu--size-sm {
  min-width: 180px;
}

.thunderid-user-dropdown__menu--size-sm .thunderid-user-dropdown__menu-header {
  padding: calc(var(--thunder-spacing-unit) * 1.25) calc(var(--thunder-spacing-unit) * 1.5);
  gap: calc(var(--thunder-spacing-unit) * 1);
}

.thunderid-user-dropdown__menu--size-sm .thunderid-user-dropdown__menu-header-avatar {
  width: 30px;
  height: 30px;
  font-size: var(--thunder-typography-fontSize-sm);
}

.thunderid-user-dropdown__menu--size-sm .thunderid-user-dropdown__item {
  padding: calc(var(--thunder-spacing-unit) * 0.75) calc(var(--thunder-spacing-unit) * 1.5);
  font-size: var(--thunder-typography-fontSize-xs);
}

/* Size: lg */

.thunderid-user-dropdown__menu--size-lg {
  min-width: 280px;
}

.thunderid-user-dropdown__menu--size-lg .thunderid-user-dropdown__menu-header {
  padding: calc(var(--thunder-spacing-unit) * 2) calc(var(--thunder-spacing-unit) * 2);
  gap: calc(var(--thunder-spacing-unit) * 1.5);
}

.thunderid-user-dropdown__menu--size-lg .thunderid-user-dropdown__menu-header-avatar {
  width: 42px;
  height: 42px;
  font-size: var(--thunder-typography-fontSize-lg);
}

.thunderid-user-dropdown__menu--size-lg .thunderid-user-dropdown__item {
  padding: calc(var(--thunder-spacing-unit) * 1.25) calc(var(--thunder-spacing-unit) * 2);
  font-size: var(--thunder-typography-fontSize-md);
}

@keyframes thunderid-dropdown-enter {
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ── Menu header (user identity) ─────────────────────────────── */

.thunderid-user-dropdown__menu-header {
  display: flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 1.25);
  padding: calc(var(--thunder-spacing-unit) * 1.5) calc(var(--thunder-spacing-unit) * 1.75);
}

.thunderid-user-dropdown__menu-header-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffffff;
  flex-shrink: 0;
  font-size: var(--thunder-typography-fontSize-md);
  font-weight: var(--thunder-typography-fontWeight-semibold);
  line-height: 1;
  user-select: none;
}

.thunderid-user-dropdown__menu-header-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.thunderid-user-dropdown__menu-header-name {
  font-size: var(--thunder-typography-fontSize-sm);
  font-weight: var(--thunder-typography-fontWeight-semibold);
  color: var(--thunder-color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: var(--thunder-typography-lineHeight-tight);
}

.thunderid-user-dropdown__menu-header-subtitle {
  font-size: var(--thunder-typography-fontSize-xs);
  color: var(--thunder-color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: var(--thunder-typography-lineHeight-normal);
}

/* ── Menu divider ────────────────────────────────────────────── */

.thunderid-user-dropdown__menu-divider {
  height: 1px;
  background-color: var(--thunder-color-border);
  margin: calc(var(--thunder-spacing-unit) * 0.5) 0;
  flex-shrink: 0;
}

/* ── Menu items ──────────────────────────────────────────────── */

.thunderid-user-dropdown__item {
  display: flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 1);
  width: 100%;
  padding: calc(var(--thunder-spacing-unit) * 1) calc(var(--thunder-spacing-unit) * 1.75);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-typography-fontSize-sm);
  color: var(--thunder-color-text-primary);
  transition: background-color var(--thunder-transition-fast);
  box-sizing: border-box;
}

.thunderid-user-dropdown__item:hover {
  background-color: var(--thunder-color-action-hover);
}

.thunderid-user-dropdown__item:focus-visible {
  outline: none;
  background-color: var(--thunder-color-action-focus);
}

/* Danger variant (sign-out) */

.thunderid-user-dropdown__item--danger {
  color: var(--thunder-color-error-main);
}

.thunderid-user-dropdown__item--danger:hover {
  background-color: var(--thunder-color-error-light);
}

/* ── Modal overlay ───────────────────────────────────────────── */

.thunderid-user-dropdown__modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(3px);
  animation: thunderid-overlay-enter var(--thunder-transition-fast) ease;
}

@keyframes thunderid-overlay-enter {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Modal content ───────────────────────────────────────────── */

.thunderid-user-dropdown__modal-content {
  background: var(--thunder-color-background-surface);
  border-radius: var(--thunder-border-radius-large);
  box-shadow: var(--thunder-shadow-large);
  max-width: 480px;
  width: 92%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: thunderid-modal-enter var(--thunder-transition-normal) ease;
}

@keyframes thunderid-modal-enter {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ── Modal close button ──────────────────────────────────────── */

.thunderid-user-dropdown__modal-close {
  position: absolute;
  top: calc(var(--thunder-spacing-unit) * 1.25);
  right: calc(var(--thunder-spacing-unit) * 1.25);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--thunder-color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--thunder-spacing-unit) * 0.625);
  border-radius: var(--thunder-border-radius-small);
  z-index: 10001;
  transition:
    color var(--thunder-transition-fast),
    background-color var(--thunder-transition-fast);
  line-height: 0;
}

.thunderid-user-dropdown__modal-close:hover {
  color: var(--thunder-color-text-primary);
  background-color: var(--thunder-color-action-hover);
}

.thunderid-user-dropdown__modal-close:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);
}
`;
var UserDropdown_css_default = USER_DROPDOWN_CSS;

//#endregion
//#region src/components/presentation/user-profile/UserProfile.css.ts
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
* Styles for the UserProfile presentation component.
*
* BEM block: `.thunderid-user-profile`
*
* Modifiers:
*   --compact   – reduced field padding for modal / dropdown embedding
*
* New elements in this version:
*   __hero           – avatar + name + subtitle banner
*   __avatar--sm/md/lg  – avatar size variants
*   __hero-name      – prominent display name
*   __hero-subtitle  – secondary line (email / username)
*/
const USER_PROFILE_CSS = `
/* ============================================================
   UserProfile  (modern redesign)
   ============================================================ */

.thunderid-user-profile {
  display: flex;
  flex-direction: column;
  min-width: 320px;
  overflow: hidden;
  font-family: var(--thunder-typography-fontFamily);
}

/* ── Header ─────────────────────────────────────────────────── */

.thunderid-user-profile__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--thunder-spacing-unit) * 2) calc(var(--thunder-spacing-unit) * 2.5)
    calc(var(--thunder-spacing-unit) * 1.75);
}

.thunderid-user-profile__title {
  margin: 0;
  font-size: var(--thunder-typography-fontSize-md);
  font-weight: var(--thunder-typography-fontWeight-semibold);
  color: var(--thunder-color-text-primary);
  letter-spacing: var(--thunder-typography-letterSpacing-tight);
}

.thunderid-user-profile__header-divider {
  margin: 0;
}

/* ── Hero (avatar + name + subtitle) ────────────────────────── */

.thunderid-user-profile__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--thunder-spacing-unit) * 3) calc(var(--thunder-spacing-unit) * 2.5)
    calc(var(--thunder-spacing-unit) * 2);
  gap: calc(var(--thunder-spacing-unit) * 1.25);
  background: linear-gradient(
    180deg,
    var(--thunder-color-primary-light) 0%,
    var(--thunder-color-background-surface) 100%
  );
  border-bottom: 1px solid var(--thunder-color-border);
}

.thunderid-user-profile__avatar-wrapper {
  position: relative;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(
    135deg,
    var(--thunder-color-primary-main),
    var(--thunder-color-primary-dark)
  );
  box-shadow: 0 4px 14px rgba(75, 110, 245, 0.28);
}

.thunderid-user-profile__avatar {
  width: var(--thunder-avatar-size, 72px);
  height: var(--thunder-avatar-size, 72px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid var(--thunder-color-background-surface);
}

/* Avatar size variants */

.thunderid-user-profile__avatar--sm {
  width: 48px;
  height: 48px;
}

.thunderid-user-profile__avatar--sm .thunderid-user-profile__avatar-initials {
  font-size: 1rem;
}

.thunderid-user-profile__avatar--md {
  width: 64px;
  height: 64px;
}

.thunderid-user-profile__avatar--md .thunderid-user-profile__avatar-initials {
  font-size: 1.25rem;
}

.thunderid-user-profile__avatar--lg {
  width: 80px;
  height: 80px;
}

.thunderid-user-profile__avatar--lg .thunderid-user-profile__avatar-initials {
  font-size: 1.625rem;
}

.thunderid-user-profile__avatar-initials {
  color: #ffffff;
  font-weight: var(--thunder-typography-fontWeight-semibold);
  line-height: 1;
  letter-spacing: 0.02em;
  pointer-events: none;
  user-select: none;
}

.thunderid-user-profile__hero-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 0.375);
  text-align: center;
}

.thunderid-user-profile__hero-name {
  font-size: var(--thunder-typography-fontSize-lg);
  font-weight: var(--thunder-typography-fontWeight-semibold);
  color: var(--thunder-color-text-primary);
  line-height: var(--thunder-typography-lineHeight-tight);
  letter-spacing: var(--thunder-typography-letterSpacing-tight);
}

.thunderid-user-profile__hero-subtitle {
  font-size: var(--thunder-typography-fontSize-sm);
  color: var(--thunder-color-text-secondary);
  line-height: var(--thunder-typography-lineHeight-normal);
}

/* ── Alerts & loading ────────────────────────────────────────── */

.thunderid-user-profile__error {
  margin: calc(var(--thunder-spacing-unit) * 1.5) calc(var(--thunder-spacing-unit) * 2.5)
    calc(var(--thunder-spacing-unit) * 0.5);
}

.thunderid-user-profile__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--thunder-spacing-unit) * 3.5) 0;
}

/* ── Fields ──────────────────────────────────────────────────── */

.thunderid-user-profile__fields {
  display: flex;
  flex-direction: column;
}

.thunderid-user-profile__field {
  display: grid;
  grid-template-columns: 38% 62%;
  align-items: start;
  padding: calc(var(--thunder-spacing-unit) * 1.5) calc(var(--thunder-spacing-unit) * 2.5);
  gap: calc(var(--thunder-spacing-unit) * 0.75);
  box-sizing: border-box;
  transition: background-color var(--thunder-transition-fast);
}

.thunderid-user-profile__field:hover {
  background-color: var(--thunder-color-action-hover);
}

.thunderid-user-profile__field + .thunderid-user-profile__field {
  border-top: 1px solid var(--thunder-color-border);
}

.thunderid-user-profile__field-label {
  color: var(--thunder-color-text-secondary);
  font-size: var(--thunder-typography-fontSize-sm);
  font-weight: var(--thunder-typography-fontWeight-medium);
  padding-top: 2px;
}

.thunderid-user-profile__field-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--thunder-spacing-unit) * 0.5);
  min-height: 1.5rem;
}

.thunderid-user-profile__field-value {
  color: var(--thunder-color-text-primary);
  word-break: break-word;
  flex: 1;
  font-size: var(--thunder-typography-fontSize-sm);
}

.thunderid-user-profile__field-placeholder {
  color: var(--thunder-color-primary-main);
  font-size: var(--thunder-typography-fontSize-sm);
  font-style: italic;
  flex: 1;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
  opacity: 0.8;
  transition: opacity var(--thunder-transition-fast);
}

.thunderid-user-profile__field-placeholder:hover {
  opacity: 1;
}

/* ── Edit button (pencil) ────────────────────────────────────── */

.thunderid-user-profile__field-edit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--thunder-color-text-secondary);
  flex-shrink: 0;
  padding: calc(var(--thunder-spacing-unit) * 0.375);
  border-radius: var(--thunder-border-radius-small);
  transition:
    color var(--thunder-transition-fast),
    background-color var(--thunder-transition-fast),
    opacity var(--thunder-transition-fast);
  opacity: 0;
  line-height: 0;
}

.thunderid-user-profile__field:hover .thunderid-user-profile__field-edit-btn {
  opacity: 1;
}

.thunderid-user-profile__field-edit-btn:hover {
  color: var(--thunder-color-primary-main);
  background-color: var(--thunder-color-primary-light);
}

.thunderid-user-profile__field-edit-btn:focus-visible {
  opacity: 1;
  outline: none;
  box-shadow: 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);
}

/* ── Edit mode ───────────────────────────────────────────────── */

.thunderid-user-profile__field-edit {
  display: flex;
  flex-direction: column;
  gap: calc(var(--thunder-spacing-unit) * 0.75);
  padding: calc(var(--thunder-spacing-unit) * 0.25) 0;
}

.thunderid-user-profile__field-edit-actions {
  display: flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 0.75);
}

/* ── Footer slot ─────────────────────────────────────────────── */

.thunderid-user-profile__footer {
  padding: calc(var(--thunder-spacing-unit) * 1.5) calc(var(--thunder-spacing-unit) * 2.5);
  border-top: 1px solid var(--thunder-color-border);
}

/* ── Compact modifier ────────────────────────────────────────── */

.thunderid-user-profile--compact .thunderid-user-profile__hero {
  padding: calc(var(--thunder-spacing-unit) * 2) calc(var(--thunder-spacing-unit) * 2);
}

.thunderid-user-profile--compact .thunderid-user-profile__avatar--lg {
  width: 56px;
  height: 56px;
}

.thunderid-user-profile--compact .thunderid-user-profile__avatar--lg .thunderid-user-profile__avatar-initials {
  font-size: 1.125rem;
}

.thunderid-user-profile--compact .thunderid-user-profile__field {
  padding: calc(var(--thunder-spacing-unit) * 1) calc(var(--thunder-spacing-unit) * 2);
}

.thunderid-user-profile--compact .thunderid-user-profile__hero-name {
  font-size: var(--thunder-typography-fontSize-md);
}
`;
var UserProfile_css_default = USER_PROFILE_CSS;

//#endregion
//#region src/components/primitives/Alert/Alert.css.ts
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
* Styles for the Alert primitive component.
*
* BEM block: `.thunderid-alert`
*
* Modifiers:
*   Severity: --info | --success | --warning | --error
*
* Elements:
*   __content | __dismiss
*/
const ALERT_CSS = `
/* ============================================================
   Alert
   ============================================================ */

.thunderid-alert {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: calc(var(--thunder-spacing-unit) * 1);
  padding: var(--thunder-alert-paddingY) var(--thunder-alert-paddingX);
  border-radius: var(--thunder-alert-borderRadius);
  border: 1px solid transparent;
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-typography-fontSize-sm);
  box-sizing: border-box;
  width: 100%;
  line-height: var(--thunder-typography-lineHeight-normal);
}

.thunderid-alert__content {
  flex: 1;
}

.thunderid-alert--info {
  background-color: var(--thunder-color-info-light);
  border-color: var(--thunder-color-info-main);
  color: var(--thunder-color-info-contrastText);
}

.thunderid-alert--success {
  background-color: var(--thunder-color-success-light);
  border-color: var(--thunder-color-success-main);
  color: var(--thunder-color-success-contrastText);
}

.thunderid-alert--warning {
  background-color: var(--thunder-color-warning-light);
  border-color: var(--thunder-color-warning-main);
  color: var(--thunder-color-warning-contrastText);
}

.thunderid-alert--error {
  background-color: var(--thunder-color-error-light);
  border-color: var(--thunder-color-error-main);
  color: var(--thunder-color-error-contrastText);
}

.thunderid-alert__dismiss {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
  line-height: 0;
  padding: calc(var(--thunder-spacing-unit) * 0.25);
  border-radius: var(--thunder-border-radius-xs);
  color: inherit;
  opacity: 0.6;
  flex-shrink: 0;
  transition: opacity var(--thunder-transition-fast), background-color var(--thunder-transition-fast);
}
.thunderid-alert__dismiss:hover {
  opacity: 1;
  background-color: var(--thunder-color-action-hover);
}
`;
var Alert_css_default = ALERT_CSS;

//#endregion
//#region src/components/primitives/Button/Button.css.ts
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
* Styles for the Button primitive component.
*
* BEM block: `.thunderid-button`
*
* Modifiers:
*   Variant:  --solid | --outline | --ghost | --text
*   Color:    --primary | --secondary | --danger
*   Size:     --small | --medium | --large
*   State:    --full-width | --loading
*
* Elements:
*   __start-icon | __end-icon | __content | __spinner
*
* Note: The `thunder-spin` keyframe animation is defined in
* `styles/animations.css.ts` and shared with the Spinner component.
*/
const BUTTON_CSS = `
/* ============================================================
   Button
   ============================================================ */

.thunderid-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--thunder-spacing-unit) * 0.75);
  border-radius: var(--thunder-button-borderRadius);
  font-family: var(--thunder-typography-fontFamily);
  font-weight: var(--thunder-button-fontWeight);
  letter-spacing: var(--thunder-typography-letterSpacing-normal);
  cursor: pointer;
  outline: none;
  text-decoration: none;
  white-space: nowrap;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  transition:
    background-color var(--thunder-transition-fast),
    color var(--thunder-transition-fast),
    border-color var(--thunder-transition-fast),
    box-shadow var(--thunder-transition-fast),
    opacity var(--thunder-transition-fast),
    transform var(--thunder-transition-fast);
  position: relative;
  vertical-align: middle;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
}

.thunderid-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);
}

/* -- Sizes -- */

.thunderid-button--small {
  padding: 0 var(--thunder-button-sm-paddingX);
  font-size: var(--thunder-button-sm-fontSize);
  height: var(--thunder-button-sm-height);
}

.thunderid-button--medium {
  padding: 0 var(--thunder-button-md-paddingX);
  font-size: var(--thunder-button-md-fontSize);
  height: var(--thunder-button-md-height);
}

.thunderid-button--large {
  padding: 0 var(--thunder-button-lg-paddingX);
  font-size: var(--thunder-button-lg-fontSize);
  height: var(--thunder-button-lg-height);
}

/* -- Modifiers -- */

.thunderid-button--full-width {
  width: 100%;
}

.thunderid-button--loading,
.thunderid-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  pointer-events: none;
}

/* -- Solid variants -- */

.thunderid-button--solid.thunderid-button--primary {
  background-color: var(--thunder-color-primary-main);
  color: var(--thunder-color-primary-contrastText);
  border-color: var(--thunder-color-primary-main);
}
.thunderid-button--solid.thunderid-button--primary:hover:not(:disabled) {
  background-color: var(--thunder-color-primary-dark);
  border-color: var(--thunder-color-primary-dark);
}
.thunderid-button--solid.thunderid-button--primary:active:not(:disabled) {
  transform: scale(0.98);
}

.thunderid-button--solid.thunderid-button--secondary {
  background-color: var(--thunder-color-secondary-light);
  color: var(--thunder-color-secondary-main);
  border-color: var(--thunder-color-border);
}
.thunderid-button--solid.thunderid-button--secondary:hover:not(:disabled) {
  background-color: var(--thunder-color-border);
  border-color: var(--thunder-color-border);
}
.thunderid-button--solid.thunderid-button--secondary:active:not(:disabled) {
  transform: scale(0.98);
}

.thunderid-button--solid.thunderid-button--danger {
  background-color: var(--thunder-color-error-main);
  color: #ffffff;
  border-color: var(--thunder-color-error-main);
}
.thunderid-button--solid.thunderid-button--danger:hover:not(:disabled) {
  filter: brightness(0.92);
}
.thunderid-button--solid.thunderid-button--danger:active:not(:disabled) {
  transform: scale(0.98);
}

/* -- Outline variants -- */

.thunderid-button--outline.thunderid-button--primary {
  background-color: transparent;
  color: var(--thunder-color-primary-main);
  border-color: var(--thunder-color-primary-main);
}
.thunderid-button--outline.thunderid-button--primary:hover:not(:disabled) {
  background-color: var(--thunder-color-primary-light);
}
.thunderid-button--outline.thunderid-button--primary:active:not(:disabled) {
  transform: scale(0.98);
}

.thunderid-button--outline.thunderid-button--secondary {
  background-color: transparent;
  color: var(--thunder-color-secondary-main);
  border-color: var(--thunder-color-border);
}
.thunderid-button--outline.thunderid-button--secondary:hover:not(:disabled) {
  background-color: var(--thunder-color-secondary-light);
  border-color: var(--thunder-color-secondary-main);
}
.thunderid-button--outline.thunderid-button--secondary:active:not(:disabled) {
  transform: scale(0.98);
}

.thunderid-button--outline.thunderid-button--danger {
  background-color: transparent;
  color: var(--thunder-color-error-main);
  border-color: var(--thunder-color-error-main);
}
.thunderid-button--outline.thunderid-button--danger:hover:not(:disabled) {
  background-color: var(--thunder-color-error-light);
}
.thunderid-button--outline.thunderid-button--danger:active:not(:disabled) {
  transform: scale(0.98);
}

/* -- Ghost variants -- */

.thunderid-button--ghost.thunderid-button--primary {
  background-color: transparent;
  color: var(--thunder-color-primary-main);
  border-color: transparent;
}
.thunderid-button--ghost.thunderid-button--primary:hover:not(:disabled) {
  background-color: var(--thunder-color-primary-light);
  border-color: transparent;
}

.thunderid-button--ghost.thunderid-button--secondary {
  background-color: transparent;
  color: var(--thunder-color-secondary-main);
  border-color: transparent;
}
.thunderid-button--ghost.thunderid-button--secondary:hover:not(:disabled) {
  background-color: var(--thunder-color-action-hover);
  border-color: transparent;
}

.thunderid-button--ghost.thunderid-button--danger {
  background-color: transparent;
  color: var(--thunder-color-error-main);
  border-color: transparent;
}
.thunderid-button--ghost.thunderid-button--danger:hover:not(:disabled) {
  background-color: var(--thunder-color-error-light);
  border-color: transparent;
}

/* -- Text variants -- */

.thunderid-button--text {
  border-color: transparent;
  background-color: transparent;
  padding-left: calc(var(--thunder-spacing-unit) * 0.25);
  padding-right: calc(var(--thunder-spacing-unit) * 0.25);
}

.thunderid-button--text.thunderid-button--primary {
  color: var(--thunder-color-primary-main);
}
.thunderid-button--text.thunderid-button--primary:hover:not(:disabled) {
  color: var(--thunder-color-primary-dark);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.thunderid-button--text.thunderid-button--secondary {
  color: var(--thunder-color-secondary-main);
}
.thunderid-button--text.thunderid-button--secondary:hover:not(:disabled) {
  color: var(--thunder-color-text-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.thunderid-button--text.thunderid-button--danger {
  color: var(--thunder-color-error-main);
}
.thunderid-button--text.thunderid-button--danger:hover:not(:disabled) {
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* -- Inner elements -- */

.thunderid-button__start-icon,
.thunderid-button__end-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 0;
}
.thunderid-button--small .thunderid-button__start-icon svg,
.thunderid-button--small .thunderid-button__end-icon svg {
  width: 14px;
  height: 14px;
}

.thunderid-button__content {
  display: inline-flex;
  align-items: center;
}

.thunderid-button__spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: thunder-spin 0.6s linear infinite;
  margin-left: calc(var(--thunder-spacing-unit) * 0.5);
}
`;
var Button_css_default = BUTTON_CSS;

//#endregion
//#region src/components/primitives/Card/Card.css.ts
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
* Styles for the Card primitive component.
*
* BEM block: `.thunderid-card`
*
* Modifiers:
*   --elevated  – medium drop shadow
*   --outlined  – 1px border, no shadow
*   --flat      – neither shadow nor border (default)
*/
const CARD_CSS = `
/* ============================================================
   Card
   ============================================================ */

.thunderid-card {
  background-color: var(--thunder-color-background-surface);
  border-radius: var(--thunder-card-borderRadius);
  padding: var(--thunder-card-padding);
  box-sizing: border-box;
  transition: box-shadow var(--thunder-transition-normal);
}

.thunderid-card--elevated {
  box-shadow: var(--thunder-card-shadow);
}

.thunderid-card--outlined {
  border: 1px solid var(--thunder-card-borderColor);
}

/* .thunderid-card--flat: no shadow or border */
`;
var Card_css_default = CARD_CSS;

//#endregion
//#region src/components/primitives/Checkbox/Checkbox.css.ts
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
* Styles for the Checkbox primitive component.
*
* BEM block: `.thunderid-checkbox`
*
* Modifiers:
*   --error  – shows validation error state
*
* Elements:
*   __wrapper | __input | __label | __error
*/
const CHECKBOX_CSS = `
/* ============================================================
   Checkbox
   ============================================================ */

.thunderid-checkbox {
  display: flex;
  flex-direction: column;
  gap: calc(var(--thunder-spacing-unit) * 0.5);
  font-family: var(--thunder-typography-fontFamily);
}

.thunderid-checkbox__wrapper {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 0.75);
  cursor: pointer;
  user-select: none;
}

.thunderid-checkbox__input {
  width: var(--thunder-checkbox-size);
  height: var(--thunder-checkbox-size);
  cursor: pointer;
  accent-color: var(--thunder-color-primary-main);
  flex-shrink: 0;
  border-radius: var(--thunder-border-radius-xs);
}
.thunderid-checkbox__input:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--thunder-focus-ring-width) var(--thunder-focus-ring-color);
}
.thunderid-checkbox__input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.thunderid-checkbox__label {
  font-size: var(--thunder-typography-fontSize-md);
  color: var(--thunder-color-text-primary);
  line-height: var(--thunder-typography-lineHeight-normal);
}

.thunderid-checkbox__error {
  font-size: var(--thunder-typography-fontSize-xs);
  color: var(--thunder-color-error-contrastText);
  line-height: var(--thunder-typography-lineHeight-normal);
}
`;
var Checkbox_css_default = CHECKBOX_CSS;

//#endregion
//#region src/components/primitives/DatePicker/DatePicker.css.ts
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
* Styles for the DatePicker primitive component.
*
* BEM block: `.thunderid-date-picker`
*
* Modifiers:
*   --error  – shows validation error state
*
* Elements:
*   __label | __required | __input | __error
*/
const DATE_PICKER_CSS = `
/* ============================================================
   DatePicker
   ============================================================ */

.thunderid-date-picker {
  display: flex;
  flex-direction: column;
  gap: calc(var(--thunder-spacing-unit) * 0.5);
  font-family: var(--thunder-typography-fontFamily);
  width: 100%;
  box-sizing: border-box;
}

.thunderid-date-picker__label {
  font-size: var(--thunder-typography-fontSize-sm);
  font-weight: var(--thunder-typography-fontWeight-medium);
  color: var(--thunder-color-text-primary);
  display: block;
  line-height: var(--thunder-typography-lineHeight-normal);
}

.thunderid-date-picker__required {
  color: var(--thunder-color-error-main);
  margin-left: 2px;
}

.thunderid-date-picker__input {
  width: 100%;
  height: var(--thunder-input-height);
  padding: 0 var(--thunder-input-paddingX);
  border: 1px solid var(--thunder-input-borderColor);
  border-radius: var(--thunder-input-borderRadius);
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-input-fontSize);
  color: var(--thunder-color-text-primary);
  background-color: var(--thunder-color-background-surface);
  box-sizing: border-box;
  transition:
    border-color var(--thunder-transition-fast),
    box-shadow var(--thunder-transition-fast);
  outline: none;
  cursor: pointer;
}
.thunderid-date-picker__input:focus {
  border-color: var(--thunder-input-focusBorderColor);
  box-shadow: var(--thunder-input-focusRing);
}
.thunderid-date-picker--error .thunderid-date-picker__input {
  border-color: var(--thunder-color-error-main);
}
.thunderid-date-picker--error .thunderid-date-picker__input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}
.thunderid-date-picker__input:disabled {
  background-color: var(--thunder-color-background-disabled);
  color: var(--thunder-color-action-disabled);
  cursor: not-allowed;
}

.thunderid-date-picker__error {
  font-size: var(--thunder-typography-fontSize-xs);
  color: var(--thunder-color-error-contrastText);
  line-height: var(--thunder-typography-lineHeight-normal);
}
`;
var DatePicker_css_default = DATE_PICKER_CSS;

//#endregion
//#region src/components/primitives/Divider/Divider.css.ts
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
* Styles for the Divider primitive component.
*
* BEM block: `.thunderid-divider`
*
* Modifiers:
*   --horizontal   – full-width horizontal rule
*   --vertical     – inline vertical bar
*   --with-content – flex row with centred label between two lines
*
* Elements:
*   __line | __content
*/
const DIVIDER_CSS = `
/* ============================================================
   Divider
   ============================================================ */

.thunderid-divider {
  box-sizing: border-box;
}

.thunderid-divider--horizontal {
  width: 100%;
  border: none;
  border-top: 1px solid var(--thunder-color-border);
  margin: calc(var(--thunder-spacing-unit) * 1) 0;
}

.thunderid-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 100%;
  min-height: 1em;
  border: none;
  background-color: var(--thunder-color-border);
  margin: 0 calc(var(--thunder-spacing-unit) * 1);
  align-self: stretch;
}

.thunderid-divider--with-content {
  display: flex;
  align-items: center;
  gap: calc(var(--thunder-spacing-unit) * 1);
  border: none;
  margin: calc(var(--thunder-spacing-unit) * 1) 0;
}

.thunderid-divider__line {
  flex: 1;
  height: 1px;
  background-color: var(--thunder-color-border);
}

.thunderid-divider__content {
  flex-shrink: 0;
  font-size: var(--thunder-typography-fontSize-xs);
  color: var(--thunder-color-text-secondary);
  padding: 0 calc(var(--thunder-spacing-unit) * 0.5);
  font-family: var(--thunder-typography-fontFamily);
  text-transform: uppercase;
  letter-spacing: var(--thunder-typography-letterSpacing-wide);
  font-weight: var(--thunder-typography-fontWeight-medium);
}
`;
var Divider_css_default = DIVIDER_CSS;

//#endregion
//#region src/components/primitives/Logo/Logo.css.ts
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
* Styles for the Logo primitive component.
*
* BEM block: `.thunderid-logo`
*
* Elements:
*   __image
*/
const LOGO_CSS = `
/* ============================================================
   Logo
   ============================================================ */

.thunderid-logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: opacity var(--thunder-transition-fast);
}

.thunderid-logo:hover {
  opacity: 0.85;
}

.thunderid-logo__image {
  display: block;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}
`;
var Logo_css_default = LOGO_CSS;

//#endregion
//#region src/components/primitives/OtpField/OtpField.css.ts
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
* Styles for the OtpField primitive component.
*
* BEM block: `.thunderid-otp-field`
*
* Elements:
*   __label | __required | __inputs | __digit | __error
*/
const OTP_FIELD_CSS = `
/* ============================================================
   OtpField
   ============================================================ */

.thunderid-otp-field {
  display: flex;
  flex-direction: column;
  gap: calc(var(--thunder-spacing-unit) * 0.75);
  font-family: var(--thunder-typography-fontFamily);
}

.thunderid-otp-field__label {
  font-size: var(--thunder-typography-fontSize-sm);
  font-weight: var(--thunder-typography-fontWeight-medium);
  color: var(--thunder-color-text-primary);
  display: block;
  line-height: var(--thunder-typography-lineHeight-normal);
}

.thunderid-otp-field__required {
  color: var(--thunder-color-error-main);
  margin-left: 2px;
}

.thunderid-otp-field__inputs {
  display: flex;
  gap: calc(var(--thunder-spacing-unit) * 0.75);
}

.thunderid-otp-field__digit {
  width: var(--thunder-input-height);
  height: var(--thunder-input-height);
  text-align: center;
  border: 1px solid var(--thunder-input-borderColor);
  border-radius: var(--thunder-input-borderRadius);
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-typography-fontSize-lg);
  font-weight: var(--thunder-typography-fontWeight-semibold);
  color: var(--thunder-color-text-primary);
  background-color: var(--thunder-color-background-surface);
  box-sizing: border-box;
  outline: none;
  transition:
    border-color var(--thunder-transition-fast),
    box-shadow var(--thunder-transition-fast);
}
.thunderid-otp-field__digit:focus {
  border-color: var(--thunder-input-focusBorderColor);
  box-shadow: var(--thunder-input-focusRing);
}
.thunderid-otp-field__digit:disabled {
  background-color: var(--thunder-color-background-disabled);
  color: var(--thunder-color-action-disabled);
  cursor: not-allowed;
}

.thunderid-otp-field__error {
  font-size: var(--thunder-typography-fontSize-xs);
  color: var(--thunder-color-error-contrastText);
  line-height: var(--thunder-typography-lineHeight-normal);
}
`;
var OtpField_css_default = OTP_FIELD_CSS;

//#endregion
//#region src/components/primitives/PasswordField/PasswordField.css.ts
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
* Styles for the PasswordField primitive component.
*
* BEM block: `.thunderid-password-field`
*
* Modifiers:
*   --error  – shows validation error state
*
* Elements:
*   __label | __required | __wrapper | __input | __toggle | __error
*/
const PASSWORD_FIELD_CSS = `
/* ============================================================
   PasswordField
   ============================================================ */

.thunderid-password-field {
  display: flex;
  flex-direction: column;
  gap: calc(var(--thunder-spacing-unit) * 0.5);
  font-family: var(--thunder-typography-fontFamily);
  width: 100%;
  box-sizing: border-box;
}

.thunderid-password-field__label {
  font-size: var(--thunder-typography-fontSize-sm);
  font-weight: var(--thunder-typography-fontWeight-medium);
  color: var(--thunder-color-text-primary);
  display: block;
  line-height: var(--thunder-typography-lineHeight-normal);
}

.thunderid-password-field__required {
  color: var(--thunder-color-error-main);
  margin-left: 2px;
}

.thunderid-password-field__wrapper {
  display: flex;
  align-items: center;
  height: var(--thunder-input-height);
  border: 1px solid var(--thunder-input-borderColor);
  border-radius: var(--thunder-input-borderRadius);
  background-color: var(--thunder-color-background-surface);
  transition:
    border-color var(--thunder-transition-fast),
    box-shadow var(--thunder-transition-fast);
  overflow: hidden;
  box-sizing: border-box;
}
.thunderid-password-field__wrapper:focus-within {
  border-color: var(--thunder-input-focusBorderColor);
  box-shadow: var(--thunder-input-focusRing);
}
.thunderid-password-field--error .thunderid-password-field__wrapper {
  border-color: var(--thunder-color-error-main);
}
.thunderid-password-field--error .thunderid-password-field__wrapper:focus-within {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.thunderid-password-field__input {
  flex: 1;
  padding: 0 var(--thunder-input-paddingX);
  border: none;
  outline: none;
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-input-fontSize);
  color: var(--thunder-color-text-primary);
  background: transparent;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  min-width: 0;
}
.thunderid-password-field__input::placeholder {
  color: var(--thunder-color-text-secondary);
}
.thunderid-password-field__input:disabled {
  cursor: not-allowed;
}

.thunderid-password-field__toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 var(--thunder-input-paddingX);
  color: var(--thunder-color-text-secondary);
  font-size: var(--thunder-typography-fontSize-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 100%;
  transition: color var(--thunder-transition-fast);
}
.thunderid-password-field__toggle:hover {
  color: var(--thunder-color-text-primary);
}

.thunderid-password-field__error {
  font-size: var(--thunder-typography-fontSize-xs);
  color: var(--thunder-color-error-contrastText);
  line-height: var(--thunder-typography-lineHeight-normal);
}
`;
var PasswordField_css_default = PASSWORD_FIELD_CSS;

//#endregion
//#region src/components/primitives/Select/Select.css.ts
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
* Styles for the Select primitive component.
*
* BEM block: `.thunderid-select`
*
* Modifiers:
*   --error  – shows validation error state
*
* Elements:
*   __label | __required | __input | __error | __helper
*/
const SELECT_CSS = `
/* ============================================================
   Select
   ============================================================ */

.thunderid-select {
  display: flex;
  flex-direction: column;
  gap: calc(var(--thunder-spacing-unit) * 0.5);
  font-family: var(--thunder-typography-fontFamily);
  width: 100%;
  box-sizing: border-box;
}

.thunderid-select__label {
  font-size: var(--thunder-typography-fontSize-sm);
  font-weight: var(--thunder-typography-fontWeight-medium);
  color: var(--thunder-color-text-primary);
  display: block;
  line-height: var(--thunder-typography-lineHeight-normal);
}

.thunderid-select__required {
  color: var(--thunder-color-error-main);
  margin-left: 2px;
}

.thunderid-select__input {
  width: 100%;
  height: var(--thunder-input-height);
  padding: 0 calc(var(--thunder-spacing-unit) * 4) 0 var(--thunder-input-paddingX);
  border: 1px solid var(--thunder-input-borderColor);
  border-radius: var(--thunder-input-borderRadius);
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-input-fontSize);
  color: var(--thunder-color-text-primary);
  background-color: var(--thunder-color-background-surface);
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--thunder-input-paddingX) center;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    border-color var(--thunder-transition-fast),
    box-shadow var(--thunder-transition-fast);
  outline: none;
  line-height: var(--thunder-typography-lineHeight-normal);
}
.thunderid-select__input:focus {
  border-color: var(--thunder-input-focusBorderColor);
  box-shadow: var(--thunder-input-focusRing);
}
.thunderid-select__input:disabled {
  background-color: var(--thunder-color-background-disabled);
  color: var(--thunder-color-action-disabled);
  cursor: not-allowed;
}

.thunderid-select--error .thunderid-select__input {
  border-color: var(--thunder-color-error-main);
}
.thunderid-select--error .thunderid-select__input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.thunderid-select__error {
  font-size: var(--thunder-typography-fontSize-xs);
  color: var(--thunder-color-error-contrastText);
  line-height: var(--thunder-typography-lineHeight-normal);
}

.thunderid-select__helper {
  font-size: var(--thunder-typography-fontSize-xs);
  color: var(--thunder-color-text-secondary);
  line-height: var(--thunder-typography-lineHeight-normal);
}
`;
var Select_css_default = SELECT_CSS;

//#endregion
//#region src/components/primitives/Spinner/Spinner.css.ts
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
* Styles for the Spinner primitive component.
*
* BEM block: `.thunderid-spinner`
*
* Modifiers:
*   Size: --small | --medium | --large
*
* Elements:
*   __svg | __circle
*
* Note: The `thunder-spin` and `thunder-spinner-dash` keyframe animations
* are defined in `styles/animations.css.ts` and shared with the Button component.
*/
const SPINNER_CSS = `
/* ============================================================
   Spinner
   ============================================================ */

.thunderid-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--thunder-color-primary-main);
}

.thunderid-spinner--small {
  width: calc(var(--thunder-spacing-unit) * 2);
  height: calc(var(--thunder-spacing-unit) * 2);
}

.thunderid-spinner--medium {
  width: calc(var(--thunder-spacing-unit) * 2.5);
  height: calc(var(--thunder-spacing-unit) * 2.5);
}

.thunderid-spinner--large {
  width: calc(var(--thunder-spacing-unit) * 3.5);
  height: calc(var(--thunder-spacing-unit) * 3.5);
}

.thunderid-spinner__svg {
  width: 100%;
  height: 100%;
  animation: thunder-spin 1.4s linear infinite;
}

.thunderid-spinner__circle {
  stroke-dasharray: 80, 200;
  stroke-dashoffset: 0;
  animation: thunder-spinner-dash 1.4s ease-in-out infinite;
}
`;
var Spinner_css_default = SPINNER_CSS;

//#endregion
//#region src/components/primitives/TextField/TextField.css.ts
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
* Styles for the TextField primitive component.
*
* BEM block: `.thunderid-text-field`
*
* Modifiers:
*   --error  – shows validation error state
*
* Elements:
*   __label | __required | __input | __error | __helper
*/
const TEXT_FIELD_CSS = `
/* ============================================================
   TextField
   ============================================================ */

.thunderid-text-field {
  display: flex;
  flex-direction: column;
  gap: calc(var(--thunder-spacing-unit) * 0.5);
  font-family: var(--thunder-typography-fontFamily);
  width: 100%;
  box-sizing: border-box;
}

.thunderid-text-field__label {
  font-size: var(--thunder-typography-fontSize-sm);
  font-weight: var(--thunder-typography-fontWeight-medium);
  color: var(--thunder-color-text-primary);
  display: block;
  line-height: var(--thunder-typography-lineHeight-normal);
}

.thunderid-text-field__required {
  color: var(--thunder-color-error-main);
  margin-left: 2px;
}

.thunderid-text-field__input {
  width: 100%;
  height: var(--thunder-input-height);
  padding: 0 var(--thunder-input-paddingX);
  border: 1px solid var(--thunder-input-borderColor);
  border-radius: var(--thunder-input-borderRadius);
  font-family: var(--thunder-typography-fontFamily);
  font-size: var(--thunder-input-fontSize);
  color: var(--thunder-color-text-primary);
  background-color: var(--thunder-color-background-surface);
  box-sizing: border-box;
  transition:
    border-color var(--thunder-transition-fast),
    box-shadow var(--thunder-transition-fast);
  outline: none;
}
.thunderid-text-field__input:focus {
  border-color: var(--thunder-input-focusBorderColor);
  box-shadow: var(--thunder-input-focusRing);
}
.thunderid-text-field__input::placeholder {
  color: var(--thunder-color-text-secondary);
}
.thunderid-text-field__input:disabled {
  background-color: var(--thunder-color-background-disabled);
  color: var(--thunder-color-action-disabled);
  cursor: not-allowed;
}

.thunderid-text-field--error .thunderid-text-field__input {
  border-color: var(--thunder-color-error-main);
}
.thunderid-text-field--error .thunderid-text-field__input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.thunderid-text-field__error {
  font-size: var(--thunder-typography-fontSize-xs);
  color: var(--thunder-color-error-contrastText);
  line-height: var(--thunder-typography-lineHeight-normal);
}

.thunderid-text-field__helper {
  font-size: var(--thunder-typography-fontSize-xs);
  color: var(--thunder-color-text-secondary);
  line-height: var(--thunder-typography-lineHeight-normal);
}
`;
var TextField_css_default = TEXT_FIELD_CSS;

//#endregion
//#region src/components/primitives/Typography/Typography.css.ts
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
* Styles for the Typography primitive component.
*
* BEM block: `.thunderid-typography`
*
* Modifiers (variant):
*   --h1 | --h2 | --h3 | --h4 | --h5 | --h6
*   --subtitle1 | --subtitle2
*   --body1 | --body2
*   --caption | --overline
*/
const TYPOGRAPHY_CSS = `
/* ============================================================
   Typography
   ============================================================ */

.thunderid-typography {
  font-family: var(--thunder-typography-fontFamily);
  color: var(--thunder-color-text-primary);
  margin: 0;
  line-height: var(--thunder-typography-lineHeight-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.thunderid-typography--h1 {
  font-size: var(--thunder-typography-fontSize-3xl);
  font-weight: var(--thunder-typography-fontWeight-bold);
  line-height: var(--thunder-typography-lineHeight-tight);
  letter-spacing: var(--thunder-typography-letterSpacing-tight);
}

.thunderid-typography--h2 {
  font-size: var(--thunder-typography-fontSize-2xl);
  font-weight: var(--thunder-typography-fontWeight-bold);
  line-height: var(--thunder-typography-lineHeight-tight);
  letter-spacing: var(--thunder-typography-letterSpacing-tight);
}

.thunderid-typography--h3 {
  font-size: var(--thunder-typography-fontSize-xl);
  font-weight: var(--thunder-typography-fontWeight-semibold);
  line-height: var(--thunder-typography-lineHeight-tight);
}

.thunderid-typography--h4 {
  font-size: var(--thunder-typography-fontSize-lg);
  font-weight: var(--thunder-typography-fontWeight-semibold);
}

.thunderid-typography--h5 {
  font-size: var(--thunder-typography-fontSize-md);
  font-weight: var(--thunder-typography-fontWeight-semibold);
}

.thunderid-typography--h6 {
  font-size: var(--thunder-typography-fontSize-sm);
  font-weight: var(--thunder-typography-fontWeight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--thunder-typography-letterSpacing-wide);
}

.thunderid-typography--subtitle1 {
  font-size: var(--thunder-typography-fontSize-lg);
  font-weight: var(--thunder-typography-fontWeight-medium);
}

.thunderid-typography--subtitle2 {
  font-size: var(--thunder-typography-fontSize-md);
  font-weight: var(--thunder-typography-fontWeight-medium);
  color: var(--thunder-color-text-secondary);
}

.thunderid-typography--body1 {
  font-size: var(--thunder-typography-fontSize-md);
  font-weight: var(--thunder-typography-fontWeight-normal);
  line-height: var(--thunder-typography-lineHeight-relaxed);
}

.thunderid-typography--body2 {
  font-size: var(--thunder-typography-fontSize-sm);
  font-weight: var(--thunder-typography-fontWeight-normal);
  line-height: var(--thunder-typography-lineHeight-relaxed);
  color: var(--thunder-color-text-secondary);
}

.thunderid-typography--caption {
  font-size: var(--thunder-typography-fontSize-xs);
  font-weight: var(--thunder-typography-fontWeight-normal);
  color: var(--thunder-color-text-secondary);
}

.thunderid-typography--overline {
  font-size: var(--thunder-typography-fontSize-xs);
  font-weight: var(--thunder-typography-fontWeight-medium);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--thunder-color-text-secondary);
}
`;
var Typography_css_default = TYPOGRAPHY_CSS;

//#endregion
//#region src/styles/injectStyles.ts
const STYLE_ID = "thunderid-vue-styles";
/**
* Assembled CSS for all ThunderID Vue components.
* Order is intentional:
*   1. CSS variable defaults + keyframes
*   2. Primitives (lowest level, no dependencies on higher layers)
*   3. Presentation (composed from primitives; may override primitive classes in context)
*/
const STYLES = [
	defaults_css_default,
	animations_css_default,
	Button_css_default,
	Card_css_default,
	Typography_css_default,
	Alert_css_default,
	TextField_css_default,
	PasswordField_css_default,
	Select_css_default,
	Checkbox_css_default,
	DatePicker_css_default,
	OtpField_css_default,
	Divider_css_default,
	Logo_css_default,
	Spinner_css_default,
	OrganizationList_css_default,
	OrganizationSwitcher_css_default,
	OrganizationProfile_css_default,
	CreateOrganization_css_default,
	LanguageSwitcher_css_default,
	UserDropdown_css_default,
	UserProfile_css_default
].join("\n");
/**
* Injects ThunderID Vue component styles into the document `<head>` once.
* Subsequent calls are no-ops (idempotent).
*/
function injectStyles() {
	if (typeof document === "undefined") return;
	if (document.getElementById(STYLE_ID)) return;
	const style = document.createElement("style");
	style.id = STYLE_ID;
	style.textContent = STYLES;
	document.head.appendChild(style);
}

//#endregion
//#region src/plugins/ThunderIDPlugin.ts
/**
* Vue plugin for ThunderID authentication.
*
* Registers the `<ThunderIDProvider>` component globally so it can be used
* anywhere in the application without explicit imports.
*
* @example
* ```ts
* import { createApp } from 'vue';
* import { ThunderIDPlugin } from '@thunderid/vue';
* import App from './App.vue';
*
* const app = createApp(App);
* app.use(ThunderIDPlugin);
* app.mount('#app');
* ```
*
* Then in your root component:
* ```vue
* <template>
*   <ThunderIDProvider :base-url="baseUrl" :client-id="clientId">
*     <router-view />
*   </ThunderIDProvider>
* </template>
* ```
*/
const ThunderIDPlugin = { install(app, options) {
	injectStyles();
	if (options?.mode === "delegated") return;
	app.component("ThunderIDProvider", ThunderIDProvider_default);
} };
var ThunderIDPlugin_default = ThunderIDPlugin;

//#endregion
//#region src/composables/useThunderID.ts
/**
* Primary composable for ThunderID authentication.
*
* Must be called inside a component that is a descendant of `<ThunderIDProvider>`.
* Returns all auth-related reactive state and action methods.
*
* @throws Error if called outside of `<ThunderIDProvider>`.
*
* @example
* ```vue
* <script setup>
* import { useThunderID } from '@thunderid/vue';
*
* const { isSignedIn, isLoading, user, signIn, signOut } = useThunderID();
* <\/script>
*
* <template>
*   <div v-if="isLoading">Loading...</div>
*   <div v-else-if="isSignedIn">
*     <p>Welcome, {{ user?.name }}</p>
*     <button @click="signOut()">Sign Out</button>
*   </div>
*   <div v-else>
*     <button @click="signIn()">Sign In</button>
*   </div>
* </template>
* ```
*/
const useThunderID = () => {
	const context = inject(THUNDERID_KEY);
	if (!context) throw new Error("[ThunderID] useThunderID() was called outside of <ThunderIDProvider>. Make sure to install the ThunderIDPlugin or wrap your app with <ThunderIDProvider>.");
	const flowMetaContext = inject(FLOW_META_KEY, null);
	const i18nContext = inject(I18N_KEY, null);
	const meta = flowMetaContext?.meta ?? ref(null);
	return {
		...context,
		meta,
		resolveFlowTemplateLiterals: (text) => resolveFlowTemplateLiterals(text, {
			meta: meta.value,
			t: i18nContext?.t ?? ((key) => key)
		})
	};
};
var useThunderID_default = useThunderID;

//#endregion
//#region src/composables/useBranding.ts
/**
* Composable for accessing branding preference data.
*
* Must be called inside a component that is a descendant of `<ThunderIDProvider>`.
*
* @returns {BrandingContextValue} The branding context with preferences, theme, and fetch operations.
* @throws {Error} If called outside of `<ThunderIDProvider>`.
*
* @example
* ```vue
* <script setup>
* import { useBranding } from '@thunderid/vue';
*
* const { brandingPreference, theme, isLoading, fetchBranding } = useBranding();
* <\/script>
*
* <template>
*   <div v-if="!isLoading">
*     <img :src="brandingPreference?.images?.logo?.imgURL" alt="Logo" />
*   </div>
* </template>
* ```
*/
const useBranding = () => {
	const context = inject(BRANDING_KEY);
	if (!context) throw new Error("[ThunderID] useBranding() was called outside of <ThunderIDProvider>. Make sure to install the ThunderIDPlugin or wrap your app with <ThunderIDProvider>.");
	return context;
};
var useBranding_default = useBranding;

//#endregion
//#region src/composables/useFlow.ts
/**
* Composable for managing authentication flow UI state.
*
* Must be called inside a component that is a descendant of `<ThunderIDProvider>`.
*
* @returns {FlowContextValue} The flow context with step navigation, messages, and loading state.
* @throws {Error} If called outside of `<ThunderIDProvider>`.
*
* @example
* ```vue
* <script setup>
* import { useFlow } from '@thunderid/vue';
*
* const { currentStep, isLoading, messages, navigateToFlow, reset } = useFlow();
* <\/script>
*
* <template>
*   <div>
*     <p v-if="isLoading">Loading...</p>
*     <component :is="currentStep?.component" v-else />
*     <p v-for="msg in messages" :key="msg.id">{{ msg.content }}</p>
*   </div>
* </template>
* ```
*/
const useFlow = () => {
	const context = inject(FLOW_KEY);
	if (!context) throw new Error("[ThunderID] useFlow() was called outside of <ThunderIDProvider>. Make sure to install the ThunderIDPlugin or wrap your app with <ThunderIDProvider>.");
	return context;
};
var useFlow_default = useFlow;

//#endregion
//#region src/composables/useFlowMeta.ts
/**
* Composable for accessing flow metadata.
*
* Must be called inside a component that is a descendant of `<ThunderIDProvider>`.
*
* @returns {FlowMetaContextValue} The flow meta context with metadata, loading state, and language switching.
* @throws {Error} If called outside of `<ThunderIDProvider>`.
*
* @example
* ```vue
* <script setup>
* import { useFlowMeta } from '@thunderid/vue';
*
* const { meta, isLoading, switchLanguage } = useFlowMeta();
*
* async function changeLanguage(lang: string) {
*   await switchLanguage(lang);
* }
* <\/script>
* ```
*/
const useFlowMeta = () => {
	const context = inject(FLOW_META_KEY);
	if (!context) throw new Error("[ThunderID] useFlowMeta() was called outside of <ThunderIDProvider>. Make sure to install the ThunderIDPlugin or wrap your app with <ThunderIDProvider>.");
	return context;
};
var useFlowMeta_default = useFlowMeta;

//#endregion
//#region src/composables/useI18n.ts
/**
* Composable for accessing internationalization utilities.
*
* Must be called inside a component that is a descendant of `<ThunderIDProvider>`.
*
* @returns {I18nContextValue} The i18n context with translation function, language management, and bundle injection.
* @throws {Error} If called outside of `<ThunderIDProvider>`.
*
* @example
* ```vue
* <script setup>
* import { useI18n } from '@thunderid/vue';
*
* const { t, currentLanguage, setLanguage } = useI18n();
* <\/script>
*
* <template>
*   <p>{{ t('common.welcome') }}</p>
*   <select :value="currentLanguage" @change="setLanguage($event.target.value)">
*     <option value="en-US">English</option>
*     <option value="fr-FR">Français</option>
*   </select>
* </template>
* ```
*/
const useI18n = () => {
	const context = inject(I18N_KEY);
	if (!context) throw new Error("[ThunderID] useI18n() was called outside of <ThunderIDProvider>. Make sure to install the ThunderIDPlugin or wrap your app with <ThunderIDProvider>.");
	return context;
};
var useI18n_default = useI18n;

//#endregion
//#region src/composables/useOrganization.ts
/**
* Composable for accessing organization data and operations.
*
* Must be called inside a component that is a descendant of `<ThunderIDProvider>`.
*
* @returns {OrganizationContextValue} The organization context.
* @throws {Error} If called outside of `<ThunderIDProvider>`.
*
* @example
* ```vue
* <script setup>
* import { useOrganization } from '@thunderid/vue';
*
* const { myOrganizations, currentOrganization, switchOrganization } = useOrganization();
*
* async function handleSwitch(orgId: string) {
*   await switchOrganization(orgId);
* }
* <\/script>
* ```
*/
const useOrganization = () => {
	const context = inject(ORGANIZATION_KEY);
	if (!context) throw new Error("[ThunderID] useOrganization() was called outside of <ThunderIDProvider>. Make sure to install the ThunderIDPlugin or wrap your app with <ThunderIDProvider>.");
	return context;
};
var useOrganization_default = useOrganization;

//#endregion
//#region src/composables/useTheme.ts
/**
* Composable for accessing and controlling the active theme.
*
* Must be called inside a component that is a descendant of `<ThunderIDProvider>`.
*
* @returns {ThemeContextValue} The theme context with the active theme, color scheme, and toggle function.
* @throws {Error} If called outside of `<ThunderIDProvider>`.
*
* @example
* ```vue
* <script setup>
* import { useTheme } from '@thunderid/vue';
*
* const { theme, colorScheme, toggleTheme } = useTheme();
* <\/script>
*
* <template>
*   <button @click="toggleTheme()">
*     Switch to {{ colorScheme === 'light' ? 'dark' : 'light' }} mode
*   </button>
* </template>
* ```
*/
const useTheme = () => {
	const context = inject(THEME_KEY);
	if (!context) throw new Error("[ThunderID] useTheme() was called outside of <ThunderIDProvider>. Make sure to install the ThunderIDPlugin or wrap your app with <ThunderIDProvider>.");
	return context;
};
var useTheme_default = useTheme;

//#endregion
//#region src/composables/useUser.ts
/**
* Composable for accessing user profile data.
*
* Must be called inside a component that is a descendant of `<ThunderIDProvider>`.
*
* @returns {UserContextValue} The user context containing profile, schemas, and update operations.
* @throws {Error} If called outside of `<ThunderIDProvider>`.
*
* @example
* ```vue
* <script setup>
* import { useUser } from '@thunderid/vue';
*
* const { profile, flattenedProfile, schemas, updateProfile, revalidateProfile } = useUser();
* <\/script>
*
* <template>
*   <div v-if="profile">
*     <p>Name: {{ flattenedProfile?.name }}</p>
*     <button @click="revalidateProfile()">Refresh</button>
*   </div>
* </template>
* ```
*/
const useUser = () => {
	const context = inject(USER_KEY);
	if (!context) throw new Error("[ThunderID] useUser() was called outside of <ThunderIDProvider>. Make sure to install the ThunderIDPlugin or wrap your app with <ThunderIDProvider>.");
	return context;
};
var useUser_default = useUser;

//#endregion
//#region src/composables/useOAuthCallback.ts
function cleanupUrlParams$1() {
	if (typeof window === "undefined") return;
	const url = new URL(window.location.href);
	url.searchParams.delete("code");
	url.searchParams.delete("nonce");
	url.searchParams.delete("state");
	url.searchParams.delete("error");
	url.searchParams.delete("error_description");
	window.history.replaceState({}, "", url.toString());
}
/**
* Processes OAuth callbacks by detecting auth code in URL, resolving flowId, and submitting to server.
* Used by SignIn, SignUp, and AcceptInvite components.
*
* Vue composable equivalent of React's useOAuthCallback hook.
*/
function useOAuthCallback({ currentFlowId, flowIdStorageKey = "thunderid_flow_id", isInitialized, isSubmitting, onComplete, onError, onFlowChange, onProcessingStart, onSubmit, processedFlag, setFlowId, tokenValidationAttemptedFlag }) {
	const oauthCodeProcessedFlag = processedFlag ?? { value: false };
	const tokenValidationFlag = tokenValidationAttemptedFlag;
	watch(() => [
		isInitialized.value,
		currentFlowId.value,
		isSubmitting?.value
	], ([initialized, , submitting]) => {
		if (!initialized || submitting) return;
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		const nonce = urlParams.get("nonce");
		const state = urlParams.get("state");
		const flowIdFromUrl = urlParams.get("flowId");
		const error = urlParams.get("error");
		const errorDescription = urlParams.get("error_description");
		if (error) {
			oauthCodeProcessedFlag.value = true;
			if (tokenValidationFlag) tokenValidationFlag.value = true;
			onError?.(new Error(errorDescription || error || "OAuth authentication failed"));
			cleanupUrlParams$1();
			return;
		}
		if (!code || oauthCodeProcessedFlag.value) return;
		if (tokenValidationFlag?.value) return;
		const storedFlowId = sessionStorage.getItem(flowIdStorageKey);
		const flowIdToUse = currentFlowId.value || storedFlowId || flowIdFromUrl || state || null;
		if (!flowIdToUse) {
			oauthCodeProcessedFlag.value = true;
			onError?.(/* @__PURE__ */ new Error("Invalid flow. Missing flowId."));
			cleanupUrlParams$1();
			return;
		}
		oauthCodeProcessedFlag.value = true;
		if (tokenValidationFlag) tokenValidationFlag.value = true;
		onProcessingStart?.();
		if (!currentFlowId.value && setFlowId) setFlowId(flowIdToUse);
		(async () => {
			try {
				const response = await onSubmit({
					flowId: flowIdToUse,
					inputs: {
						code,
						...nonce && { nonce }
					}
				});
				onFlowChange?.(response);
				if (response?.flowStatus === "COMPLETE" || response?.status === "COMPLETE") onComplete?.();
				if (response?.flowStatus === "ERROR" || response?.status === "ERROR") onError?.(response);
				cleanupUrlParams$1();
			} catch (err) {
				onError?.(err);
				cleanupUrlParams$1();
			}
		})();
	}, { immediate: true });
}

//#endregion
//#region src/composables/v2/useOAuthCallback.ts
/**
* Removes OAuth-related query parameters from the current URL without triggering a navigation.
* This prevents re-processing the callback on subsequent renders or page interactions.
*/
function cleanupUrlParams() {
	if (typeof window === "undefined") return;
	const url = new URL(window.location.href);
	url.searchParams.delete("code");
	url.searchParams.delete("nonce");
	url.searchParams.delete("state");
	url.searchParams.delete("error");
	url.searchParams.delete("error_description");
	window.history.replaceState({}, "", url.toString());
}
/**
* Processes OAuth callbacks by detecting auth code in URL, resolving executionId, and submitting to server.
* Used by SignIn, SignUp, and AcceptInvite components.
*
* Vue composable equivalent of React's useOAuthCallback hook.
*/
function useOAuthCallback$1({ currentExecutionId, executionIdStorageKey = "thunderid_execution_id", isInitialized, isSubmitting, onComplete, onError, onFlowChange, onProcessingStart, onSubmit, processedFlag, setExecutionId, tokenValidationAttemptedFlag }) {
	/** Ensures OAuth code is submitted only once, even across reactive re-evaluations */
	const oauthCodeProcessedFlag = processedFlag ?? { value: false };
	/** Tracks whether token validation has been attempted; used to coordinate with AcceptInvite */
	const tokenValidationFlag = tokenValidationAttemptedFlag;
	watch(() => [
		isInitialized.value,
		currentExecutionId.value,
		isSubmitting?.value
	], ([initialized, , submitting]) => {
		if (!initialized || submitting) return;
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		const nonce = urlParams.get("nonce");
		const state = urlParams.get("state");
		const executionIdFromUrl = urlParams.get("executionId");
		const error = urlParams.get("error");
		const errorDescription = urlParams.get("error_description");
		if (error) {
			oauthCodeProcessedFlag.value = true;
			if (tokenValidationFlag) tokenValidationFlag.value = true;
			onError?.(new Error(errorDescription || error || "OAuth authentication failed"));
			cleanupUrlParams();
			return;
		}
		if (!code || oauthCodeProcessedFlag.value) return;
		if (tokenValidationFlag?.value) return;
		const storedExecutionId = sessionStorage.getItem(executionIdStorageKey);
		const executionIdToUse = currentExecutionId.value || storedExecutionId || executionIdFromUrl || state || null;
		if (!executionIdToUse) {
			oauthCodeProcessedFlag.value = true;
			onError?.(/* @__PURE__ */ new Error("Invalid flow. Missing executionId."));
			cleanupUrlParams();
			return;
		}
		oauthCodeProcessedFlag.value = true;
		if (tokenValidationFlag) tokenValidationFlag.value = true;
		onProcessingStart?.();
		if (!currentExecutionId.value && setExecutionId) setExecutionId(executionIdToUse);
		(async () => {
			try {
				const response = await onSubmit({
					executionId: executionIdToUse,
					inputs: {
						code,
						...nonce && { nonce }
					}
				});
				onFlowChange?.(response);
				if (response?.flowStatus === "COMPLETE" || response?.status === "COMPLETE") onComplete?.();
				if (response?.flowStatus === "ERROR" || response?.status === "ERROR") onError?.(response);
				cleanupUrlParams();
			} catch (err) {
				onError?.(err);
				cleanupUrlParams();
			}
		})();
	}, { immediate: true });
}

//#endregion
//#region src/components/primitives/Button/Button.ts
const Button = defineComponent({
	name: "Button",
	props: {
		color: {
			default: "primary",
			type: String
		},
		disabled: {
			default: false,
			type: Boolean
		},
		endIcon: {
			default: void 0,
			type: Object
		},
		fullWidth: {
			default: false,
			type: Boolean
		},
		loading: {
			default: false,
			type: Boolean
		},
		size: {
			default: "medium",
			type: String
		},
		startIcon: {
			default: void 0,
			type: Object
		},
		type: {
			default: "button",
			type: String
		},
		variant: {
			default: "solid",
			type: String
		}
	},
	emits: ["click"],
	setup(props, { slots, emit, attrs }) {
		return () => {
			return h("button", {
				class: [
					withVendorCSSClassPrefix("button"),
					withVendorCSSClassPrefix(`button--${props.variant}`),
					withVendorCSSClassPrefix(`button--${props.color}`),
					withVendorCSSClassPrefix(`button--${props.size}`),
					props.fullWidth ? withVendorCSSClassPrefix("button--full-width") : "",
					props.loading ? withVendorCSSClassPrefix("button--loading") : "",
					attrs.class || ""
				].filter(Boolean).join(" "),
				disabled: props.disabled || props.loading,
				onClick: (e) => emit("click", e),
				style: attrs.style,
				type: props.type
			}, [
				props.startIcon ? h("span", { class: withVendorCSSClassPrefix("button__start-icon") }, [props.startIcon]) : null,
				h("span", { class: withVendorCSSClassPrefix("button__content") }, slots["default"]?.()),
				props.endIcon ? h("span", { class: withVendorCSSClassPrefix("button__end-icon") }, [props.endIcon]) : null,
				props.loading ? h("span", {
					"aria-hidden": "true",
					class: withVendorCSSClassPrefix("button__spinner")
				}) : null
			]);
		};
	}
});
var Button_default = Button;

//#endregion
//#region src/components/primitives/Card/Card.ts
const Card = defineComponent({
	name: "Card",
	props: { variant: {
		default: "elevated",
		type: String
	} },
	setup(props, { slots, attrs }) {
		return () => h("div", {
			class: [
				withVendorCSSClassPrefix("card"),
				withVendorCSSClassPrefix(`card--${props.variant}`),
				attrs.class || ""
			].filter(Boolean).join(" "),
			style: attrs.style
		}, slots["default"]?.());
	}
});
var Card_default = Card;

//#endregion
//#region src/components/primitives/Alert/Alert.ts
const Alert = defineComponent({
	name: "Alert",
	props: {
		dismissible: {
			default: false,
			type: Boolean
		},
		severity: {
			default: "info",
			type: String
		}
	},
	emits: ["dismiss"],
	setup(props, { slots, emit, attrs }) {
		return () => h("div", {
			class: [
				withVendorCSSClassPrefix("alert"),
				withVendorCSSClassPrefix(`alert--${props.severity}`),
				attrs.class || ""
			].filter(Boolean).join(" "),
			role: "alert",
			style: attrs.style
		}, [h("div", { class: withVendorCSSClassPrefix("alert__content") }, slots["default"]?.()), props.dismissible ? h("button", {
			"aria-label": "Dismiss",
			class: withVendorCSSClassPrefix("alert__dismiss"),
			onClick: () => emit("dismiss"),
			type: "button"
		}, "×") : null]);
	}
});
var Alert_default = Alert;

//#endregion
//#region src/components/primitives/TextField/TextField.ts
const TextField = defineComponent({
	name: "TextField",
	props: {
		autoComplete: {
			default: void 0,
			type: String
		},
		disabled: {
			default: false,
			type: Boolean
		},
		error: {
			default: void 0,
			type: String
		},
		helperText: {
			default: void 0,
			type: String
		},
		label: {
			default: void 0,
			type: String
		},
		modelValue: {
			default: "",
			type: String
		},
		name: {
			default: void 0,
			type: String
		},
		placeholder: {
			default: void 0,
			type: String
		},
		required: {
			default: false,
			type: Boolean
		},
		type: {
			default: "text",
			type: String
		}
	},
	emits: ["update:modelValue", "blur"],
	setup(props, { emit, attrs }) {
		return () => {
			const hasError = !!props.error;
			const wrapperClass = [
				withVendorCSSClassPrefix("text-field"),
				hasError ? withVendorCSSClassPrefix("text-field--error") : "",
				attrs.class || ""
			].filter(Boolean).join(" ");
			let helperContent;
			if (hasError) helperContent = h("span", { class: withVendorCSSClassPrefix("text-field__error") }, props.error);
			else if (props.helperText) helperContent = h("span", { class: withVendorCSSClassPrefix("text-field__helper") }, props.helperText);
			else helperContent = null;
			return h("div", {
				class: wrapperClass,
				style: attrs.style
			}, [
				props.label ? h("label", {
					class: withVendorCSSClassPrefix("text-field__label"),
					for: props.name
				}, [props.label, props.required ? h("span", { class: withVendorCSSClassPrefix("text-field__required") }, " *") : null]) : null,
				h("input", {
					autocomplete: props.autoComplete,
					class: withVendorCSSClassPrefix("text-field__input"),
					"data-testid": attrs["data-testid"],
					disabled: props.disabled,
					id: props.name,
					name: props.name,
					onBlur: () => emit("blur"),
					onInput: (e) => emit("update:modelValue", e.target.value),
					placeholder: props.placeholder,
					required: props.required,
					type: props.type,
					value: props.modelValue
				}),
				helperContent
			]);
		};
	}
});
var TextField_default = TextField;

//#endregion
//#region src/components/primitives/Icons.ts
const defaultProps = {
	fill: "none",
	height: "16",
	stroke: "currentColor",
	"stroke-linecap": "round",
	"stroke-linejoin": "round",
	"stroke-width": "2",
	viewBox: "0 0 24 24",
	width: "16",
	xmlns: "http://www.w3.org/2000/svg"
};
const icon = (paths) => h("svg", { ...defaultProps }, paths);
const CheckIcon = () => icon([h("polyline", { points: "20 6 9 17 4 12" })]);
const XIcon = () => icon([h("line", {
	x1: "18",
	x2: "6",
	y1: "6",
	y2: "18"
}), h("line", {
	x1: "6",
	x2: "18",
	y1: "6",
	y2: "18"
})]);
const EyeIcon = () => icon([h("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), h("circle", {
	cx: "12",
	cy: "12",
	r: "3"
})]);
const EyeOffIcon = () => icon([
	h("path", { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" }),
	h("path", { d: "M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" }),
	h("line", {
		x1: "1",
		x2: "23",
		y1: "1",
		y2: "23"
	})
]);
const CircleAlertIcon = () => icon([
	h("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}),
	h("line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12"
	}),
	h("line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16"
	})
]);
const CircleCheckIcon = () => icon([h("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), h("polyline", { points: "22 4 12 14.01 9 11.01" })]);
const InfoIcon = () => icon([
	h("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}),
	h("line", {
		x1: "12",
		x2: "12",
		y1: "16",
		y2: "12"
	}),
	h("line", {
		x1: "12",
		x2: "12.01",
		y1: "8",
		y2: "8"
	})
]);
const TriangleAlertIcon = () => icon([
	h("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
	h("line", {
		x1: "12",
		x2: "12",
		y1: "9",
		y2: "13"
	}),
	h("line", {
		x1: "12",
		x2: "12.01",
		y1: "17",
		y2: "17"
	})
]);
const PlusIcon = () => icon([h("line", {
	x1: "12",
	x2: "12",
	y1: "5",
	y2: "19"
}), h("line", {
	x1: "5",
	x2: "19",
	y1: "12",
	y2: "12"
})]);
const LogOutIcon = () => icon([
	h("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
	h("polyline", { points: "16 17 21 12 16 7" }),
	h("line", {
		x1: "21",
		x2: "9",
		y1: "12",
		y2: "12"
	})
]);
const UserIcon = () => icon([h("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), h("circle", {
	cx: "12",
	cy: "7",
	r: "4"
})]);
const ArrowLeftRightIcon = () => icon([
	h("polyline", { points: "7 16 3 12 7 8" }),
	h("line", {
		x1: "21",
		x2: "3",
		y1: "12",
		y2: "12"
	}),
	h("polyline", { points: "17 8 21 12 17 16" })
]);
const BuildingIcon = () => icon([
	h("rect", {
		height: "20",
		rx: "2",
		ry: "2",
		width: "16",
		x: "4",
		y: "2"
	}),
	h("line", {
		x1: "9",
		x2: "9",
		y1: "6",
		y2: "6.01"
	}),
	h("line", {
		x1: "15",
		x2: "15",
		y1: "6",
		y2: "6.01"
	}),
	h("line", {
		x1: "9",
		x2: "9",
		y1: "10",
		y2: "10.01"
	}),
	h("line", {
		x1: "15",
		x2: "15",
		y1: "10",
		y2: "10.01"
	}),
	h("line", {
		x1: "9",
		x2: "9",
		y1: "14",
		y2: "14.01"
	}),
	h("line", {
		x1: "15",
		x2: "15",
		y1: "14",
		y2: "14.01"
	}),
	h("line", {
		x1: "9",
		x2: "15",
		y1: "18",
		y2: "18"
	})
]);
const ChevronDownIcon = () => icon([h("polyline", { points: "6 9 12 15 18 9" })]);
const GlobeIcon = () => icon([
	h("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}),
	h("line", {
		x1: "2",
		x2: "22",
		y1: "12",
		y2: "12"
	}),
	h("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
]);
const PencilIcon = () => icon([h("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" })]);

//#endregion
//#region src/components/primitives/PasswordField/PasswordField.ts
const PasswordField = defineComponent({
	name: "PasswordField",
	props: {
		disabled: {
			default: false,
			type: Boolean
		},
		error: {
			default: void 0,
			type: String
		},
		label: {
			default: void 0,
			type: String
		},
		modelValue: {
			default: "",
			type: String
		},
		name: {
			default: void 0,
			type: String
		},
		placeholder: {
			default: void 0,
			type: String
		},
		required: {
			default: false,
			type: Boolean
		}
	},
	emits: ["update:modelValue", "blur"],
	setup(props, { emit, attrs }) {
		const visible = ref(false);
		return () => {
			const hasError = !!props.error;
			return h("div", {
				class: [
					withVendorCSSClassPrefix("password-field"),
					hasError ? withVendorCSSClassPrefix("password-field--error") : "",
					attrs.class || ""
				].filter(Boolean).join(" "),
				style: attrs.style
			}, [
				props.label ? h("label", {
					class: withVendorCSSClassPrefix("password-field__label"),
					for: props.name
				}, [props.label, props.required ? h("span", { class: withVendorCSSClassPrefix("password-field__required") }, " *") : null]) : null,
				h("div", { class: withVendorCSSClassPrefix("password-field__wrapper") }, [h("input", {
					class: withVendorCSSClassPrefix("password-field__input"),
					"data-testid": attrs["data-testid"],
					disabled: props.disabled,
					id: props.name,
					name: props.name,
					onBlur: () => emit("blur"),
					onInput: (e) => emit("update:modelValue", e.target.value),
					placeholder: props.placeholder,
					required: props.required,
					type: visible.value ? "text" : "password",
					value: props.modelValue
				}), h("button", {
					"aria-label": visible.value ? "Hide password" : "Show password",
					class: withVendorCSSClassPrefix("password-field__toggle"),
					onClick: () => {
						visible.value = !visible.value;
					},
					tabindex: -1,
					type: "button"
				}, visible.value ? EyeOffIcon() : EyeIcon())]),
				hasError ? h("span", { class: withVendorCSSClassPrefix("password-field__error") }, props.error) : null
			]);
		};
	}
});
var PasswordField_default = PasswordField;

//#endregion
//#region src/components/primitives/Select/Select.ts
const Select = defineComponent({
	name: "ThunderIDSelect",
	props: {
		disabled: {
			default: false,
			type: Boolean
		},
		error: {
			default: void 0,
			type: String
		},
		helperText: {
			default: void 0,
			type: String
		},
		label: {
			default: void 0,
			type: String
		},
		modelValue: {
			default: "",
			type: String
		},
		name: {
			default: void 0,
			type: String
		},
		options: {
			default: () => [],
			type: Array
		},
		placeholder: {
			default: void 0,
			type: String
		},
		required: {
			default: false,
			type: Boolean
		}
	},
	emits: ["update:modelValue"],
	setup(props, { emit, attrs }) {
		return () => {
			const hasError = !!props.error;
			const wrapperClass = [
				withVendorCSSClassPrefix("select"),
				hasError ? withVendorCSSClassPrefix("select--error") : "",
				attrs.class || ""
			].filter(Boolean).join(" ");
			let helperContent;
			if (hasError) helperContent = h("span", { class: withVendorCSSClassPrefix("select__error") }, props.error);
			else if (props.helperText) helperContent = h("span", { class: withVendorCSSClassPrefix("select__helper") }, props.helperText);
			else helperContent = null;
			return h("div", {
				class: wrapperClass,
				style: attrs.style
			}, [
				props.label ? h("label", {
					class: withVendorCSSClassPrefix("select__label"),
					for: props.name
				}, [props.label, props.required ? h("span", { class: withVendorCSSClassPrefix("select__required") }, " *") : null]) : null,
				h("select", {
					class: withVendorCSSClassPrefix("select__input"),
					"data-testid": attrs["data-testid"],
					disabled: props.disabled,
					id: props.name,
					name: props.name,
					onChange: (e) => emit("update:modelValue", e.target.value),
					required: props.required,
					value: props.modelValue
				}, [props.placeholder ? h("option", {
					disabled: true,
					value: ""
				}, props.placeholder) : null, ...props.options.map((opt) => h("option", {
					key: opt.value,
					value: opt.value
				}, opt.label))]),
				helperContent
			]);
		};
	}
});
var Select_default = Select;

//#endregion
//#region src/components/primitives/Checkbox/Checkbox.ts
const Checkbox = defineComponent({
	name: "ThunderIDCheckbox",
	props: {
		disabled: {
			default: false,
			type: Boolean
		},
		error: {
			default: void 0,
			type: String
		},
		label: {
			default: void 0,
			type: String
		},
		modelValue: {
			default: false,
			type: Boolean
		},
		name: {
			default: void 0,
			type: String
		},
		required: {
			default: false,
			type: Boolean
		}
	},
	emits: ["update:modelValue"],
	setup(props, { emit, attrs }) {
		return () => {
			return h("div", {
				class: [
					withVendorCSSClassPrefix("checkbox"),
					props.error ? withVendorCSSClassPrefix("checkbox--error") : "",
					attrs.class || ""
				].filter(Boolean).join(" "),
				style: attrs.style
			}, [h("label", { class: withVendorCSSClassPrefix("checkbox__wrapper") }, [h("input", {
				checked: props.modelValue,
				class: withVendorCSSClassPrefix("checkbox__input"),
				"data-testid": attrs["data-testid"],
				disabled: props.disabled,
				id: props.name,
				name: props.name,
				onChange: (e) => emit("update:modelValue", e.target.checked),
				required: props.required,
				type: "checkbox"
			}), props.label ? h("span", { class: withVendorCSSClassPrefix("checkbox__label") }, props.label) : null]), props.error ? h("span", { class: withVendorCSSClassPrefix("checkbox__error") }, props.error) : null]);
		};
	}
});
var Checkbox_default = Checkbox;

//#endregion
//#region src/components/primitives/DatePicker/DatePicker.ts
const DatePicker = defineComponent({
	name: "ThunderIDDatePicker",
	props: {
		disabled: {
			default: false,
			type: Boolean
		},
		error: {
			default: void 0,
			type: String
		},
		label: {
			default: void 0,
			type: String
		},
		modelValue: {
			default: "",
			type: String
		},
		name: {
			default: void 0,
			type: String
		},
		placeholder: {
			default: void 0,
			type: String
		},
		required: {
			default: false,
			type: Boolean
		}
	},
	emits: ["update:modelValue"],
	setup(props, { emit, attrs }) {
		return () => {
			const hasError = !!props.error;
			return h("div", {
				class: [
					withVendorCSSClassPrefix("date-picker"),
					hasError ? withVendorCSSClassPrefix("date-picker--error") : "",
					attrs.class || ""
				].filter(Boolean).join(" "),
				style: attrs.style
			}, [
				props.label ? h("label", {
					class: withVendorCSSClassPrefix("date-picker__label"),
					for: props.name
				}, [props.label, props.required ? h("span", { class: withVendorCSSClassPrefix("date-picker__required") }, " *") : null]) : null,
				h("input", {
					class: withVendorCSSClassPrefix("date-picker__input"),
					"data-testid": attrs["data-testid"],
					disabled: props.disabled,
					id: props.name,
					name: props.name,
					onInput: (e) => emit("update:modelValue", e.target.value),
					placeholder: props.placeholder,
					required: props.required,
					type: "date",
					value: props.modelValue
				}),
				hasError ? h("span", { class: withVendorCSSClassPrefix("date-picker__error") }, props.error) : null
			]);
		};
	}
});
var DatePicker_default = DatePicker;

//#endregion
//#region src/components/primitives/OtpField/OtpField.ts
const OtpField = defineComponent({
	name: "OtpField",
	props: {
		disabled: {
			default: false,
			type: Boolean
		},
		error: {
			default: void 0,
			type: String
		},
		label: {
			default: void 0,
			type: String
		},
		length: {
			default: 6,
			type: Number
		},
		modelValue: {
			default: "",
			type: String
		},
		name: {
			default: void 0,
			type: String
		},
		required: {
			default: false,
			type: Boolean
		}
	},
	emits: ["update:modelValue"],
	setup(props, { emit, attrs }) {
		const inputRefs = ref([]);
		const setRef = (el, index) => {
			if (el) inputRefs.value[index] = el;
		};
		const handleInput = (index, e) => {
			const target = e.target;
			const val = target.value.replace(/\D/g, "").slice(0, 1);
			target.value = val;
			const current = (props.modelValue || "").split("");
			while (current.length < props.length) current.push("");
			current[index] = val;
			emit("update:modelValue", current.join(""));
			if (val && index < props.length - 1) nextTick(() => inputRefs.value[index + 1]?.focus());
		};
		const handleKeydown = (index, e) => {
			if (e.key === "Backspace" && !e.target.value && index > 0) nextTick(() => inputRefs.value[index - 1]?.focus());
		};
		return () => {
			const digits = (props.modelValue || "").split("");
			while (digits.length < props.length) digits.push("");
			return h("div", {
				class: [withVendorCSSClassPrefix("otp-field"), attrs.class || ""].filter(Boolean).join(" "),
				style: attrs.style
			}, [
				props.label ? h("label", { class: withVendorCSSClassPrefix("otp-field__label") }, [props.label, props.required ? h("span", { class: withVendorCSSClassPrefix("otp-field__required") }, " *") : null]) : null,
				h("div", { class: withVendorCSSClassPrefix("otp-field__inputs") }, Array.from({ length: props.length }, (_, i) => h("input", {
					"aria-label": `Digit ${i + 1}`,
					class: withVendorCSSClassPrefix("otp-field__digit"),
					disabled: props.disabled,
					inputmode: "numeric",
					key: i,
					maxlength: 1,
					onInput: (e) => handleInput(i, e),
					onKeydown: (e) => handleKeydown(i, e),
					ref: (el) => setRef(el, i),
					type: "text",
					value: digits[i]
				}))),
				props.error ? h("span", { class: withVendorCSSClassPrefix("otp-field__error") }, props.error) : null
			]);
		};
	}
});
var OtpField_default = OtpField;

//#endregion
//#region src/components/primitives/Typography/Typography.ts
const Typography = defineComponent({
	name: "Typography",
	props: {
		component: {
			default: void 0,
			type: String
		},
		variant: {
			default: "body1",
			type: String
		}
	},
	setup(props, { slots, attrs }) {
		return () => {
			return h(props.component || {
				body1: "p",
				body2: "p",
				caption: "span",
				h1: "h1",
				h2: "h2",
				h3: "h3",
				h4: "h4",
				h5: "h5",
				h6: "h6",
				overline: "span",
				subtitle1: "h6",
				subtitle2: "h6"
			}[props.variant] || "p", {
				class: [
					withVendorCSSClassPrefix("typography"),
					withVendorCSSClassPrefix(`typography--${props.variant}`),
					attrs.class || ""
				].filter(Boolean).join(" "),
				style: attrs.style
			}, slots["default"]?.());
		};
	}
});
var Typography_default = Typography;

//#endregion
//#region src/components/primitives/Divider/Divider.ts
const Divider = defineComponent({
	name: "Divider",
	props: { orientation: {
		default: "horizontal",
		type: String
	} },
	setup(props, { slots, attrs }) {
		return () => {
			const hasContent = !!slots["default"];
			const cssClass = [
				withVendorCSSClassPrefix("divider"),
				withVendorCSSClassPrefix(`divider--${props.orientation}`),
				hasContent ? withVendorCSSClassPrefix("divider--with-content") : "",
				attrs.class || ""
			].filter(Boolean).join(" ");
			if (hasContent) return h("div", {
				class: cssClass,
				role: "separator",
				style: attrs.style
			}, [
				h("span", { class: withVendorCSSClassPrefix("divider__line") }),
				h("span", { class: withVendorCSSClassPrefix("divider__content") }, slots["default"]?.()),
				h("span", { class: withVendorCSSClassPrefix("divider__line") })
			]);
			return h("hr", {
				class: cssClass,
				role: "separator",
				style: attrs.style
			});
		};
	}
});
var Divider_default = Divider;

//#endregion
//#region src/components/primitives/Logo/Logo.ts
const Logo = defineComponent({
	name: "Logo",
	props: {
		alt: {
			default: "Logo",
			type: String
		},
		height: {
			default: void 0,
			type: [String, Number]
		},
		href: {
			default: void 0,
			type: String
		},
		src: {
			default: void 0,
			type: String
		},
		width: {
			default: void 0,
			type: [String, Number]
		}
	},
	setup(props, { attrs }) {
		return () => {
			const img = h("img", {
				alt: props.alt,
				class: withVendorCSSClassPrefix("logo__image"),
				height: props.height,
				src: props.src,
				width: props.width
			});
			if (props.href) return h("a", {
				class: [withVendorCSSClassPrefix("logo"), attrs.class || ""].filter(Boolean).join(" "),
				href: props.href,
				style: attrs.style
			}, [img]);
			return h("div", {
				class: [withVendorCSSClassPrefix("logo"), attrs.class || ""].filter(Boolean).join(" "),
				style: attrs.style
			}, [img]);
		};
	}
});
var Logo_default = Logo;

//#endregion
//#region src/components/primitives/Spinner/Spinner.ts
const Spinner = defineComponent({
	name: "Spinner",
	props: { size: {
		default: "medium",
		type: String
	} },
	setup(props, { attrs }) {
		return () => h("div", {
			"aria-label": "Loading",
			class: [
				withVendorCSSClassPrefix("spinner"),
				withVendorCSSClassPrefix(`spinner--${props.size}`),
				attrs.class || ""
			].filter(Boolean).join(" "),
			role: "status",
			style: attrs.style
		}, [h("svg", {
			class: withVendorCSSClassPrefix("spinner__svg"),
			fill: "none",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg"
		}, [h("circle", {
			class: withVendorCSSClassPrefix("spinner__circle"),
			cx: "12",
			cy: "12",
			r: "10",
			stroke: "currentColor",
			"stroke-dasharray": "31.4 31.4",
			"stroke-linecap": "round",
			"stroke-width": "3"
		})])]);
	}
});
var Spinner_default = Spinner;

//#endregion
//#region src/components/actions/BaseSignInButton.ts
/**
* BaseSignInButton — styled sign-in button with customization support.
*
* By default, renders a styled Button primitive with contents from the slot or fallback text.
* Set `unstyled={true}` to render a plain <button> for full customization control.
*
* @example
* <!-- Default styled button with custom text -->
* <BaseSignInButton>Custom Text</BaseSignInButton>
*
* @example
* <!-- Unstyled button for full customization -->
* <BaseSignInButton unstyled class="my-custom-styles">Custom Content</BaseSignInButton>
*/
const BaseSignInButton = defineComponent({
	name: "BaseSignInButton",
	props: {
		disabled: {
			default: false,
			type: Boolean
		},
		isLoading: {
			default: false,
			type: Boolean
		},
		unstyled: {
			default: false,
			type: Boolean
		}
	},
	emits: ["click"],
	setup(props, { slots, emit, attrs }) {
		const handleClick = (e) => {
			if (!props.disabled && !props.isLoading) emit("click", e);
		};
		return () => {
			if (props.unstyled) return h("button", {
				class: [withVendorCSSClassPrefix("sign-in-button-wrapper"), attrs.class || ""].filter(Boolean).join(" "),
				disabled: props.disabled || props.isLoading,
				onClick: handleClick,
				style: attrs.style,
				type: "button"
			}, slots.default ? slots.default({ isLoading: props.isLoading }) : "Sign In");
			return h(Button_default, {
				class: [withVendorCSSClassPrefix("sign-in-button"), attrs.class || ""].filter(Boolean).join(" "),
				disabled: props.disabled || props.isLoading,
				loading: props.isLoading,
				onClick: handleClick,
				style: attrs.style,
				type: "button"
			}, slots.default ? () => slots.default({ isLoading: props.isLoading }) : () => "Sign In");
		};
	}
});
var BaseSignInButton_default = BaseSignInButton;

//#endregion
//#region src/components/actions/SignInButton.ts
/**
* SignInButton — triggers `signIn()` from the ThunderID context.
*
* If a custom `signInUrl` is configured, navigates to it instead.
* Falls back to i18n translation for the button text.
*/
const SignInButton = defineComponent({
	name: "SignInButton",
	props: { signInOptions: {
		default: void 0,
		type: Object
	} },
	emits: ["click", "error"],
	setup(props, { slots, emit, attrs }) {
		const { signIn, signInUrl, signInOptions: contextSignInOptions } = useThunderID_default();
		const isLoading = ref(false);
		const handleSignIn = async (e) => {
			try {
				isLoading.value = true;
				if (signInUrl) navigate$1(signInUrl);
				else await signIn(props.signInOptions ?? contextSignInOptions);
				if (e) emit("click", e);
			} catch (error) {
				emit("error", error);
				throw new ThunderIDRuntimeError$1(`Sign in failed: ${error instanceof Error ? error.message : String(error)}`, "SignInButton-handleSignIn-RuntimeError-001", "vue", "Something went wrong while trying to sign in. Please try again later.");
			} finally {
				isLoading.value = false;
			}
		};
		return () => {
			const slotContent = slots["default"] ? () => slots["default"]({ isLoading: isLoading.value }) : void 0;
			return h(BaseSignInButton_default, {
				class: attrs.class,
				isLoading: isLoading.value,
				onClick: handleSignIn,
				style: attrs.style
			}, slotContent);
		};
	}
});
var SignInButton_default = SignInButton;

//#endregion
//#region src/components/actions/BaseSignOutButton.ts
/**
* BaseSignOutButton — styled sign-out button with customization support.
*
* By default, renders a styled Button primitive with contents from the slot or fallback text.
* Set `unstyled={true}` to render a plain <button> for full customization control.
*
* @example
* <!-- Default styled button with custom text -->
* <BaseSignOutButton>Custom Text</BaseSignOutButton>
*
* @example
* <!-- Unstyled button for full customization -->
* <BaseSignOutButton unstyled class="my-custom-styles">Custom Content</BaseSignOutButton>
*/
const BaseSignOutButton = defineComponent({
	name: "BaseSignOutButton",
	props: {
		disabled: {
			default: false,
			type: Boolean
		},
		isLoading: {
			default: false,
			type: Boolean
		},
		unstyled: {
			default: false,
			type: Boolean
		}
	},
	emits: ["click"],
	setup(props, { slots, emit, attrs }) {
		const handleClick = (e) => {
			if (!props.disabled && !props.isLoading) emit("click", e);
		};
		return () => {
			if (props.unstyled) return h("button", {
				class: [withVendorCSSClassPrefix("sign-out-button-wrapper"), attrs.class || ""].filter(Boolean).join(" "),
				disabled: props.disabled || props.isLoading,
				onClick: handleClick,
				style: attrs.style,
				type: "button"
			}, slots.default ? slots.default({ isLoading: props.isLoading }) : "Sign Out");
			return h(Button_default, {
				class: [withVendorCSSClassPrefix("sign-out-button"), attrs.class || ""].filter(Boolean).join(" "),
				disabled: props.disabled || props.isLoading,
				loading: props.isLoading,
				onClick: handleClick,
				style: attrs.style,
				type: "button"
			}, slots.default ? () => slots.default({ isLoading: props.isLoading }) : () => "Sign Out");
		};
	}
});
var BaseSignOutButton_default = BaseSignOutButton;

//#endregion
//#region src/components/actions/SignOutButton.ts
/**
* SignOutButton — triggers `signOut()` from the ThunderID context.
*/
const SignOutButton = defineComponent({
	name: "SignOutButton",
	emits: ["click", "error"],
	setup(_, { slots, emit, attrs }) {
		const { signOut } = useThunderID_default();
		const isLoading = ref(false);
		const handleSignOut = async (e) => {
			try {
				isLoading.value = true;
				await signOut();
				if (e) emit("click", e);
			} catch (error) {
				emit("error", error);
				throw new ThunderIDRuntimeError$1(`Sign out failed: ${error instanceof Error ? error.message : String(error)}`, "SignOutButton-handleSignOut-RuntimeError-001", "vue", "Something went wrong while trying to sign out. Please try again later.");
			} finally {
				isLoading.value = false;
			}
		};
		return () => {
			const slotContent = slots["default"] ? () => slots["default"]({ isLoading: isLoading.value }) : void 0;
			return h(BaseSignOutButton_default, {
				class: attrs.class,
				isLoading: isLoading.value,
				onClick: handleSignOut,
				style: attrs.style
			}, slotContent);
		};
	}
});
var SignOutButton_default = SignOutButton;

//#endregion
//#region src/components/actions/BaseSignUpButton.ts
/**
* BaseSignUpButton — styled sign-up button with customization support.
*
* By default, renders a styled Button primitive with contents from the slot or fallback text.
* Set `unstyled={true}` to render a plain <button> for full customization control.
*
* @example
* <!-- Default styled button with custom text -->
* <BaseSignUpButton>Custom Text</BaseSignUpButton>
*
* @example
* <!-- Unstyled button for full customization -->
* <BaseSignUpButton unstyled class="my-custom-styles">Custom Content</BaseSignUpButton>
*/
const BaseSignUpButton = defineComponent({
	name: "BaseSignUpButton",
	props: {
		disabled: {
			default: false,
			type: Boolean
		},
		isLoading: {
			default: false,
			type: Boolean
		},
		unstyled: {
			default: false,
			type: Boolean
		}
	},
	emits: ["click"],
	setup(props, { slots, emit, attrs }) {
		const handleClick = (e) => {
			if (!props.disabled && !props.isLoading) emit("click", e);
		};
		return () => {
			if (props.unstyled) return h("button", {
				class: [withVendorCSSClassPrefix("sign-up-button-wrapper"), attrs.class || ""].filter(Boolean).join(" "),
				disabled: props.disabled || props.isLoading,
				onClick: handleClick,
				style: attrs.style,
				type: "button"
			}, slots.default ? slots.default({ isLoading: props.isLoading }) : "Sign Up");
			return h(Button_default, {
				class: [withVendorCSSClassPrefix("sign-up-button"), attrs.class || ""].filter(Boolean).join(" "),
				color: "primary",
				disabled: props.disabled || props.isLoading,
				loading: props.isLoading,
				onClick: handleClick,
				style: attrs.style,
				type: "button",
				variant: "solid"
			}, slots.default ? () => slots.default({ isLoading: props.isLoading }) : () => "Sign Up");
		};
	}
});
var BaseSignUpButton_default = BaseSignUpButton;

//#endregion
//#region src/components/actions/SignUpButton.ts
/**
* SignUpButton — triggers `signUp()` from the ThunderID context.
*
* If a custom `signUpUrl` is configured, navigates to it instead.
* Falls back to i18n translation for the button text.
*/
const SignUpButton = defineComponent({
	name: "SignUpButton",
	emits: ["click", "error"],
	setup(_, { slots, emit, attrs }) {
		const { signUp, signUpUrl } = useThunderID_default();
		const isLoading = ref(false);
		const handleSignUp = async (e) => {
			try {
				isLoading.value = true;
				if (signUpUrl) navigate$1(signUpUrl);
				else await signUp();
				if (e) emit("click", e);
			} catch (error) {
				emit("error", error);
				throw new ThunderIDRuntimeError$1(`Sign up failed: ${error instanceof Error ? error.message : String(error)}`, "SignUpButton-handleSignUp-RuntimeError-001", "vue", "Something went wrong while trying to sign up. Please try again later.");
			} finally {
				isLoading.value = false;
			}
		};
		return () => {
			const slotContent = slots["default"] ? () => slots["default"]({ isLoading: isLoading.value }) : void 0;
			return h(BaseSignUpButton_default, {
				class: attrs.class,
				isLoading: isLoading.value,
				onClick: handleSignUp,
				style: attrs.style
			}, slotContent);
		};
	}
});
var SignUpButton_default = SignUpButton;

//#endregion
//#region src/components/auth/Callback.ts
const logger$4 = createVueLogger("Callback");
/**
* Callback — headless component that handles OAuth callback parameter forwarding.
*
* Extracts OAuth parameters (code, state, error) from the URL and forwards them
* to the original component that initiated the OAuth flow.
*
* Works standalone using the browser navigate utility (History API) for navigation by default.
* Pass an `onNavigate` prop to enable framework-specific navigation (e.g., via Vue Router).
*
* Flow: Extract OAuth parameters from URL -> Parse state parameter -> Redirect to original path with parameters
*/
const Callback = defineComponent({
	name: "Callback",
	props: {
		onError: {
			default: void 0,
			type: Function
		},
		onNavigate: {
			default: void 0,
			type: Function
		}
	},
	setup(props) {
		const navigate$2 = (path) => {
			if (props.onNavigate) props.onNavigate(path);
			else navigate$1(path);
		};
		onMounted(() => {
			let returnPath = "/";
			try {
				const urlParams = new URLSearchParams(window.location.search);
				const code = urlParams.get("code");
				const state = urlParams.get("state");
				const nonce = urlParams.get("nonce");
				const oauthError = urlParams.get("error");
				const errorDescription = urlParams.get("error_description");
				if (!code && !state && !oauthError) return;
				if (window.opener) {
					window.opener.postMessage({
						code,
						error: oauthError,
						errorDescription,
						nonce,
						state
					}, window.location.origin);
					return;
				}
				if (!state) throw new Error("Missing OAuth state parameter - possible security issue");
				const storedData = sessionStorage.getItem(`thunderid_oauth_${state}`);
				if (!storedData) {
					if (oauthError) {
						const errorMsg = errorDescription || oauthError || "OAuth authentication failed";
						const err = new Error(errorMsg);
						props.onError?.(err);
						const params$1 = new URLSearchParams();
						params$1.set("error", oauthError);
						if (errorDescription) params$1.set("error_description", errorDescription);
						navigate$2(`/?${params$1.toString()}`);
						return;
					}
					throw new Error("Invalid OAuth state - possible CSRF attack");
				}
				const { path, timestamp } = JSON.parse(storedData);
				returnPath = path || "/";
				if (Date.now() - timestamp > 3e5) {
					sessionStorage.removeItem(`thunderid_oauth_${state}`);
					throw new Error("OAuth state expired - please try again");
				}
				sessionStorage.removeItem(`thunderid_oauth_${state}`);
				if (oauthError) {
					const errorMsg = errorDescription || oauthError || "OAuth authentication failed";
					const err = new Error(errorMsg);
					props.onError?.(err);
					const params$1 = new URLSearchParams();
					params$1.set("error", oauthError);
					if (errorDescription) params$1.set("error_description", errorDescription);
					navigate$2(`${returnPath}?${params$1.toString()}`);
					return;
				}
				if (!code) throw new Error("Missing OAuth authorization code");
				const params = new URLSearchParams();
				params.set("code", code);
				if (nonce) params.set("nonce", nonce);
				navigate$2(`${returnPath}?${params.toString()}`);
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : "OAuth callback processing failed";
				logger$4.error("OAuth callback error:", err);
				props.onError?.(err instanceof Error ? err : new Error(errorMessage));
				const params = new URLSearchParams();
				params.set("error", "callback_error");
				params.set("error_description", errorMessage);
				navigate$2(`${returnPath}?${params.toString()}`);
			}
		});
		return () => null;
	}
});
var Callback_default = Callback;

//#endregion
//#region src/components/adapters/FacebookButton.ts
/**
* Facebook Sign-In Button Component.
* Handles authentication with Facebook identity provider.
*/
const FacebookButton = defineComponent({
	name: "FacebookButton",
	props: { isLoading: {
		default: false,
		type: Boolean
	} },
	emits: ["click"],
	setup(props, { slots, emit, attrs }) {
		const { t } = useI18n_default();
		const facebookIcon = () => h("svg", {
			height: "18",
			viewBox: "0 0 512 512",
			width: "18",
			xmlns: "http://www.w3.org/2000/svg"
		}, [h("path", {
			d: "M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h384c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z",
			fill: "#1976D2"
		}), h("path", {
			d: "M432,256h-80v-64c0-17.664,14.336-16,32-16h32V96h-64l0,0c-53.024,0-96,42.976-96,96v64h-64v80h64v176h96V336h48L432,256z",
			fill: "#FAFAFA"
		})]);
		return () => h(Button_default, {
			...attrs,
			color: "primary",
			disabled: props.isLoading,
			fullWidth: true,
			type: "button",
			variant: "solid",
			...slots["default"] ? {} : { startIcon: facebookIcon() },
			onClick: (e) => emit("click", e)
		}, () => slots["default"]?.({ isLoading: props.isLoading }) ?? (t("elements.buttons.facebook.text") || "Sign in with Facebook"));
	}
});
var FacebookButton_default = FacebookButton;

//#endregion
//#region src/components/adapters/GitHubButton.ts
/**
* GitHub Sign-In Button Component.
* Handles authentication with GitHub identity provider.
*/
const GitHubButton = defineComponent({
	name: "GitHubButton",
	props: { isLoading: {
		default: false,
		type: Boolean
	} },
	emits: ["click"],
	setup(props, { slots, emit, attrs }) {
		const { t } = useI18n_default();
		const gitHubIcon = () => h("svg", {
			height: "18",
			viewBox: "0 0 67.91 66.233",
			width: "18",
			xmlns: "http://www.w3.org/2000/svg"
		}, [h("g", { transform: "translate(-386.96 658.072)" }, [h("path", {
			d: "M420.915-658.072a33.956,33.956,0,0,0-33.955,33.955,33.963,33.963,0,0,0,23.221,32.22c1.7.314,2.32-.737,2.32-1.633,0-.81-.031-3.484-.046-6.322-9.446,2.054-11.44-4.006-11.44-4.006-1.545-3.925-3.77-4.968-3.77-4.968-3.081-2.107.232-2.064.232-2.064,3.41.239,5.205,3.5,5.205,3.5,3.028,5.19,7.943,3.69,9.881,2.822a7.23,7.23,0,0,1,2.156-4.54c-7.542-.859-15.47-3.77-15.47-16.781a13.141,13.141,0,0,1,3.5-9.114,12.2,12.2,0,0,1,.329-8.986s2.851-.913,9.34,3.48a32.545,32.545,0,0,1,8.5-1.143,32.629,32.629,0,0,1,8.506,1.143c6.481-4.393,9.328-3.48,9.328-3.48a12.185,12.185,0,0,1,.333,8.986,13.115,13.115,0,0,1,3.495,9.114c0,13.042-7.943,15.913-15.5,16.754,1.218,1.054,2.3,3.12,2.3,6.288,0,4.543-.039,8.2-.039,9.318,0,.9.611,1.962,2.332,1.629a33.959,33.959,0,0,0,23.2-32.215,33.955,33.955,0,0,0-33.955-33.955",
			fill: "currentColor"
		})])]);
		return () => h(Button_default, {
			...attrs,
			color: "secondary",
			disabled: props.isLoading,
			fullWidth: true,
			type: "button",
			variant: "solid",
			...slots["default"] ? {} : { startIcon: gitHubIcon() },
			onClick: (e) => emit("click", e)
		}, () => slots["default"]?.({ isLoading: props.isLoading }) ?? (t("elements.buttons.github.text") || "Sign in with GitHub"));
	}
});
var GitHubButton_default = GitHubButton;

//#endregion
//#region src/components/adapters/GoogleButton.ts
/**
* Google Sign-In Button Component.
* Handles authentication with Google identity provider.
*/
const GoogleButton = defineComponent({
	name: "GoogleButton",
	props: { isLoading: {
		default: false,
		type: Boolean
	} },
	emits: ["click"],
	setup(props, { slots, emit, attrs }) {
		const { t } = useI18n_default();
		const googleIcon = () => h("svg", {
			height: "18",
			viewBox: "0 0 67.91 67.901",
			width: "18",
			xmlns: "http://www.w3.org/2000/svg"
		}, [h("g", { transform: "translate(-0.001 -0.001)" }, [
			h("path", {
				d: "M15.049,160.965l-2.364,8.824-8.639.183a34.011,34.011,0,0,1-.25-31.7h0l7.691,1.41,3.369,7.645a20.262,20.262,0,0,0,.19,13.642Z",
				fill: "#fbbb00",
				transform: "translate(0 -119.93)"
			}),
			h("path", {
				d: "M294.24,208.176A33.939,33.939,0,0,1,282.137,241h0l-9.687-.494-1.371-8.559a20.235,20.235,0,0,0,8.706-10.333H261.628V208.176Z",
				fill: "#518ef8",
				transform: "translate(-226.93 -180.567)"
			}),
			h("path", {
				d: "M81.668,328.8h0a33.962,33.962,0,0,1-51.161-10.387l11-9.006a20.192,20.192,0,0,0,29.1,10.338Z",
				fill: "#28b446",
				transform: "translate(-26.463 -268.374)"
			}),
			h("path", {
				d: "M80.451,7.816l-11,9A20.19,20.19,0,0,0,39.686,27.393l-11.06-9.055h0A33.959,33.959,0,0,1,80.451,7.816Z",
				fill: "#f14336",
				transform: "translate(-24.828)"
			})
		])]);
		return () => h(Button_default, {
			...attrs,
			color: "secondary",
			disabled: props.isLoading,
			fullWidth: true,
			type: "button",
			variant: "solid",
			...slots["default"] ? {} : { startIcon: googleIcon() },
			onClick: (e) => emit("click", e)
		}, () => slots["default"]?.({ isLoading: props.isLoading }) ?? (t("elements.buttons.google.text") || "Sign in with Google"));
	}
});
var GoogleButton_default = GoogleButton;

//#endregion
//#region src/components/adapters/MicrosoftButton.ts
/**
* Microsoft Sign-In Button Component.
* Handles authentication with Microsoft identity provider.
*/
const MicrosoftButton = defineComponent({
	name: "MicrosoftButton",
	props: { isLoading: {
		default: false,
		type: Boolean
	} },
	emits: ["click"],
	setup(props, { slots, emit, attrs }) {
		const { t } = useI18n_default();
		const microsoftIcon = () => h("svg", {
			height: "14",
			viewBox: "0 0 23 23",
			width: "14",
			xmlns: "http://www.w3.org/2000/svg"
		}, [
			h("path", {
				d: "M0 0h23v23H0z",
				fill: "#f3f3f3"
			}),
			h("path", {
				d: "M1 1h10v10H1z",
				fill: "#f35325"
			}),
			h("path", {
				d: "M12 1h10v10H12z",
				fill: "#81bc06"
			}),
			h("path", {
				d: "M1 12h10v10H1z",
				fill: "#05a6f0"
			}),
			h("path", {
				d: "M12 12h10v10H12z",
				fill: "#ffba08"
			})
		]);
		return () => h(Button_default, {
			...attrs,
			color: "secondary",
			disabled: props.isLoading,
			fullWidth: true,
			type: "button",
			variant: "solid",
			...slots["default"] ? {} : { startIcon: microsoftIcon() },
			onClick: (e) => emit("click", e)
		}, () => slots["default"]?.({ isLoading: props.isLoading }) ?? (t("elements.buttons.microsoft.text") || "Sign in with Microsoft"));
	}
});
var MicrosoftButton_default = MicrosoftButton;

//#endregion
//#region src/components/factories/FieldFactory.ts
/**
* Utility function to validate field values based on type.
*/
const validateFieldValue = (value, type, required = false, touched = false) => {
	if (required && touched && (!value || value.trim() === "")) return "This field is required";
	if (!value || value.trim() === "") return null;
	switch (type) {
		case FieldType$1.Number: {
			const numValue = parseInt(value, 10);
			if (Number.isNaN(numValue)) return "Please enter a valid number";
			break;
		}
		default: break;
	}
	return null;
};
/**
* Factory function to create form field VNodes based on FieldType.
*/
const createField = (config) => {
	const { name, type, label, required, value, onChange, onBlur, disabled = false, error, className, options = [], touched = false, placeholder } = config;
	const validationError = error || validateFieldValue(value, type, required, touched);
	const commonProps = {
		class: className,
		"data-testid": `thunderid-signin-${name}`,
		disabled,
		error: validationError,
		label,
		modelValue: value,
		name,
		onBlur,
		placeholder,
		required
	};
	switch (type) {
		case FieldType$1.Password: return h(PasswordField_default, {
			...commonProps,
			"onUpdate:modelValue": onChange
		});
		case FieldType$1.Text: return h(TextField_default, {
			...commonProps,
			autocomplete: "off",
			"onUpdate:modelValue": onChange,
			type: "text"
		});
		case FieldType$1.Email: return h(TextField_default, {
			...commonProps,
			autocomplete: "email",
			"onUpdate:modelValue": onChange,
			type: "email"
		});
		case FieldType$1.Date: return h(DatePicker_default, {
			...commonProps,
			"onUpdate:modelValue": onChange
		});
		case FieldType$1.Checkbox: {
			const isChecked = value === "true" || value === true;
			return h(Checkbox_default, {
				...commonProps,
				modelValue: isChecked,
				"onUpdate:modelValue": (checked) => onChange(checked.toString())
			});
		}
		case FieldType$1.Otp: return h(OtpField_default, {
			...commonProps,
			"onUpdate:modelValue": onChange
		});
		case FieldType$1.Number: return h(TextField_default, {
			...commonProps,
			helperText: "Enter a numeric value",
			"onUpdate:modelValue": onChange,
			type: "number"
		});
		case FieldType$1.Select: {
			const fieldOptions = options.length > 0 ? options : [];
			if (fieldOptions.length > 0) return h(Select_default, {
				...commonProps,
				helperText: "Select from available options",
				"onUpdate:modelValue": onChange,
				options: fieldOptions
			});
			return h(TextField_default, {
				...commonProps,
				helperText: "Enter multiple values separated by commas (e.g., value1, value2, value3)",
				"onUpdate:modelValue": onChange,
				placeholder: "value1, value2, value3",
				type: "text"
			});
		}
		default: return h(TextField_default, {
			...commonProps,
			helperText: "Unknown field type, treating as text",
			"onUpdate:modelValue": onChange,
			type: "text"
		});
	}
};
/**
* FieldFactory — Vue component wrapper for the field factory.
*/
const FieldFactory = defineComponent({
	name: "FieldFactory",
	props: {
		className: {
			default: void 0,
			type: String
		},
		disabled: {
			default: false,
			type: Boolean
		},
		error: {
			default: void 0,
			type: String
		},
		label: {
			required: true,
			type: String
		},
		name: {
			required: true,
			type: String
		},
		options: {
			default: () => [],
			type: Array
		},
		placeholder: {
			default: void 0,
			type: String
		},
		required: {
			default: false,
			type: Boolean
		},
		touched: {
			default: false,
			type: Boolean
		},
		type: {
			required: true,
			type: String
		},
		value: {
			default: "",
			type: String
		}
	},
	emits: ["change", "blur"],
	setup(props, { emit }) {
		return () => createField({
			className: props.className,
			disabled: props.disabled,
			error: props.error,
			label: props.label,
			name: props.name,
			onBlur: () => emit("blur"),
			onChange: (value) => emit("change", value),
			options: props.options,
			placeholder: props.placeholder,
			required: props.required,
			touched: props.touched,
			type: props.type,
			value: props.value
		});
	}
});
var FieldFactory_default = FieldFactory;

//#endregion
//#region src/components/auth/sign-in/v1/options/SignInOptionFactory.ts
/**
* Renders form fields for authenticators that require user input (e.g. UsernamePassword, IdentifierFirst).
*/
const renderFormFields = (props) => {
	const { authenticator, formValues, touchedFields, isLoading, onInputChange, inputClassName, buttonClassName, t } = props;
	const fieldNodes = (authenticator.metadata?.params?.sort((a, b) => a.order - b.order)?.filter((param) => param.param !== "totp") || []).map((param) => h("div", { key: param.param }, createField({
		className: inputClassName,
		disabled: isLoading,
		label: param.displayName,
		name: param.param,
		onChange: (value) => onInputChange(param.param, value),
		placeholder: t("elements.fields.generic.placeholder", { field: (param.displayName || param.param).toLowerCase() }),
		required: authenticator.requiredParams.includes(param.param),
		touched: touchedFields[param.param] || false,
		type: param.type === EmbeddedSignInFlowAuthenticatorParamType.String && param.confidential ? FieldType$1.Password : FieldType$1.Text,
		value: formValues[param.param] || ""
	})));
	fieldNodes.push(h(Button_default, {
		class: buttonClassName,
		color: "primary",
		"data-testid": "thunderid-signin-submit",
		disabled: isLoading,
		fullWidth: true,
		loading: isLoading,
		type: "submit",
		variant: "solid"
	}, { default: () => t("username.password.buttons.submit.text") }));
	return fieldNodes;
};
/**
* Renders a multi-option button for authenticators that require selection
* but no immediate user input (e.g. EmailOtp, SmsOtp, Totp, Passkey).
*/
const renderMultiOptionButton = (props) => {
	const { authenticator, isLoading, onSubmit, buttonClassName, t } = props;
	let authenticatorName = authenticator.authenticator;
	if (authenticator.idp !== EmbeddedSignInFlowAuthenticatorKnownIdPType.Local) authenticatorName = authenticator.idp;
	const displayName = t("elements.buttons.multi.option.text", { connection: authenticatorName });
	return h(Button_default, {
		class: buttonClassName,
		color: "secondary",
		disabled: isLoading,
		fullWidth: true,
		onClick: () => onSubmit(authenticator),
		startIcon: h("svg", {
			height: "18",
			viewBox: "0 0 24 24",
			width: "18",
			xmlns: "http://www.w3.org/2000/svg"
		}, [h("path", {
			d: {
				[ApplicationNativeAuthenticationConstants.SupportedAuthenticators.SmsOtp]: "M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1M12 3v10l3-3h6V3z",
				[ApplicationNativeAuthenticationConstants.SupportedAuthenticators.EmailOtp]: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z",
				[ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Totp]: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"
			}[authenticator.authenticatorId] || "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z",
			fill: "currentColor"
		})]),
		type: "button",
		variant: "solid"
	}, { default: () => displayName });
};
/**
* Renders a generic social/federated login button for unknown federated authenticators.
*/
const renderSocialButton = (props) => {
	const { authenticator, isLoading, onSubmit, buttonClassName, t } = props;
	return h(Button_default, {
		class: buttonClassName,
		color: "secondary",
		disabled: isLoading,
		fullWidth: true,
		onClick: () => onSubmit(authenticator),
		startIcon: h("svg", {
			height: "18",
			viewBox: "0 0 24 24",
			width: "18",
			xmlns: "http://www.w3.org/2000/svg"
		}, [h("path", {
			d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
			fill: "currentColor"
		})]),
		type: "button",
		variant: "outline"
	}, { default: () => t("elements.buttons.social.text", { connection: authenticator.idp }) });
};
/**
* Creates the appropriate sign-in VNode(s) based on the authenticator's ID.
*/
const createSignInOption = (props) => {
	const { authenticator, onSubmit, buttonClassName, isLoading } = props;
	const hasParams = !!(authenticator.metadata?.params && authenticator.metadata.params.length > 0);
	switch (authenticator.authenticatorId) {
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.UsernamePassword:
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.IdentifierFirst: return h("div", {}, renderFormFields(props));
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Google: return h(GoogleButton_default, {
			class: buttonClassName,
			isLoading,
			onClick: () => onSubmit(authenticator)
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.GitHub: return h(GitHubButton_default, {
			class: buttonClassName,
			isLoading,
			onClick: () => onSubmit(authenticator)
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Microsoft: return h(MicrosoftButton_default, {
			class: buttonClassName,
			isLoading,
			onClick: () => onSubmit(authenticator)
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Facebook: return h(FacebookButton_default, {
			class: buttonClassName,
			isLoading,
			onClick: () => onSubmit(authenticator)
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.EmailOtp:
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Totp:
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.SmsOtp: return hasParams ? h("div", {}, renderFormFields(props)) : renderMultiOptionButton(props);
		default:
			if (authenticator.idp !== EmbeddedSignInFlowAuthenticatorKnownIdPType.Local) return renderSocialButton(props);
			return hasParams ? h("div", {}, renderFormFields(props)) : renderMultiOptionButton(props);
	}
};
/**
* Convenience function to create sign-in option VNode(s) from an authenticator.
*/
const createSignInOptionFromAuthenticator = (authenticator, formValues, touchedFields, isLoading, onInputChange, onSubmit, t, options) => createSignInOption({
	authenticator,
	formValues,
	isLoading,
	onInputChange,
	onSubmit,
	t,
	touchedFields,
	...options
});

//#endregion
//#region src/components/auth/sign-in/v1/BaseSignIn.ts
/**
* Authenticators that are currently hidden from the UI.
* OrganizationSSO is not yet supported in app-native authentication.
*/
const HIDDEN_AUTHENTICATORS = ["T3JnYW5pemF0aW9uQXV0aGVudGljYXRvcjpTU08"];
const isPasskeyAuthenticator = (authenticator) => authenticator.authenticatorId === ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Passkey && authenticator.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.InternalPrompt && !!authenticator.metadata?.additionalData?.challengeData;
/**
* V1 BaseSignIn component — authenticator-based app-native sign-in for Vue.
*
* Handles multi-step authentication flows, form rendering per-authenticator,
* redirect popups for OAuth, and passkey/FIDO WebAuthn.
*/
const BaseSignIn$2 = defineComponent({
	name: "BaseSignInV1",
	props: {
		afterSignInUrl: {
			default: void 0,
			type: String
		},
		buttonClassName: {
			default: "",
			type: String
		},
		className: {
			default: "",
			type: String
		},
		errorClassName: {
			default: "",
			type: String
		},
		inputClassName: {
			default: "",
			type: String
		},
		isLoading: {
			default: false,
			type: Boolean
		},
		messageClassName: {
			default: "",
			type: String
		},
		onInitialize: {
			default: void 0,
			type: Function
		},
		onSubmit: {
			default: void 0,
			type: Function
		},
		showLogo: {
			default: true,
			type: Boolean
		},
		showSubtitle: {
			default: true,
			type: Boolean
		},
		showTitle: {
			default: true,
			type: Boolean
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	emits: [
		"error",
		"flowChange",
		"success"
	],
	setup(props, { emit }) {
		const { t } = useI18n_default();
		const { title: flowTitle, subtitle: flowSubtitle, messages: flowMessages } = useFlow_default();
		const isInitRequestLoading = ref(false);
		const isInitialized = ref(false);
		const currentFlow = ref(null);
		const currentAuthenticator = ref(null);
		const error = ref(null);
		const messages = ref([]);
		const formValues = ref({});
		const touchedFields = ref({});
		const isLoading = () => props.isLoading || isInitRequestLoading.value;
		const setupFormFields = (authenticator) => {
			const vals = {};
			authenticator.metadata?.params?.forEach((param) => {
				vals[param.param] = "";
			});
			formValues.value = vals;
			touchedFields.value = {};
		};
		const handleInputChange = (param, value) => {
			formValues.value = {
				...formValues.value,
				[param]: value
			};
			touchedFields.value = {
				...touchedFields.value,
				[param]: true
			};
		};
		const touchAllFields = () => {
			const touched = {};
			Object.keys(formValues.value).forEach((key) => {
				touched[key] = true;
			});
			touchedFields.value = touched;
		};
		const validateForm = () => {
			if (!currentAuthenticator.value) return true;
			return (currentAuthenticator.value.requiredParams || []).every((key) => {
				const val = formValues.value[key] || "";
				return !!val && val.trim() !== "";
			});
		};
		let handleAuthenticatorSelection;
		const processNextStep = (response) => {
			if (response && "flowId" in response && "nextStep" in response) {
				currentFlow.value = response;
				if (response.nextStep?.authenticators?.length > 0) if (response.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && response.nextStep.authenticators.length > 1) currentAuthenticator.value = null;
				else {
					const nextAuth = response.nextStep.authenticators[0];
					if (isPasskeyAuthenticator(nextAuth)) {
						handleAuthenticatorSelection(nextAuth).catch((err) => {
							emit("error", err);
						});
						return;
					}
					currentAuthenticator.value = nextAuth;
					setupFormFields(nextAuth);
				}
				if (response.nextStep?.messages) messages.value = response.nextStep.messages.map((msg) => ({
					message: msg.message || "",
					type: msg.type || "INFO"
				}));
			}
		};
		const handleRedirectionIfNeeded = (response) => {
			if (response && "nextStep" in response && response.nextStep && response.nextStep.stepType === EmbeddedSignInFlowStepType.AuthenticatorPrompt && response.nextStep.authenticators?.length === 1) {
				const responseAuth = response.nextStep.authenticators[0];
				if (responseAuth.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.RedirectionPrompt && responseAuth.metadata?.additionalData?.redirectUrl) {
					const { redirectUrl } = responseAuth.metadata.additionalData;
					const popup = window.open(redirectUrl, "oauth_popup", "width=500,height=600,scrollbars=yes,resizable=yes");
					if (!popup) return false;
					let messageHandler;
					let popupMonitor;
					let hasProcessedCallback = false;
					const cleanup = () => {
						window.removeEventListener("message", messageHandler);
						if (popupMonitor) clearInterval(popupMonitor);
					};
					messageHandler = async (event) => {
						if (event.source !== popup) return;
						const expectedOrigin = props.afterSignInUrl ? new URL(props.afterSignInUrl).origin : window.location.origin;
						if (event.origin !== expectedOrigin && event.origin !== window.location.origin) return;
						const { code, state } = event.data;
						if (code && state) {
							const payload = {
								flowId: currentFlow.value.flowId,
								selectedAuthenticator: {
									authenticatorId: responseAuth.authenticatorId,
									params: {
										code,
										state
									}
								}
							};
							await props.onSubmit(payload, {
								method: currentFlow.value?.links[0].method,
								url: currentFlow.value?.links[0].href
							});
							popup.close();
							cleanup();
						}
					};
					window.addEventListener("message", messageHandler);
					popupMonitor = setInterval(async () => {
						try {
							if (popup.closed) {
								cleanup();
								return;
							}
							if (hasProcessedCallback) return;
							try {
								const popupUrl = popup.location.href;
								if (popupUrl && (popupUrl.includes("code=") || popupUrl.includes("error="))) {
									hasProcessedCallback = true;
									const url = new URL(popupUrl);
									const code = url.searchParams.get("code");
									const state = url.searchParams.get("state");
									if (url.searchParams.get("error")) {
										popup.close();
										cleanup();
										return;
									}
									if (code && state) {
										const payload = {
											flowId: currentFlow.value.flowId,
											selectedAuthenticator: {
												authenticatorId: responseAuth.authenticatorId,
												params: {
													code,
													state
												}
											}
										};
										const submitResponse = await props.onSubmit(payload, {
											method: currentFlow.value?.links[0].method,
											url: currentFlow.value?.links[0].href
										});
										popup.close();
										emit("flowChange", submitResponse);
										if (submitResponse?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) emit("success", submitResponse.authData);
									}
								}
							} catch {}
						} catch {}
					}, 1e3);
					return true;
				}
			}
			return false;
		};
		const handleSubmit = async (submittedValues) => {
			if (!currentFlow.value || !currentAuthenticator.value) return;
			touchAllFields();
			if (!validateForm()) return;
			isInitRequestLoading.value = true;
			error.value = null;
			messages.value = [];
			try {
				const payload = {
					flowId: currentFlow.value.flowId,
					selectedAuthenticator: {
						authenticatorId: currentAuthenticator.value.authenticatorId,
						params: submittedValues
					}
				};
				const response = await props.onSubmit(payload, {
					method: currentFlow.value.links[0].method,
					url: currentFlow.value.links[0].href
				});
				emit("flowChange", response);
				if (response?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
					emit("success", response.authData);
					return;
				}
				if (response?.flowStatus === EmbeddedSignInFlowStatus$1.FailCompleted || response?.flowStatus === EmbeddedSignInFlowStatus$1.FailIncomplete) {
					error.value = t("errors.signin.flow.completion.failure");
					return;
				}
				if (handleRedirectionIfNeeded(response)) return;
				processNextStep(response);
			} catch (err) {
				error.value = err instanceof ThunderIDAPIError ? err.message : t("errors.signin.flow.failure");
				emit("error", err);
			} finally {
				isInitRequestLoading.value = false;
			}
		};
		handleAuthenticatorSelection = async (authenticator, formData) => {
			if (!currentFlow.value) return;
			if (formData) touchAllFields();
			isInitRequestLoading.value = true;
			error.value = null;
			messages.value = [];
			try {
				if (isPasskeyAuthenticator(authenticator)) {
					const challengeData = authenticator.metadata?.additionalData?.challengeData;
					if (!challengeData) throw new Error("Missing challenge data for passkey authentication");
					const tokenResponse = await handleWebAuthnAuthentication$1(challengeData);
					const payload = {
						flowId: currentFlow.value.flowId,
						selectedAuthenticator: {
							authenticatorId: authenticator.authenticatorId,
							params: { tokenResponse }
						}
					};
					const response = await props.onSubmit(payload, {
						method: currentFlow.value.links[0].method,
						url: currentFlow.value.links[0].href
					});
					emit("flowChange", response);
					if (response?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
						emit("success", response.authData);
						return;
					}
					if (response?.flowStatus === EmbeddedSignInFlowStatus$1.FailCompleted || response?.flowStatus === EmbeddedSignInFlowStatus$1.FailIncomplete) {
						error.value = t("errors.signin.flow.passkeys.completion.failure");
						return;
					}
					processNextStep(response);
					return;
				}
				if (authenticator.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.RedirectionPrompt) {
					const payload = {
						flowId: currentFlow.value.flowId,
						selectedAuthenticator: {
							authenticatorId: authenticator.authenticatorId,
							params: {}
						}
					};
					const response = await props.onSubmit(payload, {
						method: currentFlow.value.links[0].method,
						url: currentFlow.value.links[0].href
					});
					emit("flowChange", response);
					if (response?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
						emit("success", response.authData);
						return;
					}
					handleRedirectionIfNeeded(response);
					return;
				}
				if (formData) {
					if (!validateForm()) return;
					const formPayload = {
						flowId: currentFlow.value.flowId,
						selectedAuthenticator: {
							authenticatorId: authenticator.authenticatorId,
							params: formData
						}
					};
					const formResponse = await props.onSubmit(formPayload, {
						method: currentFlow.value.links[0].method,
						url: currentFlow.value.links[0].href
					});
					emit("flowChange", formResponse);
					if (formResponse?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
						emit("success", formResponse.authData);
						return;
					}
					if (formResponse?.flowStatus === EmbeddedSignInFlowStatus$1.FailCompleted || formResponse?.flowStatus === EmbeddedSignInFlowStatus$1.FailIncomplete) {
						error.value = t("errors.signin.flow.completion.failure");
						return;
					}
					if (handleRedirectionIfNeeded(formResponse)) return;
					processNextStep(formResponse);
					return;
				}
				if (!!!(authenticator.metadata?.params && authenticator.metadata.params.length > 0)) {
					const payload = {
						flowId: currentFlow.value.flowId,
						selectedAuthenticator: {
							authenticatorId: authenticator.authenticatorId,
							params: {}
						}
					};
					const response = await props.onSubmit(payload, {
						method: currentFlow.value.links[0].method,
						url: currentFlow.value.links[0].href
					});
					emit("flowChange", response);
					if (response?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
						emit("success", response.authData);
						return;
					}
					if (response?.flowStatus === EmbeddedSignInFlowStatus$1.FailCompleted || response?.flowStatus === EmbeddedSignInFlowStatus$1.FailIncomplete) {
						error.value = t("errors.signin.flow.completion.failure");
						return;
					}
					if (handleRedirectionIfNeeded(response)) return;
					processNextStep(response);
				} else {
					currentAuthenticator.value = authenticator;
					setupFormFields(authenticator);
				}
			} catch (err) {
				error.value = err instanceof ThunderIDAPIError ? err.message : t("errors.signin.flow.failure");
				emit("error", err);
			} finally {
				isInitRequestLoading.value = false;
			}
		};
		const hasMultipleOptions = () => !!(currentFlow.value && "nextStep" in currentFlow.value && currentFlow.value.nextStep?.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && currentFlow.value.nextStep?.authenticators && currentFlow.value.nextStep.authenticators.length > 1);
		const getAvailableAuthenticators = () => {
			if (!currentFlow.value || !("nextStep" in currentFlow.value) || !currentFlow.value.nextStep?.authenticators) return [];
			return currentFlow.value.nextStep.authenticators;
		};
		let initAttempted = false;
		watch(() => props.isLoading, (loading) => {
			if (!loading && !initAttempted && props.onInitialize) {
				initAttempted = true;
				(async () => {
					isInitRequestLoading.value = true;
					error.value = null;
					try {
						const response = await props.onInitialize();
						currentFlow.value = response;
						isInitialized.value = true;
						emit("flowChange", response);
						if (response?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
							emit("success", response.authData || {});
							return;
						}
						if (response?.nextStep?.authenticators?.length > 0) if (response.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && response.nextStep.authenticators.length > 1) currentAuthenticator.value = null;
						else {
							const authenticator = response.nextStep.authenticators[0];
							currentAuthenticator.value = authenticator;
							setupFormFields(authenticator);
						}
						if (response?.nextStep?.messages) messages.value = response.nextStep.messages.map((msg) => ({
							message: msg.message || "",
							type: msg.type || "INFO"
						}));
					} catch (err) {
						error.value = err instanceof ThunderIDAPIError ? err.message : t("errors.signin.initialization");
						emit("error", err);
					} finally {
						isInitRequestLoading.value = false;
					}
				})();
			}
		}, { immediate: true });
		const renderAlertVariant = (type) => {
			const lower = type.toLowerCase();
			if (lower === "error") return "error";
			if (lower === "warning") return "warning";
			if (lower === "success") return "success";
			return "info";
		};
		const renderMessages = () => messages.value.map((msg, i) => h(Alert_default, {
			key: i,
			severity: renderAlertVariant(msg.type)
		}, { default: () => msg.message }));
		const renderError = () => error.value ? h(Alert_default, { severity: "error" }, { default: () => error.value }) : null;
		return () => {
			const cardClass = [
				withVendorCSSClassPrefix("signin"),
				withVendorCSSClassPrefix(`signin--${props.size}`),
				withVendorCSSClassPrefix(`signin--${props.variant}`),
				props.className
			].filter(Boolean).join(" ");
			if (!isInitialized.value && isLoading()) return h("div", {}, [props.showLogo ? h("div", { class: withVendorCSSClassPrefix("signin__logo") }, [h(Logo_default)]) : null, h(Card_default, {
				class: cardClass,
				variant: props.variant
			}, { default: () => [h("div", { class: withVendorCSSClassPrefix("signin__loading") }, [h(Spinner_default, { size: "medium" }), h(Typography_default, { variant: "body1" }, { default: () => t("messages.loading.placeholder") })])] })]);
			if (hasMultipleOptions() && !currentAuthenticator.value) {
				const available = getAvailableAuthenticators();
				const userPromptAuths = available.filter((auth) => auth.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.UserPrompt || auth.idp === "LOCAL" && auth.metadata?.params && auth.metadata.params.length > 0);
				const optionAuths = available.filter((auth) => !userPromptAuths.includes(auth)).filter((auth) => !HIDDEN_AUTHENTICATORS.includes(auth.authenticatorId));
				return h("div", {}, [props.showLogo ? h("div", { class: withVendorCSSClassPrefix("signin__logo") }, [h(Logo_default)]) : null, h(Card_default, {
					class: cardClass,
					variant: props.variant
				}, { default: () => {
					const children = [];
					if (props.showTitle || props.showSubtitle) children.push(h("div", { class: withVendorCSSClassPrefix("signin__header") }, [props.showTitle ? h(Typography_default, { variant: "h2" }, { default: () => flowTitle.value || t("signin.heading") }) : null, props.showSubtitle ? h(Typography_default, { variant: "body1" }, { default: () => flowSubtitle.value || t("signin.subheading") }) : null]));
					if (flowMessages.value?.length > 0) children.push(h("div", { class: withVendorCSSClassPrefix("signin__flow-messages") }, flowMessages.value.map((fm, i) => h(Alert_default, {
						key: fm.id || i,
						severity: fm.type
					}, { default: () => fm.message }))));
					if (messages.value.length > 0) children.push(h("div", {}, renderMessages()));
					const errNode = renderError();
					if (errNode) children.push(errNode);
					userPromptAuths.forEach((auth, index) => {
						if (index > 0) children.push(h(Divider_default, {}, { default: () => "OR" }));
						children.push(h("form", { onSubmit: (e) => {
							e.preventDefault();
							const fd = {};
							auth.metadata?.params?.forEach((p) => {
								fd[p.param] = formValues.value[p.param] || "";
							});
							handleAuthenticatorSelection(auth, fd);
						} }, [createSignInOptionFromAuthenticator(auth, formValues.value, touchedFields.value, isLoading(), handleInputChange, (a, fd) => handleAuthenticatorSelection(a, fd), t, {
							buttonClassName: props.buttonClassName,
							error: error.value,
							inputClassName: props.inputClassName
						})]));
					});
					if (userPromptAuths.length > 0 && optionAuths.length > 0) children.push(h(Divider_default, {}, { default: () => "OR" }));
					optionAuths.forEach((auth) => {
						children.push(h("div", { key: auth.authenticatorId }, [createSignInOptionFromAuthenticator(auth, formValues.value, touchedFields.value, isLoading(), handleInputChange, (a, fd) => handleAuthenticatorSelection(a, fd), t, {
							buttonClassName: props.buttonClassName,
							error: error.value,
							inputClassName: props.inputClassName
						})]));
					});
					return children;
				} })]);
			}
			if (!currentAuthenticator.value) return h("div", {}, [props.showLogo ? h("div", { class: withVendorCSSClassPrefix("signin__logo") }, [h(Logo_default)]) : null, h(Card_default, {
				class: cardClass,
				variant: props.variant
			}, { default: () => {
				const errNode = renderError();
				return errNode ? [errNode] : [h(Typography_default, { variant: "body1" }, { default: () => t("messages.loading.placeholder") })];
			} })]);
			if (isPasskeyAuthenticator(currentAuthenticator.value) && !isLoading()) {
				handleAuthenticatorSelection(currentAuthenticator.value);
				return h("div", {}, [props.showLogo ? h("div", { class: withVendorCSSClassPrefix("signin__logo") }, [h(Logo_default)]) : null, h(Card_default, {
					class: cardClass,
					variant: props.variant
				}, { default: () => [h("div", { style: "text-align:center" }, [h(Spinner_default, { size: "large" }), h(Typography_default, { variant: "body1" }, { default: () => t("passkey.authenticating") || "Authenticating with passkey..." })])] })]);
			}
			return h("div", {}, [props.showLogo ? h("div", { class: withVendorCSSClassPrefix("signin__logo") }, [h(Logo_default)]) : null, h(Card_default, {
				class: cardClass,
				variant: props.variant
			}, { default: () => {
				const children = [];
				children.push(h("div", { class: withVendorCSSClassPrefix("signin__header") }, [h(Typography_default, { variant: "h2" }, { default: () => flowTitle.value || t("signin.heading") }), h(Typography_default, { variant: "body1" }, { default: () => flowSubtitle.value || t("signin.subheading") })]));
				if (flowMessages.value?.length > 0) children.push(h("div", { class: withVendorCSSClassPrefix("signin__flow-messages") }, flowMessages.value.map((fm, i) => h(Alert_default, {
					key: fm.id || i,
					severity: fm.type
				}, { default: () => fm.message }))));
				if (messages.value.length > 0) children.push(h("div", {}, renderMessages()));
				const errNode = renderError();
				if (errNode) children.push(errNode);
				children.push(h("form", {
					class: withVendorCSSClassPrefix("signin__form"),
					onSubmit: (e) => {
						e.preventDefault();
						const fd = {};
						currentAuthenticator.value?.metadata?.params?.forEach((p) => {
							fd[p.param] = formValues.value[p.param] || "";
						});
						handleSubmit(fd);
					}
				}, [createSignInOptionFromAuthenticator(currentAuthenticator.value, formValues.value, touchedFields.value, isLoading(), handleInputChange, (_, fd) => handleSubmit(fd || formValues.value), t, {
					buttonClassName: props.buttonClassName,
					error: error.value,
					inputClassName: props.inputClassName
				})]));
				return children;
			} })]);
		};
	}
});
var BaseSignIn_default$1 = BaseSignIn$2;

//#endregion
//#region src/components/auth/sign-in/v1/SignIn.ts
/**
* V1 SignIn — app-native sign-in component using the authenticator-based flow.
*
* Initialises the flow with `signIn({ response_mode: 'direct' })` and delegates
* all UI rendering to `BaseSignInV1`.
*/
const SignIn$2 = defineComponent({
	name: "SignInV1",
	props: {
		className: {
			default: "",
			type: String
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	emits: ["error", "success"],
	setup(props, { emit, attrs }) {
		const { signIn, afterSignInUrl, isInitialized, isLoading } = useThunderID_default();
		const handleInitialize = async () => await signIn({ response_mode: "direct" });
		const handleOnSubmit = async (payload, request) => await signIn(payload, request);
		const handleSuccess = (authData) => {
			emit("success", authData);
			if (authData && afterSignInUrl) {
				const url = new URL(afterSignInUrl, window.location.origin);
				Object.entries(authData).forEach(([key, value]) => {
					if (value !== void 0 && value !== null) url.searchParams.append(key, String(value));
				});
				window.location.href = url.toString();
			}
		};
		return () => h(BaseSignIn_default$1, {
			...attrs,
			afterSignInUrl,
			class: props.className,
			isLoading: isLoading.value || !isInitialized.value,
			onError: (err) => emit("error", err),
			onInitialize: handleInitialize,
			onSubmit: handleOnSubmit,
			onSuccess: handleSuccess,
			showLogo: true,
			showSubtitle: true,
			showTitle: true,
			size: props.size,
			variant: props.variant
		});
	}
});
var SignIn_default$1 = SignIn$2;

//#endregion
//#region src/components/auth/sign-in/AuthOptionFactoryCore.ts
const logger$3 = createVueLogger("AuthOptionFactory");
/**
* Inline helper for consent optional attribute key (mirrors ConsentCheckboxList.getConsentOptionalKey).
*/
const getConsentOptionalKey = (purposeId, attr) => `consent_${purposeId}_${attr}`;
/**
* Replaces `emoji:` URIs embedded in HTML before DOMPurify sanitization.
*
* DOMPurify strips unknown URI schemes from attributes (e.g. `src="emoji:🦊"` → `src=""`).
* Converting them to inline spans first preserves the emoji content through sanitization.
*
* Converts:
*   - `<img src="emoji:X" alt="Y">` → `<span role="img" aria-label="Y">X</span>`
*   - Any remaining `emoji:X` text occurrences → `X`
*/
const resolveEmojiUrisInHtml = (html) => {
	return html.replace(/<img([^>]*)src="(emoji:[^"]+)"([^>]*)\/?>/gi, (_match, pre, src, post) => {
		const emoji = extractEmojiFromUri(src);
		if (!emoji) return _match;
		const altMatch = /alt="([^"]*)"/i.exec(pre + post);
		return `<span role="img" aria-label="${altMatch ? altMatch[1] : emoji}">${emoji}</span>`;
	}).replace(/emoji:([^\s"<>&]+)/g, (_, rest) => isEmojiUri(`emoji:${rest}`) ? rest : `emoji:${rest}`);
};
/**
* Get the appropriate FieldType for an input component.
*/
const getFieldType = (variant) => {
	switch (variant) {
		case EmbeddedFlowComponentTypeV2.EmailInput: return FieldType$1.Email;
		case EmbeddedFlowComponentTypeV2.PasswordInput: return FieldType$1.Password;
		case EmbeddedFlowComponentTypeV2.TextInput:
		default: return FieldType$1.Text;
	}
};
/**
* Get typography variant from component variant.
*/
const getTypographyVariant = (variant) => {
	return {
		BODY_1: "body1",
		BODY_2: "body2",
		BUTTON_TEXT: "body2",
		CAPTION: "caption",
		HEADING_1: "h1",
		HEADING_2: "h2",
		HEADING_3: "h3",
		HEADING_4: "h4",
		HEADING_5: "h5",
		HEADING_6: "h6",
		OVERLINE: "overline",
		SUBTITLE_1: "subtitle1",
		SUBTITLE_2: "subtitle2"
	}[variant] || "h3";
};
/**
* Check if a button text or action matches a social provider.
*/
const matchesSocialProvider$1 = (actionId, eventType, buttonText, provider) => {
	const providerId = `${provider}_auth`;
	const providerMatches = actionId === providerId || eventType === providerId;
	if (buttonText.toLowerCase().includes(provider)) return true;
	return providerMatches;
};
/**
* Create an auth component (VNode) from a flow component configuration.
*/
const createAuthComponentFromFlow = (component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options = {}) => {
	const key = options.key ?? component.id;
	/** Resolve any remaining {{t()}} or {{meta()}} template expressions in a string at render time. */
	const resolve = (text) => {
		if (!text || !options.t && !options.meta) return text || "";
		return resolveFlowTemplateLiterals(text, {
			meta: options.meta,
			t: options.t || ((k) => k)
		});
	};
	switch (component.type) {
		case EmbeddedFlowComponentTypeV2.TextInput:
		case EmbeddedFlowComponentTypeV2.PasswordInput:
		case EmbeddedFlowComponentTypeV2.EmailInput: {
			const identifier = component.ref ?? "";
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			const fieldType = getFieldType(component.type);
			return createField({
				className: options.inputClassName,
				error,
				label: resolve(component.label) || "",
				name: identifier,
				onBlur: () => options.onInputBlur?.(identifier),
				onChange: (newValue) => onInputChange(identifier, newValue),
				placeholder: resolve(component.placeholder) || "",
				required: component.required || false,
				type: fieldType,
				value
			});
		}
		case EmbeddedFlowComponentTypeV2.Action: {
			const actionId = component.id;
			const eventType = component.eventType || "";
			const buttonText = resolve(component.label);
			const componentVariant = component.variant || "";
			const shouldSkipValidation = eventType.toUpperCase() === EmbeddedFlowEventTypeV2.Trigger;
			const handleClick = () => {
				if (options.onSubmit) {
					const formData = {};
					Object.keys(formValues).forEach((field) => {
						formData[field] = formValues[field];
					});
					const consentPrompt = options.additionalData?.["consentPrompt"];
					if (consentPrompt && eventType.toUpperCase() === EmbeddedFlowEventTypeV2.Submit) {
						const isDeny = componentVariant.toLowerCase() !== "primary";
						const decisions = { purposes: consentPrompt.purposes.map((p) => ({
							approved: !isDeny,
							elements: [...p.essential.map((e) => ({
								approved: !isDeny,
								name: e.name
							})), ...p.optional.map((e) => ({
								approved: isDeny ? false : formValues[getConsentOptionalKey(p.purposeId, e.name)] !== "false",
								name: e.name
							}))],
							purposeName: p.purposeName ?? ""
						})) };
						formData["consent_decisions"] = JSON.stringify(decisions);
					}
					options.onSubmit(component, formData, shouldSkipValidation);
				}
			};
			if (matchesSocialProvider$1(actionId, eventType, buttonText, "google")) return h(GoogleButton_default, {
				class: options.buttonClassName,
				key,
				onClick: handleClick
			});
			if (matchesSocialProvider$1(actionId, eventType, buttonText, "github")) return h(GitHubButton_default, {
				class: options.buttonClassName,
				key,
				onClick: handleClick
			});
			if (matchesSocialProvider$1(actionId, eventType, buttonText, "facebook")) return h(FacebookButton_default, {
				class: options.buttonClassName,
				key,
				onClick: handleClick
			});
			if (matchesSocialProvider$1(actionId, eventType, buttonText, "microsoft")) return h(MicrosoftButton_default, {
				class: options.buttonClassName,
				key,
				onClick: handleClick
			});
			const startIconVNode = component.startIcon ? h("img", {
				alt: "",
				"aria-hidden": "true",
				src: component.startIcon,
				style: {
					height: "1.25em",
					objectFit: "contain",
					width: "1.25em"
				}
			}) : null;
			const endIconVNode = component.endIcon ? h("img", {
				alt: "",
				"aria-hidden": "true",
				src: component.endIcon,
				style: {
					height: "1.25em",
					objectFit: "contain",
					width: "1.25em"
				}
			}) : null;
			return h(Button_default, {
				class: options.buttonClassName,
				color: component.variant?.toLowerCase() === "primary" ? "primary" : "secondary",
				"data-testid": "thunderid-signin-submit",
				disabled: isLoading || !isFormValid && !shouldSkipValidation || options.isTimeoutDisabled || component.config?.disabled,
				endIcon: endIconVNode ?? void 0,
				fullWidth: true,
				key,
				onClick: handleClick,
				startIcon: startIconVNode ?? void 0,
				variant: component.variant?.toLowerCase() === "primary" ? "solid" : "outline"
			}, { default: () => buttonText || "Submit" });
		}
		case EmbeddedFlowComponentTypeV2.Text: {
			const variant = getTypographyVariant(component.variant ?? "");
			return h(Typography_default, {
				key,
				style: {
					marginBottom: "0.5rem",
					textAlign: typeof component.align === "string" ? component.align : "left"
				},
				variant
			}, { default: () => resolve(component.label) });
		}
		case EmbeddedFlowComponentTypeV2.Divider: {
			const dividerLabel = resolve(component.label) || "";
			return h(Divider_default, { key }, dividerLabel ? { default: () => dividerLabel } : void 0);
		}
		case EmbeddedFlowComponentTypeV2.Select: {
			const identifier = component.ref ?? "";
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			const selectOptions = (component.options || []).map((opt) => ({
				label: typeof opt === "string" ? opt : String(opt.label ?? opt.value ?? ""),
				value: typeof opt === "string" ? opt : String(opt.value ?? "")
			}));
			return h(Select_default, {
				class: options.inputClassName,
				error,
				key,
				label: resolve(component.label) || "",
				modelValue: value,
				name: identifier,
				onBlur: () => options.onInputBlur?.(identifier),
				"onUpdate:modelValue": (val) => onInputChange(identifier, val),
				options: selectOptions,
				placeholder: resolve(component.placeholder),
				required: component.required
			});
		}
		case EmbeddedFlowComponentTypeV2.Block:
			if (component.components && component.components.length > 0) {
				const blockChildren = component.components.map((childComponent, index) => createAuthComponentFromFlow(childComponent, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, {
					...options,
					key: childComponent.id || `${component.id}_${index}`
				})).filter(Boolean);
				return h("form", {
					id: component.id,
					key
				}, blockChildren);
			}
			return null;
		case EmbeddedFlowComponentTypeV2.RichText: return h("div", {
			innerHTML: DOMPurify.sanitize(resolveEmojiUrisInHtml(resolve(component.label))),
			key,
			style: { overflowWrap: "anywhere" }
		});
		case EmbeddedFlowComponentTypeV2.Image: {
			const explicitHeight = resolve(component.height?.toString());
			const explicitWidth = resolve(component.width?.toString());
			return h("img", {
				alt: resolve(component.alt) || resolve(component.label) || "Image",
				key,
				src: resolve(component.src),
				style: {
					height: explicitHeight || (options.inStack ? "50px" : "auto"),
					objectFit: "contain",
					width: explicitWidth || (options.inStack ? "50px" : "100%")
				}
			});
		}
		case EmbeddedFlowComponentTypeV2.Icon:
			logger$3.warn(`Icon component type is not yet supported in the Vue SDK. Skipping render.`);
			return null;
		case EmbeddedFlowComponentTypeV2.Stack: {
			const direction = component.direction || "row";
			const gap = component.gap ?? 2;
			const align = component.align || "center";
			const justify = component.justify || "flex-start";
			const stackStyle = {
				alignItems: align,
				display: "flex",
				flexDirection: direction,
				flexWrap: "wrap",
				gap: `${gap * .5}rem`,
				justifyContent: justify
			};
			const stackChildren = component.components ? component.components.map((childComponent, index) => createAuthComponentFromFlow(childComponent, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, {
				...options,
				inStack: true,
				key: childComponent.id || `${component.id}_${index}`
			})) : [];
			return h("div", {
				key,
				style: stackStyle
			}, stackChildren.filter(Boolean));
		}
		case EmbeddedFlowComponentTypeV2.Consent:
			logger$3.warn(`Consent component type is not yet fully supported in the Vue SDK.`);
			return null;
		case EmbeddedFlowComponentTypeV2.Timer: {
			const textTemplate = resolve(component.label) || "Time remaining: {time}";
			const timeoutMs = Number(options.additionalData?.["stepTimeout"]) || 0;
			const expiresIn = timeoutMs > 0 ? Math.max(0, Math.floor((timeoutMs - Date.now()) / 1e3)) : 0;
			const timerText = textTemplate.replace("{time}", String(expiresIn));
			return h("div", {
				class: "thunderid-flow-timer",
				key
			}, timerText);
		}
		default:
			logger$3.warn(`Unsupported component type: ${component.type}. Skipping render.`);
			return null;
	}
};
/**
* Processes an array of components and renders them as VNodes for sign-in.
*/
const renderSignInComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, {
	...options,
	key: component.id || index
})).filter((v) => v !== null);
/**
* Processes an array of components and renders them as VNodes for sign-up.
* Identical to renderSignInComponents — separated for semantic clarity.
*/
const renderSignUpComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, {
	...options,
	key: component.id || index
})).filter((v) => v !== null);
/**
* Processes an array of components and renders them as VNodes for invite-user flows.
* Identical to renderSignInComponents — separated for semantic clarity.
*/
const renderInviteUserComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, {
	...options,
	key: component.id || index
})).filter((v) => v !== null);

//#endregion
//#region src/utils/v2/resolveTranslationsInObject.ts
/**
* Resolves all {{ t() }} and {{ meta() }} template expressions in an object's string properties.
* @param obj - The object to process
* @param t - The translation function from useI18n
* @param properties - Array of property names to resolve (optional, defaults to common properties)
* @param meta - Optional flow metadata for resolving meta() expressions
* @returns A new object with resolved template strings
*/
const resolveTranslationsInObject = (obj, t, properties = [
	"label",
	"placeholder",
	"text",
	"title",
	"subtitle"
], meta) => {
	const resolved = { ...obj };
	properties.forEach((prop) => {
		if (resolved[prop] && typeof resolved[prop] === "string") resolved[prop] = resolveFlowTemplateLiterals(resolved[prop], {
			meta,
			t
		});
	});
	return resolved;
};

//#endregion
//#region src/utils/v2/resolveTranslationsInArray.ts
/**
* Recursively resolves translation and meta template strings in an array of objects.
* @param items - Array of objects to process
* @param t - The translation function from useI18n
* @param properties - Array of property names to resolve (optional)
* @param meta - Optional flow metadata for resolving meta() expressions
* @returns A new array with resolved translations
*/
const resolveTranslationsInArray = (items, t, properties, meta) => items.map((item) => {
	const resolved = resolveTranslationsInObject(item, t, properties, meta);
	if (resolved["components"] && Array.isArray(resolved["components"])) resolved.components = resolveTranslationsInArray(resolved["components"], t, properties, meta);
	return resolved;
});
var resolveTranslationsInArray_default = resolveTranslationsInArray;

//#endregion
//#region src/utils/v2/flowTransformer.ts
/**
* Create a mapping from ref to identifier based on data.inputs array.
*/
const createInputRefMapping = (response) => {
	const mapping = /* @__PURE__ */ new Map();
	if (response?.data?.inputs && Array.isArray(response.data.inputs)) response.data.inputs.forEach((input) => {
		if (input.ref && input.identifier) mapping.set(input.ref, input.identifier);
	});
	return mapping;
};
/**
* Create a mapping from action ref to nextNode based on data.actions array.
*/
const createActionRefMapping = (response) => {
	const mapping = /* @__PURE__ */ new Map();
	if (response?.data?.actions && Array.isArray(response.data.actions)) response.data.actions.forEach((action) => {
		if (action.ref && action.nextNode) mapping.set(action.ref, action.nextNode);
	});
	return mapping;
};
/**
* Apply input ref mapping to components recursively.
*/
const applyInputRefMapping = (components, refMapping, actionMapping, inputsData = []) => components.map((component) => {
	const transformedComponent = { ...component };
	if (transformedComponent.ref && refMapping.has(transformedComponent.ref)) transformedComponent.ref = refMapping.get(transformedComponent.ref);
	if (transformedComponent.type === "SELECT" && component.id) {
		const inputData = inputsData.find((input) => input.ref === component.id);
		if (inputData?.options) transformedComponent.options = inputData.options.map((opt) => {
			if (typeof opt === "string") return {
				label: opt,
				value: opt
			};
			const value = typeof opt.value === "object" ? JSON.stringify(opt.value) : String(opt.value || "");
			return {
				label: typeof opt.label === "object" ? JSON.stringify(opt.label) : String(opt.label || value),
				value
			};
		});
	}
	if (transformedComponent.type === "ACTION" && transformedComponent.id && actionMapping.has(transformedComponent.id)) transformedComponent.actionRef = actionMapping.get(transformedComponent.id);
	if (transformedComponent.components && Array.isArray(transformedComponent.components)) transformedComponent.components = applyInputRefMapping(transformedComponent.components, refMapping, actionMapping, inputsData);
	return transformedComponent;
});
/**
* Transform and resolve translations in components from flow response.
*/
const transformComponents = (response, t, resolveTranslations = true, meta) => {
	if (!response?.data?.meta?.components) return [];
	let { components } = response.data.meta;
	const refMapping = createInputRefMapping(response);
	const actionMapping = createActionRefMapping(response);
	const inputsData = response?.data?.inputs || [];
	if (refMapping.size > 0 || actionMapping.size > 0 || inputsData.length > 0) components = applyInputRefMapping(components, refMapping, actionMapping, inputsData);
	return resolveTranslations ? resolveTranslationsInArray_default(components, t, void 0, meta) : components;
};
/**
* Extract error message from flow error response.
* Supports any flow error response that follows the standard structure.
* Prioritizes failureReason if present, otherwise falls back to translated generic message.
*/
const extractErrorMessage = (error, t, defaultErrorKey = "errors.flow.generic") => {
	if (error && typeof error === "object" && error.failureReason) return error.failureReason;
	if (error instanceof Error && error.message) return error.message;
	return t(defaultErrorKey);
};
/**
* Check if a response is an error response and extract the error message.
*/
const checkForErrorResponse = (response, t, defaultErrorKey = "errors.flow.generic") => {
	if (response?.flowStatus === "ERROR") return extractErrorMessage(response, t, defaultErrorKey);
	return null;
};
/**
* Generic flow response normalizer that handles both success and error responses.
* This is the main transformer function that should be used by all flow components.
*/
const normalizeFlowResponse = (response, t, options = {}, meta) => {
	const { throwOnError = true, defaultErrorKey = "errors.flow.generic", resolveTranslations = true } = options;
	if (checkForErrorResponse(response, t, defaultErrorKey) && throwOnError) throw response;
	const additionalData = response?.data?.additionalData ?? {};
	if (typeof additionalData["consentPrompt"] === "string") try {
		const parsed = JSON.parse(additionalData["consentPrompt"]);
		additionalData["consentPrompt"] = { purposes: Array.isArray(parsed) ? parsed : [] };
	} catch {}
	return {
		additionalData,
		components: transformComponents(response, t, resolveTranslations, meta),
		executionId: response.executionId
	};
};

//#endregion
//#region src/components/auth/sign-in/v2/BaseSignIn.ts
const extractFormFields$1 = (flowComponents) => {
	const fields = [];
	const process = (comps) => {
		comps.forEach((c) => {
			if (c.type === "TEXT_INPUT" || c.type === "PASSWORD_INPUT" || c.type === "EMAIL_INPUT" || c.type === "SELECT") fields.push({
				name: c.ref,
				required: c.required || false,
				type: c.type
			});
			if (c.components) process(c.components);
		});
	};
	process(flowComponents);
	return fields;
};
/**
* BaseSignIn — unstyled app-native sign-in presentation component.
*
* Renders the server-driven UI components from an embedded authentication flow.
* Manages local form state (values, touched, errors) and delegates submission to the parent SignIn component.
*
* Supports render props via the `default` scoped slot for complete UI customization.
*
* @example
* ```vue
* <!-- Default UI -->
* <BaseSignIn :components="flowComponents" :on-submit="handleSubmit" />
*
* <!-- Custom UI via scoped slot -->
* <BaseSignIn :components="flowComponents" :on-submit="handleSubmit" v-slot="{ values, handleInputChange, handleSubmit }">
*   <input :value="values.username" @input="handleInputChange('username', $event.target.value)" />
*   <button @click="handleSubmit(submitComponent)">Sign In</button>
* </BaseSignIn>
* ```
*/
const BaseSignIn$1 = defineComponent({
	name: "BaseSignIn",
	props: {
		additionalData: {
			default: () => ({}),
			type: Object
		},
		buttonClassName: {
			default: "",
			type: String
		},
		className: {
			default: "",
			type: String
		},
		components: {
			default: () => [],
			type: Array
		},
		error: {
			default: null,
			type: Object
		},
		errorClassName: {
			default: "",
			type: String
		},
		inputClassName: {
			default: "",
			type: String
		},
		isLoading: {
			default: false,
			type: Boolean
		},
		isTimeoutDisabled: {
			default: false,
			type: Boolean
		},
		messageClassName: {
			default: "",
			type: String
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	emits: ["error", "success"],
	setup(props, { slots, emit, attrs }) {
		const { meta: metaRef } = useFlowMeta_default();
		const { t } = useI18n_default();
		const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
		const isSubmitting = ref(false);
		const apiError = ref(null);
		const isLoading = computed(() => props.isLoading || isSubmitting.value);
		const formValues = ref({});
		const touchedFields = ref({});
		watch(() => props.components, (newComponents) => {
			const fields = extractFormFields$1(newComponents || []);
			const freshValues = {};
			fields.forEach((f) => {
				freshValues[f.name] = "";
			});
			formValues.value = freshValues;
			touchedFields.value = {};
		}, {
			deep: false,
			immediate: true
		});
		const formErrors = computed(() => {
			const fields = extractFormFields$1(props.components || []);
			const errors = {};
			fields.forEach((field) => {
				const value = formValues.value[field.name] || "";
				const isTouched = touchedFields.value[field.name] || false;
				if (field.required && isTouched && (!value || value.trim() === "")) errors[field.name] = t("validations.required.field.error") || "This field is required";
				if (field.type === "EMAIL_INPUT" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[field.name] = t("field.email.invalid") || "Invalid email address";
			});
			return errors;
		});
		const isFormValid = computed(() => Object.keys(formErrors.value).length === 0);
		const handleError = (error) => {
			const errorMessage = error?.failureReason || extractErrorMessage(error, t);
			apiError.value = error instanceof Error ? error : new Error(errorMessage);
			clearMessages();
			addMessage({
				message: errorMessage,
				type: "error"
			});
		};
		const handleInputChange = (name, value) => {
			formValues.value = {
				...formValues.value,
				[name]: value
			};
		};
		const handleInputBlur = (name) => {
			touchedFields.value = {
				...touchedFields.value,
				[name]: true
			};
		};
		const touchAllFields = () => {
			const fields = extractFormFields$1(props.components || []);
			const newTouched = {};
			fields.forEach((f) => {
				newTouched[f.name] = true;
			});
			touchedFields.value = newTouched;
		};
		const validateForm = () => {
			touchAllFields();
			const errors = formErrors.value;
			return {
				fieldErrors: errors,
				isValid: Object.keys(errors).length === 0
			};
		};
		const handleSubmit = async (component, data, skipValidation) => {
			if (!skipValidation) {
				const { isValid } = validateForm();
				if (!isValid) return;
			}
			isSubmitting.value = true;
			apiError.value = null;
			clearMessages();
			try {
				const filteredInputs = {};
				if (data) Object.keys(data).forEach((key) => {
					if (data[key] !== void 0 && data[key] !== null && data[key] !== "") filteredInputs[key] = data[key];
				});
				const payload = {
					...component.id ? { action: component.id } : {},
					inputs: filteredInputs
				};
				await props.onSubmit?.(payload, component);
			} catch (err) {
				handleError(err);
				emit("error", err);
			} finally {
				isSubmitting.value = false;
			}
		};
		const renderComponents = () => renderSignInComponents(props.components || [], formValues.value, touchedFields.value, formErrors.value, isLoading.value, isFormValid.value, handleInputChange, {
			additionalData: props.additionalData,
			buttonClassName: props.buttonClassName,
			inputClassName: props.inputClassName,
			isTimeoutDisabled: props.isTimeoutDisabled,
			meta: metaRef.value,
			onInputBlur: handleInputBlur,
			onSubmit: handleSubmit,
			size: props.size,
			t
		});
		return () => {
			const containerClass = [
				withVendorCSSClassPrefix("signin"),
				withVendorCSSClassPrefix(`signin--${props.size}`),
				withVendorCSSClassPrefix(`signin--${props.variant}`),
				props.className
			].filter(Boolean).join(" ");
			if (slots["default"]) {
				const renderProps = {
					components: props.components || [],
					error: apiError.value,
					fieldErrors: formErrors.value,
					handleInputChange,
					handleSubmit,
					isLoading: isLoading.value,
					isTimeoutDisabled: props.isTimeoutDisabled,
					isValid: isFormValid.value,
					messages: flowMessages.value || [],
					meta: metaRef.value,
					subtitle: flowSubtitle.value,
					title: flowTitle.value || t("signin.heading") || "Sign In",
					touched: touchedFields.value,
					validateForm,
					values: formValues.value
				};
				return h("div", {
					class: containerClass,
					...attrs
				}, slots["default"](renderProps));
			}
			if (isLoading.value && (!props.components || props.components.length === 0)) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => h("div", { style: "display:flex;justify-content:center;padding:2rem" }, h(Spinner_default)));
			if (!props.components || props.components.length === 0) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => h(Alert_default, { severity: "warning" }, () => h(Typography_default, { variant: "body1" }, () => t("errors.signin.components.not.available") || "No sign-in options available")));
			const messages = flowMessages.value || [];
			const externalError = props.error;
			return h(Card_default, {
				class: containerClass,
				...attrs,
				variant: props.variant
			}, () => [(externalError || messages.length > 0) && h("div", { class: [withVendorCSSClassPrefix("signin__messages"), props.messageClassName].filter(Boolean).join(" ") }, [externalError && h(Alert_default, { severity: "error" }, () => h(Typography_default, { variant: "body2" }, () => externalError.message)), ...messages.map((msg, index) => h(Alert_default, {
				key: index,
				severity: msg.type === "error" ? "error" : "info"
			}, () => h(Typography_default, { variant: "body2" }, () => msg.message)))]), h("div", { class: withVendorCSSClassPrefix("signin__content") }, renderComponents())]);
		};
	}
});
var BaseSignIn_default$2 = BaseSignIn$1;

//#endregion
//#region src/utils/oauth.ts
/**
* Initiates OAuth redirect with CSRF protection.
* Generates random state, stores return path in sessionStorage, and redirects to OAuth provider.
*
* @param redirectURL - OAuth authorization URL from the server
*/
function initiateOAuthRedirect(redirectURL) {
	const basePath = document.querySelector("base")?.getAttribute("href") || "";
	let returnPath = window.location.pathname;
	if (basePath && returnPath.startsWith(basePath)) returnPath = returnPath.slice(basePath.length) || "/";
	const state = crypto.randomUUID();
	sessionStorage.setItem(`thunderid_oauth_${state}`, JSON.stringify({
		path: returnPath,
		timestamp: Date.now()
	}));
	const redirectUrlObj = new URL(redirectURL);
	redirectUrlObj.searchParams.set("state", state);
	navigate$1(redirectUrlObj.toString());
}

//#endregion
//#region src/utils/v2/passkey.ts
/**
* Handles WebAuthn/Passkey registration flow for browser environments.
*
* @param challengeData - JSON stringified challenge data containing WebAuthn creation options.
* @returns Promise that resolves to a JSON string containing the WebAuthn registration response.
*/
const handlePasskeyRegistration = async (challengeData) => {
	if (!window.navigator.credentials?.create) throw new ThunderIDRuntimeError$1("WebAuthn is not supported in this browser.", "browser-webauthn-not-supported", "browser", "WebAuthn/Passkey registration requires a browser that supports the Web Authentication API.");
	try {
		const creationOptions = JSON.parse(challengeData);
		const publicKey = {
			...creationOptions,
			challenge: base64urlToArrayBuffer(creationOptions.challenge),
			user: {
				...creationOptions.user,
				id: base64urlToArrayBuffer(creationOptions.user.id)
			},
			...creationOptions.excludeCredentials && { excludeCredentials: creationOptions.excludeCredentials.map((cred) => ({
				...cred,
				id: base64urlToArrayBuffer(cred.id)
			})) }
		};
		const credential = await navigator.credentials.create({ publicKey });
		if (!credential) throw new ThunderIDRuntimeError$1("No credential returned from WebAuthn registration.", "browser-webauthn-no-credential", "browser", "The WebAuthn registration ceremony completed but did not return a valid credential.");
		const response = credential.response;
		const registrationResponse = {
			id: credential.id,
			rawId: arrayBufferToBase64url(credential.rawId),
			response: {
				attestationObject: arrayBufferToBase64url(response.attestationObject),
				clientDataJSON: arrayBufferToBase64url(response.clientDataJSON),
				...response.getTransports && { transports: response.getTransports() }
			},
			type: credential.type,
			...credential.authenticatorAttachment && { authenticatorAttachment: credential.authenticatorAttachment }
		};
		return JSON.stringify(registrationResponse);
	} catch (error) {
		if (error instanceof ThunderIDRuntimeError$1) throw error;
		if (error instanceof Error) throw new ThunderIDRuntimeError$1(`Passkey registration failed: ${error.message}`, "browser-webauthn-registration-error", "browser", `WebAuthn registration failed with error: ${error.name}`);
		throw new ThunderIDRuntimeError$1("Passkey registration failed due to an unexpected error.", "browser-webauthn-unexpected-error", "browser", "An unexpected error occurred during WebAuthn registration.");
	}
};
/**
* Handles WebAuthn/Passkey authentication flow for browser environments.
*
* @param challengeData - JSON stringified challenge data containing WebAuthn request options.
* @returns Promise that resolves to a JSON string containing the WebAuthn authentication response.
*/
const handlePasskeyAuthentication = async (challengeData) => {
	if (!window.navigator.credentials?.get) throw new ThunderIDRuntimeError$1("WebAuthn is not supported in this browser.", "browser-webauthn-not-supported", "browser", "WebAuthn/Passkey authentication requires a browser that supports the Web Authentication API.");
	try {
		const requestOptions = JSON.parse(challengeData);
		const publicKey = {
			...requestOptions,
			challenge: base64urlToArrayBuffer(requestOptions.challenge),
			...requestOptions.allowCredentials && { allowCredentials: requestOptions.allowCredentials.map((cred) => ({
				...cred,
				id: base64urlToArrayBuffer(cred.id)
			})) }
		};
		const credential = await navigator.credentials.get({ publicKey });
		if (!credential) throw new ThunderIDRuntimeError$1("No credential returned from WebAuthn authentication.", "browser-webauthn-no-credential", "browser", "The WebAuthn authentication ceremony completed but did not return a valid credential.");
		const response = credential.response;
		const authenticationResponse = {
			id: credential.id,
			rawId: arrayBufferToBase64url(credential.rawId),
			response: {
				authenticatorData: arrayBufferToBase64url(response.authenticatorData),
				clientDataJSON: arrayBufferToBase64url(response.clientDataJSON),
				signature: arrayBufferToBase64url(response.signature),
				...response.userHandle && { userHandle: arrayBufferToBase64url(response.userHandle) }
			},
			type: credential.type,
			...credential.authenticatorAttachment && { authenticatorAttachment: credential.authenticatorAttachment }
		};
		return JSON.stringify(authenticationResponse);
	} catch (error) {
		if (error instanceof ThunderIDRuntimeError$1) throw error;
		if (error instanceof Error) throw new ThunderIDRuntimeError$1(`Passkey authentication failed: ${error.message}`, "browser-webauthn-authentication-error", "browser", `WebAuthn authentication failed with error: ${error.name}`);
		throw new ThunderIDRuntimeError$1("Passkey authentication failed due to an unexpected error.", "browser-webauthn-unexpected-error", "browser", "An unexpected error occurred during WebAuthn authentication.");
	}
};

//#endregion
//#region src/components/auth/sign-in/v2/SignIn.ts
const EXECUTION_ID_STORAGE_KEY = "thunderid_execution_id";
const AUTH_ID_STORAGE_KEY = "thunderid_auth_id";
/**
* SignIn — app-native sign-in component with full flow lifecycle management.
*
* Initializes the authentication flow, handles passkey authentication/registration,
* OAuth redirect flows, and renders the UI via `BaseSignIn` or a scoped slot.
*
* @example
* ```vue
* <!-- Default UI -->
* <SignIn
*   @success="(data) => console.log('Authenticated:', data)"
*   @error="(err) => console.error('Auth failed:', err)"
* />
*
* <!-- Custom UI via scoped slot -->
* <SignIn v-slot="{ components, onSubmit, isLoading, error }">
*   <!-- your custom sign-in UI here -->
* </SignIn>
* ```
*/
const SignIn$1 = defineComponent({
	name: "SignIn",
	props: {
		className: {
			default: "",
			type: String
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	emits: ["error", "success"],
	setup(props, { slots, emit, attrs }) {
		const { applicationId, afterSignInUrl, signIn, isInitialized, isLoading: sdkLoading } = useThunderID_default();
		const { meta: flowMeta } = useFlowMeta_default();
		const { t } = useI18n_default();
		const components = ref([]);
		const additionalData = ref({});
		const currentExecutionId = ref(null);
		const isFlowInitialized = ref(false);
		const flowError = ref(null);
		const isSubmitting = ref(false);
		const isTimeoutDisabled = ref(false);
		const passkeyState = ref({
			actionId: null,
			challenge: null,
			creationOptions: null,
			error: null,
			executionId: null,
			isActive: false
		});
		let initializationAttempted = false;
		const oauthCodeProcessedFlag = { value: false };
		let passkeyProcessed = false;
		const persistExecutionId = (executionId) => {
			currentExecutionId.value = executionId;
			if (executionId) sessionStorage.setItem(EXECUTION_ID_STORAGE_KEY, executionId);
			else sessionStorage.removeItem(EXECUTION_ID_STORAGE_KEY);
		};
		const clearFlowState = () => {
			persistExecutionId(null);
			isFlowInitialized.value = false;
			sessionStorage.removeItem(AUTH_ID_STORAGE_KEY);
			isTimeoutDisabled.value = false;
			oauthCodeProcessedFlag.value = false;
		};
		const getUrlParams$1 = () => {
			const params = new URLSearchParams(window?.location?.search ?? "");
			return {
				applicationId: params.get("applicationId"),
				authId: params.get("authId"),
				code: params.get("code"),
				error: params.get("error"),
				errorDescription: params.get("error_description"),
				executionId: params.get("executionId"),
				nonce: params.get("nonce"),
				state: params.get("state")
			};
		};
		const cleanupOAuthUrlParams = () => {
			if (!window?.location?.href) return;
			const url = new URL(window.location.href);
			[
				"error",
				"error_description",
				"code",
				"state",
				"nonce"
			].forEach((p) => url.searchParams.delete(p));
			window.history.replaceState({}, "", url.toString());
		};
		const cleanupFlowUrlParams = () => {
			if (!window?.location?.href) return;
			const url = new URL(window.location.href);
			[
				"executionId",
				"authId",
				"applicationId"
			].forEach((p) => url.searchParams.delete(p));
			window.history.replaceState({}, "", url.toString());
		};
		const setError = (error) => {
			flowError.value = error;
			isFlowInitialized.value = true;
			emit("error", error);
		};
		const initializeFlow = async () => {
			const urlParams = getUrlParams$1();
			oauthCodeProcessedFlag.value = false;
			if (urlParams.authId) sessionStorage.setItem(AUTH_ID_STORAGE_KEY, urlParams.authId);
			const effectiveApplicationId = applicationId || urlParams.applicationId;
			if (!urlParams.executionId && !effectiveApplicationId) {
				const err = new ThunderIDRuntimeError$1("Either executionId or applicationId is required for authentication", "SIGN_IN_ERROR", "vue");
				setError(err);
				throw err;
			}
			try {
				flowError.value = null;
				let response;
				if (urlParams.executionId) response = await signIn({ executionId: urlParams.executionId });
				else response = await signIn({
					applicationId: effectiveApplicationId,
					flowType: EmbeddedFlowType.Authentication
				});
				if (response.type === EmbeddedSignInFlowTypeV2.Redirection) {
					const redirectURL = response.data?.redirectURL || response?.redirectURL;
					if (redirectURL && window?.location) {
						if (response.executionId) persistExecutionId(response.executionId);
						if (urlParams.authId) sessionStorage.setItem(AUTH_ID_STORAGE_KEY, urlParams.authId);
						initiateOAuthRedirect(redirectURL);
						return;
					}
				}
				const { executionId: normalizedExecutionId, components: normalizedComponents, additionalData: normalizedAdditionalData } = normalizeFlowResponse(response, t, { resolveTranslations: false }, flowMeta.value);
				if (normalizedExecutionId && normalizedComponents) {
					persistExecutionId(normalizedExecutionId);
					components.value = normalizedComponents;
					additionalData.value = normalizedAdditionalData ?? {};
					isFlowInitialized.value = true;
					isTimeoutDisabled.value = false;
					cleanupFlowUrlParams();
				}
			} catch (error) {
				const err = error;
				clearFlowState();
				const errorMessage = err?.failureReason || (err instanceof Error ? err.message : String(err));
				setError(new Error(errorMessage));
				initializationAttempted = false;
			}
		};
		const handleSubmit = async (payload) => {
			const effectiveExecutionId = payload.executionId || currentExecutionId.value;
			if (!effectiveExecutionId) throw new Error("No active flow ID");
			const processedInputs = { ...payload.inputs };
			if (additionalData.value?.["consentPrompt"]) try {
				const consentRaw = additionalData.value["consentPrompt"];
				const purposes = typeof consentRaw === "string" ? JSON.parse(consentRaw) : consentRaw.purposes || consentRaw;
				let isDeny = false;
				if (payload.action) {
					const findAction = (comps) => {
						if (!comps?.length) return null;
						const found = comps.find((c) => c.id === payload.action);
						if (found) return found;
						return comps.reduce((acc, c) => acc || (c.components ? findAction(c.components) : null), null);
					};
					const submitAction = findAction(components.value);
					if (submitAction && submitAction.variant?.toLowerCase() !== "primary") isDeny = true;
				}
				const decisions = { purposes: purposes.map((p) => ({
					approved: !isDeny,
					elements: [...(p.essential ?? []).map((e) => ({
						approved: !isDeny,
						name: e.name
					})), ...(p.optional ?? []).map((e) => {
						const key = `__consent_opt__${p.purposeId}__${e.name}`;
						return {
							approved: isDeny ? false : processedInputs[key] !== "false",
							name: e.name
						};
					})],
					purposeName: p.purposeName
				})) };
				processedInputs["consent_decisions"] = JSON.stringify(decisions);
				Object.keys(processedInputs).forEach((key) => {
					if (key.startsWith("__consent_opt__")) delete processedInputs[key];
				});
			} catch {}
			try {
				isSubmitting.value = true;
				flowError.value = null;
				const response = await signIn({
					executionId: effectiveExecutionId,
					...payload,
					inputs: processedInputs
				});
				if (response.type === EmbeddedSignInFlowTypeV2.Redirection) {
					const redirectURL = response.data?.redirectURL || response?.redirectURL;
					if (redirectURL && window?.location) {
						if (response.executionId) persistExecutionId(response.executionId);
						const urlParams = getUrlParams$1();
						if (urlParams.authId) sessionStorage.setItem(AUTH_ID_STORAGE_KEY, urlParams.authId);
						initiateOAuthRedirect(redirectURL);
						return;
					}
				}
				if (response.data?.additionalData?.["passkeyChallenge"] || response.data?.additionalData?.["passkeyCreationOptions"]) {
					const { passkeyChallenge, passkeyCreationOptions } = response.data.additionalData;
					passkeyProcessed = false;
					passkeyState.value = {
						actionId: "submit",
						challenge: passkeyChallenge || null,
						creationOptions: passkeyCreationOptions || null,
						error: null,
						executionId: response.executionId || effectiveExecutionId,
						isActive: true
					};
					isSubmitting.value = false;
					return;
				}
				const { executionId: normalizedExecutionId, components: normalizedComponents, additionalData: normalizedAdditionalData } = normalizeFlowResponse(response, t, { resolveTranslations: false }, flowMeta.value);
				if (response.flowStatus === EmbeddedSignInFlowStatusV2.Error) {
					clearFlowState();
					const failureReason = response?.failureReason || "Authentication flow failed. Please try again.";
					const err = new Error(failureReason);
					setError(err);
					cleanupFlowUrlParams();
					throw err;
				}
				if (response.flowStatus === EmbeddedSignInFlowStatusV2.Complete) {
					const finalRedirectUrl = response?.redirectUrl || response?.redirect_uri || afterSignInUrl;
					isSubmitting.value = false;
					persistExecutionId(null);
					isFlowInitialized.value = false;
					sessionStorage.removeItem(AUTH_ID_STORAGE_KEY);
					cleanupOAuthUrlParams();
					emit("success", {
						redirectUrl: finalRedirectUrl,
						...response.data || {}
					});
					if (finalRedirectUrl && window?.location) window.location.href = finalRedirectUrl;
					return;
				}
				if (normalizedExecutionId && normalizedComponents) {
					persistExecutionId(normalizedExecutionId);
					components.value = normalizedComponents;
					additionalData.value = normalizedAdditionalData ?? {};
					isTimeoutDisabled.value = false;
					isFlowInitialized.value = true;
					cleanupFlowUrlParams();
					if (response?.failureReason) flowError.value = new Error(response.failureReason);
				}
			} catch (error) {
				const err = error;
				if (err instanceof Error && flowError.value === err) throw err;
				clearFlowState();
				const errorMessage = err?.failureReason || (err instanceof Error ? err.message : String(err));
				setError(new Error(errorMessage));
			} finally {
				isSubmitting.value = false;
			}
		};
		let timeoutHandle = null;
		const scheduleTimeout = (timeoutMs) => {
			if (timeoutHandle) clearTimeout(timeoutHandle);
			if (timeoutMs <= 0 || !isFlowInitialized.value) {
				isTimeoutDisabled.value = false;
				return;
			}
			const remaining = Math.max(0, Math.floor((timeoutMs - Date.now()) / 1e3));
			if (remaining <= 0) {
				isTimeoutDisabled.value = true;
				setError(new Error(t("errors.signin.timeout") || "Time allowed to complete the step has expired."));
				return;
			}
			timeoutHandle = setTimeout(() => {
				isTimeoutDisabled.value = true;
				setError(new Error(t("errors.signin.timeout") || "Time allowed to complete the step has expired."));
			}, remaining * 1e3);
		};
		watch(() => [additionalData.value?.["stepTimeout"], isFlowInitialized.value], ([timeoutMs]) => {
			scheduleTimeout(Number(timeoutMs) || 0);
		});
		onUnmounted(() => {
			if (timeoutHandle) clearTimeout(timeoutHandle);
		});
		watch(() => passkeyState.value, async (state) => {
			if (!state.isActive || !state.challenge && !state.creationOptions || !state.executionId) return;
			if (passkeyProcessed) return;
			passkeyProcessed = true;
			try {
				let inputs;
				if (state.challenge) {
					const passkeyResponse = await handlePasskeyAuthentication(state.challenge);
					const obj = JSON.parse(passkeyResponse);
					inputs = {
						authenticatorData: obj.response.authenticatorData,
						clientDataJSON: obj.response.clientDataJSON,
						credentialId: obj.id,
						signature: obj.response.signature,
						userHandle: obj.response.userHandle
					};
				} else if (state.creationOptions) {
					const passkeyResponse = await handlePasskeyRegistration(state.creationOptions);
					const obj = JSON.parse(passkeyResponse);
					inputs = {
						attestationObject: obj.response.attestationObject,
						clientDataJSON: obj.response.clientDataJSON,
						credentialId: obj.id
					};
				} else throw new Error("No passkey challenge or creation options available");
				await handleSubmit({
					executionId: state.executionId,
					inputs
				});
				passkeyState.value = {
					actionId: null,
					challenge: null,
					creationOptions: null,
					error: null,
					executionId: null,
					isActive: false
				};
			} catch (error) {
				const err = error;
				passkeyState.value = {
					...passkeyState.value,
					error: err,
					isActive: false
				};
				flowError.value = err;
				emit("error", err);
			}
		}, { deep: true });
		useOAuthCallback$1({
			currentExecutionId,
			executionIdStorageKey: EXECUTION_ID_STORAGE_KEY,
			isInitialized,
			isSubmitting,
			onError: (err) => {
				if (!flowError.value) {
					clearFlowState();
					setError(err instanceof Error ? err : new Error(String(err)));
				}
			},
			onSubmit: (payload) => handleSubmit({
				executionId: payload.executionId,
				inputs: payload.inputs
			}),
			processedFlag: oauthCodeProcessedFlag,
			setExecutionId: persistExecutionId
		});
		onMounted(() => {
			const urlParams = getUrlParams$1();
			if (urlParams.authId) sessionStorage.setItem(AUTH_ID_STORAGE_KEY, urlParams.authId);
		});
		watch(() => [
			isInitialized.value,
			sdkLoading.value,
			isFlowInitialized.value,
			currentExecutionId.value,
			isSubmitting.value
		], ([initialized, loading, flowInit, executionId, submitting]) => {
			const urlParams = getUrlParams$1();
			const hasOAuthCode = !!urlParams.code;
			const hasOAuthState = !!urlParams.state;
			if (initialized && !loading && !flowInit && !initializationAttempted && !executionId && !hasOAuthCode && !hasOAuthState && !submitting && !oauthCodeProcessedFlag.value) {
				initializationAttempted = true;
				initializeFlow();
			}
		});
		return () => {
			const combinedIsLoading = sdkLoading.value || isSubmitting.value || !isInitialized.value;
			if (slots["default"]) {
				const renderProps = {
					additionalData: additionalData.value,
					components: components.value,
					error: flowError.value,
					initialize: initializeFlow,
					isInitialized: isFlowInitialized.value,
					isLoading: combinedIsLoading,
					isTimeoutDisabled: isTimeoutDisabled.value,
					meta: flowMeta.value,
					onSubmit: handleSubmit
				};
				return h("div", {}, slots["default"](renderProps));
			}
			return h(BaseSignIn_default$2, {
				...attrs,
				additionalData: additionalData.value,
				class: props.className,
				components: components.value,
				error: flowError.value,
				isLoading: combinedIsLoading || !isFlowInitialized.value,
				isTimeoutDisabled: isTimeoutDisabled.value,
				onError: (err) => emit("error", err),
				onSubmit: handleSubmit,
				size: props.size,
				variant: props.variant
			});
		};
	}
});
var SignIn_default$2 = SignIn$1;

//#endregion
//#region src/components/auth/sign-in/SignIn.ts
/**
* SignIn — platform-aware sign-in component.
*
* Routes to the V1 (authenticator-based) flow by default or the V2
* (component-driven) flow when `platform` is set to `Platform.ThunderID`.
*/
const SignIn = defineComponent({
	name: "SignIn",
	props: {
		className: {
			default: "",
			type: String
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	emits: ["error", "success"],
	setup(props, { slots, emit, attrs }) {
		const { platform } = useThunderID_default();
		return () => {
			if (platform === Platform.ThunderID) return h(SignIn_default$2, {
				...attrs,
				class: props.className,
				onError: (err) => emit("error", err),
				onSuccess: (data) => emit("success", data),
				size: props.size,
				variant: props.variant
			}, slots);
			return h(SignIn_default$1, {
				...attrs,
				class: props.className,
				onError: (err) => emit("error", err),
				onSuccess: (data) => emit("success", data),
				size: props.size,
				variant: props.variant
			}, slots);
		};
	}
});
var SignIn_default = SignIn;

//#endregion
//#region src/components/auth/sign-in/BaseSignIn.ts
/**
* BaseSignIn — platform-aware base sign-in component.
*
* Routes to the V1 (authenticator-based) or V2 (component-driven) BaseSignIn
* based on the configured `platform`.
*/
const BaseSignIn = defineComponent({
	name: "BaseSignIn",
	inheritAttrs: false,
	setup(_props, { attrs, slots }) {
		const { platform } = useThunderID_default();
		return () => {
			if (platform === Platform.ThunderID) return h(BaseSignIn_default$2, { ...attrs }, slots);
			return h(BaseSignIn_default$1, { ...attrs }, slots);
		};
	}
});
var BaseSignIn_default = BaseSignIn;

//#endregion
//#region src/components/auth/sign-up/v1/options/SignUpOptionFactory.ts
/**
* Mirrors the logic in `packages/react/.../SignUp/v1/SignUpOptionFactory.tsx` —
* renders the V1 flow component shapes (`TYPOGRAPHY`, `INPUT`, `BUTTON`,
* `FORM`, `SELECT`, `DIVIDER`, `IMAGE`, `RICH_TEXT`) returned by the ThunderID
* `/api/server/v1/flow/execute` endpoint.
*
* Each leaf component returns a Vue VNode (or null for unknown types). Branch
* components (`FORM`) recurse so children render as a flat list.
*/
/**
* Resolve the form-field name for an input component.
* ThunderID V1 stores the bound parameter name in `config.identifier` (e.g.
* `http://wso2.org/claims/emailaddress`), with `config.name` used as a fallback.
*/
const getInputName = (component) => {
	const cfg = component.config || {};
	return cfg.name || cfg.identifier || component.id;
};
/**
* Map V1 INPUT variants/types to the SDK's internal `FieldType` so the existing
* `createField` factory (used by the V1 sign-in flow too) produces the right
* primitive (`TextField`, `PasswordField`, `Checkbox`, etc.).
*/
const inferFieldType = (component) => {
	const variant = String(component.variant || "").toUpperCase();
	const cfg = component.config || {};
	const cfgType = String(cfg.type || "").toLowerCase();
	if (variant === "EMAIL" || cfgType === "email") return FieldType$1.Email;
	if (variant === "PASSWORD" || cfgType === "password") return FieldType$1.Password;
	if (variant === "TELEPHONE" || cfgType === "tel") return FieldType$1.Text;
	if (variant === "NUMBER" || cfgType === "number") return FieldType$1.Number;
	if (variant === "DATE" || cfgType === "date") return FieldType$1.Date;
	if (variant === "CHECKBOX" || cfgType === "checkbox") return FieldType$1.Checkbox;
	return FieldType$1.Text;
};
/**
* Map TYPOGRAPHY variants (H1-H6, BODY, CAPTION etc.) to the Vue Typography
* primitive's variant prop.
*/
const inferTypographyVariant = (component) => {
	switch (String(component.variant || "").toUpperCase()) {
		case "H1": return "h1";
		case "H2": return "h2";
		case "H3": return "h3";
		case "H4": return "h4";
		case "H5": return "h5";
		case "H6": return "h6";
		case "SUBTITLE1": return "subtitle1";
		case "SUBTITLE2": return "subtitle2";
		case "BODY2": return "body2";
		case "CAPTION": return "caption";
		case "OVERLINE": return "overline";
		default: return "body1";
	}
};
/**
* Detect whether a BUTTON looks like a known social-login provider so we can
* render a branded button (matches the React V1 factory's behaviour).
*/
const matchesSocialProvider = (component, provider) => {
	const text = String(component?.config?.text || component?.config?.label || "").toLowerCase();
	return String(component?.variant || "").toUpperCase() === "SOCIAL" && text.includes(provider);
};
/**
* Build a VNode for a single V1 flow component. Returns `null` for unknown
* types (caller filters these out).
*/
const createSignUpComponent = (props) => {
	const { component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, onSubmit, inputClassName, buttonClassName } = props;
	const cfg = component.config || {};
	switch (component.type) {
		case EmbeddedFlowComponentType$1.Typography: {
			const text = String(cfg.text || cfg.label || "");
			return h(Typography_default, {
				style: "margin-bottom:0.5rem",
				variant: inferTypographyVariant(component)
			}, { default: () => text });
		}
		case EmbeddedFlowComponentType$1.Input: {
			const name = getInputName(component);
			const fieldType = inferFieldType(component);
			const value = formValues[name] || "";
			const isTouched = touchedFields[name] || false;
			return createField({
				className: inputClassName,
				disabled: isLoading,
				error: isTouched ? formErrors[name] : void 0,
				label: String(cfg.label || ""),
				name,
				onChange: (newValue) => onInputChange(name, newValue),
				placeholder: String(cfg.placeholder || ""),
				required: Boolean(cfg.required),
				touched: isTouched,
				type: fieldType,
				value
			});
		}
		case EmbeddedFlowComponentType$1.Button: {
			const text = String(cfg.text || cfg.label || "Submit");
			const isPrimary = String(component.variant || "PRIMARY").toUpperCase() === "PRIMARY";
			const handleClick = () => onSubmit(component, void 0);
			if (matchesSocialProvider(component, "google")) return h(GoogleButton_default, {
				class: buttonClassName,
				isLoading,
				onClick: handleClick
			});
			if (matchesSocialProvider(component, "github")) return h(GitHubButton_default, {
				class: buttonClassName,
				isLoading,
				onClick: handleClick
			});
			if (matchesSocialProvider(component, "microsoft")) return h(MicrosoftButton_default, {
				class: buttonClassName,
				isLoading,
				onClick: handleClick
			});
			if (matchesSocialProvider(component, "facebook")) return h(FacebookButton_default, {
				class: buttonClassName,
				isLoading,
				onClick: handleClick
			});
			return h(Button_default, {
				class: buttonClassName,
				color: isPrimary ? "primary" : "secondary",
				"data-testid": "thunderid-signup-submit",
				disabled: isLoading || !isFormValid && cfg.type === "submit",
				fullWidth: true,
				loading: isLoading,
				onClick: handleClick,
				type: cfg.type === "submit" ? "submit" : "button",
				variant: isPrimary ? "solid" : "outline"
			}, { default: () => text });
		}
		case EmbeddedFlowComponentType$1.Form: {
			const children = component.components || [];
			const nodes = [];
			children.forEach((child) => {
				const rendered = createSignUpComponent({
					...props,
					component: child
				});
				if (rendered === null) return;
				if (Array.isArray(rendered)) nodes.push(...rendered);
				else nodes.push(rendered);
			});
			return nodes;
		}
		case EmbeddedFlowComponentType$1.Divider: return h("hr", {
			class: "thunderid-signup__divider",
			style: "margin:0.75rem 0;border:0;border-top:1px solid #e5e7eb"
		});
		case EmbeddedFlowComponentType$1.Image: {
			const src = String(cfg.src || cfg.url || "");
			const alt = String(cfg.alt || "");
			if (!src) return null;
			return h("img", {
				alt,
				src,
				style: "max-width:100%;height:auto;display:block;margin:0.5rem auto"
			});
		}
		default:
			if (String(component.type).toUpperCase() === "RICH_TEXT") return h("div", {
				class: "thunderid-signup__rich-text",
				innerHTML: String(cfg.text || cfg.label || "")
			});
			return null;
	}
};
/**
* Render an array of V1 flow components as Vue VNodes, flattening nested
* containers (FORM) into a single list.
*/
const renderSignUpComponents$1 = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, onSubmit, options) => {
	const result = [];
	components.forEach((component) => {
		const rendered = createSignUpComponent({
			buttonClassName: options?.buttonClassName,
			component,
			formErrors,
			formValues,
			inputClassName: options?.inputClassName,
			isFormValid,
			isLoading,
			onInputChange,
			onSubmit,
			size: options?.size,
			touchedFields
		});
		if (rendered === null) return;
		if (Array.isArray(rendered)) result.push(...rendered);
		else result.push(rendered);
	});
	return result;
};

//#endregion
//#region src/components/auth/sign-up/v1/BaseSignUp.ts
const logger$2 = createVueLogger("BaseSignUpV1");
/**
* V1 BaseSignUp — component-driven app-native sign-up for Vue.
*
* Mirrors `packages/react/.../SignUp/v1/BaseSignUp.tsx`. Reads the
* `/api/server/v1/flow/execute` response shape (`TYPOGRAPHY`, `FORM`, `INPUT`,
* `BUTTON`, `RICH_TEXT`, etc.) and renders it via the V1
* `SignUpOptionFactory`. Tracks form state internally and submits steps via
* the `onSubmit` prop until the flow completes.
*/
const BaseSignUp$2 = defineComponent({
	name: "BaseSignUpV1",
	props: {
		afterSignUpUrl: {
			default: void 0,
			type: String
		},
		buttonClassName: {
			default: "",
			type: String
		},
		className: {
			default: "",
			type: String
		},
		errorClassName: {
			default: "",
			type: String
		},
		inputClassName: {
			default: "",
			type: String
		},
		isInitialized: {
			default: true,
			type: Boolean
		},
		messageClassName: {
			default: "",
			type: String
		},
		onComplete: {
			default: void 0,
			type: Function
		},
		onError: {
			default: void 0,
			type: Function
		},
		onFlowChange: {
			default: void 0,
			type: Function
		},
		onInitialize: {
			default: void 0,
			type: Function
		},
		onSubmit: {
			default: void 0,
			type: Function
		},
		shouldRedirectAfterSignUp: {
			default: true,
			type: Boolean
		},
		showLogo: {
			default: true,
			type: Boolean
		},
		showSubtitle: {
			default: true,
			type: Boolean
		},
		showTitle: {
			default: true,
			type: Boolean
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	emits: [
		"error",
		"flowChange",
		"complete"
	],
	setup(props, { slots, emit }) {
		const { t } = useI18n_default();
		const { title: flowTitle, subtitle: flowSubtitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
		const isLoading = ref(false);
		const isFlowInitialized = ref(false);
		const currentFlow = ref(null);
		const formValues = ref({});
		const touchedFields = ref({});
		const formErrors = ref({});
		let initializationAttempted = false;
		const handleError = (err) => {
			let errorMessage = t("errors.signup.flow.failure") || "Sign-up failed";
			if (err && typeof err === "object") {
				if (err.code && (err.message || err.description)) errorMessage = err.description || err.message;
				else if (err.message) errorMessage = err.message;
			} else if (typeof err === "string") errorMessage = err;
			clearMessages();
			addMessage({
				message: errorMessage,
				type: "error"
			});
		};
		/**
		* Walk the V1 component tree and collect every INPUT's bound parameter
		* name. The parameter name comes from `config.identifier` (a SCIM claim
		* URI) or `config.name`, falling back to the component id.
		*/
		const collectInputNames = (components) => {
			const names = [];
			const walk = (comps) => {
				comps.forEach((component) => {
					const cfg = component.config || {};
					if (component.type === EmbeddedFlowComponentType$1.Input) {
						const name = cfg.name || cfg.identifier || component.id;
						if (name) names.push(name);
					}
					const children = component.components || [];
					if (children.length > 0) walk(children);
				});
			};
			walk(components);
			return names;
		};
		const setupFormFields = (response) => {
			const names = collectInputNames(response.data?.components || []);
			const initial = {};
			names.forEach((name) => {
				initial[name] = "";
			});
			formValues.value = initial;
			touchedFields.value = {};
			formErrors.value = {};
		};
		const handleInputChange = (name, value) => {
			formValues.value = {
				...formValues.value,
				[name]: value
			};
			touchedFields.value = {
				...touchedFields.value,
				[name]: true
			};
			if (formErrors.value[name]) {
				const next = { ...formErrors.value };
				delete next[name];
				formErrors.value = next;
			}
		};
		const isFormValid = () => Object.keys(formErrors.value).length === 0;
		/**
		* Mirror the React V1 popup-based redirection handler for social/IdP
		* registration steps. Opens a popup, waits for the OAuth code, and submits
		* `{code, state}` as the next flow step.
		*
		* Returns `true` if redirection was handled (caller should not fall
		* through), `false` otherwise.
		*/
		const handleRedirectionIfNeeded = (response) => {
			if (response?.type !== EmbeddedFlowResponseType.Redirection || !response?.data?.redirectURL) return false;
			if (typeof window === "undefined") return false;
			const redirectUrl = response.data.redirectURL;
			const popup = window.open(redirectUrl, "oauth_popup", "width=500,height=600,scrollbars=yes,resizable=yes");
			if (!popup) {
				logger$2.error("Failed to open popup window for social sign-up redirect");
				return false;
			}
			let processed = false;
			let popupMonitor;
			let messageHandler;
			const cleanup = () => {
				window.removeEventListener("message", messageHandler);
				if (popupMonitor) clearInterval(popupMonitor);
			};
			const continueWithCode = async (code, state) => {
				const payload = {
					...currentFlow.value?.flowId && { flowId: currentFlow.value.flowId },
					actionId: "",
					flowType: currentFlow.value?.flowType || "REGISTRATION",
					inputs: {
						code,
						state
					}
				};
				try {
					const next = await props.onSubmit(payload);
					props.onFlowChange?.(next);
					emit("flowChange", next);
					if (next.flowStatus === EmbeddedFlowStatus.Complete) {
						props.onComplete?.(next);
						emit("complete", next);
					} else if (next.flowStatus === EmbeddedFlowStatus.Incomplete) {
						currentFlow.value = next;
						setupFormFields(next);
					}
				} catch (err) {
					handleError(err);
					props.onError?.(err);
					emit("error", err);
				} finally {
					popup.close();
					cleanup();
				}
			};
			messageHandler = async (event) => {
				if (event.source !== popup) return;
				const expectedOrigin = props.afterSignUpUrl ? new URL(props.afterSignUpUrl).origin : window.location.origin;
				if (event.origin !== expectedOrigin && event.origin !== window.location.origin) return;
				const { code, state } = event.data || {};
				if (code && state && !processed) {
					processed = true;
					await continueWithCode(code, state);
				}
			};
			window.addEventListener("message", messageHandler);
			popupMonitor = setInterval(async () => {
				try {
					if (popup.closed) {
						cleanup();
						return;
					}
					if (processed) return;
					let popupUrl;
					try {
						popupUrl = popup.location.href;
					} catch {
						return;
					}
					if (!popupUrl) return;
					if (popupUrl.includes("code=") || popupUrl.includes("error=")) {
						const url = new URL(popupUrl);
						const code = url.searchParams.get("code");
						const state = url.searchParams.get("state");
						const error = url.searchParams.get("error");
						if (error) {
							processed = true;
							logger$2.error(`OAuth error during social sign-up: ${error}`);
							popup.close();
							cleanup();
							return;
						}
						if (code && state) {
							processed = true;
							await continueWithCode(code, state);
						}
					}
				} catch (err) {
					logger$2.error("Error monitoring sign-up popup");
				}
			}, 1e3);
			return true;
		};
		const handleSubmit = async (component, data) => {
			if (!currentFlow.value) return;
			isLoading.value = true;
			clearMessages();
			try {
				const filteredInputs = {};
				const sourceInputs = data ?? formValues.value;
				Object.entries(sourceInputs).forEach(([key, value]) => {
					if (value !== null && value !== void 0 && value !== "") filteredInputs[key] = value;
				});
				const actionId = component?.actionId || component?.id;
				const payload = {
					...currentFlow.value.flowId && { flowId: currentFlow.value.flowId },
					flowType: currentFlow.value.flowType || "REGISTRATION",
					inputs: filteredInputs,
					...actionId && { actionId }
				};
				const response = await props.onSubmit(payload);
				props.onFlowChange?.(response);
				emit("flowChange", response);
				if (response?.flowStatus === EmbeddedFlowStatus.Complete) {
					props.onComplete?.(response);
					emit("complete", response);
					return;
				}
				if (response?.flowStatus === EmbeddedFlowStatus.Incomplete) {
					if (handleRedirectionIfNeeded(response)) return;
					currentFlow.value = response;
					setupFormFields(response);
				}
			} catch (err) {
				handleError(err);
				props.onError?.(err);
				emit("error", err);
			} finally {
				isLoading.value = false;
			}
		};
		watch(() => [props.isInitialized, isFlowInitialized.value], ([initialized, flowInit]) => {
			if (!initialized || flowInit || initializationAttempted) return;
			if (!props.onInitialize) return;
			initializationAttempted = true;
			(async () => {
				isLoading.value = true;
				clearMessages();
				try {
					const response = await props.onInitialize();
					currentFlow.value = response;
					isFlowInitialized.value = true;
					props.onFlowChange?.(response);
					emit("flowChange", response);
					if (response?.flowStatus === EmbeddedFlowStatus.Complete) {
						props.onComplete?.(response);
						emit("complete", response);
						return;
					}
					if (response?.flowStatus === EmbeddedFlowStatus.Incomplete) setupFormFields(response);
				} catch (err) {
					handleError(err);
					props.onError?.(err);
					emit("error", err);
				} finally {
					isLoading.value = false;
				}
			})();
		}, { immediate: true });
		return () => {
			const containerClass = [
				withVendorCSSClassPrefix("signup"),
				withVendorCSSClassPrefix(`signup--${props.size}`),
				withVendorCSSClassPrefix(`signup--${props.variant}`),
				props.className
			].filter(Boolean).join(" ");
			if (slots["default"]) {
				const renderProps = {
					components: currentFlow.value?.data?.components || [],
					errors: formErrors.value,
					handleInputChange,
					handleSubmit,
					isLoading: isLoading.value,
					isValid: isFormValid(),
					messages: flowMessages.value || [],
					subtitle: flowSubtitle.value || t("signup.subheading") || "",
					title: flowTitle.value || t("signup.heading") || "",
					touched: touchedFields.value,
					values: formValues.value
				};
				return h("div", { class: containerClass }, slots["default"](renderProps));
			}
			if (!isFlowInitialized.value && isLoading.value) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => h("div", { style: "display:flex;justify-content:center;padding:2rem" }, h(Spinner_default)));
			if (!currentFlow.value) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => h(Alert_default, { variant: "error" }, () => t("errors.signup.flow.initialization.failure") || "Failed to initialize sign-up flow"));
			const rendered = renderSignUpComponents$1(currentFlow.value.data?.components || [], formValues.value, touchedFields.value, formErrors.value, isLoading.value, isFormValid(), handleInputChange, handleSubmit, {
				buttonClassName: props.buttonClassName,
				inputClassName: props.inputClassName,
				size: props.size
			});
			const cardChildren = [];
			if (props.showLogo) cardChildren.push(h("div", { style: "display:flex;justify-content:center;margin-bottom:1rem" }, [h(Logo_default)]));
			if (props.showTitle || props.showSubtitle) {
				const headerChildren = [];
				if (props.showTitle) headerChildren.push(h(Typography_default, { variant: "h2" }, { default: () => flowTitle.value || t("signup.heading") || "Sign Up" }));
				if (props.showSubtitle) headerChildren.push(h(Typography_default, { variant: "body1" }, { default: () => flowSubtitle.value || t("signup.subheading") || "Create your account" }));
				cardChildren.push(h("div", { style: "padding: 0 1rem 1rem" }, headerChildren));
			}
			if (flowMessages.value && flowMessages.value.length > 0) cardChildren.push(h("div", { style: "padding: 0 1rem" }, flowMessages.value.map((msg, i) => h(Alert_default, {
				class: props.messageClassName,
				key: msg.id || i,
				variant: msg.type?.toLowerCase() === "error" ? "error" : "info"
			}, () => msg.message))));
			cardChildren.push(h("form", {
				class: withVendorCSSClassPrefix("signup__form"),
				onSubmit: (e) => {
					e.preventDefault();
					handleSubmit({
						config: { type: "submit" },
						type: "BUTTON"
					});
				},
				style: "padding: 1rem;display:flex;flex-direction:column;gap:0.75rem"
			}, rendered.length > 0 ? rendered : [h(Alert_default, { variant: "warning" }, () => t("errors.signup.components.not.available") || "No components available")]));
			return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => cardChildren);
		};
	}
});
var BaseSignUp_default$1 = BaseSignUp$2;

//#endregion
//#region src/components/auth/sign-up/v1/SignUp.ts
/**
* V1 SignUp container — wires `useThunderID().signUp` into `BaseSignUpV1` and
* handles redirects after the flow completes.
*
* Mirrors `sign-up/v2/.../SignUp.ts` but invokes the V1 base component which
* understands the `TYPOGRAPHY` / `INPUT` / `BUTTON` / `FORM` shapes returned by
* the V1 flow API.
*/
const SignUp$2 = defineComponent({
	name: "SignUpV1",
	props: {
		afterSignUpUrl: {
			default: void 0,
			type: String
		},
		buttonClassName: {
			default: "",
			type: String
		},
		className: {
			default: "",
			type: String
		},
		errorClassName: {
			default: "",
			type: String
		},
		inputClassName: {
			default: "",
			type: String
		},
		messageClassName: {
			default: "",
			type: String
		},
		onComplete: {
			default: void 0,
			type: Function
		},
		onError: {
			default: void 0,
			type: Function
		},
		shouldRedirectAfterSignUp: {
			default: true,
			type: Boolean
		},
		showSubtitle: {
			default: true,
			type: Boolean
		},
		showTitle: {
			default: true,
			type: Boolean
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	setup(props, { slots }) {
		const { signUp, isInitialized, applicationId } = useThunderID_default();
		const handleInitialize = async (payload) => {
			const applicationIdFromUrl = typeof window !== "undefined" ? new URL(window.location.href).searchParams.get("applicationId") : null;
			const effectiveApplicationId = applicationId || applicationIdFromUrl || void 0;
			return await signUp(payload || {
				flowType: EmbeddedFlowType.Registration,
				...effectiveApplicationId && { applicationId: effectiveApplicationId }
			});
		};
		const handleOnSubmit = async (payload) => await signUp(payload);
		const handleComplete = (response) => {
			props.onComplete?.(response);
			const oauthRedirectUrl = response?.redirectUrl;
			if (props.shouldRedirectAfterSignUp && oauthRedirectUrl) {
				if (typeof window !== "undefined") window.location.href = oauthRedirectUrl;
				return;
			}
			if (props.shouldRedirectAfterSignUp && response?.type !== EmbeddedFlowResponseType.Redirection && props.afterSignUpUrl) {
				if (typeof window !== "undefined") window.location.href = props.afterSignUpUrl;
			}
		};
		return () => h(BaseSignUp_default$1, {
			afterSignUpUrl: props.afterSignUpUrl,
			buttonClassName: props.buttonClassName,
			className: props.className,
			errorClassName: props.errorClassName,
			inputClassName: props.inputClassName,
			isInitialized: isInitialized?.value ?? false,
			messageClassName: props.messageClassName,
			onComplete: handleComplete,
			onError: props.onError,
			onInitialize: handleInitialize,
			onSubmit: handleOnSubmit,
			showSubtitle: props.showSubtitle,
			showTitle: props.showTitle,
			size: props.size,
			variant: props.variant
		}, slots["default"] ? { default: (renderProps) => slots["default"](renderProps) } : void 0);
	}
});
var SignUp_default$1 = SignUp$2;

//#endregion
//#region src/utils/v2/getAuthComponentHeadings.ts
/**
* Extracts heading and subheading components from authentication flow components
* and provides resolved title/subtitle text with fallback logic.
*/
const getAuthComponentHeadings = (components, flowTitle, flowSubtitle, defaultTitle, defaultSubtitle) => {
	let heading = null;
	let subheading = null;
	const findHeadings = (comps) => {
		comps.some((component) => {
			if (component.type === "TEXT" && component.variant?.startsWith("HEADING_")) {
				if (!heading) heading = component;
				else if (!subheading) {
					subheading = component;
					return true;
				}
			}
			if (component.components && component.components.length > 0) {
				findHeadings(component.components);
				return Boolean(heading && subheading);
			}
			return false;
		});
	};
	const filterComponents = (comps) => {
		let foundHeadings = 0;
		const maxHeadings = 2;
		const filter = (items) => items.reduce((acc, component) => {
			if (foundHeadings < maxHeadings && component.type === "TEXT" && component.variant?.startsWith("HEADING_")) {
				foundHeadings += 1;
				return acc;
			}
			if (component.components && component.components.length > 0) {
				const filteredNestedComponents = filter(component.components);
				if (filteredNestedComponents.length > 0) acc.push({
					...component,
					components: filteredNestedComponents
				});
			} else acc.push(component);
			return acc;
		}, []);
		return filter(comps);
	};
	const getComponentText = (component) => {
		if (!component) return "";
		return component.label || "";
	};
	findHeadings(components);
	const headingText = getComponentText(heading);
	const subheadingText = getComponentText(subheading);
	return {
		componentsWithoutHeadings: filterComponents(components),
		headingComponents: {
			heading,
			subheading
		},
		subtitle: flowSubtitle || subheadingText || defaultSubtitle || "",
		title: flowTitle || headingText || defaultTitle || ""
	};
};
var getAuthComponentHeadings_default = getAuthComponentHeadings;

//#endregion
//#region src/components/auth/sign-up/v2/BaseSignUp.ts
const logger$1 = createVueLogger("BaseSignUp");
const extractFormFields = (components) => {
	const fields = [];
	const process = (comps) => {
		comps.forEach((c) => {
			if (c.type === EmbeddedFlowComponentTypeV2.TextInput || c.type === EmbeddedFlowComponentTypeV2.PasswordInput || c.type === EmbeddedFlowComponentTypeV2.EmailInput || c.type === EmbeddedFlowComponentTypeV2.Select) {
				const fieldName = c.ref || c.id;
				fields.push({
					name: fieldName,
					required: c.required || false,
					type: c.type
				});
			}
			if (c.components && Array.isArray(c.components)) process(c.components);
		});
	};
	process(components);
	return fields;
};
/**
* BaseSignUp — app-native sign-up presentation component.
*
* Manages the sign-up flow lifecycle including initialization, form state,
* passkey registration, popup-based social OAuth, and renders the server-driven UI.
*/
const BaseSignUp$1 = defineComponent({
	name: "BaseSignUp",
	props: {
		afterSignUpUrl: {
			default: void 0,
			type: String
		},
		buttonClassName: {
			default: "",
			type: String
		},
		className: {
			default: "",
			type: String
		},
		error: {
			default: null,
			type: Object
		},
		errorClassName: {
			default: "",
			type: String
		},
		inputClassName: {
			default: "",
			type: String
		},
		isInitialized: {
			default: false,
			type: Boolean
		},
		messageClassName: {
			default: "",
			type: String
		},
		onComplete: {
			default: void 0,
			type: Function
		},
		onError: {
			default: void 0,
			type: Function
		},
		onFlowChange: {
			default: void 0,
			type: Function
		},
		onInitialize: {
			default: void 0,
			type: Function
		},
		onSubmit: {
			default: void 0,
			type: Function
		},
		showSubtitle: {
			default: true,
			type: Boolean
		},
		showTitle: {
			default: true,
			type: Boolean
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	emits: [
		"error",
		"complete",
		"flowChange"
	],
	setup(props, { slots }) {
		const { meta: flowMetaRef } = useFlowMeta_default();
		const { t } = useI18n_default();
		const isLoading = ref(false);
		const isFlowInitialized = ref(false);
		const currentFlow = ref(null);
		const apiError = ref(null);
		const flowMessages = ref([]);
		const passkeyState = ref({
			actionId: null,
			creationOptions: null,
			error: null,
			flowId: null,
			isActive: false
		});
		const formValues = ref({});
		const touchedFields = ref({});
		const formErrors = ref({});
		const isFormValid = ref(true);
		let initializationAttempted = false;
		let passkeyProcessed = false;
		const handleError = (error) => {
			const errorMessage = error?.failureReason || extractErrorMessage(error, t);
			apiError.value = error instanceof Error ? error : new Error(errorMessage);
			flowMessages.value = [{
				message: errorMessage,
				type: "error"
			}];
		};
		const normalizeFlowResponseLocal = (response) => {
			if (response?.data?.components && Array.isArray(response.data.components)) return response;
			if (response?.data) {
				const { components } = normalizeFlowResponse(response, t, {
					defaultErrorKey: "components.signUp.errors.generic",
					resolveTranslations: false
				}, flowMetaRef.value);
				return {
					...response,
					data: {
						...response.data,
						components
					}
				};
			}
			return response;
		};
		const setupFormFields = (flowResponse) => {
			const fields = extractFormFields(flowResponse.data?.components || []);
			const initialValues = {};
			fields.forEach((f) => {
				initialValues[f.name] = "";
			});
			formValues.value = initialValues;
			touchedFields.value = {};
			formErrors.value = {};
			isFormValid.value = true;
		};
		const computeFormErrors = () => {
			const fields = extractFormFields(currentFlow.value?.data?.components || []);
			const errors = {};
			fields.forEach((field) => {
				const value = formValues.value[field.name] || "";
				if (field.required && (!value || value.trim() === "")) errors[field.name] = t("validations.required.field.error") || "This field is required";
				if ((field.type === EmbeddedFlowComponentTypeV2.EmailInput || field.type === "EMAIL") && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[field.name] = t("field.email.invalid") || "Invalid email address";
			});
			return errors;
		};
		const touchAllFields = () => {
			const fields = extractFormFields(currentFlow.value?.data?.components || []);
			const newTouched = {};
			fields.forEach((f) => {
				newTouched[f.name] = true;
			});
			touchedFields.value = newTouched;
		};
		const validateForm = () => {
			touchAllFields();
			const errors = computeFormErrors();
			formErrors.value = errors;
			const valid = Object.keys(errors).length === 0;
			isFormValid.value = valid;
			return {
				fieldErrors: errors,
				isValid: valid
			};
		};
		const handleInputChange = (name, value) => {
			formValues.value = {
				...formValues.value,
				[name]: value
			};
		};
		const handleInputBlur = (name) => {
			touchedFields.value = {
				...touchedFields.value,
				[name]: true
			};
		};
		const handleRedirectionIfNeeded = (response) => {
			if (response?.type !== EmbeddedFlowResponseType.Redirection || !response?.data?.redirectURL) return false;
			const redirectUrl = response.data.redirectURL;
			const popup = window.open(redirectUrl, "oauth_popup", "width=500,height=600,scrollbars=yes,resizable=yes");
			if (!popup) {
				logger$1.error("Failed to open popup window");
				return false;
			}
			let hasProcessedCallback = false;
			let popupMonitor = null;
			let messageHandler = null;
			const cleanup = () => {
				if (messageHandler) window.removeEventListener("message", messageHandler);
				if (popupMonitor) clearInterval(popupMonitor);
			};
			const processOAuthCode = async (code, state) => {
				const payload = {
					...currentFlow.value?.flowId && { flowId: currentFlow.value.flowId },
					action: "",
					flowType: currentFlow.value?.flowType || "REGISTRATION",
					inputs: {
						code,
						state
					}
				};
				try {
					const continueResponse = await props.onSubmit(payload);
					props.onFlowChange?.(continueResponse);
					if (continueResponse.flowStatus === EmbeddedFlowStatus.Complete) props.onComplete?.(continueResponse);
					else if (continueResponse.flowStatus === EmbeddedFlowStatus.Incomplete) {
						currentFlow.value = continueResponse;
						setupFormFields(continueResponse);
					}
					popup.close();
					cleanup();
				} catch (err) {
					handleError(err);
					props.onError?.(err);
					popup.close();
					cleanup();
				}
			};
			messageHandler = async (event) => {
				if (event.source !== popup) return;
				const expectedOrigin = props.afterSignUpUrl ? new URL(props.afterSignUpUrl).origin : window.location.origin;
				if (event.origin !== expectedOrigin && event.origin !== window.location.origin) return;
				const { code, state } = event.data;
				if (code && state) await processOAuthCode(code, state);
			};
			window.addEventListener("message", messageHandler);
			popupMonitor = setInterval(async () => {
				try {
					if (popup.closed) {
						cleanup();
						return;
					}
					if (hasProcessedCallback) return;
					try {
						const popupUrl = popup.location.href;
						if (popupUrl && (popupUrl.includes("code=") || popupUrl.includes("error="))) {
							hasProcessedCallback = true;
							const url = new URL(popupUrl);
							const code = url.searchParams.get("code");
							const state = url.searchParams.get("state");
							if (url.searchParams.get("error")) {
								logger$1.error("OAuth error");
								popup.close();
								cleanup();
								return;
							}
							if (code && state) await processOAuthCode(code, state);
						}
					} catch {}
				} catch {
					logger$1.error("Error monitoring popup");
				}
			}, 1e3);
			return true;
		};
		const handleSubmit = async (component, data, skipValidation) => {
			if (!currentFlow.value) return;
			if (!skipValidation) {
				if (!validateForm().isValid) return;
			}
			isLoading.value = true;
			apiError.value = null;
			flowMessages.value = [];
			try {
				const filteredInputs = {};
				if (data) Object.entries(data).forEach(([key, value]) => {
					if (value !== null && value !== void 0 && value !== "") filteredInputs[key] = value;
				});
				const payload = {
					...currentFlow.value.flowId && { flowId: currentFlow.value.flowId },
					flowType: currentFlow.value.flowType || "REGISTRATION",
					...component.id && { action: component.id },
					inputs: filteredInputs
				};
				const response = normalizeFlowResponseLocal(await props.onSubmit(payload));
				props.onFlowChange?.(response);
				if (response.flowStatus === EmbeddedFlowStatus.Complete) {
					props.onComplete?.(response);
					return;
				}
				if (response.flowStatus === EmbeddedFlowStatus.Incomplete) {
					if (handleRedirectionIfNeeded(response)) return;
					if (response.data?.additionalData?.["passkeyCreationOptions"]) {
						const { passkeyCreationOptions } = response.data.additionalData;
						const effectiveFlowId = response.flowId || currentFlow.value?.flowId;
						passkeyProcessed = false;
						passkeyState.value = {
							actionId: component.id || "submit",
							creationOptions: passkeyCreationOptions,
							error: null,
							flowId: effectiveFlowId || null,
							isActive: true
						};
						isLoading.value = false;
						return;
					}
					currentFlow.value = response;
					setupFormFields(response);
				}
			} catch (err) {
				handleError(err);
				props.onError?.(err);
			} finally {
				isLoading.value = false;
			}
		};
		watch(() => passkeyState.value, async (state) => {
			if (!state.isActive || !state.creationOptions || !state.flowId) return;
			if (passkeyProcessed) return;
			passkeyProcessed = true;
			try {
				const passkeyResponse = await handlePasskeyRegistration(state.creationOptions);
				const passkeyObj = JSON.parse(passkeyResponse);
				const inputs = {
					attestationObject: passkeyObj.response.attestationObject,
					clientDataJSON: passkeyObj.response.clientDataJSON,
					credentialId: passkeyObj.id
				};
				const payload = {
					actionId: state.actionId || "submit",
					flowId: state.flowId,
					flowType: currentFlow.value?.flowType || "REGISTRATION",
					inputs
				};
				const processed = normalizeFlowResponseLocal(await props.onSubmit(payload));
				props.onFlowChange?.(processed);
				if (processed.flowStatus === EmbeddedFlowStatus.Complete) props.onComplete?.(processed);
				else {
					currentFlow.value = processed;
					setupFormFields(processed);
				}
				passkeyState.value = {
					actionId: null,
					creationOptions: null,
					error: null,
					flowId: null,
					isActive: false
				};
			} catch (error) {
				passkeyState.value = {
					...passkeyState.value,
					error,
					isActive: false
				};
				handleError(error);
				props.onError?.(error);
			}
		}, { deep: true });
		watch(() => [props.isInitialized, isFlowInitialized.value], ([initialized, flowInit]) => {
			const urlParams = new URL(window.location.href).searchParams;
			if (urlParams.get("code") || urlParams.get("state")) return;
			if (initialized && !flowInit && !initializationAttempted) {
				initializationAttempted = true;
				(async () => {
					isLoading.value = true;
					apiError.value = null;
					flowMessages.value = [];
					try {
						const response = normalizeFlowResponseLocal(await props.onInitialize());
						currentFlow.value = response;
						isFlowInitialized.value = true;
						props.onFlowChange?.(response);
						if (response.flowStatus === EmbeddedFlowStatus.Complete) {
							props.onComplete?.(response);
							return;
						}
						if (response.flowStatus === EmbeddedFlowStatus.Incomplete) setupFormFields(response);
					} catch (err) {
						handleError(err);
						props.onError?.(err);
					} finally {
						isLoading.value = false;
					}
				})();
			}
		}, { immediate: true });
		return () => {
			const containerClass = [
				withVendorCSSClassPrefix("signup"),
				withVendorCSSClassPrefix(`signup--${props.size}`),
				withVendorCSSClassPrefix(`signup--${props.variant}`),
				props.className
			].filter(Boolean).join(" ");
			if (slots["default"]) {
				const renderProps = {
					components: currentFlow.value?.data?.components || [],
					error: apiError.value,
					fieldErrors: formErrors.value,
					handleInputChange,
					handleSubmit,
					isLoading: isLoading.value,
					isValid: isFormValid.value,
					messages: flowMessages.value,
					subtitle: t("signup.subheading") || "Create your account",
					title: t("signup.heading") || "Sign Up",
					touched: touchedFields.value,
					validateForm: () => {
						const result = validateForm();
						return {
							fieldErrors: result.fieldErrors,
							isValid: result.isValid
						};
					},
					values: formValues.value
				};
				return h("div", { class: containerClass }, slots["default"](renderProps));
			}
			if (!isFlowInitialized.value && isLoading.value) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => h("div", { style: "display:flex;justify-content:center;padding:2rem" }, h(Spinner_default)));
			if (!currentFlow.value) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => h(Alert_default, { variant: "error" }, () => t("errors.signup.flow.initialization.failure") || "Failed to initialize sign-up flow"));
			const { title, subtitle, componentsWithoutHeadings } = getAuthComponentHeadings_default(currentFlow.value.data?.components || [], void 0, void 0, t("signup.heading") || "Sign Up", t("signup.subheading") || "Create your account");
			const meta = flowMetaRef.value;
			const renderedComponents = componentsWithoutHeadings.length > 0 ? renderSignUpComponents(componentsWithoutHeadings, formValues.value, touchedFields.value, formErrors.value, isLoading.value, isFormValid.value, handleInputChange, {
				buttonClassName: props.buttonClassName,
				inputClassName: props.inputClassName,
				meta,
				onInputBlur: handleInputBlur,
				onSubmit: handleSubmit,
				size: props.size,
				t,
				variant: props.variant
			}) : [];
			return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => [
				props.showTitle || props.showSubtitle ? h("div", { style: "padding: 1rem 1rem 0" }, [props.showTitle ? h(Typography_default, { variant: "h5" }, () => title) : null, props.showSubtitle ? h(Typography_default, {
					style: "margin-top: 0.25rem",
					variant: "body1"
				}, () => subtitle) : null]) : null,
				props.error ? h("div", { style: "padding: 0 1rem" }, h(Alert_default, { variant: "error" }, () => props.error.message)) : null,
				flowMessages.value.length > 0 ? h("div", { style: "padding: 0 1rem" }, flowMessages.value.map((msg, i) => h(Alert_default, {
					key: i,
					variant: msg.type === "error" ? "error" : "info"
				}, () => msg.message))) : null,
				h("div", { style: "padding: 1rem" }, renderedComponents.length > 0 ? renderedComponents : [h(Alert_default, { variant: "warning" }, () => t("errors.signup.components.not.available") || "No components available")])
			]);
		};
	}
});
var BaseSignUp_default$2 = BaseSignUp$1;

//#endregion
//#region src/components/auth/sign-up/v2/SignUp.ts
/**
* SignUp — embedded sign-up component that handles API calls and delegates UI to BaseSignUp.
*/
const SignUp$1 = defineComponent({
	name: "SignUp",
	props: {
		afterSignUpUrl: {
			default: void 0,
			type: String
		},
		buttonClassName: {
			default: "",
			type: String
		},
		className: {
			default: "",
			type: String
		},
		errorClassName: {
			default: "",
			type: String
		},
		inputClassName: {
			default: "",
			type: String
		},
		messageClassName: {
			default: "",
			type: String
		},
		onComplete: {
			default: void 0,
			type: Function
		},
		onError: {
			default: void 0,
			type: Function
		},
		shouldRedirectAfterSignUp: {
			default: true,
			type: Boolean
		},
		showSubtitle: {
			default: true,
			type: Boolean
		},
		showTitle: {
			default: true,
			type: Boolean
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	setup(props, { slots }) {
		const { signUp, isInitialized, applicationId } = useThunderID_default();
		const handleInitialize = async (payload) => {
			const applicationIdFromUrl = new URL(window.location.href).searchParams.get("applicationId");
			const effectiveApplicationId = applicationId || applicationIdFromUrl || void 0;
			return await signUp(payload || {
				flowType: EmbeddedFlowType.Registration,
				...effectiveApplicationId && { applicationId: effectiveApplicationId }
			});
		};
		const handleOnSubmit = async (payload) => await signUp(payload);
		const handleComplete = (response) => {
			props.onComplete?.(response);
			const oauthRedirectUrl = response?.redirectUrl;
			if (props.shouldRedirectAfterSignUp && oauthRedirectUrl) {
				window.location.href = oauthRedirectUrl;
				return;
			}
			if (props.shouldRedirectAfterSignUp && response?.type !== EmbeddedFlowResponseType.Redirection && props.afterSignUpUrl) window.location.href = props.afterSignUpUrl;
			if (props.shouldRedirectAfterSignUp && response?.type === EmbeddedFlowResponseType.Redirection && response?.data?.redirectURL && !response.data.redirectURL.includes("oauth") && !response.data.redirectURL.includes("auth")) window.location.href = response.data.redirectURL;
		};
		return () => h(BaseSignUp_default$2, {
			afterSignUpUrl: props.afterSignUpUrl,
			buttonClassName: props.buttonClassName,
			className: props.className,
			errorClassName: props.errorClassName,
			inputClassName: props.inputClassName,
			isInitialized: isInitialized?.value ?? false,
			messageClassName: props.messageClassName,
			onComplete: handleComplete,
			onError: props.onError,
			onInitialize: handleInitialize,
			onSubmit: handleOnSubmit,
			showSubtitle: props.showSubtitle,
			showTitle: props.showTitle,
			size: props.size,
			variant: props.variant
		}, slots["default"] ? { default: (renderProps) => slots["default"](renderProps) } : void 0);
	}
});
var SignUp_default$2 = SignUp$1;

//#endregion
//#region src/components/auth/sign-up/SignUp.ts
/**
* SignUp — platform-aware sign-up container.
*
* Routes to V1 (default, component-driven V1 flow API) or V2 (`ThunderIDV2`
* platform) based on the `platform` value from {@link useThunderID}. Mirrors
* the existing `SignIn` dispatcher pattern in this package.
*/
const SignUp = defineComponent({
	name: "SignUp",
	inheritAttrs: false,
	setup(_props, { attrs, slots }) {
		const { platform } = useThunderID_default();
		return () => {
			if (platform === Platform.ThunderID) return h(SignUp_default$2, { ...attrs }, slots);
			return h(SignUp_default$1, { ...attrs }, slots);
		};
	}
});
var SignUp_default = SignUp;

//#endregion
//#region src/components/auth/sign-up/BaseSignUp.ts
/**
* BaseSignUp — platform-aware base sign-up component.
*
* Routes to V1 (component-driven, V1 flow API: `TYPOGRAPHY` / `INPUT` /
* `BUTTON` / `FORM` shapes) or V2 (`ThunderIDV2` platform with `BLOCK` / `STACK`
* / `TEXT_INPUT` shapes) based on the `platform` value resolved by
* {@link useThunderID}.
*
* Mirrors the React `BaseSignUp` dispatcher and matches the existing pattern
* already used by `BaseSignIn` in this package.
*/
const BaseSignUp = defineComponent({
	name: "BaseSignUp",
	inheritAttrs: false,
	setup(_props, { attrs, slots }) {
		const { platform } = useThunderID_default();
		return () => {
			if (platform === Platform.ThunderID) return h(BaseSignUp_default$2, { ...attrs }, slots);
			return h(BaseSignUp_default$1, { ...attrs }, slots);
		};
	}
});
var BaseSignUp_default = BaseSignUp;

//#endregion
//#region src/components/control/SignedIn.ts
/**
* A component that only renders its children when the user is signed in.
*
* @example
* ```vue
* <SignedIn>
*   <p>Welcome! You are signed in.</p>
*   <template #fallback>
*     <p>Please sign in to continue</p>
*   </template>
* </SignedIn>
* ```
*/
const SignedIn = defineComponent({
	name: "SignedIn",
	setup(_props, { slots }) {
		const { isSignedIn } = useThunderID_default();
		return () => {
			if (!isSignedIn.value) {
				const fallbackContent = slots.fallback?.();
				return fallbackContent ? h(Fragment, {}, fallbackContent) : null;
			}
			const defaultContent = slots.default?.();
			return defaultContent ? h(Fragment, {}, defaultContent) : null;
		};
	}
});
var SignedIn_default = SignedIn;

//#endregion
//#region src/components/control/SignedOut.ts
/**
* A component that only renders its children when the user is signed out.
*
* @example
* ```vue
* <SignedOut>
*   <p>Please sign in to continue</p>
*   <template #fallback>
*     <p>You are already signed in</p>
*   </template>
* </SignedOut>
* ```
*/
const SignedOut = defineComponent({
	name: "SignedOut",
	setup(_props, { slots }) {
		const { isSignedIn } = useThunderID_default();
		return () => {
			if (isSignedIn.value) {
				const fallbackContent = slots.fallback?.();
				return fallbackContent ? h(Fragment, {}, fallbackContent) : null;
			}
			const defaultContent = slots.default?.();
			return defaultContent ? h(Fragment, {}, defaultContent) : null;
		};
	}
});
var SignedOut_default = SignedOut;

//#endregion
//#region src/components/control/Loading.ts
/**
* A component that only renders its children when ThunderID is loading.
*
* @example
* ```vue
* <Loading>
*   <p>Loading...</p>
*   <template #fallback>
*     <p>Finished loading</p>
*   </template>
* </Loading>
* ```
*/
const Loading = defineComponent({
	name: "Loading",
	setup(_props, { slots }) {
		const { isLoading } = useThunderID_default();
		return () => {
			if (!isLoading.value) {
				const fallbackContent = slots.fallback?.();
				return fallbackContent ? h(Fragment, {}, fallbackContent) : null;
			}
			const defaultContent = slots.default?.();
			return defaultContent ? h(Fragment, {}, defaultContent) : null;
		};
	}
});
var Loading_default = Loading;

//#endregion
//#region src/components/presentation/user/User.ts
/**
* User — presentation component that exposes the current user via a scoped slot.
*
* Renders the `default` slot with `{ user }` when a user is signed in,
* or the `fallback` slot when no user is available.
*
* @example
* ```vue
* <User>
*   <template #default="{ user }">
*     <p>Welcome, {{ user.given_name }}!</p>
*   </template>
*   <template #fallback>
*     <p>No user signed in.</p>
*   </template>
* </User>
* ```
*/
const User = defineComponent({
	name: "User",
	setup(_props, { slots }) {
		const { user } = useThunderID_default();
		return () => {
			if (!user.value) {
				const fallbackContent = slots.fallback?.();
				return fallbackContent ? h(Fragment, {}, fallbackContent) : null;
			}
			const defaultContent = slots.default?.({ user: user.value });
			return defaultContent ? h(Fragment, {}, defaultContent) : null;
		};
	}
});
var User_default = User;

//#endregion
//#region src/components/presentation/organization/Organization.ts
/**
* Organization — presentation component that exposes the current organization via a scoped slot.
*
* Renders the `default` slot with `{ organization }` when a current organization is available,
* or the `fallback` slot when none is set.
*
* @example
* ```vue
* <Organization>
*   <template #default="{ organization }">
*     <p>Current org: {{ organization.name }}</p>
*   </template>
*   <template #fallback>
*     <p>No organization selected.</p>
*   </template>
* </Organization>
* ```
*/
const Organization = defineComponent({
	name: "Organization",
	setup(_props, { slots }) {
		const { currentOrganization } = useOrganization_default();
		return () => {
			if (!currentOrganization?.value) {
				const fallbackContent = slots.fallback?.();
				return fallbackContent ? h(Fragment, {}, fallbackContent) : null;
			}
			const defaultContent = slots.default?.({ organization: currentOrganization.value });
			return defaultContent ? h(Fragment, {}, defaultContent) : null;
		};
	}
});
var Organization_default = Organization;

//#endregion
//#region src/utils/getMappedUserProfileValue.ts
const getMappedUserProfileValue = (key, mappings, user) => {
	if (!key || !mappings || !user) return void 0;
	const mapping = mappings[key];
	if (!mapping) return get(user, key);
	if (Array.isArray(mapping)) {
		let foundValue;
		let found = false;
		mapping.some((path) => {
			const value = get(user, path);
			if (value !== void 0 && value !== null && value !== "") {
				foundValue = value;
				found = true;
				return true;
			}
			return false;
		});
		return found ? foundValue : void 0;
	}
	return get(user, mapping);
};
var getMappedUserProfileValue_default = getMappedUserProfileValue;

//#endregion
//#region src/utils/getDisplayName.ts
const getDisplayName = (mergedMappings, user, displayAttributes) => {
	if (displayAttributes && displayAttributes.length > 0) {
		let foundValue;
		displayAttributes.some((attr) => {
			const value = getMappedUserProfileValue_default(attr, mergedMappings, user);
			if (value !== void 0 && value !== null && value !== "") {
				foundValue = String(value);
				return true;
			}
			return false;
		});
		if (foundValue !== void 0) return foundValue;
	}
	const mappings = mergedMappings;
	const firstName = getMappedUserProfileValue_default("firstName", mappings, user);
	const lastName = getMappedUserProfileValue_default("lastName", mappings, user);
	if (firstName && lastName) return `${firstName} ${lastName}`;
	return getMappedUserProfileValue_default("username", mappings, user) || getMappedUserProfileValue_default("email", mappings, user) || getMappedUserProfileValue_default("name", mappings, user) || "User";
};
var getDisplayName_default = getDisplayName;

//#endregion
//#region src/components/presentation/user-profile/BaseUserProfile.ts
const FIELDS_TO_SKIP = [
	"roles.default",
	"active",
	"groups",
	"accountLocked",
	"accountDisabled",
	"oneTimePassword",
	"userSourceId",
	"idpType",
	"localCredentialExists",
	"ResourceType",
	"ExternalID",
	"MetaData",
	"verifiedMobileNumbers",
	"verifiedEmailAddresses",
	"phoneNumbers.mobile",
	"emailAddresses",
	"preferredMFAOption"
];
const READONLY_FIELDS = [
	"username",
	"userName",
	"user_name"
];
const DEFAULT_ATTRIBUTE_MAPPINGS$1 = {
	email: ["emails", "email"],
	firstName: ["name.givenName", "given_name"],
	lastName: ["name.familyName", "family_name"],
	picture: [
		"profile",
		"profileUrl",
		"picture",
		"URL"
	],
	username: [
		"userName",
		"username",
		"user_name"
	]
};
const AVATAR_GRADIENTS$1 = [
	"linear-gradient(135deg, #4b6ef5 0%, #7c3aed 100%)",
	"linear-gradient(135deg, #0ea5e9 0%, #4b6ef5 100%)",
	"linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)",
	"linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
	"linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)",
	"linear-gradient(135deg, #8b5cf6 0%, #4b6ef5 100%)",
	"linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
	"linear-gradient(135deg, #f97316 0%, #ec4899 100%)"
];
function getAvatarGradient$1(seed) {
	if (!seed) return AVATAR_GRADIENTS$1[0];
	let hash = 0;
	for (let i = 0; i < seed.length; i += 1) hash = hash * 31 + seed.charCodeAt(i) >>> 0;
	return AVATAR_GRADIENTS$1[Math.abs(hash) % AVATAR_GRADIENTS$1.length];
}
function formatLabel(key) {
	return key.split(/(?=[A-Z])|[_.]/).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
function buildScimPatchValue(flatKey, rawValue, schemaId, multiValued) {
	if (flatKey === "phoneNumbers.mobile") return {
		phoneNumbers: [{
			type: "mobile",
			value: rawValue
		}],
		[WellKnownSchemaIds.SystemUser]: { mobileNumbers: [rawValue] }
	};
	const complexMultiValued = new Set([
		"phoneNumbers",
		"emails",
		"ims",
		"photos",
		"addresses",
		"entitlements",
		"roles",
		"x509Certificates"
	]);
	const dotIndex = flatKey.indexOf(".");
	if (dotIndex > 0) {
		const head = flatKey.slice(0, dotIndex);
		const tail = flatKey.slice(dotIndex + 1);
		if (complexMultiValued.has(head)) return { [head]: [{
			type: tail,
			value: rawValue
		}] };
	}
	const value = multiValued ? [rawValue] : rawValue;
	if (schemaId && schemaId !== WellKnownSchemaIds.User) return { [schemaId]: { [flatKey]: value } };
	const segments = flatKey.split(".");
	const nested = {};
	let cursor = nested;
	for (let i = 0; i < segments.length - 1; i += 1) {
		cursor[segments[i]] = {};
		cursor = cursor[segments[i]];
	}
	cursor[segments[segments.length - 1]] = value;
	return nested;
}
const BaseUserProfile = defineComponent({
	name: "BaseUserProfile",
	inheritAttrs: false,
	props: {
		avatarSize: {
			default: "lg",
			type: String
		},
		cardLayout: {
			default: true,
			type: Boolean
		},
		cardVariant: {
			default: "elevated",
			type: String
		},
		className: {
			default: "",
			type: String
		},
		compact: {
			default: false,
			type: Boolean
		},
		editable: {
			default: true,
			type: Boolean
		},
		error: {
			default: null,
			type: String
		},
		flattenedProfile: {
			default: null,
			type: Object
		},
		hideFields: {
			default: () => [],
			type: Array
		},
		isLoading: {
			default: false,
			type: Boolean
		},
		onUpdate: {
			default: void 0,
			type: Function
		},
		profile: {
			default: null,
			type: Object
		},
		schemas: {
			default: () => [],
			type: Array
		},
		showAvatar: {
			default: true,
			type: Boolean
		},
		showFields: {
			default: () => [],
			type: Array
		},
		title: {
			default: "Profile",
			type: String
		}
	},
	setup(props, { slots }) {
		const editingFields = ref({});
		const editedValues = ref({});
		const px = withVendorCSSClassPrefix;
		function shouldShowField(fieldName) {
			if (FIELDS_TO_SKIP.includes(fieldName)) return false;
			if (props.hideFields && props.hideFields.length > 0 && props.hideFields.includes(fieldName)) return false;
			if (props.showFields && props.showFields.length > 0) return props.showFields.includes(fieldName);
			return true;
		}
		function startEditing(fieldName, currentValue) {
			editedValues.value = {
				...editedValues.value,
				[fieldName]: currentValue ?? ""
			};
			editingFields.value = {
				...editingFields.value,
				[fieldName]: true
			};
		}
		function cancelEditing(fieldName) {
			const originalValue = (props.flattenedProfile ?? props.profile ?? null)?.[fieldName] ?? "";
			editedValues.value = {
				...editedValues.value,
				[fieldName]: originalValue
			};
			editingFields.value = {
				...editingFields.value,
				[fieldName]: false
			};
		}
		function saveField(schema) {
			if (!props.onUpdate || !schema.name) return;
			const value = editedValues.value[schema.name] ?? "";
			const payload = buildScimPatchValue(schema.name, value, schema.schemaId, schema.multiValued);
			props.onUpdate(payload);
			editingFields.value = {
				...editingFields.value,
				[schema.name]: false
			};
		}
		function renderInput(schema) {
			const fieldName = schema.name ?? "";
			const currentValue = editedValues.value[fieldName];
			switch (schema.type) {
				case "DATE_TIME": return h(DatePicker_default, {
					modelValue: String(currentValue ?? ""),
					"onUpdate:modelValue": (v) => {
						editedValues.value = {
							...editedValues.value,
							[fieldName]: v
						};
					},
					placeholder: `Enter your ${(schema.displayName || fieldName).toLowerCase()}`,
					required: schema.required
				});
				case "BOOLEAN": return h(Checkbox_default, {
					label: schema.displayName || fieldName,
					modelValue: Boolean(currentValue),
					"onUpdate:modelValue": (v) => {
						editedValues.value = {
							...editedValues.value,
							[fieldName]: v
						};
					}
				});
				default: return h(TextField_default, {
					modelValue: String(currentValue ?? ""),
					"onUpdate:modelValue": (v) => {
						editedValues.value = {
							...editedValues.value,
							[fieldName]: v
						};
					},
					placeholder: `Enter your ${(schema.displayName || fieldName).toLowerCase()}`,
					required: schema.required
				});
			}
		}
		function renderSchemaFieldRow(schema) {
			const { name, displayName, description, mutability, value } = schema;
			if (!name || !shouldShowField(name)) return null;
			const label = displayName || description || formatLabel(name);
			const isReadonly = mutability === "READ_ONLY" || READONLY_FIELDS.includes(name);
			const isEditable = Boolean(props.editable) && !isReadonly;
			const isEditing = Boolean(editingFields.value[name]);
			const hasValue = value !== void 0 && value !== null && value !== "";
			if (!hasValue && !isEditing && !(isEditable && mutability === "READ_WRITE")) return null;
			const editablePlaceholder = isEditable ? h("span", {
				class: px("user-profile__field-placeholder"),
				onClick: () => startEditing(name, value)
			}, `Enter your ${label.toLowerCase()}`) : null;
			const displayValueNode = hasValue ? h(Typography_default, {
				class: px("user-profile__field-value"),
				variant: "body1"
			}, () => String(value)) : editablePlaceholder;
			return h("div", {
				class: px("user-profile__field"),
				key: name
			}, [h("div", { class: px("user-profile__field-label-col") }, [h(Typography_default, {
				class: px("user-profile__field-label"),
				variant: "body2"
			}, () => label)]), h("div", { class: px("user-profile__field-value-col") }, [isEditing ? h("div", { class: px("user-profile__field-edit") }, [renderInput(schema), h("div", { class: px("user-profile__field-edit-actions") }, [h(Button_default, {
				onClick: () => saveField(schema),
				size: "small",
				variant: "solid"
			}, () => "Save"), h(Button_default, {
				onClick: () => cancelEditing(name),
				size: "small",
				variant: "text"
			}, () => "Cancel")])]) : h("div", { class: px("user-profile__field-display") }, [displayValueNode, isEditable ? h("button", {
				"aria-label": `Edit ${label}`,
				class: px("user-profile__field-edit-btn"),
				onClick: () => startEditing(name, value),
				type: "button"
			}, [h(PencilIcon)]) : null])])]);
		}
		function renderProfileWithoutSchemas() {
			const data = props.flattenedProfile || props.profile;
			if (!data) return [];
			return Object.entries(data).filter(([key, value]) => {
				if (!shouldShowField(key)) return false;
				return value !== void 0 && value !== null && value !== "";
			}).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => h("div", {
				class: px("user-profile__field"),
				key
			}, [h("div", { class: px("user-profile__field-label-col") }, [h(Typography_default, {
				class: px("user-profile__field-label"),
				variant: "body2"
			}, () => formatLabel(key))]), h("div", { class: px("user-profile__field-value-col") }, [h(Typography_default, {
				class: px("user-profile__field-value"),
				variant: "body1"
			}, () => typeof value === "object" ? JSON.stringify(value) : String(value))])]));
		}
		function renderHero(currentUser) {
			const displayName = getDisplayName_default(DEFAULT_ATTRIBUTE_MAPPINGS$1, currentUser);
			const email = getMappedUserProfileValue_default("email", DEFAULT_ATTRIBUTE_MAPPINGS$1, currentUser) || getMappedUserProfileValue_default("username", DEFAULT_ATTRIBUTE_MAPPINGS$1, currentUser);
			const avatarGradient = getAvatarGradient$1(String(currentUser["username"] || currentUser["userName"] || currentUser["email"] || currentUser["sub"] || displayName));
			const initials = displayName.split(" ").map((w) => w.charAt(0)).slice(0, 2).join("").toUpperCase() || "?";
			const avatarSizeClass = px(`user-profile__avatar--${props.avatarSize ?? "lg"}`);
			return h("div", { class: px("user-profile__hero") }, [h("div", { class: px("user-profile__avatar-wrapper") }, [h("div", {
				class: [px("user-profile__avatar"), avatarSizeClass].join(" "),
				style: { background: avatarGradient }
			}, [h("span", { class: px("user-profile__avatar-initials") }, initials)])]), h("div", { class: px("user-profile__hero-info") }, [h("span", { class: px("user-profile__hero-name") }, displayName), email ? h("span", { class: px("user-profile__hero-subtitle") }, String(email)) : null])]);
		}
		return () => {
			const data = props.flattenedProfile ?? props.profile ?? null;
			if (!data && !props.isLoading) return slots["default"] ? slots["default"]({
				error: props.error,
				isLoading: props.isLoading,
				profile: null
			}) : null;
			if (slots["default"]) return slots["default"]({
				error: props.error,
				isLoading: props.isLoading,
				profile: data
			});
			const currentUser = data;
			const schemas = props.schemas ?? [];
			const hasSchemas = schemas.length > 0;
			const rootClasses = [
				px("user-profile"),
				props.compact ? px("user-profile--compact") : "",
				props.className ?? ""
			].filter(Boolean).join(" ");
			const children = [];
			children.push(h("div", { class: px("user-profile__header") }, [h("span", { class: px("user-profile__title") }, props.title ?? "Profile")]));
			children.push(h(Divider_default, { class: px("user-profile__header-divider") }));
			if (props.showAvatar !== false && currentUser) children.push(renderHero(currentUser));
			if (props.error) children.push(h(Alert_default, {
				class: px("user-profile__error"),
				severity: "error"
			}, () => props.error));
			if (props.isLoading) children.push(h("div", { class: px("user-profile__loading") }, [h(Spinner_default)]));
			else if (hasSchemas) {
				const fieldRows = schemas.filter((s) => s.name && shouldShowField(s.name)).sort((a, b) => {
					return (a.displayOrder ? parseInt(a.displayOrder, 10) : 999) - (b.displayOrder ? parseInt(b.displayOrder, 10) : 999);
				}).map((schema) => {
					const value = currentUser && schema.name ? currentUser[schema.name] : void 0;
					return renderSchemaFieldRow({
						...schema,
						value
					});
				}).filter((node) => node !== null);
				children.push(h("div", { class: px("user-profile__fields") }, fieldRows));
			} else children.push(h("div", { class: px("user-profile__fields") }, renderProfileWithoutSchemas()));
			if (slots["footer"]) children.push(h("div", { class: px("user-profile__footer") }, slots["footer"]()));
			if (props.cardLayout) return h(Card_default, {
				class: rootClasses,
				variant: props.cardVariant ?? "elevated"
			}, () => children);
			return h("div", { class: rootClasses }, children);
		};
	}
});
var BaseUserProfile_default = BaseUserProfile;

//#endregion
//#region src/api/updateMeProfile.ts
const updateMeProfile$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await FetchHttpClient.getInstance(instanceId).request({
			data: config.body ? JSON.parse(config.body) : void 0,
			headers: config.headers,
			method: config.method || "PATCH",
			url
		});
		return {
			json: () => Promise.resolve(response.data),
			ok: response.status >= 200 && response.status < 300,
			status: response.status,
			statusText: response.statusText || "",
			text: () => Promise.resolve(typeof response.data === "string" ? response.data : JSON.stringify(response.data))
		};
	};
	return updateMeProfile({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var updateMeProfile_default = updateMeProfile$1;

//#endregion
//#region src/components/presentation/user-profile/UserProfile.ts
const UserProfile = defineComponent({
	name: "UserProfile",
	props: {
		avatarSize: {
			default: "lg",
			type: String
		},
		cardLayout: {
			default: true,
			type: Boolean
		},
		cardVariant: {
			default: "elevated",
			type: String
		},
		className: {
			default: "",
			type: String
		},
		compact: {
			default: false,
			type: Boolean
		},
		editable: {
			default: true,
			type: Boolean
		},
		hideFields: {
			default: () => [],
			type: Array
		},
		showAvatar: {
			default: true,
			type: Boolean
		},
		showFields: {
			default: () => [],
			type: Array
		},
		title: {
			default: "Profile",
			type: String
		}
	},
	setup(props, { slots }) {
		const { baseUrl, instanceId } = useThunderID_default();
		const { flattenedProfile, profile, schemas, onUpdateProfile } = useUser_default();
		const { t } = useI18n_default();
		const error = ref(null);
		async function handleProfileUpdate(payload) {
			if (!baseUrl) return;
			error.value = null;
			try {
				onUpdateProfile(await updateMeProfile_default({
					baseUrl,
					instanceId,
					payload
				}));
			} catch (caughtError) {
				let message = t("user.profile.update.generic.error") || "Failed to update profile. Please try again.";
				if (caughtError instanceof ThunderIDError) message = caughtError.message;
				error.value = message;
			}
		}
		return () => h(BaseUserProfile_default, {
			avatarSize: props.avatarSize,
			cardLayout: props.cardLayout,
			cardVariant: props.cardVariant,
			class: withVendorCSSClassPrefix("user-profile--styled"),
			className: props.className,
			compact: props.compact,
			editable: props.editable,
			error: error.value,
			flattenedProfile: flattenedProfile?.value,
			hideFields: props.hideFields,
			onUpdate: handleProfileUpdate,
			profile: profile?.value?.profile ?? flattenedProfile?.value,
			schemas: schemas?.value,
			showAvatar: props.showAvatar,
			showFields: props.showFields,
			title: props.title
		}, slots);
	}
});
var UserProfile_default = UserProfile;

//#endregion
//#region src/components/presentation/user-dropdown/BaseUserDropdown.ts
const DEFAULT_ATTRIBUTE_MAPPINGS = {
	email: ["emails", "email"],
	firstName: ["name.givenName", "given_name"],
	lastName: ["name.familyName", "family_name"],
	username: [
		"userName",
		"username",
		"user_name"
	]
};
/** Approximate min-width for each size, used for auto-alignment decisions. */
const MENU_MIN_WIDTHS = {
	lg: 280,
	md: 220,
	sm: 180
};
const AVATAR_GRADIENTS = [
	"linear-gradient(135deg, #4b6ef5 0%, #7c3aed 100%)",
	"linear-gradient(135deg, #0ea5e9 0%, #4b6ef5 100%)",
	"linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)",
	"linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
	"linear-gradient(135deg, #ec4899 0%, #7c3aed 100%)",
	"linear-gradient(135deg, #8b5cf6 0%, #4b6ef5 100%)",
	"linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
	"linear-gradient(135deg, #f97316 0%, #ec4899 100%)"
];
function getAvatarGradient(seed) {
	if (!seed) return AVATAR_GRADIENTS[0];
	let hash = 0;
	for (let i = 0; i < seed.length; i += 1) hash = hash * 31 + seed.charCodeAt(i) >>> 0;
	return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}
function resolveUserInfo(user) {
	if (!user) return {
		displayName: "User",
		gradient: AVATAR_GRADIENTS[0],
		initials: "?",
		subtitle: ""
	};
	const displayName = getDisplayName_default(DEFAULT_ATTRIBUTE_MAPPINGS, user) || "User";
	const initials = displayName.split(" ").map((w) => w.charAt(0)).slice(0, 2).join("").toUpperCase() || "?";
	const seed = String(getMappedUserProfileValue_default("username", DEFAULT_ATTRIBUTE_MAPPINGS, user) || getMappedUserProfileValue_default("email", DEFAULT_ATTRIBUTE_MAPPINGS, user) || displayName);
	const subtitle = String(getMappedUserProfileValue_default("email", DEFAULT_ATTRIBUTE_MAPPINGS, user) || getMappedUserProfileValue_default("username", DEFAULT_ATTRIBUTE_MAPPINGS, user) || "");
	return {
		displayName,
		gradient: getAvatarGradient(seed),
		initials,
		subtitle
	};
}
const BaseUserDropdown = defineComponent({
	name: "BaseUserDropdown",
	inheritAttrs: false,
	props: {
		className: {
			default: "",
			type: String
		},
		isProfileModalOpen: {
			default: false,
			type: Boolean
		},
		menuAlign: {
			default: "auto",
			type: String
		},
		menuItems: {
			default: void 0,
			type: Array
		},
		onProfileClick: {
			default: void 0,
			type: Function
		},
		onProfileModalClose: {
			default: void 0,
			type: Function
		},
		onSignOut: {
			default: void 0,
			type: Function
		},
		profileContent: {
			default: null,
			type: Object
		},
		showChevron: {
			default: false,
			type: Boolean
		},
		size: {
			default: "md",
			type: String
		},
		user: {
			default: null,
			type: Object
		}
	},
	setup(props, { slots }) {
		const isOpen = ref(false);
		const containerRef = ref(null);
		const px = withVendorCSSClassPrefix;
		function handleClickOutside(event) {
			if (containerRef.value && !containerRef.value.contains(event.target)) isOpen.value = false;
		}
		function handleKeyDown(event) {
			if (event.key === "Escape") isOpen.value = false;
		}
		onMounted(() => {
			document.addEventListener("click", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
		});
		onUnmounted(() => {
			document.removeEventListener("click", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		});
		function resolveMenuAlign() {
			if (props.menuAlign !== "auto") return props.menuAlign ?? "right";
			if (!containerRef.value) return "right";
			const rect = containerRef.value.getBoundingClientRect();
			const menuWidth = MENU_MIN_WIDTHS[props.size ?? "md"] ?? 220;
			return window.innerWidth - rect.right >= menuWidth ? "right" : "left";
		}
		return () => {
			if (slots.default) return slots.default({
				isOpen: isOpen.value,
				toggle: () => {
					isOpen.value = !isOpen.value;
				},
				user: props.user
			});
			const { displayName, initials, gradient, subtitle } = resolveUserInfo(props.user ?? null);
			const size = props.size ?? "md";
			const avatarSizeClass = size !== "md" ? px(`user-dropdown__avatar--${size}`) : "";
			const triggerClass = [px("user-dropdown__trigger"), isOpen.value ? px("user-dropdown__trigger--open") : ""].filter(Boolean).join(" ");
			const trigger = h("button", {
				"aria-expanded": isOpen.value,
				"aria-haspopup": "true",
				class: triggerClass,
				onClick: (e) => {
					e.stopPropagation();
					isOpen.value = !isOpen.value;
				},
				type: "button"
			}, [h("span", {
				class: [px("user-dropdown__avatar"), avatarSizeClass].filter(Boolean).join(" "),
				style: { background: gradient }
			}, initials), props.showChevron ? h("span", { class: px("user-dropdown__chevron") }, [h(ChevronDownIcon, { size: 14 })]) : null]);
			let menu = null;
			if (isOpen.value) {
				const alignClass = resolveMenuAlign() === "left" ? px("user-dropdown__menu--align-left") : "";
				const sizeClass = size !== "md" ? px(`user-dropdown__menu--size-${size}`) : "";
				const menuClass = [
					px("user-dropdown__menu"),
					alignClass,
					sizeClass
				].filter(Boolean).join(" ");
				const menuChildren = [];
				menuChildren.push(h("div", { class: px("user-dropdown__menu-header") }, [h("div", {
					class: px("user-dropdown__menu-header-avatar"),
					style: { background: gradient }
				}, initials), h("div", { class: px("user-dropdown__menu-header-info") }, [h("span", { class: px("user-dropdown__menu-header-name") }, displayName), subtitle ? h("span", { class: px("user-dropdown__menu-header-subtitle") }, subtitle) : null])]));
				menuChildren.push(h("div", { class: px("user-dropdown__menu-divider") }));
				if (props.onProfileClick) menuChildren.push(h("button", {
					class: px("user-dropdown__item"),
					onClick: () => {
						isOpen.value = false;
						props.onProfileClick();
					},
					type: "button"
				}, [h(UserIcon, { size: 15 }), h("span", null, "Profile")]));
				if (props.menuItems && props.menuItems.length > 0) props.menuItems.forEach((item, idx) => {
					if (item.separatorBefore) menuChildren.push(h("div", {
						class: px("user-dropdown__menu-divider"),
						key: `sep-${idx}`
					}));
					menuChildren.push(h("button", {
						class: [px("user-dropdown__item"), item.danger ? px("user-dropdown__item--danger") : ""].filter(Boolean).join(" "),
						key: `item-${idx}`,
						onClick: () => {
							isOpen.value = false;
							item.onClick();
						},
						type: "button"
					}, [item.icon ?? null, h("span", null, item.label)]));
				});
				if (slots.items) menuChildren.push(...slots.items() ?? []);
				if (props.onSignOut) {
					menuChildren.push(h("div", { class: px("user-dropdown__menu-divider") }));
					menuChildren.push(h("button", {
						class: [px("user-dropdown__item"), px("user-dropdown__item--danger")].join(" "),
						onClick: () => {
							isOpen.value = false;
							props.onSignOut();
						},
						type: "button"
					}, [h(LogOutIcon, { size: 15 }), h("span", null, "Sign Out")]));
				}
				menu = h("div", { class: menuClass }, menuChildren.filter(Boolean));
			}
			const container = h("div", {
				class: [px("user-dropdown"), props.className].filter(Boolean).join(" "),
				ref: containerRef
			}, [trigger, menu]);
			if (props.isProfileModalOpen) return h("div", [container, h("div", {
				class: px("user-dropdown__modal-overlay"),
				onClick: (e) => {
					if (e.target.classList.contains(px("user-dropdown__modal-overlay"))) props.onProfileModalClose?.();
				}
			}, [h("div", { class: px("user-dropdown__modal-content") }, [h("button", {
				"aria-label": "Close profile",
				class: px("user-dropdown__modal-close"),
				onClick: props.onProfileModalClose,
				type: "button"
			}, [h(XIcon, { size: 18 })]), props.profileContent])])]);
			return container;
		};
	}
});
var BaseUserDropdown_default = BaseUserDropdown;

//#endregion
//#region src/components/presentation/user-dropdown/UserDropdown.ts
/**
* UserDropdown — avatar button that opens a user identity menu.
*
* @example Default usage
* ```vue
* <UserDropdown />
* ```
*
* @example With custom menu items and a separator
* ```vue
* <UserDropdown
*   :menu-items="[
*     { label: 'Settings', icon: h(SettingsIcon, { size: 15 }), onClick: goToSettings },
*     { label: 'Help',     onClick: openHelp, separatorBefore: true },
*   ]"
* />
* ```
*
* @example Small, left-aligned, no chevron
* ```vue
* <UserDropdown size="sm" menu-align="left" />
* ```
*/
const UserDropdown = defineComponent({
	name: "UserDropdown",
	props: {
		className: {
			default: "",
			type: String
		},
		menuAlign: {
			default: "auto",
			type: String
		},
		menuItems: {
			default: void 0,
			type: Array
		},
		showChevron: {
			default: false,
			type: Boolean
		},
		size: {
			default: "md",
			type: String
		}
	},
	emits: ["profileClick"],
	setup(props, { slots, emit }) {
		const { user, signOut } = useThunderID_default();
		const isProfileModalOpen = ref(false);
		return () => h(BaseUserDropdown_default, {
			class: withVendorCSSClassPrefix("user-dropdown--styled"),
			className: props.className,
			isProfileModalOpen: isProfileModalOpen.value,
			menuAlign: props.menuAlign,
			menuItems: props.menuItems,
			onProfileClick: () => {
				isProfileModalOpen.value = true;
				emit("profileClick");
			},
			onProfileModalClose: () => {
				isProfileModalOpen.value = false;
			},
			onSignOut: () => {
				signOut();
			},
			profileContent: isProfileModalOpen.value ? h(UserProfile_default, {
				cardLayout: false,
				compact: true,
				editable: true
			}) : null,
			showChevron: props.showChevron,
			size: props.size,
			user: user.value
		}, slots);
	}
});
var UserDropdown_default = UserDropdown;

//#endregion
//#region src/components/presentation/accept-invite/BaseAcceptInvite.ts
/**
* BaseAcceptInvite — handles the accept-invite flow lifecycle.
*
* Steps: validate invite token → render password form → flow completion.
*/
const BaseAcceptInvite = defineComponent({
	name: "BaseAcceptInvite",
	props: {
		className: {
			default: "",
			type: String
		},
		flowId: {
			default: void 0,
			type: String
		},
		inviteToken: {
			default: void 0,
			type: String
		},
		onComplete: {
			default: void 0,
			type: Function
		},
		onError: {
			default: void 0,
			type: Function
		},
		onFlowChange: {
			default: void 0,
			type: Function
		},
		onGoToSignIn: {
			default: void 0,
			type: Function
		},
		onSubmit: {
			required: true,
			type: Function
		},
		showSubtitle: {
			default: true,
			type: Boolean
		},
		showTitle: {
			default: true,
			type: Boolean
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	setup(props, { slots }) {
		const { meta: metaRef } = useFlowMeta_default();
		const { t } = useI18n_default();
		const isLoading = ref(false);
		const isValidatingToken = ref(true);
		const isTokenInvalid = ref(false);
		const isComplete = ref(false);
		const currentFlow = ref(null);
		const apiError = ref(null);
		const completionTitle = ref(void 0);
		const formValues = ref({});
		const formErrors = ref({});
		const touchedFields = ref({});
		const isFormValid = ref(true);
		let tokenValidationAttempted = false;
		const handleError = (error) => {
			const errorMessage = error?.failureReason || extractErrorMessage(error, t, "components.acceptInvite.errors.generic");
			apiError.value = error instanceof Error ? error : new Error(errorMessage);
			props.onError?.(apiError.value);
		};
		const normalizeFlowResponseLocal = (response) => {
			if (!response?.data?.meta?.components) return response;
			try {
				const { components } = normalizeFlowResponse(response, t, {
					defaultErrorKey: "components.acceptInvite.errors.generic",
					resolveTranslations: false
				}, metaRef.value);
				return {
					...response,
					data: {
						...response.data,
						components
					}
				};
			} catch {
				return response;
			}
		};
		useOAuthCallback({
			currentFlowId: ref(props.flowId ?? null),
			isInitialized: ref(true),
			onComplete: () => {
				isComplete.value = true;
				isValidatingToken.value = false;
				props.onComplete?.();
			},
			onError: (error) => {
				isTokenInvalid.value = true;
				isValidatingToken.value = false;
				handleError(error);
			},
			onFlowChange: (response) => {
				props.onFlowChange?.(response);
				if (response.flowStatus !== "COMPLETE") {
					currentFlow.value = response;
					formValues.value = {};
					formErrors.value = {};
					touchedFields.value = {};
				}
			},
			onProcessingStart: () => {
				isValidatingToken.value = true;
			},
			onSubmit: async (payload) => {
				return normalizeFlowResponseLocal(await props.onSubmit(payload));
			},
			tokenValidationAttemptedFlag: { value: tokenValidationAttempted }
		});
		const handleInputChange = (name, value) => {
			formValues.value = {
				...formValues.value,
				[name]: value
			};
			const newErrors = { ...formErrors.value };
			delete newErrors[name];
			formErrors.value = newErrors;
		};
		const handleInputBlur = (name) => {
			touchedFields.value = {
				...touchedFields.value,
				[name]: true
			};
		};
		const validateForm = (components) => {
			const errors = {};
			const validateComponents = (comps) => {
				comps.forEach((comp) => {
					if ((comp.type === "PASSWORD_INPUT" || comp.type === "TEXT_INPUT" || comp.type === "EMAIL_INPUT") && comp.required && comp.ref) {
						const value = formValues.value[comp.ref] || "";
						if (!value || value.trim() === "") errors[comp.ref] = `${comp.label || comp.ref} is required`;
					}
					if (comp.components && Array.isArray(comp.components)) validateComponents(comp.components);
				});
			};
			validateComponents(components);
			return {
				errors,
				isValid: Object.keys(errors).length === 0
			};
		};
		const handleSubmit = async (component, data) => {
			if (!currentFlow.value) return;
			const validation = validateForm(currentFlow.value.data?.components || []);
			if (!validation.isValid) {
				formErrors.value = validation.errors;
				isFormValid.value = false;
				const touched = {};
				Object.keys(validation.errors).forEach((key) => {
					touched[key] = true;
				});
				touchedFields.value = {
					...touchedFields.value,
					...touched
				};
				return;
			}
			isLoading.value = true;
			apiError.value = null;
			isFormValid.value = true;
			try {
				const inputs = data || formValues.value;
				const payload = {
					flowId: currentFlow.value.flowId,
					inputs,
					verbose: true
				};
				if (component?.id) payload["action"] = component.id;
				const response = normalizeFlowResponseLocal(await props.onSubmit(payload));
				props.onFlowChange?.(response);
				if (response.type === "REDIRECTION") {
					const redirectURL = response.data?.redirectURL || response?.redirectURL;
					if (redirectURL) {
						initiateOAuthRedirect(redirectURL);
						return;
					}
				}
				if (currentFlow.value?.data?.components || currentFlow.value?.data?.meta?.components) {
					const heading = (currentFlow.value.data?.components || currentFlow.value.data?.meta?.components || []).find((comp) => comp.type === "TEXT" && comp.variant === "HEADING_1");
					if (heading?.label) completionTitle.value = heading.label;
				}
				if (response.flowStatus === "COMPLETE") {
					isComplete.value = true;
					props.onComplete?.();
					return;
				}
				if (response.flowStatus === "ERROR") {
					handleError(response);
					return;
				}
				currentFlow.value = response;
				formValues.value = {};
				formErrors.value = {};
				touchedFields.value = {};
			} catch (err) {
				handleError(err);
			} finally {
				isLoading.value = false;
			}
		};
		watch(() => [props.flowId, props.inviteToken], ([flowId, inviteToken]) => {
			if (tokenValidationAttempted) return;
			if (!flowId || !inviteToken) {
				isValidatingToken.value = false;
				isTokenInvalid.value = true;
				handleError(/* @__PURE__ */ new Error("Invalid invite link. Missing flowId or inviteToken."));
				return;
			}
			tokenValidationAttempted = true;
			(async () => {
				isValidatingToken.value = true;
				apiError.value = null;
				try {
					if (flowId) sessionStorage.setItem("thunderid_flow_id", flowId);
					const payload = {
						flowId,
						inputs: { inviteToken },
						verbose: true
					};
					const response = normalizeFlowResponseLocal(await props.onSubmit(payload));
					props.onFlowChange?.(response);
					if (response.flowStatus === "ERROR") {
						isTokenInvalid.value = true;
						handleError(response);
						return;
					}
					currentFlow.value = response;
				} catch (err) {
					isTokenInvalid.value = true;
					handleError(err);
				} finally {
					isValidatingToken.value = false;
				}
			})();
		}, { immediate: true });
		const extractHeadings = (components) => {
			let title;
			let subtitle;
			components.forEach((comp) => {
				if (comp.type === "TEXT") {
					if (comp.variant === "HEADING_1" && !title) title = comp.label;
					else if ((comp.variant === "HEADING_2" || comp.variant === "SUBTITLE_1") && !subtitle) subtitle = comp.label;
				}
			});
			return {
				subtitle,
				title
			};
		};
		const filterHeadings = (components) => components.filter((comp) => !(comp.type === "TEXT" && (comp.variant === "HEADING_1" || comp.variant === "HEADING_2")));
		return () => {
			const containerClass = [withVendorCSSClassPrefix("accept-invite"), props.className].filter(Boolean).join(" ");
			const components = currentFlow.value?.data?.components || currentFlow.value?.data?.meta?.components || [];
			const { title, subtitle } = extractHeadings(components);
			const componentsWithoutHeadings = filterHeadings(components);
			const meta = metaRef.value;
			if (slots["default"]) {
				const renderProps = {
					completionTitle: completionTitle.value,
					components,
					error: apiError.value,
					fieldErrors: formErrors.value,
					flowId: props.flowId,
					goToSignIn: props.onGoToSignIn,
					handleInputBlur,
					handleInputChange,
					handleSubmit,
					inviteToken: props.inviteToken,
					isComplete: isComplete.value,
					isLoading: isLoading.value,
					isTokenInvalid: isTokenInvalid.value,
					isValid: isFormValid.value,
					isValidatingToken: isValidatingToken.value,
					meta,
					subtitle,
					title,
					touched: touchedFields.value,
					values: formValues.value
				};
				return h("div", { class: containerClass }, slots["default"](renderProps));
			}
			if (isValidatingToken.value) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => h("div", { style: "display:flex;flex-direction:column;align-items:center;gap:1rem;padding:2rem" }, [h(Spinner_default), h(Typography_default, { variant: "body1" }, () => "Validating your invite link...")]));
			if (isTokenInvalid.value) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => [h("div", { style: "padding:1rem" }, [
				h(Typography_default, { variant: "h5" }, () => "Invalid Invite Link"),
				h(Alert_default, {
					style: "margin-top:1rem",
					variant: "error"
				}, () => apiError.value?.message || "This invite link is invalid or has expired. Please contact your administrator for a new invite."),
				props.onGoToSignIn ? h("div", { style: "display:flex;justify-content:center;margin-top:1.5rem" }, [h(Button_default, {
					onClick: props.onGoToSignIn,
					variant: "outline"
				}, () => "Go to Sign In")]) : null
			])]);
			if (isComplete.value) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => [h("div", { style: "padding:1rem" }, [
				h(Typography_default, { variant: "h5" }, () => "Account Setup Complete!"),
				h(Alert_default, {
					style: "margin-top:1rem",
					variant: "success"
				}, () => "Your account has been successfully set up. You can now sign in with your credentials."),
				props.onGoToSignIn ? h("div", { style: "display:flex;justify-content:center;margin-top:1.5rem" }, [h(Button_default, {
					onClick: props.onGoToSignIn,
					variant: "solid"
				}, () => "Sign In")]) : null
			])]);
			const renderedComponents = componentsWithoutHeadings.length > 0 ? renderInviteUserComponents(componentsWithoutHeadings, formValues.value, touchedFields.value, formErrors.value, isLoading.value, isFormValid.value, handleInputChange, {
				meta,
				onInputBlur: handleInputBlur,
				onSubmit: handleSubmit,
				size: props.size,
				t,
				variant: props.variant
			}) : [];
			return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => [
				(props.showTitle || props.showSubtitle) && (title || subtitle) ? h("div", { style: "padding:1rem 1rem 0" }, [props.showTitle && title ? h(Typography_default, { variant: "h5" }, () => title) : null, props.showSubtitle && subtitle ? h(Typography_default, {
					style: "margin-top:0.25rem",
					variant: "body1"
				}, () => subtitle) : null]) : null,
				apiError.value ? h("div", { style: "padding:0 1rem;margin-bottom:1rem" }, h(Alert_default, { variant: "error" }, () => apiError.value.message)) : null,
				h("div", { style: "padding:1rem" }, (() => {
					const formContent = [];
					if (renderedComponents.length > 0) formContent.push(renderedComponents);
					else if (!isLoading.value) formContent.push(h(Alert_default, { variant: "warning" }, () => "No form components available"));
					if (isLoading.value) formContent.push(h("div", { style: "display:flex;justify-content:center;padding:1rem" }, h(Spinner_default)));
					return formContent;
				})()),
				props.onGoToSignIn ? h("div", { style: "margin-top:1.5rem;text-align:center;padding:0 1rem 1rem" }, [h(Typography_default, { variant: "body2" }, () => ["Already have an account? ", h(Button_default, {
					onClick: props.onGoToSignIn,
					style: "min-width:auto;padding:0",
					variant: "text"
				}, () => "Sign In")])]) : null
			]);
		};
	}
});
var BaseAcceptInvite_default = BaseAcceptInvite;

//#endregion
//#region src/components/presentation/accept-invite/AcceptInvite.ts
/**
* Helper to extract query parameters from URL.
*/
const getUrlParams = () => {
	if (typeof window === "undefined") return {};
	const params = new URLSearchParams(window.location.search);
	return {
		flowId: params.get("flowId") || void 0,
		inviteToken: params.get("inviteToken") || void 0
	};
};
/**
* AcceptInvite — end-user component for accepting an invite and setting a password.
*
* Automatically extracts flowId and inviteToken from URL, validates the token,
* and delegates rendering to BaseAcceptInvite.
*/
const AcceptInvite = defineComponent({
	name: "AcceptInvite",
	props: {
		baseUrl: {
			default: void 0,
			type: String
		},
		className: {
			default: "",
			type: String
		},
		flowId: {
			default: void 0,
			type: String
		},
		inviteToken: {
			default: void 0,
			type: String
		},
		onComplete: {
			default: void 0,
			type: Function
		},
		onError: {
			default: void 0,
			type: Function
		},
		onFlowChange: {
			default: void 0,
			type: Function
		},
		onGoToSignIn: {
			default: void 0,
			type: Function
		},
		showSubtitle: {
			default: true,
			type: Boolean
		},
		showTitle: {
			default: true,
			type: Boolean
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	setup(props, { slots }) {
		const urlParams = getUrlParams();
		const flowId = props.flowId || urlParams.flowId;
		const inviteToken = props.inviteToken || urlParams.inviteToken;
		const apiBaseUrl = props.baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
		const handleSubmit = async (payload) => {
			const response = await fetch(`${apiBaseUrl}/flow/execute`, {
				body: JSON.stringify({
					...payload,
					verbose: true
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				method: "POST"
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Request failed: ${errorText}`);
			}
			return response.json();
		};
		return () => h(BaseAcceptInvite_default, {
			className: props.className,
			flowId,
			inviteToken,
			onComplete: props.onComplete,
			onError: props.onError,
			onFlowChange: props.onFlowChange,
			onGoToSignIn: props.onGoToSignIn,
			onSubmit: handleSubmit,
			showSubtitle: props.showSubtitle,
			showTitle: props.showTitle,
			size: props.size,
			variant: props.variant
		}, slots["default"] ? { default: (renderProps) => slots["default"](renderProps) } : void 0);
	}
});
var AcceptInvite_default = AcceptInvite;

//#endregion
//#region src/components/presentation/invite-user/BaseInviteUser.ts
/**
* BaseInviteUser — handles the admin invite-user flow lifecycle.
*
* Steps: user type selection → user details → invite link generation.
*/
const BaseInviteUser = defineComponent({
	name: "BaseInviteUser",
	props: {
		className: {
			default: "",
			type: String
		},
		isInitialized: {
			default: true,
			type: Boolean
		},
		onError: {
			default: void 0,
			type: Function
		},
		onFlowChange: {
			default: void 0,
			type: Function
		},
		onInitialize: {
			required: true,
			type: Function
		},
		onInviteLinkGenerated: {
			default: void 0,
			type: Function
		},
		onSubmit: {
			required: true,
			type: Function
		},
		showSubtitle: {
			default: true,
			type: Boolean
		},
		showTitle: {
			default: true,
			type: Boolean
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	setup(props, { slots }) {
		const { meta: metaRef } = useFlowMeta_default();
		const { t } = useI18n_default();
		const isLoading = ref(false);
		const isFlowInitialized = ref(false);
		const currentFlow = ref(null);
		const apiError = ref(null);
		const formValues = ref({});
		const formErrors = ref({});
		const touchedFields = ref({});
		const isFormValid = ref(true);
		const inviteLink = ref(void 0);
		const inviteLinkCopied = ref(false);
		const emailSent = ref(false);
		let initializationAttempted = false;
		const handleError = (error) => {
			const errorMessage = error?.failureReason || extractErrorMessage(error, t, "components.inviteUser.errors.generic");
			apiError.value = error instanceof Error ? error : new Error(errorMessage);
			props.onError?.(apiError.value);
		};
		const normalizeFlowResponseLocal = (response) => {
			if (!response?.data?.meta?.components) return response;
			try {
				const { components } = normalizeFlowResponse(response, t, {
					defaultErrorKey: "components.inviteUser.errors.generic",
					resolveTranslations: false
				}, metaRef.value);
				return {
					...response,
					data: {
						...response.data,
						components
					}
				};
			} catch {
				return response;
			}
		};
		const handleInputChange = (name, value) => {
			formValues.value = {
				...formValues.value,
				[name]: value
			};
			const newErrors = { ...formErrors.value };
			delete newErrors[name];
			formErrors.value = newErrors;
		};
		const handleInputBlur = (name) => {
			touchedFields.value = {
				...touchedFields.value,
				[name]: true
			};
		};
		const validateForm = (components) => {
			const errors = {};
			const validateComponents = (comps) => {
				comps.forEach((comp) => {
					if ((comp.type === "TEXT_INPUT" || comp.type === "EMAIL_INPUT" || comp.type === "SELECT") && comp.required && comp.ref) {
						const value = formValues.value[comp.ref] || "";
						if (!value || value.trim() === "") errors[comp.ref] = `${comp.label || comp.ref} is required`;
						if (comp.type === "EMAIL_INPUT" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[comp.ref] = "Please enter a valid email address";
					}
					if (comp.components && Array.isArray(comp.components)) validateComponents(comp.components);
				});
			};
			validateComponents(components);
			return {
				errors,
				isValid: Object.keys(errors).length === 0
			};
		};
		const handleSubmit = async (component, data) => {
			if (!currentFlow.value) return;
			const validation = validateForm(currentFlow.value.data?.components || []);
			if (!validation.isValid) {
				formErrors.value = validation.errors;
				isFormValid.value = false;
				const touched = {};
				Object.keys(validation.errors).forEach((key) => {
					touched[key] = true;
				});
				touchedFields.value = {
					...touchedFields.value,
					...touched
				};
				return;
			}
			isLoading.value = true;
			apiError.value = null;
			isFormValid.value = true;
			try {
				const inputs = data || formValues.value;
				const payload = {
					flowId: currentFlow.value.flowId,
					inputs,
					verbose: true
				};
				if (component?.id) payload["action"] = component.id;
				const response = normalizeFlowResponseLocal(await props.onSubmit(payload));
				props.onFlowChange?.(response);
				if (response.data?.additionalData?.["inviteLink"]) {
					const linkValue = response.data.additionalData["inviteLink"];
					inviteLink.value = linkValue;
					props.onInviteLinkGenerated?.(linkValue, response.flowId);
				}
				if (response.data?.additionalData?.["emailSent"] === "true") emailSent.value = true;
				if (response.flowStatus === "ERROR") {
					handleError(response);
					return;
				}
				currentFlow.value = response;
				formValues.value = {};
				formErrors.value = {};
				touchedFields.value = {};
			} catch (err) {
				handleError(err);
			} finally {
				isLoading.value = false;
			}
		};
		const copyInviteLink = async () => {
			if (!inviteLink.value) return;
			try {
				await navigator.clipboard.writeText(inviteLink.value);
				inviteLinkCopied.value = true;
				setTimeout(() => {
					inviteLinkCopied.value = false;
				}, 3e3);
			} catch {
				const textArea = document.createElement("textarea");
				textArea.value = inviteLink.value;
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);
				inviteLinkCopied.value = true;
				setTimeout(() => {
					inviteLinkCopied.value = false;
				}, 3e3);
			}
		};
		const resetFlow = () => {
			isFlowInitialized.value = false;
			currentFlow.value = null;
			apiError.value = null;
			formValues.value = {};
			formErrors.value = {};
			touchedFields.value = {};
			inviteLink.value = void 0;
			inviteLinkCopied.value = false;
			emailSent.value = false;
			initializationAttempted = false;
		};
		watch(() => [props.isInitialized, isFlowInitialized.value], ([initialized, flowInit]) => {
			if (initialized && !flowInit && !initializationAttempted) {
				initializationAttempted = true;
				(async () => {
					isLoading.value = true;
					apiError.value = null;
					try {
						const payload = {
							flowType: EmbeddedFlowType.UserOnboarding,
							verbose: true
						};
						const response = normalizeFlowResponseLocal(await props.onInitialize(payload));
						currentFlow.value = response;
						isFlowInitialized.value = true;
						props.onFlowChange?.(response);
						if (response.flowStatus === "ERROR") handleError(response);
					} catch (err) {
						handleError(err);
					} finally {
						isLoading.value = false;
					}
				})();
			}
		}, { immediate: true });
		const extractHeadings = (components) => {
			let title;
			let subtitle;
			components.forEach((comp) => {
				if (comp.type === "TEXT") {
					if (comp.variant === "HEADING_1" && !title) title = comp.label;
					else if ((comp.variant === "HEADING_2" || comp.variant === "SUBTITLE_1") && !subtitle) subtitle = comp.label;
				}
			});
			return {
				subtitle,
				title
			};
		};
		const filterHeadings = (components) => components.filter((comp) => !(comp.type === "TEXT" && (comp.variant === "HEADING_1" || comp.variant === "HEADING_2")));
		return () => {
			const containerClass = [withVendorCSSClassPrefix("invite-user"), props.className].filter(Boolean).join(" ");
			const components = currentFlow.value?.data?.components || currentFlow.value?.data?.meta?.components || [];
			const { title, subtitle } = extractHeadings(components);
			const componentsWithoutHeadings = filterHeadings(components);
			const isInviteGenerated = !!inviteLink.value;
			const isEmailSent = emailSent.value;
			const meta = metaRef.value;
			if (slots["default"]) {
				const renderProps = {
					components,
					copyInviteLink,
					error: apiError.value,
					fieldErrors: formErrors.value,
					flowId: currentFlow.value?.flowId,
					handleInputBlur,
					handleInputChange,
					handleSubmit,
					inviteLink: inviteLink.value,
					inviteLinkCopied: inviteLinkCopied.value,
					isEmailSent,
					isInviteGenerated,
					isLoading: isLoading.value,
					isValid: isFormValid.value,
					meta,
					resetFlow,
					subtitle,
					title,
					touched: touchedFields.value,
					values: formValues.value
				};
				return h("div", { class: containerClass }, slots["default"](renderProps));
			}
			if (!props.isInitialized || !isFlowInitialized.value && isLoading.value) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => h("div", { style: "display:flex;justify-content:center;padding:2rem" }, h(Spinner_default)));
			if (!currentFlow.value && apiError.value) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => h(Alert_default, { variant: "error" }, () => apiError.value.message));
			if (isInviteGenerated && isEmailSent) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => [h("div", { style: "padding:1rem" }, [
				h(Typography_default, { variant: "h5" }, () => "Invite Email Sent!"),
				h(Alert_default, {
					style: "margin-top:1rem",
					variant: "success"
				}, () => "An invitation email has been sent successfully. The user can complete their registration using the link in the email."),
				h("div", { style: "display:flex;gap:0.5rem;margin-top:1.5rem" }, [h(Button_default, {
					onClick: resetFlow,
					variant: "outline"
				}, () => "Invite Another User")])
			])]);
			if (isInviteGenerated && inviteLink.value) return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => [h("div", { style: "padding:1rem" }, [
				h(Typography_default, { variant: "h5" }, () => "Invite Link Generated!"),
				h(Alert_default, {
					style: "margin-top:1rem",
					variant: "success"
				}, () => "Share this link with the user to complete their registration."),
				h("div", { style: "margin-top:1rem" }, [h(Typography_default, {
					style: "margin-bottom:0.5rem",
					variant: "body2"
				}, () => "Invite Link"), h("div", { style: "display:flex;align-items:center;gap:0.5rem;padding:0.75rem;background:var(--thunder-color-background-secondary,#f5f5f5);border-radius:4px;word-break:break-all" }, [h(Typography_default, {
					style: "flex:1",
					variant: "body2"
				}, () => inviteLink.value), h(Button_default, {
					onClick: copyInviteLink,
					size: "small",
					variant: "outline"
				}, () => inviteLinkCopied.value ? "Copied!" : "Copy")])]),
				h("div", { style: "display:flex;gap:0.5rem;margin-top:1.5rem" }, [h(Button_default, {
					onClick: resetFlow,
					variant: "outline"
				}, () => "Invite Another User")])
			])]);
			const renderedComponents = componentsWithoutHeadings.length > 0 ? renderInviteUserComponents(componentsWithoutHeadings, formValues.value, touchedFields.value, formErrors.value, isLoading.value, isFormValid.value, handleInputChange, {
				meta,
				onInputBlur: handleInputBlur,
				onSubmit: handleSubmit,
				size: props.size,
				t,
				variant: props.variant
			}) : [];
			return h(Card_default, {
				class: containerClass,
				variant: props.variant
			}, () => [
				(props.showTitle || props.showSubtitle) && (title || subtitle) ? h("div", { style: "padding:1rem 1rem 0" }, [props.showTitle && title ? h(Typography_default, { variant: "h5" }, () => title) : null, props.showSubtitle && subtitle ? h(Typography_default, {
					style: "margin-top:0.25rem",
					variant: "body1"
				}, () => subtitle) : null]) : null,
				apiError.value ? h("div", { style: "padding:0 1rem;margin-bottom:1rem" }, h(Alert_default, { variant: "error" }, () => apiError.value.message)) : null,
				h("div", { style: "padding:1rem" }, (() => {
					const formContent = [];
					if (renderedComponents.length > 0) formContent.push(renderedComponents);
					else if (!isLoading.value) formContent.push(h(Alert_default, { variant: "warning" }, () => "No form components available"));
					if (isLoading.value) formContent.push(h("div", { style: "display:flex;justify-content:center;padding:1rem" }, h(Spinner_default)));
					return formContent;
				})())
			]);
		};
	}
});
var BaseInviteUser_default = BaseInviteUser;

//#endregion
//#region src/components/presentation/invite-user/InviteUser.ts
/**
* InviteUser — admin invite component using authenticated ThunderID SDK context.
*/
const InviteUser = defineComponent({
	name: "InviteUser",
	props: {
		className: {
			default: "",
			type: String
		},
		onError: {
			default: void 0,
			type: Function
		},
		onFlowChange: {
			default: void 0,
			type: Function
		},
		onInviteLinkGenerated: {
			default: void 0,
			type: Function
		},
		showSubtitle: {
			default: true,
			type: Boolean
		},
		showTitle: {
			default: true,
			type: Boolean
		},
		size: {
			default: "medium",
			type: String
		},
		variant: {
			default: "outlined",
			type: String
		}
	},
	setup(props, { slots }) {
		const { http: http$1, baseUrl, isInitialized } = useThunderID_default();
		const handleInitialize = async (payload) => {
			return (await http$1.request({
				data: {
					...payload,
					flowType: EmbeddedFlowType.UserOnboarding,
					verbose: true
				},
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				url: `${baseUrl}/flow/execute`
			})).data;
		};
		const handleSubmit = async (payload) => {
			return (await http$1.request({
				data: {
					...payload,
					verbose: true
				},
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				url: `${baseUrl}/flow/execute`
			})).data;
		};
		return () => h(BaseInviteUser_default, {
			className: props.className,
			isInitialized: isInitialized?.value ?? false,
			onError: props.onError,
			onFlowChange: props.onFlowChange,
			onInitialize: handleInitialize,
			onInviteLinkGenerated: props.onInviteLinkGenerated,
			onSubmit: handleSubmit,
			showSubtitle: props.showSubtitle,
			showTitle: props.showTitle,
			size: props.size,
			variant: props.variant
		}, slots["default"] ? { default: (renderProps) => slots["default"](renderProps) } : void 0);
	}
});
var InviteUser_default = InviteUser;

//#endregion
//#region src/components/presentation/organization-list/BaseOrganizationList.ts
/**
* BaseOrganizationList — unstyled list of organizations.
*/
const BaseOrganizationList = defineComponent({
	name: "BaseOrganizationList",
	inheritAttrs: false,
	props: {
		className: {
			default: "",
			type: String
		},
		isLoading: {
			default: false,
			type: Boolean
		},
		onSelect: {
			default: void 0,
			type: Function
		},
		organizations: {
			default: () => [],
			type: Array
		}
	},
	setup(props, { slots }) {
		return () => {
			if (slots.default) return slots.default({
				isLoading: props.isLoading,
				organizations: props.organizations
			});
			const prefix = withVendorCSSClassPrefix;
			const children = [];
			if (props.isLoading) children.push(h("div", { class: prefix("organization-list__loading") }, [h(Spinner_default)]));
			else if (props.organizations.length === 0) children.push(h(Typography_default, {
				class: prefix("organization-list__empty"),
				variant: "body2"
			}, () => "No organizations found"));
			else props.organizations.forEach((org) => {
				children.push(h("button", {
					class: prefix("organization-list__item"),
					key: org.id,
					onClick: () => props.onSelect?.(org),
					type: "button"
				}, [h(BuildingIcon, { size: 16 }), h(Typography_default, { variant: "body1" }, () => org.name || org.id)]));
			});
			return h("div", { class: [prefix("organization-list"), props.className].filter(Boolean).join(" ") }, children);
		};
	}
});
var BaseOrganizationList_default = BaseOrganizationList;

//#endregion
//#region src/components/presentation/organization-list/OrganizationList.ts
/**
* OrganizationList — styled organization list component.
*
* Retrieves organization list from context and delegates to BaseOrganizationList.
*/
const OrganizationList = defineComponent({
	name: "OrganizationList",
	props: { className: {
		default: "",
		type: String
	} },
	emits: ["select"],
	setup(props, { slots, emit }) {
		const { myOrganizations, isLoading, switchOrganization } = useOrganization_default();
		const handleSelect = async (org) => {
			emit("select", org);
			await switchOrganization(org);
		};
		return () => h(BaseOrganizationList_default, {
			class: withVendorCSSClassPrefix("organization-list--styled"),
			className: props.className,
			isLoading: isLoading.value,
			onSelect: handleSelect,
			organizations: myOrganizations.value
		}, slots);
	}
});
var OrganizationList_default = OrganizationList;

//#endregion
//#region src/components/presentation/organization-profile/BaseOrganizationProfile.ts
const ORG_AVATAR_GRADIENTS = [
	"linear-gradient(135deg, #22d3ee 0%, #2dd4bf 100%)",
	"linear-gradient(135deg, #34d399 0%, #059669 100%)",
	"linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)",
	"linear-gradient(135deg, #f472b6 0%, #c084fc 100%)",
	"linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)",
	"linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
	"linear-gradient(135deg, #4ade80 0%, #22d3ee 100%)",
	"linear-gradient(135deg, #f87171 0%, #fb923c 100%)"
];
const getOrgAvatarGradient = (seed) => {
	if (!seed) return ORG_AVATAR_GRADIENTS[0];
	let hash = 0;
	for (let i = 0; i < seed.length; i += 1) hash = Math.imul(31, hash) + seed.charCodeAt(i);
	return ORG_AVATAR_GRADIENTS[Math.abs(hash) % ORG_AVATAR_GRADIENTS.length];
};
const getOrgInitials = (name) => {
	if (!name) return "?";
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length >= 2) return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
	return name.charAt(0).toUpperCase();
};
const formatDate = (dateStr) => {
	try {
		return new Date(dateStr).toLocaleDateString("en-US", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	} catch {
		return dateStr;
	}
};
/**
* BaseOrganizationProfile — unstyled organization details view/edit component.
*
* Renders a profile card with avatar, org name, handle, and two-column field rows
* for Organization ID, Name, Description, Created Date, and Last Modified Date.
*/
const BaseOrganizationProfile = defineComponent({
	name: "BaseOrganizationProfile",
	props: {
		className: {
			default: "",
			type: String
		},
		editable: {
			default: false,
			type: Boolean
		},
		onUpdate: {
			default: void 0,
			type: Function
		},
		organization: {
			default: null,
			type: Object
		},
		title: {
			default: "Organization Profile",
			type: String
		}
	},
	setup(props, { slots }) {
		const editingName = ref(false);
		const editingDescription = ref(false);
		const editedName = ref("");
		const editedDescription = ref("");
		return () => {
			if (slots.default) return slots.default({ organization: props.organization });
			if (!props.organization) return slots.fallback?.() ?? null;
			const prefix = withVendorCSSClassPrefix;
			const org = props.organization;
			const orgName = String(org["name"] || org["displayName"] || "");
			const orgHandle = String(org["orgHandle"] || "");
			const orgId = String(org["id"] || "");
			const orgDescription = org["description"] != null ? String(org["description"]) : null;
			const createdDate = org["created"] ? formatDate(String(org["created"])) : null;
			const lastModifiedDate = org["lastModified"] ? formatDate(String(org["lastModified"])) : null;
			const initials = getOrgInitials(orgName);
			const avatarGradient = getOrgAvatarGradient(orgId || orgName);
			const children = [];
			children.push(h("div", { class: prefix("organization-profile__header") }, [h(Typography_default, {
				class: prefix("organization-profile__title"),
				variant: "h5"
			}, () => props.title)]));
			children.push(h(Divider_default, { class: prefix("organization-profile__header-divider") }));
			children.push(h("div", { class: prefix("organization-profile__identity") }, [
				h("div", {
					class: prefix("organization-profile__avatar"),
					style: { background: avatarGradient }
				}, [h("span", { class: prefix("organization-profile__avatar-initials") }, initials)]),
				h(Typography_default, {
					class: prefix("organization-profile__org-name"),
					variant: "h5"
				}, () => orgName),
				orgHandle ? h(Typography_default, {
					class: prefix("organization-profile__org-handle"),
					variant: "body2"
				}, () => `@${orgHandle}`) : null
			]));
			children.push(h(Divider_default, { class: prefix("organization-profile__identity-divider") }));
			const fieldRows = [];
			fieldRows.push(h("div", {
				class: prefix("organization-profile__field"),
				key: "id"
			}, [h("div", { class: prefix("organization-profile__field-label-col") }, [h(Typography_default, {
				class: prefix("organization-profile__field-label"),
				variant: "body2"
			}, () => "Organization ID")]), h("div", { class: prefix("organization-profile__field-value-col") }, [h("div", { class: prefix("organization-profile__field-display") }, [orgId ? h(Typography_default, {
				class: [prefix("organization-profile__field-value"), prefix("organization-profile__field-value--id")].join(" "),
				variant: "body1"
			}, () => orgId) : h("span", { class: prefix("organization-profile__field-placeholder") }, "Not available")])])]));
			fieldRows.push(h("div", {
				class: prefix("organization-profile__field"),
				key: "name"
			}, [h("div", { class: prefix("organization-profile__field-label-col") }, [h(Typography_default, {
				class: prefix("organization-profile__field-label"),
				variant: "body2"
			}, () => "Organization Name")]), h("div", { class: prefix("organization-profile__field-value-col") }, [editingName.value ? h("div", { class: prefix("organization-profile__field-edit") }, [h(TextField_default, {
				modelValue: editedName.value,
				"onUpdate:modelValue": (v) => {
					editedName.value = v;
				}
			}), h("div", { class: prefix("organization-profile__field-edit-actions") }, [h(Button_default, {
				onClick: async () => {
					await props.onUpdate?.({ name: editedName.value });
					editingName.value = false;
				},
				size: "small",
				variant: "solid"
			}, () => "Save"), h(Button_default, {
				onClick: () => {
					editingName.value = false;
				},
				size: "small",
				variant: "text"
			}, () => "Cancel")])]) : h("div", { class: prefix("organization-profile__field-display") }, [h(Typography_default, {
				class: prefix("organization-profile__field-value"),
				variant: "body1"
			}, () => orgName), props.editable ? h("button", {
				"aria-label": "Edit Organization Name",
				class: prefix("organization-profile__field-edit-btn"),
				onClick: () => {
					editedName.value = orgName;
					editingName.value = true;
				},
				type: "button"
			}, [h(PencilIcon)]) : null])])]));
			fieldRows.push(h("div", {
				class: prefix("organization-profile__field"),
				key: "description"
			}, [h("div", { class: prefix("organization-profile__field-label-col") }, [h(Typography_default, {
				class: prefix("organization-profile__field-label"),
				variant: "body2"
			}, () => "Organization Description")]), h("div", { class: prefix("organization-profile__field-value-col") }, [editingDescription.value ? h("div", { class: prefix("organization-profile__field-edit") }, [h(TextField_default, {
				modelValue: editedDescription.value,
				"onUpdate:modelValue": (v) => {
					editedDescription.value = v;
				}
			}), h("div", { class: prefix("organization-profile__field-edit-actions") }, [h(Button_default, {
				onClick: async () => {
					await props.onUpdate?.({ description: editedDescription.value });
					editingDescription.value = false;
				},
				size: "small",
				variant: "solid"
			}, () => "Save"), h(Button_default, {
				onClick: () => {
					editingDescription.value = false;
				},
				size: "small",
				variant: "text"
			}, () => "Cancel")])]) : h("div", { class: prefix("organization-profile__field-display") }, [orgDescription != null ? h(Typography_default, {
				class: prefix("organization-profile__field-value"),
				variant: "body1"
			}, () => orgDescription) : h("span", {
				class: prefix("organization-profile__field-placeholder"),
				onClick: props.editable ? () => {
					editedDescription.value = "";
					editingDescription.value = true;
				} : void 0
			}, "Enter organization description"), props.editable ? h("button", {
				"aria-label": "Edit Organization Description",
				class: prefix("organization-profile__field-edit-btn"),
				onClick: () => {
					editedDescription.value = orgDescription ?? "";
					editingDescription.value = true;
				},
				type: "button"
			}, [h(PencilIcon)]) : null])])]));
			fieldRows.push(h("div", {
				class: prefix("organization-profile__field"),
				key: "created"
			}, [h("div", { class: prefix("organization-profile__field-label-col") }, [h(Typography_default, {
				class: prefix("organization-profile__field-label"),
				variant: "body2"
			}, () => "Created Date")]), h("div", { class: prefix("organization-profile__field-value-col") }, [h("div", { class: prefix("organization-profile__field-display") }, [createdDate ? h(Typography_default, {
				class: prefix("organization-profile__field-value"),
				variant: "body1"
			}, () => createdDate) : h("span", { class: prefix("organization-profile__field-placeholder") }, "Not available")])])]));
			fieldRows.push(h("div", {
				class: prefix("organization-profile__field"),
				key: "lastModified"
			}, [h("div", { class: prefix("organization-profile__field-label-col") }, [h(Typography_default, {
				class: prefix("organization-profile__field-label"),
				variant: "body2"
			}, () => "Last Modified Date")]), h("div", { class: prefix("organization-profile__field-value-col") }, [h("div", { class: prefix("organization-profile__field-display") }, [lastModifiedDate ? h(Typography_default, {
				class: prefix("organization-profile__field-value"),
				variant: "body1"
			}, () => lastModifiedDate) : h("span", { class: prefix("organization-profile__field-placeholder") }, "Not available")])])]));
			fieldRows.push(h("div", {
				class: prefix("organization-profile__field"),
				key: "orgHandle"
			}, [h("div", { class: prefix("organization-profile__field-label-col") }, [h(Typography_default, {
				class: prefix("organization-profile__field-label"),
				variant: "body2"
			}, () => "Organization Handle")]), h("div", { class: prefix("organization-profile__field-value-col") }, [h("div", { class: prefix("organization-profile__field-display") }, [orgHandle ? h(Typography_default, {
				class: prefix("organization-profile__field-value"),
				variant: "body1"
			}, () => orgHandle) : h("span", { class: prefix("organization-profile__field-placeholder") }, "Not available")])])]));
			children.push(h("div", { class: prefix("organization-profile__fields") }, fieldRows));
			return h(Card_default, { class: [prefix("organization-profile"), props.className].filter(Boolean).join(" ") }, () => children);
		};
	}
});
var BaseOrganizationProfile_default = BaseOrganizationProfile;

//#endregion
//#region src/components/presentation/organization-profile/OrganizationProfile.ts
/**
* OrganizationProfile — styled organisation details component.
*
* Retrieves current organization from context and delegates to BaseOrganizationProfile.
*/
const OrganizationProfile = defineComponent({
	name: "OrganizationProfile",
	props: {
		className: {
			default: "",
			type: String
		},
		editable: {
			default: false,
			type: Boolean
		},
		onUpdate: {
			default: void 0,
			type: Function
		},
		title: {
			default: "Organization Profile",
			type: String
		}
	},
	setup(props, { slots }) {
		const { currentOrganization } = useOrganization_default();
		return () => h(BaseOrganizationProfile_default, {
			class: withVendorCSSClassPrefix("organization-profile--styled"),
			className: props.className,
			editable: props.editable,
			onUpdate: props.onUpdate,
			organization: currentOrganization?.value ?? null,
			title: props.title
		}, slots);
	}
});
var OrganizationProfile_default = OrganizationProfile;

//#endregion
//#region src/components/presentation/organization-switcher/BaseOrganizationSwitcher.ts
const cls$2 = (name) => withVendorCSSClassPrefix(`organization-switcher${name}`);
/**
* BaseOrganizationSwitcher — unstyled organisation dropdown switcher.
*
* Shows the current organization name and a dropdown list to switch.
*/
const BaseOrganizationSwitcher = defineComponent({
	name: "BaseOrganizationSwitcher",
	inheritAttrs: false,
	props: {
		className: {
			default: "",
			type: String
		},
		currentOrganization: {
			default: null,
			type: Object
		},
		isLoading: {
			default: false,
			type: Boolean
		},
		onSwitch: {
			default: void 0,
			type: Function
		},
		organizations: {
			default: () => [],
			type: Array
		}
	},
	setup(props, { slots }) {
		const isOpen = ref(false);
		const toggle = () => {
			isOpen.value = !isOpen.value;
		};
		const handleSelect = (org) => {
			isOpen.value = false;
			props.onSwitch?.(org);
		};
		return () => {
			if (slots.default) return slots.default({
				currentOrganization: props.currentOrganization,
				handleSelect,
				isLoading: props.isLoading,
				isOpen: isOpen.value,
				organizations: props.organizations,
				toggle
			});
			const currentName = props.currentOrganization?.name ?? "No Organization";
			const triggerButton = h("button", {
				"aria-expanded": isOpen.value,
				"aria-haspopup": "listbox",
				class: cls$2("__trigger"),
				onClick: toggle,
				type: "button"
			}, [
				h(BuildingIcon, { size: 16 }),
				h(Typography_default, {
					class: cls$2("__trigger-label"),
					variant: "body2"
				}, () => currentName),
				h(ChevronDownIcon, { size: 12 })
			]);
			const dropdownChildren = [];
			if (props.isLoading) dropdownChildren.push(h("div", { class: cls$2("__loading") }, [h(Spinner_default, { size: "small" })]));
			else if (props.organizations.length === 0) dropdownChildren.push(h(Typography_default, {
				class: cls$2("__empty"),
				variant: "body2"
			}, () => "No organizations available"));
			else props.organizations.forEach((org) => {
				const isActive = org.id === props.currentOrganization?.id;
				dropdownChildren.push(h("button", {
					"aria-selected": isActive,
					class: [cls$2("__item"), isActive ? cls$2("__item--active") : ""],
					onClick: () => handleSelect(org),
					role: "option",
					type: "button"
				}, [h(BuildingIcon, { size: 14 }), h(Typography_default, { variant: "body2" }, () => org.name)]));
			});
			const dropdown = isOpen.value ? h("div", {
				class: cls$2("__dropdown"),
				role: "listbox"
			}, dropdownChildren) : null;
			return h(Card_default, { class: [cls$2(""), props.className].filter(Boolean).join(" ") }, () => [triggerButton, dropdown]);
		};
	}
});
var BaseOrganizationSwitcher_default = BaseOrganizationSwitcher;

//#endregion
//#region src/components/presentation/organization-switcher/OrganizationSwitcher.ts
/**
* OrganizationSwitcher — styled organisation switcher component.
*
* Retrieves organisations from context and delegates to BaseOrganizationSwitcher.
*/
const OrganizationSwitcher = defineComponent({
	name: "OrganizationSwitcher",
	props: { className: {
		default: "",
		type: String
	} },
	setup(props, { slots }) {
		const { currentOrganization, myOrganizations, isLoading, switchOrganization } = useOrganization_default();
		return () => h(BaseOrganizationSwitcher_default, {
			class: withVendorCSSClassPrefix("organization-switcher--styled"),
			className: props.className,
			currentOrganization: currentOrganization?.value ?? null,
			isLoading: isLoading?.value ?? false,
			onSwitch: switchOrganization,
			organizations: myOrganizations?.value ?? []
		}, slots);
	}
});
var OrganizationSwitcher_default = OrganizationSwitcher;

//#endregion
//#region src/components/presentation/create-organization/BaseCreateOrganization.ts
const cls$1 = (name) => withVendorCSSClassPrefix(`create-organization${name}`);
/**
* BaseCreateOrganization — unstyled sub-organisation creation form.
*
* Provides a form with an org name input and create button.
*/
const BaseCreateOrganization = defineComponent({
	name: "BaseCreateOrganization",
	props: {
		className: {
			default: "",
			type: String
		},
		description: {
			default: "Create a new sub-organization.",
			type: String
		},
		onCreate: {
			default: void 0,
			type: Function
		},
		title: {
			default: "Create Organization",
			type: String
		}
	},
	setup(props, { slots }) {
		const orgName = ref("");
		const isSubmitting = ref(false);
		const error = ref(null);
		const handleSubmit = async () => {
			const name = orgName.value.trim();
			if (!name) {
				error.value = "Organization name is required.";
				return;
			}
			error.value = null;
			isSubmitting.value = true;
			try {
				await props.onCreate?.(name);
				orgName.value = "";
			} catch (err) {
				error.value = err instanceof Error ? err.message : "Failed to create organization.";
			} finally {
				isSubmitting.value = false;
			}
		};
		return () => {
			if (slots.default) return slots.default({
				error: error.value,
				handleSubmit,
				isSubmitting: isSubmitting.value,
				orgName: orgName.value,
				setOrgName: (v) => {
					orgName.value = v;
				}
			});
			return h(Card_default, { class: [cls$1(""), props.className].filter(Boolean).join(" ") }, () => [
				h(Typography_default, {
					class: cls$1("__title"),
					variant: "h6"
				}, () => props.title),
				props.description ? h(Typography_default, {
					class: cls$1("__description"),
					variant: "body2"
				}, () => props.description) : null,
				error.value ? h(Alert_default, {
					class: cls$1("__error"),
					severity: "error"
				}, () => error.value) : null,
				h(TextField_default, {
					class: cls$1("__input"),
					label: "Organization Name",
					modelValue: orgName.value,
					"onUpdate:modelValue": (v) => {
						orgName.value = v;
					},
					placeholder: "Enter organization name"
				}),
				h(Button_default, {
					class: cls$1("__submit"),
					color: "primary",
					disabled: isSubmitting.value,
					loading: isSubmitting.value,
					onClick: handleSubmit,
					variant: "solid"
				}, () => "Create")
			]);
		};
	}
});
var BaseCreateOrganization_default = BaseCreateOrganization;

//#endregion
//#region src/components/presentation/create-organization/CreateOrganization.ts
/**
* CreateOrganization — styled sub-organisation creation component.
*
* Retrieves createOrganization from context and delegates to BaseCreateOrganization.
*/
const CreateOrganization = defineComponent({
	name: "CreateOrganization",
	props: {
		className: {
			default: "",
			type: String
		},
		description: {
			default: "Create a new sub-organization.",
			type: String
		},
		title: {
			default: "Create Organization",
			type: String
		}
	},
	setup(props, { slots }) {
		const { createOrganization } = useOrganization_default();
		return () => h(BaseCreateOrganization_default, {
			class: withVendorCSSClassPrefix("create-organization--styled"),
			className: props.className,
			description: props.description,
			onCreate: createOrganization ? async (name) => {
				await createOrganization({
					description: "",
					name,
					parentId: "",
					type: "TENANT"
				}, "");
			} : void 0,
			title: props.title
		}, slots);
	}
});
var CreateOrganization_default = CreateOrganization;

//#endregion
//#region src/components/presentation/language-switcher/BaseLanguageSwitcher.ts
const cls = (name) => withVendorCSSClassPrefix(`language-switcher${name}`);
/**
* BaseLanguageSwitcher — unstyled language selection component.
*
* Shows the current language and a dropdown to select another.
*/
const BaseLanguageSwitcher = defineComponent({
	name: "BaseLanguageSwitcher",
	props: {
		className: {
			default: "",
			type: String
		},
		currentLanguage: {
			default: "en",
			type: String
		},
		languages: {
			default: () => [{
				label: "English",
				value: "en"
			}],
			type: Array
		},
		onLanguageChange: {
			default: void 0,
			type: Function
		}
	},
	setup(props, { slots }) {
		const isOpen = ref(false);
		const toggle = () => {
			isOpen.value = !isOpen.value;
		};
		const handleSelect = (lang) => {
			isOpen.value = false;
			props.onLanguageChange?.(lang);
		};
		return () => {
			if (slots.default) return slots.default({
				currentLanguage: props.currentLanguage,
				handleSelect,
				isOpen: isOpen.value,
				languages: props.languages,
				toggle
			});
			const currentLabel = props.languages.find((l) => l.value === props.currentLanguage)?.label ?? props.currentLanguage;
			const triggerButton = h("button", {
				"aria-expanded": isOpen.value,
				"aria-haspopup": "listbox",
				class: cls("__trigger"),
				onClick: toggle,
				type: "button"
			}, [
				h(GlobeIcon, { size: 16 }),
				h(Typography_default, {
					class: cls("__trigger-label"),
					variant: "body2"
				}, () => currentLabel),
				h(ChevronDownIcon, { size: 12 })
			]);
			const dropdownItems = props.languages.map((lang) => {
				const isActive = lang.value === props.currentLanguage;
				return h("button", {
					"aria-selected": isActive,
					class: [cls("__item"), isActive ? cls("__item--active") : ""],
					onClick: () => handleSelect(lang.value),
					role: "option",
					type: "button"
				}, [h(Typography_default, { variant: "body2" }, () => lang.label)]);
			});
			const dropdown = isOpen.value ? h("div", {
				class: cls("__dropdown"),
				role: "listbox"
			}, dropdownItems) : null;
			return h(Card_default, { class: [cls(""), props.className].filter(Boolean).join(" ") }, () => [triggerButton, dropdown]);
		};
	}
});
var BaseLanguageSwitcher_default = BaseLanguageSwitcher;

//#endregion
//#region src/components/presentation/language-switcher/LanguageSwitcher.ts
/**
* LanguageSwitcher — styled language selection component.
*
* Retrieves current language and setLanguage from i18n context.
*/
const LanguageSwitcher = defineComponent({
	name: "LanguageSwitcher",
	props: {
		className: {
			default: "",
			type: String
		},
		languages: {
			default: () => [
				{
					label: "English",
					value: "en"
				},
				{
					label: "French",
					value: "fr"
				},
				{
					label: "Spanish",
					value: "es"
				},
				{
					label: "Portuguese",
					value: "pt"
				}
			],
			type: Array
		}
	},
	setup(props, { slots }) {
		const { currentLanguage, setLanguage } = useI18n_default();
		return () => h(BaseLanguageSwitcher_default, {
			class: withVendorCSSClassPrefix("language-switcher--styled"),
			className: props.className,
			currentLanguage: currentLanguage?.value ?? "en",
			languages: props.languages,
			onLanguageChange: setLanguage
		}, slots);
	}
});
var LanguageSwitcher_default = LanguageSwitcher;

//#endregion
//#region src/utils/v2/buildThemeConfigFromFlowMeta.ts
/**
* Converts a v2 `FlowMetaTheme` into a `RecursivePartial<ThemeConfig>` that
* `createTheme` can consume.
*
* Only fields explicitly present in the FlowMeta response are included so that
* `createTheme` can deep-merge them onto its base (light/dark) defaults without
* accidentally dropping sibling keys that were not returned by the server.
*/
const buildThemeConfigFromFlowMeta = (flowMetaTheme, colorScheme) => {
	const scheme = flowMetaTheme.colorSchemes?.[colorScheme];
	const borderRadius = flowMetaTheme.shape?.borderRadius;
	const borderRadiusStr = borderRadius !== void 0 ? `${borderRadius}px` : void 0;
	let colors;
	if (scheme?.palette) {
		colors = {};
		if (scheme.palette.primary) colors.primary = scheme.palette.primary;
		if (scheme.palette.secondary) colors.secondary = scheme.palette.secondary;
		if (scheme.palette.text) colors.text = scheme.palette.text;
		if (scheme.palette.background) {
			const bg = {};
			if (scheme.palette.background.default) bg.body = { main: scheme.palette.background.default };
			if (scheme.palette.background.paper) bg.surface = scheme.palette.background.paper;
			if (Object.keys(bg).length > 0) colors.background = bg;
		}
	}
	return {
		...flowMetaTheme.direction ? { direction: flowMetaTheme.direction } : {},
		...borderRadiusStr ? { borderRadius: {
			large: borderRadiusStr,
			medium: borderRadiusStr,
			small: borderRadiusStr
		} } : {},
		...colors && Object.keys(colors).length > 0 ? { colors } : {},
		...flowMetaTheme.typography?.fontFamily ? { typography: { fontFamily: flowMetaTheme.typography.fontFamily } } : {}
	};
};
var buildThemeConfigFromFlowMeta_default = buildThemeConfigFromFlowMeta;

//#endregion
//#region src/router/guard.ts
const logger = createVueLogger("Guard");
/**
* Creates a Vue Router navigation guard that protects routes by requiring authentication.
*
* The guard injects the ThunderID context to check `isSignedIn` state.
* If the user is not authenticated, they are redirected to `redirectTo`.
*
* **Requires `vue-router` as a peer dependency.**
*
* @param options - Guard configuration options.
* @returns A navigation guard function compatible with Vue Router's `beforeEnter` or `router.beforeEach`.
*
* @example
* ```typescript
* import { createRouter, createWebHistory } from 'vue-router';
* import { createThunderIDGuard } from '@thunderid/vue';
*
* const router = createRouter({
*   history: createWebHistory(),
*   routes: [
*     {
*       path: '/dashboard',
*       component: Dashboard,
*       beforeEnter: createThunderIDGuard({ redirectTo: '/login' }),
*     },
*   ],
* });
* ```
*
* @example
* ```typescript
* // Global guard on all routes
* router.beforeEach(createThunderIDGuard({ redirectTo: '/' }));
* ```
*/
const createThunderIDGuard = (options = {}) => {
	const { redirectTo = "/", waitForInit = true, initTimeout = 1e4 } = options;
	return async (_to, _from, next) => {
		const ctx = inject(THUNDERID_KEY);
		if (!ctx) {
			logger.error("createThunderIDGuard: ThunderID context not found. Ensure the ThunderIDPlugin is installed before using the router guard.");
			next({ path: redirectTo });
			return;
		}
		if (ctx.isInitialized.value && ctx.isSignedIn.value) {
			next();
			return;
		}
		if (ctx.isInitialized.value && !ctx.isSignedIn.value) {
			next({ path: redirectTo });
			return;
		}
		if (!waitForInit) {
			next({ path: redirectTo });
			return;
		}
		try {
			await new Promise((resolve, reject) => {
				const timeout = setTimeout(() => {
					reject(/* @__PURE__ */ new Error("ThunderID SDK initialization timed out"));
				}, initTimeout);
				const check = () => {
					if (ctx.isInitialized.value) {
						clearTimeout(timeout);
						resolve();
					} else requestAnimationFrame(check);
				};
				check();
			});
			if (ctx.isSignedIn.value) next();
			else next({ path: redirectTo });
		} catch {
			next({ path: redirectTo });
		}
	};
};

//#endregion
//#region src/router/callbackRoute.ts
/**
* Creates a Vue Router route record for the OAuth2 callback.
*
* The generated route renders the `<Callback>` component which extracts OAuth parameters
* (code, state, error) from the URL and redirects the user back to the original path.
*
* **Requires `vue-router` as a peer dependency.**
*
* @param options - Callback route configuration.
* @returns A route record compatible with Vue Router's `RouteRecordRaw`.
*
* @example
* ```typescript
* import { createRouter, createWebHistory } from 'vue-router';
* import { createCallbackRoute } from '@thunderid/vue';
*
* const router = createRouter({
*   history: createWebHistory(),
*   routes: [
*     createCallbackRoute({ path: '/callback' }),
*     { path: '/', component: Home },
*     { path: '/dashboard', component: Dashboard },
*   ],
* });
* ```
*
* @example
* ```typescript
* // With error handling and Vue Router navigation
* import { useRouter } from 'vue-router';
*
* createCallbackRoute({
*   path: '/auth/callback',
*   name: 'oauth-callback',
*   onError: (error) => console.error('OAuth error:', error),
* });
* ```
*/
const createCallbackRoute = (options = {}) => {
	const { path = "/callback", name, onError } = options;
	const CallbackWrapper = defineComponent({
		name: "ThunderIDCallbackRoute",
		setup() {
			return () => h(Callback_default, { ...onError && { onError } });
		}
	});
	return {
		...name && { name },
		component: CallbackWrapper,
		meta: { isThunderIDCallback: true },
		path
	};
};

//#endregion
export { AcceptInvite_default as AcceptInvite, Alert_default as Alert, ArrowLeftRightIcon, BRANDING_KEY, BaseAcceptInvite_default as BaseAcceptInvite, BaseCreateOrganization_default as BaseCreateOrganization, BaseInviteUser_default as BaseInviteUser, BaseLanguageSwitcher_default as BaseLanguageSwitcher, BaseOrganizationList_default as BaseOrganizationList, BaseOrganizationProfile_default as BaseOrganizationProfile, BaseOrganizationSwitcher_default as BaseOrganizationSwitcher, BaseSignIn_default as BaseSignIn, BaseSignInButton_default as BaseSignInButton, BaseSignOutButton_default as BaseSignOutButton, BaseSignUp_default as BaseSignUp, BaseSignUpButton_default as BaseSignUpButton, BaseUserDropdown_default as BaseUserDropdown, BaseUserProfile_default as BaseUserProfile, BrandingProvider_default as BrandingProvider, BuildingIcon, Button_default as Button, Callback_default as Callback, Card_default as Card, CheckIcon, Checkbox_default as Checkbox, ChevronDownIcon, CircleAlertIcon, CircleCheckIcon, CreateOrganization_default as CreateOrganization, DatePicker_default as DatePicker, Divider_default as Divider, EmbeddedFlowActionVariant, EmbeddedFlowComponentType, EmbeddedFlowEventType, EmbeddedFlowTextVariant, EmbeddedSignInFlowStatus, EmbeddedSignInFlowType, EyeIcon, EyeOffIcon, FLOW_KEY, FLOW_META_KEY, FacebookButton_default as FacebookButton, FieldFactory_default as FieldFactory, FieldType, FlowMetaProvider_default as FlowMetaProvider, FlowProvider_default as FlowProvider, GitHubButton_default as GitHubButton, GlobeIcon, GoogleButton_default as GoogleButton, I18N_KEY, I18nProvider_default as I18nProvider, InfoIcon, InviteUser_default as InviteUser, LanguageSwitcher_default as LanguageSwitcher, Loading_default as Loading, LogOutIcon, Logo_default as Logo, MicrosoftButton_default as MicrosoftButton, ORGANIZATION_KEY, Organization_default as Organization, OrganizationList_default as OrganizationList, OrganizationProfile_default as OrganizationProfile, OrganizationProvider_default as OrganizationProvider, OrganizationSwitcher_default as OrganizationSwitcher, OtpField_default as OtpField, PasswordField_default as PasswordField, PencilIcon, PlusIcon, Select_default as Select, SignIn_default as SignIn, SignInButton_default as SignInButton, SignOutButton_default as SignOutButton, SignUp_default as SignUp, SignUpButton_default as SignUpButton, SignedIn_default as SignedIn, SignedOut_default as SignedOut, Spinner_default as Spinner, THEME_KEY, THUNDERID_KEY, TextField_default as TextField, ThemeProvider_default as ThemeProvider, ThunderIDPlugin_default as ThunderIDPlugin, ThunderIDProvider_default as ThunderIDProvider, ThunderIDRuntimeError, ThunderIDVueClient_default as ThunderIDVueClient, TriangleAlertIcon, Typography_default as Typography, USER_KEY, User_default as User, UserDropdown_default as UserDropdown, UserIcon, UserProfile_default as UserProfile, UserProvider_default as UserProvider, XIcon, buildThemeConfigFromFlowMeta_default as buildThemeConfigFromFlowMeta, createCallbackRoute, createClassObserver, createField, createMediaQueryListener, createThunderIDGuard, detectThemeMode, getActiveTheme, getAuthComponentHeadings_default as getAuthComponentHeadings, handleWebAuthnAuthentication, hasAuthParamsInUrl, http, initiateOAuthRedirect, navigate, useBranding_default as useBranding, useFlow_default as useFlow, useFlowMeta_default as useFlowMeta, useI18n_default as useI18n, useOAuthCallback, useOAuthCallback$1 as useOAuthCallbackV2, useOrganization_default as useOrganization, useTheme_default as useTheme, useThunderID_default as useThunderID, useUser_default as useUser, validateFieldValue };