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
 * Constants related to OpenID Connect (OIDC) metadata and endpoints.
 * This object contains all the standard OIDC endpoints and storage keys
 * used throughout the application for authentication and authorization.
 *
 * @remarks
 * The constants are organized into two main sections:
 * 1. Endpoints - Contains all OIDC standard endpoint paths
 * 2. Storage - Contains keys used for storing OIDC-related data
 *
 * @example
 * ```typescript
 * // Using an endpoint
 * const authEndpoint = OIDCDiscoveryConstants.Endpoints.AUTHORIZATION;
 *
 * // Using a storage key
 * const tokenKey = OIDCDiscoveryConstants.Storage.StorageKeys.Endpoints.TOKEN;
 * ```
 */
declare const OIDCDiscoveryConstants: {
    readonly Endpoints: {
        readonly AUTHORIZATION: string;
        readonly END_SESSION: string;
        readonly ISSUER: string;
        readonly JWKS: string;
        readonly REVOCATION: string;
        readonly SESSION_IFRAME: string;
        readonly TOKEN: string;
        readonly USERINFO: string;
    };
    readonly Storage: {
        readonly StorageKeys: {
            readonly Endpoints: {
                readonly AUTHORIZATION: string;
                readonly END_SESSION: string;
                readonly ISSUER: string;
                readonly JWKS: string;
                readonly REVOCATION: string;
                readonly SESSION_IFRAME: string;
                readonly TOKEN: string;
                readonly USERINFO: string;
            };
            readonly OPENID_PROVIDER_CONFIG_INITIATED: string;
        };
    };
};
export default OIDCDiscoveryConstants;
//# sourceMappingURL=OIDCDiscoveryConstants.d.ts.map