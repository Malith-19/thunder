const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_agentTypeQueryKeys = require('../constants/agentTypeQueryKeys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

//#region src/api/useUpdateAgentType.ts
/**
* Custom React hook to update an existing agent type in the server.
*
* @returns TanStack Query mutation object for updating agent types
*/
function useUpdateAgentType() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	const { t } = (0, react_i18next.useTranslation)("agentTypes");
	const { showToast } = (0, __thunderid_contexts.useToast)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async ({ agentTypeId, data }) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/agent-types/${agentTypeId}`,
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				data
			})).data;
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: [require_agentTypeQueryKeys.default.AGENT_TYPE, variables.agentTypeId] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [require_agentTypeQueryKeys.default.AGENT_TYPES] }).catch(() => {});
			showToast(t("update.success"), "success");
		},
		onError: () => {
			showToast(t("update.error"), "error");
		}
	});
}

//#endregion
exports.default = useUpdateAgentType;