const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useDeleteOrganizationUnit = require('../api/useDeleteOrganizationUnit.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

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
	const { t } = (0, react_i18next.useTranslation)();
	const deleteOrganizationUnit = require_useDeleteOrganizationUnit.default();
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Dialog, {
		open,
		onClose: handleCancel,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogTitle, { children: t("organizationUnits:delete.dialog.title") }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogContentText, {
				sx: { mb: 2 },
				children: t("organizationUnits:delete.dialog.message")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				severity: "warning",
				sx: { mb: 2 },
				children: t("organizationUnits:delete.dialog.disclaimer")
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				onClick: handleCancel,
				disabled: deleteOrganizationUnit.isPending,
				children: t("common:actions.cancel")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
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
exports.default = OrganizationUnitDeleteDialog;