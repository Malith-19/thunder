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
import type { AvatarProps } from '@wso2/oxygen-ui';
import type { ReactNode, JSX } from 'react';
/**
 * Props for the {@link ResourceAvatar} component.
 *
 * @public
 */
export interface ResourceAvatarProps extends Omit<AvatarProps, 'onSelect'> {
    /**
     * Whether the avatar is editable. When `true`, the edit button is shown and the dialog can be opened.
     */
    editable?: boolean;
    /**
     * The icon value — an `emoji:`-prefixed string, a raw emoji character, or an image URL.
     * When empty or undefined, renders the fallback.
     */
    value?: string;
    /**
     * Size in pixels for both width and height. Defaults to 40.
     */
    size?: number;
    /**
     * Fallback icon rendered when value is empty or when a URL fails to load.
     */
    fallback?: ReactNode;
    /**
     * When provided, the avatar becomes editable: an overlay pencil button is
     * shown and clicking either the avatar or the button opens
     * {@link ResourceLogoDialog}. The callback receives the confirmed value
     * (`emoji:<char>` or a raw URL).
     */
    onSelect?: (value: string) => void;
    /**
     * Accessible label for the edit button (only relevant when `onSelect` is set).
     * Defaults to `"Change logo"`.
     */
    editAriaLabel?: string;
    /**
     * Optional click handler (used in read-only contexts, e.g. selecting from a
     * suggestion list). If `onSelect` is also provided, `onSelect` takes
     * precedence for opening the dialog.
     */
    onClick?: () => void;
}
/**
 * A smart avatar that renders a resource icon from an emoji or image URL.
 *
 * **Read-only mode** (no `onSelect`): renders just the Avatar.
 *
 * **Edit mode** (`onSelect` provided): wraps the Avatar in a relative container,
 * shows an overlaid pencil button, and manages a {@link ResourceLogoDialog}
 * internally. No external state or dialog wiring needed by the caller.
 *
 * @example
 * ```tsx
 * // Read-only
 * <ResourceAvatar value="emoji:🐼" size={40} fallback={<AppWindow />} />
 *
 * // Editable
 * <ResourceAvatar
 *   editable
 *   value={app.logoUrl}
 *   size={40}
 *   fallback="emoji:🖥️"
 *   onSelect={(val) => setApp({...app, logoUrl: val})}
 * />
 * ```
 *
 * @public
 */
export default function ResourceAvatar({ editable, value, size, fallback, sx, onSelect, editAriaLabel, onClick, ...rest }: ResourceAvatarProps): JSX.Element;
