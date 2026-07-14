import { Buffer } from 'buffer/index.js';
if (typeof window !== 'undefined' && !window.Buffer) { window.Buffer = Buffer; }
import { DEFAULT_THEME, HttpClient, OIDCRequestConstants, ThunderIDAuthException, ThunderIDJavaScriptClient, ThunderIDRuntimeError, TokenConstants, arrayBufferToBase64url, base64urlToArrayBuffer, createPackageComponentLogger, extractEmojiFromUri, extractPkceStorageKeyFromState, initializeEmbeddedSignInFlow, isEmojiUri } from "@thunderid/javascript";
import base64url from "base64url";
import sha256 from "fast-sha256";
import { createLocalJWKSet, jwtVerify } from "jose";

export * from "@thunderid/javascript"

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from$1, except, desc) => {
	if (from$1 && typeof from$1 === "object" || typeof from$1 === "function") for (var keys = __getOwnPropNames(from$1), i$1 = 0, n = keys.length, key; i$1 < n; i$1++) {
		key = keys[i$1];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from$1[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from$1, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
//#region src/constants/SPAConstants.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
const ERROR = "error";
const ERROR_DESCRIPTION = "error_description";
const CUSTOM_GRANT_CONFIG = "custom_grant_config";
const STATE_QUERY = "state";
const OP_IFRAME = "opIFrame";
const RP_IFRAME = "rpIFrame";
const PROMPT_NONE_IFRAME = "promptNoneIFrame";
const STATE = "Y2hlY2tTZXNzaW9u";
const SILENT_SIGN_IN_STATE = "sign-in-silently";
const INITIALIZED_SILENT_SIGN_IN = "initialized-silent-sign-in";
const PROMPT_NONE_REQUEST_SENT = "promptNoneRequestSent";
const ACCESS_TOKEN_INVALID = "Access token is invalid";
const REFRESH_ACCESS_TOKEN_ERR0R = "refresh-access-token-error";
const TOKEN_REQUEST_CONFIG_KEY = "token_request_config";
const CHECK_SESSION_SIGNED_IN = "check_session_signed_in";
const CHECK_SESSION_SIGNED_OUT = "check_session_signed_out";
const SET_SESSION_STATE_FROM_IFRAME = "set_session_state_from_iframe";

//#endregion
//#region src/FetchHttpClient.ts
/**
* Fetch-based HTTP client. Extends `HttpClient` and implements `transport()`
* using the native Fetch API.
*
* To plug in a custom HTTP transport, extend `HttpClient` from `@thunderid/javascript`
* and override `transport()`, then pass your implementation where `FetchHttpClient`
* is currently used.
*/
var FetchHttpClient = class FetchHttpClient extends HttpClient {
	static instances = /* @__PURE__ */ new Map();
	static getInstance(instanceId = 0, isHandlerEnabled = true, attachToken = () => Promise.resolve()) {
		if (!this.instances.has(instanceId)) this.instances.set(instanceId, new FetchHttpClient(isHandlerEnabled, attachToken));
		return this.instances.get(instanceId);
	}
	static destroyInstance(instanceId = 0) {
		this.instances.delete(instanceId);
	}
	async transport(config) {
		const { attachToken, data, headers: configHeaders, method, params, shouldAttachIDPAccessToken, shouldEncodeToFormData, startTimeInMs, url: configUrl,...fetchOptions } = config;
		let url = configUrl ?? "";
		if (params) {
			const qs = new URLSearchParams(params).toString();
			if (qs) url = `${url}${url.includes("?") ? "&" : "?"}${qs}`;
		}
		const headers = { ...configHeaders ?? {} };
		let body;
		if (data !== void 0) if (data instanceof FormData) body = data;
		else {
			body = JSON.stringify(data);
			if (!headers["Content-Type"] && !headers["content-type"]) headers["Content-Type"] = "application/json";
		}
		let fetchResponse;
		try {
			fetchResponse = await fetch(url, {
				credentials: "include",
				...fetchOptions,
				body,
				headers,
				method: (method ?? "GET").toUpperCase()
			});
		} catch (networkError) {
			throw Object.assign(new Error(networkError.message), {
				code: "NETWORK_ERROR",
				config
			});
		}
		const responseData = (fetchResponse.headers.get("content-type") ?? "").includes("application/json") ? await fetchResponse.json() : await fetchResponse.text();
		const responseHeaders = {};
		fetchResponse.headers.forEach((value, key) => {
			responseHeaders[key] = value;
		});
		if (!fetchResponse.ok) throw Object.assign(new Error(fetchResponse.statusText), {
			config,
			response: {
				data: responseData,
				headers: responseHeaders,
				status: fetchResponse.status,
				statusText: fetchResponse.statusText
			}
		});
		return {
			config,
			data: responseData,
			headers: responseHeaders,
			status: fetchResponse.status,
			statusText: fetchResponse.statusText
		};
	}
};
var FetchHttpClient_default = FetchHttpClient;

//#endregion
//#region src/models/BrowserStorage.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
* Supported browser storage backends for auth session data.
*/
let BrowserStorage = /* @__PURE__ */ function(BrowserStorage$1) {
	/** Store session data in `localStorage` (persists across tabs and sessions). */
	BrowserStorage$1["LocalStorage"] = "localStorage";
	/** Store session data in `sessionStorage` (cleared when the tab is closed). */
	BrowserStorage$1["SessionStorage"] = "sessionStorage";
	/** Store session data in in-memory (cleared on page reload). */
	BrowserStorage$1["BrowserMemory"] = "browserMemory";
	return BrowserStorage$1;
}({});
var BrowserStorage_default = BrowserStorage;

//#endregion
//#region src/stores/LocalStore.ts
/**
* `Storage` implementation backed by the browser's `localStorage`.
*/
var LocalStore = class {
	async setData(key, value) {
		localStorage.setItem(key, value);
	}
	async getData(key) {
		return localStorage.getItem(key) ?? "{}";
	}
	async removeData(key) {
		localStorage.removeItem(key);
	}
};
var LocalStore_default = LocalStore;

//#endregion
//#region src/stores/MemoryStore.ts
/**
* `Storage` implementation backed by an in-memory `Map`. Data does not survive page reloads.
*/
var MemoryStore = class {
	_data;
	constructor() {
		this._data = /* @__PURE__ */ new Map();
	}
	async setData(key, value) {
		this._data.set(key, value);
	}
	async getData(key) {
		return this._data?.get(key) ?? "{}";
	}
	async removeData(key) {
		this._data.delete(key);
	}
};
var MemoryStore_default = MemoryStore;

//#endregion
//#region src/stores/SessionStore.ts
/**
* `Storage` implementation backed by the browser's `sessionStorage`.
*/
var SessionStore = class {
	async setData(key, value) {
		sessionStorage.setItem(key, value);
	}
	async getData(key) {
		return sessionStorage.getItem(key) ?? "{}";
	}
	async removeData(key) {
		sessionStorage.removeItem(key);
	}
};
var SessionStore_default = SessionStore;

//#endregion
//#region src/utils/SPAUtils.ts
/**
* Static utility methods for SPA authentication flows including PKCE storage,
* sign-out URL management, and URL-based state detection.
*/
var SPAUtils = class SPAUtils {
	constructor() {}
	/**
	* Removes the `code` search parameter from the current URL without a page reload.
	*/
	static removeAuthorizationCode() {
		const url = location.href;
		history.pushState({}, document.title, url.replace(/\?code=.*$/, ""));
	}
	/**
	* Retrieves a PKCE verifier from sessionStorage.
	*
	* @param pkceKey - The storage key for the PKCE verifier.
	* @returns The stored verifier string, or an empty string if not found.
	*/
	static getPKCE(pkceKey) {
		return sessionStorage.getItem(pkceKey) ?? "";
	}
	/**
	* Persists a PKCE verifier in sessionStorage.
	*
	* @param pkceKey - The storage key.
	* @param pkce - The PKCE verifier value.
	*/
	static setPKCE(pkceKey, pkce) {
		sessionStorage.setItem(pkceKey, pkce);
	}
	/**
	* Persists the post-sign-out redirect URL for the given client and instance.
	*
	* @param url - The sign-out redirect URL.
	* @param clientId - The OAuth2 client ID.
	* @param instanceId - The client instance ID.
	*/
	static setSignOutURL(url, clientId, instanceId) {
		sessionStorage.setItem(`${OIDCRequestConstants.SignOut.Storage.StorageKeys.SIGN_OUT_URL}-instance_${instanceId}-${clientId}`, url);
	}
	/**
	* Retrieves the stored sign-out redirect URL for the given client and instance.
	*
	* @param clientId - The OAuth2 client ID.
	* @param instanceId - The client instance ID.
	* @returns The stored sign-out URL, or an empty string.
	*/
	static getSignOutUrl(clientId, instanceId) {
		return sessionStorage.getItem(`${OIDCRequestConstants.SignOut.Storage.StorageKeys.SIGN_OUT_URL}-instance_${instanceId}-${clientId}`) ?? "";
	}
	/**
	* Removes a PKCE verifier from sessionStorage.
	*
	* @param pkceKey - The storage key to remove.
	*/
	static removePKCE(pkceKey) {
		sessionStorage.removeItem(pkceKey);
	}
	/**
	* Determines whether the `signIn` method should continue based on the `callOnlyOnRedirect` flag.
	*
	* @param callOnlyOnRedirect - True if the call should only proceed when redirected back from the IdP.
	* @param authorizationCode - Authorization code passed directly (form_post mode).
	* @returns `true` if sign-in should proceed.
	*/
	static canContinueSignIn(callOnlyOnRedirect, authorizationCode) {
		if (callOnlyOnRedirect && !SPAUtils.hasErrorInURL() && !SPAUtils.hasAuthSearchParamsInURL() && !authorizationCode) return false;
		return true;
	}
	/**
	* Returns `true` if silent sign-in is in progress (silent-state present in the URL).
	*/
	static isInitializedSilentSignIn() {
		return SPAUtils.isSilentStatePresentInURL();
	}
	/**
	* Returns `true` if the `signIn` method was already called this navigation
	* (auth code or error is present in the URL, but not a silent flow).
	*/
	static wasSignInCalled() {
		if (SPAUtils.hasErrorInURL() || SPAUtils.hasAuthSearchParamsInURL()) {
			if (!this.isSilentStatePresentInURL()) return true;
		}
		return false;
	}
	/**
	* Returns `true` if a silent sign-in was previously initialized in this session.
	*/
	static wasSilentSignInCalled() {
		const raw = sessionStorage.getItem(INITIALIZED_SILENT_SIGN_IN);
		return Boolean(raw ? JSON.parse(raw) : null);
	}
	/**
	* Checks whether the current URL indicates a successful sign-out redirect.
	* Clears the query string and session data if `true`.
	*
	* @param isSignOutSuccessful - Static method from the JS client for URL inspection.
	* @param clearSession - Callback to clear session data after successful sign-out.
	* @returns `true` if the sign-out completed successfully.
	*/
	static async isSignOutSuccessful(isSignOutSuccessfulFn, clearSession) {
		if (isSignOutSuccessfulFn(window.location.href)) {
			const newUrl = window.location.href.split("?")[0];
			history.pushState({}, document.title, newUrl);
			await clearSession();
			return true;
		}
		return false;
	}
	/**
	* Checks whether the current URL indicates a sign-out failure.
	* Returns the error details if present, or `false` otherwise.
	*
	* @param didSignOutFailFn - Static method from the JS client for URL inspection.
	* @returns The `SignOutError` if sign-out failed, or `false`.
	*/
	static didSignOutFail(didSignOutFailFn) {
		if (didSignOutFailFn(window.location.href)) {
			const url = new URL(window.location.href);
			const error = url.searchParams.get(ERROR);
			const description = url.searchParams.get(ERROR_DESCRIPTION);
			const newUrl = window.location.href.split("?")[0];
			history.pushState({}, document.title, newUrl);
			return {
				description: description ?? "",
				error: error ?? ""
			};
		}
		return false;
	}
	/**
	* Returns `true` if the URL contains a silent sign-in state parameter.
	*/
	static isSilentStatePresentInURL() {
		return new URL(window.location.href).searchParams.get("state")?.includes(SILENT_SIGN_IN_STATE) ?? false;
	}
	/**
	* Returns `true` if the current URL contains an authorization code (`code` parameter).
	*
	* @param params - Search params string (defaults to `window.location.search`).
	*/
	static hasAuthSearchParamsInURL(params = window.location.search) {
		return /[?&]code=[^&]+/.test(params);
	}
	/**
	* Returns `true` if the current URL contains an OAuth2 error parameter
	* (but not a sign-out success state).
	*
	* @param url - URL to inspect (defaults to `window.location.href`).
	*/
	static hasErrorInURL(url = window.location.href) {
		const urlObject = new URL(url);
		return !!urlObject.searchParams.get(ERROR) && urlObject.searchParams.get(STATE_QUERY) !== OIDCRequestConstants.Params.SIGN_OUT_SUCCESS;
	}
	/**
	* Returns `true` if no prompt-none request has been sent yet this session.
	*/
	static canSendPromptNoneRequest() {
		const raw = sessionStorage.getItem(PROMPT_NONE_REQUEST_SENT);
		return !(raw ? JSON.parse(raw) : null);
	}
	/**
	* Records whether a prompt-none request has been sent.
	*
	* @param canSend - `true` marks the request as sent.
	*/
	static setPromptNoneRequestSent(canSend) {
		sessionStorage.setItem(PROMPT_NONE_REQUEST_SENT, JSON.stringify(canSend));
	}
	/**
	* Waits until the browser has redirected (non-blocking delay).
	*
	* @param time - Time to wait in seconds (default: 3).
	*/
	static async waitTillPageRedirect(time) {
		const timeToWait = time ?? 3e3;
		await new Promise((resolve) => setTimeout(resolve, timeToWait * 1e3));
	}
	/**
	* Returns a Promise that resolves when `condition()` returns `true`.
	*
	* @param condition - Predicate to poll.
	* @param timeout - Poll interval in milliseconds (default: 500).
	*/
	static until = (condition, timeout = 500) => {
		const poll = (done) => {
			if (condition()) done();
			else setTimeout(() => poll(done), timeout);
		};
		return new Promise(poll);
	};
};
var SPAUtils_default = SPAUtils;

//#endregion
//#region src/utils/AuthenticationHelper.ts
/**
* Browser-level authentication helper that orchestrates HTTP requests with token attachment,
* automatic token refresh, session management, and the silent sign-in flow.
*
* @typeParam T - The browser client config extension type.
*/
var AuthenticationHelper = class {
	_storageManager;
	_spaHelper;
	_instanceId;
	_isTokenRefreshing;
	_getUser;
	_refreshAccessToken;
	_getAccessToken;
	_getIDPAccessToken;
	_isSignedIn;
	_getDecodedIdToken;
	_getCrypto;
	_getIdToken;
	_getOpenIDProviderEndpoints;
	_exchangeToken;
	_setPKCECode;
	/**
	* @param storageManager - Storage manager for reading config and session data.
	* @param spaHelper - Helper for managing token refresh timers.
	* @param instanceId - The instance ID used for signing out URL storage.
	* @param operations - Client operation callbacks to avoid circular dependency.
	*/
	constructor(storageManager, spaHelper, instanceId, operations) {
		this._storageManager = storageManager;
		this._spaHelper = spaHelper;
		this._instanceId = instanceId;
		this._isTokenRefreshing = false;
		this._getUser = operations.getUser;
		this._refreshAccessToken = operations.refreshAccessToken;
		this._getAccessToken = operations.getAccessToken;
		this._getIDPAccessToken = operations.getIDPAccessToken;
		this._isSignedIn = operations.isSignedIn;
		this._getDecodedIdToken = operations.getDecodedIdToken;
		this._getCrypto = operations.getCrypto;
		this._getIdToken = operations.getIdToken;
		this._getOpenIDProviderEndpoints = operations.getOpenIDProviderEndpoints;
		this._exchangeToken = operations.exchangeToken;
		this._setPKCECode = operations.setPKCECode;
	}
	/**
	* Enables request interception on the HTTP client.
	*
	* @param httpClient - The HTTP client to enable.
	*/
	enableHttpHandler(httpClient) {
		httpClient?.enableHandler && httpClient.enableHandler();
	}
	/**
	* Disables request interception on the HTTP client.
	*
	* @param httpClient - The HTTP client to disable.
	*/
	disableHttpHandler(httpClient) {
		httpClient?.disableHandler && httpClient.disableHandler();
	}
	/**
	* Initializes OIDC Session Management via an RP iframe.
	*
	* @param config - The current auth config.
	* @param oidcEndpoints - Resolved OIDC provider endpoints.
	* @param getSessionState - Returns the current session state from storage.
	* @param getAuthzURL - Builds an authorization URL with optional params.
	* @param sessionManagementHelper - The session management helper instance.
	*/
	initializeSessionManger(config, oidcEndpoints, getSessionState, getAuthzURL, sessionManagementHelper) {
		sessionManagementHelper.initialize(config.clientId, oidcEndpoints.checkSessionIframe ?? "", getSessionState, config.checkSessionInterval ?? 3, config.sessionRefreshInterval ?? 300, config.afterSignInUrl, getAuthzURL);
	}
	/**
	* Executes a custom token exchange grant, enforcing `allowedExternalUrls` rules when applicable.
	*
	* @param config - The token exchange configuration.
	* @param enableRetrievingSignOutURLFromSession - Callback invoked when `preventSignOutURLUpdate` is set.
	* @returns The user session or raw response.
	*/
	async exchangeToken(config, enableRetrievingSignOutURLFromSession) {
		await this._storageManager.getConfigData();
		let useDefaultEndpoint = true;
		let matches = false;
		if (config?.tokenEndpoint) {
			useDefaultEndpoint = false;
			matches = true;
		}
		if (config.shouldReplayAfterRefresh) this._storageManager.setTemporaryDataParameter(CUSTOM_GRANT_CONFIG, JSON.stringify(config));
		if (useDefaultEndpoint || matches) return this._exchangeToken(config).then(async (response) => {
			if (enableRetrievingSignOutURLFromSession && typeof enableRetrievingSignOutURLFromSession === "function") enableRetrievingSignOutURLFromSession(config);
			if (config.returnsSession) {
				await this._spaHelper.refreshAccessTokenAutomatically(() => this.refreshAccessToken());
				return this._getUser();
			} else return response;
		}).catch((error) => {
			return Promise.reject(error);
		});
		else return Promise.reject(new ThunderIDAuthException("SPA-MAIN_THREAD_CLIENT-RCG-IV01", "Request to the provided endpoint is prohibited.", "Requests can only be sent to resource servers specified by the `allowedExternalUrls` attribute while initializing the SDK."));
	}
	/**
	* Returns the stored custom grant config if a replay-after-refresh was scheduled, or `null`.
	*/
	async getCustomGrantConfigData() {
		const configString = await this._storageManager.getTemporaryDataParameter(CUSTOM_GRANT_CONFIG);
		if (configString) return JSON.parse(configString);
		else return null;
	}
	/**
	* Refreshes the access token, replays any scheduled custom grant, and reschedules auto-refresh.
	*
	* @param enableRetrievingSignOutURLFromSession - Callback for custom grant sign-out URL handling.
	* @returns The updated user session.
	*/
	async refreshAccessToken(enableRetrievingSignOutURLFromSession) {
		try {
			await this._refreshAccessToken();
			const customGrantConfig = await this.getCustomGrantConfigData();
			if (customGrantConfig) await this.exchangeToken(customGrantConfig, enableRetrievingSignOutURLFromSession);
			await this._spaHelper.refreshAccessTokenAutomatically(() => this.refreshAccessToken());
			return this._getUser();
		} catch (error) {
			const refreshTokenError = { type: REFRESH_ACCESS_TOKEN_ERR0R };
			window.postMessage(refreshTokenError);
			return Promise.reject(error);
		}
	}
	async retryFailedRequests(failedRequest) {
		const { httpClient, requestConfig, isHttpHandlerEnabled, httpErrorCallback, httpFinishCallback } = failedRequest;
		await SPAUtils_default.until(() => !this._isTokenRefreshing);
		try {
			return await httpClient.request(requestConfig);
		} catch (error) {
			if (isHttpHandlerEnabled) {
				if (typeof httpErrorCallback === "function") await httpErrorCallback(error);
				if (typeof httpFinishCallback === "function") httpFinishCallback();
			}
			return Promise.reject(error);
		}
	}
	/**
	* Sends an HTTP request via the provided client, automatically attaching the token,
	* and retries once after a token refresh on a 401 response.
	*
	* @param httpClient - The HTTP client to use.
	* @param requestConfig - The request configuration.
	* @param isHttpHandlerEnabled - Whether request callbacks are active.
	* @param httpErrorCallback - Called when a request fails.
	* @param httpFinishCallback - Called when a request finishes.
	* @param enableRetrievingSignOutURLFromSession - Callback for custom grant sign-out handling.
	* @returns The HTTP response.
	*/
	async httpRequest(httpClient, requestConfig, isHttpHandlerEnabled, httpErrorCallback, httpFinishCallback, enableRetrievingSignOutURLFromSession) {
		return httpClient.request(requestConfig).then((response) => {
			return Promise.resolve(response);
		}).catch(async (error) => {
			if (error?.response?.status === 401 || !error?.response) {
				if (this._isTokenRefreshing) return this.retryFailedRequests({
					enableRetrievingSignOutURLFromSession,
					httpClient,
					httpErrorCallback,
					httpFinishCallback,
					isHttpHandlerEnabled,
					requestConfig
				});
				this._isTokenRefreshing = true;
				let refreshAccessTokenResponse;
				try {
					refreshAccessTokenResponse = await this.refreshAccessToken(enableRetrievingSignOutURLFromSession);
					this._isTokenRefreshing = false;
				} catch (refreshError) {
					this._isTokenRefreshing = false;
					if (isHttpHandlerEnabled) {
						if (typeof httpErrorCallback === "function") await httpErrorCallback({
							...error,
							code: ACCESS_TOKEN_INVALID
						});
						if (typeof httpFinishCallback === "function") httpFinishCallback();
					}
					throw new ThunderIDAuthException("SPA-AUTH_HELPER-HR-SE01", refreshError?.name ?? "Refresh token request failed.", refreshError?.message ?? "An error occurred while trying to refresh the access token.");
				}
				if (refreshAccessTokenResponse) try {
					return await httpClient.request(requestConfig);
				} catch (error$1) {
					if (isHttpHandlerEnabled) {
						if (typeof httpErrorCallback === "function") await httpErrorCallback(error$1);
						if (typeof httpFinishCallback === "function") httpFinishCallback();
					}
					return Promise.reject(error$1);
				}
			}
			if (isHttpHandlerEnabled) {
				if (typeof httpErrorCallback === "function") await httpErrorCallback(error);
				if (typeof httpFinishCallback === "function") httpFinishCallback();
			}
			return Promise.reject(error);
		});
	}
	/**
	* Sends multiple HTTP requests in parallel via the provided client,
	* retrying all on a 401 after a token refresh.
	*
	* @param requestConfigs - Array of request configurations.
	* @param httpClient - The HTTP client to use.
	* @param isHttpHandlerEnabled - Whether request callbacks are active.
	* @param httpErrorCallback - Called when a batch fails.
	* @param httpFinishCallback - Called when the batch finishes.
	* @returns Array of responses.
	*/
	async httpRequestAll(requestConfigs, httpClient, isHttpHandlerEnabled, httpErrorCallback, httpFinishCallback) {
		const requests = requestConfigs.map((req) => httpClient.request(req));
		return httpClient?.all && httpClient.all(requests).then((responses) => {
			return Promise.resolve(responses);
		}).catch(async (error) => {
			if (error?.response?.status === 401 || !error?.response) {
				try {
					await this._refreshAccessToken();
				} catch (refreshError) {
					if (isHttpHandlerEnabled) {
						if (typeof httpErrorCallback === "function") await httpErrorCallback({
							...error,
							code: ACCESS_TOKEN_INVALID
						});
						if (typeof httpFinishCallback === "function") httpFinishCallback();
					}
					throw new ThunderIDAuthException("SPA-AUTH_HELPER-HRA-SE01", refreshError?.name ?? "Refresh token request failed.", refreshError?.message ?? "An error occurred while trying to refresh the access token.");
				}
				return httpClient.all && httpClient.all(requests).then((response) => Promise.resolve(response)).catch(async (error$1) => {
					if (isHttpHandlerEnabled) {
						if (typeof httpErrorCallback === "function") await httpErrorCallback(error$1);
						if (typeof httpFinishCallback === "function") httpFinishCallback();
					}
					return Promise.reject(error$1);
				});
			}
			if (isHttpHandlerEnabled) {
				if (typeof httpErrorCallback === "function") await httpErrorCallback(error);
				if (typeof httpFinishCallback === "function") httpFinishCallback();
			}
			return Promise.reject(error);
		});
	}
	/**
	* Executes the silent sign-in flow using a prompt-none request via an iFrame.
	*
	* @param constructSilentSignInUrl - Builds the prompt-none authorize URL.
	* @param requestAccessToken - Exchanges the returned code for tokens.
	* @param sessionManagementHelper - Handles the iFrame prompt-none response.
	* @param additionalParams - Extra authorize request params.
	* @param tokenRequestConfig - Additional params for the token request.
	* @returns The user session, or `false` if the user is not signed in.
	*/
	async signInSilently(constructSilentSignInUrl, requestAccessToken, sessionManagementHelper, additionalParams, tokenRequestConfig) {
		if (SPAUtils_default.isInitializedSilentSignIn()) {
			await sessionManagementHelper.receivePromptNoneResponse();
			return Promise.resolve({
				allowedScopes: "",
				displayName: "",
				email: "",
				sessionState: "",
				sub: "",
				tenantDomain: "",
				username: ""
			});
		}
		const promptNoneIFrame = document.getElementById(RP_IFRAME)?.contentDocument?.getElementById(PROMPT_NONE_IFRAME);
		try {
			promptNoneIFrame.src = await constructSilentSignInUrl(additionalParams);
		} catch (error) {
			return Promise.reject(error);
		}
		return new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				resolve(false);
			}, 1e4);
			const listenToPromptNoneIFrame = async (e) => {
				const data = e.data;
				if (data?.type == CHECK_SESSION_SIGNED_OUT) {
					window.removeEventListener("message", listenToPromptNoneIFrame);
					clearTimeout(timer);
					resolve(false);
				}
				if (data?.type == CHECK_SESSION_SIGNED_IN && (data?.data)?.code) {
					const authInfo = data.data;
					requestAccessToken(authInfo.code, authInfo.sessionState, authInfo.state, tokenRequestConfig).then((response) => {
						window.removeEventListener("message", listenToPromptNoneIFrame);
						resolve(response);
					}).catch((error) => {
						window.removeEventListener("message", listenToPromptNoneIFrame);
						reject(error);
					}).finally(() => {
						clearTimeout(timer);
					});
				}
			};
			window.addEventListener("message", listenToPromptNoneIFrame);
		});
	}
	/**
	* Handles the early-return path of `signIn()` when a session already exists
	* or the page is handling a prompt-none response.
	*
	* @param shouldStopAuthn - Returns `true` if we should short-circuit and return early.
	* @param checkSession - Callback to initialize OIDC session management.
	* @returns The current user if already signed in, or `undefined` to continue normal sign-in.
	*/
	async handleSignIn(shouldStopAuthn, checkSession) {
		const configAny = await this._storageManager.getConfigData();
		if (await shouldStopAuthn()) return Promise.resolve({
			allowedScopes: "",
			displayName: "",
			email: "",
			sessionState: "",
			sub: "",
			tenantDomain: "",
			username: ""
		});
		if (await this._isSignedIn()) {
			await this._spaHelper.clearRefreshTokenTimeout();
			await this._spaHelper.refreshAccessTokenAutomatically(() => this.refreshAccessToken());
			if (configAny.syncSession) checkSession();
			return Promise.resolve(await this._getUser());
		}
		const error = new URL(window.location.href).searchParams.get(ERROR);
		const errorDescription = new URL(window.location.href).searchParams.get(ERROR_DESCRIPTION);
		if (error) {
			const url = new URL(window.location.href);
			url.searchParams.delete(ERROR);
			url.searchParams.delete(ERROR_DESCRIPTION);
			history.pushState(null, document.title, url.toString());
			throw new ThunderIDAuthException("SPA-AUTH_HELPER-SI-SE01", error, errorDescription ?? "");
		}
		return Promise.resolve(void 0);
	}
	/**
	* Attaches the access token (or IDP token) to an HTTP request config's `Authorization` header.
	*
	* @param request - The request config to mutate.
	*/
	async attachTokenToRequestConfig(request) {
		const requestConfig = {
			attachToken: true,
			...request
		};
		if (requestConfig.attachToken) if (requestConfig.shouldAttachIDPAccessToken) request.headers = {
			...request.headers,
			Authorization: `Bearer ${await this._getIDPAccessToken()}`
		};
		else request.headers = {
			...request.headers,
			Authorization: `Bearer ${await this._getAccessToken()}`
		};
	}
	/** Returns the current authenticated user from the ID token. */
	async getUser() {
		return this._getUser();
	}
	/**
	* Returns the decoded ID token payload.
	*
	* @param sessionId - Optional session ID.
	*/
	async getDecodedIdToken(sessionId) {
		return this._getDecodedIdToken(sessionId);
	}
	/** Returns the IsomorphicCrypto instance used by the client. */
	async getCrypto() {
		return this._getCrypto();
	}
	/** Returns the raw ID token string. */
	async getIdToken() {
		return this._getIdToken();
	}
	/** Returns the resolved OIDC provider endpoints. */
	async getOpenIDProviderEndpoints() {
		return this._getOpenIDProviderEndpoints();
	}
	/**
	* Returns the current access token.
	*
	* @param sessionId - Optional session ID.
	*/
	async getAccessToken(sessionId) {
		return this._getAccessToken(sessionId);
	}
	/** Returns the IDP access token from the session. */
	async getIDPAccessToken() {
		return (await this._storageManager.getSessionData())?.access_token;
	}
	/** Returns the storage manager. */
	getStorageManager() {
		return this._storageManager;
	}
	/** Returns whether the user is currently signed in. */
	async isSignedIn() {
		return this._isSignedIn();
	}
};
var AuthenticationHelper_default = AuthenticationHelper;

//#endregion
//#region src/utils/navigate.ts
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
* Navigates to a new URL within the browser.
*
* - For same-origin URLs (relative paths or absolute URLs with the same origin),
*   uses the History API and dispatches a `popstate` event (SPA navigation).
* - For cross-origin URLs, performs a full page load using `window.location.assign`.
*
* This allows seamless navigation for both SPA routes and external links.
*
* @param url - The target URL to navigate to. Can be a path, query, or absolute URL.
*
* @example
* ```typescript
* // SPA navigation (same origin)
* navigate('/dashboard');
*
* // SPA navigation with query
* navigate('/search?q=thunderid');
*
* // Cross-origin navigation (full page load)
* navigate('https://localhost:8090/accountrecoveryendpoint/register.do');
* ```
*/
const navigate = (url) => {
	try {
		const targetUrl = new URL(url, window.location.origin);
		if (targetUrl.origin === window.location.origin) {
			window.history.pushState(null, "", targetUrl.pathname + targetUrl.search + targetUrl.hash);
			window.dispatchEvent(new PopStateEvent("popstate", { state: null }));
		} else window.location.assign(targetUrl.href);
	} catch {
		window.location.assign(url);
	}
};
var navigate_default = navigate;

//#endregion
//#region src/utils/SessionManagementHelper.ts
/**
* Factory that creates an OIDC Session Management helper using an RP iframe and polling.
* Appends a hidden RP iframe to the document and returns the helper interface.
*
* @param signOut - Returns the sign-out URL for the current session.
* @param setSessionState - Stores a new session state from a prompt-none response.
* @returns A `SessionManagementHelperInterface` instance.
*/
const createSessionManagementHelper = async (signOut, setSessionState) => {
	let _clientID;
	let _checkSessionEndpoint;
	let _sessionState;
	let _interval;
	let _redirectURL;
	let _sessionRefreshInterval;
	let _sessionRefreshIntervalTimeout;
	let _checkSessionIntervalTimeout;
	let _getSignInUrl;
	const initialize = (clientId, checkSessionEndpoint, getSessionState, interval, sessionRefreshInterval, redirectURL, getSignInUrl) => {
		_clientID = clientId;
		_checkSessionEndpoint = checkSessionEndpoint;
		_sessionState = getSessionState;
		_interval = interval;
		_redirectURL = redirectURL;
		_sessionRefreshInterval = sessionRefreshInterval;
		_getSignInUrl = getSignInUrl;
		if (_interval > -1) initiateCheckSession();
		if (_sessionRefreshInterval > -1) _sessionRefreshIntervalTimeout = setInterval(() => {
			sendPromptNoneRequest();
		}, _sessionRefreshInterval * 1e3);
	};
	const initiateCheckSession = async () => {
		if (!_checkSessionEndpoint || !_clientID || !_redirectURL) return;
		async function checkSession() {
			const sessionState = await _sessionState();
			if (Boolean(_clientID) && Boolean(sessionState)) {
				const message = `${_clientID} ${sessionState}`;
				(document.getElementById(RP_IFRAME)?.contentDocument?.getElementById(OP_IFRAME)).contentWindow?.postMessage(message, _checkSessionEndpoint);
			}
		}
		const opIframe = document.getElementById(RP_IFRAME)?.contentDocument?.getElementById(OP_IFRAME);
		opIframe.src = _checkSessionEndpoint + "?client_id=" + _clientID + "&redirect_uri=" + _redirectURL;
		_checkSessionIntervalTimeout = setInterval(checkSession, _interval * 1e3);
		listenToResponseFromOPIFrame();
	};
	const reset = () => {
		clearInterval(_checkSessionIntervalTimeout);
		clearInterval(_sessionRefreshIntervalTimeout);
	};
	const listenToResponseFromOPIFrame = () => {
		async function receiveMessage(e) {
			const targetOrigin = _checkSessionEndpoint;
			if (!targetOrigin || targetOrigin?.indexOf(e.origin) < 0 || e?.data?.type === SET_SESSION_STATE_FROM_IFRAME) return;
			if (e.data === "unchanged") {} else if (e.data === "error") window.location.href = await signOut();
			else if (e.data === "changed") sendPromptNoneRequest();
		}
		window?.addEventListener("message", receiveMessage, false);
	};
	const sendPromptNoneRequest = async () => {
		const promptNoneIFrame = document.getElementById(RP_IFRAME)?.contentDocument?.getElementById(PROMPT_NONE_IFRAME);
		if (SPAUtils_default.canSendPromptNoneRequest()) {
			SPAUtils_default.setPromptNoneRequestSent(true);
			const receiveMessageListener = (e) => {
				if (e?.data?.type === SET_SESSION_STATE_FROM_IFRAME) {
					setSessionState(e?.data?.data ?? "");
					window?.removeEventListener("message", receiveMessageListener);
				}
			};
			window?.addEventListener("message", receiveMessageListener);
			promptNoneIFrame.src = await _getSignInUrl({
				prompt: "none",
				response_mode: "query",
				state: STATE
			});
		}
	};
	const receivePromptNoneResponse = async (setSessionStateFn) => {
		const state = new URL(window.location.href).searchParams.get(STATE_QUERY);
		const sessionState = new URL(window.location.href).searchParams.get(OIDCRequestConstants.Params.SESSION_STATE);
		const parent = window.parent.parent;
		if (state !== null && (state.includes(STATE) || state.includes(SILENT_SIGN_IN_STATE))) {
			const code$1 = new URL(window.location.href).searchParams.get("code");
			if (code$1 !== null && code$1.length !== 0) {
				if (state.includes(SILENT_SIGN_IN_STATE)) {
					const message = {
						data: {
							code: code$1,
							sessionState: sessionState ?? "",
							state
						},
						type: CHECK_SESSION_SIGNED_IN
					};
					sessionStorage.setItem(INITIALIZED_SILENT_SIGN_IN, "false");
					parent.postMessage(message, parent.origin);
					SPAUtils_default.setPromptNoneRequestSent(false);
					window.location.href = "about:blank";
					await SPAUtils_default.waitTillPageRedirect();
					return true;
				}
				const newSessionState = new URL(window.location.href).searchParams.get("session_state");
				setSessionStateFn && await setSessionStateFn(newSessionState);
				SPAUtils_default.setPromptNoneRequestSent(false);
				window.location.href = "about:blank";
				await SPAUtils_default.waitTillPageRedirect();
				return true;
			} else {
				if (state.includes(SILENT_SIGN_IN_STATE)) {
					const message = { type: CHECK_SESSION_SIGNED_OUT };
					window.parent.parent.postMessage(message, parent.origin);
					SPAUtils_default.setPromptNoneRequestSent(false);
					window.location.href = "about:blank";
					await SPAUtils_default.waitTillPageRedirect();
					return true;
				}
				SPAUtils_default.setPromptNoneRequestSent(false);
				const signOutURL = await signOut();
				parent.location.href = signOutURL;
				window.location.href = "about:blank";
				await SPAUtils_default.waitTillPageRedirect();
				return true;
			}
		}
		return false;
	};
	let rpIFrame = document.createElement("iframe");
	rpIFrame.setAttribute("id", RP_IFRAME);
	rpIFrame.style.display = "none";
	let rpIframeLoaded = false;
	rpIFrame.onload = () => {
		rpIFrame = document.getElementById(RP_IFRAME);
		const rpDoc = rpIFrame?.contentDocument;
		const opIFrame = rpDoc?.createElement("iframe");
		if (opIFrame) {
			opIFrame.setAttribute("id", OP_IFRAME);
			opIFrame.style.display = "none";
		}
		const promptNoneIFrame = rpDoc?.createElement("iframe");
		if (promptNoneIFrame) {
			promptNoneIFrame.setAttribute("id", PROMPT_NONE_IFRAME);
			promptNoneIFrame.style.display = "none";
		}
		opIFrame && rpIFrame?.contentDocument?.body?.appendChild(opIFrame);
		promptNoneIFrame && rpIFrame?.contentDocument?.body?.appendChild(promptNoneIFrame);
		rpIframeLoaded = true;
	};
	document?.body?.appendChild(rpIFrame);
	const sleep = () => new Promise((resolve) => setTimeout(resolve, 1));
	while (!rpIframeLoaded) await sleep();
	return {
		initialize,
		receivePromptNoneResponse,
		reset
	};
};
var SessionManagementHelper_default = createSessionManagementHelper;

//#endregion
//#region ../../node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js
var require_base64_js = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js": ((exports) => {
	exports.byteLength = byteLength$1;
	exports.toByteArray = toByteArray;
	exports.fromByteArray = fromByteArray;
	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
	var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	for (var i = 0, len = code.length; i < len; ++i) {
		lookup[i] = code[i];
		revLookup[code.charCodeAt(i)] = i;
	}
	revLookup["-".charCodeAt(0)] = 62;
	revLookup["_".charCodeAt(0)] = 63;
	function getLens(b64) {
		var len$1 = b64.length;
		if (len$1 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
		var validLen = b64.indexOf("=");
		if (validLen === -1) validLen = len$1;
		var placeHoldersLen = validLen === len$1 ? 0 : 4 - validLen % 4;
		return [validLen, placeHoldersLen];
	}
	function byteLength$1(b64) {
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function _byteLength(b64, validLen, placeHoldersLen) {
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function toByteArray(b64) {
		var tmp;
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
		var curByte = 0;
		var len$1 = placeHoldersLen > 0 ? validLen - 4 : validLen;
		var i$1;
		for (i$1 = 0; i$1 < len$1; i$1 += 4) {
			tmp = revLookup[b64.charCodeAt(i$1)] << 18 | revLookup[b64.charCodeAt(i$1 + 1)] << 12 | revLookup[b64.charCodeAt(i$1 + 2)] << 6 | revLookup[b64.charCodeAt(i$1 + 3)];
			arr[curByte++] = tmp >> 16 & 255;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 2) {
			tmp = revLookup[b64.charCodeAt(i$1)] << 2 | revLookup[b64.charCodeAt(i$1 + 1)] >> 4;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 1) {
			tmp = revLookup[b64.charCodeAt(i$1)] << 10 | revLookup[b64.charCodeAt(i$1 + 1)] << 4 | revLookup[b64.charCodeAt(i$1 + 2)] >> 2;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		return arr;
	}
	function tripletToBase64(num) {
		return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
	}
	function encodeChunk(uint8, start, end) {
		var tmp;
		var output = [];
		for (var i$1 = start; i$1 < end; i$1 += 3) {
			tmp = (uint8[i$1] << 16 & 16711680) + (uint8[i$1 + 1] << 8 & 65280) + (uint8[i$1 + 2] & 255);
			output.push(tripletToBase64(tmp));
		}
		return output.join("");
	}
	function fromByteArray(uint8) {
		var tmp;
		var len$1 = uint8.length;
		var extraBytes = len$1 % 3;
		var parts = [];
		var maxChunkLength = 16383;
		for (var i$1 = 0, len2 = len$1 - extraBytes; i$1 < len2; i$1 += maxChunkLength) parts.push(encodeChunk(uint8, i$1, i$1 + maxChunkLength > len2 ? len2 : i$1 + maxChunkLength));
		if (extraBytes === 1) {
			tmp = uint8[len$1 - 1];
			parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
		} else if (extraBytes === 2) {
			tmp = (uint8[len$1 - 2] << 8) + uint8[len$1 - 1];
			parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
		}
		return parts.join("");
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js
var require_ieee754 = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/ieee754@1.2.1/node_modules/ieee754/index.js": ((exports) => {
	/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
	exports.read = function(buffer$1, offset, isLE, mLen, nBytes) {
		var e, m;
		var eLen = nBytes * 8 - mLen - 1;
		var eMax = (1 << eLen) - 1;
		var eBias = eMax >> 1;
		var nBits = -7;
		var i$1 = isLE ? nBytes - 1 : 0;
		var d = isLE ? -1 : 1;
		var s = buffer$1[offset + i$1];
		i$1 += d;
		e = s & (1 << -nBits) - 1;
		s >>= -nBits;
		nBits += eLen;
		for (; nBits > 0; e = e * 256 + buffer$1[offset + i$1], i$1 += d, nBits -= 8);
		m = e & (1 << -nBits) - 1;
		e >>= -nBits;
		nBits += mLen;
		for (; nBits > 0; m = m * 256 + buffer$1[offset + i$1], i$1 += d, nBits -= 8);
		if (e === 0) e = 1 - eBias;
		else if (e === eMax) return m ? NaN : (s ? -1 : 1) * Infinity;
		else {
			m = m + Math.pow(2, mLen);
			e = e - eBias;
		}
		return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};
	exports.write = function(buffer$1, value, offset, isLE, mLen, nBytes) {
		var e, m, c;
		var eLen = nBytes * 8 - mLen - 1;
		var eMax = (1 << eLen) - 1;
		var eBias = eMax >> 1;
		var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
		var i$1 = isLE ? 0 : nBytes - 1;
		var d = isLE ? 1 : -1;
		var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
		value = Math.abs(value);
		if (isNaN(value) || value === Infinity) {
			m = isNaN(value) ? 1 : 0;
			e = eMax;
		} else {
			e = Math.floor(Math.log(value) / Math.LN2);
			if (value * (c = Math.pow(2, -e)) < 1) {
				e--;
				c *= 2;
			}
			if (e + eBias >= 1) value += rt / c;
			else value += rt * Math.pow(2, 1 - eBias);
			if (value * c >= 2) {
				e++;
				c /= 2;
			}
			if (e + eBias >= eMax) {
				m = 0;
				e = eMax;
			} else if (e + eBias >= 1) {
				m = (value * c - 1) * Math.pow(2, mLen);
				e = e + eBias;
			} else {
				m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
				e = 0;
			}
		}
		for (; mLen >= 8; buffer$1[offset + i$1] = m & 255, i$1 += d, m /= 256, mLen -= 8);
		e = e << mLen | m;
		eLen += mLen;
		for (; eLen > 0; buffer$1[offset + i$1] = e & 255, i$1 += d, e /= 256, eLen -= 8);
		buffer$1[offset + i$1 - d] |= s * 128;
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js
var require_buffer = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/buffer@6.0.3/node_modules/buffer/index.js": ((exports) => {
	const base64 = require_base64_js();
	const ieee754 = require_ieee754();
	const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
	exports.Buffer = Buffer$4;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;
	const K_MAX_LENGTH = 2147483647;
	exports.kMaxLength = K_MAX_LENGTH;
	/**
	* If `Buffer.TYPED_ARRAY_SUPPORT`:
	*   === true    Use Uint8Array implementation (fastest)
	*   === false   Print warning and recommend using `buffer` v4.x which has an Object
	*               implementation (most compatible, even IE6)
	*
	* Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	* Opera 11.6+, iOS 4.2+.
	*
	* We report that the browser does not support typed arrays if the are not subclassable
	* using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
	* (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
	* for __proto__ and has a buggy typed array implementation.
	*/
	Buffer$4.TYPED_ARRAY_SUPPORT = typedArraySupport();
	if (!Buffer$4.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
	function typedArraySupport() {
		try {
			const arr = new Uint8Array(1);
			const proto = { foo: function() {
				return 42;
			} };
			Object.setPrototypeOf(proto, Uint8Array.prototype);
			Object.setPrototypeOf(arr, proto);
			return arr.foo() === 42;
		} catch (e) {
			return false;
		}
	}
	Object.defineProperty(Buffer$4.prototype, "parent", {
		enumerable: true,
		get: function() {
			if (!Buffer$4.isBuffer(this)) return void 0;
			return this.buffer;
		}
	});
	Object.defineProperty(Buffer$4.prototype, "offset", {
		enumerable: true,
		get: function() {
			if (!Buffer$4.isBuffer(this)) return void 0;
			return this.byteOffset;
		}
	});
	function createBuffer(length) {
		if (length > K_MAX_LENGTH) throw new RangeError("The value \"" + length + "\" is invalid for option \"size\"");
		const buf = new Uint8Array(length);
		Object.setPrototypeOf(buf, Buffer$4.prototype);
		return buf;
	}
	/**
	* The Buffer constructor returns instances of `Uint8Array` that have their
	* prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	* `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	* and the `Uint8Array` methods. Square bracket notation works as expected -- it
	* returns a single octet.
	*
	* The `Uint8Array` prototype remains unmodified.
	*/
	function Buffer$4(arg, encodingOrOffset, length) {
		if (typeof arg === "number") {
			if (typeof encodingOrOffset === "string") throw new TypeError("The \"string\" argument must be of type string. Received type number");
			return allocUnsafe(arg);
		}
		return from(arg, encodingOrOffset, length);
	}
	Buffer$4.poolSize = 8192;
	function from(value, encodingOrOffset, length) {
		if (typeof value === "string") return fromString(value, encodingOrOffset);
		if (ArrayBuffer.isView(value)) return fromArrayView(value);
		if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
		if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) return fromArrayBuffer(value, encodingOrOffset, length);
		if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) return fromArrayBuffer(value, encodingOrOffset, length);
		if (typeof value === "number") throw new TypeError("The \"value\" argument must not be of type number. Received type number");
		const valueOf = value.valueOf && value.valueOf();
		if (valueOf != null && valueOf !== value) return Buffer$4.from(valueOf, encodingOrOffset, length);
		const b = fromObject(value);
		if (b) return b;
		if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") return Buffer$4.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
		throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
	}
	/**
	* Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	* if value is a number.
	* Buffer.from(str[, encoding])
	* Buffer.from(array)
	* Buffer.from(buffer)
	* Buffer.from(arrayBuffer[, byteOffset[, length]])
	**/
	Buffer$4.from = function(value, encodingOrOffset, length) {
		return from(value, encodingOrOffset, length);
	};
	Object.setPrototypeOf(Buffer$4.prototype, Uint8Array.prototype);
	Object.setPrototypeOf(Buffer$4, Uint8Array);
	function assertSize(size) {
		if (typeof size !== "number") throw new TypeError("\"size\" argument must be of type number");
		else if (size < 0) throw new RangeError("The value \"" + size + "\" is invalid for option \"size\"");
	}
	function alloc(size, fill, encoding) {
		assertSize(size);
		if (size <= 0) return createBuffer(size);
		if (fill !== void 0) return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
		return createBuffer(size);
	}
	/**
	* Creates a new filled Buffer instance.
	* alloc(size[, fill[, encoding]])
	**/
	Buffer$4.alloc = function(size, fill, encoding) {
		return alloc(size, fill, encoding);
	};
	function allocUnsafe(size) {
		assertSize(size);
		return createBuffer(size < 0 ? 0 : checked(size) | 0);
	}
	/**
	* Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	* */
	Buffer$4.allocUnsafe = function(size) {
		return allocUnsafe(size);
	};
	/**
	* Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	*/
	Buffer$4.allocUnsafeSlow = function(size) {
		return allocUnsafe(size);
	};
	function fromString(string, encoding) {
		if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
		if (!Buffer$4.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
		const length = byteLength(string, encoding) | 0;
		let buf = createBuffer(length);
		const actual = buf.write(string, encoding);
		if (actual !== length) buf = buf.slice(0, actual);
		return buf;
	}
	function fromArrayLike(array) {
		const length = array.length < 0 ? 0 : checked(array.length) | 0;
		const buf = createBuffer(length);
		for (let i$1 = 0; i$1 < length; i$1 += 1) buf[i$1] = array[i$1] & 255;
		return buf;
	}
	function fromArrayView(arrayView) {
		if (isInstance(arrayView, Uint8Array)) {
			const copy = new Uint8Array(arrayView);
			return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
		}
		return fromArrayLike(arrayView);
	}
	function fromArrayBuffer(array, byteOffset, length) {
		if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError("\"offset\" is outside of buffer bounds");
		if (array.byteLength < byteOffset + (length || 0)) throw new RangeError("\"length\" is outside of buffer bounds");
		let buf;
		if (byteOffset === void 0 && length === void 0) buf = new Uint8Array(array);
		else if (length === void 0) buf = new Uint8Array(array, byteOffset);
		else buf = new Uint8Array(array, byteOffset, length);
		Object.setPrototypeOf(buf, Buffer$4.prototype);
		return buf;
	}
	function fromObject(obj) {
		if (Buffer$4.isBuffer(obj)) {
			const len$1 = checked(obj.length) | 0;
			const buf = createBuffer(len$1);
			if (buf.length === 0) return buf;
			obj.copy(buf, 0, 0, len$1);
			return buf;
		}
		if (obj.length !== void 0) {
			if (typeof obj.length !== "number" || numberIsNaN(obj.length)) return createBuffer(0);
			return fromArrayLike(obj);
		}
		if (obj.type === "Buffer" && Array.isArray(obj.data)) return fromArrayLike(obj.data);
	}
	function checked(length) {
		if (length >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
		return length | 0;
	}
	function SlowBuffer(length) {
		if (+length != length) length = 0;
		return Buffer$4.alloc(+length);
	}
	Buffer$4.isBuffer = function isBuffer(b) {
		return b != null && b._isBuffer === true && b !== Buffer$4.prototype;
	};
	Buffer$4.compare = function compare(a, b) {
		if (isInstance(a, Uint8Array)) a = Buffer$4.from(a, a.offset, a.byteLength);
		if (isInstance(b, Uint8Array)) b = Buffer$4.from(b, b.offset, b.byteLength);
		if (!Buffer$4.isBuffer(a) || !Buffer$4.isBuffer(b)) throw new TypeError("The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array");
		if (a === b) return 0;
		let x = a.length;
		let y = b.length;
		for (let i$1 = 0, len$1 = Math.min(x, y); i$1 < len$1; ++i$1) if (a[i$1] !== b[i$1]) {
			x = a[i$1];
			y = b[i$1];
			break;
		}
		if (x < y) return -1;
		if (y < x) return 1;
		return 0;
	};
	Buffer$4.isEncoding = function isEncoding(encoding) {
		switch (String(encoding).toLowerCase()) {
			case "hex":
			case "utf8":
			case "utf-8":
			case "ascii":
			case "latin1":
			case "binary":
			case "base64":
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return true;
			default: return false;
		}
	};
	Buffer$4.concat = function concat(list, length) {
		if (!Array.isArray(list)) throw new TypeError("\"list\" argument must be an Array of Buffers");
		if (list.length === 0) return Buffer$4.alloc(0);
		let i$1;
		if (length === void 0) {
			length = 0;
			for (i$1 = 0; i$1 < list.length; ++i$1) length += list[i$1].length;
		}
		const buffer$1 = Buffer$4.allocUnsafe(length);
		let pos = 0;
		for (i$1 = 0; i$1 < list.length; ++i$1) {
			let buf = list[i$1];
			if (isInstance(buf, Uint8Array)) if (pos + buf.length > buffer$1.length) {
				if (!Buffer$4.isBuffer(buf)) buf = Buffer$4.from(buf);
				buf.copy(buffer$1, pos);
			} else Uint8Array.prototype.set.call(buffer$1, buf, pos);
			else if (!Buffer$4.isBuffer(buf)) throw new TypeError("\"list\" argument must be an Array of Buffers");
			else buf.copy(buffer$1, pos);
			pos += buf.length;
		}
		return buffer$1;
	};
	function byteLength(string, encoding) {
		if (Buffer$4.isBuffer(string)) return string.length;
		if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) return string.byteLength;
		if (typeof string !== "string") throw new TypeError("The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type " + typeof string);
		const len$1 = string.length;
		const mustMatch = arguments.length > 2 && arguments[2] === true;
		if (!mustMatch && len$1 === 0) return 0;
		let loweredCase = false;
		for (;;) switch (encoding) {
			case "ascii":
			case "latin1":
			case "binary": return len$1;
			case "utf8":
			case "utf-8": return utf8ToBytes(string).length;
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return len$1 * 2;
			case "hex": return len$1 >>> 1;
			case "base64": return base64ToBytes(string).length;
			default:
				if (loweredCase) return mustMatch ? -1 : utf8ToBytes(string).length;
				encoding = ("" + encoding).toLowerCase();
				loweredCase = true;
		}
	}
	Buffer$4.byteLength = byteLength;
	function slowToString(encoding, start, end) {
		let loweredCase = false;
		if (start === void 0 || start < 0) start = 0;
		if (start > this.length) return "";
		if (end === void 0 || end > this.length) end = this.length;
		if (end <= 0) return "";
		end >>>= 0;
		start >>>= 0;
		if (end <= start) return "";
		if (!encoding) encoding = "utf8";
		while (true) switch (encoding) {
			case "hex": return hexSlice(this, start, end);
			case "utf8":
			case "utf-8": return utf8Slice(this, start, end);
			case "ascii": return asciiSlice(this, start, end);
			case "latin1":
			case "binary": return latin1Slice(this, start, end);
			case "base64": return base64Slice(this, start, end);
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return utf16leSlice(this, start, end);
			default:
				if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
				encoding = (encoding + "").toLowerCase();
				loweredCase = true;
		}
	}
	Buffer$4.prototype._isBuffer = true;
	function swap(b, n, m) {
		const i$1 = b[n];
		b[n] = b[m];
		b[m] = i$1;
	}
	Buffer$4.prototype.swap16 = function swap16() {
		const len$1 = this.length;
		if (len$1 % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
		for (let i$1 = 0; i$1 < len$1; i$1 += 2) swap(this, i$1, i$1 + 1);
		return this;
	};
	Buffer$4.prototype.swap32 = function swap32() {
		const len$1 = this.length;
		if (len$1 % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
		for (let i$1 = 0; i$1 < len$1; i$1 += 4) {
			swap(this, i$1, i$1 + 3);
			swap(this, i$1 + 1, i$1 + 2);
		}
		return this;
	};
	Buffer$4.prototype.swap64 = function swap64() {
		const len$1 = this.length;
		if (len$1 % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
		for (let i$1 = 0; i$1 < len$1; i$1 += 8) {
			swap(this, i$1, i$1 + 7);
			swap(this, i$1 + 1, i$1 + 6);
			swap(this, i$1 + 2, i$1 + 5);
			swap(this, i$1 + 3, i$1 + 4);
		}
		return this;
	};
	Buffer$4.prototype.toString = function toString() {
		const length = this.length;
		if (length === 0) return "";
		if (arguments.length === 0) return utf8Slice(this, 0, length);
		return slowToString.apply(this, arguments);
	};
	Buffer$4.prototype.toLocaleString = Buffer$4.prototype.toString;
	Buffer$4.prototype.equals = function equals(b) {
		if (!Buffer$4.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
		if (this === b) return true;
		return Buffer$4.compare(this, b) === 0;
	};
	Buffer$4.prototype.inspect = function inspect() {
		let str = "";
		const max = exports.INSPECT_MAX_BYTES;
		str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
		if (this.length > max) str += " ... ";
		return "<Buffer " + str + ">";
	};
	if (customInspectSymbol) Buffer$4.prototype[customInspectSymbol] = Buffer$4.prototype.inspect;
	Buffer$4.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
		if (isInstance(target, Uint8Array)) target = Buffer$4.from(target, target.offset, target.byteLength);
		if (!Buffer$4.isBuffer(target)) throw new TypeError("The \"target\" argument must be one of type Buffer or Uint8Array. Received type " + typeof target);
		if (start === void 0) start = 0;
		if (end === void 0) end = target ? target.length : 0;
		if (thisStart === void 0) thisStart = 0;
		if (thisEnd === void 0) thisEnd = this.length;
		if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
		if (thisStart >= thisEnd && start >= end) return 0;
		if (thisStart >= thisEnd) return -1;
		if (start >= end) return 1;
		start >>>= 0;
		end >>>= 0;
		thisStart >>>= 0;
		thisEnd >>>= 0;
		if (this === target) return 0;
		let x = thisEnd - thisStart;
		let y = end - start;
		const len$1 = Math.min(x, y);
		const thisCopy = this.slice(thisStart, thisEnd);
		const targetCopy = target.slice(start, end);
		for (let i$1 = 0; i$1 < len$1; ++i$1) if (thisCopy[i$1] !== targetCopy[i$1]) {
			x = thisCopy[i$1];
			y = targetCopy[i$1];
			break;
		}
		if (x < y) return -1;
		if (y < x) return 1;
		return 0;
	};
	function bidirectionalIndexOf(buffer$1, val, byteOffset, encoding, dir) {
		if (buffer$1.length === 0) return -1;
		if (typeof byteOffset === "string") {
			encoding = byteOffset;
			byteOffset = 0;
		} else if (byteOffset > 2147483647) byteOffset = 2147483647;
		else if (byteOffset < -2147483648) byteOffset = -2147483648;
		byteOffset = +byteOffset;
		if (numberIsNaN(byteOffset)) byteOffset = dir ? 0 : buffer$1.length - 1;
		if (byteOffset < 0) byteOffset = buffer$1.length + byteOffset;
		if (byteOffset >= buffer$1.length) if (dir) return -1;
		else byteOffset = buffer$1.length - 1;
		else if (byteOffset < 0) if (dir) byteOffset = 0;
		else return -1;
		if (typeof val === "string") val = Buffer$4.from(val, encoding);
		if (Buffer$4.isBuffer(val)) {
			if (val.length === 0) return -1;
			return arrayIndexOf(buffer$1, val, byteOffset, encoding, dir);
		} else if (typeof val === "number") {
			val = val & 255;
			if (typeof Uint8Array.prototype.indexOf === "function") if (dir) return Uint8Array.prototype.indexOf.call(buffer$1, val, byteOffset);
			else return Uint8Array.prototype.lastIndexOf.call(buffer$1, val, byteOffset);
			return arrayIndexOf(buffer$1, [val], byteOffset, encoding, dir);
		}
		throw new TypeError("val must be string, number or Buffer");
	}
	function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
		let indexSize = 1;
		let arrLength = arr.length;
		let valLength = val.length;
		if (encoding !== void 0) {
			encoding = String(encoding).toLowerCase();
			if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
				if (arr.length < 2 || val.length < 2) return -1;
				indexSize = 2;
				arrLength /= 2;
				valLength /= 2;
				byteOffset /= 2;
			}
		}
		function read(buf, i$2) {
			if (indexSize === 1) return buf[i$2];
			else return buf.readUInt16BE(i$2 * indexSize);
		}
		let i$1;
		if (dir) {
			let foundIndex = -1;
			for (i$1 = byteOffset; i$1 < arrLength; i$1++) if (read(arr, i$1) === read(val, foundIndex === -1 ? 0 : i$1 - foundIndex)) {
				if (foundIndex === -1) foundIndex = i$1;
				if (i$1 - foundIndex + 1 === valLength) return foundIndex * indexSize;
			} else {
				if (foundIndex !== -1) i$1 -= i$1 - foundIndex;
				foundIndex = -1;
			}
		} else {
			if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
			for (i$1 = byteOffset; i$1 >= 0; i$1--) {
				let found = true;
				for (let j = 0; j < valLength; j++) if (read(arr, i$1 + j) !== read(val, j)) {
					found = false;
					break;
				}
				if (found) return i$1;
			}
		}
		return -1;
	}
	Buffer$4.prototype.includes = function includes(val, byteOffset, encoding) {
		return this.indexOf(val, byteOffset, encoding) !== -1;
	};
	Buffer$4.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
		return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
	};
	Buffer$4.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
		return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
	};
	function hexWrite(buf, string, offset, length) {
		offset = Number(offset) || 0;
		const remaining = buf.length - offset;
		if (!length) length = remaining;
		else {
			length = Number(length);
			if (length > remaining) length = remaining;
		}
		const strLen = string.length;
		if (length > strLen / 2) length = strLen / 2;
		let i$1;
		for (i$1 = 0; i$1 < length; ++i$1) {
			const parsed = parseInt(string.substr(i$1 * 2, 2), 16);
			if (numberIsNaN(parsed)) return i$1;
			buf[offset + i$1] = parsed;
		}
		return i$1;
	}
	function utf8Write(buf, string, offset, length) {
		return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
	}
	function asciiWrite(buf, string, offset, length) {
		return blitBuffer(asciiToBytes(string), buf, offset, length);
	}
	function base64Write(buf, string, offset, length) {
		return blitBuffer(base64ToBytes(string), buf, offset, length);
	}
	function ucs2Write(buf, string, offset, length) {
		return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
	}
	Buffer$4.prototype.write = function write(string, offset, length, encoding) {
		if (offset === void 0) {
			encoding = "utf8";
			length = this.length;
			offset = 0;
		} else if (length === void 0 && typeof offset === "string") {
			encoding = offset;
			length = this.length;
			offset = 0;
		} else if (isFinite(offset)) {
			offset = offset >>> 0;
			if (isFinite(length)) {
				length = length >>> 0;
				if (encoding === void 0) encoding = "utf8";
			} else {
				encoding = length;
				length = void 0;
			}
		} else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
		const remaining = this.length - offset;
		if (length === void 0 || length > remaining) length = remaining;
		if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
		if (!encoding) encoding = "utf8";
		let loweredCase = false;
		for (;;) switch (encoding) {
			case "hex": return hexWrite(this, string, offset, length);
			case "utf8":
			case "utf-8": return utf8Write(this, string, offset, length);
			case "ascii":
			case "latin1":
			case "binary": return asciiWrite(this, string, offset, length);
			case "base64": return base64Write(this, string, offset, length);
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return ucs2Write(this, string, offset, length);
			default:
				if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
				encoding = ("" + encoding).toLowerCase();
				loweredCase = true;
		}
	};
	Buffer$4.prototype.toJSON = function toJSON() {
		return {
			type: "Buffer",
			data: Array.prototype.slice.call(this._arr || this, 0)
		};
	};
	function base64Slice(buf, start, end) {
		if (start === 0 && end === buf.length) return base64.fromByteArray(buf);
		else return base64.fromByteArray(buf.slice(start, end));
	}
	function utf8Slice(buf, start, end) {
		end = Math.min(buf.length, end);
		const res = [];
		let i$1 = start;
		while (i$1 < end) {
			const firstByte = buf[i$1];
			let codePoint = null;
			let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
			if (i$1 + bytesPerSequence <= end) {
				let secondByte, thirdByte, fourthByte, tempCodePoint;
				switch (bytesPerSequence) {
					case 1:
						if (firstByte < 128) codePoint = firstByte;
						break;
					case 2:
						secondByte = buf[i$1 + 1];
						if ((secondByte & 192) === 128) {
							tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
							if (tempCodePoint > 127) codePoint = tempCodePoint;
						}
						break;
					case 3:
						secondByte = buf[i$1 + 1];
						thirdByte = buf[i$1 + 2];
						if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
							tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
							if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) codePoint = tempCodePoint;
						}
						break;
					case 4:
						secondByte = buf[i$1 + 1];
						thirdByte = buf[i$1 + 2];
						fourthByte = buf[i$1 + 3];
						if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
							tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
							if (tempCodePoint > 65535 && tempCodePoint < 1114112) codePoint = tempCodePoint;
						}
				}
			}
			if (codePoint === null) {
				codePoint = 65533;
				bytesPerSequence = 1;
			} else if (codePoint > 65535) {
				codePoint -= 65536;
				res.push(codePoint >>> 10 & 1023 | 55296);
				codePoint = 56320 | codePoint & 1023;
			}
			res.push(codePoint);
			i$1 += bytesPerSequence;
		}
		return decodeCodePointsArray(res);
	}
	const MAX_ARGUMENTS_LENGTH = 4096;
	function decodeCodePointsArray(codePoints) {
		const len$1 = codePoints.length;
		if (len$1 <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
		let res = "";
		let i$1 = 0;
		while (i$1 < len$1) res += String.fromCharCode.apply(String, codePoints.slice(i$1, i$1 += MAX_ARGUMENTS_LENGTH));
		return res;
	}
	function asciiSlice(buf, start, end) {
		let ret = "";
		end = Math.min(buf.length, end);
		for (let i$1 = start; i$1 < end; ++i$1) ret += String.fromCharCode(buf[i$1] & 127);
		return ret;
	}
	function latin1Slice(buf, start, end) {
		let ret = "";
		end = Math.min(buf.length, end);
		for (let i$1 = start; i$1 < end; ++i$1) ret += String.fromCharCode(buf[i$1]);
		return ret;
	}
	function hexSlice(buf, start, end) {
		const len$1 = buf.length;
		if (!start || start < 0) start = 0;
		if (!end || end < 0 || end > len$1) end = len$1;
		let out = "";
		for (let i$1 = start; i$1 < end; ++i$1) out += hexSliceLookupTable[buf[i$1]];
		return out;
	}
	function utf16leSlice(buf, start, end) {
		const bytes = buf.slice(start, end);
		let res = "";
		for (let i$1 = 0; i$1 < bytes.length - 1; i$1 += 2) res += String.fromCharCode(bytes[i$1] + bytes[i$1 + 1] * 256);
		return res;
	}
	Buffer$4.prototype.slice = function slice(start, end) {
		const len$1 = this.length;
		start = ~~start;
		end = end === void 0 ? len$1 : ~~end;
		if (start < 0) {
			start += len$1;
			if (start < 0) start = 0;
		} else if (start > len$1) start = len$1;
		if (end < 0) {
			end += len$1;
			if (end < 0) end = 0;
		} else if (end > len$1) end = len$1;
		if (end < start) end = start;
		const newBuf = this.subarray(start, end);
		Object.setPrototypeOf(newBuf, Buffer$4.prototype);
		return newBuf;
	};
	function checkOffset(offset, ext, length) {
		if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
		if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
	}
	Buffer$4.prototype.readUintLE = Buffer$4.prototype.readUIntLE = function readUIntLE(offset, byteLength$2, noAssert) {
		offset = offset >>> 0;
		byteLength$2 = byteLength$2 >>> 0;
		if (!noAssert) checkOffset(offset, byteLength$2, this.length);
		let val = this[offset];
		let mul = 1;
		let i$1 = 0;
		while (++i$1 < byteLength$2 && (mul *= 256)) val += this[offset + i$1] * mul;
		return val;
	};
	Buffer$4.prototype.readUintBE = Buffer$4.prototype.readUIntBE = function readUIntBE(offset, byteLength$2, noAssert) {
		offset = offset >>> 0;
		byteLength$2 = byteLength$2 >>> 0;
		if (!noAssert) checkOffset(offset, byteLength$2, this.length);
		let val = this[offset + --byteLength$2];
		let mul = 1;
		while (byteLength$2 > 0 && (mul *= 256)) val += this[offset + --byteLength$2] * mul;
		return val;
	};
	Buffer$4.prototype.readUint8 = Buffer$4.prototype.readUInt8 = function readUInt8(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 1, this.length);
		return this[offset];
	};
	Buffer$4.prototype.readUint16LE = Buffer$4.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 2, this.length);
		return this[offset] | this[offset + 1] << 8;
	};
	Buffer$4.prototype.readUint16BE = Buffer$4.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 2, this.length);
		return this[offset] << 8 | this[offset + 1];
	};
	Buffer$4.prototype.readUint32LE = Buffer$4.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
	};
	Buffer$4.prototype.readUint32BE = Buffer$4.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
	};
	Buffer$4.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
		offset = offset >>> 0;
		validateNumber(offset, "offset");
		const first = this[offset];
		const last = this[offset + 7];
		if (first === void 0 || last === void 0) boundsError(offset, this.length - 8);
		const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
		const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
		return BigInt(lo) + (BigInt(hi) << BigInt(32));
	});
	Buffer$4.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
		offset = offset >>> 0;
		validateNumber(offset, "offset");
		const first = this[offset];
		const last = this[offset + 7];
		if (first === void 0 || last === void 0) boundsError(offset, this.length - 8);
		const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
		const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
		return (BigInt(hi) << BigInt(32)) + BigInt(lo);
	});
	Buffer$4.prototype.readIntLE = function readIntLE(offset, byteLength$2, noAssert) {
		offset = offset >>> 0;
		byteLength$2 = byteLength$2 >>> 0;
		if (!noAssert) checkOffset(offset, byteLength$2, this.length);
		let val = this[offset];
		let mul = 1;
		let i$1 = 0;
		while (++i$1 < byteLength$2 && (mul *= 256)) val += this[offset + i$1] * mul;
		mul *= 128;
		if (val >= mul) val -= Math.pow(2, 8 * byteLength$2);
		return val;
	};
	Buffer$4.prototype.readIntBE = function readIntBE(offset, byteLength$2, noAssert) {
		offset = offset >>> 0;
		byteLength$2 = byteLength$2 >>> 0;
		if (!noAssert) checkOffset(offset, byteLength$2, this.length);
		let i$1 = byteLength$2;
		let mul = 1;
		let val = this[offset + --i$1];
		while (i$1 > 0 && (mul *= 256)) val += this[offset + --i$1] * mul;
		mul *= 128;
		if (val >= mul) val -= Math.pow(2, 8 * byteLength$2);
		return val;
	};
	Buffer$4.prototype.readInt8 = function readInt8(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 1, this.length);
		if (!(this[offset] & 128)) return this[offset];
		return (255 - this[offset] + 1) * -1;
	};
	Buffer$4.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 2, this.length);
		const val = this[offset] | this[offset + 1] << 8;
		return val & 32768 ? val | 4294901760 : val;
	};
	Buffer$4.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 2, this.length);
		const val = this[offset + 1] | this[offset] << 8;
		return val & 32768 ? val | 4294901760 : val;
	};
	Buffer$4.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
	};
	Buffer$4.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
	};
	Buffer$4.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
		offset = offset >>> 0;
		validateNumber(offset, "offset");
		const first = this[offset];
		const last = this[offset + 7];
		if (first === void 0 || last === void 0) boundsError(offset, this.length - 8);
		const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
		return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
	});
	Buffer$4.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
		offset = offset >>> 0;
		validateNumber(offset, "offset");
		const first = this[offset];
		const last = this[offset + 7];
		if (first === void 0 || last === void 0) boundsError(offset, this.length - 8);
		const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
		return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
	});
	Buffer$4.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return ieee754.read(this, offset, true, 23, 4);
	};
	Buffer$4.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 4, this.length);
		return ieee754.read(this, offset, false, 23, 4);
	};
	Buffer$4.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 8, this.length);
		return ieee754.read(this, offset, true, 52, 8);
	};
	Buffer$4.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
		offset = offset >>> 0;
		if (!noAssert) checkOffset(offset, 8, this.length);
		return ieee754.read(this, offset, false, 52, 8);
	};
	function checkInt(buf, value, offset, ext, max, min) {
		if (!Buffer$4.isBuffer(buf)) throw new TypeError("\"buffer\" argument must be a Buffer instance");
		if (value > max || value < min) throw new RangeError("\"value\" argument is out of bounds");
		if (offset + ext > buf.length) throw new RangeError("Index out of range");
	}
	Buffer$4.prototype.writeUintLE = Buffer$4.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength$2, noAssert) {
		value = +value;
		offset = offset >>> 0;
		byteLength$2 = byteLength$2 >>> 0;
		if (!noAssert) {
			const maxBytes = Math.pow(2, 8 * byteLength$2) - 1;
			checkInt(this, value, offset, byteLength$2, maxBytes, 0);
		}
		let mul = 1;
		let i$1 = 0;
		this[offset] = value & 255;
		while (++i$1 < byteLength$2 && (mul *= 256)) this[offset + i$1] = value / mul & 255;
		return offset + byteLength$2;
	};
	Buffer$4.prototype.writeUintBE = Buffer$4.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength$2, noAssert) {
		value = +value;
		offset = offset >>> 0;
		byteLength$2 = byteLength$2 >>> 0;
		if (!noAssert) {
			const maxBytes = Math.pow(2, 8 * byteLength$2) - 1;
			checkInt(this, value, offset, byteLength$2, maxBytes, 0);
		}
		let i$1 = byteLength$2 - 1;
		let mul = 1;
		this[offset + i$1] = value & 255;
		while (--i$1 >= 0 && (mul *= 256)) this[offset + i$1] = value / mul & 255;
		return offset + byteLength$2;
	};
	Buffer$4.prototype.writeUint8 = Buffer$4.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
		this[offset] = value & 255;
		return offset + 1;
	};
	Buffer$4.prototype.writeUint16LE = Buffer$4.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
		this[offset] = value & 255;
		this[offset + 1] = value >>> 8;
		return offset + 2;
	};
	Buffer$4.prototype.writeUint16BE = Buffer$4.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
		this[offset] = value >>> 8;
		this[offset + 1] = value & 255;
		return offset + 2;
	};
	Buffer$4.prototype.writeUint32LE = Buffer$4.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
		this[offset + 3] = value >>> 24;
		this[offset + 2] = value >>> 16;
		this[offset + 1] = value >>> 8;
		this[offset] = value & 255;
		return offset + 4;
	};
	Buffer$4.prototype.writeUint32BE = Buffer$4.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
		this[offset] = value >>> 24;
		this[offset + 1] = value >>> 16;
		this[offset + 2] = value >>> 8;
		this[offset + 3] = value & 255;
		return offset + 4;
	};
	function wrtBigUInt64LE(buf, value, offset, min, max) {
		checkIntBI(value, min, max, buf, offset, 7);
		let lo = Number(value & BigInt(4294967295));
		buf[offset++] = lo;
		lo = lo >> 8;
		buf[offset++] = lo;
		lo = lo >> 8;
		buf[offset++] = lo;
		lo = lo >> 8;
		buf[offset++] = lo;
		let hi = Number(value >> BigInt(32) & BigInt(4294967295));
		buf[offset++] = hi;
		hi = hi >> 8;
		buf[offset++] = hi;
		hi = hi >> 8;
		buf[offset++] = hi;
		hi = hi >> 8;
		buf[offset++] = hi;
		return offset;
	}
	function wrtBigUInt64BE(buf, value, offset, min, max) {
		checkIntBI(value, min, max, buf, offset, 7);
		let lo = Number(value & BigInt(4294967295));
		buf[offset + 7] = lo;
		lo = lo >> 8;
		buf[offset + 6] = lo;
		lo = lo >> 8;
		buf[offset + 5] = lo;
		lo = lo >> 8;
		buf[offset + 4] = lo;
		let hi = Number(value >> BigInt(32) & BigInt(4294967295));
		buf[offset + 3] = hi;
		hi = hi >> 8;
		buf[offset + 2] = hi;
		hi = hi >> 8;
		buf[offset + 1] = hi;
		hi = hi >> 8;
		buf[offset] = hi;
		return offset + 8;
	}
	Buffer$4.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
		return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
	});
	Buffer$4.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
		return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
	});
	Buffer$4.prototype.writeIntLE = function writeIntLE(value, offset, byteLength$2, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) {
			const limit = Math.pow(2, 8 * byteLength$2 - 1);
			checkInt(this, value, offset, byteLength$2, limit - 1, -limit);
		}
		let i$1 = 0;
		let mul = 1;
		let sub = 0;
		this[offset] = value & 255;
		while (++i$1 < byteLength$2 && (mul *= 256)) {
			if (value < 0 && sub === 0 && this[offset + i$1 - 1] !== 0) sub = 1;
			this[offset + i$1] = (value / mul >> 0) - sub & 255;
		}
		return offset + byteLength$2;
	};
	Buffer$4.prototype.writeIntBE = function writeIntBE(value, offset, byteLength$2, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) {
			const limit = Math.pow(2, 8 * byteLength$2 - 1);
			checkInt(this, value, offset, byteLength$2, limit - 1, -limit);
		}
		let i$1 = byteLength$2 - 1;
		let mul = 1;
		let sub = 0;
		this[offset + i$1] = value & 255;
		while (--i$1 >= 0 && (mul *= 256)) {
			if (value < 0 && sub === 0 && this[offset + i$1 + 1] !== 0) sub = 1;
			this[offset + i$1] = (value / mul >> 0) - sub & 255;
		}
		return offset + byteLength$2;
	};
	Buffer$4.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
		if (value < 0) value = 255 + value + 1;
		this[offset] = value & 255;
		return offset + 1;
	};
	Buffer$4.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
		this[offset] = value & 255;
		this[offset + 1] = value >>> 8;
		return offset + 2;
	};
	Buffer$4.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
		this[offset] = value >>> 8;
		this[offset + 1] = value & 255;
		return offset + 2;
	};
	Buffer$4.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
		this[offset] = value & 255;
		this[offset + 1] = value >>> 8;
		this[offset + 2] = value >>> 16;
		this[offset + 3] = value >>> 24;
		return offset + 4;
	};
	Buffer$4.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
		if (value < 0) value = 4294967295 + value + 1;
		this[offset] = value >>> 24;
		this[offset + 1] = value >>> 16;
		this[offset + 2] = value >>> 8;
		this[offset + 3] = value & 255;
		return offset + 4;
	};
	Buffer$4.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
		return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
	});
	Buffer$4.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
		return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
	});
	function checkIEEE754(buf, value, offset, ext, max, min) {
		if (offset + ext > buf.length) throw new RangeError("Index out of range");
		if (offset < 0) throw new RangeError("Index out of range");
	}
	function writeFloat(buf, value, offset, littleEndian, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
		ieee754.write(buf, value, offset, littleEndian, 23, 4);
		return offset + 4;
	}
	Buffer$4.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
		return writeFloat(this, value, offset, true, noAssert);
	};
	Buffer$4.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
		return writeFloat(this, value, offset, false, noAssert);
	};
	function writeDouble(buf, value, offset, littleEndian, noAssert) {
		value = +value;
		offset = offset >>> 0;
		if (!noAssert) checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
		ieee754.write(buf, value, offset, littleEndian, 52, 8);
		return offset + 8;
	}
	Buffer$4.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
		return writeDouble(this, value, offset, true, noAssert);
	};
	Buffer$4.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
		return writeDouble(this, value, offset, false, noAssert);
	};
	Buffer$4.prototype.copy = function copy(target, targetStart, start, end) {
		if (!Buffer$4.isBuffer(target)) throw new TypeError("argument should be a Buffer");
		if (!start) start = 0;
		if (!end && end !== 0) end = this.length;
		if (targetStart >= target.length) targetStart = target.length;
		if (!targetStart) targetStart = 0;
		if (end > 0 && end < start) end = start;
		if (end === start) return 0;
		if (target.length === 0 || this.length === 0) return 0;
		if (targetStart < 0) throw new RangeError("targetStart out of bounds");
		if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
		if (end < 0) throw new RangeError("sourceEnd out of bounds");
		if (end > this.length) end = this.length;
		if (target.length - targetStart < end - start) end = target.length - targetStart + start;
		const len$1 = end - start;
		if (this === target && typeof Uint8Array.prototype.copyWithin === "function") this.copyWithin(targetStart, start, end);
		else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
		return len$1;
	};
	Buffer$4.prototype.fill = function fill(val, start, end, encoding) {
		if (typeof val === "string") {
			if (typeof start === "string") {
				encoding = start;
				start = 0;
				end = this.length;
			} else if (typeof end === "string") {
				encoding = end;
				end = this.length;
			}
			if (encoding !== void 0 && typeof encoding !== "string") throw new TypeError("encoding must be a string");
			if (typeof encoding === "string" && !Buffer$4.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
			if (val.length === 1) {
				const code$1 = val.charCodeAt(0);
				if (encoding === "utf8" && code$1 < 128 || encoding === "latin1") val = code$1;
			}
		} else if (typeof val === "number") val = val & 255;
		else if (typeof val === "boolean") val = Number(val);
		if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
		if (end <= start) return this;
		start = start >>> 0;
		end = end === void 0 ? this.length : end >>> 0;
		if (!val) val = 0;
		let i$1;
		if (typeof val === "number") for (i$1 = start; i$1 < end; ++i$1) this[i$1] = val;
		else {
			const bytes = Buffer$4.isBuffer(val) ? val : Buffer$4.from(val, encoding);
			const len$1 = bytes.length;
			if (len$1 === 0) throw new TypeError("The value \"" + val + "\" is invalid for argument \"value\"");
			for (i$1 = 0; i$1 < end - start; ++i$1) this[i$1 + start] = bytes[i$1 % len$1];
		}
		return this;
	};
	const errors = {};
	function E(sym, getMessage, Base) {
		errors[sym] = class NodeError extends Base {
			constructor() {
				super();
				Object.defineProperty(this, "message", {
					value: getMessage.apply(this, arguments),
					writable: true,
					configurable: true
				});
				this.name = `${this.name} [${sym}]`;
				this.stack;
				delete this.name;
			}
			get code() {
				return sym;
			}
			set code(value) {
				Object.defineProperty(this, "code", {
					configurable: true,
					enumerable: true,
					value,
					writable: true
				});
			}
			toString() {
				return `${this.name} [${sym}]: ${this.message}`;
			}
		};
	}
	E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
		if (name) return `${name} is outside of buffer bounds`;
		return "Attempt to access memory outside buffer bounds";
	}, RangeError);
	E("ERR_INVALID_ARG_TYPE", function(name, actual) {
		return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
	}, TypeError);
	E("ERR_OUT_OF_RANGE", function(str, range, input) {
		let msg = `The value of "${str}" is out of range.`;
		let received = input;
		if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) received = addNumericalSeparator(String(input));
		else if (typeof input === "bigint") {
			received = String(input);
			if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) received = addNumericalSeparator(received);
			received += "n";
		}
		msg += ` It must be ${range}. Received ${received}`;
		return msg;
	}, RangeError);
	function addNumericalSeparator(val) {
		let res = "";
		let i$1 = val.length;
		const start = val[0] === "-" ? 1 : 0;
		for (; i$1 >= start + 4; i$1 -= 3) res = `_${val.slice(i$1 - 3, i$1)}${res}`;
		return `${val.slice(0, i$1)}${res}`;
	}
	function checkBounds(buf, offset, byteLength$2) {
		validateNumber(offset, "offset");
		if (buf[offset] === void 0 || buf[offset + byteLength$2] === void 0) boundsError(offset, buf.length - (byteLength$2 + 1));
	}
	function checkIntBI(value, min, max, buf, offset, byteLength$2) {
		if (value > max || value < min) {
			const n = typeof min === "bigint" ? "n" : "";
			let range;
			if (byteLength$2 > 3) if (min === 0 || min === BigInt(0)) range = `>= 0${n} and < 2${n} ** ${(byteLength$2 + 1) * 8}${n}`;
			else range = `>= -(2${n} ** ${(byteLength$2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength$2 + 1) * 8 - 1}${n}`;
			else range = `>= ${min}${n} and <= ${max}${n}`;
			throw new errors.ERR_OUT_OF_RANGE("value", range, value);
		}
		checkBounds(buf, offset, byteLength$2);
	}
	function validateNumber(value, name) {
		if (typeof value !== "number") throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
	}
	function boundsError(value, length, type) {
		if (Math.floor(value) !== value) {
			validateNumber(value, type);
			throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
		}
		if (length < 0) throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
		throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
	}
	const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
	function base64clean(str) {
		str = str.split("=")[0];
		str = str.trim().replace(INVALID_BASE64_RE, "");
		if (str.length < 2) return "";
		while (str.length % 4 !== 0) str = str + "=";
		return str;
	}
	function utf8ToBytes(string, units) {
		units = units || Infinity;
		let codePoint;
		const length = string.length;
		let leadSurrogate = null;
		const bytes = [];
		for (let i$1 = 0; i$1 < length; ++i$1) {
			codePoint = string.charCodeAt(i$1);
			if (codePoint > 55295 && codePoint < 57344) {
				if (!leadSurrogate) {
					if (codePoint > 56319) {
						if ((units -= 3) > -1) bytes.push(239, 191, 189);
						continue;
					} else if (i$1 + 1 === length) {
						if ((units -= 3) > -1) bytes.push(239, 191, 189);
						continue;
					}
					leadSurrogate = codePoint;
					continue;
				}
				if (codePoint < 56320) {
					if ((units -= 3) > -1) bytes.push(239, 191, 189);
					leadSurrogate = codePoint;
					continue;
				}
				codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
			} else if (leadSurrogate) {
				if ((units -= 3) > -1) bytes.push(239, 191, 189);
			}
			leadSurrogate = null;
			if (codePoint < 128) {
				if ((units -= 1) < 0) break;
				bytes.push(codePoint);
			} else if (codePoint < 2048) {
				if ((units -= 2) < 0) break;
				bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
			} else if (codePoint < 65536) {
				if ((units -= 3) < 0) break;
				bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
			} else if (codePoint < 1114112) {
				if ((units -= 4) < 0) break;
				bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
			} else throw new Error("Invalid code point");
		}
		return bytes;
	}
	function asciiToBytes(str) {
		const byteArray = [];
		for (let i$1 = 0; i$1 < str.length; ++i$1) byteArray.push(str.charCodeAt(i$1) & 255);
		return byteArray;
	}
	function utf16leToBytes(str, units) {
		let c, hi, lo;
		const byteArray = [];
		for (let i$1 = 0; i$1 < str.length; ++i$1) {
			if ((units -= 2) < 0) break;
			c = str.charCodeAt(i$1);
			hi = c >> 8;
			lo = c % 256;
			byteArray.push(lo);
			byteArray.push(hi);
		}
		return byteArray;
	}
	function base64ToBytes(str) {
		return base64.toByteArray(base64clean(str));
	}
	function blitBuffer(src, dst, offset, length) {
		let i$1;
		for (i$1 = 0; i$1 < length; ++i$1) {
			if (i$1 + offset >= dst.length || i$1 >= src.length) break;
			dst[i$1 + offset] = src[i$1];
		}
		return i$1;
	}
	function isInstance(obj, type) {
		return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
	}
	function numberIsNaN(obj) {
		return obj !== obj;
	}
	const hexSliceLookupTable = (function() {
		const alphabet = "0123456789abcdef";
		const table = new Array(256);
		for (let i$1 = 0; i$1 < 16; ++i$1) {
			const i16 = i$1 * 16;
			for (let j = 0; j < 16; ++j) table[i16 + j] = alphabet[i$1] + alphabet[j];
		}
		return table;
	})();
	function defineBigIntMethod(fn) {
		return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
	}
	function BufferBigIntNotDefined() {
		throw new Error("BigInt not supported");
	}
}) });

//#endregion
//#region ../../node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js
var require_safe_buffer = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js": ((exports, module) => {
	/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	var buffer = require_buffer();
	var Buffer$3 = buffer.Buffer;
	function copyProps(src, dst) {
		for (var key in src) dst[key] = src[key];
	}
	if (Buffer$3.from && Buffer$3.alloc && Buffer$3.allocUnsafe && Buffer$3.allocUnsafeSlow) module.exports = buffer;
	else {
		copyProps(buffer, exports);
		exports.Buffer = SafeBuffer;
	}
	function SafeBuffer(arg, encodingOrOffset, length) {
		return Buffer$3(arg, encodingOrOffset, length);
	}
	SafeBuffer.prototype = Object.create(Buffer$3.prototype);
	copyProps(Buffer$3, SafeBuffer);
	SafeBuffer.from = function(arg, encodingOrOffset, length) {
		if (typeof arg === "number") throw new TypeError("Argument must not be a number");
		return Buffer$3(arg, encodingOrOffset, length);
	};
	SafeBuffer.alloc = function(size, fill, encoding) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		var buf = Buffer$3(size);
		if (fill !== void 0) if (typeof encoding === "string") buf.fill(fill, encoding);
		else buf.fill(fill);
		else buf.fill(0);
		return buf;
	};
	SafeBuffer.allocUnsafe = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return Buffer$3(size);
	};
	SafeBuffer.allocUnsafeSlow = function(size) {
		if (typeof size !== "number") throw new TypeError("Argument must be a number");
		return buffer.SlowBuffer(size);
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/randombytes@2.1.0/node_modules/randombytes/browser.js
var require_browser = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/randombytes@2.1.0/node_modules/randombytes/browser.js": ((exports, module) => {
	var MAX_BYTES = 65536;
	var MAX_UINT32 = 4294967295;
	function oldBrowser() {
		throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11");
	}
	var Buffer$2 = require_safe_buffer().Buffer;
	var crypto = globalThis.crypto || globalThis.msCrypto;
	if (crypto && crypto.getRandomValues) module.exports = randomBytes;
	else module.exports = oldBrowser;
	function randomBytes(size, cb) {
		if (size > MAX_UINT32) throw new RangeError("requested too many random bytes");
		var bytes = Buffer$2.allocUnsafe(size);
		if (size > 0) if (size > MAX_BYTES) for (var generated = 0; generated < size; generated += MAX_BYTES) crypto.getRandomValues(bytes.slice(generated, generated + MAX_BYTES));
		else crypto.getRandomValues(bytes);
		if (typeof cb === "function") return process.nextTick(function() {
			cb(null, bytes);
		});
		return bytes;
	}
}) });

//#endregion
//#region src/utils/SPACryptoUtils.ts
var import_buffer = /* @__PURE__ */ __toESM(require_buffer(), 1);
var import_browser = /* @__PURE__ */ __toESM(require_browser(), 1);
/**
* Browser-side `Crypto` implementation using native Web Crypto APIs and `jose` for JWT verification.
*/
var SPACryptoUtils = class {
	/**
	* Base64URL-encodes a buffer or string value.
	*
	* @param value - The value to encode.
	* @returns The base64url-encoded string with padding stripped.
	*/
	base64URLEncode(value) {
		return base64url.encode(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
	}
	/**
	* Decodes a base64url-encoded string.
	*
	* @param value - The base64url string to decode.
	* @returns The decoded UTF-8 string.
	*/
	base64URLDecode(value) {
		return base64url.decode(value).toString();
	}
	/**
	* Computes the SHA-256 hash of a string.
	*
	* @param data - The input string to hash.
	* @returns A `Buffer` containing the raw hash bytes.
	*/
	hashSha256(data) {
		return import_buffer.Buffer.from(sha256(new TextEncoder().encode(data)));
	}
	/**
	* Generates a buffer of cryptographically random bytes.
	*
	* @param length - Number of bytes to generate.
	* @returns A `Buffer` of random bytes.
	*/
	generateRandomBytes(length) {
		return (0, import_browser.default)(length);
	}
	/**
	* Verifies a JWT against a JWK using `jose`.
	*
	* @param idToken - The raw JWT string.
	* @param jwk - The JSON Web Key to verify against.
	* @param algorithms - Allowed signature algorithms (e.g., `['RS256']`).
	* @param clientId - Expected audience claim value.
	* @param issuer - Expected issuer claim value.
	* @param subject - Expected subject claim value.
	* @param clockTolerance - Allowed clock skew in seconds.
	* @param validateJwtIssuer - Whether to validate the issuer claim.
	* @returns `true` if the token is valid.
	*/
	verifyJwt(idToken, jwk, algorithms, clientId, issuer, subject, clockTolerance, validateJwtIssuer) {
		const jwtVerifyOptions = {
			algorithms,
			audience: [clientId],
			clockTolerance,
			subject
		};
		if (validateJwtIssuer ?? true) jwtVerifyOptions.issuer = issuer;
		return jwtVerify(idToken, createLocalJWKSet({ keys: [jwk] }), jwtVerifyOptions).then(() => {
			return Promise.resolve(true);
		}).catch((error) => {
			return Promise.reject(new ThunderIDAuthException("SPA-CRYPTO-UTILS-VJ-IV01", error?.reason ?? JSON.stringify(error), `${error?.code} ${error?.claim}`));
		});
	}
};
var SPACryptoUtils_default = SPACryptoUtils;

//#endregion
//#region src/utils/SPAHelper.ts
/**
* Helper that manages automatic access-token refresh scheduling via `setTimeout`.
*
* @typeParam T - Browser client config type.
*/
var SPAHelper = class {
	_storageManager;
	_isTokenRefreshLoading = false;
	/**
	* @param storageManager - The storage manager instance used to read config and session data.
	*/
	constructor(storageManager) {
		this._storageManager = storageManager;
	}
	/**
	* Schedules an automatic access-token refresh if `periodicTokenRefresh` is enabled in config.
	* No-op if the feature is disabled or there is no refresh token.
	*
	* @param refreshAccessToken - Async callback that performs the refresh.
	*/
	async refreshAccessTokenAutomatically(refreshAccessToken) {
		if (!((await this._storageManager.getConfigData())?.periodicTokenRefresh ?? false)) return;
		const sessionData = await this._storageManager.getSessionData();
		if (sessionData?.refresh_token) {
			if (sessionData.created_at == null || sessionData.expires_in == null) return;
			const TOKEN_REFRESH_BUFFER_MS = 1e4;
			const expiryTime = Number(sessionData.expires_in) * 1e3;
			const timeUntilRefresh = sessionData.created_at + expiryTime - Date.now() - TOKEN_REFRESH_BUFFER_MS;
			if (timeUntilRefresh <= 0) {
				if (this._isTokenRefreshLoading) return;
				this._isTokenRefreshLoading = true;
				try {
					await refreshAccessToken();
				} finally {
					this._isTokenRefreshLoading = false;
				}
				return;
			}
			const timer = setTimeout(async () => {
				if (this._isTokenRefreshLoading) return;
				this._isTokenRefreshLoading = true;
				try {
					await refreshAccessToken();
				} finally {
					this._isTokenRefreshLoading = false;
				}
			}, timeUntilRefresh);
			await this._storageManager.setTemporaryDataParameter(TokenConstants.Storage.StorageKeys.REFRESH_TOKEN_TIMER, JSON.stringify(timer));
		}
	}
	/**
	* Returns the current refresh timer ID from storage, or `-1` if none is set.
	*/
	async getRefreshTimeoutTimer() {
		const raw = await this._storageManager.getTemporaryDataParameter(TokenConstants.Storage.StorageKeys.REFRESH_TOKEN_TIMER);
		if (raw) return JSON.parse(raw);
		return -1;
	}
	/**
	* Clears the automatic-refresh timer.
	*
	* @param timer - Timer ID to clear. If omitted, the stored timer ID is used.
	*/
	async clearRefreshTokenTimeout(timer) {
		if (timer) {
			clearTimeout(timer);
			return;
		}
		const refreshTimer = await this.getRefreshTimeoutTimer();
		if (refreshTimer !== -1) clearTimeout(refreshTimer);
	}
};
var SPAHelper_default = SPAHelper;

//#endregion
//#region src/ThunderIDBrowserClient.ts
const logger$2 = createPackageComponentLogger("@thunderid/browser", "ThunderIDBrowserClient");
const BROWSER_DEFAULT_CONFIG = {
	autoLogoutOnTokenRefreshError: false,
	checkSessionInterval: 3,
	periodicTokenRefresh: false,
	sessionRefreshInterval: 300,
	syncSession: false
};
const initiateStore = (storage) => {
	switch (storage) {
		case BrowserStorage_default.LocalStorage:
		case "localStorage": return new LocalStore_default();
		case BrowserStorage_default.BrowserMemory:
		case "browserMemory": return new MemoryStore_default();
		default: return new SessionStore_default();
	}
};
var ThunderIDBrowserClient = class ThunderIDBrowserClient extends ThunderIDJavaScriptClient {
	_browserInstanceId = 0;
	_httpClient;
	_spaHelper;
	_sessionManagementHelper;
	_authHelper;
	_storage = BrowserStorage_default.SessionStorage;
	_getSignOutURLFromSessionStorage = false;
	_isHttpHandlerEnabled = true;
	_httpErrorCallback;
	_httpFinishCallback;
	_onSignInCallback = () => null;
	_onSignOutCallback = () => null;
	_onSignOutFailedCallback = () => null;
	_onEndUserSession = () => null;
	_onInitialize = () => null;
	_onCustomGrant = /* @__PURE__ */ new Map();
	_initialized = false;
	_startedInitialize = false;
	constructor(instanceId = 0) {
		super(void 0, new SPACryptoUtils_default());
		this._browserInstanceId = instanceId;
	}
	async initialize(config, storage) {
		this._startedInitialize = true;
		this._initialized = false;
		const configAny = config;
		this._storage = configAny.storage ?? BrowserStorage_default.SessionStorage;
		const merged = {
			afterSignInUrl: window.location.origin,
			afterSignOutUrl: window.location.origin,
			...BROWSER_DEFAULT_CONFIG,
			...configAny,
			instanceId: this._browserInstanceId
		};
		const store = storage ?? initiateStore(this._storage);
		await super.initialize(merged, store);
		const sm = this.getStorageManager();
		this._spaHelper = new SPAHelper_default(sm);
		const attachToken = async (request) => {
			await this._authHelper?.attachTokenToRequestConfig(request);
		};
		this._httpClient = FetchHttpClient_default.getInstance(this._browserInstanceId, true, attachToken);
		this._sessionManagementHelper = await SessionManagementHelper_default(async () => this.getSignOutUrl(), (sessionState) => sm.setSessionDataParameter(OIDCRequestConstants.Params.SESSION_STATE, sessionState));
		this._authHelper = new AuthenticationHelper_default(sm, this._spaHelper, this._browserInstanceId, {
			exchangeToken: (cfg) => super.exchangeToken(cfg),
			getAccessToken: (sessionId) => this.getAccessToken(sessionId),
			getCrypto: async () => this.getCryptoHelper(),
			getDecodedIdToken: (sessionId) => this.getDecodedIdToken(sessionId),
			getIDPAccessToken: async () => (await sm.getSessionData())?.access_token,
			getIdToken: () => this.getIdToken(),
			getOpenIDProviderEndpoints: async () => this.getOpenIDProviderEndpoints(),
			getUser: () => this.getUser(),
			isSignedIn: () => this.isSignedIn(),
			refreshAccessToken: () => super.refreshAccessToken(),
			setPKCECode: (pkceKey, state) => this.setPKCECode(pkceKey, state)
		});
		this._initialized = true;
		if (this._onInitialize) this._onInitialize(true);
		if (!merged.autoLogoutOnTokenRefreshError) return true;
		window.addEventListener("message", (event) => {
			if (event?.data?.type === REFRESH_ACCESS_TOKEN_ERR0R) this.signOut();
		});
		return true;
	}
	async isInitialized() {
		if (!this._startedInitialize) return false;
		const sleep = () => new Promise((resolve) => setTimeout(resolve, 1));
		let iterations = 0;
		while (!this._initialized) {
			if (iterations === 1e4) logger$2.warn("Initialization is taking longer than expected");
			await sleep();
			iterations++;
		}
		return true;
	}
	async _validateMethod(validateAuthentication = true) {
		if (!await this.isInitialized()) return Promise.reject(new ThunderIDAuthException("SPA-AUTH_CLIENT-VM-NF01", "The SDK is not initialized.", "The SDK must be initialized first."));
		if (validateAuthentication && !await this.isSignedIn()) return Promise.reject(new ThunderIDAuthException("SPA-AUTH_CLIENT-VM-IV02", "The user is not authenticated.", "The user must be authenticated first."));
		return true;
	}
	isLoading() {
		return false;
	}
	async signIn(config, authorizationCode, sessionState, state, tokenRequestConfig) {
		await this.isInitialized();
		if (!SPAUtils_default.canContinueSignIn(Boolean(config?.callOnlyOnRedirect), authorizationCode)) return;
		delete config?.callOnlyOnRedirect;
		const user = await this._signInInternal(config, authorizationCode, sessionState, state, tokenRequestConfig);
		if (user && this._onSignInCallback) this._onSignInCallback(user);
		return user;
	}
	async _signInInternal(signInConfig, authorizationCode, sessionState, state, tokenRequestConfig) {
		const sm = this.getStorageManager();
		const config = await sm.getConfigData();
		const basicUserInfo = await this._authHelper.handleSignIn(() => this._shouldStopAuthn(), () => this._checkSession());
		if (basicUserInfo) return basicUserInfo;
		let resolvedAuthorizationCode;
		let resolvedSessionState;
		let resolvedState;
		let resolvedTokenRequestConfig = { params: {} };
		if (config?.responseMode === "form_post" && authorizationCode) {
			resolvedAuthorizationCode = authorizationCode;
			resolvedSessionState = sessionState ?? "";
			resolvedState = state ?? "";
		} else {
			resolvedAuthorizationCode = new URL(window.location.href).searchParams.get(OIDCRequestConstants.Params.AUTHORIZATION_CODE) ?? "";
			resolvedSessionState = new URL(window.location.href).searchParams.get(OIDCRequestConstants.Params.SESSION_STATE) ?? "";
			resolvedState = new URL(window.location.href).searchParams.get(OIDCRequestConstants.Params.STATE) ?? "";
			SPAUtils_default.removeAuthorizationCode();
		}
		if (resolvedAuthorizationCode && resolvedState) {
			sm.setSessionStatus("true");
			const storedTokenRequestConfig = await sm.getTemporaryDataParameter(TOKEN_REQUEST_CONFIG_KEY);
			if (storedTokenRequestConfig && typeof storedTokenRequestConfig === "string") resolvedTokenRequestConfig = JSON.parse(storedTokenRequestConfig);
			return this._exchangeCodeForTokens(resolvedAuthorizationCode, resolvedSessionState, resolvedState, resolvedTokenRequestConfig);
		}
		return this.getSignInUrl(signInConfig).then(async (url) => {
			if (this._storage === BrowserStorage_default.BrowserMemory && config.enablePKCE) {
				const pkceKey = extractPkceStorageKeyFromState(resolvedState);
				SPAUtils_default.setPKCE(pkceKey, await this.getPKCECode(resolvedState));
			}
			if (tokenRequestConfig) sm.setTemporaryDataParameter(TOKEN_REQUEST_CONFIG_KEY, JSON.stringify(tokenRequestConfig));
			if (signInConfig?.response_mode === "direct") {
				const authorizeUrl = new URL(url);
				return initializeEmbeddedSignInFlow({
					url: `${authorizeUrl.origin}${authorizeUrl.pathname}`,
					payload: Object.fromEntries(authorizeUrl.searchParams.entries())
				});
			}
			location.href = url;
			await SPAUtils_default.waitTillPageRedirect();
			return {
				allowedScopes: "",
				displayName: "",
				email: "",
				sessionState: "",
				sub: "",
				tenantDomain: "",
				username: ""
			};
		});
	}
	async _exchangeCodeForTokens(authorizationCode, sessionState, state, tokenRequestConfig) {
		const config = await this.getStorageManager().getConfigData();
		if (this._storage === BrowserStorage_default.BrowserMemory && config.enablePKCE && sessionState) {
			const pkceKey = extractPkceStorageKeyFromState(sessionState);
			const pkce = SPAUtils_default.getPKCE(pkceKey);
			await this.setPKCECode(pkce, pkceKey);
		}
		await this.requestAccessToken(authorizationCode, sessionState ?? "", state ?? "", void 0, tokenRequestConfig);
		try {
			const signOutUrl = await this.getSignOutUrl();
			SPAUtils_default.setSignOutURL(signOutUrl, config.clientId, this._browserInstanceId);
		} catch {}
		await this._spaHelper.clearRefreshTokenTimeout();
		await this._spaHelper.refreshAccessTokenAutomatically(() => this.refreshAccessToken());
		if (config.syncSession) this._checkSession();
		return this.getUser();
	}
	async signInSilently(additionalParams, tokenRequestConfig) {
		await this.isInitialized();
		if (SPAUtils_default.wasSignInCalled()) return;
		const response = await this._authHelper.signInSilently((params) => this._constructSilentSignInUrl(params), (code$1, ss, s, trc) => this._exchangeCodeForTokens(code$1, ss, s, trc), this._sessionManagementHelper, additionalParams, tokenRequestConfig);
		if (this._onSignInCallback && response) this._onSignInCallback(response);
		return response;
	}
	async signOut(_options, sessionIdOrAfterSignOut, afterSignOutParam) {
		let afterSignOut;
		if (typeof sessionIdOrAfterSignOut === "function") afterSignOut = sessionIdOrAfterSignOut;
		else if (typeof sessionIdOrAfterSignOut === "string") afterSignOut = afterSignOutParam;
		const config = await this.getStorageManager().getConfigData();
		this.clearSession();
		if (config?.signInUrl) navigate_default(config.signInUrl);
		else this.signIn(config?.signInOptions);
		afterSignOut?.(config?.afterSignOutUrl || "");
		return config?.afterSignOutUrl || "";
	}
	async httpRequest(requestConfig) {
		await this._validateMethod(false);
		return this._authHelper.httpRequest(this._httpClient, requestConfig, this._isHttpHandlerEnabled, this._httpErrorCallback, this._httpFinishCallback);
	}
	async httpRequestAll(configs) {
		await this._validateMethod(false);
		return this._authHelper.httpRequestAll(configs, this._httpClient, this._isHttpHandlerEnabled, this._httpErrorCallback, this._httpFinishCallback);
	}
	async getUser(userId) {
		await this._validateMethod();
		return super.getUser(userId);
	}
	async getAccessToken(sessionId) {
		return super.getAccessToken(sessionId);
	}
	async getDecodedIdToken(userId, idToken) {
		await this._validateMethod();
		return super.getDecodedIdToken(userId, idToken);
	}
	async getIdToken(userId) {
		await this._validateMethod();
		return super.getIdToken(userId);
	}
	async getOpenIDProviderEndpoints() {
		await this.isInitialized();
		return super.getOpenIDProviderEndpoints();
	}
	async getCrypto() {
		await this._validateMethod();
		return this.getCryptoHelper();
	}
	getHttpClient() {
		if (!this._httpClient) throw new ThunderIDAuthException("SPA-AUTH_CLIENT-GHC-NF02", "The SDK is not initialized.", "Call initialize() before getHttpClient().");
		return this._httpClient;
	}
	async isSignedIn(userId) {
		await this.isInitialized();
		return super.isSignedIn(userId);
	}
	notifySignIn(user) {
		this._onSignInCallback(user);
	}
	async isSessionActive() {
		await this.isInitialized();
		return await this.getStorageManager().getSessionStatus() === "true";
	}
	async refreshAccessToken(userId) {
		await this._validateMethod(false);
		try {
			return await this._authHelper.refreshAccessToken((cfg) => this._enableRetrievingSignOutURLFromSession(cfg));
		} catch (error) {
			return Promise.reject(error);
		}
	}
	async revokeAccessToken(userId) {
		await this._validateMethod();
		const timer = await this._spaHelper.getRefreshTimeoutTimer();
		await super.revokeAccessToken(userId);
		this._sessionManagementHelper?.reset();
		await this._spaHelper.clearRefreshTokenTimeout(timer);
		this._onEndUserSession && await this._onEndUserSession(true);
		return true;
	}
	async exchangeToken(config) {
		if (config.signInRequired) await this._validateMethod();
		if (!config.id) return Promise.reject(new ThunderIDAuthException("SPA-AUTH_CLIENT-RCG-NF01", "The custom grant request id not found.", "Set the `id` attribute on the token exchange config."));
		const response = await this._authHelper.exchangeToken(config, (cfg) => this._enableRetrievingSignOutURLFromSession(cfg));
		this._onCustomGrant.get(config.id)?.(response);
		return response;
	}
	async reInitialize(config) {
		await this.isInitialized();
		const existingConfig = await this.getStorageManager().getConfigData();
		const isCheckSessionIframeDifferent = !(existingConfig?.endpoints?.checkSessionIframe && config?.endpoints?.checkSessionIframe && existingConfig.endpoints.checkSessionIframe === config.endpoints.checkSessionIframe);
		const result = await super.reInitialize(config);
		if ({
			...existingConfig,
			...config
		}.syncSession && isCheckSessionIframeDifferent) {
			this._sessionManagementHelper?.reset();
			this._checkSession();
		}
		return result;
	}
	async startAutoRefreshToken() {
		await this.isInitialized();
		await this._spaHelper.clearRefreshTokenTimeout();
		await this._spaHelper.refreshAccessTokenAutomatically(() => this.refreshAccessToken());
	}
	async enableHttpHandler() {
		await this.isInitialized();
		this._authHelper?.enableHttpHandler(this._httpClient);
		this._isHttpHandlerEnabled = true;
		return true;
	}
	async disableHttpHandler() {
		await this.isInitialized();
		this._authHelper?.disableHttpHandler(this._httpClient);
		this._isHttpHandlerEnabled = false;
		return true;
	}
	async decodeJwtToken(token) {
		return this.getCryptoHelper().decodeJwtToken(token);
	}
	async on(hook, callback, id) {
		await this.isInitialized();
		if (!callback || typeof callback !== "function") throw new ThunderIDAuthException("SPA-AUTH_CLIENT-ON-IV02", "Invalid callback function.", "The provided callback must be a function.");
		switch (hook) {
			case "sign-in":
				this._onSignInCallback = callback;
				break;
			case "sign-out":
				this._onSignOutCallback = callback;
				if (await SPAUtils_default.isSignOutSuccessful(ThunderIDBrowserClient.isSignOutSuccessful.bind(ThunderIDBrowserClient), () => ThunderIDBrowserClient.clearSession())) this._onSignOutCallback();
				break;
			case "revoke-access-token":
				this._onEndUserSession = callback;
				break;
			case "initialize":
				this._onInitialize = callback;
				break;
			case "http-request-error":
				this._httpErrorCallback = callback;
				break;
			case "http-request-finish":
				this._httpFinishCallback = callback;
				break;
			case "http-request-start":
				this._httpClient?.setHttpRequestStartCallback?.(callback);
				break;
			case "http-request-success":
				this._httpClient?.setHttpRequestSuccessCallback?.(callback);
				break;
			case "custom-grant":
				id && this._onCustomGrant.set(id, callback);
				break;
			case "sign-out-failed": {
				this._onSignOutFailedCallback = callback;
				const signOutFail = SPAUtils_default.didSignOutFail(ThunderIDBrowserClient.didSignOutFail.bind(ThunderIDBrowserClient));
				if (signOutFail) this._onSignOutFailedCallback(signOutFail);
				break;
			}
			default: throw new ThunderIDAuthException("SPA-AUTH_CLIENT-ON-IV01", "Invalid hook.", `Unknown hook: "${hook}"`);
		}
	}
	async _checkSession() {
		const oidcEndpoints = await this.getOpenIDProviderEndpoints();
		const sm = this.getStorageManager();
		const config = await sm.getConfigData();
		this._authHelper.initializeSessionManger(config, oidcEndpoints, async () => (await sm.getSessionData())?.session_state ?? "", async (params) => this.getSignInUrl(params), this._sessionManagementHelper);
	}
	async _shouldStopAuthn() {
		const sm = this.getStorageManager();
		return this._sessionManagementHelper.receivePromptNoneResponse(async (sessionState) => {
			await sm.setSessionDataParameter(OIDCRequestConstants.Params.SESSION_STATE, sessionState ?? "");
		});
	}
	_enableRetrievingSignOutURLFromSession(config) {
		if (config.preventSignOutURLUpdate) this._getSignOutURLFromSessionStorage = true;
	}
	async _constructSilentSignInUrl(additionalParams = {}) {
		const config = await this.getStorageManager().getConfigData();
		const urlString = await this.getSignInUrl({
			prompt: "none",
			state: SILENT_SIGN_IN_STATE,
			...additionalParams
		});
		const urlObject = new URL(urlString);
		urlObject.searchParams.set("response_mode", "query");
		if (this._storage === BrowserStorage_default.BrowserMemory && config.enablePKCE) {
			const state = urlObject.searchParams.get(OIDCRequestConstants.Params.STATE);
			SPAUtils_default.setPKCE(extractPkceStorageKeyFromState(state ?? ""), await this.getPKCECode(state ?? ""));
		}
		return urlObject.toString();
	}
	getInstanceId() {
		return this._browserInstanceId;
	}
	static async clearSession() {}
};
var ThunderIDBrowserClient_default = ThunderIDBrowserClient;

//#endregion
//#region src/constants/Hooks.ts
/**
* Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
* Event hook names for attaching callbacks via `ThunderIDBrowserClient.on()`.
*/
let Hooks = /* @__PURE__ */ function(Hooks$1) {
	Hooks$1["SignIn"] = "sign-in";
	Hooks$1["SignOut"] = "sign-out";
	Hooks$1["Initialize"] = "initialize";
	Hooks$1["HttpRequestStart"] = "http-request-start";
	Hooks$1["HttpRequestFinish"] = "http-request-finish";
	Hooks$1["HttpRequestError"] = "http-request-error";
	Hooks$1["HttpRequestSuccess"] = "http-request-success";
	Hooks$1["RevokeAccessToken"] = "revoke-access-token";
	Hooks$1["CustomGrant"] = "custom-grant";
	Hooks$1["SignOutFailed"] = "sign-out-failed";
	return Hooks$1;
}({});
var Hooks_default = Hooks;

//#endregion
//#region src/utils/hasAuthParamsInUrl.ts
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
* Utility to check if `code` and `session_state` are available in the URL as search params.
*
* @param params - The URL search params to check. Defaults to `window.location.search`.
* @return `true` if the URL contains `code` and `session_state` search params, otherwise `false`.
*/
const hasAuthParamsInUrl = (params = window.location.search) => {
	return /[?&]code=[^&]+/.test(params);
};
var hasAuthParamsInUrl_default = hasAuthParamsInUrl;

//#endregion
//#region src/utils/hasCalledForThisInstanceInUrl.ts
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
* Utility to check if `state` is available in the URL as a search param and matches the provided instance.
*
* @param params - The URL search params to check. Defaults to `window.location.search`.
* @param instanceId - The instance ID to match against the `state` param.
* @return `true` if the URL contains a matching `state` search param, otherwise `false`.
*/
const hasCalledForThisInstanceInUrl = (instanceId, params = window.location.search) => {
	return (/* @__PURE__ */ new RegExp(`[?&]state=instance_${instanceId}_[^&]+`)).test(params);
};
var hasCalledForThisInstanceInUrl_default = hasCalledForThisInstanceInUrl;

//#endregion
//#region src/utils/http.ts
/**
* Creates an HTTP utility for making authenticated requests using a `ThunderIDBrowserClient` instance.
*
* @param client - The browser client instance to use for requests.
* @returns An object with `request` and `requestAll` methods bound to the provided client.
*
* @example
* ```typescript
* const auth = new ThunderIDBrowserClient();
* await auth.initialize(config);
* const httpClient = http(auth);
* const response = await httpClient.request({ url: '/api/data', method: 'GET' });
* ```
*/
const http = (client) => {
	return {
		request: client.httpRequest.bind(client),
		requestAll: client.httpRequestAll.bind(client)
	};
};
var http_default = http;

//#endregion
//#region src/utils/handleWebAuthnAuthentication.ts
const logger$1 = createPackageComponentLogger("@thunderid/browser", "WebAuthn");
/**
* Handles WebAuthn/Passkey authentication flow for browser environments.
*
* This function processes a WebAuthn challenge, performs the authentication ceremony,
* and returns the authentication response that can be sent to the server for verification.
*
* The function handles various aspects of WebAuthn authentication including:
* - Browser compatibility checks for WebAuthn support
* - HTTPS requirement validation (except for localhost development)
* - Relying Party ID validation and domain compatibility
* - Challenge data decoding and credential request options processing
* - User authentication ceremony via navigator.credentials.get()
* - Response formatting for server consumption
*
* @param challengeData - Base64-encoded challenge data containing WebAuthn request options.
*                       This data typically includes the challenge, RP ID, allowed credentials,
*                       user verification requirements, and other authentication parameters.
*
* @returns Promise that resolves to a JSON string containing the WebAuthn authentication response.
*          The response includes the credential ID, authenticator data, client data JSON,
*          signature, and optional user handle that can be verified by the server.
*
* @throws {ThunderIDRuntimeError} When WebAuthn is not supported in the current browser
* @throws {ThunderIDRuntimeError} When the page is not served over HTTPS (except localhost)
* @throws {ThunderIDRuntimeError} When the user cancels or times out the authentication
* @throws {ThunderIDRuntimeError} When there's a domain/RP ID mismatch
* @throws {ThunderIDRuntimeError} When no valid passkey is found for the account
* @throws {ThunderIDRuntimeError} When WebAuthn is not supported on the device/browser
* @throws {ThunderIDRuntimeError} When there's a network error during authentication
* @throws {ThunderIDRuntimeError} For any other authentication failures
*
* @example
* ```typescript
* try {
*   const challengeData = 'eyJwdWJsaWNLZXlDcmVkZW50aWFsUmVxdWVzdE9wdGlvbnMiOi4uLn0=';
*   const authResponse = await handleWebAuthnAuthentication(challengeData);
*
*   // Send the response to your server for verification
*   const result = await fetch('/api/verify-webauthn', {
*     method: 'POST',
*     headers: { 'Content-Type': 'application/json' },
*     body: authResponse
*   });
* } catch (error) {
*   if (error instanceof ThunderIDRuntimeError) {
*     console.error('WebAuthn authentication failed:', error.message);
*   }
* }
* ```
*
* @example
* ```typescript
* // Usage in an authentication flow
* const authenticateWithPasskey = async (challengeFromServer: string) => {
*   try {
*     const response = await handleWebAuthnAuthentication(challengeFromServer);
*     return JSON.parse(response);
*   } catch (error) {
*     // Handle specific error cases
*     if (error instanceof ThunderIDRuntimeError) {
*       switch (error.code) {
*         case 'browser-webauthn-not-supported':
*           showFallbackAuth();
*           break;
*         case 'browser-webauthn-user-cancelled':
*           showRetryOption();
*           break;
*         default:
*           showGenericError();
*       }
*     }
*   }
* };
* ```
*
* @see {@link https://webauthn.guide/} - WebAuthn specification guide
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API} - MDN WebAuthn API documentation
*/
const handleWebAuthnAuthentication = async (challengeData) => {
	if (!window.navigator.credentials?.get) throw new ThunderIDRuntimeError("WebAuthn is not supported in this browser. Please use a modern browser or try a different authentication method.", "browser-webauthn-not-supported", "browser", "WebAuthn/Passkey authentication requires a browser that supports the Web Authentication API.");
	if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") throw new ThunderIDRuntimeError("Passkey authentication requires a secure connection (HTTPS). Please ensure you are accessing this site over HTTPS.", "browser-webauthn-insecure-connection", "browser", "WebAuthn authentication requires HTTPS for security reasons, except when running on localhost for development.");
	try {
		const decodedChallenge = JSON.parse(atob(challengeData));
		const { publicKeyCredentialRequestOptions } = decodedChallenge;
		const currentDomain = window.location.hostname;
		const challengeRpId = publicKeyCredentialRequestOptions.rpId;
		let rpIdToUse = challengeRpId;
		if (challengeRpId && !currentDomain.endsWith(challengeRpId) && challengeRpId !== currentDomain) {
			logger$1.warn(`RP ID mismatch detected. Challenge RP ID: ${challengeRpId}, Current domain: ${currentDomain}`);
			rpIdToUse = currentDomain;
		}
		const adjustedOptions = {
			...publicKeyCredentialRequestOptions,
			challenge: base64urlToArrayBuffer(publicKeyCredentialRequestOptions.challenge),
			rpId: rpIdToUse,
			...publicKeyCredentialRequestOptions.userVerification && { userVerification: publicKeyCredentialRequestOptions.userVerification },
			...publicKeyCredentialRequestOptions.allowCredentials && { allowCredentials: publicKeyCredentialRequestOptions.allowCredentials.map((cred) => ({
				...cred,
				id: base64urlToArrayBuffer(cred.id)
			})) }
		};
		const credential = await navigator.credentials.get({ publicKey: adjustedOptions });
		if (!credential) throw new ThunderIDRuntimeError("No credential returned from WebAuthn authentication", "browser-webauthn-no-credential", "browser", "The WebAuthn authentication ceremony completed but did not return a valid credential.");
		const authData = credential.response;
		const tokenResponse = {
			credential: {
				id: credential.id,
				rawId: arrayBufferToBase64url(credential.rawId),
				response: {
					authenticatorData: arrayBufferToBase64url(authData.authenticatorData),
					clientDataJSON: arrayBufferToBase64url(authData.clientDataJSON),
					signature: arrayBufferToBase64url(authData.signature),
					...authData.userHandle && { userHandle: arrayBufferToBase64url(authData.userHandle) }
				},
				type: credential.type
			},
			requestId: decodedChallenge.requestId
		};
		return JSON.stringify(tokenResponse);
	} catch (error) {
		logger$1.error("WebAuthn authentication failed:");
		if (error instanceof ThunderIDRuntimeError) throw error;
		if (error instanceof Error) switch (error.name) {
			case "NotAllowedError": throw new ThunderIDRuntimeError("Passkey authentication was cancelled or timed out. Please try again.", "browser-webauthn-user-cancelled", "browser", "The user cancelled the WebAuthn authentication request or the request timed out.");
			case "SecurityError":
				if (error.message.includes("relying party ID") || error.message.includes("RP ID")) throw new ThunderIDRuntimeError("Domain mismatch error. The passkey was registered for a different domain. Please contact support or try a different authentication method.", "browser-webauthn-domain-mismatch", "browser", "The WebAuthn relying party ID does not match the current domain.");
				throw new ThunderIDRuntimeError("Passkey authentication failed due to a security error. Please ensure you are using HTTPS and that your browser supports passkeys.", "browser-webauthn-security-error", "browser", "A security error occurred during WebAuthn authentication.");
			case "InvalidStateError": throw new ThunderIDRuntimeError("No valid passkey found for this account. Please register a passkey first or use a different authentication method.", "browser-webauthn-no-passkey", "browser", "No registered passkey credentials were found for the current user account.");
			case "NotSupportedError": throw new ThunderIDRuntimeError("Passkey authentication is not supported on this device or browser. Please use a different authentication method.", "browser-webauthn-not-supported", "browser", "WebAuthn is not supported on the current device or browser configuration.");
			case "NetworkError": throw new ThunderIDRuntimeError("Network error during passkey authentication. Please check your connection and try again.", "browser-webauthn-network-error", "browser", "A network error occurred while communicating with the authenticator.");
			case "UnknownError": throw new ThunderIDRuntimeError("An unknown error occurred during passkey authentication. Please try again or use a different authentication method.", "browser-webauthn-unknown-error", "browser", "An unidentified error occurred during the WebAuthn authentication process.");
			default: throw new ThunderIDRuntimeError(`Passkey authentication failed: ${error.message}`, "browser-webauthn-general-error", "browser", `WebAuthn authentication failed with error: ${error.name}`);
		}
		throw new ThunderIDRuntimeError("Passkey authentication failed due to an unexpected error.", "browser-webauthn-unexpected-error", "browser", "An unexpected error occurred during WebAuthn authentication.");
	}
};
var handleWebAuthnAuthentication_default = handleWebAuthnAuthentication;

//#endregion
//#region src/utils/v2/resolveEmojiUrisInHtml.ts
/**
* Resolves `emoji:` URIs in an HTML string.
*
* Handles two forms:
*   - `<img src="emoji:🐯" alt="tiger">` → `<span role="img" aria-label="tiger">🐯</span>`
*   - Bare `emoji:🐯` text references → `🐯`
*
* @param html - The HTML string that may contain `emoji:` URIs.
* @returns The HTML string with all `emoji:` URIs replaced.
*/
const resolveEmojiUrisInHtml = (html) => {
	return html.replace(/<img([^>]*)src="(emoji:[^"]+)"([^>]*)\/?>/gi, (_match, pre, src, post) => {
		const emoji = extractEmojiFromUri(src);
		if (!emoji) return _match;
		const altMatch = /alt="([^"]*)"/i.exec(pre + post);
		return `<span role="img" aria-label="${altMatch ? altMatch[1] : emoji}">${emoji}</span>`;
	}).replace(/emoji:([^\s"<>&]+)/g, (_, rest) => isEmojiUri(`emoji:${rest}`) ? rest : `emoji:${rest}`);
};
var resolveEmojiUrisInHtml_default = resolveEmojiUrisInHtml;

//#endregion
//#region src/theme/themeDetection.ts
const logger = createPackageComponentLogger("@thunderid/browser", "ThemeDetection");
/**
* Detects the current theme mode based on the specified method
*/
const detectThemeMode = (mode, config = {}) => {
	const { darkClass = "dark", lightClass = "light", targetElement = typeof document !== "undefined" ? document.documentElement : null } = config;
	if (mode === "light") return "light";
	if (mode === "dark") return "dark";
	if (mode === "system") {
		if (typeof window !== "undefined" && window.matchMedia) return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		return "light";
	}
	if (mode === "class") {
		if (!targetElement) {
			logger.warn("ThemeDetection: targetElement is required for class-based detection, falling back to light mode");
			return "light";
		}
		const { classList } = targetElement;
		if (classList.contains(darkClass)) return "dark";
		if (classList.contains(lightClass)) return "light";
		return "light";
	}
	return "light";
};
/**
* Creates a MutationObserver to watch for class changes on the target element
*/
const createClassObserver = (targetElement, callback, config = {}) => {
	const { darkClass = "dark", lightClass = "light" } = config;
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type === "attributes" && mutation.attributeName === "class") {
				const { classList } = targetElement;
				if (classList.contains(darkClass)) callback(true);
				else if (classList.contains(lightClass)) callback(false);
			}
		});
	});
	observer.observe(targetElement, {
		attributeFilter: ["class"],
		attributes: true
	});
	return observer;
};
/**
* Creates a media query listener for system theme changes
*/
const createMediaQueryListener = (callback) => {
	if (typeof window === "undefined" || !window.matchMedia) return null;
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const handleChange = (e) => {
		callback(e.matches);
	};
	if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", handleChange);
	else mediaQuery.addListener(handleChange);
	return mediaQuery;
};

//#endregion
//#region src/theme/getActiveTheme.ts
/**
* Gets the active theme based on the theme mode preference
* @param mode - The theme mode preference ('light', 'dark', 'system', or 'class')
* @param config - Additional configuration for theme detection
* @returns 'light' or 'dark' based on the resolved theme
*/
const getActiveTheme = (mode, config = {}) => {
	if (mode === "dark") return "dark";
	if (mode === "light") return "light";
	if (mode === "system") {
		if (typeof window !== "undefined" && window.matchMedia) return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		return DEFAULT_THEME;
	}
	if (mode === "class") return detectThemeMode(mode, config);
	return DEFAULT_THEME;
};
var getActiveTheme_default = getActiveTheme;

//#endregion
export { ACCESS_TOKEN_INVALID, AuthenticationHelper_default as AuthenticationHelper, Hooks as BrowserHooks, BrowserStorage_default as BrowserStorage, CHECK_SESSION_SIGNED_IN, CHECK_SESSION_SIGNED_OUT, CUSTOM_GRANT_CONFIG, ERROR, ERROR_DESCRIPTION, FetchHttpClient_default as FetchHttpClient, Hooks_default as Hooks, INITIALIZED_SILENT_SIGN_IN, LocalStore_default as LocalStore, MemoryStore_default as MemoryStore, OP_IFRAME, PROMPT_NONE_IFRAME, PROMPT_NONE_REQUEST_SENT, REFRESH_ACCESS_TOKEN_ERR0R, RP_IFRAME, SET_SESSION_STATE_FROM_IFRAME, SILENT_SIGN_IN_STATE, SPACryptoUtils_default as SPACryptoUtils, SPAHelper_default as SPAHelper, SPAUtils_default as SPAUtils, STATE, STATE_QUERY, SessionStore_default as SessionStore, TOKEN_REQUEST_CONFIG_KEY, ThunderIDBrowserClient_default as ThunderIDBrowserClient, createClassObserver, createMediaQueryListener, SessionManagementHelper_default as createSessionManagementHelper, detectThemeMode, getActiveTheme_default as getActiveTheme, handleWebAuthnAuthentication_default as handleWebAuthnAuthentication, hasAuthParamsInUrl_default as hasAuthParamsInUrl, hasCalledForThisInstanceInUrl_default as hasCalledForThisInstanceInUrl, http_default as http, navigate_default as navigate, resolveEmojiUrisInHtml_default as resolveEmojiUrisInHtml };
//# sourceMappingURL=index.js.map