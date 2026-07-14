const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_userTypeQueryKeys = require('../constants/userTypeQueryKeys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

//#region src/api/useDeleteUserType.ts
/**
* Custom React hook to delete a user type from the server.
*
* @returns TanStack Query mutation object for deleting user types
*/
function useDeleteUserType() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	const { t } = (0, react_i18next.useTranslation)("userTypes");
	const { showToast } = (0, __thunderid_contexts.useToast)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async (userTypeId) => {
			const serverUrl = getServerUrl();
			await http.request({
				url: `${serverUrl}/user-types/${userTypeId}`,
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
		},
		onSuccess: (_data, userTypeId) => {
			queryClient.removeQueries({ queryKey: [require_userTypeQueryKeys.default.USER_TYPE, userTypeId] });
			queryClient.invalidateQueries({ queryKey: [require_userTypeQueryKeys.default.USER_TYPES] }).catch(() => {});
			showToast(t("delete.success"), "success");
		},
		onError: () => {
			showToast(t("delete.error"), "error");
		}
	});
}

//#endregion
exports.default = useDeleteUserType;