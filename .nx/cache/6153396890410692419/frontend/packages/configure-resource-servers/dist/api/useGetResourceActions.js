import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useGetResourceActions.ts
async function fetchResourceActions(http, serverUrl, resourceServerId, resourceId) {
	return (await http.request({
		url: `${serverUrl}/resource-servers/${resourceServerId}/resources/${resourceId}/actions?limit=100&offset=0`,
		method: "GET"
	})).data;
}
function useGetResourceActions(resourceServerId, resourceId, enabled = true) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
		queryKey: [
			resource_server_query_keys_default.RESOURCE_ACTIONS,
			resourceServerId,
			resourceId
		],
		queryFn: async () => {
			return fetchResourceActions(http, getServerUrl(), resourceServerId, resourceId);
		},
		enabled: Boolean(resourceServerId) && Boolean(resourceId) && enabled
	});
}

//#endregion
export { useGetResourceActions as default, fetchResourceActions };