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
import { ThunderIDJavaScriptClient, ExtendedAuthorizeRequestUrlParams, IdToken, OIDCEndpoints, Storage, TokenExchangeRequestConfig, TokenResponse, User } from '@thunderid/javascript';
import { ThunderIDNodeConfig } from './models/config';
declare class ThunderIDNodeClient<T = ThunderIDNodeConfig> extends ThunderIDJavaScriptClient<T> {
    private _nodeInstanceId;
    constructor(instanceId?: number);
    initialize(config: T, storage?: Storage): Promise<boolean>;
    getInstanceId(): number;
    signIn(...args: any[]): Promise<TokenResponse>;
    getSignInUrl(requestConfig?: ExtendedAuthorizeRequestUrlParams, userId?: string): Promise<string>;
    signOut(...args: any[]): Promise<string>;
    isSignedIn(userId?: string): Promise<boolean>;
    getIdToken(userId?: string): Promise<string>;
    refreshAccessToken(userId?: string): Promise<TokenResponse | User>;
    revokeAccessToken(userId?: string): Promise<Response | boolean>;
    getDecodedIdToken(userId?: string, idToken?: string): Promise<IdToken>;
    getAccessToken(userId?: string): Promise<string>;
    getUser(userId?: string): Promise<User>;
    getOpenIDProviderEndpoints(): Promise<Partial<OIDCEndpoints>>;
    exchangeToken(config: TokenExchangeRequestConfig, userId?: string): Promise<TokenResponse | Response | User>;
}
export default ThunderIDNodeClient;
//# sourceMappingURL=ThunderIDNodeClient.d.ts.map