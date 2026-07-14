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
import { WithPreferences } from '@thunderid/browser';
import { FC, HTMLAttributes } from 'react';
export interface SignInWithEthereumButtonProps extends WithPreferences {
    /**
     * Whether the component is in loading state.
     */
    isLoading?: boolean;
}
/**
 * Sign In With Ethereum Button Component.
 * Handles authentication with Sign In With Ethereum identity provider.
 */
declare const SignInWithEthereumButton: FC<SignInWithEthereumButtonProps & HTMLAttributes<HTMLButtonElement>>;
export default SignInWithEthereumButton;
//# sourceMappingURL=SignInWithEthereumButton.d.ts.map