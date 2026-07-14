const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useDeleteUserType = require('../api/useDeleteUserType.cjs');
const require_useGetUserTypes = require('../api/useGetUserTypes.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/UserTypesList.tsx
function UserTypesList() {
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("UserTypesList");
	const dataGridLocaleText = (0, __thunderid_hooks.useDataGridLocaleText)();
	const { data: userTypesData, isLoading, error: userTypesRequestError } = require_useGetUserTypes.default();
	const deleteUserTypeMutation = require_useDeleteUserType.default();
	const error = userTypesRequestError;
	const [snackbarOpen, setSnackbarOpen] = (0, react.useState)(false);
	const [selectedUserTypeId, setSelectedUserTypeId] = (0, react.useState)(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, react.useState)(false);
	const [prevError, setPrevError] = (0, react.useState)(null);
	if (prevError !== error) {
		setPrevError(error);
		if (error) setSnackbarOpen(true);
	}
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};
	const handleDeleteClick = (0, react.useCallback)((userTypeId) => {
		setSelectedUserTypeId(userTypeId);
		setDeleteDialogOpen(true);
	}, []);
	const handleViewClick = (0, react.useCallback)((userTypeId) => {
		(async () => {
			await navigate(`/user-types/${userTypeId}`);
		})().catch((_error) => {
			logger.error("Failed to navigate to user type", {
				error: _error,
				userTypeId
			});
		});
	}, [logger, navigate]);
	const handleDeleteCancel = () => {
		setDeleteDialogOpen(false);
		setSelectedUserTypeId(null);
		deleteUserTypeMutation.reset();
	};
	const handleDeleteConfirm = async () => {
		if (!selectedUserTypeId) return;
		try {
			await deleteUserTypeMutation.mutateAsync(selectedUserTypeId);
			setDeleteDialogOpen(false);
			setSelectedUserTypeId(null);
		} catch {}
	};
	const columns = (0, react.useMemo)(() => [
		{
			field: "name",
			headerName: t("userTypes:listing.columns.name", "Name"),
			flex: 1.5,
			minWidth: 220,
			renderCell: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				children: params.row.name
			})
		},
		{
			field: "id",
			headerName: t("userTypes:listing.columns.id", "User Type ID"),
			width: 350,
			renderCell: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.875rem"
				},
				children: params.row.id
			})
		},
		{
			field: "ouHandle",
			headerName: t("userTypes:listing.columns.organizationUnit", "Organization Unit"),
			flex: 1,
			minWidth: 220,
			renderCell: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.875rem"
				},
				children: params.row.ouHandle ?? params.row.ouId ?? t("common:messages.noData")
			})
		},
		{
			field: "allowSelfRegistration",
			headerName: t("userTypes:listing.columns.allowSelfRegistration", "Self Registration"),
			width: 200,
			renderCell: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
				label: params.row.allowSelfRegistration ? t("common:status.enabled") : t("common:status.disabled"),
				color: params.row.allowSelfRegistration ? "success" : "default",
				size: "small"
			})
		},
		{
			field: "actions",
			headerName: t("userTypes:listing.columns.actions", "Actions"),
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
				title: t("common:actions.edit"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					size: "small",
					onClick: (e) => {
						e.stopPropagation();
						handleViewClick(params.row.id);
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Pencil, { size: 16 })
				})
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
				title: t("common:actions.delete"),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					size: "small",
					color: "error",
					onClick: (e) => {
						e.stopPropagation();
						handleDeleteClick(params.row.id);
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Trash2, { size: 16 })
				})
			})] }) })
		}
	], [
		t,
		handleDeleteClick,
		handleViewClick
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.Provider, {
			variant: "data-grid-card",
			loading: isLoading,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.Container, {
				disablePaper: true,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.DataGrid, {
					rows: userTypesData?.types ?? [],
					columns,
					getRowId: (row) => row.id,
					onRowClick: (params) => {
						handleViewClick(params.row.id);
					},
					initialState: { pagination: { paginationModel: { pageSize: 10 } } },
					pageSizeOptions: [
						5,
						10,
						25,
						50
					],
					disableRowSelectionOnClick: true,
					localeText: dataGridLocaleText,
					autoHeight: true,
					sx: { "& .MuiDataGrid-row": { cursor: "pointer" } }
				})
			})
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Dialog, {
			open: deleteDialogOpen,
			onClose: handleDeleteCancel,
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogTitle, { children: t("userTypes:deleteUserType") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogContentText, { children: t("userTypes:confirmDeleteUserType") }), deleteUserTypeMutation.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
					severity: "error",
					sx: { mt: 2 },
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						sx: { fontWeight: "bold" },
						children: deleteUserTypeMutation.error.message
					})
				})] }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					onClick: handleDeleteCancel,
					disabled: deleteUserTypeMutation.isPending,
					children: t("common:actions.cancel")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					onClick: () => {
						handleDeleteConfirm().catch(() => {});
					},
					color: "error",
					variant: "contained",
					disabled: deleteUserTypeMutation.isPending,
					children: deleteUserTypeMutation.isPending ? t("common:status.loading") : t("common:actions.delete")
				})] })
			]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Snackbar, {
			open: snackbarOpen,
			autoHideDuration: 6e3,
			onClose: handleCloseSnackbar,
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "right"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				onClose: handleCloseSnackbar,
				severity: "error",
				sx: { width: "100%" },
				children: error?.message ?? t("common:messages.saveError")
			})
		})
	] });
}

//#endregion
exports.default = UserTypesList;