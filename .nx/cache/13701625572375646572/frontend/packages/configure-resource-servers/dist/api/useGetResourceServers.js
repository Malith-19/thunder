import resource_server_query_keys_default from "../constants/resource-server-query-keys.js";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";

//#region src/api/useGetResourceServers.ts
function useGetResourceServers(params) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const { limit = 30, offset = 0 } = params ?? {};
	return useQuery({
		queryKey: [resource_server_query_keys_default.RESOURCE_SERVERS, {
			limit,
			offset
		}],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			const queryParams = new URLSearchParams({
				limit: limit.toString(),
				offset: offset.toString()
			});
			return (await http.request({
				url: `${serverUrl}/resource-servers?${queryParams.toString()}`,
				method: "GET"
			})).data;
		}
	});
}

//#endregion
export { useGetResourceServers as default };