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
import { type Component } from 'vue';
/**
 * Nuxt-specific Callback component.
 *
 * Handles OAuth callback parameter forwarding — extracts `code`, `state`, and
 * `error` from the URL, validates the state stored in `sessionStorage`, and
 * forwards the OAuth parameters to the originating route.
 *
 * **SSR-safe**: all `window` / `sessionStorage` access is gated inside
 * `onMounted`, which only runs on the client. Navigation uses Nuxt's
 * `navigateTo` instead of `window.location` so the redirect is handled
 * correctly in both SSR and CSR contexts.
 *
 * Pass `onNavigate` to override the navigation handler (e.g. for testing or
 * custom routing logic).
 *
 * @example
 * ```vue
 * <!-- pages/callback.vue -->
 * <template>
 *   <ThunderIDCallback :on-error="handleError" />
 * </template>
 * ```
 */
declare const Callback: Component;
export default Callback;
