import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useUpdateResourceServer.ts
function useUpdateResourceServer() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, data }) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/resource-servers/${id}`,
				method: "PUT",
				data
			})).data;
		},
		onSuccess: (_result, { id }) => {
			queryClient.invalidateQueries({ queryKey: [resource_server_query_keys_default.RESOURCE_SERVER, id] });
			queryClient.invalidateQueries({ queryKey: [resource_server_query_keys_default.RESOURCE_SERVERS] });
		}
	});
}

//#endregion
export { useUpdateResourceServer as default };