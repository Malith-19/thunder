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
 * Nuxt-specific SignOutButton container.
 *
 * Imports {@link BaseSignOutButton} from `@thunderid/vue` and wires the
 * `signOut` action through the Nuxt-specific {@link useThunderID} composable
 * (auto-import layer), which uses Nuxt's `navigateTo` instead of
 * `window.location`.
 *
 * @example
 * ```vue
 * <ThunderIDSignOutButton />
 * <ThunderIDSignOutButton class="btn-secondary">Sign out</ThunderIDSignOutButton>
 * ```
 */
declare const SignOutButton: Component;
export default SignOutButton;
