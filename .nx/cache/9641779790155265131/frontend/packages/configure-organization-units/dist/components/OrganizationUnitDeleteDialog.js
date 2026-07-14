import useDeleteOrganizationUnit from "../api/useDeleteOrganizationUnit.js";
import { useTranslation } from "react-i18next";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@wso2/oxygen-ui";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/OrganizationUnitDeleteDialog.tsx
/**
* Extracts a user-friendly error message from the API error response.
*/
function getErrorMessage(err, fallback) {
	const { response } = err;
	const description = response?.data?.description ?? null;
	const message = err.message?.trim() ? err.message : null;
	return description ?? message ?? fallback;
}
/**
* Dialog component for confirming organization unit deletion
*/
function OrganizationUnitDeleteDialog({ open, organizationUnitId, onClose, onSuccess = void 0, onError = void 0 }) {
	const { t } = useTranslation();
	const deleteOrganizationUnit = useDeleteOrganizationUnit();
	const handleCancel = () => {
		if (deleteOrganizationUnit.isPending) return;
		onClose();
	};
	const handleConfirm = () => {
		if (!organizationUnitId) return;
		deleteOrganizationUnit.mutate(organizationUnitId, {
			onSuccess: () => {
				onClose();
				onSuccess?.();
			},
			onError: (err) => {
				const message = getErrorMessage(err, t("organizationUnits:delete.dialog.error"));
				onClose();
				onError?.(message);
			}
		});
	};
	return /* @__PURE__ */ jsxs(Dialog, {
		open,
		onClose: handleCancel,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ jsx(DialogTitle, { children: t("organizationUnits:delete.dialog.title") }),
			/* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsx(DialogContentText, {
				sx: { mb: 2 },
				children: t("organizationUnits:delete.dialog.message")
			}), /* @__PURE__ */ jsx(Alert, {
				severity: "warning",
				sx: { mb: 2 },
				children: t("organizationUnits:delete.dialog.disclaimer")
			})] }),
			/* @__PURE__ */ jsxs(DialogActions, { children: [/* @__PURE__ */ jsx(Button, {
				onClick: handleCancel,
				disabled: deleteOrganizationUnit.isPending,
				children: t("common:actions.cancel")
			}), /* @__PURE__ */ jsx(Button, {
				onClick: handleConfirm,
				color: "error",
				variant: "contained",
				disabled: deleteOrganizationUnit.isPending,
				children: deleteOrganizationUnit.isPending ? t("common:status.deleting") : t("common:actions.delete")
			})] })
		]
	});
}

//#endregion
export { OrganizationUnitDeleteDialog as default };