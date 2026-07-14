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
import { EmbeddedFlowExecuteRequestConfig as EmbeddedFlowExecuteRequestConfigV2 } from '../../models/v2/embedded-flow-v2';
import { EmbeddedRecoveryFlowResponse } from '../../models/v2/embedded-recovery-flow-v2';
/**
 * Executes an embedded recovery flow by sending a request to the flow execution endpoint.
 *
 * This function handles password-recovery and account-recovery flows driven by the
 * ThunderID server. The server returns UI components for each step (e.g. username
 * collection, OTP verification, password reset) and this function forwards the
 * user's responses back to the server.
 *
 * @param requestConfig - Request configuration containing URL, payload, and optional headers.
 * @returns A promise that resolves with the flow execution response.
 * @throws ThunderIDAPIError when the request fails or a payload is missing.
 *
 * @example
 * ```typescript
 * // Initiate recovery flow
 * const response = await executeEmbeddedRecoveryFlowV2({
 *   baseUrl: 'https://api.asgardeo.io/t/myorg',
 *   payload: {
 *     flowType: 'RECOVERY',
 *     applicationId: 'my-app-id',
 *   },
 * });
 *
 * // Continue recovery flow with user input
 * const nextResponse = await executeEmbeddedRecoveryFlowV2({
 *   baseUrl: 'https://api.asgardeo.io/t/myorg',
 *   payload: {
 *     executionId: response.executionId,
 *     action: 'submit',
 *     inputs: { username: 'user@example.com' },
 *     challengeToken: response.challengeToken,
 *   },
 * });
 * ```
 */
declare const executeEmbeddedRecoveryFlowV2: ({ url, baseUrl, payload, ...requestConfig }: EmbeddedFlowExecuteRequestConfigV2) => Promise<EmbeddedRecoveryFlowResponse>;
export default executeEmbeddedRecoveryFlowV2;
//# sourceMappingURL=executeEmbeddedRecoveryFlowV2.d.ts.map