const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_fetchOrganizationUnits = require('./fetchOrganizationUnits.cjs');
const require_organization_unit_query_keys = require('../constants/organization-unit-query-keys.cjs');
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);

//#region ../configure-organization-units/dist/api/useGetOrganizationUnits.js
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
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const { limit = 30, offset = 0 } = params ?? {};
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [require_organization_unit_query_keys.organization_unit_query_keys_default.ORGANIZATION_UNITS, {
			limit,
			offset
		}],
		queryFn: async () => require_fetchOrganizationUnits.fetchOrganizationUnits(http, getServerUrl(), {
			limit,
			offset
		}),
		enabled
	});
}

//#endregion
exports.useGetOrganizationUnits = useGetOrganizationUnits;