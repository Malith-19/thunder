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
 * Mask sensitive data in a string.
 * Replaces characters with asterisks, leaving first and last characters visible.
 * @param value - The value to mask
 * @param visibleChars - Number of characters to leave visible at start and end
 * @returns Masked string
 */
export declare function maskString(value: string, visibleChars?: number): string;
/**
 * Recursively mask sensitive data in an object.
 * @param obj - The object to process
 * @returns New object with sensitive fields masked
 */
export default function maskSensitiveData(obj: unknown): unknown;
