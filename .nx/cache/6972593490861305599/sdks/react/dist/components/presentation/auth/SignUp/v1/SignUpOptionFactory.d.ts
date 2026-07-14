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
import { EmbeddedFlowComponent } from '@thunderid/browser';
import { ReactElement } from 'react';
import { AdapterProps } from '../../../../../models/adapters';
/**
 * Creates the appropriate sign-up component based on the component type.
 */
export declare const createSignUpComponent: ({ component, onSubmit, ...rest }: AdapterProps) => ReactElement;
/**
 * Convenience function that creates the appropriate sign-up component from flow component data.
 */
export declare const createSignUpOptionFromComponent: (component: EmbeddedFlowComponent, formValues: Record<string, string>, touchedFields: Record<string, boolean>, formErrors: Record<string, string>, isLoading: boolean, isFormValid: boolean, onInputChange: (name: string, value: string) => void, options?: {
    buttonClassName?: string;
    inputClassName?: string;
    key?: string | number;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>) => void;
    size?: "small" | "medium" | "large";
    variant?: any;
}) => ReactElement;
/**
 * Processes an array of components and renders them as React elements.
 */
export declare const renderSignUpComponents: (components: EmbeddedFlowComponent[], formValues: Record<string, string>, touchedFields: Record<string, boolean>, formErrors: Record<string, string>, isLoading: boolean, isFormValid: boolean, onInputChange: (name: string, value: string) => void, options?: {
    buttonClassName?: string;
    inputClassName?: string;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>) => void;
    size?: "small" | "medium" | "large";
    variant?: any;
}) => ReactElement[];
//# sourceMappingURL=SignUpOptionFactory.d.ts.map