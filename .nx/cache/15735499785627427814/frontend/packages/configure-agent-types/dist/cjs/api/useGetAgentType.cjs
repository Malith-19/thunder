const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_agentTypeQueryKeys = require('../constants/agentTypeQueryKeys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);

//#region src/api/useGetAgentType.ts
/**
* Custom React hook to fetch a single agent type by ID from the server.
*
* @param id - The unique identifier of the agent type to fetch
* @returns TanStack Query result object containing agent type data, loading state, and error information
*/
function useGetAgentType(id) {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	return (0, __tanstack_react_query.useQuery)({
		queryKey: [require_agentTypeQueryKeys.default.AGENT_TYPE, id],
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
exports.default = useGetAgentType;