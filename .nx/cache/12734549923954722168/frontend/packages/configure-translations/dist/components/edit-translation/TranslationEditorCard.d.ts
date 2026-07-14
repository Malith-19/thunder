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
import { type JSX, type SyntheticEvent } from 'react';
/**
 * Props for the {@link TranslationEditorCard} component.
 *
 * @public
 */
export interface TranslationEditorCardProps {
    /** The currently selected language code, or null if none. */
    selectedLanguage: string | null;
    /** Whether the translation data is loading. */
    isLoading: boolean;
    /** The active editor tab. */
    editView: 'fields' | 'json';
    /** Current search query for the fields view. */
    search: string;
    /** Merged current values (server + local changes) for the selected namespace. */
    currentValues: Record<string, string>;
    /** Server-saved values for the selected namespace. */
    serverValues: Record<string, string>;
    /** Whether the active namespace is "custom", which allows adding new keys. */
    isCustomNamespace: boolean;
    /** Color mode passed to the JSON editor. */
    colorMode: 'light' | 'dark';
    /** Called when the user switches between the Fields and JSON tabs. */
    onTabChange: (_: SyntheticEvent, value: 'fields' | 'json') => void;
    /** Called when the search query changes. */
    onSearchChange: (search: string) => void;
    /** Called when a field value is edited. */
    onFieldChange: (key: string, value: string) => void;
    /** Called when a field is reset to its server value. */
    onResetField: (key: string) => void;
    /** Called when the JSON editor emits a full set of changes. */
    onJsonChange: (changes: Record<string, string>) => void;
}
/**
 * Tabbed card editor for translation key-value pairs. Renders a Fields view
 * (searchable list of text inputs) and a Raw JSON view. Shows a loading
 * spinner while data is being fetched.
 *
 * @param props - The component props
 *
 * @returns JSX element rendering the editor card
 *
 * @public
 */
export default function TranslationEditorCard({ selectedLanguage, isLoading, editView, search, currentValues, serverValues, isCustomNamespace, colorMode, onTabChange, onSearchChange, onFieldChange, onResetField, onJsonChange, }: TranslationEditorCardProps): JSX.Element;
