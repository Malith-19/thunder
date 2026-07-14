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
 * Constants related to OIDC token management and storage.
 * This object contains configuration values and storage keys
 * used in token validation and management processes.
 *
 * @remarks
 * The constants are organized into two main sections:
 * 1. SignatureValidation - Contains supported algorithms for token validation
 * 2. Storage - Contains keys used for storing token-related data
 *
 * @example
 * ```typescript
 * // Using signature validation algorithms
 * const algorithms = TokenConstants.SignatureValidation.SUPPORTED_ALGORITHMS;
 *
 * // Using storage keys
 * const timerKey = TokenConstants.Storage.StorageKeys.REFRESH_TOKEN_TIMER;
 * ```
 */
declare const TokenConstants: {
    readonly SignatureValidation: {
        readonly SUPPORTED_ALGORITHMS: readonly string[];
    };
    readonly Storage: {
        readonly StorageKeys: {
            readonly REFRESH_TOKEN_TIMER: string;
        };
    };
};
export default TokenConstants;
//# sourceMappingURL=TokenConstants.d.ts.map