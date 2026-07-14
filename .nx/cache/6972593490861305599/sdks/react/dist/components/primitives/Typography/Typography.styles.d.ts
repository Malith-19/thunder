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
export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'button';
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
export type TypographyColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info' | 'textPrimary' | 'textSecondary' | 'inherit';
/**
 * Creates styles for the Typography component using BEM methodology
 * @param theme - The theme object containing design tokens
 * @param colorScheme - The current color scheme (used for memoization)
 * @param variant - The typography variant
 * @param align - Text alignment
 * @param color - Color variant
 * @param noWrap - Whether text should be truncated with ellipsis
 * @param inline - Whether text should be displayed inline
 * @param gutterBottom - Whether to add bottom margin
 * @param fontWeight - Custom font weight
 * @param fontSize - Custom font size
 * @param lineHeight - Custom line height
 * @returns Object containing CSS class names for component styling
 */
declare const useStyles: (theme: Theme, colorScheme: string, variant: TypographyVariant, align: TypographyAlign, color: TypographyColor, noWrap: boolean, inline: boolean, gutterBottom: boolean, fontWeight?: "normal" | "medium" | "semibold" | "bold" | number, fontSize?: string | number, lineHeight?: string | number) => Record<string, string>;
export default useStyles;
//# sourceMappingURL=Typography.styles.d.ts.map