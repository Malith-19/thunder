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
import { type EmbeddedFlowComponent } from '@thunderid/react';
import type { JSX } from 'react';
interface BlockContext {
    values: Record<string, string>;
    touched?: Record<string, boolean>;
    fieldErrors?: Record<string, string>;
    isLoading: boolean;
    resolve: (template: string | undefined) => string | undefined;
    onInputChange: (field: string, value: string) => void;
    onSubmit: (action: EmbeddedFlowComponent, inputs: Record<string, string>) => void;
    onValidate?: (components: EmbeddedFlowComponent[]) => boolean;
    passwordAutoComplete?: 'current-password' | 'new-password';
    blockComponents?: EmbeddedFlowComponent[];
    /** When true, non-primary submit buttons use onClick instead of form submit */
    hasMultipleSubmits?: boolean;
    /** ID of the primary submit action that stays as type="submit" */
    primarySubmitId?: string;
    /** Fallback sign-up URL for RICH_TEXT elements that embed `application.sign_up_url` */
    signUpFallbackUrl?: string;
    /** Fallback sign-in URL for RICH_TEXT elements that embed `application.sign_in_url` */
    signInFallbackUrl?: string;
    /** Fallback forgot-password URL for RICH_TEXT elements that embed `application.forgot_password_url` */
    forgotPasswordFallbackUrl?: string;
}
interface BlockAdapterProps extends BlockContext {
    component: EmbeddedFlowComponent;
    index: number;
}
export default function BlockAdapter({ component, index, blockComponents: outerBlockComponents, onValidate, ...ctx }: BlockAdapterProps): JSX.Element | null;
export {};
