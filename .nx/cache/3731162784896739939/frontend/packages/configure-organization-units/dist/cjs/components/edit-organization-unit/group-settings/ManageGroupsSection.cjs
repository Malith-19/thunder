const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useGetOrganizationUnitGroups = require('../../../api/useGetOrganizationUnitGroups.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);

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
	const { t } = (0, react_i18next.useTranslation)();
	const dataGridLocaleText = (0, __thunderid_hooks.useDataGridLocaleText)();
	const { data: groupsData, isLoading } = require_useGetOrganizationUnitGroups.default(organizationUnitId);
	const columns = (0, react.useMemo)(() => [
		{
			field: "avatar",
			headerName: "",
			width: 70,
			sortable: false,
			filterable: false,
			renderCell: (params) => {
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%"
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Avatar, {
						sx: {
							width: 30,
							height: 30,
							bgcolor: "primary.main",
							fontSize: "0.875rem"
						},
						children: (0, __thunderid_components.getInitials)(params.row.name ?? params.row.id)
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
		title: t("organizationUnits:edit.groups.sections.manage.title"),
		description: t("organizationUnits:edit.groups.sections.manage.description"),
		slotProps: { content: { sx: { p: 0 } } },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			sx: {
				height: 400,
				width: "100%"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DataGrid.DataGrid, {
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
exports.default = ManageGroupsSection;