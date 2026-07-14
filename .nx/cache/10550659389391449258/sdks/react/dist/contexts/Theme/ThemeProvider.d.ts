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
import { BrowserThemeDetection, RecursivePartial, ThemeConfig, ThemeMode, ThemePreferences } from '@thunderid/browser';
import { FC, PropsWithChildren } from 'react';
export interface ThemeProviderProps {
    /**
     * Configuration for theme detection when using 'class' or 'system' mode.
     */
    detection?: BrowserThemeDetection;
    /**
     * Whether to inherit the theme from the ThunderID branding preference.
     * @default true
     */
    inheritFromBranding?: ThemePreferences['inheritFromBranding'];
    /**
     * The theme mode to use for automatic detection.
     * - `'light'` | `'dark'`: Fixed color scheme.
     * - `'system'`: Follows the OS preference.
     * - `'class'`: Detects theme from CSS classes on the `<html>` element.
     * - `'branding'`: Follows the active theme from the branding preference.
     */
    mode?: ThemeMode | 'branding';
    /**
     * Optional partial theme overrides applied on top of the resolved theme.
     * User-supplied values always take the highest precedence.
     */
    theme?: RecursivePartial<ThemeConfig>;
}
/**
 * ThemeProvider is the single entry-point for theme management in `@thunderid/react`.
 *
 * It transparently switches between two internal implementations:
 *
 * **v1** (`ThemeProvider` classic): Sources colors from the ThunderID Branding API.
 * Used automatically when no `FlowMetaProvider` is present in the component tree.
 *
 * **v2** (`FlowMetaThemeProvider`): Sources colors from the `GET /flow/meta` endpoint
 * via `FlowMetaProvider`. Used automatically when a `FlowMetaProvider` is present
 * in the tree — or when `version="v2"` is set explicitly.
 *
 * The active version can also be pinned explicitly via the `version` prop.
 * All components that consume `useTheme()` continue to work regardless of which
 * version is active.
 *
 * @example
 * Auto-detection (recommended):
 * ```tsx
 * // v2 mode – FlowMetaProvider is present
 * <FlowMetaProvider config={{ baseUrl, type: FlowMetaType.App, id: appId }}>
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 * </FlowMetaProvider>
 *
 * // v1 mode – no FlowMetaProvider
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @example
 * Explicit version pinning:
 * ```tsx
 * <ThemeProvider version="v2">
 *   <App />
 * </ThemeProvider>
 * ```
 */
declare const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>>;
export default ThemeProvider;
//# sourceMappingURL=ThemeProvider.d.ts.map