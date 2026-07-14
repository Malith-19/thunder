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
import { EmbeddedFlowExecuteRequestPayload, EmbeddedFlowExecuteResponse } from '@thunderid/node';
/**
 * Server action for signing in a user.
 * Handles the embedded sign-in flow and manages session cookies.
 *
 * @param payload - The embedded sign-in flow payload
 * @param request - The embedded flow execute request config
 * @returns Promise that resolves when sign-in is complete
 */
declare const signUpAction: (payload?: EmbeddedFlowExecuteRequestPayload) => Promise<{
    data?: {
        afterSignUpUrl?: string;
        signUpUrl?: string;
    } | EmbeddedFlowExecuteResponse;
    error?: string;
    success: boolean;
}>;
export default signUpAction;
//# sourceMappingURL=signUpAction.d.ts.map