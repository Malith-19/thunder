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
import type { CountryOption, LocaleOption } from '@thunderid/i18n';
import { type JSX } from 'react';
/**
 * Props for the {@link SelectLanguage} component.
 *
 * @public
 */
export interface SelectLanguageProps {
    /** The country selected in the previous wizard step, used to derive available locale options. */
    selectedCountry: CountryOption;
    /** Currently selected locale option, or null if none has been chosen. */
    selectedLocale: LocaleOption | null;
    /** Callback invoked when the user selects or clears a locale. */
    onLocaleChange: (locale: LocaleOption | null) => void;
    /** Callback invoked whenever step readiness changes (i.e. a locale becomes selected). */
    onReadyChange?: (isReady: boolean) => void;
}
/**
 * Second step in the language creation wizard where the user selects the specific
 * language variant spoken in the previously chosen country.
 *
 * Locale options are derived from the selected country's region code. Each option
 * displays the language flag, display name, and BCP 47 code. A helper tip explains
 * how the language selection contributes to the final locale code.
 *
 * @param props - The component props
 * @param props.selectedCountry - Country chosen in the preceding wizard step
 * @param props.selectedLocale - Currently selected locale option
 * @param props.onLocaleChange - Callback invoked when the locale selection changes
 * @param props.onReadyChange - Callback invoked when step readiness changes
 *
 * @returns JSX element rendering the language selection step
 *
 * @example
 * ```tsx
 * import SelectLanguage from './SelectLanguage';
 *
 * function Wizard() {
 *   const [locale, setLocale] = useState<LocaleOption | null>(null);
 *   return (
 *     <SelectLanguage
 *       selectedCountry={{name: 'France', regionCode: 'FR', flag: '🇫🇷'}}
 *       selectedLocale={locale}
 *       onLocaleChange={setLocale}
 *       onReadyChange={(ready) => setStepReady(ready)}
 *     />
 *   );
 * }
 * ```
 *
 * @public
 */
export default function SelectLanguage({ selectedCountry, selectedLocale, onLocaleChange, onReadyChange, }: SelectLanguageProps): JSX.Element;
