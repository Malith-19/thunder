import organization_unit_query_keys_default from "../constants/organization-unit-query-keys.js";
import { useThunderID } from "@thunderid/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig, useToast } from "@thunderid/contexts";
import { useTranslation } from "react-i18next";

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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { t } = useTranslation("organizationUnits");
	const { showToast } = useToast();
	return useMutation({
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
			queryClient.invalidateQueries({ queryKey: [organization_unit_query_keys_default.ORGANIZATION_UNITS] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [organization_unit_query_keys_default.ORGANIZATION_UNIT, variables.id] }).catch(() => {});
			showToast(t("update.success"), "success");
		},
		onError: () => {
			showToast(t("update.error"), "error");
		}
	});
}

//#endregion
export { useUpdateOrganizationUnit as default };