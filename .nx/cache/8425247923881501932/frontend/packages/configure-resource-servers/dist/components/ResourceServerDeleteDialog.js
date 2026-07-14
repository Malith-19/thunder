import useDeleteResourceServer from "../api/useDeleteResourceServer.js";
import { useToast } from "@thunderid/contexts";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@wso2/oxygen-ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";

//#region src/components/ResourceServerDeleteDialog.tsx
function ResourceServerDeleteDialog({ open, resourceServer, onClose, onSuccess }) {
	const { t } = useTranslation();
	const { showToast } = useToast();
	const logger = useLogger("ResourceServerDeleteDialog");
	const deleteResourceServer = useDeleteResourceServer();
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
	return /* @__PURE__ */ jsxs(Dialog, {
		open,
		onClose,
		maxWidth: "xs",
		fullWidth: true,
		children: [
			/* @__PURE__ */ jsx(DialogTitle, { children: t("resourceServers:delete.title", "Delete resource server") }),
			/* @__PURE__ */ jsxs(DialogContent, { children: [/* @__PURE__ */ jsx(Alert, {
				severity: "warning",
				sx: { mb: 2 },
				children: t("resourceServers:delete.warning", "This action cannot be undone.")
			}), /* @__PURE__ */ jsxs(Typography, {
				variant: "body2",
				children: [
					t("resourceServers:delete.confirm", "Are you sure you want to delete"),
					" ",
					/* @__PURE__ */ jsx("strong", { children: resourceServer?.name }),
					"?"
				]
			})] }),
			/* @__PURE__ */ jsxs(DialogActions, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outlined",
				onClick: onClose,
				disabled: deleteResourceServer.isPending,
				children: t("common:cancel", "Cancel")
			}), /* @__PURE__ */ jsx(Button, {
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
export { ResourceServerDeleteDialog as default };