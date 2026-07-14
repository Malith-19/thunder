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
import { FC, CSSProperties } from 'react';
export type OtpFieldType = 'text' | 'number' | 'password';
export interface OtpInputProps {
    /**
     * Auto focus the first input on mount
     */
    autoFocus?: boolean;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Whether the field is disabled
     */
    disabled?: boolean;
    /**
     * Error message to display below the OTP input
     */
    error?: string;
    /**
     * Helper text to display below the OTP input
     */
    helperText?: string;
    /**
     * Label text to display above the OTP input
     */
    label?: string;
    /**
     * Number of OTP input fields
     */
    length?: number;
    /**
     * Callback function called when OTP value changes
     */
    onChange?: (event: {
        target: {
            value: string;
        };
    }) => void;
    /**
     * Callback function called when OTP input is complete
     */
    onComplete?: (value: string) => void;
    /**
     * Pattern for numeric input validation
     */
    pattern?: string;
    /**
     * Placeholder character for each input field
     */
    placeholder?: string;
    /**
     * Whether the field is required
     */
    required?: boolean;
    /**
     * Custom container style
     */
    style?: CSSProperties;
    /**
     * Type of input (text, number, password)
     */
    type?: OtpFieldType;
    /**
     * Current OTP value
     */
    value?: string;
}
declare const OtpField: FC<OtpInputProps>;
export default OtpField;
//# sourceMappingURL=OtpField.d.ts.map