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
import { FC, InputHTMLAttributes } from 'react';
/**
 * Props for the Toggle component.
 */
export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
    className?: string;
    error?: string;
    helperText?: string;
    label?: string;
    required?: boolean;
}
/**
 * A Toggle component that represents a boolean input. It is built on top of a hidden checkbox input
 * and styled to look like a switch.
 *
 * The component is wrapped in a FormControl to display error messages and helper text.
 * The label is associated with the input for accessibility.
 *
 * @param props - Props for the Toggle component
 * @returns A JSX element representing the Toggle
 */
declare const Toggle: FC<ToggleProps>;
export default Toggle;
//# sourceMappingURL=Toggle.d.ts.map