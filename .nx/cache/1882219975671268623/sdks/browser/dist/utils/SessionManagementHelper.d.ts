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
import { ExtendedAuthorizeRequestUrlParams } from '@thunderid/javascript';
/**
 * Interface for the session management helper returned by {@link createSessionManagementHelper}.
 */
export interface SessionManagementHelperInterface {
    /** Starts session polling and sets up the RP iframe. */
    initialize(clientId: string, checkSessionEndpoint: string, getSessionState: () => Promise<string>, interval: number, sessionRefreshInterval: number, redirectURL: string, getSignInUrl: (params?: ExtendedAuthorizeRequestUrlParams) => Promise<string>): void;
    /**
     * Processes a prompt-none response when the page is loaded inside the prompt-none iframe.
     * Returns `true` if the current page load was a prompt-none response.
     */
    receivePromptNoneResponse(setSessionState?: (sessionState: string | null) => Promise<void>): Promise<boolean>;
    /** Clears the session check and refresh intervals. */
    reset(): void;
}
/**
 * Factory that creates an OIDC Session Management helper using an RP iframe and polling.
 * Appends a hidden RP iframe to the document and returns the helper interface.
 *
 * @param signOut - Returns the sign-out URL for the current session.
 * @param setSessionState - Stores a new session state from a prompt-none response.
 * @returns A `SessionManagementHelperInterface` instance.
 */
export declare const createSessionManagementHelper: (signOut: () => Promise<string>, setSessionState: (sessionState: string) => void) => Promise<SessionManagementHelperInterface>;
export default createSessionManagementHelper;
//# sourceMappingURL=SessionManagementHelper.d.ts.map