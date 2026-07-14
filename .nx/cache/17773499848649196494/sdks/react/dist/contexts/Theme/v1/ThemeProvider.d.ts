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
import { ThemeConfig, ThemeMode, RecursivePartial, BrowserThemeDetection, ThemePreferences } from '@thunderid/browser';
import { FC, PropsWithChildren } from 'react';
export interface ThemeProviderProps {
    /**
     * Configuration for theme detection when using 'class' or 'system' mode
     */
    detection?: BrowserThemeDetection;
    /**
     * Configuration for branding integration
     */
    inheritFromBranding?: ThemePreferences['inheritFromBranding'];
    /**
     * The theme mode to use for automatic detection
     * - 'light': Always use light theme
     * - 'dark': Always use dark theme
     * - 'system': Use system preference (prefers-color-scheme media query)
     * - 'class': Detect theme based on CSS classes on HTML element
     * - 'branding': Use active theme from branding preference (requires inheritFromBranding=true)
     */
    mode?: ThemeMode | 'branding';
    theme?: RecursivePartial<ThemeConfig>;
}
/**
 * ThemeProvider component that manages theme state and provides theme context to child components.
 *
 * This provider integrates with ThunderID branding preferences to automatically apply
 * organization-specific themes while allowing for custom theme overrides.
 *
 * Features:
 * - Automatic theme mode detection (light/dark/system/class)
 * - Integration with ThunderID branding API through useBranding hook
 * - Merging of branding themes with custom theme configurations
 * - CSS variable injection for easy styling
 * - Loading and error states for branding integration
 *
 * @example
 * Basic usage with branding integration:
 * ```tsx
 * <ThemeProvider inheritFromBranding={true}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @example
 * With custom theme overrides:
 * ```tsx
 * <ThemeProvider
 *   theme={{
 *     colors: {
 *       primary: { main: '#custom-color' }
 *     }
 *   }}
 *   inheritFromBranding={true}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @example
 * With branding-driven theme mode:
 * ```tsx
 * <ThemeProvider
 *   mode="branding"
 *   inheritFromBranding={true}
 * >
 *   <App />
 * </ThemeProvider>
 * ```
 */
declare const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>>;
export default ThemeProvider;
//# sourceMappingURL=ThemeProvider.d.ts.map