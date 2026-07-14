const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useGetResources = require('../../api/useGetResources.cjs');
const require_useGetServerActions = require('../../api/useGetServerActions.cjs');
const require_AddNodeDialog = require('./AddNodeDialog.cjs');
const require_ResourceDetailPanel = require('./ResourceDetailPanel.cjs');
const require_ResourceTreeNode = require('./ResourceTreeNode.cjs');
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

//#region src/components/resource-tree/ResourceTree.tsx
function ResourceTree({ resourceServer, onRefresh }) {
	const { t } = (0, react_i18next.useTranslation)();
	const [selectedNode, setSelectedNode] = (0, react.useState)(null);
	const [addDialog, setAddDialog] = (0, react.useState)(null);
	const [addMenuAnchor, setAddMenuAnchor] = (0, react.useState)(null);
	const { data: topLevelResources, isLoading: loadingResources } = require_useGetResources.default(resourceServer.id);
	const { data: serverActionsData, isLoading: loadingActions } = require_useGetServerActions.default(resourceServer.id);
	const resources = (0, react.useMemo)(() => topLevelResources?.resources ?? [], [topLevelResources]);
	const serverActions = (0, react.useMemo)(() => serverActionsData?.actions ?? [], [serverActionsData]);
	const openAdd = (mode, parentResourceId, parentPermission) => {
		setAddDialog({
			mode,
			parentResourceId,
			parentPermission: parentPermission ?? resourceServer.handle
		});
	};
	const isLoading = loadingResources || loadingActions;
	const isEmpty = resources.length === 0 && serverActions.length === 0;
	const effectiveSelectedNode = (0, react.useMemo)(() => {
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			gap: 2,
			height: "100%"
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Paper, {
				variant: "outlined",
				sx: {
					flex: 1,
					minWidth: 300,
					display: "flex",
					flexDirection: "column",
					overflow: "hidden"
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
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
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
							variant: "caption",
							color: "text.secondary",
							sx: {
								textTransform: "uppercase",
								letterSpacing: .5,
								fontWeight: 600
							},
							children: t("resourceServers:tree.title", "Resource Hierarchy")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							size: "small",
							onClick: (e) => setAddMenuAnchor(e.currentTarget),
							"aria-label": t("resourceServers:tree.add", "Add"),
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 16 })
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Menu, {
							anchorEl: addMenuAnchor,
							open: Boolean(addMenuAnchor),
							onClose: () => setAddMenuAnchor(null),
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.MenuItem, {
								onClick: () => {
									openAdd("resource");
									setAddMenuAnchor(null);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListItemIcon, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Layers, { size: 16 }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListItemText, { children: t("resourceServers:tree.addResource", "Add resource") })]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.MenuItem, {
								onClick: () => {
									openAdd("server-action");
									setAddMenuAnchor(null);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListItemIcon, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Zap, { size: 16 }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.ListItemText, { children: t("resourceServers:tree.addAction", "Add action") })]
							})]
						})
					]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						flex: 1,
						overflowY: "auto",
						p: .5,
						height: "100%"
					},
					children: isLoading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
						sx: {
							display: "flex",
							justifyContent: "center",
							py: 4
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 24 })
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
						serverActions.map((action) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ResourceTreeNode.ActionNode, {
							resourceServerId: resourceServer.id,
							action,
							depth: 0,
							selectedNodeId: effectiveSelectedNode?.id ?? null,
							onSelect: setSelectedNode
						}, action.id)),
						resources.map((resource) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ResourceTreeNode.ResourceNode, {
							resourceServerId: resourceServer.id,
							delimiter: resourceServer.delimiter,
							node: resource,
							depth: 0,
							selectedNodeId: effectiveSelectedNode?.id ?? null,
							onSelect: setSelectedNode,
							onAddChild: (mode, parentResourceId, parentPermission) => openAdd(mode, parentResourceId, parentPermission)
						}, resource.id)),
						isEmpty && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
							sx: {
								height: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								px: 2,
								textAlign: "center"
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
								variant: "body2",
								color: "text.disabled",
								children: t("resourceServers:tree.empty", "No resources yet — add a resource or action to get started.")
							})
						})
					] })
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Paper, {
				variant: "outlined",
				sx: {
					flex: 1,
					minWidth: 280,
					overflow: "hidden"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ResourceDetailPanel.default, {
					selectedNode: effectiveSelectedNode,
					resourceServer,
					onRefresh
				})
			}),
			addDialog && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_AddNodeDialog.default, {
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
exports.default = ResourceTree;