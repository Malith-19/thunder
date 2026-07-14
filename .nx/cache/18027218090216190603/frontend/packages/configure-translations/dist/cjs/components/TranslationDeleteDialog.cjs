const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_i18n = require("@thunderid/i18n");
__thunderid_i18n = require_rolldown_runtime.__toESM(__thunderid_i18n);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

//#region src/components/TranslationDeleteDialog.tsx
/**
* Dialog component for confirming deletion of all custom translations for a language.
*/
function TranslationDeleteDialog({ open, language, onClose, onSuccess = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)("translations");
	const deleteTranslations = (0, __thunderid_i18n.useDeleteTranslations)();
	const [error, setError] = (0, react.useState)(null);
	const displayName = language ? (0, __thunderid_i18n.getDisplayNameForCode)(language) : "";
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Dialog, {
		open,
		onClose: handleCancel,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogTitle, { children: t("delete.title") }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogContent, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogContentText, {
					sx: { mb: 2 },
					children: t("delete.message", { language: displayName ?? language })
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
					severity: "warning",
					sx: { mb: 2 },
					children: t("delete.disclaimer")
				}),
				error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
					severity: "error",
					sx: { mt: 2 },
					children: error
				})
			] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				onClick: handleCancel,
				disabled: deleteTranslations.isPending,
				children: t("common:actions.cancel")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
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
exports.default = TranslationDeleteDialog;