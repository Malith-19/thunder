const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_userTypeQueryKeys = require('../constants/userTypeQueryKeys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

//#region src/api/useGetUserType.ts
/**
* Custom React hook to fetch a single user type by ID from the server.
*
* @param id - The unique identifier of the user type to fetch
* @returns TanStack Query result object containing user type data, loading state, and error information
*/
function useGetUserType(id) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [require_userTypeQueryKeys.default.USER_TYPE, id],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/user-types/${id}?include=display`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: Boolean(id)
	});
}

//#endregion
exports.default = useGetUserType;