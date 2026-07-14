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
import { NextRequest } from 'next/server';
import { SessionTokenPayload } from './SessionManager';
/**
 * Checks if a request has a valid session cookie (JWT).
 * This verifies the JWT signature and expiration.
 *
 * @param request - The Next.js request object
 * @returns True if a valid session exists, false otherwise
 */
export declare const hasValidSession: (request: NextRequest) => Promise<boolean>;
/**
 * Gets the session payload from the request cookies.
 * This includes user ID, session ID, and scopes.
 *
 * @param request - The Next.js request object
 * @returns The session payload if valid, undefined otherwise
 */
export declare const getSessionFromRequest: (request: NextRequest) => Promise<SessionTokenPayload | undefined>;
/**
 * Gets the session ID from the request cookies (legacy support).
 * First tries to get from JWT session, then falls back to legacy session ID cookie.
 *
 * @param request - The Next.js request object
 * @returns The session ID if it exists, undefined otherwise
 */
export declare const getSessionIdFromRequest: (request: NextRequest) => Promise<string | undefined>;
/**
 * Gets the temporary session ID from request cookies.
 *
 * @param request - The Next.js request object
 * @returns The temporary session ID if valid, undefined otherwise
 */
export declare const getTempSessionFromRequest: (request: NextRequest) => Promise<string | undefined>;
//# sourceMappingURL=sessionUtils.d.ts.map