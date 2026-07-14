import userTypeQueryKeys_default from "../constants/userTypeQueryKeys.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig, useToast } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";
import { useTranslation } from "react-i18next";

//#region src/api/useDeleteUserType.ts
/**
* Custom React hook to delete a user type from the server.
*
* @returns TanStack Query mutation object for deleting user types
*/
function useDeleteUserType() {
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { t } = useTranslation("userTypes");
	const { showToast } = useToast();
	return useMutation({
		mutationFn: async (userTypeId) => {
			const serverUrl = getServerUrl();
			await http.request({
				url: `${serverUrl}/user-types/${userTypeId}`,
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
		},
		onSuccess: (_data, userTypeId) => {
			queryClient.removeQueries({ queryKey: [userTypeQueryKeys_default.USER_TYPE, userTypeId] });
			queryClient.invalidateQueries({ queryKey: [userTypeQueryKeys_default.USER_TYPES] }).catch(() => {});
			showToast(t("delete.success"), "success");
		},
		onError: () => {
			showToast(t("delete.error"), "error");
		}
	});
}

//#endregion
export { useDeleteUserType as default };