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
import express from 'express';
/**
 * Returns Express middleware that blocks unauthenticated requests.
 * Requires `thunderID()` to be mounted before this middleware so that
 * `req.thunderIDAuth` is populated.
 *
 * @param onUnauthenticated - Called when the session is missing or invalid.
 *   Defaults to sending a 401 response.
 */
declare const protect: (onUnauthenticated?: (res: express.Response) => void) => ((req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>);
export default protect;
//# sourceMappingURL=protect.d.ts.map