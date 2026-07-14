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
 * Nuxt-specific SignUpButton container.
 *
 * Imports {@link BaseSignUpButton} from `@thunderid/vue` and wires navigation
 * through Nuxt's `navigateTo` so a configured `signUpUrl` is followed
 * SSR-safely instead of via `window.location`.
 *
 * @example
 * ```vue
 * <ThunderIDSignUpButton />
 * <ThunderIDSignUpButton class="btn-primary">Create account</ThunderIDSignUpButton>
 * ```
 */
declare const SignUpButton: Component;
export default SignUpButton;
