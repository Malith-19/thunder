const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useDeleteUser = require('../api/useDeleteUser.cjs');
const require_useGetUsers = require('../api/useGetUsers.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __thunderid_hooks = require("@thunderid/hooks");
__thunderid_hooks = require_rolldown_runtime.__toESM(__thunderid_hooks);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);

//#region src/components/UsersList.tsx
function UsersList() {
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("UsersList");
	const dataGridLocaleText = (0, __thunderid_hooks.useDataGridLocaleText)();
	const { data: userData, isLoading, error: usersRequestError } = require_useGetUsers.default();
	const deleteUserMutation = require_useDeleteUser.default();
	const error = usersRequestError;
	const [snackbarOpen, setSnackbarOpen] = (0, react.useState)(false);
	const [selectedUserId, setSelectedUserId] = (0, react.useState)(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, react.useState)(false);
	const [prevError, setPrevError] = (0, react.useState)(null);
	if (prevError !== error) {
		setPrevError(error);
		if (error) setSnackbarOpen(true);
	}
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};
	const handleDeleteClick = (0, react.useCallback)((userId) => {
		setSelectedUserId(userId);
		setDeleteDialogOpen(true);
	}, []);
	const handleEditClick = (0, react.useCallback)((userId) => {
		(async () => {
			await navigate(`/users/${userId}`);
		})().catch((_error) => {
			logger.error("Failed to navigate to user details", {
				error: _error,
				userId
			});
		});
	}, [logger, navigate]);
	const handleDeleteCancel = () => {
		setDeleteDialogOpen(false);
		setSelectedUserId(null);
	};
	const handleDeleteConfirm = async () => {
		if (!selectedUserId) return;
		try {
			await deleteUserMutation.mutateAsync(selectedUserId);
			setDeleteDialogOpen(false);
			setSelectedUserId(null);
		} catch (err) {
			setDeleteDialogOpen(false);
			logger.error("Failed to delete user", {
				error: err,
				userId: selectedUserId
			});
		}
	};
	const columns = (0, react.useMemo)(() => [
		{
			field: "name",
			headerName: t("users:listing.columns.name", "Name"),
			flex: 1,
			minWidth: 200,
			renderCell: (params) => {
				const displayVal = params.row.display ?? params.row.id;
				const rawPicture = params.row.attributes?.["picture"];
				const picture = typeof rawPicture === "string" ? rawPicture : void 0;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.CellIcon, {
					sx: { width: "100%" },
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.ResourceAvatar, {
						value: picture,
						size: 30,
						fallback: (0, __thunderid_components.getInitials)(displayVal)
					}),
					primary: displayVal
				});
			}
		},
		{
			field: "id",
			headerName: t("users:listing.columns.userId", "User ID"),
			flex: 1,
			minWidth: 200,
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
			headerName: t("users:listing.columns.organizationUnit", "Organization Unit"),
			flex: .5,
			minWidth: 150,
			renderCell: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.875rem"
				},
				children: params.row.ouHandle ?? params.row.ouId ?? "-"
			})
		},
		{
			field: "actions",
			headerName: t("users:listing.columns.actions", "Actions"),
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
					onClick: (e) => {
						e.stopPropagation();
						handleEditClick(params.row.id);
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
			})] })
		}
	], [
		handleDeleteClick,
		handleEditClick,
		t,
		theme
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.Provider, {
			variant: "data-grid-card",
			loading: isLoading,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.Container, {
				disablePaper: true,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListingTable.DataGrid, {
					rows: userData?.users ?? [],
					columns,
					getRowId: (row) => row.id,
					onRowClick: (params) => {
						handleEditClick(params.row.id);
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
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogTitle, { children: t("users:deleteUser") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogContentText, { children: t("users:confirmDeleteUser") }), deleteUserMutation.error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
					severity: "error",
					sx: { mt: 2 },
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						sx: { fontWeight: "bold" },
						children: deleteUserMutation.error.message
					})
				})] }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					onClick: handleDeleteCancel,
					disabled: deleteUserMutation.isPending,
					children: t("common:actions.cancel")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					onClick: () => {
						handleDeleteConfirm().catch(() => {});
					},
					color: "error",
					variant: "contained",
					disabled: deleteUserMutation.isPending,
					children: deleteUserMutation.isPending ? t("common:status.loading") : t("common:actions.delete")
				})] })
			]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Snackbar, {
			open: snackbarOpen,
			autoHideDuration: 6e3,
			onClose: handleCloseSnackbar,
			anchorOrigin: {
				vertical: "top",
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
exports.default = UsersList;