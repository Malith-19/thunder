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
import { EmbeddedFlowExecuteRequestPayload, EmbeddedFlowExecuteResponse } from '@thunderid/browser';
import { type Component } from 'vue';
/**
 * Render props passed to the default scoped slot.
 */
export interface BaseSignUpRenderProps {
    components: any[];
    error?: Error | null;
    fieldErrors: Record<string, string>;
    handleInputChange: (name: string, value: string) => void;
    handleSubmit: (component: any, data?: Record<string, any>) => Promise<void>;
    isLoading: boolean;
    isValid: boolean;
    messages: {
        message: string;
        type: string;
    }[];
    subtitle: string;
    title: string;
    touched: Record<string, boolean>;
    validateForm: () => {
        fieldErrors: Record<string, string>;
        isValid: boolean;
    };
    values: Record<string, string>;
}
export interface BaseSignUpProps {
    afterSignUpUrl?: string;
    buttonClassName?: string;
    className?: string;
    error?: Error | null;
    errorClassName?: string;
    inputClassName?: string;
    isInitialized?: boolean;
    messageClassName?: string;
    onComplete?: (response: EmbeddedFlowExecuteResponse) => void;
    onError?: (error: Error) => void;
    onFlowChange?: (response: EmbeddedFlowExecuteResponse) => void;
    onInitialize?: (payload?: EmbeddedFlowExecuteRequestPayload) => Promise<EmbeddedFlowExecuteResponse>;
    onSubmit?: (payload: EmbeddedFlowExecuteRequestPayload) => Promise<EmbeddedFlowExecuteResponse>;
    shouldRedirectAfterSignUp?: boolean;
    showLogo?: boolean;
    showSubtitle?: boolean;
    showTitle?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'elevated' | 'outlined' | 'flat';
}
/**
 * BaseSignUp — app-native sign-up presentation component.
 *
 * Manages the sign-up flow lifecycle including initialization, form state,
 * passkey registration, popup-based social OAuth, and renders the server-driven UI.
 */
declare const BaseSignUp: Component;
export default BaseSignUp;
//# sourceMappingURL=BaseSignUp.d.ts.map