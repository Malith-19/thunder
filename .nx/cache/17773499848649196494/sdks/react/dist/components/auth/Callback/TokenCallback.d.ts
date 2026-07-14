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
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
import { FC } from 'react';
export interface TokenCallbackProps {
    /**
     * Callback function called when an error occurs
     */
    onError?: (error: Error) => void;
    /**
     * Function to navigate to a different path.
     * If not provided, falls back to the browser navigate utility (SPA navigation via History API for same-origin paths).
     * Provide this prop to enable framework-specific navigation (e.g., from React Router).
     */
    onNavigate?: (path: string) => void;
    /**
     * Callback function called when authentication is successful
     */
    onSuccess?: (authData: Record<string, any>) => void;
    /**
     * Custom path for the sign-in page. Defaults to '/signin'
     */
    signInPath?: string;
    /**
     * Custom path for the sign-up page. Defaults to '/signup'
     */
    signUpPath?: string;
}
export declare const TokenCallback: FC<TokenCallbackProps>;
export default TokenCallback;
//# sourceMappingURL=TokenCallback.d.ts.map