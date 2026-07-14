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
import type { BrandingPreference } from '@thunderid/node';
/**
 * GET /api/auth/branding
 *
 * Returns the branding preference for the current tenant / organisation context.
 * Resolves the correct `baseUrl` (org-scoped if the session is inside an org).
 * Does not require an authenticated session — unauthenticated callers receive
 * the root-tenant branding.
 *
 * Used by `ThunderIDRoot.revalidateBranding` to refresh client-side branding
 * state without a full page reload.
 */
declare const _default: import("h3").EventHandler<import("h3").EventHandlerRequest, Promise<BrandingPreference | null>>;
export default _default;
