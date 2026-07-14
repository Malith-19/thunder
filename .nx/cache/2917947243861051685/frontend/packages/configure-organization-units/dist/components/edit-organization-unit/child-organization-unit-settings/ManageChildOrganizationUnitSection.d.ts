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
import { type JSX } from 'react';
/**
 * Props for the {@link ManageChildOrganizationUnitSection} component.
 */
interface ManageChildOrganizationUnitSectionProps {
    /**
     * The ID of the parent organization unit
     */
    organizationUnitId: string;
    /**
     * The name of the parent organization unit (for back navigation)
     */
    organizationUnitName: string;
}
/**
 * Section component for managing child organization units.
 *
 * Displays a DataGrid of child organization units with:
 * - Avatar icon
 * - Name
 * - Handle
 * - Description
 *
 * Clicking a row navigates to that child OU's detail page.
 *
 * @param props - Component props
 * @returns Manage child OUs section within a SettingsCard
 */
export default function ManageChildOrganizationUnitSection({ organizationUnitId, organizationUnitName, }: ManageChildOrganizationUnitSectionProps): JSX.Element;
export {};
