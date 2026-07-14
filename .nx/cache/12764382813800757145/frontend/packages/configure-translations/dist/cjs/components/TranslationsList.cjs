const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_TranslationDeleteDialog = require('./TranslationDeleteDialog.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_i18n = require("@thunderid/i18n");
__thunderid_i18n = require_rolldown_runtime.__toESM(__thunderid_i18n);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);

//#region src/components/TranslationsList.tsx
function TranslationsList() {
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const { t } = (0, react_i18next.useTranslation)("translations");
	const navigate = (0, react_router.useNavigate)();
	const logger = (0, __thunderid_logger_react.useLogger)("TranslationsList");
	const dataGridLocaleText = (0, __thunderid_hooks.useDataGridLocaleText)();
	const [selectedLanguage, setSelectedLanguage] = (0, react.useState)(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, react.useState)(false);
	const { data, isLoading } = (0, __thunderid_i18n.useGetLanguages)();
	const handleEditClick = (0, react.useCallback)((language) => {
		(async () => {
			await navigate(`/translations/${language}`);
		})().catch((_error) => {
			logger.error("Failed to navigate to translation editor", {
				error: _error,
				language
			});
		});
	}, [logger, navigate]);
	const handleDeleteClick = (0, react.useCallback)((language) => {
		setSelectedLanguage(language);
		setDeleteDialogOpen(true);
	}, []);
	const handleDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
		setSelectedLanguage(null);
	};
	const rows = (0, react.useMemo)(() => (data?.languages ?? []).map((code) => ({
		id: code,
		code
	})), [data?.languages]);
	const columns = (0, react.useMemo)(() => [{
		field: "code",
		headerName: t("listing.columns.language"),
		flex: 1,
		minWidth: 240,
		renderCell: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.CellIcon, {
			sx: { width: "100%" },
			icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.ResourceAvatar, {
				value: (0, __thunderid_i18n.toFlagEmoji)(params.row.code),
				size: 30,
				fallback: "emoji:🌍"
			}),
			primary: (0, __thunderid_i18n.getDisplayNameForCode)(params.row.code),
			secondary: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
				label: params.row.code,
				size: "small",
				variant: "outlined",
				sx: {
					fontSize: "0.7rem",
					fontFamily: "monospace",
					height: 18
				}
			})
		})
	}, {
		field: "actions",
		headerName: t("listing.columns.actions"),
		width: 150,
		align: "center",
		headerAlign: "center",
		sortable: false,
		filterable: false,
		hideable: false,
		renderCell: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.ListingTable.RowActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
			title: t("common:actions.edit"),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
				size: "small",
				"aria-label": t("common:actions.edit"),
				onClick: (e) => {
					e.stopPropagation();
					handleEditClick(params.row.code);
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Pencil, { size: 16 })
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
			title: t("common:actions.delete"),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
				size: "small",
				color: "error",
				"aria-label": t("common:actions.delete"),
				onClick: (e) => {
					e.stopPropagation();
					handleDeleteClick(params.row.code);
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Trash2, { size: 16 })
			})
		})] })
	}], [
		handleDeleteClick,
		handleEditClick,
		t,
		theme
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.Provider, {
		variant: "data-grid-card",
		loading: isLoading,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.Container, {
			disablePaper: true,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.DataGrid, {
				rows,
				columns,
				getRowId: (row) => row.id,
				onRowClick: (params) => {
					handleEditClick(params.row.code);
				},
				initialState: { pagination: { paginationModel: { pageSize: 10 } } },
				pageSizeOptions: [
					5,
					10,
					25
				],
				rowHeight: 56,
				disableRowSelectionOnClick: true,
				localeText: dataGridLocaleText,
				autoHeight: true,
				sx: { "& .MuiDataGrid-row": { cursor: "pointer" } }
			})
		})
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TranslationDeleteDialog.default, {
		open: deleteDialogOpen,
		language: selectedLanguage,
		onClose: handleDeleteDialogClose
	})] });
}

//#endregion
exports.default = TranslationsList;