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
import { EmbeddedSignInFlowRequestV2 as EmbeddedSignInFlowRequest, EmbeddedFlowComponentV2 as EmbeddedFlowComponent, FieldErrorV2 as FieldError, FlowMetadataResponse, Preferences } from '@thunderid/browser';
import { FC, ReactNode } from 'react';
import { CardProps } from '../../../../primitives/Card/Card';
/**
 * Render props for custom UI rendering
 */
export interface BaseSignInRenderProps {
    /**
     * Flow components
     */
    components: EmbeddedFlowComponent[];
    /**
     * API error (if any)
     */
    error?: Error | null;
    /**
     * Field validation errors keyed by component ref. Populated from BOTH:
     *  - Client-side rule evaluation (component.validation rules in meta.components)
     *  - Server-side validation failures (data.fieldErrors in the flow response)
     * When the server returns multiple failing rules for one field, only the first
     * message is exposed here. The full FieldError[] array is available on the raw
     * response object (and is reflected into the BaseSignIn `serverFieldErrors` prop).
     */
    fieldErrors: Record<string, string>;
    /**
     * Function to handle input changes
     */
    handleInputChange: (name: string, value: string) => void;
    /**
     * Function to handle form submission
     */
    handleSubmit: (component: EmbeddedFlowComponent, data?: Record<string, any>) => Promise<void>;
    /**
     * Loading state
     */
    isLoading: boolean;
    /**
     * Flag indicating if the step timer has reached zero
     */
    isTimeoutDisabled?: boolean;
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
     * Flow metadata returned by the platform (v2 only). `null` while loading or unavailable.
     */
    meta: FlowMetadataResponse | null;
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
 * Props for the BaseSignIn component.
 */
export interface BaseSignInProps {
    /**
     * Additional data from the flow response.
     */
    additionalData?: Record<string, any>;
    /**
     * Custom CSS class name for the submit button.
     */
    buttonClassName?: string;
    /**
     * Render props function for custom UI
     */
    children?: (props: BaseSignInRenderProps) => ReactNode;
    /**
     * Custom CSS class name for the form container.
     */
    className?: string;
    /**
     * Array of flow components to render.
     */
    components?: EmbeddedFlowComponent[];
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
    /**
     * Flag to determine if the component is ready to be rendered.
     */
    isLoading?: boolean;
    /**
     * Timer flag disabling actions
     */
    isTimeoutDisabled?: boolean;
    /**
     * Custom CSS class name for info messages.
     */
    messageClassName?: string;
    /**
     * Callback function called when authentication fails.
     * @param error - The error that occurred during authentication.
     */
    onError?: (error: Error) => void;
    /**
     * Function to handle form submission.
     * @param payload - The form data to submit.
     * @param component - The component that triggered the submission.
     */
    onSubmit?: (payload: EmbeddedSignInFlowRequest, component: EmbeddedFlowComponent) => Promise<void>;
    /**
     * Callback function called when authentication is successful.
     * @param authData - The authentication data returned upon successful completion.
     */
    onSuccess?: (authData: Record<string, any>) => void;
    /**
     * Component-level preferences to override global i18n and theme settings.
     * Preferences are deep-merged with global ones, with component preferences
     * taking precedence. Affects this component and all its descendants.
     */
    preferences?: Preferences;
    /**
     * Field-level validation errors returned by the server in `data.fieldErrors` on the
     * most recent flow response. The component collapses these into the form's
     * `fieldErrors` state (first error per field wins), surfacing them through the same
     * render-prop / UI path as client-side validation errors. The full array is preserved
     * here for advanced consumers that want every failing rule per field.
     */
    serverFieldErrors?: FieldError[] | null;
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
 * Base SignIn component that provides generic authentication flow.
 * This component handles component-driven UI rendering and can transform input
 * structure to component-driven format automatically.
 *
 * @example
 * // Default UI
 * ```tsx
 * import { BaseSignIn } from '@thunderid/react';
 *
 * const MySignIn = () => {
 *   return (
 *     <BaseSignIn
 *       components={components}
 *       onSubmit={async (payload) => {
 *         return await handleAuth(payload);
 *       }}
 *       onSuccess={(authData) => {
 *         console.log('Success:', authData);
 *       }}
 *       className="max-w-md mx-auto"
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * // Custom UI with render props
 * ```tsx
 * <BaseSignIn components={components} onSubmit={handleSubmit}>
 *   {({values, errors, handleInputChange, handleSubmit, isLoading, components}) => (
 *     <div className="custom-form">
 *       <input
 *         name="username"
 *         value={values.username || ''}
 *         onChange={(e) => handleInputChange('username', e.target.value)}
 *       />
 *       {errors.username && <span>{errors.username}</span>}
 *       <button
 *         onClick={() => handleSubmit(components[0], values)}
 *         disabled={isLoading}
 *       >
 *         Sign In
 *       </button>
 *     </div>
 *   )}
 * </BaseSignIn>
 * ```
 */
declare const BaseSignIn: FC<BaseSignInProps>;
export default BaseSignIn;
//# sourceMappingURL=BaseSignIn.d.ts.map