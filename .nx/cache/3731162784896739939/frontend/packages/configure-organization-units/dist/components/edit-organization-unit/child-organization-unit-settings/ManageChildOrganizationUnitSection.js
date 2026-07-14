import useGetChildOrganizationUnits from "../../../api/useGetChildOrganizationUnits.js";
import { useTranslation } from "react-i18next";
import { Avatar, Box, DataGrid, useTheme } from "@wso2/oxygen-ui";
import { jsx } from "react/jsx-runtime";
import { SettingsCard } from "@thunderid/components";
import { useLogger } from "@thunderid/logger/react";
import { Building } from "@wso2/oxygen-ui-icons-react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useDataGridLocaleText } from "@thunderid/hooks";

//#region src/components/edit-organization-unit/child-organization-unit-settings/ManageChildOrganizationUnitSection.tsx
/**
* Section component for managing child organization units.
*
* Displays a DataGrid of child organization units with:
* - Avatar icon
* - Name
* - Handle
* - Description
*
* Clicking a row navigates to that child OU's detail page.
*
* @param props - Component props
* @returns Manage child OUs section within a SettingsCard
*/
function ManageChildOrganizationUnitSection({ organizationUnitId, organizationUnitName }) {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const theme = useTheme();
	const logger = useLogger("ManageChildOrganizationUnitSection");
	const dataGridLocaleText = useDataGridLocaleText();
	const { data: childOUsData, isLoading } = useGetChildOrganizationUnits(organizationUnitId);
	const columns = useMemo(() => [
		{
			field: "avatar",
			headerName: "",
			width: 70,
			sortable: false,
			filterable: false,
			renderCell: () => /* @__PURE__ */ jsx(Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%"
				},
				children: /* @__PURE__ */ jsx(Avatar, {
					sx: {
						p: .5,
						backgroundColor: theme.vars?.palette.grey[500],
						width: 30,
						height: 30,
						fontSize: "0.875rem",
						...theme.applyStyles("dark", { backgroundColor: theme.vars?.palette.grey[900] })
					},
					children: /* @__PURE__ */ jsx(Building, { size: 14 })
				})
			})
		},
		{
			field: "name",
			headerName: t("organizationUnits:listing.columns.name"),
			flex: 1,
			minWidth: 200
		},
		{
			field: "handle",
			headerName: t("organizationUnits:listing.columns.handle"),
			flex: 1,
			minWidth: 150
		},
		{
			field: "description",
			headerName: t("organizationUnits:listing.columns.description"),
			flex: 2,
			minWidth: 250,
			valueGetter: (_value, row) => row.description ?? "-"
		}
	], [t, theme]);
	return /* @__PURE__ */ jsx(SettingsCard, {
		title: t("organizationUnits:edit.childOUs.sections.manage.title"),
		description: t("organizationUnits:edit.childOUs.sections.manage.description"),
		slotProps: { content: { sx: { p: 0 } } },
		children: /* @__PURE__ */ jsx(Box, {
			sx: {
				maxHeight: 400,
				width: "100%"
			},
			children: /* @__PURE__ */ jsx(DataGrid.DataGrid, {
				rows: childOUsData?.organizationUnits ?? [],
				columns,
				loading: isLoading,
				getRowId: (row) => row.id,
				onRowClick: (params) => {
					const ou = params.row;
					const navigationState = { fromOU: {
						id: organizationUnitId,
						name: organizationUnitName
					} };
					(async () => {
						await navigate(`/organization-units/${ou.id}`, { state: navigationState });
					})().catch((_error) => {
						logger.error("Failed to navigate to child organization unit", {
							error: _error,
							ouId: ou.id
						});
					});
				},
				initialState: { pagination: { paginationModel: { pageSize: 10 } } },
				pageSizeOptions: [
					5,
					10,
					25
				],
				disableRowSelectionOnClick: true,
				localeText: dataGridLocaleText,
				sx: { "& .MuiDataGrid-row": { cursor: "pointer" } }
			})
		})
	});
}

//#endregion
export { ManageChildOrganizationUnitSection as default };