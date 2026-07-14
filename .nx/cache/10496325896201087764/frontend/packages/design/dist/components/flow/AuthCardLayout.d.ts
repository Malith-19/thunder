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
import type { JSX, ReactNode } from 'react';
export interface AuthCardLayoutProps {
    /** Class name prefix for product name prefixed CSS (e.g. 'SignInBox' → '<PRODUCT_NAME>SignInBox--root'). */
    variant?: string;
    /** Logo image sources for light/dark modes. */
    logo?: {
        src: {
            light: string;
            dark: string;
        };
        alt?: {
            light: string;
            dark: string;
        };
    };
    /** Whether to show the logo. Defaults to true. */
    showLogo?: boolean;
    /** Custom sx for the logo's display behavior. Defaults to mobile-only. */
    logoDisplay?: Record<string, string>;
    children: ReactNode;
}
export default function AuthCardLayout({ variant, logo, showLogo, logoDisplay, children, }: AuthCardLayoutProps): JSX.Element;
