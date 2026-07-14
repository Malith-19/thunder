import fetchChildOrganizationUnits from "../api/fetchChildOrganizationUnits.js";
import fetchOrganizationUnits from "../api/fetchOrganizationUnits.js";
import organization_unit_query_keys_default from "../constants/organization-unit-query-keys.js";
import useGetChildOrganizationUnits from "../api/useGetChildOrganizationUnits.js";
import useGetOrganizationUnit from "../api/useGetOrganizationUnit.js";
import useGetOrganizationUnits from "../api/useGetOrganizationUnits.js";
import organization_unit_tree_constants_default from "../constants/organization-unit-tree-constants.js";
import appendTreeItemChildren from "../utils/appendTreeItemChildren.js";
import buildItemMap from "../utils/buildItemMap.js";
import buildTreeItems from "../utils/buildTreeItems.js";
import updateTreeItemChildren from "../utils/updateTreeItemChildren.js";
import { useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";
import { useTranslation } from "react-i18next";
import { Box, CircularProgress, TreeView, Typography, useTheme } from "@wso2/oxygen-ui";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { PageLoadingAnimation, ResourceAvatar } from "@thunderid/components";
import { useLogger } from "@thunderid/logger/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

//#region src/components/OrganizationUnitTreePicker.tsx
function PickerLoadingIcon() {
	return /* @__PURE__ */ jsx(CircularProgress, { size: 16 });
}
function PickerTreeItem(allProps) {
	const { itemMap: itemMapProp, loadingItems: loadingItemsProp, loadMoreLoadingItems: loadMoreLoadingItemsProp, onLoadMore: onLoadMoreProp, itemId, label,...restProps } = allProps;
	const treeItemProps = {
		itemId,
		label,
		...restProps
	};
	const theme = useTheme();
	const { t } = useTranslation();
	const labelStr = typeof label === "string" ? label : "";
	const itemData = itemMapProp?.get(itemId);
	const isLoadMoreItem = itemId.endsWith(organization_unit_tree_constants_default.LOAD_MORE_SUFFIX);
	const isEmptyPlaceholder = itemId.endsWith(organization_unit_tree_constants_default.EMPTY_SUFFIX);
	const isLoadingPlaceholder = !isEmptyPlaceholder && !isLoadMoreItem && (itemData?.isPlaceholder ?? itemId.endsWith(organization_unit_tree_constants_default.PLACEHOLDER_SUFFIX));
	const isItemLoading = loadingItemsProp?.has(itemId);
	if (isLoadMoreItem) {
		const parentId = itemId.replace(organization_unit_tree_constants_default.LOAD_MORE_SUFFIX, "");
		const isLoadingMore = loadMoreLoadingItemsProp?.has(parentId);
		return /* @__PURE__ */ jsx(TreeView.TreeItem, {
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
			label: /* @__PURE__ */ jsx(Box, {
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
				children: isLoadingMore ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CircularProgress, { size: 14 }), /* @__PURE__ */ jsx(Typography, {
					variant: "caption",
					color: "text.secondary",
					children: t("common:status.loading")
				})] }) : /* @__PURE__ */ jsx(Typography, {
					variant: "caption",
					color: "primary",
					sx: { fontWeight: 500 },
					children: t("organizationUnits:listing.treeView.loadMore")
				})
			})
		});
	}
	if (isEmptyPlaceholder) return /* @__PURE__ */ jsx(TreeView.TreeItem, {
		...treeItemProps,
		sx: { "& > .MuiTreeItem-content": {
			border: "none !important",
			backgroundColor: "transparent !important"
		} },
		label: /* @__PURE__ */ jsx(Typography, {
			variant: "caption",
			color: "text.secondary",
			sx: {
				fontStyle: "italic",
				pl: 1
			},
			children: labelStr
		})
	});
	if (isLoadingPlaceholder) return /* @__PURE__ */ jsx(TreeView.TreeItem, {
		...treeItemProps,
		sx: { "& > .MuiTreeItem-content": {
			border: "none !important",
			backgroundColor: "transparent !important"
		} },
		label: /* @__PURE__ */ jsxs(Box, {
			sx: {
				display: "flex",
				alignItems: "center",
				gap: 1
			},
			children: [/* @__PURE__ */ jsx(CircularProgress, { size: 16 }), /* @__PURE__ */ jsx(Typography, {
				variant: "caption",
				color: "text.secondary",
				sx: { fontStyle: "italic" },
				children: t("common:status.loading")
			})]
		})
	});
	return /* @__PURE__ */ jsx(TreeView.TreeItem, {
		...treeItemProps,
		...isItemLoading ? { slots: {
			collapseIcon: PickerLoadingIcon,
			expandIcon: PickerLoadingIcon
		} } : {},
		label: /* @__PURE__ */ jsxs(Box, {
			sx: {
				display: "flex",
				alignItems: "center",
				gap: 1.5
			},
			children: [/* @__PURE__ */ jsx(ResourceAvatar, {
				value: itemData?.logoUrl,
				size: 30,
				fallback: "emoji:🏛️"
			}), /* @__PURE__ */ jsxs(Box, {
				sx: {
					flexGrow: 1,
					minWidth: 0
				},
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					sx: {
						fontWeight: 500,
						lineHeight: 1.3
					},
					children: labelStr
				}), itemData?.handle && /* @__PURE__ */ jsx(Typography, {
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
	const theme = useTheme();
	const { t } = useTranslation();
	const logger = useLogger("OrganizationUnitTreePicker");
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { data, isLoading } = useGetOrganizationUnits(void 0, !rootOuId);
	const { data: rootOuData, isLoading: isRootOuLoading, error: rootOuError } = useGetOrganizationUnit(rootOuId);
	const { data: rootOuChildrenData, isLoading: isRootOuChildrenLoading, error: rootOuChildrenError } = useGetChildOrganizationUnits(rootOuId);
	const [treeItems, setTreeItems] = useState([]);
	const [expandedItems, setExpandedItems] = useState([]);
	const [loadedItems, setLoadedItems] = useState(/* @__PURE__ */ new Set());
	const [loadingItems, setLoadingItems] = useState(/* @__PURE__ */ new Set());
	const [loadMoreLoadingItems, setLoadMoreLoadingItems] = useState(/* @__PURE__ */ new Set());
	const [childOffsets, setChildOffsets] = useState(/* @__PURE__ */ new Map());
	const [rootOffset, setRootOffset] = useState(0);
	const [rootLoadMoreLoading, setRootLoadMoreLoading] = useState(false);
	const rootLoadMoreLoadingRef = useRef(false);
	rootLoadMoreLoadingRef.current = rootLoadMoreLoading;
	const loadingItemsRef = useRef(loadingItems);
	loadingItemsRef.current = loadingItems;
	const itemMap = useMemo(() => buildItemMap(treeItems), [treeItems]);
	useEffect(() => {
		setTreeItems([]);
		setExpandedItems([]);
		setLoadedItems(/* @__PURE__ */ new Set());
		setLoadingItems(/* @__PURE__ */ new Set());
		setLoadMoreLoadingItems(/* @__PURE__ */ new Set());
		setChildOffsets(/* @__PURE__ */ new Map());
		setRootOffset(0);
		setRootLoadMoreLoading(false);
	}, [rootOuId]);
	useEffect(() => {
		if (rootOuId) return;
		if (data?.organizationUnits && data.organizationUnits.length > 0 && treeItems.length === 0) {
			const items = buildTreeItems(data.organizationUnits);
			if (data.organizationUnits.length < data.totalResults) items.push({
				id: organization_unit_tree_constants_default.ROOT_LOAD_MORE_ID,
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
	useEffect(() => {
		if (!rootOuId || !rootOuData || !rootOuChildrenData || treeItems.length > 0) return;
		const childItems = buildTreeItems(rootOuChildrenData.organizationUnits);
		if (rootOuChildrenData.organizationUnits.length < rootOuChildrenData.totalResults) childItems.push({
			id: `${rootOuId}${organization_unit_tree_constants_default.LOAD_MORE_SUFFIX}`,
			label: "",
			handle: "",
			isPlaceholder: true
		});
		const rootChildren = rootOuChildrenData.organizationUnits.length > 0 ? childItems : [{
			id: `${rootOuId}${organization_unit_tree_constants_default.EMPTY_SUFFIX}`,
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
	const fetchChildPage = useCallback(async (parentId, offset) => queryClient.fetchQuery({
		queryKey: [
			organization_unit_query_keys_default.CHILD_ORGANIZATION_UNITS,
			parentId,
			{
				limit: organization_unit_tree_constants_default.PAGE_SIZE,
				offset
			}
		],
		queryFn: async () => fetchChildOrganizationUnits(http, getServerUrl(), parentId, {
			limit: organization_unit_tree_constants_default.PAGE_SIZE,
			offset
		}),
		staleTime: 0
	}), [
		getServerUrl,
		queryClient,
		http
	]);
	const buildChildItems = useCallback((parentId, result, offset) => {
		const childOUs = result.organizationUnits;
		if (childOUs.length === 0 && offset === 0) return [{
			id: `${parentId}${organization_unit_tree_constants_default.EMPTY_SUFFIX}`,
			label: t("organizationUnits:listing.treeView.noChildren"),
			handle: "",
			isPlaceholder: true
		}];
		const items = buildTreeItems(childOUs);
		if (offset + childOUs.length < result.totalResults) items.push({
			id: `${parentId}${organization_unit_tree_constants_default.LOAD_MORE_SUFFIX}`,
			label: "",
			handle: "",
			isPlaceholder: true
		});
		return items;
	}, [t]);
	const fetchChildOUs = useCallback(async (parentId) => {
		if (loadingItemsRef.current.has(parentId)) return;
		setLoadingItems((prev) => new Set(prev).add(parentId));
		try {
			const result = await fetchChildPage(parentId, 0);
			const childItems = buildChildItems(parentId, result, 0);
			setChildOffsets((prev) => new Map(prev).set(parentId, result.organizationUnits.length));
			setTreeItems((prev) => updateTreeItemChildren(prev, parentId, childItems));
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
	const handleRootLoadMore = useCallback(async () => {
		if (rootLoadMoreLoadingRef.current) return;
		setRootLoadMoreLoading(true);
		try {
			const result = await queryClient.fetchQuery({
				queryKey: [organization_unit_query_keys_default.ORGANIZATION_UNITS, {
					limit: organization_unit_tree_constants_default.PAGE_SIZE,
					offset: rootOffset
				}],
				queryFn: async () => fetchOrganizationUnits(http, getServerUrl(), {
					limit: organization_unit_tree_constants_default.PAGE_SIZE,
					offset: rootOffset
				}),
				staleTime: 0
			});
			const newItems = buildTreeItems(result.organizationUnits);
			const loadedSoFar = rootOffset + result.organizationUnits.length;
			if (loadedSoFar < result.totalResults) newItems.push({
				id: organization_unit_tree_constants_default.ROOT_LOAD_MORE_ID,
				label: "",
				handle: "",
				isPlaceholder: true
			});
			setRootOffset(loadedSoFar);
			setTreeItems((prev) => {
				return [...prev.filter((item) => item.id !== organization_unit_tree_constants_default.ROOT_LOAD_MORE_ID), ...newItems];
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
	const handleLoadMore = useCallback(async (parentId) => {
		if (parentId === organization_unit_tree_constants_default.ROOT_PARENT_ID) {
			await handleRootLoadMore();
			return;
		}
		setLoadMoreLoadingItems((prev) => new Set(prev).add(parentId));
		try {
			const offset = childOffsets.get(parentId) ?? organization_unit_tree_constants_default.PAGE_SIZE;
			const result = await fetchChildPage(parentId, offset);
			const newItems = buildChildItems(parentId, result, offset);
			setChildOffsets((prev) => new Map(prev).set(parentId, offset + result.organizationUnits.length));
			setTreeItems((prev) => appendTreeItemChildren(prev, parentId, newItems));
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
	const combinedLoadMoreLoadingItems = useMemo(() => {
		if (!rootLoadMoreLoading) return loadMoreLoadingItems;
		const combined = new Set(loadMoreLoadingItems);
		combined.add(organization_unit_tree_constants_default.ROOT_PARENT_ID);
		return combined;
	}, [loadMoreLoadingItems, rootLoadMoreLoading]);
	const handleItemExpansionToggle = useCallback((_event, itemId, isExpanded) => {
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
	const handleSelectedItemsChange = useCallback((_event, itemId) => {
		if (itemId && !itemId.endsWith(organization_unit_tree_constants_default.PLACEHOLDER_SUFFIX) && !itemId.endsWith(organization_unit_tree_constants_default.EMPTY_SUFFIX) && !itemId.endsWith(organization_unit_tree_constants_default.LOAD_MORE_SUFFIX)) onChange(itemId);
	}, [onChange]);
	const handleExpandedItemsChange = useCallback((_event, itemIds) => {
		const prevSet = new Set(expandedItems);
		setExpandedItems(itemIds.filter((itemId) => prevSet.has(itemId) || loadedItems.has(itemId)));
	}, [expandedItems, loadedItems]);
	const handleLoadMoreWithErrorLogging = useCallback((parentId) => {
		handleLoadMore(parentId).catch((_error) => {
			logger.error("Failed to load more child organization units", {
				error: _error,
				parentId
			});
		});
	}, [handleLoadMore, logger]);
	const isTreeLoading = rootOuId ? isRootOuLoading || isRootOuChildrenLoading : isLoading;
	const rootedModeError = rootOuId ? rootOuError ?? rootOuChildrenError : null;
	if (isTreeLoading) return /* @__PURE__ */ jsx(PageLoadingAnimation, {});
	if (rootedModeError) return /* @__PURE__ */ jsx(Typography, {
		variant: "body2",
		color: "error",
		children: rootedModeError.message ?? t("organizationUnits:treePicker.error")
	});
	if (!rootOuId && data?.organizationUnits.length === 0) return /* @__PURE__ */ jsx(Typography, {
		variant: "body2",
		color: "text.secondary",
		children: t("organizationUnits:treePicker.empty")
	});
	return /* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Box, {
		sx: {
			maxHeight,
			overflow: "auto"
		},
		children: /* @__PURE__ */ jsx(TreeView.RichTreeView, {
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
	}), helperText && /* @__PURE__ */ jsx(Typography, {
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
export { OrganizationUnitTreePicker as default };