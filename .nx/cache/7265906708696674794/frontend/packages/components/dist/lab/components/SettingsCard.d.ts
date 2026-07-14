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
import type { BoxProps, PaperProps, TypographyProps } from '@wso2/oxygen-ui';
import type { ReactNode } from 'react';
interface SettingsCardSlotProps {
    /**
     * Props for the root Paper element
     */
    root?: PaperProps;
    /**
     * Props for the header Box element
     */
    header?: BoxProps;
    /**
     * Props for the title Typography element
     */
    title?: TypographyProps;
    /**
     * Props for the description Typography element
     */
    description?: TypographyProps;
    /**
     * Props for the content Paper element
     */
    content?: PaperProps;
}
interface SettingsCardProps {
    /**
     * Card title
     */
    title: string;
    /**
     * Optional description text shown below the title
     */
    description?: string;
    /**
     * Content of the card
     */
    children: ReactNode;
    /**
     * Optional toggle switch state
     */
    enabled?: boolean;
    /**
     * Optional toggle change handler
     */
    onToggle?: (enabled: boolean) => void;
    /**
     * Optional icon element to render to the left of the title
     */
    titleIcon?: ReactNode;
    /**
     * Optional custom action element to render in the header
     */
    headerAction?: ReactNode;
    /**
     * Optional props to pass to child elements
     */
    slotProps?: SettingsCardSlotProps;
}
/**
 * Reusable settings card component for application edit pages.
 * Provides consistent styling with optional enable/disable toggle.
 *
 * @example
 * ```tsx
 * <SettingsCard
 *   title="Quick Copy"
 *   description="Copy application credentials"
 * >
 *   <TextField label="Application ID" />
 * </SettingsCard>
 * ```
 *
 * @example With toggle
 * ```tsx
 * <SettingsCard
 *   title="Registration Flow"
 *   description="Allow users to register"
 *   enabled={isEnabled}
 *   onToggle={(enabled) => handleToggle(enabled)}
 * >
 *   <TextField label="Flow ID" />
 * </SettingsCard>
 * ```
 */
export default function SettingsCard({ title, description, children, enabled, onToggle, titleIcon, headerAction, slotProps, }: SettingsCardProps): import("react/jsx-runtime").JSX.Element;
export {};
