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
 * Props for the {@link TranslationFieldsView} component.
 *
 * @public
 */
export interface TranslationFieldsViewProps {
    /** Current display values (server values merged with local edits). */
    localValues: Record<string, string>;
    /** Original server values — used to detect dirtiness and to reset. */
    serverValues: Record<string, string>;
    /** Current search query used to filter visible translation keys. */
    search: string;
    /** Whether the active namespace is "custom", which allows adding new keys. */
    isCustomNamespace: boolean;
    /** Callback invoked when the user edits a translation field value. */
    onChange: (key: string, value: string) => void;
    /** Callback invoked when the user resets a field back to its saved value. */
    onResetField: (key: string) => void;
}
/**
 * Scrollable list of translation key-value fields with inline dirty-state
 * highlighting and per-field reset controls.
 *
 * Filters the displayed keys by the provided search query. Shows an empty-state
 * message when there are no matching keys or no keys at all. Fields that differ
 * from their server-saved values are highlighted with a warning border, and a
 * reset icon button is shown to restore the saved value.
 *
 * @param props - The component props
 * @param props.localValues - Current display values (server values merged with local edits)
 * @param props.serverValues - Original server values used to detect dirtiness and to reset
 * @param props.search - Current search query used to filter visible translation keys
 * @param props.onChange - Callback invoked when the user edits a field value
 * @param props.onResetField - Callback invoked when the user resets a field to its saved value
 *
 * @returns JSX element rendering the list of translation fields
 *
 * @example
 * ```tsx
 * import TranslationFieldsView from './TranslationFieldsView';
 *
 * function Editor() {
 *   const [changes, setChanges] = useState<Record<string, string>>({});
 *   return (
 *     <TranslationFieldsView
 *       localValues={{'actions.save': 'Enregistrer'}}
 *       serverValues={{'actions.save': 'Save'}}
 *       search=""
 *       onChange={(key, val) => setChanges(prev => ({...prev, [key]: val}))}
 *       onResetField={(key) => setChanges(prev => { const n = {...prev}; delete n[key]; return n; })}
 *     />
 *   );
 * }
 * ```
 *
 * @public
 */
export default function TranslationFieldsView({ localValues, serverValues, search, isCustomNamespace, onChange, onResetField, }: TranslationFieldsViewProps): JSX.Element;
