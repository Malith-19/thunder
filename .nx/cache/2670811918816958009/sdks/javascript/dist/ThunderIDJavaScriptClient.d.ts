/**
 * Copyright (c) 2025-2026, WSO2 LLC. (https://www.wso2.com).
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
import { IsomorphicCrypto } from './IsomorphicCrypto';
import { AgentConfig } from './models/agent';
import { AuthCodeResponse } from './models/auth-code-response';
import type { CIBAInitiateOptions, CIBAInitiateResponse, CIBAPollOptions } from './models/ciba';
import { ThunderIDClient } from './models/client';
import { Config, SignInOptions, SignOutOptions, SignUpOptions } from './models/config';
import { Crypto } from './models/crypto';
import { EmbeddedFlowExecuteRequestPayload, EmbeddedFlowExecuteResponse } from './models/embedded-flow';
import { ExtendedAuthorizeRequestUrlParams } from './models/oauth-request';
import { OIDCDiscoveryApiResponse } from './models/oidc-discovery';
import { OIDCEndpoints } from './models/oidc-endpoints';
import { AllOrganizationsApiResponse, Organization } from './models/organization';
import { UserSession } from './models/session';
import { Storage } from './models/store';
import { IdToken, TokenExchangeRequestConfig, TokenResponse } from './models/token';
import { User, UserProfile } from './models/user';
import StorageManager from './StorageManager';
declare class ThunderIDJavaScriptClient<T = Config> implements ThunderIDClient<T> {
    protected storageManager: StorageManager<T>;
    protected cryptoUtils: Crypto;
    private configProvider;
    private oidcProviderMetaDataProvider;
    private authHelper;
    private cryptoHelper;
    private instanceIdValue;
    private cacheStore;
    private baseURL;
    constructor(storage?: Storage, cryptoUtils?: Crypto);
    initialize(config: T, storage?: Storage): Promise<boolean>;
    reInitialize(config: Partial<T>): Promise<boolean>;
    getConfiguration(): T;
    getUser(userId?: string): Promise<User>;
    isSignedIn(userId?: string): Promise<boolean>;
    getAccessToken(sessionId?: string): Promise<string>;
    clearSession(sessionId?: string): void;
    setSession(sessionData: Record<string, unknown>, sessionId?: string): Promise<void>;
    decodeJwtToken<R = Record<string, unknown>>(token: string): Promise<R>;
    exchangeToken(config: TokenExchangeRequestConfig, sessionId?: string): Promise<TokenResponse | Response | User>;
    isLoading(): boolean;
    signIn(_options?: SignInOptions): Promise<User | TokenResponse | undefined>;
    signOut(_options?: SignOutOptions, _sessionIdOrAfterSignOut?: string | ((afterSignOutUrl: string) => void), _afterSignOut?: (afterSignOutUrl: string) => void): Promise<string | boolean>;
    signInSilently(_options?: SignInOptions): Promise<User | boolean | undefined>;
    signUp(options?: SignUpOptions): Promise<void>;
    signUp(payload: EmbeddedFlowExecuteRequestPayload): Promise<EmbeddedFlowExecuteResponse>;
    recover(_payload: EmbeddedFlowExecuteRequestPayload): Promise<EmbeddedFlowExecuteResponse>;
    switchOrganization(_organization: Organization, _sessionId?: string): Promise<TokenResponse | Response>;
    getCurrentOrganization(_sessionId?: string): Promise<Organization | null>;
    getAllOrganizations(_options?: any, _sessionId?: string): Promise<AllOrganizationsApiResponse>;
    getMyOrganizations(_options?: any, _sessionId?: string): Promise<Organization[]>;
    getUserProfile(_options?: any): Promise<UserProfile>;
    updateUserProfile(_payload: any, _userId?: string): Promise<User>;
    protected loadOpenIDProviderConfiguration(forceInit?: boolean): Promise<void>;
    protected getSignInUrl(requestConfig?: ExtendedAuthorizeRequestUrlParams, userId?: string): Promise<string>;
    protected requestAccessToken(authorizationCode: string, sessionState: string, state: string, userId?: string, tokenRequestConfig?: {
        params: Record<string, unknown>;
    }): Promise<TokenResponse>;
    protected getSignOutUrl(userId?: string): Promise<string>;
    protected getOpenIDProviderEndpoints(): Promise<Partial<OIDCEndpoints>>;
    getDiscoveryResponse(): Promise<OIDCDiscoveryApiResponse | null>;
    protected getDecodedIdToken(userId?: string, idToken?: string): Promise<IdToken>;
    protected getIdToken(userId?: string): Promise<string>;
    protected getUserSession(userId?: string): Promise<UserSession>;
    protected refreshAccessToken(userId?: string): Promise<TokenResponse | User>;
    protected revokeAccessToken(userId?: string): Promise<Response | boolean>;
    initiateCIBA(options: CIBAInitiateOptions): Promise<CIBAInitiateResponse>;
    pollCIBA(authReqId: string, interval: number, options?: CIBAPollOptions): Promise<TokenResponse>;
    protected getPKCECode(state: string, userId?: string): Promise<string>;
    protected setPKCECode(pkce: string, state: string, userId?: string): Promise<void>;
    getInstanceId(): number;
    protected getStorageManager(): StorageManager<T>;
    protected getCryptoHelper(): IsomorphicCrypto;
    static isSignOutSuccessful(afterSignOutUrl: string): boolean;
    static didSignOutFail(afterSignOutUrl: string): boolean;
    getAgentToken(agentConfig: AgentConfig): Promise<TokenResponse>;
    getOBOSignInURL(agentConfig: AgentConfig): Promise<string>;
    getOBOToken(agentConfig: AgentConfig, authCodeResponse: AuthCodeResponse): Promise<TokenResponse>;
}
export default ThunderIDJavaScriptClient;
//# sourceMappingURL=ThunderIDJavaScriptClient.d.ts.map