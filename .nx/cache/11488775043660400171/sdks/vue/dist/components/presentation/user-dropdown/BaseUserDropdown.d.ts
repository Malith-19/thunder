/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
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
import { type User } from '@thunderid/browser';
import { type Component, type VNode } from 'vue';
/**
 * A single item in the dropdown menu.
 *
 * @example
 * ```ts
 * const items: DropdownMenuItem[] = [
 *   { label: 'Settings', icon: h(SettingsIcon, { size: 15 }), onClick: () => router.push('/settings') },
 *   { label: 'Help',     onClick: openHelp, separatorBefore: true },
 *   { label: 'Delete account', onClick: deleteAccount, danger: true, separatorBefore: true },
 * ];
 * ```
 */
export interface DropdownMenuItem {
    /** Renders with red text and red hover background. Use for destructive actions. */
    danger?: boolean;
    /** Optional icon VNode rendered to the left of the label. */
    icon?: VNode | null;
    /** The visible text label. */
    label: string;
    /** Called when the item is clicked (menu closes first). */
    onClick: () => void;
    /** When `true`, a thin divider is rendered immediately before this item. */
    separatorBefore?: boolean;
}
export interface BaseUserDropdownProps {
    className?: string;
    isProfileModalOpen?: boolean;
    menuAlign?: 'auto' | 'left' | 'right';
    menuItems?: DropdownMenuItem[];
    onProfileClick?: () => void;
    onProfileModalClose?: () => void;
    onSignOut?: () => void;
    profileContent?: VNode | null;
    showChevron?: boolean;
    size?: 'sm' | 'md' | 'lg';
    user?: User | null;
}
declare const BaseUserDropdown: Component;
export default BaseUserDropdown;
//# sourceMappingURL=BaseUserDropdown.d.ts.map