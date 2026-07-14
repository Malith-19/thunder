import TranslationDeleteDialog from "./TranslationDeleteDialog.js";
import { useCallback, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { getDisplayNameForCode, toFlagEmoji, useGetLanguages } from "@thunderid/i18n";
import { useLogger } from "@thunderid/logger/react";
import { Chip, IconButton, ListingTable, Tooltip, useTheme } from "@wso2/oxygen-ui";
import { Pencil, Trash2 } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ResourceAvatar } from "@thunderid/components";
import { useDataGridLocaleText } from "@thunderid/hooks";

//#region src/components/TranslationsList.tsx
function TranslationsList() {
	const theme = useTheme();
	const { t } = useTranslation("translations");
	const navigate = useNavigate();
	const logger = useLogger("TranslationsList");
	const dataGridLocaleText = useDataGridLocaleText();
	const [selectedLanguage, setSelectedLanguage] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const { data, isLoading } = useGetLanguages();
	const handleEditClick = useCallback((language) => {
		(async () => {
			await navigate(`/translations/${language}`);
		})().catch((_error) => {
			logger.error("Failed to navigate to translation editor", {
				error: _error,
				language
			});
		});
	}, [logger, navigate]);
	const handleDeleteClick = useCallback((language) => {
		setSelectedLanguage(language);
		setDeleteDialogOpen(true);
	}, []);
	const handleDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
		setSelectedLanguage(null);
	};
	const rows = useMemo(() => (data?.languages ?? []).map((code) => ({
		id: code,
		code
	})), [data?.languages]);
	const columns = useMemo(() => [{
		field: "code",
		headerName: t("listing.columns.language"),
		flex: 1,
		minWidth: 240,
		renderCell: (params) => /* @__PURE__ */ jsx(ListingTable.CellIcon, {
			sx: { width: "100%" },
			icon: /* @__PURE__ */ jsx(ResourceAvatar, {
				value: toFlagEmoji(params.row.code),
				size: 30,
				fallback: "emoji:🌍"
			}),
			primary: getDisplayNameForCode(params.row.code),
			secondary: /* @__PURE__ */ jsx(Chip, {
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
		renderCell: (params) => /* @__PURE__ */ jsxs(ListingTable.RowActions, { children: [/* @__PURE__ */ jsx(Tooltip, {
			title: t("common:actions.edit"),
			children: /* @__PURE__ */ jsx(IconButton, {
				size: "small",
				onClick: (e) => {
					e.stopPropagation();
					handleEditClick(params.row.code);
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
					handleDeleteClick(params.row.code);
				},
				children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
			})
		})] })
	}], [
		handleDeleteClick,
		handleEditClick,
		t,
		theme
	]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ListingTable.Provider, {
		variant: "data-grid-card",
		loading: isLoading,
		children: /* @__PURE__ */ jsx(ListingTable.Container, {
			disablePaper: true,
			children: /* @__PURE__ */ jsx(ListingTable.DataGrid, {
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
	}), /* @__PURE__ */ jsx(TranslationDeleteDialog, {
		open: deleteDialogOpen,
		language: selectedLanguage,
		onClose: handleDeleteDialogClose
	})] });
}

//#endregion
export { TranslationsList as default };