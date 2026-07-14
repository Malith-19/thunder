const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_user_query_keys = require('../constants/user-query-keys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

//#region src/api/useGetUser.ts
/**
* Custom hook to fetch a single user by ID.
*
* @param userId - The ID of the user to fetch
* @returns TanStack Query result object containing user data, loading state, and error information
*/
function useGetUser(userId) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [require_user_query_keys.default.USER, userId],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/users/${userId}?include=display`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: Boolean(userId)
	});
}

//#endregion
exports.default = useGetUser;