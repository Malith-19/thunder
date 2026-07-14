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
import { EmbeddedFlowExecuteRequestPayload, EmbeddedFlowExecuteResponse } from '@thunderid/browser';
import { FC, PropsWithChildren } from 'react';
import { CardProps } from '../../../../primitives/Card/Card';
/**
 * Render props for custom UI rendering.
 */
export interface BaseRecoveryRenderProps {
    components: any[];
    errors: Record<string, string>;
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
        errors: Record<string, string>;
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
    className?: string;
    errorClassName?: string;
    inputClassName?: string;
    isInitialized?: boolean;
    messageClassName?: string;
    onComplete?: (response: EmbeddedFlowExecuteResponse) => void;
    onError?: (error: Error) => void;
    onFlowChange?: (response: EmbeddedFlowExecuteResponse) => void;
    onInitialize?: (payload?: EmbeddedFlowExecuteRequestPayload) => Promise<EmbeddedFlowExecuteResponse>;
    onSubmit?: (payload: EmbeddedFlowExecuteRequestPayload) => Promise<EmbeddedFlowExecuteResponse>;
    showLogo?: boolean;
    showSubtitle?: boolean;
    showTitle?: boolean;
    size?: 'small' | 'medium' | 'large';
    variant?: CardProps['variant'];
}
/**
 * BaseRecovery component for ThunderID V1 that provides an embedded account/password recovery flow.
 * Accepts API functions as props to maintain framework independence.
 *
 * @internal
 */
declare const BaseRecovery: FC<PropsWithChildren<BaseRecoveryProps>>;
export default BaseRecovery;
//# sourceMappingURL=BaseRecovery.d.ts.map