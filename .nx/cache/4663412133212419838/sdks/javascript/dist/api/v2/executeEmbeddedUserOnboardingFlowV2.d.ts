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
import { EmbeddedFlowExecuteRequestConfig as EmbeddedFlowExecuteRequestConfigV2 } from '../../models/v2/embedded-flow-v2';
/**
 * Response from the user onboarding flow execution.
 */
export interface EmbeddedUserOnboardingFlowResponse {
    /**
     * Data for the current step including components and additional data.
     */
    data?: {
        /**
         * Additional data from the flow step (e.g., inviteLink).
         */
        additionalData?: Record<string, string>;
        /**
         * UI components to render for the current step.
         */
        components?: any[];
    };
    /**
     * Unique identifier for the flow execution.
     */
    executionId: string;
    /**
     * Reason for failure if flowStatus is ERROR.
     */
    failureReason?: string;
    /**
     * Current status of the flow.
     */
    flowStatus: 'INCOMPLETE' | 'COMPLETE' | 'ERROR';
    /**
     * Type of the current step in the flow.
     */
    type?: 'VIEW' | 'REDIRECTION';
}
/**
 * Executes an embedded user onboarding flow by sending a request to the flow execution endpoint.
 *
 * This function handles both:
 * - Admin flow: Initiates onboarding, collects user details, generates invite link
 * - End-user flow: Validates invite token and allows password setting
 *
 * @param requestConfig - Request configuration object containing URL, payload, and optional auth token.
 * @returns A promise that resolves with the flow execution response.
 * @throws ThunderIDAPIError when the request fails or URL is invalid.
 *
 * @example
 * ```typescript
 * // Admin initiating user onboarding (requires auth token)
 * const response = await executeEmbeddedUserOnboardingFlowV2({
 *   baseUrl: "https://api.thunder.io",
 *   payload: {
 *     flowType: "USER_ONBOARDING"
 *   },
 *   headers: {
 *     Authorization: `Bearer ${accessToken}`
 *   }
 * });
 *
 * // End-user accepting invite (no auth required)
 * const response = await executeEmbeddedUserOnboardingFlowV2({
 *   baseUrl: "https://api.thunder.io",
 *   payload: {
 *     executionId: "flow-id-from-url",
 *     inputs: { inviteToken: "token-from-url" }
 *   }
 * });
 * ```
 */
declare const executeEmbeddedUserOnboardingFlowV2: ({ url, baseUrl, payload, ...requestConfig }: EmbeddedFlowExecuteRequestConfigV2) => Promise<EmbeddedUserOnboardingFlowResponse>;
export default executeEmbeddedUserOnboardingFlowV2;
//# sourceMappingURL=executeEmbeddedUserOnboardingFlowV2.d.ts.map