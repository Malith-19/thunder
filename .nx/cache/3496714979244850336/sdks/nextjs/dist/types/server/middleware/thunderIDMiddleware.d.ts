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
import { NextRequest, NextResponse } from 'next/server';
import { ThunderIDNextConfig } from '../../models/config';
import { SessionTokenPayload } from '../../utils/SessionManager';
export type ThunderIDMiddlewareOptions = Partial<ThunderIDNextConfig>;
export interface ThunderIDMiddlewareContext {
    /** Get the session payload from JWT session if available */
    getSession: () => Promise<SessionTokenPayload | undefined>;
    /** Get the session ID from the current request */
    getSessionId: () => string | undefined;
    /** Check if the current request has a valid ThunderID session */
    isSignedIn: () => boolean;
    /**
     * Protect a route by redirecting unauthenticated users.
     * Redirect URL fallback order:
     * 1. options.redirect
     * 2. resolvedOptions.signInUrl
     * 3. resolvedOptions.defaultRedirect
     * 4. referer (if from same origin)
     * If none are available, falls back to '/'.
     */
    protectRoute: (routeOptions?: {
        redirect?: string;
    }) => Promise<NextResponse | void>;
}
type ThunderIDMiddlewareHandler = (thunderid: ThunderIDMiddlewareContext, req: NextRequest) => Promise<NextResponse | void> | NextResponse | void;
/**
 * ThunderID middleware that integrates authentication into your Next.js application.
 * Similar to Clerk's clerkMiddleware pattern.
 *
 * Proactively refreshes the access token when it is within REFRESH_BUFFER_SECONDS of
 * expiry so that Server Components always receive a fresh session. The refresh also
 * recovers expired tokens as long as a refresh token is present.
 *
 * The updated session cookie is written to:
 *   - The response  → browser stores the new cookie for subsequent requests.
 *   - The forwarded request headers → the same-request Server Component render sees
 *     the fresh token immediately without waiting for the next navigation.
 *
 * Token refresh requires baseUrl, clientId, and clientSecret. These are resolved from
 * the options argument first, then from the standard ThunderID environment variables
 * (NEXT_PUBLIC_THUNDERID_BASE_URL, NEXT_PUBLIC_THUNDERID_CLIENT_ID,
 * THUNDERID_CLIENT_SECRET). If none are available the refresh step is skipped silently.
 *
 * @param handler - Optional handler function to customize middleware behavior
 * @param options - Configuration options for the middleware
 * @returns Next.js middleware function
 *
 * @example
 * ```typescript
 * // middleware.ts - Basic usage (config read from env vars automatically)
 * import { thunderIDMiddleware } from '@thunderid/nextjs';
 *
 * export default thunderIDMiddleware();
 *
 * export const config = {
 *   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
 * };
 * ```
 *
 * @example
 * ```typescript
 * // With route protection
 * import { thunderIDMiddleware, createRouteMatcher } from '@thunderid/nextjs';
 *
 * const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
 *
 * export default thunderIDMiddleware(async (thunderid, req) => {
 *   if (isProtectedRoute(req)) {
 *     await thunderid.protectRoute();
 *   }
 * });
 * ```
 */
declare const thunderIDMiddleware: (handler?: ThunderIDMiddlewareHandler, options?: ThunderIDMiddlewareOptions | ((req: NextRequest) => ThunderIDMiddlewareOptions)) => ((request: NextRequest) => Promise<NextResponse>);
export default thunderIDMiddleware;
//# sourceMappingURL=thunderIDMiddleware.d.ts.map