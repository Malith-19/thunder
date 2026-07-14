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
import type { JSX } from 'react';
import type { OrganizationUnit } from '../../../models/organization-unit';
/**
 * Props for the {@link EditGeneralSettings} component.
 */
interface EditGeneralSettingsProps {
    /**
     * The organization unit being displayed
     */
    organizationUnit: OrganizationUnit;
    /**
     * Callback function to open the delete confirmation dialog
     */
    onDeleteClick: () => void;
}
/**
 * Container component for general organization unit settings.
 *
 * Displays sections for:
 * - Quick copy of organization unit identifiers (Handle, ID)
 * - Parent Organization Unit information
 * - Danger zone (delete organization unit)
 *
 * @param props - Component props
 * @returns General settings sections wrapped in a Stack
 */
export default function EditGeneralSettings({ organizationUnit, onDeleteClick }: EditGeneralSettingsProps): JSX.Element;
export {};
