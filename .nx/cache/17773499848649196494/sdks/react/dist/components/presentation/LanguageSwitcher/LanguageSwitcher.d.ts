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
import { LanguageOption, LanguageSwitcherRenderProps } from './BaseLanguageSwitcher';
export type { LanguageOption, LanguageSwitcherRenderProps };
export interface LanguageSwitcherProps {
    /**
     * Render-props callback for fully custom UI.
     *
     * @example
     * ```tsx
     * <LanguageSwitcher>
     *   {({languages, currentLanguage, onLanguageChange, isLoading}) => (
     *     <select
     *       value={currentLanguage}
     *       disabled={isLoading}
     *       onChange={e => onLanguageChange(e.target.value)}
     *     >
     *       {languages.map(l => (
     *         <option key={l.code} value={l.code}>{l.emoji} {l.displayName}</option>
     *       ))}
     *     </select>
     *   )}
     * </LanguageSwitcher>
     * ```
     */
    children?: (props: LanguageSwitcherRenderProps) => ReactNode;
    /** Additional CSS class for the root element (default UI only) */
    className?: string;
}
/**
 * A v2 LanguageSwitcher component that reads available languages from `FlowMetaContext`
 * and switches both the UI language (via `I18nContext`) and the flow metadata translations
 * (by re-fetching `GET /flow/meta` with the new language).
 *
 * Must be rendered inside a `FlowMetaProvider`.
 *
 * @example
 * ```tsx
 * // Default dropdown UI
 * <LanguageSwitcher />
 *
 * // Custom UI with render props
 * <LanguageSwitcher>
 *   {({languages, currentLanguage, onLanguageChange}) => (
 *     <div>
 *       {languages.map(lang => (
 *         <button
 *           key={lang.code}
 *           onClick={() => onLanguageChange(lang.code)}
 *           style={{fontWeight: lang.code === currentLanguage ? 'bold' : 'normal'}}
 *         >
 *           {lang.emoji} {lang.displayName}
 *         </button>
 *       ))}
 *     </div>
 *   )}
 * </LanguageSwitcher>
 * ```
 */
declare const LanguageSwitcher: FC<LanguageSwitcherProps>;
export default LanguageSwitcher;
//# sourceMappingURL=LanguageSwitcher.d.ts.map