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
import type { Plugin } from 'vue';
/**
 * Options accepted by {@link ThunderIDPlugin}.
 *
 * @example Browser SPA (default behaviour — no options needed)
 * ```ts
 * app.use(ThunderIDPlugin);
 * ```
 *
 * @example Delegated mode (e.g. @thunderid/nuxt)
 * ```ts
 * // The host framework is responsible for providing all injection context
 * // via app.provide().  The plugin skips browser-only initialisation so it
 * // can run safely in SSR environments.
 * app.use(ThunderIDPlugin, { mode: 'delegated' });
 * ```
 */
export interface ThunderIDPluginOptions {
    /**
     * `'browser'` (default) — full browser PKCE flow, registers `<ThunderIDProvider>`.
     * `'delegated'` — the host framework (e.g. `@thunderid/nuxt`) provides all
     * injection context via `app.provide()`.  The plugin skips browser-only
     * initialisation so it is safe to call during SSR.
     */
    mode?: 'browser' | 'delegated';
}
/**
 * Vue plugin for ThunderID authentication.
 *
 * Registers the `<ThunderIDProvider>` component globally so it can be used
 * anywhere in the application without explicit imports.
 *
 * @example
 * ```ts
 * import { createApp } from 'vue';
 * import { ThunderIDPlugin } from '@thunderid/vue';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 * app.use(ThunderIDPlugin);
 * app.mount('#app');
 * ```
 *
 * Then in your root component:
 * ```vue
 * <template>
 *   <ThunderIDProvider :base-url="baseUrl" :client-id="clientId">
 *     <router-view />
 *   </ThunderIDProvider>
 * </template>
 * ```
 */
declare const ThunderIDPlugin: Plugin<[ThunderIDPluginOptions?]>;
export default ThunderIDPlugin;
//# sourceMappingURL=ThunderIDPlugin.d.ts.map