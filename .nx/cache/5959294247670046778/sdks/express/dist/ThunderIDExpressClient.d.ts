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
import { ThunderIDNodeClient, Storage, TokenResponse, User } from '@thunderid/node';
import express from 'express';
import { ExpressClientConfig } from './models/config';
declare class ThunderIDExpressClient<T extends ExpressClientConfig = ExpressClientConfig> extends ThunderIDNodeClient<T> {
    private _expressConfig;
    constructor();
    initialize(config: T, storage?: Storage): Promise<boolean>;
    get expressConfig(): ExpressClientConfig | undefined;
    getUserFromRequest(req: express.Request): Promise<User | undefined>;
    signIn(req: express.Request, res: express.Response, next: express.NextFunction, signInConfig?: Record<string, string | boolean>): Promise<TokenResponse>;
    signOut(userId?: string): Promise<string>;
}
export default ThunderIDExpressClient;
//# sourceMappingURL=ThunderIDExpressClient.d.ts.map