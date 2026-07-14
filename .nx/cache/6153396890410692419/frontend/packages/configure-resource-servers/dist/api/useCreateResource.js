import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useCreateResource.ts
function useCreateResource(resourceServerId) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (data) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/resource-servers/${resourceServerId}/resources`,
				method: "POST",
				data
			})).data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [resource_server_query_keys_default.RESOURCES, resourceServerId] });
		}
	});
}

//#endregion
export { useCreateResource as default };