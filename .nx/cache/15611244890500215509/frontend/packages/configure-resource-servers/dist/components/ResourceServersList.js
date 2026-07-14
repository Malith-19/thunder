import useGetResourceServers from "../api/useGetResourceServers.js";
import ResourceServerDeleteDialog from "./ResourceServerDeleteDialog.js";
import { getResourceServerTypeIcon, getResourceServerTypeLabel } from "../config/resource-server-types.js";
import { Alert, Box, Chip, IconButton, ListingTable, Tooltip, Typography } from "@wso2/oxygen-ui";
import { Eye, Pencil, Trash2 } from "@wso2/oxygen-ui-icons-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useDataGridLocaleText } from "@thunderid/hooks";
import { useLogger } from "@thunderid/logger/react";
import { useNavigate } from "react-router";

//#region src/components/ResourceServersList.tsx
function ResourceServersList() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const logger = useLogger("ResourceServersList");
	const dataGridLocaleText = useDataGridLocaleText();
	const [paginationModel, setPaginationModel] = useState({
		pageSize: 10,
		page: 0
	});
	const [deleteTarget, setDeleteTarget] = useState(null);
	const { data, isLoading, error } = useGetResourceServers({
		limit: paginationModel.pageSize,
		offset: paginationModel.page * paginationModel.pageSize
	});
	const columns = useMemo(() => [
		{
			field: "name",
			headerName: t("resourceServers:listing.columns.name", "Name"),
			flex: 1,
			minWidth: 200,
			renderCell: (params) => /* @__PURE__ */ jsxs(Box, {
				sx: {
					display: "flex",
					flexDirection: "column",
					justifyContent: "center"
				},
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					fontWeight: 500,
					children: params.row.name
				}), params.row.isReadOnly && /* @__PURE__ */ jsx(Chip, {
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
			renderCell: (params) => /* @__PURE__ */ jsx(Chip, {
				icon: /* @__PURE__ */ jsx(Box, {
					sx: {
						display: "flex",
						alignItems: "center",
						"& > *": {
							width: 16,
							height: 16
						}
					},
					children: getResourceServerTypeIcon(params.row.type)
				}),
				label: getResourceServerTypeLabel(params.row.type, t),
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
			renderCell: (params) => params.row.identifier ? /* @__PURE__ */ jsx(Typography, {
				variant: "body2",
				color: "text.secondary",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.8rem"
				},
				children: params.row.identifier
			}) : /* @__PURE__ */ jsx(Typography, {
				variant: "body2",
				color: "text.disabled",
				children: "—"
			})
		},
		{
			field: "handle",
			headerName: t("resourceServers:listing.columns.handle", "Handle"),
			width: 160,
			renderCell: (params) => params.row.handle ? /* @__PURE__ */ jsx(Chip, {
				label: params.row.handle,
				size: "small",
				variant: "outlined",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.75rem"
				}
			}) : /* @__PURE__ */ jsx(Typography, {
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
			renderCell: (params) => /* @__PURE__ */ jsx(ListingTable.RowActions, { children: params.row.isReadOnly ? /* @__PURE__ */ jsx(Tooltip, {
				title: t("common:status.readOnly", "Read Only"),
				children: /* @__PURE__ */ jsx(IconButton, {
					size: "small",
					disableRipple: true,
					sx: { cursor: "default" },
					children: /* @__PURE__ */ jsx(Eye, { size: 16 })
				})
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Tooltip, {
				title: t("common:actions.edit", "Edit"),
				children: /* @__PURE__ */ jsx(IconButton, {
					size: "small",
					onClick: (e) => {
						e.stopPropagation();
						(async () => {
							await navigate(`/resource-servers/${params.row.id}`);
						})().catch((err) => {
							logger.error("Failed to navigate to resource server detail", { error: err });
						});
					},
					children: /* @__PURE__ */ jsx(Pencil, { size: 16 })
				})
			}), /* @__PURE__ */ jsx(Tooltip, {
				title: t("common:actions.delete", "Delete"),
				children: /* @__PURE__ */ jsx(IconButton, {
					size: "small",
					color: "error",
					onClick: (e) => {
						e.stopPropagation();
						setDeleteTarget(params.row);
					},
					children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
				})
			})] }) })
		}
	], [
		t,
		navigate,
		logger
	]);
	if (error) return /* @__PURE__ */ jsx(Alert, {
		severity: "error",
		sx: { mt: 2 },
		children: t("resourceServers:listing.error", "Failed to load resource servers.")
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ListingTable.Provider, {
		variant: "data-grid-card",
		loading: isLoading,
		children: /* @__PURE__ */ jsx(ListingTable.Container, {
			disablePaper: true,
			children: /* @__PURE__ */ jsx(ListingTable.DataGrid, {
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
	}), /* @__PURE__ */ jsx(ResourceServerDeleteDialog, {
		open: deleteTarget !== null,
		resourceServer: deleteTarget,
		onClose: () => setDeleteTarget(null),
		onSuccess: () => setDeleteTarget(null)
	})] });
}

//#endregion
export { ResourceServersList as default };