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
import { FC, ReactNode } from 'react';
import { BaseSignUpProps, BaseSignUpRenderProps } from './BaseSignUp';
/**
 * Render props function parameters (re-exported from BaseSignUp for convenience)
 */
export type SignUpRenderProps = BaseSignUpRenderProps;
/**
 * Props for the SignUp component.
 */
export type SignUpProps = BaseSignUpProps & {
    /**
     * Render props function for custom UI
     */
    children?: (props: SignUpRenderProps) => ReactNode;
};
/**
 * A styled SignUp component for ThunderID platform that provides embedded sign-up flow with pre-built styling.
 * This component handles the API calls for sign-up and delegates UI logic to BaseSignUp.
 */
declare const SignUp: FC<SignUpProps>;
export default SignUp;
//# sourceMappingURL=SignUp.d.ts.map