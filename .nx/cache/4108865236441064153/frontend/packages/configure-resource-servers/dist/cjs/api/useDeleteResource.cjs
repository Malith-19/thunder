const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_resource_server_query_keys = require('../constants/resource-server-query-keys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

//#region src/api/useDeleteResource.ts
function useDeleteResource(resourceServerId) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async (resourceId) => {
			const serverUrl = getServerUrl();
			await http.request({
				url: `${serverUrl}/resource-servers/${resourceServerId}/resources/${resourceId}`,
				method: "DELETE"
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [require_resource_server_query_keys.default.RESOURCES, resourceServerId] });
		}
	});
}

//#endregion
exports.default = useDeleteResource;