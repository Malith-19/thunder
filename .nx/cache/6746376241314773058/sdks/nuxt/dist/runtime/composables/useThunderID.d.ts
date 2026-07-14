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
import { type ThunderIDContext } from '@thunderid/vue';
/**
 * Nuxt-aware primary composable for ThunderID authentication.
 *
 * Mirrors the Next.js `useThunderID` hook: a thin wrapper over the base SDK's
 * `useThunderID` that re-binds the redirect-based actions (`signIn`, `signOut`,
 * `signUp`) to Nuxt's {@link navigateTo} so SSR redirects use the correct
 * response mechanism instead of `window.location`.
 *
 * The surrounding context is guaranteed to be present by the Nuxt plugin
 * (`THUNDERID_KEY`) and {@link ThunderIDRoot} (the auxiliary provider tree),
 * so this composable does not carry a fallback branch.
 *
 * @example
 * ```vue
 * <script setup>
 * const { isSignedIn, user, signIn, signOut } = useThunderID();
 * </script>
 * ```
 */
export declare function useThunderID(): ThunderIDContext;
