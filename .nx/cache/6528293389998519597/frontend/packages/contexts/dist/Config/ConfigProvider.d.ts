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
import { PropsWithChildren } from 'react';
/**
 * Props for the ConfigProvider component.
 *
 * @public
 */
export type ConfigProviderProps = PropsWithChildren;
/**
 * React context provider component that provides runtime configuration
 * to all child components.
 *
 * This component loads configuration from window object at
 * initialization time and provides it through React context. If the global
 * configuration is not available, it falls back to default values.
 *
 * The provider creates utility methods for common configuration operations
 * such as getting the server URL, hostname, port, and checking HTTP-only mode.
 *
 * @param props - The component props
 * @param props.children - React children to be wrapped with the configuration context
 *
 * @returns JSX element that provides configuration context to children
 *
 * @example
 * ```tsx
 * import ConfigProvider from './ConfigProvider';
 * import App from './App';
 *
 * function Root() {
 *   return (
 *     <ConfigProvider>
 *       <App />
 *     </ConfigProvider>
 *   );
 * }
 * ```
 *
 * @public
 */
export default function ConfigProvider({ children }: ConfigProviderProps): import("react/jsx-runtime").JSX.Element;
