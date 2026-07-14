const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_organization_unit_query_keys = require('../constants/organization-unit-query-keys.cjs');
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

//#region src/api/useUpdateOrganizationUnit.ts
/**
* Custom hook to update an existing organization unit.
*
* @returns TanStack Query mutation object for updating organization units
*
* @example
* ```tsx
* function UpdateOUButton({ id }: { id: string }) {
*   const updateOU = useUpdateOrganizationUnit();
*
*   const handleUpdate = (data: UpdateOrganizationUnitRequest) => {
*     updateOU.mutate({ id, data }, {
*       onSuccess: (ou) => {
*         console.log('Organization unit updated:', ou);
*       },
*       onError: (error) => {
*         console.error('Failed to update organization unit:', error);
*       }
*     });
*   };
*
*   return (
*     <button onClick={() => handleUpdate(data)} disabled={updateOU.isPending}>
*       {updateOU.isPending ? 'Updating...' : 'Update'}
*     </button>
*   );
* }
* ```
*/
function useUpdateOrganizationUnit() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	const { t } = (0, react_i18next.useTranslation)("organizationUnits");
	const { showToast } = (0, __thunderid_contexts.useToast)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async ({ id, data }) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/organization-units/${id}`,
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				data
			})).data;
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({ queryKey: [require_organization_unit_query_keys.default.ORGANIZATION_UNITS] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [require_organization_unit_query_keys.default.ORGANIZATION_UNIT, variables.id] }).catch(() => {});
			showToast(t("update.success"), "success");
		},
		onError: () => {
			showToast(t("update.error"), "error");
		}
	});
}

//#endregion
exports.default = useUpdateOrganizationUnit;