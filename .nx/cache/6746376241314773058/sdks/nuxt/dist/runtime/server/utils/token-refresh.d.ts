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
import { type H3Event } from 'h3';
/**
 * Return a valid access token for the current request.
 *
 * If the stored access token is still fresh (or has no expiry metadata —
 * e.g. sessions created before Phase 2), it is returned as-is.
 *
 * When the token is within `REFRESH_SKEW_SECONDS` of expiring and a
 * refresh token is present, a `refresh_token` grant is sent to the OIDC
 * token endpoint.  On success the session cookie is reissued with the new
 * tokens so subsequent calls within the same browser session are also fresh.
 *
 * Throws a 401 if the token is expired and no refresh token is available, or
 * if the refresh call itself fails.
 *
 * @example
 * ```ts
 * // In a Nitro API route:
 * export default defineEventHandler(async (event) => {
 *   const accessToken = await getValidAccessToken(event);
 *   // use accessToken to call a protected API
 * });
 * ```
 */
export declare function getValidAccessToken(event: H3Event): Promise<string>;
