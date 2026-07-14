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
import { type HTMLAttributes, type ReactElement } from 'react';
/**
 * Props interface of {@link BuilderPanelHeader}
 */
export interface BuilderPanelHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Current title of the builder resource (e.g. flow name).
     */
    title?: string;
    /**
     * URL-friendly identifier displayed beneath the title.
     */
    handle?: string;
    /**
     * Callback to navigate back. When omitted the back button is not rendered.
     */
    onBack?: () => void;
    /**
     * Callback to collapse the side panel. When omitted the collapse button is not rendered.
     */
    onPanelToggle?: () => void /**
     * Callback invoked with the new title when the user saves an edit.
     * When omitted, the edit icon is not shown.
     */;
    onTitleChange?: (newTitle: string) => void;
    /**
     * Label for the back button.
     * @defaultValue "Back"
     */
    backLabel?: string;
    /**
     * Tooltip for the collapse (hide panel) button.
     * @defaultValue "Hide panel"
     */
    hidePanelTooltip?: string;
    /**
     * Tooltip for the edit title icon button.
     * @defaultValue "Edit title"
     */
    editTitleTooltip?: string;
    /**
     * Tooltip for the save title icon button.
     * @defaultValue "Save"
     */
    saveTitleTooltip?: string;
    /**
     * Tooltip for the cancel edit icon button.
     * @defaultValue "Cancel"
     */
    cancelEditTooltip?: string;
}
/**
 * Reusable header for builder side panels.
 *
 * Renders a back-navigation button, an optional panel-collapse toggle, and an
 * inline-editable title with an optional URL-friendly handle displayed below it.
 *
 * @param props - Props injected to the component.
 * @returns The BuilderPanelHeader component.
 */
declare function BuilderPanelHeader({ title, handle, onBack, onPanelToggle, onTitleChange, backLabel, hidePanelTooltip, editTitleTooltip, saveTitleTooltip, cancelEditTooltip, ...rest }: BuilderPanelHeaderProps): ReactElement;
declare const _default: import("react").MemoExoticComponent<typeof BuilderPanelHeader>;
export default _default;
