import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useDeleteAction.ts
function useDeleteAction(resourceServerId, resourceId) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
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
				resource_server_query_keys_default.RESOURCE_ACTIONS,
				resourceServerId,
				resourceId
			] });
			else queryClient.invalidateQueries({ queryKey: [resource_server_query_keys_default.SERVER_ACTIONS, resourceServerId] });
		}
	});
}

//#endregion
export { useDeleteAction as default };