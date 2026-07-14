import agentTypeQueryKeys_default from "../constants/agentTypeQueryKeys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig, useToast } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";
import { useTranslation } from "react-i18next";

//#region src/api/useUpdateAgentType.ts
/**
* Custom React hook to update an existing agent type in the server.
*
* @returns TanStack Query mutation object for updating agent types
*/
function useUpdateAgentType() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { t } = useTranslation("agentTypes");
	const { showToast } = useToast();
	return useMutation({
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
			queryClient.invalidateQueries({ queryKey: [agentTypeQueryKeys_default.AGENT_TYPE, variables.agentTypeId] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [agentTypeQueryKeys_default.AGENT_TYPES] }).catch(() => {});
			showToast(t("update.success"), "success");
		},
		onError: () => {
			showToast(t("update.error"), "error");
		}
	});
}

//#endregion
export { useUpdateAgentType as default };