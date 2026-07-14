const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useDeleteUser = require('../api/useDeleteUser.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/UserDeleteDialog.tsx
/**
* Dialog component for confirming user deletion.
*/
function UserDeleteDialog({ open, userId, onClose, onSuccess = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const deleteUser = require_useDeleteUser.default();
	const [error, setError] = (0, react.useState)(null);
	const handleCancel = () => {
		if (deleteUser.isPending) return;
		setError(null);
		onClose();
	};
	const handleConfirm = () => {
		if (!userId) return;
		setError(null);
		deleteUser.mutate(userId, {
			onSuccess: () => {
				setError(null);
				onClose();
				onSuccess?.();
			},
			onError: (err) => {
				setError(err.message ?? t("users:delete.error", "Failed to delete user"));
			}
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Dialog, {
		open,
		onClose: handleCancel,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogTitle, { children: t("users:delete.title", "Delete User") }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogContent, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogContentText, {
					sx: { mb: 2 },
					children: t("users:delete.message", "Are you sure you want to delete this user? This action cannot be undone.")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
					severity: "warning",
					sx: { mb: 2 },
					children: t("users:delete.disclaimer", "All associated data will be permanently removed.")
				}),
				error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
					severity: "error",
					sx: { mt: 2 },
					children: error
				})
			] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				onClick: handleCancel,
				disabled: deleteUser.isPending,
				children: t("common:actions.cancel")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				onClick: handleConfirm,
				color: "error",
				variant: "contained",
				disabled: deleteUser.isPending || !userId,
				children: deleteUser.isPending ? t("common:status.deleting", "Deleting...") : t("common:actions.delete", "Delete")
			})] })
		]
	});
}

//#endregion
exports.default = UserDeleteDialog;