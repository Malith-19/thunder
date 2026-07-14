import agentTypeQueryKeys_default from "../constants/agentTypeQueryKeys.js";
import { useThunderID } from "@thunderid/react";
import { useQuery } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";

//#region src/api/useGetAgentType.ts
/**
* Custom React hook to fetch a single agent type by ID from the server.
*
* @param id - The unique identifier of the agent type to fetch
* @returns TanStack Query result object containing agent type data, loading state, and error information
*/
function useGetAgentType(id) {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	return useQuery({
		queryKey: [agentTypeQueryKeys_default.AGENT_TYPE, id],
		queryFn: async () => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/agent-types/${id}?include=display`,
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})).data;
		},
		enabled: Boolean(id)
	});
}

//#endregion
export { useGetAgentType as default };