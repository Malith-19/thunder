import user_query_keys_default from "../constants/user-query-keys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig, useToast } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";
import { useTranslation } from "react-i18next";

//#region src/api/useUpdateUser.ts
/**
* Custom hook to update an existing user.
*
* @returns TanStack Query mutation object for updating users
*/
function useUpdateUser() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { t } = useTranslation("users");
	const { showToast } = useToast();
	return useMutation({
		mutationFn: async ({ userId, data }) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/users/${userId}`,
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				data
			})).data;
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: [user_query_keys_default.USER, variables.userId] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [user_query_keys_default.USERS] }).catch(() => {});
			showToast(t("update.success"), "success");
		},
		onError: () => {
			showToast(t("update.error"), "error");
		}
	});
}

//#endregion
export { useUpdateUser as default };