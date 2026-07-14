import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useCreateAction.ts
function useCreateAction(resourceServerId, resourceId) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data) => {
			const serverUrl = getServerUrl();
			const url = resourceId ? `${serverUrl}/resource-servers/${resourceServerId}/resources/${resourceId}/actions` : `${serverUrl}/resource-servers/${resourceServerId}/actions`;
			return (await http.request({
				url,
				method: "POST",
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
export { useCreateAction as default };