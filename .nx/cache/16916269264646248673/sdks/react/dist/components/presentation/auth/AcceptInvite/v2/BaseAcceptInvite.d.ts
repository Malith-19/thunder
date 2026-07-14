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
import { FlowMetadataResponse, Preferences } from '@thunderid/browser';
import { FC, ReactNode } from 'react';
import { CardProps } from '../../../../primitives/Card/Card';
/**
 * Flow response structure from the backend.
 */
export interface AcceptInviteFlowResponse {
    challengeToken?: string;
    data?: {
        additionalData?: Record<string, string>;
        components?: any[];
        meta?: {
            components?: any[];
        };
        redirectURL?: string;
    };
    executionId: string;
    failureReason?: string;
    flowStatus: 'INCOMPLETE' | 'COMPLETE' | 'ERROR';
    type?: 'VIEW' | 'REDIRECTION';
}
/**
 * Render props for custom UI rendering of AcceptInvite.
 */
export interface BaseAcceptInviteRenderProps {
    /**
     * Flow components from the current step.
     */
    components: any[];
    /**
     * API error (if any).
     */
    error?: Error | null;
    /**
     * Current flow ID from URL.
     */
    executionId?: string;
    /**
     * Field validation errors.
     */
    fieldErrors: Record<string, string>;
    /**
     * Navigate to sign in page.
     */
    goToSignIn?: () => void;
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
     * Invite token from URL.
     */
    inviteToken?: string;
    /**
     * Whether the flow has completed successfully.
     */
    isComplete: boolean;
    /**
     * Loading state.
     */
    isLoading: boolean;
    /**
     * Whether the token validation failed.
     */
    isTokenInvalid: boolean;
    /**
     * Whether the form is valid.
     */
    isValid: boolean;
    /**
     * Whether the invite token is being validated.
     */
    isValidatingToken: boolean;
    /**
     * Flow metadata returned by the platform (v2 only). `null` while loading or unavailable.
     */
    meta: FlowMetadataResponse | null;
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
 * Props for the BaseAcceptInvite component.
 */
export interface BaseAcceptInviteProps {
    /**
     * Render props function for custom UI.
     * If not provided, default UI will be rendered.
     */
    children?: (props: BaseAcceptInviteRenderProps) => ReactNode;
    /**
     * Custom CSS class name.
     */
    className?: string;
    /**
     * Flow ID from the invite link URL.
     */
    executionId?: string;
    /**
     * Invite token from the invite link URL.
     */
    inviteToken?: string;
    /**
     * Callback when the flow completes successfully.
     */
    onComplete?: () => void;
    /**
     * Callback when an error occurs.
     */
    onError?: (error: Error) => void;
    /**
     * Callback when the flow state changes.
     */
    onFlowChange?: (response: AcceptInviteFlowResponse) => void;
    /**
     * Callback to navigate to sign in page.
     */
    onGoToSignIn?: () => void;
    /**
     * Function to submit flow step data.
     * This makes a request to the flow/execute endpoint.
     */
    onSubmit: (payload: Record<string, any>) => Promise<AcceptInviteFlowResponse>;
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
 * Base component for accept invite flow (end-user).
 * Handles the flow logic for validating an invite token and setting a password.
 *
 * When no children are provided, renders a default UI with:
 * - Loading spinner during token validation
 * - Error alerts for invalid/expired tokens
 * - Password form with validation
 * - Success state with sign-in redirect
 *
 * Flow steps handled:
 * 1. Validate invite token (automatic on mount)
 * 2. Password input
 * 3. Flow completion
 */
declare const BaseAcceptInvite: FC<BaseAcceptInviteProps>;
export default BaseAcceptInvite;
//# sourceMappingURL=BaseAcceptInvite.d.ts.map