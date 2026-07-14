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
import type { LocaleOption } from '@thunderid/i18n';
import { type JSX } from 'react';
/**
 * Props for the {@link ReviewLocaleCode} component.
 *
 * @public
 */
export interface ReviewLocaleCodeProps {
    /** The locale code derived from the previous steps — used as the default value. */
    derivedLocale: LocaleOption;
    /** The current override value entered by the user (controlled). */
    localeCode: string;
    /** Callback invoked when the user edits the locale code input. */
    onLocaleCodeChange: (code: string) => void;
    /** Callback invoked whenever the step readiness changes (e.g. input becomes non-empty). */
    onReadyChange?: (isReady: boolean) => void;
}
/**
 * Step component in the language creation wizard that allows the user to review
 * and optionally override the BCP 47 locale code derived from the country and
 * language selections.
 *
 * Shows a preview of the flag emoji and resolved display name for the effective
 * locale code, along with a helper tip about the BCP 47 format.
 *
 * @param props - The component props
 * @param props.derivedLocale - Locale derived from the previous wizard steps, used as the default
 * @param props.localeCode - Current user-entered override value (controlled)
 * @param props.onLocaleCodeChange - Callback invoked when the locale code input changes
 * @param props.onReadyChange - Callback invoked when step readiness changes
 *
 * @returns JSX element rendering the locale code review step
 *
 * @example
 * ```tsx
 * import ReviewLocaleCode from './ReviewLocaleCode';
 *
 * function Wizard() {
 *   const [code, setCode] = useState('');
 *   return (
 *     <ReviewLocaleCode
 *       derivedLocale={{code: 'fr-FR', displayName: 'French (France)', flag: '🇫🇷'}}
 *       localeCode={code}
 *       onLocaleCodeChange={setCode}
 *       onReadyChange={(ready) => setStepReady(ready)}
 *     />
 *   );
 * }
 * ```
 *
 * @public
 */
export default function ReviewLocaleCode({ derivedLocale, localeCode, onLocaleCodeChange, onReadyChange, }: ReviewLocaleCodeProps): JSX.Element;
