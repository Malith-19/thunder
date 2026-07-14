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
 * Flow response from the invite-user backend.
 */
export interface InviteUserFlowResponse {
    data?: {
        additionalData?: Record<string, string>;
        components?: any[];
        meta?: {
            components?: any[];
        };
    };
    failureReason?: string;
    flowId: string;
    flowStatus: 'INCOMPLETE' | 'COMPLETE' | 'ERROR';
    type?: 'VIEW' | 'REDIRECTION';
}
/**
 * Render props passed to the default scoped slot.
 */
export interface BaseInviteUserRenderProps {
    components: any[];
    copyInviteLink: () => Promise<void>;
    error?: Error | null;
    fieldErrors: Record<string, string>;
    flowId?: string;
    handleInputBlur: (name: string) => void;
    handleInputChange: (name: string, value: string) => void;
    handleSubmit: (component: any, data?: Record<string, any>) => Promise<void>;
    inviteLink?: string;
    inviteLinkCopied: boolean;
    isEmailSent: boolean;
    isInviteGenerated: boolean;
    isLoading: boolean;
    isValid: boolean;
    meta: FlowMetadataResponse | null;
    resetFlow: () => void;
    subtitle?: string;
    title?: string;
    touched: Record<string, boolean>;
    values: Record<string, string>;
}
export interface BaseInviteUserProps {
    className?: string;
    isInitialized?: boolean;
    onError?: (error: Error) => void;
    onFlowChange?: (response: InviteUserFlowResponse) => void;
    onInitialize: (payload: Record<string, any>) => Promise<InviteUserFlowResponse>;
    onInviteLinkGenerated?: (inviteLink: string, flowId: string) => void;
    onSubmit: (payload: Record<string, any>) => Promise<InviteUserFlowResponse>;
    showSubtitle?: boolean;
    showTitle?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: 'outlined' | 'elevated';
}
/**
 * BaseInviteUser — handles the admin invite-user flow lifecycle.
 *
 * Steps: user type selection → user details → invite link generation.
 */
declare const BaseInviteUser: Component;
export default BaseInviteUser;
//# sourceMappingURL=BaseInviteUser.d.ts.map