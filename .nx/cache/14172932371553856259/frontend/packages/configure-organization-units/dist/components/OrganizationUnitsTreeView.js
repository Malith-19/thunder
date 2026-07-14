import fetchChildOrganizationUnits from "../api/fetchChildOrganizationUnits.js";
import fetchOrganizationUnits from "../api/fetchOrganizationUnits.js";
import organization_unit_query_keys_default from "../constants/organization-unit-query-keys.js";
import useGetOrganizationUnits from "../api/useGetOrganizationUnits.js";
import OrganizationUnitDeleteDialog from "./OrganizationUnitDeleteDialog.js";
import organization_unit_tree_constants_default from "../constants/organization-unit-tree-constants.js";
import useOrganizationUnit from "../contexts/useOrganizationUnit.js";
import appendTreeItemChildren from "../utils/appendTreeItemChildren.js";
import buildItemMap from "../utils/buildItemMap.js";
import buildTreeItems from "../utils/buildTreeItems.js";
import findTreeItem from "../utils/findTreeItem.js";
import updateTreeItemChildren from "../utils/updateTreeItemChildren.js";
import { useQueryClient } from "@tanstack/react-query";
import { useConfig } from "@thunderid/contexts";
import { useThunderID } from "@thunderid/react";
import { useTranslation } from "react-i18next";
import { Alert, Avatar, Box, CircularProgress, IconButton, Snackbar, Tooltip, TreeView, Typography, useTheme } from "@wso2/oxygen-ui";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { PageLoadingAnimation, ResourceAvatar } from "@thunderid/components";
import { useLogger } from "@thunderid/logger/react";
import { Eye, Pencil, Plus, Trash2 } from "@wso2/oxygen-ui-icons-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";

//#region src/components/OrganizationUnitsTreeView.tsx
function TreeViewLoadingIcon() {
	return /* @__PURE__ */ jsx(CircularProgress, { size: 18 });
}
function buildAddChildItem(parentId, parentName, parentHandle) {
	return {
		id: `${parentId}${organization_unit_tree_constants_default.ADD_CHILD_SUFFIX}`,
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
	const theme = useTheme();
	const { t } = useTranslation();
	const labelStr = typeof label === "string" ? label : "";
	const itemData = itemMapProp?.get(itemId);
	const isLoadMoreItem = itemId.endsWith(organization_unit_tree_constants_default.LOAD_MORE_SUFFIX);
	const isAddChildButton = itemId.endsWith(organization_unit_tree_constants_default.ADD_CHILD_SUFFIX);
	const isPlaceholder = !isAddChildButton && !isLoadMoreItem && (itemData?.isPlaceholder ?? (itemId.endsWith(organization_unit_tree_constants_default.PLACEHOLDER_SUFFIX) || itemId.endsWith(organization_unit_tree_constants_default.ERROR_SUFFIX) || itemId.endsWith(organization_unit_tree_constants_default.EMPTY_SUFFIX)));
	const isItemLoading = loadingItemsProp?.has(itemId);
	if (isLoadMoreItem) {
		const parentId = itemId.replace(organization_unit_tree_constants_default.LOAD_MORE_SUFFIX, "");
		const isLoadingMore = loadMoreLoadingItemsProp?.has(parentId);
		return /* @__PURE__ */ jsx(TreeView.TreeItem, {
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
	if (isAddChildButton) {
		const parentId = itemId.replace(organization_unit_tree_constants_default.ADD_CHILD_SUFFIX, "");
		const parentItem = itemMapProp?.get(parentId);
		return /* @__PURE__ */ jsx(TreeView.TreeItem, {
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
			label: /* @__PURE__ */ jsxs(Box, {
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
				children: [/* @__PURE__ */ jsx(Avatar, {
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
					children: /* @__PURE__ */ jsx(Plus, { size: 14 })
				}), /* @__PURE__ */ jsx(Typography, {
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
		const isLoadingPlaceholder = itemId.endsWith(organization_unit_tree_constants_default.PLACEHOLDER_SUFFIX);
		const isErrorPlaceholder = itemId.endsWith(organization_unit_tree_constants_default.ERROR_SUFFIX);
		return /* @__PURE__ */ jsx(TreeView.TreeItem, {
			...treeItemProps,
			sx: { "& > .MuiTreeItem-content": {
				border: "none !important",
				backgroundColor: "transparent !important"
			} },
			label: /* @__PURE__ */ jsx(Box, {
				sx: {
					display: "flex",
					alignItems: "center",
					gap: 1
				},
				children: isLoadingPlaceholder ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CircularProgress, { size: 16 }), /* @__PURE__ */ jsx(Typography, {
					variant: "caption",
					color: "text.secondary",
					sx: { fontStyle: "italic" },
					children: "Loading..."
				})] }) : /* @__PURE__ */ jsx(Typography, {
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
	return /* @__PURE__ */ jsx(TreeView.TreeItem, {
		...treeItemProps,
		...isItemLoading ? { slots: {
			collapseIcon: TreeViewLoadingIcon,
			expandIcon: TreeViewLoadingIcon
		} } : {},
		label: /* @__PURE__ */ jsxs(Box, {
			sx: {
				display: "flex",
				alignItems: "center",
				gap: 1.5
			},
			children: [
				/* @__PURE__ */ jsx(ResourceAvatar, {
					value: itemData?.logoUrl,
					size: 30,
					fallback: "emoji:🏛️"
				}),
				/* @__PURE__ */ jsxs(Box, {
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
				}),
				itemData?.isReadOnly ? /* @__PURE__ */ jsx(Tooltip, {
					title: t("common:status.readOnly", "Read Only"),
					children: /* @__PURE__ */ jsx(IconButton, {
						size: "small",
						disableRipple: true,
						sx: { cursor: "default" },
						children: /* @__PURE__ */ jsx(Eye, { size: 16 })
					})
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx(Tooltip, {
						title: addChildTooltip,
						children: /* @__PURE__ */ jsx(IconButton, {
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
							children: /* @__PURE__ */ jsx(Plus, { size: 16 })
						})
					}),
					/* @__PURE__ */ jsx(Tooltip, {
						title: editTooltip,
						children: /* @__PURE__ */ jsx(IconButton, {
							size: "small",
							"aria-label": editTooltip,
							onClick: (e) => {
								e.stopPropagation();
								onEdit?.(e, {
									id: itemId,
									name: labelStr
								});
							},
							children: /* @__PURE__ */ jsx(Pencil, { size: 16 })
						})
					}),
					/* @__PURE__ */ jsx(Tooltip, {
						title: deleteTooltip,
						children: /* @__PURE__ */ jsx(IconButton, {
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
							children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
						})
					})
				] })
			]
		})
	});
}
function OrganizationUnitsTreeView() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const logger = useLogger("OrganizationUnitsTreeView");
	const { http } = useThunderID();
	const { getServerUrl } = useConfig();
	const queryClient = useQueryClient();
	const { data, isLoading, error } = useGetOrganizationUnits();
	const { treeItems, setTreeItems, expandedItems, setExpandedItems, loadedItems, setLoadedItems, resetTreeState } = useOrganizationUnit();
	const itemMap = useMemo(() => buildItemMap(treeItems), [treeItems]);
	const [loadingItems, setLoadingItems] = useState(/* @__PURE__ */ new Set());
	const [loadMoreLoadingItems, setLoadMoreLoadingItems] = useState(/* @__PURE__ */ new Set());
	const [childOffsets, setChildOffsets] = useState(/* @__PURE__ */ new Map());
	const [rootOffset, setRootOffset] = useState(0);
	const [rootLoadMoreLoading, setRootLoadMoreLoading] = useState(false);
	const rootLoadMoreLoadingRef = useRef(false);
	rootLoadMoreLoadingRef.current = rootLoadMoreLoading;
	const loadingItemsRef = useRef(loadingItems);
	loadingItemsRef.current = loadingItems;
	const expandedItemsRef = useRef(expandedItems);
	expandedItemsRef.current = expandedItems;
	const treeItemsRef = useRef(treeItems);
	treeItemsRef.current = treeItems;
	const rebuildIdRef = useRef(0);
	const builtFromDataRef = useRef(null);
	const [selectedOU, setSelectedOU] = useState(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success"
	});
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
	const fetchChildItems = useCallback(async (parentId) => {
		const result = await fetchChildPage(parentId, 0);
		const childOUs = result.organizationUnits;
		const parentItem = findTreeItem(treeItemsRef.current, parentId);
		const addChildItem = buildAddChildItem(parentId, parentItem?.label ?? "", parentItem?.handle ?? "");
		const items = childOUs.length > 0 ? [addChildItem, ...buildTreeItems(childOUs)] : [addChildItem];
		if (childOUs.length < result.totalResults) items.push({
			id: `${parentId}${organization_unit_tree_constants_default.LOAD_MORE_SUFFIX}`,
			label: "",
			handle: "",
			isPlaceholder: true
		});
		return items;
	}, [fetchChildPage]);
	const fetchChildOUs = useCallback(async (parentId) => {
		if (loadingItemsRef.current.has(parentId)) return;
		setLoadingItems((prev) => new Set(prev).add(parentId));
		try {
			const childItems = await fetchChildItems(parentId);
			setChildOffsets((prev) => new Map(prev).set(parentId, childItems.filter((c) => !c.isPlaceholder).length));
			setTreeItems((prev) => updateTreeItemChildren(prev, parentId, childItems));
			setLoadedItems((prev) => new Set(prev).add(parentId));
			setExpandedItems((prev) => prev.includes(parentId) ? prev : [...prev, parentId]);
		} catch (_error) {
			logger.error("Failed to load child organization units", {
				error: _error,
				parentId
			});
			const errorItem = {
				id: `${parentId}${organization_unit_tree_constants_default.ERROR_SUFFIX}`,
				label: t("organizationUnits:listing.treeView.loadError"),
				handle: "",
				isPlaceholder: true
			};
			setTreeItems((prev) => updateTreeItemChildren(prev, parentId, [errorItem]));
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
		setTreeItems,
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
			const childOUs = result.organizationUnits;
			const newItems = buildTreeItems(childOUs);
			const loadedSoFar = offset + childOUs.length;
			if (loadedSoFar < result.totalResults) newItems.push({
				id: `${parentId}${organization_unit_tree_constants_default.LOAD_MORE_SUFFIX}`,
				label: "",
				handle: "",
				isPlaceholder: true
			});
			setChildOffsets((prev) => new Map(prev).set(parentId, loadedSoFar));
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
		setTreeItems,
		logger,
		handleRootLoadMore
	]);
	const expandLevel = useCallback((tree, levelIds, expandedSet, loaded) => {
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
				updatedTree = updateTreeItemChildren(updatedTree, r.parentId, r.children);
				nextLoaded.add(r.parentId);
				r.children.filter((child) => !child.isPlaceholder && expandedSet.has(child.id)).forEach((child) => {
					nextLevelIds.push(child.id);
				});
			});
			return expandLevel(updatedTree, nextLevelIds, expandedSet, nextLoaded);
		});
	}, [fetchChildItems]);
	const rebuildTree = useCallback((rootOUs, expandedIds) => {
		const rootTree = buildTreeItems(rootOUs);
		const expandedSet = new Set(expandedIds);
		return expandLevel(rootTree, rootTree.map((item) => item.id).filter((id) => expandedSet.has(id)), expandedSet, /* @__PURE__ */ new Set());
	}, [expandLevel]);
	const buildRootTreeItems = useCallback((response) => {
		const items = buildTreeItems(response.organizationUnits);
		if (response.organizationUnits.length < response.totalResults) items.push({
			id: organization_unit_tree_constants_default.ROOT_LOAD_MORE_ID,
			label: "",
			handle: "",
			isPlaceholder: true
		});
		setRootOffset(response.organizationUnits.length);
		return items;
	}, []);
	useEffect(() => {
		if (!data?.organizationUnits || data.organizationUnits.length === 0) return;
		if (treeItems.length > 0 && builtFromDataRef.current === data) return;
		const currentExpanded = expandedItemsRef.current;
		rebuildIdRef.current += 1;
		const id = rebuildIdRef.current;
		if (currentExpanded.length > 0) rebuildTree(data.organizationUnits, currentExpanded).then(({ tree, loaded }) => {
			if (rebuildIdRef.current === id) {
				const items = tree;
				if (data.organizationUnits.length < data.totalResults) items.push({
					id: organization_unit_tree_constants_default.ROOT_LOAD_MORE_ID,
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
	useEffect(() => {
		if (treeItems.length === 0) builtFromDataRef.current = null;
	}, [treeItems.length]);
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
	const handleEditClick = useCallback((_event, ou) => {
		(async () => {
			await navigate(`/organization-units/${ou.id}`);
		})().catch((_error) => {
			logger.error("Failed to navigate to organization unit", {
				error: _error,
				ouId: ou.id
			});
		});
	}, [navigate, logger]);
	const handleDeleteClick = useCallback((_event, ou) => {
		setSelectedOU(ou);
		setDeleteDialogOpen(true);
	}, []);
	const handleDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
		setSelectedOU(null);
	};
	const handleDeleteSuccess = useCallback(() => {
		resetTreeState();
		setSnackbar({
			open: true,
			message: t("organizationUnits:edit.general.dangerZone.delete.success"),
			severity: "success"
		});
	}, [resetTreeState, t]);
	const handleDeleteError = useCallback((message) => {
		setSnackbar({
			open: true,
			message,
			severity: "error"
		});
	}, []);
	const handleAddChildClick = useCallback((_event, ou) => {
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
	const handleAddRootClick = useCallback(() => {
		(async () => {
			await navigate("/organization-units/create");
		})().catch((_error) => {
			logger.error("Failed to navigate to create organization unit page", { error: _error });
		});
	}, [navigate, logger]);
	const combinedLoadMoreLoadingItems = useMemo(() => {
		if (!rootLoadMoreLoading) return loadMoreLoadingItems;
		const combined = new Set(loadMoreLoadingItems);
		combined.add(organization_unit_tree_constants_default.ROOT_PARENT_ID);
		return combined;
	}, [loadMoreLoadingItems, rootLoadMoreLoading]);
	const handleExpandedItemsChange = useCallback((_event, itemIds) => {
		const prevSet = new Set(expandedItems);
		setExpandedItems(itemIds.filter((id) => prevSet.has(id) || loadedItems.has(id)));
	}, [
		expandedItems,
		loadedItems,
		setExpandedItems
	]);
	const handleLoadMoreWithErrorLogging = useCallback((parentId) => {
		handleLoadMore(parentId).catch((_error) => {
			logger.error("Failed to load more child organization units", {
				error: _error,
				parentId
			});
		});
	}, [handleLoadMore, logger]);
	if (error) return /* @__PURE__ */ jsxs(Box, {
		sx: {
			textAlign: "center",
			py: 8
		},
		children: [/* @__PURE__ */ jsx(Typography, {
			variant: "h6",
			color: "error",
			gutterBottom: true,
			children: t("organizationUnits:listing.error.title")
		}), /* @__PURE__ */ jsx(Typography, {
			variant: "body2",
			color: "text.secondary",
			children: error.message ?? t("organizationUnits:listing.error.unknown")
		})]
	});
	if (isLoading) return /* @__PURE__ */ jsx(PageLoadingAnimation, {});
	if (!treeItems.length) {
		if (data?.organizationUnits.length === 0) return /* @__PURE__ */ jsxs(Box, {
			sx: {
				textAlign: "center",
				py: 8
			},
			children: [/* @__PURE__ */ jsx(Typography, {
				variant: "body2",
				color: "text.secondary",
				sx: { mb: 2 },
				children: t("organizationUnits:listing.treeView.empty")
			}), /* @__PURE__ */ jsxs(Box, {
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
				children: [/* @__PURE__ */ jsx(Avatar, {
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
					children: /* @__PURE__ */ jsx(Plus, { size: 14 })
				}), /* @__PURE__ */ jsx(Typography, {
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
		return /* @__PURE__ */ jsx(PageLoadingAnimation, {});
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs(Box, {
			sx: {
				width: "100%",
				minHeight: 400
			},
			children: [/* @__PURE__ */ jsxs(Box, {
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
				children: [/* @__PURE__ */ jsx(Avatar, {
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
					children: /* @__PURE__ */ jsx(Plus, { size: 14 })
				}), /* @__PURE__ */ jsx(Typography, {
					className: "add-root-text",
					variant: "body2",
					sx: {
						fontWeight: 500,
						transition: "color 0.15s ease-in-out"
					},
					children: t("organizationUnits:listing.addRootOrganizationUnit")
				})]
			}), /* @__PURE__ */ jsx(TreeView.RichTreeView, {
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
		/* @__PURE__ */ jsx(OrganizationUnitDeleteDialog, {
			open: deleteDialogOpen,
			organizationUnitId: selectedOU?.id ?? null,
			onClose: handleDeleteDialogClose,
			onSuccess: handleDeleteSuccess,
			onError: handleDeleteError
		}),
		/* @__PURE__ */ jsx(Snackbar, {
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
			children: /* @__PURE__ */ jsx(Alert, {
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
export { OrganizationUnitsTreeView as default };