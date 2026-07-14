const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_fetchChildOrganizationUnits = require('./fetchChildOrganizationUnits.cjs');
const require_organization_unit_query_keys = require('../constants/organization-unit-query-keys.cjs');
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);

//#region src/api/useGetChildOrganizationUnits.ts
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
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const { limit = 30, offset = 0 } = params ?? {};
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [
			require_organization_unit_query_keys.default.CHILD_ORGANIZATION_UNITS,
			parentId,
			{
				limit,
				offset
			}
		],
		queryFn: async () => require_fetchChildOrganizationUnits.default(http, getServerUrl(), parentId, {
			limit,
			offset
		}),
		enabled: Boolean(parentId)
	});
}

//#endregion
exports.default = useGetChildOrganizationUnits;