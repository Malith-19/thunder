/**
 * Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com).
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
 * Sanitizes inline CSS content by removing potentially dangerous constructs.
 * First normalizes the CSS to defeat obfuscation (comments, unicode escapes, null bytes),
 * then strips known dangerous patterns.
 *
 * @param css - The raw CSS string to sanitize
 * @returns The sanitized CSS string
 */
export declare function sanitizeCss(css: string): string;
/**
 * Validates that a stylesheet URL uses the https or http protocol.
 *
 * @param href - The URL to validate
 * @returns True if the URL is valid for stylesheet loading
 */
export declare function isValidStylesheetUrl(href: string): boolean;
/**
 * Checks whether a stylesheet URL uses insecure http instead of https.
 *
 * @param href - The URL to check
 * @returns True if the URL uses http://
 */
export declare function isInsecureStylesheetUrl(href: string): boolean;
