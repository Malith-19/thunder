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
 * Nuxt-specific UserProfile container.
 *
 * Reads user profile data from `useUser()` (Nuxt auto-import, re-exported
 * from `@thunderid/vue`) and delegates rendering to {@link BaseUserProfile}
 * from `@thunderid/vue`.
 *
 * Preserves the same prop/slot API as the Vue SDK's `UserProfile` component
 * so consumers don't need to change their templates.
 *
 * @example
 * ```vue
 * <ThunderIDUserProfile :editable="true" title="My Profile" />
 * ```
 */
declare const UserProfile: Component;
export default UserProfile;
