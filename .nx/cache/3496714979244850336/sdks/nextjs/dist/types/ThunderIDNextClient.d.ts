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
import { AllOrganizationsApiResponse, ThunderIDNodeClient, CreateOrganizationPayload, EmbeddedFlowExecuteRequestPayload, EmbeddedFlowExecuteResponse, ExtendedAuthorizeRequestUrlParams, IdToken, Organization, OrganizationDetails, SignInOptions, SignUpOptions, Storage, TokenExchangeRequestConfig, TokenResponse, User, UserProfile } from '@thunderid/node';
import { ThunderIDNextConfig } from './models/config';
declare class ThunderIDNextClient<T extends ThunderIDNextConfig = ThunderIDNextConfig> extends ThunderIDNodeClient<T> {
    isInitialized: boolean;
    constructor();
    private ensureInitialized;
    initialize(config: T, storage?: Storage): Promise<boolean>;
    reInitialize(config: Partial<T>): Promise<boolean>;
    getUser(userId?: string): Promise<User>;
    getUserProfile(userId?: string): Promise<UserProfile>;
    updateUserProfile(payload: any, userId?: string): Promise<User>;
    createOrganization(payload: CreateOrganizationPayload, userId?: string): Promise<Organization>;
    getOrganization(organizationId: string, userId?: string): Promise<OrganizationDetails>;
    getMyOrganizations(options?: any, userId?: string): Promise<Organization[]>;
    getAllOrganizations(options?: any, userId?: string): Promise<AllOrganizationsApiResponse>;
    getCurrentOrganization(userId?: string): Promise<Organization | null>;
    switchOrganization(organization: Organization, userId?: string): Promise<TokenResponse | Response>;
    isLoading(): boolean;
    isSignedIn(sessionId?: string): Promise<boolean>;
    exchangeToken(config: TokenExchangeRequestConfig, sessionId?: string): Promise<TokenResponse | Response>;
    getAccessToken(_sessionId?: string): Promise<string>;
    getDecodedIdToken(sessionId?: string, idToken?: string): Promise<IdToken>;
    signIn(...args: any[]): Promise<any>;
    signOut(...args: any[]): Promise<string>;
    signUp(options?: SignUpOptions): Promise<void>;
    signUp(payload: EmbeddedFlowExecuteRequestPayload): Promise<EmbeddedFlowExecuteResponse>;
    signInSilently(_options?: SignInOptions): Promise<User | boolean>;
    getAuthorizeRequestUrl(customParams: ExtendedAuthorizeRequestUrlParams, userId?: string): Promise<string>;
    getStorageManager(): any;
    clearSession(): Promise<void>;
    setSession(sessionData: Record<string, unknown>, sessionId?: string): Promise<void>;
    decodeJwtToken<R = Record<string, unknown>>(token: string): Promise<R>;
}
export default ThunderIDNextClient;
//# sourceMappingURL=ThunderIDNextClient.d.ts.map