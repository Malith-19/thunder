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
 * Client-safe result of a token refresh.
 *
 * Intentionally omits accessToken, refreshToken, idToken, and scopes — those stay
 * server-side in the HttpOnly session cookie. Returning tokens from a Server Action
 * serializes them into browser memory, defeating the HttpOnly boundary and exposing
 * them to XSS, browser extensions, and error-tracking SDKs.
 *
 * `expiresAt` is epoch seconds for the new access token; the client uses it to
 * schedule the next refresh.
 */
export interface RefreshResult {
    expiresAt: number;
}
/**
 * Server action to refresh the access token using the stored refresh token.
 * Exchanges the refresh token for a new token set and updates the session cookie.
 *
 * Delegates the HTTP exchange to handleRefreshToken so the same logic is shared
 * with the middleware token refresh path.
 *
 * Called from the client side (e.g. ThunderIDClientProvider refreshOnMount) where
 * Next.js allows cookie mutation. When invoked during SSR rendering the cookie
 * write is silently skipped and a warning is logged.
 */
declare const refreshToken: () => Promise<RefreshResult>;
export default refreshToken;
//# sourceMappingURL=refreshToken.d.ts.map