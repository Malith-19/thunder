const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_organization_unit_query_keys = require('../constants/organization-unit-query-keys.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

//#region src/api/useDeleteOrganizationUnit.ts
/**
* Custom React hook to delete an organization unit from the server.
*
* This hook uses TanStack Query mutations to handle the deletion process,
* providing loading states and error handling. Upon successful deletion, it automatically
* removes the organization unit from cache and invalidates the list query to trigger a refetch.
*
* @returns TanStack Query mutation object for deleting organization units
*
* @example
* ```tsx
* function DeleteOUButton({ id }: { id: string }) {
*   const deleteOU = useDeleteOrganizationUnit();
*
*   const handleDelete = () => {
*     if (confirm('Are you sure you want to delete this organization unit?')) {
*       deleteOU.mutate(id, {
*         onSuccess: () => {
*           console.log('Organization unit deleted successfully');
*         },
*         onError: (error) => {
*           console.error('Failed to delete organization unit:', error);
*         }
*       });
*     }
*   };
*
*   return (
*     <button onClick={handleDelete} disabled={deleteOU.isPending}>
*       {deleteOU.isPending ? 'Deleting...' : 'Delete'}
*     </button>
*   );
* }
* ```
*/
function useDeleteOrganizationUnit() {
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	const { t } = (0, react_i18next.useTranslation)("organizationUnits");
	const { showToast } = (0, __thunderid_contexts.useToast)();
	return (0, __tanstack_react_query.useMutation)({
		mutationFn: async (id) => {
			const serverUrl = getServerUrl();
			await http.request({
				url: `${serverUrl}/organization-units/${id}`,
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
		},
		onSuccess: (_data, id) => {
			queryClient.removeQueries({ queryKey: [require_organization_unit_query_keys.default.ORGANIZATION_UNIT, id] });
			queryClient.invalidateQueries({ queryKey: [require_organization_unit_query_keys.default.ORGANIZATION_UNITS] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [require_organization_unit_query_keys.default.CHILD_ORGANIZATION_UNITS] }).catch(() => {});
			showToast(t("delete.success"), "success");
		},
		onError: () => {
			showToast(t("delete.error"), "error");
		}
	});
}

//#endregion
exports.default = useDeleteOrganizationUnit;