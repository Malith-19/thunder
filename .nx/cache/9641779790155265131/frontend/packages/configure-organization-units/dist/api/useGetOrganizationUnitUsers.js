import organization_unit_query_keys_default from "../constants/organization-unit-query-keys.js";
import { useThunderID } from "@thunderid/react";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";

//#region src/api/useGetOrganizationUnitUsers.ts
/**
* Custom React hook to fetch users belonging to a specific organization unit.
*
* This hook uses TanStack Query to manage the server state and provides automatic
* caching, refetching, and background updates.
*
* @param organizationUnitId - The ID of the organization unit
* @param params - Optional pagination parameters
* @param params.limit - Maximum number of records to return (default: 30)
* @param params.offset - Number of records to skip for pagination (default: 0)
* @returns TanStack Query result object containing users list data
*
* @example
* ```tsx
* function OUUsersList({ ouId }: { ouId: string }) {
*   const { data, isLoading, error } = useGetOrganizationUnitUsers(ouId);
*
*   if (isLoading) return <div>Loading...</div>;
*   if (error) return <div>Error: {error.message}</div>;
*
*   return (
*     <ul>
*       {data?.users.map((user) => (
*         <li key={user.id}>{user.id}</li>
*       ))}
*     </ul>
*   );
* }
* ```
*/
function useGetOrganizationUnitUsers(organizationUnitId, params) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const { limit = 30, offset = 0 } = params ?? {};
	return useQuery({
		queryKey: [
			organization_unit_query_keys_default.ORGANIZATION_UNIT_USERS,
			organizationUnitId,
			{
				limit,
				offset
			}
		],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			const queryParams = new URLSearchParams({
				limit: limit.toString(),
				offset: offset.toString(),
				include: "display"
			});
			return (await http.request({
				url: `${serverUrl}/organization-units/${organizationUnitId}/users?${queryParams.toString()}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: Boolean(organizationUnitId)
	});
}

//#endregion
export { useGetOrganizationUnitUsers as default };