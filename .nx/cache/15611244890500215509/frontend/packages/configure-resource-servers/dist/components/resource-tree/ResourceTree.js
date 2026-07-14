import useGetResources from "../../api/useGetResources.js";
import useGetServerActions from "../../api/useGetServerActions.js";
import AddNodeDialog from "./AddNodeDialog.js";
import ResourceDetailPanel from "./ResourceDetailPanel.js";
import { ActionNode, ResourceNode } from "./ResourceTreeNode.js";
import { Box, CircularProgress, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Typography } from "@wso2/oxygen-ui";
import { Layers, Plus, Zap } from "@wso2/oxygen-ui-icons-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

//#region src/components/resource-tree/ResourceTree.tsx
function ResourceTree({ resourceServer, onRefresh }) {
	const { t } = useTranslation();
	const [selectedNode, setSelectedNode] = useState(null);
	const [addDialog, setAddDialog] = useState(null);
	const [addMenuAnchor, setAddMenuAnchor] = useState(null);
	const { data: topLevelResources, isLoading: loadingResources } = useGetResources(resourceServer.id);
	const { data: serverActionsData, isLoading: loadingActions } = useGetServerActions(resourceServer.id);
	const resources = useMemo(() => topLevelResources?.resources ?? [], [topLevelResources]);
	const serverActions = useMemo(() => serverActionsData?.actions ?? [], [serverActionsData]);
	const openAdd = (mode, parentResourceId, parentPermission) => {
		setAddDialog({
			mode,
			parentResourceId,
			parentPermission: parentPermission ?? resourceServer.handle
		});
	};
	const isLoading = loadingResources || loadingActions;
	const isEmpty = resources.length === 0 && serverActions.length === 0;
	const effectiveSelectedNode = useMemo(() => {
		if (selectedNode) return selectedNode;
		if (serverActions.length > 0) return {
			type: "server-action",
			id: serverActions[0].id,
			data: serverActions[0]
		};
		if (resources.length > 0) return {
			type: "resource",
			id: resources[0].id,
			data: resources[0]
		};
		return null;
	}, [
		selectedNode,
		serverActions,
		resources
	]);
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			gap: 2,
			height: "100%"
		},
		children: [
			/* @__PURE__ */ jsxs(Paper, {
				variant: "outlined",
				sx: {
					flex: 1,
					minWidth: 300,
					display: "flex",
					flexDirection: "column",
					overflow: "hidden"
				},
				children: [/* @__PURE__ */ jsxs(Box, {
					sx: {
						px: 1.5,
						py: 1,
						bgcolor: "background.default",
						borderBottom: "1px solid",
						borderColor: "divider",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: [
						/* @__PURE__ */ jsx(Typography, {
							variant: "caption",
							color: "text.secondary",
							sx: {
								textTransform: "uppercase",
								letterSpacing: .5,
								fontWeight: 600
							},
							children: t("resourceServers:tree.title", "Resource Hierarchy")
						}),
						/* @__PURE__ */ jsx(IconButton, {
							size: "small",
							onClick: (e) => setAddMenuAnchor(e.currentTarget),
							"aria-label": t("resourceServers:tree.add", "Add"),
							children: /* @__PURE__ */ jsx(Plus, { size: 16 })
						}),
						/* @__PURE__ */ jsxs(Menu, {
							anchorEl: addMenuAnchor,
							open: Boolean(addMenuAnchor),
							onClose: () => setAddMenuAnchor(null),
							children: [/* @__PURE__ */ jsxs(MenuItem, {
								onClick: () => {
									openAdd("resource");
									setAddMenuAnchor(null);
								},
								children: [/* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx(Layers, { size: 16 }) }), /* @__PURE__ */ jsx(ListItemText, { children: t("resourceServers:tree.addResource", "Add resource") })]
							}), /* @__PURE__ */ jsxs(MenuItem, {
								onClick: () => {
									openAdd("server-action");
									setAddMenuAnchor(null);
								},
								children: [/* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx(Zap, { size: 16 }) }), /* @__PURE__ */ jsx(ListItemText, { children: t("resourceServers:tree.addAction", "Add action") })]
							})]
						})
					]
				}), /* @__PURE__ */ jsx(Box, {
					sx: {
						flex: 1,
						overflowY: "auto",
						p: .5,
						height: "100%"
					},
					children: isLoading ? /* @__PURE__ */ jsx(Box, {
						sx: {
							display: "flex",
							justifyContent: "center",
							py: 4
						},
						children: /* @__PURE__ */ jsx(CircularProgress, { size: 24 })
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [
						serverActions.map((action) => /* @__PURE__ */ jsx(ActionNode, {
							resourceServerId: resourceServer.id,
							action,
							depth: 0,
							selectedNodeId: effectiveSelectedNode?.id ?? null,
							onSelect: setSelectedNode
						}, action.id)),
						resources.map((resource) => /* @__PURE__ */ jsx(ResourceNode, {
							resourceServerId: resourceServer.id,
							delimiter: resourceServer.delimiter,
							node: resource,
							depth: 0,
							selectedNodeId: effectiveSelectedNode?.id ?? null,
							onSelect: setSelectedNode,
							onAddChild: (mode, parentResourceId, parentPermission) => openAdd(mode, parentResourceId, parentPermission)
						}, resource.id)),
						isEmpty && /* @__PURE__ */ jsx(Box, {
							sx: {
								height: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								px: 2,
								textAlign: "center"
							},
							children: /* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								color: "text.disabled",
								children: t("resourceServers:tree.empty", "No resources yet — add a resource or action to get started.")
							})
						})
					] })
				})]
			}),
			/* @__PURE__ */ jsx(Paper, {
				variant: "outlined",
				sx: {
					flex: 1,
					minWidth: 280,
					overflow: "hidden"
				},
				children: /* @__PURE__ */ jsx(ResourceDetailPanel, {
					selectedNode: effectiveSelectedNode,
					resourceServer,
					onRefresh
				})
			}),
			addDialog && /* @__PURE__ */ jsx(AddNodeDialog, {
				open: true,
				mode: addDialog.mode,
				resourceServerId: resourceServer.id,
				parentResourceId: addDialog.parentResourceId,
				parentPermission: addDialog.parentPermission,
				delimiter: resourceServer.delimiter,
				onClose: () => setAddDialog(null),
				onSuccess: () => setAddDialog(null)
			})
		]
	});
}

//#endregion
export { ResourceTree as default };