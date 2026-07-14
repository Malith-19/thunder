import user_query_keys_default from "../constants/user-query-keys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig, useToast } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";
import { useTranslation } from "react-i18next";

//#region src/api/useCreateUser.ts
/**
* Custom hook to create a new user.
*
* @returns TanStack Query mutation object for creating users
*/
function useCreateUser() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { t } = useTranslation("users");
	const { showToast } = useToast();
	return useMutation({
		mutationFn: async (userData) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/users`,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				data: userData
			})).data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [user_query_keys_default.USERS] }).catch(() => {});
			showToast(t("create.success"), "success");
		},
		onError: () => {
			showToast(t("create.error"), "error");
		}
	});
}

//#endregion
export { useCreateUser as default };