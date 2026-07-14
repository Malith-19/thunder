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
import { FlowMetadataResponse, EmbeddedFlowComponentV2 as EmbeddedFlowComponent } from '@thunderid/browser';
import { type VNode } from 'vue';
type TranslationFn = (key: string, params?: Record<string, string | number>) => string;
export type { TranslationFn };
/**
 * Processes an array of components and renders them as VNodes for sign-in.
 */
export declare const renderSignInComponents: (components: EmbeddedFlowComponent[], formValues: Record<string, string>, touchedFields: Record<string, boolean>, formErrors: Record<string, string>, isLoading: boolean, isFormValid: boolean, onInputChange: (name: string, value: string) => void, options?: {
    additionalData?: Record<string, any>;
    buttonClassName?: string;
    inputClassName?: string;
    isTimeoutDisabled?: boolean;
    meta?: FlowMetadataResponse | null;
    onInputBlur?: (name: string) => void;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>, skipValidation?: boolean) => void;
    size?: "small" | "medium" | "large";
    t?: TranslationFn;
    variant?: any;
}) => VNode[];
/**
 * Processes an array of components and renders them as VNodes for sign-up.
 * Identical to renderSignInComponents — separated for semantic clarity.
 */
export declare const renderSignUpComponents: (components: EmbeddedFlowComponent[], formValues: Record<string, string>, touchedFields: Record<string, boolean>, formErrors: Record<string, string>, isLoading: boolean, isFormValid: boolean, onInputChange: (name: string, value: string) => void, options?: {
    additionalData?: Record<string, any>;
    buttonClassName?: string;
    inputClassName?: string;
    isTimeoutDisabled?: boolean;
    meta?: FlowMetadataResponse | null;
    onInputBlur?: (name: string) => void;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>, skipValidation?: boolean) => void;
    size?: "small" | "medium" | "large";
    t?: TranslationFn;
    variant?: any;
}) => VNode[];
/**
 * Processes an array of components and renders them as VNodes for invite-user flows.
 * Identical to renderSignInComponents — separated for semantic clarity.
 */
export declare const renderInviteUserComponents: (components: EmbeddedFlowComponent[], formValues: Record<string, string>, touchedFields: Record<string, boolean>, formErrors: Record<string, string>, isLoading: boolean, isFormValid: boolean, onInputChange: (name: string, value: string) => void, options?: {
    additionalData?: Record<string, any>;
    buttonClassName?: string;
    inputClassName?: string;
    isTimeoutDisabled?: boolean;
    meta?: FlowMetadataResponse | null;
    onInputBlur?: (name: string) => void;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>, skipValidation?: boolean) => void;
    size?: "small" | "medium" | "large";
    t?: TranslationFn;
    variant?: any;
}) => VNode[];
//# sourceMappingURL=AuthOptionFactoryCore.d.ts.map