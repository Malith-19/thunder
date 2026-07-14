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
 * Universal Nuxt plugin (runs on both server and client) that wires up the
 * ThunderID Vue SDK.
 *
 * Responsibilities — mirrors the split between `ThunderIDServerProvider` and
 * `ThunderIDClientProvider` in the Next.js SDK:
 *
 *  1. **Auth state** — hydrate `useState('thunderid:auth')` from the Nitro
 *     plugin's `event.context.thunderid` so SSR and client agree on signed-in
 *     status and the user object.
 *  2. **THUNDERID_KEY** — provide the primary auth context at the app level.
 *     Action helpers (`signIn` / `signOut` / `signUp`) use Nuxt's
 *     `navigateTo` so redirects work on both server and client.
 *  3. **ThunderIDRoot** — register the wrapper component that mounts the rest
 *     of the provider tree (`I18nProvider`, `BrandingProvider`,
 *     `ThemeProvider`, `FlowProvider`, `UserProvider`, `OrganizationProvider`)
 *     so downstream composables receive real context values.
 *  4. **ThunderIDPlugin (delegated)** — install the Vue SDK plugin in
 *     delegated mode so it skips browser-only initialisation (SSR-safe).
 */
declare const _default: import("#app").Plugin<Record<string, unknown>> & import("#app").ObjectPlugin<Record<string, unknown>>;
export default _default;
