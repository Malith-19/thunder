import useDeleteUserType from "../api/useDeleteUserType.js";
import useGetUserTypes from "../api/useGetUserTypes.js";
import { useTranslation } from "react-i18next";
import { useDataGridLocaleText } from "@thunderid/hooks";
import { useLogger } from "@thunderid/logger/react";
import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListingTable, Snackbar, Tooltip, Typography } from "@wso2/oxygen-ui";
import { Eye, Pencil, Trash2 } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

//#region src/components/UserTypesList.tsx
function UserTypesList() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const logger = useLogger("UserTypesList");
	const dataGridLocaleText = useDataGridLocaleText();
	const { data: userTypesData, isLoading, error: userTypesRequestError } = useGetUserTypes();
	const deleteUserTypeMutation = useDeleteUserType();
	const error = userTypesRequestError;
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [selectedUserTypeId, setSelectedUserTypeId] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [prevError, setPrevError] = useState(null);
	if (prevError !== error) {
		setPrevError(error);
		if (error) setSnackbarOpen(true);
	}
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};
	const handleDeleteClick = useCallback((userTypeId) => {
		setSelectedUserTypeId(userTypeId);
		setDeleteDialogOpen(true);
	}, []);
	const handleViewClick = useCallback((userTypeId) => {
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
	const columns = useMemo(() => [
		{
			field: "name",
			headerName: t("userTypes:listing.columns.name", "Name"),
			flex: 1.5,
			minWidth: 220,
			renderCell: (params) => /* @__PURE__ */ jsx(Typography, {
				variant: "body2",
				children: params.row.name
			})
		},
		{
			field: "id",
			headerName: t("userTypes:listing.columns.id", "User Type ID"),
			width: 350,
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
			headerName: t("userTypes:listing.columns.organizationUnit", "Organization Unit"),
			flex: 1,
			minWidth: 220,
			renderCell: (params) => /* @__PURE__ */ jsx(Typography, {
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
			renderCell: (params) => /* @__PURE__ */ jsx(Chip, {
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
			renderCell: (params) => /* @__PURE__ */ jsx(ListingTable.RowActions, { children: params.row.isReadOnly ? /* @__PURE__ */ jsx(Tooltip, {
				title: t("common:status.readOnly", "Read Only"),
				children: /* @__PURE__ */ jsx(IconButton, {
					size: "small",
					disableRipple: true,
					sx: { cursor: "default" },
					children: /* @__PURE__ */ jsx(Eye, { size: 16 })
				})
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Tooltip, {
				title: t("common:actions.edit"),
				children: /* @__PURE__ */ jsx(IconButton, {
					size: "small",
					onClick: (e) => {
						e.stopPropagation();
						handleViewClick(params.row.id);
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
			})] }) })
		}
	], [
		t,
		handleDeleteClick,
		handleViewClick
	]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(ListingTable.Provider, {
			variant: "data-grid-card",
			loading: isLoading,
			children: /* @__PURE__ */ jsx(ListingTable.Container, {
				disablePaper: true,
				children: /* @__PURE__ */ jsx(ListingTable.DataGrid, {
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
		/* @__PURE__ */ jsxs(Dialog, {
			open: deleteDialogOpen,
			onClose: handleDeleteCancel,
			children: [
				/* @__PURE__ */ jsx(DialogTitle, { children: t("userTypes:deleteUserType") }),
				/* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsx(DialogContentText, { children: t("userTypes:confirmDeleteUserType") }), deleteUserTypeMutation.error && /* @__PURE__ */ jsx(Alert, {
					severity: "error",
					sx: { mt: 2 },
					children: /* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						sx: { fontWeight: "bold" },
						children: deleteUserTypeMutation.error.message
					})
				})] }),
				/* @__PURE__ */ jsxs(DialogActions, { children: [/* @__PURE__ */ jsx(Button, {
					onClick: handleDeleteCancel,
					disabled: deleteUserTypeMutation.isPending,
					children: t("common:actions.cancel")
				}), /* @__PURE__ */ jsx(Button, {
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
		/* @__PURE__ */ jsx(Snackbar, {
			open: snackbarOpen,
			autoHideDuration: 6e3,
			onClose: handleCloseSnackbar,
			anchorOrigin: {
				vertical: "bottom",
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
export { UserTypesList as default };