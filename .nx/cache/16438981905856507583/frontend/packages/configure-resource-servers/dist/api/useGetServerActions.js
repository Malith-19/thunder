import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useGetServerActions.ts
async function fetchServerActions(http, serverUrl, resourceServerId) {
	return (await http.request({
		url: `${serverUrl}/resource-servers/${resourceServerId}/actions?limit=100&offset=0`,
		method: "GET"
	})).data;
}
function useGetServerActions(resourceServerId) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
		queryKey: [resource_server_query_keys_default.SERVER_ACTIONS, resourceServerId],
		queryFn: async () => {
			return fetchServerActions(http, getServerUrl(), resourceServerId);
		},
		enabled: Boolean(resourceServerId)
	});
}

//#endregion
export { useGetServerActions as default, fetchServerActions };