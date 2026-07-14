/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
import { EmbeddedRecoveryFlowRequestV2, EmbeddedRecoveryFlowResponseV2, Preferences, FlowMetadataResponse } from '@thunderid/browser';
import { FC, ReactNode } from 'react';
import { CardProps } from '../../../../primitives/Card/Card';
/**
 * Render props for custom UI rendering.
 */
export interface BaseRecoveryRenderProps {
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
    meta: FlowMetadataResponse | null;
    subtitle: string;
    title: string;
    touched: Record<string, boolean>;
    validateForm: () => {
        fieldErrors: Record<string, string>;
        isValid: boolean;
    };
    values: Record<string, string>;
}
/**
 * Props for the BaseRecovery component.
 */
export interface BaseRecoveryProps {
    afterRecoveryUrl?: string;
    buttonClassName?: string;
    /**
     * Render props function for custom UI or static content
     */
    children?: ((props: BaseRecoveryRenderProps) => ReactNode) | ReactNode;
    className?: string;
    error?: Error | null;
    errorClassName?: string;
    inputClassName?: string;
    isInitialized?: boolean;
    messageClassName?: string;
    onComplete?: (response: EmbeddedRecoveryFlowResponseV2) => void;
    onError?: (error: Error) => void;
    onFlowChange?: (response: EmbeddedRecoveryFlowResponseV2) => void;
    onInitialize?: (payload?: EmbeddedRecoveryFlowRequestV2) => Promise<EmbeddedRecoveryFlowResponseV2>;
    onSubmit?: (payload: EmbeddedRecoveryFlowRequestV2) => Promise<EmbeddedRecoveryFlowResponseV2>;
    /**
     * Component-level preferences to override global i18n and theme settings.
     */
    preferences?: Preferences;
    showLogo?: boolean;
    showSubtitle?: boolean;
    showTitle?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: CardProps['variant'];
}
/**
 * BaseRecovery component for ThunderIDV2 that provides an embedded account/password recovery flow.
 * Accepts API functions as props to maintain framework independence.
 */
declare const BaseRecovery: FC<BaseRecoveryProps>;
export default BaseRecovery;
//# sourceMappingURL=BaseRecovery.d.ts.map