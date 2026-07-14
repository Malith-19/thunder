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
import type { BaseSignUpRenderProps } from '@thunderid/vue';
import { type Component } from 'vue';
export type SignUpRenderProps = BaseSignUpRenderProps;
/**
 * Nuxt-specific SignUp container for the embedded registration flow.
 *
 * Mirrors the Vue SDK's `SignUp` container but replaces all `window.location`
 * redirects with Nuxt's `navigateTo` for SSR-safe navigation after a
 * successful sign-up.
 *
 * Uses `useThunderID()` from the Nuxt auto-import layer and delegates all UI
 * rendering to {@link BaseSignUp} from `@thunderid/vue`.
 *
 * Additionally, `window.location.href` for OAuth redirect URLs is replaced
 * with `navigateTo` so the redirect works in both SSR and CSR contexts.
 *
 * @example
 * ```vue
 * <ThunderIDSignUp @complete="onComplete" @error="onError" />
 * ```
 */
declare const SignUp: Component;
export default SignUp;
