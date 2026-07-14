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
import type { CountryOption } from '@thunderid/i18n';
import { type JSX } from 'react';
/**
 * Props for the {@link SelectCountry} component.
 *
 * @public
 */
export interface SelectCountryProps {
    /** Currently selected country, or null if none has been chosen. */
    selectedCountry: CountryOption | null;
    /** Callback invoked when the user selects or clears a country. */
    onCountryChange: (country: CountryOption | null) => void;
    /** Callback invoked whenever step readiness changes (i.e. a country becomes selected). */
    onReadyChange?: (isReady: boolean) => void;
}
/**
 * First step in the language creation wizard where the user selects the country
 * associated with the new language.
 *
 * Renders a searchable autocomplete populated with all available country options.
 * Each option shows the country flag, name, and ISO region code. A helper tip
 * below explains how the country selection influences the generated locale code.
 *
 * @param props - The component props
 * @param props.selectedCountry - Currently selected country option
 * @param props.onCountryChange - Callback invoked when the country selection changes
 * @param props.onReadyChange - Callback invoked when step readiness changes
 *
 * @returns JSX element rendering the country selection step
 *
 * @example
 * ```tsx
 * import SelectCountry from './SelectCountry';
 *
 * function Wizard() {
 *   const [country, setCountry] = useState<CountryOption | null>(null);
 *   return (
 *     <SelectCountry
 *       selectedCountry={country}
 *       onCountryChange={setCountry}
 *       onReadyChange={(ready) => setStepReady(ready)}
 *     />
 *   );
 * }
 * ```
 *
 * @public
 */
export default function SelectCountry({ selectedCountry, onCountryChange, onReadyChange, }: SelectCountryProps): JSX.Element;
