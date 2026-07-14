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
import { type DrawerProps } from '@wso2/oxygen-ui';
import { type ReactElement, type ReactNode } from 'react';
/**
 * Props interface of {@link BuilderFloatingPanel}
 */
export interface BuilderFloatingPanelProps {
    /**
     * Whether the panel is open.
     */
    open: boolean;
    /**
     * Callback invoked when the panel is closed.
     */
    onClose: () => void;
    /**
     * Container element for the MUI Modal portal.
     * Typically the element with `id="drawer-container"` that wraps the canvas.
     * @defaultValue undefined
     */
    container?: Element | null;
    /**
     * Width of the panel in pixels.
     * @defaultValue 350
     */
    width?: number;
    /**
     * Side from which the panel slides in.
     * @defaultValue 'right'
     */
    anchor?: DrawerProps['anchor'];
    /**
     * Additional sx overrides merged into the Drawer paper element.
     * Use this to customise positioning, colours, or spacing per usage context.
     */
    paperSx?: object;
    /**
     * Content rendered inside the floating panel.
     */
    children?: ReactNode;
}
/**
 * Floating side panel rendered as an absolutely-positioned temporary Drawer within a canvas container.
 *
 * The panel renders portal-ed inside the provided `container` element (e.g. `#drawer-container`)
 * so it appears to float over the canvas rather than the full viewport.
 * Pointer events are disabled on the backdrop so canvas interactions remain active when the panel is open.
 *
 * @param props - Props injected to the component.
 * @returns The BuilderFloatingPanel component.
 */
declare function BuilderFloatingPanel({ open, onClose, container, width, anchor, paperSx, children, ...rest }: BuilderFloatingPanelProps): ReactElement;
declare const _default: import("react").MemoExoticComponent<typeof BuilderFloatingPanel>;
export default _default;
