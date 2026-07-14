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
import { FlowMetadataResponse, OrganizationUnitListResponse, EmbeddedFlowComponentV2 as EmbeddedFlowComponent } from '@thunderid/browser';
import { ReactElement } from 'react';
import { ComponentRendererMap } from '../../../contexts/ComponentRenderer/ComponentRendererContext';
import { UseTranslation } from '../../../hooks/useTranslation';
export type AuthType = 'signin' | 'signup' | 'recovery';
/**
 * Processes an array of components and renders them as React elements for sign-in.
 */
export declare const renderSignInComponents: (components: EmbeddedFlowComponent[], formValues: Record<string, string>, touchedFields: Record<string, boolean>, formErrors: Record<string, string>, isLoading: boolean, isFormValid: boolean, onInputChange: (name: string, value: string) => void, options?: {
    /** @internal */
    _customRenderers?: ComponentRendererMap;
    /** @internal */
    _theme?: any;
    /** Additional data from the flow response */
    additionalData?: Record<string, any>;
    buttonClassName?: string;
    inputClassName?: string;
    /** Flag to determine if the step timeline has expired */
    isTimeoutDisabled?: boolean;
    /** Flow metadata for resolving {{meta(...)}} expressions at render time */
    meta?: FlowMetadataResponse | null;
    onInputBlur?: (name: string) => void;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>, skipValidation?: boolean) => void;
    size?: "small" | "medium" | "large";
    /** Translation function for resolving {{t(...)}} expressions at render time */
    t?: UseTranslation["t"];
    variant?: any;
}) => ReactElement[];
/**
 * Processes an array of components and renders them as React elements for sign-up.
 */
export declare const renderSignUpComponents: (components: EmbeddedFlowComponent[], formValues: Record<string, string>, touchedFields: Record<string, boolean>, formErrors: Record<string, string>, isLoading: boolean, isFormValid: boolean, onInputChange: (name: string, value: string) => void, options?: {
    /** @internal */
    _customRenderers?: ComponentRendererMap;
    /** @internal */
    _theme?: any;
    /** Additional data from the flow response */
    additionalData?: Record<string, any>;
    buttonClassName?: string;
    inputClassName?: string;
    /** Flow metadata for resolving {{meta(...)}} expressions at render time */
    meta?: FlowMetadataResponse | null;
    onInputBlur?: (name: string) => void;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>, skipValidation?: boolean) => void;
    size?: "small" | "medium" | "large";
    /** Translation function for resolving {{t(...)}} expressions at render time */
    t?: UseTranslation["t"];
    variant?: any;
}) => ReactElement[];
/**
 * Processes an array of components and renders them as React elements for recovery flow.
 */
export declare const renderRecoveryComponents: (components: EmbeddedFlowComponent[], formValues: Record<string, string>, touchedFields: Record<string, boolean>, formErrors: Record<string, string>, isLoading: boolean, isFormValid: boolean, onInputChange: (name: string, value: string) => void, options?: {
    /** @internal */
    _customRenderers?: ComponentRendererMap;
    /** @internal */
    _theme?: any;
    /** Additional data from the flow response */
    additionalData?: Record<string, any>;
    buttonClassName?: string;
    inputClassName?: string;
    /** Flag to determine if the step timeline has expired */
    isTimeoutDisabled?: boolean;
    /** Flow metadata for resolving {{meta(...)}} expressions at render time */
    meta?: FlowMetadataResponse | null;
    onInputBlur?: (name: string) => void;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>, skipValidation?: boolean) => void;
    size?: "small" | "medium" | "large";
    /** Translation function for resolving {{t(...)}} expressions at render time */
    t?: UseTranslation["t"];
    variant?: any;
}) => ReactElement[];
/**
 * Processes an array of components and renders them as React elements for invite user.
 * This is used by both InviteUser and AcceptInvite components.
 */
export declare const renderInviteUserComponents: (components: EmbeddedFlowComponent[], formValues: Record<string, string>, touchedFields: Record<string, boolean>, formErrors: Record<string, string>, isLoading: boolean, isFormValid: boolean, onInputChange: (name: string, value: string) => void, options?: {
    /** @internal */
    _customRenderers?: ComponentRendererMap;
    /** @internal */
    _theme?: any;
    /** Additional data from the flow response */
    additionalData?: Record<string, any>;
    buttonClassName?: string;
    /** Function to fetch child organization units. Used by OU_SELECT component type. */
    fetchOrganizationUnitChildren?: (parentId: string, limit: number, offset: number) => Promise<OrganizationUnitListResponse>;
    inputClassName?: string;
    /** Flow metadata for resolving {{meta(...)}} expressions at render time */
    meta?: FlowMetadataResponse | null;
    onInputBlur?: (name: string) => void;
    onSubmit?: (component: EmbeddedFlowComponent, data?: Record<string, any>, skipValidation?: boolean) => void;
    size?: "small" | "medium" | "large";
    /** Translation function for resolving {{t(...)}} expressions at render time */
    t?: UseTranslation["t"];
    variant?: any;
}) => ReactElement[];
//# sourceMappingURL=AuthOptionFactory.d.ts.map