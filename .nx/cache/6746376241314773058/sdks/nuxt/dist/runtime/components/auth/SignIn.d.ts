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
 * Nuxt-specific SignIn container for the embedded (app-native) sign-in flow.
 *
 * Mirrors the Vue SDK's `SignIn` container but replaces all `window.location`
 * navigation with Nuxt's `navigateTo` so redirects after a successful embedded
 * sign-in are SSR-safe.
 *
 * Uses `useThunderID()` from the Nuxt auto-import layer — the Nuxt-specific
 * wrapper that provides Nitro-route-aware `signIn`, `signOut`, `signUp`.
 *
 * Delegates all UI rendering to {@link BaseSignIn} from `@thunderid/vue`, which
 * itself is platform-aware (routes to V1 authenticator or V2 component flow).
 *
 * @example
 * ```vue
 * <ThunderIDSignIn @success="onSignIn" @error="onError" />
 * ```
 */
declare const SignIn: Component;
export default SignIn;
