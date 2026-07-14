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
 * Nitro server plugin — the Nuxt equivalent of `ThunderIDServerProvider` in the
 * Next.js SDK.
 *
 * On every page request it:
 * 1. Initialises the singleton {@link ThunderIDNuxtClient} once (idempotent).
 * 2. Verifies the JWT session cookie → resolves `isSignedIn`.
 * 3. When signed in, detects org context from the ID token (`user_org`) and
 *    switches `resolvedBaseUrl` to `${baseUrl}/o` when the user is acting
 *    within an organisation.
 * 4. In parallel (gated by `preferences`):
 *    - Fetches user + SCIM2 user profile  (`preferences.user.fetchUserProfile !== false`)
 *    - Fetches current org + my orgs      (`preferences.user.fetchOrganizations !== false`)
 *    - Fetches branding preference        (`preferences.theme.inheritFromBranding !== false`)
 * 5. Writes the full {@link ThunderIDSSRData} to `event.context.thunderid.ssr`
 *    so the Nuxt plugin can seed `useState` keys for zero-cost hydration.
 *
 * Each fetch is individually wrapped in try/catch so a broken SCIM or branding
 * call never crashes SSR — the client layer can recover via the existing
 * `/api/auth/*` routes.
 */
declare const _default: import("nitropack/types").NitroAppPlugin;
export default _default;
