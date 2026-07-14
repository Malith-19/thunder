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
import { EmbeddedSignInFlowRequestV2 as EmbeddedSignInFlowRequest, EmbeddedFlowComponentV2 as EmbeddedFlowComponent, FlowMetadataResponse } from '@thunderid/browser';
import { type Component } from 'vue';
/**
 * Render props passed to the default scoped slot for custom UI rendering.
 */
export interface BaseSignInRenderProps {
    components: EmbeddedFlowComponent[];
    error?: Error | null;
    fieldErrors: Record<string, string>;
    handleInputChange: (name: string, value: string) => void;
    handleSubmit: (component: EmbeddedFlowComponent, data?: Record<string, any>) => Promise<void>;
    isLoading: boolean;
    isTimeoutDisabled?: boolean;
    isValid: boolean;
    messages: {
        message: string;
        type: string;
    }[];
    meta: FlowMetadataResponse | null;
    subtitle: string | undefined;
    title: string;
    touched: Record<string, boolean>;
    validateForm: () => {
        fieldErrors: Record<string, string>;
        isValid: boolean;
    };
    values: Record<string, string>;
}
export interface BaseSignInProps {
    additionalData?: Record<string, any>;
    buttonClassName?: string;
    className?: string;
    components?: EmbeddedFlowComponent[];
    error?: Error | null;
    errorClassName?: string;
    inputClassName?: string;
    isLoading?: boolean;
    isTimeoutDisabled?: boolean;
    messageClassName?: string;
    onSubmit?: (payload: EmbeddedSignInFlowRequest, component: EmbeddedFlowComponent) => Promise<void>;
    size?: 'small' | 'medium' | 'large';
    variant?: 'elevated' | 'outlined' | 'flat';
}
/**
 * BaseSignIn — unstyled app-native sign-in presentation component.
 *
 * Renders the server-driven UI components from an embedded authentication flow.
 * Manages local form state (values, touched, errors) and delegates submission to the parent SignIn component.
 *
 * Supports render props via the `default` scoped slot for complete UI customization.
 *
 * @example
 * ```vue
 * <!-- Default UI -->
 * <BaseSignIn :components="flowComponents" :on-submit="handleSubmit" />
 *
 * <!-- Custom UI via scoped slot -->
 * <BaseSignIn :components="flowComponents" :on-submit="handleSubmit" v-slot="{ values, handleInputChange, handleSubmit }">
 *   <input :value="values.username" @input="handleInputChange('username', $event.target.value)" />
 *   <button @click="handleSubmit(submitComponent)">Sign In</button>
 * </BaseSignIn>
 * ```
 */
declare const BaseSignIn: Component;
export default BaseSignIn;
//# sourceMappingURL=BaseSignIn.d.ts.map