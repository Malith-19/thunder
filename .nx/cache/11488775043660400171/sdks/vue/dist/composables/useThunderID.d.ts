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
import type { ThunderIDContext } from '../models/contexts';
/**
 * Primary composable for ThunderID authentication.
 *
 * Must be called inside a component that is a descendant of `<ThunderIDProvider>`.
 * Returns all auth-related reactive state and action methods.
 *
 * @throws Error if called outside of `<ThunderIDProvider>`.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useThunderID } from '@thunderid/vue';
 *
 * const { isSignedIn, isLoading, user, signIn, signOut } = useThunderID();
 * </script>
 *
 * <template>
 *   <div v-if="isLoading">Loading...</div>
 *   <div v-else-if="isSignedIn">
 *     <p>Welcome, {{ user?.name }}</p>
 *     <button @click="signOut()">Sign Out</button>
 *   </div>
 *   <div v-else>
 *     <button @click="signIn()">Sign In</button>
 *   </div>
 * </template>
 * ```
 */
declare const useThunderID: () => ThunderIDContext;
export default useThunderID;
//# sourceMappingURL=useThunderID.d.ts.map