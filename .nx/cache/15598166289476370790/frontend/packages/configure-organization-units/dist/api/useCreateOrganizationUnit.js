import organization_unit_query_keys_default from "../constants/organization-unit-query-keys.js";
import { useThunderID } from "@thunderid/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useConfig, useToast } from "@thunderid/contexts";
import { useTranslation } from "react-i18next";

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
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { t } = useTranslation("organizationUnits");
	const { showToast } = useToast();
	return useMutation({
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
			queryClient.invalidateQueries({ queryKey: [organization_unit_query_keys_default.ORGANIZATION_UNITS] }).catch(() => {});
			queryClient.invalidateQueries({ queryKey: [organization_unit_query_keys_default.CHILD_ORGANIZATION_UNITS] }).catch(() => {});
			showToast(t("create.success"), "success");
		},
		onError: () => {
			showToast(t("create.error"), "error");
		}
	});
}

//#endregion
export { useCreateOrganizationUnit as default };