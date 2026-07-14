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
import type { JSX, PropsWithChildren } from 'react';
export interface AuthPageLayoutProps extends PropsWithChildren {
    /** Class name prefix for product name prefixed CSS (e.g. 'SignIn' → '<PRODUCT_NAME>SignIn--root'). */
    variant?: string;
    /** Optional background CSS value (color, gradient, image). Falls back to the theme's background.default. */
    background?: string;
    /** Whether to show the loading state (e.g. skeletons instead of content). */
    isLoading: boolean;
}
/**
 * Shared page-level layout for authentication screens (sign-in, sign-up, accept-invite).
 *
 * Provides the full-page centering structure used by the Gate app. Both the Gate and
 * Console preview render this component so they are visually identical.
 */
export default function AuthPageLayout({ isLoading, variant, background, children, }: AuthPageLayoutProps): JSX.Element;
