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
import { type Component } from 'vue';
/**
 * Nuxt root wrapper that mounts the full ThunderID Vue provider tree.
 *
 * Mirrors `ThunderIDClientProvider` in the Next.js SDK — reads the SSR-hydrated
 * `useState` keys written by the universal Nuxt plugin and passes the resolved
 * data as props to each Vue provider:
 *
 * - {@link I18nProvider}      ← `preferences.i18n`
 * - {@link BrandingProvider}  ← `brandingPreference` (from `thunderid:branding`)
 * - {@link ThemeProvider}     ← `inheritFromBranding`, `mode`
 * - {@link FlowProvider}
 * - {@link UserProvider}      ← `profile`, `flattenedProfile`, `schemas`,
 *                               `updateProfile`, `revalidateProfile`, `onUpdateProfile`
 * - {@link OrganizationProvider} ← `currentOrganization`, `myOrganizations`,
 *                                  `onOrganizationSwitch`, `getAllOrganizations`,
 *                                  `revalidateMyOrganizations`
 *
 * The `THUNDERID_KEY` (config + auth state + actions) is still provided at the
 * app level by the Nuxt plugin; this component only supplies the auxiliary
 * provider contexts so downstream composables (`useUser`, `useOrganization`,
 * `useTheme`, `useBranding`, `useThunderIDI18n`) receive real data.
 *
 * @example
 * ```vue
 * <!-- app.vue -->
 * <template>
 *   <ThunderIDRoot>
 *     <NuxtPage />
 *   </ThunderIDRoot>
 * </template>
 * ```
 */
declare const ThunderIDRoot: Component;
export default ThunderIDRoot;
