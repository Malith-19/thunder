const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_user_query_keys = require('../constants/user-query-keys.cjs');
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

//#region src/api/useUpdateUser.ts
/**
* Custom hook to update an existing user.
*
* @returns TanStack Query mutation object for updating users
*/
function useUpdateUser() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	const { t } = (0, react_i18next.useTranslation)("users");
	const { showToast } = (0, __thunderid_contexts.useToast)();
	return (0, __tanstack_react_query.useMutation)({
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
			queryClient.invalidateQueries({ queryKey: [require_user_query_keys.default.USER, variables.userId] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [require_user_query_keys.default.USERS] }).catch(() => {});
			showToast(t("update.success"), "success");
		},
		onError: () => {
			showToast(t("update.error"), "error");
		}
	});
}

//#endregion
exports.default = useUpdateUser;