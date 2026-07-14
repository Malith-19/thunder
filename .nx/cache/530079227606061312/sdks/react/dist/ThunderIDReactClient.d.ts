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
import { ThunderIDBrowserClient, UserProfile, SignInOptions, User, EmbeddedFlowExecuteResponse, SignUpOptions, EmbeddedFlowExecuteRequestPayload, Organization, IdToken, AllOrganizationsApiResponse, TokenResponse, HttpRequestConfig, HttpResponse, TokenExchangeRequestConfig, EmbeddedSignInFlowResponseV2 } from '@thunderid/browser';
import { ThunderIDReactConfig } from './models/config';
declare class ThunderIDReactClient<T extends ThunderIDReactConfig = ThunderIDReactConfig> extends ThunderIDBrowserClient<T> {
    private loadingState;
    private _initializeConfig;
    constructor(instanceId?: number);
    private setLoading;
    private withLoading;
    initialize(config: ThunderIDReactConfig): Promise<boolean>;
    reInitialize(config: Partial<ThunderIDReactConfig>): Promise<boolean>;
    updateUserProfile(): Promise<User>;
    getUser(): Promise<User>;
    getDecodedIdToken(sessionId?: string): Promise<IdToken>;
    getIdToken(): Promise<string>;
    getUserProfile(): Promise<UserProfile>;
    getMyOrganizations(options?: any): Promise<Organization[]>;
    getAllOrganizations(options?: any): Promise<AllOrganizationsApiResponse>;
    getCurrentOrganization(): Promise<Organization | null>;
    switchOrganization(organization: Organization): Promise<TokenResponse | Response>;
    isLoading(): boolean;
    isSignedIn(): Promise<boolean>;
    exchangeToken(config: TokenExchangeRequestConfig): Promise<TokenResponse | Response>;
    signIn(...args: any[]): Promise<User | EmbeddedSignInFlowResponseV2>;
    signInSilently(options?: SignInOptions): Promise<User | boolean>;
    signUp(options?: SignUpOptions): Promise<void>;
    signUp(payload: EmbeddedFlowExecuteRequestPayload): Promise<EmbeddedFlowExecuteResponse>;
    recover(payload: EmbeddedFlowExecuteRequestPayload): Promise<EmbeddedFlowExecuteResponse>;
    getStorageManager(): any;
    request(requestConfig?: HttpRequestConfig): Promise<HttpResponse<any>>;
    requestAll(requestConfigs?: HttpRequestConfig[]): Promise<HttpResponse<any>[]>;
}
export default ThunderIDReactClient;
//# sourceMappingURL=ThunderIDReactClient.d.ts.map