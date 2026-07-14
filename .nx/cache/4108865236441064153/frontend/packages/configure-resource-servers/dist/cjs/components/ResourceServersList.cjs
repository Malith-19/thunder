const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useGetResourceServers = require('../api/useGetResourceServers.cjs');
const require_ResourceServerDeleteDialog = require('./ResourceServerDeleteDialog.cjs');
const require_resource_server_types = require('../config/resource-server-types.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);

//#region src/components/ResourceServersList.tsx
function ResourceServersList() {
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("ResourceServersList");
	const dataGridLocaleText = (0, __thunderid_hooks.useDataGridLocaleText)();
	const [paginationModel, setPaginationModel] = (0, react.useState)({
		pageSize: 10,
		page: 0
	});
	const [deleteTarget, setDeleteTarget] = (0, react.useState)(null);
	const { data, isLoading, error } = require_useGetResourceServers.default({
		limit: paginationModel.pageSize,
		offset: paginationModel.page * paginationModel.pageSize
	});
	const columns = (0, react.useMemo)(() => [
		{
			field: "name",
			headerName: t("resourceServers:listing.columns.name", "Name"),
			flex: 1,
			minWidth: 200,
			renderCell: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					flexDirection: "column",
					justifyContent: "center"
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					fontWeight: 500,
					children: params.row.name
				}), params.row.isReadOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
					label: t("resourceServers:listing.systemResourceServer", "System resource server"),
					size: "small",
					sx: {
						mt: .25,
						height: 18,
						fontSize: "0.65rem",
						width: "fit-content"
					}
				})]
			})
		},
		{
			field: "type",
			headerName: t("resourceServers:listing.columns.type", "Type"),
			flex: .8,
			minWidth: 120,
			renderCell: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
				icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						display: "flex",
						alignItems: "center",
						"& > *": {
							width: 16,
							height: 16
						}
					},
					children: require_resource_server_types.getResourceServerTypeIcon(params.row.type)
				}),
				label: require_resource_server_types.getResourceServerTypeLabel(params.row.type, t),
				size: "small",
				variant: "outlined",
				sx: {
					px: .5,
					fontSize: "0.75rem"
				}
			})
		},
		{
			field: "identifier",
			headerName: t("resourceServers:listing.columns.identifier", "Identifier"),
			flex: 1.5,
			minWidth: 240,
			renderCell: (params) => params.row.identifier ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				color: "text.secondary",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.8rem"
				},
				children: params.row.identifier
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				color: "text.disabled",
				children: "—"
			})
		},
		{
			field: "handle",
			headerName: t("resourceServers:listing.columns.handle", "Handle"),
			width: 160,
			renderCell: (params) => params.row.handle ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
				label: params.row.handle,
				size: "small",
				variant: "outlined",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.75rem"
				}
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				color: "text.disabled",
				children: "—"
			})
		},
		{
			field: "actions",
			headerName: t("resourceServers:listing.columns.actions", "Actions"),
			width: 150,
			align: "center",
			headerAlign: "center",
			sortable: false,
			filterable: false,
			hideable: false,
			renderCell: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.RowActions, { children: params.row.isReadOnly ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
				title: t("common:status.readOnly", "Read Only"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					size: "small",
					disableRipple: true,
					sx: { cursor: "default" },
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Eye, { size: 16 })
				})
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
				title: t("common:actions.edit", "Edit"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					size: "small",
					onClick: (e) => {
						e.stopPropagation();
						(async () => {
							await navigate(`/resource-servers/${params.row.id}`);
						})().catch((err) => {
							logger.error("Failed to navigate to resource server detail", { error: err });
						});
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Pencil, { size: 16 })
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
				title: t("common:actions.delete", "Delete"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					size: "small",
					color: "error",
					onClick: (e) => {
						e.stopPropagation();
						setDeleteTarget(params.row);
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Trash2, { size: 16 })
				})
			})] }) })
		}
	], [
		t,
		navigate,
		logger
	]);
	if (error) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "error",
		sx: { mt: 2 },
		children: t("resourceServers:listing.error", "Failed to load resource servers.")
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.Provider, {
		variant: "data-grid-card",
		loading: isLoading,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.Container, {
			disablePaper: true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.DataGrid, {
				rows: data?.resourceServers ?? [],
				columns,
				getRowId: (row) => row.id,
				onRowClick: (params) => {
					(async () => {
						await navigate(`/resource-servers/${params.row.id}`);
					})().catch((err) => {
						logger.error("Failed to navigate to resource server detail", { error: err });
					});
				},
				rowCount: data?.totalResults ?? 0,
				paginationMode: "server",
				paginationModel,
				onPaginationModelChange: setPaginationModel,
				pageSizeOptions: [
					5,
					10,
					25
				],
				disableRowSelectionOnClick: true,
				localeText: dataGridLocaleText,
				autoHeight: true,
				sx: { "& .MuiDataGrid-row": { cursor: "pointer" } }
			})
		})
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ResourceServerDeleteDialog.default, {
		open: deleteTarget !== null,
		resourceServer: deleteTarget,
		onClose: () => setDeleteTarget(null),
		onSuccess: () => setDeleteTarget(null)
	})] });
}

//#endregion
exports.default = ResourceServersList;