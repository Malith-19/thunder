/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
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
import { FC, InputHTMLAttributes, ReactNode } from 'react';
export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Whether the field is disabled
     */
    disabled?: boolean;
    /**
     * Icon to display at the end (right) of the input
     */
    endIcon?: ReactNode;
    /**
     * Error message to display below the input
     */
    error?: string;
    /**
     * Helper text to display below the input
     */
    helperText?: string;
    /**
     * Label text to display above the input
     */
    label?: string;
    /**
     * Click handler for the end icon
     */
    onEndIconClick?: () => void;
    /**
     * Click handler for the start icon
     */
    onStartIconClick?: () => void;
    /**
     * Whether the field is required
     */
    required?: boolean;
    /**
     * Icon to display at the start (left) of the input
     */
    startIcon?: ReactNode;
}
declare const TextField: FC<TextFieldProps>;
export default TextField;
//# sourceMappingURL=TextField.d.ts.map