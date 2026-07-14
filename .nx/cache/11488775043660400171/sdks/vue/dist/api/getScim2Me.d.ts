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
import { User, GetScim2MeConfig as BaseGetScim2MeConfig } from '@thunderid/browser';
export interface GetScim2MeConfig extends Omit<BaseGetScim2MeConfig, 'fetcher'> {
    fetcher?: (url: string, config: RequestInit) => Promise<Response>;
    instanceId?: number;
}
declare const getScim2Me: ({ fetcher, instanceId, ...requestConfig }: GetScim2MeConfig) => Promise<User>;
export default getScim2Me;
//# sourceMappingURL=getScim2Me.d.ts.map