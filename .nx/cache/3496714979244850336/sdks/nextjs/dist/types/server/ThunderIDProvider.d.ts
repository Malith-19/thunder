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
import { ThunderIDProviderProps } from '@thunderid/react';
import { FC, PropsWithChildren } from 'react';
/**
 * Props interface of {@link ThunderIDServerProvider}
 */
export type ThunderIDServerProviderProps = Partial<ThunderIDProviderProps> & {
    clientSecret?: string;
    /**
     * Session cookie lifetime in seconds. Determines how long the session cookie
     * remains valid in the browser after sign-in.
     *
     * Resolution order (first defined value wins):
     *   1. This prop — set here when mounting the provider.
     *   2. `THUNDERID_SESSION_COOKIE_EXPIRY_TIME` environment variable.
     *   3. Built-in default of 86400 seconds (24 hours).
     *
     * @example
     * // 8-hour session cookie
     * <ThunderIDServerProvider sessionCookieExpiryTime={28800} ... />
     */
    sessionCookieExpiryTime?: number;
};
/**
 * Server-side provider component for ThunderID authentication.
 * Wraps the client-side provider and handles server-side authentication logic.
 * Uses the singleton ThunderIDNextClient instance for consistent authentication state.
 *
 * @param props - Props injected into the component.
 *
 * @example
 * ```tsx
 * <ThunderIDServerProvider config={thunderidConfig}>
 *   <YourApp />
 * </ThunderIDServerProvider>
 * ```
 *
 * @returns ThunderIDServerProvider component.
 */
declare const ThunderIDServerProvider: FC<PropsWithChildren<ThunderIDServerProviderProps>>;
export default ThunderIDServerProvider;
//# sourceMappingURL=ThunderIDProvider.d.ts.map