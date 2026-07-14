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
import { FC, ReactNode } from 'react';
/**
 * A resolved language option with display name and emoji flag.
 */
export interface LanguageOption {
    /** BCP 47 language tag (e.g. "en", "fr", "en-US") */
    code: string;
    /** Human-readable display name resolved via Intl.DisplayNames */
    displayName: string;
    /** Flag emoji or globe emoji for the language */
    emoji: string;
}
/**
 * Render props exposed to consumers when using the render-prop pattern.
 */
export interface LanguageSwitcherRenderProps {
    /** The currently active language code */
    currentLanguage: string;
    /** Whether a language switch is in progress */
    isLoading: boolean;
    /** Resolved language options */
    languages: LanguageOption[];
    /** Call this to switch to a different language */
    onLanguageChange: (language: string) => void;
}
export interface BaseLanguageSwitcherProps {
    /**
     * Render-props callback. When provided, the default dropdown UI is replaced with
     * whatever JSX the callback returns.
     *
     * @example
     * ```tsx
     * <BaseLanguageSwitcher {...props}>
     *   {({languages, currentLanguage, onLanguageChange}) => (
     *     <select value={currentLanguage} onChange={e => onLanguageChange(e.target.value)}>
     *       {languages.map(l => <option key={l.code} value={l.code}>{l.emoji} {l.displayName}</option>)}
     *     </select>
     *   )}
     * </BaseLanguageSwitcher>
     * ```
     */
    children?: (props: LanguageSwitcherRenderProps) => ReactNode;
    /** Additional CSS class applied to the root element (default UI only) */
    className?: string;
    /** The currently active language code */
    currentLanguage: string;
    /** Whether a language switch is in progress */
    isLoading?: boolean;
    /** Resolved language options to display */
    languages: LanguageOption[];
    /** Called when the user selects a language */
    onLanguageChange: (language: string) => void;
}
/**
 * Pure-UI language switcher dropdown.
 * Accepts resolved `LanguageOption[]` (code + displayName + emoji) and delegates
 * language switching to the `onLanguageChange` callback.
 *
 * Supports render props for full UI customisation.
 */
declare const BaseLanguageSwitcher: FC<BaseLanguageSwitcherProps>;
export default BaseLanguageSwitcher;
//# sourceMappingURL=BaseLanguageSwitcher.d.ts.map