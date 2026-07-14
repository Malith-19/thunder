import useGetResources from "../../api/useGetResources.js";
import useDeleteResource from "../../api/useDeleteResource.js";
import useGetResourceActions from "../../api/useGetResourceActions.js";
import useDeleteAction from "../../api/useDeleteAction.js";
import { useToast } from "@thunderid/contexts";
import { Box, CircularProgress, Collapse, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from "@wso2/oxygen-ui";
import { Check, ChevronDown, ChevronRight, Copy, Layers, Plus, Trash2, Zap } from "@wso2/oxygen-ui-icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";

//#region src/components/resource-tree/ResourceTreeNode.tsx
function ResourceNode({ resourceServerId, delimiter, node, depth, selectedNodeId, onSelect, onAddChild }) {
	const { t } = useTranslation();
	const { showToast } = useToast();
	const logger = useLogger("ResourceNode");
	const [expanded, setExpanded] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [addMenuAnchor, setAddMenuAnchor] = useState(null);
	const deleteResource = useDeleteResource(resourceServerId);
	const { data: childResources } = useGetResources(resourceServerId, node.id);
	const { data: resourceActions } = useGetResourceActions(resourceServerId, node.id, expanded);
	const isSelected = selectedNodeId === node.id;
	const children = childResources?.resources ?? [];
	const actions = resourceActions?.actions ?? [];
	const [copiedPermission, setCopiedPermission] = useState(false);
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
	return /* @__PURE__ */ jsxs(Box, { children: [
		/* @__PURE__ */ jsxs(Box, {
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
				/* @__PURE__ */ jsx(IconButton, {
					size: "small",
					onClick: (e) => {
						e.stopPropagation();
						setExpanded((v) => !v);
					},
					sx: {
						p: .25,
						flexShrink: 0
					},
					children: expanded ? /* @__PURE__ */ jsx(ChevronDown, { size: 16 }) : /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
				}),
				/* @__PURE__ */ jsx(Layers, {
					size: 16,
					style: {
						flexShrink: 0,
						opacity: .7
					}
				}),
				/* @__PURE__ */ jsxs(Box, {
					sx: {
						flex: 1,
						minWidth: 0,
						display: "flex",
						alignItems: "center",
						gap: .75
					},
					children: [/* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						sx: {
							flexShrink: 1,
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
							minWidth: 40
						},
						children: node.name
					}), (isSelected || hovered) && /* @__PURE__ */ jsx(Tooltip, {
						title: copiedPermission ? t("common:copied", "Copied!") : t("resourceServers:tree.copyPermission", "Copy permission string"),
						children: /* @__PURE__ */ jsx(IconButton, {
							size: "small",
							sx: {
								p: .15,
								flexShrink: 0
							},
							onClick: handleCopyPermission,
							children: copiedPermission ? /* @__PURE__ */ jsx(Check, { size: 14 }) : /* @__PURE__ */ jsx(Copy, { size: 14 })
						})
					})]
				}),
				(isSelected || hovered || Boolean(addMenuAnchor)) && /* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						gap: .25,
						flexShrink: 0
					},
					onClick: (e) => e.stopPropagation(),
					children: [/* @__PURE__ */ jsx(Tooltip, {
						title: t("resourceServers:tree.add", "Add"),
						children: /* @__PURE__ */ jsx(IconButton, {
							size: "small",
							sx: { p: .25 },
							"aria-label": t("resourceServers:tree.add", "Add"),
							onClick: (e) => {
								e.stopPropagation();
								setAddMenuAnchor(e.currentTarget);
							},
							children: /* @__PURE__ */ jsx(Plus, { size: 14 })
						})
					}), /* @__PURE__ */ jsx(Tooltip, {
						title: t("common:delete", "Delete"),
						children: /* @__PURE__ */ jsx(IconButton, {
							size: "small",
							sx: {
								p: .25,
								color: "error.main"
							},
							onClick: handleDelete,
							disabled: deleteResource.isPending,
							children: deleteResource.isPending ? /* @__PURE__ */ jsx(CircularProgress, { size: 12 }) : /* @__PURE__ */ jsx(Trash2, { size: 14 })
						})
					})]
				})
			]
		}),
		/* @__PURE__ */ jsxs(Menu, {
			anchorEl: addMenuAnchor,
			open: Boolean(addMenuAnchor),
			onClose: () => setAddMenuAnchor(null),
			slotProps: { paper: { sx: { minWidth: 160 } } },
			children: [/* @__PURE__ */ jsxs(MenuItem, {
				onClick: () => {
					onAddChild("sub-resource", node.id, node.permission);
					setAddMenuAnchor(null);
				},
				children: [/* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx(Layers, { size: 16 }) }), /* @__PURE__ */ jsx(ListItemText, { children: t("resourceServers:tree.addSubResource", "Add sub-resource") })]
			}), /* @__PURE__ */ jsxs(MenuItem, {
				onClick: () => {
					onAddChild("resource-action", node.id, node.permission);
					setAddMenuAnchor(null);
				},
				children: [/* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx(Zap, { size: 16 }) }), /* @__PURE__ */ jsx(ListItemText, { children: t("resourceServers:tree.addAction", "Add action") })]
			})]
		}),
		/* @__PURE__ */ jsxs(Collapse, {
			in: expanded,
			children: [actions.map((action) => /* @__PURE__ */ jsx(ActionNode, {
				resourceServerId,
				action,
				depth: depth + 1,
				parentResourceId: node.id,
				selectedNodeId,
				onSelect
			}, action.id)), children.map((child) => /* @__PURE__ */ jsx(ResourceNode, {
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
	const { t } = useTranslation();
	const { showToast } = useToast();
	const logger = useLogger("ActionNode");
	const [hovered, setHovered] = useState(false);
	const deleteAction = useDeleteAction(resourceServerId, parentResourceId);
	const isSelected = selectedNodeId === action.id;
	const nodeType = parentResourceId ? "resource-action" : "server-action";
	const [copiedPermission, setCopiedPermission] = useState(false);
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
	return /* @__PURE__ */ jsxs(Box, {
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
			/* @__PURE__ */ jsx(Zap, {
				size: 16,
				style: {
					flexShrink: 0,
					opacity: .6
				}
			}),
			/* @__PURE__ */ jsxs(Box, {
				sx: {
					flex: 1,
					minWidth: 0,
					display: "flex",
					alignItems: "center",
					gap: .75
				},
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					sx: {
						flexShrink: 1,
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
						minWidth: 40
					},
					children: action.name
				}), (isSelected || hovered) && /* @__PURE__ */ jsx(Tooltip, {
					title: copiedPermission ? t("common:copied", "Copied!") : t("resourceServers:tree.copyPermission", "Copy permission string"),
					children: /* @__PURE__ */ jsx(IconButton, {
						size: "small",
						sx: {
							p: .15,
							flexShrink: 0
						},
						onClick: handleCopyPermission,
						children: copiedPermission ? /* @__PURE__ */ jsx(Check, { size: 10 }) : /* @__PURE__ */ jsx(Copy, { size: 10 })
					})
				})]
			}),
			(isSelected || hovered) && /* @__PURE__ */ jsx(Box, {
				sx: {
					display: "flex",
					flexShrink: 0
				},
				onClick: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ jsx(Tooltip, {
					title: t("common:delete", "Delete"),
					children: /* @__PURE__ */ jsx(IconButton, {
						size: "small",
						sx: {
							p: .25,
							color: "error.main"
						},
						onClick: handleDelete,
						disabled: deleteAction.isPending,
						children: deleteAction.isPending ? /* @__PURE__ */ jsx(CircularProgress, { size: 12 }) : /* @__PURE__ */ jsx(Trash2, { size: 14 })
					})
				})
			})
		]
	});
}

//#endregion
export { ActionNode, ResourceNode };