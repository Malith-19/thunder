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
import type { JSX } from 'react';
import type { FlowComponent } from '../../../models/flow';
interface RichTextAdapterProps {
    component: FlowComponent;
    resolve: (template: string | undefined) => string | undefined;
    /**
     * Fallback sign-up URL used when the flow meta does not supply
     * `application.sign_up_url` but self registration is enabled.
     */
    signUpFallbackUrl?: string;
    /**
     * Fallback sign-in URL used when the flow meta does not supply
     * `application.sign_in_url`.
     */
    signInFallbackUrl?: string;
    /**
     * Fallback forgot-password URL used when the flow meta does not supply
     * `application.forgot_password_url` but recovery is enabled.
     */
    forgotPasswordFallbackUrl?: string;
}
export default function RichTextAdapter({ component, resolve, signUpFallbackUrl, signInFallbackUrl, forgotPasswordFallbackUrl, }: RichTextAdapterProps): JSX.Element | null;
export {};
