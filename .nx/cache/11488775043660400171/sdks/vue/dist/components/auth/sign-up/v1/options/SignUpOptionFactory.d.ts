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
import { type VNode } from 'vue';
/**
 * Props shared by all sign-up component renderers.
 */
export interface BaseSignUpOptionProps {
    buttonClassName?: string;
    component: EmbeddedFlowComponent;
    formErrors: Record<string, string>;
    formValues: Record<string, string>;
    inputClassName?: string;
    isFormValid: boolean;
    isLoading: boolean;
    onInputChange: (name: string, value: string) => void;
    onSubmit: (component: EmbeddedFlowComponent, data?: Record<string, any>) => void;
    size?: 'small' | 'medium' | 'large';
    touchedFields: Record<string, boolean>;
}
/**
 * Build a VNode for a single V1 flow component. Returns `null` for unknown
 * types (caller filters these out).
 */
export declare const createSignUpComponent: (props: BaseSignUpOptionProps) => VNode | VNode[] | null;
/**
 * Render an array of V1 flow components as Vue VNodes, flattening nested
 * containers (FORM) into a single list.
 */
export declare const renderSignUpComponents: (components: EmbeddedFlowComponent[], formValues: Record<string, string>, touchedFields: Record<string, boolean>, formErrors: Record<string, string>, isLoading: boolean, isFormValid: boolean, onInputChange: (name: string, value: string) => void, onSubmit: (component: EmbeddedFlowComponent, data?: Record<string, any>) => void, options?: {
    buttonClassName?: string;
    inputClassName?: string;
    size?: "small" | "medium" | "large";
}) => VNode[];
//# sourceMappingURL=SignUpOptionFactory.d.ts.map