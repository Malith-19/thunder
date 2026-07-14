import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useDeleteResourceServer.ts
function useDeleteResourceServer() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			const serverUrl = getServerUrl();
			await http.request({
				url: `${serverUrl}/resource-servers/${id}`,
				method: "DELETE"
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [resource_server_query_keys_default.RESOURCE_SERVERS] });
		}
	});
}

//#endregion
export { useDeleteResourceServer as default };