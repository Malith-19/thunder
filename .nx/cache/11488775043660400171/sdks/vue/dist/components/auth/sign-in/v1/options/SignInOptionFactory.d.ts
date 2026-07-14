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
import { EmbeddedSignInFlowAuthenticator } from '@thunderid/browser';
import { type VNode } from 'vue';
/**
 * Props shared by sign-in option rendering functions.
 */
export interface BaseSignInOptionProps {
    authenticator: EmbeddedSignInFlowAuthenticator;
    buttonClassName?: string;
    error?: string | null;
    formValues: Record<string, string>;
    inputClassName?: string;
    isLoading: boolean;
    onInputChange: (param: string, value: string) => void;
    onSubmit: (authenticator: EmbeddedSignInFlowAuthenticator, formData?: Record<string, string>) => void;
    t: (key: string, params?: Record<string, string>) => string;
    touchedFields: Record<string, boolean>;
}
/**
 * Creates the appropriate sign-in VNode(s) based on the authenticator's ID.
 */
export declare const createSignInOption: (props: BaseSignInOptionProps) => VNode | VNode[];
/**
 * Convenience function to create sign-in option VNode(s) from an authenticator.
 */
export declare const createSignInOptionFromAuthenticator: (authenticator: EmbeddedSignInFlowAuthenticator, formValues: Record<string, string>, touchedFields: Record<string, boolean>, isLoading: boolean, onInputChange: (param: string, value: string) => void, onSubmit: (authenticator: EmbeddedSignInFlowAuthenticator, formData?: Record<string, string>) => void, t: (key: string, params?: Record<string, string>) => string, options?: {
    buttonClassName?: string;
    error?: string | null;
    inputClassName?: string;
}) => VNode | VNode[];
//# sourceMappingURL=SignInOptionFactory.d.ts.map