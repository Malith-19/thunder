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
export type AvatarVariant = 'circular' | 'square';
/**
 * Creates styles for the Avatar component using BEM methodology
 * @param theme - The theme object containing design tokens
 * @param colorScheme - The current color scheme (used for memoization)
 * @param size - The size of the avatar in pixels
 * @param variant - The avatar variant
 * @param backgroundColor - The background color for the avatar
 * @returns Object containing CSS class names for component styling
 */
declare const useStyles: (theme: Theme, colorScheme: string, size: number, variant: AvatarVariant, backgroundColor?: string) => Record<string, string>;
export default useStyles;
//# sourceMappingURL=Avatar.styles.d.ts.map