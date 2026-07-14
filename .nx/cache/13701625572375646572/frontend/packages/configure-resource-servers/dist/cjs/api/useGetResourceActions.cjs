const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_resource_server_query_keys = require('../constants/resource-server-query-keys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

//#region src/api/useGetResourceActions.ts
async function fetchResourceActions(http, serverUrl, resourceServerId, resourceId) {
	return (await http.request({
		url: `${serverUrl}/resource-servers/${resourceServerId}/resources/${resourceId}/actions?limit=100&offset=0`,
		method: "GET"
	})).data;
}
function useGetResourceActions(resourceServerId, resourceId, enabled = true) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [
			require_resource_server_query_keys.default.RESOURCE_ACTIONS,
			resourceServerId,
			resourceId
		],
		queryFn: async () => {
			return fetchResourceActions(http, getServerUrl(), resourceServerId, resourceId);
		},
		enabled: Boolean(resourceServerId) && Boolean(resourceId) && enabled
	});
}

//#endregion
exports.default = useGetResourceActions;
exports.fetchResourceActions = fetchResourceActions;