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
 * Props for the {@link TranslationEditorHeader} component.
 *
 * @public
 */
export interface TranslationEditorHeaderProps {
    /** The currently selected language code, or null if none. */
    selectedLanguage: string | null;
    /** Whether there are unsaved local changes. */
    hasDirtyChanges: boolean;
    /** Number of dirty (unsaved) keys. */
    dirtyCount: number;
    /** Whether a save or reset operation is in progress. */
    isSaving: boolean;
    /** Whether the selected language is the fallback language (disables Reset to Default). */
    isFallbackLanguage: boolean;
    /** Whether a namespace is selected (required to enable Reset to Default). */
    hasNamespace: boolean;
    /** Called when the user clicks the back button. */
    onBack: () => void;
    /** Called when the user clicks Discard Changes. */
    onDiscard: () => void;
    /** Called when the user clicks Reset to Default. */
    onResetToDefault: () => void;
    /** Called when the user clicks Save Changes. */
    onSave: () => void;
}
/**
 * Page title bar for the translations editor. Renders a back button, the
 * current language name with its flag, and the action buttons (Discard,
 * Reset to Default, Save).
 *
 * @param props - The component props
 *
 * @returns JSX element rendering the editor header
 *
 * @public
 */
export default function TranslationEditorHeader({ selectedLanguage, hasDirtyChanges, dirtyCount, isSaving, isFallbackLanguage, hasNamespace, onBack, onDiscard, onResetToDefault, onSave, }: TranslationEditorHeaderProps): JSX.Element;
