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
import type { TokenResponse, SessionCookieConfig } from '@thunderid/node';
import { SessionTokenPayload } from './SessionManager';
/**
 * Config required to call the token endpoint.
 */
export interface HandleRefreshTokenConfig {
    baseUrl: string;
    clientId: string;
    clientSecret: string;
    sessionCookie?: SessionCookieConfig;
}
/**
 * Result returned by handleRefreshToken.
 * Callers are responsible for persisting newSessionToken in the appropriate cookie context.
 */
export interface HandleRefreshTokenResult {
    newSessionToken: string;
    sessionCookieExpiryTime: number;
    tokenResponse: TokenResponse;
}
/**
 * Handles the OAuth refresh_token grant and builds a new session JWT string.
 *
 * Intentionally decoupled from cookie APIs so it can be called from both the Edge
 * Runtime (Next.js middleware) and the Node.js Runtime (server actions).
 * Cookie persistence is the caller's responsibility.
 */
declare const handleRefreshToken: (sessionPayload: SessionTokenPayload, config: HandleRefreshTokenConfig) => Promise<HandleRefreshTokenResult>;
export default handleRefreshToken;
//# sourceMappingURL=handleRefreshToken.d.ts.map