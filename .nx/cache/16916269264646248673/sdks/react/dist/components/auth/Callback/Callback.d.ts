/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
import { FC } from 'react';
/**
 * Props for Callback component
 */
export interface CallbackProps {
    /**
     * Callback function called when an error occurs
     */
    onError?: (error: Error) => void;
    /**
     * Function to navigate to a different path.
     * If not provided, falls back to the browser navigate utility (SPA navigation via History API for same-origin paths).
     * Provide this prop to enable framework-specific navigation (e.g., from React Router).
     */
    onNavigate?: (path: string) => void;
}
/**
 * BaseCallback is a headless component that handles OAuth callback parameter forwarding.
 * This component extracts OAuth parameters (code, state, error) from the URL and forwards them
 * to the original component that initiated the OAuth flow.
 *
 * Works standalone using the browser navigate utility (History API) for navigation by default.
 * Pass an onNavigate prop to enable framework-specific navigation (e.g., via React Router).
 *
 * Flow: Extract OAuth parameters from URL -> Parse state parameter -> Redirect to original path with parameters
 *
 * The original component (SignIn/AcceptInvite) is responsible for:
 * - Processing the OAuth code via the SDK
 * - Calling /flow/execute
 * - Handling the assertion and auth/callback POST
 * - Managing the authenticated session
 */
export declare const Callback: FC<CallbackProps>;
export default Callback;
//# sourceMappingURL=Callback.d.ts.map