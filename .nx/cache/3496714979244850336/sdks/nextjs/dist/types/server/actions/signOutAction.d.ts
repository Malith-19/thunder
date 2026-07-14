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
 * Server action for signing out a user.
 * Clears both JWT and legacy session cookies.
 *
 * @returns Promise that resolves with success status and optional after sign-out URL
 */
declare const signOutAction: () => Promise<{
    data?: {
        afterSignOutUrl?: string;
    };
    error?: unknown;
    success: boolean;
}>;
export default signOutAction;
//# sourceMappingURL=signOutAction.d.ts.map