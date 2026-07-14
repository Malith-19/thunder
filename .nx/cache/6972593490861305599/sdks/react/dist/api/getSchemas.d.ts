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
import { Schema, GetSchemasConfig as BaseGetSchemasConfig } from '@thunderid/browser';
/**
 * Configuration for the getSchemas request (React-specific)
 */
export interface GetSchemasConfig extends Omit<BaseGetSchemasConfig, 'fetcher'> {
    /**
     * Optional custom fetcher function. If not provided, the ThunderID SPA client's httpClient will be used
     * which is a wrapper around axios http.request
     */
    fetcher?: (url: string, config: RequestInit) => Promise<Response>;
    /**
     * Optional instance ID for multi-instance support. Defaults to 0.
     */
    instanceId?: number;
}
/**
 * Retrieves the SCIM2 schemas from the specified endpoint.
 * This function uses the ThunderID SPA client's httpClient by default, but allows for custom fetchers.
 *
 * @param config - Request configuration object.
 * @returns A promise that resolves with the SCIM2 schemas information.
 * @example
 * ```typescript
 * // Using default ThunderID SPA client httpClient
 * try {
 *   const schemas = await getSchemas({
 *     url: "https://localhost:8090/scim2/Schemas",
 *   });
 *   console.log(schemas);
 * } catch (error) {
 *   if (error instanceof ThunderIDAPIError) {
 *     console.error('Failed to get schemas:', error.message);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using custom fetcher
 * try {
 *   const schemas = await getSchemas({
 *     url: "https://localhost:8090/scim2/Schemas",
 *     fetcher: customFetchFunction
 *   });
 *   console.log(schemas);
 * } catch (error) {
 *   if (error instanceof ThunderIDAPIError) {
 *     console.error('Failed to get schemas:', error.message);
 *   }
 * }
 * ```
 */
declare const getSchemas: ({ fetcher, instanceId, ...requestConfig }: GetSchemasConfig) => Promise<Schema[]>;
export default getSchemas;
//# sourceMappingURL=getSchemas.d.ts.map