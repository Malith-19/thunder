import useDeleteUserType from "../../api/useDeleteUserType.js";
import { useTranslation } from "react-i18next";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@wso2/oxygen-ui";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/edit-user-type/UserTypeDeleteDialog.tsx
/**
* Dialog component for confirming user type deletion.
*/
function UserTypeDeleteDialog({ open, userTypeId, onClose, onSuccess = void 0 }) {
	const { t } = useTranslation();
	const deleteUserType = useDeleteUserType();
	const [error, setError] = useState(null);
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
	return /* @__PURE__ */ jsxs(Dialog, {
		open,
		onClose: handleCancel,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ jsx(DialogTitle, { children: t("userTypes:delete.title", "Delete User Type") }),
			/* @__PURE__ */ jsxs(DialogContent, { children: [
				/* @__PURE__ */ jsx(DialogContentText, {
					sx: { mb: 2 },
					children: t("userTypes:delete.message", "Are you sure you want to delete this user type? This action cannot be undone and may affect existing users of this type.")
				}),
				/* @__PURE__ */ jsx(Alert, {
					severity: "warning",
					sx: { mb: 2 },
					children: t("userTypes:delete.disclaimer", "All associated schema definitions will be permanently removed.")
				}),
				error && /* @__PURE__ */ jsx(Alert, {
					severity: "error",
					sx: { mt: 2 },
					children: error
				})
			] }),
			/* @__PURE__ */ jsxs(DialogActions, { children: [/* @__PURE__ */ jsx(Button, {
				onClick: handleCancel,
				disabled: deleteUserType.isPending,
				children: t("common:actions.cancel")
			}), /* @__PURE__ */ jsx(Button, {
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
export { UserTypeDeleteDialog as default };