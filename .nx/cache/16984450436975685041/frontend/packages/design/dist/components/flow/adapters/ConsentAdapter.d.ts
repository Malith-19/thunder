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
import { type ConsentPurpose } from '@thunderid/react';
import type { JSX } from 'react';
/**
 * Props for the ConsentAdapter component.
 *  Includes the raw consent data from the backend, current form values for tracking optional checkbox state,
 *  and a handler for when the user toggles an optional attribute.
 */
interface ConsentAdapterProps {
    /** Raw consent data from additionalData.consentPrompt */
    consentData?: string | ConsentPurpose[] | {
        purposes: ConsentPurpose[];
    };
    /** Current form values for tracking optional checkbox state */
    formValues: Record<string, string>;
    /** Handler invoked when the user toggles an optional attribute */
    onInputChange: (name: string, value: string) => void;
}
/**
 * Oxygen-UI styled consent adapter.
 *
 * Uses the SDK's `Consent` render-prop component to parse the backend data,
 * then renders each purpose section with oxygen-ui `Checkbox` and `Typography`.
 */
export default function ConsentAdapter({ consentData, formValues, onInputChange, }: ConsentAdapterProps): JSX.Element | null;
export {};
