const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_resource_server_query_keys = require('../constants/resource-server-query-keys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

//#region src/api/useDeleteAction.ts
function useDeleteAction(resourceServerId, resourceId) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async (actionId) => {
			const serverUrl = getServerUrl();
			const url = resourceId ? `${serverUrl}/resource-servers/${resourceServerId}/resources/${resourceId}/actions/${actionId}` : `${serverUrl}/resource-servers/${resourceServerId}/actions/${actionId}`;
			await http.request({
				url,
				method: "DELETE"
			});
		},
		onSuccess: () => {
			if (resourceId) queryClient.invalidateQueries({ queryKey: [
				require_resource_server_query_keys.default.RESOURCE_ACTIONS,
				resourceServerId,
				resourceId
			] });
			else queryClient.invalidateQueries({ queryKey: [require_resource_server_query_keys.default.SERVER_ACTIONS, resourceServerId] });
		}
	});
}

//#endregion
exports.default = useDeleteAction;