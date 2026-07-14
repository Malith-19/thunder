const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_user_query_keys = require('../constants/user-query-keys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

//#region src/api/useGetUserTypes.ts
/**
* Custom hook to fetch a list of user types.
*
* @param params - Optional query parameters for pagination
* @returns TanStack Query result object containing user type list data, loading state, and error information
*/
function useGetUserTypes(params) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const { limit, offset } = params ?? {};
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [require_user_query_keys.default.USER_TYPES, {
			limit,
			offset
		}],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			const searchParams = new URLSearchParams();
			if (limit !== void 0) searchParams.append("limit", String(limit));
			if (offset !== void 0) searchParams.append("offset", String(offset));
			const queryString = searchParams.toString();
			return (await http.request({
				url: `${serverUrl}/user-types${queryString ? `?${queryString}` : ""}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		}
	});
}

//#endregion
exports.default = useGetUserTypes;