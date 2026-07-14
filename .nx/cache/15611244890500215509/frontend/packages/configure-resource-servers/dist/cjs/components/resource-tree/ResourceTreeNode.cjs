const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useGetResources = require('../../api/useGetResources.cjs');
const require_useDeleteResource = require('../../api/useDeleteResource.cjs');
const require_useGetResourceActions = require('../../api/useGetResourceActions.cjs');
const require_useDeleteAction = require('../../api/useDeleteAction.cjs');
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

//#region src/components/resource-tree/ResourceTreeNode.tsx
function ResourceNode({ resourceServerId, delimiter, node, depth, selectedNodeId, onSelect, onAddChild }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { showToast } = (0, __thunderid_contexts.useToast)();
	const logger = (0, __thunderid_logger_react.useLogger)("ResourceNode");
	const [expanded, setExpanded] = (0, react.useState)(false);
	const [hovered, setHovered] = (0, react.useState)(false);
	const [addMenuAnchor, setAddMenuAnchor] = (0, react.useState)(null);
	const deleteResource = require_useDeleteResource.default(resourceServerId);
	const { data: childResources } = require_useGetResources.default(resourceServerId, node.id);
	const { data: resourceActions } = require_useGetResourceActions.default(resourceServerId, node.id, expanded);
	const isSelected = selectedNodeId === node.id;
	const children = childResources?.resources ?? [];
	const actions = resourceActions?.actions ?? [];
	const [copiedPermission, setCopiedPermission] = (0, react.useState)(false);
	const handleCopyPermission = (e) => {
		e.stopPropagation();
		navigator.clipboard.writeText(node.permission).then(() => {
			setCopiedPermission(true);
			setTimeout(() => setCopiedPermission(false), 1500);
		}).catch((err) => logger.error("Failed to copy permission", { error: err }));
	};
	const handleDelete = (e) => {
		e.stopPropagation();
		deleteResource.mutate(node.id, {
			onSuccess: () => showToast(t("resourceServers:tree.deleteResource.success", "Resource deleted."), "success"),
			onError: (err) => {
				logger.error("Failed to delete resource", { error: err });
				showToast(t("resourceServers:tree.deleteResource.error", "Cannot delete — remove child resources and actions first."), "error");
			}
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			onMouseEnter: () => setHovered(true),
			onMouseLeave: () => setHovered(false),
			onClick: () => onSelect({
				type: "resource",
				id: node.id,
				data: node
			}),
			sx: {
				display: "flex",
				alignItems: "center",
				gap: .75,
				pl: depth * 2 + .5,
				pr: .5,
				py: .5,
				borderRadius: 1,
				cursor: "pointer",
				bgcolor: isSelected ? "action.selected" : hovered ? "action.hover" : "transparent",
				"&:hover": { bgcolor: isSelected ? "action.selected" : "action.hover" }
			},
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					size: "small",
					onClick: (e) => {
						e.stopPropagation();
						setExpanded((v) => !v);
					},
					sx: {
						p: .25,
						flexShrink: 0
					},
					children: expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronDown, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronRight, { size: 16 })
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Layers, {
					size: 16,
					style: {
						flexShrink: 0,
						opacity: .7
					}
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
					sx: {
						flex: 1,
						minWidth: 0,
						display: "flex",
						alignItems: "center",
						gap: .75
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						sx: {
							flexShrink: 1,
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							minWidth: 40
						},
						children: node.name
					}), (isSelected || hovered) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: copiedPermission ? t("common:copied", "Copied!") : t("resourceServers:tree.copyPermission", "Copy permission string"),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							size: "small",
							sx: {
								p: .15,
								flexShrink: 0
							},
							onClick: handleCopyPermission,
							children: copiedPermission ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 14 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, { size: 14 })
						})
					})]
				}),
				(isSelected || hovered || Boolean(addMenuAnchor)) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
					sx: {
						display: "flex",
						gap: .25,
						flexShrink: 0
					},
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: t("resourceServers:tree.add", "Add"),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							size: "small",
							sx: { p: .25 },
							"aria-label": t("resourceServers:tree.add", "Add"),
							onClick: (e) => {
								e.stopPropagation();
								setAddMenuAnchor(e.currentTarget);
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 14 })
						})
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: t("common:delete", "Delete"),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							size: "small",
							sx: {
								p: .25,
								color: "error.main"
							},
							onClick: handleDelete,
							disabled: deleteResource.isPending,
							children: deleteResource.isPending ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 12 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Trash2, { size: 14 })
						})
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Menu, {
			anchorEl: addMenuAnchor,
			open: Boolean(addMenuAnchor),
			onClose: () => setAddMenuAnchor(null),
			slotProps: { paper: { sx: { minWidth: 160 } } },
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.MenuItem, {
				onClick: () => {
					onAddChild("sub-resource", node.id, node.permission);
					setAddMenuAnchor(null);
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListItemIcon, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Layers, { size: 16 }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListItemText, { children: t("resourceServers:tree.addSubResource", "Add sub-resource") })]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.MenuItem, {
				onClick: () => {
					onAddChild("resource-action", node.id, node.permission);
					setAddMenuAnchor(null);
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListItemIcon, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Zap, { size: 16 }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListItemText, { children: t("resourceServers:tree.addAction", "Add action") })]
			})]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Collapse, {
			in: expanded,
			children: [actions.map((action) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ActionNode, {
				resourceServerId,
				action,
				depth: depth + 1,
				parentResourceId: node.id,
				selectedNodeId,
				onSelect
			}, action.id)), children.map((child) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ResourceNode, {
				resourceServerId,
				delimiter,
				node: child,
				depth: depth + 1,
				selectedNodeId,
				onSelect,
				onAddChild
			}, child.id))]
		})
	] });
}
function ActionNode({ resourceServerId, action, depth, parentResourceId = void 0, selectedNodeId, onSelect }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { showToast } = (0, __thunderid_contexts.useToast)();
	const logger = (0, __thunderid_logger_react.useLogger)("ActionNode");
	const [hovered, setHovered] = (0, react.useState)(false);
	const deleteAction = require_useDeleteAction.default(resourceServerId, parentResourceId);
	const isSelected = selectedNodeId === action.id;
	const nodeType = parentResourceId ? "resource-action" : "server-action";
	const [copiedPermission, setCopiedPermission] = (0, react.useState)(false);
	const handleCopyPermission = (e) => {
		e.stopPropagation();
		navigator.clipboard.writeText(action.permission).then(() => {
			setCopiedPermission(true);
			setTimeout(() => setCopiedPermission(false), 1500);
		}).catch((err) => logger.error("Failed to copy permission", { error: err }));
	};
	const handleDelete = (e) => {
		e.stopPropagation();
		deleteAction.mutate(action.id, {
			onSuccess: () => showToast(t("resourceServers:tree.deleteAction.success", "Action deleted."), "success"),
			onError: (err) => {
				logger.error("Failed to delete action", { error: err });
				showToast(t("resourceServers:tree.deleteAction.error", "Failed to delete action."), "error");
			}
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		onMouseEnter: () => setHovered(true),
		onMouseLeave: () => setHovered(false),
		onClick: () => onSelect({
			type: nodeType,
			id: action.id,
			data: action,
			parentResourceId
		}),
		sx: {
			display: "flex",
			alignItems: "center",
			gap: .75,
			pl: depth * 2 + 2,
			pr: .5,
			py: .5,
			borderRadius: 1,
			cursor: "pointer",
			bgcolor: isSelected ? "action.selected" : hovered ? "action.hover" : "transparent"
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Zap, {
				size: 16,
				style: {
					flexShrink: 0,
					opacity: .6
				}
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				sx: {
					flex: 1,
					minWidth: 0,
					display: "flex",
					alignItems: "center",
					gap: .75
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "body2",
					sx: {
						flexShrink: 1,
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
						minWidth: 40
					},
					children: action.name
				}), (isSelected || hovered) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
					title: copiedPermission ? t("common:copied", "Copied!") : t("resourceServers:tree.copyPermission", "Copy permission string"),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
						size: "small",
						sx: {
							p: .15,
							flexShrink: 0
						},
						onClick: handleCopyPermission,
						children: copiedPermission ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 10 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, { size: 10 })
					})
				})]
			}),
			(isSelected || hovered) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					flexShrink: 0
				},
				onClick: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
					title: t("common:delete", "Delete"),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
						size: "small",
						sx: {
							p: .25,
							color: "error.main"
						},
						onClick: handleDelete,
						disabled: deleteAction.isPending,
						children: deleteAction.isPending ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 12 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Trash2, { size: 14 })
					})
				})
			})
		]
	});
}

//#endregion
exports.ActionNode = ActionNode;
exports.ResourceNode = ResourceNode;