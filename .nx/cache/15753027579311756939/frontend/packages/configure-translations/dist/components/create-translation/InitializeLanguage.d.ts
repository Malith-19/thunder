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
import { type JSX } from 'react';
/**
 * Props for the {@link InitializeLanguage} component.
 *
 * @public
 */
export interface InitializeLanguageProps {
    /** Whether the user has chosen to pre-populate keys from English (en-US). */
    populateFromEnglish: boolean;
    /** Callback invoked when the user changes the initialization strategy. */
    onPopulateChange: (value: boolean) => void;
    /** Whether language creation is currently in progress. */
    isCreating: boolean;
    /** Creation progress percentage (0–100), displayed while creation is in progress. */
    progress: number;
}
/**
 * Step component for the language creation wizard that lets the user choose how
 * to initialize the new language's translation keys.
 *
 * Presents two card options — copying from English (en-US) or starting with
 * empty values — and shows a progress bar while keys are being written to the
 * server.
 *
 * @param props - The component props
 * @param props.populateFromEnglish - Whether the user has chosen to copy from English
 * @param props.onPopulateChange - Callback invoked when the initialization strategy changes
 * @param props.isCreating - Whether language creation is currently in progress
 * @param props.progress - Creation progress percentage (0–100)
 *
 * @returns JSX element rendering the initialization strategy selector
 *
 * @example
 * ```tsx
 * import InitializeLanguage from './InitializeLanguage';
 *
 * function Wizard() {
 *   const [populate, setPopulate] = useState(true);
 *   return (
 *     <InitializeLanguage
 *       populateFromEnglish={populate}
 *       onPopulateChange={setPopulate}
 *       isCreating={false}
 *       progress={0}
 *     />
 *   );
 * }
 * ```
 *
 * @public
 */
export default function InitializeLanguage({ populateFromEnglish, onPopulateChange, isCreating, progress, }: InitializeLanguageProps): JSX.Element;
