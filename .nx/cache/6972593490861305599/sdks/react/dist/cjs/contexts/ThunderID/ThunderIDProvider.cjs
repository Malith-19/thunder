const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_ThunderIDContext = require('./ThunderIDContext.cjs');
const require_useBrowserUrl = require('../../hooks/useBrowserUrl.cjs');
const require_ThunderIDReactClient = require('../../ThunderIDReactClient.cjs');
const require_BrandingProvider = require('../Branding/BrandingProvider.cjs');
const require_ComponentRendererProvider = require('../ComponentRenderer/ComponentRendererProvider.cjs');
const require_FlowProvider = require('../Flow/FlowProvider.cjs');
const require_FlowMetaProvider = require('../FlowMeta/FlowMetaProvider.cjs');
const require_I18nProvider = require('../I18n/I18nProvider.cjs');
const require_OrganizationProvider = require('../Organization/OrganizationProvider.cjs');
const require_ThemeProvider = require('../Theme/ThemeProvider.cjs');
const require_UserProvider = require('../User/UserProvider.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/contexts/ThunderID/ThunderIDProvider.tsx
const logger = (0, __thunderid_browser.createPackageComponentLogger)("@thunderid/react", "ThunderIDProvider");
const ThunderIDProvider = ({ afterSignInUrl, afterSignOutUrl, baseUrl: initialBaseUrl, clientId, children, extensions, scopes, preferences, signInUrl, signUpUrl, organizationHandle, applicationId, signInOptions, tokenRequest, syncSession, instanceId = 0, organizationChain,...rest }) => {
	const reRenderCheckRef = (0, react.useRef)(false);
	const client = (0, react.useMemo)(() => new require_ThunderIDReactClient.default(instanceId), [instanceId]);
	const storageManagerRef = (0, react.useRef)(null);
	const { hasAuthParams, hasCalledForThisInstance } = require_useBrowserUrl.default();
	const [user, setUser] = (0, react.useState)(null);
	const [currentOrganization, setCurrentOrganization] = (0, react.useState)(null);
	const [isSignedInSync, setIsSignedInSync] = (0, react.useState)(false);
	const [isInitializedSync, setIsInitializedSync] = (0, react.useState)(false);
	const [isLoadingSync, setIsLoadingSync] = (0, react.useState)(true);
	const [myOrganizations, setMyOrganizations] = (0, react.useState)([]);
	const [userProfile, setUserProfile] = (0, react.useState)(null);
	const [baseUrl, setBaseUrl] = (0, react.useState)(initialBaseUrl ?? "");
	const [config, setConfig] = (0, react.useState)({
		afterSignInUrl: afterSignInUrl ?? window.location.origin,
		afterSignOutUrl: afterSignOutUrl ?? window.location.origin,
		applicationId,
		baseUrl,
		clientId,
		organizationChain,
		organizationHandle,
		scopes,
		signInOptions,
		tokenRequest,
		signInUrl,
		signUpUrl,
		syncSession,
		...rest
	});
	const [isUpdatingSession, setIsUpdatingSession] = (0, react.useState)(false);
	const [wellKnown, setWellKnown] = (0, react.useState)(null);
	const [brandingPreference, setBrandingPreference] = (0, react.useState)(null);
	const [isBrandingLoading, setIsBrandingLoading] = (0, react.useState)(false);
	const [brandingError, setBrandingError] = (0, react.useState)(null);
	const [hasFetchedBranding, setHasFetchedBranding] = (0, react.useState)(false);
	(0, react.useEffect)(() => {
		setBaseUrl(initialBaseUrl ?? "");
		if (initialBaseUrl !== baseUrl) {
			setHasFetchedBranding(false);
			setBrandingPreference(null);
			setBrandingError(null);
		}
	}, [initialBaseUrl, baseUrl]);
	(0, react.useEffect)(() => {
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
			const claims = (0, __thunderid_browser.extractUserClaimsFromIdToken)(decodedToken);
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
			throw new __thunderid_browser.ThunderIDRuntimeError(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signIn-Error", "react", "An error occurred while trying to sign in.");
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
	(0, react.useEffect)(() => {
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
					logger.warn("Failed to schedule automatic token refresh.", error);
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
				throw new __thunderid_browser.ThunderIDRuntimeError(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signIn-Error", "react", "An error occurred while trying to sign in.");
			}
		})();
	}, []);
	/**
	* Check if the user is signed in and update the state accordingly.
	* This will also set an interval to check for the sign-in status every second
	* until the user is signed in.
	*/
	(0, react.useEffect)(() => {
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
	(0, react.useEffect)(() => {
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
	(0, react.useEffect)(() => {
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
	const fetchBranding = (0, react.useCallback)(async () => {
		if (!baseUrl) return;
		if (isBrandingLoading) return;
		setIsBrandingLoading(true);
		setBrandingError(null);
		try {
			setBrandingPreference(await (0, __thunderid_browser.getBrandingPreference)({
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
	const refetchBranding = (0, react.useCallback)(async () => {
		setHasFetchedBranding(false);
		await fetchBranding();
	}, [fetchBranding]);
	(0, react.useEffect)(() => {}, [
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
			throw new __thunderid_browser.ThunderIDRuntimeError(`Error while signing in silently: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signInSilently-Error", "react", "An error occurred while trying to sign in silently.");
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
			throw new __thunderid_browser.ThunderIDRuntimeError(`Failed to switch organization: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-switchOrganization-Error", "react", "An error occurred while switching to the specified organization.");
		} finally {
			setIsUpdatingSession(false);
			setIsLoadingSync(client.isLoading());
		}
	};
	const handleProfileUpdate = (payload) => {
		setUser(payload);
		setUserProfile((prev) => ({
			schemas: prev?.schemas ?? [],
			flattenedProfile: (0, __thunderid_browser.generateFlattenedUserProfile)(payload, prev?.schemas ?? []),
			profile: payload
		}));
	};
	const getDecodedIdToken = (0, react.useCallback)(async () => client.getDecodedIdToken(), [client]);
	const getIdToken = (0, react.useCallback)(async () => client.getIdToken(), [client]);
	const getAccessToken = (0, react.useCallback)(async () => client.getAccessToken(), [client]);
	const getStorageManager = (0, react.useCallback)(async () => {
		const storageManager = storageManagerRef.current ?? await client.getStorageManager();
		if (storageManager) storageManagerRef.current = storageManager;
		return storageManager;
	}, [client]);
	const request = (0, react.useCallback)(async (...args) => client.request(...args), [client]);
	const requestAll = (0, react.useCallback)(async (...args) => client.requestAll(...args), [client]);
	const exchangeToken = (0, react.useCallback)(async (exchangeConfig) => client.exchangeToken(exchangeConfig), [client]);
	const signOut = (0, react.useCallback)(async (...args) => client.signOut(...args), [client]);
	const recover = (0, react.useCallback)(async (payload) => client.recover(payload), [client]);
	const signUp = (0, react.useCallback)(async (...args) => client.signUp(...args), [client]);
	const clearSession = (0, react.useCallback)(async (...args) => client.clearSession(...args), [client]);
	const reInitialize = (0, react.useCallback)(async (reInitConfig) => client.reInitialize(reInitConfig), [client]);
	const value = (0, react.useMemo)(() => ({
		afterSignInUrl: config.afterSignInUrl,
		applicationId: config.applicationId,
		baseUrl,
		scopes: config.scopes,
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
		platform: __thunderid_browser.Platform.ThunderID,
		reInitialize,
		recover,
		signIn,
		signInOptions,
		tokenRequest,
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
		config.scopes,
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
		tokenRequest,
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ThunderIDContext.default.Provider, {
		value,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_I18nProvider.default, {
			preferences: preferences?.i18n,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FlowMetaProvider.default, {
				enabled: preferences?.resolveFromMeta !== false,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BrandingProvider.default, {
					brandingPreference,
					isLoading: isBrandingLoading,
					error: brandingError,
					enabled: preferences?.theme?.inheritFromBranding === true,
					refetch: refetchBranding,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ThemeProvider.default, {
						inheritFromBranding: preferences?.theme?.inheritFromBranding,
						theme: {
							...preferences?.theme?.overrides,
							direction: preferences?.theme?.direction
						},
						mode: (0, __thunderid_browser.getActiveTheme)(preferences?.theme?.mode ?? "light"),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FlowProvider.default, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_UserProvider.default, {
							profile: userProfile,
							onUpdateProfile: handleProfileUpdate,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationProvider.default, {
								getAllOrganizations: async () => client.getAllOrganizations(),
								myOrganizations,
								currentOrganization,
								onOrganizationSwitch: switchOrganization,
								revalidateMyOrganizations: async () => client.getMyOrganizations(),
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ComponentRendererProvider.default, {
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
exports.default = ThunderIDProvider_default;
//# sourceMappingURL=ThunderIDProvider.cjs.map