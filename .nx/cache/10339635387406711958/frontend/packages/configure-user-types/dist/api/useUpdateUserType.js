import userTypeQueryKeys_default from "../constants/userTypeQueryKeys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig, useToast } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";
import { useTranslation } from "react-i18next";

//#region src/api/useUpdateUserType.ts
/**
* Custom React hook to update an existing user type in the server.
*
* @returns TanStack Query mutation object for updating user types
*/
function useUpdateUserType() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { t } = useTranslation("userTypes");
	const { showToast } = useToast();
	return useMutation({
		mutationFn: async ({ userTypeId, data }) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/user-types/${userTypeId}`,
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				data
			})).data;
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: [userTypeQueryKeys_default.USER_TYPE, variables.userTypeId] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [userTypeQueryKeys_default.USER_TYPES] }).catch(() => {});
			showToast(t("update.success"), "success");
		},
		onError: () => {
			showToast(t("update.error"), "error");
		}
	});
}

//#endregion
export { useUpdateUserType as default };