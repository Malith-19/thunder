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
 * POST /api/auth/signout
 *
 * Signs the user out by:
 * 1. Getting the sign-out URL from ThunderID (for RP-Initiated Logout)
 * 2. Clearing all session cookies
 * 3. Returning `{ redirectUrl }` for the client to navigate to
 *
 * Using POST instead of GET prevents CSRF-based forced sign-outs.
 */
declare const _default: import("h3").EventHandler<import("h3").EventHandlerRequest, Promise<{
    redirectUrl: string;
}>>;
export default _default;
