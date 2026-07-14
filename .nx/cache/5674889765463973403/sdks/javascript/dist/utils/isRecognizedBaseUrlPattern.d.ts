/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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
 * Utility to determine if sensible ThunderID fallbacks can be used based on the given base URL.
 *
 * This checks if the URL follows the standard ThunderID pattern: /t/{orgHandle}
 * Returns true if sensible fallbacks (like deriving organization handle, tenant, etc.) can be used, false otherwise.
 *
 * @param baseUrl - The base URL of the ThunderID identity server (string or undefined)
 * @returns boolean - true if sensible fallbacks can be used, false otherwise
 *
 * @example
 * isRecognizedBaseUrlPattern('https://localhost:8090/t/dxlab'); // true
 * isRecognizedBaseUrlPattern('https://custom.example.com/auth'); // false
 */
declare const isRecognizedBaseUrlPattern: (baseUrl: string | undefined) => boolean;
export default isRecognizedBaseUrlPattern;
//# sourceMappingURL=isRecognizedBaseUrlPattern.d.ts.map