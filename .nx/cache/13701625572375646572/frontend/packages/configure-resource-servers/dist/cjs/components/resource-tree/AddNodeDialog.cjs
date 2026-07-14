const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useCreateResource = require('../../api/useCreateResource.cjs');
const require_useCreateAction = require('../../api/useCreateAction.cjs');
const require_deriveHandle = require('../../utils/deriveHandle.cjs');
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);

//#region src/components/resource-tree/AddNodeDialog.tsx
function AddNodeDialog({ open, mode, resourceServerId, parentResourceId = void 0, parentPermission, delimiter, onClose, onSuccess }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { showToast } = (0, __thunderid_contexts.useToast)();
	const logger = (0, __thunderid_logger_react.useLogger)("AddNodeDialog");
	const [name, setName] = (0, react.useState)("");
	const [handle, setHandle] = (0, react.useState)("");
	const [description, setDescription] = (0, react.useState)("");
	const [handleEdited, setHandleEdited] = (0, react.useState)(false);
	const isAction = mode === "server-action" || mode === "resource-action";
	const resourceId = mode === "resource-action" ? parentResourceId : void 0;
	const createResource = require_useCreateResource.default(resourceServerId);
	const createAction = require_useCreateAction.default(resourceServerId, resourceId);
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Dialog, {
		open,
		onClose: handleClose,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogTitle, { children: titleMap[mode] }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogContent, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					flexDirection: "column",
					gap: 2,
					pt: 1
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
						fullWidth: true,
						required: true,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("resourceServers:tree.fields.name", "Name") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
							value: name,
							onChange: (e) => {
								const newName = e.target.value;
								setName(newName);
								if (!handleEdited) setHandle(require_deriveHandle.deriveHandle(newName, delimiter));
							},
							fullWidth: true,
							size: "small",
							autoFocus: true
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
						fullWidth: true,
						required: true,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("resourceServers:tree.fields.handle", "Handle") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
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
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
						fullWidth: true,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("resourceServers:tree.fields.description", "Description") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
							value: description,
							onChange: (e) => setDescription(e.target.value),
							fullWidth: true,
							size: "small",
							multiline: true,
							rows: 2
						})]
					}),
					handle.trim() && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
						sx: {
							bgcolor: "action.hover",
							borderRadius: 1,
							px: 1.5,
							py: 1
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
							variant: "caption",
							color: "text.secondary",
							children: t("resourceServers:tree.fields.permissionPreview", "Permission string")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
							sx: { mt: .5 },
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
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
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				variant: "outlined",
				onClick: handleClose,
				disabled: isPending,
				children: t("common:cancel", "Cancel")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				variant: "contained",
				onClick: handleSubmit,
				disabled: isPending || !name.trim() || !handle.trim() || handleContainsDelimiter,
				children: isPending ? t("common:adding", "Adding…") : t("common:add", "Add")
			})] })
		]
	});
}

//#endregion
exports.default = AddNodeDialog;