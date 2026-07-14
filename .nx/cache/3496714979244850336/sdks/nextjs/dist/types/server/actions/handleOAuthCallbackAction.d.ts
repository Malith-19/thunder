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
/**
 * Server action to handle OAuth callback with authorization code.
 * This action processes the authorization code received from the OAuth provider
 * and exchanges it for tokens to complete the authentication flow.
 *
 * @param code - Authorization code from OAuth provider
 * @param state - State parameter from OAuth provider for CSRF protection
 * @param sessionState - Session state parameter from OAuth provider
 * @returns Promise that resolves with success status and optional error message
 */
declare const handleOAuthCallbackAction: (code: string, state: string, sessionState?: string) => Promise<{
    error?: string;
    redirectUrl?: string;
    success: boolean;
}>;
export default handleOAuthCallbackAction;
//# sourceMappingURL=handleOAuthCallbackAction.d.ts.map