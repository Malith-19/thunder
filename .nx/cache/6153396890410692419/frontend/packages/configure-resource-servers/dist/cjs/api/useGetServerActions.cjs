const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_resource_server_query_keys = require('../constants/resource-server-query-keys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

//#region src/api/useGetServerActions.ts
async function fetchServerActions(http, serverUrl, resourceServerId) {
	return (await http.request({
		url: `${serverUrl}/resource-servers/${resourceServerId}/actions?limit=100&offset=0`,
		method: "GET"
	})).data;
}
function useGetServerActions(resourceServerId) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [require_resource_server_query_keys.default.SERVER_ACTIONS, resourceServerId],
		queryFn: async () => {
			return fetchServerActions(http, getServerUrl(), resourceServerId);
		},
		enabled: Boolean(resourceServerId)
	});
}

//#endregion
exports.default = useGetServerActions;
exports.fetchServerActions = fetchServerActions;