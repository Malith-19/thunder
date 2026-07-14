const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useUpdateResourceServer = require('../../api/useUpdateResourceServer.cjs');
const require_useUpdateResource = require('../../api/useUpdateResource.cjs');
const require_useUpdateAction = require('../../api/useUpdateAction.cjs');
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);

//#region src/components/resource-tree/ResourceDetailPanel.tsx
function deriveInitialValues(node) {
	if (!node) return {
		name: "",
		description: "",
		identifier: ""
	};
	if (node.type === "server") {
		const rs = node.data;
		return {
			name: rs.name,
			description: rs.description ?? "",
			identifier: rs.identifier ?? ""
		};
	}
	const item = node.data;
	return {
		name: item.name,
		description: item.description ?? "",
		identifier: ""
	};
}
function DetailForm({ selectedNode, resourceServer, onRefresh }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { showToast } = (0, __thunderid_contexts.useToast)();
	const logger = (0, __thunderid_logger_react.useLogger)("ResourceDetailPanel");
	const initial = deriveInitialValues(selectedNode);
	const [name, setName] = (0, react.useState)(initial.name);
	const [description, setDescription] = (0, react.useState)(initial.description);
	const [identifier, setIdentifier] = (0, react.useState)(initial.identifier);
	const [dirty, setDirty] = (0, react.useState)(false);
	const updateRs = require_useUpdateResourceServer.default();
	const updateResource = require_useUpdateResource.default(resourceServer.id);
	const updateServerAction = require_useUpdateAction.default(resourceServer.id);
	const updateResourceAction = require_useUpdateAction.default(resourceServer.id, selectedNode.type === "resource-action" ? selectedNode.parentResourceId ?? void 0 : void 0);
	const resetForm = (0, react.useCallback)(() => {
		const vals = deriveInitialValues(selectedNode);
		setName(vals.name);
		setDescription(vals.description);
		setIdentifier(vals.identifier);
		setDirty(false);
	}, [selectedNode]);
	const handleSave = () => {
		if (selectedNode.type === "server") updateRs.mutate({
			id: resourceServer.id,
			data: {
				name,
				description: description || null,
				identifier: identifier || null
			}
		}, {
			onSuccess: () => {
				showToast(t("resourceServers:detail.saved", "Changes saved."), "success");
				setDirty(false);
				onRefresh();
			},
			onError: (err) => {
				logger.error("Failed to update resource server", { error: err });
				showToast(t("resourceServers:detail.saveError", "Failed to save."), "error");
			}
		});
		else if (selectedNode.type === "resource") updateResource.mutate({
			resourceId: selectedNode.id,
			data: {
				name,
				description: description || null
			}
		}, {
			onSuccess: () => {
				showToast(t("resourceServers:detail.saved", "Changes saved."), "success");
				setDirty(false);
				onRefresh();
			},
			onError: (err) => {
				logger.error("Failed to update resource", { error: err });
				showToast(t("resourceServers:detail.saveError", "Failed to save."), "error");
			}
		});
		else (selectedNode.type === "resource-action" ? updateResourceAction : updateServerAction).mutate({
			actionId: selectedNode.id,
			data: {
				name,
				description: description || null
			}
		}, {
			onSuccess: () => {
				showToast(t("resourceServers:detail.saved", "Changes saved."), "success");
				setDirty(false);
				onRefresh();
			},
			onError: (err) => {
				logger.error("Failed to update action", { error: err });
				showToast(t("resourceServers:detail.saveError", "Failed to save."), "error");
			}
		});
	};
	const isReadOnly = selectedNode.type === "server" && selectedNode.data.isReadOnly;
	const isPending = updateRs.isPending || updateResource.isPending || updateServerAction.isPending || updateResourceAction.isPending;
	const permission = selectedNode.type === "server" ? selectedNode.data.handle : selectedNode.data.permission;
	const [copiedPermission, setCopiedPermission] = (0, react.useState)(false);
	const handleCopyPermission = () => {
		navigator.clipboard.writeText(permission).then(() => {
			setCopiedPermission(true);
			setTimeout(() => setCopiedPermission(false), 1500);
		}).catch((err) => logger.error("Failed to copy permission", { error: err }));
	};
	const nodeTypeLabel = {
		server: t("resourceServers:detail.types.resourceServer", "Resource Server"),
		resource: t("resourceServers:detail.types.resource", "Resource"),
		"server-action": t("resourceServers:detail.types.action", "Action"),
		"resource-action": t("resourceServers:detail.types.action", "Action")
	};
	const handleField = (setter) => (e) => {
		setter(e.target.value);
		setDirty(true);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: 2,
			p: 2,
			height: "100%",
			overflowY: "auto"
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "caption",
				color: "text.secondary",
				sx: {
					textTransform: "uppercase",
					letterSpacing: .5
				},
				children: nodeTypeLabel[selectedNode.type]
			}),
			isReadOnly && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				severity: "info",
				children: t("resourceServers:detail.readOnlyWarning", "This is a system resource server and cannot be modified.")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				spacing: 2,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
					fullWidth: true,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("resourceServers:detail.fields.name", "Name") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
						value: name,
						onChange: handleField(setName),
						fullWidth: true,
						size: "small",
						disabled: isReadOnly
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
					fullWidth: true,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("resourceServers:detail.fields.description", "Description") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
						value: description,
						onChange: handleField(setDescription),
						fullWidth: true,
						size: "small",
						multiline: true,
						rows: 3,
						disabled: isReadOnly
					})]
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Divider, {}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						color: "text.secondary",
						children: t("resourceServers:detail.permission", "Permission")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
						label: permission,
						size: "small",
						variant: "outlined",
						sx: {
							fontFamily: "monospace",
							fontSize: "0.78rem"
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: copiedPermission ? t("common:copied", "Copied!") : t("common:copy", "Copy permission"),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							size: "small",
							sx: { p: .25 },
							onClick: handleCopyPermission,
							children: copiedPermission ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 14 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, { size: 14 })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "caption",
				color: "text.secondary",
				children: t("resourceServers:detail.fields.handle", "Handle (immutable)")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
				label: selectedNode.data.handle,
				size: "small",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.75rem",
					mt: .5
				}
			}) })] }),
			selectedNode.type === "server" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "caption",
				color: "text.secondary",
				children: t("resourceServers:detail.fields.delimiter", "Delimiter (immutable)")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
				label: selectedNode.data.delimiter,
				size: "small",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.75rem",
					mt: .5
				}
			}) })] }),
			selectedNode.type === "server" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
				fullWidth: true,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormLabel, { children: t("resourceServers:detail.fields.identifier", "Identifier") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
					value: identifier,
					onChange: handleField(setIdentifier),
					fullWidth: true,
					size: "small",
					helperText: t("resourceServers:detail.fields.identifierHint", "Used as audience parameter in OAuth2 flows."),
					disabled: isReadOnly
				})]
			}),
			!isReadOnly && dirty && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					mt: "auto",
					pt: 2,
					display: "flex",
					gap: 1,
					justifyContent: "flex-end"
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					variant: "outlined",
					size: "small",
					onClick: resetForm,
					disabled: isPending,
					children: t("common:discard", "Discard")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
					variant: "contained",
					size: "small",
					onClick: handleSave,
					disabled: isPending,
					children: isPending ? t("common:saving", "Saving…") : t("common:save", "Save")
				})]
			})
		]
	});
}
function ResourceDetailPanel({ selectedNode, resourceServer, onRefresh }) {
	const { t } = (0, react_i18next.useTranslation)();
	if (!selectedNode) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		sx: {
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "text.disabled"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
			variant: "body2",
			children: t("resourceServers:detail.selectNode", "Select a node from the tree to view its details.")
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(DetailForm, {
		selectedNode,
		resourceServer,
		onRefresh
	}, selectedNode.id);
}

//#endregion
exports.default = ResourceDetailPanel;