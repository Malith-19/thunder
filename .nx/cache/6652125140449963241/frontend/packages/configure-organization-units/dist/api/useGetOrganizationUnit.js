import organization_unit_query_keys_default from "../constants/organization-unit-query-keys.js";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useGetOrganizationUnit.ts
/**
* Custom React hook to fetch a single organization unit by its ID from the server.
*
* This hook uses TanStack Query to manage the server state and provides automatic
* caching, refetching, and background updates.
*
* @param id - The unique identifier of the organization unit to fetch
* @param enabled - Whether the query should be enabled (default: true when id is provided)
* @returns TanStack Query result object containing organization unit data, loading state, and error information
*
* @example
* ```tsx
* function OrganizationUnitDetails({ id }: { id: string }) {
*   const { data, isLoading, error } = useGetOrganizationUnit(id);
*
*   if (isLoading) return <div>Loading...</div>;
*   if (error) return <div>Error: {error.message}</div>;
*
*   return <div>{data?.name}</div>;
* }
* ```
*/
function useGetOrganizationUnit(id, enabled = true) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
		queryKey: [organization_unit_query_keys_default.ORGANIZATION_UNIT, id],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/organization-units/${encodeURIComponent(id)}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: enabled && Boolean(id)
	});
}

//#endregion
export { useGetOrganizationUnit as default };