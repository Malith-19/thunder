const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useDeleteResourceServer = require('../api/useDeleteResourceServer.cjs');
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);

//#region src/components/ResourceServerDeleteDialog.tsx
function ResourceServerDeleteDialog({ open, resourceServer, onClose, onSuccess }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { showToast } = (0, __thunderid_contexts.useToast)();
	const logger = (0, __thunderid_logger_react.useLogger)("ResourceServerDeleteDialog");
	const deleteResourceServer = require_useDeleteResourceServer.default();
	const handleDelete = () => {
		if (!resourceServer) return;
		deleteResourceServer.mutate(resourceServer.id, {
			onSuccess: () => {
				showToast(t("resourceServers:delete.success", "Resource server deleted successfully."), "success");
				onSuccess();
			},
			onError: (err) => {
				logger.error("Failed to delete resource server", { error: err });
				showToast(t("resourceServers:delete.error", "Failed to delete resource server. Make sure it has no resources or actions."), "error");
			}
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Dialog, {
		open,
		onClose,
		maxWidth: "xs",
		fullWidth: true,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogTitle, { children: t("resourceServers:delete.title", "Delete resource server") }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogContent, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				severity: "warning",
				sx: { mb: 2 },
				children: t("resourceServers:delete.warning", "This action cannot be undone.")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				children: [
					t("resourceServers:delete.confirm", "Are you sure you want to delete"),
					" ",
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: resourceServer?.name }),
					"?"
				]
			})] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				variant: "outlined",
				onClick: onClose,
				disabled: deleteResourceServer.isPending,
				children: t("common:cancel", "Cancel")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				variant: "contained",
				color: "error",
				onClick: handleDelete,
				disabled: deleteResourceServer.isPending,
				children: deleteResourceServer.isPending ? t("common:deleting", "Deleting…") : t("common:delete", "Delete")
			})] })
		]
	});
}

//#endregion
exports.default = ResourceServerDeleteDialog;