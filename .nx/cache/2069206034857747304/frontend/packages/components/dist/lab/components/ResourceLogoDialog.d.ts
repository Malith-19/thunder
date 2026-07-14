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
 * Props for the {@link ResourceLogoDialog} component.
 *
 * @public
 */
export interface ResourceLogoDialogProps {
    /** Whether the dialog is open. */
    open: boolean;
    /** Callback to close the dialog without selecting. */
    onClose: () => void;
    /**
     * The currently committed value — an `emoji:`-prefixed string or an image URL.
     * Used to pre-populate the dialog when it opens.
     */
    value?: string;
    /**
     * Fired when the user confirms their selection.
     *
     * @param value - `emoji:<char>` or a raw image URL.
     */
    onSelect: (value: string) => void;
}
/**
 * A dialog that lets the user choose a resource logo — either by picking an
 * emoji from the {@link EmojiPicker} grid or by entering a custom image URL.
 *
 * @public
 */
export default function ResourceLogoDialog({ open, onClose, value, onSelect, }: ResourceLogoDialogProps): JSX.Element;
