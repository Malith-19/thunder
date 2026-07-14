import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { getDisplayNameForCode, useDeleteTranslations } from "@thunderid/i18n";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@wso2/oxygen-ui";
import { useTranslation } from "react-i18next";

//#region src/components/TranslationDeleteDialog.tsx
/**
* Dialog component for confirming deletion of all custom translations for a language.
*/
function TranslationDeleteDialog({ open, language, onClose, onSuccess = void 0 }) {
	const { t } = useTranslation("translations");
	const deleteTranslations = useDeleteTranslations();
	const [error, setError] = useState(null);
	const displayName = language ? getDisplayNameForCode(language) : "";
	const handleCancel = () => {
		if (deleteTranslations.isPending) return;
		setError(null);
		onClose();
	};
	const handleConfirm = () => {
		if (!language) return;
		deleteTranslations.mutate(language, {
			onSuccess: () => {
				setError(null);
				onClose();
				onSuccess?.();
			},
			onError: () => {
				setError(t("delete.error"));
			}
		});
	};
	return /* @__PURE__ */ jsxs(Dialog, {
		open,
		onClose: handleCancel,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ jsx(DialogTitle, { children: t("delete.title") }),
			/* @__PURE__ */ jsxs(DialogContent, { children: [
				/* @__PURE__ */ jsx(DialogContentText, {
					sx: { mb: 2 },
					children: t("delete.message", { language: displayName ?? language })
				}),
				/* @__PURE__ */ jsx(Alert, {
					severity: "warning",
					sx: { mb: 2 },
					children: t("delete.disclaimer")
				}),
				error && /* @__PURE__ */ jsx(Alert, {
					severity: "error",
					sx: { mt: 2 },
					children: error
				})
			] }),
			/* @__PURE__ */ jsxs(DialogActions, { children: [/* @__PURE__ */ jsx(Button, {
				onClick: handleCancel,
				disabled: deleteTranslations.isPending,
				children: t("common:actions.cancel")
			}), /* @__PURE__ */ jsx(Button, {
				onClick: handleConfirm,
				color: "error",
				variant: "contained",
				disabled: deleteTranslations.isPending,
				children: deleteTranslations.isPending ? t("common:status.deleting") : t("common:actions.delete")
			})] })
		]
	});
}

//#endregion
export { TranslationDeleteDialog as default };