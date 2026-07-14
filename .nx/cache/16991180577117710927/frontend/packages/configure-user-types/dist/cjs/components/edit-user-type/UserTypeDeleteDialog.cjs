const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useDeleteUserType = require('../../api/useDeleteUserType.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/edit-user-type/UserTypeDeleteDialog.tsx
/**
* Dialog component for confirming user type deletion.
*/
function UserTypeDeleteDialog({ open, userTypeId, onClose, onSuccess = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const deleteUserType = require_useDeleteUserType.default();
	const [error, setError] = (0, react.useState)(null);
	const handleCancel = () => {
		if (deleteUserType.isPending) return;
		setError(null);
		onClose();
	};
	const handleConfirm = () => {
		if (!userTypeId) return;
		setError(null);
		deleteUserType.mutate(userTypeId, {
			onSuccess: () => {
				setError(null);
				onClose();
				onSuccess?.();
			},
			onError: (err) => {
				setError(err.message ?? t("userTypes:delete.error", "Failed to delete user type"));
			}
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Dialog, {
		open,
		onClose: handleCancel,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogTitle, { children: t("userTypes:delete.title", "Delete User Type") }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogContent, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogContentText, {
					sx: { mb: 2 },
					children: t("userTypes:delete.message", "Are you sure you want to delete this user type? This action cannot be undone and may affect existing users of this type.")
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
					severity: "warning",
					sx: { mb: 2 },
					children: t("userTypes:delete.disclaimer", "All associated schema definitions will be permanently removed.")
				}),
				error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
					severity: "error",
					sx: { mt: 2 },
					children: error
				})
			] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				onClick: handleCancel,
				disabled: deleteUserType.isPending,
				children: t("common:actions.cancel")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				onClick: handleConfirm,
				color: "error",
				variant: "contained",
				disabled: deleteUserType.isPending || !userTypeId,
				children: deleteUserType.isPending ? t("common:status.deleting", "Deleting...") : t("common:actions.delete")
			})] })
		]
	});
}

//#endregion
exports.default = UserTypeDeleteDialog;