import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useGetResourceServer.ts
function useGetResourceServer(id) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
		queryKey: [resource_server_query_keys_default.RESOURCE_SERVER, id],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/resource-servers/${id}`,
				method: "GET"
			})).data;
		},
		enabled: Boolean(id)
	});
}

//#endregion
export { useGetResourceServer as default };