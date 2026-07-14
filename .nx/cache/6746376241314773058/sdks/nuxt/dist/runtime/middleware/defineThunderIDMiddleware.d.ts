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
import { defineNuxtRouteMiddleware } from '#app';
export interface ThunderIDMiddlewareOptions {
    /**
     * The path to redirect unauthenticated (or unauthorised) requests to.
     * Defaults to `'/api/auth/signin'`.
     */
    redirectTo?: string;
    /**
     * If `true`, the middleware will also require that the user has an
     * `organizationId` in their session.  Redirects to `redirectTo` if not.
     */
    requireOrganization?: boolean;
    /**
     * Required OAuth scopes.  The middleware checks that every listed scope
     * is present in the session before allowing access.
     */
    requireScopes?: string[];
}
/**
 * Typed factory for ThunderID route middleware.
 *
 * Usage in a page component:
 * ```vue
 * <script setup>
 * definePageMeta({
 *   middleware: [defineThunderIDMiddleware({ requireOrganization: true })]
 * });
 * </script>
 * ```
 *
 * Or add it as a named middleware in `middleware/` and reference by name.
 *
 * The built-in `'auth'` middleware registered by this module is equivalent
 * to calling `defineThunderIDMiddleware()` with no options.
 */
export declare function defineThunderIDMiddleware(options?: ThunderIDMiddlewareOptions): ReturnType<typeof defineNuxtRouteMiddleware>;
