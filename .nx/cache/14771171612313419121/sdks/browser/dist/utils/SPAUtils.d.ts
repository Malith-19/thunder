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
import { SignOutError } from '../models/SignOutError';
/**
 * Static utility methods for SPA authentication flows including PKCE storage,
 * sign-out URL management, and URL-based state detection.
 */
declare class SPAUtils {
    private constructor();
    /**
     * Removes the `code` search parameter from the current URL without a page reload.
     */
    static removeAuthorizationCode(): void;
    /**
     * Retrieves a PKCE verifier from sessionStorage.
     *
     * @param pkceKey - The storage key for the PKCE verifier.
     * @returns The stored verifier string, or an empty string if not found.
     */
    static getPKCE(pkceKey: string): string;
    /**
     * Persists a PKCE verifier in sessionStorage.
     *
     * @param pkceKey - The storage key.
     * @param pkce - The PKCE verifier value.
     */
    static setPKCE(pkceKey: string, pkce: string): void;
    /**
     * Persists the post-sign-out redirect URL for the given client and instance.
     *
     * @param url - The sign-out redirect URL.
     * @param clientId - The OAuth2 client ID.
     * @param instanceId - The client instance ID.
     */
    static setSignOutURL(url: string, clientId: string, instanceId: number): void;
    /**
     * Retrieves the stored sign-out redirect URL for the given client and instance.
     *
     * @param clientId - The OAuth2 client ID.
     * @param instanceId - The client instance ID.
     * @returns The stored sign-out URL, or an empty string.
     */
    static getSignOutUrl(clientId: string, instanceId: number): string;
    /**
     * Removes a PKCE verifier from sessionStorage.
     *
     * @param pkceKey - The storage key to remove.
     */
    static removePKCE(pkceKey: string): void;
    /**
     * Determines whether the `signIn` method should continue based on the `callOnlyOnRedirect` flag.
     *
     * @param callOnlyOnRedirect - True if the call should only proceed when redirected back from the IdP.
     * @param authorizationCode - Authorization code passed directly (form_post mode).
     * @returns `true` if sign-in should proceed.
     */
    static canContinueSignIn(callOnlyOnRedirect: boolean, authorizationCode?: string): boolean;
    /**
     * Returns `true` if silent sign-in is in progress (silent-state present in the URL).
     */
    static isInitializedSilentSignIn(): boolean;
    /**
     * Returns `true` if the `signIn` method was already called this navigation
     * (auth code or error is present in the URL, but not a silent flow).
     */
    static wasSignInCalled(): boolean;
    /**
     * Returns `true` if a silent sign-in was previously initialized in this session.
     */
    static wasSilentSignInCalled(): boolean;
    /**
     * Checks whether the current URL indicates a successful sign-out redirect.
     * Clears the query string and session data if `true`.
     *
     * @param isSignOutSuccessful - Static method from the JS client for URL inspection.
     * @param clearSession - Callback to clear session data after successful sign-out.
     * @returns `true` if the sign-out completed successfully.
     */
    static isSignOutSuccessful(isSignOutSuccessfulFn: (url: string) => boolean, clearSession: () => Promise<void>): Promise<boolean>;
    /**
     * Checks whether the current URL indicates a sign-out failure.
     * Returns the error details if present, or `false` otherwise.
     *
     * @param didSignOutFailFn - Static method from the JS client for URL inspection.
     * @returns The `SignOutError` if sign-out failed, or `false`.
     */
    static didSignOutFail(didSignOutFailFn: (url: string) => boolean): boolean | SignOutError;
    /**
     * Returns `true` if the URL contains a silent sign-in state parameter.
     */
    static isSilentStatePresentInURL(): boolean;
    /**
     * Returns `true` if the current URL contains an authorization code (`code` parameter).
     *
     * @param params - Search params string (defaults to `window.location.search`).
     */
    static hasAuthSearchParamsInURL(params?: string): boolean;
    /**
     * Returns `true` if the current URL contains an OAuth2 error parameter
     * (but not a sign-out success state).
     *
     * @param url - URL to inspect (defaults to `window.location.href`).
     */
    static hasErrorInURL(url?: string): boolean;
    /**
     * Returns `true` if no prompt-none request has been sent yet this session.
     */
    static canSendPromptNoneRequest(): boolean;
    /**
     * Records whether a prompt-none request has been sent.
     *
     * @param canSend - `true` marks the request as sent.
     */
    static setPromptNoneRequestSent(canSend: boolean): void;
    /**
     * Waits until the browser has redirected (non-blocking delay).
     *
     * @param time - Time to wait in seconds (default: 3).
     */
    static waitTillPageRedirect(time?: number): Promise<void>;
    /**
     * Returns a Promise that resolves when `condition()` returns `true`.
     *
     * @param condition - Predicate to poll.
     * @param timeout - Poll interval in milliseconds (default: 500).
     */
    static until: (condition: () => boolean, timeout?: number) => Promise<void>;
}
export default SPAUtils;
//# sourceMappingURL=SPAUtils.d.ts.map