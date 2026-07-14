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
import { type ReactElement } from 'react';
/**
 * UI strings displayed by {@link I18nTextInput}. All fields are optional; English fallbacks
 * are used for any string not provided. Callers typically resolve these from their own i18n
 * namespace and pass the resolved strings down so the component stays namespace-agnostic.
 */
export interface I18nTextInputLabels {
    /** Tooltip on the icon button that opens the popover. Default: "Configure translation". */
    triggerTooltip?: string;
    /** Heading inside the popover when selecting an existing key. Default: "Translation". */
    popoverTitle?: string;
    /** Heading inside the popover when creating a new key. Default: "Create New Translation". */
    createTitle?: string;
    /** Tooltip on the "create new" button. Default: "Create a new translation key". */
    createTooltip?: string;
    /** Label for the language selector. Default: "Language". */
    languageLabel?: string;
    /** Label for the translation key field. Default: "Translation Key". */
    keyLabel?: string;
    /** Placeholder for the key autocomplete in select mode. Default: "Select a translation key". */
    selectKeyPlaceholder?: string;
    /** Label for the translation value field. Default: "Translation Value". */
    valueLabel?: string;
    /** Caption above the rendered translation. Default: "Resolved value". */
    resolvedValueLabel?: string;
    /** Error message when the key field is empty on create. Default: "Translation key is required". */
    keyRequiredError?: string;
    /** Error message when the value field is empty on create. Default: "Translation value is required". */
    valueRequiredError?: string;
    /**
     * Error message when the key contains characters outside `[a-zA-Z0-9._-]`. Default: "Key may only
     * contain letters, numbers, dots, hyphens, and underscores".
     */
    invalidKeyFormatError?: string;
    /** Cancel button label. Default: "Cancel". */
    cancelLabel?: string;
    /** Create button label. Default: "Create". */
    createLabel?: string;
    /** Close (X) button aria-label. Default: "Close". */
    closeLabel?: string;
    /** Generic fallback used when the create-translation API returns an unparseable error. Default: "An unknown error occurred". */
    unknownError?: string;
}
/**
 * Props interface of {@link I18nTextInput}
 */
export interface I18nTextInputProps {
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
    defaultNewKey?: string;
    /** Optional UI string overrides; English fallbacks are used for any not provided. */
    labels?: I18nTextInputLabels;
    /**
     * Optional callback invoked after a new translation has been successfully persisted via the
     * i18n API. Hosts wire this up to their own translation cache invalidation logic.
     */
    onTranslationCreated?: () => void;
}
/**
 * A text input with an i18n button that opens a popover for selecting or creating translation
 * keys. The component is i18n-namespace-agnostic — callers pass their own UI strings via the
 * optional `labels` prop and wire up post-create cache invalidation via `onTranslationCreated`.
 */
export default function I18nTextInput({ label, value, onChange, placeholder, defaultNewKey, labels: labelsProp, onTranslationCreated, }: I18nTextInputProps): ReactElement;
