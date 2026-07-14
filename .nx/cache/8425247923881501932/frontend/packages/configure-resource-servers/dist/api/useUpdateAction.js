import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useUpdateAction.ts
function useUpdateAction(resourceServerId, resourceId) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ actionId, data }) => {
			const serverUrl = getServerUrl();
			const url = resourceId ? `${serverUrl}/resource-servers/${resourceServerId}/resources/${resourceId}/actions/${actionId}` : `${serverUrl}/resource-servers/${resourceServerId}/actions/${actionId}`;
			return (await http.request({
				url,
				method: "PUT",
				data
			})).data;
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
export { useUpdateAction as default };