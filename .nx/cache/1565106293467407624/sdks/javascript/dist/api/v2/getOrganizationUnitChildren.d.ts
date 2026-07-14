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
import { GetOrganizationUnitChildrenConfig, OrganizationUnitListResponse } from '../../models/v2/organization-unit';
/**
 * Retrieves the child organization units of a given parent OU.
 *
 * @param config - Request configuration including `baseUrl`/`url`, `organizationUnitId`,
 *                 and optional `limit`/`offset` pagination parameters.
 * @returns A promise that resolves with the paginated list of child organization units.
 *
 * @throws {ThunderIDAPIError} When the server returns a non-OK response.
 *
 * @example
 * ```typescript
 * const children = await getOrganizationUnitChildren({
 *   baseUrl: 'https://localhost:8090',
 *   organizationUnitId: '0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1',
 *   limit: 10,
 *   offset: 0,
 * });
 * console.log(children.organizationUnits);
 * ```
 *
 * @experimental This function targets the ThunderID V2 platform API
 */
declare const getOrganizationUnitChildren: ({ url, baseUrl, organizationUnitId, limit, offset, ...requestConfig }: GetOrganizationUnitChildrenConfig) => Promise<OrganizationUnitListResponse>;
export default getOrganizationUnitChildren;
//# sourceMappingURL=getOrganizationUnitChildren.d.ts.map