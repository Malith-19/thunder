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

//#region src/api/useCreateOrganizationUnit.ts
/**
* Custom hook to create a new organization unit.
*
* @returns TanStack Query mutation object for creating organization units
*
* @example
* ```tsx
* function CreateOUButton() {
*   const createOU = useCreateOrganizationUnit();
*
*   const handleCreate = (data: CreateOrganizationUnitRequest) => {
*     createOU.mutate(data, {
*       onSuccess: (ou) => {
*         console.log('Organization unit created:', ou);
*       },
*       onError: (error) => {
*         console.error('Failed to create organization unit:', error);
*       }
*     });
*   };
*
*   return (
*     <button onClick={() => handleCreate(data)} disabled={createOU.isPending}>
*       {createOU.isPending ? 'Creating...' : 'Create'}
*     </button>
*   );
* }
* ```
*/
function useCreateOrganizationUnit() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	const { t } = (0, react_i18next.useTranslation)("organizationUnits");
	const { showToast } = (0, __thunderid_contexts.useToast)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async (data) => {
			const serverUrl = getServerUrl();
			return (await http.request({
				url: `${serverUrl}/organization-units`,
				method: "POST",
				headers: { "Content-Type": "application/json" },
				data
			})).data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [require_organization_unit_query_keys.default.ORGANIZATION_UNITS] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [require_organization_unit_query_keys.default.CHILD_ORGANIZATION_UNITS] }).catch(() => {});
			showToast(t("create.success"), "success");
		},
		onError: () => {
			showToast(t("create.error"), "error");
		}
	});
}

//#endregion
exports.default = useCreateOrganizationUnit;