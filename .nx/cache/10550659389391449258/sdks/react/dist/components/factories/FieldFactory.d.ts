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
import { FieldType } from '@thunderid/browser';
import { FC, ReactElement } from 'react';
import { SelectOption } from '../primitives/Select/Select';
/**
 * Interface for field configuration.
 */
export interface FieldConfig {
    /**
     * Additional CSS class name.
     */
    className?: string;
    /**
     * Whether the field is disabled.
     */
    disabled?: boolean;
    /**
     * Error message to display.
     */
    error?: string;
    /**
     * Display name for the field.
     */
    label: string;
    /**
     * The name of the field.
     */
    name: string;
    /**
     * Callback function when the field loses focus.
     */
    onBlur?: () => void;
    /**
     * Callback function when the field value changes.
     */
    onChange: (value: string) => void;
    /**
     * Additional options for multi-valued fields.
     */
    options?: SelectOption[];
    /**
     * Placeholder text for the field.
     */
    placeholder?: string;
    /**
     * Whether the field is required.
     */
    required: boolean;
    /**
     * Whether the field has been touched/interacted with by the user.
     */
    touched?: boolean;
    /**
     * The field type.
     */
    type: FieldType;
    /**
     * Current value of the field.
     */
    value: string;
}
/**
 * Utility function to validate field values based on type
 */
export declare const validateFieldValue: (value: string, type: FieldType, required?: boolean, touched?: boolean) => string | null;
/**
 * Factory function to create form fields based on the EmbeddedSignInFlowAuthenticatorParamType.
 *
 * @param config - The field configuration
 * @returns The appropriate React component for the field type
 *
 * @example
 * ```tsx
 * const field = createField({
 *   param: 'username',
 *   type: EmbeddedSignInFlowAuthenticatorParamType.String,
 *   label: 'Username',
 *   confidential: false,
 *   required: true,
 *   value: '',
 *   onChange: (value) => console.log(value)
 * });
 * ```
 */
export declare const createField: (config: FieldConfig) => ReactElement;
/**
 * React component wrapper for the field factory.
 */
export declare const FieldFactory: FC<FieldConfig>;
export default FieldFactory;
//# sourceMappingURL=FieldFactory.d.ts.map