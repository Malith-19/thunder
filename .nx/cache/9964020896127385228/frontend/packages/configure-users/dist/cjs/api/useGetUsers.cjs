const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_user_query_keys = require('../constants/user-query-keys.cjs');
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);

//#region src/api/useGetUsers.ts
/**
* Custom hook to fetch a list of users.
*
* @param params - Optional query parameters for filtering and pagination
* @returns TanStack Query result object containing user list data, loading state, and error information
*/
function useGetUsers(params) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const { limit, offset, filter } = params ?? {};
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [require_user_query_keys.default.USERS, {
			limit,
			offset,
			filter
		}],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			const searchParams = new URLSearchParams();
			if (limit !== void 0) searchParams.append("limit", String(limit));
			if (offset !== void 0) searchParams.append("offset", String(offset));
			if (filter) searchParams.append("filter", filter);
			searchParams.append("include", "display");
			const queryString = searchParams.toString();
			return (await http.request({
				url: `${serverUrl}/users${queryString ? `?${queryString}` : ""}`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		}
	});
}

//#endregion
exports.default = useGetUsers;