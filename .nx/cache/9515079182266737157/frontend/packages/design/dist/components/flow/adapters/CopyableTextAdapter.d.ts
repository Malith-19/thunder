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
/**
 * Props for the CopyableTextAdapter component.
 */
interface CopyableTextAdapterProps {
    additionalData?: Record<string, unknown>;
    component: FlowComponent;
    resolve: (template: string | undefined) => string | undefined;
}
/**
 * Adapter component to render a copyable text field within a flow. It displays a label (if provided) and a value
 * with a copy-to-clipboard button. The value is sourced from the `additionalData` using the `source` key defined
 * in the component configuration. When the copy button is clicked, it attempts to copy the value to the clipboard
 * and provides feedback to the user.
 *
 * @param {CopyableTextAdapterProps} props - The properties for the adapter, including the flow component
 * configuration, the resolve function for template strings, and any additional data needed to source the value.
 * @returns {JSX.Element} The rendered copyable text field with label and copy button.
 */
export default function CopyableTextAdapter({ component, resolve, additionalData, }: CopyableTextAdapterProps): JSX.Element;
export {};
