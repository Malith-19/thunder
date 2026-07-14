import useCreateResource from "../../api/useCreateResource.js";
import useCreateAction from "../../api/useCreateAction.js";
import { deriveHandle } from "../../utils/deriveHandle.js";
import { useToast } from "@thunderid/contexts";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, TextField, Typography } from "@wso2/oxygen-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";

//#region src/components/resource-tree/AddNodeDialog.tsx
function AddNodeDialog({ open, mode, resourceServerId, parentResourceId = void 0, parentPermission, delimiter, onClose, onSuccess }) {
	const { t } = useTranslation();
	const { showToast } = useToast();
	const logger = useLogger("AddNodeDialog");
	const [name, setName] = useState("");
	const [handle, setHandle] = useState("");
	const [description, setDescription] = useState("");
	const [handleEdited, setHandleEdited] = useState(false);
	const isAction = mode === "server-action" || mode === "resource-action";
	const resourceId = mode === "resource-action" ? parentResourceId : void 0;
	const createResource = useCreateResource(resourceServerId);
	const createAction = useCreateAction(resourceServerId, resourceId);
	const derivedPermission = handle.trim() ? `${parentPermission}${delimiter}${handle.trim()}` : `${parentPermission}${delimiter}…`;
	const handleClose = () => {
		setName("");
		setHandle("");
		setDescription("");
		setHandleEdited(false);
		onClose();
	};
	const handleSubmit = () => {
		const trimmedName = name.trim();
		const trimmedHandle = handle.trim();
		if (!trimmedName || !trimmedHandle) return;
		const data = {
			name: trimmedName,
			handle: trimmedHandle,
			description: description.trim() || void 0
		};
		if (isAction) createAction.mutate(data, {
			onSuccess: () => {
				showToast(t("resourceServers:tree.addAction.success", "Action added."), "success");
				handleClose();
				onSuccess();
			},
			onError: (err) => {
				logger.error("Failed to create action", { error: err });
				showToast(t("resourceServers:tree.addAction.error", "Failed to add action."), "error");
			}
		});
		else createResource.mutate({
			...data,
			parent: mode === "sub-resource" ? parentResourceId : void 0
		}, {
			onSuccess: () => {
				showToast(t("resourceServers:tree.addResource.success", "Resource added."), "success");
				handleClose();
				onSuccess();
			},
			onError: (err) => {
				logger.error("Failed to create resource", { error: err });
				showToast(t("resourceServers:tree.addResource.error", "Failed to add resource."), "error");
			}
		});
	};
	const titleMap = {
		resource: t("resourceServers:tree.addResource.title", "Add Resource"),
		"sub-resource": t("resourceServers:tree.addSubResource.title", "Add Sub-resource"),
		"server-action": t("resourceServers:tree.addAction.title", "Add Action"),
		"resource-action": t("resourceServers:tree.addAction.title", "Add Action")
	};
	const isPending = createResource.isPending || createAction.isPending;
	const handleContainsDelimiter = handle.includes(delimiter);
	return /* @__PURE__ */ jsxs(Dialog, {
		open,
		onClose: handleClose,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ jsx(DialogTitle, { children: titleMap[mode] }),
			/* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(Box, {
				sx: {
					display: "flex",
					flexDirection: "column",
					gap: 2,
					pt: 1
				},
				children: [
					/* @__PURE__ */ jsxs(FormControl, {
						fullWidth: true,
						required: true,
						children: [/* @__PURE__ */ jsx(FormLabel, { children: t("resourceServers:tree.fields.name", "Name") }), /* @__PURE__ */ jsx(TextField, {
							value: name,
							onChange: (e) => {
								const newName = e.target.value;
								setName(newName);
								if (!handleEdited) setHandle(deriveHandle(newName, delimiter));
							},
							fullWidth: true,
							size: "small",
							autoFocus: true
						})]
					}),
					/* @__PURE__ */ jsxs(FormControl, {
						fullWidth: true,
						required: true,
						children: [/* @__PURE__ */ jsx(FormLabel, { children: t("resourceServers:tree.fields.handle", "Handle") }), /* @__PURE__ */ jsx(TextField, {
							value: handle,
							onChange: (e) => {
								setHandleEdited(true);
								setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9._\-:/]/g, ""));
							},
							fullWidth: true,
							size: "small",
							error: handleContainsDelimiter,
							helperText: handleContainsDelimiter ? t("resourceServers:tree.fields.handleDelimiterError", `Handle cannot contain the delimiter character "${delimiter}".`) : t("resourceServers:tree.fields.handleHint", "Lowercase, alphanumeric and . _ - : / — cannot be changed after creation.")
						})]
					}),
					/* @__PURE__ */ jsxs(FormControl, {
						fullWidth: true,
						children: [/* @__PURE__ */ jsx(FormLabel, { children: t("resourceServers:tree.fields.description", "Description") }), /* @__PURE__ */ jsx(TextField, {
							value: description,
							onChange: (e) => setDescription(e.target.value),
							fullWidth: true,
							size: "small",
							multiline: true,
							rows: 2
						})]
					}),
					handle.trim() && /* @__PURE__ */ jsxs(Box, {
						sx: {
							bgcolor: "action.hover",
							borderRadius: 1,
							px: 1.5,
							py: 1
						},
						children: [/* @__PURE__ */ jsx(Typography, {
							variant: "caption",
							color: "text.secondary",
							children: t("resourceServers:tree.fields.permissionPreview", "Permission string")
						}), /* @__PURE__ */ jsx(Box, {
							sx: { mt: .5 },
							children: /* @__PURE__ */ jsx(Chip, {
								label: derivedPermission,
								size: "small",
								variant: "outlined",
								sx: {
									fontFamily: "monospace",
									fontSize: "0.8rem"
								}
							})
						})]
					})
				]
			}) }),
			/* @__PURE__ */ jsxs(DialogActions, { children: [/* @__PURE__ */ jsx(Button, {
				variant: "outlined",
				onClick: handleClose,
				disabled: isPending,
				children: t("common:cancel", "Cancel")
			}), /* @__PURE__ */ jsx(Button, {
				variant: "contained",
				onClick: handleSubmit,
				disabled: isPending || !name.trim() || !handle.trim() || handleContainsDelimiter,
				children: isPending ? t("common:adding", "Adding…") : t("common:add", "Add")
			})] })
		]
	});
}

//#endregion
export { AddNodeDialog as default };