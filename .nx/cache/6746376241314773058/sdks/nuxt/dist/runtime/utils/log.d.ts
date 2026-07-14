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
 * Mask a token so it is safe to include in logs and error messages.
 * Shows the first 4 and last 4 characters, replacing the middle with "…".
 *
 * @example
 * maskToken('eyJhbGciOiJIUzI1NiJ9.abc.xyz') // 'eyJh….xyz'
 */
export declare function maskToken(token: string): string;
/**
 * Create a namespaced logger for a specific SDK subsystem.
 *
 * Debug output is suppressed unless the `THUNDERID_DEBUG` environment
 * variable is set (any truthy value).
 *
 * @example
 * ```ts
 * const log = createLogger('session');
 * log.info('Session created for', maskToken(accessToken));
 * log.debug('Full payload', payload); // only logged when THUNDERID_DEBUG=true
 * ```
 */
export declare function createLogger(subsystem: string): {
    debug: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
};
