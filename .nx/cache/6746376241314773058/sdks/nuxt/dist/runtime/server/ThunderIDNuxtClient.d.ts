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
import { ThunderIDNodeClient, type IdToken, type Organization, type OrganizationDetails, type CreateOrganizationPayload, type Storage, type TokenExchangeRequestConfig, type TokenResponse, type User, type UserProfile, type UpdateMeProfileConfig, type AllOrganizationsApiResponse, type EmbeddedFlowExecuteRequestPayload, type EmbeddedFlowExecuteResponse, type ExtendedAuthorizeRequestUrlParams, type SignUpOptions, type GetBrandingPreferenceConfig, type BrandingPreference } from '@thunderid/node';
import type { ThunderIDNuxtConfig, ThunderIDSessionPayload } from '../types.js';
declare class ThunderIDNuxtClient extends ThunderIDNodeClient<ThunderIDNuxtConfig> {
    private static instance;
    isInitialized: boolean;
    private constructor();
    static getInstance(): ThunderIDNuxtClient;
    initialize(config: ThunderIDNuxtConfig, storage?: Storage): Promise<boolean>;
    reInitialize(config: Partial<ThunderIDNuxtConfig>): Promise<boolean>;
    rehydrateSessionFromPayload(session: ThunderIDSessionPayload): Promise<void>;
    signIn(...args: any[]): Promise<any>;
    signUp(options?: SignUpOptions): Promise<void>;
    signUp(payload: EmbeddedFlowExecuteRequestPayload): Promise<EmbeddedFlowExecuteResponse>;
    getAuthorizeRequestUrl(customParams: ExtendedAuthorizeRequestUrlParams, userId?: string): Promise<string>;
    signOut(...args: any[]): Promise<string>;
    getUser(sessionId?: string): Promise<User>;
    getAccessToken(sessionId?: string): Promise<string>;
    getDecodedIdToken(sessionId?: string, idToken?: string): Promise<IdToken>;
    isSignedIn(sessionId?: string): Promise<boolean>;
    exchangeToken(config: TokenExchangeRequestConfig, sessionId?: string): Promise<TokenResponse | Response>;
    getUserProfile(sessionId: string): Promise<UserProfile>;
    getCurrentOrganization(sessionId: string): Promise<Organization | null>;
    getMyOrganizations(sessionId: string): Promise<Organization[]>;
    getBrandingPreference(config: GetBrandingPreferenceConfig): Promise<BrandingPreference>;
    updateUserProfile(config: UpdateMeProfileConfig, sessionId: string): Promise<User>;
    getAllOrganizations(options?: any, sessionId?: string): Promise<AllOrganizationsApiResponse>;
    createOrganization(payload: CreateOrganizationPayload, sessionId: string): Promise<Organization>;
    getOrganization(organizationId: string, sessionId: string): Promise<OrganizationDetails>;
    switchOrganization(organization: Organization, sessionId: string): Promise<TokenResponse | Response>;
    getStorageManager(): any;
}
export default ThunderIDNuxtClient;
