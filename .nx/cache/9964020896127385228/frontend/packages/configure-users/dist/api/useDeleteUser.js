import user_query_keys_default from "../constants/user-query-keys.js";
import { useThunderID } from "@thunderid/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig, useToast } from "@thunderid/contexts";
import { useTranslation } from "react-i18next";

//#region src/api/useDeleteUser.ts
/**
* Custom hook to delete a user by ID.
*
* @returns TanStack Query mutation object for deleting users
*/
function useDeleteUser() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { t } = useTranslation("users");
	const { showToast } = useToast();
	return useMutation({
		mutationFn: async (userId) => {
			const serverUrl = getServerUrl();
			await http.request({
				url: `${serverUrl}/users/${userId}`,
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
		},
		onSuccess: (_data, userId) => {
			queryClient.removeQueries({ queryKey: [user_query_keys_default.USER, userId] });
			queryClient.invalidateQueries({ queryKey: [user_query_keys_default.USERS] }).catch(() => {});
			showToast(t("delete.success"), "success");
		},
		onError: () => {
			showToast(t("delete.error"), "error");
		}
	});
}

//#endregion
export { useDeleteUser as default };