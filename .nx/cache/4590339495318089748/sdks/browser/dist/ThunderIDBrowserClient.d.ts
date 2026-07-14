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
import { ThunderIDJavaScriptClient, User, IsomorphicCrypto, IdToken, OIDCEndpoints, Storage, HttpRequestConfig, HttpResponse } from '@thunderid/javascript';
import FetchHttpClient from './FetchHttpClient';
import { BrowserAuthConfig } from './models/BrowserConfig';
import SignInConfig from './models/SignInConfig';
import { SPATokenExchangeConfig } from './models/TokenExchangeConfig';
declare class ThunderIDBrowserClient<T = BrowserAuthConfig> extends ThunderIDJavaScriptClient<T> {
    private _browserInstanceId;
    private _httpClient;
    private _spaHelper;
    private _sessionManagementHelper;
    private _authHelper;
    private _storage;
    private _getSignOutURLFromSessionStorage;
    private _isHttpHandlerEnabled;
    private _httpErrorCallback;
    private _httpFinishCallback;
    private _onSignInCallback;
    private _onSignOutCallback;
    private _onSignOutFailedCallback;
    private _onEndUserSession;
    private _onInitialize;
    private _onCustomGrant;
    private _initialized;
    private _startedInitialize;
    constructor(instanceId?: number);
    initialize(config: T, storage?: Storage): Promise<boolean>;
    isInitialized(): Promise<boolean>;
    private _validateMethod;
    isLoading(): boolean;
    signIn(config?: SignInConfig, authorizationCode?: string, sessionState?: string, state?: string, tokenRequestConfig?: {
        params: Record<string, unknown>;
    }): Promise<User | undefined>;
    private _signInInternal;
    private _exchangeCodeForTokens;
    signInSilently(additionalParams?: Record<string, string | boolean>, tokenRequestConfig?: {
        params: Record<string, unknown>;
    }): Promise<User | boolean | undefined>;
    signOut(_options?: any, sessionIdOrAfterSignOut?: string | ((url: string) => void), afterSignOutParam?: (url: string) => void): Promise<string>;
    httpRequest(requestConfig: HttpRequestConfig): Promise<HttpResponse | undefined>;
    httpRequestAll(configs: HttpRequestConfig[]): Promise<HttpResponse[] | undefined>;
    getUser(userId?: string): Promise<User | undefined>;
    getAccessToken(sessionId?: string): Promise<string>;
    getDecodedIdToken(userId?: string, idToken?: string): Promise<IdToken | undefined>;
    getIdToken(userId?: string): Promise<string | undefined>;
    getOpenIDProviderEndpoints(): Promise<Partial<OIDCEndpoints>>;
    getCrypto(): Promise<IsomorphicCrypto | undefined>;
    getHttpClient(): FetchHttpClient;
    isSignedIn(userId?: string): Promise<boolean | undefined>;
    protected notifySignIn(user: User): void;
    isSessionActive(): Promise<boolean | undefined>;
    refreshAccessToken(userId?: string): Promise<User | undefined>;
    revokeAccessToken(userId?: string): Promise<boolean | undefined>;
    exchangeToken(config: SPATokenExchangeConfig): Promise<Response | User>;
    reInitialize(config: Partial<T>): Promise<boolean>;
    startAutoRefreshToken(): Promise<void>;
    enableHttpHandler(): Promise<boolean | undefined>;
    disableHttpHandler(): Promise<boolean | undefined>;
    decodeJwtToken<R = Record<string, unknown>>(token?: string): Promise<R | undefined>;
    on(hook: string, callback: (response?: any) => void | Promise<void>, id?: string): Promise<void>;
    private _checkSession;
    private _shouldStopAuthn;
    private _enableRetrievingSignOutURLFromSession;
    private _constructSilentSignInUrl;
    getInstanceId(): number;
    static clearSession(): Promise<void>;
}
export default ThunderIDBrowserClient;
//# sourceMappingURL=ThunderIDBrowserClient.d.ts.map