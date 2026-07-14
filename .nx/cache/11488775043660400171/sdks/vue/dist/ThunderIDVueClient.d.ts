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
import { ThunderIDBrowserClient, UserProfile, User, EmbeddedFlowExecuteResponse, SignUpOptions, EmbeddedFlowExecuteRequestPayload, Organization, IdToken, AllOrganizationsApiResponse, TokenResponse, HttpRequestConfig, HttpResponse, TokenExchangeRequestConfig } from '@thunderid/browser';
import { ThunderIDVueConfig } from './models/config';
/**
 * Client for implementing ThunderID in Vue applications.
 * This class provides the core functionality for managing user authentication and sessions.
 *
 * @typeParam T - Configuration type that extends ThunderIDVueConfig.
 */
declare class ThunderIDVueClient<T extends ThunderIDVueConfig = ThunderIDVueConfig> extends ThunderIDBrowserClient<T> {
    private loadingState;
    constructor(instanceId?: number);
    private setLoading;
    private withLoading;
    initialize(config: ThunderIDVueConfig): Promise<boolean>;
    reInitialize(config: Partial<ThunderIDVueConfig>): Promise<boolean>;
    updateUserProfile(): Promise<User>;
    getUser(options?: any): Promise<User>;
    getDecodedIdToken(sessionId?: string): Promise<IdToken>;
    getIdToken(): Promise<string>;
    getUserProfile(options?: any): Promise<UserProfile>;
    getMyOrganizations(options?: any): Promise<Organization[]>;
    getAllOrganizations(options?: any): Promise<AllOrganizationsApiResponse>;
    getCurrentOrganization(): Promise<Organization | null>;
    switchOrganization(organization: Organization): Promise<TokenResponse | Response>;
    isLoading(): boolean;
    isInitialized(): Promise<boolean>;
    isSignedIn(): Promise<boolean>;
    exchangeToken(config: TokenExchangeRequestConfig): Promise<TokenResponse | Response>;
    signIn(...args: any[]): Promise<any>;
    signInSilently(options?: any): Promise<User | boolean>;
    signUp(options?: SignUpOptions): Promise<void>;
    signUp(payload: EmbeddedFlowExecuteRequestPayload): Promise<EmbeddedFlowExecuteResponse>;
    request(requestConfig?: HttpRequestConfig): Promise<HttpResponse<any>>;
    requestAll(requestConfigs?: HttpRequestConfig[]): Promise<HttpResponse<any>[]>;
    getAccessToken(sessionId?: string): Promise<string>;
    clearSession(sessionId?: string): void;
    setSession(sessionData: Record<string, unknown>, sessionId?: string): Promise<void>;
    decodeJwtToken<TResult = Record<string, unknown>>(token: string): Promise<TResult>;
    getStorageManager(): any;
}
export default ThunderIDVueClient;
//# sourceMappingURL=ThunderIDVueClient.d.ts.map