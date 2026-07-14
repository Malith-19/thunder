import userTypeQueryKeys_default from "../constants/userTypeQueryKeys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig, useToast } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";
import { useTranslation } from "react-i18next";

//#region src/api/useCreateUserType.ts
/**
* Custom React hook to create a new user type in the server.
*
* @returns TanStack Query mutation object for creating user types
*/
function useCreateUserType() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { t } = useTranslation("userTypes");
	const { showToast } = useToast();
	return useMutation({
		mutationFn: async (requestData) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/user-types`,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				data: requestData
			})).data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [userTypeQueryKeys_default.USER_TYPES] }).catch(() => {});
			showToast(t("create.success"), "success");
		},
		onError: () => {
			showToast(t("create.error"), "error");
		}
	});
}

//#endregion
export { useCreateUserType as default };