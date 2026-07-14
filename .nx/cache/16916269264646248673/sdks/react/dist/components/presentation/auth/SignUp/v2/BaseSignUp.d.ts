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
import { EmbeddedFlowExecuteRequestPayload, EmbeddedFlowExecuteResponse, Preferences } from '@thunderid/browser';
import { FC, ReactNode } from 'react';
import { CardProps } from '../../../../primitives/Card/Card';
/**
 * Render props for custom UI rendering
 */
export interface BaseSignUpRenderProps {
    /**
     * Flow components
     */
    components: any[];
    /**
     * API error (if any)
     */
    error?: Error | null;
    /**
     * Field validation errors
     */
    fieldErrors: Record<string, string>;
    /**
     * Function to handle input changes
     */
    handleInputChange: (name: string, value: string) => void;
    /**
     * Function to handle form submission
     */
    handleSubmit: (component: any, data?: Record<string, any>) => Promise<void>;
    /**
     * Loading state
     */
    isLoading: boolean;
    /**
     * Whether the form is valid
     */
    isValid: boolean;
    /**
     * Flow messages
     */
    messages: {
        message: string;
        type: string;
    }[];
    /**
     * Flow subtitle
     */
    subtitle: string;
    /**
     * Flow title
     */
    title: string;
    /**
     * Touched fields
     */
    touched: Record<string, boolean>;
    /**
     * Function to validate the form
     */
    validateForm: () => {
        fieldErrors: Record<string, string>;
        isValid: boolean;
    };
    /**
     * Form values
     */
    values: Record<string, string>;
}
/**
 * Props for the BaseSignUp component.
 */
export interface BaseSignUpProps {
    /**
     * URL to redirect after successful sign-up.
     */
    afterSignUpUrl?: string;
    /**
     * Custom CSS class name for the submit button.
     */
    buttonClassName?: string;
    /**
     * Render props function for custom UI
     */
    children?: (props: BaseSignUpRenderProps) => ReactNode;
    /**
     * Custom CSS class name for the form container.
     */
    className?: string;
    /**
     * Error object to display
     */
    error?: Error | null;
    /**
     * Custom CSS class name for error messages.
     */
    errorClassName?: string;
    /**
     * Custom CSS class name for form inputs.
     */
    inputClassName?: string;
    isInitialized?: boolean;
    /**
     * Custom CSS class name for info messages.
     */
    messageClassName?: string;
    /**
     * Callback function called when the sign-up flow completes and requires redirection.
     * This allows platform-specific handling of redirects (e.g., Next.js router.push).
     * @param response - The response from the sign-up flow containing the redirect URL, etc.
     */
    onComplete?: (response: EmbeddedFlowExecuteResponse) => void;
    /**
     * Callback function called when sign-up fails.
     * @param error - The error that occurred during sign-up.
     */
    onError?: (error: Error) => void;
    /**
     * Callback function called when sign-up flow status changes.
     * @param response - The current sign-up response.
     */
    onFlowChange?: (response: EmbeddedFlowExecuteResponse) => void;
    /**
     * Function to initialize sign-up flow.
     * @returns Promise resolving to the initial sign-up response.
     */
    onInitialize?: (payload?: EmbeddedFlowExecuteRequestPayload) => Promise<EmbeddedFlowExecuteResponse>;
    /**
     * Function to handle sign-up steps.
     * @param payload - The sign-up payload.
     * @returns Promise resolving to the sign-up response.
     */
    onSubmit?: (payload: EmbeddedFlowExecuteRequestPayload) => Promise<EmbeddedFlowExecuteResponse>;
    /**
     * Component-level preferences to override global i18n and theme settings.
     * Preferences are deep-merged with global ones, with component preferences
     * taking precedence. Affects this component and all its descendants.
     */
    preferences?: Preferences;
    /**
     *  Whether to redirect after sign-up.
     */
    shouldRedirectAfterSignUp?: boolean;
    /**
     * Whether to show the logo.
     */
    showLogo?: boolean;
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
 * BaseSignUp component that provides embedded sign-up flow for ThunderIDV2.
 * This component handles both the presentation layer and sign-up flow logic.
 * It accepts API functions as props to maintain framework independence.
 */
declare const BaseSignUp: FC<BaseSignUpProps>;
export default BaseSignUp;
//# sourceMappingURL=BaseSignUp.d.ts.map