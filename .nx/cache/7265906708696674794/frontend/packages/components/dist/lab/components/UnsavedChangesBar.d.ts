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
export interface UnsavedChangesBarProps {
    /** Label for the unsaved changes message. */
    message: string;
    /** Label for the reset button. */
    resetLabel: string;
    /** Label for the save button in idle state. */
    saveLabel: string;
    /** Label for the save button while saving is in progress. */
    savingLabel: string;
    /** Whether a save operation is currently in progress. */
    isSaving: boolean;
    /** Whether the save button should be disabled (e.g. due to validation errors). */
    saveDisabled?: boolean;
    /** Called when the reset button is clicked. */
    onReset: () => void;
    /** Called when the save button is clicked. */
    onSave: () => void;
}
/**
 * A fixed bottom action bar shown when a form has unsaved changes.
 * Provides reset and save actions.
 */
export default function UnsavedChangesBar({ message, resetLabel, saveLabel, savingLabel, isSaving, saveDisabled, onReset, onSave, }: UnsavedChangesBarProps): import("react/jsx-runtime").JSX.Element;
