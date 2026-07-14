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
import type { InjectionKey } from 'vue';
import type { ThunderIDContext, BrandingContextValue, FlowContextValue, FlowMetaContextValue, I18nContextValue, OrganizationContextValue, ThemeContextValue, UserContextValue } from './models/contexts';
/**
 * Injection key for the core ThunderID authentication context.
 */
export declare const THUNDERID_KEY: InjectionKey<ThunderIDContext>;
/**
 * Injection key for the User context (profile, schemas, update operations).
 */
export declare const USER_KEY: InjectionKey<UserContextValue>;
/**
 * Injection key for the Organization context (list, current org, switching).
 */
export declare const ORGANIZATION_KEY: InjectionKey<OrganizationContextValue>;
/**
 * Injection key for the Flow context (embedded flow UI state).
 */
export declare const FLOW_KEY: InjectionKey<FlowContextValue>;
/**
 * Injection key for the FlowMeta context (server-driven flow metadata).
 */
export declare const FLOW_META_KEY: InjectionKey<FlowMetaContextValue>;
/**
 * Injection key for the Theme context (color scheme, CSS variables, toggle).
 */
export declare const THEME_KEY: InjectionKey<ThemeContextValue>;
/**
 * Injection key for the Branding context (branding preferences from server).
 */
export declare const BRANDING_KEY: InjectionKey<BrandingContextValue>;
/**
 * Injection key for the I18n context (translation function, language switching).
 */
export declare const I18N_KEY: InjectionKey<I18nContextValue>;
//# sourceMappingURL=keys.d.ts.map