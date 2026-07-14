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
import { Theme } from '@thunderid/browser';
export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | string;
export type ButtonVariant = 'solid' | 'outline' | 'text' | 'icon';
export type ButtonSize = 'small' | 'medium' | 'large';
/**
 * Creates styles for the Button component using BEM methodology
 * @param theme - The theme object containing design tokens
 * @param colorScheme - The current color scheme (used for memoization)
 * @param color - The button color
 * @param variant - The button variant
 * @param size - The button size
 * @param fullWidth - Whether the button should take full width
 * @param disabled - Whether the button is disabled
 * @param loading - Whether the button is in loading state
 * @returns Object containing CSS class names for component styling
 */
declare const useStyles: (theme: Theme, colorScheme: string, color: ButtonColor, variant: ButtonVariant, size: ButtonSize, fullWidth: boolean, disabled: boolean, loading: boolean, shape?: "square" | "round") => Record<string, string | null>;
export default useStyles;
//# sourceMappingURL=Button.styles.d.ts.map