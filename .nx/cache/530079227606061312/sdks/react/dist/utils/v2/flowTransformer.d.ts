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
/**
 * @fileoverview Shared flow response transformer utilities for v2 embedded flows.
 *
 * This module provides reusable transformation functions for normalizing embedded flow
 * responses from ThunderID APIs. It handles both successful responses with component
 * extraction and error responses with proper error message extraction.
 *
 * Key features:
 * - Component extraction from flow meta structure
 * - Translation string resolution in components
 * - Error response detection and message extraction
 * - Configurable error handling (throw vs return errors)
 *
 * Usage:
 * ```typescript
 * import { normalizeFlowResponse } from '../../../utils/v2/flowTransformer';
 *
 * const { executionId, components } = normalizeFlowResponse(apiResponse, t, {
 *   defaultErrorKey: 'components.signIn.errors.generic'
 * });
 * ```
 *
 * This transformer is used by both SignIn and SignUp v2 components to ensure
 * consistent response handling across all embedded flows.
 */
import { EmbeddedFlowComponentV2 as EmbeddedFlowComponent, FlowMetadataResponse } from '@thunderid/browser';
import { UseTranslation } from '../../hooks/useTranslation';
/**
 * Generic flow error response interface that covers common error structure
 */
export interface FlowErrorResponse {
    executionId: string;
    failureReason?: string;
    flowStatus: 'ERROR';
}
/**
 * Configuration options for flow transformation
 */
export interface FlowTransformOptions {
    /**
     * Default error message key for translation fallback
     * @default 'errors.flow.generic'
     */
    defaultErrorKey?: string;
    /**
     * Whether to resolve translation strings or keep them as i18n keys
     * @default true
     */
    resolveTranslations?: boolean;
    /**
     * Whether to throw errors or return them as normalized response
     * @default true
     */
    throwOnError?: boolean;
}
/**
 * Transform and resolve translations in components from flow response.
 * This function extracts components from the response meta structure and optionally resolves
 * any translation strings within them. It also handles mapping of input refs to identifiers
 * and action refs to nextNode values.
 *
 * @param response - The flow response object containing components in meta structure
 * @param t - Translation function from useTranslation hook
 * @param resolveTranslations - Whether to resolve translation strings or keep them as i18n keys (default: true)
 * @returns Array of flow components with resolved or unresolved translations
 */
export declare const transformComponents: (response: any, t: UseTranslation["t"], resolveTranslations?: boolean, meta?: FlowMetadataResponse | null) => EmbeddedFlowComponent[];
/**
 * Extract error message from flow error response.
 * Supports any flow error response that follows the standard structure.
 * Prioritizes failureReason if present, otherwise falls back to translated generic message.
 *
 * @param error - The error response object
 * @param t - Translation function for fallback messages
 * @param defaultErrorKey - Default translation key for generic errors
 * @returns Extracted error message or fallback
 */
export declare const extractErrorMessage: (error: FlowErrorResponse | any, t: UseTranslation["t"], defaultErrorKey?: string) => string;
/**
 * Check if a response is an error response and extract the error message.
 * This function identifies error responses by checking for ERROR status and failure reasons.
 *
 * @param response - The flow response to check
 * @param t - Translation function for error messages
 * @param defaultErrorKey - Default translation key for generic errors
 * @returns Error message string if response is an error, null otherwise
 */
export declare const checkForErrorResponse: (response: any, t: UseTranslation["t"], defaultErrorKey?: string) => string | null;
/**
 * Generic flow response normalizer that handles both success and error responses.
 * This is the main transformer function that should be used by all flow components.
 *
 * @param response - The raw flow response from the API
 * @param t - Translation function from useTranslation hook
 * @param options - Configuration options for transformation behavior
 * @returns Normalized flow response with executionId and transformed components
 * @throws {any} The original response if it's an error and throwOnError is true
 */
export declare const normalizeFlowResponse: (response: any, t: UseTranslation["t"], options?: FlowTransformOptions, meta?: FlowMetadataResponse | null) => {
    additionalData: Record<string, any>;
    components: EmbeddedFlowComponent[];
    executionId: string;
};
//# sourceMappingURL=flowTransformer.d.ts.map