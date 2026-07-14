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
import { User, UpdateMeProfileConfig as BaseUpdateMeProfileConfig } from '@thunderid/browser';
/**
 * Configuration for the updateMeProfile request (React-specific)
 */
export interface UpdateMeProfileConfig extends Omit<BaseUpdateMeProfileConfig, 'fetcher'> {
    /**
     * Optional custom fetcher function. If not provided, the ThunderID SPA client's httpClient will be used
     * which is a wrapper around axios http.request
     */
    fetcher?: (url: string, config: RequestInit) => Promise<Response>;
    /**
     * Optional instance ID for multi-instance support. Defaults to 0.
     */
    instanceId?: number;
}
/**
 * Updates the user profile information at the specified SCIM2 Me endpoint.
 * This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
 *
 * @param config - Configuration object with URL, payload and optional request config.
 * @returns A promise that resolves with the updated user profile information.
 * @example
 * ```typescript
 * // Using default ThunderID SPA client httpClient
 * await updateMeProfile({
 *   url: "https://localhost:8090/scim2/Me",
 *   payload: { "urn:scim:wso2:schema": { mobileNumbers: ["0777933830"] } }
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Using custom fetcher
 * await updateMeProfile({
 *   url: "https://localhost:8090/scim2/Me",
 *   payload: { "urn:scim:wso2:schema": { mobileNumbers: ["0777933830"] } },
 *   fetcher: customFetchFunction
 * });
 * ```
 */
declare const updateMeProfile: ({ fetcher, instanceId, ...requestConfig }: UpdateMeProfileConfig) => Promise<User>;
export default updateMeProfile;
//# sourceMappingURL=updateMeProfile.d.ts.map