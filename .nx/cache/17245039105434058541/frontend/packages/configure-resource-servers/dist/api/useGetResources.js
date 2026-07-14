import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useGetResources.ts
async function fetchResources(http, serverUrl, resourceServerId, parentId) {
	const queryParams = new URLSearchParams({
		limit: "100",
		offset: "0"
	});
	if (parentId) queryParams.set("parentId", parentId);
	return (await http.request({
		url: `${serverUrl}/resource-servers/${resourceServerId}/resources?${queryParams.toString()}`,
		method: "GET"
	})).data;
}
function useGetResources(resourceServerId, parentId, enabled = true) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
		queryKey: [
			resource_server_query_keys_default.RESOURCES,
			resourceServerId,
			{ parentId: parentId ?? null }
		],
		queryFn: async () => {
			return fetchResources(http, getServerUrl(), resourceServerId, parentId);
		},
		enabled: Boolean(resourceServerId) && enabled
	});
}

//#endregion
export { useGetResources as default, fetchResources };