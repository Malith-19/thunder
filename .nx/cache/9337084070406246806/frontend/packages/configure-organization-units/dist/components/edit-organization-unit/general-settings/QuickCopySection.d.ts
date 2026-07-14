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
import type { OrganizationUnit } from '../../../models/organization-unit';
/**
 * Props for the {@link QuickCopySection} component.
 */
interface QuickCopySectionProps {
    /**
     * The organization unit being displayed
     */
    organizationUnit: OrganizationUnit;
    /**
     * The name of the field that was recently copied to clipboard
     */
    copiedField: string | null;
    /**
     * Callback function to copy text to clipboard
     * @param text - The text to copy
     * @param fieldName - The name of the field being copied
     */
    onCopyToClipboard: (text: string, fieldName: string) => Promise<void>;
}
/**
 * Section component for quickly copying organization unit identifiers.
 *
 * Displays read-only text fields with copy buttons for:
 * - Handle (unique identifier)
 * - Organization Unit ID
 *
 * Provides visual feedback when values are copied.
 *
 * @param props - Component props
 * @returns Quick copy UI within a SettingsCard
 */
export default function QuickCopySection({ organizationUnit, copiedField, onCopyToClipboard }: QuickCopySectionProps): import("react/jsx-runtime").JSX.Element;
export {};
