const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_organization_unit_query_keys = require('../constants/organization-unit-query-keys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

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
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [require_organization_unit_query_keys.default.ORGANIZATION_UNIT, id],
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
exports.default = useGetOrganizationUnit;