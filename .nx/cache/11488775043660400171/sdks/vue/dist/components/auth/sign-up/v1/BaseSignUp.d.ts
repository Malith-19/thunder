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
import { type Component } from 'vue';
/**
 * Render-prop payload exposed via the default slot.
 */
export interface BaseSignUpRenderProps {
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
    values: Record<string, string>;
}
/**
 * V1 BaseSignUp — component-driven app-native sign-up for Vue.
 *
 * Mirrors `packages/react/.../SignUp/v1/BaseSignUp.tsx`. Reads the
 * `/api/server/v1/flow/execute` response shape (`TYPOGRAPHY`, `FORM`, `INPUT`,
 * `BUTTON`, `RICH_TEXT`, etc.) and renders it via the V1
 * `SignUpOptionFactory`. Tracks form state internally and submits steps via
 * the `onSubmit` prop until the flow completes.
 */
declare const BaseSignUp: Component;
export default BaseSignUp;
//# sourceMappingURL=BaseSignUp.d.ts.map