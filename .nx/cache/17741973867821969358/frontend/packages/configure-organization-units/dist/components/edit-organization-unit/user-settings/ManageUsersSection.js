import useGetOrganizationUnitUsers from "../../../api/useGetOrganizationUnitUsers.js";
import { useTranslation } from "react-i18next";
import { Avatar, Box, DataGrid } from "@wso2/oxygen-ui";
import { jsx } from "react/jsx-runtime";
import { SettingsCard, getInitials } from "@thunderid/components";
import { useMemo } from "react";
import { useDataGridLocaleText } from "@thunderid/hooks";

//#region src/components/edit-organization-unit/user-settings/ManageUsersSection.tsx
/**
* Section component for managing users belonging to an organization unit.
*
* Displays a DataGrid of users with:
* - Avatar with initials
* - Display Name (falls back to User ID)
* - User ID
* - User Type
*
* @param props - Component props
* @returns Manage users section within a SettingsCard
*/
function ManageUsersSection({ organizationUnitId }) {
	const { t } = useTranslation();
	const dataGridLocaleText = useDataGridLocaleText();
	const { data: usersData, isLoading } = useGetOrganizationUnitUsers(organizationUnitId);
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
						children: getInitials(params.row.display ?? params.row.id)
					})
				});
			}
		},
		{
			field: "display",
			headerName: t("organizationUnits:edit.users.sections.manage.listing.columns.name"),
			flex: 1,
			minWidth: 200,
			valueGetter: (_value, row) => row.display ?? row.id
		},
		{
			field: "id",
			headerName: t("organizationUnits:edit.users.sections.manage.listing.columns.id"),
			flex: 1,
			minWidth: 250
		},
		{
			field: "type",
			headerName: t("organizationUnits:edit.users.sections.manage.listing.columns.type"),
			flex: .6,
			minWidth: 120
		}
	], [t]);
	return /* @__PURE__ */ jsx(SettingsCard, {
		title: t("organizationUnits:edit.users.sections.manage.title"),
		description: t("organizationUnits:edit.users.sections.manage.description"),
		slotProps: { content: { sx: { p: 0 } } },
		children: /* @__PURE__ */ jsx(Box, {
			sx: {
				height: 400,
				width: "100%"
			},
			children: /* @__PURE__ */ jsx(DataGrid.DataGrid, {
				rows: usersData?.users ?? [],
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
export { ManageUsersSection as default };