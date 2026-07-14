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
 * Props for the {@link TranslationJsonEditor} component.
 *
 * @public
 */
export interface TranslationJsonEditorProps {
    /** Current merged values (server + local edits). */
    values: Record<string, string>;
    /** Keys from the server — used to block adding new keys in non-custom namespaces. */
    serverKeys: string[];
    /** Whether the active namespace is "custom", which allows adding new keys. */
    isCustomNamespace: boolean;
    /** Current color mode used to apply the Monaco editor theme. */
    colorMode: 'light' | 'dark';
    /**
     * Called whenever the editor contains valid JSON that parses to a `Record<string, string>`.
     * The parent uses this to update its local changes state.
     */
    onChange: (changes: Record<string, string>) => void;
}
/**
 * Monaco-based JSON editor for bulk-editing translation key-value pairs.
 *
 * Displays the current translation values as formatted JSON and notifies the
 * parent whenever the editor content is valid JSON that parses to a flat
 * `Record<string, string>`. Invalid JSON is indicated with a warning alert;
 * the {@link TranslationJsonEditorProps.onChange} callback is suppressed until
 * the content is valid again.
 *
 * @param props - The component props
 * @param props.values - Current merged translation values shown in the editor
 * @param props.colorMode - Current color mode used to apply the Monaco editor theme
 * @param props.onChange - Callback invoked with the parsed record when the JSON is valid
 *
 * @returns JSX element rendering the Monaco JSON editor
 *
 * @example
 * ```tsx
 * import TranslationJsonEditor from './TranslationJsonEditor';
 *
 * function Editor() {
 *   const [changes, setChanges] = useState<Record<string, string>>({});
 *   return (
 *     <TranslationJsonEditor
 *       values={{'actions.save': 'Save'}}
 *       colorMode="light"
 *       onChange={setChanges}
 *     />
 *   );
 * }
 * ```
 *
 * @public
 */
export default function TranslationJsonEditor({ values, serverKeys, isCustomNamespace, colorMode, onChange, }: TranslationJsonEditorProps): JSX.Element;
