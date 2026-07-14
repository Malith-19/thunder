const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useGetChildOrganizationUnits = require('../../../api/useGetChildOrganizationUnits.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);

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
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const logger = (0, __thunderid_logger_react.useLogger)("ManageChildOrganizationUnitSection");
	const dataGridLocaleText = (0, __thunderid_hooks.useDataGridLocaleText)();
	const { data: childOUsData, isLoading } = require_useGetChildOrganizationUnits.default(organizationUnitId);
	const columns = (0, react.useMemo)(() => [
		{
			field: "avatar",
			headerName: "",
			width: 70,
			sortable: false,
			filterable: false,
			renderCell: () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Avatar, {
					sx: {
						p: .5,
						backgroundColor: theme.vars?.palette.grey[500],
						width: 30,
						height: 30,
						fontSize: "0.875rem",
						...theme.applyStyles("dark", { backgroundColor: theme.vars?.palette.grey[900] })
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Building, { size: 14 })
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
		title: t("organizationUnits:edit.childOUs.sections.manage.title"),
		description: t("organizationUnits:edit.childOUs.sections.manage.description"),
		slotProps: { content: { sx: { p: 0 } } },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			sx: {
				maxHeight: 400,
				width: "100%"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DataGrid.DataGrid, {
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
exports.default = ManageChildOrganizationUnitSection;