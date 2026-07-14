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
 * Props for the {@link ParentSettingsSection} component.
 */
interface ParentSettingsSectionProps {
    /**
     * The organization unit being displayed
     */
    organizationUnit: OrganizationUnit;
}
/**
 * Section component displaying the parent organization unit information.
 *
 * Shows:
 * - A link to the parent OU if one exists and is loaded
 * - A loading spinner while fetching parent OU details
 * - A "no parent" message if the OU has no parent
 * - The raw parent ID if the parent OU details cannot be resolved
 *
 * @param props - Component props
 * @returns Parent organization unit info within a SettingsCard
 */
export default function ParentSettingsSection({ organizationUnit }: ParentSettingsSectionProps): JSX.Element;
export {};
