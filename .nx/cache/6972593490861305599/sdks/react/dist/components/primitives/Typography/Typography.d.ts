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
import { CSSProperties, FC, ReactNode, ElementType } from 'react';
import { TypographyVariant, TypographyAlign, TypographyColor } from './Typography.styles';
export interface TypographyProps {
    /**
     * Text alignment
     */
    align?: TypographyAlign;
    /**
     * The content to be rendered
     */
    children: ReactNode;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Color variant
     */
    color?: TypographyColor;
    /**
     * The HTML element or React component to render
     */
    component?: ElementType;
    /**
     * Custom font size (overrides variant sizing)
     */
    fontSize?: string | number;
    /**
     * Custom font weight
     */
    fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold' | number;
    /**
     * Whether to disable gutters (margin bottom)
     */
    gutterBottom?: boolean;
    /**
     * Whether the text should be displayed inline
     */
    inline?: boolean;
    /**
     * Line height
     */
    lineHeight?: string | number;
    /**
     * Whether the text should be clipped with ellipsis when it overflows
     */
    noWrap?: boolean;
    /**
     * Custom styles
     */
    style?: CSSProperties;
    /**
     * The typography variant to apply
     */
    variant?: TypographyVariant;
}
/**
 * Typography component for consistent text rendering throughout the application.
 * Integrates with the theme system and provides semantic HTML elements.
 */
declare const Typography: FC<TypographyProps>;
export default Typography;
//# sourceMappingURL=Typography.d.ts.map