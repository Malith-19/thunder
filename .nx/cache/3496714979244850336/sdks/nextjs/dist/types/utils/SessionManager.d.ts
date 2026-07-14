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
import { JWTPayload } from 'jose';
/**
 * Session token payload interface
 */
export interface SessionTokenPayload extends JWTPayload {
    /** Expiration timestamp — doubles as the access token expiry (JWT exp == access token exp) */
    exp: number;
    /** Issued at timestamp */
    iat: number;
    /** Organization ID if applicable */
    organizationId?: string;
    /** The refresh token; empty string if not provided by the auth server */
    refreshToken: string;
    /** OAuth scopes */
    scopes: string[];
    /** Session ID */
    sessionId: string;
    /** User ID */
    sub: string;
    /** Token type discriminant — must be 'session' for access-session JWTs */
    type: 'session';
}
/**
 * Session management utility class for JWT-based session cookies
 */
declare class SessionManager {
    /**
     * Get the signing secret from environment variable
     * Throws error in production if not set
     */
    private static getSecret;
    /**
     * Create a temporary session cookie for login initiation
     */
    static createTempSession(sessionId: string): Promise<string>;
    /**
     * Resolve the session cookie expiry time in seconds.
     *
     * Resolution order (first defined value wins):
     *   1. `configuredExpiry` — value from `ThunderIDNodeConfig.sessionCookie?.expiryTime`
     *   2. `THUNDERID_SESSION_COOKIE_EXPIRY_TIME` environment variable
     *   3. `DEFAULT_SESSION_COOKIE_EXPIRY_TIME` (24 hours)
     */
    static resolveSessionCookieExpiry(configuredExpiry?: number): number;
    static createSessionToken(accessToken: string, userId: string, sessionId: string, scopes: string, accessTokenTtlSeconds: number, refreshToken: string, organizationId?: string): Promise<string>;
    /**
     * Verify and decode a session token
     */
    static verifySessionToken(token: string): Promise<SessionTokenPayload>;
    /**
     * Verify a session token for refresh. Validates the HMAC signature and the
     * `type === 'session'` discriminant but intentionally skips the `exp` check
     * so an expired access token can still be exchanged for a new one.
     *
     * Session lifetime is still bounded — the cookie's `maxAge` is set from
     * `sessionCookieExpiryTime`, so the browser drops an over-age session regardless
     * of the access-token exp embedded in the JWT.
     *
     * Never use the returned payload for authorization.
     */
    static verifySessionTokenForRefresh(token: string): Promise<SessionTokenPayload>;
    /**
     * Verify and decode a temporary session token
     */
    static verifyTempSession(token: string): Promise<{
        sessionId: string;
    }>;
    /**
     * Get session cookie options
     */
    static getSessionCookieOptions(maxAge: number): {
        httpOnly: boolean;
        maxAge: number;
        path: string;
        sameSite: 'lax';
        secure: boolean;
    };
    /**
     * Get temporary session cookie options
     */
    static getTempSessionCookieOptions(): {
        httpOnly: boolean;
        maxAge: number;
        path: string;
        sameSite: 'lax';
        secure: boolean;
    };
    /**
     * Get session cookie name
     */
    static getSessionCookieName(): string;
    /**
     * Get temporary session cookie name
     */
    static getTempSessionCookieName(): string;
}
export default SessionManager;
//# sourceMappingURL=SessionManager.d.ts.map