const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_fetchChildOrganizationUnits = require('../api/fetchChildOrganizationUnits.cjs');
const require_fetchOrganizationUnits = require('../api/fetchOrganizationUnits.cjs');
const require_organization_unit_query_keys = require('../constants/organization-unit-query-keys.cjs');
const require_useGetChildOrganizationUnits = require('../api/useGetChildOrganizationUnits.cjs');
const require_useGetOrganizationUnit = require('../api/useGetOrganizationUnit.cjs');
const require_useGetOrganizationUnits = require('../api/useGetOrganizationUnits.cjs');
const require_organization_unit_tree_constants = require('../constants/organization-unit-tree-constants.cjs');
const require_appendTreeItemChildren = require('../utils/appendTreeItemChildren.cjs');
const require_buildItemMap = require('../utils/buildItemMap.cjs');
const require_buildTreeItems = require('../utils/buildTreeItems.cjs');
const require_updateTreeItemChildren = require('../utils/updateTreeItemChildren.cjs');
let __thunderid_react = require("@thunderid/react");
__thunderid_react = require_rolldown_runtime.__toESM(__thunderid_react);
let __tanstack_react_query = require("@tanstack/react-query");
__tanstack_react_query = require_rolldown_runtime.__toESM(__tanstack_react_query);
let __thunderid_contexts = require("@thunderid/contexts");
__thunderid_contexts = require_rolldown_runtime.__toESM(__thunderid_contexts);
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
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/components/OrganizationUnitTreePicker.tsx
function PickerLoadingIcon() {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 16 });
}
function PickerTreeItem(allProps) {
	const { itemMap: itemMapProp, loadingItems: loadingItemsProp, loadMoreLoadingItems: loadMoreLoadingItemsProp, onLoadMore: onLoadMoreProp, itemId, label,...restProps } = allProps;
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
	const isEmptyPlaceholder = itemId.endsWith(require_organization_unit_tree_constants.default.EMPTY_SUFFIX);
	const isLoadingPlaceholder = !isEmptyPlaceholder && !isLoadMoreItem && (itemData?.isPlaceholder ?? itemId.endsWith(require_organization_unit_tree_constants.default.PLACEHOLDER_SUFFIX));
	const isItemLoading = loadingItemsProp?.has(itemId);
	if (isLoadMoreItem) {
		const parentId = itemId.replace(require_organization_unit_tree_constants.default.LOAD_MORE_SUFFIX, "");
		const isLoadingMore = loadMoreLoadingItemsProp?.has(parentId);
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TreeView.TreeItem, {
			...treeItemProps,
			sx: { "& > .MuiTreeItem-content": {
				border: "1px dashed",
				borderColor: theme.vars?.palette.divider,
				borderRadius: .5,
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
	if (isEmptyPlaceholder) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TreeView.TreeItem, {
		...treeItemProps,
		sx: { "& > .MuiTreeItem-content": {
			border: "none !important",
			backgroundColor: "transparent !important"
		} },
		label: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
			variant: "caption",
			color: "text.secondary",
			sx: {
				fontStyle: "italic",
				pl: 1
			},
			children: labelStr
		})
	});
	if (isLoadingPlaceholder) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TreeView.TreeItem, {
		...treeItemProps,
		sx: { "& > .MuiTreeItem-content": {
			border: "none !important",
			backgroundColor: "transparent !important"
		} },
		label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			sx: {
				display: "flex",
				alignItems: "center",
				gap: 1
			},
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "caption",
				color: "text.secondary",
				sx: { fontStyle: "italic" },
				children: t("common:status.loading")
			})]
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TreeView.TreeItem, {
		...treeItemProps,
		...isItemLoading ? { slots: {
			collapseIcon: PickerLoadingIcon,
			expandIcon: PickerLoadingIcon
		} } : {},
		label: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			sx: {
				display: "flex",
				alignItems: "center",
				gap: 1.5
			},
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.ResourceAvatar, {
				value: itemData?.logoUrl,
				size: 30,
				fallback: "emoji:🏛️"
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
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
			})]
		})
	});
}
function OrganizationUnitTreePicker({ id = void 0, value, onChange, error = false, helperText = "", rootOuId = void 0, maxHeight = 300 }) {
	const theme = (0, __wso2_oxygen_ui.useTheme)();
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("OrganizationUnitTreePicker");
	const { http } = (0, __thunderid_react.useThunderID)();
	const { getServerUrl } = (0, __thunderid_contexts.useConfig)();
	const queryClient = (0, __tanstack_react_query.useQueryClient)();
	const { data, isLoading } = require_useGetOrganizationUnits.default(void 0, !rootOuId);
	const { data: rootOuData, isLoading: isRootOuLoading, error: rootOuError } = require_useGetOrganizationUnit.default(rootOuId);
	const { data: rootOuChildrenData, isLoading: isRootOuChildrenLoading, error: rootOuChildrenError } = require_useGetChildOrganizationUnits.default(rootOuId);
	const [treeItems, setTreeItems] = (0, react.useState)([]);
	const [expandedItems, setExpandedItems] = (0, react.useState)([]);
	const [loadedItems, setLoadedItems] = (0, react.useState)(/* @__PURE__ */ new Set());
	const [loadingItems, setLoadingItems] = (0, react.useState)(/* @__PURE__ */ new Set());
	const [loadMoreLoadingItems, setLoadMoreLoadingItems] = (0, react.useState)(/* @__PURE__ */ new Set());
	const [childOffsets, setChildOffsets] = (0, react.useState)(/* @__PURE__ */ new Map());
	const [rootOffset, setRootOffset] = (0, react.useState)(0);
	const [rootLoadMoreLoading, setRootLoadMoreLoading] = (0, react.useState)(false);
	const rootLoadMoreLoadingRef = (0, react.useRef)(false);
	rootLoadMoreLoadingRef.current = rootLoadMoreLoading;
	const loadingItemsRef = (0, react.useRef)(loadingItems);
	loadingItemsRef.current = loadingItems;
	const itemMap = (0, react.useMemo)(() => require_buildItemMap.default(treeItems), [treeItems]);
	(0, react.useEffect)(() => {
		setTreeItems([]);
		setExpandedItems([]);
		setLoadedItems(/* @__PURE__ */ new Set());
		setLoadingItems(/* @__PURE__ */ new Set());
		setLoadMoreLoadingItems(/* @__PURE__ */ new Set());
		setChildOffsets(/* @__PURE__ */ new Map());
		setRootOffset(0);
		setRootLoadMoreLoading(false);
	}, [rootOuId]);
	(0, react.useEffect)(() => {
		if (rootOuId) return;
		if (data?.organizationUnits && data.organizationUnits.length > 0 && treeItems.length === 0) {
			const items = require_buildTreeItems.default(data.organizationUnits);
			if (data.organizationUnits.length < data.totalResults) items.push({
				id: require_organization_unit_tree_constants.default.ROOT_LOAD_MORE_ID,
				label: "",
				handle: "",
				isPlaceholder: true
			});
			setRootOffset(data.organizationUnits.length);
			setTreeItems(items);
		}
	}, [
		rootOuId,
		data,
		treeItems.length
	]);
	(0, react.useEffect)(() => {
		if (!rootOuId || !rootOuData || !rootOuChildrenData || treeItems.length > 0) return;
		const childItems = require_buildTreeItems.default(rootOuChildrenData.organizationUnits);
		if (rootOuChildrenData.organizationUnits.length < rootOuChildrenData.totalResults) childItems.push({
			id: `${rootOuId}${require_organization_unit_tree_constants.default.LOAD_MORE_SUFFIX}`,
			label: "",
			handle: "",
			isPlaceholder: true
		});
		const rootChildren = rootOuChildrenData.organizationUnits.length > 0 ? childItems : [{
			id: `${rootOuId}${require_organization_unit_tree_constants.default.EMPTY_SUFFIX}`,
			label: t("organizationUnits:listing.treeView.noChildren"),
			handle: "",
			isPlaceholder: true
		}];
		const rootItem = {
			id: rootOuData.id,
			label: rootOuData.name,
			handle: rootOuData.handle,
			description: rootOuData.description ?? void 0,
			logoUrl: rootOuData.logoUrl,
			children: rootChildren
		};
		setChildOffsets((prev) => new Map(prev).set(rootOuId, rootOuChildrenData.organizationUnits.length));
		setLoadedItems((prev) => new Set(prev).add(rootOuId));
		setExpandedItems([rootOuId]);
		setTreeItems([rootItem]);
	}, [
		rootOuId,
		rootOuData,
		rootOuChildrenData,
		treeItems.length,
		t
	]);
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
	const buildChildItems = (0, react.useCallback)((parentId, result, offset) => {
		const childOUs = result.organizationUnits;
		if (childOUs.length === 0 && offset === 0) return [{
			id: `${parentId}${require_organization_unit_tree_constants.default.EMPTY_SUFFIX}`,
			label: t("organizationUnits:listing.treeView.noChildren"),
			handle: "",
			isPlaceholder: true
		}];
		const items = require_buildTreeItems.default(childOUs);
		if (offset + childOUs.length < result.totalResults) items.push({
			id: `${parentId}${require_organization_unit_tree_constants.default.LOAD_MORE_SUFFIX}`,
			label: "",
			handle: "",
			isPlaceholder: true
		});
		return items;
	}, [t]);
	const fetchChildOUs = (0, react.useCallback)(async (parentId) => {
		if (loadingItemsRef.current.has(parentId)) return;
		setLoadingItems((prev) => new Set(prev).add(parentId));
		try {
			const result = await fetchChildPage(parentId, 0);
			const childItems = buildChildItems(parentId, result, 0);
			setChildOffsets((prev) => new Map(prev).set(parentId, result.organizationUnits.length));
			setTreeItems((prev) => require_updateTreeItemChildren.default(prev, parentId, childItems));
			setLoadedItems((prev) => new Set(prev).add(parentId));
			setExpandedItems((prev) => prev.includes(parentId) ? prev : [...prev, parentId]);
		} catch (_error) {
			logger.error("Failed to load child organization units", {
				error: _error,
				parentId
			});
		} finally {
			setLoadingItems((prev) => {
				const next = new Set(prev);
				next.delete(parentId);
				return next;
			});
		}
	}, [
		fetchChildPage,
		buildChildItems,
		logger
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
			const newItems = buildChildItems(parentId, result, offset);
			setChildOffsets((prev) => new Map(prev).set(parentId, offset + result.organizationUnits.length));
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
		buildChildItems,
		logger,
		handleRootLoadMore
	]);
	const combinedLoadMoreLoadingItems = (0, react.useMemo)(() => {
		if (!rootLoadMoreLoading) return loadMoreLoadingItems;
		const combined = new Set(loadMoreLoadingItems);
		combined.add(require_organization_unit_tree_constants.default.ROOT_PARENT_ID);
		return combined;
	}, [loadMoreLoadingItems, rootLoadMoreLoading]);
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
	const handleSelectedItemsChange = (0, react.useCallback)((_event, itemId) => {
		if (itemId && !itemId.endsWith(require_organization_unit_tree_constants.default.PLACEHOLDER_SUFFIX) && !itemId.endsWith(require_organization_unit_tree_constants.default.EMPTY_SUFFIX) && !itemId.endsWith(require_organization_unit_tree_constants.default.LOAD_MORE_SUFFIX)) onChange(itemId);
	}, [onChange]);
	const handleExpandedItemsChange = (0, react.useCallback)((_event, itemIds) => {
		const prevSet = new Set(expandedItems);
		setExpandedItems(itemIds.filter((itemId) => prevSet.has(itemId) || loadedItems.has(itemId)));
	}, [expandedItems, loadedItems]);
	const handleLoadMoreWithErrorLogging = (0, react.useCallback)((parentId) => {
		handleLoadMore(parentId).catch((_error) => {
			logger.error("Failed to load more child organization units", {
				error: _error,
				parentId
			});
		});
	}, [handleLoadMore, logger]);
	const isTreeLoading = rootOuId ? isRootOuLoading || isRootOuChildrenLoading : isLoading;
	const rootedModeError = rootOuId ? rootOuError ?? rootOuChildrenError : null;
	if (isTreeLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.PageLoadingAnimation, {});
	if (rootedModeError) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
		variant: "body2",
		color: "error",
		children: rootedModeError.message ?? t("organizationUnits:treePicker.error")
	});
	if (!rootOuId && data?.organizationUnits.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
		variant: "body2",
		color: "text.secondary",
		children: t("organizationUnits:treePicker.empty")
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		sx: {
			maxHeight,
			overflow: "auto"
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TreeView.RichTreeView, {
			id,
			items: treeItems,
			expandedItems,
			onExpandedItemsChange: handleExpandedItemsChange,
			onItemExpansionToggle: handleItemExpansionToggle,
			selectedItems: value || null,
			onSelectedItemsChange: handleSelectedItemsChange,
			slots: { item: PickerTreeItem },
			slotProps: { item: {
				itemMap,
				loadingItems,
				loadMoreLoadingItems: combinedLoadMoreLoadingItems,
				onLoadMore: handleLoadMoreWithErrorLogging
			} },
			getItemLabel: (item) => item.label,
			sx: {
				"& .MuiTreeItem-content": {
					cursor: "pointer",
					border: "1px solid",
					borderColor: theme.vars?.palette.divider,
					borderRadius: .5,
					py: .75,
					px: 1,
					mb: .5,
					transition: "all 0.15s ease-in-out",
					"&:hover": {
						backgroundColor: theme.vars?.palette.action.hover,
						borderColor: theme.vars?.palette.primary.main
					}
				},
				"& .Mui-selected > .MuiTreeItem-content": {
					backgroundColor: `${theme.vars?.palette.primary.main}14`,
					borderColor: theme.vars?.palette.primary.main
				},
				"& .MuiTreeItem-iconContainer": {
					color: theme.vars?.palette.text.secondary,
					mr: .5
				},
				"& .MuiTreeItem-groupTransition": {
					ml: 2,
					pl: 2,
					borderLeft: "1px dashed",
					borderColor: theme.vars?.palette.divider
				}
			}
		})
	}), helperText && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
		variant: "caption",
		color: error ? "error" : "text.secondary",
		sx: {
			mt: .5,
			ml: 1.75
		},
		children: helperText
	})] });
}

//#endregion
exports.default = OrganizationUnitTreePicker;