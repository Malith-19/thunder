import useUpdateResourceServer from "../../api/useUpdateResourceServer.js";
import useUpdateResource from "../../api/useUpdateResource.js";
import useUpdateAction from "../../api/useUpdateAction.js";
import { useToast } from "@thunderid/contexts";
import { Alert, Box, Button, Chip, Divider, FormControl, FormLabel, IconButton, Stack, TextField, Tooltip, Typography } from "@wso2/oxygen-ui";
import { Check, Copy } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";

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
	const { t } = useTranslation();
	const { showToast } = useToast();
	const logger = useLogger("ResourceDetailPanel");
	const initial = deriveInitialValues(selectedNode);
	const [name, setName] = useState(initial.name);
	const [description, setDescription] = useState(initial.description);
	const [identifier, setIdentifier] = useState(initial.identifier);
	const [dirty, setDirty] = useState(false);
	const updateRs = useUpdateResourceServer();
	const updateResource = useUpdateResource(resourceServer.id);
	const updateServerAction = useUpdateAction(resourceServer.id);
	const updateResourceAction = useUpdateAction(resourceServer.id, selectedNode.type === "resource-action" ? selectedNode.parentResourceId ?? void 0 : void 0);
	const resetForm = useCallback(() => {
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
	const [copiedPermission, setCopiedPermission] = useState(false);
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
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: 2,
			p: 2,
			height: "100%",
			overflowY: "auto"
		},
		children: [
			/* @__PURE__ */ jsx(Typography, {
				variant: "caption",
				color: "text.secondary",
				sx: {
					textTransform: "uppercase",
					letterSpacing: .5
				},
				children: nodeTypeLabel[selectedNode.type]
			}),
			isReadOnly && /* @__PURE__ */ jsx(Alert, {
				severity: "info",
				children: t("resourceServers:detail.readOnlyWarning", "This is a system resource server and cannot be modified.")
			}),
			/* @__PURE__ */ jsxs(Stack, {
				spacing: 2,
				children: [/* @__PURE__ */ jsxs(FormControl, {
					fullWidth: true,
					children: [/* @__PURE__ */ jsx(FormLabel, { children: t("resourceServers:detail.fields.name", "Name") }), /* @__PURE__ */ jsx(TextField, {
						value: name,
						onChange: handleField(setName),
						fullWidth: true,
						size: "small",
						disabled: isReadOnly
					})]
				}), /* @__PURE__ */ jsxs(FormControl, {
					fullWidth: true,
					children: [/* @__PURE__ */ jsx(FormLabel, { children: t("resourceServers:detail.fields.description", "Description") }), /* @__PURE__ */ jsx(TextField, {
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
			/* @__PURE__ */ jsx(Divider, {}),
			/* @__PURE__ */ jsxs(Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1
				},
				children: [
					/* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						color: "text.secondary",
						children: t("resourceServers:detail.permission", "Permission")
					}),
					/* @__PURE__ */ jsx(Chip, {
						label: permission,
						size: "small",
						variant: "outlined",
						sx: {
							fontFamily: "monospace",
							fontSize: "0.78rem"
						}
					}),
					/* @__PURE__ */ jsx(Tooltip, {
						title: copiedPermission ? t("common:copied", "Copied!") : t("common:copy", "Copy permission"),
						children: /* @__PURE__ */ jsx(IconButton, {
							size: "small",
							sx: { p: .25 },
							onClick: handleCopyPermission,
							children: copiedPermission ? /* @__PURE__ */ jsx(Check, { size: 14 }) : /* @__PURE__ */ jsx(Copy, { size: 14 })
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "caption",
				color: "text.secondary",
				children: t("resourceServers:detail.fields.handle", "Handle (immutable)")
			}), /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Chip, {
				label: selectedNode.data.handle,
				size: "small",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.75rem",
					mt: .5
				}
			}) })] }),
			selectedNode.type === "server" && /* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
				variant: "caption",
				color: "text.secondary",
				children: t("resourceServers:detail.fields.delimiter", "Delimiter (immutable)")
			}), /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(Chip, {
				label: selectedNode.data.delimiter,
				size: "small",
				sx: {
					fontFamily: "monospace",
					fontSize: "0.75rem",
					mt: .5
				}
			}) })] }),
			selectedNode.type === "server" && /* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				children: [/* @__PURE__ */ jsx(FormLabel, { children: t("resourceServers:detail.fields.identifier", "Identifier") }), /* @__PURE__ */ jsx(TextField, {
					value: identifier,
					onChange: handleField(setIdentifier),
					fullWidth: true,
					size: "small",
					helperText: t("resourceServers:detail.fields.identifierHint", "Used as audience parameter in OAuth2 flows."),
					disabled: isReadOnly
				})]
			}),
			!isReadOnly && dirty && /* @__PURE__ */ jsxs(Box, {
				sx: {
					mt: "auto",
					pt: 2,
					display: "flex",
					gap: 1,
					justifyContent: "flex-end"
				},
				children: [/* @__PURE__ */ jsx(Button, {
					variant: "outlined",
					size: "small",
					onClick: resetForm,
					disabled: isPending,
					children: t("common:discard", "Discard")
				}), /* @__PURE__ */ jsx(Button, {
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
	const { t } = useTranslation();
	if (!selectedNode) return /* @__PURE__ */ jsx(Box, {
		sx: {
			height: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "text.disabled"
		},
		children: /* @__PURE__ */ jsx(Typography, {
			variant: "body2",
			children: t("resourceServers:detail.selectNode", "Select a node from the tree to view its details.")
		})
	});
	return /* @__PURE__ */ jsx(DetailForm, {
		selectedNode,
		resourceServer,
		onRefresh
	}, selectedNode.id);
}

//#endregion
export { ResourceDetailPanel as default };