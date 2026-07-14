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
/**
 * Extracts the organization handle from a ThunderID base URL.
 *
 * Parses URLs following the `/t/{orgHandle}` pattern.
 *
 * @param baseUrl - The base URL of the ThunderID identity server
 * @returns The extracted organization handle
 * @throws {ThunderIDRuntimeError} When the URL doesn't match the expected ThunderID pattern,
 *   indicating a custom domain is configured and organizationHandle must be provided explicitly
 *
 * @example
 * ```typescript
 * const handle = deriveOrganizationHandleFromBaseUrl('https://localhost:8090/t/dxlab');
 * // Returns: 'dxlab'
 *
 * // Custom domain - returns empty string with a warning
 * const handle2 = deriveOrganizationHandleFromBaseUrl('https://custom.example.com/auth');
 * // Returns: '' and logs a warning
 * ```
 */
declare const deriveOrganizationHandleFromBaseUrl: (baseUrl?: string) => string;
export default deriveOrganizationHandleFromBaseUrl;
//# sourceMappingURL=deriveOrganizationHandleFromBaseUrl.d.ts.map