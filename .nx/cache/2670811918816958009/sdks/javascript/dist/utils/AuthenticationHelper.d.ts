/**
 * Copyright (c) 2020-2026, WSO2 LLC. (https://www.wso2.com).
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
import { IsomorphicCrypto } from '../IsomorphicCrypto';
import { OIDCDiscoveryEndpointsApiResponse, OIDCDiscoveryApiResponse } from '../models/oidc-discovery';
import { TokenResponse } from '../models/token';
import { User } from '../models/user';
import StorageManager from '../StorageManager';
/**
 * Provides core authentication helper utilities for token handling, endpoint resolution,
 * ID token validation, and session management.
 *
 * @typeParam T - Optional extension type for framework-specific config fields.
 */
declare class AuthenticationHelper<T> {
    private storageManager;
    private config;
    private oidcProviderMetaData;
    private cryptoHelper;
    /**
     * Creates a new `AuthenticationHelper` instance.
     *
     * @param storageManagerInstance - The storage manager to use for reading config and session data.
     * @param cryptoHelperInstance - The isomorphic crypto helper for JWT operations.
     */
    constructor(storageManagerInstance: StorageManager<T>, cryptoHelperInstance: IsomorphicCrypto);
    /**
     * Merges explicit endpoint overrides from config into the discovery response.
     * Config-defined endpoint names (camelCase) are converted to snake_case before merging.
     *
     * @param response - The raw OIDC discovery response from the well-known endpoint.
     * @returns The discovery response with any config-specified endpoint overrides applied.
     */
    resolveEndpoints(response: OIDCDiscoveryApiResponse): Promise<OIDCDiscoveryApiResponse>;
    /**
     * Builds an OIDC endpoint map from explicitly configured endpoint URLs.
     * Throws if required endpoints are missing.
     *
     * @returns A partial OIDC discovery response containing all explicitly configured endpoints.
     * @throws {ThunderIDAuthException} When required endpoints are absent from the config.
     */
    resolveEndpointsExplicitly(): Promise<OIDCDiscoveryEndpointsApiResponse>;
    /**
     * Derives OIDC endpoint URLs from the configured `baseUrl`.
     * Any explicitly configured endpoints take precedence over the derived defaults.
     * The issuer is set to `baseUrl` per RFC 8414.
     *
     * @returns A partial OIDC discovery response with derived endpoint URLs.
     * @throws {ThunderIDAuthException} When `baseUrl` is not defined in the config.
     */
    resolveEndpointsByBaseURL(): Promise<OIDCDiscoveryEndpointsApiResponse>;
    /**
     * Validates an ID token using the JWKS endpoint and the configured validation options.
     *
     * @param idToken - The raw ID token string to validate.
     * @returns `true` if the token is valid.
     * @throws {ThunderIDAuthException} When the JWKS endpoint is missing or the request fails.
     */
    validateIdToken(idToken: string): Promise<boolean>;
    /**
     * Extracts user information from a decoded ID token payload.
     *
     * @param idToken - The raw ID token string.
     * @returns A `User` object built from the ID token claims.
     */
    getAuthenticatedUserInfo(idToken: string): User;
    /**
     * Replaces template placeholders in a custom grant string with real session values.
     *
     * @param text - The template string containing placeholders.
     * @param userId - Optional user ID scoping the session lookup.
     * @returns The string with all placeholders replaced.
     * @throws {ThunderIDAuthException} When session data for the source instance cannot be found.
     */
    replaceCustomGrantTemplateTags(text: string, userId?: string): Promise<string>;
    /**
     * Clears all temporary and session data for the given user.
     *
     * @param userId - Optional user ID scoping the session to clear.
     */
    clearSession(userId?: string): Promise<void>;
    /**
     * Parses a token endpoint response, optionally validates the ID token,
     * persists the session, and returns a normalized `TokenResponse`.
     *
     * @param response - The raw HTTP response from the token endpoint.
     * @param userId - Optional user ID scoping the session.
     * @returns A normalized `TokenResponse` object.
     * @throws {ThunderIDAuthException} When the response status is not 200.
     */
    handleTokenResponse(response: Response, userId?: string): Promise<TokenResponse>;
}
export default AuthenticationHelper;
//# sourceMappingURL=AuthenticationHelper.d.ts.map