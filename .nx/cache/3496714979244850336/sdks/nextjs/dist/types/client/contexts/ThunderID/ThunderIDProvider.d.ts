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
import { AllOrganizationsApiResponse, Organization, UpdateMeProfileConfig, User, UserProfile, BrandingPreference, TokenResponse, CreateOrganizationPayload } from '@thunderid/node';
import { ThunderIDProviderProps } from '@thunderid/react';
import { FC, PropsWithChildren } from 'react';
import { ThunderIDContextProps } from './ThunderIDContext';
import { RefreshResult } from '../../../server/actions/refreshToken';
/**
 * Props interface of {@link ThunderIDClientProvider}
 */
export type ThunderIDClientProviderProps = Partial<Omit<ThunderIDProviderProps, 'baseUrl' | 'clientId'>> & Pick<ThunderIDProviderProps, 'baseUrl' | 'clientId'> & {
    applicationId: ThunderIDContextProps['applicationId'];
    brandingPreference?: BrandingPreference | null;
    clearSession: () => Promise<void>;
    createOrganization: (payload: CreateOrganizationPayload, sessionId: string) => Promise<Organization>;
    currentOrganization: Organization;
    getAllOrganizations: (options?: any, sessionId?: string) => Promise<AllOrganizationsApiResponse>;
    handleOAuthCallback: (code: string, state: string, sessionState?: string) => Promise<{
        error?: string;
        redirectUrl?: string;
        success: boolean;
    }>;
    isSignedIn: boolean;
    myOrganizations: Organization[];
    organizationHandle: ThunderIDContextProps['organizationHandle'];
    refreshToken: () => Promise<RefreshResult>;
    revalidateMyOrganizations?: (sessionId?: string) => Promise<Organization[]>;
    signIn: ThunderIDContextProps['signIn'];
    signOut: ThunderIDContextProps['signOut'];
    signUp: ThunderIDContextProps['signUp'];
    switchOrganization: (organization: Organization, sessionId?: string) => Promise<TokenResponse | Response>;
    updateProfile: (requestConfig: UpdateMeProfileConfig, sessionId?: string) => Promise<{
        data: {
            user: User;
        };
        error: string;
        success: boolean;
    }>;
    user: User | null;
    userProfile: UserProfile;
};
declare const ThunderIDClientProvider: FC<PropsWithChildren<ThunderIDClientProviderProps>>;
export default ThunderIDClientProvider;
//# sourceMappingURL=ThunderIDProvider.d.ts.map