import ThunderIDContext_default from "./ThunderIDContext.js";
import useBrowserUrl_default from "../../hooks/useBrowserUrl.js";
import ThunderIDReactClient_default from "../../ThunderIDReactClient.js";
import BrandingProvider_default from "../Branding/BrandingProvider.js";
import ComponentRendererProvider_default from "../ComponentRenderer/ComponentRendererProvider.js";
import FlowProvider_default from "../Flow/FlowProvider.js";
import FlowMetaProvider_default from "../FlowMeta/FlowMetaProvider.js";
import I18nProvider_default from "../I18n/I18nProvider.js";
import OrganizationProvider_default from "../Organization/OrganizationProvider.js";
import ThemeProvider_default from "../Theme/ThemeProvider.js";
import UserProvider_default from "../User/UserProvider.js";
import { Platform, ThunderIDRuntimeError, createPackageComponentLogger, extractUserClaimsFromIdToken, generateFlattenedUserProfile, getActiveTheme, getBrandingPreference } from "@thunderid/browser";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/ThunderID/ThunderIDProvider.tsx
const logger$1 = createPackageComponentLogger("@thunderid/react", "ThunderIDProvider");
const ThunderIDProvider = ({ afterSignInUrl, afterSignOutUrl, baseUrl: initialBaseUrl, clientId, children, extensions, scopes, preferences, signInUrl, signUpUrl, organizationHandle, applicationId, signInOptions, tokenRequest, syncSession, instanceId = 0, organizationChain,...rest }) => {
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
		tokenRequest,
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
			throw new ThunderIDRuntimeError(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signIn-Error", "react", "An error occurred while trying to sign in.");
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
					logger$1.warn("Failed to schedule automatic token refresh.", error);
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
				throw new ThunderIDRuntimeError(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signIn-Error", "react", "An error occurred while trying to sign in.");
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
			throw new ThunderIDRuntimeError(`Error while signing in silently: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-signInSilently-Error", "react", "An error occurred while trying to sign in silently.");
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
			throw new ThunderIDRuntimeError(`Failed to switch organization: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "thunderid-switchOrganization-Error", "react", "An error occurred while switching to the specified organization.");
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
		platform: Platform.ThunderID,
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
						mode: getActiveTheme(preferences?.theme?.mode ?? "light"),
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
export { ThunderIDProvider_default as default };
//# sourceMappingURL=ThunderIDProvider.js.map