import { ApplicationNativeAuthenticationConstants, DEFAULT_THEME, EMOJI_URI_SCHEME, EmbeddedFlowActionVariantV2 as EmbeddedFlowActionVariant, EmbeddedFlowComponentType as EmbeddedFlowComponentType$1, EmbeddedFlowComponentTypeV2, EmbeddedFlowComponentTypeV2 as EmbeddedFlowComponentType, EmbeddedFlowEventTypeV2, EmbeddedFlowEventTypeV2 as EmbeddedFlowEventType, EmbeddedFlowResponseType, EmbeddedFlowStatus, EmbeddedFlowTextVariantV2 as EmbeddedFlowTextVariant, EmbeddedFlowType, EmbeddedRecoveryFlowStatusV2 as EmbeddedRecoveryFlowStatus, EmbeddedRecoveryFlowTypeV2 as EmbeddedRecoveryFlowType, EmbeddedSignInFlowAuthenticatorKnownIdPType, EmbeddedSignInFlowAuthenticatorParamType, EmbeddedSignInFlowAuthenticatorPromptType, EmbeddedSignInFlowStatus as EmbeddedSignInFlowStatus$1, EmbeddedSignInFlowStatusV2, EmbeddedSignInFlowStatusV2 as EmbeddedSignInFlowStatus, EmbeddedSignInFlowStepType, EmbeddedSignInFlowTypeV2, EmbeddedSignInFlowTypeV2 as EmbeddedSignInFlowType, FetchHttpClient, FieldType, FlowMetaType, Platform, ThunderIDAPIError, ThunderIDBrowserClient, ThunderIDError, ThunderIDRuntimeError, ThunderIDRuntimeError as ThunderIDRuntimeError$1, TranslationBundleConstants, WellKnownSchemaIds, arrayBufferToBase64url, base64urlToArrayBuffer, bem, countryCodeToFlagEmoji, createClassObserver, createMediaQueryListener, createOrganization, createPackageComponentLogger, createPatchOperations, createTheme, deepMerge, deriveOrganizationHandleFromBaseUrl, detectThemeMode, executeEmbeddedRecoveryFlowV2, executeEmbeddedSignInFlowV2, executeEmbeddedSignUpFlowV2, extractEmojiFromUri, extractEmojiFromUri as extractEmojiFromUri$1, extractUserClaimsFromIdToken, formatDate, generateFlattenedUserProfile, get, getActiveTheme, getActiveTheme as getActiveTheme$1, getAllOrganizations, getBrandingPreference, getDefaultI18nBundles, getFlowMetaV2, getMeOrganizations, getOrganization, getOrganizationUnitChildren, getSchemas, getScim2Me, handleWebAuthnAuthentication, hasAuthParamsInUrl, hasCalledForThisInstanceInUrl, http, isEmojiUri, isEmojiUri as isEmojiUri$1, isEmpty, logger, navigate, navigate as navigate$1, normalizeTranslations, resolveEmojiUrisInHtml, resolveEmojiUrisInHtml as resolveEmojiUrisInHtml$1, resolveFlowTemplateLiterals, resolveFlowTemplateLiterals as resolveFlowTemplateLiterals$1, resolveLocaleDisplayName, resolveLocaleDisplayName as resolveLocaleDisplayName$1, resolveLocaleEmoji, resolveLocaleEmoji as resolveLocaleEmoji$1, resolveMeta, transformBrandingPreferenceToTheme, updateMeProfile, updateOrganization, withVendorCSSClassPrefix } from "@thunderid/browser";
import React, { cloneElement, createContext, forwardRef, isValidElement, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { css, cx, keyframes } from "@emotion/css";
import DOMPurify from "dompurify";
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, autoUpdate, flip, offset, shift, useClick, useDismiss, useFloating, useId, useInteractions, useMergeRefs, useRole } from "@floating-ui/react";

//#region src/contexts/ThunderID/ThunderIDContext.ts
/**
* Context object for managing the Authentication flow builder core context.
*/
const ThunderIDContext = createContext({
	afterSignInUrl: void 0,
	applicationId: void 0,
	baseUrl: void 0,
	clearSession: () => {},
	clientId: void 0,
	discovery: { wellKnown: null },
	exchangeToken: null,
	getAccessToken: null,
	getDecodedIdToken: null,
	getIdToken: null,
	getStorageManager: () => Promise.resolve(null),
	http: {
		request: () => null,
		requestAll: () => null
	},
	instanceId: 0,
	isInitialized: false,
	isLoading: true,
	isMetaLoading: false,
	isSignedIn: false,
	meta: null,
	organization: null,
	organizationHandle: void 0,
	platform: void 0,
	reInitialize: null,
	recover: () => Promise.resolve({}),
	resolveFlowTemplateLiterals: (text) => text ?? "",
	signIn: () => Promise.resolve({}),
	signInOptions: {},
	signInSilently: () => Promise.resolve({}),
	signInUrl: void 0,
	signOut: () => Promise.resolve({}),
	signUp: () => Promise.resolve({}),
	signUpUrl: void 0,
	storage: "sessionStorage",
	switchOrganization: null,
	user: null
});
ThunderIDContext.displayName = "ThunderIDContext";
var ThunderIDContext_default = ThunderIDContext;

//#endregion
//#region src/hooks/useBrowserUrl.ts
/**
* Hook that provides utilities for handling browser URLs in authentication flows.
*
* @returns An object containing URL utility functions
*
* @example
* ```tsx
* const { hasAuthParams } = useBrowserUrl();
* const url = new URL(window.location.href);
*
* if (hasAuthParams(url, "/after-signin")) {
*   // Handle authentication callback
* }
* ```
*/
const useBrowserUrl = () => {
	const hasAuthParams = (url, afterSignInUrl) => hasAuthParamsInUrl() && new URL(url.origin + url.pathname).toString() === new URL(afterSignInUrl).toString() || url.searchParams.get("error") !== null;
	const hasCalledForThisInstance = (url, instanceId) => hasCalledForThisInstanceInUrl(instanceId, url.search);
	return {
		hasAuthParams,
		hasCalledForThisInstance
	};
};
var useBrowserUrl_default = useBrowserUrl;

//#endregion
//#region src/api/getAllOrganizations.ts
/**
* Retrieves all organizations with pagination support.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object containing baseUrl, optional query parameters, and request config.
* @returns A promise that resolves with the paginated organizations information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const response = await getAllOrganizations({
*     baseUrl: "https://localhost:8090",
*     filter: "",
*     limit: 10,
*     recursive: false
*   });
*   console.log(response.organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const response = await getAllOrganizations({
*     baseUrl: "https://localhost:8090",
*     filter: "",
*     limit: 10,
*     recursive: false,
*     fetcher: customFetchFunction
*   });
*   console.log(response.organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*/
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
/**
* Retrieves the organizations associated with the current user.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object containing baseUrl, optional query parameters, and request config.
* @returns A promise that resolves with the organizations information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const organizations = await getMeOrganizations({
*     baseUrl: "https://localhost:8090",
*     after: "",
*     before: "",
*     filter: "",
*     limit: 10,
*     recursive: false
*   });
*   console.log(organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const organizations = await getMeOrganizations({
*     baseUrl: "https://localhost:8090",
*     after: "",
*     before: "",
*     filter: "",
*     limit: 10,
*     recursive: false,
*     fetcher: customFetchFunction
*   });
*   console.log(organizations);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organizations:', error.message);
*   }
* }
* ```
*/
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
//#region src/ThunderIDReactClient.ts
var ThunderIDReactClient = class extends ThunderIDBrowserClient {
	loadingState = false;
	_initializeConfig;
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
		return this.withLoading(async () => {
			this._initializeConfig = {
				...config,
				organizationHandle: resolvedOrganizationHandle,
				periodicTokenRefresh: config?.tokenLifecycle?.refreshToken?.autoRefresh ?? config?.periodicTokenRefresh
			};
			return super.initialize(this._initializeConfig);
		});
	}
	reInitialize(config) {
		return this.withLoading(async () => {
			let isInitialized;
			try {
				await super.reInitialize(config);
				isInitialized = true;
			} catch (error) {
				throw new ThunderIDRuntimeError$1(`Failed to check if the client is initialized: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDReactClient-reInitialize-RuntimeError-001", "react", "An error occurred while checking the initialization status of the client.");
			}
			return isInitialized;
		});
	}
	async updateUserProfile() {
		throw new Error("Not implemented");
	}
	async getUser() {
		return extractUserClaimsFromIdToken(await this.getDecodedIdToken());
	}
	async getDecodedIdToken(sessionId) {
		return super.getDecodedIdToken(sessionId);
	}
	async getIdToken() {
		return this.withLoading(async () => super.getIdToken());
	}
	async getUserProfile() {
		return this.withLoading(async () => {
			const claims = extractUserClaimsFromIdToken(await this.getDecodedIdToken());
			return {
				flattenedProfile: claims,
				profile: claims,
				schemas: []
			};
		});
	}
	async getMyOrganizations(options) {
		try {
			let baseUrl = options?.baseUrl;
			if (!baseUrl) baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return await getMeOrganizations_default({
				baseUrl,
				instanceId: this.getInstanceId()
			});
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Failed to fetch the user's associated organizations: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDReactClient-getMyOrganizations-RuntimeError-001", "react", "An error occurred while fetching associated organizations of the signed-in user.");
		}
	}
	async getAllOrganizations(options) {
		try {
			let baseUrl = options?.baseUrl;
			if (!baseUrl) baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return await getAllOrganizations_default({
				baseUrl,
				instanceId: this.getInstanceId()
			});
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Failed to fetch all organizations: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDReactClient-getAllOrganizations-RuntimeError-001", "react", "An error occurred while fetching all the organizations associated with the user.");
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
			throw new ThunderIDRuntimeError$1(`Failed to fetch the current organization: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDReactClient-getCurrentOrganization-RuntimeError-001", "react", "An error occurred while fetching the current organization of the signed-in user.");
		}
	}
	async switchOrganization(organization) {
		return this.withLoading(async () => {
			try {
				const sourceInstanceId = (await this.getStorageManager().getConfigData())?.organizationChain?.sourceInstanceId;
				if (!organization.id) throw new ThunderIDRuntimeError$1("Organization ID is required for switching organizations", "react-ThunderIDReactClient-SwitchOrganizationError-001", "react", "The organization object must contain a valid ID to perform the organization switch.");
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
				throw new ThunderIDRuntimeError$1(`Failed to switch organization: ${error.message || error}`, "react-ThunderIDReactClient-SwitchOrganizationError-003", "react", "An error occurred while switching to the specified organization. Please try again.");
			}
		});
	}
	isLoading() {
		return this.loadingState;
	}
	async isSignedIn() {
		return super.isSignedIn();
	}
	async exchangeToken(config) {
		return this.withLoading(async () => super.exchangeToken(config));
	}
	async signIn(...args) {
		return this.withLoading(async () => {
			const arg1 = args[0];
			const arg2 = args[1];
			const config = await this.getStorageManager().getConfigData();
			if (!config || Object.keys(config).length === 0) await this.initialize(this._initializeConfig);
			if (typeof arg1 === "object" && arg1 !== null && arg1.callOnlyOnRedirect === true) return;
			if (typeof arg1 === "object" && arg1 !== null && !isEmpty(arg1) && ("executionId" in arg1 || "applicationId" in arg1)) {
				const authIdFromUrl = new URL(window.location.href).searchParams.get("authId") ?? "";
				const authIdFromStorage = sessionStorage.getItem("thunderid_auth_id") ?? "";
				const response = await executeEmbeddedSignInFlowV2({
					authId: authIdFromUrl || authIdFromStorage,
					baseUrl: config?.baseUrl ?? "",
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
		return super.signInSilently(options);
	}
	async signUp(...args) {
		const config = await this.getStorageManager().getConfigData();
		const firstArg = args[0];
		const baseUrl = config?.baseUrl ?? "";
		const authIdFromUrl = new URL(window.location.href).searchParams.get("authId") ?? "";
		const authIdFromStorage = sessionStorage.getItem("thunderid_auth_id") ?? "";
		const authId = authIdFromUrl || authIdFromStorage;
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
	async recover(payload) {
		return executeEmbeddedRecoveryFlowV2({
			baseUrl: (await this.getStorageManager().getConfigData())?.baseUrl,
			payload: {
				...payload,
				verbose: true
			}
		});
	}
	getStorageManager() {
		return super.getStorageManager();
	}
	async request(requestConfig) {
		return super.httpRequest(requestConfig);
	}
	async requestAll(requestConfigs) {
		return super.httpRequestAll(requestConfigs);
	}
};
var ThunderIDReactClient_default = ThunderIDReactClient;

//#endregion
//#region src/contexts/Branding/BrandingContext.ts
const BrandingContext = createContext(null);
BrandingContext.displayName = "BrandingContext";
var BrandingContext_default = BrandingContext;

//#endregion
//#region src/contexts/Branding/BrandingProvider.tsx
/**
* BrandingProvider component that manages branding state and provides branding context to child components.
*
* This provider receives branding preferences from a parent component (typically ThunderIDProvider)
* and transforms them into theme objects, making them available to all child components.
*
* Features:
* - Receives branding preferences as props
* - Theme transformation from branding preferences
* - Loading and error states
* - Support for custom theme forcing
*
* @example
* Basic usage (typically used within ThunderIDProvider):
* ```tsx
* <BrandingProvider
*   brandingPreference={brandingData}
*   isLoading={isFetching}
*   error={fetchError}
* >
*   <App />
* </BrandingProvider>
* ```
*
* @example
* With custom theme forcing:
* ```tsx
* <BrandingProvider
*   brandingPreference={brandingData}
*   forceTheme="dark"
*   enabled={true}
* >
*   <App />
* </BrandingProvider>
* ```
*/
const BrandingProvider = ({ children, brandingPreference: externalBrandingPreference, forceTheme, enabled = true, isLoading: externalIsLoading = false, error: externalError = null, refetch: externalRefetch }) => {
	const [theme, setTheme] = useState(null);
	const [activeTheme, setActiveTheme] = useState(null);
	useEffect(() => {
		if (!enabled || !externalBrandingPreference) {
			setTheme(null);
			setActiveTheme(null);
			return;
		}
		const activeThemeFromBranding = externalBrandingPreference?.preference?.theme?.activeTheme;
		let extractedActiveTheme = null;
		if (activeThemeFromBranding) {
			const themeMode = activeThemeFromBranding.toLowerCase();
			if (themeMode === "light" || themeMode === "dark") extractedActiveTheme = themeMode;
		}
		setActiveTheme(extractedActiveTheme);
		setTheme(transformBrandingPreferenceToTheme(externalBrandingPreference, forceTheme));
	}, [
		externalBrandingPreference,
		forceTheme,
		enabled
	]);
	useEffect(() => {
		if (!enabled) {
			setTheme(null);
			setActiveTheme(null);
		}
	}, [enabled]);
	const fetchBranding = useCallback(async () => {
		if (externalRefetch) await externalRefetch();
	}, [externalRefetch]);
	const value = {
		activeTheme,
		brandingPreference: externalBrandingPreference || null,
		error: externalError,
		fetchBranding,
		isLoading: externalIsLoading,
		refetch: externalRefetch || fetchBranding,
		theme
	};
	return /* @__PURE__ */ jsx(BrandingContext_default.Provider, {
		value,
		children
	});
};
var BrandingProvider_default = BrandingProvider;

//#endregion
//#region src/contexts/ComponentRenderer/ComponentRendererContext.ts
const ComponentRendererContext = createContext({});
var ComponentRendererContext_default = ComponentRendererContext;

//#endregion
//#region src/contexts/ComponentRenderer/ComponentRendererProvider.tsx
const ComponentRendererProvider = ({ renderers, children }) => /* @__PURE__ */ jsx(ComponentRendererContext_default.Provider, {
	value: renderers,
	children
});
var ComponentRendererProvider_default = ComponentRendererProvider;

//#endregion
//#region src/contexts/Flow/FlowContext.ts
/**
* Context for managing authentication flow UI state.
* This context handles titles, messages, navigation, and loading states
* for authentication flows like SignIn, SignUp, organization signin, etc.
*/
const FlowContext = createContext(void 0);
FlowContext.displayName = "FlowContext";
var FlowContext_default = FlowContext;

//#endregion
//#region src/contexts/Flow/FlowProvider.tsx
/**
* Provider component for flow context.
* Manages shared UI state for authentication flows including titles, messages, and navigation.
*/
const FlowProvider = ({ children, initialStep = null, initialTitle = "", initialSubtitle, onFlowChange }) => {
	const [currentStep, setCurrentStepState] = useState(initialStep);
	const [title, setTitle] = useState(initialTitle);
	const [subtitle, setSubtitle] = useState(initialSubtitle);
	const [messages, setMessages] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showBackButton, setShowBackButton] = useState(false);
	const [onGoBack, setOnGoBack] = useState(void 0);
	/**
	* Set the current flow step and notify listeners.
	*/
	const setCurrentStep = useCallback((step) => {
		setCurrentStepState(step);
		if (step) {
			setTitle(step.title);
			setSubtitle(step.subtitle);
			setShowBackButton(step.canGoBack ?? false);
		}
		onFlowChange?.(step);
	}, [onFlowChange]);
	/**
	* Add a message to the message list.
	*/
	const addMessage = useCallback((message) => {
		const messageWithId = {
			...message,
			id: message.id ?? `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
		};
		setMessages((prev) => [...prev, messageWithId]);
	}, []);
	/**
	* Remove a specific message by ID.
	*/
	const removeMessage = useCallback((messageId) => {
		setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
	}, []);
	/**
	* Clear all messages.
	*/
	const clearMessages = useCallback(() => {
		setMessages([]);
	}, []);
	/**
	* Reset the flow context to initial state.
	*/
	const reset = useCallback(() => {
		setCurrentStepState(initialStep);
		setTitle(initialTitle);
		setSubtitle(initialSubtitle);
		setMessages([]);
		setError(null);
		setIsLoading(false);
		setShowBackButton(false);
		setOnGoBack(void 0);
	}, [
		initialStep,
		initialTitle,
		initialSubtitle
	]);
	/**
	* Navigate to a different authentication flow.
	*/
	const navigateToFlow = useCallback((flowType, options) => {
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
		setError(null);
	}, [setCurrentStep, clearMessages]);
	const contextValue = useMemo(() => ({
		addMessage,
		clearMessages,
		currentStep,
		error,
		isLoading,
		messages,
		navigateToFlow,
		onGoBack,
		removeMessage,
		reset,
		setCurrentStep,
		setError,
		setIsLoading,
		setOnGoBack,
		setShowBackButton,
		setSubtitle,
		setTitle,
		showBackButton,
		subtitle,
		title
	}), [
		currentStep,
		setCurrentStep,
		title,
		subtitle,
		messages,
		addMessage,
		removeMessage,
		clearMessages,
		error,
		isLoading,
		showBackButton,
		onGoBack,
		reset,
		navigateToFlow
	]);
	return /* @__PURE__ */ jsx(FlowContext_default.Provider, {
		value: contextValue,
		children
	});
};
var FlowProvider_default = FlowProvider;

//#endregion
//#region src/contexts/FlowMeta/FlowMetaContext.ts
const FlowMetaContext = createContext(null);
FlowMetaContext.displayName = "FlowMetaContext";
var FlowMetaContext_default = FlowMetaContext;

//#endregion
//#region src/contexts/I18n/I18nContext.ts
const I18nContext = createContext(null);
I18nContext.displayName = "I18nContext";
var I18nContext_default = I18nContext;

//#endregion
//#region src/contexts/I18n/useI18n.ts
/**
* Hook for accessing the I18n context directly.
* Provides access to the full i18n context including bundles and all utilities.
*
* @returns The complete I18n context value
* @throws Error if used outside of I18nProvider context
*/
const useI18n = () => {
	const context = useContext(I18nContext_default);
	if (!context) throw new Error("useI18n must be used within an I18nProvider. Make sure your component is wrapped with ThunderIDProvider which includes I18nProvider.");
	return context;
};
var useI18n_default = useI18n;

//#endregion
//#region src/contexts/ThunderID/useThunderID.ts
const useThunderID = () => {
	const context = useContext(ThunderIDContext_default);
	if (!context) throw new Error("useThunderID must be used within an ThunderIDProvider");
	const flowMetaContext = useContext(FlowMetaContext_default);
	const i18nContext = useContext(I18nContext_default);
	const meta = flowMetaContext?.meta ?? null;
	const isMetaLoading = flowMetaContext?.isLoading ?? false;
	return {
		...context,
		isMetaLoading,
		meta,
		resolveFlowTemplateLiterals: (text) => resolveFlowTemplateLiterals$1(text, {
			meta,
			t: i18nContext?.t ?? ((key) => key)
		})
	};
};
var useThunderID_default = useThunderID;

//#endregion
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
//#region src/contexts/I18n/I18nProvider.tsx
const logger$10 = createPackageComponentLogger("@thunderid/react", "I18nProvider");
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
					logger$10.warn("Failed to persist language preference to localStorage.");
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
		else logger$10.warn(`Language '${language}' is not available. Available languages: ${Object.keys(mergedBundles).join(", ")}`);
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
//#region src/contexts/Organization/OrganizationContext.ts
/**
* Context object for managing organization data and related operations.
*/
const OrganizationContext$1 = createContext({
	createOrganization: () => null,
	currentOrganization: null,
	error: null,
	getAllOrganizations: () => Promise.resolve({
		count: 0,
		organizations: []
	}),
	isLoading: false,
	myOrganizations: [],
	revalidateMyOrganizations: () => Promise.resolve([]),
	switchOrganization: () => Promise.resolve()
});
OrganizationContext$1.displayName = "OrganizationContext";
var OrganizationContext_default$1 = OrganizationContext$1;

//#endregion
//#region src/contexts/Organization/OrganizationProvider.tsx
/**
* OrganizationProvider component that manages organization data and provides it through OrganizationContext.
*
* This provider:
* - Fetches organization data from the organizations endpoint
* - Manages current organization state
* - Provides functions for switching organizations and refreshing data
* - Handles loading states and errors
*
* @example
* ```tsx
* // Basic usage with auto-fetch (uses internal API)
* <OrganizationProvider>
*   <App />
* </OrganizationProvider>
*
* // With custom error handling
* <OrganizationProvider onError={(error) => console.error('Organization error:', error)}>
*   <App />
* </OrganizationProvider>
*
* // With custom organization switch handler
* <OrganizationProvider
*   onOrganizationSwitch={(org) => console.log('Switched to:', org.name)}
* >
*   <App />
* </OrganizationProvider>
*
* // Disable auto-fetch (fetch manually using revalidateMyOrganizations)
* <OrganizationProvider autoFetch={false}>
*   <App />
* </OrganizationProvider>
* ```
*/
const OrganizationProvider = ({ children, currentOrganization, onError, myOrganizations, onOrganizationSwitch, revalidateMyOrganizations, getAllOrganizations: getAllOrganizations$2, createOrganization: createOrganization$2 }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	/**
	* Switches to a different organization
	*/
	const switchOrganization = useCallback(async (organization) => {
		if (!onOrganizationSwitch) throw new ThunderIDRuntimeError$1("onOrganizationSwitch callback is required", "OrganizationProvider-SwitchError-001", "react", "The onOrganizationSwitch callback must be provided to handle organization switching.");
		setIsLoading(true);
		setError(null);
		try {
			await onOrganizationSwitch(organization);
		} catch (switchError) {
			const errorMessage = switchError instanceof Error ? switchError.message : "Failed to switch organization";
			setError(errorMessage);
			if (onError) onError(errorMessage);
			throw switchError;
		} finally {
			setIsLoading(false);
		}
	}, [onOrganizationSwitch, onError]);
	const contextValue = useMemo(() => ({
		createOrganization: createOrganization$2,
		currentOrganization: currentOrganization ?? null,
		error,
		getAllOrganizations: getAllOrganizations$2 ?? (() => Promise.resolve({
			count: 0,
			organizations: []
		})),
		isLoading,
		myOrganizations: myOrganizations ?? [],
		revalidateMyOrganizations,
		switchOrganization
	}), [
		currentOrganization,
		error,
		isLoading,
		myOrganizations,
		switchOrganization,
		revalidateMyOrganizations,
		getAllOrganizations$2,
		createOrganization$2
	]);
	return /* @__PURE__ */ jsx(OrganizationContext_default$1.Provider, {
		value: contextValue,
		children
	});
};
var OrganizationProvider_default = OrganizationProvider;

//#endregion
//#region src/utils/applyThemeToDOM.ts
/**
* Writes all CSS custom properties from a resolved `Theme` onto the document root.
* Called inside a `useEffect` whenever the active theme changes.
*/
const applyThemeToDOM = (theme) => {
	Object.entries(theme.cssVariables).forEach(([key, value]) => {
		document.documentElement.style.setProperty(key, value);
	});
};
var applyThemeToDOM_default = applyThemeToDOM;

//#endregion
//#region src/utils/normalizeThemeConfig.ts
/**
* Normalizes a single color value that may have been supplied as a shorthand
* CSS color string (`'#2563eb'`) instead of the expected object form
* (`{ main: '#2563eb' }`).
*
* This makes the `preferences.theme.overrides.colors.*` API forgiving for
* JavaScript callers who don't have TypeScript's type-checker to catch the
* mismatch at compile time.
*/
const normalizeColorValue = (color) => typeof color === "string" ? { main: color } : color;
/**
* Normalizes a `RecursivePartial<ThemeConfig>` so that color fields which are
* supplied as plain CSS color strings are coerced into `{ main: string }`
* objects before being handed to `createTheme`.
*
* Only the color groups that `toCssVariables` in `createTheme` actually reads
* individual sub-keys from are normalized here (`primary`, `secondary`,
* `error`, `success`, `warning`, `info`).  `border` is left alone because it
* IS a plain string in `ThemeConfig`.
*/
const normalizeThemeConfig = (config) => {
	if (!config?.colors) return config;
	const { primary, secondary, error, success, warning, info,...restColors } = config.colors;
	return {
		...config,
		colors: {
			...restColors,
			...primary !== void 0 ? { primary: normalizeColorValue(primary) } : {},
			...secondary !== void 0 ? { secondary: normalizeColorValue(secondary) } : {},
			...error !== void 0 ? { error: normalizeColorValue(error) } : {},
			...success !== void 0 ? { success: normalizeColorValue(success) } : {},
			...warning !== void 0 ? { warning: normalizeColorValue(warning) } : {},
			...info !== void 0 ? { info: normalizeColorValue(info) } : {}
		}
	};
};
var normalizeThemeConfig_default = normalizeThemeConfig;

//#endregion
//#region src/contexts/Branding/useBrandingContext.ts
/**
* Hook to access the branding context.
* This hook provides access to branding preferences, theme data, and loading states.
*
* @returns The branding context value containing branding preference data, theme, and control functions
* @throws Error if used outside of a BrandingProvider
*
* @example
* ```tsx
* function MyComponent() {
*   const { theme, activeTheme, isLoading, error } = useBrandingContext();
*
*   if (isLoading) return <div>Loading branding...</div>;
*   if (error) return <div>Error: {error.message}</div>;
*
*   return (
*     <div style={{ color: theme?.colors?.primary?.main }}>
*       <p>Active theme mode: {activeTheme}</p>
*       <p>Styled with ThunderID branding</p>
*     </div>
*   );
* }
* ```
*/
const useBrandingContext = () => {
	const context = useContext(BrandingContext_default);
	if (!context) throw new Error("useBrandingContext must be used within a BrandingProvider");
	return context;
};
var useBrandingContext_default = useBrandingContext;

//#endregion
//#region src/contexts/Theme/ThemeContext.ts
const ThemeContext = createContext(null);
ThemeContext.displayName = "ThemeContext";
var ThemeContext_default = ThemeContext;

//#endregion
//#region src/contexts/Theme/v1/ThemeProvider.tsx
const logger$9 = createPackageComponentLogger("@thunderid/react", "ThemeProvider");
/**
* ThemeProvider component that manages theme state and provides theme context to child components.
*
* This provider integrates with ThunderID branding preferences to automatically apply
* organization-specific themes while allowing for custom theme overrides.
*
* Features:
* - Automatic theme mode detection (light/dark/system/class)
* - Integration with ThunderID branding API through useBranding hook
* - Merging of branding themes with custom theme configurations
* - CSS variable injection for easy styling
* - Loading and error states for branding integration
*
* @example
* Basic usage with branding integration:
* ```tsx
* <ThemeProvider inheritFromBranding={true}>
*   <App />
* </ThemeProvider>
* ```
*
* @example
* With custom theme overrides:
* ```tsx
* <ThemeProvider
*   theme={{
*     colors: {
*       primary: { main: '#custom-color' }
*     }
*   }}
*   inheritFromBranding={true}
* >
*   <App />
* </ThemeProvider>
* ```
*
* @example
* With branding-driven theme mode:
* ```tsx
* <ThemeProvider
*   mode="branding"
*   inheritFromBranding={true}
* >
*   <App />
* </ThemeProvider>
* ```
*/
const ThemeProvider$2 = ({ children, theme: themeConfigProp, mode = DEFAULT_THEME, detection = {}, inheritFromBranding = true }) => {
	const themeConfig = normalizeThemeConfig_default(themeConfigProp);
	const [colorScheme, setColorScheme] = useState(() => {
		if (mode === "light" || mode === "dark") return mode;
		if (mode === "branding") return detectThemeMode("system", detection);
		return detectThemeMode(mode, detection);
	});
	let brandingTheme = null;
	let brandingActiveTheme = null;
	let isBrandingLoading = false;
	let brandingError = null;
	try {
		const brandingContext = useBrandingContext_default();
		brandingTheme = brandingContext.theme;
		brandingActiveTheme = brandingContext.activeTheme;
		isBrandingLoading = brandingContext.isLoading;
		brandingError = brandingContext.error;
	} catch (error) {
		if (inheritFromBranding) logger$9.warn("ThemeProvider: inheritFromBranding is enabled but BrandingProvider is not available. Make sure to wrap your app with BrandingProvider or ThunderIDProvider with branding preferences.");
	}
	useEffect(() => {
		if (inheritFromBranding && brandingActiveTheme) {
			if (mode === "branding") setColorScheme(brandingActiveTheme);
			else if (mode === "system" && !isBrandingLoading) setColorScheme(brandingActiveTheme);
		}
	}, [
		inheritFromBranding,
		brandingActiveTheme,
		mode,
		isBrandingLoading
	]);
	const finalThemeConfig = useMemo(() => {
		if (!inheritFromBranding || !brandingTheme) return themeConfig;
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
	}, [
		inheritFromBranding,
		brandingTheme,
		themeConfig
	]);
	const theme = useMemo(() => createTheme(finalThemeConfig, colorScheme === "dark"), [finalThemeConfig, colorScheme]);
	const direction = finalThemeConfig?.direction || "ltr";
	const handleThemeChange = useCallback((isDark) => {
		setColorScheme(isDark ? "dark" : "light");
	}, []);
	const toggleTheme = useCallback(() => {
		setColorScheme((prev) => prev === "light" ? "dark" : "light");
	}, []);
	useEffect(() => {
		let observer = null;
		let mediaQuery = null;
		if (mode === "branding") return;
		if (mode === "class") {
			const targetElement = detection.targetElement || document.documentElement;
			if (targetElement) observer = createClassObserver(targetElement, handleThemeChange, detection);
		} else if (mode === "system") {
			if (!inheritFromBranding || !brandingActiveTheme) mediaQuery = createMediaQueryListener(handleThemeChange);
		}
		return () => {
			if (observer) observer.disconnect();
			if (mediaQuery) if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", handleThemeChange);
			else mediaQuery.removeListener(handleThemeChange);
		};
	}, [
		mode,
		detection,
		handleThemeChange,
		inheritFromBranding,
		brandingActiveTheme
	]);
	useEffect(() => {
		applyThemeToDOM_default(theme);
	}, [theme]);
	useEffect(() => {
		if (typeof document !== "undefined") document.documentElement.dir = direction;
	}, [direction]);
	const value = {
		brandingError,
		colorScheme,
		direction,
		inheritFromBranding,
		isBrandingLoading,
		theme,
		toggleTheme
	};
	return /* @__PURE__ */ jsx(ThemeContext_default.Provider, {
		value,
		children
	});
};
var ThemeProvider_default$1 = ThemeProvider$2;

//#endregion
//#region src/utils/v2/buildThemeConfigFromFlowMeta.ts
/**
* Converts a v2 `FlowMetaTheme` into a `RecursivePartial<ThemeConfig>` that
* `createTheme` can consume.
*
* Only fields explicitly present in the FlowMeta response are included so that
* `createTheme` can deep-merge them onto its base (light/dark) defaults without
* accidentally dropping sibling keys that were not returned by the server.
*
* For example, when FlowMeta returns only `background.default` and
* `background.paper`, only `body.main` and `surface` are set — the base
* theme's `background.disabled` and `background.dark` are **not** overridden
* and therefore keep their default CSS variable values.
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
//#region src/contexts/Theme/v2/ThemeProvider.tsx
/**
* ThemeProvider is the v2 drop-in replacement for `ThemeProvider`.
*
* It reads the design theme from the nearest `FlowMetaContext` (provided by
* `FlowMetaProvider`) and publishes a resolved `Theme` object through the
* **same** `ThemeContext` that `useTheme` consumes.  This means all existing
* components that call `useTheme` continue to work without any changes.
*
* The `defaultColorScheme` field returned by the server is used to seed the
* active color scheme; the user can still toggle it locally via the
* `toggleTheme` value exposed in the context.
*
* @example
* ```tsx
* <FlowMetaProvider config={{ baseUrl, type: FlowMetaType.App, id: appId }}>
*   <ThemeProvider>
*     <App />   {/* useTheme() works here as usual *\/}
*   </ThemeProvider>
* </FlowMetaProvider>
* ```
*
* @example
* With user theme overrides (user values win over server values):
* ```tsx
* <ThemeProvider theme={{ colors: { primary: { main: '#ff0000' } } }}>
*   <App />
* </ThemeProvider>
* ```
*/
const ThemeProvider$1 = ({ children, theme: themeOverrideProp }) => {
	const themeOverride = normalizeThemeConfig_default(themeOverrideProp);
	const flowMetaContext = useContext(FlowMetaContext_default);
	const flowMetaTheme = flowMetaContext?.meta?.design?.theme ?? null;
	const isLoading = flowMetaContext?.isLoading ?? false;
	const error = flowMetaContext?.error ?? null;
	const [colorScheme, setColorScheme] = useState(() => flowMetaTheme?.defaultColorScheme ?? "light");
	useEffect(() => {
		if (flowMetaTheme?.defaultColorScheme) setColorScheme(flowMetaTheme.defaultColorScheme);
	}, [flowMetaTheme?.defaultColorScheme]);
	const toggleTheme = useCallback(() => {
		setColorScheme((prev) => prev === "light" ? "dark" : "light");
	}, []);
	const finalThemeConfig = useMemo(() => {
		if (!flowMetaTheme) return themeOverride;
		const metaConfig = buildThemeConfigFromFlowMeta_default(flowMetaTheme, colorScheme);
		if (!themeOverride) return metaConfig;
		return {
			...metaConfig,
			...themeOverride,
			borderRadius: {
				...metaConfig.borderRadius,
				...themeOverride.borderRadius
			},
			colors: {
				...metaConfig.colors,
				...themeOverride.colors
			},
			...metaConfig.typography || themeOverride.typography ? { typography: {
				...metaConfig.typography,
				...themeOverride.typography
			} } : {}
		};
	}, [
		flowMetaTheme,
		colorScheme,
		themeOverride
	]);
	const theme = useMemo(() => createTheme(finalThemeConfig, colorScheme === "dark"), [finalThemeConfig, colorScheme]);
	const direction = flowMetaTheme?.direction ?? "ltr";
	useEffect(() => {
		applyThemeToDOM_default(theme);
	}, [theme]);
	useEffect(() => {
		if (typeof document !== "undefined") document.documentElement.dir = direction;
	}, [direction]);
	const value = {
		brandingError: error,
		colorScheme,
		direction,
		inheritFromBranding: false,
		isBrandingLoading: isLoading,
		theme,
		toggleTheme
	};
	return /* @__PURE__ */ jsx(ThemeContext_default.Provider, {
		value,
		children
	});
};
var ThemeProvider_default$2 = ThemeProvider$1;

//#endregion
//#region src/contexts/Theme/ThemeProvider.tsx
/**
* ThemeProvider is the single entry-point for theme management in `@thunderid/react`.
*
* It transparently switches between two internal implementations:
*
* **v1** (`ThemeProvider` classic): Sources colors from the ThunderID Branding API.
* Used automatically when no `FlowMetaProvider` is present in the component tree.
*
* **v2** (`FlowMetaThemeProvider`): Sources colors from the `GET /flow/meta` endpoint
* via `FlowMetaProvider`. Used automatically when a `FlowMetaProvider` is present
* in the tree — or when `version="v2"` is set explicitly.
*
* The active version can also be pinned explicitly via the `version` prop.
* All components that consume `useTheme()` continue to work regardless of which
* version is active.
*
* @example
* Auto-detection (recommended):
* ```tsx
* // v2 mode – FlowMetaProvider is present
* <FlowMetaProvider config={{ baseUrl, type: FlowMetaType.App, id: appId }}>
*   <ThemeProvider>
*     <App />
*   </ThemeProvider>
* </FlowMetaProvider>
*
* // v1 mode – no FlowMetaProvider
* <ThemeProvider>
*   <App />
* </ThemeProvider>
* ```
*
* @example
* Explicit version pinning:
* ```tsx
* <ThemeProvider version="v2">
*   <App />
* </ThemeProvider>
* ```
*/
const ThemeProvider = ({ children, theme, detection, inheritFromBranding, mode }) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(ThemeProvider_default$2, {
		theme,
		children
	});
	return /* @__PURE__ */ jsx(ThemeProvider_default$1, {
		detection,
		inheritFromBranding,
		mode,
		theme,
		children
	});
};
var ThemeProvider_default = ThemeProvider;

//#endregion
//#region src/contexts/User/UserContext.ts
/**
* Context object for managing user profile data and related operations.
*/
const UserContext = createContext({
	flattenedProfile: null,
	onUpdateProfile: () => null,
	profile: null,
	revalidateProfile: () => null,
	schemas: null,
	updateProfile: () => null
});
UserContext.displayName = "UserContext";
var UserContext_default = UserContext;

//#endregion
//#region src/contexts/User/UserProvider.tsx
/**
* UserProvider component that manages user profile data and provides it through UserContext.
*
* This provider:
* - Fetches user profile data from the ME endpoint
* - Retrieves SCIM2 schemas for profile structure
* - Generates both nested and flattened user profiles
* - Provides functions for refreshing and updating user data
* - Handles loading states and errors
*
* @example
* ```tsx
* // Basic usage
* <UserProvider>
*   <App />
* </UserProvider>
*
* // With custom error handling
* <UserProvider onError={(error) => console.error('User error:', error)}>
*   <App />
* </UserProvider>
*
* // Disable auto-fetch (fetch manually using refreshUser)
* <UserProvider autoFetch={false}>
*   <App />
* </UserProvider>
* ```
*/
const UserProvider = ({ children, profile, revalidateProfile, onUpdateProfile, updateProfile }) => {
	const contextValue = useMemo(() => ({
		flattenedProfile: profile?.flattenedProfile,
		onUpdateProfile,
		profile: profile?.profile,
		revalidateProfile,
		schemas: profile?.schemas,
		updateProfile
	}), [
		profile,
		onUpdateProfile,
		revalidateProfile,
		updateProfile
	]);
	return /* @__PURE__ */ jsx(UserContext_default.Provider, {
		value: contextValue,
		children
	});
};
var UserProvider_default = UserProvider;

//#endregion
//#region src/contexts/ThunderID/ThunderIDProvider.tsx
const logger$8 = createPackageComponentLogger("@thunderid/react", "ThunderIDProvider");
const ThunderIDProvider = ({ afterSignInUrl, afterSignOutUrl, baseUrl: initialBaseUrl, clientId, children, extensions, scopes, preferences, signInUrl, signUpUrl, organizationHandle, applicationId, signInOptions, syncSession, instanceId = 0, organizationChain,...rest }) => {
	const reRenderCheckRef = useRef(false);
	const client = useMemo(() => new ThunderIDReactClient_default(instanceId), [instanceId]);
	const storageManagerRef = useRef(null);
	const { hasAuthParams, hasCalledForThisInstance } = useBrowserUrl_default();
	const [user, setUser] = useState(null);
	const [currentOrganization, setCurrentOrganization] = useState(null);
	const [isSignedInSync, setIsSignedInSync] = useState(false);
	const [isInitializedSync, setIsInitializedSync] = useState(false);
	const [isLoadingSync, setIsLoadingSync] = useState(true);
	const [myOrganizations, setMyOrganizations] = useState([]);
	const [userProfile, setUserProfile] = useState(null);
	const [baseUrl, setBaseUrl] = useState(initialBaseUrl ?? "");
	const [config, setConfig] = useState({
		afterSignInUrl: afterSignInUrl ?? window.location.origin,
		afterSignOutUrl: afterSignOutUrl ?? window.location.origin,
		applicationId,
		baseUrl,
		clientId,
		organizationChain,
		organizationHandle,
		scopes,
		signInOptions,
		signInUrl,
		signUpUrl,
		syncSession,
		...rest
	});
	const [isUpdatingSession, setIsUpdatingSession] = useState(false);
	const [wellKnown, setWellKnown] = useState(null);
	const [brandingPreference, setBrandingPreference] = useState(null);
	const [isBrandingLoading, setIsBrandingLoading] = useState(false);
	const [brandingError, setBrandingError] = useState(null);
	const [hasFetchedBranding, setHasFetchedBranding] = useState(false);
	useEffect(() => {
		setBaseUrl(initialBaseUrl ?? "");
		if (initialBaseUrl !== baseUrl) {
			setHasFetchedBranding(false);
			setBrandingPreference(null);
			setBrandingError(null);
		}
	}, [initialBaseUrl, baseUrl]);
	useEffect(() => {
		(async () => {
			await client.initialize(config);
			setConfig(await client.getConfiguration());
			setWellKnown(await client.getDiscoveryResponse());
		})();
	}, []);
	async function updateSession() {
		try {
			setIsUpdatingSession(true);
			setIsLoadingSync(true);
			let resolvedBaseUrl = baseUrl;
			const decodedToken = await client.getDecodedIdToken();
			if (decodedToken?.["user_org"]) {
				resolvedBaseUrl = `${(await client.getConfiguration()).baseUrl}/o`;
				setBaseUrl(resolvedBaseUrl);
			}
			const claims = extractUserClaimsFromIdToken(decodedToken);
			setUser(claims);
			setUserProfile({
				flattenedProfile: claims,
				profile: claims,
				schemas: []
			});
			setIsSignedInSync(await client.isSignedIn());
		} catch (error) {} finally {
			setIsUpdatingSession(false);
			setIsLoadingSync(client.isLoading());
		}
	}
	async function signIn(...args) {
		const arg1 = args[0];
		const isV2FlowRequest = typeof arg1 === "object" && arg1 !== null && ("executionId" in arg1 || "applicationId" in arg1);
		try {
			if (!isV2FlowRequest) {
				setIsUpdatingSession(true);
				setIsLoadingSync(true);
			}
			return await client.signIn(...args);
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signIn-Error", "react", "An error occurred while trying to sign in.");
		} finally {
			if (!isV2FlowRequest) {
				setIsUpdatingSession(false);
				setIsLoadingSync(client.isLoading());
			}
		}
	}
	/**
	* Try signing in when the component is mounted.
	*/
	useEffect(() => {
		if (reRenderCheckRef.current) return;
		reRenderCheckRef.current = true;
		(async () => {
			await client.on("sign-in", async () => {
				await updateSession();
			});
			const isAlreadySignedIn = await client.isSignedIn();
			const scheduleAutoRefresh = async () => {
				try {
					await client.startAutoRefreshToken();
				} catch (error) {
					logger$8.warn("Failed to schedule automatic token refresh.", error);
				}
			};
			const resumeSession = async () => {
				await updateSession();
				await scheduleAutoRefresh();
			};
			if (isAlreadySignedIn) await resumeSession();
			await scheduleAutoRefresh();
			if (await client.isSignedIn()) {
				await resumeSession();
				return;
			}
			const currentUrl = new URL(window.location.href);
			if (hasAuthParams(currentUrl, config.afterSignInUrl) && hasCalledForThisInstance(currentUrl, instanceId ?? 0)) try {
				const urlParams = currentUrl.searchParams;
				const code = urlParams.get("code");
				const executionIdFromUrl = urlParams.get("executionId");
				const storedExecutionId = sessionStorage.getItem("thunderid_execution_id");
				if (code && !executionIdFromUrl && !storedExecutionId) await signIn();
			} catch (error) {
				throw new ThunderIDRuntimeError$1(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signIn-Error", "react", "An error occurred while trying to sign in.");
			}
		})();
	}, []);
	/**
	* Check if the user is signed in and update the state accordingly.
	* This will also set an interval to check for the sign-in status every second
	* until the user is signed in.
	*/
	useEffect(() => {
		let interval;
		(async () => {
			try {
				const status = await client.isSignedIn();
				setIsSignedInSync(status);
				if (!status) interval = setInterval(async () => {
					if (await client.isSignedIn()) {
						setIsSignedInSync(true);
						clearInterval(interval);
					}
				}, 1e3);
			} catch (error) {
				setIsSignedInSync(false);
			}
		})();
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [client]);
	useEffect(() => {
		(async () => {
			try {
				setIsInitializedSync(await client.isInitialized());
			} catch (error) {
				setIsInitializedSync(false);
			}
		})();
	}, [client]);
	/**
	* Track loading state changes from the ThunderID client
	*/
	useEffect(() => {
		const checkLoadingState = () => {
			if (isUpdatingSession) return;
			const currentUrl = new URL(window.location.href);
			if (!isSignedInSync && hasAuthParams(currentUrl, config.afterSignInUrl)) return;
			setIsLoadingSync(client.isLoading());
		};
		checkLoadingState();
		const interval = setInterval(checkLoadingState, 100);
		return () => {
			clearInterval(interval);
		};
	}, [
		client,
		isLoadingSync,
		isSignedInSync,
		isUpdatingSession
	]);
	const fetchBranding = useCallback(async () => {
		if (!baseUrl) return;
		if (isBrandingLoading) return;
		setIsBrandingLoading(true);
		setBrandingError(null);
		try {
			setBrandingPreference(await getBrandingPreference({
				baseUrl,
				locale: preferences?.i18n?.language
			}));
			setHasFetchedBranding(true);
		} catch (err) {
			setBrandingError(err instanceof Error ? err : /* @__PURE__ */ new Error("Failed to fetch branding preference"));
			setBrandingPreference(null);
			setHasFetchedBranding(true);
		} finally {
			setIsBrandingLoading(false);
		}
	}, [baseUrl, preferences?.i18n?.language]);
	const refetchBranding = useCallback(async () => {
		setHasFetchedBranding(false);
		await fetchBranding();
	}, [fetchBranding]);
	useEffect(() => {}, [
		preferences?.theme?.inheritFromBranding,
		isInitializedSync,
		baseUrl,
		hasFetchedBranding,
		isBrandingLoading,
		fetchBranding
	]);
	const signInSilently = async (options) => {
		try {
			setIsUpdatingSession(true);
			setIsLoadingSync(true);
			return await client.signInSilently(options);
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Error while signing in silently: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signInSilently-Error", "react", "An error occurred while trying to sign in silently.");
		} finally {
			setIsUpdatingSession(false);
			setIsLoadingSync(client.isLoading());
		}
	};
	const switchOrganization = async (organization) => {
		try {
			setIsUpdatingSession(true);
			setIsLoadingSync(true);
			const response = await client.switchOrganization(organization);
			if (await client.isSignedIn()) await updateSession();
			return response;
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Failed to switch organization: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-switchOrganization-Error", "react", "An error occurred while switching to the specified organization.");
		} finally {
			setIsUpdatingSession(false);
			setIsLoadingSync(client.isLoading());
		}
	};
	const handleProfileUpdate = (payload) => {
		setUser(payload);
		setUserProfile((prev) => ({
			schemas: prev?.schemas ?? [],
			flattenedProfile: generateFlattenedUserProfile(payload, prev?.schemas ?? []),
			profile: payload
		}));
	};
	const getDecodedIdToken = useCallback(async () => client.getDecodedIdToken(), [client]);
	const getIdToken = useCallback(async () => client.getIdToken(), [client]);
	const getAccessToken = useCallback(async () => client.getAccessToken(), [client]);
	const getStorageManager = useCallback(async () => {
		const storageManager = storageManagerRef.current ?? await client.getStorageManager();
		if (storageManager) storageManagerRef.current = storageManager;
		return storageManager;
	}, [client]);
	const request = useCallback(async (...args) => client.request(...args), [client]);
	const requestAll = useCallback(async (...args) => client.requestAll(...args), [client]);
	const exchangeToken = useCallback(async (exchangeConfig) => client.exchangeToken(exchangeConfig), [client]);
	const signOut = useCallback(async (...args) => client.signOut(...args), [client]);
	const recover = useCallback(async (payload) => client.recover(payload), [client]);
	const signUp = useCallback(async (...args) => client.signUp(...args), [client]);
	const clearSession = useCallback(async (...args) => client.clearSession(...args), [client]);
	const reInitialize = useCallback(async (reInitConfig) => client.reInitialize(reInitConfig), [client]);
	const value = useMemo(() => ({
		afterSignInUrl: config.afterSignInUrl,
		applicationId: config.applicationId,
		baseUrl,
		clearSession,
		clientId,
		discovery: { wellKnown },
		exchangeToken,
		getAccessToken,
		getDecodedIdToken,
		getIdToken,
		getStorageManager,
		http: {
			request,
			requestAll
		},
		instanceId,
		isInitialized: isInitializedSync,
		isLoading: isLoadingSync,
		isSignedIn: isSignedInSync,
		organization: currentOrganization,
		organizationChain,
		organizationHandle: config?.organizationHandle,
		platform: Platform.ThunderID,
		reInitialize,
		recover,
		signIn,
		signInOptions,
		signInSilently,
		signInUrl,
		signOut,
		signUp,
		signUpUrl,
		switchOrganization,
		syncSession,
		user
	}), [
		applicationId,
		config?.organizationHandle,
		config.afterSignInUrl,
		signInUrl,
		signUpUrl,
		baseUrl,
		clientId,
		wellKnown,
		isInitializedSync,
		isLoadingSync,
		isSignedInSync,
		currentOrganization,
		signIn,
		signInSilently,
		user,
		client,
		signInOptions,
		syncSession,
		switchOrganization,
		getDecodedIdToken,
		clearSession,
		exchangeToken,
		getAccessToken,
		getStorageManager,
		instanceId,
		organizationChain,
		recover,
		reInitialize,
		request,
		requestAll,
		signOut,
		signUp
	]);
	return /* @__PURE__ */ jsx(ThunderIDContext_default.Provider, {
		value,
		children: /* @__PURE__ */ jsx(I18nProvider_default, {
			preferences: preferences?.i18n,
			children: /* @__PURE__ */ jsx(FlowMetaProvider_default, {
				enabled: preferences?.resolveFromMeta !== false,
				children: /* @__PURE__ */ jsx(BrandingProvider_default, {
					brandingPreference,
					isLoading: isBrandingLoading,
					error: brandingError,
					enabled: preferences?.theme?.inheritFromBranding === true,
					refetch: refetchBranding,
					children: /* @__PURE__ */ jsx(ThemeProvider_default, {
						inheritFromBranding: preferences?.theme?.inheritFromBranding,
						theme: {
							...preferences?.theme?.overrides,
							direction: preferences?.theme?.direction
						},
						mode: getActiveTheme$1(preferences?.theme?.mode ?? "light"),
						children: /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(UserProvider_default, {
							profile: userProfile,
							onUpdateProfile: handleProfileUpdate,
							children: /* @__PURE__ */ jsx(OrganizationProvider_default, {
								getAllOrganizations: async () => client.getAllOrganizations(),
								myOrganizations,
								currentOrganization,
								onOrganizationSwitch: switchOrganization,
								revalidateMyOrganizations: async () => client.getMyOrganizations(),
								children: /* @__PURE__ */ jsx(ComponentRendererProvider_default, {
									renderers: extensions?.components?.renderers ?? {},
									children
								})
							})
						}) })
					})
				})
			})
		})
	});
};
var ThunderIDProvider_default = ThunderIDProvider;

//#endregion
//#region src/contexts/User/useUser.ts
/**
* Hook to access the User context.
*
* This hook provides access to user profile data including:
* - Raw profile API response
* - SCIM2 schemas
* - Nested user object
* - Flattened user profile
* - Functions to refresh and update user data
* - Loading states and error handling
*
* @returns {UserContextProps} The user context value containing all user-related data and functions
* @throws {Error} Throws an error if used outside of UserProvider
*
* @example
* ```tsx
* import {useUser} from '@thunderid/react';
*
* function ProfileComponent() {
*   const {
*     isLoading,
*     profile,
*     schemas,
*     user,
*     flattenedUser,
*     refreshUser,
*     updateUser,
*     error
*   } = useUser();
*
*   if (isLoading) {
*     return <div>Loading user data...</div>;
*   }
*
*   if (error) {
*     return <div>Error: {error.message}</div>;
*   }
*
*   return (
*     <div>
*       <h1>Welcome {user?.name?.givenName}!</h1>
*       <p>Email: {flattenedUser?.emails}</p>
*       <button onClick={refreshUser}>Refresh Profile</button>
*     </div>
*   );
* }
*
* // Access specific user properties
* function UserEmail() {
*   const {flattenedUser} = useUser();
*   return <span>{flattenedUser?.emails?.[0]}</span>;
* }
*
* // Update user profile
* function EditProfile() {
*   const {updateUser, user} = useUser();
*
*   const handleUpdate = async () => {
*     try {
*       await updateUser({
*         name: {
*           givenName: 'John',
*           familyName: 'Doe'
*         }
*       });
*     } catch (error) {
*       console.error('Update failed:', error);
*     }
*   };
*
*   return <button onClick={handleUpdate}>Update Name</button>;
* }
* ```
*/
const useUser = () => {
	const context = useContext(UserContext_default);
	if (!context) throw new Error("useUser must be used within a UserProvider");
	return context;
};
var useUser_default = useUser;

//#endregion
//#region src/contexts/Organization/useOrganization.ts
/**
* Hook to access the Organization context.
*
* This hook provides access to organization data including:
* - List of organizations the user belongs to
* - Current organization
* - Functions to switch organizations and refresh data
* - Function to fetch organizations programmatically
* - Loading states and error handling
*
* @returns {OrganizationContextProps} The organization context value containing all organization-related data and functions
* @throws {Error} Throws an error if used outside of OrganizationProvider
*
* @example
* ```tsx
* import {useOrganization} from '@thunderid/react';
*
* function OrganizationSelector() {
*   const {
*     organizations,
*     currentOrganization,
*     switchOrganization,
*     revalidateMyOrganizations,
*     getOrganizations,
*     isLoading,
*     error
*   } = useOrganization();
*
*   if (isLoading) {
*     return <div>Loading organizations...</div>;
*   }
*
*   if (error) {
*     return <div>Error: {error}</div>;
*   }
*
*   return (
*     <div>
*       <h2>Current: {currentOrganization?.name}</h2>
*       <select
*         value={currentOrganization?.id || ''}
*         onChange={(e) => {
*           const org = organizations?.find(o => o.id === e.target.value);
*           if (org) switchOrganization(org);
*         }}
*       >
*         {organizations?.map(org => (
*           <option key={org.id} value={org.id}>
*             {org.name}
*           </option>
*         ))}
*       </select>
*       <button onClick={revalidateMyOrganizations}>
*         Refresh Organizations
*       </button>
*       <button onClick={async () => {
*         const fresh = await getOrganizations();
*         console.log('Fresh organizations:', fresh);
*       }}>
*         Get Organizations Manually
*       </button>
*     </div>
*   );
* }
*
* // Switch to a specific organization
* function SwitchOrgButton() {
*   const {organizations, switchOrganization} = useOrganization();
*
*   const handleSwitch = (orgId: string) => {
*     const org = organizations?.find(o => o.id === orgId);
*     if (org) {
*       switchOrganization(org);
*     }
*   };
*
*   return (
*     <button onClick={() => handleSwitch('org-123')}>
*       Switch to Organization
*     </button>
*   );
* }
* ```
*/
const useOrganization = () => {
	const context = useContext(OrganizationContext_default$1);
	if (!context) throw new Error("useOrganization must be used within an OrganizationProvider");
	return context;
};
var useOrganization_default = useOrganization;

//#endregion
//#region src/contexts/Flow/useFlow.ts
/**
* Hook to access the flow context.
* Must be used within a FlowProvider.
*
* @example
* ```tsx
* const MyAuthComponent = () => {
*   const { title, setTitle, addMessage, isLoading } = useFlow();
*
*   const handleSuccess = () => {
*     addMessage({
*       type: 'success',
*       message: 'Authentication successful!'
*     });
*   };
*
*   return (
*     <div>
*       <h1>{title}</h1>
*       {isLoading && <p>Loading...</p>}
*     </div>
*   );
* };
* ```
*
* @returns The flow context value
* @throws Error if used outside of FlowProvider
*/
const useFlow = () => {
	const context = useContext(FlowContext_default);
	if (!context) throw new Error("useFlow must be used within a FlowProvider");
	return context;
};
var useFlow_default = useFlow;

//#endregion
//#region src/contexts/Theme/useTheme.ts
const useTheme = () => {
	const context = useContext(ThemeContext_default);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
var useTheme_default = useTheme;

//#endregion
//#region src/contexts/I18n/ComponentPreferencesContext.ts
/**
* Context for component-level preferences overrides.
* Presentational components can provide this context to override the global i18n
* and theme settings for their entire subtree, including all nested components.
*/
const ComponentPreferencesContext = createContext(void 0);
var ComponentPreferencesContext_default = ComponentPreferencesContext;

//#endregion
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
//#region src/hooks/useForm.ts
/**
* Generic form hook that provides comprehensive form state management and validation.
*
* @template T - The type of form values (must extend Record<string, string>)
* @param config - Configuration options for the form
* @returns Form state and methods
*
* @example
* ```tsx
* interface LoginForm {
*   username: string;
*   password: string;
* }
*
* const {
*   values,
*   touched,
*   errors,
*   isValid,
*   setValue,
*   handleSubmit,
*   getFieldProps
* } = useForm<LoginForm>({
*   initialValues: { username: '', password: '' },
*   fields: [
*     { name: 'username', required: true },
*     { name: 'password', required: true }
*   ]
* });
*
* const onSubmit = handleSubmit((values) => {
*   console.log('Form submitted:', values);
* });
*
* return (
*   <form onSubmit={onSubmit}>
*     <input {...getFieldProps('username')} />
*     <input {...getFieldProps('password')} type="password" />
*     <button type="submit" disabled={!isValid}>Submit</button>
*   </form>
* );
* ```
*/
const useForm = (config = {}) => {
	const { initialValues = {}, fields = [], validator, validateOnChange = false, validateOnBlur = true, requiredMessage = "This field is required" } = config;
	const [values, setFormValues] = useState({ ...initialValues });
	const [touched, setFormTouched] = useState({});
	const [errors, setFormErrors] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const getFieldConfig = useCallback((name) => fields.find((field) => field.name === name), [fields]);
	const validateField = useCallback((name) => {
		const value = values[name] || "";
		const fieldConfig = getFieldConfig(name);
		if (fieldConfig?.required && (!value || value.trim() === "")) return requiredMessage;
		if (fieldConfig?.validator) {
			const fieldError = fieldConfig.validator(value);
			if (fieldError) return fieldError;
		}
		return null;
	}, [
		values,
		getFieldConfig,
		requiredMessage
	]);
	const validateForm = useCallback(() => {
		const newErrors = {};
		fields.forEach((field) => {
			const error = validateField(field.name);
			if (error) newErrors[field.name] = error;
		});
		if (validator) {
			const globalErrors = validator(values);
			Object.keys(globalErrors).forEach((key) => {
				if (globalErrors[key]) newErrors[key] = globalErrors[key];
			});
		}
		return {
			errors: newErrors,
			isValid: Object.keys(newErrors).length === 0
		};
	}, [
		fields,
		validateField,
		validator,
		values
	]);
	const isValid = Object.keys(errors).length === 0;
	const setValue = useCallback((name, value) => {
		setFormValues((prev) => ({
			...prev,
			[name]: value
		}));
		if (validateOnChange) {
			const error = validateField(name);
			setFormErrors((prev) => {
				const newErrors = { ...prev };
				if (error) newErrors[name] = error;
				else delete newErrors[name];
				return newErrors;
			});
		}
	}, [validateField, validateOnChange]);
	const setValues = useCallback((newValues) => {
		setFormValues((prev) => ({
			...prev,
			...newValues
		}));
	}, []);
	const setTouched = useCallback((name, isTouched = true) => {
		setFormTouched((prev) => ({
			...prev,
			[name]: isTouched
		}));
		if (validateOnBlur && isTouched) {
			const error = validateField(name);
			setFormErrors((prev) => {
				const newErrors = { ...prev };
				if (error) newErrors[name] = error;
				else delete newErrors[name];
				return newErrors;
			});
		}
	}, [validateField, validateOnBlur]);
	const setTouchedFields = useCallback((touchedFields) => {
		setFormTouched((prev) => ({
			...prev,
			...touchedFields
		}));
	}, []);
	const touchAllFields = useCallback(() => {
		setFormTouched(fields.reduce((acc, field) => {
			acc[field.name] = true;
			return acc;
		}, {}));
		setFormErrors(validateForm().errors);
	}, [fields, validateForm]);
	const setError = useCallback((name, error) => {
		setFormErrors((prev) => ({
			...prev,
			[name]: error
		}));
	}, []);
	const setErrors = useCallback((newErrors) => {
		setFormErrors((prev) => ({
			...prev,
			...newErrors
		}));
	}, []);
	const clearErrors = useCallback(() => {
		setFormErrors({});
	}, []);
	const reset = useCallback(() => {
		setFormValues({ ...initialValues });
		setFormTouched({});
		setFormErrors({});
		setIsSubmitted(false);
	}, [initialValues]);
	const handleSubmit = useCallback((onSubmit) => async (e) => {
		if (e) e.preventDefault();
		setIsSubmitted(true);
		touchAllFields();
		if (validateForm().isValid) await onSubmit(values);
	}, [
		values,
		touchAllFields,
		validateForm
	]);
	return {
		clearErrors,
		errors,
		getFieldProps: useCallback((name) => {
			const fieldConfig = getFieldConfig(name);
			return {
				error: touched[name] ? errors[name] : void 0,
				name,
				onBlur: () => setTouched(name, true),
				onChange: (value) => setValue(name, value),
				required: fieldConfig?.required || false,
				touched: touched[name] || false,
				value: values[name] || ""
			};
		}, [
			values,
			errors,
			touched,
			setValue,
			setTouched,
			getFieldConfig
		]),
		handleSubmit,
		isSubmitted,
		isValid,
		reset,
		setError,
		setErrors,
		setTouched,
		setTouchedFields,
		setValue,
		setValues,
		touchAllFields,
		touched,
		validateField,
		validateForm,
		values
	};
};
var useForm_default = useForm;

//#endregion
//#region src/hooks/useBranding.ts
const logger$7 = createPackageComponentLogger("@thunderid/react", "useBranding");
/**
* React hook for accessing branding preferences from the BrandingProvider context.
* This hook provides access to branding preferences, theme data, and loading states.
*
* @deprecated Consider using useBrandingContext directly for better performance.
* This hook is maintained for backward compatibility.
*
* @param config - Configuration options (deprecated, use BrandingProvider props instead)
* @returns Object containing branding preference data, theme, loading state, error, and refetch function
*
* @example
* Basic usage:
* ```tsx
* function MyComponent() {
*   const { theme, activeTheme, isLoading, error } = useBranding();
*
*   if (isLoading) return <div>Loading branding...</div>;
*   if (error) return <div>Error: {error.message}</div>;
*
*   return (
*     <div style={{ color: theme?.colors?.primary?.main }}>
*       <p>Active theme mode: {activeTheme}</p>
*       <p>Styled with ThunderID branding</p>
*     </div>
*   );
* }
* ```
*
* @example
* For new implementations, use BrandingProvider with useBrandingContext:
* ```tsx
* // In your root component
* <BrandingProvider baseUrl="https://localhost:8090">
*   <App />
* </BrandingProvider>
*
* // In your component
* function MyComponent() {
*   const { theme, activeTheme, isLoading, error } = useBrandingContext();
*   // ... rest of your component
* }
* ```
*/
const useBranding = () => {
	try {
		return useBrandingContext_default();
	} catch (error) {
		logger$7.warn("useBranding: BrandingProvider not available. Make sure to wrap your app with BrandingProvider or ThunderIDProvider with branding preferences.");
		return {
			activeTheme: null,
			brandingPreference: null,
			error: /* @__PURE__ */ new Error("BrandingProvider not available"),
			fetchBranding: async () => {},
			isLoading: false,
			refetch: async () => {},
			theme: null
		};
	}
};
var useBranding_default = useBranding;

//#endregion
//#region src/components/primitives/Button/Button.styles.ts
/**
* Creates styles for the Button component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param color - The button color
* @param variant - The button variant
* @param size - The button size
* @param fullWidth - Whether the button should take full width
* @param disabled - Whether the button is disabled
* @param loading - Whether the button is in loading state
* @returns Object containing CSS class names for component styling
*/
const useStyles$34 = (theme, colorScheme, color, variant, size, fullWidth, disabled, loading, shape = "square") => useMemo(() => {
	const iconSizeMap = {
		large: `calc(${theme.vars.spacing.unit} * 5)`,
		medium: `calc(${theme.vars.spacing.unit} * 4)`,
		small: `calc(${theme.vars.spacing.unit} * 3)`
	};
	const iconDimension = iconSizeMap[size] || iconSizeMap["medium"];
	const baseButton = css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: calc(${theme.vars.spacing.unit} * 1);
      border-radius: ${shape === "round" ? "50%" : theme.vars.components?.Button?.root?.borderRadius || theme.vars.borderRadius.medium};
      font-weight: 500;
      cursor: ${disabled || loading ? "not-allowed" : "pointer"};
      outline: none;
      text-decoration: none;
      white-space: nowrap;
      width: ${fullWidth ? "100%" : "auto"};
      opacity: ${disabled || loading ? .6 : 1};
      font-family: ${theme.vars.typography.fontFamily};
      border-width: 1px;
      border-style: solid;
      ${variant === "icon" ? `
        padding: 0;
        min-width: unset;
        min-height: unset;
        width: ${iconDimension};
        height: ${iconDimension};
        justify-content: center;
        align-items: center;
      ` : ""}
    `;
	const sizeStyles = {
		large: css`
        ${variant === "icon" ? `font-size: ${theme.vars.typography.fontSizes.lg};` : `padding: calc(${theme.vars.spacing.unit} * 1.5) calc(${theme.vars.spacing.unit} * 3);
             font-size: ${theme.vars.typography.fontSizes.lg};
             min-height: calc(${theme.vars.spacing.unit} * 5);`}
      `,
		medium: css`
        ${variant === "icon" ? `font-size: ${theme.vars.typography.fontSizes.md};` : `padding: calc(${theme.vars.spacing.unit} * 1) calc(${theme.vars.spacing.unit} * 2);
             font-size: ${theme.vars.typography.fontSizes.md};
             min-height: calc(${theme.vars.spacing.unit} * 4);`}
      `,
		small: css`
        ${variant === "icon" ? `font-size: ${theme.vars.typography.fontSizes.sm};` : `padding: calc(${theme.vars.spacing.unit} * 0.5) calc(${theme.vars.spacing.unit} * 1);
             font-size: ${theme.vars.typography.fontSizes.sm};
             min-height: calc(${theme.vars.spacing.unit} * 3);`}
      `
	};
	const variantStyles = {
		"primary-icon": css`
        background-color: transparent;
        color: ${theme.vars.colors.primary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
          color: ${theme.vars.colors.primary.dark};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
          color: ${theme.vars.colors.primary.dark};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          color: ${theme.vars.colors.primary.dark};
          outline: none;
        }
      `,
		"primary-outline": css`
        background-color: transparent;
        color: ${theme.vars.colors.primary.main};
        border-color: ${theme.vars.colors.primary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          color: ${theme.vars.colors.primary.contrastText};
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          color: ${theme.vars.colors.primary.contrastText};
          opacity: 0.9;
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          color: ${theme.vars.colors.primary.contrastText};
          opacity: 0.9;
        }
      `,
		"primary-solid": css`
        background-color: ${theme.vars.colors.primary.main};
        color: ${theme.vars.colors.primary.contrastText};
        border-color: ${theme.vars.colors.primary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          opacity: 0.9;
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          opacity: 0.8;
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          opacity: 0.8;
        }
      `,
		"primary-text": css`
        background-color: transparent;
        color: ${theme.vars.colors.primary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          outline: none;
        }
      `,
		"secondary-icon": css`
        background-color: transparent;
        color: ${theme.vars.colors.secondary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
          color: ${theme.vars.colors.secondary.dark};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
          color: ${theme.vars.colors.secondary.dark};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          color: ${theme.vars.colors.secondary.dark};
          outline: none;
        }
      `,
		"secondary-outline": css`
        background-color: transparent;
        color: ${theme.vars.colors.secondary.main};
        border-color: ${theme.vars.colors.secondary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          color: ${theme.vars.colors.secondary.contrastText};
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          color: ${theme.vars.colors.secondary.contrastText};
          opacity: 0.9;
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          color: ${theme.vars.colors.secondary.contrastText};
          opacity: 0.9;
        }
      `,
		"secondary-solid": css`
        background-color: ${theme.vars.colors.secondary.main};
        color: ${theme.vars.colors.secondary.contrastText};
        border-color: ${theme.vars.colors.secondary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          opacity: 0.9;
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          opacity: 0.8;
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          opacity: 0.8;
        }
      `,
		"secondary-text": css`
        background-color: transparent;
        color: ${theme.vars.colors.secondary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          outline: none;
        }
      `,
		"tertiary-icon": css`
        background-color: transparent;
        color: ${theme.vars.colors.text.secondary};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
          color: ${theme.vars.colors.text.primary};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
          color: ${theme.vars.colors.text.primary};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          color: ${theme.vars.colors.text.primary};
          outline: none;
        }
      `,
		"tertiary-outline": css`
        background-color: transparent;
        color: ${theme.vars.colors.text.secondary};
        border-color: ${theme.vars.colors.border};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.action.hover};
          border-color: ${theme.vars.colors.text.secondary};
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.action.selected};
          border-color: ${theme.vars.colors.text.primary};
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.action.focus};
          border-color: ${theme.vars.colors.text.primary};
        }
      `,
		"tertiary-solid": css`
        background-color: ${theme.vars.colors.text.secondary};
        color: ${theme.vars.colors.background.surface};
        border-color: ${theme.vars.colors.text.secondary};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.text.primary};
          color: ${theme.vars.colors.background.surface};
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.text.primary};
          color: ${theme.vars.colors.background.surface};
          opacity: 0.9;
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.text.primary};
          color: ${theme.vars.colors.background.surface};
          opacity: 0.9;
        }
      `,
		"tertiary-text": css`
        background-color: transparent;
        color: ${theme.vars.colors.text.secondary};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
          color: ${theme.vars.colors.text.primary};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
          color: ${theme.vars.colors.text.primary};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          color: ${theme.vars.colors.text.primary};
          outline: none;
        }
      `
	};
	const spinnerStyles = css`
      display: flex;
      align-items: center;
      justify-content: center;
    `;
	const iconStyles = css`
      display: flex;
      align-items: center;
      justify-content: center;
    `;
	return {
		button: baseButton,
		content: css`
      display: flex;
      align-items: center;
      justify-content: center;
    `,
		endIcon: iconStyles,
		fullWidth: fullWidth ? css`
            width: 100%;
          ` : null,
		icon: iconStyles,
		loading: loading ? css`
            pointer-events: none;
          ` : null,
		shape: shape === "round" ? css`
              border-radius: 50%;
            ` : null,
		size: sizeStyles[size],
		spinner: spinnerStyles,
		startIcon: iconStyles,
		variant: variantStyles[`${color}-${variant}`] || variantStyles["primary-solid"]
	};
}, [
	theme,
	colorScheme,
	color,
	variant,
	size,
	fullWidth,
	disabled,
	loading
]);
var Button_styles_default = useStyles$34;

//#endregion
//#region src/components/primitives/Spinner/Spinner.styles.ts
/**
* Creates styles for the Spinner component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param size - The size of the spinner
* @param color - The color of the spinner
* @returns Object containing CSS class names for component styling
*/
const useStyles$33 = (theme, colorScheme, size, color) => useMemo(() => {
	const spinnerColor = color || theme.vars.colors.primary.main;
	const spinnerSizes = {
		large: "32px",
		medium: "20px",
		small: "16px"
	};
	const spinnerSize = spinnerSizes[size];
	const spinner = css`
      width: ${spinnerSize};
      height: ${spinnerSize};
      border: 2px solid transparent;
      border-top: 2px solid ${spinnerColor};
      border-radius: 50%;
      animation: ${keyframes`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `} 1s linear infinite;
      display: inline-block;
    `;
	const spinnerSmall = css`
      width: ${spinnerSizes["small"]};
      height: ${spinnerSizes["small"]};
    `;
	const spinnerMedium = css`
      width: ${spinnerSizes["medium"]};
      height: ${spinnerSizes["medium"]};
    `;
	return {
		spinner,
		spinnerLarge: css`
      width: ${spinnerSizes["large"]};
      height: ${spinnerSizes["large"]};
    `,
		spinnerMedium,
		spinnerSmall
	};
}, [
	theme,
	colorScheme,
	size,
	color
]);
var Spinner_styles_default = useStyles$33;

//#endregion
//#region src/components/primitives/Spinner/Spinner.tsx
/**
* Spinner component for loading states
*
* @example
* ```tsx
* // Basic spinner
* <Spinner />
*
* // Large spinner with custom color
* <Spinner size="large" color="#3b82f6" />
*
* // Small spinner
* <Spinner size="small" />
* ```
*/
const Spinner = ({ size = "medium", color, className, style }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Spinner_styles_default(theme, colorScheme, size, color);
	return /* @__PURE__ */ jsx("span", {
		className: cx(withVendorCSSClassPrefix(bem("spinner")), styles["spinner"], size === "small" && styles["spinnerSmall"], size === "medium" && styles["spinnerMedium"], size === "large" && styles["spinnerLarge"], className),
		style,
		role: "status",
		"aria-label": "Loading"
	});
};
var Spinner_default = Spinner;

//#endregion
//#region src/components/primitives/Button/Button.tsx
const getSpinnerWidth = (sizeVal, spacingUnit) => {
	if (sizeVal === "small") return `calc(${spacingUnit} * 1.5)`;
	if (sizeVal === "medium") return `calc(${spacingUnit} * 2)`;
	return `calc(${spacingUnit} * 2.5)`;
};
/**
* Button component with multiple variants and types.
*
* @example
* ```tsx
* // Primary solid button
* <Button color="primary" variant="solid">
*   Click me
* </Button>
*
* // Secondary outline button
* <Button color="secondary" variant="outline" size="large">
*   Cancel
* </Button>
*
* // Text button with loading state
* <Button color="tertiary" variant="text" loading>
*   Loading...
* </Button>
*
* // Button with icons
* <Button
*   color="primary"
*   startIcon={<Icon />}
*   endIcon={<Arrow />}
* >
*   Save and Continue
* </Button>
* ```
*/
const Button = forwardRef(({ color = "primary", variant = "solid", size = "medium", fullWidth = false, loading = false, startIcon, endIcon, children, className, disabled, style, shape = "square",...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Button_styles_default(theme, colorScheme, color, variant, size, fullWidth, disabled || false, loading, shape);
	const isIconVariant = variant === "icon";
	const spinnerWidth = getSpinnerWidth(size, theme.vars.spacing.unit);
	return /* @__PURE__ */ jsxs("button", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("button")), withVendorCSSClassPrefix(bem("button", variant)), withVendorCSSClassPrefix(bem("button", color)), withVendorCSSClassPrefix(bem("button", size)), withVendorCSSClassPrefix(bem("button", shape)), fullWidth ? withVendorCSSClassPrefix(bem("button", "fullWidth")) : void 0, loading ? withVendorCSSClassPrefix(bem("button", "loading")) : void 0, disabled || loading ? withVendorCSSClassPrefix(bem("button", "disabled")) : void 0, styles["button"], styles["size"], styles["variant"], styles["fullWidth"], styles["loading"], styles["shape"], className),
		disabled: disabled || loading,
		...rest,
		children: [
			loading && /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("button", "spinner")), styles["spinner"]),
				children: /* @__PURE__ */ jsx(Spinner_default, {
					size,
					color: "currentColor",
					style: {
						height: spinnerWidth,
						width: spinnerWidth
					}
				})
			}),
			!loading && isIconVariant && /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("button", "icon")), styles["icon"]),
				children: children || startIcon || endIcon
			}),
			!loading && !isIconVariant && startIcon && /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("button", "start-icon")), styles["startIcon"]),
				children: startIcon
			}),
			!isIconVariant && children && /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("button", "content")), styles["content"]),
				children
			}),
			!loading && !isIconVariant && endIcon && /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("button", "end-icon")), styles["endIcon"]),
				children: endIcon
			})
		]
	});
});
Button.displayName = "Button";
var Button_default = Button;

//#endregion
//#region src/components/actions/SignInButton/BaseSignInButton.tsx
/**
* Base SignInButton component that supports both render props and traditional props patterns.
*
* @example Using render props
* ```tsx
* <BaseSignInButton>
*   {({signIn, isLoading}) => (
*     <button onClick={signIn} disabled={isLoading}>
*       {isLoading ? 'Signing in...' : 'Sign In'}
*     </button>
*   )}
* </BaseSignInButton>
* ```
*
* @example Using traditional props
* ```tsx
* <BaseSignInButton className="custom-button">Sign In</BaseSignInButton>
* ```
*/
const BaseSignInButton = forwardRef(({ children, className, style, signIn, isLoading, meta, preferences,...rest }, ref) => {
	if (typeof children === "function") return /* @__PURE__ */ jsx(Fragment, { children: children({
		isLoading,
		meta,
		signIn
	}) });
	return /* @__PURE__ */ jsx(Button_default, {
		ref,
		className: cx(withVendorCSSClassPrefix("sign-in-button"), className),
		style,
		disabled: isLoading,
		loading: isLoading,
		type: "button",
		...rest,
		children
	});
});
BaseSignInButton.displayName = "BaseSignInButton";
var BaseSignInButton_default = BaseSignInButton;

//#endregion
//#region src/components/actions/SignInButton/SignInButton.tsx
/**
* SignInButton component that supports both render props and traditional props patterns.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example Using render props
* ```tsx
* <SignInButton>
*   {({signIn, isLoading}) => (
*     <button onClick={signIn} disabled={isLoading}>
*       {isLoading ? 'Signing in...' : 'Sign In'}
*     </button>
*   )}
* </SignInButton>
* ```
*
* @example Using traditional props
* ```tsx
* <SignInButton className="custom-button">Sign In</SignInButton>
* ```
*
* @example Using component-level preferences
* ```tsx
* <SignInButton
*   preferences={{
*     i18n: {
*       bundles: {
*         'en-US': {
*           translations: {
*             'buttons.signIn': 'Custom Sign In Text'
*           }
*         }
*       }
*     }
*   }}
* >
*   Custom Sign In
* </SignInButton>
* ```
*/
const SignInButton = forwardRef(({ children, onClick, preferences, signInOptions: overriddenSignInOptions = {},...rest }, ref) => {
	const { signIn, signInUrl, signInOptions, meta } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [isLoading, setIsLoading] = useState(false);
	const handleSignIn = async (e) => {
		try {
			setIsLoading(true);
			if (signInUrl) navigate$1(signInUrl);
			else await signIn(overriddenSignInOptions ?? signInOptions);
			if (onClick) onClick(e);
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "SignInButton-handleSignIn-RuntimeError-001", "react", "Something went wrong while trying to sign in. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsx(BaseSignInButton_default, {
		ref,
		onClick: handleSignIn,
		isLoading,
		meta,
		signIn: handleSignIn,
		preferences,
		...rest,
		children: children ?? t("elements.buttons.signin.text")
	});
});
SignInButton.displayName = "SignInButton";
var SignInButton_default = SignInButton;

//#endregion
//#region src/components/actions/SignOutButton/BaseSignOutButton.tsx
/**
* Base SignOutButton component that supports both render props and traditional props patterns.
*
* @example Using render props
* ```tsx
* <BaseSignOutButton>
*   {({signOut, isLoading}) => (
*     <button onClick={signOut} disabled={isLoading}>
*       {isLoading ? 'Signing out...' : 'Sign Out'}
*     </button>
*   )}
* </BaseSignOutButton>
* ```
*
* @example Using traditional props
* ```tsx
* <BaseSignOutButton className="custom-button">Sign Out</BaseSignOutButton>
* ```
*/
const BaseSignOutButton = forwardRef(({ children, className, style, signOut, isLoading, meta, preferences,...rest }, ref) => {
	if (typeof children === "function") return /* @__PURE__ */ jsx(Fragment, { children: children({
		isLoading,
		meta,
		signOut
	}) });
	return /* @__PURE__ */ jsx(Button_default, {
		ref,
		className: cx(withVendorCSSClassPrefix("sign-out-button"), className),
		style,
		disabled: isLoading,
		loading: isLoading,
		type: "button",
		...rest,
		children
	});
});
BaseSignOutButton.displayName = "BaseSignOutButton";
var BaseSignOutButton_default = BaseSignOutButton;

//#endregion
//#region src/components/actions/SignOutButton/SignOutButton.tsx
/**
* SignOutButton component that supports both render props and traditional props patterns.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example Using render props pattern
* ```tsx
* <SignOutButton>
*   {({signOut, isLoading}) => (
*     <button onClick={signOut} disabled={isLoading}>
*       {isLoading ? 'Signing out...' : 'Sign Out'}
*     </button>
*   )}
* </SignOutButton>
* ```
*
* @example Using traditional props pattern
* ```tsx
* <SignOutButton className="custom-button">Sign Out</SignOutButton>
* ```
*
* @example Using component-level preferences
* ```tsx
* <SignOutButton
*   preferences={{
*     i18n: {
*       bundles: {
*         'en-US': {
*           translations: {
*             'buttons.signOut': 'Custom Sign Out Text'
*           }
*         }
*       }
*     }
*   }}
* >
*   Custom Sign Out
* </SignOutButton>
* ```
*/
const SignOutButton = forwardRef(({ children, onClick, preferences,...rest }, ref) => {
	const { signOut, meta } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [isLoading, setIsLoading] = useState(false);
	const handleSignOut = async (e) => {
		try {
			setIsLoading(true);
			await signOut();
			if (onClick) onClick(e);
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Sign out failed: ${error instanceof Error ? error.message : String(error)}`, "SignOutButton-handleSignOut-RuntimeError-001", "react", "Something went wrong while trying to sign out. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsx(BaseSignOutButton_default, {
		ref,
		onClick: handleSignOut,
		isLoading,
		meta,
		signOut: handleSignOut,
		preferences,
		...rest,
		children: children ?? t("elements.buttons.signout.text")
	});
});
SignOutButton.displayName = "SignOutButton";
var SignOutButton_default = SignOutButton;

//#endregion
//#region src/components/actions/SignUpButton/BaseSignUpButton.tsx
/**
* Base SignUpButton component that supports both render props and traditional props patterns.
*
* @example Using render props
* ```tsx
* <BaseSignUpButton>
*   {({ signUp, isLoading }) => (
*     <button onClick={signUp} disabled={isLoading}>
*       {isLoading ? 'Creating account...' : 'Create Account'}
*     </button>
*   )}
* </BaseSignUpButton>
* ```
*
* @example Using traditional props
* ```tsx
* <BaseSignUpButton className="custom-button">Create Account</BaseSignUpButton>
* ```
*/
const BaseSignUpButton = forwardRef(({ children, className, style, signUp, isLoading, meta, preferences,...rest }, ref) => {
	if (typeof children === "function") return /* @__PURE__ */ jsx(Fragment, { children: children({
		isLoading,
		meta,
		signUp
	}) });
	return /* @__PURE__ */ jsx(Button_default, {
		ref,
		className: cx(withVendorCSSClassPrefix("sign-up-button"), className),
		style,
		disabled: isLoading,
		loading: isLoading,
		type: "button",
		color: "primary",
		variant: "solid",
		...rest,
		children
	});
});
BaseSignUpButton.displayName = "BaseSignUpButton";
var BaseSignUpButton_default = BaseSignUpButton;

//#endregion
//#region src/components/actions/SignUpButton/SignUpButton.tsx
/**
* SignUpButton component that supports both render props and traditional props patterns.
* It redirects the user to the ThunderID sign-up page configured for the application.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example Using render props pattern
* ```tsx
* <SignUpButton>
*   {({ signUp, isLoading }) => (
*     <button onClick={signUp} disabled={isLoading}>
*       {isLoading ? 'Creating Account...' : 'Create Account'}
*     </button>
*   )}
* </SignUpButton>
* ```
*
* @example Using traditional props pattern
* ```tsx
* <SignUpButton className="custom-button">Create Account</SignUpButton>
* ```
*
* @example Using component-level preferences
* ```tsx
* <SignUpButton
*   preferences={{
*     i18n: {
*       bundles: {
*         'en-US': {
*           translations: {
*             'buttons.signUp': 'Custom Sign Up Text'
*           }
*         }
*       }
*     }
*   }}
* >
*   Custom Sign Up
* </SignUpButton>
* ```
*/
const SignUpButton = forwardRef(({ children, onClick, preferences,...rest }, ref) => {
	const { signUp, signUpUrl, meta } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [isLoading, setIsLoading] = useState(false);
	const handleSignUp = async (e) => {
		try {
			setIsLoading(true);
			if (signUpUrl) navigate$1(signUpUrl);
			else await signUp();
			if (onClick) onClick(e);
		} catch (error) {
			throw new ThunderIDRuntimeError$1(`Sign up failed: ${error instanceof Error ? error.message : String(error)}`, "SignUpButton-handleSignUp-RuntimeError-001", "react", "Something went wrong while trying to sign up. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsx(BaseSignUpButton_default, {
		ref,
		onClick: handleSignUp,
		isLoading,
		meta,
		signUp: handleSignUp,
		preferences,
		...rest,
		children: children ?? t("elements.buttons.signup.text")
	});
});
SignUpButton.displayName = "SignUpButton";
var SignUpButton_default = SignUpButton;

//#endregion
//#region src/components/control/SignedIn.tsx
/**
* A component that only renders its children when the user is signed in.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { SignedIn } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <SignedIn fallback={<p>Please sign in to continue</p>}>
*       <p>Welcome! You are signed in.</p>
*     </SignedIn>
*   );
* }
* ```
*/
const SignedIn = ({ children, fallback = null }) => {
	const { isSignedIn } = useThunderID_default();
	if (!isSignedIn) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
	return /* @__PURE__ */ jsx(Fragment, { children });
};
SignedIn.displayName = "SignedIn";
var SignedIn_default = SignedIn;

//#endregion
//#region src/components/control/SignedOut.tsx
/**
* A component that only renders its children when the user is signed out.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { SignedOut } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <SignedOut fallback={<p>You are already signed in</p>}>
*       <p>Please sign in to continue</p>
*     </SignedOut>
*   );
* }
* ```
*/
const SignedOut = ({ children, fallback = null }) => {
	const { isSignedIn } = useThunderID_default();
	if (!isSignedIn) return /* @__PURE__ */ jsx(Fragment, { children });
	return /* @__PURE__ */ jsx(Fragment, { children: fallback });
};
SignedOut.displayName = "SignedOut";
var SignedOut_default = SignedOut;

//#endregion
//#region src/components/control/Loading.tsx
/**
* A component that only renders its children when the ThunderID is loading.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { Loading } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <Loading fallback={<p>Finished Loading...</p>}>
*       <p>Loading...</p>
*     </Loading>
*   );
* }
* ```
*/
const Loading = ({ children, fallback = null }) => {
	const { isLoading } = useThunderID_default();
	if (!isLoading) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
	return /* @__PURE__ */ jsx(Fragment, { children });
};
Loading.displayName = "Loading";
var Loading_default = Loading;

//#endregion
//#region src/components/control/OrganizationContext/OrganizationContextController.tsx
const OrganizationContextController = ({ targetOrganizationId, isSourceSignedIn, children }) => {
	const { isInitialized, isSignedIn, switchOrganization, isLoading } = useThunderID_default();
	const hasAuthenticatedRef = useRef(false);
	const isAuthenticatingRef = useRef(false);
	/**
	* Handle the organization switch when:
	* - Current instance is initialized and NOT signed in
	* - Source provider IS signed in
	* Uses the `switchOrganization` function from the ThunderID context.
	*/
	useEffect(() => {
		const performOrganizationSwitch = async () => {
			if (hasAuthenticatedRef.current || isAuthenticatingRef.current) return;
			if (!isInitialized || isLoading) return;
			if (isSignedIn) {
				hasAuthenticatedRef.current = true;
				return;
			}
			if (!isSourceSignedIn) return;
			try {
				isAuthenticatingRef.current = true;
				hasAuthenticatedRef.current = true;
				await switchOrganization({
					id: targetOrganizationId,
					name: "",
					orgHandle: ""
				});
			} catch (error) {
				console.error("Linked organization authentication failed:", error);
				hasAuthenticatedRef.current = false;
			} finally {
				isAuthenticatingRef.current = false;
			}
		};
		performOrganizationSwitch();
	}, [
		isInitialized,
		isSignedIn,
		isLoading,
		isSourceSignedIn,
		targetOrganizationId,
		switchOrganization
	]);
	return /* @__PURE__ */ jsx(Fragment, { children });
};
var OrganizationContextController_default = OrganizationContextController;

//#endregion
//#region src/components/control/OrganizationContext/OrganizationContext.tsx
const OrganizationContext = ({ instanceId, baseUrl, clientId, afterSignInUrl, afterSignOutUrl, targetOrganizationId, sourceInstanceId, scopes, children,...rest }) => {
	const { isSignedIn: isSourceSignedIn, instanceId: sourceInstanceIdFromContext, baseUrl: sourceBaseUrl, clientId: sourceClientId } = useThunderID_default();
	return /* @__PURE__ */ jsx(ThunderIDProvider_default, {
		instanceId,
		baseUrl: baseUrl || sourceBaseUrl,
		clientId: clientId || sourceClientId,
		afterSignInUrl,
		afterSignOutUrl,
		scopes,
		organizationChain: {
			sourceInstanceId: sourceInstanceId || sourceInstanceIdFromContext,
			targetOrganizationId
		},
		...rest,
		children: /* @__PURE__ */ jsx(OrganizationContextController_default, {
			targetOrganizationId,
			isSourceSignedIn,
			children
		})
	});
};
var OrganizationContext_default = OrganizationContext;

//#endregion
//#region src/components/primitives/Checkbox/Checkbox.styles.ts
/**
* Creates styles for the Checkbox component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param hasError - Whether the checkbox has an error state
* @param required - Whether the checkbox is required
* @returns Object containing CSS class names for component styling
*/
const useStyles$32 = (theme, colorScheme, hasError, required) => useMemo(() => {
	const containerStyles = css`
      display: flex;
      align-items: center;
    `;
	const inputStyles = css`
      width: calc(${theme.vars.spacing.unit} * 2.5);
      height: calc(${theme.vars.spacing.unit} * 2.5);
      margin-inline-end: ${theme.vars.spacing.unit};
      accent-color: ${theme.vars.colors.primary.main};
      cursor: pointer;

      &:focus {
        outline: 2px solid ${theme.vars.colors.primary.main};
        outline-offset: 2px;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    `;
	const errorInputStyles = css`
      accent-color: ${theme.vars.colors.error.main};

      &:focus {
        outline-color: ${theme.vars.colors.error.main};
      }
    `;
	const labelStyles = css`
      color: ${theme.vars.colors.text.primary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-family: ${theme.vars.typography.fontFamily};
      cursor: pointer;

      &:hover {
        color: ${theme.vars.colors.text.primary};
      }
    `;
	const errorLabelStyles = css`
      color: ${theme.vars.colors.error.main};
    `;
	const requiredStyles = css`
      /* Required indicator styles will be handled by InputLabel */
    `;
	return {
		container: containerStyles,
		errorInput: hasError ? errorInputStyles : "",
		errorLabel: hasError ? errorLabelStyles : "",
		input: inputStyles,
		label: labelStyles,
		required: required ? requiredStyles : ""
	};
}, [
	theme,
	colorScheme,
	hasError,
	required
]);
var Checkbox_styles_default = useStyles$32;

//#endregion
//#region src/components/primitives/FormControl/FormControl.styles.ts
/**
* Creates styles for the FormControl component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param helperTextAlign - The alignment for helper text
* @param helperTextMarginLeft - Custom margin left for helper text
* @param hasError - Whether the form control has an error
* @returns Object containing CSS class names for component styling
*/
const useStyles$31 = (theme, colorScheme, helperTextAlign, helperTextMarginLeft, hasError) => useMemo(() => {
	return {
		formControl: css`
      text-align: start;
      font-family: ${theme.vars.typography.fontFamily};
    `,
		helperText: css`
      margin-top: calc(${theme.vars.spacing.unit} / 2);
      text-align: ${helperTextAlign === "left" ? "start" : helperTextAlign};
      ${helperTextMarginLeft && `margin-inline-start: ${helperTextMarginLeft};`}
    `,
		helperTextError: css`
      color: ${theme.vars.colors.error.main};
    `
	};
}, [
	theme,
	colorScheme,
	helperTextAlign,
	helperTextMarginLeft,
	hasError
]);
var FormControl_styles_default = useStyles$31;

//#endregion
//#region src/components/primitives/Typography/Typography.styles.ts
/**
* Creates styles for the Typography component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param variant - The typography variant
* @param align - Text alignment
* @param color - Color variant
* @param noWrap - Whether text should be truncated with ellipsis
* @param inline - Whether text should be displayed inline
* @param gutterBottom - Whether to add bottom margin
* @param fontWeight - Custom font weight
* @param fontSize - Custom font size
* @param lineHeight - Custom line height
* @returns Object containing CSS class names for component styling
*/
const useStyles$30 = (theme, colorScheme, variant, align, color, noWrap, inline, gutterBottom, fontWeight, fontSize, lineHeight) => useMemo(() => {
	const getColorValue = (colorVariant) => {
		switch (colorVariant) {
			case "primary": return theme.colors.primary.main;
			case "secondary": return theme.colors.secondary.main;
			case "error": return theme.colors.error.main;
			case "textPrimary": return theme.colors.text.primary;
			case "textSecondary": return theme.colors.text.secondary;
			case "inherit": return "inherit";
			default: return theme.colors.text.primary;
		}
	};
	const getVariantStyles = (variantName) => {
		switch (variantName) {
			case "h1": return {
				fontSize: theme.vars.typography.fontSizes["3xl"],
				fontWeight: 600,
				letterSpacing: "-0.00735em",
				lineHeight: 1.235
			};
			case "h2": return {
				fontSize: theme.vars.typography.fontSizes["2xl"],
				fontWeight: 600,
				letterSpacing: "0em",
				lineHeight: 1.334
			};
			case "h3": return {
				fontSize: theme.vars.typography.fontSizes.xl,
				fontWeight: 600,
				letterSpacing: "0.0075em",
				lineHeight: 1.6
			};
			case "h4": return {
				fontSize: theme.vars.typography.fontSizes.lg,
				fontWeight: 600,
				letterSpacing: "0.00938em",
				lineHeight: 1.5
			};
			case "h5": return {
				fontSize: theme.vars.typography.fontSizes.md,
				fontWeight: 600,
				letterSpacing: "0em",
				lineHeight: 1.334
			};
			case "h6": return {
				fontSize: theme.vars.typography.fontSizes.sm,
				fontWeight: 500,
				letterSpacing: "0.0075em",
				lineHeight: 1.6
			};
			case "subtitle1": return {
				fontSize: theme.vars.typography.fontSizes.md,
				fontWeight: 400,
				letterSpacing: "0.00938em",
				lineHeight: 1.75
			};
			case "subtitle2": return {
				fontSize: theme.vars.typography.fontSizes.sm,
				fontWeight: 500,
				letterSpacing: "0.00714em",
				lineHeight: 1.57
			};
			case "body1": return {
				fontSize: theme.vars.typography.fontSizes.md,
				fontWeight: 400,
				letterSpacing: "0.00938em",
				lineHeight: 1.5
			};
			case "body2": return {
				fontSize: theme.vars.typography.fontSizes.sm,
				fontWeight: 400,
				letterSpacing: "0.01071em",
				lineHeight: 1.43
			};
			case "caption": return {
				fontSize: theme.vars.typography.fontSizes.xs,
				fontWeight: 400,
				letterSpacing: "0.03333em",
				lineHeight: 1.66
			};
			case "overline": return {
				fontSize: theme.vars.typography.fontSizes.xs,
				fontWeight: 400,
				letterSpacing: "0.08333em",
				lineHeight: 2.66,
				textTransform: "uppercase"
			};
			case "button": return {
				fontSize: theme.vars.typography.fontSizes.sm,
				fontWeight: 500,
				letterSpacing: "0.02857em",
				lineHeight: 1.75,
				textTransform: "uppercase"
			};
			default: return {};
		}
	};
	const variantStyles = getVariantStyles(variant);
	const colorValue = getColorValue(color);
	const typography = css`
      margin: 0;
      font-family: ${theme.vars.typography.fontFamily};
      color: ${colorValue};
      text-align: ${align};
      display: ${inline ? "inline" : "block"};
      ${variantStyles["fontSize"] ? `font-size: ${variantStyles["fontSize"]};` : ""}
      ${variantStyles["fontWeight"] ? `font-weight: ${variantStyles["fontWeight"]};` : ""}
      ${variantStyles["lineHeight"] ? `line-height: ${variantStyles["lineHeight"]};` : ""}
      ${variantStyles["letterSpacing"] ? `letter-spacing: ${variantStyles["letterSpacing"]};` : ""}
      ${variantStyles["textTransform"] ? `text-transform: ${variantStyles["textTransform"]};` : ""}

      /* Custom overrides */
      ${fontWeight ? `font-weight: ${fontWeight} !important;` : ""}
      ${fontSize ? `font-size: ${typeof fontSize === "number" ? `${fontSize}px` : fontSize} !important;` : ""}
      ${lineHeight ? `line-height: ${lineHeight} !important;` : ""}

      /* Conditional styles */
      ${noWrap ? `
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      ` : ""}

      ${gutterBottom ? `
        margin-bottom: ${theme.spacing.unit}px;
      ` : ""}
    `;
	const typographyNoWrap = css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const typographyInline = css`
      display: inline;
    `;
	const typographyGutterBottom = css`
      margin-bottom: ${theme.spacing.unit}px;
    `;
	const typographyH1 = css`
      font-size: ${theme.vars.typography.fontSizes["3xl"]};
      font-weight: 600;
      line-height: 1.235;
      letter-spacing: -0.00735em;
    `;
	const typographyH2 = css`
      font-size: ${theme.vars.typography.fontSizes["2xl"]};
      font-weight: 600;
      line-height: 1.334;
      letter-spacing: 0em;
    `;
	const typographyH3 = css`
      font-size: ${theme.vars.typography.fontSizes.xl};
      font-weight: 600;
      line-height: 1.6;
      letter-spacing: 0.0075em;
    `;
	const typographyH4 = css`
      font-size: ${theme.vars.typography.fontSizes.lg};
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: 0.00938em;
    `;
	const typographyH5 = css`
      font-size: ${theme.vars.typography.fontSizes.md};
      font-weight: 600;
      line-height: 1.334;
      letter-spacing: 0em;
    `;
	const typographyH6 = css`
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
    `;
	const typographySubtitle1 = css`
      font-size: ${theme.vars.typography.fontSizes.md};
      font-weight: 400;
      line-height: 1.75;
      letter-spacing: 0.00938em;
    `;
	const typographySubtitle2 = css`
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-weight: 500;
      line-height: 1.57;
      letter-spacing: 0.00714em;
    `;
	const typographyBody1 = css`
      font-size: ${theme.vars.typography.fontSizes.md};
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: 0.00938em;
    `;
	const typographyBody2 = css`
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-weight: 400;
      line-height: 1.43;
      letter-spacing: 0.01071em;
    `;
	const typographyCaption = css`
      font-size: ${theme.vars.typography.fontSizes.xs};
      font-weight: 400;
      line-height: 1.66;
      letter-spacing: 0.03333em;
    `;
	const typographyOverline = css`
      font-size: ${theme.vars.typography.fontSizes.xs};
      font-weight: 400;
      line-height: 2.66;
      letter-spacing: 0.08333em;
      text-transform: uppercase;
    `;
	return {
		typography,
		typographyBody1,
		typographyBody2,
		typographyButton: css`
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-weight: 500;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
    `,
		typographyCaption,
		typographyGutterBottom,
		typographyH1,
		typographyH2,
		typographyH3,
		typographyH4,
		typographyH5,
		typographyH6,
		typographyInline,
		typographyNoWrap,
		typographyOverline,
		typographySubtitle1,
		typographySubtitle2
	};
}, [
	theme,
	colorScheme,
	variant,
	align,
	color,
	noWrap,
	inline,
	gutterBottom,
	fontWeight,
	fontSize,
	lineHeight
]);
var Typography_styles_default = useStyles$30;

//#endregion
//#region src/components/primitives/Typography/Typography.tsx
const variantMapping = {
	body1: "p",
	body2: "p",
	button: "span",
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
};
/**
* Typography component for consistent text rendering throughout the application.
* Integrates with the theme system and provides semantic HTML elements.
*/
const Typography = ({ children, variant = "body1", component, align = "left", color = "textPrimary", noWrap = false, className, style = {}, inline = false, fontWeight, fontSize, lineHeight, gutterBottom = false,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Typography_styles_default(theme, colorScheme, variant, align, color, noWrap, inline, gutterBottom, fontWeight, fontSize, lineHeight);
	const Component = component || variantMapping[variant] || "span";
	const getVariantClass = (variantName) => {
		switch (variantName) {
			case "h1": return styles["typographyH1"];
			case "h2": return styles["typographyH2"];
			case "h3": return styles["typographyH3"];
			case "h4": return styles["typographyH4"];
			case "h5": return styles["typographyH5"];
			case "h6": return styles["typographyH6"];
			case "subtitle1": return styles["typographySubtitle1"];
			case "subtitle2": return styles["typographySubtitle2"];
			case "body1": return styles["typographyBody1"];
			case "body2": return styles["typographyBody2"];
			case "caption": return styles["typographyCaption"];
			case "overline": return styles["typographyOverline"];
			case "button": return styles["typographyButton"];
			default: return "";
		}
	};
	return /* @__PURE__ */ jsx(Component, {
		className: cx(withVendorCSSClassPrefix(bem("typography")), withVendorCSSClassPrefix(bem("typography", variant)), styles["typography"], getVariantClass(variant), noWrap && styles["typographyNoWrap"], inline && styles["typographyInline"], gutterBottom && styles["typographyGutterBottom"], className),
		style,
		...rest,
		children
	});
};
var Typography_default = Typography;

//#endregion
//#region src/components/primitives/FormControl/FormControl.tsx
const FormControl = ({ children, error, helperText, className, helperTextAlign = "left", helperTextMarginLeft }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = FormControl_styles_default(theme, colorScheme, helperTextAlign, helperTextMarginLeft, !!error);
	return /* @__PURE__ */ jsxs("div", {
		className: cx(withVendorCSSClassPrefix(bem("form-control")), styles["formControl"], className),
		children: [children, (error || helperText) && /* @__PURE__ */ jsx(Typography_default, {
			variant: "caption",
			color: error ? "error" : "textSecondary",
			className: cx(withVendorCSSClassPrefix(bem("form-control", "helper-text")), styles["helperText"], {
				[withVendorCSSClassPrefix(bem("form-control", "helper-text", "error"))]: !!error,
				[styles["helperTextError"]]: !!error
			}),
			children: error || helperText
		})]
	});
};
var FormControl_default = FormControl;

//#endregion
//#region src/components/primitives/InputLabel/InputLabel.styles.ts
/**
* Creates styles for the InputLabel component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param variant - The display variant of the label
* @param error - Whether the label has an error state
* @param marginBottom - Custom margin bottom value
* @returns Object containing CSS class names for component styling
*/
const useStyles$29 = (theme, colorScheme, variant, error, marginBottom) => useMemo(() => {
	const baseLabel = css`
      display: ${variant};
      margin-bottom: ${marginBottom || (variant === "block" ? `calc(${theme.vars.spacing.unit} + 1px)` : "0")};
      color: ${error ? theme.vars.colors.error.main : theme.vars.colors.text.secondary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-family: ${theme.vars.typography.fontFamily};
      font-weight: ${variant === "block" ? 500 : "normal"};
    `;
	const errorLabel = css`
      color: ${theme.vars.colors.error.main};
    `;
	const requiredIndicator = css`
      color: ${theme.vars.colors.error.main};
    `;
	return {
		block: css`
      display: block;
      font-weight: 500;
      margin-bottom: ${marginBottom || `calc(${theme.vars.spacing.unit} + 1px)`};
    `,
		error: errorLabel,
		inline: css`
      display: inline;
      font-weight: normal;
      margin-bottom: 0;
    `,
		label: baseLabel,
		requiredIndicator
	};
}, [
	theme,
	colorScheme,
	variant,
	error,
	marginBottom
]);
var InputLabel_styles_default = useStyles$29;

//#endregion
//#region src/components/primitives/InputLabel/InputLabel.tsx
const InputLabel = ({ children, required = false, error = false, variant = "block", marginBottom, className, style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = InputLabel_styles_default(theme, colorScheme, variant, error, marginBottom);
	return /* @__PURE__ */ jsxs("label", {
		className: cx(withVendorCSSClassPrefix(bem("input-label")), withVendorCSSClassPrefix(bem("input-label", variant)), styles["label"], variant === "block" ? styles["block"] : styles["inline"], {
			[withVendorCSSClassPrefix(bem("input-label", "error"))]: error,
			[styles["error"]]: error
		}, className),
		style,
		...rest,
		children: [children, required && /* @__PURE__ */ jsx("span", {
			className: cx(withVendorCSSClassPrefix(bem("input-label", "required")), styles["requiredIndicator"]),
			children: " *"
		})]
	});
};
var InputLabel_default = InputLabel;

//#endregion
//#region src/components/primitives/Checkbox/Checkbox.tsx
const Checkbox = ({ label, error, className, required, helperText, style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const hasError = !!error;
	const styles = Checkbox_styles_default(theme, colorScheme, hasError, !!required);
	return /* @__PURE__ */ jsx(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("checkbox")), className),
		helperTextMarginLeft: `calc(${theme.vars.spacing.unit} * 3.5)`,
		children: /* @__PURE__ */ jsxs("div", {
			style,
			className: cx(withVendorCSSClassPrefix(bem("checkbox", "container")), styles["container"]),
			children: [/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				className: cx(withVendorCSSClassPrefix(bem("checkbox", "input")), styles["input"], styles["errorInput"], { [withVendorCSSClassPrefix(bem("checkbox", "input", "error"))]: hasError }),
				"aria-invalid": hasError,
				"aria-required": required,
				...rest
			}), label && /* @__PURE__ */ jsx(InputLabel_default, {
				required,
				error: hasError,
				variant: "inline",
				className: cx(withVendorCSSClassPrefix(bem("checkbox", "label")), styles["label"], styles["errorLabel"], { [withVendorCSSClassPrefix(bem("checkbox", "label", "error"))]: hasError }),
				children: label
			})]
		})
	});
};
var Checkbox_default = Checkbox;

//#endregion
//#region src/components/primitives/DatePicker/DatePicker.styles.ts
/**
* Creates styles for the DatePicker component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param hasError - Whether the date picker has an error state
* @param disabled - Whether the date picker is disabled
* @returns Object containing CSS class names for component styling
*/
const useStyles$28 = (theme, colorScheme, hasError, disabled) => useMemo(() => {
	const inputStyles = css`
      width: 100%;
      padding: ${theme.vars.spacing.unit} calc(${theme.vars.spacing.unit} * 1.5);
      border: 1px solid ${theme.vars.colors.border};
      border-radius: ${theme.vars.components?.Field?.root?.borderRadius || theme.vars.borderRadius.medium};
      font-size: 1rem;
      font-family: ${theme.vars.typography.fontFamily};
      color: ${theme.vars.colors.text.primary};
      background-color: ${theme.vars.colors.background.surface};
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      &:focus {
        border-color: ${theme.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${theme.vars.colors.primary.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${theme.vars.colors.primary.main};
      }

      &::placeholder {
        color: ${theme.vars.colors.text.secondary};
      }
    `;
	const errorInputStyles = css`
      border-color: ${theme.vars.colors.error.main};

      &:focus {
        border-color: ${theme.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${theme.vars.colors.error.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${theme.vars.colors.error.main};
      }
    `;
	const disabledInputStyles = css`
      background-color: ${theme.vars.colors.background.disabled};
      color: ${theme.vars.colors.text.secondary};
      cursor: not-allowed;
      opacity: 0.6;

      &:hover,
      &:focus {
        border-color: ${theme.vars.colors.border};
        box-shadow: none;
      }
    `;
	const labelStyles = css`
      /* Label styles will be handled by InputLabel component */
    `;
	return {
		disabledInput: disabled ? disabledInputStyles : "",
		errorInput: hasError ? errorInputStyles : "",
		input: inputStyles,
		label: labelStyles
	};
}, [
	theme,
	colorScheme,
	hasError,
	disabled
]);
var DatePicker_styles_default = useStyles$28;

//#endregion
//#region src/components/primitives/DatePicker/DatePicker.tsx
const DatePicker = ({ label, error, className, required, disabled, helperText, dateFormat = "yyyy-MM-dd", style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const hasError = !!error;
	const styles = DatePicker_styles_default(theme, colorScheme, hasError, !!disabled);
	return /* @__PURE__ */ jsxs(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("date-picker")), className),
		style,
		children: [label && /* @__PURE__ */ jsx(InputLabel_default, {
			required,
			error: hasError,
			className: cx(withVendorCSSClassPrefix(bem("date-picker", "label")), styles["label"]),
			children: label
		}), /* @__PURE__ */ jsx("input", {
			type: "date",
			pattern: "\\d{4}-\\d{2}-\\d{2}",
			placeholder: dateFormat,
			className: cx(withVendorCSSClassPrefix(bem("date-picker", "input")), styles["input"], styles["errorInput"], styles["disabledInput"], {
				[withVendorCSSClassPrefix(bem("date-picker", "input", "error"))]: hasError,
				[withVendorCSSClassPrefix(bem("date-picker", "input", "disabled"))]: disabled
			}),
			disabled,
			"aria-invalid": hasError,
			"aria-required": required,
			...rest
		})]
	});
};
var DatePicker_default = DatePicker;

//#endregion
//#region src/components/primitives/OtpField/OtpField.styles.ts
/**
* Creates styles for the OtpField component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param disabled - Whether the component is disabled
* @param hasError - Whether the component has an error
* @param length - Number of OTP input fields
* @returns Object containing CSS class names for component styling
*/
const useStyles$27 = (theme, colorScheme, disabled, hasError, length) => useMemo(() => {
	const inputContainer = css`
      display: flex;
      gap: ${theme.vars.spacing.unit};
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    `;
	const input = css`
      width: calc(${theme.vars.spacing.unit} * 6);
      height: calc(${theme.vars.spacing.unit} * 6);
      text-align: center;
      font-size: ${theme.vars.typography.fontSizes.xl};
      font-family: ${theme.vars.typography.fontFamily};
      font-weight: 500;
      border: 2px solid ${hasError ? theme.vars.colors.error.main : theme.vars.colors.border};
      border-radius: ${theme.vars.components?.Field?.root?.borderRadius || theme.vars.borderRadius.medium};
      color: ${theme.vars.colors.text.primary};
      background-color: ${disabled ? theme.vars.colors.background.disabled : theme.vars.colors.background.surface};
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      &:focus {
        border-color: ${hasError ? theme.vars.colors.error.main : theme.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${hasError ? `${theme.vars.colors.error.main}20` : `${theme.vars.colors.primary.main}20`};
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      &::placeholder {
        color: ${theme.vars.colors.text.secondary};
        opacity: 0.7;
      }
    `;
	const inputError = css`
      border-color: ${theme.vars.colors.error.main};

      &:focus {
        border-color: ${theme.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${theme.vars.colors.error.main}20;
      }
    `;
	return {
		input,
		inputContainer,
		inputDisabled: css`
      background-color: ${theme.vars.colors.background.disabled};
      cursor: not-allowed;
      opacity: 0.6;
    `,
		inputError
	};
}, [
	theme,
	colorScheme,
	disabled,
	hasError,
	length
]);
var OtpField_styles_default = useStyles$27;

//#endregion
//#region src/components/primitives/OtpField/OtpField.tsx
const OtpField = ({ label, error, className, required, disabled, helperText, length = 6, value = "", onChange, onComplete, type = "text", placeholder = "", style = {}, autoFocus = false, pattern }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = OtpField_styles_default(theme, colorScheme, !!disabled, !!error, length);
	const [otp, setOtp] = useState(Array(length).fill(""));
	const inputRefs = useRef([]);
	useEffect(() => {
		inputRefs.current = inputRefs.current.slice(0, length);
	}, [length]);
	useEffect(() => {
		if (value) {
			const newOtp = value.split("").slice(0, length);
			while (newOtp.length < length) newOtp.push("");
			setOtp(newOtp);
		} else setOtp(Array(length).fill(""));
	}, [value, length]);
	useEffect(() => {
		if (autoFocus && inputRefs.current[0]) inputRefs.current[0].focus();
	}, [autoFocus]);
	const handleChange = (index, event) => {
		const newValue = event.target.value;
		if (newValue.length > 1) return;
		if (type === "number" && newValue && !/^\d$/.test(newValue)) return;
		if (pattern && newValue && !new RegExp(pattern).test(newValue)) return;
		const newOtp = [...otp];
		newOtp[index] = newValue;
		setOtp(newOtp);
		const otpValue = newOtp.join("");
		onChange?.({ target: { value: otpValue } });
		if (newValue && index < length - 1) inputRefs.current[index + 1]?.focus();
		if (newOtp.every((digit) => digit !== "") && onComplete) onComplete(otpValue);
	};
	const handleKeyDown = (index, event) => {
		if (event.key === "Backspace") {
			if (!otp[index] && index > 0) {
				const newOtp = [...otp];
				newOtp[index - 1] = "";
				setOtp(newOtp);
				inputRefs.current[index - 1]?.focus();
				onChange?.({ target: { value: newOtp.join("") } });
			} else if (otp[index]) {
				const newOtp = [...otp];
				newOtp[index] = "";
				setOtp(newOtp);
				onChange?.({ target: { value: newOtp.join("") } });
			}
		} else if (event.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
		else if (event.key === "ArrowRight" && index < length - 1) inputRefs.current[index + 1]?.focus();
		else if (event.key === "Enter") {
			event.preventDefault();
			if (otp.every((digit) => digit !== "") && onComplete) onComplete(otp.join(""));
		}
	};
	const handlePaste = (event) => {
		event.preventDefault();
		const pastedData = event.clipboardData.getData("text").slice(0, length);
		let validData = "";
		Array.from(pastedData).forEach((char) => {
			if (type === "number" && !/^\d$/.test(char)) return;
			if (pattern && !new RegExp(pattern).test(char)) return;
			validData += char;
		});
		const newOtp = Array(length).fill("");
		for (let i = 0; i < Math.min(validData.length, length); i += 1) newOtp[i] = validData[i];
		setOtp(newOtp);
		onChange?.({ target: { value: newOtp.join("") } });
		const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
		const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
		inputRefs.current[focusIndex]?.focus();
		if (newOtp.every((digit) => digit !== "") && onComplete) onComplete(newOtp.join(""));
	};
	return /* @__PURE__ */ jsxs(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("otp-field")), className),
		helperTextAlign: "center",
		style,
		children: [label && /* @__PURE__ */ jsx(InputLabel_default, {
			required,
			error: !!error,
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: cx(withVendorCSSClassPrefix(bem("otp-field", "input-container")), styles["inputContainer"]),
			children: Array.from({ length }, (_, index) => /* @__PURE__ */ jsx("input", {
				ref: (el) => {
					if (el) inputRefs.current[index] = el;
				},
				type: type === "password" ? "password" : "text",
				inputMode: type === "number" ? "numeric" : "text",
				value: otp[index] || "",
				onChange: (event) => handleChange(index, event),
				onKeyDown: (event) => handleKeyDown(index, event),
				onPaste: handlePaste,
				className: cx(withVendorCSSClassPrefix(bem("otp-field", "input")), styles["input"], {
					[withVendorCSSClassPrefix(bem("otp-field", "input", "error"))]: !!error,
					[styles["inputError"]]: !!error,
					[withVendorCSSClassPrefix(bem("otp-field", "input", "disabled"))]: !!disabled,
					[styles["inputDisabled"]]: !!disabled
				}),
				maxLength: 1,
				placeholder,
				disabled,
				"aria-label": `${label || "OTP"} digit ${index + 1}`,
				"aria-invalid": !!error,
				"aria-required": required,
				autoComplete: "one-time-code"
			}, index))
		})]
	});
};
var OtpField_default = OtpField;

//#endregion
//#region src/components/primitives/PasswordField/PasswordField.styles.ts
/**
* Creates styles for the PasswordField component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param showPassword - Whether the password is currently visible
* @param disabled - Whether the component is disabled
* @param hasError - Whether the component has an error
* @returns Object containing CSS class names for component styling
*/
const useStyles$26 = (theme, colorScheme, showPassword, disabled, hasError) => useMemo(() => {
	const toggleIcon = css`
      cursor: ${disabled ? "not-allowed" : "pointer"};
      color: ${theme.vars.colors.text.secondary};
      opacity: ${disabled ? .6 : 1};
      transition: color 0.2s ease;

      &:hover {
        color: ${!disabled ? theme.vars.colors.text.primary : theme.vars.colors.text.secondary};
      }
    `;
	const visibleIcon = css`
      color: ${theme.vars.colors.primary.main};
    `;
	return {
		hiddenIcon: css`
      color: ${theme.vars.colors.text.secondary};
    `,
		toggleIcon,
		visibleIcon
	};
}, [
	theme,
	colorScheme,
	showPassword,
	disabled,
	hasError
]);
var PasswordField_styles_default = useStyles$26;

//#endregion
//#region src/components/primitives/Icons/Eye.tsx
/**
* Eye icon component.
*/
const Eye = (props) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [/* @__PURE__ */ jsx("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" }), /* @__PURE__ */ jsx("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})]
});
var Eye_default = Eye;

//#endregion
//#region src/components/primitives/Icons/EyeOff.tsx
/**
* EyeOff icon component.
*/
const EyeOff = (props) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [
		/* @__PURE__ */ jsx("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" }),
		/* @__PURE__ */ jsx("path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242" }),
		/* @__PURE__ */ jsx("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" }),
		/* @__PURE__ */ jsx("path", { d: "m2 2 20 20" })
	]
});
var EyeOff_default = EyeOff;

//#endregion
//#region src/components/primitives/TextField/TextField.styles.ts
/**
* Creates styles for the TextField component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param disabled - Whether the component is disabled
* @param hasError - Whether the component has an error
* @param hasStartIcon - Whether the component has a start icon
* @param hasEndIcon - Whether the component has an end icon
* @returns Object containing CSS class names for component styling
*/
const useStyles$25 = (theme, colorScheme, disabled, hasError, hasStartIcon, hasEndIcon) => useMemo(() => {
	const inlineStartPadding = hasStartIcon ? `calc(${theme.vars.spacing.unit} * 5)` : `calc(${theme.vars.spacing.unit} * 1.5)`;
	const inlineEndPadding = hasEndIcon ? `calc(${theme.vars.spacing.unit} * 5)` : `calc(${theme.vars.spacing.unit} * 1.5)`;
	const inputContainer = css`
      position: relative;
      display: flex;
      align-items: center;
    `;
	const input = css`
      width: 100%;
      padding-block: ${theme.vars.spacing.unit};
      padding-inline-start: ${inlineStartPadding};
      padding-inline-end: ${inlineEndPadding};
      border: 1px solid ${hasError ? theme.vars.colors.error.main : theme.vars.colors.border};
      border-radius: ${theme.vars.components?.Field?.root?.borderRadius || theme.vars.borderRadius.medium};
      font-size: ${theme.vars.typography.fontSizes.md};
      font-family: ${theme.vars.typography.fontFamily};
      color: ${theme.vars.colors.text.primary};
      background-color: ${disabled ? theme.vars.colors.background.disabled : theme.vars.colors.background.surface};
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      &:focus {
        border-color: ${hasError ? theme.vars.colors.error.main : theme.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${hasError ? `${theme.vars.colors.error.main}20` : `${theme.vars.colors.primary.main}20`};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        border-color: ${hasError ? theme.vars.colors.error.main : theme.vars.colors.primary.main};
      }

      &::placeholder {
        color: ${theme.vars.colors.text.secondary};
        opacity: 0.7;
      }
    `;
	const inputError = css`
      border-color: ${theme.vars.colors.error.main};

      &:focus {
        border-color: ${theme.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${theme.vars.colors.error.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${theme.vars.colors.error.main};
      }
    `;
	const inputDisabled = css`
      background-color: ${theme.vars.colors.background.disabled};
      opacity: 0.6;
      cursor: not-allowed;
    `;
	const icon = css`
      position: absolute;
      background: none;
      border: none;
      cursor: ${disabled ? "not-allowed" : "pointer"};
      padding: calc(${theme.vars.spacing.unit} / 2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.vars.colors.text.secondary};
      opacity: ${disabled ? .5 : 1};
      top: 50%;
      transform: translateY(-50%);
      transition:
        color 0.2s ease,
        opacity 0.2s ease;

      &:hover:not(:disabled) {
        color: ${theme.vars.colors.text.primary};
      }

      &:focus {
        outline: 2px solid ${theme.vars.colors.primary.main};
        outline-offset: 2px;
      }
    `;
	const startIcon = css`
      ${icon};
      inset-inline-start: ${theme.vars.spacing.unit};
    `;
	return {
		endIcon: css`
      ${icon};
      inset-inline-end: ${theme.vars.spacing.unit};
    `,
		icon,
		input,
		inputContainer,
		inputDisabled,
		inputError,
		startIcon
	};
}, [
	theme,
	colorScheme,
	disabled,
	hasError,
	hasStartIcon,
	hasEndIcon
]);
var TextField_styles_default = useStyles$25;

//#endregion
//#region src/components/primitives/TextField/TextField.tsx
const TextField = ({ label, error, required, className, disabled, helperText, startIcon, endIcon, onStartIconClick, onEndIconClick, type = "text", style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const hasError = !!error;
	const styles = TextField_styles_default(theme, colorScheme, disabled ?? false, hasError, !!startIcon, !!endIcon);
	const inputClassName = cx(withVendorCSSClassPrefix(bem("text-field", "input")), styles["input"], hasError && styles["inputError"], disabled && styles["inputDisabled"]);
	const containerClassName = cx(withVendorCSSClassPrefix(bem("text-field", "container")), styles["inputContainer"]);
	const startIconClassName = cx(withVendorCSSClassPrefix(bem("text-field", "start-icon")), styles["startIcon"]);
	const endIconClassName = cx(withVendorCSSClassPrefix(bem("text-field", "end-icon")), styles["endIcon"]);
	return /* @__PURE__ */ jsxs(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("text-field")), className),
		style,
		children: [label && /* @__PURE__ */ jsx(InputLabel_default, {
			required,
			error: hasError,
			children: label
		}), /* @__PURE__ */ jsxs("div", {
			className: containerClassName,
			children: [
				startIcon && /* @__PURE__ */ jsx("div", {
					className: startIconClassName,
					onClick: onStartIconClick,
					role: onStartIconClick ? "button" : void 0,
					tabIndex: onStartIconClick && !disabled ? 0 : void 0,
					"aria-label": "Start icon",
					children: startIcon
				}),
				/* @__PURE__ */ jsx("input", {
					className: inputClassName,
					type,
					disabled,
					"aria-invalid": hasError,
					"aria-required": required,
					...rest
				}),
				endIcon && /* @__PURE__ */ jsx("div", {
					className: endIconClassName,
					onClick: onEndIconClick,
					role: onEndIconClick ? "button" : void 0,
					tabIndex: onEndIconClick && !disabled ? 0 : void 0,
					"aria-label": "End icon",
					children: endIcon
				})
			]
		})]
	});
};
var TextField_default = TextField;

//#endregion
//#region src/components/primitives/PasswordField/PasswordField.tsx
/**
* Password field component with show/hide toggle functionality.
* This component extends TextField and adds password visibility toggle functionality.
*/
const PasswordField = ({ onChange, className, disabled, error,...textFieldProps }) => {
	const { theme, colorScheme } = useTheme_default();
	const [showPassword, setShowPassword] = useState(false);
	const styles = PasswordField_styles_default(theme, colorScheme, showPassword, !!disabled, !!error);
	const togglePasswordVisibility = () => {
		if (!disabled) setShowPassword(!showPassword);
	};
	const IconComponent = showPassword ? EyeOff_default : Eye_default;
	return /* @__PURE__ */ jsx(TextField_default, {
		...textFieldProps,
		className: cx(withVendorCSSClassPrefix(bem("password-field")), className),
		type: showPassword ? "text" : "password",
		onChange: (e) => onChange(e.target.value),
		autoComplete: "current-password",
		disabled,
		error,
		endIcon: /* @__PURE__ */ jsx(IconComponent, {
			width: 16,
			height: 16,
			className: cx(withVendorCSSClassPrefix(bem("password-field", "toggle-icon")), styles["toggleIcon"], showPassword ? styles["visibleIcon"] : styles["hiddenIcon"])
		}),
		onEndIconClick: togglePasswordVisibility
	});
};
var PasswordField_default = PasswordField;

//#endregion
//#region src/components/primitives/Select/Select.styles.ts
/**
* Creates styles for the Select component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param disabled - Whether the component is disabled
* @param hasError - Whether the component has an error
* @returns Object containing CSS class names for component styling
*/
const useStyles$24 = (theme, colorScheme, disabled, hasError) => useMemo(() => {
	const dropdownArrow = `data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${theme.colors.text.secondary.replace("#", "")}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E`;
	const select = css`
      width: 100%;
      padding: ${theme.vars.spacing.unit} calc(${theme.vars.spacing.unit} * 1.5);
      border: 1px solid ${hasError ? theme.vars.colors.error.main : theme.vars.colors.border};
      border-radius: ${theme.vars.components?.Field?.root?.borderRadius || theme.vars.borderRadius.medium};
      font-size: ${theme.vars.typography.fontSizes.md};
      font-family: ${theme.vars.typography.fontFamily};
      color: ${theme.vars.colors.text.primary};
      background-color: ${disabled ? theme.vars.colors.background.disabled : theme.vars.colors.background.surface};
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
      appearance: none;
      background-image: url('${dropdownArrow}');
      background-repeat: no-repeat;
      background-position: right 0.7em top 50%;
      background-size: 0.65em auto;
      cursor: ${disabled ? "not-allowed" : "pointer"};

      &:focus {
        border-color: ${hasError ? theme.vars.colors.error.main : theme.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${hasError ? `${theme.vars.colors.error.main}20` : `${theme.vars.colors.primary.main}20`};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        border-color: ${hasError ? theme.vars.colors.error.main : theme.vars.colors.primary.main};
      }
    `;
	const selectError = css`
      border-color: ${theme.vars.colors.error.main};

      &:focus {
        border-color: ${theme.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${theme.vars.colors.error.main}20;
      }

      &:hover:not(:disabled) {
        border-color: ${theme.vars.colors.error.main};
      }
    `;
	const selectDisabled = css`
      background-color: ${theme.vars.colors.background.disabled};
      opacity: 0.6;
      cursor: not-allowed;
    `;
	return {
		option: css`
      padding: calc(${theme.vars.spacing.unit} / 2) ${theme.vars.spacing.unit};
      color: ${theme.vars.colors.text.primary};
      background-color: ${theme.vars.colors.background.surface};

      &:hover {
        background-color: ${theme.vars.colors.action.hover};
      }

      &:checked {
        background-color: ${theme.vars.colors.primary.main};
        color: ${theme.vars.colors.primary.contrastText};
      }
    `,
		select,
		selectDisabled,
		selectError
	};
}, [
	theme,
	colorScheme,
	disabled,
	hasError
]);
var Select_styles_default = useStyles$24;

//#endregion
//#region src/components/primitives/Select/Select.tsx
const Select = ({ label, error, className, required, disabled, helperText, placeholder, options, style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const hasError = !!error;
	const styles = Select_styles_default(theme, colorScheme, disabled ?? false, hasError);
	const selectClassName = cx(withVendorCSSClassPrefix(bem("select", "input")), styles["select"], hasError && styles["selectError"], disabled && styles["selectDisabled"]);
	return /* @__PURE__ */ jsxs(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("select")), className),
		style,
		children: [label && /* @__PURE__ */ jsx(InputLabel_default, {
			required,
			error: hasError,
			children: label
		}), /* @__PURE__ */ jsxs("select", {
			className: selectClassName,
			disabled,
			"aria-invalid": hasError,
			"aria-required": required,
			...rest,
			children: [placeholder && /* @__PURE__ */ jsx("option", {
				value: "",
				disabled: true,
				children: placeholder
			}), options.map((option) => /* @__PURE__ */ jsx("option", {
				value: option.value,
				className: styles["option"],
				children: option.label
			}, option.value))]
		})]
	});
};
var Select_default = Select;

//#endregion
//#region src/components/factories/FieldFactory.tsx
/**
* Utility function to validate field values based on type
*/
const validateFieldValue = (value, type, required = false, touched = false) => {
	if (required && touched && (!value || value.trim() === "")) return "This field is required";
	if (!value || value.trim() === "") return null;
	switch (type) {
		case FieldType.Number: {
			const numValue = parseInt(value, 10);
			if (Number.isNaN(numValue)) return "Please enter a valid number";
			break;
		}
		default: break;
	}
	return null;
};
/**
* Factory function to create form fields based on the EmbeddedSignInFlowAuthenticatorParamType.
*
* @param config - The field configuration
* @returns The appropriate React component for the field type
*
* @example
* ```tsx
* const field = createField({
*   param: 'username',
*   type: EmbeddedSignInFlowAuthenticatorParamType.String,
*   label: 'Username',
*   confidential: false,
*   required: true,
*   value: '',
*   onChange: (value) => console.log(value)
* });
* ```
*/
const createField = (config) => {
	const { name, type, label, required, value, onChange, onBlur, disabled = false, error, className, options = [], touched = false, placeholder } = config;
	const validationError = error || validateFieldValue(value, type, required, touched);
	const commonProps = {
		className,
		"data-testid": `thunderid-signin-${name}`,
		disabled,
		error: validationError,
		label,
		name,
		onBlur,
		placeholder,
		required,
		value
	};
	switch (type) {
		case FieldType.Password: return /* @__PURE__ */ jsx(PasswordField_default, {
			...commonProps,
			onChange
		});
		case FieldType.Text: return /* @__PURE__ */ jsx(TextField_default, {
			...commonProps,
			type: "text",
			onChange: (e) => onChange(e.target.value),
			autoComplete: "off"
		});
		case FieldType.Email: return /* @__PURE__ */ jsx(TextField_default, {
			...commonProps,
			type: "email",
			onChange: (e) => onChange(e.target.value),
			autoComplete: "email"
		});
		case FieldType.Tel: return /* @__PURE__ */ jsx(TextField_default, {
			...commonProps,
			type: "tel",
			onChange: (e) => onChange(e.target.value),
			autoComplete: "tel"
		});
		case FieldType.Date: return /* @__PURE__ */ jsx(DatePicker_default, {
			...commonProps,
			onChange: (e) => onChange(e.target.value)
		});
		case FieldType.Checkbox: {
			const isChecked = value === "true" || value === true;
			return /* @__PURE__ */ jsx(Checkbox_default, {
				...commonProps,
				checked: isChecked,
				onChange: (e) => onChange(e.target.checked.toString())
			});
		}
		case FieldType.Otp: return /* @__PURE__ */ jsx(OtpField_default, {
			...commonProps,
			onChange: (e) => onChange(e.target.value)
		});
		case FieldType.Number: return /* @__PURE__ */ jsx(TextField_default, {
			...commonProps,
			type: "number",
			onChange: (e) => onChange(e.target.value),
			helperText: "Enter a numeric value"
		});
		case FieldType.Select: {
			const fieldOptions = options.length > 0 ? options : [];
			if (fieldOptions.length > 0) return /* @__PURE__ */ jsx(Select_default, {
				...commonProps,
				options: fieldOptions,
				onChange: (e) => onChange(e.target.value),
				helperText: "Select from available options"
			});
			return /* @__PURE__ */ jsx(TextField_default, {
				...commonProps,
				type: "text",
				onChange: (e) => onChange(e.target.value),
				helperText: "Enter multiple values separated by commas (e.g., value1, value2, value3)",
				placeholder: "value1, value2, value3"
			});
		}
		default: return /* @__PURE__ */ jsx(TextField_default, {
			...commonProps,
			type: "text",
			onChange: (e) => onChange(e.target.value),
			helperText: "Unknown field type, treating as text"
		});
	}
};
/**
* React component wrapper for the field factory.
*/
const FieldFactory = (props) => createField(props);

//#endregion
//#region src/components/presentation/auth/SignIn/v1/options/EmailOtp.tsx
/**
* Email OTP Sign-In Option Component.
* Handles email-based OTP authentication.
*/
const EmailOtp = ({ authenticator, formValues, touchedFields, isLoading, onInputChange, inputClassName = "", buttonClassName = "", preferences }) => {
	const { theme } = useTheme_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { setTitle, setSubtitle } = useFlow_default();
	const formFields = authenticator.metadata?.params?.sort((a, b) => a.order - b.order) || [];
	useEffect(() => {
		setTitle(t("email.otp.heading"));
		setSubtitle(t("email.otp.subheading"));
	}, [
		setTitle,
		setSubtitle,
		t
	]);
	const hasOtpField = formFields.some((param) => param.param.toLowerCase().includes("otp") || param.param.toLowerCase().includes("code"));
	return /* @__PURE__ */ jsxs(Fragment, { children: [formFields.map((param) => {
		return /* @__PURE__ */ jsx("div", { children: (param.param.toLowerCase().includes("otp") || param.param.toLowerCase().includes("code")) && hasOtpField ? /* @__PURE__ */ jsx(OtpField_default, {
			length: 6,
			value: formValues[param.param] || "",
			onChange: (event) => onInputChange(param.param, event.target.value),
			disabled: isLoading,
			className: inputClassName
		}) : createField({
			className: inputClassName,
			disabled: isLoading,
			label: param.displayName,
			name: param.param,
			onChange: (value) => onInputChange(param.param, value),
			required: authenticator.requiredParams.includes(param.param),
			touched: touchedFields[param.param] || false,
			type: param.type === EmbeddedSignInFlowAuthenticatorParamType.String && param.confidential ? FieldType.Password : FieldType.Text,
			value: formValues[param.param] || ""
		}) }, param.param);
	}), /* @__PURE__ */ jsx(Button_default, {
		fullWidth: true,
		type: "submit",
		color: "primary",
		variant: "solid",
		disabled: isLoading,
		loading: isLoading,
		className: buttonClassName,
		style: { marginBottom: `calc(${theme.vars.spacing.unit} * 2)` },
		children: t("email.otp.buttons.submit.text")
	})] });
};
var EmailOtp_default = EmailOtp;

//#endregion
//#region src/components/presentation/auth/SignIn/v1/options/IdentifierFirst.tsx
/**
* Identifier First Sign-In Option Component.
* Handles identifier-first authentication flow (username first, then password).
*/
const IdentifierFirst = ({ authenticator, formValues, touchedFields, isLoading, onInputChange, inputClassName = "", buttonClassName = "", preferences }) => {
	const { theme } = useTheme_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { setTitle, setSubtitle } = useFlow_default();
	const formFields = authenticator.metadata?.params?.sort((a, b) => a.order - b.order) || [];
	useEffect(() => {
		setTitle(t("identifier.first.heading"));
		setSubtitle(t("identifier.first.subheading"));
	}, [
		setTitle,
		setSubtitle,
		t
	]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [formFields.map((param) => /* @__PURE__ */ jsx("div", { children: createField({
		className: inputClassName,
		disabled: isLoading,
		label: param.displayName,
		name: param.param,
		onChange: (value) => onInputChange(param.param, value),
		placeholder: t(`elements.fields.generic.placeholder`, { field: (param.displayName || param.param).toLowerCase() }),
		required: authenticator.requiredParams.includes(param.param),
		touched: touchedFields[param.param] || false,
		type: param.type === EmbeddedSignInFlowAuthenticatorParamType.String && param.confidential ? FieldType.Password : FieldType.Text,
		value: formValues[param.param] || ""
	}) }, param.param)), /* @__PURE__ */ jsx(Button_default, {
		fullWidth: true,
		type: "submit",
		color: "primary",
		variant: "solid",
		disabled: isLoading,
		loading: isLoading,
		className: buttonClassName,
		style: { marginBottom: `calc(${theme.vars.spacing.unit} * 2)` },
		children: t("identifier.first.buttons.submit.text")
	})] });
};
var IdentifierFirst_default = IdentifierFirst;

//#endregion
//#region src/components/presentation/auth/SignIn/v1/options/MultiOptionButton.tsx
/**
* Multi Option Button Component.
* Renders authenticators as selectable buttons for multi-option prompts.
* Used when authenticators don't require immediate user input but need to be selected first.
*/
const MultiOptionButton = ({ authenticator, isLoading, onSubmit, buttonClassName = "", preferences }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	/**
	* Get display name for the authenticator.
	*/
	const getDisplayName$1 = () => {
		let authenticatorName = authenticator.authenticator;
		if (authenticator.idp !== EmbeddedSignInFlowAuthenticatorKnownIdPType.Local) authenticatorName = authenticator.idp;
		switch (authenticatorName) {
			default: return t("elements.buttons.multi.option.text", { connection: authenticatorName });
		}
	};
	/**
	* Get appropriate icon for the authenticator type.
	*/
	const getIcon = () => {
		const { authenticatorId } = authenticator;
		switch (authenticatorId) {
			case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.SmsOtp: return /* @__PURE__ */ jsx("svg", {
				width: "18",
				height: "18",
				viewBox: "0 0 24 24",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: "M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1M12 3v10l3-3h6V3z"
				})
			});
			case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.EmailOtp: return /* @__PURE__ */ jsx("svg", {
				width: "18",
				height: "18",
				viewBox: "0 0 24 24",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"
				})
			});
			case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Totp: return /* @__PURE__ */ jsx("svg", {
				width: "18",
				height: "18",
				viewBox: "0 0 24 24",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5z"
				})
			});
			case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.PushNotification: return /* @__PURE__ */ jsx("svg", {
				width: "18",
				height: "18",
				viewBox: "0 0 24 24",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m1-13h-2v6h2zm0 8h-2v2h2z"
				})
			});
			case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Passkey: return /* @__PURE__ */ jsxs("svg", {
				fill: "currentColor",
				width: "18",
				height: "18",
				viewBox: "0 0 32 32",
				xmlns: "http://www.w3.org/2000/svg",
				children: [
					/* @__PURE__ */ jsx("g", {
						id: "SVGRepo_bgCarrier",
						strokeWidth: "0"
					}),
					/* @__PURE__ */ jsx("g", {
						id: "SVGRepo_tracerCarrier",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					}),
					/* @__PURE__ */ jsxs("g", {
						id: "SVGRepo_iconCarrier",
						children: [/* @__PURE__ */ jsx("path", { d: "M7.7 4.7C9.36 3.07 12.68 2 16.17 2S23 3.06 24.6 4.7A1 1 0 0 0 26 3.3C23.6.86 19.34 0 16.16 0S8.72.87 6.3 3.3a1 1 0 0 0 1.4 1.4zM29.2 12.55C26.38 6.88 22 4 16.17 4s-10.22 2.88-13 8.55a1 1 0 0 0 .44 1.34 1 1 0 0 0 1.35-.45C7.4 8.45 11.08 6 16.15 6s8.77 2.44 11.27 7.45a1 1 0 0 0 .9.55.87.87 0 0 0 .44-.1 1 1 0 0 0 .45-1.35zM19.4 28.08c-4.13-1.77-5.8-4.5-6-6.5a2.87 2.87 0 0 1 1.13-2.75c.85-.57 2.1.24 3.87 1.52s4.13 3 6.17 1.45c1.8-1.35 2.34-3.76 1.45-6.44A10.85 10.85 0 0 0 16.16 8C7.2 8 4 15.75 4 23a1 1 0 0 0 2 0c0-3 .73-13 10.16-13 3.9 0 7 3.1 8 6 .3.87.8 3-.75 4.2-.8.6-2-.2-3.8-1.47s-4.07-2.94-6.14-1.56a4.87 4.87 0 0 0-2 4.6c.24 2.56 2.24 6 7.18 8.15A1 1 0 0 0 19 30a1 1 0 0 0 .4-1.92zM10 19.24a7.06 7.06 0 0 1 5.2-4.65c2.24-.43 4.32.6 6 3a1 1 0 1 0 1.62-1.17c-2.9-4.07-6.27-4.12-8-3.8A9.1 9.1 0 0 0 8 18.77c-1 3.94.43 8.27 4.2 12.87a1 1 0 0 0 .8.37.94.94 0 0 0 .63-.23 1 1 0 0 0 .14-1.4c-3.34-4.1-4.62-7.83-3.77-11.13zM25.3 24.3a3 3 0 0 1-3.06.63c-2.4-.57-4.78-2.7-5.3-4.25a1 1 0 1 0-1.9.64c.8 2.33 3.87 4.88 6.74 5.56a6.84 6.84 0 0 0 1.52.18 4.7 4.7 0 0 0 3.4-1.35 1 1 0 0 0-1.4-1.4z" }), " "]
					})
				]
			});
			case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.MagicLink: return /* @__PURE__ */ jsx("svg", {
				width: "18",
				height: "18",
				viewBox: "0 0 24 24",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m1-13h-2v6h2zm0 8h-2v2h2z"
				})
			});
			default: return /* @__PURE__ */ jsx("svg", {
				width: "18",
				height: "18",
				viewBox: "0 0 24 24",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ jsx("path", {
					fill: "currentColor",
					d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
				})
			});
		}
	};
	/**
	* Handle button click.
	*/
	const handleClick = () => {
		onSubmit(authenticator);
	};
	return /* @__PURE__ */ jsx(Button_default, {
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		onClick: handleClick,
		className: buttonClassName,
		startIcon: getIcon(),
		children: getDisplayName$1()
	});
};
var MultiOptionButton_default = MultiOptionButton;

//#endregion
//#region src/components/presentation/auth/SignIn/v1/options/SmsOtp.tsx
/**
* SMS OTP Sign-In Option Component.
* Handles SMS-based OTP authentication.
*/
const SmsOtp = ({ authenticator, formValues, touchedFields, isLoading, onInputChange, inputClassName = "", buttonClassName = "", preferences }) => {
	const { theme } = useTheme_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { setTitle, setSubtitle } = useFlow_default();
	const formFields = authenticator.metadata?.params?.sort((a, b) => a.order - b.order) || [];
	useEffect(() => {
		setTitle(t("sms.otp.heading"));
		setSubtitle(t("sms.otp.subheading"));
	}, [
		setTitle,
		setSubtitle,
		t
	]);
	const hasOtpField = formFields.some((param) => param.param.toLowerCase().includes("otp") || param.param.toLowerCase().includes("code"));
	return /* @__PURE__ */ jsxs(Fragment, { children: [formFields.map((param) => {
		return /* @__PURE__ */ jsx("div", { children: (param.param.toLowerCase().includes("otp") || param.param.toLowerCase().includes("code")) && hasOtpField ? /* @__PURE__ */ jsx(OtpField_default, {
			length: 6,
			value: formValues[param.param] || "",
			onChange: (event) => onInputChange(param.param, event.target.value),
			disabled: isLoading,
			className: inputClassName
		}) : createField({
			className: inputClassName,
			disabled: isLoading,
			label: param.displayName,
			name: param.param,
			onChange: (value) => onInputChange(param.param, value),
			required: authenticator.requiredParams.includes(param.param),
			touched: touchedFields[param.param] || false,
			type: param.type === EmbeddedSignInFlowAuthenticatorParamType.String && param.confidential ? FieldType.Password : FieldType.Text,
			value: formValues[param.param] || ""
		}) }, param.param);
	}), /* @__PURE__ */ jsx(Button_default, {
		fullWidth: true,
		type: "submit",
		color: "primary",
		variant: "solid",
		disabled: isLoading,
		loading: isLoading,
		className: buttonClassName,
		style: { marginBottom: `calc(${theme.vars.spacing.unit} * 2)` },
		children: t("sms.otp.buttons.submit.text")
	})] });
};
var SmsOtp_default = SmsOtp;

//#endregion
//#region src/components/presentation/auth/SignIn/v1/options/SocialButton.tsx
/**
* Social Login Sign-In Option Component.
* Handles authentication with external identity providers (Google, GitHub, etc.).
*/
const SocialLogin = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "outline",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsx("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ jsx("path", {
				fill: "currentColor",
				d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
			})
		}),
		children: t("elements.buttons.social.text", { connection: children })
	});
};
var SocialButton_default = SocialLogin;

//#endregion
//#region src/components/presentation/auth/SignIn/v1/options/Totp.tsx
/**
* TOTP Sign-In Option Component.
* Handles Time-based One-Time Password (TOTP) authentication.
*/
const Totp = ({ authenticator, formValues, touchedFields, isLoading, onInputChange, inputClassName = "", buttonClassName = "", preferences }) => {
	const { theme } = useTheme_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { setTitle, setSubtitle } = useFlow_default();
	const formFields = authenticator.metadata?.params?.sort((a, b) => a.order - b.order) || [];
	useEffect(() => {
		setTitle(t("totp.heading"));
		setSubtitle(t("totp.subheading"));
	}, [
		setTitle,
		setSubtitle,
		t
	]);
	const hasTotpField = formFields.some((param) => param.param.toLowerCase().includes("totp") || param.param.toLowerCase().includes("token"));
	return /* @__PURE__ */ jsxs(Fragment, { children: [formFields.map((param) => {
		return /* @__PURE__ */ jsx("div", { children: (param.param.toLowerCase().includes("totp") || param.param.toLowerCase().includes("token")) && hasTotpField ? /* @__PURE__ */ jsx(OtpField_default, {
			length: 6,
			value: formValues[param.param] || "",
			onChange: (event) => onInputChange(param.param, event.target.value),
			disabled: isLoading,
			className: inputClassName
		}) : createField({
			className: inputClassName,
			disabled: isLoading,
			label: param.displayName,
			name: param.param,
			onChange: (value) => onInputChange(param.param, value),
			required: authenticator.requiredParams.includes(param.param),
			touched: touchedFields[param.param] || false,
			type: param.type === EmbeddedSignInFlowAuthenticatorParamType.String && param.confidential ? FieldType.Password : FieldType.Text,
			value: formValues[param.param] || ""
		}) }, param.param);
	}), /* @__PURE__ */ jsx(Button_default, {
		fullWidth: true,
		type: "submit",
		color: "primary",
		variant: "solid",
		disabled: isLoading,
		loading: isLoading,
		className: buttonClassName,
		style: { marginBottom: `calc(${theme.vars.spacing.unit} * 2)` },
		children: t("totp.buttons.submit.text")
	})] });
};
var Totp_default = Totp;

//#endregion
//#region src/components/presentation/auth/SignIn/v1/options/UsernamePassword.tsx
/**
* Username Password Sign-In Option Component.
* Handles traditional username and password authentication.
*/
const UsernamePassword = ({ authenticator, formValues, touchedFields, isLoading, onInputChange, inputClassName = "", buttonClassName = "", preferences }) => {
	const { theme } = useTheme_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { setTitle, setSubtitle } = useFlow_default();
	const formFields = authenticator.metadata?.params?.sort((a, b) => a.order - b.order)?.filter((param) => param.param !== "totp") || [];
	useEffect(() => {
		setTitle(t("username.password.heading"));
		setSubtitle(t("username.password.subheading"));
	}, [
		setTitle,
		setSubtitle,
		t
	]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [formFields.map((param) => /* @__PURE__ */ jsx("div", { children: createField({
		className: inputClassName,
		disabled: isLoading,
		label: param.displayName,
		name: param.param,
		onChange: (value) => onInputChange(param.param, value),
		placeholder: t(`elements.fields.generic.placeholder`, { field: (param.displayName || param.param).toLowerCase() }),
		required: authenticator.requiredParams.includes(param.param),
		touched: touchedFields[param.param] || false,
		type: param.type === EmbeddedSignInFlowAuthenticatorParamType.String && param.confidential ? FieldType.Password : FieldType.Text,
		value: formValues[param.param] || ""
	}) }, param.param)), /* @__PURE__ */ jsx(Button_default, {
		fullWidth: true,
		type: "submit",
		color: "primary",
		variant: "solid",
		disabled: isLoading,
		loading: isLoading,
		className: buttonClassName,
		"data-testid": "thunderid-signin-submit",
		style: { marginBottom: `calc(${theme.vars.spacing.unit} * 2)` },
		children: t("username.password.buttons.submit.text")
	})] });
};
var UsernamePassword_default = UsernamePassword;

//#endregion
//#region src/components/adapters/FacebookButton.tsx
/**
* Facebook Sign-In Button Component.
* Handles authentication with Facebook identity provider.
*/
const FacebookButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "primary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsxs("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 512 512",
			xmlns: "http://www.w3.org/2000/svg",
			children: [/* @__PURE__ */ jsx("path", {
				fill: "#1976D2",
				d: "M448,0H64C28.704,0,0,28.704,0,64v384c0,35.296,28.704,64,64,64h384c35.296,0,64-28.704,64-64V64C512,28.704,483.296,0,448,0z"
			}), /* @__PURE__ */ jsx("path", {
				fill: "#FAFAFA",
				d: "M432,256h-80v-64c0-17.664,14.336-16,32-16h32V96h-64l0,0c-53.024,0-96,42.976-96,96v64h-64v80h64v176h96V336h48L432,256z"
			})]
		}),
		children: children ?? t("elements.buttons.facebook.text")
	});
};
var FacebookButton_default = FacebookButton;

//#endregion
//#region src/components/adapters/GitHubButton.tsx
/**
* GitHub Sign-In Button Component.
* Handles authentication with GitHub identity provider.
*/
const GitHubButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsx("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 67.91 66.233",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ jsx("g", {
				transform: "translate(-386.96 658.072)",
				children: /* @__PURE__ */ jsx("path", {
					d: "M420.915-658.072a33.956,33.956,0,0,0-33.955,33.955,33.963,33.963,0,0,0,23.221,32.22c1.7.314,2.32-.737,2.32-1.633,0-.81-.031-3.484-.046-6.322-9.446,2.054-11.44-4.006-11.44-4.006-1.545-3.925-3.77-4.968-3.77-4.968-3.081-2.107.232-2.064.232-2.064,3.41.239,5.205,3.5,5.205,3.5,3.028,5.19,7.943,3.69,9.881,2.822a7.23,7.23,0,0,1,2.156-4.54c-7.542-.859-15.47-3.77-15.47-16.781a13.141,13.141,0,0,1,3.5-9.114,12.2,12.2,0,0,1,.329-8.986s2.851-.913,9.34,3.48a32.545,32.545,0,0,1,8.5-1.143,32.629,32.629,0,0,1,8.506,1.143c6.481-4.393,9.328-3.48,9.328-3.48a12.185,12.185,0,0,1,.333,8.986,13.115,13.115,0,0,1,3.495,9.114c0,13.042-7.943,15.913-15.5,16.754,1.218,1.054,2.3,3.12,2.3,6.288,0,4.543-.039,8.2-.039,9.318,0,.9.611,1.962,2.332,1.629a33.959,33.959,0,0,0,23.2-32.215,33.955,33.955,0,0,0-33.955-33.955",
					fill: "#ffffff"
				})
			})
		}),
		children: children ?? t("elements.buttons.github.text")
	});
};
var GitHubButton_default = GitHubButton;

//#endregion
//#region src/components/adapters/GoogleButton.tsx
/**
* Google Sign-In Button Component.
* Handles authentication with Google identity provider.
*/
const GoogleButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsx("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 67.91 67.901",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ jsxs("g", {
				transform: "translate(-0.001 -0.001)",
				children: [
					/* @__PURE__ */ jsx("path", {
						d: "M15.049,160.965l-2.364,8.824-8.639.183a34.011,34.011,0,0,1-.25-31.7h0l7.691,1.41,3.369,7.645a20.262,20.262,0,0,0,.19,13.642Z",
						transform: "translate(0 -119.93)",
						fill: "#fbbb00"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M294.24,208.176A33.939,33.939,0,0,1,282.137,241h0l-9.687-.494-1.371-8.559a20.235,20.235,0,0,0,8.706-10.333H261.628V208.176Z",
						transform: "translate(-226.93 -180.567)",
						fill: "#518ef8"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M81.668,328.8h0a33.962,33.962,0,0,1-51.161-10.387l11-9.006a20.192,20.192,0,0,0,29.1,10.338Z",
						transform: "translate(-26.463 -268.374)",
						fill: "#28b446"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M80.451,7.816l-11,9A20.19,20.19,0,0,0,39.686,27.393l-11.06-9.055h0A33.959,33.959,0,0,1,80.451,7.816Z",
						transform: "translate(-24.828)",
						fill: "#f14336"
					})
				]
			})
		}),
		children: children ?? t("elements.buttons.google.text")
	});
};
var GoogleButton_default = GoogleButton;

//#endregion
//#region src/components/adapters/LinkedInButton.tsx
/**
* LinkedIn Sign-In Button Component.
* Handles authentication with LinkedIn identity provider.
*/
const LinkedInButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsx("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ jsx("path", {
				fill: "#0077B5",
				d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
			})
		}),
		children: children ?? t("elements.buttons.linkedin.text")
	});
};
var LinkedInButton_default = LinkedInButton;

//#endregion
//#region src/components/adapters/MicrosoftButton.tsx
/**
* Microsoft Sign-In Button Component.
* Handles authentication with Microsoft identity provider.
*/
const MicrosoftButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsxs("svg", {
			width: "14",
			height: "14",
			viewBox: "0 0 23 23",
			xmlns: "http://www.w3.org/2000/svg",
			children: [
				/* @__PURE__ */ jsx("path", {
					fill: "#f3f3f3",
					d: "M0 0h23v23H0z"
				}),
				/* @__PURE__ */ jsx("path", {
					fill: "#f35325",
					d: "M1 1h10v10H1z"
				}),
				/* @__PURE__ */ jsx("path", {
					fill: "#81bc06",
					d: "M12 1h10v10H12z"
				}),
				/* @__PURE__ */ jsx("path", {
					fill: "#05a6f0",
					d: "M1 12h10v10H1z"
				}),
				/* @__PURE__ */ jsx("path", {
					fill: "#ffba08",
					d: "M12 12h10v10H12z"
				})
			]
		}),
		children: children ?? t("elements.buttons.microsoft.text")
	});
};
var MicrosoftButton_default = MicrosoftButton;

//#endregion
//#region src/components/adapters/SignInWithEthereumButton.tsx
/**
* Sign In With Ethereum Button Component.
* Handles authentication with Sign In With Ethereum identity provider.
*/
const SignInWithEthereumButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsx("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ jsx("path", {
				fill: "#627EEA",
				d: "M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
			})
		}),
		children: children ?? t("elements.buttons.ethereum.text")
	});
};
var SignInWithEthereumButton_default = SignInWithEthereumButton;

//#endregion
//#region src/components/presentation/auth/SignIn/v1/options/SignInOptionFactory.tsx
/**
* Creates the appropriate sign-in option component based on the authenticator's ID.
*/
const createSignInOption = ({ authenticator, onSubmit, buttonClassName, preferences,...rest }) => {
	const hasParams = authenticator.metadata?.params && authenticator.metadata.params.length > 0;
	switch (authenticator.authenticatorId) {
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.UsernamePassword: return /* @__PURE__ */ jsx(UsernamePassword_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.IdentifierFirst: return /* @__PURE__ */ jsx(IdentifierFirst_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Google: return /* @__PURE__ */ jsx(GoogleButton_default, {
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			preferences,
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.GitHub: return /* @__PURE__ */ jsx(GitHubButton_default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Microsoft: return /* @__PURE__ */ jsx(MicrosoftButton_default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Facebook: return /* @__PURE__ */ jsx(FacebookButton_default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.LinkedIn: return /* @__PURE__ */ jsx(LinkedInButton_default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.SignInWithEthereum: return /* @__PURE__ */ jsx(SignInWithEthereumButton_default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.EmailOtp: return hasParams ? /* @__PURE__ */ jsx(EmailOtp_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		}) : /* @__PURE__ */ jsx(MultiOptionButton_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Totp: return hasParams ? /* @__PURE__ */ jsx(Totp_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		}) : /* @__PURE__ */ jsx(MultiOptionButton_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.SmsOtp: return hasParams ? /* @__PURE__ */ jsx(SmsOtp_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		}) : /* @__PURE__ */ jsx(MultiOptionButton_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		default:
			if (authenticator.idp !== EmbeddedSignInFlowAuthenticatorKnownIdPType.Local) return /* @__PURE__ */ jsx(SocialButton_default, {
				authenticator,
				preferences,
				className: buttonClassName,
				onClick: () => onSubmit(authenticator),
				...rest,
				children: authenticator.idp
			});
			if (hasParams) return /* @__PURE__ */ jsx(UsernamePassword_default, {
				authenticator,
				preferences,
				onSubmit,
				...rest
			});
			return /* @__PURE__ */ jsx(MultiOptionButton_default, {
				authenticator,
				preferences,
				onSubmit,
				...rest
			});
	}
};
/**
* Convenience function that creates the appropriate sign-in option component from an authenticator.
*/
const createSignInOptionFromAuthenticator = (authenticator, formValues, touchedFields, isLoading, onInputChange, onSubmit, options) => createSignInOption({
	authenticator,
	formValues,
	isLoading,
	onInputChange,
	onSubmit,
	touchedFields,
	...options
});

//#endregion
//#region src/components/primitives/Alert/Alert.styles.ts
/**
* Creates styles for the Alert component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param variant - The alert variant
* @returns Object containing CSS class names for component styling
*/
const useStyles$23 = (theme, colorScheme, variant) => useMemo(() => {
	const baseAlert = css`
      padding: calc(${theme.vars.spacing.unit} * 2);
      border-radius: ${theme.vars.borderRadius.medium};
      border: 1px solid;
      font-family: ${theme.vars.typography.fontFamily};
      display: flex;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
      align-items: flex-start;
    `;
	const variantStyles = {
		error: css`
        background-color: color-mix(in srgb, ${theme.vars.colors.error.main} 20%, white);
        border-color: ${theme.vars.colors.error.main};
        color: ${theme.vars.colors.error.main};
      `,
		info: css`
        background-color: color-mix(in srgb, ${theme.vars.colors.info.main} 20%, white);
        border-color: ${theme.vars.colors.info.main};
        color: ${theme.vars.colors.info.main};
      `,
		success: css`
        background-color: color-mix(in srgb, ${theme.vars.colors.success.main} 20%, white);
        border-color: ${theme.vars.colors.success.main};
        color: ${theme.vars.colors.success.main};
      `,
		warning: css`
        background-color: color-mix(in srgb, ${theme.vars.colors.warning.main} 20%, white);
        border-color: ${theme.vars.colors.warning.main};
        color: ${theme.vars.colors.warning.main};
      `
	};
	const iconStyles = css`
      flex-shrink: 0;
      margin-top: calc(${theme.vars.spacing.unit} * 0.25);
      width: calc(${theme.vars.spacing.unit} * 2.5);
      height: calc(${theme.vars.spacing.unit} * 2.5);
      color: ${theme.vars.colors[variant]?.contrastText};
    `;
	const contentStyles = css`
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: ${theme.vars.spacing.unit};
    `;
	const titleStyles = css`
      margin: 0;
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-weight: 600;
      line-height: 1.4;
      color: ${theme.vars.colors[variant]?.contrastText};
    `;
	return {
		alert: baseAlert,
		content: contentStyles,
		description: css`
      margin: 0;
      font-size: ${theme.vars.typography.fontSizes.sm};
      line-height: 1.4;
      color: ${theme.vars.colors.text.secondary};
    `,
		icon: iconStyles,
		title: titleStyles,
		variant: variantStyles[variant]
	};
}, [
	theme,
	colorScheme,
	variant
]);
var Alert_styles_default = useStyles$23;

//#endregion
//#region src/components/primitives/Icons/CircleAlert.tsx
/**
* CircleAlert icon component.
*/
const CircleAlert = (props) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [
		/* @__PURE__ */ jsx("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ jsx("line", {
			x1: "12",
			x2: "12",
			y1: "8",
			y2: "12"
		}),
		/* @__PURE__ */ jsx("line", {
			x1: "12",
			x2: "12.01",
			y1: "16",
			y2: "16"
		})
	]
});
var CircleAlert_default = CircleAlert;

//#endregion
//#region src/components/primitives/Icons/CircleCheck.tsx
/**
* CircleCheck icon component.
*/
const CircleCheck = (props) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [/* @__PURE__ */ jsx("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), /* @__PURE__ */ jsx("path", { d: "m9 12 2 2 4-4" })]
});
var CircleCheck_default = CircleCheck;

//#endregion
//#region src/components/primitives/Icons/Info.tsx
/**
* Info icon component.
*/
const Info = (props) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [
		/* @__PURE__ */ jsx("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}),
		/* @__PURE__ */ jsx("path", { d: "M12 16v-4" }),
		/* @__PURE__ */ jsx("path", { d: "M12 8h.01" })
	]
});
var Info_default = Info;

//#endregion
//#region src/components/primitives/Icons/TriangleAlert.tsx
/**
* TriangleAlert icon component.
*/
const TriangleAlert = (props) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [
		/* @__PURE__ */ jsx("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }),
		/* @__PURE__ */ jsx("path", { d: "M12 9v4" }),
		/* @__PURE__ */ jsx("path", { d: "M12 17h.01" })
	]
});
var TriangleAlert_default = TriangleAlert;

//#endregion
//#region src/components/primitives/Alert/Alert.tsx
const getDefaultIcon = (variant) => {
	switch (variant) {
		case "success": return CircleCheck_default;
		case "error": return CircleAlert_default;
		case "warning": return TriangleAlert_default;
		case "info": return Info_default;
		default: return Info_default;
	}
};
const AlertVariantContext = createContext("info");
const useAlertVariant = () => useContext(AlertVariantContext);
/**
* Alert component that displays important information with different severity levels.
*
* @example
* ```tsx
* <Alert variant="success" showIcon>
*   <Alert.Title>Success! Your changes have been saved</Alert.Title>
*   <Alert.Description>
*     This is an alert with icon, title and description.
*   </Alert.Description>
* </Alert>
* ```
*/
const Alert = forwardRef(({ variant = "info", showIcon = true, children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Alert_styles_default(theme, colorScheme, variant);
	const IconComponent = getDefaultIcon(variant);
	return /* @__PURE__ */ jsx(AlertVariantContext.Provider, {
		value: variant,
		children: /* @__PURE__ */ jsxs("div", {
			ref,
			role: "alert",
			style,
			className: cx(withVendorCSSClassPrefix(bem("alert")), styles["alert"], styles["variant"], withVendorCSSClassPrefix(bem("alert", null, variant)), className),
			...rest,
			children: [showIcon && /* @__PURE__ */ jsx("div", {
				className: cx(withVendorCSSClassPrefix(bem("alert", "icon")), styles["icon"]),
				children: /* @__PURE__ */ jsx(IconComponent, {})
			}), /* @__PURE__ */ jsx("div", {
				className: cx(withVendorCSSClassPrefix(bem("alert", "content")), styles["content"]),
				children
			})]
		})
	});
});
/**
* Alert title component.
*/
const AlertTitle = ({ children, className, style,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Alert_styles_default(theme, colorScheme, useAlertVariant());
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ jsx(Typography_default, {
		component: "h3",
		variant: "h6",
		fontWeight: 600,
		style,
		className: cx(withVendorCSSClassPrefix(bem("alert", "title")), styles["title"], className),
		...filteredRest,
		children
	});
};
/**
* Alert description component.
*/
const AlertDescription = ({ children, className, style,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Alert_styles_default(theme, colorScheme, useAlertVariant());
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ jsx(Typography_default, {
		component: "p",
		variant: "body2",
		style,
		className: cx(withVendorCSSClassPrefix(bem("alert", "description")), styles["description"], className),
		...filteredRest,
		children
	});
};
Alert.displayName = "Alert";
AlertTitle.displayName = "Alert.Title";
AlertDescription.displayName = "Alert.Description";
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
var Alert_default = Alert;

//#endregion
//#region src/components/primitives/Card/Card.styles.ts
/**
* Creates styles for the Card component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param variant - The card variant
* @param clickable - Whether the card is clickable
* @returns Object containing CSS class names for component styling
*/
const useStyles$22 = (theme, colorScheme, variant, clickable) => useMemo(() => {
	const baseCard = css`
      border-radius: ${theme.vars.borderRadius.medium};
      background-color: ${theme.vars.colors.background.surface};
      font-family: ${theme.vars.typography.fontFamily};
      transition: all 0.2s ease-in-out;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	const variantStyles = {
		default: css`
        /* Base styles only */
      `,
		elevated: css`
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: none;
      `,
		outlined: css`
        border: 1px solid ${theme.vars.colors.border};
      `
	};
	const clickableStyles = css`
      cursor: pointer;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `;
	const headerStyles = css`
      padding: 0 calc(${theme.vars.spacing.unit} * 2);
      margin-top: calc(${theme.vars.spacing.unit} * 2);
      display: flex;
      flex-direction: column;
      gap: ${theme.vars.spacing.unit};
    `;
	const titleStyles = css`
      margin: 0;
      /* Typography component will handle color, fontSize, fontWeight, lineHeight */
    `;
	const descriptionStyles = css`
      margin: 0;
      color: ${theme.vars.colors.text.secondary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      line-height: 1.5;
    `;
	const actionStyles = css`
      margin-top: ${theme.vars.spacing.unit};
    `;
	const contentStyles = css`
      padding: 0 calc(${theme.vars.spacing.unit} * 2);
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
      flex: 1;
    `;
	const footerStyles = css`
      padding: 0 calc(${theme.vars.spacing.unit} * 2) calc(${theme.vars.spacing.unit} * 2);
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
    `;
	return {
		action: actionStyles,
		card: baseCard,
		clickable: clickable ? clickableStyles : "",
		content: contentStyles,
		description: descriptionStyles,
		footer: footerStyles,
		header: headerStyles,
		title: titleStyles,
		variant: variantStyles[variant]
	};
}, [
	theme,
	colorScheme,
	variant,
	clickable
]);
var Card_styles_default = useStyles$22;

//#endregion
//#region src/components/primitives/Card/Card.tsx
/**
* Card component that provides a flexible container for content.
*
* @example
* ```tsx
* <Card variant="elevated" clickable>
*   <Card.Header>
*     <Card.Title>Card Title</Card.Title>
*     <Card.Description>Card Description</Card.Description>
*     <Card.Action>
*       <Button variant="link">Action</Button>
*     </Card.Action>
*   </Card.Header>
*   <Card.Content>
*     <p>Card content goes here</p>
*   </Card.Content>
*   <Card.Footer>
*     <Button>Cancel</Button>
*     <Button variant="outline">Submit</Button>
*   </Card.Footer>
* </Card>
* ```
*/
const Card = forwardRef(({ variant = "default", clickable = false, children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, variant, clickable);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("card")), styles["card"], styles["variant"], styles["clickable"], withVendorCSSClassPrefix(bem("card", null, variant)), { [withVendorCSSClassPrefix(bem("card", null, "clickable"))]: clickable }, className),
		...rest,
		children
	});
});
/**
* Card header component that contains the title, description, and optional actions.
*/
const CardHeader = forwardRef(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "header")), styles["header"], className),
		...rest,
		children
	});
});
/**
* Card title component.
*/
const CardTitle = ({ children, level = 3, className, style,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	const getVariantFromLevel = (lvl) => {
		switch (lvl) {
			case 1: return "h1";
			case 2: return "h2";
			case 3: return "h3";
			case 4: return "h4";
			case 5: return "h5";
			case 6: return "h6";
			default: return "h3";
		}
	};
	const getComponentFromLevel = (lvl) => {
		switch (lvl) {
			case 1: return "h1";
			case 2: return "h2";
			case 3: return "h3";
			case 4: return "h4";
			case 5: return "h5";
			case 6: return "h6";
			default: return "h3";
		}
	};
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ jsx(Typography_default, {
		component: getComponentFromLevel(level),
		variant: getVariantFromLevel(level),
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "title")), styles["title"], className),
		fontWeight: 600,
		...filteredRest,
		children
	});
};
/**
* Card description component.
*/
const CardDescription = ({ children, className, style,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	const { color,...filteredRest } = rest;
	return /* @__PURE__ */ jsx(Typography_default, {
		component: "p",
		variant: "body2",
		color: "textSecondary",
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "description")), styles["description"], className),
		...filteredRest,
		children
	});
};
/**
* Card action component for action elements in the header.
*/
const CardAction = forwardRef(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "action")), styles["action"], className),
		...rest,
		children
	});
});
/**
* Card content component that contains the main content of the card.
*/
const CardContent = forwardRef(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "content")), styles["content"], className),
		...rest,
		children
	});
});
/**
* Card footer component that contains footer actions or additional information.
*/
const CardFooter = forwardRef(({ children, className, style,...rest }, ref) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Card_styles_default(theme, colorScheme, "default", false);
	return /* @__PURE__ */ jsx("div", {
		ref,
		style,
		className: cx(withVendorCSSClassPrefix(bem("card", "footer")), styles["footer"], className),
		...rest,
		children
	});
});
Card.displayName = "Card";
CardHeader.displayName = "Card.Header";
CardTitle.displayName = "Card.Title";
CardDescription.displayName = "Card.Description";
CardAction.displayName = "Card.Action";
CardContent.displayName = "Card.Content";
CardFooter.displayName = "Card.Footer";
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Action = CardAction;
Card.Content = CardContent;
Card.Footer = CardFooter;
var Card_default = Card;

//#endregion
//#region src/components/primitives/Divider/Divider.styles.ts
/**
* Creates styles for the Divider component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param orientation - The divider orientation
* @param variant - The divider variant
* @param color - Custom color for the divider
* @param hasChildren - Whether the divider has children (text)
* @returns Object containing CSS class names for component styling
*/
const useStyles$21 = (theme, colorScheme, orientation, variant, color, hasChildren) => useMemo(() => {
	const baseColor = color || theme.colors.border;
	let borderStyle;
	if (variant === "solid") borderStyle = "solid";
	else if (variant === "dashed") borderStyle = "dashed";
	else borderStyle = "dotted";
	const baseDivider = css`
      margin: calc(${theme.vars.spacing.unit} * 2) 0;
    `;
	const verticalDivider = css`
      display: inline-block;
      height: 100%;
      min-height: calc(${theme.vars.spacing.unit} * 2);
      width: 1px;
      border-inline-start: 1px ${borderStyle} ${baseColor};
      margin-block: 0;
      margin-inline: calc(${theme.vars.spacing.unit} * 1);
    `;
	return {
		divider: baseDivider,
		horizontal: css`
      display: flex;
      align-items: center;
      width: 100%;
      ${!hasChildren && css`
        height: 1px;
        border-top: 1px ${borderStyle} ${baseColor};
      `}
    `,
		line: css`
      flex: 1;
      height: 1px;
      border-top: 1px ${borderStyle} ${baseColor};
    `,
		text: css`
      background-color: ${theme.vars.colors.background.surface};
      font-family: ${theme.vars.typography.fontFamily};
      padding: 0 calc(${theme.vars.spacing.unit} * 1);
      white-space: nowrap;
    `,
		vertical: verticalDivider
	};
}, [
	theme,
	colorScheme,
	orientation,
	variant,
	color,
	hasChildren
]);
var Divider_styles_default = useStyles$21;

//#endregion
//#region src/components/primitives/Divider/Divider.tsx
/**
* Divider component for separating content sections.
*
* @example
* ```tsx
* // Basic horizontal divider
* <Divider />
*
* // Divider with text
* <Divider>OR</Divider>
*
* // Vertical divider
* <Divider orientation="vertical" />
*
* // Custom styled divider
* <Divider variant="dashed" color="#ccc">Continue with</Divider>
* ```
*/
const Divider = ({ orientation = "horizontal", variant = "solid", children, color, className, style,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Divider_styles_default(theme, colorScheme, orientation, variant, color, !!children);
	if (orientation === "vertical") return /* @__PURE__ */ jsx("div", {
		className: cx(withVendorCSSClassPrefix(bem("divider")), withVendorCSSClassPrefix(bem("divider", "vertical")), styles["divider"], styles["vertical"], className),
		style,
		role: "separator",
		"aria-orientation": "vertical",
		...rest
	});
	if (children) return /* @__PURE__ */ jsxs("div", {
		className: cx(withVendorCSSClassPrefix(bem("divider")), withVendorCSSClassPrefix(bem("divider", "horizontal")), withVendorCSSClassPrefix(bem("divider", "with-text")), styles["divider"], styles["horizontal"], className),
		style,
		role: "separator",
		"aria-orientation": "horizontal",
		...rest,
		children: [
			/* @__PURE__ */ jsx("div", { className: cx(withVendorCSSClassPrefix(bem("divider", "line")), styles["line"]) }),
			/* @__PURE__ */ jsx(Typography_default, {
				variant: "body2",
				color: "textSecondary",
				className: cx(withVendorCSSClassPrefix(bem("divider", "text")), styles["text"]),
				inline: true,
				children
			}),
			/* @__PURE__ */ jsx("div", { className: cx(withVendorCSSClassPrefix(bem("divider", "line")), styles["line"]) })
		]
	});
	return /* @__PURE__ */ jsx("div", {
		className: cx(withVendorCSSClassPrefix(bem("divider")), withVendorCSSClassPrefix(bem("divider", "horizontal")), styles["divider"], styles["horizontal"], className),
		style,
		role: "separator",
		"aria-orientation": "horizontal",
		...rest
	});
};
var Divider_default = Divider;

//#endregion
//#region src/components/primitives/Logo/Logo.styles.ts
/**
* Creates styles for the Logo component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param size - The size of the logo
* @returns Object containing CSS class names for component styling
*/
const useStyles$20 = (theme, colorScheme, size) => useMemo(() => {
	const baseLogo = css`
      width: auto;
      object-fit: contain;
      display: block;
    `;
	const smallLogo = css`
      height: 32px;
      max-width: 120px;
    `;
	const mediumLogo = css`
      height: 48px;
      max-width: 180px;
    `;
	const largeLogo = css`
      height: 64px;
      max-width: 240px;
    `;
	return {
		large: largeLogo,
		logo: baseLogo,
		medium: mediumLogo,
		size: {
			large: largeLogo,
			medium: mediumLogo,
			small: smallLogo
		}[size],
		small: smallLogo
	};
}, [
	theme,
	colorScheme,
	size
]);
var Logo_styles_default = useStyles$20;

//#endregion
//#region src/components/primitives/Logo/Logo.tsx
/**
* Logo component that displays the brand logo from theme or custom source.
*
* @param props - The props for the Logo component.
* @returns The rendered Logo component.
*/
const Logo = ({ className, src, alt, title, size = "medium" }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Logo_styles_default(theme, colorScheme, size);
	const logoConfig = theme.images?.logo;
	const logoSrc = src || logoConfig?.["url"];
	const logoAlt = alt || logoConfig?.["alt"] || "Logo";
	const logoTitle = title || logoConfig?.["title"];
	if (!logoSrc) return null;
	return /* @__PURE__ */ jsx("img", {
		src: logoSrc,
		alt: logoAlt,
		title: logoTitle,
		className: cx(withVendorCSSClassPrefix(bem("logo")), withVendorCSSClassPrefix(bem("logo", size)), styles["logo"], styles["size"], className)
	});
};
var Logo_default = Logo;

//#endregion
//#region src/components/presentation/auth/SignIn/BaseSignIn.styles.ts
/**
* Creates styles for the BaseSignIn component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$19 = (theme, colorScheme) => useMemo(() => {
	const signIn = css`
      min-width: 420px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const card = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      gap: calc(${theme.vars.spacing.unit} * 2);
      min-width: 420px;
    `;
	const logoContainer = css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const header = css`
      gap: 0;
      align-items: center;
    `;
	const title = css`
      margin: 0 0 calc(${theme.vars.spacing.unit} * 1) 0;
      color: ${theme.vars.colors.text.primary};
    `;
	const subtitle = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `;
	const messagesContainer = css`
      margin-top: calc(${theme.vars.spacing.unit} * 2);
    `;
	const messageItem = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `;
	const errorContainer = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const contentContainer = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const loadingContainer = css`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 4);
    `;
	const loadingText = css`
      margin-top: calc(${theme.vars.spacing.unit} * 2);
      color: ${theme.vars.colors.text.secondary};
    `;
	const divider = css`
      margin: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
	const centeredContainer = css`
      text-align: center;
      padding: calc(${theme.vars.spacing.unit} * 4);
    `;
	const passkeyContainer = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const passkeyText = css`
      margin-top: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `;
	const form = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const formDivider = css`
      margin: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
	const authenticatorSection = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 1);
    `;
	const authenticatorItem = css`
      width: 100%;
    `;
	const noAuthenticatorCard = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	const errorAlert = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const messagesAlert = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `;
	const flowMessagesContainer = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	return {
		authenticatorItem,
		authenticatorSection,
		card,
		centeredContainer,
		contentContainer,
		divider,
		errorAlert,
		errorContainer,
		flowMessageItem: css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `,
		flowMessagesContainer,
		form,
		formDivider,
		header,
		loadingContainer,
		loadingText,
		logoContainer,
		messageItem,
		messagesAlert,
		messagesContainer,
		noAuthenticatorCard,
		passkeyContainer,
		passkeyText,
		signIn,
		subtitle,
		title
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.borderRadius.large,
	theme.vars.spacing.unit,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseSignIn_styles_default = useStyles$19;

//#endregion
//#region src/components/presentation/auth/SignIn/v1/BaseSignIn.tsx
const logger$6 = createPackageComponentLogger("@thunderid/react", "BaseSignIn");
/**
* Check if the authenticator is a passkey/FIDO authenticator
*/
const isPasskeyAuthenticator = (authenticator) => authenticator.authenticatorId === ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Passkey && authenticator.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.InternalPrompt && authenticator.metadata?.additionalData?.challengeData;
/**
* `T3JnYW5pemF0aW9uQXV0aGVudGljYXRvcjpTU08` - OrganizationSSO
*    Currently, `App-Native Authentication` doesn't support organization SSO.
*    Tracker: TODO: Create `product-is` issue for this.
*/
const HIDDEN_AUTHENTICATORS = ["T3JnYW5pemF0aW9uQXV0aGVudGljYXRvcjpTU08"];
/**
* Internal component that consumes FlowContext and renders the sign-in UI.
*/
const BaseSignInContent$1 = ({ afterSignInUrl, onInitialize, isLoading: externalIsLoading, onSubmit, onSuccess, onError, onFlowChange, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", showTitle = true, showSubtitle = true }) => {
	const { theme } = useTheme_default();
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages } = useFlow_default();
	const styles = BaseSignIn_styles_default(theme, theme.vars.colors.text.primary);
	const [isSignInInitializationRequestLoading, setIsSignInInitializationRequestLoading] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const [currentAuthenticator, setCurrentAuthenticator] = useState(null);
	const [error, setError] = useState(null);
	const [messages, setMessages] = useState([]);
	const isLoading = externalIsLoading || isSignInInitializationRequestLoading;
	const reRenderCheckRef = useRef(false);
	const { values: formValues, touched: touchedFields, setValue: setFormValue, setTouched: setFormTouched, validateForm, touchAllFields, reset: resetForm } = useForm({
		fields: currentAuthenticator?.metadata?.params?.map((param) => ({
			initialValue: "",
			name: param.param,
			required: currentAuthenticator.requiredParams.includes(param.param),
			validator: (value) => {
				if (currentAuthenticator.requiredParams.includes(param.param) && (!value || value.trim() === "")) return t("validations.required.field.error");
				return null;
			}
		})) || [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: false
	});
	/**
	* Setup form fields based on the current authenticator.
	*/
	const setupFormFields = useCallback((authenticator) => {
		const initialValues = {};
		authenticator.metadata?.params?.forEach((param) => {
			initialValues[param.param] = "";
		});
		resetForm();
		Object.keys(initialValues).forEach((key) => {
			setFormValue(key, initialValues[key]);
		});
	}, [resetForm, setFormValue]);
	/**
	* Check if the response contains a redirection URL and perform the redirect if necessary.
	* @param response - The authentication response
	* @returns true if a redirect was performed, false otherwise
	*/
	const handleRedirectionIfNeeded = (response) => {
		if (response && "nextStep" in response && response.nextStep && response.nextStep.stepType === EmbeddedSignInFlowStepType.AuthenticatorPrompt && response.nextStep.authenticators?.length === 1) {
			const responseAuthenticator = response.nextStep.authenticators[0];
			if (responseAuthenticator.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.RedirectionPrompt && responseAuthenticator.metadata?.additionalData?.redirectUrl) {
				/**
				* Open a popup window to handle redirection prompts
				*/
				const redirectUrl = responseAuthenticator.metadata?.additionalData?.redirectUrl;
				const popup = window.open(redirectUrl, "oauth_popup", "width=500,height=600,scrollbars=yes,resizable=yes");
				if (!popup) {
					logger$6.error("Failed to open popup window");
					return false;
				}
				/**
				* Forward declarations for mutually referencing variables.
				* `messageHandler`, `cleanup`, and `popupMonitor` reference each other,
				* so they are declared with `let` first and assigned below.
				*/
				let messageHandler;
				let popupMonitor;
				const cleanup = () => {
					window.removeEventListener("message", messageHandler);
					if (popupMonitor) clearInterval(popupMonitor);
				};
				/**
				* Add an event listener to the window to capture the message from the popup
				*/
				messageHandler = async function messageEventHandler(event) {
					/**
					* Check if the message is from our popup window
					*/
					if (event.source !== popup) {
						if (event.source !== window && event.source !== window.parent) {}
						return;
					}
					/**
					* Check the origin of the message to ensure it's from a trusted source
					*/
					const expectedOrigin = afterSignInUrl ? new URL(afterSignInUrl).origin : window.location.origin;
					if (event.origin !== expectedOrigin && event.origin !== window.location.origin) return;
					const { code, state } = event.data;
					if (code && state) {
						await onSubmit({
							flowId: currentFlow.flowId,
							selectedAuthenticator: {
								authenticatorId: responseAuthenticator.authenticatorId,
								params: {
									code,
									state
								}
							}
						}, {
							method: currentFlow?.links[0].method,
							url: currentFlow?.links[0].href
						});
						popup.close();
						cleanup();
					}
				};
				window.addEventListener("message", messageHandler);
				/**
				* Monitor popup for closure and URL changes
				*/
				let hasProcessedCallback = false;
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
									logger$6.error("OAuth error:");
									popup.close();
									cleanup();
									return;
								}
								if (code && state) {
									const submitResponse = await onSubmit({
										flowId: currentFlow.flowId,
										selectedAuthenticator: {
											authenticatorId: responseAuthenticator.authenticatorId,
											params: {
												code,
												state
											}
										}
									}, {
										method: currentFlow?.links[0].method,
										url: currentFlow?.links[0].href
									});
									popup.close();
									onFlowChange?.(submitResponse);
									if (submitResponse?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) onSuccess?.(submitResponse.authData);
								}
							}
						} catch (e) {}
					} catch (e) {
						logger$6.error("Error monitoring popup:");
					}
				}, 1e3);
				return true;
			}
		}
		return false;
	};
	/**
	* Handle form submission.
	*/
	const handleSubmit = async (submittedValues) => {
		if (!currentFlow || !currentAuthenticator) return;
		touchAllFields();
		if (!validateForm().isValid) return;
		setIsSignInInitializationRequestLoading(true);
		setError(null);
		setMessages([]);
		try {
			const response = await onSubmit({
				flowId: currentFlow.flowId,
				selectedAuthenticator: {
					authenticatorId: currentAuthenticator.authenticatorId,
					params: submittedValues
				}
			}, {
				method: currentFlow?.links[0].method,
				url: currentFlow?.links[0].href
			});
			onFlowChange?.(response);
			if (response?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
				onSuccess?.(response.authData);
				return;
			}
			if (response?.flowStatus === EmbeddedSignInFlowStatus$1.FailCompleted || response?.flowStatus === EmbeddedSignInFlowStatus$1.FailIncomplete) {
				setError(t("errors.signin.flow.completion.failure"));
				return;
			}
			if (handleRedirectionIfNeeded(response)) return;
			if (response && "flowId" in response && "nextStep" in response) {
				const nextStepResponse = response;
				setCurrentFlow(nextStepResponse);
				if (nextStepResponse.nextStep?.authenticators?.length > 0) if (nextStepResponse.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && nextStepResponse.nextStep.authenticators.length > 1) setCurrentAuthenticator(null);
				else {
					const nextAuthenticator = nextStepResponse.nextStep.authenticators[0];
					setCurrentAuthenticator(nextAuthenticator);
					setupFormFields(nextAuthenticator);
				}
				if (nextStepResponse.nextStep?.messages) setMessages(nextStepResponse.nextStep.messages.map((msg) => ({
					message: msg.message || "",
					type: msg.type || "INFO"
				})));
			}
		} catch (err) {
			setError(err instanceof ThunderIDAPIError ? err.message : t("errors.signin.flow.failure"));
			onError?.(err);
		} finally {
			setIsSignInInitializationRequestLoading(false);
		}
	};
	/**
	* Handle authenticator selection for multi-option prompts.
	*/
	const handleAuthenticatorSelection = async (authenticator, formData) => {
		if (!currentFlow) return;
		if (formData) touchAllFields();
		setIsSignInInitializationRequestLoading(true);
		setError(null);
		setMessages([]);
		try {
			if (isPasskeyAuthenticator(authenticator)) try {
				const challengeData = authenticator.metadata?.additionalData?.challengeData;
				if (!challengeData) throw new Error("Missing challenge data for passkey authentication");
				const tokenResponse = await handleWebAuthnAuthentication(challengeData);
				const response = await onSubmit({
					flowId: currentFlow.flowId,
					selectedAuthenticator: {
						authenticatorId: authenticator.authenticatorId,
						params: { tokenResponse }
					}
				}, {
					method: currentFlow?.links[0].method,
					url: currentFlow?.links[0].href
				});
				onFlowChange?.(response);
				if (response?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
					onSuccess?.(response.authData);
					return;
				}
				if (response?.flowStatus === EmbeddedSignInFlowStatus$1.FailCompleted || response?.flowStatus === EmbeddedSignInFlowStatus$1.FailIncomplete) {
					setError(t("errors.signin.flow.passkeys.completion.failure"));
					return;
				}
				if (response && "flowId" in response && "nextStep" in response) {
					const nextStepResponse = response;
					setCurrentFlow(nextStepResponse);
					if (nextStepResponse.nextStep?.authenticators?.length > 0) if (nextStepResponse.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && nextStepResponse.nextStep.authenticators.length > 1) setCurrentAuthenticator(null);
					else {
						const nextAuthenticator = nextStepResponse.nextStep.authenticators[0];
						if (isPasskeyAuthenticator(nextAuthenticator)) {
							handleAuthenticatorSelection(nextAuthenticator);
							return;
						}
						setCurrentAuthenticator(nextAuthenticator);
						setupFormFields(nextAuthenticator);
					}
					if (nextStepResponse.nextStep?.messages) setMessages(nextStepResponse.nextStep.messages.map((msg) => ({
						message: msg.message || "",
						type: msg.type || "INFO"
					})));
				}
			} catch (passkeyError) {
				logger$6.error("Passkey authentication error:");
				let errorMessage = passkeyError instanceof Error ? passkeyError.message : t("errors.signin.flow.passkeys.failure");
				if (passkeyError instanceof Error && passkeyError.message.includes("security")) errorMessage += " This may be due to browser security settings, an insecure connection, or device restrictions.";
				setError(errorMessage);
			}
			else if (authenticator.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.RedirectionPrompt) {
				const response = await onSubmit({
					flowId: currentFlow.flowId,
					selectedAuthenticator: {
						authenticatorId: authenticator.authenticatorId,
						params: {}
					}
				}, {
					method: currentFlow?.links[0].method,
					url: currentFlow?.links[0].href
				});
				onFlowChange?.(response);
				if (response?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
					onSuccess?.(response.authData);
					return;
				}
				if (handleRedirectionIfNeeded(response)) {}
			} else if (formData) {
				if (!validateForm().isValid) return;
				const formResponse = await onSubmit({
					flowId: currentFlow.flowId,
					selectedAuthenticator: {
						authenticatorId: authenticator.authenticatorId,
						params: formData
					}
				}, {
					method: currentFlow?.links[0].method,
					url: currentFlow?.links[0].href
				});
				onFlowChange?.(formResponse);
				if (formResponse?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
					onSuccess?.(formResponse.authData);
					return;
				}
				if (formResponse?.flowStatus === EmbeddedSignInFlowStatus$1.FailCompleted || formResponse?.flowStatus === EmbeddedSignInFlowStatus$1.FailIncomplete) {
					setError("Authentication failed. Please check your credentials and try again.");
					return;
				}
				if (handleRedirectionIfNeeded(formResponse)) return;
				if (formResponse && "flowId" in formResponse && "nextStep" in formResponse) {
					const nextStepResponse = formResponse;
					setCurrentFlow(nextStepResponse);
					if (nextStepResponse.nextStep?.authenticators?.length > 0) if (nextStepResponse.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && nextStepResponse.nextStep.authenticators.length > 1) setCurrentAuthenticator(null);
					else {
						const nextAuthenticator = nextStepResponse.nextStep.authenticators[0];
						if (isPasskeyAuthenticator(nextAuthenticator)) {
							handleAuthenticatorSelection(nextAuthenticator);
							return;
						}
						setCurrentAuthenticator(nextAuthenticator);
						setupFormFields(nextAuthenticator);
					}
					if (nextStepResponse.nextStep?.messages) setMessages(nextStepResponse.nextStep.messages.map((msg) => ({
						message: msg.message || "",
						type: msg.type || "INFO"
					})));
				}
			} else if (!(authenticator.metadata?.params && authenticator.metadata.params.length > 0)) {
				const response = await onSubmit({
					flowId: currentFlow.flowId,
					selectedAuthenticator: {
						authenticatorId: authenticator.authenticatorId,
						params: {}
					}
				}, {
					method: currentFlow?.links[0].method,
					url: currentFlow?.links[0].href
				});
				onFlowChange?.(response);
				if (response?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
					onSuccess?.(response.authData);
					return;
				}
				if (response?.flowStatus === EmbeddedSignInFlowStatus$1.FailCompleted || response?.flowStatus === EmbeddedSignInFlowStatus$1.FailIncomplete) {
					setError("Authentication failed. Please try again.");
					return;
				}
				if (handleRedirectionIfNeeded(response)) return;
				if (response && "flowId" in response && "nextStep" in response) {
					const nextStepResponse = response;
					setCurrentFlow(nextStepResponse);
					if (nextStepResponse.nextStep?.authenticators?.length > 0) if (nextStepResponse.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && nextStepResponse.nextStep.authenticators.length > 1) setCurrentAuthenticator(null);
					else {
						const nextAuthenticator = nextStepResponse.nextStep.authenticators[0];
						if (isPasskeyAuthenticator(nextAuthenticator)) {
							handleAuthenticatorSelection(nextAuthenticator);
							return;
						}
						setCurrentAuthenticator(nextAuthenticator);
						setupFormFields(nextAuthenticator);
					}
					if (nextStepResponse.nextStep?.messages) setMessages(nextStepResponse.nextStep.messages.map((msg) => ({
						message: msg.message || "",
						type: msg.type || "INFO"
					})));
				}
			} else {
				setCurrentAuthenticator(authenticator);
				setupFormFields(authenticator);
			}
		} catch (err) {
			setError(err instanceof ThunderIDAPIError ? err?.message : "Authenticator selection failed");
			onError?.(err);
		} finally {
			setIsSignInInitializationRequestLoading(false);
		}
	};
	/**
	* Handle input value changes.
	*/
	const handleInputChange = (param, value) => {
		setFormValue(param, value);
		setFormTouched(param, true);
	};
	/**
	* Check if current flow has multiple authenticator options.
	*/
	const hasMultipleOptions = useCallback(() => !!(currentFlow && "nextStep" in currentFlow && currentFlow.nextStep?.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && currentFlow.nextStep?.authenticators && currentFlow.nextStep.authenticators.length > 1), [currentFlow]);
	/**
	* Get available authenticators for selection.
	*/
	const getAvailableAuthenticators = useCallback(() => {
		if (!currentFlow || !("nextStep" in currentFlow) || !currentFlow.nextStep?.authenticators) return [];
		return currentFlow.nextStep.authenticators;
	}, [currentFlow]);
	const containerClasses = cx([
		withVendorCSSClassPrefix("signin"),
		withVendorCSSClassPrefix(`signin--${size}`),
		withVendorCSSClassPrefix(`signin--${variant}`)
	], className);
	const inputClasses = cx([
		withVendorCSSClassPrefix("signin__input"),
		size === "small" && withVendorCSSClassPrefix("signin__input--small"),
		size === "large" && withVendorCSSClassPrefix("signin__input--large")
	], inputClassName);
	const buttonClasses = cx([
		withVendorCSSClassPrefix("signin__button"),
		size === "small" && withVendorCSSClassPrefix("signin__button--small"),
		size === "large" && withVendorCSSClassPrefix("signin__button--large")
	], buttonClassName);
	const errorClasses = cx([withVendorCSSClassPrefix("signin__error")], errorClassName);
	const messageClasses = cx([withVendorCSSClassPrefix("signin__messages")], messageClassName);
	useEffect(() => {
		if (isLoading) return;
		if (reRenderCheckRef.current) return;
		reRenderCheckRef.current = true;
		(async () => {
			setIsSignInInitializationRequestLoading(true);
			setError(null);
			try {
				const response = await onInitialize?.();
				setCurrentFlow(response);
				setIsInitialized(true);
				onFlowChange?.(response);
				if (response?.flowStatus === EmbeddedSignInFlowStatus$1.SuccessCompleted) {
					onSuccess?.(response.authData || {});
					return;
				}
				if (response?.nextStep?.authenticators?.length > 0) if (response.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && response.nextStep.authenticators.length > 1) setCurrentAuthenticator(null);
				else {
					const authenticator = response.nextStep.authenticators[0];
					setCurrentAuthenticator(authenticator);
					setupFormFields(authenticator);
				}
				if (response && "nextStep" in response && response.nextStep && "messages" in response.nextStep) setMessages((response.nextStep.messages || []).map((msg) => ({
					message: msg.message || "",
					type: msg.type || "INFO"
				})));
			} catch (err) {
				setError(err instanceof ThunderIDAPIError ? err.message : t("errors.signin.initialization"));
				onError?.(err);
			} finally {
				setIsSignInInitializationRequestLoading(false);
			}
		})();
	}, [isLoading]);
	if (!isInitialized && isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles["card"]),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs("div", {
			className: styles["loadingContainer"],
			children: [/* @__PURE__ */ jsx(Spinner_default, { size: "medium" }), /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles["loadingText"],
				children: t("messages.loading.placeholder")
			})]
		}) })
	});
	if (hasMultipleOptions() && !currentAuthenticator) {
		const availableAuthenticators = getAvailableAuthenticators();
		const userPromptAuthenticators = availableAuthenticators.filter((auth) => auth.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.UserPrompt || auth.idp === "LOCAL" && auth.metadata?.params && auth.metadata.params.length > 0);
		const optionAuthenticators = availableAuthenticators.filter((auth) => !userPromptAuthenticators.includes(auth)).filter((authenticator) => !HIDDEN_AUTHENTICATORS.includes(authenticator.authenticatorId));
		return /* @__PURE__ */ jsxs(Card_default, {
			className: cx(containerClasses, styles["card"]),
			"data-testid": "thunderid-signin",
			variant,
			children: [(showTitle || showSubtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
				className: styles["header"],
				children: [showTitle && /* @__PURE__ */ jsx(Card_default.Title, {
					level: 2,
					className: styles["title"],
					children: flowTitle || t("signin.heading")
				}), showSubtitle && /* @__PURE__ */ jsx(Typography_default, {
					variant: "body1",
					className: styles["subtitle"],
					children: flowSubtitle || t("signin.subheading")
				})]
			}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [
				flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
					className: styles["flowMessagesContainer"],
					children: flowMessages.map((flowMessage, index) => /* @__PURE__ */ jsx(Alert_default, {
						variant: flowMessage.type,
						className: cx(styles["flowMessageItem"], messageClasses),
						children: /* @__PURE__ */ jsx(Alert_default.Description, { children: flowMessage.message })
					}, flowMessage.id || index))
				}),
				messages.length > 0 && /* @__PURE__ */ jsx("div", {
					className: styles["messagesContainer"],
					children: messages.map((message, index) => {
						let messageVariant;
						const lowerType = message.type.toLowerCase();
						if (lowerType === "error") messageVariant = "error";
						else if (lowerType === "warning") messageVariant = "warning";
						else if (lowerType === "success") messageVariant = "success";
						else messageVariant = "info";
						return /* @__PURE__ */ jsx(Alert_default, {
							variant: messageVariant,
							className: cx(styles["messageItem"], messageClasses),
							children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
						}, index);
					})
				}),
				error && /* @__PURE__ */ jsxs(Alert_default, {
					variant: "error",
					className: cx(styles["errorContainer"], errorClasses),
					children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: "Error" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: error })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: styles["contentContainer"],
					children: [
						userPromptAuthenticators.map((authenticator, index) => /* @__PURE__ */ jsxs("div", {
							className: styles["authenticatorItem"],
							children: [index > 0 && /* @__PURE__ */ jsx(Divider_default, {
								className: styles["divider"],
								children: "OR"
							}), /* @__PURE__ */ jsx("form", {
								className: styles["form"],
								onSubmit: (e) => {
									e.preventDefault();
									const formData = {};
									authenticator.metadata?.params?.forEach((param) => {
										formData[param.param] = formValues[param.param] || "";
									});
									handleAuthenticatorSelection(authenticator, formData);
								},
								children: createSignInOptionFromAuthenticator(authenticator, formValues, touchedFields, isLoading, handleInputChange, (auth, formData) => handleAuthenticatorSelection(auth, formData), {
									buttonClassName: buttonClasses,
									error,
									inputClassName: inputClasses
								})
							})]
						}, authenticator.authenticatorId)),
						userPromptAuthenticators.length > 0 && optionAuthenticators.length > 0 && /* @__PURE__ */ jsx(Divider_default, {
							className: styles["divider"],
							children: "OR"
						}),
						optionAuthenticators.map((authenticator) => /* @__PURE__ */ jsx("div", {
							className: styles["authenticatorItem"],
							children: createSignInOptionFromAuthenticator(authenticator, formValues, touchedFields, isLoading, handleInputChange, (auth, formData) => handleAuthenticatorSelection(auth, formData), {
								buttonClassName: buttonClasses,
								error,
								inputClassName: inputClasses
							})
						}, authenticator.authenticatorId))
					]
				})
			] })]
		});
	}
	if (!currentAuthenticator) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles["noAuthenticatorCard"]),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: error && /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			className: styles["errorAlert"],
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") || "Error" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: error })]
		}) })
	});
	if (isPasskeyAuthenticator(currentAuthenticator) && !isLoading) {
		useEffect(() => {
			handleAuthenticatorSelection(currentAuthenticator);
		}, [currentAuthenticator]);
		return /* @__PURE__ */ jsx(Card_default, {
			className: cx(containerClasses, styles["card"]),
			"data-testid": "thunderid-signin",
			variant,
			children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs("div", {
				className: styles["centeredContainer"],
				children: [
					/* @__PURE__ */ jsx("div", {
						className: styles["passkeyContainer"],
						children: /* @__PURE__ */ jsx(Spinner_default, { size: "large" })
					}),
					/* @__PURE__ */ jsx(Typography_default, {
						variant: "body1",
						children: t("passkey.authenticating") || "Authenticating with passkey..."
					}),
					/* @__PURE__ */ jsx(Typography_default, {
						variant: "body2",
						className: styles["passkeyText"],
						children: t("passkey.instruction") || "Please use your fingerprint, face, or security key to authenticate."
					})
				]
			}) })
		});
	}
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(containerClasses, styles["card"]),
		"data-testid": "thunderid-signin",
		variant,
		children: [/* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles["header"],
			children: [
				/* @__PURE__ */ jsx(Card_default.Title, {
					level: 2,
					className: styles["title"],
					children: flowTitle || t("signin.heading")
				}),
				/* @__PURE__ */ jsx(Typography_default, {
					variant: "body1",
					className: styles["subtitle"],
					children: flowSubtitle || t("signin.subheading")
				}),
				flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
					className: styles["flowMessagesContainer"],
					children: flowMessages.map((flowMessage, index) => /* @__PURE__ */ jsx(Alert_default, {
						variant: flowMessage.type,
						className: cx(styles["flowMessageItem"], messageClasses),
						children: /* @__PURE__ */ jsx(Alert_default.Description, { children: flowMessage.message })
					}, flowMessage.id || index))
				}),
				messages.length > 0 && /* @__PURE__ */ jsx("div", {
					className: styles["messagesContainer"],
					children: messages.map((message, index) => {
						return /* @__PURE__ */ jsx(Alert_default, {
							variant: {
								error: "error",
								success: "success",
								warning: "warning"
							}[message.type.toLowerCase()] || "info",
							className: cx(styles["messageItem"], messageClasses),
							children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
						}, index);
					})
				})
			]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [error && /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			className: cx(styles["errorContainer"], errorClasses),
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") }), /* @__PURE__ */ jsx(Alert_default.Description, { children: error })]
		}), /* @__PURE__ */ jsx("form", {
			className: styles["form"],
			onSubmit: (e) => {
				e.preventDefault();
				const formData = {};
				currentAuthenticator.metadata?.params?.forEach((param) => {
					formData[param.param] = formValues[param.param] || "";
				});
				handleSubmit(formData);
			},
			children: createSignInOptionFromAuthenticator(currentAuthenticator, formValues, touchedFields, isLoading, handleInputChange, (authenticator, formData) => handleSubmit(formData || formValues), {
				buttonClassName: buttonClasses,
				error,
				inputClassName: inputClasses
			})
		})] })]
	});
};
/**
* Base SignIn component that provides native authentication flow.
* This component handles both the presentation layer and authentication flow logic.
* It accepts API functions as props to maintain framework independence.
*
* @example
* ```tsx
* import { BaseSignIn } from '@thunderid/react';
*
* const MySignIn = () => {
*   return (
*     <BaseSignIn
*       onInitialize={async () => {
*         // Your API call to initialize authentication
*         return await initializeAuth();
*       }}
*       onSubmit={async (payload) => {
*         // Your API call to handle authentication
*         return await handleAuth(payload);
*       }}
*       onSuccess={(authData) => {
*         console.log('Success:', authData);
*       }}
*       onError={(error) => {
*         console.error('Error:', error);
*       }}
*       className="max-w-md mx-auto"
*     />
*   );
* };
* ```
*/
const BaseSignIn$2 = ({ showLogo = true,...rest }) => {
	const { theme } = useTheme_default();
	const styles = BaseSignIn_styles_default(theme, theme.vars.colors.text.primary);
	return /* @__PURE__ */ jsxs("div", { children: [showLogo && /* @__PURE__ */ jsx("div", {
		className: styles["logoContainer"],
		children: /* @__PURE__ */ jsx(Logo_default, { size: "large" })
	}), /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseSignInContent$1, {
		showLogo,
		...rest
	}) })] });
};
var BaseSignIn_default$2 = BaseSignIn$2;

//#endregion
//#region src/utils/v2/resolveTranslationsInObject.ts
/**
* Resolves all {{ t() }} and {{ meta() }} template expressions in an object's string properties.
* @param obj - The object to process
* @param t - The translation function from useTranslation
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
		if (resolved[prop] && typeof resolved[prop] === "string") resolved[prop] = resolveFlowTemplateLiterals$1(resolved[prop], {
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
* @param t - The translation function from useTranslation
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
* This handles cases where meta.components use 'ref' to reference inputs,
* and data.inputs contain the actual 'identifier' field.
*
* @param response - The flow response object
* @returns Map of ref to identifier
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
* This handles cases where meta.components reference actions by ref,
* and data.actions contain the actual nextNode field for routing.
*
* @param response - The flow response object
* @returns Map of action ref to nextNode
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
* This ensures that component.ref values are mapped to the correct identifier
* from data.inputs, enabling proper form submission.
*
* @param components - Array of components to transform
* @param refMapping - Map of ref to identifier
* @param actionMapping - Map of action ref to nextNode
* @param inputsData - Array of input data for resolving SELECT options
* @returns Transformed components with correct identifiers and action references
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
* This function extracts components from the response meta structure and optionally resolves
* any translation strings within them. It also handles mapping of input refs to identifiers
* and action refs to nextNode values.
*
* @param response - The flow response object containing components in meta structure
* @param t - Translation function from useTranslation hook
* @param resolveTranslations - Whether to resolve translation strings or keep them as i18n keys (default: true)
* @returns Array of flow components with resolved or unresolved translations
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
*
* @param error - The error response object
* @param t - Translation function for fallback messages
* @param defaultErrorKey - Default translation key for generic errors
* @returns Extracted error message or fallback
*/
const extractErrorMessage = (error, t, defaultErrorKey = "errors.flow.generic") => {
	if (error && typeof error === "object" && error.failureReason) return error.failureReason;
	if (error instanceof Error && error.message) return error.message;
	return t(defaultErrorKey);
};
/**
* Check if a response is an error response and extract the error message.
* This function identifies error responses by checking for ERROR status and failure reasons.
*
* @param response - The flow response to check
* @param t - Translation function for error messages
* @param defaultErrorKey - Default translation key for generic errors
* @returns Error message string if response is an error, null otherwise
*/
const checkForErrorResponse = (response, t, defaultErrorKey = "errors.flow.generic") => {
	if (response?.flowStatus === "ERROR") return extractErrorMessage(response, t, defaultErrorKey);
	return null;
};
/**
* Generic flow response normalizer that handles both success and error responses.
* This is the main transformer function that should be used by all flow components.
*
* @param response - The raw flow response from the API
* @param t - Translation function from useTranslation hook
* @param options - Configuration options for transformation behavior
* @returns Normalized flow response with executionId and transformed components
* @throws {any} The original response if it's an error and throwOnError is true
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
//#region src/components/presentation/auth/OrganizationUnitPicker/v2/OrganizationUnitPicker.styles.ts
const useStyles$18 = (theme) => useMemo(() => {
	const container = css`
      display: flex;
      flex-direction: column;
      width: 100%;
      max-height: 320px;
      overflow-y: auto;
      border: 1px solid ${theme.vars.colors.border};
      border-radius: ${theme.vars.borderRadius.medium};
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const node = css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 1) calc(${theme.vars.spacing.unit} * 1.5);
      cursor: pointer;
      user-select: none;
      transition: background-color 0.15s ease;

      &:hover {
        background-color: ${theme.vars.colors.action.hover};
      }
    `;
	const nodeSelected = css`
      background-color: ${theme.vars.colors.action.selected};

      &:hover {
        background-color: ${theme.vars.colors.action.selected};
      }
    `;
	const toggleButton = css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      margin-right: calc(${theme.vars.spacing.unit} * 0.5);
      color: ${theme.vars.colors.text.secondary};
      font-size: 12px;
      flex-shrink: 0;
    `;
	const togglePlaceholder = css`
      width: 20px;
      height: 20px;
      margin-right: calc(${theme.vars.spacing.unit} * 0.5);
      flex-shrink: 0;
    `;
	const nodeName = css`
      font-size: 14px;
      color: ${theme.vars.colors.text.primary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
	return {
		container,
		loadMoreButton: css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 0.75) calc(${theme.vars.spacing.unit} * 1.5);
      border: none;
      background: none;
      cursor: pointer;
      color: ${theme.vars.colors.primary.main};
      font-size: 13px;
      font-family: ${theme.vars.typography.fontFamily};

      &:hover {
        text-decoration: underline;
      }
    `,
		loadingPlaceholder: css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 1) calc(${theme.vars.spacing.unit} * 1.5);
      gap: calc(${theme.vars.spacing.unit} * 1);
    `,
		node,
		nodeName,
		nodeSelected,
		skeleton: css`
      height: 14px;
      border-radius: ${theme.vars.borderRadius.small};
      background-color: ${theme.vars.colors.background.disabled};
      animation: pulse 1.5s ease-in-out infinite;

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
      }
    `,
		toggleButton,
		togglePlaceholder
	};
}, [
	theme.vars.colors.action.hover,
	theme.vars.colors.action.selected,
	theme.vars.colors.background.disabled,
	theme.vars.colors.border,
	theme.vars.colors.primary.main,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.borderRadius.medium,
	theme.vars.borderRadius.small,
	theme.vars.spacing.unit,
	theme.vars.typography.fontFamily
]);
var OrganizationUnitPicker_styles_default = useStyles$18;

//#endregion
//#region src/components/presentation/auth/OrganizationUnitPicker/v2/OrganizationUnitPicker.tsx
const OrganizationUnitPicker = ({ rootOuId, selectedOuId, onSelect, fetchChildren, pageSize = 10, className }) => {
	const { theme } = useTheme_default();
	const styles = OrganizationUnitPicker_styles_default(theme);
	const [nodeStates, setNodeStates] = useState({});
	const loadChildren = useCallback(async (parentId, offset$1 = 0) => {
		setNodeStates((prev) => ({
			...prev,
			[parentId]: {
				...prev[parentId] || {
					children: [],
					expanded: true,
					hasMore: false,
					offset: 0,
					totalResults: 0
				},
				loading: true
			}
		}));
		try {
			const response = await fetchChildren(parentId, pageSize, offset$1);
			const newChildren = response.organizationUnits || [];
			setNodeStates((prev) => {
				const existing = prev[parentId] || {
					children: [],
					expanded: true,
					hasMore: false,
					loading: false,
					offset: 0,
					totalResults: 0
				};
				const mergedChildren = offset$1 === 0 ? newChildren : [...existing.children, ...newChildren];
				const newOffset = offset$1 + newChildren.length;
				return {
					...prev,
					[parentId]: {
						children: mergedChildren,
						expanded: true,
						hasMore: newOffset < response.totalResults,
						loading: false,
						offset: newOffset,
						totalResults: response.totalResults
					}
				};
			});
		} catch {
			setNodeStates((prev) => ({
				...prev,
				[parentId]: {
					...prev[parentId] || {
						children: [],
						expanded: true,
						hasMore: false,
						offset: 0,
						totalResults: 0
					},
					loading: false
				}
			}));
		}
	}, [fetchChildren, pageSize]);
	useEffect(() => {
		if (rootOuId && !nodeStates[rootOuId]) loadChildren(rootOuId);
	}, [
		rootOuId,
		loadChildren,
		nodeStates
	]);
	const handleToggle = useCallback((ouId) => {
		const state = nodeStates[ouId];
		if (state?.expanded) setNodeStates((prev) => ({
			...prev,
			[ouId]: {
				...prev[ouId],
				expanded: false
			}
		}));
		else if (state?.children.length) setNodeStates((prev) => ({
			...prev,
			[ouId]: {
				...prev[ouId],
				expanded: true
			}
		}));
		else loadChildren(ouId);
	}, [nodeStates, loadChildren]);
	const handleLoadMore = useCallback((parentId) => {
		const state = nodeStates[parentId];
		if (state) loadChildren(parentId, state.offset);
	}, [nodeStates, loadChildren]);
	const renderLoadingPlaceholders = (depth) => /* @__PURE__ */ jsx(Fragment, { children: [
		0,
		1,
		2
	].map((i) => /* @__PURE__ */ jsx("div", {
		className: styles["loadingPlaceholder"],
		style: { paddingLeft: `${(depth + 1) * 20}px` },
		children: /* @__PURE__ */ jsx("div", {
			className: styles["skeleton"],
			style: { width: `${100 - i * 20}px` }
		})
	}, `skeleton-${i}`)) });
	const renderNode = (ou, depth = 0) => {
		const state = nodeStates[ou.id];
		const isSelected = selectedOuId === ou.id;
		const isExpanded = state?.expanded || false;
		const isLoading = state?.loading || false;
		const hasChildren = !state || state.totalResults > 0 || state.children.length > 0;
		return /* @__PURE__ */ jsxs(React.Fragment, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: cx(styles["node"], isSelected && styles["nodeSelected"]),
				style: { paddingLeft: `${depth * 20 + 12}px` },
				role: "treeitem",
				"aria-selected": isSelected,
				"aria-expanded": hasChildren ? isExpanded : void 0,
				onClick: () => onSelect(ou.id),
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onSelect(ou.id);
					}
				},
				tabIndex: 0,
				children: [hasChildren ? /* @__PURE__ */ jsx("button", {
					className: styles["toggleButton"],
					onClick: (e) => {
						e.stopPropagation();
						handleToggle(ou.id);
					},
					"aria-label": isExpanded ? "Collapse" : "Expand",
					type: "button",
					children: isExpanded ? "▾" : "▸"
				}) : /* @__PURE__ */ jsx("span", { className: styles["togglePlaceholder"] }), /* @__PURE__ */ jsx("span", {
					className: styles["nodeName"],
					children: ou.name
				})]
			}),
			isExpanded && isLoading && !state?.children.length && renderLoadingPlaceholders(depth),
			isExpanded && state?.children.map((child) => renderNode(child, depth + 1)),
			isExpanded && state?.hasMore && /* @__PURE__ */ jsx("button", {
				className: styles["loadMoreButton"],
				style: { paddingLeft: `${(depth + 1) * 20 + 12}px` },
				onClick: () => handleLoadMore(ou.id),
				disabled: isLoading,
				type: "button",
				children: isLoading ? "Loading..." : "Load more"
			})
		] }, ou.id);
	};
	const rootState = nodeStates[rootOuId];
	const isRootLoading = rootState?.loading && !rootState?.children.length;
	return /* @__PURE__ */ jsxs("div", {
		className: cx(styles["container"], className),
		role: "tree",
		"aria-label": "Organization unit picker",
		children: [
			isRootLoading && renderLoadingPlaceholders(0),
			rootState?.children.map((ou) => renderNode(ou, 0)),
			rootState?.hasMore && /* @__PURE__ */ jsx("button", {
				className: styles["loadMoreButton"],
				onClick: () => handleLoadMore(rootOuId),
				disabled: rootState?.loading,
				type: "button",
				children: rootState?.loading ? "Loading..." : "Load more"
			})
		]
	});
};
var OrganizationUnitPicker_default = OrganizationUnitPicker;

//#endregion
//#region src/components/adapters/ConsentCheckboxList.styles.ts
const useStyles$17 = (theme, colorScheme) => useMemo(() => ({
	bullet: css`
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #9e9e9e;
        flex-shrink: 0;
      `,
	divider: css`
        opacity: 0.5;
        margin: 0.25rem 0;
      `,
	labelContainer: css`
        display: flex;
        align-items: center;
        gap: 0.4rem;
      `,
	listContainer: css`
        display: flex;
        flex-direction: column;
      `,
	listItem: css`
        padding: 0 0.25rem;
      `,
	listRow: css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.125rem 0;
      `,
	typography: css`
        margin: 0;
      `
}), [theme, colorScheme]);
var ConsentCheckboxList_styles_default = useStyles$17;

//#endregion
//#region src/components/primitives/Toggle/Toggle.styles.ts
const useStyles$16 = (theme, colorScheme, hasError, required) => useMemo(() => {
	const containerStyles = css`
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    `;
	const inputStyles = css`
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
      white-space: nowrap;

      &:focus-visible + div {
        outline: 2px solid ${theme.vars.colors.primary.main};
        outline-offset: 2px;
      }

      &:disabled + div {
        cursor: not-allowed;
        opacity: 0.6;
      }
    `;
	const trackStyles = css`
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 36px;
      height: 20px;
      background-color: ${theme.vars.colors.text.secondary};
      opacity: 0.2;
      border-radius: 9999px;
      transition: all 0.2s ease-in-out;

      input:checked + & {
        background-color: ${theme.vars.colors.primary.main};
        opacity: 1;
      }

      input:disabled + & {
        opacity: 0.4;
      }
    `;
	const thumbStyles = css`
      position: absolute;
      left: 2px;
      width: 16px;
      height: 16px;
      background-color: #fff;
      border-radius: 50%;
      transition: transform 0.2s ease-in-out;

      input:checked + * > & {
        transform: translateX(16px);
      }
    `;
	const labelStyles = css`
      margin-left: calc(${theme.vars.spacing.unit} * 1.5);
      color: ${theme.vars.colors.text.primary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-family: ${theme.vars.typography.fontFamily};
      cursor: pointer;

      input:disabled ~ & {
        cursor: not-allowed;
        opacity: 0.6;
      }
    `;
	const errorLabelStyles = css`
      color: ${theme.vars.colors.error.main};
    `;
	return {
		container: containerStyles,
		errorLabel: hasError ? errorLabelStyles : "",
		input: inputStyles,
		label: labelStyles,
		thumb: thumbStyles,
		track: trackStyles
	};
}, [
	theme,
	colorScheme,
	hasError,
	required
]);
var Toggle_styles_default = useStyles$16;

//#endregion
//#region src/components/primitives/Toggle/Toggle.tsx
/**
* A Toggle component that represents a boolean input. It is built on top of a hidden checkbox input
* and styled to look like a switch.
*
* The component is wrapped in a FormControl to display error messages and helper text.
* The label is associated with the input for accessibility.
*
* @param props - Props for the Toggle component
* @returns A JSX element representing the Toggle
*/
const Toggle = ({ label, error, className, required, helperText, style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const hasError = !!error;
	const styles = Toggle_styles_default(theme, colorScheme, hasError, !!required);
	return /* @__PURE__ */ jsx(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("toggle")), className),
		helperTextMarginLeft: `calc(${theme.vars.spacing.unit} * 5.5)`,
		children: /* @__PURE__ */ jsxs("label", {
			style,
			className: cx(withVendorCSSClassPrefix(bem("toggle", "container")), styles["container"]),
			children: [
				/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					role: "switch",
					className: cx(withVendorCSSClassPrefix(bem("toggle", "input")), styles["input"]),
					"aria-invalid": hasError,
					"aria-required": required,
					...rest
				}),
				/* @__PURE__ */ jsx("div", {
					className: cx(withVendorCSSClassPrefix(bem("toggle", "track")), styles["track"]),
					children: /* @__PURE__ */ jsx("span", { className: cx(withVendorCSSClassPrefix(bem("toggle", "thumb")), styles["thumb"]) })
				}),
				label && /* @__PURE__ */ jsx(InputLabel_default, {
					required,
					error: hasError,
					variant: "inline",
					className: cx(withVendorCSSClassPrefix(bem("toggle", "label")), styles["label"], styles["errorLabel"], { [withVendorCSSClassPrefix(bem("toggle", "label", "error"))]: hasError }),
					children: label
				})
			]
		})
	});
};
var Toggle_default = Toggle;

//#endregion
//#region src/components/adapters/ConsentCheckboxList.tsx
/**
* Computes the form value key for tracking an optional attribute's consent state.
*
* @param purposeId - The ID of the consent purpose.
* @param attrName - The name of the attribute.
* @returns A stable form key string.
*/
const getConsentOptionalKey = (purposeId, attrName) => `__consent_opt__${purposeId}__${attrName}`;
/**
* Renders a list of consent attribute checkboxes.
*
* - ESSENTIAL variant: renders read-only checked checkboxes for required attributes.
* - OPTIONAL variant: renders toggleable checkboxes for optional attributes.
*   Opt-in is the default when no prior form value exists.
*/
const ConsentCheckboxList = ({ variant, purpose, formValues, onInputChange, children }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = ConsentCheckboxList_styles_default(theme, colorScheme);
	const attributes = (variant === "ESSENTIAL" ? purpose.essential : purpose.optional).map((e) => e.name);
	if (!attributes || attributes.length === 0) return null;
	const isEssential = variant === "ESSENTIAL";
	const isChecked = (attrName) => {
		if (isEssential) return true;
		return formValues[getConsentOptionalKey(purpose.purposeId, attrName)] !== "false";
	};
	const handleChange = (attrName, checked) => {
		onInputChange(getConsentOptionalKey(purpose.purposeId, attrName), checked ? "true" : "false");
	};
	if (children) return /* @__PURE__ */ jsx(Fragment, { children: children({
		attributes,
		handleChange,
		isChecked,
		variant
	}) });
	return /* @__PURE__ */ jsx("div", {
		className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list")), styles["listContainer"]),
		children: attributes.map((attr) => {
			const inputId = `consent_${isEssential ? "ess" : "opt"}_${purpose.purposeId}_${attr}`;
			const checked = isChecked(attr);
			return /* @__PURE__ */ jsxs("div", {
				className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "item")), styles["listItem"]),
				children: [/* @__PURE__ */ jsxs("div", {
					className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "row")), styles["listRow"]),
					children: [/* @__PURE__ */ jsxs("div", {
						className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "label-container")), styles["labelContainer"]),
						children: [/* @__PURE__ */ jsx("div", { className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "bullet")), styles["bullet"]) }), /* @__PURE__ */ jsx(Typography_default, {
							variant: "body2",
							className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "typography")), styles["typography"]),
							children: attr
						})]
					}), /* @__PURE__ */ jsx(Toggle_default, {
						id: inputId,
						checked,
						disabled: isEssential,
						onChange: isEssential ? void 0 : (e) => handleChange(attr, e.target.checked)
					})]
				}), /* @__PURE__ */ jsx(Divider_default, { className: cx(withVendorCSSClassPrefix(bem("consent-checkbox-list", "divider")), styles["divider"]) })]
			}, attr);
		})
	});
};
var ConsentCheckboxList_default = ConsentCheckboxList;

//#endregion
//#region src/components/adapters/Consent.tsx
/**
* Consent component renders the list of purposes and their associated attributes (essential and optional)
* based on the data provided by the backend. It allows users to toggle optional attributes while essential
* attributes are displayed as read-only.
*/
const Consent = ({ consentData, formValues, onInputChange, children }) => {
	if (!consentData) return null;
	let purposes = [];
	try {
		const parsed = typeof consentData === "string" ? JSON.parse(consentData) : consentData;
		purposes = Array.isArray(parsed) ? parsed : parsed.purposes || [];
	} catch (e) {
		return null;
	}
	if (purposes.length === 0) return null;
	if (children) return /* @__PURE__ */ jsx(Fragment, { children: children({
		formValues,
		onInputChange,
		purposes
	}) });
	return /* @__PURE__ */ jsx("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "1rem",
			marginTop: "0.25rem"
		},
		children: purposes.map((purpose, purposeIndex) => /* @__PURE__ */ jsxs("div", {
			style: { paddingBottom: "1rem" },
			children: [purpose.essential && purpose.essential.length > 0 && /* @__PURE__ */ jsxs("div", {
				style: { marginTop: "0.5rem" },
				children: [/* @__PURE__ */ jsx(Typography_default, {
					variant: "subtitle2",
					fontWeight: "bold",
					children: "Essential Attributes"
				}), /* @__PURE__ */ jsx(ConsentCheckboxList_default, {
					variant: "ESSENTIAL",
					purpose,
					formValues,
					onInputChange
				})]
			}), purpose.optional && purpose.optional.length > 0 && /* @__PURE__ */ jsxs("div", {
				style: { marginTop: "0.5rem" },
				children: [/* @__PURE__ */ jsx(Typography_default, {
					variant: "subtitle2",
					fontWeight: "bold",
					children: purpose.type === "permissions" ? "Permissions" : "Optional Attributes"
				}), /* @__PURE__ */ jsx(ConsentCheckboxList_default, {
					variant: "OPTIONAL",
					purpose,
					formValues,
					onInputChange
				})]
			})]
		}, purpose.purposeId || purposeIndex))
	});
};
var Consent_default = Consent;

//#endregion
//#region src/components/adapters/FlowTimer.tsx
/**
* Flow countdown timer component.
*
* Displays a countdown from the given number of seconds. When the time expires,
* shows "Timed out". Returns null if expiresIn <= 0.
*/
const FlowTimer = ({ expiresIn = 0, textTemplate = "Time remaining: {time}", children }) => {
	const [remaining, setRemaining] = useState(expiresIn > 0 ? expiresIn : 0);
	useEffect(() => {
		if (expiresIn <= 0) return;
		setRemaining(expiresIn);
		const interval = setInterval(() => {
			setRemaining((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		return () => clearInterval(interval);
	}, [expiresIn]);
	if (expiresIn <= 0) return null;
	const formatTime = (seconds) => {
		if (seconds <= 0) return "Timed out";
		return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
	};
	const isExpired = remaining <= 0;
	const formattedTime = formatTime(remaining);
	if (children) return /* @__PURE__ */ jsx(Fragment, { children: children({
		formattedTime,
		isExpired,
		remaining
	}) });
	return /* @__PURE__ */ jsx(Typography_default, {
		variant: "body2",
		children: isExpired ? "Timed out" : textTemplate.replace("{time}", formattedTime)
	});
};
var FlowTimer_default = FlowTimer;

//#endregion
//#region src/components/adapters/ImageComponent.tsx
const DEFAULT_EMOJI_CONTAINER_HEIGHT = "4em";
/**
* Image component for sign-up forms.
*/
const ImageComponent = ({ component }) => {
	const { theme } = useTheme_default();
	const config = component.config || {};
	const src = config["src"] || "";
	const alt = config["alt"] || config["label"] || "Image";
	const width = config["width"] || "100%";
	const height = config["height"] || "auto";
	const variant = component.variant?.toLowerCase() || "image_block";
	const imageStyle = {
		borderRadius: theme.vars.borderRadius.small,
		display: "block",
		margin: variant === "image_block" ? "1rem auto" : "0"
	};
	if (!src) return null;
	if (isEmojiUri$1(src)) {
		const toCSSLength = (value) => /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;
		const cssWidth = toCSSLength(width);
		const cssHeight = toCSSLength(height);
		const isConcrete = (v) => v !== "auto" && !v.endsWith("%");
		let containerHeight;
		if (isConcrete(cssHeight)) containerHeight = cssHeight;
		else if (isConcrete(cssWidth)) containerHeight = cssWidth;
		else containerHeight = DEFAULT_EMOJI_CONTAINER_HEIGHT;
		return /* @__PURE__ */ jsx("div", {
			style: { textAlign: "center" },
			children: /* @__PURE__ */ jsx("span", {
				style: {
					...imageStyle,
					containerType: "size",
					display: "inline-grid",
					height: containerHeight,
					placeItems: "center",
					width: cssWidth
				},
				children: /* @__PURE__ */ jsx("span", {
					"aria-label": alt,
					role: "img",
					style: {
						fontSize: "100cqmin",
						lineHeight: 1
					},
					children: extractEmojiFromUri$1(src)
				})
			})
		}, component.id);
	}
	return /* @__PURE__ */ jsx("div", {
		style: { textAlign: "center" },
		children: /* @__PURE__ */ jsx("img", {
			src,
			alt,
			height,
			width,
			style: imageStyle,
			onError: (e) => {
				e.currentTarget.style.display = "none";
			}
		})
	}, component.id);
};
var ImageComponent_default = ImageComponent;

//#endregion
//#region src/components/adapters/SmsOtpButton.tsx
/**
* SMS OTP Sign-In Button Component.
* Handles authentication with SMS OTP.
*/
const SmsOtpButton = ({ isLoading, preferences, children,...rest }) => {
	const { t } = useTranslation_default(preferences?.i18n);
	return /* @__PURE__ */ jsx(Button_default, {
		...rest,
		fullWidth: true,
		type: "button",
		color: "secondary",
		variant: "solid",
		disabled: isLoading,
		startIcon: /* @__PURE__ */ jsx("svg", {
			width: "18",
			height: "18",
			viewBox: "0 0 24 24",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ jsx("path", {
				fill: "currentColor",
				d: "M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.074 15.074 0 0 1-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1M12 3v10l3-3h6V3z"
			})
		}),
		children: children ?? t("elements.buttons.smsotp.text")
	});
};
var SmsOtpButton_default = SmsOtpButton;

//#endregion
//#region src/components/primitives/CopyableText/CopyableText.styles.ts
const useStyles$15 = (theme) => useMemo(() => ({
	container: css`
        display: flex;
        flex-direction: column;
        gap: calc(${theme.vars.spacing.unit} * 0.5);
        width: 100%;
      `,
	copyButton: css`
        flex-shrink: 0;
        white-space: nowrap;
      `,
	label: css`
        color: ${theme.vars.colors.text.secondary};
        font-size: 0.875rem;
        font-weight: 500;
      `,
	valueBox: css`
        align-items: center;
        background-color: ${theme.vars.colors.background.surface};
        border: 1px solid ${theme.vars.colors.border};
        border-radius: ${theme.vars.borderRadius.small};
        display: flex;
        gap: calc(${theme.vars.spacing.unit} * 1);
        padding: calc(${theme.vars.spacing.unit} * 0.75) calc(${theme.vars.spacing.unit} * 1);
      `,
	valueText: css`
        color: ${theme.vars.colors.text.primary};
        flex: 1;
        font-family: monospace;
        font-size: 0.85rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      `
}), [theme]);
var CopyableText_styles_default = useStyles$15;

//#endregion
//#region src/components/primitives/CopyableText/CopyableText.tsx
/**
* A React component that displays a text value with an optional label and a button to copy the value to
* the clipboard. When the button is clicked, it attempts to copy the value using the Clipboard API, and
* falls back to a textarea method if the API is not supported.
* After copying, it shows a "Copied!" message for 3 seconds before resetting.
*/
const CopyableText = ({ label, value }) => {
	const { theme } = useTheme_default();
	const styles = CopyableText_styles_default(theme);
	const { t } = useTranslation_default();
	const [copied, setCopied] = useState(false);
	const handleCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(value);
		} catch {
			const textArea = document.createElement("textarea");
			textArea.value = value;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 3e3);
	}, [value]);
	return /* @__PURE__ */ jsxs("div", {
		className: styles["container"],
		children: [label && /* @__PURE__ */ jsx("span", {
			className: styles["label"],
			children: label
		}), /* @__PURE__ */ jsxs("div", {
			className: styles["valueBox"],
			children: [/* @__PURE__ */ jsx("span", {
				className: styles["valueText"],
				children: value
			}), /* @__PURE__ */ jsx(Button_default, {
				variant: "outline",
				size: "small",
				className: styles["copyButton"],
				onClick: () => {
					handleCopy().catch(() => void 0);
				},
				children: copied ? t("elements.display.copyable_text.copied") : t("elements.display.copyable_text.copy")
			})]
		})]
	});
};
var CopyableText_default = CopyableText;

//#endregion
//#region src/components/primitives/Icons/ArrowLeftRight.tsx
/**
* ArrowLeftRight Icon component (lucide-compatible).
*/
const ArrowLeftRight = ({ color = "currentColor", size = 24 }) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: color,
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ jsx("path", { d: "M8 3 4 7l4 4" }),
		/* @__PURE__ */ jsx("path", { d: "M4 7h16" }),
		/* @__PURE__ */ jsx("path", { d: "m16 21 4-4-4-4" }),
		/* @__PURE__ */ jsx("path", { d: "M20 17H4" })
	]
});
ArrowLeftRight.displayName = "ArrowLeftRight";
var ArrowLeftRight_default = ArrowLeftRight;

//#endregion
//#region src/components/primitives/Icons/ArrowRightLeft.tsx
/**
* ArrowRightLeft Icon component (lucide-compatible).
*/
const ArrowRightLeft = ({ color = "currentColor", size = 24 }) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: color,
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ jsx("path", { d: "m16 3 4 4-4 4" }),
		/* @__PURE__ */ jsx("path", { d: "M20 7H4" }),
		/* @__PURE__ */ jsx("path", { d: "m8 21-4-4 4-4" }),
		/* @__PURE__ */ jsx("path", { d: "M4 17h16" })
	]
});
ArrowRightLeft.displayName = "ArrowRightLeft";
var ArrowRightLeft_default = ArrowRightLeft;

//#endregion
//#region src/components/primitives/Icons/flowIconRegistry.tsx
/**
* Registry of icon components keyed by their lucide-compatible name.
* Add new icons here as needed by flow definitions.
*/
const flowIconRegistry = {
	ArrowLeftRight: ArrowLeftRight_default,
	ArrowRightLeft: ArrowRightLeft_default
};
var flowIconRegistry_default = flowIconRegistry;

//#endregion
//#region src/components/presentation/auth/AuthOptionFactory.tsx
const logger$5 = createPackageComponentLogger("@thunderid/react", "AuthOptionFactory");
/**
* Replaces `emoji:` URIs embedded in HTML before DOMPurify sanitization.
*
* DOMPurify strips unknown URI schemes from attributes (e.g. `src="emoji:🦊"` → `src=""`).
* This function converts:
*   - `<img src="emoji:X" alt="Y">` → `<span role="img" aria-label="Y">X</span>`
*   - Any remaining `emoji:X` text occurrences → `X`
*/
/** Ensures rich-text content (including all inner elements from the server) always word-wraps. */
const richTextClass = css`
  overflow-wrap: anywhere;
  & * {
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  & .rich-text-align-left {
    text-align: left;
  }
  & .rich-text-align-center {
    text-align: center;
  }
  & .rich-text-align-right {
    text-align: right;
  }
  & .rich-text-align-justify {
    text-align: justify;
  }
  & a,
  & .rich-text-link {
    text-decoration: underline;
  }
  & span[role='img'] {
    display: inline-block;
  }
`;
/**
* Get the appropriate FieldType for an input component.
*/
const getFieldType = (variant) => {
	switch (variant) {
		case EmbeddedFlowComponentTypeV2.EmailInput: return FieldType.Email;
		case EmbeddedFlowComponentTypeV2.PhoneInput: return FieldType.Tel;
		case EmbeddedFlowComponentTypeV2.PasswordInput: return FieldType.Password;
		case EmbeddedFlowComponentTypeV2.TextInput:
		default: return FieldType.Text;
	}
};
/**
* Get typography variant from component variant.
*/
const getTypographyVariant = (variant) => {
	return {
		BODY_1: "body1",
		BODY_2: "body2",
		BUTTON_TEXT: "button",
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
const matchesSocialProvider = (actionId, eventType, buttonText, provider, authType, _componentVariant) => {
	const providerId = `${provider}_auth`;
	const providerMatches = actionId === providerId || eventType === providerId;
	if (buttonText.toLowerCase().includes(provider)) return true;
	if (authType === "signup") return providerMatches || buttonText.toLowerCase().includes(provider);
	return providerMatches;
};
/**
* Create an auth component from flow component configuration.
*/
const createAuthComponentFromFlow = (component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, authType, options = {}) => {
	const theme = options._theme;
	const customRenderers = options._customRenderers ?? {};
	const key = options.key || component.id;
	const customRenderer = customRenderers[component.id] ?? customRenderers[component.type];
	if (customRenderer) return customRenderer(component, {
		additionalData: options.additionalData,
		authType,
		formErrors,
		formValues,
		isFormValid,
		isLoading,
		meta: options.meta,
		onInputBlur: options.onInputBlur,
		onInputChange,
		onSubmit: options.onSubmit,
		touchedFields
	});
	/** Resolve any remaining {{t()}} or {{meta()}} template expressions in a string at render time. */
	const resolve = (text) => {
		if (!text || !options.t && !options.meta) return text || "";
		return resolveFlowTemplateLiterals$1(text, {
			meta: options.meta,
			t: options.t || ((k) => k)
		});
	};
	switch (component.type) {
		case EmbeddedFlowComponentTypeV2.TextInput:
		case EmbeddedFlowComponentTypeV2.PasswordInput:
		case EmbeddedFlowComponentTypeV2.EmailInput:
		case EmbeddedFlowComponentTypeV2.PhoneInput: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			const fieldType = getFieldType(component.type);
			return cloneElement(createField({
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
			}), { key });
		}
		case EmbeddedFlowComponentTypeV2.OtpInput: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			return cloneElement(createField({
				className: options.inputClassName,
				error,
				label: resolve(component.label) || "",
				name: identifier,
				onBlur: () => options.onInputBlur?.(identifier),
				onChange: (newValue) => onInputChange(identifier, newValue),
				placeholder: resolve(component.placeholder) || "",
				required: component.required || false,
				type: FieldType.Otp,
				value
			}), { key });
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
							purposeName: p.purposeName
						})) };
						formData["consent_decisions"] = JSON.stringify(decisions);
					}
					options.onSubmit(component, formData, shouldSkipValidation);
				}
			};
			if (matchesSocialProvider(actionId, eventType, buttonText, "google", authType, componentVariant)) return /* @__PURE__ */ jsx(GoogleButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "github", authType, componentVariant)) return /* @__PURE__ */ jsx(GitHubButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "facebook", authType, componentVariant)) return /* @__PURE__ */ jsx(FacebookButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "microsoft", authType, componentVariant)) return /* @__PURE__ */ jsx(MicrosoftButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "linkedin", authType, componentVariant)) return /* @__PURE__ */ jsx(LinkedInButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "ethereum", authType, componentVariant)) return /* @__PURE__ */ jsx(SignInWithEthereumButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (actionId === "prompt_mobile" || eventType === "prompt_mobile") return /* @__PURE__ */ jsx(SmsOtpButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			const startIconEl = component.startIcon ? /* @__PURE__ */ jsx("img", {
				src: component.startIcon,
				alt: "",
				"aria-hidden": "true",
				style: {
					height: "1.25em",
					objectFit: "contain",
					width: "1.25em"
				}
			}) : null;
			const endIconEl = component.endIcon ? /* @__PURE__ */ jsx("img", {
				src: component.endIcon,
				alt: "",
				"aria-hidden": "true",
				style: {
					height: "1.25em",
					objectFit: "contain",
					width: "1.25em"
				}
			}) : null;
			return /* @__PURE__ */ jsx(Button_default, {
				fullWidth: true,
				onClick: handleClick,
				disabled: isLoading || !isFormValid && !shouldSkipValidation || options.isTimeoutDisabled || component.config?.disabled,
				className: options.buttonClassName,
				"data-testid": "thunderid-signin-submit",
				variant: component.variant?.toLowerCase() === "primary" ? "solid" : "outline",
				color: component.variant?.toLowerCase() === "primary" ? "primary" : "secondary",
				startIcon: startIconEl,
				endIcon: endIconEl,
				children: buttonText || "Submit"
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Text: return /* @__PURE__ */ jsx(Typography_default, {
			variant: getTypographyVariant(component.variant),
			style: {
				marginBottom: 2,
				textAlign: typeof component?.align === "string" ? component.align : "left"
			},
			children: resolve(component.label)
		}, key);
		case EmbeddedFlowComponentTypeV2.Divider: return /* @__PURE__ */ jsx(Divider_default, { children: resolve(component.label) || "" }, key);
		case EmbeddedFlowComponentTypeV2.Select: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			const selectOptions = (component.options || []).map((opt) => ({
				label: typeof opt === "string" ? opt : String(opt.label ?? opt.value ?? ""),
				value: typeof opt === "string" ? opt : String(opt.value ?? "")
			}));
			return /* @__PURE__ */ jsx(Select_default, {
				name: identifier,
				label: resolve(component.label) || "",
				placeholder: resolve(component.placeholder),
				required: component.required,
				options: selectOptions,
				value,
				error,
				onChange: (e) => onInputChange(identifier, e.target.value),
				onBlur: () => options.onInputBlur?.(identifier),
				className: options.inputClassName
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.OuSelect: {
			const identifier = component.ref ?? component.id;
			const rootOuId = options.additionalData?.["rootOuId"];
			if (!rootOuId || !options.fetchOrganizationUnitChildren) {
				logger$5.warn("OU_SELECT requires additionalData.rootOuId and fetchOrganizationUnitChildren. Skipping render.");
				return null;
			}
			return /* @__PURE__ */ jsx(OrganizationUnitPicker_default, {
				rootOuId,
				selectedOuId: formValues[identifier] || null,
				onSelect: (ouId) => onInputChange(identifier, ouId),
				fetchChildren: options.fetchOrganizationUnitChildren
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Block:
			if (component.components && component.components.length > 0) {
				const formStyles = {
					display: "flex",
					flexDirection: "column",
					gap: `calc(${theme?.vars?.spacing?.unit ?? "4px"} * 2)`
				};
				const blockComponents = component.components.map((childComponent, index) => createAuthComponentFromFlow(childComponent, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, authType, {
					...options,
					key: childComponent.id || `${component.id}_${index}`
				})).filter(Boolean);
				return /* @__PURE__ */ jsx("form", {
					id: component.id,
					style: formStyles,
					children: blockComponents
				}, key);
			}
			return null;
		case EmbeddedFlowComponentTypeV2.RichText: return /* @__PURE__ */ jsx("div", {
			className: richTextClass,
			dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(resolveEmojiUrisInHtml$1(resolve(component.label))) }
		}, key);
		case EmbeddedFlowComponentTypeV2.Image: {
			const explicitHeight = resolve(component.height?.toString());
			const explicitWidth = resolve(component.width?.toString());
			return /* @__PURE__ */ jsx(ImageComponent_default, {
				component: { config: {
					alt: resolve(component.alt) || resolve(component.label) || "Image",
					height: explicitHeight || (options.inStack ? "50" : "auto"),
					src: resolve(component.src),
					width: explicitWidth || (options.inStack ? "50" : "100%")
				} },
				formErrors: void 0,
				formValues: void 0,
				isFormValid: false,
				isLoading: false,
				onInputChange: () => {
					throw new Error("Function not implemented.");
				},
				touchedFields: void 0
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Icon: {
			const iconName = component.name || "";
			const IconComponent = flowIconRegistry_default[iconName];
			if (!IconComponent) {
				logger$5.warn(`Unknown icon name: "${iconName}". Skipping render.`);
				return null;
			}
			return /* @__PURE__ */ jsx(IconComponent, {
				size: component.size || 24,
				color: component.color || "currentColor"
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Stack: {
			const direction = component.direction || "row";
			const gap = component.gap ?? 2;
			const align = component.align || "center";
			const justify = component.justify || "flex-start";
			return /* @__PURE__ */ jsx("div", {
				style: {
					alignItems: align,
					display: "flex",
					flexDirection: direction,
					flexWrap: "wrap",
					gap: `${gap * .5}rem`,
					justifyContent: justify
				},
				children: component.components ? component.components.map((childComponent, index) => createAuthComponentFromFlow(childComponent, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, authType, {
					...options,
					inStack: true,
					key: childComponent.id || `${component.id}_${index}`
				})) : []
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Consent: {
			const consentPromptRawData = options.additionalData?.["consentPrompt"];
			return /* @__PURE__ */ jsx(Consent_default, {
				consentData: consentPromptRawData,
				formValues,
				onInputChange
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Timer: {
			const textTemplate = resolve(component.label) || "Time remaining: {time}";
			const timeoutMs = Number(options.additionalData?.["stepTimeout"]) || 0;
			return /* @__PURE__ */ jsx(FlowTimer_default, {
				expiresIn: timeoutMs > 0 ? Math.max(0, Math.floor((timeoutMs - Date.now()) / 1e3)) : 0,
				textTemplate
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.CopyableText: {
			const sourceKey = component.source;
			const value = sourceKey && options.additionalData ? String(options.additionalData[sourceKey] ?? "") : "";
			return /* @__PURE__ */ jsx(CopyableText_default, {
				label: resolve(component.label) || void 0,
				value
			}, key);
		}
		default:
			logger$5.warn(`Unsupported component type: ${component.type}. Skipping render.`);
			return null;
	}
};
/**
* Processes an array of components and renders them as React elements for sign-in.
*/
const renderSignInComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, "signin", {
	...options,
	key: component.id || index
})).filter((x) => x !== null);
/**
* Processes an array of components and renders them as React elements for sign-up.
*/
const renderSignUpComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, "signup", {
	...options,
	key: component.id || index
})).filter((x) => x !== null);
/**
* Processes an array of components and renders them as React elements for recovery flow.
*/
const renderRecoveryComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, "recovery", {
	...options,
	key: component.id || index
})).filter((x) => x !== null);
/**
* Processes an array of components and renders them as React elements for invite user.
* This is used by both InviteUser and AcceptInvite components.
*/
const renderInviteUserComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, "signup", {
	...options,
	key: component.id || index
})).filter((x) => x !== null);

//#endregion
//#region src/components/presentation/auth/SignIn/v2/BaseSignIn.tsx
/**
* Internal component that consumes FlowContext and renders the sign-in UI.
*/
const BaseSignInContent = ({ components = [], onSubmit, onError, error: externalError, className = "", inputClassName = "", buttonClassName = "", messageClassName = "", size = "medium", variant = "outlined", isLoading: externalIsLoading, children, additionalData = {}, isTimeoutDisabled = false }) => {
	const { meta } = useThunderID_default();
	const { theme } = useTheme_default();
	const customRenderers = useContext(ComponentRendererContext_default);
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
	const styles = BaseSignIn_styles_default(theme, theme.vars.colors.text.primary);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [apiError, setApiError] = useState(null);
	const isLoading = externalIsLoading || isSubmitting;
	/**
	* Handle error responses and extract meaningful error messages
	* Uses the transformer's extractErrorMessage function for consistency
	*/
	const handleError = useCallback((error) => {
		const errorMessage = error?.failureReason || extractErrorMessage(error, t);
		setApiError(error instanceof Error ? error : new Error(errorMessage));
		clearMessages();
		addMessage({
			message: errorMessage,
			type: "error"
		});
	}, [
		t,
		addMessage,
		clearMessages
	]);
	/**
	* Extract form fields from flow components
	*/
	const extractFormFields = useCallback((flowComponents) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === "TEXT_INPUT" || component.type === "PASSWORD_INPUT" || component.type === "EMAIL_INPUT" || component.type === "PHONE_INPUT" || component.type === "OTP_INPUT") {
					const identifier = component.ref;
					fields.push({
						initialValue: "",
						name: identifier,
						required: component.required || false,
						validator: (value) => {
							if (component.required && (!value || value.trim() === "")) return t("validations.required.field.error");
							if ((component.type === "EMAIL_INPUT" || component.variant === "EMAIL") && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("field.email.invalid");
							return null;
						}
					});
				}
				if (component.components) processComponents(component.components);
			});
		};
		processComponents(flowComponents);
		return fields;
	}, [t]);
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, validateForm, touchAllFields } = useForm({
		fields: components ? extractFormFields(components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: false
	});
	/**
	* Handle input value changes.
	* Only updates the value without marking as touched.
	* Touched state is set on blur to avoid premature validation.
	*/
	const handleInputChange = (name, value) => {
		setFormValue(name, value);
	};
	/**
	* Handle input blur event.
	* Marks the field as touched, which triggers validation.
	*/
	const handleInputBlur = (name) => {
		setFormTouched(name, true);
	};
	/**
	* Handle component submission (for buttons and actions).
	*/
	const handleSubmit = async (component, data, skipValidation) => {
		if (!skipValidation) {
			touchAllFields();
			if (!validateForm().isValid) return;
		}
		setIsSubmitting(true);
		setApiError(null);
		clearMessages();
		try {
			const filteredInputs = {};
			if (data) Object.keys(data).forEach((key) => {
				if (data[key] !== void 0 && data[key] !== null && data[key] !== "") filteredInputs[key] = data[key];
			});
			let payload = {};
			payload = {
				...payload,
				...component.id && { action: component.id },
				inputs: filteredInputs
			};
			await onSubmit?.(payload, component);
		} catch (err) {
			handleError(err);
			onError?.(err);
		} finally {
			setIsSubmitting(false);
		}
	};
	const containerClasses = cx([
		withVendorCSSClassPrefix("signin"),
		withVendorCSSClassPrefix(`signin--${size}`),
		withVendorCSSClassPrefix(`signin--${variant}`)
	], className);
	const inputClasses = cx([
		withVendorCSSClassPrefix("signin__input"),
		size === "small" && withVendorCSSClassPrefix("signin__input--small"),
		size === "large" && withVendorCSSClassPrefix("signin__input--large")
	], inputClassName);
	const buttonClasses = cx([
		withVendorCSSClassPrefix("signin__button"),
		size === "small" && withVendorCSSClassPrefix("signin__button--small"),
		size === "large" && withVendorCSSClassPrefix("signin__button--large")
	], buttonClassName);
	const messageClasses = cx([withVendorCSSClassPrefix("signin__messages")], messageClassName);
	/**
	* Render components based on flow data using the factory
	*/
	const renderComponents = useCallback((flowComponents) => renderSignInComponents(flowComponents, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		_customRenderers: customRenderers,
		_theme: theme,
		additionalData,
		buttonClassName: buttonClasses,
		inputClassName: inputClasses,
		isTimeoutDisabled,
		meta,
		onInputBlur: handleInputBlur,
		onSubmit: handleSubmit,
		size,
		t,
		variant
	}), [
		additionalData,
		customRenderers,
		formValues,
		touchedFields,
		formErrors,
		isFormValid,
		meta,
		t,
		theme,
		isLoading,
		size,
		variant,
		inputClasses,
		buttonClasses,
		handleInputBlur,
		handleSubmit,
		isTimeoutDisabled
	]);
	if (children) {
		const renderProps = {
			components,
			error: apiError,
			fieldErrors: formErrors,
			handleInputChange,
			handleSubmit,
			isLoading,
			isTimeoutDisabled,
			isValid: isFormValid,
			messages: flowMessages || [],
			meta,
			subtitle: flowSubtitle ?? "",
			title: flowTitle || t("signin.heading"),
			touched: touchedFields,
			validateForm: () => {
				const result = validateForm();
				return {
					fieldErrors: result.errors,
					isValid: result.isValid
				};
			},
			values: formValues
		};
		return /* @__PURE__ */ jsx("div", {
			className: containerClasses,
			"data-testid": "thunderid-signin",
			children: children(renderProps)
		});
	}
	if (isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "2rem"
			},
			children: /* @__PURE__ */ jsx(Spinner_default, {})
		}) })
	});
	if (!components || components.length === 0) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx(Alert_default, {
			variant: "warning",
			children: /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				children: t("errors.signin.components.not.available")
			})
		}) })
	});
	return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ jsxs(Card_default.Content, { children: [
			externalError && /* @__PURE__ */ jsx("div", {
				className: styles.flowMessagesContainer,
				children: /* @__PURE__ */ jsx(Alert_default, {
					variant: "error",
					className: cx(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: externalError.message })
				})
			}),
			flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
				className: styles.flowMessagesContainer,
				children: flowMessages.map((message, index) => /* @__PURE__ */ jsx(Alert_default, {
					variant: message.type === "error" ? "error" : "info",
					className: cx(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
				}, index))
			}),
			/* @__PURE__ */ jsx("div", {
				className: styles.contentContainer,
				children: renderComponents(components)
			})
		] })
	});
};
/**
* Base SignIn component that provides generic authentication flow.
* This component handles component-driven UI rendering and can transform input
* structure to component-driven format automatically.
*
* @example
* // Default UI
* ```tsx
* import { BaseSignIn } from '@thunderid/react';
*
* const MySignIn = () => {
*   return (
*     <BaseSignIn
*       components={components}
*       onSubmit={async (payload) => {
*         return await handleAuth(payload);
*       }}
*       onSuccess={(authData) => {
*         console.log('Success:', authData);
*       }}
*       className="max-w-md mx-auto"
*     />
*   );
* };
* ```
*
* @example
* // Custom UI with render props
* ```tsx
* <BaseSignIn components={components} onSubmit={handleSubmit}>
*   {({values, errors, handleInputChange, handleSubmit, isLoading, components}) => (
*     <div className="custom-form">
*       <input
*         name="username"
*         value={values.username || ''}
*         onChange={(e) => handleInputChange('username', e.target.value)}
*       />
*       {errors.username && <span>{errors.username}</span>}
*       <button
*         onClick={() => handleSubmit(components[0], values)}
*         disabled={isLoading}
*       >
*         Sign In
*       </button>
*     </div>
*   )}
* </BaseSignIn>
* ```
*/
const BaseSignIn$1 = ({ preferences,...rest }) => {
	const content = /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseSignInContent, { ...rest }) });
	if (!preferences) return content;
	return /* @__PURE__ */ jsx(ComponentPreferencesContext_default.Provider, {
		value: preferences,
		children: content
	});
};
var BaseSignIn_default$1 = BaseSignIn$1;

//#endregion
//#region src/components/presentation/auth/SignIn/BaseSignIn.tsx
const BaseSignIn = (props) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(BaseSignIn_default$1, { ...props });
	return /* @__PURE__ */ jsx(BaseSignIn_default$2, { ...props });
};
var BaseSignIn_default = BaseSignIn;

//#endregion
//#region src/hooks/v2/useOAuthCallback.ts
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
*/
function useOAuthCallback({ currentExecutionId, executionIdStorageKey = "thunderid_execution_id", isInitialized, isSubmitting = false, onComplete, onError, onFlowChange, onProcessingStart, onSubmit, processedRef, setExecutionId: setExecExecutionId, tokenValidationAttemptedRef }) {
	const internalRef = useRef(false);
	const oauthCodeProcessedRef = processedRef ?? internalRef;
	useEffect(() => {
		if (!isInitialized || isSubmitting) return;
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		const nonce = urlParams.get("nonce");
		const state = urlParams.get("state");
		const executionIdFromUrl = urlParams.get("executionId");
		const error = urlParams.get("error");
		const errorDescription = urlParams.get("error_description");
		if (error) {
			oauthCodeProcessedRef.current = true;
			if (tokenValidationAttemptedRef) tokenValidationAttemptedRef.current = true;
			onError?.(new Error(errorDescription || error || "OAuth authentication failed"));
			cleanupUrlParams();
			return;
		}
		if (!code || oauthCodeProcessedRef.current) return;
		if (tokenValidationAttemptedRef?.current) return;
		const storedExecutionId = sessionStorage.getItem(executionIdStorageKey);
		const executionIdToUse = currentExecutionId || storedExecutionId || executionIdFromUrl || state || null;
		if (!executionIdToUse) {
			oauthCodeProcessedRef.current = true;
			onError?.(/* @__PURE__ */ new Error("Invalid flow. Missing executionId."));
			cleanupUrlParams();
			return;
		}
		oauthCodeProcessedRef.current = true;
		if (tokenValidationAttemptedRef) tokenValidationAttemptedRef.current = true;
		onProcessingStart?.();
		if (!currentExecutionId && setExecExecutionId) setExecExecutionId(executionIdToUse);
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
	}, [
		isInitialized,
		currentExecutionId,
		isSubmitting,
		onSubmit,
		onComplete,
		onError,
		onFlowChange,
		setExecExecutionId,
		executionIdStorageKey
	]);
}

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
//#region src/components/presentation/auth/SignIn/v2/SignIn.tsx
/**
* A component-driven SignIn component that provides authentication flow with pre-built styling.
* This component handles the flow API calls for authentication and delegates UI logic to BaseSignIn.
* It automatically transforms simple input-based responses into component-driven UI format.
*
* @example
* // Default UI
* ```tsx
* import { SignIn } from '@thunderid/react/component-driven';
*
* const App = () => {
*   return (
*     <SignIn
*       onSuccess={(authData) => {
*         console.log('Authentication successful:', authData);
*       }}
*       onError={(error) => {
*         console.error('Authentication failed:', error);
*       }}
*       size="medium"
*       variant="outlined"
*     />
*   );
* };
* ```
*
* @example
* // Custom UI with render props
* ```tsx
* import { SignIn } from '@thunderid/react/component-driven';
*
* const App = () => {
*   return (
*     <SignIn
*       onSuccess={(authData) => console.log('Success:', authData)}
*       onError={(error) => console.error('Error:', error)}
*     >
*       {({signIn, isLoading, components, error, isInitialized}) => (
*         <div className="custom-signin">
*           <h1>Custom Sign In</h1>
*           {!isInitialized ? (
*             <p>Initializing...</p>
*           ) : error ? (
*             <div className="error">{error.message}</div>
*           ) : (
*             <form onSubmit={(e) => {
*               e.preventDefault();
*               signIn({inputs: {username: 'user', password: 'pass'}});
*             }}>
*               <button type="submit" disabled={isLoading}>
*                 {isLoading ? 'Signing in...' : 'Sign In'}
*               </button>
*             </form>
*           )}
*         </div>
*       )}
*     </SignIn>
*   );
* };
* ```
*/
const SignIn$1 = ({ className, preferences, size = "medium", onSuccess, onError, variant, children }) => {
	const { applicationId, afterSignInUrl, signIn, isInitialized, isLoading, meta, getStorageManager } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [components, setComponents] = useState([]);
	const [additionalData, setAdditionalData] = useState({});
	const [currentExecutionId, setCurrentExecutionId] = useState(null);
	const challengeTokenRef = useRef(null);
	const [isStorageReady, setIsStorageReady] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [flowError, setFlowError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isTimeoutDisabled, setIsTimeoutDisabled] = useState(false);
	const [passkeyState, setPasskeyState] = useState({
		actionId: null,
		challenge: null,
		creationOptions: null,
		error: null,
		executionId: null,
		isActive: false
	});
	const initializationAttemptedRef = useRef(false);
	const oauthCodeProcessedRef = useRef(false);
	const passkeyProcessedRef = useRef(false);
	/**
	* Sets executionId between sessionStorage and state.
	* This ensures both are always in sync.
	*/
	const setExecutionId = (executionId) => {
		setCurrentExecutionId(executionId);
		if (executionId) sessionStorage.setItem("thunderid_execution_id", executionId);
		else sessionStorage.removeItem("thunderid_execution_id");
	};
	/**
	* Restore any challenge token persisted before an OAuth redirect.
	* Waits for SDK initialization before reading from storage.
	*/
	useEffect(() => {
		if (!isInitialized) return;
		(async () => {
			try {
				const tempData = await (await getStorageManager())?.getTemporaryData();
				if (tempData?.challengeToken) challengeTokenRef.current = tempData.challengeToken;
			} finally {
				setIsStorageReady(true);
			}
		})();
	}, [isInitialized]);
	/**
	* Updates challengeTokenRef immediately (stale-closure safe) and persists via
	* the provider's StorageManager so the token survives OAuth redirects.
	*/
	const setChallengeToken = async (challengeToken) => {
		challengeTokenRef.current = challengeToken;
		try {
			const storageManager = await getStorageManager();
			if (storageManager) if (challengeToken) await storageManager.setTemporaryDataParameter("challengeToken", challengeToken);
			else await storageManager.removeTemporaryDataParameter("challengeToken");
		} catch {
			logger.warn("Failed to persist challenge token in storage.");
		}
	};
	/**
	* Clear all flow-related storage and state.
	*/
	const clearFlowState = async () => {
		setExecutionId(null);
		await setChallengeToken(null);
		setIsFlowInitialized(false);
		sessionStorage.removeItem("thunderid_auth_id");
		setIsTimeoutDisabled(false);
		oauthCodeProcessedRef.current = false;
	};
	/**
	* Parse URL parameters used in flows.
	*/
	const getUrlParams$1 = () => {
		const urlParams = new URL(window?.location?.href ?? "").searchParams;
		return {
			applicationId: urlParams.get("applicationId"),
			authId: urlParams.get("authId"),
			code: urlParams.get("code"),
			error: urlParams.get("error"),
			errorDescription: urlParams.get("error_description"),
			executionId: urlParams.get("executionId"),
			nonce: urlParams.get("nonce"),
			state: urlParams.get("state")
		};
	};
	/**
	* Handle authId from URL and store it in sessionStorage.
	*/
	const handleAuthId = (authId) => {
		if (authId) sessionStorage.setItem("thunderid_auth_id", authId);
	};
	/**
	* Clean up OAuth-related URL parameters from the browser URL.
	*/
	const cleanupOAuthUrlParams = (includeNonce = false) => {
		if (!window?.location?.href) return;
		const url = new URL(window.location.href);
		url.searchParams.delete("error");
		url.searchParams.delete("error_description");
		url.searchParams.delete("code");
		url.searchParams.delete("state");
		if (includeNonce) url.searchParams.delete("nonce");
		window?.history?.replaceState({}, "", url.toString());
	};
	/**
	* Clean up flow-related URL parameters (executionId, authId) from the browser URL.
	* Used after executionId is set in state to prevent using invalidated executionId from URL.
	*/
	const cleanupFlowUrlParams = () => {
		if (!window?.location?.href) return;
		const url = new URL(window.location.href);
		url.searchParams.delete("executionId");
		url.searchParams.delete("authId");
		url.searchParams.delete("applicationId");
		window?.history?.replaceState({}, "", url.toString());
	};
	/**
	* Set error state and call onError callback.
	* Ensures isFlowInitialized is true so errors can be displayed in the UI.
	*/
	const setError = (error) => {
		setFlowError(error);
		setIsFlowInitialized(true);
		onError?.(error);
	};
	/**
	* Handle OAuth error from URL parameters.
	* Clears flow state, creates error, and cleans up URL.
	*/
	const handleOAuthError = (error, errorDescription) => {
		clearFlowState();
		setError(new ThunderIDRuntimeError$1(errorDescription || `OAuth error: ${error}`, "SIGN_IN_ERROR", "react"));
		cleanupOAuthUrlParams(true);
	};
	/**
	* Handle REDIRECTION response by storing flow state and redirecting to OAuth provider.
	*/
	const handleRedirection = async (response) => {
		if (response.type === EmbeddedSignInFlowTypeV2.Redirection) {
			const redirectURL = response.data?.redirectURL || response?.redirectURL;
			if (redirectURL && window?.location) {
				if (response.executionId) setExecutionId(response.executionId);
				await setChallengeToken(response.challengeToken ?? null);
				handleAuthId(getUrlParams$1().authId);
				initiateOAuthRedirect(redirectURL);
				return true;
			}
		}
		return false;
	};
	/**
	* Initialize the authentication flow.
	* Priority: executionId > applicationId (from context) > applicationId (from URL)
	*/
	const initializeFlow = async () => {
		const urlParams = getUrlParams$1();
		oauthCodeProcessedRef.current = false;
		handleAuthId(urlParams.authId);
		const effectiveApplicationId = applicationId || urlParams.applicationId;
		if (!urlParams.executionId && !effectiveApplicationId) {
			const error = new ThunderIDRuntimeError$1("Either executionId or applicationId is required for authentication", "SIGN_IN_ERROR", "react");
			setError(error);
			throw error;
		}
		try {
			setFlowError(null);
			let response;
			if (urlParams.executionId) response = await signIn({ executionId: urlParams.executionId });
			else response = await signIn({
				applicationId: effectiveApplicationId,
				flowType: EmbeddedFlowType.Authentication
			});
			if (await handleRedirection(response)) return;
			const { executionId: normalizedExecutionId, components: normalizedComponents, additionalData: normalizedAdditionalData } = normalizeFlowResponse(response, t, { resolveTranslations: false }, meta);
			await setChallengeToken(response.challengeToken ?? null);
			if (normalizedExecutionId && normalizedComponents) {
				setExecutionId(normalizedExecutionId);
				setComponents(normalizedComponents);
				setAdditionalData(normalizedAdditionalData ?? {});
				setIsFlowInitialized(true);
				setIsTimeoutDisabled(false);
				cleanupFlowUrlParams();
			}
		} catch (error) {
			const err = error;
			await clearFlowState();
			const errorMessage = err?.failureReason || (err instanceof Error ? err.message : String(err));
			setError(new Error(errorMessage));
			initializationAttemptedRef.current = false;
		}
	};
	/**
	* Initialize the flow and handle cleanup of stale flow state.
	*/
	useEffect(() => {
		const urlParams = getUrlParams$1();
		if (urlParams.error) {
			handleOAuthError(urlParams.error, urlParams.errorDescription);
			return;
		}
		handleAuthId(urlParams.authId);
	}, []);
	useEffect(() => {
		const currentUrlParams = getUrlParams$1();
		if (isInitialized && !isLoading && !isFlowInitialized && !initializationAttemptedRef.current && !currentExecutionId && !currentUrlParams.code && !currentUrlParams.state && !isSubmitting && !oauthCodeProcessedRef.current) {
			initializationAttemptedRef.current = true;
			initializeFlow();
		}
	}, [
		isInitialized,
		isLoading,
		isFlowInitialized,
		currentExecutionId
	]);
	/**
	* Handle step timeout if configured in additionalData.
	*/
	useEffect(() => {
		const timeoutMs = Number(additionalData?.["stepTimeout"]) || 0;
		if (timeoutMs <= 0 || !isFlowInitialized) {
			setIsTimeoutDisabled(false);
			return;
		}
		const remaining = Math.max(0, Math.floor((timeoutMs - Date.now()) / 1e3));
		const handleTimeout = () => {
			const errorMessage = t("errors.signin.timeout") || "Time allowed to complete the step has expired.";
			setError(new Error(errorMessage));
			setIsTimeoutDisabled(true);
		};
		if (remaining <= 0) {
			handleTimeout();
			return;
		}
		const timerId = setTimeout(() => {
			handleTimeout();
		}, remaining * 1e3);
		return () => clearTimeout(timerId);
	}, [
		additionalData?.["stepTimeout"],
		isFlowInitialized,
		t
	]);
	/**
	* Handle form submission from BaseSignIn or render props.
	*/
	const handleSubmit = async (payload) => {
		const effectiveExecutionId = payload.executionId || currentExecutionId;
		if (!effectiveExecutionId) throw new Error("No active flow ID");
		const processedInputs = { ...payload.inputs };
		if (additionalData?.["consentPrompt"]) try {
			const consentPromptRawData = additionalData["consentPrompt"];
			const purposes = typeof consentPromptRawData === "string" ? JSON.parse(consentPromptRawData) : consentPromptRawData.purposes || consentPromptRawData;
			let isDeny = false;
			if (payload.action) {
				const findAction = (comps) => {
					if (!comps || comps.length === 0) return null;
					const found = comps.find((c) => c.id === payload.action);
					if (found) return found;
					return comps.reduce((acc, c) => {
						if (acc) return acc;
						if (c.components) return findAction(c.components);
						return null;
					}, null);
				};
				const submitAction = findAction(components);
				if (submitAction && submitAction.variant?.toLowerCase() !== "primary") isDeny = true;
			}
			const decisions = { purposes: purposes.map((p) => ({
				approved: !isDeny,
				elements: [...(p.essential || []).map((e) => ({
					approved: !isDeny,
					name: e.name
				})), ...(p.optional || []).map((e) => {
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
		} catch (e) {}
		try {
			setIsSubmitting(true);
			setFlowError(null);
			const response = await signIn({
				executionId: effectiveExecutionId,
				...payload,
				inputs: processedInputs,
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
			});
			if (await handleRedirection(response)) return;
			if (response.data?.additionalData?.["passkeyChallenge"] || response.data?.additionalData?.["passkeyCreationOptions"]) {
				const { passkeyChallenge, passkeyCreationOptions } = response.data.additionalData;
				const effectiveExecutionIdForPasskey = response.executionId || effectiveExecutionId;
				passkeyProcessedRef.current = false;
				await setChallengeToken(response.challengeToken ?? null);
				setPasskeyState({
					actionId: "submit",
					challenge: passkeyChallenge,
					creationOptions: passkeyCreationOptions,
					error: null,
					executionId: effectiveExecutionIdForPasskey,
					isActive: true
				});
				setIsSubmitting(false);
				return;
			}
			const { executionId: normalizedExecutionId, components: normalizedComponents, additionalData: normalizedAdditionalData } = normalizeFlowResponse(response, t, { resolveTranslations: false }, meta);
			if (response.flowStatus === EmbeddedSignInFlowStatusV2.Error) {
				await clearFlowState();
				const errorMessage = response?.failureReason || "Authentication flow failed. Please try again.";
				const err = new Error(errorMessage);
				setError(err);
				cleanupFlowUrlParams();
				throw err;
			}
			if (response.flowStatus === EmbeddedSignInFlowStatusV2.Complete) {
				const finalRedirectUrl = response?.redirectUrl || response?.redirect_uri || afterSignInUrl;
				setIsSubmitting(false);
				setExecutionId(null);
				await setChallengeToken(null);
				setIsFlowInitialized(false);
				sessionStorage.removeItem("thunderid_execution_id");
				sessionStorage.removeItem("thunderid_auth_id");
				cleanupOAuthUrlParams(true);
				if (onSuccess) onSuccess({
					redirectUrl: finalRedirectUrl,
					...response.data || {}
				});
				if (finalRedirectUrl && window?.location) window.location.href = finalRedirectUrl;
				return;
			}
			await setChallengeToken(response.challengeToken ?? null);
			if (normalizedExecutionId && normalizedComponents) {
				setExecutionId(normalizedExecutionId);
				setComponents(normalizedComponents);
				setAdditionalData(normalizedAdditionalData ?? {});
				setIsTimeoutDisabled(false);
				setIsFlowInitialized(true);
				cleanupFlowUrlParams();
				if (response?.failureReason) setFlowError(new Error(response.failureReason));
			}
		} catch (error) {
			const err = error;
			await clearFlowState();
			const errorMessage = err?.failureReason || (err instanceof Error ? err.message : String(err));
			setError(new Error(errorMessage));
			return;
		} finally {
			setIsSubmitting(false);
		}
	};
	/**
	* Handle authentication errors.
	*/
	const handleError = (error) => {
		setError(error);
	};
	useOAuthCallback({
		currentExecutionId,
		isInitialized: isInitialized && !isLoading && isStorageReady,
		isSubmitting,
		onError: (err) => {
			clearFlowState();
			setError(err instanceof Error ? err : new Error(String(err)));
		},
		onSubmit: async (payload) => handleSubmit({
			executionId: payload.executionId,
			inputs: payload.inputs
		}),
		processedRef: oauthCodeProcessedRef,
		setExecutionId
	});
	/**
	* Handle passkey authentication/registration when passkey state becomes active.
	* This effect auto-triggers the browser passkey popup and submits the result.
	*/
	useEffect(() => {
		if (!passkeyState.isActive || !passkeyState.challenge && !passkeyState.creationOptions || !passkeyState.executionId) return;
		if (passkeyProcessedRef.current) return;
		passkeyProcessedRef.current = true;
		const performPasskeyProcess = async () => {
			let inputs;
			if (passkeyState.challenge) {
				const passkeyResponse = await handlePasskeyAuthentication(passkeyState.challenge);
				const passkeyResponseObj = JSON.parse(passkeyResponse);
				inputs = {
					authenticatorData: passkeyResponseObj.response.authenticatorData,
					clientDataJSON: passkeyResponseObj.response.clientDataJSON,
					credentialId: passkeyResponseObj.id,
					signature: passkeyResponseObj.response.signature,
					userHandle: passkeyResponseObj.response.userHandle
				};
			} else if (passkeyState.creationOptions) {
				const passkeyResponse = await handlePasskeyRegistration(passkeyState.creationOptions);
				const passkeyResponseObj = JSON.parse(passkeyResponse);
				inputs = {
					attestationObject: passkeyResponseObj.response.attestationObject,
					clientDataJSON: passkeyResponseObj.response.clientDataJSON,
					credentialId: passkeyResponseObj.id
				};
			} else throw new Error("No passkey challenge or creation options available");
			await handleSubmit({
				executionId: passkeyState.executionId ?? void 0,
				inputs
			});
		};
		performPasskeyProcess().then(() => {
			setPasskeyState({
				actionId: null,
				challenge: null,
				creationOptions: null,
				error: null,
				executionId: null,
				isActive: false
			});
		}).catch((error) => {
			setPasskeyState((prev) => ({
				...prev,
				error,
				isActive: false
			}));
			setFlowError(error);
			onError?.(error);
		});
	}, [
		passkeyState.isActive,
		passkeyState.challenge,
		passkeyState.creationOptions,
		passkeyState.executionId
	]);
	if (children) return /* @__PURE__ */ jsx(Fragment, { children: children({
		additionalData,
		components,
		error: flowError,
		initialize: initializeFlow,
		isInitialized: isFlowInitialized,
		isLoading: isLoading || isSubmitting || !isInitialized,
		isTimeoutDisabled,
		meta,
		onSubmit: handleSubmit
	}) });
	return /* @__PURE__ */ jsx(BaseSignIn_default$1, {
		additionalData,
		components,
		isLoading: isLoading || !isInitialized || !isFlowInitialized,
		isTimeoutDisabled,
		onSubmit: handleSubmit,
		onError: handleError,
		error: flowError,
		className,
		size,
		variant,
		preferences
	});
};
var SignIn_default$1 = SignIn$1;

//#endregion
//#region src/components/presentation/auth/SignIn/SignIn.tsx
/**
* A styled SignIn component that provides native authentication flow with pre-built styling.
* This component handles the API calls for authentication and delegates UI logic to BaseSignIn.
*
* @example
* ```tsx
* import { SignIn } from '@thunderid/react';
*
* const App = () => {
*   return (
*     <SignIn
*       onSuccess={(authData) => {
*         console.log('Authentication successful:', authData);
*         // Handle successful authentication (e.g., redirect, store tokens)
*       }}
*       onError={(error) => {
*         console.error('Authentication failed:', error);
*       }}
*       size="medium"
*       variant="outlined"
*     />
*   );
* };
* ```
*/
const SignIn = ({ className, size = "medium", children, preferences,...rest }) => {
	const { signIn, afterSignInUrl, isInitialized, isLoading, platform } = useThunderID_default();
	/**
	* Initialize the authentication flow.
	*/
	const handleInitialize = async () => await signIn({ response_mode: "direct" });
	/**
	* Handle authentication steps.
	*/
	const handleOnSubmit = async (payload, request) => await signIn(payload, request);
	/**
	* Handle successful authentication and redirect with query params.
	*/
	const handleSuccess = (authData) => {
		if (authData && afterSignInUrl) {
			const url = new URL(afterSignInUrl, window.location.origin);
			Object.entries(authData).forEach(([key, value]) => {
				if (value !== void 0 && value !== null) url.searchParams.append(key, String(value));
			});
			window.location.href = url.toString();
		}
	};
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(SignIn_default$1, {
		className,
		size,
		variant: rest.variant,
		onSuccess: rest.onSuccess,
		onError: rest.onError,
		preferences,
		children
	});
	return /* @__PURE__ */ jsx(BaseSignIn_default, {
		isLoading: isLoading || !isInitialized,
		afterSignInUrl,
		onInitialize: handleInitialize,
		onSubmit: handleOnSubmit,
		onSuccess: handleSuccess,
		className,
		size,
		showLogo: true,
		showSubtitle: true,
		showTitle: true,
		preferences,
		...rest
	});
};
var SignIn_default = SignIn;

//#endregion
//#region src/components/adapters/CheckboxInput.tsx
/**
* Checkbox input component for sign-up forms.
*/
const CheckboxInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || false;
	return createField({
		className: inputClassName,
		error: touchedFields[fieldName] ? formErrors[fieldName] : void 0,
		label: config["label"] || "",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		type: FieldType.Checkbox,
		value
	});
};
var CheckboxInput_default = CheckboxInput;

//#endregion
//#region src/components/adapters/DateInput.tsx
/**
* Date input component for sign-up forms.
*/
const DateInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	return createField({
		className: inputClassName,
		error: touchedFields[fieldName] ? formErrors[fieldName] : void 0,
		label: config["label"] || "",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		type: FieldType.Date,
		value
	});
};
var DateInput_default = DateInput;

//#endregion
//#region src/components/adapters/DividerComponent.tsx
/**
* Divider component for sign-up forms.
*/
const DividerComponent = ({ component }) => {
	const { theme } = useTheme_default();
	const text = (component.config || {})["text"] || "";
	return /* @__PURE__ */ jsx(Divider_default, {
		orientation: (component.variant?.toLowerCase() || "horizontal") === "vertical" ? "vertical" : "horizontal",
		style: { margin: `calc(${theme.vars.spacing.unit} * 2) 0` },
		children: text
	}, component.id);
};
var DividerComponent_default = DividerComponent;

//#endregion
//#region src/components/adapters/EmailInput.tsx
/**
* Email input component for sign-up forms.
*/
const EmailInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	return createField({
		className: inputClassName,
		error: touchedFields[fieldName] ? formErrors[fieldName] : void 0,
		label: config["label"] || "Email",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "Enter your email",
		required: config["required"] || false,
		type: FieldType.Email,
		value
	});
};
var EmailInput_default = EmailInput;

//#endregion
//#region src/components/adapters/FormContainer.tsx
/**
* Form container component that renders child components.
*/
const FormContainer = (props) => {
	const { component } = props;
	if (component.components && component.components.length > 0) {
		const handleFormSubmit = (e) => {
			e.preventDefault();
			const submitButton = component.components?.find((child) => child.type === "BUTTON" && (child.variant === "PRIMARY" || child.variant === "SECONDARY" || child.config?.type === "submit"));
			if (submitButton && props.onSubmit) props.onSubmit(submitButton, props.formValues);
		};
		return /* @__PURE__ */ jsx("form", {
			onSubmit: handleFormSubmit,
			style: {
				display: "flex",
				flexDirection: "column"
			},
			children: component.components.map((childComponent) => createSignUpComponent({
				...props,
				component: childComponent
			}))
		}, component.id);
	}
	return /* @__PURE__ */ jsx("div", {}, component.id);
};
var FormContainer_default = FormContainer;

//#endregion
//#region src/components/adapters/NumberInput.tsx
/**
* Number input component for sign-up forms.
*/
const NumberInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	return createField({
		className: inputClassName,
		error: touchedFields[fieldName] ? formErrors[fieldName] : void 0,
		label: config["label"] || "",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		type: FieldType.Number,
		value
	});
};
var NumberInput_default = NumberInput;

//#endregion
//#region src/components/adapters/PasswordInput.tsx
/**
* Password input component for sign-up forms.
*/
const PasswordInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	const error = touchedFields[fieldName] ? formErrors[fieldName] : void 0;
	const validations = config["validations"] || [];
	const validationHints = [];
	validations.forEach((validation) => {
		if (validation.name === "LengthValidator") {
			const minLength = validation.conditions?.find((c) => c.key === "min.length")?.value;
			const maxLength = validation.conditions?.find((c) => c.key === "max.length")?.value;
			if (minLength || maxLength) validationHints.push(`Length: ${minLength || "0"}-${maxLength || "∞"} characters`);
		} else if (validation.name === "UpperCaseValidator") {
			const minLength = validation.conditions?.find((c) => c.key === "min.length")?.value;
			if (minLength && parseInt(minLength, 10) > 0) validationHints.push("Must contain uppercase letter(s)");
		} else if (validation.name === "LowerCaseValidator") {
			const minLength = validation.conditions?.find((c) => c.key === "min.length")?.value;
			if (minLength && parseInt(minLength, 10) > 0) validationHints.push("Must contain lowercase letter(s)");
		} else if (validation.name === "NumeralValidator") {
			const minLength = validation.conditions?.find((c) => c.key === "min.length")?.value;
			if (minLength && parseInt(minLength, 10) > 0) validationHints.push("Must contain number(s)");
		} else if (validation.name === "SpecialCharacterValidator") {
			const minLength = validation.conditions?.find((c) => c.key === "min.length")?.value;
			if (minLength && parseInt(minLength, 10) > 0) validationHints.push("Must contain special character(s)");
		}
	});
	return createField({
		className: inputClassName,
		error,
		label: config["label"] || "Password",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "Enter your password",
		required: config["required"] || false,
		type: FieldType.Password,
		value
	});
};
var PasswordInput_default = PasswordInput;

//#endregion
//#region src/components/adapters/SelectInput.tsx
/**
* Select input component for sign-up forms.
*/
const SelectInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	const error = touchedFields[fieldName] ? formErrors[fieldName] : void 0;
	const options = (config["options"] || []).map((option) => ({
		label: option,
		value: option
	}));
	return createField({
		className: inputClassName,
		error,
		label: config["label"] || "",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		options,
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		type: FieldType.Select,
		value
	});
};
var SelectInput_default = SelectInput;

//#endregion
//#region src/components/adapters/SubmitButton.tsx
/**
* Button component for sign-up forms that handles all button variants.
*/
const ButtonComponent = ({ component, isLoading, isFormValid, buttonClassName, onSubmit, size = "medium" }) => {
	const config = component.config || {};
	const buttonText = config["text"] || config["label"] || "Continue";
	const buttonType = config["type"] || "submit";
	const componentVariant = component.variant?.toUpperCase() || "PRIMARY";
	const getButtonProps = () => {
		switch (componentVariant) {
			case "PRIMARY": return {
				color: "primary",
				variant: "solid"
			};
			case "SECONDARY": return {
				color: "secondary",
				variant: "solid"
			};
			case "TEXT": return {
				color: "primary",
				variant: "text"
			};
			case "SOCIAL":
			case "OUTLINED": return {
				color: "primary",
				variant: "outline"
			};
			default: return {
				color: "primary",
				variant: "solid"
			};
		}
	};
	const { variant, color } = getButtonProps();
	const handleClick = () => {
		if (onSubmit && buttonType !== "submit") onSubmit(component);
	};
	return /* @__PURE__ */ jsx(Button_default, {
		type: buttonType === "submit" ? "submit" : "button",
		variant,
		color,
		size,
		disabled: isLoading || buttonType === "submit" && !isFormValid,
		onClick: buttonType !== "submit" ? handleClick : void 0,
		className: buttonClassName,
		style: { width: "100%" },
		children: isLoading ? /* @__PURE__ */ jsx(Spinner_default, { size: "small" }) : buttonText
	}, component.id);
};
var SubmitButton_default = ButtonComponent;

//#endregion
//#region src/components/adapters/TelephoneInput.tsx
/**
* Telephone input component for sign-up forms.
*/
const TelephoneInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	const error = touchedFields[fieldName] ? formErrors[fieldName] : void 0;
	return /* @__PURE__ */ jsx(TextField_default, {
		name: fieldName,
		type: "tel",
		label: config["label"] || "",
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		value,
		error,
		onChange: (e) => onInputChange(fieldName, e.target.value),
		className: inputClassName,
		helperText: config["hint"] || ""
	}, component.id);
};
var TelephoneInput_default = TelephoneInput;

//#endregion
//#region src/components/adapters/TextInput.tsx
/**
* Text input component for sign-up forms.
*/
const TextInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	return createField({
		className: inputClassName,
		error: touchedFields[fieldName] ? formErrors[fieldName] : void 0,
		label: config["label"] || "",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		type: FieldType.Text,
		value
	});
};
var TextInput_default = TextInput;

//#endregion
//#region src/components/adapters/Typography.tsx
/**
* Typography component for sign-up forms (titles, descriptions, etc.).
*/
const TypographyComponent = ({ component }) => {
	const { theme } = useTheme_default();
	const config = component.config || {};
	const text = config["text"] || config["content"] || "";
	const variant = component.variant?.toLowerCase() || "body1";
	let typographyVariant = "body1";
	switch (variant) {
		case "h1":
			typographyVariant = "h1";
			break;
		case "h2":
			typographyVariant = "h2";
			break;
		case "h3":
			typographyVariant = "h3";
			break;
		case "h4":
			typographyVariant = "h4";
			break;
		case "h5":
			typographyVariant = "h5";
			break;
		case "h6":
			typographyVariant = "h6";
			break;
		case "subtitle1":
			typographyVariant = "subtitle1";
			break;
		case "subtitle2":
			typographyVariant = "subtitle2";
			break;
		case "body2":
			typographyVariant = "body2";
			break;
		case "caption":
			typographyVariant = "caption";
			break;
		default: typographyVariant = "body1";
	}
	return /* @__PURE__ */ jsx(Typography_default, {
		variant: typographyVariant,
		style: { marginBottom: `calc(${theme.vars.spacing.unit} * 2)` },
		children: text
	}, component.id);
};
var Typography_default$1 = TypographyComponent;

//#endregion
//#region src/components/presentation/auth/SignUp/v1/SignUpOptionFactory.tsx
/**
* Creates the appropriate sign-up component based on the component type.
*/
const createSignUpComponent = ({ component, onSubmit,...rest }) => {
	switch (component.type) {
		case EmbeddedFlowComponentType$1.Typography: return /* @__PURE__ */ jsx(Typography_default$1, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType$1.Input: {
			const inputVariant = component.variant?.toUpperCase() ?? "";
			const inputType = component.config["type"]?.toLowerCase() ?? "";
			if (inputVariant === "EMAIL" || inputType === "email") return /* @__PURE__ */ jsx(EmailInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "PASSWORD" || inputType === "password") return /* @__PURE__ */ jsx(PasswordInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "TELEPHONE" || inputType === "tel") return /* @__PURE__ */ jsx(TelephoneInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "NUMBER" || inputType === "number") return /* @__PURE__ */ jsx(NumberInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "DATE" || inputType === "date") return /* @__PURE__ */ jsx(DateInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "CHECKBOX" || inputType === "checkbox") return /* @__PURE__ */ jsx(CheckboxInput_default, {
				component,
				onSubmit,
				...rest
			});
			return /* @__PURE__ */ jsx(TextInput_default, {
				component,
				onSubmit,
				...rest
			});
		}
		case EmbeddedFlowComponentType$1.Button: {
			const buttonVariant = component.variant?.toUpperCase();
			const buttonText = component.config["text"] || component.config["label"] || "";
			if (buttonVariant === "SOCIAL") {
				if (buttonText.toLowerCase().includes("google")) return /* @__PURE__ */ jsx(GoogleButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("github")) return /* @__PURE__ */ jsx(GitHubButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("microsoft")) return /* @__PURE__ */ jsx(MicrosoftButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("facebook")) return /* @__PURE__ */ jsx(FacebookButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("linkedin")) return /* @__PURE__ */ jsx(LinkedInButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("ethereum")) return /* @__PURE__ */ jsx(SignInWithEthereumButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
			}
			return /* @__PURE__ */ jsx(SubmitButton_default, {
				component,
				onSubmit,
				...rest
			});
		}
		case EmbeddedFlowComponentType$1.Form: return /* @__PURE__ */ jsx(FormContainer_default, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType$1.Select: return /* @__PURE__ */ jsx(SelectInput_default, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType$1.Divider: return /* @__PURE__ */ jsx(DividerComponent_default, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType$1.Image: return /* @__PURE__ */ jsx(ImageComponent_default, {
			component,
			onSubmit,
			...rest
		});
		default: return /* @__PURE__ */ jsx("div", {});
	}
};
/**
* Convenience function that creates the appropriate sign-up component from flow component data.
*/
const createSignUpOptionFromComponent = (component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => createSignUpComponent({
	component,
	formErrors,
	formValues,
	isFormValid,
	isLoading,
	onInputChange,
	touchedFields,
	...options
});
/**
* Processes an array of components and renders them as React elements.
*/
const renderSignUpComponents$1 = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createSignUpOptionFromComponent(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, {
	...options,
	key: component.id || index
})).filter(Boolean);

//#endregion
//#region src/components/presentation/auth/SignUp/BaseSignUp.styles.ts
/**
* Creates styles for the BaseSignUp component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$14 = (theme, colorScheme) => useMemo(() => {
	const signUp = css`
      min-width: 420px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const card = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      gap: calc(${theme.vars.spacing.unit} * 2);
      min-width: 420px;
    `;
	const logoContainer = css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const header = css`
      gap: 0;
      align-items: center;
    `;
	const title = css`
      margin: 0 0 calc(${theme.vars.spacing.unit} * 1) 0;
      color: ${theme.vars.colors.text.primary};
    `;
	const subtitle = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `;
	const messageItem = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `;
	const errorContainer = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const contentContainer = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const loadingContainer = css`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 4);
    `;
	const loadingText = css`
      margin-top: calc(${theme.vars.spacing.unit} * 2);
      color: ${theme.vars.colors.text.secondary};
    `;
	const divider = css`
      margin: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
	const centeredContainer = css`
      text-align: center;
      padding: calc(${theme.vars.spacing.unit} * 4);
    `;
	const passkeyContainer = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const passkeyText = css`
      margin-top: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `;
	const form = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const formDivider = css`
      margin: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
	const authenticatorSection = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 1);
    `;
	const authenticatorItem = css`
      width: 100%;
    `;
	const noAuthenticatorCard = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	const errorAlert = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const messagesAlert = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `;
	const flowMessagesContainer = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	return {
		authenticatorItem,
		authenticatorSection,
		card,
		centeredContainer,
		contentContainer,
		divider,
		errorAlert,
		errorContainer,
		flowMessageItem: css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `,
		flowMessagesContainer,
		form,
		formDivider,
		header,
		loadingContainer,
		loadingText,
		logoContainer,
		messageItem,
		messagesAlert,
		noAuthenticatorCard,
		passkeyContainer,
		passkeyText,
		signUp,
		subtitle,
		title
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.borderRadius.large,
	theme.vars.spacing.unit,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseSignUp_styles_default = useStyles$14;

//#endregion
//#region src/components/presentation/auth/SignUp/v1/BaseSignUp.tsx
const logger$4 = createPackageComponentLogger("@thunderid/react", "BaseSignUp");
/**
* Component that consumes FlowContext and renders the sign-up UI.
*
* @internal
*/
const BaseSignUpContent$1 = ({ afterSignUpUrl, onInitialize, onSubmit, onError, onFlowChange, onComplete, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = useTheme_default();
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
	useThunderID_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const handleError = useCallback((error) => {
		let errorMessage = t("errors.signup.flow.failure");
		if (error && typeof error === "object") {
			if (error.code && (error.message || error.description)) errorMessage = error.description || error.message;
			else if (error instanceof Error && error.name === "ThunderIDAPIError") try {
				const errorResponse = JSON.parse(error.message);
				if (errorResponse.description) errorMessage = errorResponse.description;
				else if (errorResponse.message) errorMessage = errorResponse.message;
				else errorMessage = error.message;
			} catch {
				errorMessage = error.message;
			}
			else if (error.message) errorMessage = error.message;
		} else if (typeof error === "string") errorMessage = error;
		clearMessages();
		addMessage({
			message: errorMessage,
			type: "error"
		});
	}, [
		t,
		addMessage,
		clearMessages
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const initializationAttemptedRef = useRef(false);
	/**
	* Extract form fields from flow components
	*/
	const extractFormFields = useCallback((components) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === EmbeddedFlowComponentType$1.Input) {
					const config = component.config || {};
					fields.push({
						initialValue: config.defaultValue || "",
						name: config.name || component.id,
						required: config.required || false,
						validator: (value) => {
							if (config.required && (!value || value.trim() === "")) return t("validations.required.field.error");
							if (config.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("field.email.invalid");
							if (config.type === "password" && value && value.length < 8) return t("field.password.weak");
							return null;
						}
					});
				}
				if (component.components && Array.isArray(component.components)) processComponents(component.components);
			});
		};
		processComponents(components);
		return fields;
	}, [t]);
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, validateForm, reset: resetForm } = useForm({
		fields: currentFlow?.data?.components ? extractFormFields(currentFlow.data.components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: true
	});
	/**
	* Setup form fields based on the current flow.
	*/
	const setupFormFields = useCallback((flowResponse) => {
		const fields = extractFormFields(flowResponse.data?.components || []);
		const initialValues = {};
		fields.forEach((field) => {
			initialValues[field.name] = field.initialValue || "";
		});
		resetForm();
		Object.keys(initialValues).forEach((key) => {
			setFormValue(key, initialValues[key]);
		});
	}, [
		extractFormFields,
		resetForm,
		setFormValue
	]);
	/**
	* Handle input value changes.
	*/
	const handleInputChange = (name, value) => {
		setFormValue(name, value);
		setFormTouched(name, true);
	};
	/**
	* Check if the response contains a redirection URL and perform the redirect if necessary.
	* @param response - The sign-up response
	* @returns true if a redirect was performed, false otherwise
	*/
	const handleRedirectionIfNeeded = (response) => {
		if (response?.type === EmbeddedFlowResponseType.Redirection && response?.data?.redirectURL) {
			/**
			* Open a popup window to handle redirection prompts for social sign-up
			*/
			const redirectUrl = response.data.redirectURL;
			const popup = window.open(redirectUrl, "oauth_popup", "width=500,height=600,scrollbars=yes,resizable=yes");
			if (!popup) {
				logger$4.error("Failed to open popup window");
				return false;
			}
			/**
			* Use `let` for messageHandler and popupMonitor to resolve circular references:
			* messageHandler <-> cleanup <-> popupMonitor.
			* All are assigned before any of them can be invoked at runtime.
			*/
			let hasProcessedCallback = false;
			let popupMonitor;
			let messageHandler;
			const cleanup = () => {
				window.removeEventListener("message", messageHandler);
				if (popupMonitor) clearInterval(popupMonitor);
			};
			/**
			* Add an event listener to the window to capture the message from the popup
			*/
			messageHandler = async function messageEventHandler(event) {
				/**
				* Check if the message is from our popup window
				*/
				if (event.source !== popup) return;
				/**
				* Check the origin of the message to ensure it's from a trusted source
				*/
				const expectedOrigin = afterSignUpUrl ? new URL(afterSignUpUrl).origin : window.location.origin;
				if (event.origin !== expectedOrigin && event.origin !== window.location.origin) return;
				const { code, state } = event.data;
				if (code && state) {
					const payload = {
						...currentFlow.flowId && { flowId: currentFlow.flowId },
						actionId: "",
						flowType: currentFlow.flowType || "REGISTRATION",
						inputs: {
							code,
							state
						}
					};
					try {
						const continueResponse = await onSubmit(payload);
						onFlowChange?.(continueResponse);
						if (continueResponse.flowStatus === EmbeddedFlowStatus.Complete) onComplete?.(continueResponse);
						else if (continueResponse.flowStatus === EmbeddedFlowStatus.Incomplete) {
							setCurrentFlow(continueResponse);
							setupFormFields(continueResponse);
						}
						popup.close();
						cleanup();
					} catch (err) {
						handleError(err);
						onError?.(err);
						popup.close();
						cleanup();
					}
				}
			};
			window.addEventListener("message", messageHandler);
			/**
			* Monitor popup for closure and URL changes
			*/
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
								logger$4.error("OAuth error:");
								popup.close();
								cleanup();
								return;
							}
							if (code && state) {
								const payload = {
									...currentFlow.flowId && { flowId: currentFlow.flowId },
									actionId: "",
									flowType: currentFlow.flowType || "REGISTRATION",
									inputs: {
										code,
										state
									}
								};
								try {
									const continueResponse = await onSubmit(payload);
									onFlowChange?.(continueResponse);
									if (continueResponse.flowStatus === EmbeddedFlowStatus.Complete) onComplete?.(continueResponse);
									else if (continueResponse.flowStatus === EmbeddedFlowStatus.Incomplete) {
										setCurrentFlow(continueResponse);
										setupFormFields(continueResponse);
									}
									popup.close();
								} catch (err) {
									handleError(err);
									onError?.(err);
									popup.close();
								}
							}
						}
					} catch (e) {}
				} catch (e) {
					logger$4.error("Error monitoring popup:");
				}
			}, 1e3);
			return true;
		}
		return false;
	};
	/**
	* Handle component submission (for buttons outside forms).
	*/
	const handleSubmit = async (component, data) => {
		if (!currentFlow) return;
		setIsLoading(true);
		clearMessages();
		try {
			const filteredInputs = {};
			if (data) Object.entries(data).forEach(([key, value]) => {
				if (value !== null && value !== void 0 && value !== "") filteredInputs[key] = value;
			});
			const actionId = component.id;
			const response = await onSubmit({
				...currentFlow.flowId && { flowId: currentFlow.flowId },
				flowType: currentFlow.flowType || "REGISTRATION",
				inputs: filteredInputs,
				...actionId && { actionId }
			});
			onFlowChange?.(response);
			if (response.flowStatus === EmbeddedFlowStatus.Complete) {
				onComplete?.(response);
				return;
			}
			if (response.flowStatus === EmbeddedFlowStatus.Incomplete) {
				if (handleRedirectionIfNeeded(response)) return;
				setCurrentFlow(response);
				setupFormFields(response);
			}
		} catch (err) {
			handleError(err);
			onError?.(err);
		} finally {
			setIsLoading(false);
		}
	};
	const containerClasses = cx([
		withVendorCSSClassPrefix("signup"),
		withVendorCSSClassPrefix(`signup--${size}`),
		withVendorCSSClassPrefix(`signup--${variant}`)
	], className);
	const inputClasses = cx([
		withVendorCSSClassPrefix("signup__input"),
		size === "small" && withVendorCSSClassPrefix("signup__input--small"),
		size === "large" && withVendorCSSClassPrefix("signup__input--large")
	], inputClassName);
	const buttonClasses = cx([
		withVendorCSSClassPrefix("signup__button"),
		size === "small" && withVendorCSSClassPrefix("signup__button--small"),
		size === "large" && withVendorCSSClassPrefix("signup__button--large")
	], buttonClassName);
	const errorClasses = cx([withVendorCSSClassPrefix("signup__error")], errorClassName);
	const messageClasses = cx([withVendorCSSClassPrefix("signup__messages")], messageClassName);
	/**
	* Render form components based on flow data using the factory
	*/
	const renderComponents = useCallback((components) => renderSignUpComponents$1(components, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		buttonClassName: buttonClasses,
		inputClassName: inputClasses,
		onSubmit: handleSubmit,
		size,
		variant
	}), [
		formValues,
		touchedFields,
		formErrors,
		isFormValid,
		isLoading,
		size,
		variant,
		inputClasses,
		buttonClasses,
		handleSubmit
	]);
	useEffect(() => {
		if (isInitialized && !isFlowInitialized && !initializationAttemptedRef.current) {
			initializationAttemptedRef.current = true;
			(async () => {
				setIsLoading(true);
				clearMessages();
				try {
					const response = await onInitialize?.();
					setCurrentFlow(response);
					setIsFlowInitialized(true);
					onFlowChange?.(response);
					if (response.flowStatus === EmbeddedFlowStatus.Complete) {
						onComplete?.(response);
						return;
					}
					if (response.flowStatus === EmbeddedFlowStatus.Incomplete) setupFormFields(response);
				} catch (err) {
					handleError(err);
					onError?.(err);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [
		isInitialized,
		isFlowInitialized,
		onInitialize,
		onComplete,
		onError,
		onFlowChange,
		setupFormFields,
		afterSignUpUrl,
		t
	]);
	if (children) return /* @__PURE__ */ jsx("div", {
		className: containerClasses,
		children: children({
			components: currentFlow?.data?.components || [],
			errors: formErrors,
			handleInputChange,
			handleSubmit,
			isLoading,
			isValid: isFormValid,
			messages: flowMessages || [],
			subtitle: flowSubtitle || t("signup.subheading"),
			title: flowTitle || t("signup.heading"),
			touched: touchedFields,
			validateForm,
			values: formValues
		})
	});
	if (!isFlowInitialized && isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			className: styles.loadingContainer,
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "medium" })
		}) })
	});
	if (!currentFlow) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			className: errorClasses,
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") }), /* @__PURE__ */ jsx(Alert_default.Description, { children: t("errors.signup.flow.initialization.failure") })]
		}) })
	});
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles.header,
			children: [showTitle && /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: flowTitle || t("signup.heading")
			}), showSubtitle && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles.subtitle,
				children: flowSubtitle || t("signup.subheading")
			})]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
			className: styles.flowMessagesContainer,
			children: flowMessages.map((message, index) => /* @__PURE__ */ jsx(Alert_default, {
				variant: message.type?.toLowerCase() === "error" ? "error" : "info",
				className: cx(styles.flowMessageItem, messageClasses),
				children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
			}, message.id || index))
		}), /* @__PURE__ */ jsx("div", {
			className: styles.contentContainer,
			children: currentFlow.data?.components && currentFlow.data.components.length > 0 ? renderComponents(currentFlow.data.components) : /* @__PURE__ */ jsx(Alert_default, {
				variant: "warning",
				children: /* @__PURE__ */ jsx(Typography_default, {
					variant: "body1",
					children: t("errors.signup.components.not.available")
				})
			})
		})] })]
	});
};
/**
* BaseSignUp component that provides embedded sign-up flow for ThunderID.
* This component handles both the presentation layer and sign-up flow logic.
* It accepts API functions as props to maintain framework independence.
*
* @internal
*/
const BaseSignUp$2 = ({ showLogo = true,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	return /* @__PURE__ */ jsxs("div", { children: [showLogo && /* @__PURE__ */ jsx("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ jsx(Logo_default, { size: "large" })
	}), /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseSignUpContent$1, {
		showLogo,
		...rest
	}) })] });
};
var BaseSignUp_default$2 = BaseSignUp$2;

//#endregion
//#region src/utils/v2/getAuthComponentHeadings.ts
/**
* Extracts heading and subheading components from authentication flow components
* and provides resolved title/subtitle text with fallback logic.
*
* This utility helps maintain consistent heading extraction across authentication
* components (SignIn, SignUp, etc.) by identifying heading components within the
* flow structure and providing clean fallback behavior.
*
* @param components - Array of flow components to search
* @param flowTitle - Title from flow context (highest priority)
* @param flowSubtitle - Subtitle from flow context (highest priority)
* @param defaultTitle - Default title fallback (lowest priority)
* @param defaultSubtitle - Default subtitle fallback (lowest priority)
* @returns Object with resolved title and subtitle text, plus filtered components
*
* @example
* ```typescript
* const result = getAuthComponentHeadings(
*   components,
*   flowTitle,
*   flowSubtitle,
*   t('signin.heading'),
*   t('signin.subheading')
* );
*
* // Use resolved titles
* <Card.Title>{result.title}</Card.Title>
* <Typography>{result.subtitle}</Typography>
*
* // Render filtered components (without headings)
* renderComponents(result.componentsWithoutHeadings);
* ```
*/
const getAuthComponentHeadings = (components, flowTitle, flowSubtitle, defaultTitle, defaultSubtitle) => {
	let heading = null;
	let subheading = null;
	/**
	* Recursively search for heading components
	*/
	const findHeadings = (comps) => {
		for (const component of comps) {
			if (component.type === "TEXT" && component.variant?.startsWith("HEADING_")) {
				if (!heading) heading = component;
				else if (!subheading) {
					subheading = component;
					break;
				}
			}
			if (component.components && component.components.length > 0) {
				findHeadings(component.components);
				if (heading && subheading) break;
			}
		}
	};
	/**
	* Filter out heading components from the flow
	*/
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
	/**
	* Extract text content from a component
	*/
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
//#region src/components/presentation/auth/SignUp/v2/BaseSignUp.tsx
const logger$3 = createPackageComponentLogger("@thunderid/react", "BaseSignUp");
/**
* Internal component that consumes FlowContext and renders the sign-up UI.
*/
const BaseSignUpContent = ({ afterSignUpUrl, onInitialize, onSubmit, onError, onFlowChange, onComplete, error: externalError, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = useTheme_default();
	const customRenderers = useContext(ComponentRendererContext_default);
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
	const { meta, isInitialized: isSdkInitialized, getStorageManager } = useThunderID_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const [isLoading, setIsLoading] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const [apiError, setApiError] = useState(null);
	const [passkeyState, setPasskeyState] = useState({
		actionId: null,
		creationOptions: null,
		error: null,
		executionId: null,
		isActive: false
	});
	const challengeTokenRef = useRef(null);
	const initializationAttemptedRef = useRef(false);
	const passkeyProcessedRef = useRef(false);
	/**
	* Restore any challenge token persisted before an OAuth redirect.
	*/
	useEffect(() => {
		if (!isSdkInitialized) return;
		(async () => {
			try {
				const tempData = await (await getStorageManager())?.getTemporaryData();
				if (tempData?.challengeToken) challengeTokenRef.current = tempData.challengeToken;
			} catch {}
		})();
	}, [isSdkInitialized]);
	/**
	* Updates challengeTokenRef immediately (stale-closure safe) and persists via
	* the provider's StorageManager so the token survives OAuth redirects.
	*/
	const setChallengeToken = async (challengeToken) => {
		challengeTokenRef.current = challengeToken;
		try {
			const storageManager = await getStorageManager();
			if (storageManager) if (challengeToken) await storageManager.setTemporaryDataParameter("challengeToken", challengeToken);
			else await storageManager.removeTemporaryDataParameter("challengeToken");
		} catch {
			logger$3.warn("Failed to persist challenge token in storage.");
		}
	};
	/**
	* Handle error responses and extract meaningful error messages
	* Uses the transformer's extractErrorMessage function.
	*/
	const handleError = useCallback((error) => {
		const errorMessage = error?.failureReason || extractErrorMessage(error, t);
		setApiError(error instanceof Error ? error : new Error(errorMessage));
		clearMessages();
		addMessage({
			message: errorMessage,
			type: "error"
		});
	}, [
		t,
		addMessage,
		clearMessages
	]);
	/**
	* Normalize flow response to ensure component-driven format
	* Uses normalizeFlowResponse for modern API format responses
	*/
	const normalizeFlowResponseLocal = useCallback((response) => {
		if (response?.data?.components && Array.isArray(response.data.components)) return response;
		if (response?.data) {
			const { components } = normalizeFlowResponse(response, t, {
				defaultErrorKey: "components.signUp.errors.generic",
				resolveTranslations: false
			}, meta);
			return {
				...response,
				data: {
					...response.data,
					components
				}
			};
		}
		return response;
	}, [t, children]);
	/**
	* Extract form fields from flow components
	*/
	const extractFormFields = useCallback((components) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === EmbeddedFlowComponentTypeV2.TextInput || component.type === EmbeddedFlowComponentTypeV2.PasswordInput || component.type === EmbeddedFlowComponentTypeV2.EmailInput || component.type === EmbeddedFlowComponentTypeV2.Select) {
					const fieldName = component.ref || component.id;
					fields.push({
						initialValue: "",
						name: fieldName,
						required: component.required || false,
						validator: (value) => {
							if (component.required && (!value || value.trim() === "")) return t("validations.required.field.error");
							if ((component.type === EmbeddedFlowComponentTypeV2.EmailInput || component.variant === "EMAIL") && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("field.email.invalid");
							return null;
						}
					});
				}
				if (component.components && Array.isArray(component.components)) processComponents(component.components);
			});
		};
		processComponents(components);
		return fields;
	}, [t]);
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, validateForm, touchAllFields, reset: resetForm } = useForm({
		fields: currentFlow?.data?.components ? extractFormFields(currentFlow.data.components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: false
	});
	/**
	* Setup form fields based on the current flow.
	*/
	const setupFormFields = useCallback((flowResponse) => {
		const fields = extractFormFields(flowResponse.data?.components || []);
		const initialValues = {};
		fields.forEach((field) => {
			initialValues[field.name] = field.initialValue || "";
		});
		resetForm();
		Object.keys(initialValues).forEach((key) => {
			setFormValue(key, initialValues[key]);
		});
	}, [
		extractFormFields,
		resetForm,
		setFormValue
	]);
	/**
	* Handle input value changes.
	* Only updates the value without marking as touched.
	* Touched state is set on blur to avoid premature validation.
	*/
	const handleInputChange = (name, value) => {
		setFormValue(name, value);
	};
	/**
	* Handle input blur event.
	* Marks the field as touched, which triggers validation.
	*/
	const handleInputBlur = (name) => {
		setFormTouched(name, true);
	};
	/**
	* Check if the response contains a redirection URL and perform the redirect if necessary.
	* @param response - The sign-up response
	* @returns true if a redirect was performed, false otherwise
	*/
	const handleRedirectionIfNeeded = (response) => {
		if (response?.type === EmbeddedFlowResponseType.Redirection && response?.data?.redirectURL) {
			/**
			* Open a popup window to handle redirection prompts for social sign-up
			*/
			const redirectUrl = response.data.redirectURL;
			const popup = window.open(redirectUrl, "oauth_popup", "width=500,height=600,scrollbars=yes,resizable=yes");
			if (!popup) {
				logger$3.error("Failed to open popup window");
				return false;
			}
			let hasProcessedCallback = false;
			let popupMonitor = null;
			let messageHandler = null;
			/**
			* Clean up event listener and popup monitor
			*/
			const cleanup = () => {
				if (messageHandler) window.removeEventListener("message", messageHandler);
				if (popupMonitor) clearInterval(popupMonitor);
			};
			/**
			* Add an event listener to the window to capture the message from the popup
			*/
			messageHandler = async function messageEventHandler(event) {
				/**
				* Check if the message is from our popup window
				*/
				if (event.source !== popup) return;
				/**
				* Check the origin of the message to ensure it's from a trusted source
				*/
				const expectedOrigin = afterSignUpUrl ? new URL(afterSignUpUrl).origin : window.location.origin;
				if (event.origin !== expectedOrigin && event.origin !== window.location.origin) return;
				const { code, state } = event.data;
				if (code && state) {
					hasProcessedCallback = true;
					const payload = {
						...currentFlow.executionId && { executionId: currentFlow.executionId },
						action: "",
						flowType: currentFlow.flowType || "REGISTRATION",
						inputs: {
							code,
							state
						},
						...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
					};
					try {
						const continueResponse = await onSubmit(payload);
						onFlowChange?.(continueResponse);
						if (continueResponse.flowStatus === EmbeddedFlowStatus.Complete) onComplete?.(continueResponse);
						else if (continueResponse.flowStatus === EmbeddedFlowStatus.Incomplete) {
							setCurrentFlow(continueResponse);
							setupFormFields(continueResponse);
						}
						popup.close();
						cleanup();
					} catch (err) {
						handleError(err);
						onError?.(err);
						popup.close();
						cleanup();
					}
				}
			};
			window.addEventListener("message", messageHandler);
			/**
			* Monitor popup for closure and URL changes
			*/
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
								logger$3.error("OAuth error:");
								popup.close();
								cleanup();
								return;
							}
							if (code && state) {
								const payload = {
									...currentFlow.executionId && { executionId: currentFlow.executionId },
									action: "",
									flowType: currentFlow.flowType || "REGISTRATION",
									inputs: {
										code,
										state
									},
									...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
								};
								try {
									const continueResponse = await onSubmit(payload);
									onFlowChange?.(continueResponse);
									if (continueResponse.flowStatus === EmbeddedFlowStatus.Complete) onComplete?.(continueResponse);
									else if (continueResponse.flowStatus === EmbeddedFlowStatus.Incomplete) {
										setCurrentFlow(continueResponse);
										setupFormFields(continueResponse);
									}
									popup.close();
								} catch (err) {
									handleError(err);
									onError?.(err);
									popup.close();
								}
							}
						}
					} catch (e) {}
				} catch (e) {
					logger$3.error("Error monitoring popup:");
				}
			}, 1e3);
			return true;
		}
		return false;
	};
	/**
	* Handle component submission (for buttons outside forms).
	*/
	const handleSubmit = async (component, data, skipValidation) => {
		if (!currentFlow) return;
		if (!skipValidation) {
			touchAllFields();
			if (!validateForm().isValid) return;
		}
		setIsLoading(true);
		setApiError(null);
		clearMessages();
		try {
			const filteredInputs = {};
			if (data) Object.entries(data).forEach(([key, value]) => {
				if (value !== null && value !== void 0 && value !== "") filteredInputs[key] = value;
			});
			const response = normalizeFlowResponseLocal(await onSubmit({
				...currentFlow.executionId && { executionId: currentFlow.executionId },
				flowType: currentFlow.flowType || "REGISTRATION",
				...component.id && { action: component.id },
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {},
				inputs: filteredInputs
			}));
			onFlowChange?.(response);
			await setChallengeToken(response.challengeToken ?? null);
			if (response.flowStatus === EmbeddedFlowStatus.Complete) {
				onComplete?.(response);
				return;
			}
			if (response.flowStatus === EmbeddedFlowStatus.Incomplete) {
				if (handleRedirectionIfNeeded(response)) return;
				if (response.data?.additionalData?.passkeyCreationOptions) {
					const { passkeyCreationOptions } = response.data.additionalData;
					const effectiveExecutionIdForPasskey = response.executionId || currentFlow?.executionId;
					passkeyProcessedRef.current = false;
					setPasskeyState({
						actionId: component.id || "submit",
						creationOptions: passkeyCreationOptions,
						error: null,
						executionId: effectiveExecutionIdForPasskey,
						isActive: true
					});
					setIsLoading(false);
					return;
				}
				setCurrentFlow(response);
				setupFormFields(response);
			}
		} catch (err) {
			handleError(err);
			onError?.(err);
		} finally {
			setIsLoading(false);
		}
	};
	/**
	* Handle passkey registration when passkey state becomes active.
	* This effect auto-triggers the browser passkey popup and submits the result.
	*/
	useEffect(() => {
		if (!passkeyState.isActive || !passkeyState.creationOptions || !passkeyState.executionId) return;
		if (passkeyProcessedRef.current) return;
		passkeyProcessedRef.current = true;
		const performPasskeyRegistration = async () => {
			const passkeyResponse = await handlePasskeyRegistration(passkeyState.creationOptions);
			const passkeyResponseObj = JSON.parse(passkeyResponse);
			const inputs = {
				attestationObject: passkeyResponseObj.response.attestationObject,
				clientDataJSON: passkeyResponseObj.response.clientDataJSON,
				credentialId: passkeyResponseObj.id
			};
			const processedResponse = normalizeFlowResponseLocal(await onSubmit({
				actionId: passkeyState.actionId || "submit",
				executionId: passkeyState.executionId,
				flowType: currentFlow?.flowType || "REGISTRATION",
				inputs,
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
			}));
			onFlowChange?.(processedResponse);
			if (processedResponse.flowStatus === EmbeddedFlowStatus.Complete) onComplete?.(processedResponse);
			else {
				setCurrentFlow(processedResponse);
				setupFormFields(processedResponse);
			}
		};
		performPasskeyRegistration().then(() => {
			setPasskeyState({
				actionId: null,
				creationOptions: null,
				error: null,
				executionId: null,
				isActive: false
			});
		}).catch((error) => {
			setPasskeyState((prev) => ({
				...prev,
				error,
				isActive: false
			}));
			handleError(error);
			onError?.(error);
		});
	}, [
		passkeyState.isActive,
		passkeyState.creationOptions,
		passkeyState.executionId
	]);
	const containerClasses = cx([
		withVendorCSSClassPrefix("signup"),
		withVendorCSSClassPrefix(`signup--${size}`),
		withVendorCSSClassPrefix(`signup--${variant}`)
	], className);
	const inputClasses = cx([
		withVendorCSSClassPrefix("signup__input"),
		size === "small" && withVendorCSSClassPrefix("signup__input--small"),
		size === "large" && withVendorCSSClassPrefix("signup__input--large")
	], inputClassName);
	const buttonClasses = cx([
		withVendorCSSClassPrefix("signup__button"),
		size === "small" && withVendorCSSClassPrefix("signup__button--small"),
		size === "large" && withVendorCSSClassPrefix("signup__button--large")
	], buttonClassName);
	const errorClasses = cx([withVendorCSSClassPrefix("signup__error")], errorClassName);
	const messageClasses = cx([withVendorCSSClassPrefix("signup__messages")], messageClassName);
	/**
	* Render form components based on flow data using the factory
	*/
	const renderComponents = useCallback((components) => renderSignUpComponents(components, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		_customRenderers: customRenderers,
		_theme: theme,
		buttonClassName: buttonClasses,
		inputClassName: inputClasses,
		onInputBlur: handleInputBlur,
		onSubmit: handleSubmit,
		size,
		variant
	}), [
		customRenderers,
		formValues,
		touchedFields,
		formErrors,
		isFormValid,
		isLoading,
		size,
		theme,
		variant,
		inputClasses,
		buttonClasses,
		handleSubmit,
		handleInputBlur
	]);
	/**
	* Parse URL parameters to check for OAuth redirect state.
	*/
	const getUrlParams$1 = () => {
		const urlParams = new URL(window?.location?.href ?? "").searchParams;
		return {
			code: urlParams.get("code"),
			error: urlParams.get("error"),
			state: urlParams.get("state")
		};
	};
	useEffect(() => {
		const urlParams = getUrlParams$1();
		if (urlParams.code || urlParams.state) return;
		if (isInitialized && !isFlowInitialized && !initializationAttemptedRef.current) {
			initializationAttemptedRef.current = true;
			(async () => {
				setIsLoading(true);
				setApiError(null);
				clearMessages();
				try {
					const response = normalizeFlowResponseLocal(await onInitialize?.());
					await setChallengeToken(response.challengeToken ?? null);
					setCurrentFlow(response);
					setIsFlowInitialized(true);
					onFlowChange?.(response);
					if (response.flowStatus === EmbeddedFlowStatus.Complete) {
						onComplete?.(response);
						return;
					}
					if (response.flowStatus === EmbeddedFlowStatus.Incomplete) setupFormFields(response);
				} catch (err) {
					handleError(err);
					onError?.(err);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [
		isInitialized,
		isFlowInitialized,
		onInitialize,
		onComplete,
		onError,
		onFlowChange,
		setupFormFields,
		normalizeFlowResponseLocal,
		afterSignUpUrl,
		t
	]);
	if (children) return /* @__PURE__ */ jsx("div", {
		className: containerClasses,
		children: children({
			components: currentFlow?.data?.components || [],
			error: apiError,
			fieldErrors: formErrors,
			handleInputChange,
			handleSubmit,
			isLoading,
			isValid: isFormValid,
			messages: flowMessages || [],
			subtitle: flowSubtitle || t("signup.subheading"),
			title: flowTitle || t("signup.heading"),
			touched: touchedFields,
			validateForm: () => {
				const result = validateForm();
				return {
					fieldErrors: result.errors,
					isValid: result.isValid
				};
			},
			values: formValues
		})
	});
	if (!isFlowInitialized && isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			className: styles.loadingContainer,
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "medium" })
		}) })
	});
	if (!currentFlow) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			className: errorClasses,
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") }), /* @__PURE__ */ jsx(Alert_default.Description, { children: t("errors.signup.flow.initialization.failure") })]
		}) })
	});
	const { title, subtitle, componentsWithoutHeadings } = getAuthComponentHeadings_default(currentFlow.data?.components || [], flowTitle, flowSubtitle, t("signup.heading"), t("signup.subheading"));
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles.header,
			children: [showTitle && /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: title
			}), showSubtitle && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles.subtitle,
				children: subtitle
			})]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [
			externalError && /* @__PURE__ */ jsx("div", {
				className: styles.flowMessagesContainer,
				children: /* @__PURE__ */ jsx(Alert_default, {
					variant: "error",
					className: cx(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: externalError.message })
				})
			}),
			flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
				className: styles.flowMessagesContainer,
				children: flowMessages.map((message, index) => /* @__PURE__ */ jsx(Alert_default, {
					variant: message.type?.toLowerCase() === "error" ? "error" : "info",
					className: cx(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
				}, message.id || index))
			}),
			/* @__PURE__ */ jsx("div", {
				className: styles.contentContainer,
				children: componentsWithoutHeadings && componentsWithoutHeadings.length > 0 ? renderComponents(componentsWithoutHeadings) : /* @__PURE__ */ jsx(Alert_default, {
					variant: "warning",
					children: /* @__PURE__ */ jsx(Typography_default, {
						variant: "body1",
						children: t("errors.signup.components.not.available")
					})
				})
			})
		] })]
	});
};
/**
* BaseSignUp component that provides embedded sign-up flow for ThunderIDV2.
* This component handles both the presentation layer and sign-up flow logic.
* It accepts API functions as props to maintain framework independence.
*/
const BaseSignUp$1 = ({ preferences, showLogo = true,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const content = /* @__PURE__ */ jsxs("div", { children: [showLogo && /* @__PURE__ */ jsx("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ jsx(Logo_default, { size: "large" })
	}), /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseSignUpContent, {
		showLogo,
		...rest
	}) })] });
	if (!preferences) return content;
	return /* @__PURE__ */ jsx(ComponentPreferencesContext_default.Provider, {
		value: preferences,
		children: content
	});
};
var BaseSignUp_default$1 = BaseSignUp$1;

//#endregion
//#region src/components/presentation/auth/SignUp/BaseSignUp.tsx
const BaseSignUp = (props) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(BaseSignUp_default$1, { ...props });
	return /* @__PURE__ */ jsx(BaseSignUp_default$2, { ...props });
};
var BaseSignUp_default = BaseSignUp;

//#endregion
//#region src/components/presentation/auth/SignUp/v1/SignUp.tsx
/**
* A styled SignUp component for ThunderID platform that provides embedded sign-up flow with pre-built styling.
* This component handles the API calls for sign-up and delegates UI logic to BaseSignUp.
*/
const SignUp$2 = ({ className, size = "medium", afterSignUpUrl, onError, onComplete, shouldRedirectAfterSignUp = true, children,...rest }) => {
	const { signUp, isInitialized } = useThunderID_default();
	/**
	* Initialize the sign-up flow.
	*/
	const handleInitialize = async (payload) => {
		return await signUp(payload || { flowType: EmbeddedFlowType.Registration });
	};
	/**
	* Handle sign-up steps.
	*/
	const handleOnSubmit = async (payload) => await signUp(payload);
	/**
	* Handle successful sign-up and redirect.
	*/
	const handleComplete = (response) => {
		onComplete?.(response);
		if (shouldRedirectAfterSignUp && response?.type !== EmbeddedFlowResponseType.Redirection && afterSignUpUrl) window.location.href = afterSignUpUrl;
		if (shouldRedirectAfterSignUp && response?.type === EmbeddedFlowResponseType.Redirection && response?.data?.redirectURL && !response.data.redirectURL.includes("oauth") && !response.data.redirectURL.includes("auth")) window.location.href = response.data.redirectURL;
	};
	return /* @__PURE__ */ jsx(BaseSignUp_default$2, {
		afterSignUpUrl,
		onInitialize: handleInitialize,
		onSubmit: handleOnSubmit,
		onError,
		onComplete: handleComplete,
		className,
		size,
		isInitialized,
		children,
		showLogo: true,
		showTitle: false,
		showSubtitle: false,
		...rest
	});
};
var SignUp_default$1 = SignUp$2;

//#endregion
//#region src/components/presentation/auth/SignUp/v2/SignUp.tsx
/**
* A styled SignUp component for ThunderIDV2 (AKA Thunder) platform that provides embedded sign-up flow with pre-built styling.
* This component handles the API calls for sign-up and delegates UI logic to BaseSignUp.
*/
const SignUp$1 = ({ className, size = "medium", afterSignUpUrl, onError, onComplete, shouldRedirectAfterSignUp = true, children,...rest }) => {
	const { signUp, isInitialized, applicationId } = useThunderID_default();
	/**
	* Initialize the sign-up flow.
	*/
	const handleInitialize = async (payload) => {
		const applicationIdFromUrl = new URL(window.location.href).searchParams.get("applicationId") ?? "";
		const effectiveApplicationId = applicationId || applicationIdFromUrl;
		return await signUp(payload || {
			flowType: EmbeddedFlowType.Registration,
			...effectiveApplicationId && { applicationId: effectiveApplicationId }
		});
	};
	/**
	* Handle sign-up steps.
	*/
	const handleOnSubmit = async (payload) => await signUp(payload);
	/**
	* Handle successful sign-up and redirect.
	*/
	const handleComplete = (response) => {
		onComplete?.(response);
		const oauthRedirectUrl = response?.redirectUrl;
		if (shouldRedirectAfterSignUp && oauthRedirectUrl) {
			window.location.href = oauthRedirectUrl;
			return;
		}
		if (shouldRedirectAfterSignUp && response?.type !== EmbeddedFlowResponseType.Redirection && afterSignUpUrl) window.location.href = afterSignUpUrl;
		if (shouldRedirectAfterSignUp && response?.type === EmbeddedFlowResponseType.Redirection && response?.data?.redirectURL && !response.data.redirectURL.includes("oauth") && !response.data.redirectURL.includes("auth")) window.location.href = response.data.redirectURL;
	};
	return /* @__PURE__ */ jsx(BaseSignUp_default$1, {
		afterSignUpUrl,
		onInitialize: handleInitialize,
		onSubmit: handleOnSubmit,
		onError,
		onComplete: handleComplete,
		className,
		size,
		isInitialized,
		children,
		showTitle: true,
		showSubtitle: true,
		...rest
	});
};
var SignUp_default$2 = SignUp$1;

//#endregion
//#region src/components/presentation/auth/SignUp/SignUp.tsx
/**
* A styled SignUp component that provides embedded sign-up flow with pre-built styling.
* This component routes to the appropriate version-specific implementation based on the platform.
*
* @example
* // Default UI
* ```tsx
* import { SignUp } from '@thunderid/react';
*
* const App = () => {
*   return (
*     <SignUp
*       onSuccess={(response) => {
*         console.log('Sign-up successful:', response);
*         // Handle successful sign-up (e.g., redirect, show confirmation)
*       }}
*       onError={(error) => {
*         console.error('Sign-up failed:', error);
*       }}
*       onComplete={(redirectUrl) => {
*         // Platform-specific redirect handling (e.g., Next.js router.push)
*         router.push(redirectUrl); // or window.location.href = redirectUrl
*       }}
*       size="medium"
*       variant="outlined"
*       afterSignUpUrl="/welcome"
*     />
*   );
* };
* ```
*
* @example
* // Custom UI with render props
* ```tsx
* import { SignUp } from '@thunderid/react';
*
* const App = () => {
*   return (
*     <SignUp
*       onError={(error) => console.error('Error:', error)}
*       onComplete={(response) => console.log('Success:', response)}
*     >
*       {({values, errors, handleInputChange, handleSubmit, isLoading, components}) => (
*         <div className="custom-signup">
*           <h1>Custom Sign Up</h1>
*           {isLoading ? (
*             <p>Loading...</p>
*           ) : (
*             <form onSubmit={(e) => {
*               e.preventDefault();
*               handleSubmit(components[0], values);
*             }}>
*               <input
*                 name="username"
*                 value={values.username || ''}
*                 onChange={(e) => handleInputChange('username', e.target.value)}
*               />
*               {errors.username && <span>{errors.username}</span>}
*               <button type="submit" disabled={isLoading}>
*                 {isLoading ? 'Signing up...' : 'Sign Up'}
*               </button>
*             </form>
*           )}
*         </div>
*       )}
*     </SignUp>
*   );
* };
* ```
*/
const SignUp = (props) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(SignUp_default$2, { ...props });
	return /* @__PURE__ */ jsx(SignUp_default$1, { ...props });
};
var SignUp_default = SignUp;

//#endregion
//#region src/components/presentation/auth/Recovery/v1/RecoveryOptionFactory.tsx
/**
* Creates the appropriate recovery component based on the component type.
*/
const createRecoveryComponent = ({ component, onSubmit,...rest }) => {
	switch (component.type) {
		case EmbeddedFlowComponentType$1.Typography: return /* @__PURE__ */ jsx(Typography_default$1, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType$1.Input: {
			const inputVariant = component.variant?.toUpperCase() ?? "";
			const inputType = component.config["type"]?.toLowerCase() ?? "";
			if (inputVariant === "EMAIL" || inputType === "email") return /* @__PURE__ */ jsx(EmailInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "PASSWORD" || inputType === "password") return /* @__PURE__ */ jsx(PasswordInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "TELEPHONE" || inputType === "tel") return /* @__PURE__ */ jsx(TelephoneInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "NUMBER" || inputType === "number") return /* @__PURE__ */ jsx(NumberInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "DATE" || inputType === "date") return /* @__PURE__ */ jsx(DateInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "CHECKBOX" || inputType === "checkbox") return /* @__PURE__ */ jsx(CheckboxInput_default, {
				component,
				onSubmit,
				...rest
			});
			return /* @__PURE__ */ jsx(TextInput_default, {
				component,
				onSubmit,
				...rest
			});
		}
		case EmbeddedFlowComponentType$1.Button: {
			const buttonVariant = component.variant?.toUpperCase();
			const buttonText = component.config["text"] || component.config["label"] || "";
			if (buttonVariant === "SOCIAL") {
				if (buttonText.toLowerCase().includes("google")) return /* @__PURE__ */ jsx(GoogleButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("github")) return /* @__PURE__ */ jsx(GitHubButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("microsoft")) return /* @__PURE__ */ jsx(MicrosoftButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("facebook")) return /* @__PURE__ */ jsx(FacebookButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("linkedin")) return /* @__PURE__ */ jsx(LinkedInButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("ethereum")) return /* @__PURE__ */ jsx(SignInWithEthereumButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
			}
			return /* @__PURE__ */ jsx(SubmitButton_default, {
				component,
				onSubmit,
				...rest
			});
		}
		case EmbeddedFlowComponentType$1.Form: return /* @__PURE__ */ jsx(FormContainer_default, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType$1.Select: return /* @__PURE__ */ jsx(SelectInput_default, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType$1.Divider: return /* @__PURE__ */ jsx(DividerComponent_default, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType$1.Image: return /* @__PURE__ */ jsx(ImageComponent_default, {
			component,
			onSubmit,
			...rest
		});
		default: return /* @__PURE__ */ jsx("div", {});
	}
};
/**
* Convenience function that creates the appropriate recovery component from flow component data.
*/
const createRecoveryOptionFromComponent = (component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => createRecoveryComponent({
	component,
	formErrors,
	formValues,
	isFormValid,
	isLoading,
	onInputChange,
	touchedFields,
	...options
});
/**
* Processes an array of components and renders them as React elements for recovery flow.
*/
const renderRecoveryComponents$1 = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createRecoveryOptionFromComponent(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, {
	...options,
	key: component.id || index
})).filter(Boolean);

//#endregion
//#region src/components/presentation/auth/Recovery/v1/BaseRecovery.tsx
/**
* Internal component that renders the recovery UI and manages flow state.
*
* @internal
*/
const BaseRecoveryContent$1 = ({ onInitialize, onSubmit, onError, onFlowChange, onComplete, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = useTheme_default();
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
	useThunderID_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const handleError = useCallback((error) => {
		let errorMessage = t("errors.recovery.flow.failure");
		if (error && typeof error === "object") {
			if (error.code && (error.message || error.description)) errorMessage = error.description || error.message;
			else if (error instanceof Error && error.name === "ThunderIDAPIError") try {
				const errorResponse = JSON.parse(error.message);
				errorMessage = errorResponse.description || errorResponse.message || error.message;
			} catch {
				errorMessage = error.message;
			}
			else if (error.message) errorMessage = error.message;
		} else if (typeof error === "string") errorMessage = error;
		clearMessages();
		addMessage({
			message: errorMessage,
			type: "error"
		});
	}, [
		t,
		addMessage,
		clearMessages
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const initializationAttemptedRef = useRef(false);
	const extractFormFields = useCallback((components) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === EmbeddedFlowComponentType$1.Input) {
					const config = component.config || {};
					fields.push({
						initialValue: config.defaultValue || "",
						name: config.name || component.id,
						required: config.required || false,
						validator: (value) => {
							if (config.required && (!value || value.trim() === "")) return t("validations.required.field.error");
							if (config.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("field.email.invalid");
							if (config.type === "password" && value && value.length < 8) return t("field.password.weak");
							return null;
						}
					});
				}
				if (component.components && Array.isArray(component.components)) processComponents(component.components);
			});
		};
		processComponents(components);
		return fields;
	}, [t]);
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, validateForm, touchAllFields, reset: resetForm } = useForm({
		fields: currentFlow?.data?.components ? extractFormFields(currentFlow.data.components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: true
	});
	const setupFormFields = useCallback((flowResponse) => {
		const fields = extractFormFields(flowResponse.data?.components || []);
		const initialValues = {};
		fields.forEach((field) => {
			initialValues[field.name] = field.initialValue || "";
		});
		resetForm();
		Object.keys(initialValues).forEach((key) => setFormValue(key, initialValues[key]));
	}, [
		extractFormFields,
		resetForm,
		setFormValue
	]);
	const handleInputChange = useCallback((name, value) => {
		setFormValue(name, value);
		setFormTouched(name, true);
	}, [setFormValue, setFormTouched]);
	const handleSubmit = async (component, data, skipValidation) => {
		if (!currentFlow) return;
		if (!skipValidation) {
			touchAllFields();
			if (!validateForm().isValid) return;
		}
		setIsLoading(true);
		clearMessages();
		try {
			const filteredInputs = {};
			if (data) Object.entries(data).forEach(([key, value]) => {
				if (value !== null && value !== void 0 && value !== "") filteredInputs[key] = value;
			});
			const payload = {
				...currentFlow.flowId && { flowId: currentFlow.flowId },
				flowType: currentFlow.flowType || "RECOVERY",
				inputs: filteredInputs,
				...component.id && { actionId: component.id }
			};
			const response = await onSubmit?.(payload);
			if (!response) return;
			onFlowChange?.(response);
			if (response.flowStatus === EmbeddedFlowStatus.Complete) {
				onComplete?.(response);
				return;
			}
			if (response.flowStatus === EmbeddedFlowStatus.Incomplete) {
				setCurrentFlow(response);
				setupFormFields(response);
			}
		} catch (err) {
			handleError(err);
			onError?.(err);
		} finally {
			setIsLoading(false);
		}
	};
	const containerClasses = cx([
		withVendorCSSClassPrefix("recovery"),
		withVendorCSSClassPrefix(`recovery--${size}`),
		withVendorCSSClassPrefix(`recovery--${variant}`)
	], className);
	const inputClasses = cx([
		withVendorCSSClassPrefix("recovery__input"),
		size === "small" && withVendorCSSClassPrefix("recovery__input--small"),
		size === "large" && withVendorCSSClassPrefix("recovery__input--large")
	], inputClassName);
	const buttonClasses = cx([
		withVendorCSSClassPrefix("recovery__button"),
		size === "small" && withVendorCSSClassPrefix("recovery__button--small"),
		size === "large" && withVendorCSSClassPrefix("recovery__button--large")
	], buttonClassName);
	const errorClasses = cx([withVendorCSSClassPrefix("recovery__error")], errorClassName);
	const messageClasses = cx([withVendorCSSClassPrefix("recovery__messages")], messageClassName);
	const renderComponents = useCallback((components) => renderRecoveryComponents$1(components, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		buttonClassName: buttonClasses,
		inputClassName: inputClasses,
		onSubmit: handleSubmit,
		size,
		variant
	}), [
		buttonClasses,
		formErrors,
		formValues,
		handleInputChange,
		handleSubmit,
		inputClasses,
		isFormValid,
		isLoading,
		size,
		touchedFields,
		variant
	]);
	useEffect(() => {
		if (isInitialized && !isFlowInitialized && !initializationAttemptedRef.current) {
			initializationAttemptedRef.current = true;
			(async () => {
				setIsLoading(true);
				clearMessages();
				try {
					const response = await onInitialize?.();
					setCurrentFlow(response);
					setIsFlowInitialized(true);
					onFlowChange?.(response);
					if (response.flowStatus === EmbeddedFlowStatus.Complete) {
						onComplete?.(response);
						return;
					}
					if (response.flowStatus === EmbeddedFlowStatus.Incomplete) setupFormFields(response);
				} catch (err) {
					handleError(err);
					onError?.(err);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [
		clearMessages,
		handleError,
		isFlowInitialized,
		isInitialized,
		onComplete,
		onError,
		onFlowChange,
		onInitialize,
		setupFormFields
	]);
	if (children) return /* @__PURE__ */ jsx("div", {
		className: containerClasses,
		children
	});
	if (!isFlowInitialized && isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			className: styles.loadingContainer,
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "medium" })
		}) })
	});
	if (!currentFlow) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			className: errorClasses,
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") }), /* @__PURE__ */ jsx(Alert_default.Description, { children: t("errors.recovery.flow.initialization.failure") })]
		}) })
	});
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles.header,
			children: [showTitle && /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: flowTitle || t("recovery.heading")
			}), showSubtitle && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles.subtitle,
				children: flowSubtitle || t("recovery.subheading")
			})]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
			className: styles.flowMessagesContainer,
			children: flowMessages.map((message, index) => /* @__PURE__ */ jsx(Alert_default, {
				variant: message.type?.toLowerCase() === "error" ? "error" : "info",
				className: cx(styles.flowMessageItem, messageClasses),
				children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
			}, message.id || index))
		}), /* @__PURE__ */ jsx("div", {
			className: styles.contentContainer,
			children: currentFlow.data?.components && currentFlow.data.components.length > 0 ? renderComponents(currentFlow.data.components) : /* @__PURE__ */ jsx(Alert_default, {
				variant: "warning",
				children: /* @__PURE__ */ jsx(Typography_default, {
					variant: "body1",
					children: t("errors.recovery.components.not.available")
				})
			})
		})] })]
	});
};
/**
* BaseRecovery component for ThunderID V1 that provides an embedded account/password recovery flow.
* Accepts API functions as props to maintain framework independence.
*
* @internal
*/
const BaseRecovery$2 = ({ showLogo = true,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	return /* @__PURE__ */ jsxs("div", { children: [showLogo && /* @__PURE__ */ jsx("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ jsx(Logo_default, { size: "large" })
	}), /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseRecoveryContent$1, {
		showLogo,
		...rest
	}) })] });
};
var BaseRecovery_default$2 = BaseRecovery$2;

//#endregion
//#region src/components/presentation/auth/Recovery/v2/BaseRecovery.tsx
/**
* Internal component that renders the V2 recovery UI and manages flow state.
*
* @internal
*/
const BaseRecoveryContent = ({ onInitialize, onSubmit, onError, onFlowChange, onComplete, error: externalError, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = useTheme_default();
	const customRenderers = useContext(ComponentRendererContext_default);
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
	const { meta } = useThunderID_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const [isLoading, setIsLoading] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const [apiError, setApiError] = useState(null);
	const initializationAttemptedRef = useRef(false);
	const challengeTokenRef = useRef(null);
	const handleError = useCallback((error) => {
		const errorMessage = error?.failureReason || extractErrorMessage(error, t);
		setApiError(error instanceof Error ? error : new Error(errorMessage));
		clearMessages();
		addMessage({
			message: errorMessage,
			type: "error"
		});
	}, [
		t,
		addMessage,
		clearMessages
	]);
	const normalizeFlowResponseLocal = useCallback((response) => {
		if (response?.data?.components && Array.isArray(response.data.components)) return response;
		if (response?.data) {
			const { components } = normalizeFlowResponse(response, t, {
				defaultErrorKey: "components.recovery.errors.generic",
				resolveTranslations: false
			}, meta);
			return {
				...response,
				data: {
					...response.data,
					components
				}
			};
		}
		return response;
	}, [t, meta]);
	const extractFormFields = useCallback((components) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === EmbeddedFlowComponentTypeV2.TextInput || component.type === EmbeddedFlowComponentTypeV2.PasswordInput || component.type === EmbeddedFlowComponentTypeV2.EmailInput || component.type === EmbeddedFlowComponentTypeV2.Select) {
					const fieldName = component.ref || component.id;
					fields.push({
						initialValue: "",
						name: fieldName,
						required: component.required || false,
						validator: (value) => {
							if (component.required && (!value || value.trim() === "")) return t("validations.required.field.error");
							if ((component.type === EmbeddedFlowComponentTypeV2.EmailInput || component.variant === "EMAIL") && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("field.email.invalid");
							return null;
						}
					});
				}
				if (component.components && Array.isArray(component.components)) processComponents(component.components);
			});
		};
		processComponents(components);
		return fields;
	}, [t]);
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, validateForm, touchAllFields, reset: resetForm } = useForm({
		fields: currentFlow?.data?.components ? extractFormFields(currentFlow.data.components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: false
	});
	const setupFormFields = useCallback((flowResponse) => {
		const fields = extractFormFields(flowResponse.data?.components || []);
		const initialValues = {};
		fields.forEach((field) => {
			initialValues[field.name] = field.initialValue || "";
		});
		resetForm();
		Object.keys(initialValues).forEach((key) => setFormValue(key, initialValues[key]));
	}, [
		extractFormFields,
		resetForm,
		setFormValue
	]);
	const handleInputChange = (name, value) => {
		setFormValue(name, value);
	};
	const handleInputBlur = (name) => {
		setFormTouched(name, true);
	};
	const handleSubmit = async (component, data, skipValidation) => {
		if (!currentFlow) return;
		if (!skipValidation) {
			touchAllFields();
			if (!validateForm().isValid) return;
		}
		setIsLoading(true);
		setApiError(null);
		clearMessages();
		try {
			const filteredInputs = {};
			if (data) Object.entries(data).forEach(([key, value]) => {
				if (value !== null && value !== void 0 && value !== "") filteredInputs[key] = value;
			});
			const payload = {
				...currentFlow.executionId && { executionId: currentFlow.executionId },
				flowType: currentFlow.flowType || "RECOVERY",
				...component.id && { action: component.id },
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {},
				inputs: filteredInputs
			};
			const rawResponse = await onSubmit?.(payload);
			if (!rawResponse) return;
			const response = normalizeFlowResponseLocal(rawResponse);
			onFlowChange?.(response);
			if (response.challengeToken !== void 0) challengeTokenRef.current = response.challengeToken ?? null;
			if (response.flowStatus === EmbeddedFlowStatus.Complete) {
				onComplete?.(response);
				return;
			}
			if (response.flowStatus === EmbeddedFlowStatus.Incomplete) {
				setCurrentFlow(response);
				setupFormFields(response);
			}
		} catch (err) {
			handleError(err);
			onError?.(err);
		} finally {
			setIsLoading(false);
		}
	};
	const containerClasses = cx([
		withVendorCSSClassPrefix("recovery"),
		withVendorCSSClassPrefix(`recovery--${size}`),
		withVendorCSSClassPrefix(`recovery--${variant}`)
	], className);
	const inputClasses = cx([
		withVendorCSSClassPrefix("recovery__input"),
		size === "small" && withVendorCSSClassPrefix("recovery__input--small"),
		size === "large" && withVendorCSSClassPrefix("recovery__input--large")
	], inputClassName);
	const buttonClasses = cx([
		withVendorCSSClassPrefix("recovery__button"),
		size === "small" && withVendorCSSClassPrefix("recovery__button--small"),
		size === "large" && withVendorCSSClassPrefix("recovery__button--large")
	], buttonClassName);
	const errorClasses = cx([withVendorCSSClassPrefix("recovery__error")], errorClassName);
	const messageClasses = cx([withVendorCSSClassPrefix("recovery__messages")], messageClassName);
	const renderComponents = useCallback((components) => renderRecoveryComponents(components, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		_customRenderers: customRenderers,
		_theme: theme,
		buttonClassName: buttonClasses,
		inputClassName: inputClasses,
		meta,
		onInputBlur: handleInputBlur,
		onSubmit: handleSubmit,
		size,
		variant
	}), [
		customRenderers,
		buttonClasses,
		formErrors,
		formValues,
		handleInputBlur,
		handleSubmit,
		inputClasses,
		isFormValid,
		meta,
		isLoading,
		size,
		theme,
		touchedFields,
		variant
	]);
	useEffect(() => {
		if (isInitialized && !isFlowInitialized && !initializationAttemptedRef.current) {
			initializationAttemptedRef.current = true;
			(async () => {
				setIsLoading(true);
				setApiError(null);
				clearMessages();
				try {
					const rawResponse = await onInitialize?.();
					if (!rawResponse) return;
					const response = normalizeFlowResponseLocal(rawResponse);
					if (response.challengeToken !== void 0) challengeTokenRef.current = response.challengeToken ?? null;
					setCurrentFlow(response);
					setIsFlowInitialized(true);
					onFlowChange?.(response);
					if (response.flowStatus === EmbeddedFlowStatus.Complete) {
						onComplete?.(response);
						return;
					}
					if (response.flowStatus === EmbeddedFlowStatus.Incomplete) setupFormFields(response);
				} catch (err) {
					handleError(err);
					onError?.(err);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [
		isFlowInitialized,
		isInitialized,
		normalizeFlowResponseLocal,
		onComplete,
		onError,
		onFlowChange,
		onInitialize,
		setupFormFields,
		t
	]);
	if (children) {
		if (typeof children === "function") return /* @__PURE__ */ jsx("div", {
			className: containerClasses,
			children: children({
				components: currentFlow?.data?.components || [],
				error: apiError,
				fieldErrors: formErrors,
				handleInputChange,
				handleSubmit,
				isLoading,
				isValid: isFormValid,
				messages: flowMessages || [],
				meta,
				subtitle: flowSubtitle || t("recovery.subheading"),
				title: flowTitle || t("recovery.heading"),
				touched: touchedFields,
				validateForm: () => {
					const result = validateForm();
					return {
						fieldErrors: result.errors,
						isValid: result.isValid
					};
				},
				values: formValues
			})
		});
		return /* @__PURE__ */ jsx("div", {
			className: containerClasses,
			children
		});
	}
	if (!isFlowInitialized && isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			className: styles.loadingContainer,
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "medium" })
		}) })
	});
	if (!currentFlow) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			className: errorClasses,
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") }), /* @__PURE__ */ jsx(Alert_default.Description, { children: t("errors.recovery.flow.initialization.failure") })]
		}) })
	});
	const { title, subtitle, componentsWithoutHeadings } = getAuthComponentHeadings_default(currentFlow.data?.components || [], flowTitle, flowSubtitle, t("recovery.heading"), t("recovery.subheading"));
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles.header,
			children: [showTitle && /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: title
			}), showSubtitle && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles.subtitle,
				children: subtitle
			})]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [
			externalError && /* @__PURE__ */ jsx("div", {
				className: styles.flowMessagesContainer,
				children: /* @__PURE__ */ jsx(Alert_default, {
					variant: "error",
					className: cx(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: externalError.message })
				})
			}),
			flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
				className: styles.flowMessagesContainer,
				children: flowMessages.map((message, index) => /* @__PURE__ */ jsx(Alert_default, {
					variant: message.type?.toLowerCase() === "error" ? "error" : "info",
					className: cx(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
				}, message.id || index))
			}),
			/* @__PURE__ */ jsx("div", {
				className: styles.contentContainer,
				children: componentsWithoutHeadings && componentsWithoutHeadings.length > 0 ? renderComponents(componentsWithoutHeadings) : /* @__PURE__ */ jsx(Alert_default, {
					variant: "warning",
					children: /* @__PURE__ */ jsx(Typography_default, {
						variant: "body1",
						children: t("errors.recovery.components.not.available")
					})
				})
			})
		] })]
	});
};
/**
* BaseRecovery component for ThunderIDV2 that provides an embedded account/password recovery flow.
* Accepts API functions as props to maintain framework independence.
*/
const BaseRecovery$1 = ({ preferences, showLogo = true,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const content = /* @__PURE__ */ jsxs("div", { children: [showLogo && /* @__PURE__ */ jsx("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ jsx(Logo_default, { size: "large" })
	}), /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseRecoveryContent, {
		showLogo,
		...rest
	}) })] });
	if (!preferences) return content;
	return /* @__PURE__ */ jsx(ComponentPreferencesContext_default.Provider, {
		value: preferences,
		children: content
	});
};
var BaseRecovery_default$1 = BaseRecovery$1;

//#endregion
//#region src/components/presentation/auth/Recovery/BaseRecovery.tsx
const BaseRecovery = (props) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(BaseRecovery_default$1, { ...props });
	return /* @__PURE__ */ jsx(BaseRecovery_default$2, { ...props });
};
var BaseRecovery_default = BaseRecovery;

//#endregion
//#region src/components/presentation/auth/Recovery/v1/Recovery.tsx
/**
* Recovery component for ThunderID V1 that provides an embedded account/password recovery flow.
*/
const Recovery$2 = ({ className, size = "medium", afterRecoveryUrl, onError, onComplete, children,...rest }) => {
	const { recover, isInitialized } = useThunderID_default();
	const handleInitialize = async (payload) => {
		return await recover(payload || { flowType: EmbeddedFlowType.Recovery });
	};
	const handleOnSubmit = async (payload) => await recover(payload);
	const handleComplete = (response) => {
		onComplete?.(response);
		if (afterRecoveryUrl) window.location.href = afterRecoveryUrl;
	};
	return /* @__PURE__ */ jsx(BaseRecovery_default$2, {
		afterRecoveryUrl,
		onInitialize: handleInitialize,
		onSubmit: handleOnSubmit,
		onError,
		onComplete: handleComplete,
		className,
		size,
		isInitialized,
		showLogo: true,
		showTitle: false,
		showSubtitle: false,
		children,
		...rest
	});
};
var Recovery_default$1 = Recovery$2;

//#endregion
//#region src/components/presentation/auth/Recovery/v2/Recovery.tsx
/**
* Recovery component for ThunderIDV2 that provides an embedded account/password recovery flow.
*
* @example
* ```tsx
* // Default UI
* <Recovery
*   afterRecoveryUrl="/sign-in"
*   onComplete={(response) => console.log('Recovery complete', response)}
*   onError={(error) => console.error('Recovery failed', error)}
* />
*
* // Custom UI with render props
* <Recovery>
*   {({ values, fieldErrors, handleInputChange, handleSubmit, isLoading, components }) => (
*     <form onSubmit={(e) => { e.preventDefault(); handleSubmit(components[0], values); }}>
*       ...
*     </form>
*   )}
* </Recovery>
* ```
*/
const Recovery$1 = ({ className, size = "medium", afterRecoveryUrl, onError, onComplete, tokenUrlParam, children,...rest }) => {
	const { recover, isInitialized, applicationId } = useThunderID_default();
	return /* @__PURE__ */ jsx(BaseRecovery_default$1, {
		afterRecoveryUrl,
		onInitialize: useCallback(async (payload) => {
			const urlParams = new URL(window.location.href).searchParams;
			const applicationIdFromUrl = urlParams.get("applicationId");
			const effectiveApplicationId = applicationId ?? applicationIdFromUrl;
			if (tokenUrlParam) {
				const executionId = urlParams.get("executionId");
				const tokenValue = urlParams.get(tokenUrlParam);
				if (executionId && tokenValue) return await recover({
					executionId,
					inputs: { [tokenUrlParam]: tokenValue },
					verbose: true
				});
			}
			return await recover(payload || {
				flowType: EmbeddedFlowType.Recovery,
				...effectiveApplicationId && { applicationId: effectiveApplicationId }
			});
		}, [
			applicationId,
			tokenUrlParam,
			recover
		]),
		onSubmit: useCallback(async (payload) => await recover(payload), [recover]),
		onError,
		onComplete: useCallback((response) => {
			onComplete?.(response);
			if (afterRecoveryUrl) window.location.href = afterRecoveryUrl;
		}, [onComplete, afterRecoveryUrl]),
		className,
		size,
		isInitialized,
		showTitle: true,
		showSubtitle: true,
		children,
		...rest
	});
};
var Recovery_default$2 = Recovery$1;

//#endregion
//#region src/components/presentation/auth/Recovery/Recovery.tsx
/**
* Recovery component that provides an embedded account/password recovery flow.
* Routes to the appropriate version-specific implementation based on the platform.
*
* @example
* ```tsx
* import { Recovery } from '@thunderid/react';
*
* const App = () => (
*   <Recovery
*     afterRecoveryUrl="/sign-in"
*     onComplete={(response) => console.log('Recovery complete', response)}
*     onError={(error) => console.error('Recovery failed', error)}
*   />
* );
* ```
*
* @example
* // Custom UI with render props
* ```tsx
* <Recovery>
*   {({ values, fieldErrors, handleInputChange, handleSubmit, isLoading, components }) => (
*     <form onSubmit={(e) => { e.preventDefault(); handleSubmit(components[0], values); }}>
*       ...
*     </form>
*   )}
* </Recovery>
* ```
*/
const Recovery = (props) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(Recovery_default$2, { ...props });
	return /* @__PURE__ */ jsx(Recovery_default$1, { ...props });
};
var Recovery_default = Recovery;

//#endregion
//#region src/components/presentation/auth/InviteUser/v2/BaseInviteUser.styles.ts
/**
* Creates styles for the BaseInviteUser component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$13 = (theme, colorScheme) => useMemo(() => {
	const card = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      gap: calc(${theme.vars.spacing.unit} * 2);
      min-width: 420px;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const header = css`
      gap: 0;
      align-items: center;
    `;
	const title = css`
      margin: 0 0 calc(${theme.vars.spacing.unit} * 1) 0;
      color: ${theme.vars.colors.text.primary};
    `;
	return {
		card,
		header,
		subtitle: css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `,
		title
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.borderRadius.large,
	theme.vars.spacing.unit,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseInviteUser_styles_default = useStyles$13;

//#endregion
//#region src/components/presentation/auth/InviteUser/v2/BaseInviteUser.tsx
/**
* Base component for invite user flow.
* Handles the flow logic for creating a user and generating an invite link.
*
* When no children are provided, renders a default UI with:
* - Loading spinner during initialization
* - Error alerts for failures
* - Flow components (user type selection, user details form)
* - Invite link display with copy functionality
*
* Flow steps handled:
* 1. User type selection (if multiple types available)
* 2. User details input (username, email)
* 3. Invite link generation
*/
const BaseInviteUser = ({ onInitialize, onSubmit, onError, onFlowChange, className = "", children, fetchOrganizationUnitChildren, isInitialized = true, preferences, size = "medium", variant = "outlined", showTitle = true, showSubtitle = true }) => {
	const { meta, isInitialized: isSdkInitialized, getStorageManager } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { theme } = useTheme_default();
	const customRenderers = useContext(ComponentRendererContext_default);
	const styles = BaseInviteUser_styles_default(theme, theme.vars.colors.text.primary);
	const [isLoading, setIsLoading] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const [apiError, setApiError] = useState(null);
	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [touchedFields, setTouchedFields] = useState({});
	const [isFormValid, setIsFormValid] = useState(true);
	const challengeTokenRef = useRef(null);
	const initializationAttemptedRef = useRef(false);
	/**
	* Restore any challenge token persisted before an OAuth redirect.
	*/
	useEffect(() => {
		if (!isSdkInitialized) return;
		(async () => {
			try {
				const tempData = await (await getStorageManager())?.getTemporaryData();
				if (tempData?.challengeToken) challengeTokenRef.current = tempData.challengeToken;
			} catch {}
		})();
	}, [isSdkInitialized]);
	/**
	* Updates challengeTokenRef immediately (stale-closure safe) and persists via
	* the provider's StorageManager so the token survives OAuth redirects.
	*/
	const setChallengeToken = async (challengeToken) => {
		challengeTokenRef.current = challengeToken;
		try {
			const storageManager = await getStorageManager();
			if (storageManager) if (challengeToken) await storageManager.setTemporaryDataParameter("challengeToken", challengeToken);
			else await storageManager.removeTemporaryDataParameter("challengeToken");
		} catch {
			logger.warn("Failed to persist challenge token in storage.");
		}
	};
	/**
	* Handle error responses and extract meaningful error messages.
	* Uses the transformer's extractErrorMessage function for consistency.
	*/
	const handleError = useCallback((error) => {
		const errorMessage = error?.failureReason || extractErrorMessage(error, t, "components.inviteUser.errors.generic");
		setApiError(error instanceof Error ? error : new Error(errorMessage));
		onError?.(error instanceof Error ? error : new Error(errorMessage));
	}, [t, onError]);
	/**
	* Normalize flow response to ensure component-driven format.
	* Transforms data.meta.components to data.components.
	*/
	const normalizeFlowResponseLocal = useCallback((response) => {
		if (!response?.data?.meta?.components) return response;
		try {
			const { components: components$1 } = normalizeFlowResponse(response, t, {
				defaultErrorKey: "components.inviteUser.errors.generic",
				resolveTranslations: false
			}, meta);
			return {
				...response,
				data: {
					...response.data,
					components: components$1
				}
			};
		} catch {
			return response;
		}
	}, [t, children]);
	/**
	* Handle input value changes.
	*/
	const handleInputChange = useCallback((name, value) => {
		setFormValues((prev) => ({
			...prev,
			[name]: value
		}));
		setFormErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[name];
			return newErrors;
		});
	}, []);
	/**
	* Handle input blur.
	*/
	const handleInputBlur = useCallback((name) => {
		setTouchedFields((prev) => ({
			...prev,
			[name]: true
		}));
	}, []);
	/**
	* Validate required fields based on components.
	*/
	const validateForm = useCallback((components$1) => {
		const errors = {};
		const validateComponents = (comps) => {
			comps.forEach((comp) => {
				if ((comp.type === "TEXT_INPUT" || comp.type === "EMAIL_INPUT" || comp.type === "SELECT" || comp.type === "PHONE_INPUT" || comp.type === "OTP_INPUT") && comp.required && comp.ref) {
					const value = formValues[comp.ref];
					if (!value || value.trim() === "") errors[comp.ref] = `${comp.label || comp.ref} is required`;
					if (comp.type === "EMAIL_INPUT" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[comp.ref] = "Please enter a valid email address";
				}
				if (comp.components && Array.isArray(comp.components)) validateComponents(comp.components);
			});
		};
		validateComponents(components$1);
		return {
			errors,
			isValid: Object.keys(errors).length === 0
		};
	}, [formValues]);
	/**
	* Handle form submission.
	*/
	const handleSubmit = useCallback(async (component, data) => {
		if (!currentFlow) return;
		const validation = validateForm(currentFlow.data?.components || []);
		if (!validation.isValid) {
			setFormErrors(validation.errors);
			setIsFormValid(false);
			const touched = {};
			Object.keys(validation.errors).forEach((key) => {
				touched[key] = true;
			});
			setTouchedFields((prev) => ({
				...prev,
				...touched
			}));
			return;
		}
		setIsLoading(true);
		setApiError(null);
		setIsFormValid(true);
		try {
			const inputs = data || formValues;
			const payload = {
				executionId: currentFlow.executionId,
				inputs,
				verbose: true,
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
			};
			if (component?.id) payload["action"] = component.id;
			const response = normalizeFlowResponseLocal(await onSubmit(payload));
			onFlowChange?.(response);
			await setChallengeToken(response.challengeToken ?? null);
			if (response.flowStatus === "ERROR") {
				handleError(response);
				return;
			}
			setCurrentFlow(response);
			setFormValues({});
			setFormErrors({});
			setTouchedFields({});
		} catch (err) {
			handleError(err);
		} finally {
			setIsLoading(false);
		}
	}, [
		currentFlow,
		formValues,
		validateForm,
		onSubmit,
		onFlowChange,
		handleError,
		normalizeFlowResponseLocal
	]);
	/**
	* Reset the flow to invite another user.
	*/
	const resetFlow = useCallback(() => {
		setIsFlowInitialized(false);
		setCurrentFlow(null);
		setApiError(null);
		setFormValues({});
		setFormErrors({});
		setTouchedFields({});
		initializationAttemptedRef.current = false;
	}, []);
	/**
	* Initialize the flow on component mount.
	*/
	useEffect(() => {
		if (isInitialized && !isFlowInitialized && !initializationAttemptedRef.current) {
			initializationAttemptedRef.current = true;
			(async () => {
				setIsLoading(true);
				setApiError(null);
				try {
					const response = normalizeFlowResponseLocal(await onInitialize({
						flowType: EmbeddedFlowType.UserOnboarding,
						verbose: true
					}));
					await setChallengeToken(response.challengeToken ?? null);
					setCurrentFlow(response);
					setIsFlowInitialized(true);
					onFlowChange?.(response);
					if (response.flowStatus === "ERROR") handleError(response);
				} catch (err) {
					handleError(err);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [
		isInitialized,
		isFlowInitialized,
		onInitialize,
		onFlowChange,
		handleError,
		normalizeFlowResponseLocal
	]);
	/**
	* Recalculate form validity whenever form values or components change.
	* This ensures the submit button is enabled/disabled correctly as the user types.
	*/
	useEffect(() => {
		if (currentFlow && isFlowInitialized) {
			const components$1 = currentFlow.data?.components || [];
			if (components$1.length > 0) setIsFormValid(validateForm(components$1).isValid);
		}
	}, [
		formValues,
		currentFlow,
		isFlowInitialized,
		validateForm
	]);
	/**
	* Extract title and subtitle from components.
	*/
	const extractHeadings = useCallback((components$1) => {
		let title$1;
		let subtitle$1;
		components$1.forEach((comp) => {
			if (comp.type === "TEXT") {
				if (comp.variant === "HEADING_1" && !title$1) title$1 = comp.label;
				else if ((comp.variant === "HEADING_2" || comp.variant === "SUBTITLE_1") && !subtitle$1) subtitle$1 = comp.label;
			}
		});
		return {
			subtitle: subtitle$1,
			title: title$1
		};
	}, []);
	/**
	* Filter out heading components for default rendering.
	*/
	const filterHeadings = useCallback((components$1) => components$1.filter((comp) => !(comp.type === "TEXT" && (comp.variant === "HEADING_1" || comp.variant === "HEADING_2"))), []);
	/**
	* Render form components using the factory.
	*/
	const renderComponents = useCallback((components$1) => renderInviteUserComponents(components$1, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		_customRenderers: customRenderers,
		_theme: theme,
		additionalData: currentFlow?.data?.additionalData,
		fetchOrganizationUnitChildren,
		onInputBlur: handleInputBlur,
		onSubmit: handleSubmit,
		size,
		variant
	}), [
		customRenderers,
		currentFlow?.data?.additionalData,
		fetchOrganizationUnitChildren,
		formValues,
		touchedFields,
		formErrors,
		isLoading,
		isFormValid,
		handleInputChange,
		handleInputBlur,
		handleSubmit,
		size,
		theme,
		variant
	]);
	const components = currentFlow?.data?.components || currentFlow?.data?.meta?.components || [];
	const { title, subtitle } = extractHeadings(components);
	const componentsWithoutHeadings = filterHeadings(components);
	const renderProps = {
		additionalData: currentFlow?.data?.additionalData,
		components,
		error: apiError,
		executionId: currentFlow?.executionId,
		fieldErrors: formErrors,
		handleInputBlur,
		handleInputChange,
		handleSubmit,
		isLoading,
		isValid: isFormValid,
		meta,
		resetFlow,
		subtitle,
		title,
		touched: touchedFields,
		values: formValues
	};
	if (children) return /* @__PURE__ */ jsx("div", {
		className,
		children: children(renderProps)
	});
	if (!isInitialized) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "2rem"
			},
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "medium" })
		}) })
	});
	if (!isFlowInitialized && isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "2rem"
			},
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "medium" })
		}) })
	});
	if (!currentFlow && apiError) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: "Error" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: apiError.message })]
		}) })
	});
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && (title || subtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles.header,
			children: [showTitle && title && /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: title
			}), showSubtitle && subtitle && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles.subtitle,
				children: subtitle
			})]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [apiError && /* @__PURE__ */ jsx("div", {
			style: { marginBottom: "1rem" },
			children: /* @__PURE__ */ jsx(Alert_default, {
				variant: "error",
				children: /* @__PURE__ */ jsx(Alert_default.Description, { children: apiError.message })
			})
		}), /* @__PURE__ */ jsxs("div", { children: [componentsWithoutHeadings && componentsWithoutHeadings.length > 0 ? renderComponents(componentsWithoutHeadings) : !isLoading && /* @__PURE__ */ jsx(Alert_default, {
			variant: "warning",
			children: /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				children: "No form components available"
			})
		}), isLoading && /* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "1rem"
			},
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "small" })
		})] })] })]
	});
};
var BaseInviteUser_default = BaseInviteUser;

//#endregion
//#region src/components/presentation/auth/InviteUser/v2/InviteUser.tsx
/**
* InviteUser component for initiating invite user flow.
*
* This component is designed for admin users in the thunder-develop app to:
* 1. Select a user type (if multiple available)
* 2. Enter user details (username, email)
* 3. Generate an invite link for the end user
*
* The component uses the authenticated ThunderID SDK context to make API calls
* with the admin's access token (requires 'system' scope).
*
* @example
* ```tsx
* import { InviteUser } from '@thunderid/react';
*
* const InviteUserPage = () => {
*   const [inviteLink, setInviteLink] = useState<string>();
*
*   return (
*     <InviteUser
*       onInviteLinkGenerated={(link, executionId) => setInviteLink(link)}
*       onError={(error) => console.error(error)}
*     >
*       {({ values, components, isLoading, handleInputChange, handleSubmit, inviteLink, isInviteGenerated }) => (
*         <div>
*           {isInviteGenerated ? (
*             <div>
*               <h2>Invite Link Generated!</h2>
*               <p>{inviteLink}</p>
*             </div>
*           ) : (
*             // Render form based on components
*           )}
*         </div>
*       )}
*     </InviteUser>
*   );
* };
* ```
*/
const InviteUser = ({ onError, onFlowChange, className, children, size = "medium", variant = "outlined", showTitle = true, showSubtitle = true }) => {
	const { http: http$1, baseUrl, getAccessToken, isInitialized } = useThunderID_default();
	/**
	* Initialize the invite user flow.
	* Makes an authenticated request to /flow/execute with flowType: USER_ONBOARDING.
	*/
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
	/**
	* Submit flow step data.
	* Makes an authenticated request to /flow/execute with the step data.
	*/
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
	return /* @__PURE__ */ jsx(BaseInviteUser_default, {
		onInitialize: handleInitialize,
		onSubmit: handleSubmit,
		onError,
		onFlowChange,
		className,
		fetchOrganizationUnitChildren: useCallback(async (parentId, limit, offset$1) => {
			return getOrganizationUnitChildren({
				baseUrl,
				headers: { Authorization: `Bearer ${await getAccessToken()}` },
				limit,
				offset: offset$1,
				organizationUnitId: parentId
			});
		}, [baseUrl, getAccessToken]),
		isInitialized,
		size,
		variant,
		showTitle,
		showSubtitle,
		children
	});
};
var InviteUser_default = InviteUser;

//#endregion
//#region src/components/presentation/auth/AcceptInvite/v2/BaseAcceptInvite.styles.ts
/**
* Creates styles for the BaseAcceptInvite component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$12 = (theme, colorScheme) => useMemo(() => {
	const card = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      gap: calc(${theme.vars.spacing.unit} * 2);
      min-width: 420px;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const header = css`
      gap: 0;
      align-items: center;
    `;
	const title = css`
      margin: 0 0 calc(${theme.vars.spacing.unit} * 1) 0;
      color: ${theme.vars.colors.text.primary};
    `;
	return {
		card,
		header,
		subtitle: css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `,
		title
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.borderRadius.large,
	theme.vars.spacing.unit,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseAcceptInvite_styles_default = useStyles$12;

//#endregion
//#region src/components/presentation/auth/AcceptInvite/v2/BaseAcceptInvite.tsx
/**
* Base component for accept invite flow (end-user).
* Handles the flow logic for validating an invite token and setting a password.
*
* When no children are provided, renders a default UI with:
* - Loading spinner during token validation
* - Error alerts for invalid/expired tokens
* - Password form with validation
* - Success state with sign-in redirect
*
* Flow steps handled:
* 1. Validate invite token (automatic on mount)
* 2. Password input
* 3. Flow completion
*/
const BaseAcceptInvite = ({ executionId, inviteToken, onSubmit, onComplete, onError, onFlowChange, onGoToSignIn, className = "", children, preferences, size = "medium", variant = "outlined", showTitle = true, showSubtitle = true }) => {
	const { meta, isInitialized, getStorageManager } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { theme } = useTheme_default();
	const customRenderers = useContext(ComponentRendererContext_default);
	const styles = BaseAcceptInvite_styles_default(theme, theme.vars.colors.text.primary);
	const [isLoading, setIsLoading] = useState(false);
	const [isValidatingToken, setIsValidatingToken] = useState(true);
	const [isTokenInvalid, setIsTokenInvalid] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const [apiError, setApiError] = useState(null);
	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [touchedFields, setTouchedFields] = useState({});
	const [isFormValid, setIsFormValid] = useState(true);
	const [isStorageReady, setIsStorageReady] = useState(false);
	const challengeTokenRef = useRef(null);
	const tokenValidationAttemptedRef = useRef(false);
	/**
	* Restore any challenge token persisted before an OAuth redirect.
	* Waits for SDK initialization before reading from storage.
	*/
	useEffect(() => {
		if (!isInitialized) return;
		(async () => {
			try {
				const tempData = await (await getStorageManager())?.getTemporaryData();
				if (tempData?.challengeToken) challengeTokenRef.current = tempData.challengeToken;
			} finally {
				setIsStorageReady(true);
			}
		})();
	}, [isInitialized]);
	/**
	* Updates challengeTokenRef immediately (stale-closure safe) and persists via
	* the provider's StorageManager so the token survives OAuth redirects.
	*/
	const setChallengeToken = async (challengeToken) => {
		challengeTokenRef.current = challengeToken;
		const storageManager = await getStorageManager();
		if (storageManager) if (challengeToken) await storageManager.setTemporaryDataParameter("challengeToken", challengeToken);
		else await storageManager.removeTemporaryDataParameter("challengeToken");
	};
	/**
	* Handle error responses and extract meaningful error messages.
	* Uses the transformer's extractErrorMessage function for consistency.
	*/
	const handleError = useCallback((error) => {
		const errorMessage = error?.failureReason || extractErrorMessage(error, t, "components.acceptInvite.errors.generic");
		setApiError(error instanceof Error ? error : new Error(errorMessage));
		onError?.(error instanceof Error ? error : new Error(errorMessage));
	}, [t, onError]);
	/**
	* Normalize flow response to ensure component-driven format.
	* Transforms data.meta.components to data.components.
	*/
	const normalizeFlowResponseLocal = useCallback((response) => {
		if (!response?.data?.meta?.components) return response;
		try {
			const { components: components$1 } = normalizeFlowResponse(response, t, {
				defaultErrorKey: "components.acceptInvite.errors.generic",
				resolveTranslations: false
			}, meta);
			return {
				...response,
				data: {
					...response.data,
					components: components$1
				}
			};
		} catch {
			return response;
		}
	}, [t, children]);
	/**
	* Handle OAuth callback when returning from OAuth provider.
	* This hook processes the authorization code and continues the flow.
	*/
	useOAuthCallback({
		currentExecutionId: executionId ?? null,
		isInitialized: isStorageReady,
		onComplete: () => {
			setIsValidatingToken(false);
			onComplete?.();
		},
		onError: (error) => {
			if (!error?.flowStatus) setIsTokenInvalid(true);
			setIsValidatingToken(false);
			handleError(error);
		},
		onFlowChange: (response) => {
			onFlowChange?.(response);
			if (response.flowStatus === "COMPLETE") {
				setIsComplete(true);
				if ((response.data?.components || response.data?.meta?.components || []).length > 0) setCurrentFlow(response);
			} else {
				setCurrentFlow(response);
				setFormValues({});
				setFormErrors({});
				setTouchedFields({});
			}
		},
		onProcessingStart: () => {
			setIsValidatingToken(true);
		},
		onSubmit: async (payload) => {
			const response = normalizeFlowResponseLocal(await onSubmit({
				...payload,
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
			}));
			await setChallengeToken(response.challengeToken ?? null);
			return response;
		},
		tokenValidationAttemptedRef
	});
	/**
	* Handle input value changes.
	*/
	const handleInputChange = useCallback((name, value) => {
		setFormValues((prev) => ({
			...prev,
			[name]: value
		}));
		setFormErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[name];
			return newErrors;
		});
		setIsFormValid(true);
	}, []);
	/**
	* Handle input blur.
	*/
	const handleInputBlur = useCallback((name) => {
		setTouchedFields((prev) => ({
			...prev,
			[name]: true
		}));
	}, []);
	/**
	* Validate required fields based on components.
	*/
	const validateForm = useCallback((components$1) => {
		const errors = {};
		const validateComponents = (comps) => {
			comps.forEach((comp) => {
				if ((comp.type === "PASSWORD_INPUT" || comp.type === "TEXT_INPUT" || comp.type === "EMAIL_INPUT" || comp.type === "PHONE_INPUT" || comp.type === "OTP_INPUT") && comp.required && comp.ref) {
					const value = formValues[comp.ref];
					if (!value || value.trim() === "") errors[comp.ref] = t("validations.required.field.error");
				}
				if (comp.components && Array.isArray(comp.components)) validateComponents(comp.components);
			});
		};
		validateComponents(components$1);
		return {
			errors,
			isValid: Object.keys(errors).length === 0
		};
	}, [formValues, t]);
	/**
	* Handle form submission.
	*/
	const handleSubmit = useCallback(async (component, data) => {
		if (!currentFlow) return;
		const validation = validateForm(currentFlow.data?.components || []);
		if (!validation.isValid) {
			setIsFormValid(false);
			setFormErrors(validation.errors);
			const touched = {};
			Object.keys(validation.errors).forEach((key) => {
				touched[key] = true;
			});
			setTouchedFields((prev) => ({
				...prev,
				...touched
			}));
			return;
		}
		setIsLoading(true);
		setApiError(null);
		try {
			const inputs = data || formValues;
			const payload = {
				executionId: currentFlow.executionId,
				inputs,
				verbose: true,
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
			};
			if (component?.id) payload["action"] = component.id;
			const response = normalizeFlowResponseLocal(await onSubmit(payload));
			onFlowChange?.(response);
			await setChallengeToken(response.challengeToken ?? null);
			if (response.type === "REDIRECTION") {
				const redirectURL = response.data?.redirectURL || response?.redirectURL;
				if (redirectURL && typeof window !== "undefined") {
					initiateOAuthRedirect(redirectURL);
					return;
				}
			}
			if (response.flowStatus === "COMPLETE") {
				setIsComplete(true);
				if ((response.data?.components || response.data?.meta?.components || []).length > 0) setCurrentFlow(response);
				else onComplete?.();
				return;
			}
			if (response.flowStatus === "ERROR") {
				handleError(response);
				return;
			}
			setCurrentFlow(response);
			setFormErrors({});
			setTouchedFields({});
		} catch (err) {
			handleError(err);
		} finally {
			setIsLoading(false);
		}
	}, [
		currentFlow,
		formValues,
		validateForm,
		onSubmit,
		onFlowChange,
		onComplete,
		handleError,
		normalizeFlowResponseLocal
	]);
	/**
	* Validate invite token on component mount.
	*/
	useEffect(() => {
		if (tokenValidationAttemptedRef.current) return;
		if (new URLSearchParams(window.location.search).get("code")) return;
		if (!executionId || !inviteToken) {
			setIsValidatingToken(false);
			setIsTokenInvalid(true);
			handleError(/* @__PURE__ */ new Error("Invalid invite link. Missing executionId or inviteToken."));
			return;
		}
		tokenValidationAttemptedRef.current = true;
		(async () => {
			setIsValidatingToken(true);
			setApiError(null);
			try {
				if (executionId) sessionStorage.setItem("thunderid_execution_id", executionId);
				const response = normalizeFlowResponseLocal(await onSubmit({
					executionId,
					inputs: { inviteToken },
					verbose: true
				}));
				onFlowChange?.(response);
				await setChallengeToken(response.challengeToken ?? null);
				if (response.flowStatus === "ERROR") {
					setIsTokenInvalid(true);
					handleError(response);
					return;
				}
				setCurrentFlow(response);
			} catch (err) {
				setIsTokenInvalid(true);
				handleError(err);
			} finally {
				setIsValidatingToken(false);
			}
		})();
	}, [
		executionId,
		inviteToken,
		onSubmit,
		onFlowChange,
		handleError,
		normalizeFlowResponseLocal
	]);
	/**
	* Extract title and subtitle from components.
	*/
	const extractHeadings = useCallback((components$1) => {
		let title$1;
		let subtitle$1;
		components$1.forEach((comp) => {
			if (comp.type === "TEXT") {
				if (comp.variant === "HEADING_1" && !title$1) title$1 = comp.label;
				else if ((comp.variant === "HEADING_2" || comp.variant === "SUBTITLE_1") && !subtitle$1) subtitle$1 = comp.label;
			}
		});
		return {
			subtitle: subtitle$1,
			title: title$1
		};
	}, []);
	/**
	* Filter out heading components for default rendering.
	*/
	const filterHeadings = useCallback((components$1) => components$1.filter((comp) => !(comp.type === "TEXT" && (comp.variant === "HEADING_1" || comp.variant === "HEADING_2"))), []);
	const components = currentFlow?.data?.components || currentFlow?.data?.meta?.components || [];
	const { title, subtitle } = extractHeadings(components);
	const componentsWithoutHeadings = filterHeadings(components);
	const renderProps = {
		components,
		error: apiError,
		executionId,
		fieldErrors: formErrors,
		goToSignIn: onGoToSignIn,
		handleInputBlur,
		handleInputChange,
		handleSubmit,
		inviteToken,
		isComplete,
		isLoading,
		isTokenInvalid,
		isValid: isFormValid,
		isValidatingToken,
		meta,
		subtitle,
		title,
		touched: touchedFields,
		values: formValues
	};
	if (children) return /* @__PURE__ */ jsx("div", {
		className,
		children: children(renderProps)
	});
	if (isValidatingToken) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs("div", {
			style: {
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
				padding: "2rem"
			},
			children: [/* @__PURE__ */ jsx(Spinner_default, { size: "medium" }), /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				children: "Validating your invite link..."
			})]
		}) })
	});
	if (isTokenInvalid) return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: [/* @__PURE__ */ jsx(Card_default.Header, {
			className: styles.header,
			children: /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: "Invalid Invite Link"
			})
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [/* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: "Unable to verify invite" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: apiError?.message || "This invite link is invalid or has expired. Please contact your administrator for a new invite." })]
		}), onGoToSignIn && /* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				marginTop: "1.5rem"
			},
			children: /* @__PURE__ */ jsx(Button_default, {
				variant: "outline",
				onClick: onGoToSignIn,
				children: "Go to Sign In"
			})
		})] })]
	});
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && (title || subtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles.header,
			children: [showTitle && title && /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: title
			}), showSubtitle && subtitle && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles.subtitle,
				children: subtitle
			})]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [
			apiError && /* @__PURE__ */ jsx("div", {
				style: { marginBottom: "1rem" },
				children: /* @__PURE__ */ jsx(Alert_default, {
					variant: "error",
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: apiError.message })
				})
			}),
			/* @__PURE__ */ jsxs("div", { children: [componentsWithoutHeadings && componentsWithoutHeadings.length > 0 ? renderInviteUserComponents(componentsWithoutHeadings, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
				_customRenderers: customRenderers,
				_theme: theme,
				onInputBlur: handleInputBlur,
				onSubmit: handleSubmit,
				size,
				variant
			}) : !isLoading && /* @__PURE__ */ jsx(Alert_default, {
				variant: "warning",
				children: /* @__PURE__ */ jsx(Typography_default, {
					variant: "body1",
					children: "No form components available"
				})
			}), isLoading && /* @__PURE__ */ jsx("div", {
				style: {
					display: "flex",
					justifyContent: "center",
					padding: "1rem"
				},
				children: /* @__PURE__ */ jsx(Spinner_default, { size: "small" })
			})] }),
			onGoToSignIn && /* @__PURE__ */ jsx("div", {
				style: {
					marginTop: "1.5rem",
					textAlign: "center"
				},
				children: /* @__PURE__ */ jsxs(Typography_default, {
					variant: "body2",
					children: [
						"Already have an account?",
						" ",
						/* @__PURE__ */ jsx(Button_default, {
							variant: "text",
							onClick: onGoToSignIn,
							style: {
								minWidth: "auto",
								padding: 0
							},
							children: "Sign In"
						})
					]
				})
			})
		] })]
	});
};
var BaseAcceptInvite_default = BaseAcceptInvite;

//#endregion
//#region src/components/presentation/auth/AcceptInvite/v2/AcceptInvite.tsx
/**
* Helper to extract query parameters from URL.
*/
const getUrlParams = () => {
	if (typeof window === "undefined") return {};
	const params = new URLSearchParams(window.location.search);
	return {
		executionId: params.get("executionId") || void 0,
		inviteToken: params.get("inviteToken") || void 0
	};
};
/**
* AcceptInvite component for end-users to accept an invite and set their password.
*
* This component is designed for end users accessing the thunder-gate app via an invite link.
* It automatically:
* 1. Extracts executionId and inviteToken from URL query parameters
* 2. Validates the invite token with the backend
* 3. Displays the password form if token is valid
* 4. Completes the accept invite when password is set
*
* @example
* ```tsx
* import { AcceptInvite } from '@thunderid/react';
*
* // URL: /invite?executionId=xxx&inviteToken=yyy
*
* const AcceptInvitePage = () => {
*   return (
*     <AcceptInvite
*       baseUrl="https://api.thunder.io"
*       onComplete={() => navigate('/signin')}
*       onError={(error) => console.error(error)}
*     >
*       {({ values, components, isLoading, isComplete, isValidatingToken, isTokenInvalid, error, handleInputChange, handleSubmit }) => (
*         <div>
*           {isValidatingToken && <p>Validating your invite...</p>}
*           {isTokenInvalid && <p>Invalid or expired invite link</p>}
*           {isComplete && <p>Registration complete! You can now sign in.</p>}
*           {!isComplete && !isValidatingToken && !isTokenInvalid && (
*             // Render password form based on components
*           )}
*         </div>
*       )}
*     </AcceptInvite>
*   );
* };
* ```
*/
const AcceptInvite = ({ baseUrl, executionId: executionIdProp, inviteToken: inviteTokenProp, onComplete, onError, onFlowChange, onGoToSignIn, className, children, size = "medium", variant = "outlined", showTitle = true, showSubtitle = true }) => {
	const { executionId: urlExecutionId, inviteToken: urlInviteToken } = useMemo(() => getUrlParams(), []);
	const executionId = executionIdProp || urlExecutionId;
	const inviteToken = inviteTokenProp || urlInviteToken;
	const apiBaseUrl = useMemo(() => {
		if (baseUrl) return baseUrl;
		if (typeof window !== "undefined") return window.location.origin;
		return "";
	}, [baseUrl]);
	/**
	* Submit flow step data.
	* Makes an unauthenticated request to /flow/execute endpoint.
	*/
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
	return /* @__PURE__ */ jsx(BaseAcceptInvite_default, {
		executionId,
		inviteToken,
		onSubmit: handleSubmit,
		onComplete,
		onError,
		onFlowChange,
		onGoToSignIn,
		className,
		size,
		variant,
		showTitle,
		showSubtitle,
		children
	});
};
var AcceptInvite_default = AcceptInvite;

//#endregion
//#region src/components/auth/Callback/Callback.tsx
/**
* BaseCallback is a headless component that handles OAuth callback parameter forwarding.
* This component extracts OAuth parameters (code, state, error) from the URL and forwards them
* to the original component that initiated the OAuth flow.
*
* Works standalone using the browser navigate utility (History API) for navigation by default.
* Pass an onNavigate prop to enable framework-specific navigation (e.g., via React Router).
*
* Flow: Extract OAuth parameters from URL -> Parse state parameter -> Redirect to original path with parameters
*
* The original component (SignIn/AcceptInvite) is responsible for:
* - Processing the OAuth code via the SDK
* - Calling /flow/execute
* - Handling the assertion and auth/callback POST
* - Managing the authenticated session
*/
const Callback = ({ onNavigate, onError }) => {
	const processingRef = useRef(false);
	const navigate$2 = (path) => {
		if (onNavigate) onNavigate(path);
		else navigate$1(path);
	};
	useEffect(() => {
		const processOAuthCallback = () => {
			if (processingRef.current) return;
			processingRef.current = true;
			let returnPath = "/";
			try {
				const urlParams = new URLSearchParams(window.location.search);
				const code = urlParams.get("code");
				const state = urlParams.get("state");
				const nonce = urlParams.get("nonce");
				const oauthError = urlParams.get("error");
				const errorDescription = urlParams.get("error_description");
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
						onError?.(new Error(errorMsg));
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
				if (Date.now() - timestamp > 6e5) {
					sessionStorage.removeItem(`thunderid_oauth_${state}`);
					throw new Error("OAuth state expired - please try again");
				}
				sessionStorage.removeItem(`thunderid_oauth_${state}`);
				if (oauthError) {
					const errorMsg = errorDescription || oauthError || "OAuth authentication failed";
					onError?.(new Error(errorMsg));
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
				console.error("OAuth callback error:", err);
				onError?.(err instanceof Error ? err : new Error(errorMessage));
				const params = new URLSearchParams();
				params.set("error", "callback_error");
				params.set("error_description", errorMessage);
				navigate$2(`${returnPath}?${params.toString()}`);
			}
		};
		processOAuthCallback();
	}, [onNavigate, onError]);
	return null;
};

//#endregion
//#region src/components/presentation/User/BaseUser.tsx
/**
* Base User component that provides the core functionality for displaying user information.
* This component takes a user object as a prop and uses render props to expose it.
*
* @remarks This is the base component that can be used in any context where you have
* a user object available. For React applications, use the User component which
* automatically retrieves the user from ThunderID context.
*
* @example
* ```tsx
* import { BaseUser } from '@thunderid/auth-react';
*
* const MyComponent = ({ user }) => {
*   return (
*     <BaseUser user={user} fallback={<p>No user data</p>}>
*       {(user) => (
*         <div>
*           <h1>Welcome, {user.displayName}!</h1>
*           <p>Email: {user.email}</p>
*         </div>
*       )}
*     </BaseUser>
*   );
* }
* ```
*/
const BaseUser = ({ user, children, fallback = null }) => {
	if (!user) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
	return /* @__PURE__ */ jsx(Fragment, { children: children(user) });
};
BaseUser.displayName = "BaseUser";
var BaseUser_default = BaseUser;

//#endregion
//#region src/components/presentation/User/User.tsx
/**
* A component that uses render props to expose the authenticated user object.
* This component automatically retrieves the user from ThunderID context.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { IUser } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <User fallback={<p>Please sign in</p>}>
*       {(user) => (
*         <div>
*           <h1>Welcome, {user.displayName}!</h1>
*           <p>Email: {user.email}</p>
*         </div>
*       )}
*     </User>
*   );
* }
* ```
*/
const User$1 = ({ children, fallback = null }) => {
	const { user } = useThunderID_default();
	return /* @__PURE__ */ jsx(BaseUser_default, {
		user,
		fallback,
		children
	});
};
User$1.displayName = "User";
var User_default = User$1;

//#endregion
//#region src/components/presentation/Organization/BaseOrganization.tsx
/**
* Base Organization component that provides the core functionality for displaying organization information.
* This component takes an organization object as a prop and uses render props to expose it.
*
* @remarks This is the base component that can be used in any context where you have
* an organization object available. For React applications, use the Organization component which
* automatically retrieves the current organization from Organization context.
*
* @example
* ```tsx
* import { BaseOrganization } from '@thunderid/auth-react';
*
* const MyComponent = ({ organization }) => {
*   return (
*     <BaseOrganization organization={organization} fallback={<p>No organization data</p>}>
*       {(org) => (
*         <div>
*           <h1>Organization: {org.name}</h1>
*           <p>ID: {org.id}</p>
*         </div>
*       )}
*     </BaseOrganization>
*   );
* }
* ```
*/
const BaseOrganization = ({ children, fallback = null, organization }) => {
	if (!organization) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
	return /* @__PURE__ */ jsx(Fragment, { children: children(organization) });
};
BaseOrganization.displayName = "BaseOrganization";
var BaseOrganization_default = BaseOrganization;

//#endregion
//#region src/components/presentation/Organization/Organization.tsx
/**
* A component that uses render props to expose the current organization object.
* This component automatically retrieves the current organization from Organization context.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { Organization } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <Organization fallback={<p>No organization selected</p>}>
*       {(organization) => (
*         <div>
*           <h1>Current Organization: {organization.name}!</h1>
*           <p>ID: {organization.id}</p>
*           <p>Role: {organization.role}</p>
*           {organization.memberCount && (
*             <p>Members: {organization.memberCount}</p>
*           )}
*         </div>
*       )}
*     </Organization>
*   );
* }
* ```
*/
const Organization = ({ children, fallback = null }) => {
	const { currentOrganization } = useOrganization_default();
	return /* @__PURE__ */ jsx(BaseOrganization_default, {
		organization: currentOrganization,
		fallback,
		children
	});
};
Organization.displayName = "Organization";
var Organization_default = Organization;

//#endregion
//#region src/components/presentation/UserProfile/BaseUserProfile.styles.ts
/**
* Creates styles for the BaseUserProfile component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$11 = (theme, colorScheme) => {
	const valuePlaceholder = css`
    font-style: italic;
    opacity: 0.7;
  `;
	const editButton = css`
    font-style: italic;
    text-decoration: underline;
    opacity: 0.7;
    padding: 0;
    min-height: auto;

    &:hover:not(:disabled) {
      background-color: transparent;
    }
  `;
	const fieldInner = css`
    flex: 1;
    display: flex;
    align-items: center;
    gap: ${theme.vars.spacing.unit};
  `;
	const fieldActions = css`
    display: flex;
    gap: calc(${theme.vars.spacing.unit} / 2);
    align-items: center;
    margin-inline-start: calc(${theme.vars.spacing.unit} * 4);
  `;
	const complexTextarea = css`
    min-height: 60px;
    width: 100%;
    padding: 8px;
    border: 1px solid ${theme.vars.colors.border};
    border-radius: ${theme.vars.borderRadius.small};
    resize: vertical;
  `;
	const objectKey = css`
    padding: ${theme.vars.spacing.unit};
    vertical-align: top;
  `;
	const objectValue = css`
    padding: ${theme.vars.spacing.unit};
    vertical-align: top;
  `;
	return useMemo(() => {
		const root = css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      min-width: 600px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
    `;
		const card = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
    `;
		const header = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
      margin-bottom: calc(${theme.vars.spacing.unit} * 1.5);
    `;
		const profileInfo = css`
      flex: 1;
    `;
		const name = css`
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      color: ${theme.vars.colors.text.primary};
    `;
		const profileSummary = css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    `;
		const sectionRow = css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
		const sectionLabel = css`
      font-size: 0.875rem;
      font-weight: 600;
      color: ${theme.vars.colors.text.primary};
      width: 160px;
      flex-shrink: 0;
    `;
		const sectionValue = css`
      flex: 1;
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
      font-size: 0.875rem;
      color: ${theme.vars.colors.text.primary};
    `;
		const infoContainer = css`
      display: flex;
      flex-direction: column;
    `;
		const info = css`
      padding: calc(${theme.vars.spacing.unit} * 1.5) 0;
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
		const field = css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} / 2) 0;
      min-height: 28px;
    `;
		const lastField = css`
      border-bottom: none;
    `;
		const label = css`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${theme.vars.colors.text.secondary};
      width: 120px;
      flex-shrink: 0;
      line-height: 28px;
      text-align: start;
    `;
		const value = css`
      color: ${theme.vars.colors.text.primary};
      flex: 1;
      display: inline-block;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      overflow: hidden;
      min-height: 28px;
      line-height: 28px;
      word-break: break-word;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 350px;
      text-align: start;

      .${withVendorCSSClassPrefix("form-control")} {
        margin-bottom: 0;
      }

      input {
        margin: 0;
      }

      table {
        background-color: ${theme.vars.colors.background.surface};
        border-radius: ${theme.vars.borderRadius.medium};
        white-space: normal;
      }

      td {
        border-color: ${theme.vars.colors.border};
      }
    `;
		const popup = css`
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
		return {
			alert: css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 3);
    `,
			card,
			complexTextarea,
			editButton,
			field,
			fieldActions,
			fieldInner,
			header,
			info,
			infoContainer,
			label,
			lastField,
			name,
			objectKey,
			objectValue,
			popup,
			profileInfo,
			profileSummary,
			root,
			sectionLabel,
			sectionRow,
			sectionValue,
			value,
			valuePlaceholder
		};
	}, [
		theme.vars.colors.background.surface,
		theme.vars.colors.text.primary,
		theme.vars.colors.text.secondary,
		theme.vars.colors.border,
		theme.vars.borderRadius.large,
		theme.vars.borderRadius.medium,
		theme.vars.spacing.unit,
		theme.vars.typography.fontFamily,
		colorScheme
	]);
};
var BaseUserProfile_styles_default = useStyles$11;

//#endregion
//#region src/utils/getMappedUserProfileValue.ts
/**
* Retrieves a user profile value based on attribute mapping configuration.
*
* This function allows flexible mapping of component attribute names to actual
* user profile field paths. It supports both simple string mappings and arrays
* of potential field paths for fallback scenarios.
*
* @param key - The logical attribute name to retrieve (e.g., 'firstName', 'email')
* @param mappings - Object mapping logical names to user profile field paths
* @param user - The user object to extract values from
* @returns The mapped value from the user profile, or undefined if not found
*
* @example
* ```typescript
* const mappings = {
*   firstName: 'name.givenName',
*   email: 'emails[0]',
*   picture: ['profileUrl', 'profile', 'avatar'] // fallback options
* };
*
* const user = {
*   name: { givenName: 'John' },
*   emails: ['john@example.com'],
*   profileUrl: 'https://example.com/avatar.jpg'
* };
*
* getMappedUserProfileValue('firstName', mappings, user); // 'John'
* getMappedUserProfileValue('email', mappings, user); // 'john@example.com'
* getMappedUserProfileValue('picture', mappings, user); // 'https://example.com/avatar.jpg'
* ```
*/
const getMappedUserProfileValue = (key, mappings, user) => {
	if (!key || !mappings || !user) return;
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
/**
* Get the display name of a user by mapping their profile attributes.
*
* @param mergedMappings - The merged attribute mappings.
* @param user - The user object containing profile information.
* @param displayAttributes - Optional array of attribute keys or paths to try first.
*   Each entry is resolved via `getMappedUserProfileValue`. The first non-empty
*   value found is returned. If none resolve, the default fallback chain is used.
*
* @example
* ```ts
* // Default behavior — tries firstName+lastName, then username, email, name
* const displayName = getDisplayName(mergedMappings, user);
*
* // Custom attributes — try 'nickname' first, then fall back to defaults
* const displayName = getDisplayName(mergedMappings, user, ['nickname']);
*
* // Multiple custom attributes
* const displayName = getDisplayName(mergedMappings, user, ['preferred_username', 'nickname']);
* ```
*
* @returns The display name of the user.
*/
const getDisplayName = (mergedMappings, user, displayAttributes) => {
	const mappings = mergedMappings;
	if (displayAttributes && displayAttributes.length > 0) {
		let foundValue;
		displayAttributes.some((attr) => {
			const value = getMappedUserProfileValue_default(attr, mappings, user);
			if (value !== void 0 && value !== null && value !== "") {
				foundValue = String(value);
				return true;
			}
			return false;
		});
		if (foundValue !== void 0) return foundValue;
	}
	const firstName = getMappedUserProfileValue_default("firstName", mappings, user);
	const lastName = getMappedUserProfileValue_default("lastName", mappings, user);
	if (firstName && lastName) return `${firstName} ${lastName}`;
	return getMappedUserProfileValue_default("username", mappings, user) || getMappedUserProfileValue_default("email", mappings, user) || getMappedUserProfileValue_default("name", mappings, user) || "User";
};
var getDisplayName_default = getDisplayName;

//#endregion
//#region src/components/primitives/Avatar/Avatar.styles.ts
/**
* Creates styles for the Avatar component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param size - The size of the avatar in pixels
* @param variant - The avatar variant
* @param backgroundColor - The background color for the avatar
* @returns Object containing CSS class names for component styling
*/
const useStyles$10 = (theme, colorScheme, size, variant, backgroundColor) => useMemo(() => {
	const baseAvatar = css`
      align-items: center;
      background: ${backgroundColor || theme.vars.colors.background.surface};
      border: ${backgroundColor ? "none" : `1px solid ${theme.vars.colors.border}`};
      border-radius: ${variant === "circular" ? "50%" : "8px"};
      color: ${backgroundColor ? "#ffffff" : theme.vars.colors.text.primary};
      display: flex;
      font-size: ${size * .4}px;
      font-family: ${theme.vars.typography.fontFamily};
      font-weight: 600;
      height: ${size}px;
      justify-content: center;
      overflow: hidden;
      text-shadow: ${backgroundColor ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none"};
      width: ${size}px;
    `;
	const variantStyles = {
		circular: css`
        border-radius: 50%;
      `,
		square: css`
        border-radius: 8px;
      `
	};
	const imageStyles = css`
      height: 100%;
      object-fit: cover;
      width: 100%;
    `;
	const skeletonStyles = css`
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: ${variant === "circular" ? "50%" : "8px"};

      @keyframes skeleton-loading {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `;
	return {
		avatar: baseAvatar,
		icon: css`
      width: 60%;
      height: 60%;
      fill: ${backgroundColor ? "#ffffff" : theme.vars.colors.text.secondary};
      opacity: 0.8;
    `,
		image: imageStyles,
		skeleton: skeletonStyles,
		variant: variantStyles[variant]
	};
}, [
	theme,
	colorScheme,
	size,
	variant,
	backgroundColor
]);
var Avatar_styles_default = useStyles$10;

//#endregion
//#region src/components/primitives/Avatar/Avatar.tsx
const Avatar = ({ alt = "User avatar", background = "random", className = "", imageUrl, name, size = 64, variant = "circular", isLoading = false }) => {
	const { theme, colorScheme } = useTheme_default();
	const generateBackgroundColor = (inputString) => {
		const hash = inputString.split("").reduce((acc, char) => {
			const charCode = char.charCodeAt(0);
			return (acc << 5) - acc + charCode & 4294967295;
		}, 0);
		const seed = Math.abs(hash);
		const generateColor = (offset$1) => {
			const hue1 = (seed + offset$1) % 360;
			const hue2 = (hue1 + 60 + seed % 120) % 360;
			const saturation = 70 + seed % 20;
			return `hsl(${hue1}, ${saturation}%, ${55 + seed % 15}%), hsl(${hue2}, ${saturation}%, ${60 + (seed + offset$1) % 15}%)`;
		};
		return `linear-gradient(${45 + seed % 91}deg, ${generateColor(seed)})`;
	};
	const styles = Avatar_styles_default(theme, colorScheme, size, variant, useMemo(() => {
		if (!name || imageUrl) return;
		if (background === "random") return generateBackgroundColor(name);
		if (background === "none") return;
		return background;
	}, [
		background,
		name,
		imageUrl
	]));
	const isDefaultState = !imageUrl && !name && !isLoading;
	const getInitials = (fullName) => fullName.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
	const renderContent = () => {
		if (imageUrl) return /* @__PURE__ */ jsx("img", {
			src: imageUrl,
			alt,
			className: cx(withVendorCSSClassPrefix(bem("avatar", "image")), styles["image"])
		});
		if (name) return getInitials(name);
		if (isLoading) return /* @__PURE__ */ jsx("div", { className: cx(withVendorCSSClassPrefix(bem("avatar", "skeleton")), styles["skeleton"]) });
		return /* @__PURE__ */ jsx("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			viewBox: "0 0 640 640",
			className: cx(withVendorCSSClassPrefix(bem("avatar", "icon")), styles["icon"]),
			children: /* @__PURE__ */ jsx("path", { d: "M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z" })
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: cx(withVendorCSSClassPrefix(bem("avatar")), styles["avatar"], styles["variant"], withVendorCSSClassPrefix(bem("avatar", null, variant)), isDefaultState && withVendorCSSClassPrefix(bem("avatar", "default")), className),
		children: renderContent()
	});
};

//#endregion
//#region src/components/primitives/Dialog/Dialog.styles.ts
/**
* Creates styles for the Dialog component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$9 = (theme, colorScheme) => useMemo(() => {
	const overlay = css`
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;
	const content = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      box-shadow: 0 2px 8px ${colorScheme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)"};
      font-family: ${theme.vars.typography.fontFamily};
      outline: none;
      overflow-y: auto;
      z-index: 10000;
    `;
	const dropdownContent = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      box-shadow: 0 2px 8px ${colorScheme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)"};
      outline: none;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      z-index: 10000;
    `;
	const header = css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 3) calc(${theme.vars.spacing.unit} * 4.5);
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const headerTitle = css`
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: ${theme.vars.colors.text.primary};
    `;
	return {
		content,
		contentBody: css`
      padding: calc(${theme.vars.spacing.unit} * 2);
    `,
		description: css`
      margin: 0;
      color: ${theme.vars.colors.text.secondary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      line-height: 1.5;
    `,
		dropdownContent,
		header,
		headerTitle,
		overlay
	};
}, [theme, colorScheme]);
var Dialog_styles_default = useStyles$9;

//#endregion
//#region src/components/primitives/Icons/LogOut.tsx
/**
* LogOut icon component.
*/
const LogOut = (props) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [
		/* @__PURE__ */ jsx("path", { d: "m16 17 5-5-5-5" }),
		/* @__PURE__ */ jsx("path", { d: "M21 12H9" }),
		/* @__PURE__ */ jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" })
	]
});
var LogOut_default = LogOut;

//#endregion
//#region src/components/primitives/Icons/Plus.tsx
/**
* Plus (add) icon component.
*/
const Plus = (props) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [/* @__PURE__ */ jsx("path", { d: "M5 12h14" }), /* @__PURE__ */ jsx("path", { d: "M12 5v14" })]
});
var Plus_default = Plus;

//#endregion
//#region src/components/primitives/Icons/User.tsx
/**
* User icon component.
*/
const User = (props) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [/* @__PURE__ */ jsx("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ jsx("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})]
});
var User_default$1 = User;

//#endregion
//#region src/components/primitives/Icons/X.tsx
/**
* X (close) icon component.
*/
const X = (props) => /* @__PURE__ */ jsxs("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "24",
	height: "24",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	...props,
	children: [/* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }), /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })]
});
var X_default = X;

//#endregion
//#region src/components/primitives/Dialog/Dialog.tsx
function useDialog({ initialOpen = false, open: controlledOpen, onOpenChange: setControlledOpen } = {}) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
	const [labelId, setLabelId] = useState();
	const [descriptionId, setDescriptionId] = useState();
	const open = controlledOpen ?? uncontrolledOpen;
	const setOpen = setControlledOpen ?? setUncontrolledOpen;
	const data = useFloating({
		onOpenChange: setOpen,
		open
	});
	const { context } = data;
	const interactions = useInteractions([
		useClick(context, { enabled: controlledOpen == null }),
		useDismiss(context, { outsidePressEvent: "mousedown" }),
		useRole(context)
	]);
	return useMemo(() => ({
		open,
		setOpen,
		...interactions,
		...data,
		descriptionId,
		labelId,
		setDescriptionId,
		setLabelId
	}), [
		open,
		setOpen,
		interactions,
		data,
		labelId,
		descriptionId
	]);
}
const DialogContext = createContext(null);
const useDialogContext = () => {
	const context = useContext(DialogContext);
	if (context == null) throw new Error("Dialog components must be wrapped in <Dialog />");
	return context;
};
function Dialog({ children,...options }) {
	const dialog = useDialog(options);
	return /* @__PURE__ */ jsx(DialogContext.Provider, {
		value: dialog,
		children
	});
}
const DialogTrigger = forwardRef(({ children, asChild = false,...props }, propRef) => {
	const context = useDialogContext();
	const childrenRef = children.ref;
	const ref = useMergeRefs([
		context.refs.setReference,
		propRef,
		childrenRef
	]);
	if (asChild && isValidElement(children)) return cloneElement(children, context.getReferenceProps({
		ref,
		...props,
		...children.props,
		"data-state": context.open ? "open" : "closed"
	}));
	return /* @__PURE__ */ jsx("button", {
		ref,
		"data-state": context.open ? "open" : "closed",
		...context.getReferenceProps(props),
		children
	});
});
const DialogContent = forwardRef((props, propRef) => {
	const { context: floatingContext,...context } = useDialogContext();
	const { theme, colorScheme } = useTheme_default();
	const styles = Dialog_styles_default(theme, colorScheme);
	const ref = useMergeRefs([context.refs.setFloating, propRef]);
	if (!floatingContext.open) return null;
	return /* @__PURE__ */ jsx(FloatingPortal, { children: /* @__PURE__ */ jsx(FloatingOverlay, {
		className: cx(withVendorCSSClassPrefix(bem("dialog", "overlay")), styles["overlay"]),
		lockScroll: true,
		children: /* @__PURE__ */ jsx(FloatingFocusManager, {
			context: floatingContext,
			initialFocus: -1,
			children: /* @__PURE__ */ jsx("div", {
				ref,
				className: cx(withVendorCSSClassPrefix(bem("dialog", "content")), styles["content"], props.className),
				"aria-labelledby": context.labelId,
				"aria-describedby": context.descriptionId,
				...context.getFloatingProps(props),
				children: props.children
			})
		})
	}) });
});
const DialogHeading = forwardRef(({ children,...props }, ref) => {
	const context = useDialogContext();
	const { theme, colorScheme } = useTheme_default();
	const styles = Dialog_styles_default(theme, colorScheme);
	const id = useId();
	useLayoutEffect(() => {
		context.setLabelId(id);
		return () => {
			context.setLabelId(void 0);
		};
	}, [id, context.setLabelId]);
	return /* @__PURE__ */ jsxs("div", {
		className: cx(withVendorCSSClassPrefix(bem("dialog", "header")), styles["header"]),
		children: [/* @__PURE__ */ jsx("h2", {
			...props,
			ref,
			id,
			className: cx(withVendorCSSClassPrefix(bem("dialog", "title")), styles["headerTitle"]),
			children
		}), /* @__PURE__ */ jsx(Button_default, {
			color: "tertiary",
			variant: "icon",
			size: "small",
			shape: "round",
			onClick: () => {
				context.setOpen(false);
			},
			"aria-label": "Close",
			children: /* @__PURE__ */ jsx(X_default, {
				width: 16,
				height: 16
			})
		})]
	});
});
const DialogDescription = forwardRef(({ children,...props }, ref) => {
	const context = useDialogContext();
	const { theme, colorScheme } = useTheme_default();
	const styles = Dialog_styles_default(theme, colorScheme);
	const id = useId();
	useLayoutEffect(() => {
		context.setDescriptionId(id);
		return () => {
			context.setDescriptionId(void 0);
		};
	}, [id, context.setDescriptionId]);
	return /* @__PURE__ */ jsx("p", {
		...props,
		ref,
		id,
		className: cx(withVendorCSSClassPrefix(bem("dialog", "description")), styles["description"], props.className),
		children
	});
});
const DialogClose = forwardRef(({ children, asChild = false,...props }, propRef) => {
	const context = useDialogContext();
	const childrenRef = children?.ref;
	const ref = useMergeRefs([propRef, childrenRef]);
	const handleClick = (event) => {
		context.setOpen(false);
		props.onClick?.(event);
	};
	if (asChild && isValidElement(children)) return cloneElement(children, {
		ref,
		...props,
		...children.props,
		onClick: handleClick
	});
	return /* @__PURE__ */ jsx(Button_default, {
		...props,
		ref,
		onClick: handleClick,
		className: cx(withVendorCSSClassPrefix(bem("dialog", "close")), props.className),
		variant: "text",
		children
	});
});
DialogTrigger.displayName = "DialogTrigger";
DialogContent.displayName = "DialogContent";
DialogHeading.displayName = "DialogHeading";
DialogDescription.displayName = "DialogDescription";
DialogClose.displayName = "DialogClose";
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Heading = DialogHeading;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;
var Dialog_default = Dialog;

//#endregion
//#region src/components/primitives/MultiInput/MultiInput.styles.ts
/**
* Creates styles for the MultiInput component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param disabled - Whether the component is disabled
* @param hasError - Whether the component has an error
* @param canAddMore - Whether more items can be added
* @param canRemove - Whether items can be removed
* @returns Object containing CSS class names for component styling
*/
const useStyles$8 = (theme, colorScheme, disabled, hasError, canAddMore, canRemove) => useMemo(() => {
	const container = css`
      display: flex;
      flex-direction: column;
      gap: ${theme.vars.spacing.unit};
    `;
	const inputRow = css`
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      position: relative;
    `;
	const inputWrapper = css`
      flex: 1;
    `;
	const plusIcon = css`
      background: ${theme.vars.colors.secondary.main};
      border-radius: 50%;
      outline: 4px ${theme.vars.colors.secondary.main} auto;
      color: ${theme.vars.colors.secondary.contrastText};
    `;
	const listContainer = css`
      display: flex;
      flex-direction: column;
      gap: 0;
    `;
	const listItem = css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${theme.vars.spacing.unit} calc(${theme.vars.spacing.unit} * 1.5);
      background-color: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.medium};
      font-size: 1rem;
      font-family: ${theme.vars.typography.fontFamily};
      color: ${theme.vars.colors.text.primary};
      margin-bottom: calc(${theme.vars.spacing.unit} / 2);

      &:last-child {
        margin-bottom: 0;
      }
    `;
	const listItemText = css`
      flex: 1;
      word-break: break-word;
    `;
	const removeButton = css`
      padding: calc(${theme.vars.spacing.unit} / 2);
      min-width: auto;
      color: ${theme.vars.colors.error.main};
      background: transparent;
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      cursor: ${disabled ? "not-allowed" : "pointer"};
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) {
        background-color: ${theme.vars.colors.action.hover};
      }

      &:disabled {
        opacity: 0.6;
      }
    `;
	return {
		container,
		icon: css`
      width: 16px;
      height: 16px;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
    `,
		inputRow,
		inputWrapper,
		listContainer,
		listItem,
		listItemText,
		plusIcon,
		removeButton
	};
}, [
	theme,
	colorScheme,
	disabled,
	hasError,
	canAddMore,
	canRemove
]);
var MultiInput_styles_default = useStyles$8;

//#endregion
//#region src/components/primitives/MultiInput/MultiInput.tsx
const MultiInput = ({ label, error, required, className, disabled, helperText, placeholder = "Enter value", values = [], onChange, type = "text", fieldType = "STRING", startIcon, endIcon, minFields = 1, maxFields, style = {} }) => {
	const { theme, colorScheme } = useTheme_default();
	const canAddMore = !maxFields || values.length < maxFields;
	const canRemove = values.length > minFields;
	const styles = MultiInput_styles_default(theme, colorScheme, !!disabled, !!error, canAddMore, canRemove);
	const PlusIcon = ({ iconClassName }) => /* @__PURE__ */ jsx("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		className: cx(styles["icon"], iconClassName),
		children: /* @__PURE__ */ jsx("path", { d: "M12 5v14M5 12h14" })
	});
	const BinIcon = ({ iconClassName }) => /* @__PURE__ */ jsx("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		className: cx(styles["icon"], iconClassName),
		children: /* @__PURE__ */ jsx("path", { d: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6" })
	});
	const handleAddValue = useCallback((newValue) => {
		if (newValue.trim() !== "" && (!maxFields || values.length < maxFields)) onChange([...values, newValue.trim()]);
	}, [
		values,
		onChange,
		maxFields
	]);
	const handleRemoveValue = useCallback((index) => {
		if (values.length > minFields) onChange(values.filter((_, i) => i !== index));
	}, [
		values,
		onChange,
		minFields
	]);
	const renderInputField = useCallback((value, onValueChange, attachedEndIcon, onEndIconClick) => {
		const handleInputChange = (e) => {
			onValueChange(e.target ? e.target.value : e);
		};
		const handleKeyDown = (e) => {
			if (e.key === "Enter" && onEndIconClick) {
				e.preventDefault();
				onEndIconClick();
			}
		};
		const commonProps = {
			disabled,
			endIcon: attachedEndIcon || endIcon,
			error,
			onChange: handleInputChange,
			onEndIconClick,
			onKeyDown: handleKeyDown,
			placeholder,
			startIcon,
			value
		};
		switch (fieldType) {
			case "DATE_TIME": return /* @__PURE__ */ jsx(DatePicker_default, { ...commonProps });
			case "BOOLEAN": return /* @__PURE__ */ jsx(Checkbox_default, {
				...commonProps,
				checked: value === "true" || Boolean(value),
				onChange: (e) => onValueChange(e.target.checked ? "true" : "false")
			});
			default: return /* @__PURE__ */ jsx(TextField_default, {
				...commonProps,
				type
			});
		}
	}, [
		placeholder,
		disabled,
		startIcon,
		endIcon,
		error,
		fieldType,
		type
	]);
	const [currentInputValue, setCurrentInputValue] = useState("");
	const handleInputSubmit = useCallback(() => {
		if (currentInputValue.trim() !== "") {
			handleAddValue(currentInputValue);
			setCurrentInputValue("");
		}
	}, [currentInputValue, handleAddValue]);
	return /* @__PURE__ */ jsxs(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("multi-input")), className),
		style,
		children: [label && /* @__PURE__ */ jsx(InputLabel_default, {
			required,
			error: !!error,
			children: label
		}), /* @__PURE__ */ jsxs("div", {
			className: cx(withVendorCSSClassPrefix(bem("multi-input", "container")), styles["container"]),
			children: [/* @__PURE__ */ jsx("div", {
				className: cx(withVendorCSSClassPrefix(bem("multi-input", "input-row")), styles["inputRow"]),
				children: /* @__PURE__ */ jsx("div", {
					className: cx(withVendorCSSClassPrefix(bem("multi-input", "input-wrapper")), styles["inputWrapper"]),
					children: renderInputField(currentInputValue, setCurrentInputValue, canAddMore ? /* @__PURE__ */ jsx(PlusIcon, { iconClassName: styles["plusIcon"] }) : void 0, canAddMore ? handleInputSubmit : void 0)
				})
			}), values.length > 0 && /* @__PURE__ */ jsx("div", {
				className: cx(withVendorCSSClassPrefix(bem("multi-input", "list-container")), styles["listContainer"]),
				children: values.map((value, index) => /* @__PURE__ */ jsxs("div", {
					className: cx(withVendorCSSClassPrefix(bem("multi-input", "list-item")), styles["listItem"]),
					children: [/* @__PURE__ */ jsx("span", {
						className: cx(withVendorCSSClassPrefix(bem("multi-input", "list-item-text")), styles["listItemText"]),
						children: value
					}), canRemove && /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => handleRemoveValue(index),
						disabled,
						className: cx(withVendorCSSClassPrefix(bem("multi-input", "remove-button")), styles["removeButton"]),
						title: "Remove value",
						children: /* @__PURE__ */ jsx(BinIcon, { iconClassName: styles["icon"] })
					})]
				}, index))
			})]
		})]
	});
};
var MultiInput_default = MultiInput;

//#endregion
//#region src/components/presentation/UserProfile/BaseUserProfile.tsx
const fieldsToSkip = [
	"roles.default",
	"active",
	"groups",
	"accountLocked",
	"accountDisabled",
	"oneTimePassword",
	"userSourceId",
	"idpType",
	"localCredentialExists",
	"active",
	"ResourceType",
	"ExternalID",
	"MetaData",
	"verifiedMobileNumbers",
	"verifiedEmailAddresses",
	"phoneNumbers.mobile",
	"emailAddresses",
	"preferredMFAOption"
];
const readonlyFields = [
	"username",
	"userName",
	"user_name"
];
const BaseUserProfile = ({ fallback = null, className = "", cardLayout = true, profile, schemas = [], flattenedProfile, mode = "inline", title, attributeMapping = {}, editable = true, onOpenChange, onUpdate, open = false, error = null, isLoading = false, preferences, showFields = [], hideFields = [], displayNameAttributes = [] }) => {
	const { theme, colorScheme } = useTheme_default();
	const [editedUser, setEditedUser] = useState(flattenedProfile || profile);
	const [editingFields, setEditingFields] = useState({});
	const { t } = useTranslation_default(preferences?.i18n);
	/**
	* Determines if a field should be visible based on showFields, hideFields, and fieldsToSkip arrays.
	* Priority order:
	* 1. fieldsToSkip (always hidden) - highest priority
	* 2. hideFields (explicitly hidden)
	* 3. showFields (explicitly shown, if array is not empty)
	* 4. Default behavior (show all fields not in fieldsToSkip)
	*/
	const shouldShowField = useCallback((fieldName) => {
		if (fieldsToSkip.includes(fieldName)) return false;
		if (hideFields.length > 0 && hideFields.includes(fieldName)) return false;
		if (showFields.length > 0) return showFields.includes(fieldName);
		return true;
	}, [showFields, hideFields]);
	const PencilIcon = () => /* @__PURE__ */ jsx("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" })
	});
	const toggleFieldEdit = useCallback((fieldName) => {
		setEditingFields((prev) => ({
			...prev,
			[fieldName]: !prev[fieldName]
		}));
	}, []);
	const getFieldPlaceholder = useCallback((schema) => {
		const { type, displayName, description, name } = schema;
		const fieldLabel = displayName || description || name || "value";
		switch (type) {
			case "DATE_TIME": return `Enter your ${fieldLabel.toLowerCase()}`;
			case "BOOLEAN": return `Select ${fieldLabel.toLowerCase()}`;
			case "COMPLEX": return `Enter ${fieldLabel.toLowerCase()} details`;
			default: return `Enter your ${fieldLabel.toLowerCase()}`;
		}
	}, []);
	const formatLabel = useCallback((key) => key.split(/(?=[A-Z])|_/).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" "), []);
	const styles = BaseUserProfile_styles_default(theme, colorScheme);
	const ObjectDisplay = ({ data }) => {
		if (!data || typeof data !== "object") return null;
		return /* @__PURE__ */ jsx("table", {
			className: styles.value,
			children: /* @__PURE__ */ jsx("tbody", { children: Object.entries(data).map(([key, value]) => /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", {
				className: styles.objectKey,
				children: /* @__PURE__ */ jsxs("strong", { children: [formatLabel(key), ":"] })
			}), /* @__PURE__ */ jsx("td", {
				className: styles.objectValue,
				children: typeof value === "object" ? /* @__PURE__ */ jsx(ObjectDisplay, { data: value }) : String(value)
			})] }, key)) })
		});
	};
	function set(obj, path, value) {
		const keys = path.split(".");
		let current = obj;
		for (let i = 0; i < keys.length; i += 1) {
			const key = keys[i];
			if (i === keys.length - 1) current[key] = value;
			else {
				if (!current[key] || typeof current[key] !== "object") current[key] = {};
				current = current[key];
			}
		}
	}
	const handleFieldSave = useCallback((schema) => {
		if (!onUpdate || !schema.name) return;
		const fieldName = schema.name;
		let fieldValue;
		if (editedUser && fieldName && editedUser[fieldName] !== void 0) fieldValue = editedUser[fieldName];
		else if (flattenedProfile?.[fieldName] !== void 0) fieldValue = flattenedProfile[fieldName];
		else fieldValue = "";
		if (Array.isArray(fieldValue)) fieldValue = fieldValue.filter((v) => v !== void 0 && v !== null && v !== "");
		let payload = {};
		if (schema.schemaId && schema.schemaId !== WellKnownSchemaIds.User) payload = { [schema.schemaId]: { [fieldName]: fieldValue } };
		else set(payload, fieldName, fieldValue);
		onUpdate(payload);
		toggleFieldEdit(fieldName);
	}, [
		editedUser,
		flattenedProfile,
		onUpdate,
		toggleFieldEdit
	]);
	const handleFieldCancel = useCallback((fieldName) => {
		const currentUser$1 = flattenedProfile || profile;
		setEditedUser((prev) => ({
			...prev,
			[fieldName]: currentUser$1[fieldName]
		}));
		toggleFieldEdit(fieldName);
	}, [
		flattenedProfile,
		profile,
		toggleFieldEdit
	]);
	const mergedMappings = Object.fromEntries(Object.entries({
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
		],
		...attributeMapping
	}).filter((entry) => entry[1] !== void 0));
	const renderSchemaField = (schema, isEditing, onEditValue, onStartEdit) => {
		if (!schema) return null;
		const { value, displayName, description, name, type, required, mutability, subAttributes, multiValued } = schema;
		const label = displayName || description || name || "";
		if (subAttributes && Array.isArray(subAttributes)) return /* @__PURE__ */ jsx(Fragment, { children: subAttributes.map((subAttr, index) => {
			let displayValue$1;
			if (Array.isArray(subAttr.value)) displayValue$1 = subAttr.value.map((item) => typeof item === "object" ? JSON.stringify(item) : String(item)).join(", ");
			else if (typeof subAttr.value === "object") displayValue$1 = JSON.stringify(subAttr.value);
			else displayValue$1 = String(subAttr.value);
			return /* @__PURE__ */ jsxs("div", {
				className: styles.field,
				children: [/* @__PURE__ */ jsx("span", {
					className: styles.label,
					children: subAttr.displayName || subAttr.description || ""
				}), /* @__PURE__ */ jsx("div", {
					className: styles.value,
					children: displayValue$1
				})]
			}, index);
		}) });
		if (Array.isArray(value) || multiValued) {
			const hasValues = Array.isArray(value) ? value.length > 0 : value !== void 0 && value !== null && value !== "";
			const isEditable$1 = editable && mutability !== "READ_ONLY" && !readonlyFields.includes(name || "");
			if (isEditing && onEditValue && isEditable$1) {
				let currentValue;
				if (editedUser && name && editedUser[name] !== void 0) currentValue = editedUser[name];
				else if (flattenedProfile && name && flattenedProfile[name] !== void 0) currentValue = flattenedProfile[name];
				else currentValue = value;
				let fieldValues;
				if (Array.isArray(currentValue)) fieldValues = currentValue.map(String);
				else if (currentValue !== void 0 && currentValue !== null && currentValue !== "") fieldValues = [String(currentValue)];
				else fieldValues = [];
				return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
					className: styles.label,
					children: label
				}), /* @__PURE__ */ jsx("div", {
					className: styles.value,
					children: /* @__PURE__ */ jsx(MultiInput_default, {
						values: fieldValues,
						onChange: (newValues) => {
							if (multiValued || Array.isArray(currentValue)) onEditValue(newValues);
							else onEditValue(newValues[0] || "");
						},
						placeholder: getFieldPlaceholder(schema),
						fieldType: type,
						type: type === "DATE_TIME" ? "date" : "text",
						required
					})
				})] });
			}
			let displayValue$1;
			if (hasValues) if (Array.isArray(value)) displayValue$1 = value.map((item) => typeof item === "object" ? JSON.stringify(item) : String(item)).join(", ");
			else displayValue$1 = String(value);
			else if (isEditable$1) displayValue$1 = getFieldPlaceholder(schema);
			else displayValue$1 = "-";
			return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
				className: styles.label,
				children: label
			}), /* @__PURE__ */ jsx("div", {
				className: cx(styles.value, !hasValues ? styles.valuePlaceholder : ""),
				children: !hasValues && isEditable$1 && onStartEdit ? /* @__PURE__ */ jsx(Button_default, {
					onClick: onStartEdit,
					variant: "text",
					color: "secondary",
					size: "small",
					title: "Click to edit",
					className: styles.editButton,
					children: displayValue$1
				}) : displayValue$1
			})] });
		}
		if (type === "COMPLEX" && typeof value === "object") return /* @__PURE__ */ jsx(ObjectDisplay, { data: value });
		if (isEditing && onEditValue && mutability !== "READ_ONLY" && !readonlyFields.includes(name || "")) {
			let fieldValue;
			if (editedUser && name && editedUser[name] !== void 0) fieldValue = editedUser[name];
			else if (flattenedProfile && name && flattenedProfile[name] !== void 0) fieldValue = flattenedProfile[name];
			else fieldValue = value || "";
			const commonProps = {
				label: void 0,
				onChange: (e) => onEditValue(e.target ? e.target.value : e),
				placeholder: getFieldPlaceholder(schema),
				required,
				value: fieldValue
			};
			let field;
			switch (type) {
				case "STRING":
					field = /* @__PURE__ */ jsx(TextField_default, { ...commonProps });
					break;
				case "DATE_TIME":
					field = /* @__PURE__ */ jsx(DatePicker_default, { ...commonProps });
					break;
				case "BOOLEAN":
					field = /* @__PURE__ */ jsx(Checkbox_default, {
						...commonProps,
						checked: !!fieldValue,
						onChange: (e) => {
							onEditValue(e.target.checked);
						}
					});
					break;
				case "COMPLEX":
					field = /* @__PURE__ */ jsx("textarea", {
						value: fieldValue,
						onChange: (e) => onEditValue(e.target.value),
						placeholder: getFieldPlaceholder(schema),
						required,
						className: styles.complexTextarea
					});
					break;
				default: field = /* @__PURE__ */ jsx(TextField_default, { ...commonProps });
			}
			return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
				className: styles.label,
				children: label
			}), /* @__PURE__ */ jsx("div", {
				className: styles.value,
				children: field
			})] });
		}
		const hasValue = value !== void 0 && value !== null && value !== "";
		const isEditable = editable && mutability !== "READ_ONLY" && !readonlyFields.includes(name || "");
		let displayValue;
		if (hasValue) displayValue = String(value);
		else if (isEditable) displayValue = getFieldPlaceholder(schema);
		else displayValue = "-";
		return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
			className: styles.label,
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: cx(styles.value, !hasValue ? styles.valuePlaceholder : ""),
			children: !hasValue && isEditable && onStartEdit ? /* @__PURE__ */ jsx(Button_default, {
				onClick: onStartEdit,
				variant: "text",
				color: "secondary",
				size: "small",
				title: "Click to edit",
				className: styles.editButton,
				children: displayValue
			}) : displayValue
		})] });
	};
	const renderUserInfo = (schema) => {
		if (!schema?.name) return null;
		const hasValue = schema.value !== void 0 && schema.value !== "" && schema.value !== null;
		const isFieldEditing = editingFields[schema.name];
		const isReadonlyField = readonlyFields.includes(schema.name);
		if (!(hasValue || isFieldEditing || editable && schema.mutability === "READ_WRITE")) return null;
		return /* @__PURE__ */ jsxs("div", {
			className: styles.field,
			children: [/* @__PURE__ */ jsx("div", {
				className: styles.fieldInner,
				children: renderSchemaField(schema, isFieldEditing, (value) => {
					const tempEditedUser = { ...editedUser };
					tempEditedUser[schema.name] = value;
					setEditedUser(tempEditedUser);
				}, () => toggleFieldEdit(schema.name))
			}), editable && schema.mutability !== "READ_ONLY" && !isReadonlyField && /* @__PURE__ */ jsxs("div", {
				className: styles.fieldActions,
				children: [isFieldEditing && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button_default, {
					size: "small",
					color: "primary",
					variant: "solid",
					onClick: () => handleFieldSave(schema),
					children: "Save"
				}), /* @__PURE__ */ jsx(Button_default, {
					size: "small",
					color: "secondary",
					variant: "solid",
					onClick: () => handleFieldCancel(schema.name),
					children: "Cancel"
				})] }), !isFieldEditing && hasValue && /* @__PURE__ */ jsx(Button_default, {
					size: "small",
					color: "tertiary",
					variant: "icon",
					onClick: () => toggleFieldEdit(schema.name),
					title: "Edit",
					className: styles.editButton,
					children: /* @__PURE__ */ jsx(PencilIcon, {})
				})]
			})]
		});
	};
	if (!profile && !flattenedProfile) return fallback;
	const containerClasses = cx(styles.root, cardLayout ? styles.card : "", withVendorCSSClassPrefix("user-profile"), className);
	const currentUser = flattenedProfile || profile;
	const renderProfileWithoutSchemas = () => {
		if (!currentUser) return null;
		const displayName = getDisplayName_default(mergedMappings, profile, displayNameAttributes);
		const profileEntries = Object.entries(currentUser).filter(([key, value]) => {
			if (!shouldShowField(key)) return false;
			return value !== void 0 && value !== "" && value !== null;
		}).sort(([a], [b]) => a.localeCompare(b));
		return /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: styles.profileSummary,
				children: [
					/* @__PURE__ */ jsx(Avatar, {
						imageUrl: getMappedUserProfileValue_default("picture", mergedMappings, currentUser),
						name: displayName,
						size: 70,
						alt: `${displayName}'s avatar`,
						isLoading
					}),
					/* @__PURE__ */ jsx(Typography_default, {
						variant: "h3",
						fontWeight: "medium",
						children: displayName
					}),
					getMappedUserProfileValue_default("email", mergedMappings, currentUser) && /* @__PURE__ */ jsx(Typography_default, {
						variant: "body2",
						color: "textSecondary",
						children: getMappedUserProfileValue_default("email", mergedMappings, currentUser)
					})
				]
			}),
			/* @__PURE__ */ jsx(Divider_default, {}),
			profileEntries.map(([key, value], index) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
				className: styles.sectionRow,
				children: [/* @__PURE__ */ jsx("div", {
					className: styles.sectionLabel,
					children: formatLabel(key)
				}), /* @__PURE__ */ jsx("div", {
					className: styles.sectionValue,
					children: typeof value === "object" ? /* @__PURE__ */ jsx(ObjectDisplay, { data: value }) : String(value)
				})]
			}), index < profileEntries.length - 1 && /* @__PURE__ */ jsx(Divider_default, {})] }, key))
		] });
	};
	const profileContent = /* @__PURE__ */ jsxs(Card_default, {
		className: containerClasses,
		children: [
			error && /* @__PURE__ */ jsxs(Alert_default, {
				variant: "error",
				className: cx(withVendorCSSClassPrefix(bem("user-profile", "alert")), styles.alert),
				children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") || "Error" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: error })]
			}),
			schemas && schemas.length > 0 && /* @__PURE__ */ jsx("div", {
				className: styles.header,
				children: /* @__PURE__ */ jsx(Avatar, {
					imageUrl: getMappedUserProfileValue_default("picture", mergedMappings, currentUser),
					name: getDisplayName_default(mergedMappings, profile),
					size: 80,
					alt: `${getDisplayName_default(mergedMappings, profile)}'s avatar`,
					isLoading
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: styles.infoContainer,
				children: schemas && schemas.length > 0 ? schemas.filter((schema) => {
					if (!schema.name || !shouldShowField(schema.name)) return false;
					if (!editable) {
						const value = flattenedProfile && schema.name ? flattenedProfile[schema.name] : void 0;
						return value !== void 0 && value !== "" && value !== null;
					}
					return true;
				}).sort((a, b) => {
					return (a.displayOrder ? parseInt(a.displayOrder, 10) : 999) - (b.displayOrder ? parseInt(b.displayOrder, 10) : 999);
				}).map((schema, index) => {
					const value = flattenedProfile && schema.name ? flattenedProfile[schema.name] : void 0;
					const schemaWithValue = {
						...schema,
						value
					};
					return /* @__PURE__ */ jsx("div", {
						className: styles.info,
						children: renderUserInfo(schemaWithValue)
					}, schema.name || index);
				}) : renderProfileWithoutSchemas()
			})
		]
	});
	if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title ?? t("user.profile.heading") }), /* @__PURE__ */ jsx("div", {
			className: styles.popup,
			children: profileContent
		})] })
	});
	return profileContent;
};
var BaseUserProfile_default = BaseUserProfile;

//#endregion
//#region src/api/updateMeProfile.ts
/**
* Updates the user profile information at the specified SCIM2 Me endpoint.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object with URL, payload and optional request config.
* @returns A promise that resolves with the updated user profile information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* await updateMeProfile({
*   url: "https://localhost:8090/scim2/Me",
*   payload: { "urn:scim:wso2:schema": { mobileNumbers: ["0777933830"] } }
* });
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* await updateMeProfile({
*   url: "https://localhost:8090/scim2/Me",
*   payload: { "urn:scim:wso2:schema": { mobileNumbers: ["0777933830"] } },
*   fetcher: customFetchFunction
* });
* ```
*/
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
//#region src/components/presentation/UserProfile/UserProfile.tsx
/**
* UserProfile component displays the authenticated user's profile information in a
* structured and styled format. It shows user details such as display name, email,
* username, and other available profile information from ThunderID.
*
* This component is the React-specific implementation that uses the BaseUserProfile
* and automatically retrieves the user data from ThunderID context if not provided.
*
* @example
* ```tsx
* // Basic usage - will use user from ThunderID context
* <UserProfile />
*
* // With explicit user data
* <UserProfile user={specificUser} />
*
* // With card layout and custom fallback
* <UserProfile
*   cardLayout={true}
*   fallback={<div>Please sign in to view your profile</div>}
* />
*
* // With field filtering - only show specific fields
* <UserProfile
*   showFields={['name.givenName', 'name.familyName', 'emails']}
* />
*
* // With field hiding - hide specific fields
* <UserProfile
*   hideFields={['phoneNumbers', 'addresses']}
* />
* ```
*/
const UserProfile = ({ preferences,...rest }) => {
	const { baseUrl, instanceId } = useThunderID_default();
	const { profile, flattenedProfile, schemas, onUpdateProfile } = useUser_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [error, setError] = useState(null);
	const handleProfileUpdate = async (payload) => {
		setError(null);
		try {
			onUpdateProfile(await updateMeProfile_default({
				baseUrl,
				instanceId,
				payload
			}));
		} catch (caughtError) {
			let message = t("user.profile.update.generic.error");
			if (caughtError instanceof ThunderIDError) message = caughtError?.message;
			setError(message);
		}
	};
	return /* @__PURE__ */ jsx(BaseUserProfile_default, {
		profile: profile ?? void 0,
		flattenedProfile: flattenedProfile ?? void 0,
		schemas: schemas ?? void 0,
		onUpdate: handleProfileUpdate,
		error,
		preferences,
		...rest
	});
};
var UserProfile_default = UserProfile;

//#endregion
//#region src/components/presentation/UserDropdown/BaseUserDropdown.styles.ts
/**
* Creates styles for the BaseUserDropdown component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$7 = (theme, colorScheme) => useMemo(() => {
	const trigger = css`
      display: inline-flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 0.75);
      padding: calc(${theme.vars.spacing.unit} * 0.5);
      background: none;
      border: none;
      cursor: pointer;
      border-radius: ${theme.vars.borderRadius.medium};
      transition: none;
      box-shadow: none;
      background-color: transparent;

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.05)"};
      }

      &:focus {
        outline: 2px solid ${theme.vars.colors.primary};
        outline-offset: 2px;
      }

      &:hover,
      &:focus,
      &:active,
      &:focus-visible {
        transition: none;
        box-shadow: none;
      }
    `;
	const userName = css`
      color: ${theme.vars.colors.text.primary};
      font-size: 0.875rem;
      font-weight: 500;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const dropdownContent = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid ${theme.vars.colors.border};
      font-family: ${theme.vars.typography.fontFamily};
      min-width: 250px;
      max-width: 600px;
      z-index: 1000;
      overflow: hidden;
    `;
	const dropdownMenu = css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `;
	const menuItem = css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 1.5) calc(${theme.vars.spacing.unit} * 2);
      width: 100%;
      color: ${theme.vars.colors.text.primary};
      text-decoration: none;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      text-align: start;
      border-radius: ${theme.vars.borderRadius.medium};
      transition: none;
      box-shadow: none;
      background: transparent;

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.05)"};
      }

      &:hover,
      &:focus,
      &:active,
      &:focus-visible {
        transition: none;
        box-shadow: none;
      }
    `;
	const menuItemAnchor = css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 1.5) calc(${theme.vars.spacing.unit} * 2);
      width: 100%;
      color: ${theme.vars.colors.text.primary};
      text-decoration: none;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 0.875rem;
      text-align: start;
      border-radius: ${theme.vars.borderRadius.medium};
      transition: background-color 0.15s ease-in-out;

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.05)"};
      }
    `;
	const divider = css`
      margin: calc(${theme.vars.spacing.unit} * 0.5) 0;
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const dropdownHeader = css`
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 1.5);
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const headerInfo = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} / 4);
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const headerName = css`
      color: ${theme.vars.colors.text.primary};
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	return {
		divider,
		dropdownContent,
		dropdownHeader,
		dropdownMenu,
		headerEmail: css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
		headerInfo,
		headerName,
		loadingContainer: css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80px;
      gap: ${theme.vars.spacing.unit};
    `,
		loadingText: css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
    `,
		menuItem,
		menuItemAnchor,
		trigger,
		userName
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.colors.border,
	theme.vars.colors.primary,
	theme.vars.colors.action?.hover,
	theme.vars.borderRadius.medium,
	theme.vars.borderRadius.large,
	theme.vars.spacing.unit,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseUserDropdown_styles_default = useStyles$7;

//#endregion
//#region src/components/presentation/UserDropdown/BaseUserDropdown.tsx
/**
* BaseUserDropdown component displays a user avatar with a dropdown menu.
* When clicked, it shows a popover with customizable menu items.
* This component serves as the base for framework-specific implementations.
*/
const BaseUserDropdown = ({ fallback = null, className = "", user, isLoading = false, portalId = "thunderid-user-dropdown", menuItems = [], showTriggerLabel = false, avatarSize = 32, onManageProfile, onSignOut, attributeMapping = {} }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseUserDropdown_styles_default(theme, colorScheme);
	const [isOpen, setIsOpen] = useState(false);
	const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
	const { refs, floatingStyles, context } = useFloating({
		middleware: [
			offset(5),
			flip({ fallbackAxisSideDirection: "end" }),
			shift({ padding: 5 })
		],
		onOpenChange: setIsOpen,
		open: isOpen,
		placement: "bottom-end",
		whileElementsMounted: autoUpdate
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useClick(context),
		useDismiss(context),
		useRole(context)
	]);
	const mergedMappings = Object.fromEntries(Object.entries({
		email: ["emails"],
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
		],
		...attributeMapping
	}).filter((entry) => entry[1] !== void 0));
	if (fallback && !user && !isLoading) return fallback;
	const handleMenuItemClick = (item) => {
		if (item.onClick) item.onClick();
		setIsOpen(false);
	};
	const defaultMenuItems = [];
	if (onManageProfile) defaultMenuItems.push({
		icon: /* @__PURE__ */ jsx(User_default$1, {
			width: "16",
			height: "16"
		}),
		label: "Manage Profile",
		onClick: onManageProfile
	});
	if (onSignOut) defaultMenuItems.push({
		icon: /* @__PURE__ */ jsx(LogOut_default, {
			width: "16",
			height: "16"
		}),
		label: "Sign Out",
		onClick: onSignOut
	});
	const allMenuItems = [...menuItems];
	if (defaultMenuItems.length > 0) {
		if (menuItems.length > 0) allMenuItems.push({
			label: "",
			onClick: void 0
		});
		allMenuItems.push(...defaultMenuItems);
	}
	return /* @__PURE__ */ jsxs("div", {
		className: cx(withVendorCSSClassPrefix("user-dropdown"), className),
		children: [/* @__PURE__ */ jsxs(Button_default, {
			ref: refs.setReference,
			className: cx(withVendorCSSClassPrefix("user-dropdown__trigger"), styles["trigger"]),
			color: "tertiary",
			variant: "text",
			size: "medium",
			"data-testid": "thunderid-user-dropdown-trigger",
			...getReferenceProps(),
			children: [/* @__PURE__ */ jsx(Avatar, {
				imageUrl: getMappedUserProfileValue_default("picture", mergedMappings, user),
				name: getDisplayName_default(mergedMappings, user),
				size: avatarSize,
				alt: `${getDisplayName_default(mergedMappings, user)}'s avatar`
			}), showTriggerLabel && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body2",
				className: cx(withVendorCSSClassPrefix("user-dropdown__trigger-label"), styles["userName"]),
				children: getDisplayName_default(mergedMappings, user)
			})]
		}), isOpen && /* @__PURE__ */ jsx(FloatingPortal, {
			id: portalId,
			children: /* @__PURE__ */ jsx(FloatingFocusManager, {
				context,
				modal: false,
				initialFocus: -1,
				children: /* @__PURE__ */ jsxs("div", {
					ref: refs.setFloating,
					className: cx(withVendorCSSClassPrefix("user-dropdown__content"), styles["dropdownContent"]),
					style: {
						...floatingStyles,
						zIndex: 9999
					},
					...getFloatingProps(),
					children: [/* @__PURE__ */ jsxs("div", {
						className: cx(withVendorCSSClassPrefix("user-dropdown__header"), styles["dropdownHeader"]),
						children: [/* @__PURE__ */ jsx(Avatar, {
							imageUrl: getMappedUserProfileValue_default("picture", mergedMappings, user),
							name: getDisplayName_default(mergedMappings, user),
							size: avatarSize * 1.25,
							alt: `${getDisplayName_default(mergedMappings, user)}'s avatar`
						}), /* @__PURE__ */ jsxs("div", {
							className: cx(withVendorCSSClassPrefix("user-dropdown__header-info"), styles["headerInfo"]),
							children: [/* @__PURE__ */ jsx(Typography_default, {
								noWrap: true,
								className: withVendorCSSClassPrefix("user-dropdown__header-name"),
								variant: "body1",
								fontWeight: "medium",
								children: getDisplayName_default(mergedMappings, user)
							}), /* @__PURE__ */ jsx(Typography_default, {
								noWrap: true,
								className: withVendorCSSClassPrefix("user-dropdown__header-email"),
								variant: "caption",
								color: "secondary",
								children: getMappedUserProfileValue_default("username", mergedMappings, user) || getMappedUserProfileValue_default("email", mergedMappings, user)
							})]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: cx(withVendorCSSClassPrefix("user-dropdown__menu"), styles["dropdownMenu"]),
						children: allMenuItems.map((item, index) => /* @__PURE__ */ jsx("div", { children: (() => {
							if (item.label === "") return /* @__PURE__ */ jsx("div", { className: cx(withVendorCSSClassPrefix("user-dropdown__menu-divider"), styles["divider"]) });
							if (item.href) return /* @__PURE__ */ jsxs("a", {
								href: item.href,
								style: { backgroundColor: hoveredItemIndex === index ? theme.vars.colors.action?.hover : "transparent" },
								className: cx(withVendorCSSClassPrefix("user-dropdown__menu-item"), styles["menuItemAnchor"]),
								onMouseEnter: () => setHoveredItemIndex(index),
								onMouseLeave: () => setHoveredItemIndex(null),
								onFocus: () => setHoveredItemIndex(index),
								onBlur: () => setHoveredItemIndex(null),
								children: [item.icon, /* @__PURE__ */ jsx("span", { children: item.label })]
							});
							return /* @__PURE__ */ jsx(Button_default, {
								onClick: () => handleMenuItemClick(item),
								style: { backgroundColor: hoveredItemIndex === index ? theme.vars.colors.action?.hover : "transparent" },
								className: cx(withVendorCSSClassPrefix("user-dropdown__menu-item"), styles["menuItem"]),
								color: "tertiary",
								variant: "text",
								size: "small",
								startIcon: item.icon,
								onMouseEnter: () => setHoveredItemIndex(index),
								onMouseLeave: () => setHoveredItemIndex(null),
								children: item.label
							});
						})() }, index))
					})]
				})
			})
		})]
	});
};
var BaseUserDropdown_default = BaseUserDropdown;

//#endregion
//#region src/components/presentation/UserDropdown/UserDropdown.tsx
/**
* UserDropdown component displays a user avatar with a dropdown menu.
* When clicked, it shows a popover with customizable menu items.
* This component is the React-specific implementation that uses the BaseUserDropdown
* and automatically retrieves the user data from ThunderID context.
*
* Supports render props for complete customization of the dropdown appearance and behavior.
*
* @example
* ```tsx
* // Basic usage - will use user from ThunderID context
* <UserDropdown menuItems={[
*   { label: 'Profile', onClick: () => {} },
*   { label: 'Settings', href: '/settings' },
*   { label: 'Sign Out', onClick: () => {} }
* ]} />
*
* // With custom configuration
* <UserDropdown
*   showTriggerLabel={true}
*   avatarSize={40}
*   fallback={<div>Please sign in</div>}
* />
*
* // Using render props for complete customization
* <UserDropdown>
*   {({ user, isLoading, openProfile, signOut }) => (
*     <div>
*       <button onClick={openProfile}>
*         {user?.name || 'Loading...'}
*       </button>
*       <button onClick={signOut}>Logout</button>
*     </div>
*   )}
* </UserDropdown>
*
* // Using partial render props
* <UserDropdown
*   renderTrigger={({ user, openProfile }) => (
*     <button onClick={openProfile} className="custom-trigger">
*       Welcome, {user?.name}!
*     </button>
*   )}
* />
* ```
*/
const UserDropdown = ({ children, renderTrigger, renderDropdown, onSignOut,...rest }) => {
	const { user, isLoading, signOut, meta } = useThunderID_default();
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const handleManageProfile = () => {
		setIsProfileOpen(true);
	};
	const handleSignOut = () => {
		signOut();
		if (onSignOut) onSignOut();
	};
	const closeProfile = () => {
		setIsProfileOpen(false);
	};
	const renderProps = {
		closeProfile,
		isLoading,
		isProfileOpen,
		meta,
		openProfile: handleManageProfile,
		signOut: handleSignOut,
		user
	};
	if (children) return /* @__PURE__ */ jsxs(Fragment, { children: [children(renderProps), /* @__PURE__ */ jsx(UserProfile_default, {
		mode: "popup",
		open: isProfileOpen,
		onOpenChange: setIsProfileOpen
	})] });
	if (renderTrigger || renderDropdown) return /* @__PURE__ */ jsxs(Fragment, { children: [renderTrigger ? renderTrigger(renderProps) : /* @__PURE__ */ jsx(BaseUserDropdown, {
		user,
		isLoading,
		onManageProfile: handleManageProfile,
		onSignOut: handleSignOut,
		...rest
	}), /* @__PURE__ */ jsx(UserProfile_default, {
		mode: "popup",
		open: isProfileOpen,
		onOpenChange: setIsProfileOpen
	})] });
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(BaseUserDropdown, {
		user,
		isLoading,
		onManageProfile: handleManageProfile,
		onSignOut: handleSignOut,
		...rest
	}), isProfileOpen && /* @__PURE__ */ jsx(UserProfile_default, {
		mode: "popup",
		open: isProfileOpen,
		onOpenChange: setIsProfileOpen
	})] });
};
var UserDropdown_default = UserDropdown;

//#endregion
//#region src/components/presentation/OrganizationSwitcher/BaseOrganizationSwitcher.styles.ts
/**
* Creates styles for the BaseOrganizationSwitcher component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$6 = (theme, colorScheme) => useMemo(() => {
	const root = css`
      display: inline-block;
      position: relative;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const trigger = css`
      display: inline-flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 0.75) ${theme.vars.spacing.unit};
      border: 1px solid ${theme.vars.colors.border};
      background: ${theme.vars.colors.background.surface};
      cursor: pointer;
      border-radius: ${theme.vars.borderRadius.medium};
      min-width: 160px;

      > span {
        width: 100%;
        gap: ${theme.vars.spacing.unit};
      }

      &:hover {
        background-color: ${theme.vars.colors.background.surface};
      }
    `;
	const triggerLabel = css`
      color: ${theme.vars.colors.text.primary};
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    `;
	const content = css`
      min-width: 280px;
      max-width: 400px;
      background-color: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.medium};
      box-shadow: ${theme.vars.shadows.medium};
      border: 1px solid ${theme.vars.colors.border};
      outline: none;
      z-index: 1000;
    `;
	const header = css`
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      padding: ${theme.vars.spacing.unit} calc(${theme.vars.spacing.unit} * 2);
    `;
	const headerInfo = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} / 4);
      flex: 1;
      min-width: 0;
      overflow: hidden;
    `;
	const headerName = css`
      color: ${theme.vars.colors.text.primary};
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const headerMeta = css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.75rem;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const headerRole = css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.75rem;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-transform: capitalize;
    `;
	const manageButton = css`
      min-width: auto;
      margin-inline-start: auto;
    `;
	const menu = css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `;
	const menuItem = css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 1.5) calc(${theme.vars.spacing.unit} * 2);
      width: 100%;
      color: ${theme.vars.colors.text.primary};
      text-decoration: none;
      border: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 0.875rem;
      text-align: start;
      border-radius: ${theme.vars.borderRadius.medium};
      transition: background-color 0.15s ease-in-out;

      > span {
        gap: ${theme.vars.spacing.unit};
      }

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.04)"};
      }
    `;
	const menuDivider = css`
      margin: calc(${theme.vars.spacing.unit} * 0.5) 0;
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const organizationInfo = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} / 4);
      flex: 1;
      min-width: 0;
      overflow: hidden;
    `;
	const organizationName = css`
      color: ${theme.vars.colors.text.primary};
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const organizationMeta = css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.75rem;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const loadingContainer = css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80px;
      gap: ${theme.vars.spacing.unit};
    `;
	const loadingText = css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
    `;
	const errorContainer = css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80px;
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	const errorText = css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
      text-align: center;
    `;
	const sectionHeader = css`
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: ${theme.vars.colors.text.secondary};
    `;
	const sectionHeaderContainer = css`
      border-top: none;
      border-bottom: none;
      padding-bottom: calc(${theme.vars.spacing.unit} / 2);
    `;
	return {
		content,
		errorContainer,
		errorText,
		header,
		headerInfo,
		headerMeta,
		headerName,
		headerRole,
		loadingContainer,
		loadingText,
		manageButton,
		menu,
		menuDivider,
		menuItem,
		organizationInfo,
		organizationMeta,
		organizationName,
		roleCapitalized: css`
      text-transform: capitalize;
    `,
		root,
		sectionHeader,
		sectionHeaderContainer,
		trigger,
		triggerLabel
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.colors.border,
	theme.vars.borderRadius.medium,
	theme.vars.shadows.medium,
	theme.vars.spacing.unit,
	theme.vars.colors.action?.hover,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseOrganizationSwitcher_styles_default = useStyles$6;

//#endregion
//#region src/components/primitives/Icons/Building.tsx
/**
* Building Icon component.
*
* @param props - Props injected to the component.
* @returns Building Icon component.
*/
const Building = ({ color = "currentColor", height = 24, width = 24 }) => /* @__PURE__ */ jsxs("svg", {
	width,
	height,
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [
		/* @__PURE__ */ jsx("path", {
			d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M6 12h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M6 8h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M14 8h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M14 12h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M6 18h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M14 18h4",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	]
});
Building.displayName = "Building";
var Building_default = Building;

//#endregion
//#region src/components/primitives/Icons/Check.tsx
/**
* Check Icon component.
*
* @param props - Props injected to the component.
* @returns Check Icon component.
*/
const Check = ({ color = "currentColor", height = 24, width = 24 }) => /* @__PURE__ */ jsx("svg", {
	width,
	height,
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: /* @__PURE__ */ jsx("path", {
		d: "M20 6 9 17l-5-5",
		stroke: color,
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	})
});
Check.displayName = "Check";
var Check_default = Check;

//#endregion
//#region src/components/primitives/Icons/ChevronDown.tsx
/**
* ChevronDown Icon component.
*
* @param props - Props injected to the component.
* @returns ChevronDown Icon component.
*/
const ChevronDown = ({ color = "currentColor", height = 24, width = 24 }) => /* @__PURE__ */ jsx("svg", {
	width,
	height,
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: /* @__PURE__ */ jsx("path", {
		d: "m6 9 6 6 6-6",
		stroke: color,
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	})
});
ChevronDown.displayName = "ChevronDown";
var ChevronDown_default = ChevronDown;

//#endregion
//#region src/components/presentation/OrganizationSwitcher/BaseOrganizationSwitcher.tsx
/**
* BaseOrganizationSwitcher component displays an organization selector with a dropdown menu.
* When clicked, it shows a popover with available organizations to switch between.
* This component serves as the base for framework-specific implementations.
*/
const BaseOrganizationSwitcher = ({ organizations, currentOrganization, loading = false, error, onOrganizationSwitch, onManageProfile, className = "", style, renderOrganization, renderLoading, renderError, showRole = false, showMemberCount = true, menuItems = [], portalId = "thunderid-organization-switcher", showTriggerLabel = true, avatarSize = 24, fallback = null, preferences }) => {
	const { theme, colorScheme, direction } = useTheme_default();
	const styles = BaseOrganizationSwitcher_styles_default(theme, colorScheme);
	const [isOpen, setIsOpen] = useState(false);
	const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
	const { t } = useTranslation_default(preferences?.i18n);
	const isRTL = direction === "rtl";
	const { refs, floatingStyles, context } = useFloating({
		middleware: [
			offset(5),
			flip({ fallbackAxisSideDirection: "end" }),
			shift({ padding: 5 })
		],
		onOpenChange: setIsOpen,
		open: isOpen,
		placement: "bottom-end",
		whileElementsMounted: autoUpdate
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useClick(context),
		useDismiss(context),
		useRole(context)
	]);
	if (fallback && !currentOrganization && !loading && organizations.length === 0) return fallback;
	const handleOrganizationSwitch = (organization) => {
		onOrganizationSwitch(organization);
		setIsOpen(false);
	};
	const handleMenuItemClick = (item) => {
		if (item.onClick) item.onClick();
		setIsOpen(false);
	};
	const switchableOrganizations = organizations.filter((org) => org.id !== currentOrganization?.id);
	const defaultRenderOrganization$1 = (organization, isSelected) => /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Avatar, {
			variant: "square",
			imageUrl: organization.avatar,
			name: organization.name,
			size: avatarSize * 1.25,
			alt: `${organization.name} avatar`
		}),
		/* @__PURE__ */ jsxs("div", {
			className: cx(styles["organizationInfo"]),
			children: [/* @__PURE__ */ jsx(Typography_default, {
				variant: "body2",
				fontWeight: "medium",
				className: cx(styles["organizationName"]),
				children: organization.name
			}), /* @__PURE__ */ jsxs("div", {
				className: cx(styles["organizationMeta"]),
				children: [
					showMemberCount && organization.memberCount !== void 0 && /* @__PURE__ */ jsxs("span", { children: [
						organization.memberCount,
						" ",
						organization.memberCount === 1 ? t("organization.switcher.member") : t("organization.switcher.members")
					] }),
					showRole && organization.role && showMemberCount && organization.memberCount !== void 0 && /* @__PURE__ */ jsx("span", { children: " • " }),
					showRole && organization.role && /* @__PURE__ */ jsx("span", {
						className: cx(styles["roleCapitalized"]),
						children: organization.role
					})
				]
			})]
		}),
		isSelected && /* @__PURE__ */ jsx(Check_default, {
			width: "16",
			height: "16",
			color: theme.vars.colors.text.primary
		})
	] });
	const defaultRenderLoading$1 = () => /* @__PURE__ */ jsx("div", {
		className: cx(styles["loadingContainer"]),
		children: /* @__PURE__ */ jsx(Typography_default, {
			variant: "caption",
			className: cx(styles["loadingText"]),
			children: t("organization.switcher.loading.placeholder.organizations")
		})
	});
	const defaultRenderError$1 = (errorMessage) => /* @__PURE__ */ jsx("div", {
		className: cx(styles["errorContainer"]),
		children: /* @__PURE__ */ jsx(Typography_default, {
			variant: "caption",
			className: cx(styles["errorText"]),
			children: errorMessage
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: cx(styles["root"], className),
		style,
		children: [/* @__PURE__ */ jsxs(Button_default, {
			ref: refs.setReference,
			className: cx(styles["trigger"]),
			color: "tertiary",
			variant: "outline",
			size: "medium",
			...getReferenceProps(),
			children: [currentOrganization ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Avatar, {
				variant: "square",
				imageUrl: currentOrganization.avatar,
				name: currentOrganization.name,
				size: avatarSize,
				alt: `${currentOrganization.name} avatar`
			}), showTriggerLabel && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body2",
				className: cx(styles["triggerLabel"]),
				children: currentOrganization.name
			})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Building_default, {
				width: avatarSize,
				height: avatarSize
			}), showTriggerLabel && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body2",
				className: cx(styles["triggerLabel"]),
				children: t("elements.fields.organization.select.label")
			})] }), /* @__PURE__ */ jsx("span", {
				style: {
					display: "inline-flex",
					transform: isRTL ? "scaleX(-1)" : "none"
				},
				children: /* @__PURE__ */ jsx(ChevronDown_default, {
					width: "16",
					height: "16"
				})
			})]
		}), isOpen && /* @__PURE__ */ jsx(FloatingPortal, {
			id: portalId,
			children: /* @__PURE__ */ jsx(FloatingFocusManager, {
				context,
				modal: false,
				initialFocus: -1,
				children: /* @__PURE__ */ jsxs("div", {
					ref: refs.setFloating,
					className: cx(styles["content"]),
					style: floatingStyles,
					...getFloatingProps(),
					children: [
						currentOrganization && /* @__PURE__ */ jsxs("div", {
							className: cx(styles["header"]),
							children: [
								/* @__PURE__ */ jsx(Avatar, {
									variant: "square",
									imageUrl: currentOrganization.avatar,
									name: currentOrganization.name,
									size: avatarSize * 1.5,
									alt: `${currentOrganization.name} avatar`
								}),
								/* @__PURE__ */ jsxs("div", {
									className: cx(styles["headerInfo"]),
									children: [/* @__PURE__ */ jsx(Typography_default, {
										noWrap: true,
										className: cx(styles["headerName"]),
										variant: "body1",
										fontWeight: "medium",
										children: currentOrganization.name
									}), /* @__PURE__ */ jsxs("div", {
										className: cx(styles["headerMeta"]),
										children: [showMemberCount && currentOrganization.memberCount !== void 0 && /* @__PURE__ */ jsxs(Typography_default, {
											noWrap: true,
											variant: "caption",
											color: "secondary",
											children: [
												currentOrganization.memberCount,
												" ",
												currentOrganization.memberCount === 1 ? t("organization.switcher.member") : t("organization.switcher.members"),
												showRole && currentOrganization.role && /* @__PURE__ */ jsxs("span", { children: [" • ", currentOrganization.role] })
											]
										}), showRole && currentOrganization.role && (!showMemberCount || currentOrganization.memberCount === void 0) && /* @__PURE__ */ jsx(Typography_default, {
											noWrap: true,
											className: cx(styles["headerRole"]),
											variant: "caption",
											color: "secondary",
											children: currentOrganization.role
										})]
									})]
								}),
								onManageProfile && /* @__PURE__ */ jsx(Button_default, {
									onClick: onManageProfile,
									color: "tertiary",
									variant: "outline",
									size: "small",
									"aria-label": "Manage Organization Profile",
									className: cx(styles["manageButton"]),
									endIcon: /* @__PURE__ */ jsxs("svg", {
										width: "16",
										height: "16",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										children: [/* @__PURE__ */ jsx("circle", {
											cx: "12",
											cy: "12",
											r: "3"
										}), /* @__PURE__ */ jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })]
									}),
									children: t("organization.switcher.buttons.manage.text")
								})
							]
						}),
						organizations.length > 1 && /* @__PURE__ */ jsx("div", {
							className: cx(styles["header"], styles["sectionHeaderContainer"]),
							style: { borderTop: currentOrganization ? `1px solid ${theme.vars.colors.border}` : "none" },
							children: /* @__PURE__ */ jsx(Typography_default, {
								variant: "caption",
								fontWeight: 600,
								className: cx(styles["sectionHeader"]),
								children: t("organization.switcher.switch.organization")
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: cx(styles["menu"]),
							children: (() => {
								if (loading) return renderLoading ? renderLoading() : defaultRenderLoading$1();
								if (error) return renderError ? renderError(error) : defaultRenderError$1(error);
								return /* @__PURE__ */ jsxs(Fragment, { children: [switchableOrganizations.map((organization) => {
									const isSelected = false;
									return /* @__PURE__ */ jsx(Button_default, {
										onClick: () => handleOrganizationSwitch(organization),
										className: cx(styles["menuItem"]),
										color: "tertiary",
										variant: "text",
										size: "small",
										style: { backgroundColor: hoveredItemIndex === switchableOrganizations.indexOf(organization) ? theme.vars.colors.action?.hover : "transparent" },
										onMouseEnter: () => setHoveredItemIndex(switchableOrganizations.indexOf(organization)),
										onMouseLeave: () => setHoveredItemIndex(null),
										children: renderOrganization ? renderOrganization(organization, isSelected) : defaultRenderOrganization$1(organization, isSelected)
									}, organization.id);
								}), menuItems.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", { className: cx(styles["menuDivider"]) }), menuItems.map((item, index) => /* @__PURE__ */ jsx("div", { children: item.href ? /* @__PURE__ */ jsxs("a", {
									href: item.href,
									style: { backgroundColor: hoveredItemIndex === switchableOrganizations.length + index ? theme.vars.colors.action?.hover : "transparent" },
									className: cx(styles["menuItem"]),
									onMouseEnter: () => setHoveredItemIndex(switchableOrganizations.length + index),
									onMouseLeave: () => setHoveredItemIndex(null),
									onFocus: () => setHoveredItemIndex(switchableOrganizations.length + index),
									onBlur: () => setHoveredItemIndex(null),
									children: [item.icon, /* @__PURE__ */ jsx("span", { children: item.label })]
								}) : /* @__PURE__ */ jsx(Button_default, {
									onClick: () => handleMenuItemClick(item),
									style: { backgroundColor: hoveredItemIndex === switchableOrganizations.length + index ? theme.vars.colors.action?.hover : "transparent" },
									className: cx(styles["menuItem"]),
									color: "tertiary",
									variant: "text",
									size: "small",
									startIcon: item.icon,
									onMouseEnter: () => setHoveredItemIndex(switchableOrganizations.length + index),
									onMouseLeave: () => setHoveredItemIndex(null),
									children: item.label
								}) }, index))] })] });
							})()
						})
					]
				})
			})
		})]
	});
};
var BaseOrganizationSwitcher_default = BaseOrganizationSwitcher;

//#endregion
//#region src/components/primitives/Icons/BuildingAlt.tsx
/**
* Alternative Building Icon component.
*
* @param props - Props injected to the component.
* @returns Alternative Building Icon component.
*/
const BuildingAlt = ({ height = 24, width = 24 }) => /* @__PURE__ */ jsxs("svg", {
	width,
	height,
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	children: [
		/* @__PURE__ */ jsx("path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }),
		/* @__PURE__ */ jsx("path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" }),
		/* @__PURE__ */ jsx("path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" }),
		/* @__PURE__ */ jsx("path", { d: "M10 6h4" }),
		/* @__PURE__ */ jsx("path", { d: "M10 10h4" }),
		/* @__PURE__ */ jsx("path", { d: "M10 14h4" }),
		/* @__PURE__ */ jsx("path", { d: "M10 18h4" })
	]
});
BuildingAlt.displayName = "BuildingAlt";
var BuildingAlt_default = BuildingAlt;

//#endregion
//#region src/components/presentation/CreateOrganization/BaseCreateOrganization.styles.ts
/**
* Creates styles for the BaseCreateOrganization component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$5 = (theme, colorScheme) => useMemo(() => {
	const root = css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      min-width: 600px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const card = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      padding: calc(${theme.vars.spacing.unit} * 4);
    `;
	const content = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const form = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
      width: 100%;
    `;
	const header = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
      margin-bottom: calc(${theme.vars.spacing.unit} * 1.5);
    `;
	const field = css`
      display: flex;
      align-items: center;
      padding: ${theme.vars.spacing.unit} 0;
      border-bottom: 1px solid ${theme.vars.colors.border};
      min-height: 32px;
    `;
	const fieldGroup = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 0.5);
    `;
	const textarea = css`
      width: 100%;
      padding: ${theme.vars.spacing.unit} calc(${theme.vars.spacing.unit} * 1.5);
      border: 1px solid ${theme.vars.colors.border};
      border-radius: ${theme.vars.borderRadius.medium};
      font-size: ${theme.vars.typography.fontSizes.md};
      color: ${theme.vars.colors.text.primary};
      background-color: ${theme.vars.colors.background.surface};
      font-family: ${theme.vars.typography.fontFamily};
      min-height: 80px;
      resize: vertical;
      outline: none;
      &:focus {
        border-color: ${theme.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${theme.vars.colors.primary.main}20;
      }
      &:disabled {
        background-color: ${theme.vars.colors.background.disabled};
        color: ${theme.vars.colors.text.secondary};
        cursor: not-allowed;
      }
    `;
	const textareaError = css`
      border-color: ${theme.vars.colors.error.main};
    `;
	const input = css``;
	const avatarContainer = css`
      align-items: flex-start;
      display: flex;
      gap: calc(${theme.vars.spacing.unit} * 2);
      margin-bottom: ${theme.vars.spacing.unit};
    `;
	const actions = css`
      display: flex;
      gap: ${theme.vars.spacing.unit};
      justify-content: flex-end;
      padding-top: calc(${theme.vars.spacing.unit} * 2);
    `;
	const infoContainer = css`
      display: flex;
      flex-direction: column;
      gap: ${theme.vars.spacing.unit};
    `;
	const value = css`
      color: ${theme.vars.colors.text.primary};
      flex: 1;
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      overflow: hidden;
      min-height: 32px;
      line-height: 32px;
    `;
	const popup = css`
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	return {
		actions,
		avatarContainer,
		card,
		content,
		errorAlert: css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `,
		field,
		fieldGroup,
		form,
		header,
		infoContainer,
		input,
		popup,
		root,
		textarea,
		textareaError,
		value
	};
}, [
	theme.vars.spacing.unit,
	theme.vars.colors.background.surface,
	theme.vars.colors.border,
	theme.vars.borderRadius.large,
	theme.vars.borderRadius.medium,
	theme.vars.typography.fontSizes.md,
	theme.vars.colors.text.primary,
	theme.vars.colors.primary.main,
	theme.vars.colors.background.disabled,
	theme.vars.colors.text.secondary,
	theme.vars.colors.error.main,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseCreateOrganization_styles_default = useStyles$5;

//#endregion
//#region src/components/presentation/CreateOrganization/BaseCreateOrganization.tsx
const logger$2 = createPackageComponentLogger("@thunderid/react", "BaseCreateOrganization");
/**
* Removes special characters except space and hyphen from the organization name
* and generates a valid handle.
* @param name
* @returns
*/
const generateHandleFromName = (name) => name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
/**
* BaseCreateOrganization component provides the core functionality for creating organizations.
* This component serves as the base for framework-specific implementations.
*/
const BaseCreateOrganization = ({ cardLayout = true, className = "", defaultParentId = "", error, initialValues = {}, loading = false, mode = "inline", onCancel, onOpenChange, onSubmit, onSuccess, open = false, preferences, renderAdditionalFields, style, title = "Create Organization" }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseCreateOrganization_styles_default(theme, colorScheme);
	const { t } = useTranslation_default(preferences?.i18n);
	const [formData, setFormData] = useState({
		description: "",
		handle: "",
		name: "",
		...initialValues
	});
	const [formErrors, setFormErrors] = useState({});
	const validateForm = () => {
		const errors = {};
		if (!formData.name.trim()) errors.name = "Organization name is required";
		if (!formData.handle.trim()) errors.handle = "Organization handle is required";
		else if (!/^[a-z0-9-]+$/.test(formData.handle)) errors.handle = "Handle can only contain lowercase letters, numbers, and hyphens";
		if (!formData.description.trim()) errors.description = "Organization description is required";
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));
		if (formErrors[field]) setFormErrors((prev) => ({
			...prev,
			[field]: void 0
		}));
	};
	/**
	* Handles changes to the organization name input.
	* Automatically generates the organization handle based on the name if the handle is not set or matches
	*
	* @param value - The new value for the organization name.
	*/
	const handleNameChange = (value) => {
		handleInputChange("name", value);
		if (!formData.handle || formData.handle === generateHandleFromName(formData.name)) handleInputChange("handle", generateHandleFromName(value));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm() || loading) return;
		const payload = {
			description: formData.description.trim(),
			name: formData.name.trim(),
			orgHandle: formData.handle.trim(),
			parentId: defaultParentId,
			type: "TENANT"
		};
		try {
			await onSubmit?.(payload);
			if (onSuccess) onSuccess(payload);
		} catch (submitError) {
			logger$2.error("Form submission error:");
		}
	};
	const createOrganizationContent = /* @__PURE__ */ jsx("div", {
		className: cx(styles["root"], cardLayout && styles["card"], className),
		style,
		children: /* @__PURE__ */ jsxs("div", {
			className: cx(styles["content"]),
			children: [/* @__PURE__ */ jsxs("form", {
				id: "create-organization-form",
				className: cx(styles["form"]),
				onSubmit: handleSubmit,
				children: [
					error && /* @__PURE__ */ jsxs(Alert_default, {
						variant: "error",
						className: styles["errorAlert"],
						children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: "Error" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: error })]
					}),
					/* @__PURE__ */ jsx("div", {
						className: cx(styles["fieldGroup"]),
						children: /* @__PURE__ */ jsx(TextField_default, {
							label: `${t("elements.fields.organization.name.label")}`,
							placeholder: t("elements.fields.organization.name.placeholder"),
							value: formData.name,
							onChange: (e) => handleNameChange(e.target.value),
							disabled: loading,
							required: true,
							error: formErrors.name,
							className: cx(styles["input"])
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: cx(styles["fieldGroup"]),
						children: /* @__PURE__ */ jsx(TextField_default, {
							label: `${t("elements.fields.organization.handle.label") || "Organization Handle"}`,
							placeholder: t("elements.fields.organization.handle.placeholder") || "my-organization",
							value: formData.handle,
							onChange: (e) => handleInputChange("handle", e.target.value),
							disabled: loading,
							required: true,
							error: formErrors.handle,
							helperText: "This will be your organization's unique identifier. Only lowercase letters, numbers, and hyphens are allowed.",
							className: cx(styles["input"])
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: cx(styles["fieldGroup"]),
						children: /* @__PURE__ */ jsxs(FormControl_default, {
							error: formErrors.description,
							children: [/* @__PURE__ */ jsx(InputLabel_default, {
								required: true,
								children: t("elements.fields.organization.description.label")
							}), /* @__PURE__ */ jsx("textarea", {
								className: cx(styles["textarea"], formErrors.description && styles["textareaError"]),
								placeholder: t("organization.create.description.placeholder"),
								value: formData.description,
								onChange: (e) => handleInputChange("description", e.target.value),
								disabled: loading,
								required: true
							})]
						})
					}),
					renderAdditionalFields?.()
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: cx(styles["actions"]),
				children: [onCancel && /* @__PURE__ */ jsx(Button_default, {
					type: "button",
					variant: "outline",
					onClick: onCancel,
					disabled: loading,
					children: t("organization.create.buttons.cancel.text")
				}), /* @__PURE__ */ jsx(Button_default, {
					type: "submit",
					variant: "solid",
					color: "primary",
					disabled: loading,
					form: "create-organization-form",
					children: loading ? t("organization.create.buttons.create_organization.loading.text") : t("organization.create.buttons.create_organization.text")
				})]
			})]
		})
	});
	if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
			className: styles["popup"],
			children: createOrganizationContent
		})] })
	});
	return createOrganizationContent;
};

//#endregion
//#region src/api/createOrganization.ts
/**
* Creates a new organization.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object containing baseUrl, payload and optional request config.
* @returns A promise that resolves with the created organization information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const organization = await createOrganization({
*     baseUrl: "https://localhost:8090",
*     payload: {
*       description: "Share your screens",
*       name: "Team Viewer",
*       orgHandle: "team-viewer",
*       parentId: "f4825104-4948-40d9-ab65-a960eee3e3d5",
*       type: "TENANT"
*     }
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to create organization:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const organization = await createOrganization({
*     baseUrl: "https://localhost:8090",
*     payload: {
*       description: "Share your screens",
*       name: "Team Viewer",
*       orgHandle: "team-viewer",
*       parentId: "f4825104-4948-40d9-ab65-a960eee3e3d5",
*       type: "TENANT"
*     },
*     fetcher: customFetchFunction
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to create organization:', error.message);
*   }
* }
* ```
*/
const createOrganization$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
	const defaultFetcher = async (url, config) => {
		const response = await FetchHttpClient.getInstance(instanceId).request({
			data: config.body ? JSON.parse(config.body) : void 0,
			headers: config.headers,
			method: config.method || "POST",
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
	return createOrganization({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var createOrganization_default = createOrganization$1;

//#endregion
//#region src/components/presentation/CreateOrganization/CreateOrganization.tsx
/**
* CreateOrganization component that provides organization creation functionality.
* This component automatically integrates with the ThunderID and Organization contexts.
*
* @example
* ```tsx
* import { CreateOrganization } from '@thunderid/react';
*
* // Basic usage - uses default API and contexts
* <CreateOrganization
*   onSuccess={(org) => console.log('Created:', org)}
*   onCancel={() => navigate('/organizations')}
* />
*
* // With custom organization creation handler
* <CreateOrganization
*   onCreateOrganization={async (payload) => {
*     const result = await myCustomAPI.createOrganization(payload);
*     return result;
*   }}
*   onSuccess={(org) => {
*     console.log('Organization created:', org.name);
*     // Custom success logic here
*   }}
* />
*
* // With fallback for unauthenticated users
* <CreateOrganization
*   fallback={<div>Please sign in to create an organization</div>}
* />
* ```
*/
const CreateOrganization = ({ onCreateOrganization, fallback = null, onSuccess, defaultParentId,...props }) => {
	const { isSignedIn, baseUrl, instanceId } = useThunderID_default();
	const { currentOrganization, revalidateMyOrganizations } = useOrganization_default();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	if (!isSignedIn && fallback) return fallback;
	if (!isSignedIn) return /* @__PURE__ */ jsx(Fragment, {});
	const parentId = defaultParentId || currentOrganization?.id || "";
	const handleSubmit = async (payload) => {
		setLoading(true);
		setError(null);
		try {
			let result;
			if (onCreateOrganization) result = await onCreateOrganization(payload);
			else {
				if (!baseUrl) throw new Error("Base URL is required for organization creation");
				result = await createOrganization_default({
					baseUrl,
					instanceId,
					payload: {
						...payload,
						parentId
					}
				});
			}
			await revalidateMyOrganizations();
			if (onSuccess) onSuccess(result);
		} catch (createError) {
			setError(createError instanceof Error ? createError.message : "Failed to create organization");
			throw createError;
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsx(BaseCreateOrganization, {
		onSubmit: handleSubmit,
		loading,
		error,
		defaultParentId: parentId,
		onSuccess,
		...props
	});
};

//#endregion
//#region src/components/presentation/OrganizationList/BaseOrganizationList.styles.ts
/**
* Creates styles for the BaseOrganizationList component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$4 = (theme, colorScheme) => useMemo(() => {
	const root = css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      min-width: 600px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
    `;
	const header = css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: calc(${theme.vars.spacing.unit} * 3);
      padding-bottom: calc(${theme.vars.spacing.unit} * 2);
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const headerInfo = css`
      flex: 1;
    `;
	const title = css`
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: ${theme.vars.colors.text.primary};
    `;
	const subtitle = css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
      margin: 0;
    `;
	const refreshButton = css`
      background-color: ${theme.vars.colors.background.surface};
      border: 1px solid ${theme.vars.colors.border};
      border-radius: ${theme.vars.borderRadius.small};
      color: ${theme.vars.colors.text.primary};
      cursor: pointer;
      font-size: 0.875rem;
      padding: ${theme.vars.spacing.unit} calc(${theme.vars.spacing.unit} * 2);
      transition: all 0.2s;
      &:hover {
        background-color: ${theme.vars.colors.background.surface};
        border-color: ${theme.vars.colors.primary.main};
      }
    `;
	const listContainer = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
    `;
	const organizationItem = css`
      border: 1px solid ${theme.vars.colors.border};
      border-radius: ${theme.vars.borderRadius.medium};
      display: flex;
      justify-content: space-between;
      padding: calc(${theme.vars.spacing.unit} * 2);
      transition: all 0.2s;
      background-color: ${theme.vars.colors.background.surface};
      &:hover {
        border-color: ${theme.vars.colors.primary.main};
        box-shadow: 0 2px 8px ${theme.vars.colors.primary.main}20;
      }
    `;
	const organizationContent = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 2);
      flex: 1;
    `;
	const organizationInfo = css`
      flex: 1;
    `;
	const organizationName = css`
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: ${theme.vars.colors.text.primary};
    `;
	const organizationHandle = css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
      margin: 0 0 4px 0;
      font-family: monospace;
    `;
	const organizationStatus = css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
      margin: 0;
    `;
	const statusText = css`
      font-weight: 500;
    `;
	const statusTextActive = css`
      color: ${theme.vars.colors.success.main};
    `;
	const statusTextInactive = css`
      color: ${theme.vars.colors.error.main};
    `;
	const organizationActions = css`
      display: flex;
      align-items: center;
    `;
	const badge = css`
      border-radius: ${theme.vars.borderRadius.large};
      font-size: 0.75rem;
      font-weight: 500;
      padding: calc(${theme.vars.spacing.unit} / 2) calc(${theme.vars.spacing.unit} * 1.5);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    `;
	const badgeSuccess = css`
      background-color: color-mix(in srgb, ${theme.vars.colors.success.main} 20%, transparent);
      color: ${theme.vars.colors.success.main};
    `;
	const badgeError = css`
      background-color: color-mix(in srgb, ${theme.vars.colors.error.main} 20%, transparent);
      color: ${theme.vars.colors.error.main};
    `;
	const loadingContainer = css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const loadingText = css`
      margin-top: ${theme.vars.spacing.unit};
    `;
	const errorContainer = css`
      background-color: color-mix(in srgb, ${theme.vars.colors.error.main} 20%, transparent);
      border: 1px solid ${theme.vars.colors.error.main};
      border-radius: ${theme.vars.borderRadius.medium};
      color: ${theme.vars.colors.error.main};
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	const emptyContainer = css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      text-align: center;
    `;
	const emptyText = css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 1rem;
    `;
	const loadMoreButton = css`
      background-color: ${theme.vars.colors.primary.main};
      border: none;
      border-radius: ${theme.vars.borderRadius.medium};
      color: ${theme.vars.colors.primary.contrastText};
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      padding: calc(${theme.vars.spacing.unit} * 1.5) calc(${theme.vars.spacing.unit} * 3);
      width: 100%;
      transition: all 0.2s;
      &:hover:not(:disabled) {
        background-color: ${theme.vars.colors.primary.main};
        opacity: 0.9;
      }
      &:disabled {
        background-color: ${theme.vars.colors.text.secondary};
        cursor: not-allowed;
        opacity: 0.6;
      }
    `;
	return {
		badge,
		badgeError,
		badgeSuccess,
		emptyContainer,
		emptyText,
		errorContainer,
		errorMargin: css`
      margin-top: calc(${theme.vars.spacing.unit} * 2);
    `,
		header,
		headerInfo,
		listContainer,
		loadMoreButton,
		loadMoreMargin: css`
      margin-top: calc(${theme.vars.spacing.unit} * 3);
    `,
		loadingContainer,
		loadingText,
		organizationActions,
		organizationContent,
		organizationHandle,
		organizationInfo,
		organizationItem,
		organizationName,
		organizationStatus,
		popupContent: css`
      padding: ${theme.vars.spacing.unit};
    `,
		refreshButton,
		root,
		statusText,
		statusTextActive,
		statusTextInactive,
		subtitle,
		title
	};
}, [
	theme.vars.spacing.unit,
	theme.vars.colors.background.surface,
	theme.vars.colors.border,
	theme.vars.borderRadius.large,
	theme.vars.borderRadius.medium,
	theme.vars.borderRadius.small,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.colors.primary.main,
	theme.vars.colors.success.main,
	theme.vars.colors.error.main,
	theme.vars.colors.primary.contrastText,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseOrganizationList_styles_default = useStyles$4;

//#endregion
//#region src/components/presentation/OrganizationList/BaseOrganizationList.tsx
/**
* Default organization item renderer
*/
const defaultRenderOrganization = (organization, styles, t, onOrganizationSelect, showStatus) => /* @__PURE__ */ jsxs("div", {
	className: cx(styles.organizationItem),
	children: [/* @__PURE__ */ jsxs("div", {
		className: cx(styles.organizationContent),
		children: [/* @__PURE__ */ jsx(Avatar, {
			variant: "square",
			name: organization.name,
			size: 48,
			alt: `${organization.name} logo`
		}), /* @__PURE__ */ jsxs("div", {
			className: cx(styles.organizationInfo),
			children: [
				/* @__PURE__ */ jsx(Typography_default, {
					variant: "h6",
					className: cx(styles.organizationName),
					children: organization.name
				}),
				/* @__PURE__ */ jsxs(Typography_default, {
					variant: "body2",
					color: "textSecondary",
					className: cx(styles.organizationHandle),
					children: ["@", organization.orgHandle]
				}),
				showStatus && /* @__PURE__ */ jsxs(Typography_default, {
					variant: "body2",
					color: "textSecondary",
					className: cx(styles.organizationStatus),
					children: [
						t("organization.switcher.status.label"),
						" ",
						/* @__PURE__ */ jsx("span", {
							className: cx(styles.statusText, organization.status === "ACTIVE" ? styles.statusTextActive : styles.statusTextInactive),
							children: organization.status
						})
					]
				})
			]
		})]
	}), organization.canSwitch && /* @__PURE__ */ jsx("div", {
		className: cx(styles.organizationActions),
		children: /* @__PURE__ */ jsx(Button_default, {
			onClick: (e) => {
				e.stopPropagation();
				onOrganizationSelect?.(organization);
			},
			type: "button",
			size: "small",
			children: t("organization.switcher.buttons.switch.text")
		})
	})]
}, organization.id);
/**
* Default loading renderer
*/
const defaultRenderLoading = (t, styles) => /* @__PURE__ */ jsxs("div", {
	className: cx(styles.loadingContainer),
	children: [/* @__PURE__ */ jsx(Spinner_default, { size: "medium" }), /* @__PURE__ */ jsx(Typography_default, {
		variant: "body1",
		color: "textSecondary",
		className: cx(styles.loadingText),
		children: t("organization.switcher.loading.placeholder.organizations")
	})]
});
/**
* Default error renderer
*/
const defaultRenderError = (errorMessage, t, styles) => /* @__PURE__ */ jsx("div", {
	className: cx(styles.errorContainer),
	children: /* @__PURE__ */ jsxs(Typography_default, {
		variant: "body1",
		color: "error",
		children: [
			/* @__PURE__ */ jsx("strong", { children: t("organization.switcher.error.prefix") }),
			" ",
			errorMessage
		]
	})
});
/**
* Default load more button renderer
*/
const defaultRenderLoadMore = (onLoadMore, isLoadingMore, t, styles) => /* @__PURE__ */ jsx(Button_default, {
	onClick: onLoadMore,
	disabled: isLoadingMore,
	className: cx(styles.loadMoreButton),
	type: "button",
	fullWidth: true,
	children: isLoadingMore ? t("organization.switcher.loading.more") : t("organization.switcher.buttons.load_more.text")
});
/**
* Default empty state renderer
*/
const defaultRenderEmpty = (t, styles) => /* @__PURE__ */ jsx("div", {
	className: cx(styles.emptyContainer),
	children: /* @__PURE__ */ jsx(Typography_default, {
		variant: "body1",
		color: "textSecondary",
		className: cx(styles.emptyText),
		children: t("organization.switcher.no.organizations")
	})
});
/**
* BaseOrganizationList component displays a list of organizations with pagination support.
* This component serves as the base for framework-specific implementations.
*
* @example
* ```tsx
* <BaseOrganizationList
*   data={organizations}
*   isLoading={isLoading}
*   hasMore={hasMore}
*   fetchMore={fetchMore}
*   error={error}
* />
* ```
*/
const BaseOrganizationList = ({ className = "", allOrganizations, myOrganizations, error, fetchMore, hasMore = false, isLoading = false, isLoadingMore = false, mode = "inline", onOpenChange, onOrganizationSelect, onRefresh, open = false, renderEmpty, renderError, renderLoading, renderLoadMore, renderOrganization, style, title = "Organizations", showStatus, preferences }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseOrganizationList_styles_default(theme, colorScheme);
	const { t } = useTranslation_default(preferences?.i18n);
	const organizationsWithSwitchAccess = useMemo(() => {
		if (!allOrganizations?.organizations) return [];
		const myOrgIds = new Set(myOrganizations?.map((org) => org.id) || []);
		return allOrganizations.organizations.map((org) => ({
			...org,
			canSwitch: myOrgIds.has(org.id)
		}));
	}, [allOrganizations?.organizations, myOrganizations]);
	const renderLoadingWithStyles = renderLoading || (() => defaultRenderLoading(t, styles));
	const renderErrorWithStyles = renderError || ((errorMsg) => defaultRenderError(errorMsg, t, styles));
	const renderEmptyWithStyles = renderEmpty || (() => defaultRenderEmpty(t, styles));
	const renderLoadMoreWithStyles = renderLoadMore || ((onLoadMore, loadingMore) => defaultRenderLoadMore(onLoadMore, loadingMore, t, styles));
	const renderOrganizationWithStyles = renderOrganization || ((org) => defaultRenderOrganization(org, styles, t, onOrganizationSelect, showStatus));
	if (isLoading && organizationsWithSwitchAccess?.length === 0) {
		const loadingContent = /* @__PURE__ */ jsx("div", {
			className: cx(styles["root"], className),
			style,
			children: renderLoadingWithStyles()
		});
		if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
				className: cx(styles["popupContent"]),
				children: loadingContent
			})] })
		});
		return loadingContent;
	}
	if (error && organizationsWithSwitchAccess?.length === 0) {
		const errorContent = /* @__PURE__ */ jsx("div", {
			className: cx(styles["root"], className),
			style,
			children: renderErrorWithStyles(error)
		});
		if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
				className: cx(styles["popupContent"]),
				children: errorContent
			})] })
		});
		return errorContent;
	}
	if (!isLoading && organizationsWithSwitchAccess?.length === 0) {
		const emptyContent = /* @__PURE__ */ jsx("div", {
			className: cx(styles["root"], className),
			style,
			children: renderEmptyWithStyles()
		});
		if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
				className: cx(styles["popupContent"]),
				children: emptyContent
			})] })
		});
		return emptyContent;
	}
	const organizationListContent = /* @__PURE__ */ jsxs("div", {
		className: cx(styles["root"], className),
		style,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: cx(styles["header"]),
				children: [/* @__PURE__ */ jsx("div", {
					className: cx(styles["headerInfo"]),
					children: /* @__PURE__ */ jsx(Typography_default, {
						variant: "body2",
						color: "textSecondary",
						className: cx(styles["subtitle"]),
						children: t("organization.switcher.showing.count", {
							showing: organizationsWithSwitchAccess?.length,
							total: allOrganizations?.organizations?.length || 0
						})
					})
				}), onRefresh && /* @__PURE__ */ jsx(Button_default, {
					onClick: onRefresh,
					className: cx(styles["refreshButton"]),
					type: "button",
					variant: "outline",
					size: "small",
					children: t("organization.switcher.buttons.refresh.text")
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: cx(styles["listContainer"]),
				children: organizationsWithSwitchAccess?.map((organization, index) => renderOrganizationWithStyles(organization, index))
			}),
			error && organizationsWithSwitchAccess?.length > 0 && /* @__PURE__ */ jsx("div", {
				className: cx(styles["errorMargin"]),
				children: renderErrorWithStyles(error)
			}),
			hasMore && fetchMore && /* @__PURE__ */ jsx("div", {
				className: cx(styles["loadMoreMargin"]),
				children: renderLoadMoreWithStyles(fetchMore, isLoadingMore)
			})
		]
	});
	if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
			className: cx(styles["popupContent"]),
			children: organizationListContent
		})] })
	});
	return organizationListContent;
};
var BaseOrganizationList_default = BaseOrganizationList;

//#endregion
//#region src/components/presentation/OrganizationList/OrganizationList.styles.ts
/**
* Creates styles for the OrganizationList component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$3 = (theme, colorScheme) => useMemo(() => {
	const cssOrganizationListWrapper = css`
      /* Container wrapper styles for OrganizationList component */
      width: 100%;
      font-family: ${theme.vars.typography.fontFamily};

      &__container {
        position: relative;
        width: 100%;
      }

      &__error-state {
        padding: calc(${theme.vars.spacing.unit} * 2);
        background-color: color-mix(in srgb, ${theme.vars.colors.error.main} 10%, transparent);
        border: 1px solid ${theme.vars.colors.error.main};
        border-radius: ${theme.vars.borderRadius.medium};
        color: ${theme.vars.colors.error.main};
        text-align: center;
      }

      &__loading-overlay {
        position: absolute;
        inset: 0;
        background-color: color-mix(in srgb, ${theme.vars.colors.background.surface} 80%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: ${theme.vars.borderRadius.large};
        backdrop-filter: blur(2px);
      }
    `;
	return {
		container: css`
        position: relative;
        width: 100%;
      `,
		errorState: css`
        padding: calc(${theme.vars.spacing.unit} * 2);
        background-color: color-mix(in srgb, ${theme.vars.colors.error.main} 10%, transparent);
        border: 1px solid ${theme.vars.colors.error.main};
        border-radius: ${theme.vars.borderRadius.medium};
        color: ${theme.vars.colors.error.main};
        text-align: center;
      `,
		loadingOverlay: css`
        position: absolute;
        inset: 0;
        background-color: color-mix(in srgb, ${theme.vars.colors.background.surface} 80%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: ${theme.vars.borderRadius.large};
        backdrop-filter: blur(2px);
      `,
		root: cssOrganizationListWrapper
	};
}, [theme, colorScheme]);
var OrganizationList_styles_default = useStyles$3;

//#endregion
//#region src/components/presentation/OrganizationList/OrganizationList.tsx
/**
* OrganizationList component that provides organization listing functionality with pagination.
* This component uses the enhanced OrganizationContext, eliminating the polling issue and
* providing better integration with the existing context system.
*
* @example
* ```tsx
* import { OrganizationList } from '@thunderid/react';
*
* // Basic usage
* <OrganizationList />
*
* // With custom limit and filter
* <OrganizationList
*   limit={20}
*   filter="active"
*   onOrganizationSelect={(org) => {
*     console.log('Selected organization:', org.name);
*   }}
* />
*
* // As a popup dialog
* <OrganizationList
*   mode="popup"
*   open={isOpen}
*   onOpenChange={setIsOpen}
*   title="Select Organization"
* />
*
* // With custom organization renderer
* <OrganizationList
*   renderOrganization={(org) => (
*     <div key={org.id}>
*       <h3>{org.name}</h3>
*       <p>Can switch: {org.canSwitch ? 'Yes' : 'No'}</p>
*     </div>
*   )}
* />
* ```
*/
const OrganizationList = (props) => {
	const { onOrganizationSelect, className = "", style,...baseProps } = props;
	const { autoFetch, filter, limit, recursive,...filteredBaseProps } = baseProps;
	const { theme, colorScheme } = useTheme_default();
	const styles = OrganizationList_styles_default(theme, colorScheme);
	const { getAllOrganizations: getAllOrganizations$2, error, isLoading, myOrganizations } = useOrganization_default();
	const [allOrganizations, setAllOrganizations] = useState({ organizations: [] });
	useEffect(() => {
		(async () => {
			setAllOrganizations(await getAllOrganizations$2());
		})();
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: cx(styles["root"], className),
		style,
		children: /* @__PURE__ */ jsx("div", {
			className: cx(styles["container"]),
			children: /* @__PURE__ */ jsx(BaseOrganizationList, {
				allOrganizations,
				myOrganizations,
				error,
				isLoading,
				onOrganizationSelect,
				...filteredBaseProps
			})
		})
	});
};
var OrganizationList_default = OrganizationList;

//#endregion
//#region src/components/presentation/OrganizationProfile/BaseOrganizationProfile.styles.ts
/**
* Creates styles for the BaseOrganizationProfile component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles$2 = (theme, colorScheme) => useMemo(() => ({
	attributeItem: css`
        display: flex;
        gap: ${theme.vars.spacing.unit};
        padding: calc(${theme.vars.spacing.unit} / 4) 0;
        align-items: center;
      `,
	attributeKey: css`
        font-size: 0.75rem;
        font-weight: 500;
        color: ${theme.vars.colors.text.secondary};
        min-width: 80px;
        flex-shrink: 0;
      `,
	attributeValue: css`
        font-size: 0.75rem;
        color: ${theme.vars.colors.text.primary};
        word-break: break-word;
        flex: 1;
      `,
	attributesList: css`
        display: flex;
        flex-direction: column;
        gap: calc(${theme.vars.spacing.unit} / 4);
      `,
	card: css`
        background: ${theme.vars.colors.background.surface};
        border-radius: ${theme.vars.borderRadius.large};
      `,
	editButton: css`
        min-width: auto;
        padding: calc(${theme.vars.spacing.unit} / 2);
        min-height: auto;
      `,
	field: css`
        display: flex;
        align-items: flex-start;
        padding: calc(${theme.vars.spacing.unit} / 2) 0;
        border-bottom: 1px solid ${theme.vars.colors.border};
        min-height: 28px;
        gap: ${theme.vars.spacing.unit};
      `,
	fieldActions: css`
        display: flex;
        align-items: center;
        gap: calc(${theme.vars.spacing.unit} / 2);
      `,
	fieldContent: css`
        flex: 1;
        display: flex;
        align-items: center;
        gap: ${theme.vars.spacing.unit};
      `,
	fieldInput: css`
        margin-bottom: 0;
      `,
	fieldLast: css`
        border-bottom: none;
      `,
	handle: css`
        font-size: 1rem;
        color: ${theme.vars.colors.text.secondary};
        margin: 0;
        font-family: monospace;
      `,
	header: css`
        display: flex;
        align-items: center;
        gap: calc(${theme.vars.spacing.unit} * 2);
        margin-bottom: calc(${theme.vars.spacing.unit} * 3);
        padding-bottom: calc(${theme.vars.spacing.unit} * 2);
      `,
	infoContainer: css`
        display: flex;
        flex-direction: column;
        gap: ${theme.vars.spacing.unit};
      `,
	label: css`
        font-size: 0.875rem;
        font-weight: 500;
        color: ${theme.vars.colors.text.secondary};
        width: 120px;
        flex-shrink: 0;
        line-height: 28px;
      `,
	name: css`
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: ${theme.vars.colors.text.primary};
      `,
	orgInfo: css`
        flex: 1;
      `,
	permissionBadge: css`
        padding: calc(${theme.vars.spacing.unit} / 4) ${theme.vars.spacing.unit};
        border-radius: ${theme.vars.borderRadius.small};
        font-size: 0.75rem;
        background-color: ${theme.vars.colors.primary.main};
        color: ${theme.vars.colors.primary.contrastText};
        border: 1px solid ${theme.vars.colors.border};
      `,
	permissionsList: css`
        display: flex;
        flex-wrap: wrap;
        gap: calc(${theme.vars.spacing.unit} / 2);
      `,
	placeholderButton: css`
        font-style: italic;
        text-decoration: underline;
        opacity: 0.7;
        padding: 0;
        min-height: auto;
      `,
	popup: css`
        padding: calc(${theme.vars.spacing.unit} * 2);
      `,
	root: css`
        padding: calc(${theme.vars.spacing.unit} * 4);
        min-width: 600px;
        margin: 0 auto;
        font-family: ${theme.vars.typography.fontFamily};
      `,
	statusBadge: css`
        padding: calc(${theme.vars.spacing.unit} / 2) ${theme.vars.spacing.unit};
        border-radius: ${theme.vars.borderRadius.small};
        font-size: 0.75rem;
        font-weight: 500;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `,
	value: css`
        color: ${theme.vars.colors.text.primary};
        flex: 1;
        display: flex;
        align-items: center;
        gap: ${theme.vars.spacing.unit};
        overflow: hidden;
        min-height: 28px;
        line-height: 28px;
        word-break: break-word;
      `,
	valueEmpty: css`
        font-style: italic;
        opacity: 0.7;
      `
}), [theme, colorScheme]);
var BaseOrganizationProfile_styles_default = useStyles$2;

//#endregion
//#region src/components/primitives/KeyValueInput/KeyValueInput.styles.ts
/**
* Creates styles for the KeyValueInput component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param disabled - Whether the component is disabled
* @param readOnly - Whether the component is read-only
* @param hasError - Whether the component has an error
* @returns Object containing CSS class names for component styling
*/
const useStyles$1 = (theme, colorScheme, disabled, readOnly, hasError) => useMemo(() => {
	const container = css`
      display: flex;
      flex-direction: column;
      font-family: ${theme.vars.typography.fontFamily};
      gap: calc(${theme.vars.spacing.unit} / 2);
    `;
	const label = css`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${theme.vars.colors.text.primary};
      margin-bottom: calc(${theme.vars.spacing.unit} / 2);
    `;
	const requiredIndicator = css`
      color: ${theme.vars.colors.error.main};
    `;
	const pairsList = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} / 4);
    `;
	const pairRow = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} / 2);
      padding: calc(${theme.vars.spacing.unit} / 2);
      border-radius: ${theme.vars.borderRadius.small};
      background-color: transparent;
      border: none;

      &:hover {
        background-color: ${theme.vars.colors.action.hover};
      }
    `;
	const pairInput = css`
      flex: 1;
      min-width: 0;
    `;
	const addRow = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} / 2);
      padding: calc(${theme.vars.spacing.unit} / 2);
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      background-color: transparent;
      margin-top: calc(${theme.vars.spacing.unit} / 2);
    `;
	const removeButton = css`
      min-width: auto;
      width: 24px;
      height: 24px;
      padding: 0;
      background-color: transparent;
      color: ${theme.vars.colors.text.secondary};
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: ${disabled ? "not-allowed" : "pointer"};

      &:hover:not(:disabled) {
        background-color: ${theme.vars.colors.action.hover};
        color: ${theme.vars.colors.error.main};
      }

      &:disabled {
        opacity: 0.6;
      }
    `;
	const addButton = css`
      min-width: auto;
      width: 24px;
      height: 24px;
      padding: 0;
      background-color: transparent;
      color: ${theme.vars.colors.primary.main};
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: ${disabled ? "not-allowed" : "pointer"};

      &:hover:not(:disabled) {
        background-color: ${theme.vars.colors.primary.main};
        color: ${theme.vars.colors.primary.contrastText};
      }

      &:disabled {
        opacity: 0.6;
      }
    `;
	const helperText = css`
      font-size: 0.75rem;
      color: ${hasError ? theme.vars.colors.error.main : theme.vars.colors.text.secondary};
      margin-top: calc(${theme.vars.spacing.unit} / 2);
    `;
	const emptyState = css`
      padding: ${theme.vars.spacing.unit};
      text-align: center;
      color: ${theme.vars.colors.text.secondary};
      font-style: italic;
      font-size: 0.75rem;
    `;
	const readOnlyPair = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} / 2);
      padding: calc(${theme.vars.spacing.unit} / 4) 0;
      min-height: 20px;
    `;
	const readOnlyKey = css`
      font-size: 0.75rem;
      font-weight: 500;
      color: ${theme.vars.colors.text.secondary};
      min-width: 80px;
      flex-shrink: 0;
    `;
	const readOnlyValue = css`
      font-size: 0.75rem;
      color: ${theme.vars.colors.text.primary};
      word-break: break-word;
      flex: 1;
    `;
	return {
		addButton,
		addRow,
		container,
		counterText: css`
      font-size: 0.75rem;
      color: ${theme.vars.colors.text.secondary};
      margin-top: calc(${theme.vars.spacing.unit} / 2);
    `,
		emptyState,
		helperText,
		label,
		pairInput,
		pairRow,
		pairsList,
		readOnlyKey,
		readOnlyPair,
		readOnlyValue,
		removeButton,
		requiredIndicator
	};
}, [
	theme,
	colorScheme,
	disabled,
	readOnly,
	hasError
]);
var KeyValueInput_styles_default = useStyles$1;

//#endregion
//#region src/components/primitives/KeyValueInput/KeyValueInput.tsx
/**
* KeyValueInput component allows users to manage key-value pairs with add/remove functionality.
* It provides a user-friendly interface for editing organization attributes or similar data structures.
*
* @example
* ```tsx
* // Basic usage
* <KeyValueInput
*   label="Organization Attributes"
*   onChange={(pairs) => console.log(pairs)}
* />
*
* // With initial values
* <KeyValueInput
*   label="Organization Attributes"
*   value={{department: 'IT', location: 'New York'}}
*   onChange={(pairs) => console.log(pairs)}
* />
*
* // With add/remove callbacks
* <KeyValueInput
*   label="Custom Attributes"
*   value={attributes}
*   onChange={(pairs) => setAttributes(pairs)}
*   onAdd={(pair) => console.log('Added:', pair)}
*   onRemove={(pair, index) => console.log('Removed:', pair, 'at index:', index)}
* />
* ```
*/
const KeyValueInput = ({ className = "", disabled = false, error, helperText, keyLabel = "Key", keyPlaceholder = "Enter key", label, maxPairs, onChange, onAdd, onRemove, readOnly = false, removeButtonText = "Remove", required = false, value = {}, valueLabel = "Value", valuePlaceholder = "Enter value" }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = KeyValueInput_styles_default(theme, colorScheme, disabled, readOnly, !!error);
	const [pairs, setPairs] = useState(Array.isArray(value) ? value : Object.entries(value).map(([key, val]) => ({
		key,
		value: String(val)
	})));
	const [newKey, setNewKey] = useState("");
	const [newValue, setNewValue] = useState("");
	const handleAddPair = useCallback(() => {
		if (!newKey.trim() || !newValue.trim()) return;
		if (maxPairs && pairs.length >= maxPairs) return;
		const newPair = {
			key: newKey.trim(),
			value: newValue.trim()
		};
		const updatedPairs = [...pairs, newPair];
		setPairs(updatedPairs);
		setNewKey("");
		setNewValue("");
		if (onChange) onChange(updatedPairs);
		if (onAdd) onAdd(newPair);
	}, [
		newKey,
		newValue,
		pairs,
		maxPairs,
		onChange,
		onAdd
	]);
	const handleRemovePair = useCallback((index) => {
		const pairToRemove = pairs[index];
		const updatedPairs = pairs.filter((_, i) => i !== index);
		setPairs(updatedPairs);
		if (onChange) onChange(updatedPairs);
		if (onRemove) onRemove(pairToRemove, index);
	}, [
		pairs,
		onChange,
		onRemove
	]);
	const handleUpdatePair = useCallback((index, field, newVal) => {
		const updatedPairs = pairs.map((pair, i) => {
			if (i === index) return {
				...pair,
				[field]: newVal
			};
			return pair;
		});
		setPairs(updatedPairs);
		if (onChange) onChange(updatedPairs);
	}, [pairs, onChange]);
	const canAddMore = !maxPairs || pairs.length < maxPairs;
	const isAddDisabled = disabled || readOnly || !canAddMore || !newKey.trim() || !newValue.trim();
	const renderReadOnlyContent = () => {
		if (pairs.length === 0) return /* @__PURE__ */ jsx("div", {
			className: cx(withVendorCSSClassPrefix(bem("key-value-input", "empty-state")), styles["emptyState"]),
			children: "No attributes defined"
		});
		return pairs.map((pair, index) => /* @__PURE__ */ jsxs("div", {
			className: cx(withVendorCSSClassPrefix(bem("key-value-input", "readonly-pair")), styles["readOnlyPair"]),
			children: [/* @__PURE__ */ jsxs("span", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "readonly-key")), styles["readOnlyKey"]),
				children: [pair.key, ":"]
			}), /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "readonly-value")), styles["readOnlyValue"]),
				children: pair.value
			})]
		}, `${pair.key}-${index}`));
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cx(withVendorCSSClassPrefix(bem("key-value-input")), styles["container"], className),
		children: [
			label && /* @__PURE__ */ jsxs("label", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "label")), styles["label"]),
				children: [label, required && /* @__PURE__ */ jsx("span", {
					className: cx(withVendorCSSClassPrefix(bem("key-value-input", "required")), styles["requiredIndicator"]),
					children: " *"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pairs-list")), styles["pairsList"]),
				children: [readOnly ? renderReadOnlyContent() : pairs.map((pair, index) => /* @__PURE__ */ jsxs("div", {
					className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pair-row")), styles["pairRow"]),
					children: [
						/* @__PURE__ */ jsx(TextField_default, {
							placeholder: keyPlaceholder,
							value: pair.key,
							onChange: (e) => handleUpdatePair(index, "key", e.target.value),
							disabled: disabled || readOnly,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pair-input")), styles["pairInput"]),
							"aria-label": `${keyLabel} ${index + 1}`
						}),
						/* @__PURE__ */ jsx(TextField_default, {
							placeholder: valuePlaceholder,
							value: pair.value,
							onChange: (e) => handleUpdatePair(index, "value", e.target.value),
							disabled: disabled || readOnly,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pair-input")), styles["pairInput"]),
							"aria-label": `${valueLabel} ${index + 1}`
						}),
						!readOnly && /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => handleRemovePair(index),
							disabled,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "remove-button")), styles["removeButton"]),
							"aria-label": `${removeButtonText} ${pair.key}`,
							children: /* @__PURE__ */ jsx(X_default, {
								width: 16,
								height: 16
							})
						})
					]
				}, `${pair.key}-${index}`)), !readOnly && /* @__PURE__ */ jsxs("div", {
					className: cx(withVendorCSSClassPrefix(bem("key-value-input", "add-row")), styles["addRow"]),
					children: [
						/* @__PURE__ */ jsx(TextField_default, {
							placeholder: keyPlaceholder,
							value: newKey,
							onChange: (e) => setNewKey(e.target.value),
							disabled,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pair-input")), styles["pairInput"]),
							"aria-label": "New key"
						}),
						/* @__PURE__ */ jsx(TextField_default, {
							placeholder: valuePlaceholder,
							value: newValue,
							onChange: (e) => setNewValue(e.target.value),
							disabled,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pair-input")), styles["pairInput"]),
							"aria-label": "New value",
							onKeyPress: (e) => {
								if (e.key === "Enter" && !isAddDisabled) handleAddPair();
							}
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: handleAddPair,
							disabled: isAddDisabled,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "add-button")), styles["addButton"]),
							"aria-label": "Add new key-value pair",
							children: /* @__PURE__ */ jsx(Plus_default, {
								width: 16,
								height: 16
							})
						})
					]
				})]
			}),
			(helperText || error) && /* @__PURE__ */ jsx("div", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "helper-text")), styles["helperText"]),
				children: error || helperText
			}),
			maxPairs && /* @__PURE__ */ jsxs("div", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "counter")), styles["counterText"]),
				children: [
					pairs.length,
					" of ",
					maxPairs,
					" pairs used"
				]
			})
		]
	});
};
var KeyValueInput_default = KeyValueInput;

//#endregion
//#region src/components/presentation/OrganizationProfile/BaseOrganizationProfile.tsx
/**
* BaseOrganizationProfile component displays organization information in a
* structured and styled format. It shows organization details such as name,
* description, status, and other available information with support for inline editing.
*
* This is the base component that can be used in any context where you have
* an organization object available. It provides editing capabilities similar to
* the UserProfile component, allowing users to modify organization fields directly.
*
* @example
* ```tsx
* // Basic usage
* <BaseOrganizationProfile organization={organizationData} />
*
* // With editing enabled and update handler
* <BaseOrganizationProfile
*   organization={organizationData}
*   editable={true}
*   onUpdate={async (payload) => {
*     await updateOrganizationAPI(orgId, payload);
*   }}
* />
*
* // With card layout and custom title
* <BaseOrganizationProfile
*   organization={organizationData}
*   cardLayout={true}
*   title="Organization Details"
*   fallback={<div>No organization data available</div>}
* />
*
* // With custom fields configuration
* <BaseOrganizationProfile
*   organization={organizationData}
*   fields={[
*     { key: 'id', label: 'Organization ID', editable: false },
*     { key: 'name', label: 'Organization Name', editable: true },
*     { key: 'description', label: 'Description', editable: true, render: (value) => value || 'No description' },
*     { key: 'created', label: 'Created Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
*     { key: 'attributes', label: 'Custom Attributes', editable: true }
*   ]}
*   onUpdate={handleUpdate}
* />
*
* // In popup mode
* <BaseOrganizationProfile
*   organization={organizationData}
*   mode="popup"
*   open={isOpen}
*   onOpenChange={setIsOpen}
*   title="Edit Organization"
* />
* ```
* <BaseOrganizationProfile
*   organization={organizationData}
*   fields={[
*     { key: 'id', label: 'Organization ID' },
*     { key: 'name', label: 'Organization Name' },
*     { key: 'description', label: 'Description', render: (value) => value || 'No description' },
*     { key: 'created', label: 'Created Date', render: (value) => new Date(value).toLocaleDateString() },
*     { key: 'attributes', label: 'Custom Attributes' }
*   ]}
* />
* ```
*/
const BaseOrganizationProfile = ({ fallback = null, className = "", cardLayout = true, organization, title = "Organization Profile", mode = "inline", editable = true, onOpenChange, onUpdate, open = false, saveButtonText = "Save Changes", cancelButtonText = "Cancel", fields = [
	{
		editable: false,
		key: "id",
		label: "Organization ID"
	},
	{
		editable: true,
		key: "name",
		label: "Organization Name"
	},
	{
		editable: true,
		key: "description",
		label: "Organization Description",
		render: (value) => value || "-"
	},
	{
		editable: false,
		key: "created",
		label: "Created Date",
		render: (value) => formatDate(value)
	},
	{
		editable: false,
		key: "lastModified",
		label: "Last Modified Date",
		render: (value) => formatDate(value)
	}
] }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseOrganizationProfile_styles_default(theme, colorScheme);
	const [editedOrganization, setEditedOrganization] = useState(organization);
	const [editingFields, setEditingFields] = useState({});
	const PencilIcon = () => /* @__PURE__ */ jsx("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" })
	});
	const toggleFieldEdit = useCallback((fieldName) => {
		setEditingFields((prev) => ({
			...prev,
			[fieldName]: !prev[fieldName]
		}));
	}, []);
	const getFieldPlaceholder = useCallback((fieldKey) => {
		return `Enter ${{
			description: "organization description",
			name: "organization name",
			orgHandle: "organization handle",
			status: "organization status",
			type: "organization type"
		}[fieldKey] || fieldKey.toLowerCase()}`;
	}, []);
	const handleFieldSave = useCallback((fieldKey) => {
		if (!onUpdate || !fieldKey) return;
		let fieldValue;
		if (editedOrganization && fieldKey && editedOrganization[fieldKey] !== void 0) fieldValue = editedOrganization[fieldKey];
		else if (organization?.[fieldKey] !== void 0) fieldValue = organization[fieldKey];
		else fieldValue = "";
		onUpdate({ [fieldKey]: fieldValue });
		toggleFieldEdit(fieldKey);
	}, [
		editedOrganization,
		organization,
		onUpdate,
		toggleFieldEdit
	]);
	const handleFieldCancel = useCallback((fieldKey) => {
		setEditedOrganization((prev) => ({
			...prev,
			[fieldKey]: organization?.[fieldKey]
		}));
		toggleFieldEdit(fieldKey);
	}, [organization, toggleFieldEdit]);
	const getOrgInitials = (name) => {
		if (!name) return "ORG";
		return name.split(" ").map((word) => word.charAt(0)).join("").toUpperCase().slice(0, 2);
	};
	const renderField = (field, isEditing, onEditValue, onStartEdit) => {
		if (!field) return null;
		const { key, label, editable: fieldEditable = true } = field;
		const value = key === "attributes" ? organization?.attributes || {} : organization?.[key];
		const renderedValue = field.render ? field.render(value, organization) : value;
		if (isEditing && onEditValue && fieldEditable && editable) {
			const fieldValue = editedOrganization && key && editedOrganization[key] !== void 0 ? editedOrganization[key] : value || "";
			const commonProps = {
				className: cx(styles["fieldInput"]),
				label: void 0,
				onChange: (e) => onEditValue(e.target ? e.target.value : e),
				placeholder: getFieldPlaceholder(key),
				value: typeof fieldValue === "object" ? JSON.stringify(fieldValue) : String(fieldValue || "")
			};
			let fieldInput;
			if (key === "attributes") fieldInput = /* @__PURE__ */ jsx(KeyValueInput_default, {
				value: typeof fieldValue === "object" && fieldValue !== null ? fieldValue : {},
				onChange: (pairs) => {
					onEditValue(pairs.reduce((acc, pair) => {
						acc[pair.key] = pair.value;
						return acc;
					}, {}));
				},
				onAdd: (pair) => {
					if (onUpdate) onUpdate([{
						operation: "ADD",
						path: `/attributes/${pair.key}`,
						value: pair.value
					}]);
				},
				onRemove: (pair) => {
					if (onUpdate) onUpdate([{
						operation: "REMOVE",
						path: `/attributes/${pair.key}`,
						value: ""
					}]);
				},
				label: "",
				keyPlaceholder: "Attribute name",
				valuePlaceholder: "Attribute value",
				helperText: "Add custom attributes as key-value pairs"
			});
			else fieldInput = /* @__PURE__ */ jsx(TextField_default, { ...commonProps });
			return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
				className: cx(styles["label"]),
				children: label
			}), /* @__PURE__ */ jsx("div", {
				className: cx(styles["value"]),
				children: fieldInput
			})] });
		}
		const hasValue = value !== void 0 && value !== null && value !== "";
		const isFieldEditable = editable && fieldEditable;
		let displayValue;
		if (hasValue) displayValue = key === "attributes" && typeof value === "object" && value !== null ? /* @__PURE__ */ jsx(KeyValueInput_default, {
			value,
			readOnly: true,
			label: ""
		}) : String(renderedValue);
		else if (isFieldEditable) displayValue = getFieldPlaceholder(key);
		else displayValue = "-";
		return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
			className: cx(styles["label"]),
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: cx(styles["value"], !hasValue && styles["valueEmpty"]),
			children: !hasValue && isFieldEditable && onStartEdit ? /* @__PURE__ */ jsx(Button_default, {
				onClick: onStartEdit,
				variant: "text",
				color: "secondary",
				size: "small",
				title: "Click to edit",
				className: cx(styles["placeholderButton"]),
				children: displayValue
			}) : displayValue
		})] });
	};
	const renderOrganizationField = (field) => {
		if (!field?.key) return null;
		const hasValue = organization?.[field.key] !== void 0 && organization?.[field.key] !== "" && organization?.[field.key] !== null;
		const isFieldEditing = editingFields[field.key];
		const isFieldEditable = editable && field.editable !== false;
		if (!(hasValue || isFieldEditing || isFieldEditable)) return null;
		return /* @__PURE__ */ jsxs("div", {
			className: cx(styles["field"]),
			children: [/* @__PURE__ */ jsx("div", {
				className: cx(styles["fieldContent"]),
				children: renderField(field, isFieldEditing, (value) => {
					const tempEditedOrganization = { ...editedOrganization };
					tempEditedOrganization[field.key] = value;
					setEditedOrganization(tempEditedOrganization);
				}, () => toggleFieldEdit(field.key))
			}), isFieldEditable && /* @__PURE__ */ jsx("div", {
				className: cx(styles["fieldActions"]),
				children: isFieldEditing ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Button_default, {
					onClick: () => handleFieldSave(field.key),
					color: "primary",
					variant: "solid",
					size: "small",
					title: "Save changes",
					children: saveButtonText
				}), /* @__PURE__ */ jsx(Button_default, {
					onClick: () => handleFieldCancel(field.key),
					color: "secondary",
					variant: "solid",
					size: "small",
					title: "Cancel editing",
					children: cancelButtonText
				})] }) : hasValue && /* @__PURE__ */ jsx(Button_default, {
					onClick: () => toggleFieldEdit(field.key),
					variant: "text",
					color: "secondary",
					size: "small",
					title: "Edit field",
					className: cx(styles["editButton"]),
					children: /* @__PURE__ */ jsx(PencilIcon, {})
				})
			})]
		}, field.key);
	};
	if (!organization) return fallback;
	const profileContent = /* @__PURE__ */ jsxs(Card_default, {
		className: cx(styles["root"], cardLayout && styles["card"], className),
		children: [/* @__PURE__ */ jsxs("div", {
			className: cx(styles["header"]),
			children: [/* @__PURE__ */ jsx(Avatar, {
				name: getOrgInitials(organization.name),
				size: 80,
				alt: `${organization.name} logo`
			}), /* @__PURE__ */ jsxs("div", {
				className: cx(styles["orgInfo"]),
				children: [/* @__PURE__ */ jsx("h2", {
					className: cx(styles["name"]),
					children: organization.name
				}), organization.orgHandle && /* @__PURE__ */ jsxs("p", {
					className: cx(styles["handle"]),
					children: ["@", organization.orgHandle]
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: cx(styles["infoContainer"]),
			children: fields.map((field) => renderOrganizationField(field))
		})]
	});
	if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
			className: cx(styles["popup"]),
			children: profileContent
		})] })
	});
	return profileContent;
};
var BaseOrganizationProfile_default = BaseOrganizationProfile;

//#endregion
//#region src/api/getOrganization.ts
/**
* Retrieves detailed information for a specific organization.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object containing baseUrl, organizationId, and request config.
* @returns A promise that resolves with the organization details.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const organization = await getOrganization({
*     baseUrl: "https://localhost:8090",
*     organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organization:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const organization = await getOrganization({
*     baseUrl: "https://localhost:8090",
*     organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*     fetcher: customFetchFunction
*   });
*   console.log(organization);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get organization:', error.message);
*   }
* }
* ```
*/
const getOrganization$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
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
	return getOrganization({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var getOrganization_default = getOrganization$1;

//#endregion
//#region src/api/updateOrganization.ts
/**
* Updates the organization information using the Organizations Management API.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Configuration object with baseUrl, organizationId, operations and optional request config.
* @returns A promise that resolves with the updated organization information.
* @example
* ```typescript
* // Using the helper function to create operations automatically
* const operations = createPatchOperations({
*   name: "Updated Organization Name",      // Will use REPLACE
*   description: "",                        // Will use REMOVE (empty string)
*   customField: "Some value"              // Will use REPLACE
* });
*
* await updateOrganization({
*   baseUrl: "https://localhost:8090",
*   organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*   operations
* });
*
* // Or manually specify operations
* await updateOrganization({
*   baseUrl: "https://localhost:8090",
*   organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*   operations: [
*     { operation: "REPLACE", path: "/name", value: "Updated Organization Name" },
*     { operation: "REMOVE", path: "/description" }
*   ]
* });
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* await updateOrganization({
*   baseUrl: "https://localhost:8090",
*   organizationId: "0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1",
*   operations: [
*     { operation: "REPLACE", path: "/name", value: "Updated Organization Name" }
*   ],
*   fetcher: customFetchFunction
* });
* ```
*/
const updateOrganization$1 = async ({ fetcher, instanceId = 0,...requestConfig }) => {
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
	return updateOrganization({
		...requestConfig,
		fetcher: fetcher || defaultFetcher
	});
};
var updateOrganization_default = updateOrganization$1;

//#endregion
//#region src/components/presentation/OrganizationProfile/OrganizationProfile.tsx
const logger$1 = createPackageComponentLogger("@thunderid/react", "OrganizationProfile");
/**
* OrganizationProfile component displays organization information in a
* structured and styled format. It automatically fetches organization details
* using the provided organization ID and displays them using BaseOrganizationProfile.
*
* The component supports editing functionality, allowing users to modify organization
* fields inline. Updates are automatically synced with the backend via the SCIM2 API.
*
* This component is the React-specific implementation that automatically
* retrieves the organization data from ThunderID API.
*
* @example
* ```tsx
* // Basic usage with editing enabled (default)
* <OrganizationProfile organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1" />
*
* // Read-only mode
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   editable={false}
* />
*
* // With card layout and custom fallbacks
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   cardLayout={true}
*   loadingFallback={<div>Loading organization...</div>}
*   errorFallback={<div>Failed to load organization</div>}
*   fallback={<div>No organization data available</div>}
* />
*
* // With custom fields configuration and update callback
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   fields={[
*     { key: 'id', label: 'Organization ID', editable: false },
*     { key: 'name', label: 'Organization Name', editable: true },
*     { key: 'description', label: 'Description', editable: true, render: (value) => value || 'No description' },
*     { key: 'created', label: 'Created Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
*     { key: 'lastModified', label: 'Last Modified Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
*     { key: 'attributes', label: 'Custom Attributes', editable: true }
*   ]}
*   onUpdate={async (payload) => {
*     console.log('Organization updated:', payload);
*     // payload contains the updated field values
*     // The component automatically converts these to patch operations
*   }}
* />
*
* // In popup mode
* <OrganizationProfile
*   organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
*   mode="popup"
*   open={isOpen}
*   onOpenChange={setIsOpen}
*   popupTitle="Edit Organization Profile"
* />
* ```
*/
const OrganizationProfile = ({ organizationId, mode = "default", open = false, onOpenChange, onUpdate, popupTitle, loadingFallback, errorFallback, preferences,...rest }) => {
	const { baseUrl, instanceId } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [organization, setOrganization] = useState(null);
	const fetchOrganization = async () => {
		if (!baseUrl || !organizationId) return;
		try {
			setOrganization(await getOrganization_default({
				baseUrl,
				instanceId,
				organizationId
			}));
		} catch (err) {
			logger$1.error("Failed to fetch organization:");
			setOrganization(null);
		}
	};
	useEffect(() => {
		fetchOrganization();
	}, [baseUrl, organizationId]);
	const handleOrganizationUpdate = async (payload) => {
		if (!baseUrl || !organizationId) return;
		try {
			await updateOrganization_default({
				baseUrl,
				instanceId,
				operations: createPatchOperations(payload),
				organizationId
			});
			await fetchOrganization();
			if (onUpdate) await onUpdate(payload);
		} catch (err) {
			logger$1.error("Failed to update organization:");
			throw err;
		}
	};
	return /* @__PURE__ */ jsx(BaseOrganizationProfile_default, {
		organization,
		onUpdate: handleOrganizationUpdate,
		mode: mode === "popup" ? "popup" : "inline",
		open,
		onOpenChange,
		title: popupTitle || t("organization.profile.heading"),
		preferences,
		...rest
	});
};
var OrganizationProfile_default = OrganizationProfile;

//#endregion
//#region src/components/presentation/OrganizationSwitcher/OrganizationSwitcher.tsx
/**
* OrganizationSwitcher component that provides organization switching functionality.
* This component automatically retrieves organizations from the OrganizationContext.
* You can also override the organizations, currentOrganization, and onOrganizationSwitch
* by passing them as props.
*
* @example
* ```tsx
* import { OrganizationSwitcher } from '@thunderid/react';
*
* // Basic usage - uses OrganizationContext
* <OrganizationSwitcher />
*
* // With custom organization switch handler
* <OrganizationSwitcher
*   onOrganizationSwitch={(org) => {
*     console.log('Switching to:', org.name);
*     // Custom logic here
*   }}
* />
*
* // With fallback for unauthenticated users
* <OrganizationSwitcher
*   fallback={<div>Please sign in to view organizations</div>}
* />
* ```
*/
const OrganizationSwitcher = ({ currentOrganization: propCurrentOrganization, fallback = null, onOrganizationSwitch: propOnOrganizationSwitch, organizations: propOrganizations, preferences,...props }) => {
	const { isSignedIn } = useThunderID_default();
	const { currentOrganization: contextCurrentOrganization, myOrganizations: contextOrganizations, switchOrganization, isLoading, error } = useOrganization_default();
	const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isOrganizationListOpen, setIsOrganizationListOpen] = useState(false);
	const { t } = useTranslation_default(preferences?.i18n);
	if (!isSignedIn && fallback) return fallback;
	if (!isSignedIn) return /* @__PURE__ */ jsx(Fragment, {});
	const organizations = propOrganizations || contextOrganizations || [];
	const currentOrganization = propCurrentOrganization || contextCurrentOrganization || void 0;
	const onOrganizationSwitch = propOnOrganizationSwitch || switchOrganization;
	const handleManageOrganizations = () => {
		setIsOrganizationListOpen(true);
	};
	const handleManageOrganization = () => {
		setIsProfileOpen(true);
	};
	const defaultMenuItems = [];
	if (currentOrganization) defaultMenuItems.push({
		icon: /* @__PURE__ */ jsx(BuildingAlt_default, {}),
		label: t("organization.switcher.manage.organizations"),
		onClick: handleManageOrganizations
	});
	defaultMenuItems.push({
		icon: /* @__PURE__ */ jsx("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: /* @__PURE__ */ jsx("path", { d: "M12 5v14m-7-7h14" })
		}),
		label: t("organization.switcher.create.organization"),
		onClick: () => setIsCreateOrgOpen(true)
	});
	const menuItems = props.menuItems ? [...defaultMenuItems, ...props.menuItems] : defaultMenuItems;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(BaseOrganizationSwitcher, {
			organizations,
			currentOrganization,
			onOrganizationSwitch,
			loading: isLoading,
			error: error ?? void 0,
			menuItems,
			onManageProfile: handleManageOrganization,
			preferences,
			...props
		}),
		/* @__PURE__ */ jsx(CreateOrganization, {
			mode: "popup",
			open: isCreateOrgOpen,
			onOpenChange: setIsCreateOrgOpen,
			onSuccess: (org) => {
				if (org && onOrganizationSwitch) onOrganizationSwitch(org);
				setIsCreateOrgOpen(false);
			}
		}),
		currentOrganization && /* @__PURE__ */ jsx(OrganizationProfile_default, {
			organizationId: currentOrganization.id,
			mode: "popup",
			open: isProfileOpen,
			onOpenChange: setIsProfileOpen,
			cardLayout: true,
			loadingFallback: /* @__PURE__ */ jsx("div", { children: t("organization.profile.loading") }),
			errorFallback: /* @__PURE__ */ jsx("div", { children: t("organization.profile.error") })
		}),
		/* @__PURE__ */ jsx(OrganizationList_default, {
			mode: "popup",
			open: isOrganizationListOpen,
			onOpenChange: setIsOrganizationListOpen,
			title: t("organization.switcher.manage.organizations"),
			onOrganizationSelect: (organization) => {
				if (onOrganizationSwitch) onOrganizationSwitch(organization);
				setIsOrganizationListOpen(false);
			}
		})
	] });
};
var OrganizationSwitcher_default = OrganizationSwitcher;

//#endregion
//#region src/components/presentation/LanguageSwitcher/BaseLanguageSwitcher.styles.ts
const useStyles = (theme, colorScheme) => useMemo(() => {
	const root = css`
      display: inline-block;
      position: relative;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const trigger = css`
      display: inline-flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 0.5);
      padding: calc(${theme.vars.spacing.unit} * 0.75) ${theme.vars.spacing.unit};
      border: 1px solid ${theme.vars.colors.border};
      background: ${theme.vars.colors.background.surface};
      cursor: pointer;
      border-radius: ${theme.vars.borderRadius.medium};
      min-width: 120px;
      font-size: 0.875rem;
      color: ${theme.vars.colors.text.primary};

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.04)"};
      }
    `;
	const triggerEmoji = css`
      font-size: 1rem;
      line-height: 1;
    `;
	const triggerLabel = css`
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    `;
	const content = css`
      min-width: 200px;
      max-width: 320px;
      background-color: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.medium};
      box-shadow: ${theme.vars.shadows.medium};
      border: 1px solid ${theme.vars.colors.border};
      outline: none;
      z-index: 1000;
      padding: calc(${theme.vars.spacing.unit} * 0.5) 0;
    `;
	const option = css`
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 1) calc(${theme.vars.spacing.unit} * 1.5);
      width: 100%;
      border: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 0.875rem;
      text-align: start;
      color: ${theme.vars.colors.text.primary};
      transition: background-color 0.15s ease-in-out;

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.04)"};
      }
    `;
	const optionActive = css`
      font-weight: 600;
      color: ${theme.vars.colors.primary?.main || theme.vars.colors.text.primary};
    `;
	const optionEmoji = css`
      font-size: 1rem;
      line-height: 1;
      flex-shrink: 0;
    `;
	const optionLabel = css`
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	return {
		checkIcon: css`
      color: ${theme.vars.colors.primary?.main || theme.vars.colors.text.primary};
      flex-shrink: 0;
      margin-inline-start: auto;
    `,
		content,
		option,
		optionActive,
		optionEmoji,
		optionLabel,
		root,
		trigger,
		triggerEmoji,
		triggerLabel
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.border,
	theme.vars.borderRadius.medium,
	theme.vars.shadows.medium,
	theme.vars.spacing.unit,
	theme.vars.colors.action?.hover,
	theme.vars.typography.fontFamily,
	theme.vars.colors.primary?.main,
	colorScheme
]);
var BaseLanguageSwitcher_styles_default = useStyles;

//#endregion
//#region src/components/presentation/LanguageSwitcher/BaseLanguageSwitcher.tsx
/**
* Pure-UI language switcher dropdown.
* Accepts resolved `LanguageOption[]` (code + displayName + emoji) and delegates
* language switching to the `onLanguageChange` callback.
*
* Supports render props for full UI customisation.
*/
const BaseLanguageSwitcher = ({ children, className, currentLanguage, isLoading = false, languages, onLanguageChange }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseLanguageSwitcher_styles_default(theme, colorScheme);
	const [isOpen, setIsOpen] = useState(false);
	const hasMultipleLanguages = languages.length > 1;
	useEffect(() => {
		if (!hasMultipleLanguages && isOpen) setIsOpen(false);
	}, [hasMultipleLanguages, isOpen]);
	const { refs, floatingStyles, context } = useFloating({
		middleware: [
			offset(4),
			flip(),
			shift()
		],
		onOpenChange: setIsOpen,
		open: isOpen,
		whileElementsMounted: autoUpdate
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useClick(context, { enabled: hasMultipleLanguages }),
		useDismiss(context, { enabled: hasMultipleLanguages }),
		useRole(context, {
			enabled: hasMultipleLanguages,
			role: "listbox"
		})
	]);
	const currentOption = languages.find((l) => l.code === currentLanguage);
	if (children) return /* @__PURE__ */ jsx(Fragment, { children: children({
		currentLanguage,
		isLoading,
		languages,
		onLanguageChange
	}) });
	return /* @__PURE__ */ jsxs("div", {
		className: cx(styles["root"], className),
		children: [/* @__PURE__ */ jsxs("button", {
			ref: refs.setReference,
			type: "button",
			disabled: isLoading,
			"aria-label": "Switch language",
			...getReferenceProps(),
			className: styles["trigger"],
			children: [
				currentOption && /* @__PURE__ */ jsx("span", {
					className: styles["triggerEmoji"],
					children: currentOption.emoji
				}),
				/* @__PURE__ */ jsx("span", {
					className: styles["triggerLabel"],
					children: currentOption?.displayName ?? currentLanguage
				}),
				hasMultipleLanguages && /* @__PURE__ */ jsx(ChevronDown_default, {})
			]
		}), isOpen && hasMultipleLanguages && /* @__PURE__ */ jsx(FloatingPortal, { children: /* @__PURE__ */ jsx(FloatingFocusManager, {
			context,
			modal: false,
			children: /* @__PURE__ */ jsx("div", {
				ref: refs.setFloating,
				style: floatingStyles,
				...getFloatingProps(),
				className: styles["content"],
				role: "listbox",
				"aria-label": "Select language",
				children: languages.map((lang) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					role: "option",
					"aria-selected": lang.code === currentLanguage,
					className: cx(styles["option"], lang.code === currentLanguage && styles["optionActive"]),
					onClick: () => {
						onLanguageChange(lang.code);
						setIsOpen(false);
					},
					children: [
						/* @__PURE__ */ jsx("span", {
							className: styles["optionEmoji"],
							children: lang.emoji
						}),
						/* @__PURE__ */ jsx("span", {
							className: styles["optionLabel"],
							children: lang.displayName
						}),
						lang.code === currentLanguage && /* @__PURE__ */ jsx("span", {
							className: styles["checkIcon"],
							children: /* @__PURE__ */ jsx(Check_default, {})
						})
					]
				}, lang.code))
			})
		}) })]
	});
};
var BaseLanguageSwitcher_default = BaseLanguageSwitcher;

//#endregion
//#region src/contexts/FlowMeta/useFlowMeta.ts
const useFlowMeta = () => {
	const context = useContext(FlowMetaContext_default);
	if (!context) throw new Error("useFlowMeta must be used within a FlowMetaProvider");
	return context;
};
var useFlowMeta_default = useFlowMeta;

//#endregion
//#region src/components/presentation/LanguageSwitcher/LanguageSwitcher.tsx
/**
* A v2 LanguageSwitcher component that reads available languages from `FlowMetaContext`
* and switches both the UI language (via `I18nContext`) and the flow metadata translations
* (by re-fetching `GET /flow/meta` with the new language).
*
* Must be rendered inside a `FlowMetaProvider`.
*
* @example
* ```tsx
* // Default dropdown UI
* <LanguageSwitcher />
*
* // Custom UI with render props
* <LanguageSwitcher>
*   {({languages, currentLanguage, onLanguageChange}) => (
*     <div>
*       {languages.map(lang => (
*         <button
*           key={lang.code}
*           onClick={() => onLanguageChange(lang.code)}
*           style={{fontWeight: lang.code === currentLanguage ? 'bold' : 'normal'}}
*         >
*           {lang.emoji} {lang.displayName}
*         </button>
*       ))}
*     </div>
*   )}
* </LanguageSwitcher>
* ```
*/
const LanguageSwitcher = ({ children, className }) => {
	const { meta, switchLanguage, isLoading } = useFlowMeta_default();
	const { currentLanguage } = useTranslation_default();
	const availableLanguageCodes = meta?.i18n?.languages ?? [];
	const effectiveLanguageCodes = useMemo(() => availableLanguageCodes.length > 0 ? availableLanguageCodes : [currentLanguage], [availableLanguageCodes, currentLanguage]);
	const languages = useMemo(() => effectiveLanguageCodes.map((code) => ({
		code,
		displayName: resolveLocaleDisplayName$1(code, code) || code,
		emoji: resolveLocaleEmoji$1(code)
	})), [effectiveLanguageCodes]);
	useEffect(() => {
		if (availableLanguageCodes.length > 0 && !availableLanguageCodes.includes(currentLanguage)) switchLanguage(availableLanguageCodes[0]);
	}, [
		availableLanguageCodes,
		currentLanguage,
		switchLanguage
	]);
	const handleLanguageChange = (language) => {
		if (language !== currentLanguage) switchLanguage(language);
	};
	return /* @__PURE__ */ jsx(BaseLanguageSwitcher_default, {
		currentLanguage,
		isLoading,
		languages,
		onLanguageChange: handleLanguageChange,
		className,
		children
	});
};
var LanguageSwitcher_default = LanguageSwitcher;

//#endregion
//#region src/api/getSchemas.ts
/**
* Retrieves the SCIM2 schemas from the specified endpoint.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param config - Request configuration object.
* @returns A promise that resolves with the SCIM2 schemas information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const schemas = await getSchemas({
*     url: "https://localhost:8090/scim2/Schemas",
*   });
*   console.log(schemas);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get schemas:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const schemas = await getSchemas({
*     url: "https://localhost:8090/scim2/Schemas",
*     fetcher: customFetchFunction
*   });
*   console.log(schemas);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get schemas:', error.message);
*   }
* }
* ```
*/
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
/**
* Retrieves the user profile information from the specified SCIM2 /Me endpoint.
* This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
*
* @param requestConfig - Request configuration object.
* @returns A promise that resolves with the user profile information.
* @example
* ```typescript
* // Using default ThunderID SPA client httpClient
* try {
*   const userProfile = await getScim2Me({
*     url: "https://localhost:8090/scim2/Me",
*   });
*   console.log(userProfile);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get user profile:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Using custom fetcher
* try {
*   const userProfile = await getScim2Me({
*     url: "https://localhost:8090/scim2/Me",
*     fetcher: customFetchFunction
*   });
*   console.log(userProfile);
* } catch (error) {
*   if (error instanceof ThunderIDAPIError) {
*     console.error('Failed to get user profile:', error.message);
*   }
* }
* ```
*/
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
export { AcceptInvite_default as AcceptInvite, Alert_default as Alert, BaseAcceptInvite_default as BaseAcceptInvite, BaseCreateOrganization, BaseInviteUser_default as BaseInviteUser, BaseLanguageSwitcher_default as BaseLanguageSwitcher, BaseOrganization_default as BaseOrganization, BaseOrganizationList_default as BaseOrganizationList, BaseOrganizationProfile_default as BaseOrganizationProfile, BaseOrganizationSwitcher_default as BaseOrganizationSwitcher, BaseRecovery_default as BaseRecovery, BaseSignIn_default as BaseSignIn, BaseSignInButton_default as BaseSignInButton, BaseSignOutButton_default as BaseSignOutButton, BaseSignUp_default as BaseSignUp, BaseSignUpButton_default as BaseSignUpButton, BaseUser_default as BaseUser, BaseUserDropdown_default as BaseUserDropdown, BaseUserProfile_default as BaseUserProfile, BrandingContext_default as BrandingContext, BrandingProvider_default as BrandingProvider, BuildingAlt_default as BuildingAlt, Button_default as Button, Callback, Card_default as Card, Checkbox_default as Checkbox, CircleAlert_default as CircleAlert, CircleCheck_default as CircleCheck, Consent_default as Consent, ConsentCheckboxList_default as ConsentCheckboxList, CreateOrganization, DatePicker_default as DatePicker, Divider_default as Divider, EMOJI_URI_SCHEME, EmailOtp_default as EmailOtp, EmbeddedFlowActionVariant, EmbeddedFlowComponentType, EmbeddedFlowEventType, EmbeddedFlowTextVariant, EmbeddedRecoveryFlowStatus, EmbeddedRecoveryFlowType, EmbeddedSignInFlowStatus, EmbeddedSignInFlowType, Eye_default as Eye, EyeOff_default as EyeOff, FacebookButton_default as FacebookButton, FieldFactory, FlowContext_default as FlowContext, FlowMetaProvider_default as FlowMetaProvider, FlowProvider_default as FlowProvider, FlowTimer_default as FlowTimer, FormControl_default as FormControl, GitHubButton_default as GitHubButton, GoogleButton_default as GoogleButton, I18nContext_default as I18nContext, I18nProvider_default as I18nProvider, IdentifierFirst_default as IdentifierFirst, Info_default as Info, InputLabel_default as InputLabel, InviteUser_default as InviteUser, KeyValueInput_default as KeyValueInput, LanguageSwitcher_default as LanguageSwitcher, LinkedInButton_default as LinkedInButton, Loading_default as Loading, LogOut_default as LogOut, Logo_default as Logo, MicrosoftButton_default as MicrosoftButton, MultiInput_default as MultiInput, MultiOptionButton_default as MultiOptionButton, Organization_default as Organization, OrganizationContext_default as OrganizationContext, OrganizationList_default as OrganizationList, OrganizationProfile_default as OrganizationProfile, OrganizationProvider_default as OrganizationProvider, OrganizationSwitcher_default as OrganizationSwitcher, OrganizationUnitPicker_default as OrganizationUnitPicker, OtpField_default as OtpField, PasswordField_default as PasswordField, Recovery_default as Recovery, Select_default as Select, SignIn_default as SignIn, SignInButton_default as SignInButton, SignInWithEthereumButton_default as SignInWithEthereumButton, SignOutButton_default as SignOutButton, SignUp_default as SignUp, SignUpButton_default as SignUpButton, SignedIn_default as SignedIn, SignedOut_default as SignedOut, SmsOtp_default as SmsOtp, SocialButton_default as SocialButton, Spinner_default as Spinner, TextField_default as TextField, ThemeContext_default as ThemeContext, ThemeProvider_default as ThemeProvider, ThunderIDContext_default as ThunderIDContext, ThunderIDProvider_default as ThunderIDProvider, ThunderIDRuntimeError, Toggle_default as Toggle, Totp_default as Totp, TriangleAlert_default as TriangleAlert, Typography_default as Typography, User_default as User, UserContext_default as UserContext, UserDropdown_default as UserDropdown, User_default$1 as UserIcon, UserProfile_default as UserProfile, UserProvider_default as UserProvider, UsernamePassword_default as UsernamePassword, countryCodeToFlagEmoji, createField, createOrganization_default as createOrganization, createPatchOperations, createSignInOption, createSignInOptionFromAuthenticator, extractEmojiFromUri, getActiveTheme, getAllOrganizations_default as getAllOrganizations, getConsentOptionalKey, getMeOrganizations_default as getMeOrganizations, getScim2Me_default as getMeProfile, getOrganization_default as getOrganization, getSchemas_default as getSchemas, http, isEmojiUri, navigate, resolveEmojiUrisInHtml, resolveFlowTemplateLiterals, resolveLocaleDisplayName, resolveLocaleEmoji, resolveMeta, updateMeProfile_default as updateMeProfile, updateOrganization_default as updateOrganization, useBranding_default as useBranding, useBrandingContext_default as useBrandingContext, useBrowserUrl_default as useBrowserUrl, useFlow_default as useFlow, useForm_default as useForm, useI18n_default as useI18n, useOrganization_default as useOrganization, useTheme_default as useTheme, useThunderID_default as useThunderID, useTranslation_default as useTranslation, useUser_default as useUser, validateFieldValue };
//# sourceMappingURL=index.js.map