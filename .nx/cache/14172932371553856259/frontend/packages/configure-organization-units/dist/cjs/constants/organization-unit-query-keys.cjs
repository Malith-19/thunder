
//#region src/constants/organization-unit-query-keys.ts
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
* Query key constants for organization units feature cache management.
*
* @public
* @remarks
* These constants are used with TanStack Query to manage caching,
* invalidation, and refetching of organization unit-related data.
*/
const OrganizationUnitQueryKeys = {
	ORGANIZATION_UNITS: "organization-units",
	ORGANIZATION_UNIT: "organization-unit",
	CHILD_ORGANIZATION_UNITS: "child-organization-units",
	ORGANIZATION_UNIT_USERS: "organization-unit-users",
	ORGANIZATION_UNIT_GROUPS: "organization-unit-groups"
};
var organization_unit_query_keys_default = OrganizationUnitQueryKeys;

//#endregion
exports.default = organization_unit_query_keys_default;