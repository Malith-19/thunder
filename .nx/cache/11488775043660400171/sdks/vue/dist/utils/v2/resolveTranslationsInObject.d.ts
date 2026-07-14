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
import { FlowMetadataResponse } from '@thunderid/browser';
type TranslationFn = (key: string, params?: Record<string, string | number>) => string;
/**
 * Resolves all {{ t() }} and {{ meta() }} template expressions in an object's string properties.
 * @param obj - The object to process
 * @param t - The translation function from useI18n
 * @param properties - Array of property names to resolve (optional, defaults to common properties)
 * @param meta - Optional flow metadata for resolving meta() expressions
 * @returns A new object with resolved template strings
 */
export declare const resolveTranslationsInObject: <T extends Record<string, any>>(obj: T, t: TranslationFn, properties?: string[], meta?: FlowMetadataResponse | null) => T;
export default resolveTranslationsInObject;
//# sourceMappingURL=resolveTranslationsInObject.d.ts.map