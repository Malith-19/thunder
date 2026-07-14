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
import { ThunderIDExpressConfig } from '../models/config';
/**
 * Returns Express middleware that initialises the ThunderID client and attaches
 * it to `req.thunderIDAuth` for use in route handlers and `protect()`.
 *
 * Unlike the old `thunderID()` router, this function does **not** mount any
 * routes automatically. Register sign-in and sign-out handlers explicitly:
 *
 * ```ts
 * app.use(thunderID(config));
 * app.get('/login',  handleSignIn());
 * app.get('/logout', handleSignOut());
 * ```
 *
 * @param config - ThunderID Express configuration.
 */
declare const thunderID: (config: ThunderIDExpressConfig) => express.RequestHandler;
/**
 * Returns an Express route handler for the sign-in path.
 *
 * - If the request has no `?code` query param, initiates the OAuth 2.0 redirect.
 * - If the request has `?code`, exchanges the authorization code for tokens,
 *   sets the session cookie, and calls `onSignIn`.
 *
 * Must be used after `thunderID()` middleware so that `req.thunderIDAuth` is set.
 *
 * ```ts
 * app.get('/login', handleSignIn());
 * ```
 */
declare const handleSignIn: () => express.RequestHandler;
/**
 * Returns an Express route handler for the sign-out path.
 *
 * - Clears the session cookie and redirects to the identity provider's
 *   end-session endpoint.
 * - When the identity provider redirects back with `?state=sign_out_success`,
 *   calls `onSignOut`.
 *
 * Must be used after `thunderID()` middleware so that `req.thunderIDAuth` is set.
 *
 * ```ts
 * app.get('/logout', handleSignOut());
 * ```
 */
declare const handleSignOut: () => express.RequestHandler;
export { thunderID, handleSignIn, handleSignOut };
//# sourceMappingURL=authentication.d.ts.map