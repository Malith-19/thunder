import useDeleteUser from "../api/useDeleteUser.js";
import { useTranslation } from "react-i18next";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@wso2/oxygen-ui";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/UserDeleteDialog.tsx
/**
* Dialog component for confirming user deletion.
*/
function UserDeleteDialog({ open, userId, onClose, onSuccess = void 0 }) {
	const { t } = useTranslation();
	const deleteUser = useDeleteUser();
	const [error, setError] = useState(null);
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
	return /* @__PURE__ */ jsxs(Dialog, {
		open,
		onClose: handleCancel,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ jsx(DialogTitle, { children: t("users:delete.title", "Delete User") }),
			/* @__PURE__ */ jsxs(DialogContent, { children: [
				/* @__PURE__ */ jsx(DialogContentText, {
					sx: { mb: 2 },
					children: t("users:delete.message", "Are you sure you want to delete this user? This action cannot be undone.")
				}),
				/* @__PURE__ */ jsx(Alert, {
					severity: "warning",
					sx: { mb: 2 },
					children: t("users:delete.disclaimer", "All associated data will be permanently removed.")
				}),
				error && /* @__PURE__ */ jsx(Alert, {
					severity: "error",
					sx: { mt: 2 },
					children: error
				})
			] }),
			/* @__PURE__ */ jsxs(DialogActions, { children: [/* @__PURE__ */ jsx(Button, {
				onClick: handleCancel,
				disabled: deleteUser.isPending,
				children: t("common:actions.cancel")
			}), /* @__PURE__ */ jsx(Button, {
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
export { UserDeleteDialog as default };