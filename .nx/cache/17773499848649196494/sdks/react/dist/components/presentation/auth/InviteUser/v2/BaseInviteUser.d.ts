/**
 * Copyright (c) 2025-2026, WSO2 LLC. (https://www.wso2.com).
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
import { FieldErrorV2 as FieldError, FlowExecutionError, FlowMetadataResponse, OrganizationUnitListResponse, Preferences } from '@thunderid/browser';
import { FC, ReactNode } from 'react';
import { CardProps } from '../../../../primitives/Card/Card';
/**
 * Flow response structure from the backend.
 */
export interface InviteUserFlowResponse {
    challengeToken?: string;
    data?: {
        additionalData?: Record<string, any>;
        components?: any[];
        fieldErrors?: FieldError[];
        meta?: {
            components?: any[];
        };
    };
    error?: FlowExecutionError;
    executionId: string;
    flowStatus: 'INCOMPLETE' | 'COMPLETE' | 'ERROR';
    type?: 'VIEW' | 'REDIRECTION';
}
/**
 * Render props for custom UI rendering of InviteUser.
 */
export interface BaseInviteUserRenderProps {
    /**
     * Additional data from the current flow response (e.g. rootOuId, inviteLink).
     */
    additionalData?: Record<string, any>;
    /**
     * Flow components from the current step.
     */
    components: any[];
    /**
     * API error (if any).
     */
    error?: Error | null;
    /**
     * Current flow execution ID.
     */
    executionId?: string;
    /**
     * Field validation errors.
     */
    fieldErrors: Record<string, string>;
    /**
     * Current flow execution ID.
     */
    flowExecId?: string;
    /**
     * Function to handle input blur.
     */
    handleInputBlur: (name: string) => void;
    /**
     * Function to handle input changes.
     */
    handleInputChange: (name: string, value: string) => void;
    /**
     * Function to handle form submission.
     */
    handleSubmit: (component: any, data?: Record<string, any>) => Promise<void>;
    /**
     * Loading state.
     */
    isLoading: boolean;
    /**
     * Whether the form is valid.
     */
    isValid: boolean;
    /**
     * Flow metadata returned by the platform (v2 only). `null` while loading or unavailable.
     */
    meta: FlowMetadataResponse | null;
    /**
     * Reset the flow to invite another user.
     */
    resetFlow: () => void;
    /**
     * Subtitle for the current step.
     */
    subtitle?: string;
    /**
     * Title for the current step.
     */
    title?: string;
    /**
     * Touched fields.
     */
    touched: Record<string, boolean>;
    /**
     * Form values for the current step.
     */
    values: Record<string, string>;
}
/**
 * Props for the BaseInviteUser component.
 */
export interface BaseInviteUserProps {
    /**
     * Render props function for custom UI.
     * If not provided, default UI will be rendered.
     */
    children?: (props: BaseInviteUserRenderProps) => ReactNode;
    /**
     * Custom CSS class name.
     */
    className?: string;
    /**
     * Function to fetch child organization units.
     * When provided, enables the OU tree picker for OU_SELECT components.
     */
    fetchOrganizationUnitChildren?: (parentId: string, limit: number, offset: number) => Promise<OrganizationUnitListResponse>;
    /**
     * Whether the SDK is initialized.
     */
    isInitialized?: boolean;
    /**
     * Callback when an error occurs.
     */
    onError?: (error: Error) => void;
    /**
     * Callback when the flow state changes.
     */
    onFlowChange?: (response: InviteUserFlowResponse) => void;
    /**
     * Function to initialize the invite user flow.
     * This should make an authenticated request to the flow/execute endpoint.
     */
    onInitialize: (payload: Record<string, any>) => Promise<InviteUserFlowResponse>;
    /**
     * Function to submit flow step data.
     * This should make an authenticated request to the flow/execute endpoint.
     */
    onSubmit: (payload: Record<string, any>) => Promise<InviteUserFlowResponse>;
    /**
     * Component-level preferences to override global i18n and theme settings.
     * Preferences are deep-merged with global ones, with component preferences
     * taking precedence. Affects this component and all its descendants.
     */
    preferences?: Preferences;
    /**
     * Whether to show the subtitle.
     */
    showSubtitle?: boolean;
    /**
     * Whether to show the title.
     */
    showTitle?: boolean;
    /**
     * Size variant for the component.
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Theme variant for the component.
     */
    variant?: CardProps['variant'];
}
/**
 * Base component for invite user flow.
 * Handles the flow logic for creating a user and generating an invite link.
 *
 * When no children are provided, renders a default UI with:
 * - Loading spinner during initialization
 * - Error alerts for failures
 * - Flow components (user type selection, user details form)
 * - Invite link display with copy functionality
 *
 * Flow steps handled:
 * 1. User type selection (if multiple types available)
 * 2. User details input (username, email)
 * 3. Invite link generation
 */
declare const BaseInviteUser: FC<BaseInviteUserProps>;
export default BaseInviteUser;
//# sourceMappingURL=BaseInviteUser.d.ts.map