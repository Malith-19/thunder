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
 * Handles WebAuthn/Passkey authentication flow for browser environments.
 *
 * This function processes a WebAuthn challenge, performs the authentication ceremony,
 * and returns the authentication response that can be sent to the server for verification.
 *
 * The function handles various aspects of WebAuthn authentication including:
 * - Browser compatibility checks for WebAuthn support
 * - HTTPS requirement validation (except for localhost development)
 * - Relying Party ID validation and domain compatibility
 * - Challenge data decoding and credential request options processing
 * - User authentication ceremony via navigator.credentials.get()
 * - Response formatting for server consumption
 *
 * @param challengeData - Base64-encoded challenge data containing WebAuthn request options.
 *                       This data typically includes the challenge, RP ID, allowed credentials,
 *                       user verification requirements, and other authentication parameters.
 *
 * @returns Promise that resolves to a JSON string containing the WebAuthn authentication response.
 *          The response includes the credential ID, authenticator data, client data JSON,
 *          signature, and optional user handle that can be verified by the server.
 *
 * @throws {ThunderIDRuntimeError} When WebAuthn is not supported in the current browser
 * @throws {ThunderIDRuntimeError} When the page is not served over HTTPS (except localhost)
 * @throws {ThunderIDRuntimeError} When the user cancels or times out the authentication
 * @throws {ThunderIDRuntimeError} When there's a domain/RP ID mismatch
 * @throws {ThunderIDRuntimeError} When no valid passkey is found for the account
 * @throws {ThunderIDRuntimeError} When WebAuthn is not supported on the device/browser
 * @throws {ThunderIDRuntimeError} When there's a network error during authentication
 * @throws {ThunderIDRuntimeError} For any other authentication failures
 *
 * @example
 * ```typescript
 * try {
 *   const challengeData = 'eyJwdWJsaWNLZXlDcmVkZW50aWFsUmVxdWVzdE9wdGlvbnMiOi4uLn0=';
 *   const authResponse = await handleWebAuthnAuthentication(challengeData);
 *
 *   // Send the response to your server for verification
 *   const result = await fetch('/api/verify-webauthn', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: authResponse
 *   });
 * } catch (error) {
 *   if (error instanceof ThunderIDRuntimeError) {
 *     console.error('WebAuthn authentication failed:', error.message);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Usage in an authentication flow
 * const authenticateWithPasskey = async (challengeFromServer: string) => {
 *   try {
 *     const response = await handleWebAuthnAuthentication(challengeFromServer);
 *     return JSON.parse(response);
 *   } catch (error) {
 *     // Handle specific error cases
 *     if (error instanceof ThunderIDRuntimeError) {
 *       switch (error.code) {
 *         case 'browser-webauthn-not-supported':
 *           showFallbackAuth();
 *           break;
 *         case 'browser-webauthn-user-cancelled':
 *           showRetryOption();
 *           break;
 *         default:
 *           showGenericError();
 *       }
 *     }
 *   }
 * };
 * ```
 *
 * @see {@link https://webauthn.guide/} - WebAuthn specification guide
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API} - MDN WebAuthn API documentation
 */
declare const handleWebAuthnAuthentication: (challengeData: string) => Promise<string>;
export default handleWebAuthnAuthentication;
//# sourceMappingURL=handleWebAuthnAuthentication.d.ts.map