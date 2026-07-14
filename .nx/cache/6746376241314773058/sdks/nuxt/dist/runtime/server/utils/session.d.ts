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
import type { TokenResponse } from '@thunderid/node';
import type { H3Event } from 'h3';
import type { ThunderIDSessionPayload } from '../../types.js';
/**
 * Create a signed JWT session token.
 */
export declare function createSessionToken(params: {
    accessToken: string;
    /** Unix timestamp (seconds) when the access token expires. */
    accessTokenExpiresAt?: number;
    expirySeconds?: number;
    /** Raw ID token string. */
    idToken?: string;
    organizationId?: string;
    /** Refresh token for silent re-auth. */
    refreshToken?: string;
    scopes: string;
    sessionId: string;
    userId: string;
}, sessionSecret?: string): Promise<string>;
/**
 * Create a signed JWT temp session token (used during OAuth flow).
 */
export declare function createTempSessionToken(sessionId: string, sessionSecret?: string, returnTo?: string): Promise<string>;
/**
 * Verify and decode a session JWT.
 */
export declare function verifySessionToken(token: string, sessionSecret?: string): Promise<ThunderIDSessionPayload>;
/**
 * Verify and decode a temp session JWT.
 */
export declare function verifyTempSessionToken(token: string, sessionSecret?: string): Promise<{
    returnTo?: string;
    sessionId: string;
}>;
/**
 * Session cookie name.
 */
export declare function getSessionCookieName(): string;
/**
 * Temp session cookie name.
 */
export declare function getTempSessionCookieName(): string;
/**
 * Session cookie options.
 */
interface SessionCookieOptions {
    httpOnly: boolean;
    maxAge: number;
    path: string;
    sameSite: 'lax';
    secure: boolean;
}
export declare function getSessionCookieOptions(): SessionCookieOptions;
/**
 * Temp session cookie options (15 min TTL).
 */
export declare function getTempSessionCookieOptions(): SessionCookieOptions;
/**
 * Decode a token response into a signed session JWT and write it as the
 * session cookie on the H3 event.
 *
 * Extracted from the inline blocks in `callback.get.ts` and
 * `organizations/switch.post.ts` so that all three callers (callback.get,
 * switch.post, and the new `signin.post`) share one implementation.
 */
export declare function issueSessionCookie(event: H3Event, sessionId: string, tokenResponse: TokenResponse, sessionSecret?: string): Promise<void>;
export {};
