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
import { FlowMetadataResponse } from '@thunderid/browser';
import { type Component } from 'vue';
/**
 * Flow response from the accept-invite backend.
 */
export interface AcceptInviteFlowResponse {
    data?: {
        additionalData?: Record<string, string>;
        components?: any[];
        meta?: {
            components?: any[];
        };
        redirectURL?: string;
    };
    failureReason?: string;
    flowId: string;
    flowStatus: 'INCOMPLETE' | 'COMPLETE' | 'ERROR';
    type?: 'VIEW' | 'REDIRECTION';
}
/**
 * Render props passed to the default scoped slot.
 */
export interface BaseAcceptInviteRenderProps {
    completionTitle?: string;
    components: any[];
    error?: Error | null;
    fieldErrors: Record<string, string>;
    flowId?: string;
    goToSignIn?: () => void;
    handleInputBlur: (name: string) => void;
    handleInputChange: (name: string, value: string) => void;
    handleSubmit: (component: any, data?: Record<string, any>) => Promise<void>;
    inviteToken?: string;
    isComplete: boolean;
    isLoading: boolean;
    isTokenInvalid: boolean;
    isValid: boolean;
    isValidatingToken: boolean;
    meta: FlowMetadataResponse | null;
    subtitle?: string;
    title?: string;
    touched: Record<string, boolean>;
    values: Record<string, string>;
}
export interface BaseAcceptInviteProps {
    className?: string;
    flowId?: string;
    inviteToken?: string;
    onComplete?: () => void;
    onError?: (error: Error) => void;
    onFlowChange?: (response: AcceptInviteFlowResponse) => void;
    onGoToSignIn?: () => void;
    onSubmit: (payload: Record<string, any>) => Promise<AcceptInviteFlowResponse>;
    showSubtitle?: boolean;
    showTitle?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'outlined' | 'elevated';
}
/**
 * BaseAcceptInvite — handles the accept-invite flow lifecycle.
 *
 * Steps: validate invite token → render password form → flow completion.
 */
declare const BaseAcceptInvite: Component;
export default BaseAcceptInvite;
//# sourceMappingURL=BaseAcceptInvite.d.ts.map