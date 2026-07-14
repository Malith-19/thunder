const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_fetchChildOrganizationUnits = require('../api/fetchChildOrganizationUnits.cjs');
const require_fetchOrganizationUnits = require('../api/fetchOrganizationUnits.cjs');
const require_organization_unit_query_keys = require('../constants/organization-unit-query-keys.cjs');
const require_useGetOrganizationUnits = require('../api/useGetOrganizationUnits.cjs');
const require_OrganizationUnitDeleteDialog = require('./OrganizationUnitDeleteDialog.cjs');
const require_organization_unit_tree_constants = require('../constants/organization-unit-tree-constants.cjs');
const require_useOrganizationUnit = require('../contexts/useOrganizationUnit.cjs');
const require_appendTreeItemChildren = require('../utils/appendTreeItemChildren.cjs');
const require_buildItemMap = require('../utils/buildItemMap.cjs');
const require_buildTreeItems = require('../utils/buildTreeItems.cjs');
const require_findTreeItem = require('../utils/findTreeItem.cjs');
const require_updateTreeItemChildren = require('../utils/updateTreeItemChildren.cjs');
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);

//#region src/components/OrganizationUnitsTreeView.tsx
function TreeViewLoadingIcon() {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 18 });
}
function buildAddChildItem(parentId, parentName, parentHandle) {
	return {
		id: `${parentId}${require_organization_unit_tree_constants.default.ADD_CHILD_SUFFIX}`,
		label: parentName,
		handle: parentHandle,
		isPlaceholder: true
	};
}
function CustomTreeItem(allProps) {
	const { onEdit, onDelete, onAddChild, onLoadMore: onLoadMoreProp, addChildTooltip = "", addChildButtonText = "", editTooltip = "", deleteTooltip = "", loadingItems: loadingItemsProp, loadMoreLoadingItems: loadMoreLoadingItemsProp, itemMap: itemMapProp, itemId, label,...restProps } = allProps;
	const treeItemProps = {
		itemId,
		label,
		...restProps
	};
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const { t } = (0, react_i18next.useTranslation)();
	const labelStr = typeof label === "string" ? label : "";
	const itemData = itemMapProp?.get(itemId);
	const isLoadMoreItem = itemId.endsWith(require_organization_unit_tree_constants.default.LOAD_MORE_SUFFIX);
	const isAddChildButton = itemId.endsWith(require_organization_unit_tree_constants.default.ADD_CHILD_SUFFIX);
	const isPlaceholder = !isAddChildButton && !isLoadMoreItem && (itemData?.isPlaceholder ?? (itemId.endsWith(require_organization_unit_tree_constants.default.PLACEHOLDER_SUFFIX) || itemId.endsWith(require_organization_unit_tree_constants.default.ERROR_SUFFIX) || itemId.endsWith(require_organization_unit_tree_constants.default.EMPTY_SUFFIX)));
	const isItemLoading = loadingItemsProp?.has(itemId);
	if (isLoadMoreItem) {
		const parentId = itemId.replace(require_organization_unit_tree_constants.default.LOAD_MORE_SUFFIX, "");
		const isLoadingMore = loadMoreLoadingItemsProp?.has(parentId);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TreeView.TreeItem, {
			...treeItemProps,
			sx: { "& > .MuiTreeItem-content": {
				border: "1px dashed",
				borderColor: theme.vars?.palette.divider,
				borderRadius: 1,
				backgroundColor: "transparent !important",
				cursor: isLoadingMore ? "default" : "pointer",
				transition: "all 0.15s ease-in-out",
				"&:hover": { borderColor: isLoadingMore ? void 0 : theme.vars?.palette.primary.main }
			} },
			label: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				role: "button",
				tabIndex: 0,
				onClick: (e) => {
					e.stopPropagation();
					if (!isLoadingMore) onLoadMoreProp?.(parentId);
				},
				onKeyDown: (e) => {
					if ((e.key === "Enter" || e.key === " ") && !isLoadingMore) {
						e.preventDefault();
						e.stopPropagation();
						onLoadMoreProp?.(parentId);
					}
				},
				sx: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 1,
					py: .25
				},
				children: isLoadingMore ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 14 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "caption",
					color: "text.secondary",
					children: t("common:status.loading")
				})] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "caption",
					color: "primary",
					sx: { fontWeight: 500 },
					children: t("organizationUnits:listing.treeView.loadMore")
				})
			})
		});
	}
	if (isAddChildButton) {
		const parentId = itemId.replace(require_organization_unit_tree_constants.default.ADD_CHILD_SUFFIX, "");
		const parentItem = itemMapProp?.get(parentId);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TreeView.TreeItem, {
			...treeItemProps,
			sx: { "& > .MuiTreeItem-content": {
				border: "1px dashed",
				borderColor: theme.vars?.palette.primary.main,
				borderRadius: 1,
				backgroundColor: "transparent !important",
				cursor: "pointer",
				transition: "all 0.15s ease-in-out",
				"&:hover": {
					backgroundColor: `${theme.vars?.palette.primary.main} !important`,
					"& .add-child-avatar": {
						backgroundColor: theme.vars?.palette.primary.contrastText,
						color: theme.vars?.palette.primary.main
					},
					"& .add-child-text": { color: theme.vars?.palette.primary.contrastText }
				}
			} },
			label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				role: "button",
				tabIndex: 0,
				onClick: (e) => {
					e.stopPropagation();
					onAddChild?.(e, {
						id: parentId,
						name: parentItem?.label ?? "",
						handle: parentItem?.handle ?? ""
					});
				},
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						e.stopPropagation();
						onAddChild?.(e, {
							id: parentId,
							name: parentItem?.label ?? "",
							handle: parentItem?.handle ?? ""
						});
					}
				},
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1.5
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Avatar, {
					className: "add-child-avatar",
					sx: {
						p: .5,
						backgroundColor: theme.vars?.palette.primary.main,
						color: theme.vars?.palette.primary.contrastText,
						width: 32,
						height: 32,
						fontSize: "0.875rem",
						transition: "all 0.15s ease-in-out"
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 14 })
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					className: "add-child-text",
					variant: "body2",
					sx: {
						fontWeight: 500,
						transition: "color 0.15s ease-in-out"
					},
					children: addChildButtonText
				})]
			})
		});
	}
	if (isPlaceholder) {
		const isLoadingPlaceholder = itemId.endsWith(require_organization_unit_tree_constants.default.PLACEHOLDER_SUFFIX);
		const isErrorPlaceholder = itemId.endsWith(require_organization_unit_tree_constants.default.ERROR_SUFFIX);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TreeView.TreeItem, {
			...treeItemProps,
			sx: { "& > .MuiTreeItem-content": {
				border: "none !important",
				backgroundColor: "transparent !important"
			} },
			label: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1
				},
				children: isLoadingPlaceholder ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "caption",
					color: "text.secondary",
					sx: { fontStyle: "italic" },
					children: "Loading..."
				})] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "caption",
					color: isErrorPlaceholder ? "error" : "text.secondary",
					sx: {
						fontStyle: "italic",
						pl: 1
					},
					children: labelStr
				})
			})
		});
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TreeView.TreeItem, {
		...treeItemProps,
		...isItemLoading ? { slots: {
			collapseIcon: TreeViewLoadingIcon,
			expandIcon: TreeViewLoadingIcon
		} } : {},
		label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			sx: {
				display: "flex",
				alignItems: "center",
				gap: 1.5
			},
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.ResourceAvatar, {
					value: itemData?.logoUrl,
					size: 30,
					fallback: "emoji:🏛️"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
					sx: {
						flexGrow: 1,
						minWidth: 0
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						sx: {
							fontWeight: 500,
							lineHeight: 1.3
						},
						children: labelStr
					}), itemData?.handle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "caption",
						color: "text.secondary",
						sx: {
							lineHeight: 1.2,
							display: "block"
						},
						children: itemData.handle
					})]
				}),
				itemData?.isReadOnly ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
					title: t("common:status.readOnly", "Read Only"),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
						size: "small",
						disableRipple: true,
						sx: { cursor: "default" },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Eye, { size: 16 })
					})
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: addChildTooltip,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							size: "small",
							"aria-label": addChildTooltip,
							onClick: (e) => {
								e.stopPropagation();
								onAddChild?.(e, {
									id: itemId,
									name: labelStr,
									handle: itemData?.handle ?? ""
								});
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 16 })
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: editTooltip,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							size: "small",
							"aria-label": editTooltip,
							onClick: (e) => {
								e.stopPropagation();
								onEdit?.(e, {
									id: itemId,
									name: labelStr
								});
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Pencil, { size: 16 })
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
						title: deleteTooltip,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
							size: "small",
							color: "error",
							"aria-label": deleteTooltip,
							onClick: (e) => {
								e.stopPropagation();
								onDelete?.(e, {
									id: itemId,
									name: labelStr
								});
							},
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Trash2, { size: 16 })
						})
					})
				] })
			]
		})
	});
}
function OrganizationUnitsTreeView() {
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const navigate = (0, react_router.useNavigate)();
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("OrganizationUnitsTreeView");
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	const { data, isLoading, error } = require_useGetOrganizationUnits.default();
	const { treeItems, setTreeItems, expandedItems, setExpandedItems, loadedItems, setLoadedItems, resetTreeState } = require_useOrganizationUnit.default();
	const itemMap = (0, react.useMemo)(() => require_buildItemMap.default(treeItems), [treeItems]);
	const [loadingItems, setLoadingItems] = (0, react.useState)(/* @__PURE__ */ new Set());
	const [loadMoreLoadingItems, setLoadMoreLoadingItems] = (0, react.useState)(/* @__PURE__ */ new Set());
	const [childOffsets, setChildOffsets] = (0, react.useState)(/* @__PURE__ */ new Map());
	const [rootOffset, setRootOffset] = (0, react.useState)(0);
	const [rootLoadMoreLoading, setRootLoadMoreLoading] = (0, react.useState)(false);
	const rootLoadMoreLoadingRef = (0, react.useRef)(false);
	rootLoadMoreLoadingRef.current = rootLoadMoreLoading;
	const loadingItemsRef = (0, react.useRef)(loadingItems);
	loadingItemsRef.current = loadingItems;
	const expandedItemsRef = (0, react.useRef)(expandedItems);
	expandedItemsRef.current = expandedItems;
	const treeItemsRef = (0, react.useRef)(treeItems);
	treeItemsRef.current = treeItems;
	const rebuildIdRef = (0, react.useRef)(0);
	const builtFromDataRef = (0, react.useRef)(null);
	const [selectedOU, setSelectedOU] = (0, react.useState)(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = (0, react.useState)(false);
	const [snackbar, setSnackbar] = (0, react.useState)({
		open: false,
		message: "",
		severity: "success"
	});
	const fetchChildPage = (0, react.useCallback)(async (parentId, offset) => queryClient.fetchQuery({
		queryKey: [
			require_organization_unit_query_keys.default.CHILD_ORGANIZATION_UNITS,
			parentId,
			{
				limit: require_organization_unit_tree_constants.default.PAGE_SIZE,
				offset
			}
		],
		queryFn: async () => require_fetchChildOrganizationUnits.default(http, getServerUrl(), parentId, {
			limit: require_organization_unit_tree_constants.default.PAGE_SIZE,
			offset
		}),
		staleTime: 0
	}), [
		getServerUrl,
		queryClient,
		http
	]);
	const fetchChildItems = (0, react.useCallback)(async (parentId) => {
		const result = await fetchChildPage(parentId, 0);
		const childOUs = result.organizationUnits;
		const parentItem = require_findTreeItem.default(treeItemsRef.current, parentId);
		const addChildItem = buildAddChildItem(parentId, parentItem?.label ?? "", parentItem?.handle ?? "");
		const items = childOUs.length > 0 ? [addChildItem, ...require_buildTreeItems.default(childOUs)] : [addChildItem];
		if (childOUs.length < result.totalResults) items.push({
			id: `${parentId}${require_organization_unit_tree_constants.default.LOAD_MORE_SUFFIX}`,
			label: "",
			handle: "",
			isPlaceholder: true
		});
		return items;
	}, [fetchChildPage]);
	const fetchChildOUs = (0, react.useCallback)(async (parentId) => {
		if (loadingItemsRef.current.has(parentId)) return;
		setLoadingItems((prev) => new Set(prev).add(parentId));
		try {
			const childItems = await fetchChildItems(parentId);
			setChildOffsets((prev) => new Map(prev).set(parentId, childItems.filter((c) => !c.isPlaceholder).length));
			setTreeItems((prev) => require_updateTreeItemChildren.default(prev, parentId, childItems));
			setLoadedItems((prev) => new Set(prev).add(parentId));
			setExpandedItems((prev) => prev.includes(parentId) ? prev : [...prev, parentId]);
		} catch (_error) {
			logger.error("Failed to load child organization units", {
				error: _error,
				parentId
			});
			const errorItem = {
				id: `${parentId}${require_organization_unit_tree_constants.default.ERROR_SUFFIX}`,
				label: t("organizationUnits:listing.treeView.loadError"),
				handle: "",
				isPlaceholder: true
			};
			setTreeItems((prev) => require_updateTreeItemChildren.default(prev, parentId, [errorItem]));
			setExpandedItems((prev) => prev.includes(parentId) ? prev : [...prev, parentId]);
		} finally {
			setLoadingItems((prev) => {
				const next = new Set(prev);
				next.delete(parentId);
				return next;
			});
		}
	}, [
		fetchChildItems,
		setTreeItems,
		setLoadedItems,
		setExpandedItems,
		logger,
		t
	]);
	const handleRootLoadMore = (0, react.useCallback)(async () => {
		if (rootLoadMoreLoadingRef.current) return;
		setRootLoadMoreLoading(true);
		try {
			const result = await queryClient.fetchQuery({
				queryKey: [require_organization_unit_query_keys.default.ORGANIZATION_UNITS, {
					limit: require_organization_unit_tree_constants.default.PAGE_SIZE,
					offset: rootOffset
				}],
				queryFn: async () => require_fetchOrganizationUnits.default(http, getServerUrl(), {
					limit: require_organization_unit_tree_constants.default.PAGE_SIZE,
					offset: rootOffset
				}),
				staleTime: 0
			});
			const newItems = require_buildTreeItems.default(result.organizationUnits);
			const loadedSoFar = rootOffset + result.organizationUnits.length;
			if (loadedSoFar < result.totalResults) newItems.push({
				id: require_organization_unit_tree_constants.default.ROOT_LOAD_MORE_ID,
				label: "",
				handle: "",
				isPlaceholder: true
			});
			setRootOffset(loadedSoFar);
			setTreeItems((prev) => {
				return [...prev.filter((item) => item.id !== require_organization_unit_tree_constants.default.ROOT_LOAD_MORE_ID), ...newItems];
			});
		} catch (_error) {
			logger.error("Failed to load more root organization units", { error: _error });
		} finally {
			setRootLoadMoreLoading(false);
		}
	}, [
		rootOffset,
		getServerUrl,
		queryClient,
		http,
		setTreeItems,
		logger
	]);
	const handleLoadMore = (0, react.useCallback)(async (parentId) => {
		if (parentId === require_organization_unit_tree_constants.default.ROOT_PARENT_ID) {
			await handleRootLoadMore();
			return;
		}
		setLoadMoreLoadingItems((prev) => new Set(prev).add(parentId));
		try {
			const offset = childOffsets.get(parentId) ?? require_organization_unit_tree_constants.default.PAGE_SIZE;
			const result = await fetchChildPage(parentId, offset);
			const childOUs = result.organizationUnits;
			const newItems = require_buildTreeItems.default(childOUs);
			const loadedSoFar = offset + childOUs.length;
			if (loadedSoFar < result.totalResults) newItems.push({
				id: `${parentId}${require_organization_unit_tree_constants.default.LOAD_MORE_SUFFIX}`,
				label: "",
				handle: "",
				isPlaceholder: true
			});
			setChildOffsets((prev) => new Map(prev).set(parentId, loadedSoFar));
			setTreeItems((prev) => require_appendTreeItemChildren.default(prev, parentId, newItems));
		} catch (_error) {
			logger.error("Failed to load more child organization units", {
				error: _error,
				parentId
			});
		} finally {
			setLoadMoreLoadingItems((prev) => {
				const next = new Set(prev);
				next.delete(parentId);
				return next;
			});
		}
	}, [
		childOffsets,
		fetchChildPage,
		setTreeItems,
		logger,
		handleRootLoadMore
	]);
	const expandLevel = (0, react.useCallback)((tree, levelIds, expandedSet, loaded) => {
		if (levelIds.length === 0) return Promise.resolve({
			tree,
			loaded
		});
		return Promise.all(levelIds.map((parentId) => fetchChildItems(parentId).then((children) => ({
			parentId,
			children,
			success: true
		})).catch(() => ({
			parentId,
			children: [],
			success: false
		})))).then((results) => {
			let updatedTree = tree;
			const nextLoaded = new Set(loaded);
			const nextLevelIds = [];
			results.filter((r) => r.success).forEach((r) => {
				updatedTree = require_updateTreeItemChildren.default(updatedTree, r.parentId, r.children);
				nextLoaded.add(r.parentId);
				r.children.filter((child) => !child.isPlaceholder && expandedSet.has(child.id)).forEach((child) => {
					nextLevelIds.push(child.id);
				});
			});
			return expandLevel(updatedTree, nextLevelIds, expandedSet, nextLoaded);
		});
	}, [fetchChildItems]);
	const rebuildTree = (0, react.useCallback)((rootOUs, expandedIds) => {
		const rootTree = require_buildTreeItems.default(rootOUs);
		const expandedSet = new Set(expandedIds);
		return expandLevel(rootTree, rootTree.map((item) => item.id).filter((id) => expandedSet.has(id)), expandedSet, /* @__PURE__ */ new Set());
	}, [expandLevel]);
	const buildRootTreeItems = (0, react.useCallback)((response) => {
		const items = require_buildTreeItems.default(response.organizationUnits);
		if (response.organizationUnits.length < response.totalResults) items.push({
			id: require_organization_unit_tree_constants.default.ROOT_LOAD_MORE_ID,
			label: "",
			handle: "",
			isPlaceholder: true
		});
		setRootOffset(response.organizationUnits.length);
		return items;
	}, []);
	(0, react.useEffect)(() => {
		if (!data?.organizationUnits || data.organizationUnits.length === 0) return;
		if (treeItems.length > 0 && builtFromDataRef.current === data) return;
		const currentExpanded = expandedItemsRef.current;
		rebuildIdRef.current += 1;
		const id = rebuildIdRef.current;
		if (currentExpanded.length > 0) rebuildTree(data.organizationUnits, currentExpanded).then(({ tree, loaded }) => {
			if (rebuildIdRef.current === id) {
				const items = tree;
				if (data.organizationUnits.length < data.totalResults) items.push({
					id: require_organization_unit_tree_constants.default.ROOT_LOAD_MORE_ID,
					label: "",
					handle: "",
					isPlaceholder: true
				});
				setRootOffset(data.organizationUnits.length);
				setTreeItems(items);
				setLoadedItems(loaded);
				builtFromDataRef.current = data;
			}
		}).catch((_err) => {
			logger.error("Failed to rebuild tree with expanded items", { error: _err });
			if (rebuildIdRef.current === id) {
				setTreeItems(buildRootTreeItems(data));
				builtFromDataRef.current = data;
			}
		});
		else {
			setTreeItems(buildRootTreeItems(data));
			builtFromDataRef.current = data;
		}
	}, [
		data,
		treeItems.length,
		rebuildTree,
		buildRootTreeItems,
		setTreeItems,
		setLoadedItems,
		logger
	]);
	(0, react.useEffect)(() => {
		if (treeItems.length === 0) builtFromDataRef.current = null;
	}, [treeItems.length]);
	const handleItemExpansionToggle = (0, react.useCallback)((_event, itemId, isExpanded) => {
		if (!isExpanded || loadedItems.has(itemId) || loadingItems.has(itemId)) return;
		fetchChildOUs(itemId).catch((_error) => {
			logger.error("Failed to load child organization units", {
				error: _error,
				parentId: itemId
			});
		});
	}, [
		loadedItems,
		loadingItems,
		fetchChildOUs,
		logger
	]);
	const handleEditClick = (0, react.useCallback)((_event, ou) => {
		(async () => {
			await navigate(`/organization-units/${ou.id}`);
		})().catch((_error) => {
			logger.error("Failed to navigate to organization unit", {
				error: _error,
				ouId: ou.id
			});
		});
	}, [navigate, logger]);
	const handleDeleteClick = (0, react.useCallback)((_event, ou) => {
		setSelectedOU(ou);
		setDeleteDialogOpen(true);
	}, []);
	const handleDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
		setSelectedOU(null);
	};
	const handleDeleteSuccess = (0, react.useCallback)(() => {
		resetTreeState();
		setSnackbar({
			open: true,
			message: t("organizationUnits:edit.general.dangerZone.delete.success"),
			severity: "success"
		});
	}, [resetTreeState, t]);
	const handleDeleteError = (0, react.useCallback)((message) => {
		setSnackbar({
			open: true,
			message,
			severity: "error"
		});
	}, []);
	const handleAddChildClick = (0, react.useCallback)((_event, ou) => {
		(async () => {
			await navigate("/organization-units/create", { state: {
				parentId: ou.id,
				parentName: ou.name,
				parentHandle: ou.handle
			} });
		})().catch((_error) => {
			logger.error("Failed to navigate to create child organization unit", {
				error: _error,
				parentId: ou.id
			});
		});
	}, [navigate, logger]);
	const handleAddRootClick = (0, react.useCallback)(() => {
		(async () => {
			await navigate("/organization-units/create");
		})().catch((_error) => {
			logger.error("Failed to navigate to create organization unit page", { error: _error });
		});
	}, [navigate, logger]);
	const combinedLoadMoreLoadingItems = (0, react.useMemo)(() => {
		if (!rootLoadMoreLoading) return loadMoreLoadingItems;
		const combined = new Set(loadMoreLoadingItems);
		combined.add(require_organization_unit_tree_constants.default.ROOT_PARENT_ID);
		return combined;
	}, [loadMoreLoadingItems, rootLoadMoreLoading]);
	const handleExpandedItemsChange = (0, react.useCallback)((_event, itemIds) => {
		const prevSet = new Set(expandedItems);
		setExpandedItems(itemIds.filter((id) => prevSet.has(id) || loadedItems.has(id)));
	}, [
		expandedItems,
		loadedItems,
		setExpandedItems
	]);
	const handleLoadMoreWithErrorLogging = (0, react.useCallback)((parentId) => {
		handleLoadMore(parentId).catch((_error) => {
			logger.error("Failed to load more child organization units", {
				error: _error,
				parentId
			});
		});
	}, [handleLoadMore, logger]);
	if (error) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			textAlign: "center",
			py: 8
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
			variant: "h6",
			color: "error",
			gutterBottom: true,
			children: t("organizationUnits:listing.error.title")
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
			variant: "body2",
			color: "text.secondary",
			children: error.message ?? t("organizationUnits:listing.error.unknown")
		})]
	});
	if (isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.PageLoadingAnimation, {});
	if (!treeItems.length) {
		if (data?.organizationUnits.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			sx: {
				textAlign: "center",
				py: 8
			},
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "body2",
				color: "text.secondary",
				sx: { mb: 2 },
				children: t("organizationUnits:listing.treeView.empty")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				role: "button",
				tabIndex: 0,
				onClick: handleAddRootClick,
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleAddRootClick();
					}
				},
				sx: {
					display: "inline-flex",
					alignItems: "center",
					gap: 1.5,
					border: "1px dashed",
					borderColor: theme.vars?.palette.primary.main,
					borderRadius: 1,
					py: 1,
					px: 2,
					cursor: "pointer",
					transition: "all 0.15s ease-in-out",
					"&:hover": {
						backgroundColor: theme.vars?.palette.primary.main,
						"& .add-root-avatar": {
							backgroundColor: theme.vars?.palette.primary.contrastText,
							color: theme.vars?.palette.primary.main
						},
						"& .add-root-text": { color: theme.vars?.palette.primary.contrastText }
					}
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Avatar, {
					className: "add-root-avatar",
					sx: {
						p: .5,
						backgroundColor: theme.vars?.palette.primary.main,
						color: theme.vars?.palette.primary.contrastText,
						width: 32,
						height: 32,
						fontSize: "0.875rem",
						transition: "all 0.15s ease-in-out"
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 14 })
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					className: "add-root-text",
					variant: "body2",
					sx: {
						fontWeight: 500,
						transition: "color 0.15s ease-in-out"
					},
					children: t("organizationUnits:listing.addRootOrganizationUnit")
				})]
			})]
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.PageLoadingAnimation, {});
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			sx: {
				width: "100%",
				minHeight: 400
			},
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
				role: "button",
				tabIndex: 0,
				onClick: handleAddRootClick,
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleAddRootClick();
					}
				},
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1.5,
					border: "1px dashed",
					borderColor: theme.vars?.palette.primary.main,
					borderRadius: 1,
					py: 1,
					pl: 5,
					pr: 1.5,
					mb: .75,
					cursor: "pointer",
					transition: "all 0.15s ease-in-out",
					"&:hover": {
						backgroundColor: theme.vars?.palette.primary.main,
						"& .add-root-avatar": {
							backgroundColor: theme.vars?.palette.primary.contrastText,
							color: theme.vars?.palette.primary.main
						},
						"& .add-root-text": { color: theme.vars?.palette.primary.contrastText }
					}
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Avatar, {
					className: "add-root-avatar",
					sx: {
						p: .5,
						backgroundColor: theme.vars?.palette.primary.main,
						color: theme.vars?.palette.primary.contrastText,
						width: 32,
						height: 32,
						fontSize: "0.875rem",
						transition: "all 0.15s ease-in-out"
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 14 })
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					className: "add-root-text",
					variant: "body2",
					sx: {
						fontWeight: 500,
						transition: "color 0.15s ease-in-out"
					},
					children: t("organizationUnits:listing.addRootOrganizationUnit")
				})]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TreeView.RichTreeView, {
				items: treeItems,
				expandedItems,
				onExpandedItemsChange: handleExpandedItemsChange,
				onItemExpansionToggle: handleItemExpansionToggle,
				disableSelection: true,
				slots: { item: CustomTreeItem },
				slotProps: { item: {
					onEdit: handleEditClick,
					onDelete: handleDeleteClick,
					onAddChild: handleAddChildClick,
					onLoadMore: handleLoadMoreWithErrorLogging,
					addChildTooltip: t("organizationUnits:listing.treeView.addChild"),
					addChildButtonText: t("organizationUnits:listing.treeView.addChildOrganizationUnit"),
					editTooltip: t("common:actions.edit"),
					deleteTooltip: t("common:actions.delete"),
					loadingItems,
					loadMoreLoadingItems: combinedLoadMoreLoadingItems,
					itemMap
				} },
				getItemLabel: (item) => item.label,
				sx: {
					"& .MuiTreeItem-root": { position: "relative" },
					"& .MuiTreeItem-content": {
						cursor: "pointer",
						border: "1px solid",
						borderColor: theme.vars?.palette.divider,
						py: 1,
						px: 1.5,
						mb: .75,
						transition: "all 0.15s ease-in-out",
						"&:hover": {
							backgroundColor: theme.vars?.palette.action.hover,
							borderColor: theme.vars?.palette.primary.main
						}
					},
					"& .MuiTreeItem-iconContainer": {
						color: theme.vars?.palette.text.secondary,
						mr: .5
					},
					"& .MuiTreeItem-groupTransition": {
						ml: 3,
						pl: 3,
						borderLeft: "1px dashed",
						borderColor: theme.vars?.palette.divider
					}
				}
			})]
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationUnitDeleteDialog.default, {
			open: deleteDialogOpen,
			organizationUnitId: selectedOU?.id ?? null,
			onClose: handleDeleteDialogClose,
			onSuccess: handleDeleteSuccess,
			onError: handleDeleteError
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Snackbar, {
			open: snackbar.open,
			autoHideDuration: 6e3,
			onClose: () => setSnackbar((prev) => ({
				...prev,
				open: false
			})),
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "right"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				onClose: () => setSnackbar((prev) => ({
					...prev,
					open: false
				})),
				severity: snackbar.severity,
				sx: { width: "100%" },
				children: snackbar.message
			})
		})
	] });
}

//#endregion
exports.default = OrganizationUnitsTreeView;