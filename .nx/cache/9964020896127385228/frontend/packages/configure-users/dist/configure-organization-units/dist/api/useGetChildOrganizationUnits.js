import { fetchChildOrganizationUnits } from "./fetchChildOrganizationUnits.js";
import { organization_unit_query_keys_default } from "../constants/organization-unit-query-keys.js";
import { useThunderID } from "@thunderid/react";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";

//#region ../configure-organization-units/dist/api/useGetChildOrganizationUnits.js
/**
* Custom React hook to fetch child organization units of a specific organization unit.
*
* This hook uses TanStack Query to manage the server state and provides automatic
* caching, refetching, and background updates.
*
* @param parentId - The ID of the parent organization unit
* @param params - Optional pagination parameters
* @param params.limit - Maximum number of records to return (default: 30)
* @param params.offset - Number of records to skip for pagination (default: 0)
* @returns TanStack Query result object containing child organization units list data
*
* @example
* ```tsx
* function ChildOUsList({ parentId }: { parentId: string }) {
*   const { data, isLoading, error } = useGetChildOrganizationUnits(parentId);
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
function useGetChildOrganizationUnits(parentId, params) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const { limit = 30, offset = 0 } = params ?? {};
	return useQuery({
		queryKey: [
			organization_unit_query_keys_default.CHILD_ORGANIZATION_UNITS,
			parentId,
			{
				limit,
				offset
			}
		],
		queryFn: async () => fetchChildOrganizationUnits(http, getServerUrl(), parentId, {
			limit,
			offset
		}),
		enabled: Boolean(parentId)
	});
}

//#endregion
export { useGetChildOrganizationUnits };