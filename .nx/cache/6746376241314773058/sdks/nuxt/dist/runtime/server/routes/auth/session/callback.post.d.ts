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
 * POST /api/auth/callback
 *
 * Exchanges an authorization code for tokens and issues a session cookie.
 * Called by the client-side `ThunderIDCallback` component after the IDP
 * redirects back with `?code=...&state=...`.
 *
 * Request body:
 * - `code` — authorization code from the IDP redirect
 * - `state` — state parameter from the redirect
 * - `sessionState` — session_state parameter from the redirect (optional)
 *
 * Response shape (success):
 * ```json
 * { "redirectUrl": "/dashboard", "success": true }
 * ```
 * Response shape (error):
 * ```json
 * { "success": false, "error": "..." }
 * ```
 */
declare const _default: import("h3").EventHandler<import("h3").EventHandlerRequest, Promise<{
    error: any;
    success: boolean;
    redirectUrl?: undefined;
} | {
    redirectUrl: string;
    success: boolean;
    error?: undefined;
}>>;
export default _default;
