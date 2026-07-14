const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useGetResourceServers = require('../../api/useGetResourceServers.cjs');
const require_useGetResources = require('../../api/useGetResources.cjs');
const require_useGetServerActions = require('../../api/useGetServerActions.cjs');
const require_useGetResourceActions = require('../../api/useGetResourceActions.cjs');
const require_useSubtreePermissions = require('../../api/useSubtreePermissions.cjs');
const require_permissionSelection = require('../../utils/permissionSelection.cjs');
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

//#region src/components/permission-catalog/PermissionCatalog.tsx
function CatalogRow({ name, permission, depth, checked, indeterminate = false, disabled, loading = false, onToggle, expandControl = void 0 }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
		direction: "row",
		alignItems: "center",
		spacing: 1,
		sx: {
			pl: depth * 3,
			py: .25
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				sx: {
					width: 28,
					display: "flex",
					justifyContent: "center"
				},
				children: expandControl
			}),
			loading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				sx: {
					width: 38,
					display: "flex",
					justifyContent: "center"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 16 })
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Checkbox, {
				size: "small",
				checked,
				indeterminate,
				disabled,
				onChange: onToggle,
				inputProps: { "aria-label": permission }
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				children: name
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
				label: permission,
				size: "small",
				sx: { fontFamily: "monospace" }
			})
		]
	});
}
function CatalogResourceNode({ resourceServerId, resource, depth, selected, readOnly, delimiter, onChange, collectSubtree, getCachedSubtree }) {
	const { t } = (0, react_i18next.useTranslation)();
	const [expanded, setExpanded] = (0, react.useState)(false);
	const [cascading, setCascading] = (0, react.useState)(false);
	const [cascadeError, setCascadeError] = (0, react.useState)(false);
	const isOpen = expanded;
	const { data: childResourcesData } = require_useGetResources.default(resourceServerId, resource.id, isOpen);
	const { data: resourceActionsData } = require_useGetResourceActions.default(resourceServerId, resource.id, isOpen);
	const childResources = childResourcesData?.resources ?? [];
	const resourceActions = resourceActionsData?.actions ?? [];
	const cached = getCachedSubtree(resource);
	let state;
	if (cached !== null) state = require_permissionSelection.getSubtreeSelectionState(selected, resourceServerId, cached);
	else state = selected.find((e) => e.resourceServerId === resourceServerId)?.permissions.some((p) => p === resource.permission || p.startsWith(`${resource.permission}${delimiter}`)) ?? false ? "some" : "none";
	const handleCascadeToggle = () => {
		if (state === "all" && cached !== null) {
			onChange(require_permissionSelection.removePermissions(selected, resourceServerId, cached));
			return;
		}
		setCascading(true);
		setCascadeError(false);
		collectSubtree(resource).then((all) => {
			onChange(require_permissionSelection.mergePermissions(selected, [{
				resourceServerId,
				permissions: all
			}]));
			setCascading(false);
		}).catch(() => {
			setCascadeError(true);
			setCascading(false);
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(CatalogRow, {
			name: resource.name,
			permission: resource.permission,
			depth,
			checked: state === "all",
			indeterminate: state === "some",
			disabled: readOnly,
			loading: cascading,
			onToggle: handleCascadeToggle,
			expandControl: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
				size: "small",
				onClick: () => setExpanded((v) => !v),
				"aria-label": resource.handle,
				children: isOpen ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronDown, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronRight, { size: 16 })
			})
		}),
		cascadeError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
			severity: "error",
			sx: {
				mx: 2,
				my: .5
			},
			children: t("resourceServers:permissionCatalog.loadError", "Failed to load permissions for this resource server.")
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Collapse, {
			in: isOpen,
			children: [resourceActions.map((action) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CatalogRow, {
				name: action.name,
				permission: action.permission,
				depth: depth + 1,
				checked: require_permissionSelection.isPermissionSelected(selected, resourceServerId, action.permission),
				disabled: readOnly,
				onToggle: () => onChange(require_permissionSelection.togglePermission(selected, resourceServerId, action.permission))
			}, action.id)), childResources.map((child) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CatalogResourceNode, {
				resourceServerId,
				resource: child,
				depth: depth + 1,
				selected,
				readOnly,
				delimiter,
				onChange,
				collectSubtree,
				getCachedSubtree
			}, child.id))]
		})
	] });
}
function ServerSectionContent({ server, selected, readOnly, onChange, collectSubtree, getCachedSubtree }) {
	const delimiter = server.delimiter;
	const { t } = (0, react_i18next.useTranslation)();
	const { data: resourcesData, isLoading: loadingResources, error: resourcesError } = require_useGetResources.default(server.id);
	const { data: actionsData, isLoading: loadingActions, error: actionsError } = require_useGetServerActions.default(server.id);
	if (loadingResources || loadingActions) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			justifyContent: "center",
			py: 3
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 20 })
	});
	if (resourcesError ?? actionsError) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "error",
		sx: { my: 1 },
		children: t("resourceServers:permissionCatalog.loadError", "Failed to load permissions for this resource server.")
	});
	const resources = resourcesData?.resources ?? [];
	const serverActions = actionsData?.actions ?? [];
	if (resources.length === 0 && serverActions.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "info",
		sx: { my: 1 },
		children: t("resourceServers:permissionCatalog.noPermissions", "No permissions defined for this resource server.")
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [serverActions.map((action) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CatalogRow, {
		name: action.name,
		permission: action.permission,
		depth: 1,
		checked: require_permissionSelection.isPermissionSelected(selected, server.id, action.permission),
		disabled: readOnly,
		onToggle: () => onChange(require_permissionSelection.togglePermission(selected, server.id, action.permission))
	}, action.id)), resources.map((resource) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CatalogResourceNode, {
		resourceServerId: server.id,
		resource,
		depth: 1,
		selected,
		readOnly,
		delimiter,
		onChange,
		collectSubtree,
		getCachedSubtree
	}, resource.id))] });
}
function ServerSection({ server, selected, readOnly, onChange }) {
	const { t } = (0, react_i18next.useTranslation)();
	const [expanded, setExpanded] = (0, react.useState)(false);
	const [hasExpanded, setHasExpanded] = (0, react.useState)(false);
	const [cascading, setCascading] = (0, react.useState)(false);
	const [cascadeError, setCascadeError] = (0, react.useState)(false);
	const { collectSubtreePermissions, getCachedSubtreePermissions, collectServerPermissions, getCachedServerPermissions } = require_useSubtreePermissions.default(server.id);
	const serverEntry = selected.find((e) => e.resourceServerId === server.id);
	const selectedCount = serverEntry?.permissions.length ?? 0;
	const cachedAll = getCachedServerPermissions();
	const isEmpty = cachedAll !== null && cachedAll.length === 0 && selectedCount === 0;
	let state;
	if (cachedAll !== null) {
		state = require_permissionSelection.getSubtreeSelectionState(selected, server.id, cachedAll);
		if (state === "all" && serverEntry?.permissions.some((p) => !cachedAll.includes(p))) state = "some";
		if (cachedAll.length === 0 && selectedCount > 0) state = "some";
	} else state = selectedCount > 0 ? "some" : "none";
	const handleToggleExpand = () => {
		setExpanded((v) => !v);
		setHasExpanded(true);
	};
	const handleCascadeToggle = () => {
		if (state === "all") {
			onChange(selected.filter((e) => e.resourceServerId !== server.id));
			return;
		}
		setCascading(true);
		setCascadeError(false);
		collectServerPermissions().then((all) => {
			onChange(require_permissionSelection.mergePermissions(selected, [{
				resourceServerId: server.id,
				permissions: all
			}]));
			setCascading(false);
		}).catch(() => {
			setCascadeError(true);
			setCascading(false);
		});
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			borderBottom: "1px solid",
			borderColor: "divider"
		},
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "row",
				alignItems: "center",
				spacing: 1,
				sx: { py: .5 },
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
						size: "small",
						onClick: handleToggleExpand,
						"aria-label": server.handle,
						children: expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronDown, { size: 16 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ChevronRight, { size: 16 })
					}),
					cascading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
						sx: {
							width: 38,
							display: "flex",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 16 })
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: isEmpty ? t("resourceServers:permissionCatalog.noPermissions", "No permissions defined for this resource server.") : "",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Checkbox, {
							size: "small",
							checked: state === "all",
							indeterminate: state === "some",
							disabled: readOnly || isEmpty,
							onChange: handleCascadeToggle,
							inputProps: { "aria-label": server.name }
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "subtitle2",
						children: server.name
					}),
					selectedCount > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
						size: "small",
						label: selectedCount
					})
				]
			}),
			cascadeError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				severity: "error",
				sx: {
					mx: 2,
					my: .5
				},
				children: t("resourceServers:permissionCatalog.loadError", "Failed to load permissions for this resource server.")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Collapse, {
				in: expanded,
				children: hasExpanded && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ServerSectionContent, {
					server,
					selected,
					readOnly,
					onChange,
					collectSubtree: collectSubtreePermissions,
					getCachedSubtree: getCachedSubtreePermissions
				})
			})
		]
	});
}
function UnknownServerGroups({ entries, readOnly, selected, onChange }) {
	const { t } = (0, react_i18next.useTranslation)();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: entries.map((entry) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			borderBottom: "1px solid",
			borderColor: "divider",
			py: .5
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
			direction: "row",
			alignItems: "center",
			spacing: 1,
			sx: { pl: 1 },
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "subtitle2",
				children: entry.resourceServerId
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
				size: "small",
				color: "warning",
				label: t("resourceServers:permissionCatalog.serverNotFound", "Resource server not found")
			})]
		}), entry.permissions.map((permission) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CatalogRow, {
			name: permission,
			permission,
			depth: 1,
			checked: true,
			disabled: readOnly,
			onToggle: () => onChange(require_permissionSelection.togglePermission(selected, entry.resourceServerId, permission))
		}, permission))]
	}, entry.resourceServerId)) });
}
function PermissionCatalog({ selected, onChange, readOnly = false }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { data: serversData, isLoading: loadingServers, error: serversError } = require_useGetResourceServers.default({ limit: 100 });
	const servers = serversData?.resourceServers ?? [];
	if (serversError) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "error",
		children: t("resourceServers:permissionCatalog.loadServersError", "Failed to load resource servers.")
	});
	if (loadingServers) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			justifyContent: "center",
			py: 4
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 24 })
	});
	const unknownEntries = selected.filter((entry) => !servers.some((s) => s.id === entry.resourceServerId));
	if (servers.length === 0 && unknownEntries.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
		severity: "info",
		children: t("resourceServers:permissionCatalog.noResourceServers", "No resource servers found. Create a resource server first.")
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Paper, {
		variant: "outlined",
		sx: { p: 2 },
		children: [servers.map((server) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ServerSection, {
			server,
			selected,
			readOnly,
			onChange
		}, server.id)), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(UnknownServerGroups, {
			entries: unknownEntries,
			readOnly,
			selected,
			onChange
		})]
	});
}

//#endregion
exports.default = PermissionCatalog;