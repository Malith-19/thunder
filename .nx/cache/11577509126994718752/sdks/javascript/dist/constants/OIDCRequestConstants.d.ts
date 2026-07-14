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
 * Constants representing standard OpenID Connect (OIDC) request and response parameters.
 * These parameters are commonly used during authorization, token exchange, and logout flows.
 */
declare const OIDCRequestConstants: {
    readonly Params: {
        readonly AUTHORIZATION_CODE: string;
        readonly SESSION_STATE: string;
        readonly SIGN_OUT_SUCCESS: string;
        readonly STATE: string;
    };
    readonly SignIn: {
        readonly Payload: {
            readonly DEFAULT_SCOPES: readonly string[];
        };
    };
    readonly SignOut: {
        readonly Storage: {
            readonly StorageKeys: {
                readonly SIGN_OUT_URL: string;
            };
        };
    };
};
export default OIDCRequestConstants;
//# sourceMappingURL=OIDCRequestConstants.d.ts.map