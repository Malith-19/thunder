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
import { FC, PropsWithChildren } from 'react';
import { ThunderIDProviderProps } from '../../../contexts/ThunderID/ThunderIDProvider';
export interface OrganizationContextProps extends Omit<ThunderIDProviderProps, 'organizationChain' | 'baseUrl'> {
    /**
     * Optional base URL for the organization context. If not provided, it will default to the source provider's base URL.
     */
    baseUrl?: string;
    /**
     * Instance ID for this organization context. Must be unique across the app if multiple contexts are used.
     */
    instanceId: number;
    /**
     * Optional source instance ID. If not provided, immediate parent provider is used as source.
     */
    sourceInstanceId?: number;
    /**
     * ID of the organization to authenticate with
     */
    targetOrganizationId: string;
}
declare const OrganizationContext: FC<PropsWithChildren<OrganizationContextProps>>;
export default OrganizationContext;
//# sourceMappingURL=OrganizationContext.d.ts.map