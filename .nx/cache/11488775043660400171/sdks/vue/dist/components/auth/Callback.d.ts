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
 * Callback — headless component that handles OAuth callback parameter forwarding.
 *
 * Extracts OAuth parameters (code, state, error) from the URL and forwards them
 * to the original component that initiated the OAuth flow.
 *
 * Works standalone using the browser navigate utility (History API) for navigation by default.
 * Pass an `onNavigate` prop to enable framework-specific navigation (e.g., via Vue Router).
 *
 * Flow: Extract OAuth parameters from URL -> Parse state parameter -> Redirect to original path with parameters
 */
declare const Callback: Component;
export default Callback;
//# sourceMappingURL=Callback.d.ts.map