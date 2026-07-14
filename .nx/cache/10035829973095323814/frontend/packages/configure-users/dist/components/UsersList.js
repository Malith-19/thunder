import useDeleteUser from "../api/useDeleteUser.js";
import useGetUsers from "../api/useGetUsers.js";
import { useTranslation } from "react-i18next";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListingTable, Snackbar, Tooltip, Typography, useTheme } from "@wso2/oxygen-ui";
import { Pencil, Trash2 } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ResourceAvatar, getInitials } from "@thunderid/components";
import { useDataGridLocaleText } from "@thunderid/hooks";
import { useLogger } from "@thunderid/logger/react";
import { useNavigate } from "react-router";

//#region src/components/UsersList.tsx
function UsersList() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const logger = useLogger("UsersList");
	const dataGridLocaleText = useDataGridLocaleText();
	const { data: userData, isLoading, error: usersRequestError } = useGetUsers();
	const deleteUserMutation = useDeleteUser();
	const error = usersRequestError;
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [prevError, setPrevError] = useState(null);
	if (prevError !== error) {
		setPrevError(error);
		if (error) setSnackbarOpen(true);
	}
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};
	const handleDeleteClick = useCallback((userId) => {
		setSelectedUserId(userId);
		setDeleteDialogOpen(true);
	}, []);
	const handleEditClick = useCallback((userId) => {
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
	const columns = useMemo(() => [
		{
			field: "name",
			headerName: t("users:listing.columns.name", "Name"),
			flex: 1,
			minWidth: 200,
			renderCell: (params) => {
				const displayVal = params.row.display ?? params.row.id;
				const rawPicture = params.row.attributes?.["picture"];
				const picture = typeof rawPicture === "string" ? rawPicture : void 0;
				return /* @__PURE__ */ jsx(ListingTable.CellIcon, {
					sx: { width: "100%" },
					icon: /* @__PURE__ */ jsx(ResourceAvatar, {
						value: picture,
						size: 30,
						fallback: getInitials(displayVal)
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
			renderCell: (params) => /* @__PURE__ */ jsx(Typography, {
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
			renderCell: (params) => /* @__PURE__ */ jsx(Typography, {
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
			renderCell: (params) => /* @__PURE__ */ jsxs(ListingTable.RowActions, { children: [/* @__PURE__ */ jsx(Tooltip, {
				title: t("common:actions.edit"),
				children: /* @__PURE__ */ jsx(IconButton, {
					size: "small",
					onClick: (e) => {
						e.stopPropagation();
						handleEditClick(params.row.id);
					},
					children: /* @__PURE__ */ jsx(Pencil, { size: 16 })
				})
			}), /* @__PURE__ */ jsx(Tooltip, {
				title: t("common:actions.delete"),
				children: /* @__PURE__ */ jsx(IconButton, {
					size: "small",
					color: "error",
					onClick: (e) => {
						e.stopPropagation();
						handleDeleteClick(params.row.id);
					},
					children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
				})
			})] })
		}
	], [
		handleDeleteClick,
		handleEditClick,
		t,
		theme
	]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(ListingTable.Provider, {
			variant: "data-grid-card",
			loading: isLoading,
			children: /* @__PURE__ */ jsx(ListingTable.Container, {
				disablePaper: true,
				children: /* @__PURE__ */ jsx(ListingTable.DataGrid, {
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
		/* @__PURE__ */ jsxs(Dialog, {
			open: deleteDialogOpen,
			onClose: handleDeleteCancel,
			children: [
				/* @__PURE__ */ jsx(DialogTitle, { children: t("users:deleteUser") }),
				/* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsx(DialogContentText, { children: t("users:confirmDeleteUser") }), deleteUserMutation.error && /* @__PURE__ */ jsx(Alert, {
					severity: "error",
					sx: { mt: 2 },
					children: /* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						sx: { fontWeight: "bold" },
						children: deleteUserMutation.error.message
					})
				})] }),
				/* @__PURE__ */ jsxs(DialogActions, { children: [/* @__PURE__ */ jsx(Button, {
					onClick: handleDeleteCancel,
					disabled: deleteUserMutation.isPending,
					children: t("common:actions.cancel")
				}), /* @__PURE__ */ jsx(Button, {
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
		/* @__PURE__ */ jsx(Snackbar, {
			open: snackbarOpen,
			autoHideDuration: 6e3,
			onClose: handleCloseSnackbar,
			anchorOrigin: {
				vertical: "top",
				horizontal: "right"
			},
			children: /* @__PURE__ */ jsx(Alert, {
				onClose: handleCloseSnackbar,
				severity: "error",
				sx: { width: "100%" },
				children: error?.message ?? t("common:messages.saveError")
			})
		})
	] });
}

//#endregion
export { UsersList as default };