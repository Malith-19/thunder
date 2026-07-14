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
 * Constants for OAuth 2.0 Token Exchange operations.
 * This object contains placeholders used in token exchange requests
 * and responses for dynamic value substitution.
 *
 * @remarks
 * These placeholders are used in token exchange templates and are replaced
 * with actual values during request processing. They help in creating
 * flexible and reusable token exchange configurations.
 *
 * @example
 * ```typescript
 * // Using placeholders in a token exchange template
 * const template = `grant_type=urn:ietf:params:oauth:grant-type:token-exchange&subject_token=${TokenExchangeConstants.Placeholders.TOKEN}`;
 * ```
 */
declare const TokenExchangeConstants: {
    readonly Placeholders: {
        readonly ACCESS_TOKEN: string;
        readonly CLIENT_ID: string;
        readonly CLIENT_SECRET: string;
        readonly SCOPES: string;
        readonly USERNAME: string;
    };
};
export default TokenExchangeConstants;
//# sourceMappingURL=TokenExchangeConstants.d.ts.map