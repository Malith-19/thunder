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
 * Represents a single emoji icon with associated searchable keywords.
 */
export interface EmojiIcon {
    char: string;
    keywords: string;
}
/**
 * Represents a category of emoji icons.
 */
export interface EmojiCategory {
    label: string;
    emojis: EmojiIcon[];
}
/**
 * Props for the {@link EmojiPicker} component.
 *
 * @public
 */
export interface EmojiPickerProps {
    /**
     * The currently highlighted emoji character (no `emoji:` prefix).
     */
    value?: string;
    /**
     * Fired when the user clicks an emoji tile.
     *
     * @param char - The raw emoji character.
     */
    onChange: (char: string) => void;
}
/**
 * A pure emoji-grid panel with a category filter bar and search.
 * Contains no dialog chrome — embed this inside a dialog or any other container.
 *
 * - Category tabs scroll the grid to that section and highlight as you scroll.
 * - Typing in the search field shows filtered results across all categories.
 * - Clicking an emoji tile fires {@link EmojiPickerProps.onChange} immediately.
 *
 * @public
 */
export default function EmojiPicker({ value, onChange }: EmojiPickerProps): JSX.Element;
