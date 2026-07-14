import organization_unit_query_keys_default from "../constants/organization-unit-query-keys.js";
import { useThunderID } from "@thunderid/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig, useToast } from "@thunderid/contexts";
import { useTranslation } from "react-i18next";

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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { t } = useTranslation("organizationUnits");
	const { showToast } = useToast();
	return useMutation({
		mutationFn: async (id) => {
			const serverUrl = getServerUrl();
			await http.request({
				url: `${serverUrl}/organization-units/${id}`,
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
		},
		onSuccess: (_data, id) => {
			queryClient.removeQueries({ queryKey: [organization_unit_query_keys_default.ORGANIZATION_UNIT, id] });
			queryClient.invalidateQueries({ queryKey: [organization_unit_query_keys_default.ORGANIZATION_UNITS] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [organization_unit_query_keys_default.CHILD_ORGANIZATION_UNITS] }).catch(() => {});
			showToast(t("delete.success"), "success");
		},
		onError: () => {
			showToast(t("delete.error"), "error");
		}
	});
}

//#endregion
export { useDeleteOrganizationUnit as default };