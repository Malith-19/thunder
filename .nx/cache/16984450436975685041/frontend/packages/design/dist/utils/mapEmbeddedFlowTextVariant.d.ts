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
import { EmbeddedFlowTextVariant } from '@thunderid/react';
import type { TypographyVariant } from '@wso2/oxygen-ui';
/**
 * Maps EmbeddedFlowTextVariant enum values to corresponding MUI Typography variants
 * for consistent text styling across embedded flow components.
 *
 * @param variant - The EmbeddedFlowTextVariant to map
 * @returns The corresponding MUI TypographyVariant
 *
 * @example
 * ```tsx
 * import {mapEmbeddedFlowTextVariant} from '@thunderid/design';
 *
 * const variant = mapEmbeddedFlowTextVariant(EmbeddedFlowTextVariant.Heading1);
 * // Returns 'h2'
 *
 * <Typography variant={variant}>
 *   My Heading
 * </Typography>
 * ```
 */
export declare function mapEmbeddedFlowTextVariant(variant: EmbeddedFlowTextVariant | string | undefined): TypographyVariant;
export default mapEmbeddedFlowTextVariant;
