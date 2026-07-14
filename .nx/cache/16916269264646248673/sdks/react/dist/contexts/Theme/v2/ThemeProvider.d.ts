/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
import { ThemeConfig, RecursivePartial } from '@thunderid/browser';
import { FC, PropsWithChildren } from 'react';
export interface ThemeProviderProps {
    /**
     * Optional theme overrides merged on top of the server-side flow meta theme.
     * User-supplied values take highest precedence.
     */
    theme?: RecursivePartial<ThemeConfig>;
}
/**
 * ThemeProvider is the v2 drop-in replacement for `ThemeProvider`.
 *
 * It reads the design theme from the nearest `FlowMetaContext` (provided by
 * `FlowMetaProvider`) and publishes a resolved `Theme` object through the
 * **same** `ThemeContext` that `useTheme` consumes.  This means all existing
 * components that call `useTheme` continue to work without any changes.
 *
 * The `defaultColorScheme` field returned by the server is used to seed the
 * active color scheme; the user can still toggle it locally via the
 * `toggleTheme` value exposed in the context.
 *
 * @example
 * ```tsx
 * <FlowMetaProvider config={{ baseUrl, type: FlowMetaType.App, id: appId }}>
 *   <ThemeProvider>
 *     <App />   {/* useTheme() works here as usual *\/}
 *   </ThemeProvider>
 * </FlowMetaProvider>
 * ```
 *
 * @example
 * With user theme overrides (user values win over server values):
 * ```tsx
 * <ThemeProvider theme={{ colors: { primary: { main: '#ff0000' } } }}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
declare const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>>;
export default ThemeProvider;
//# sourceMappingURL=ThemeProvider.d.ts.map