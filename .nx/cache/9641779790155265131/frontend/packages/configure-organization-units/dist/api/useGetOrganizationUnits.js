import fetchOrganizationUnits from "./fetchOrganizationUnits.js";
import organization_unit_query_keys_default from "../constants/organization-unit-query-keys.js";
import { useThunderID } from "@thunderid/react";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";

//#region src/api/useGetOrganizationUnits.ts
/**
* Custom React hook to fetch a paginated list of organization units from the server.
*
* This hook uses TanStack Query to manage the server state and provides automatic
* caching, refetching, and background updates. The query is keyed by the pagination
* parameters to ensure proper cache management.
*
* @param params - Optional pagination parameters
* @param params.limit - Maximum number of records to return (default: 30)
* @param params.offset - Number of records to skip for pagination (default: 0)
* @returns TanStack Query result object containing organization units list data, loading state, and error information
*
* @example
* ```tsx
* function OrganizationUnitsList() {
*   const { data, isLoading, error } = useGetOrganizationUnits();
*
*   if (isLoading) return <div>Loading...</div>;
*   if (error) return <div>Error: {error.message}</div>;
*
*   return (
*     <ul>
*       {data?.organizationUnits.map((ou) => (
*         <li key={ou.id}>{ou.name}</li>
*       ))}
*     </ul>
*   );
* }
* ```
*/
function useGetOrganizationUnits(params, enabled = true) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const { limit = 30, offset = 0 } = params ?? {};
	return useQuery({
		queryKey: [organization_unit_query_keys_default.ORGANIZATION_UNITS, {
			limit,
			offset
		}],
		queryFn: async () => fetchOrganizationUnits(http, getServerUrl(), {
			limit,
			offset
		}),
		enabled
	});
}

//#endregion
export { useGetOrganizationUnits as default };