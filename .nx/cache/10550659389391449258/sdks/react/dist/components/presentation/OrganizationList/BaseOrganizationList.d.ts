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
import { AllOrganizationsApiResponse, Organization, Preferences } from '@thunderid/browser';
import { CSSProperties, FC, ReactNode } from 'react';
export interface OrganizationWithSwitchAccess extends Organization {
    canSwitch: boolean;
}
/**
 * Props interface for the BaseOrganizationList component.
 */
export interface BaseOrganizationListProps {
    /**
     * List of organizations discoverable to the signed-in user.
     */
    allOrganizations: AllOrganizationsApiResponse;
    /**
     * Additional CSS class names to apply to the container
     */
    className?: string;
    /**
     * Error message to display
     */
    error?: string | null;
    /**
     * Function called when "Load More" is clicked
     */
    fetchMore?: () => Promise<void>;
    /**
     * Whether there are more organizations to load
     */
    hasMore?: boolean;
    /**
     * Whether the initial data is loading
     */
    isLoading?: boolean;
    /**
     * Whether more data is being loaded
     */
    isLoadingMore?: boolean;
    /**
     * Display mode: 'inline' for normal display, 'popup' for modal dialog
     */
    mode?: 'inline' | 'popup';
    /**
     * List of organizations associated to the signed-in user.
     */
    myOrganizations: Organization[];
    /**
     * Function called when popup open state changes (only used in popup mode)
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * Function called when an organization is selected/clicked
     */
    onOrganizationSelect?: (organization: OrganizationWithSwitchAccess) => void;
    /**
     * Function called when refresh is requested
     */
    onRefresh?: () => Promise<void>;
    /**
     * Whether the popup is open (only used in popup mode)
     */
    open?: boolean;
    /**
     * Component-level preferences to override global i18n and theme settings.
     * Preferences are deep-merged with global ones, with component preferences
     * taking precedence. Affects this component and all its descendants.
     */
    preferences?: Preferences;
    /**
     * Custom renderer for when no organizations are found
     */
    renderEmpty?: () => ReactNode;
    /**
     * Custom renderer for the error state
     */
    renderError?: (error: string) => ReactNode;
    /**
     * Custom renderer for the load more button
     */
    renderLoadMore?: (onLoadMore: () => Promise<void>, isLoading: boolean) => ReactNode;
    /**
     * Custom renderer for the loading state
     */
    renderLoading?: () => ReactNode;
    /**
     * Custom renderer for each organization item
     */
    renderOrganization?: (organization: OrganizationWithSwitchAccess, index: number) => ReactNode;
    /**
     * Whether to show the organization status in the list
     */
    showStatus?: boolean;
    /**
     * Inline styles to apply to the container
     */
    style?: CSSProperties;
    /**
     * Title for the popup dialog (only used in popup mode)
     */
    title?: string;
}
/**
 * BaseOrganizationList component displays a list of organizations with pagination support.
 * This component serves as the base for framework-specific implementations.
 *
 * @example
 * ```tsx
 * <BaseOrganizationList
 *   data={organizations}
 *   isLoading={isLoading}
 *   hasMore={hasMore}
 *   fetchMore={fetchMore}
 *   error={error}
 * />
 * ```
 */
export declare const BaseOrganizationList: FC<BaseOrganizationListProps>;
export default BaseOrganizationList;
//# sourceMappingURL=BaseOrganizationList.d.ts.map