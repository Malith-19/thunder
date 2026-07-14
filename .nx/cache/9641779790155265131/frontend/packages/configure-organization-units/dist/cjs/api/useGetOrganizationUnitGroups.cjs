const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_organization_unit_query_keys = require('../constants/organization-unit-query-keys.cjs');
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);

//#region src/api/useGetOrganizationUnitGroups.ts
/**
* Custom React hook to fetch groups belonging to a specific organization unit.
*
* This hook uses TanStack Query to manage the server state and provides automatic
* caching, refetching, and background updates.
*
* @param organizationUnitId - The ID of the organization unit
* @param params - Optional pagination parameters
* @param params.limit - Maximum number of records to return (default: 30)
* @param params.offset - Number of records to skip for pagination (default: 0)
* @returns TanStack Query result object containing groups list data
*
* @example
* ```tsx
* function OUGroupsList({ ouId }: { ouId: string }) {
*   const { data, isLoading, error } = useGetOrganizationUnitGroups(ouId);
*
*   if (isLoading) return <div>Loading...</div>;
*   if (error) return <div>Error: {error.message}</div>;
*
*   return (
*     <ul>
*       {data?.groups.map((group) => (
*         <li key={group.id}>{group.name}</li>
*       ))}
*     </ul>
*   );
* }
* ```
*/
function useGetOrganizationUnitGroups(organizationUnitId, params) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const { limit = 30, offset = 0 } = params ?? {};
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [
			require_organization_unit_query_keys.default.ORGANIZATION_UNIT_GROUPS,
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
				offset: offset.toString()
			});
			return (await http.request({
				url: `${serverUrl}/organization-units/${organizationUnitId}/groups?${queryParams.toString()}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: Boolean(organizationUnitId)
	});
}

//#endregion
exports.default = useGetOrganizationUnitGroups;