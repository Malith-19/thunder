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
import { User, IsomorphicCrypto, StorageManager, IdToken, ExtendedAuthorizeRequestUrlParams, OIDCEndpoints, TokenResponse, HttpClient, HttpError, HttpRequestConfig, HttpResponse } from '@thunderid/javascript';
import { SPATokenExchangeConfig } from '../models/TokenExchangeConfig';
import SPAHelper from './SPAHelper';
interface SessionManagementHelperInterface {
    initialize(clientId: string, checkSessionEndpoint: string, getSessionState: () => Promise<string>, interval: number, sessionRefreshInterval: number, redirectURL: string, getSignInUrl: (params?: ExtendedAuthorizeRequestUrlParams) => Promise<string>): void;
    receivePromptNoneResponse(setSessionState?: (sessionState: string | null) => Promise<void>): Promise<boolean>;
    reset(): void;
}
/**
 * Browser-level authentication helper that orchestrates HTTP requests with token attachment,
 * automatic token refresh, session management, and the silent sign-in flow.
 *
 * @typeParam T - The browser client config extension type.
 */
declare class AuthenticationHelper<T> {
    private _storageManager;
    private _spaHelper;
    private _instanceId;
    private _isTokenRefreshing;
    private _getUser;
    private _refreshAccessToken;
    private _getAccessToken;
    private _getIDPAccessToken;
    private _isSignedIn;
    private _getDecodedIdToken;
    private _getCrypto;
    private _getIdToken;
    private _getOpenIDProviderEndpoints;
    private _exchangeToken;
    private _setPKCECode;
    /**
     * @param storageManager - Storage manager for reading config and session data.
     * @param spaHelper - Helper for managing token refresh timers.
     * @param instanceId - The instance ID used for signing out URL storage.
     * @param operations - Client operation callbacks to avoid circular dependency.
     */
    constructor(storageManager: StorageManager<T>, spaHelper: SPAHelper<T>, instanceId: number, operations: {
        getUser: () => Promise<User>;
        refreshAccessToken: () => Promise<TokenResponse | User>;
        getAccessToken: (sessionId?: string) => Promise<string>;
        getIDPAccessToken: () => Promise<string>;
        isSignedIn: () => Promise<boolean>;
        getDecodedIdToken: (sessionId?: string) => Promise<IdToken>;
        getCrypto: () => Promise<IsomorphicCrypto>;
        getIdToken: () => Promise<string>;
        getOpenIDProviderEndpoints: () => Promise<OIDCEndpoints>;
        exchangeToken: (config: SPATokenExchangeConfig) => Promise<Response | TokenResponse | User>;
        setPKCECode: (pkceKey: string, state: string) => Promise<void>;
    });
    /**
     * Enables request interception on the HTTP client.
     *
     * @param httpClient - The HTTP client to enable.
     */
    enableHttpHandler(httpClient: HttpClient): void;
    /**
     * Disables request interception on the HTTP client.
     *
     * @param httpClient - The HTTP client to disable.
     */
    disableHttpHandler(httpClient: HttpClient): void;
    /**
     * Initializes OIDC Session Management via an RP iframe.
     *
     * @param config - The current auth config.
     * @param oidcEndpoints - Resolved OIDC provider endpoints.
     * @param getSessionState - Returns the current session state from storage.
     * @param getAuthzURL - Builds an authorization URL with optional params.
     * @param sessionManagementHelper - The session management helper instance.
     */
    initializeSessionManger(config: any, oidcEndpoints: OIDCEndpoints, getSessionState: () => Promise<string>, getAuthzURL: (params?: ExtendedAuthorizeRequestUrlParams) => Promise<string>, sessionManagementHelper: SessionManagementHelperInterface): void;
    /**
     * Executes a custom token exchange grant, enforcing `allowedExternalUrls` rules when applicable.
     *
     * @param config - The token exchange configuration.
     * @param enableRetrievingSignOutURLFromSession - Callback invoked when `preventSignOutURLUpdate` is set.
     * @returns The user session or raw response.
     */
    exchangeToken(config: SPATokenExchangeConfig, enableRetrievingSignOutURLFromSession?: (config: SPATokenExchangeConfig) => void): Promise<User | Response>;
    /**
     * Returns the stored custom grant config if a replay-after-refresh was scheduled, or `null`.
     */
    getCustomGrantConfigData(): Promise<SPATokenExchangeConfig | null>;
    /**
     * Refreshes the access token, replays any scheduled custom grant, and reschedules auto-refresh.
     *
     * @param enableRetrievingSignOutURLFromSession - Callback for custom grant sign-out URL handling.
     * @returns The updated user session.
     */
    refreshAccessToken(enableRetrievingSignOutURLFromSession?: (config: SPATokenExchangeConfig) => void): Promise<User>;
    private retryFailedRequests;
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
    httpRequest(httpClient: HttpClient, requestConfig: HttpRequestConfig, isHttpHandlerEnabled?: boolean, httpErrorCallback?: (error: HttpError) => void | Promise<void>, httpFinishCallback?: () => void, enableRetrievingSignOutURLFromSession?: (config: SPATokenExchangeConfig) => void): Promise<HttpResponse>;
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
    httpRequestAll(requestConfigs: HttpRequestConfig[], httpClient: HttpClient, isHttpHandlerEnabled?: boolean, httpErrorCallback?: (error: HttpError) => void | Promise<void>, httpFinishCallback?: () => void): Promise<HttpResponse[] | undefined>;
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
    signInSilently(constructSilentSignInUrl: (additionalParams?: Record<string, string | boolean>) => Promise<string>, requestAccessToken: (authzCode: string, sessionState: string, state: string, tokenRequestConfig?: {
        params: Record<string, unknown>;
    }) => Promise<User>, sessionManagementHelper: SessionManagementHelperInterface, additionalParams?: Record<string, string | boolean>, tokenRequestConfig?: {
        params: Record<string, unknown>;
    }): Promise<User | boolean>;
    /**
     * Handles the early-return path of `signIn()` when a session already exists
     * or the page is handling a prompt-none response.
     *
     * @param shouldStopAuthn - Returns `true` if we should short-circuit and return early.
     * @param checkSession - Callback to initialize OIDC session management.
     * @returns The current user if already signed in, or `undefined` to continue normal sign-in.
     */
    handleSignIn(shouldStopAuthn: () => Promise<boolean>, checkSession: () => Promise<void>): Promise<User | undefined>;
    /**
     * Attaches the access token (or IDP token) to an HTTP request config's `Authorization` header.
     *
     * @param request - The request config to mutate.
     */
    attachTokenToRequestConfig(request: HttpRequestConfig): Promise<void>;
    /** Returns the current authenticated user from the ID token. */
    getUser(): Promise<User>;
    /**
     * Returns the decoded ID token payload.
     *
     * @param sessionId - Optional session ID.
     */
    getDecodedIdToken(sessionId?: string): Promise<IdToken>;
    /** Returns the IsomorphicCrypto instance used by the client. */
    getCrypto(): Promise<IsomorphicCrypto>;
    /** Returns the raw ID token string. */
    getIdToken(): Promise<string>;
    /** Returns the resolved OIDC provider endpoints. */
    getOpenIDProviderEndpoints(): Promise<OIDCEndpoints>;
    /**
     * Returns the current access token.
     *
     * @param sessionId - Optional session ID.
     */
    getAccessToken(sessionId?: string): Promise<string>;
    /** Returns the IDP access token from the session. */
    getIDPAccessToken(): Promise<string>;
    /** Returns the storage manager. */
    getStorageManager(): StorageManager<T>;
    /** Returns whether the user is currently signed in. */
    isSignedIn(): Promise<boolean>;
}
export default AuthenticationHelper;
//# sourceMappingURL=AuthenticationHelper.d.ts.map