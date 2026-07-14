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
import { EmbeddedSignInFlowAuthenticator, WithPreferences } from '@thunderid/browser';
import { ReactElement } from 'react';
/**
 * Base props that all sign-in option components share.
 */
export interface BaseSignInOptionProps extends WithPreferences {
    /**
     * The authenticator configuration.
     */
    authenticator?: EmbeddedSignInFlowAuthenticator;
    /**
     * Custom CSS class name for the submit button.
     */
    buttonClassName?: string;
    /**
     * Error message to display.
     */
    error?: string | null;
    /**
     * Current form values.
     */
    formValues: Record<string, string>;
    /**
     * Custom CSS class name for form inputs.
     */
    inputClassName?: string;
    /**
     * Whether the component is in loading state.
     */
    isLoading: boolean;
    /**
     * Callback function called when input values change.
     */
    onInputChange: (param: string, value: string) => void;
    /**
     * Callback function called when the option is submitted.
     */
    onSubmit?: (authenticator: EmbeddedSignInFlowAuthenticator, formData?: Record<string, string>) => void;
    /**
     * Text for the submit button.
     */
    submitButtonText?: string;
    /**
     * Touched state for form fields.
     */
    touchedFields: Record<string, boolean>;
}
/**
 * Creates the appropriate sign-in option component based on the authenticator's ID.
 */
export declare const createSignInOption: ({ authenticator, onSubmit, buttonClassName, preferences, ...rest }: BaseSignInOptionProps) => ReactElement;
/**
 * Convenience function that creates the appropriate sign-in option component from an authenticator.
 */
export declare const createSignInOptionFromAuthenticator: (authenticator: EmbeddedSignInFlowAuthenticator, formValues: Record<string, string>, touchedFields: Record<string, boolean>, isLoading: boolean, onInputChange: (param: string, value: string) => void, onSubmit: (authenticator: EmbeddedSignInFlowAuthenticator, formData?: Record<string, string>) => void, options?: {
    buttonClassName?: string;
    error?: string | null;
    inputClassName?: string;
}) => ReactElement;
//# sourceMappingURL=SignInOptionFactory.d.ts.map