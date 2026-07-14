import useGetOrganizationUnitGroups from "../../../api/useGetOrganizationUnitGroups.js";
import { useTranslation } from "react-i18next";
import { Avatar, Box, DataGrid } from "@wso2/oxygen-ui";
import { jsx } from "react/jsx-runtime";
import { SettingsCard, getInitials } from "@thunderid/components";
import { useMemo } from "react";
import { useDataGridLocaleText } from "@thunderid/hooks";

//#region src/components/edit-organization-unit/group-settings/ManageGroupsSection.tsx
/**
* Section component for managing groups belonging to an organization unit.
*
* Displays a DataGrid of groups with:
* - Avatar icon
* - Group Name
* - Group ID
*
* @param props - Component props
* @returns Manage groups section within a SettingsCard
*/
function ManageGroupsSection({ organizationUnitId }) {
	const { t } = useTranslation();
	const dataGridLocaleText = useDataGridLocaleText();
	const { data: groupsData, isLoading } = useGetOrganizationUnitGroups(organizationUnitId);
	const columns = useMemo(() => [
		{
			field: "avatar",
			headerName: "",
			width: 70,
			sortable: false,
			filterable: false,
			renderCell: (params) => {
				return /* @__PURE__ */ jsx(Box, {
					sx: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%"
					},
					children: /* @__PURE__ */ jsx(Avatar, {
						sx: {
							width: 30,
							height: 30,
							bgcolor: "primary.main",
							fontSize: "0.875rem"
						},
						children: getInitials(params.row.name ?? params.row.id)
					})
				});
			}
		},
		{
			field: "name",
			headerName: t("organizationUnits:edit.groups.sections.manage.listing.columns.name"),
			flex: 1,
			minWidth: 200
		},
		{
			field: "id",
			headerName: t("organizationUnits:edit.groups.sections.manage.listing.columns.id"),
			flex: 1,
			minWidth: 250
		}
	], [t]);
	return /* @__PURE__ */ jsx(SettingsCard, {
		title: t("organizationUnits:edit.groups.sections.manage.title"),
		description: t("organizationUnits:edit.groups.sections.manage.description"),
		slotProps: { content: { sx: { p: 0 } } },
		children: /* @__PURE__ */ jsx(Box, {
			sx: {
				height: 400,
				width: "100%"
			},
			children: /* @__PURE__ */ jsx(DataGrid.DataGrid, {
				rows: groupsData?.groups ?? [],
				columns,
				loading: isLoading,
				getRowId: (row) => row.id,
				initialState: { pagination: { paginationModel: { pageSize: 10 } } },
				pageSizeOptions: [
					5,
					10,
					25
				],
				disableRowSelectionOnClick: true,
				localeText: dataGridLocaleText
			})
		})
	});
}

//#endregion
export { ManageGroupsSection as default };