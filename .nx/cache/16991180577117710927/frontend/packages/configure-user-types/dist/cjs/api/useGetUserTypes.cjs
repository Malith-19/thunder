const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_userTypeQueryKeys = require('../constants/userTypeQueryKeys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

//#region src/api/useGetUserTypes.ts
/**
* Custom React hook to fetch a paginated list of user types from the server.
*
* @param params - Optional pagination parameters
* @param params.limit - Maximum number of records to return
* @param params.offset - Number of records to skip for pagination
* @returns TanStack Query result object containing user types list data, loading state, and error information
*/
function useGetUserTypes(params) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const { limit, offset } = params ?? {};
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [require_userTypeQueryKeys.default.USER_TYPES, {
			limit,
			offset
		}],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			const queryParams = new URLSearchParams();
			if (limit !== void 0) queryParams.append("limit", limit.toString());
			if (offset !== void 0) queryParams.append("offset", offset.toString());
			queryParams.append("include", "display");
			const queryString = queryParams.toString();
			const url = `${serverUrl}/user-types${queryString ? `?${queryString}` : ""}`;
			return (await http.request({
				url,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		}
	});
}

//#endregion
exports.default = useGetUserTypes;