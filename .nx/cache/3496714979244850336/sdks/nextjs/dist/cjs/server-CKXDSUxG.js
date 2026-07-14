const require_dynamic_rendering$1 = require('./dynamic-rendering-BCAIDVkI.js');
const require_SessionManager = require('./SessionManager-A3v2mgBb.js');
const require_getSessionId = require('./getSessionId-D8QW3GFP.js');
const require_segment$1 = require('./segment-DgYqRzOA.js');
let __thunderid_node = require("@thunderid/node");
__thunderid_node = require_dynamic_rendering$1.__toESM(__thunderid_node);
let react = require("react");
react = require_dynamic_rendering$1.__toESM(react);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_dynamic_rendering$1.__toESM(__thunderid_react);

//#region src/server/actions/getClientOrigin.ts
var import_headers$7 = /* @__PURE__ */ require_dynamic_rendering$1.__toESM(require_SessionManager.require_headers(), 1);
const getClientOrigin = async () => {
	const headersList = await (0, import_headers$7.headers)();
	const host = headersList.get("host");
	return `${headersList.get("x-forwarded-proto") ?? "http"}://${host}`;
};
var getClientOrigin_default = getClientOrigin;

//#endregion
//#region src/utils/decorateConfigWithNextEnv.ts
const decorateConfigWithNextEnv = (config) => {
	const { organizationHandle, scopes, applicationId, baseUrl, clientId, clientSecret, signInUrl, signUpUrl, afterSignInUrl, afterSignOutUrl,...rest } = config;
	const envExpiryTime = process.env["THUNDERID_SESSION_COOKIE_EXPIRY_TIME"] ? parseInt(process.env["THUNDERID_SESSION_COOKIE_EXPIRY_TIME"], 10) : void 0;
	return {
		...rest,
		afterSignInUrl: afterSignInUrl || process.env["NEXT_PUBLIC_THUNDERID_AFTER_SIGN_IN_URL"],
		afterSignOutUrl: afterSignOutUrl || process.env["NEXT_PUBLIC_THUNDERID_AFTER_SIGN_OUT_URL"],
		applicationId: applicationId || process.env["NEXT_PUBLIC_THUNDERID_APPLICATION_ID"],
		baseUrl: baseUrl || process.env["NEXT_PUBLIC_THUNDERID_BASE_URL"],
		clientId: clientId || process.env["NEXT_PUBLIC_THUNDERID_CLIENT_ID"],
		clientSecret: clientSecret || process.env["THUNDERID_CLIENT_SECRET"],
		organizationHandle: organizationHandle || process.env["NEXT_PUBLIC_THUNDERID_ORGANIZATION_HANDLE"],
		scopes: scopes || process.env["NEXT_PUBLIC_THUNDERID_SCOPES"],
		sessionCookie: {
			...rest.sessionCookie,
			expiryTime: rest.sessionCookie?.expiryTime || envExpiryTime
		},
		signInUrl: signInUrl || process.env["NEXT_PUBLIC_THUNDERID_SIGN_IN_URL"],
		signUpUrl: signUpUrl || process.env["NEXT_PUBLIC_THUNDERID_SIGN_UP_URL"]
	};
};
var decorateConfigWithNextEnv_default = decorateConfigWithNextEnv;

//#endregion
//#region src/ThunderIDNextClient.ts
var ThunderIDNextClient = class extends __thunderid_node.ThunderIDNodeClient {
	isInitialized = false;
	constructor() {
		super();
	}
	async ensureInitialized() {
		if (!this.isInitialized) throw new Error("[ThunderIDNextClient] Client is not initialized. Make sure you have wrapped your app with ThunderIDProvider and provided the required configuration (baseUrl, clientId, etc.).");
	}
	async initialize(config, storage) {
		if (this.isInitialized) return Promise.resolve(true);
		const { baseUrl, organizationHandle, clientId, clientSecret, signInUrl, afterSignInUrl, afterSignOutUrl, signUpUrl,...rest } = decorateConfigWithNextEnv_default(config);
		let resolvedOrganizationHandle = organizationHandle;
		if (!resolvedOrganizationHandle) resolvedOrganizationHandle = (0, __thunderid_node.deriveOrganizationHandleFromBaseUrl)(baseUrl);
		const origin = await getClientOrigin_default();
		const initialized = await super.initialize({
			...rest,
			afterSignInUrl: afterSignInUrl ?? origin,
			afterSignOutUrl: afterSignOutUrl ?? origin,
			baseUrl,
			clientId,
			clientSecret,
			enablePKCE: clientSecret == null,
			organizationHandle: resolvedOrganizationHandle,
			signInUrl,
			signUpUrl
		}, storage);
		this.isInitialized = initialized;
		return initialized;
	}
	async reInitialize(config) {
		try {
			await super.reInitialize(config);
			return true;
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Failed to re-initialize the client: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDNextClient-reInitialize-RuntimeError-001", "nextjs", "An error occurred while re-initializing the client. Please check your configuration and network connection.");
		}
	}
	async getUser(userId) {
		await this.ensureInitialized();
		const resolvedSessionId = userId || await require_getSessionId.getSessionId_default();
		try {
			const baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return (0, __thunderid_node.generateUserProfile)(await (0, __thunderid_node.getScim2Me)({
				baseUrl,
				headers: { Authorization: `Bearer ${await this.getAccessToken(userId)}` }
			}), (0, __thunderid_node.flattenUserSchema)(await (0, __thunderid_node.getSchemas)({
				baseUrl,
				headers: { Authorization: `Bearer ${await this.getAccessToken(userId)}` }
			})));
		} catch (error) {
			return await super.getUser(resolvedSessionId);
		}
	}
	async getUserProfile(userId) {
		await this.ensureInitialized();
		try {
			const baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			const profile = await (0, __thunderid_node.getScim2Me)({
				baseUrl,
				headers: { Authorization: `Bearer ${await this.getAccessToken(userId)}` }
			});
			const processedSchemas = (0, __thunderid_node.flattenUserSchema)(await (0, __thunderid_node.getSchemas)({
				baseUrl,
				headers: { Authorization: `Bearer ${await this.getAccessToken(userId)}` }
			}));
			return {
				flattenedProfile: (0, __thunderid_node.generateFlattenedUserProfile)(profile, processedSchemas),
				profile,
				schemas: processedSchemas
			};
		} catch (error) {
			return {
				flattenedProfile: (0, __thunderid_node.extractUserClaimsFromIdToken)(await super.getDecodedIdToken(userId)),
				profile: (0, __thunderid_node.extractUserClaimsFromIdToken)(await super.getDecodedIdToken(userId)),
				schemas: []
			};
		}
	}
	async updateUserProfile(payload, userId) {
		await this.ensureInitialized();
		try {
			const baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return (0, __thunderid_node.updateMeProfile)({
				baseUrl,
				headers: { Authorization: `Bearer ${await this.getAccessToken(userId)}` },
				payload
			});
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Failed to update user profile: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDNextClient-UpdateProfileError-001", "react", "An error occurred while updating the user profile. Please check your configuration and network connection.");
		}
	}
	async createOrganization(payload, userId) {
		try {
			const baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return (0, __thunderid_node.createOrganization)({
				baseUrl,
				headers: { Authorization: `Bearer ${await this.getAccessToken(userId)}` },
				payload
			});
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Failed to create organization: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDReactClient-createOrganization-RuntimeError-001", "nextjs", "An error occurred while creating the organization. Please check your configuration and network connection.");
		}
	}
	async getOrganization(organizationId, userId) {
		try {
			const baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return (0, __thunderid_node.getOrganization)({
				baseUrl,
				headers: { Authorization: `Bearer ${await this.getAccessToken(userId)}` },
				organizationId
			});
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Failed to fetch the organization details of ${organizationId}: ${String(error)}`, "ThunderIDReactClient-getOrganization-RuntimeError-001", "nextjs", `An error occurred while fetching the organization with the id: ${organizationId}.`);
		}
	}
	async getMyOrganizations(options, userId) {
		try {
			const baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return (0, __thunderid_node.getMeOrganizations)({
				baseUrl,
				headers: { Authorization: `Bearer ${await this.getAccessToken(userId)}` }
			});
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Failed to fetch the user's associated organizations: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDNextClient-getMyOrganizations-RuntimeError-001", "nextjs", "An error occurred while fetching associated organizations of the signed-in user.");
		}
	}
	async getAllOrganizations(options, userId) {
		try {
			const baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return (0, __thunderid_node.getAllOrganizations)({
				baseUrl,
				headers: { Authorization: `Bearer ${await this.getAccessToken(userId)}` }
			});
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Failed to fetch all organizations: ${error instanceof Error ? error.message : String(error)}`, "ThunderIDNextClient-getAllOrganizations-RuntimeError-001", "nextjs", "An error occurred while fetching all the organizations associated with the user.");
		}
	}
	async getCurrentOrganization(userId) {
		const idToken = await super.getDecodedIdToken(userId);
		return {
			id: idToken?.org_id,
			name: idToken?.org_name,
			orgHandle: idToken?.org_handle
		};
	}
	async switchOrganization(organization, userId) {
		try {
			if (!organization.id) throw new __thunderid_node.ThunderIDRuntimeError("Organization ID is required for switching organizations", "ThunderIDNextClient-switchOrganization-ValidationError-001", "nextjs", "The organization object must contain a valid ID to perform the organization switch.");
			const exchangeConfig = {
				attachToken: false,
				data: {
					client_id: "{{clientId}}",
					client_secret: "{{clientSecret}}",
					grant_type: "organization_switch",
					scope: "{{scopes}}",
					switching_organization: organization.id,
					token: "{{accessToken}}"
				},
				id: "organization-switch",
				returnsSession: true,
				signInRequired: true
			};
			return super.exchangeToken(exchangeConfig, userId);
		} catch (error) {
			throw new __thunderid_node.ThunderIDRuntimeError(`Failed to switch organization: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "ThunderIDReactClient-RuntimeError-003", "nextjs", "An error occurred while switching to the specified organization. Please try again.");
		}
	}
	isLoading() {
		return false;
	}
	isSignedIn(sessionId) {
		return super.isSignedIn(sessionId);
	}
	exchangeToken(config, sessionId) {
		return super.exchangeToken(config, sessionId);
	}
	async getAccessToken(_sessionId) {
		const { default: getAccessToken } = await Promise.resolve().then(() => require("./getAccessToken-eyQ0CI1A.js"));
		const token = await getAccessToken();
		if (typeof token !== "string" || !token) throw new __thunderid_node.ThunderIDRuntimeError("Failed to get access token.", "ThunderIDNextClient-getAccessToken-RuntimeError-003", "nextjs", "An error occurred while obtaining the access token. Please check your configuration and network connection.");
		return token;
	}
	async getDecodedIdToken(sessionId, idToken) {
		await this.ensureInitialized();
		return await super.getDecodedIdToken(sessionId, idToken);
	}
	async signIn(...args) {
		const arg1 = args[0];
		const arg2 = args[1];
		const arg3 = args[2];
		const arg4 = args[3];
		if (typeof arg1 === "object" && "flowId" in arg1) {
			if (arg1.flowId === "") {
				const defaultSignInUrl = new URL(await this.getAuthorizeRequestUrl({
					client_secret: "{{clientSecret}}",
					response_mode: "direct"
				}));
				return (0, __thunderid_node.initializeEmbeddedSignInFlow)({
					payload: Object.fromEntries(defaultSignInUrl.searchParams.entries()),
					url: `${defaultSignInUrl.origin}${defaultSignInUrl.pathname}`
				});
			}
			return (0, __thunderid_node.executeEmbeddedSignInFlow)({
				payload: arg1,
				url: arg2.url
			});
		}
		return super.signIn(arg4, arg3, arg1?.code, arg1?.session_state, arg1?.state, arg1);
	}
	async signOut(...args) {
		if (args[1] && typeof args[1] !== "string") throw new Error("The second argument must be a string.");
		const afterSignOutUrl = this.getConfiguration()?.afterSignOutUrl || "/";
		const resolvedSessionId = args[1] || await require_getSessionId.getSessionId_default();
		try {
			await super.signOut(resolvedSessionId);
		} catch (error) {
			if (!(error instanceof Error ? error.message : String(error)).includes("end_session_endpoint")) throw error;
		}
		return afterSignOutUrl;
	}
	async signUp(firstArg) {
		if (firstArg === void 0 || firstArg === null) throw new __thunderid_node.ThunderIDRuntimeError("No arguments provided for signUp method.", "ThunderIDNextClient-ValidationError-001", "nextjs", "The signUp method requires at least one argument, either a SignUpOptions object or an EmbeddedFlowExecuteRequestPayload.");
		if (typeof firstArg === "object" && "flowType" in firstArg) {
			const baseUrl = (await this.getStorageManager().getConfigData())?.baseUrl;
			return (0, __thunderid_node.executeEmbeddedSignUpFlow)({
				baseUrl,
				payload: firstArg
			});
		}
		throw new __thunderid_node.ThunderIDRuntimeError("Not implemented", "ThunderIDNextClient-ValidationError-002", "nextjs", "The signUp method with SignUpOptions is not implemented in the Next.js client.");
	}
	signInSilently(_options) {
		throw new __thunderid_node.ThunderIDRuntimeError("Not implemented", "ThunderIDNextClient-signInSilently-NotImplementedError-001", "nextjs", "The signInSilently method is not implemented in the Next.js client.");
	}
	async getAuthorizeRequestUrl(customParams, userId) {
		await this.ensureInitialized();
		return this.getSignInUrl(customParams, userId);
	}
	getStorageManager() {
		return super.getStorageManager();
	}
	async clearSession() {
		throw new __thunderid_node.ThunderIDRuntimeError("Not implemented", "ThunderIDNextClient-clearSession-NotImplementedError-001", "nextjs", "The clearSession method is not implemented in the Next.js client.");
	}
	async setSession(sessionData, sessionId) {
		return this.getStorageManager().setSessionData(sessionData, sessionId);
	}
	decodeJwtToken(token) {
		return super.decodeJwtToken(token);
	}
};
var ThunderIDNextClient_default = ThunderIDNextClient;

//#endregion
//#region src/server/getClient.ts
let _instance;
/**
* Returns the shared `ThunderIDNextClient` instance for this Node.js process.
* Creates a new instance on first call; subsequent calls return the same instance.
*
* @returns The shared ThunderIDNextClient instance.
*/
const getClient = () => {
	if (!_instance) _instance = new ThunderIDNextClient_default();
	return _instance;
};
var getClient_default = getClient;

//#endregion
//#region src/server/thunderid.ts
const thunderid = async () => {
	const getAccessToken = async (sessionId) => {
		return getClient_default().getAccessToken(sessionId);
	};
	const getSessionId = async () => require_getSessionId.getSessionId_default();
	const exchangeToken = async (config, sessionId) => {
		return getClient_default().exchangeToken(config, sessionId);
	};
	const reInitialize = async (config) => {
		return getClient_default().reInitialize(config);
	};
	return {
		exchangeToken,
		getAccessToken,
		getSessionId,
		reInitialize
	};
};
var thunderid_default = thunderid;

//#endregion
//#region src/utils/logger.ts
const logger$1 = (0, __thunderid_node.createLogger)({ level: "error" });
var logger_default = logger$1;

//#endregion
//#region src/server/actions/clearSession.ts
var import_headers$6 = /* @__PURE__ */ require_dynamic_rendering$1.__toESM(require_SessionManager.require_headers(), 1);
/**
* Deletes all ThunderID session cookies from the browser without contacting the
* identity server.
*
* Use this for error-recovery scenarios where the local session must be wiped
* immediately: refresh token failures, corrupt sessions, or forced local sign-out
* when the identity server is unreachable.
*
* For a complete sign-out that also revokes the server-side session and obtains the
* after-sign-out redirect URL, use `signOutAction` instead.
*
* @example
* ```typescript
* import { clearSession } from '@thunderid/nextjs/server';
*
* // Inside a Server Action or Route Handler:
* await clearSession();
* redirect('/sign-in');
* ```
*/
const clearSession = async () => {
	const cookieStore = await (0, import_headers$6.cookies)();
	cookieStore.delete(require_SessionManager.SessionManager_default.getSessionCookieName());
	cookieStore.delete(require_SessionManager.SessionManager_default.getTempSessionCookieName());
	logger_default.debug("[clearSession] Session cookies cleared.");
};
var clearSession_default = clearSession;

//#endregion
//#region src/server/actions/createOrganization.ts
/**
* Server action to create an organization.
*/
const createOrganization = async (payload, sessionId) => {
	try {
		return await getClient_default().createOrganization(payload, sessionId ?? await require_getSessionId.getSessionId_default());
	} catch (error) {
		throw new __thunderid_node.ThunderIDAPIError(`Failed to create the organization: ${error instanceof Error ? error.message : String(error)}`, "createOrganization-ServerActionError-001", "nextjs", error instanceof __thunderid_node.ThunderIDAPIError ? error.statusCode : void 0);
	}
};
var createOrganization_default = createOrganization;

//#endregion
//#region src/server/actions/getAllOrganizations.ts
/**
* Server action to get organizations.
*/
const getAllOrganizations = async (options, sessionId) => {
	try {
		return await getClient_default().getAllOrganizations(options, sessionId ?? await require_getSessionId.getSessionId_default());
	} catch (error) {
		throw new __thunderid_node.ThunderIDAPIError(`Failed to get all the organizations for the user: ${error instanceof Error ? error.message : String(error)}`, "getAllOrganizations-ServerActionError-001", "nextjs", error instanceof __thunderid_node.ThunderIDAPIError ? error.statusCode : void 0);
	}
};
var getAllOrganizations_default = getAllOrganizations;

//#endregion
//#region src/server/actions/getBrandingPreference.ts
/**
* Server action to get branding preferences.
*/
const getBrandingPreference = async (config, sessionId) => {
	try {
		return await (0, __thunderid_node.getBrandingPreference)(config);
	} catch (error) {
		throw new __thunderid_node.ThunderIDAPIError(`Failed to get branding preferences: ${error instanceof Error ? error.message : String(error)}`, "getBrandingPreferenceAction-ServerActionError-001", "nextjs", error instanceof __thunderid_node.ThunderIDAPIError ? error.statusCode : void 0);
	}
};
var getBrandingPreference_default = getBrandingPreference;

//#endregion
//#region src/server/actions/getCurrentOrganizationAction.ts
/**
* Server action to create an organization.
*/
const getCurrentOrganizationAction = async (sessionId) => {
	try {
		return {
			data: { organization: await getClient_default().getCurrentOrganization(sessionId) },
			error: null,
			success: true
		};
	} catch (error) {
		return {
			data: { user: {} },
			error: "Failed to get the current organization",
			success: false
		};
	}
};
var getCurrentOrganizationAction_default = getCurrentOrganizationAction;

//#endregion
//#region src/server/actions/getMyOrganizations.ts
/**
* Server action to get organizations.
*/
const getMyOrganizations = async (options, sessionId) => {
	try {
		const client = getClient_default();
		let resolvedSessionId = sessionId;
		if (!resolvedSessionId) {
			const { default: getSessionId } = await Promise.resolve().then(() => require("./getSessionId-sKxxZnTo.js"));
			resolvedSessionId = await getSessionId();
		}
		if (!resolvedSessionId) throw new __thunderid_node.ThunderIDAPIError("No session ID available for fetching organizations", "getMyOrganizations-SessionError-001", "nextjs", 401);
		try {
			if (!await client.getAccessToken(resolvedSessionId)) throw new __thunderid_node.ThunderIDAPIError("No access token available - user is not signed in", "getMyOrganizations-NoAccessToken-001", "nextjs", 401);
		} catch (error) {
			console.error("[getMyOrganizations] Failed to get access token:", error);
			throw new __thunderid_node.ThunderIDAPIError("User is not signed in - access token retrieval failed", "getMyOrganizations-NotSignedIn-001", "nextjs", 401);
		}
		return await client.getMyOrganizations(options, resolvedSessionId);
	} catch (error) {
		throw new __thunderid_node.ThunderIDAPIError(`Failed to get the organizations for the user: ${error instanceof Error ? error.message : String(error)}`, "getMyOrganizations-ServerActionError-001", "nextjs", error instanceof __thunderid_node.ThunderIDAPIError ? error.statusCode : void 0);
	}
};
var getMyOrganizations_default = getMyOrganizations;

//#endregion
//#region src/server/actions/getSessionPayload.ts
var import_headers$5 = /* @__PURE__ */ require_dynamic_rendering$1.__toESM(require_SessionManager.require_headers(), 1);
/**
* Get the session payload from JWT session cookie.
* This includes user ID, session ID, scopes, and organization ID.
*
* @returns The session payload if valid JWT session exists, undefined otherwise
*/
const getSessionPayload = async () => {
	const sessionToken = (await (0, import_headers$5.cookies)()).get(require_SessionManager.SessionManager_default.getSessionCookieName())?.value;
	if (!sessionToken) return;
	try {
		return await require_SessionManager.SessionManager_default.verifySessionToken(sessionToken);
	} catch {
		return;
	}
};
var getSessionPayload_default = getSessionPayload;

//#endregion
//#region src/server/actions/getUserAction.ts
/**
* Server action to get the current user.
* Returns the user profile if signed in.
*/
const getUserAction = async (sessionId) => {
	try {
		return {
			data: { user: await getClient_default().getUser(sessionId) },
			error: null,
			success: true
		};
	} catch (error) {
		return {
			data: { user: null },
			error: "Failed to get user",
			success: false
		};
	}
};
var getUserAction_default = getUserAction;

//#endregion
//#region src/server/actions/getUserProfileAction.ts
/**
* Server action to get the current user.
* Returns the user profile if signed in.
*/
const getUserProfileAction = async (sessionId) => {
	try {
		return {
			data: { userProfile: await getClient_default().getUserProfile(sessionId) },
			error: null,
			success: true
		};
	} catch (error) {
		return {
			data: { userProfile: {
				flattenedProfile: {},
				profile: {},
				schemas: []
			} },
			error: "Failed to get user profile",
			success: false
		};
	}
};
var getUserProfileAction_default = getUserProfileAction;

//#endregion
//#region src/server/actions/handleOAuthCallbackAction.ts
var import_headers$4 = /* @__PURE__ */ require_dynamic_rendering$1.__toESM(require_SessionManager.require_headers(), 1);
/**
* Server action to handle OAuth callback with authorization code.
* This action processes the authorization code received from the OAuth provider
* and exchanges it for tokens to complete the authentication flow.
*
* @param code - Authorization code from OAuth provider
* @param state - State parameter from OAuth provider for CSRF protection
* @param sessionState - Session state parameter from OAuth provider
* @returns Promise that resolves with success status and optional error message
*/
const handleOAuthCallbackAction = async (code, state, sessionState) => {
	try {
		if (!code || !state) return {
			error: "Missing required OAuth parameters: code and state are required",
			success: false
		};
		const thunderIDClient = getClient_default();
		if (!thunderIDClient.isInitialized) return {
			error: "ThunderID client is not initialized",
			success: false
		};
		const cookieStore = await (0, import_headers$4.cookies)();
		let sessionId;
		const tempSessionToken = cookieStore.get(require_SessionManager.SessionManager_default.getTempSessionCookieName())?.value;
		if (tempSessionToken) try {
			sessionId = (await require_SessionManager.SessionManager_default.verifyTempSession(tempSessionToken)).sessionId;
		} catch {
			logger_default.error("[handleOAuthCallbackAction] Invalid temporary session token, falling back to session ID from cookies.");
		}
		if (!sessionId) {
			logger_default.error("[handleOAuthCallbackAction] No session ID found in cookies or temporary session token.");
			return {
				error: "No session found. Please start the authentication flow again.",
				success: false
			};
		}
		const signInResult = await thunderIDClient.signIn({
			code,
			session_state: sessionState,
			state
		}, {}, sessionId);
		const config = await thunderIDClient.getConfiguration();
		if (signInResult) try {
			const idToken = await thunderIDClient.getDecodedIdToken(sessionId, signInResult["id_token"] || signInResult["idToken"]);
			const accessToken = signInResult["accessToken"] || signInResult["access_token"];
			const refreshToken$1 = signInResult["refreshToken"] ?? "";
			const userIdFromToken = idToken.sub || signInResult["sub"] || sessionId;
			const scopes = signInResult["scope"];
			const organizationId = idToken["user_org"] || idToken["organization_id"];
			const expiresIn = signInResult["expiresIn"];
			const sessionCookieExpiryTime = require_SessionManager.SessionManager_default.resolveSessionCookieExpiry(config.sessionCookie?.expiryTime);
			const sessionToken = await require_SessionManager.SessionManager_default.createSessionToken(accessToken, userIdFromToken, sessionId, scopes, expiresIn, refreshToken$1, organizationId);
			cookieStore.set(require_SessionManager.SessionManager_default.getSessionCookieName(), sessionToken, require_SessionManager.SessionManager_default.getSessionCookieOptions(sessionCookieExpiryTime));
			cookieStore.delete(require_SessionManager.SessionManager_default.getTempSessionCookieName());
		} catch (error) {
			logger_default.error(`[handleOAuthCallbackAction] Failed to create JWT session, continuing with legacy session:
          ${typeof error === "string" ? error : JSON.stringify(error)}`);
		}
		return {
			redirectUrl: config.afterSignInUrl || "/",
			success: true
		};
	} catch (error) {
		let errorMessage = "Authentication failed";
		if (error instanceof Error) errorMessage = error.message;
		else if (error && typeof error === "object" && "message" in error) errorMessage = String(error.message);
		else if (typeof error === "string") errorMessage = error;
		return {
			error: errorMessage,
			success: false
		};
	}
};
var handleOAuthCallbackAction_default = handleOAuthCallbackAction;

//#endregion
//#region src/server/actions/isSignedIn.ts
/**
* Check if the user is currently signed in.
*
* For JWT-based sessions: the session JWT exp claim is now tied to the access
* token expiry. A successful jwtVerify (inside getSessionPayload) already proves
* exp > now, so no separate timestamp comparison is needed here.
*
* Falls back to the legacy SDK in-memory check when no JWT session cookie exists.
*
* @param sessionId - Optional session ID (used only for the legacy fallback path)
* @returns True if the user is signed in with a valid, non-expired token
*/
const isSignedIn = async (sessionId) => {
	try {
		if (await getSessionPayload_default()) return true;
		const resolvedSessionId = sessionId || await require_getSessionId.getSessionId_default();
		if (!resolvedSessionId) return false;
		const client = getClient_default();
		try {
			return !!await client.getAccessToken(resolvedSessionId);
		} catch {
			return false;
		}
	} catch {
		return false;
	}
};
var isSignedIn_default = isSignedIn;

//#endregion
//#region src/utils/handleRefreshToken.ts
/**
* Handles the OAuth refresh_token grant and builds a new session JWT string.
*
* Intentionally decoupled from cookie APIs so it can be called from both the Edge
* Runtime (Next.js middleware) and the Node.js Runtime (server actions).
* Cookie persistence is the caller's responsibility.
*/
const handleRefreshToken = async (sessionPayload, config) => {
	const { baseUrl, clientId, clientSecret, sessionCookie } = config;
	const { refreshToken: storedRefreshToken, sessionId, sub, scopes, organizationId } = sessionPayload;
	if (!storedRefreshToken) throw new Error("No refresh token found in session payload.");
	const tokenEndpoint = `${baseUrl}/oauth2/token`;
	const body = new URLSearchParams({
		client_id: clientId ?? "",
		client_secret: clientSecret ?? "",
		grant_type: "refresh_token",
		refresh_token: storedRefreshToken
	});
	let response;
	try {
		response = await fetch(tokenEndpoint, {
			body: body.toString(),
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			method: "POST"
		});
	} catch (fetchError) {
		throw new Error(`Token refresh network error: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`);
	}
	if (!response.ok) throw new Error(`Token endpoint rejected refresh (HTTP ${response.status}).`);
	let tokenData;
	try {
		tokenData = await response.json();
	} catch {
		throw new Error("Failed to parse token endpoint response as JSON.");
	}
	const newAccessToken = tokenData["access_token"];
	const expiresIn = tokenData["expires_in"];
	const newRefreshToken = tokenData["refresh_token"] ?? storedRefreshToken;
	const newScopes = tokenData["scope"] ?? (Array.isArray(scopes) ? scopes.join(" ") : scopes ?? "");
	const resolvedSessionCookieExpiry = require_SessionManager.SessionManager_default.resolveSessionCookieExpiry(sessionCookie?.expiryTime);
	return {
		newSessionToken: await require_SessionManager.SessionManager_default.createSessionToken(newAccessToken, sub, sessionId, newScopes, expiresIn, newRefreshToken, organizationId),
		sessionCookieExpiryTime: resolvedSessionCookieExpiry,
		tokenResponse: {
			accessToken: newAccessToken,
			createdAt: Math.floor(Date.now() / 1e3),
			expiresIn: String(expiresIn),
			idToken: tokenData["id_token"] ?? "",
			refreshToken: newRefreshToken,
			scope: newScopes,
			tokenType: tokenData["token_type"] ?? "Bearer"
		}
	};
};
var handleRefreshToken_default = handleRefreshToken;

//#endregion
//#region src/server/actions/refreshToken.ts
var import_headers$3 = /* @__PURE__ */ require_dynamic_rendering$1.__toESM(require_SessionManager.require_headers(), 1);
/**
* Server action to refresh the access token using the stored refresh token.
* Exchanges the refresh token for a new token set and updates the session cookie.
*
* Delegates the HTTP exchange to handleRefreshToken so the same logic is shared
* with the middleware token refresh path.
*
* Called from the client side (e.g. ThunderIDClientProvider refreshOnMount) where
* Next.js allows cookie mutation. When invoked during SSR rendering the cookie
* write is silently skipped and a warning is logged.
*/
const refreshToken = async () => {
	try {
		const cookieStore = await (0, import_headers$3.cookies)();
		const sessionToken = cookieStore.get(require_SessionManager.SessionManager_default.getSessionCookieName())?.value;
		if (!sessionToken) throw new __thunderid_node.ThunderIDAPIError("No active session found. User must be signed in to refresh the token.", "refreshToken-ServerActionError-002", "nextjs", 401);
		const sessionPayload = await require_SessionManager.SessionManager_default.verifySessionTokenForRefresh(sessionToken);
		const config = await getClient_default().getConfiguration();
		const result = await handleRefreshToken_default(sessionPayload, {
			baseUrl: config.baseUrl ?? "",
			clientId: config.clientId ?? "",
			clientSecret: config.clientSecret ?? "",
			sessionCookie: config.sessionCookie
		});
		try {
			cookieStore.set(require_SessionManager.SessionManager_default.getSessionCookieName(), result.newSessionToken, require_SessionManager.SessionManager_default.getSessionCookieOptions(result.sessionCookieExpiryTime));
		} catch {
			__thunderid_node.logger.warn("[refreshToken] Could not write session cookie — called from SSR rendering context.");
		}
		const rawExpiresIn = result.tokenResponse.expiresIn;
		const expiresInSeconds = parseInt(rawExpiresIn ?? "", 10);
		if (Number.isNaN(expiresInSeconds)) throw new Error(`[refreshToken] Invalid expiresIn value received: ${rawExpiresIn}`);
		const expiresAt = Math.floor(Date.now() / 1e3) + expiresInSeconds;
		__thunderid_node.logger.debug("[refreshToken] Token refresh succeeded.");
		return { expiresAt };
	} catch (error) {
		try {
			(await (0, import_headers$3.cookies)()).delete(require_SessionManager.SessionManager_default.getSessionCookieName());
			__thunderid_node.logger.debug("[refreshToken] Cleared session cookie after refresh failure.");
		} catch {}
		throw new __thunderid_node.ThunderIDAPIError(`Failed to refresh the session: ${error instanceof Error ? error.message : JSON.stringify(error)}`, "refreshToken-ServerActionError-001", "nextjs", error instanceof __thunderid_node.ThunderIDAPIError ? error.statusCode : void 0);
	}
};
var refreshToken_default = refreshToken;

//#endregion
//#region src/server/actions/signInAction.ts
var import_headers$2 = /* @__PURE__ */ require_dynamic_rendering$1.__toESM(require_SessionManager.require_headers(), 1);
/**
* Server action for signing in a user.
* Handles the embedded sign-in flow and manages session cookies.
*
* @param payload - The embedded sign-in flow payload
* @param request - The embedded flow execute request config
* @returns Promise that resolves when sign-in is complete
*/
const signInAction = async (payload, request) => {
	try {
		const client = getClient_default();
		const cookieStore = await (0, import_headers$2.cookies)();
		let sessionId;
		const existingSessionToken = cookieStore.get(require_SessionManager.SessionManager_default.getSessionCookieName())?.value;
		if (existingSessionToken) try {
			sessionId = (await require_SessionManager.SessionManager_default.verifySessionToken(existingSessionToken)).sessionId;
		} catch {}
		if (!sessionId) {
			const tempSessionToken = cookieStore.get(require_SessionManager.SessionManager_default.getTempSessionCookieName())?.value;
			if (tempSessionToken) try {
				sessionId = (await require_SessionManager.SessionManager_default.verifyTempSession(tempSessionToken)).sessionId;
			} catch {}
		}
		if (!sessionId) {
			sessionId = (0, __thunderid_node.generateSessionId)();
			const tempSessionToken = await require_SessionManager.SessionManager_default.createTempSession(sessionId);
			cookieStore.set(require_SessionManager.SessionManager_default.getTempSessionCookieName(), tempSessionToken, require_SessionManager.SessionManager_default.getTempSessionCookieOptions());
		}
		if (!payload || (0, __thunderid_node.isEmpty)(payload)) {
			const defaultSignInUrl = await client.getAuthorizeRequestUrl({}, sessionId);
			return {
				data: { signInUrl: String(defaultSignInUrl) },
				success: true
			};
		}
		const response = await client.signIn(payload, request, sessionId);
		if (response.flowStatus === __thunderid_node.EmbeddedSignInFlowStatus.SuccessCompleted) {
			const signInResult = await client.signIn({
				code: response?.authData?.code,
				session_state: response?.authData?.session_state,
				state: response?.authData?.state
			}, {}, sessionId);
			if (signInResult) {
				const idToken = await client.getDecodedIdToken(sessionId, signInResult["idToken"] || signInResult["id_token"]);
				const userIdFromToken = idToken.sub || signInResult["sub"] || sessionId;
				const { accessToken } = signInResult;
				const refreshToken$1 = signInResult["refreshToken"] ?? "";
				const scopes = signInResult["scope"];
				const organizationId = idToken["user_org"] || idToken["organization_id"];
				const rawExpiresIn = signInResult["expiresIn"] ?? signInResult["expires_in"];
				const expiresIn = Number(rawExpiresIn);
				if (Number.isNaN(expiresIn)) throw new Error(`[signInAction] Invalid expiresIn value received: ${rawExpiresIn}`);
				const config = await client.getConfiguration();
				const sessionCookieExpiryTime = require_SessionManager.SessionManager_default.resolveSessionCookieExpiry(config.sessionCookie?.expiryTime);
				const sessionToken = await require_SessionManager.SessionManager_default.createSessionToken(accessToken, userIdFromToken, sessionId, scopes, expiresIn, refreshToken$1, organizationId);
				cookieStore.set(require_SessionManager.SessionManager_default.getSessionCookieName(), sessionToken, require_SessionManager.SessionManager_default.getSessionCookieOptions(sessionCookieExpiryTime));
				cookieStore.delete(require_SessionManager.SessionManager_default.getTempSessionCookieName());
			}
			const afterSignInUrl = await (await client.getStorageManager()).getConfigDataParameter("afterSignInUrl");
			return {
				data: { afterSignInUrl: String(afterSignInUrl) },
				success: true
			};
		}
		return {
			data: response,
			success: true
		};
	} catch (error) {
		logger_default.error(`[signInAction] Error during sign-in: ${error instanceof Error ? error.message : String(error)}`);
		return {
			error: String(error),
			success: false
		};
	}
};
var signInAction_default = signInAction;

//#endregion
//#region src/server/actions/signOutAction.ts
var import_headers$1 = /* @__PURE__ */ require_dynamic_rendering$1.__toESM(require_SessionManager.require_headers(), 1);
/**
* Server action for signing out a user.
* Clears both JWT and legacy session cookies.
*
* @returns Promise that resolves with success status and optional after sign-out URL
*/
const signOutAction = async () => {
	logger_default.debug("[signOutAction] Initiating sign out process from the server action.");
	const clearSessionCookies = async () => {
		const cookieStore = await (0, import_headers$1.cookies)();
		cookieStore.delete(require_SessionManager.SessionManager_default.getSessionCookieName());
		cookieStore.delete(require_SessionManager.SessionManager_default.getTempSessionCookieName());
	};
	try {
		const client = getClient_default();
		const sessionId = await require_getSessionId.getSessionId_default();
		let afterSignOutUrl = "/";
		if (sessionId) {
			logger_default.debug("[signOutAction] Session ID found, invoking the `signOut` to obtain the `afterSignOutUrl`.");
			afterSignOutUrl = await client.signOut({}, sessionId);
		}
		await clearSessionCookies();
		return {
			data: { afterSignOutUrl },
			success: true
		};
	} catch (error) {
		logger_default.error("[signOutAction] Error during sign out from the server action:", error);
		logger_default.debug("[signOutAction] Clearing session cookies due to error as a fallback.");
		await clearSessionCookies();
		let errorMessage;
		if (typeof error === "string") errorMessage = error;
		else if (error instanceof Error) errorMessage = error.message;
		else errorMessage = JSON.stringify(error);
		return {
			error: errorMessage,
			success: false
		};
	}
};
var signOutAction_default = signOutAction;

//#endregion
//#region src/server/actions/signUpAction.ts
/**
* Server action for signing in a user.
* Handles the embedded sign-in flow and manages session cookies.
*
* @param payload - The embedded sign-in flow payload
* @param request - The embedded flow execute request config
* @returns Promise that resolves when sign-in is complete
*/
const signUpAction = async (payload) => {
	try {
		const client = getClient_default();
		if (!payload) return {
			data: { signUpUrl: String("") },
			success: true
		};
		const response = await client.signUp(payload);
		if (response.flowStatus === __thunderid_node.EmbeddedFlowStatus.Complete) {
			const afterSignUpUrl = await (await client.getStorageManager()).getConfigDataParameter("afterSignInUrl");
			return {
				data: { afterSignUpUrl: String(afterSignUpUrl) },
				success: true
			};
		}
		return {
			data: response,
			success: true
		};
	} catch (error) {
		return {
			error: String(error),
			success: false
		};
	}
};
var signUpAction_default = signUpAction;

//#endregion
//#region src/server/actions/switchOrganization.ts
var import_headers = /* @__PURE__ */ require_dynamic_rendering$1.__toESM(require_SessionManager.require_headers(), 1);
/**
* Server action to switch organization.
*/
const switchOrganization = async (organization, sessionId) => {
	try {
		const cookieStore = await (0, import_headers.cookies)();
		const client = getClient_default();
		const resolvedSessionId = sessionId ?? await require_getSessionId.getSessionId_default();
		const response = await client.switchOrganization(organization, resolvedSessionId);
		const { revalidatePath } = await Promise.resolve().then(() => require_dynamic_rendering$1.__toDynamicImportESM(1)(require("./cache-BuUOrHAq.js")));
		revalidatePath("/");
		if (response && response.accessToken) {
			const tokenResponse = response;
			const idToken = await client.getDecodedIdToken(resolvedSessionId, tokenResponse.idToken);
			const userIdFromToken = idToken.sub;
			const organizationId = idToken["user_org"] || idToken["organization_id"];
			const config = await client.getConfiguration();
			const sessionCookieExpiryTime = require_SessionManager.SessionManager_default.resolveSessionCookieExpiry(config.sessionCookie?.expiryTime);
			const expiresIn = parseInt(tokenResponse.expiresIn, 10);
			const sessionToken = await require_SessionManager.SessionManager_default.createSessionToken(tokenResponse.accessToken, userIdFromToken, resolvedSessionId, tokenResponse.scope, expiresIn, tokenResponse.refreshToken ?? "", organizationId);
			logger_default.debug("[switchOrganization] Session token created successfully.");
			cookieStore.set(require_SessionManager.SessionManager_default.getSessionCookieName(), sessionToken, require_SessionManager.SessionManager_default.getSessionCookieOptions(sessionCookieExpiryTime));
		}
		return response;
	} catch (error) {
		throw new __thunderid_node.ThunderIDAPIError(`Failed to switch the organizations: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "switchOrganization-ServerActionError-001", "nextjs", error instanceof __thunderid_node.ThunderIDAPIError ? error.statusCode : void 0);
	}
};
var switchOrganization_default = switchOrganization;

//#endregion
//#region src/server/actions/updateUserProfileAction.ts
/**
* Server action to get the current user.
* Returns the user profile if signed in.
*/
const updateUserProfileAction = async (payload, sessionId) => {
	try {
		return {
			data: { user: await getClient_default().updateUserProfile(payload, sessionId) },
			error: "",
			success: true
		};
	} catch (error) {
		return {
			data: { user: {} },
			error: `Failed to get user profile: ${error instanceof Error ? error.message : String(error)}`,
			success: false
		};
	}
};
var updateUserProfileAction_default = updateUserProfileAction;

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_default.cjs
var require__interop_require_default = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_default.cjs": ((exports) => {
	function _interop_require_default(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	exports._ = _interop_require_default;
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js
var require_app_router_context_shared_runtime = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$8(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$8(exports, {
		AppRouterContext: function() {
			return AppRouterContext;
		},
		GlobalLayoutRouterContext: function() {
			return GlobalLayoutRouterContext;
		},
		LayoutRouterContext: function() {
			return LayoutRouterContext;
		},
		MissingSlotContext: function() {
			return MissingSlotContext;
		},
		TemplateContext: function() {
			return TemplateContext;
		}
	});
	const _react$3 = /* @__PURE__ */ require__interop_require_default()._(require("react"));
	const AppRouterContext = _react$3.default.createContext(null);
	const LayoutRouterContext = _react$3.default.createContext(null);
	const GlobalLayoutRouterContext = _react$3.default.createContext(null);
	const TemplateContext = _react$3.default.createContext(null);
	if (process.env.NODE_ENV !== "production") {
		AppRouterContext.displayName = "AppRouterContext";
		LayoutRouterContext.displayName = "LayoutRouterContext";
		GlobalLayoutRouterContext.displayName = "GlobalLayoutRouterContext";
		TemplateContext.displayName = "TemplateContext";
	}
	const MissingSlotContext = _react$3.default.createContext(/* @__PURE__ */ new Set());
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js
var require_hooks_client_context_shared_runtime = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$7(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$7(exports, {
		PathParamsContext: function() {
			return PathParamsContext;
		},
		PathnameContext: function() {
			return PathnameContext;
		},
		SearchParamsContext: function() {
			return SearchParamsContext;
		}
	});
	const _react$2 = require("react");
	const SearchParamsContext = (0, _react$2.createContext)(null);
	const PathnameContext = (0, _react$2.createContext)(null);
	const PathParamsContext = (0, _react$2.createContext)(null);
	if (process.env.NODE_ENV !== "production") {
		SearchParamsContext.displayName = "SearchParamsContext";
		PathnameContext.displayName = "PathnameContext";
		PathParamsContext.displayName = "PathParamsContext";
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/router-reducer/reducers/get-segment-value.js
var require_get_segment_value = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/router-reducer/reducers/get-segment-value.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "getSegmentValue", {
		enumerable: true,
		get: function() {
			return getSegmentValue;
		}
	});
	function getSegmentValue(segment) {
		return Array.isArray(segment) ? segment[1] : segment;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/redirect-status-code.js
var require_redirect_status_code = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/redirect-status-code.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "RedirectStatusCode", {
		enumerable: true,
		get: function() {
			return RedirectStatusCode;
		}
	});
	var RedirectStatusCode = /* @__PURE__ */ function(RedirectStatusCode$1) {
		RedirectStatusCode$1[RedirectStatusCode$1["SeeOther"] = 303] = "SeeOther";
		RedirectStatusCode$1[RedirectStatusCode$1["TemporaryRedirect"] = 307] = "TemporaryRedirect";
		RedirectStatusCode$1[RedirectStatusCode$1["PermanentRedirect"] = 308] = "PermanentRedirect";
		return RedirectStatusCode$1;
	}({});
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/redirect-error.js
var require_redirect_error = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/redirect-error.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$6(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$6(exports, {
		REDIRECT_ERROR_CODE: function() {
			return REDIRECT_ERROR_CODE;
		},
		RedirectType: function() {
			return RedirectType;
		},
		isRedirectError: function() {
			return isRedirectError;
		}
	});
	const _redirectstatuscode$1 = require_redirect_status_code();
	const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
	var RedirectType = /* @__PURE__ */ function(RedirectType$1) {
		RedirectType$1["push"] = "push";
		RedirectType$1["replace"] = "replace";
		return RedirectType$1;
	}({});
	function isRedirectError(error) {
		if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") return false;
		const digest = error.digest.split(";");
		const [errorCode, type] = digest;
		const destination = digest.slice(2, -2).join(";");
		const status = digest.at(-2);
		const statusCode = Number(status);
		return errorCode === REDIRECT_ERROR_CODE && (type === "replace" || type === "push") && typeof destination === "string" && !isNaN(statusCode) && statusCode in _redirectstatuscode$1.RedirectStatusCode;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/action-async-storage-instance.js
var require_action_async_storage_instance = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/action-async-storage-instance.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "actionAsyncStorageInstance", {
		enumerable: true,
		get: function() {
			return actionAsyncStorageInstance;
		}
	});
	const actionAsyncStorageInstance = (0, require_dynamic_rendering$1.require_async_local_storage().createAsyncLocalStorage)();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/action-async-storage.external.js
var require_action_async_storage_external = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/app-render/action-async-storage.external.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "actionAsyncStorage", {
		enumerable: true,
		get: function() {
			return _actionasyncstorageinstance.actionAsyncStorageInstance;
		}
	});
	const _actionasyncstorageinstance = require_action_async_storage_instance();
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/redirect.js
var require_redirect = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/redirect.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$5(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$5(exports, {
		getRedirectError: function() {
			return getRedirectError;
		},
		getRedirectStatusCodeFromError: function() {
			return getRedirectStatusCodeFromError;
		},
		getRedirectTypeFromError: function() {
			return getRedirectTypeFromError;
		},
		getURLFromRedirectError: function() {
			return getURLFromRedirectError;
		},
		permanentRedirect: function() {
			return permanentRedirect;
		},
		redirect: function() {
			return redirect;
		}
	});
	const _redirectstatuscode = require_redirect_status_code();
	const _redirecterror$2 = require_redirect_error();
	const actionAsyncStorage = typeof window === "undefined" ? require_action_async_storage_external().actionAsyncStorage : void 0;
	function getRedirectError(url, type, statusCode) {
		if (statusCode === void 0) statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect;
		const error = Object.defineProperty(new Error(_redirecterror$2.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error.digest = _redirecterror$2.REDIRECT_ERROR_CODE + ";" + type + ";" + url + ";" + statusCode + ";";
		return error;
	}
	function redirect(url, type) {
		var _actionAsyncStorage_getStore;
		type ??= (actionAsyncStorage == null ? void 0 : (_actionAsyncStorage_getStore = actionAsyncStorage.getStore()) == null ? void 0 : _actionAsyncStorage_getStore.isAction) ? _redirecterror$2.RedirectType.push : _redirecterror$2.RedirectType.replace;
		throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
	}
	function permanentRedirect(url, type) {
		if (type === void 0) type = _redirecterror$2.RedirectType.replace;
		throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
	}
	function getURLFromRedirectError(error) {
		if (!(0, _redirecterror$2.isRedirectError)(error)) return null;
		return error.digest.split(";").slice(2, -2).join(";");
	}
	function getRedirectTypeFromError(error) {
		if (!(0, _redirecterror$2.isRedirectError)(error)) throw Object.defineProperty(/* @__PURE__ */ new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
			value: "E260",
			enumerable: false,
			configurable: true
		});
		return error.digest.split(";", 2)[1];
	}
	function getRedirectStatusCodeFromError(error) {
		if (!(0, _redirecterror$2.isRedirectError)(error)) throw Object.defineProperty(/* @__PURE__ */ new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
			value: "E260",
			enumerable: false,
			configurable: true
		});
		return Number(error.digest.split(";").at(-2));
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js
var require_http_access_fallback = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$4(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$4(exports, {
		HTTPAccessErrorStatus: function() {
			return HTTPAccessErrorStatus;
		},
		HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
			return HTTP_ERROR_FALLBACK_ERROR_CODE;
		},
		getAccessFallbackErrorTypeByStatus: function() {
			return getAccessFallbackErrorTypeByStatus;
		},
		getAccessFallbackHTTPStatus: function() {
			return getAccessFallbackHTTPStatus;
		},
		isHTTPAccessFallbackError: function() {
			return isHTTPAccessFallbackError;
		}
	});
	const HTTPAccessErrorStatus = {
		NOT_FOUND: 404,
		FORBIDDEN: 403,
		UNAUTHORIZED: 401
	};
	const ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
	const HTTP_ERROR_FALLBACK_ERROR_CODE = "NEXT_HTTP_ERROR_FALLBACK";
	function isHTTPAccessFallbackError(error) {
		if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") return false;
		const [prefix, httpStatus] = error.digest.split(";");
		return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
	}
	function getAccessFallbackHTTPStatus(error) {
		const httpStatus = error.digest.split(";")[1];
		return Number(httpStatus);
	}
	function getAccessFallbackErrorTypeByStatus(status) {
		switch (status) {
			case 401: return "unauthorized";
			case 403: return "forbidden";
			case 404: return "not-found";
			default: return;
		}
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/not-found.js
var require_not_found = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/not-found.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "notFound", {
		enumerable: true,
		get: function() {
			return notFound;
		}
	});
	/**
	* This function allows you to render the [not-found.js file](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
	* within a route segment as well as inject a tag.
	*
	* `notFound()` can be used in
	* [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
	* [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
	* [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
	*
	* - In a Server Component, this will insert a `<meta name="robots" content="noindex" />` meta tag and set the status code to 404.
	* - In a Route Handler or Server Action, it will serve a 404 to the caller.
	*
	* Read more: [Next.js Docs: `notFound`](https://nextjs.org/docs/app/api-reference/functions/not-found)
	*/ const DIGEST$2 = "" + require_http_access_fallback().HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
	function notFound() {
		const error = Object.defineProperty(new Error(DIGEST$2), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error.digest = DIGEST$2;
		throw error;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/forbidden.js
var require_forbidden = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/forbidden.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "forbidden", {
		enumerable: true,
		get: function() {
			return forbidden;
		}
	});
	/**
	* @experimental
	* This function allows you to render the [forbidden.js file](https://nextjs.org/docs/app/api-reference/file-conventions/forbidden)
	* within a route segment as well as inject a tag.
	*
	* `forbidden()` can be used in
	* [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
	* [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
	* [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
	*
	* Read more: [Next.js Docs: `forbidden`](https://nextjs.org/docs/app/api-reference/functions/forbidden)
	*/ const DIGEST$1 = "" + require_http_access_fallback().HTTP_ERROR_FALLBACK_ERROR_CODE + ";403";
	function forbidden() {
		if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS) throw Object.defineProperty(/* @__PURE__ */ new Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
			value: "E488",
			enumerable: false,
			configurable: true
		});
		const error = Object.defineProperty(new Error(DIGEST$1), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error.digest = DIGEST$1;
		throw error;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/unauthorized.js
var require_unauthorized = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/unauthorized.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "unauthorized", {
		enumerable: true,
		get: function() {
			return unauthorized;
		}
	});
	/**
	* @experimental
	* This function allows you to render the [unauthorized.js file](https://nextjs.org/docs/app/api-reference/file-conventions/unauthorized)
	* within a route segment as well as inject a tag.
	*
	* `unauthorized()` can be used in
	* [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
	* [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and
	* [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).
	*
	*
	* Read more: [Next.js Docs: `unauthorized`](https://nextjs.org/docs/app/api-reference/functions/unauthorized)
	*/ const DIGEST = "" + require_http_access_fallback().HTTP_ERROR_FALLBACK_ERROR_CODE + ";401";
	function unauthorized() {
		if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS) throw Object.defineProperty(/* @__PURE__ */ new Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
			value: "E411",
			enumerable: false,
			configurable: true
		});
		const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
			value: "E394",
			enumerable: false,
			configurable: true
		});
		error.digest = DIGEST;
		throw error;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/lib/router-utils/is-postpone.js
var require_is_postpone = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/server/lib/router-utils/is-postpone.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "isPostpone", {
		enumerable: true,
		get: function() {
			return isPostpone;
		}
	});
	const REACT_POSTPONE_TYPE = Symbol.for("react.postpone");
	function isPostpone(error) {
		return typeof error === "object" && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/is-next-router-error.js
var require_is_next_router_error = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/is-next-router-error.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "isNextRouterError", {
		enumerable: true,
		get: function() {
			return isNextRouterError;
		}
	});
	const _httpaccessfallback = require_http_access_fallback();
	const _redirecterror$1 = require_redirect_error();
	function isNextRouterError(error) {
		return (0, _redirecterror$1.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/unstable-rethrow.server.js
var require_unstable_rethrow_server = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/unstable-rethrow.server.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "unstable_rethrow", {
		enumerable: true,
		get: function() {
			return unstable_rethrow$2;
		}
	});
	const _dynamicrenderingutils = require_dynamic_rendering$1.require_dynamic_rendering_utils();
	const _ispostpone = require_is_postpone();
	const _bailouttocsr$2 = require_dynamic_rendering$1.require_bailout_to_csr();
	const _isnextroutererror$1 = require_is_next_router_error();
	const _dynamicrendering = require_dynamic_rendering$1.require_dynamic_rendering();
	const _hooksservercontext = require_dynamic_rendering$1.require_hooks_server_context();
	function unstable_rethrow$2(error) {
		if ((0, _isnextroutererror$1.isNextRouterError)(error) || (0, _bailouttocsr$2.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error)) throw error;
		if (error instanceof Error && "cause" in error) unstable_rethrow$2(error.cause);
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/unstable-rethrow.browser.js
var require_unstable_rethrow_browser = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/unstable-rethrow.browser.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "unstable_rethrow", {
		enumerable: true,
		get: function() {
			return unstable_rethrow$1;
		}
	});
	const _bailouttocsr$1 = require_dynamic_rendering$1.require_bailout_to_csr();
	const _isnextroutererror = require_is_next_router_error();
	function unstable_rethrow$1(error) {
		if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr$1.isBailoutToCSRError)(error)) throw error;
		if (error instanceof Error && "cause" in error) unstable_rethrow$1(error.cause);
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/unstable-rethrow.js
var require_unstable_rethrow = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/unstable-rethrow.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "unstable_rethrow", {
		enumerable: true,
		get: function() {
			return unstable_rethrow;
		}
	});
	const unstable_rethrow = typeof window === "undefined" ? require_unstable_rethrow_server().unstable_rethrow : require_unstable_rethrow_browser().unstable_rethrow;
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/navigation.react-server.js
var require_navigation_react_server = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/navigation.react-server.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$3(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$3(exports, {
		ReadonlyURLSearchParams: function() {
			return ReadonlyURLSearchParams;
		},
		RedirectType: function() {
			return _redirecterror.RedirectType;
		},
		forbidden: function() {
			return _forbidden.forbidden;
		},
		notFound: function() {
			return _notfound.notFound;
		},
		permanentRedirect: function() {
			return _redirect.permanentRedirect;
		},
		redirect: function() {
			return _redirect.redirect;
		},
		unauthorized: function() {
			return _unauthorized.unauthorized;
		},
		unstable_isUnrecognizedActionError: function() {
			return unstable_isUnrecognizedActionError$1;
		},
		unstable_rethrow: function() {
			return _unstablerethrow.unstable_rethrow;
		}
	});
	const _redirect = require_redirect();
	const _redirecterror = require_redirect_error();
	const _notfound = require_not_found();
	const _forbidden = require_forbidden();
	const _unauthorized = require_unauthorized();
	const _unstablerethrow = require_unstable_rethrow();
	var ReadonlyURLSearchParamsError = class extends Error {
		constructor() {
			super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
		}
	};
	var ReadonlyURLSearchParams = class extends URLSearchParams {
		/** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ append() {
			throw new ReadonlyURLSearchParamsError();
		}
		/** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ delete() {
			throw new ReadonlyURLSearchParamsError();
		}
		/** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ set() {
			throw new ReadonlyURLSearchParamsError();
		}
		/** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */ sort() {
			throw new ReadonlyURLSearchParamsError();
		}
	};
	function unstable_isUnrecognizedActionError$1() {
		throw Object.defineProperty(/* @__PURE__ */ new Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", {
			value: "E776",
			enumerable: false,
			configurable: true
		});
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs
var require__interop_require_wildcard = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/@swc+helpers@0.5.15/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs": ((exports) => {
	function _getRequireWildcardCache(nodeInterop) {
		if (typeof WeakMap !== "function") return null;
		var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
		var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
		return (_getRequireWildcardCache = function(nodeInterop$1) {
			return nodeInterop$1 ? cacheNodeInterop : cacheBabelInterop;
		})(nodeInterop);
	}
	function _interop_require_wildcard(obj, nodeInterop) {
		if (!nodeInterop && obj && obj.__esModule) return obj;
		if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
		var cache = _getRequireWildcardCache(nodeInterop);
		if (cache && cache.has(obj)) return cache.get(obj);
		var newObj = { __proto__: null };
		var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		for (var key in obj) if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
			if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
			else newObj[key] = obj[key];
		}
		newObj.default = obj;
		if (cache) cache.set(obj, newObj);
		return newObj;
	}
	exports._ = _interop_require_wildcard;
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js
var require_server_inserted_html_shared_runtime = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js": ((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$2(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$2(exports, {
		ServerInsertedHTMLContext: function() {
			return ServerInsertedHTMLContext;
		},
		useServerInsertedHTML: function() {
			return useServerInsertedHTML;
		}
	});
	const _react$1 = /* @__PURE__ */ require__interop_require_wildcard()._(require("react"));
	const ServerInsertedHTMLContext = /* @__PURE__ */ _react$1.default.createContext(null);
	function useServerInsertedHTML(callback) {
		const addInsertedServerHTMLCallback = (0, _react$1.useContext)(ServerInsertedHTMLContext);
		if (addInsertedServerHTMLCallback) addInsertedServerHTMLCallback(callback);
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/unrecognized-action-error.js
var require_unrecognized_action_error = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/unrecognized-action-error.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export$1(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export$1(exports, {
		UnrecognizedActionError: function() {
			return UnrecognizedActionError;
		},
		unstable_isUnrecognizedActionError: function() {
			return unstable_isUnrecognizedActionError;
		}
	});
	var UnrecognizedActionError = class extends Error {
		constructor(...args) {
			super(...args);
			this.name = "UnrecognizedActionError";
		}
	};
	function unstable_isUnrecognizedActionError(error) {
		return !!(error && typeof error === "object" && error instanceof UnrecognizedActionError);
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/bailout-to-client-rendering.js
var require_bailout_to_client_rendering = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/bailout-to-client-rendering.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "bailoutToClientRendering", {
		enumerable: true,
		get: function() {
			return bailoutToClientRendering;
		}
	});
	const _bailouttocsr = require_dynamic_rendering$1.require_bailout_to_csr();
	const _workasyncstorageexternal = require_dynamic_rendering$1.require_work_async_storage_external();
	const _workunitasyncstorageexternal = require_dynamic_rendering$1.require_work_unit_async_storage_external();
	function bailoutToClientRendering(reason) {
		const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
		if (workStore == null ? void 0 : workStore.forceStatic) return;
		const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
		if (workUnitStore) switch (workUnitStore.type) {
			case "prerender":
			case "prerender-runtime":
			case "prerender-client":
			case "prerender-ppr":
			case "prerender-legacy": throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(reason), "__NEXT_ERROR_CODE", {
				value: "E394",
				enumerable: false,
				configurable: true
			});
			case "request":
			case "cache":
			case "private-cache":
			case "unstable-cache": break;
			default:
		}
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/navigation.js
var require_navigation$1 = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/dist/client/components/navigation.js": ((exports, module) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	function _export(target, all) {
		for (var name in all) Object.defineProperty(target, name, {
			enumerable: true,
			get: all[name]
		});
	}
	_export(exports, {
		ReadonlyURLSearchParams: function() {
			return _navigationreactserver.ReadonlyURLSearchParams;
		},
		RedirectType: function() {
			return _navigationreactserver.RedirectType;
		},
		ServerInsertedHTMLContext: function() {
			return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
		},
		forbidden: function() {
			return _navigationreactserver.forbidden;
		},
		notFound: function() {
			return _navigationreactserver.notFound;
		},
		permanentRedirect: function() {
			return _navigationreactserver.permanentRedirect;
		},
		redirect: function() {
			return _navigationreactserver.redirect;
		},
		unauthorized: function() {
			return _navigationreactserver.unauthorized;
		},
		unstable_isUnrecognizedActionError: function() {
			return _unrecognizedactionerror.unstable_isUnrecognizedActionError;
		},
		unstable_rethrow: function() {
			return _navigationreactserver.unstable_rethrow;
		},
		useParams: function() {
			return useParams;
		},
		usePathname: function() {
			return usePathname;
		},
		useRouter: function() {
			return useRouter$1;
		},
		useSearchParams: function() {
			return useSearchParams$1;
		},
		useSelectedLayoutSegment: function() {
			return useSelectedLayoutSegment;
		},
		useSelectedLayoutSegments: function() {
			return useSelectedLayoutSegments;
		},
		useServerInsertedHTML: function() {
			return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
		}
	});
	const _react = require("react");
	const _approutercontextsharedruntime = require_app_router_context_shared_runtime();
	const _hooksclientcontextsharedruntime = require_hooks_client_context_shared_runtime();
	const _getsegmentvalue = require_get_segment_value();
	const _segment = require_segment$1.require_segment();
	const _navigationreactserver = require_navigation_react_server();
	const _serverinsertedhtmlsharedruntime = require_server_inserted_html_shared_runtime();
	const _unrecognizedactionerror = require_unrecognized_action_error();
	const useDynamicRouteParams = typeof window === "undefined" ? require_dynamic_rendering$1.require_dynamic_rendering().useDynamicRouteParams : void 0;
	function useSearchParams$1() {
		const searchParams = (0, _react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext);
		const readonlySearchParams = (0, _react.useMemo)(() => {
			if (!searchParams) return null;
			return new _navigationreactserver.ReadonlyURLSearchParams(searchParams);
		}, [searchParams]);
		if (typeof window === "undefined") {
			const { bailoutToClientRendering: bailoutToClientRendering$1 } = require_bailout_to_client_rendering();
			bailoutToClientRendering$1("useSearchParams()");
		}
		return readonlySearchParams;
	}
	function usePathname() {
		useDynamicRouteParams?.("usePathname()");
		return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
	}
	function useRouter$1() {
		const router = (0, _react.useContext)(_approutercontextsharedruntime.AppRouterContext);
		if (router === null) throw Object.defineProperty(/* @__PURE__ */ new Error("invariant expected app router to be mounted"), "__NEXT_ERROR_CODE", {
			value: "E238",
			enumerable: false,
			configurable: true
		});
		return router;
	}
	function useParams() {
		useDynamicRouteParams?.("useParams()");
		return (0, _react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext);
	}
	/** Get the canonical parameters from the current level to the leaf node. */ function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first, segmentPath) {
		if (first === void 0) first = true;
		if (segmentPath === void 0) segmentPath = [];
		let node;
		if (first) node = tree[1][parallelRouteKey];
		else {
			const parallelRoutes = tree[1];
			var _parallelRoutes_children;
			node = (_parallelRoutes_children = parallelRoutes.children) != null ? _parallelRoutes_children : Object.values(parallelRoutes)[0];
		}
		if (!node) return segmentPath;
		const segment = node[0];
		let segmentValue = (0, _getsegmentvalue.getSegmentValue)(segment);
		if (!segmentValue || segmentValue.startsWith(_segment.PAGE_SEGMENT_KEY)) return segmentPath;
		segmentPath.push(segmentValue);
		return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
	}
	function useSelectedLayoutSegments(parallelRouteKey) {
		if (parallelRouteKey === void 0) parallelRouteKey = "children";
		useDynamicRouteParams?.("useSelectedLayoutSegments()");
		const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
		if (!context) return null;
		return getSelectedLayoutSegmentPath(context.parentTree, parallelRouteKey);
	}
	function useSelectedLayoutSegment(parallelRouteKey) {
		if (parallelRouteKey === void 0) parallelRouteKey = "children";
		useDynamicRouteParams?.("useSelectedLayoutSegment()");
		const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
		if (!selectedLayoutSegments || selectedLayoutSegments.length === 0) return null;
		const selectedLayoutSegment = parallelRouteKey === "children" ? selectedLayoutSegments[0] : selectedLayoutSegments[selectedLayoutSegments.length - 1];
		return selectedLayoutSegment === _segment.DEFAULT_SEGMENT_KEY ? null : selectedLayoutSegment;
	}
	if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
		Object.defineProperty(exports.default, "__esModule", { value: true });
		Object.assign(exports.default, exports);
		module.exports = exports.default;
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/navigation.js
var require_navigation = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/next@15.5.18_@babel+core@7.29.0_@opentelemetry+api@1.9.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_sass@1.98.0/node_modules/next/navigation.js": ((exports, module) => {
	module.exports = require_navigation$1();
}) });

//#endregion
//#region src/client/contexts/ThunderID/ThunderIDContext.ts
/**
* Context object for managing the Authentication flow builder core context.
*/
const ThunderIDContext = (0, react.createContext)({
	afterSignInUrl: void 0,
	applicationId: void 0,
	baseUrl: void 0,
	clearSession: () => Promise.resolve(),
	isInitialized: false,
	isLoading: true,
	isSignedIn: false,
	organizationHandle: void 0,
	refreshToken: () => Promise.resolve({ expiresAt: 0 }),
	signIn: () => Promise.resolve({}),
	signInUrl: void 0,
	signOut: () => Promise.resolve({}),
	signUp: () => Promise.resolve({}),
	signUpUrl: void 0,
	user: null
});
ThunderIDContext.displayName = "ThunderIDContext";
var ThunderIDContext_default = ThunderIDContext;

//#endregion
//#region ../../node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react-jsx-runtime.production.js
var require_react_jsx_runtime_production = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react-jsx-runtime.production.js": ((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}) });

//#endregion
//#region ../../node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react-jsx-runtime.development.js": ((exports) => {
	"production" !== process.env.NODE_ENV && (function() {
		function getComponentNameFromType(type) {
			if (null == type) return null;
			if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
			if ("string" === typeof type) return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE$1: return "Fragment";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
				case REACT_ACTIVITY_TYPE: return "Activity";
			}
			if ("object" === typeof type) switch ("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_CONTEXT_TYPE: return type.displayName || "Context";
				case REACT_CONSUMER_TYPE: return (type._context.displayName || "Context") + ".Consumer";
				case REACT_FORWARD_REF_TYPE:
					var innerType = type.render;
					type = type.displayName;
					type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
					return type;
				case REACT_MEMO_TYPE: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					innerType = type._payload;
					type = type._init;
					try {
						return getComponentNameFromType(type(innerType));
					} catch (x) {}
			}
			return null;
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			try {
				testStringCoercion(value);
				var JSCompiler_inline_result = !1;
			} catch (e) {
				JSCompiler_inline_result = !0;
			}
			if (JSCompiler_inline_result) {
				JSCompiler_inline_result = console;
				var JSCompiler_temp_const = JSCompiler_inline_result.error;
				var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
				JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
				return testStringCoercion(value);
			}
		}
		function getTaskName(type) {
			if (type === REACT_FRAGMENT_TYPE$1) return "<>";
			if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
			try {
				var name = getComponentNameFromType(type);
				return name ? "<" + name + ">" : "<...>";
			} catch (x) {
				return "<...>";
			}
		}
		function getOwner() {
			var dispatcher = ReactSharedInternals.A;
			return null === dispatcher ? null : dispatcher.getOwner();
		}
		function UnknownOwner() {
			return Error("react-stack-top-frame");
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return !1;
			}
			return void 0 !== config.key;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			function warnAboutAccessingKey() {
				specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
			}
			warnAboutAccessingKey.isReactWarning = !0;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: !0
			});
		}
		function elementRefGetterWithDeprecationWarning() {
			var componentName = getComponentNameFromType(this.type);
			didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
			componentName = this.props.ref;
			return void 0 !== componentName ? componentName : null;
		}
		function ReactElement(type, key, props, owner, debugStack, debugTask) {
			var refProp = props.ref;
			type = {
				$$typeof: REACT_ELEMENT_TYPE$1,
				type,
				key,
				props,
				_owner: owner
			};
			null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
				enumerable: !1,
				get: elementRefGetterWithDeprecationWarning
			}) : Object.defineProperty(type, "ref", {
				enumerable: !1,
				value: null
			});
			type._store = {};
			Object.defineProperty(type._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			});
			Object.defineProperty(type, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			});
			Object.defineProperty(type, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugStack
			});
			Object.defineProperty(type, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugTask
			});
			Object.freeze && (Object.freeze(type.props), Object.freeze(type));
			return type;
		}
		function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
			var children = config.children;
			if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
				for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++) validateChildKeys(children[isStaticChildren]);
				Object.freeze && Object.freeze(children);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else validateChildKeys(children);
			if (hasOwnProperty.call(config, "key")) {
				children = getComponentNameFromType(type);
				var keys = Object.keys(config).filter(function(k) {
					return "key" !== k;
				});
				isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
				didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
			}
			children = null;
			void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
			hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
			if ("key" in config) {
				maybeKey = {};
				for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
			} else maybeKey = config;
			children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
			return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
		}
		function validateChildKeys(node) {
			isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
		}
		function isValidElement(object) {
			return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE$1;
		}
		var React = require("react"), REACT_ELEMENT_TYPE$1 = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE$1 = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
			return null;
		};
		React = { react_stack_bottom_frame: function(callStackForError) {
			return callStackForError();
		} };
		var specialPropKeyWarningShown;
		var didWarnAboutElementRef = {};
		var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
		var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
		var didWarnAboutKeySpread = {};
		exports.Fragment = REACT_FRAGMENT_TYPE$1;
		exports.jsx = function(type, config, maybeKey) {
			var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			return jsxDEVImpl(type, config, maybeKey, !1, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
		exports.jsxs = function(type, config, maybeKey) {
			var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			return jsxDEVImpl(type, config, maybeKey, !0, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
	})();
}) });

//#endregion
//#region ../../node_modules/.pnpm/react@19.2.3/node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ require_dynamic_rendering$1.__commonJS({ "../../node_modules/.pnpm/react@19.2.3/node_modules/react/jsx-runtime.js": ((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_react_jsx_runtime_production();
	else module.exports = require_react_jsx_runtime_development();
}) });

//#endregion
//#region src/client/contexts/ThunderID/ThunderIDProvider.tsx
var import_navigation = /* @__PURE__ */ require_dynamic_rendering$1.__toESM(require_navigation());
var import_jsx_runtime = /* @__PURE__ */ require_dynamic_rendering$1.__toESM(require_jsx_runtime());
const ThunderIDClientProvider = ({ baseUrl, children, signIn, clearSession: clearSession$1, refreshToken: refreshToken$1, signOut, signUp, handleOAuthCallback, createOrganization: createOrganization$2, preferences, isSignedIn: isSignedIn$1, signInUrl, signUpUrl, user: _user, userProfile: _userProfile, currentOrganization, updateProfile, applicationId, organizationHandle, myOrganizations, revalidateMyOrganizations, getAllOrganizations: getAllOrganizations$2, switchOrganization: switchOrganization$1, brandingPreference }) => {
	const reRenderCheckRef = (0, react.useRef)(false);
	const router = (0, import_navigation.useRouter)();
	const searchParams = (0, import_navigation.useSearchParams)();
	const [isLoading, setIsLoading] = (0, react.useState)(true);
	const [user, setUser] = (0, react.useState)(_user);
	const [userProfile, setUserProfile] = (0, react.useState)(_userProfile);
	(0, react.useEffect)(() => {
		setUserProfile(_userProfile);
	}, [_userProfile]);
	(0, react.useEffect)(() => {
		setUser(_user);
	}, [_user]);
	(0, react.useEffect)(() => {
		if (reRenderCheckRef.current) return;
		reRenderCheckRef.current = true;
		if (isSignedIn$1) return;
		(async () => {
			try {
				const code = searchParams.get("code");
				const state = searchParams.get("state");
				const sessionState = searchParams.get("session_state");
				if (searchParams.get("error")) {
					logger_default.error("[ThunderIDClientProvider] An error was received for the initiated sign-in request.");
					return;
				}
				if (code && state) {
					setIsLoading(true);
					const result = await handleOAuthCallback(code, state, sessionState || void 0);
					if (result.success) if (result.redirectUrl) router.push(result.redirectUrl);
					else window.location.reload();
					else logger_default.error(`[ThunderIDClientProvider] An error occurred while signing in: ${result.error || "Authentication failed"}`);
				}
			} catch (error) {
				logger_default.error("[ThunderIDClientProvider] Failed to handle OAuth callback:", error);
			}
		})();
	}, []);
	(0, react.useEffect)(() => {
		setIsLoading(false);
	}, [isSignedIn$1, user]);
	const handleSignIn = async (payload, request) => {
		if (!signIn) throw new __thunderid_node.ThunderIDRuntimeError("`signIn` function is not available.", "ThunderIDClientProvider-handleSignIn-RuntimeError-001", "nextjs");
		const result = await signIn(payload, request);
		if (result?.data?.signInUrl) {
			router.push(result.data.signInUrl);
			return;
		}
		if (result?.data?.afterSignInUrl) {
			router.push(result.data.afterSignInUrl);
			return;
		}
		if (result?.error) throw new Error(result.error);
		return result?.data ?? result;
	};
	const handleSignUp = async (payload, request) => {
		if (!signUp) throw new __thunderid_node.ThunderIDRuntimeError("`signUp` function is not available.", "ThunderIDClientProvider-handleSignUp-RuntimeError-001", "nextjs");
		const result = await signUp(payload, request);
		if (result?.data?.signUpUrl) {
			router.push(result.data.signUpUrl);
			return;
		}
		if (result?.data?.afterSignUpUrl) {
			router.push(result.data.afterSignUpUrl);
			return;
		}
		if (result?.error) throw new Error(result.error);
		return result?.data ?? result;
	};
	const handleSignOut = async () => {
		logger_default.debug("[ThunderIDClientProvider][handleSignOut] `handleSignOut` called.");
		try {
			const result = await signOut();
			logger_default.debug("[ThunderIDClientProvider][handleSignOut] Sign out result:", result);
			if (result?.data?.afterSignOutUrl) {
				router.push(result.data.afterSignOutUrl);
				return {
					location: result.data.afterSignOutUrl,
					redirected: true
				};
			}
			if (result?.error) logger_default.error("[ThunderIDClientProvider][handleSignOut] Error result was returned during signing the user out with a button click:", result.error);
			return result?.data ?? result;
		} catch (error) {
			logger_default.error("[ThunderIDClientProvider][handleSignOut] Error occurred during signing the user out with a button click:", error);
			return;
		}
	};
	const contextValue = (0, react.useMemo)(() => ({
		applicationId,
		baseUrl,
		clearSession: clearSession$1,
		isLoading,
		isSignedIn: isSignedIn$1,
		organizationHandle,
		refreshToken: refreshToken$1,
		signIn: handleSignIn,
		signInUrl,
		signOut: handleSignOut,
		signUp: handleSignUp,
		signUpUrl,
		user
	}), [
		baseUrl,
		user,
		isSignedIn$1,
		isLoading,
		signInUrl,
		signUpUrl,
		applicationId,
		organizationHandle
	]);
	const handleProfileUpdate = (payload) => {
		setUser(payload);
		setUserProfile((prev) => ({
			...prev,
			flattenedProfile: (0, __thunderid_node.generateFlattenedUserProfile)(payload, prev?.schemas),
			profile: payload
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThunderIDContext_default.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.I18nProvider, {
			preferences: preferences?.i18n,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.FlowMetaProvider, {
				enabled: preferences?.resolveFromMeta !== false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.BrandingProvider, {
					brandingPreference,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.ThemeProvider, {
						theme: preferences?.theme?.overrides,
						mode: (0, __thunderid_react.getActiveTheme)(preferences?.theme?.mode),
						inheritFromBranding: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.FlowProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.UserProvider, {
							profile: userProfile,
							onUpdateProfile: handleProfileUpdate,
							updateProfile,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(__thunderid_react.OrganizationProvider, {
								createOrganization: createOrganization$2,
								getAllOrganizations: getAllOrganizations$2,
								myOrganizations,
								currentOrganization,
								onOrganizationSwitch: switchOrganization$1,
								revalidateMyOrganizations,
								children
							})
						}) })
					})
				})
			})
		})
	});
};
var ThunderIDProvider_default$1 = ThunderIDClientProvider;

//#endregion
//#region src/server/ThunderIDProvider.tsx
/**
* Server-side provider component for ThunderID authentication.
* Wraps the client-side provider and handles server-side authentication logic.
* Uses the singleton ThunderIDNextClient instance for consistent authentication state.
*
* @param props - Props injected into the component.
*
* @example
* ```tsx
* <ThunderIDServerProvider config={thunderidConfig}>
*   <YourApp />
* </ThunderIDServerProvider>
* ```
*
* @returns ThunderIDServerProvider component.
*/
const ThunderIDServerProvider = async ({ children, afterSignInUrl, afterSignOutUrl,..._config }) => {
	const thunderIDClient = getClient_default();
	let config = {};
	try {
		await thunderIDClient.initialize(_config);
		logger_default.debug("[ThunderIDServerProvider] ThunderID client initialized successfully.");
		config = await thunderIDClient.getConfiguration();
	} catch (error) {
		logger_default.error("[ThunderIDServerProvider] Failed to initialize ThunderID client:", error?.toString());
		throw new __thunderid_node.ThunderIDRuntimeError(`Failed to initialize ThunderID client: ${error?.toString()}`, "next-ConfigurationError-001", "next", "An error occurred while initializing the ThunderID client. Please check your configuration.");
	}
	if (!thunderIDClient.isInitialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {});
	const sessionPayload = await getSessionPayload_default();
	const sessionId = sessionPayload?.sessionId || await require_getSessionId.getSessionId_default() || "";
	const signedIn = await isSignedIn_default(sessionId);
	let user = {};
	let userProfile = {
		flattenedProfile: {},
		profile: {},
		schemas: []
	};
	let currentOrganization = {
		id: "",
		name: "",
		orgHandle: ""
	};
	let myOrganizations = [];
	let brandingPreference = null;
	if (signedIn) {
		let updatedBaseUrl = config?.baseUrl;
		if (sessionPayload?.organizationId) {
			updatedBaseUrl = `${config?.baseUrl}/o`;
			config = {
				...config,
				baseUrl: updatedBaseUrl
			};
		} else if (sessionId) try {
			if ((await thunderIDClient.getDecodedIdToken(sessionId))?.["user_org"]) {
				updatedBaseUrl = `${config?.baseUrl}/o`;
				config = {
					...config,
					baseUrl: updatedBaseUrl
				};
			}
		} catch {}
		const shouldFetchUserProfile = config?.preferences?.user?.fetchUserProfile !== false;
		const shouldFetchOrganizations = config?.preferences?.user?.fetchOrganizations !== false;
		if (shouldFetchUserProfile) try {
			const userResponse = await getUserAction_default(sessionId);
			const userProfileResponse = await getUserProfileAction_default(sessionId);
			user = userResponse.data?.user || {};
			userProfile = userProfileResponse.data?.userProfile ?? userProfile;
		} catch (error) {
			logger_default.warn("[ThunderIDServerProvider] Failed to fetch user profile from SCIM2:", error?.toString());
		}
		if (shouldFetchOrganizations) try {
			const currentOrganizationResponse = await getCurrentOrganizationAction_default(sessionId);
			if (sessionId) myOrganizations = await getMyOrganizations_default({}, sessionId);
			else logger_default.warn("[ThunderIDServerProvider] No session ID available, skipping organization fetch");
			currentOrganization = currentOrganizationResponse?.data?.organization;
		} catch (error) {
			logger_default.warn("[ThunderIDServerProvider] Failed to fetch organization info:", error?.toString());
		}
	}
	if (config?.preferences?.theme?.inheritFromBranding !== false) try {
		brandingPreference = await getBrandingPreference_default({
			baseUrl: config?.baseUrl,
			locale: "en-US",
			name: config.applicationId || config.organizationHandle,
			type: config.applicationId ? "APP" : "ORG"
		}, sessionId);
	} catch (error) {
		console.warn("[ThunderIDServerProvider] Failed to fetch branding preference:", error);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThunderIDProvider_default$1, {
		organizationHandle: config?.organizationHandle,
		applicationId: config?.applicationId,
		baseUrl: config?.baseUrl,
		signIn: signInAction_default,
		clearSession: clearSession_default,
		refreshToken: refreshToken_default,
		signOut: signOutAction_default,
		signUp: signUpAction_default,
		handleOAuthCallback: handleOAuthCallbackAction_default,
		signInUrl: config?.signInUrl,
		signUpUrl: config?.signUpUrl,
		preferences: config?.preferences,
		clientId: config?.clientId,
		user,
		currentOrganization,
		userProfile,
		updateProfile: updateUserProfileAction_default,
		isSignedIn: signedIn,
		myOrganizations,
		getAllOrganizations: getAllOrganizations_default,
		switchOrganization: switchOrganization_default,
		brandingPreference,
		createOrganization: createOrganization_default,
		children
	});
};
var ThunderIDProvider_default = ThunderIDServerProvider;

//#endregion
Object.defineProperty(exports, 'ThunderIDContext_default', {
  enumerable: true,
  get: function () {
    return ThunderIDContext_default;
  }
});
Object.defineProperty(exports, 'ThunderIDNextClient_default', {
  enumerable: true,
  get: function () {
    return ThunderIDNextClient_default;
  }
});
Object.defineProperty(exports, 'ThunderIDProvider_default', {
  enumerable: true,
  get: function () {
    return ThunderIDProvider_default;
  }
});
Object.defineProperty(exports, 'getClient_default', {
  enumerable: true,
  get: function () {
    return getClient_default;
  }
});
Object.defineProperty(exports, 'logger_default', {
  enumerable: true,
  get: function () {
    return logger_default;
  }
});
Object.defineProperty(exports, 'require_jsx_runtime', {
  enumerable: true,
  get: function () {
    return require_jsx_runtime;
  }
});
Object.defineProperty(exports, 'require_navigation', {
  enumerable: true,
  get: function () {
    return require_navigation;
  }
});
Object.defineProperty(exports, 'thunderid_default', {
  enumerable: true,
  get: function () {
    return thunderid_default;
  }
});