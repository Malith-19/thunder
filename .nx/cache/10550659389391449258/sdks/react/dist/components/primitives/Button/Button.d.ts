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
import { ButtonHTMLAttributes, ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react';
export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | string;
export type ButtonVariant = 'solid' | 'outline' | 'text' | 'icon';
export type ButtonSize = 'small' | 'medium' | 'large';
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    /**
     * The button color that determines the color scheme
     */
    color?: ButtonColor;
    /**
     * Icon to display after the button text
     */
    endIcon?: ReactNode;
    /**
     * Whether the button should take the full width of its container
     */
    fullWidth?: boolean;
    /**
     * Whether the button is in a loading state
     */
    loading?: boolean;
    /**
     * The shape of the button: square or round
     */
    shape?: 'square' | 'round';
    /**
     * The size of the button
     */
    size?: ButtonSize;
    /**
     * Icon to display before the button text
     */
    startIcon?: ReactNode;
    /**
     * The button variant that determines the visual style
     */
    variant?: ButtonVariant;
}
/**
 * Button component with multiple variants and types.
 *
 * @example
 * ```tsx
 * // Primary solid button
 * <Button color="primary" variant="solid">
 *   Click me
 * </Button>
 *
 * // Secondary outline button
 * <Button color="secondary" variant="outline" size="large">
 *   Cancel
 * </Button>
 *
 * // Text button with loading state
 * <Button color="tertiary" variant="text" loading>
 *   Loading...
 * </Button>
 *
 * // Button with icons
 * <Button
 *   color="primary"
 *   startIcon={<Icon />}
 *   endIcon={<Arrow />}
 * >
 *   Save and Continue
 * </Button>
 * ```
 */
declare const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;
export default Button;
//# sourceMappingURL=Button.d.ts.map