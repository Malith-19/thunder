const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../../../contexts/Theme/useTheme.cjs');
const require_OrganizationUnitPicker_styles = require('./OrganizationUnitPicker.styles.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/auth/OrganizationUnitPicker/v2/OrganizationUnitPicker.tsx
const OrganizationUnitPicker = ({ rootOuId, selectedOuId, onSelect, fetchChildren, pageSize = 10, className }) => {
	const { theme } = require_useTheme.default();
	const styles = require_OrganizationUnitPicker_styles.default(theme);
	const [nodeStates, setNodeStates] = (0, react.useState)({});
	const loadChildren = (0, react.useCallback)(async (parentId, offset = 0) => {
		setNodeStates((prev) => ({
			...prev,
			[parentId]: {
				...prev[parentId] || {
					children: [],
					expanded: true,
					hasMore: false,
					offset: 0,
					totalResults: 0
				},
				loading: true
			}
		}));
		try {
			const response = await fetchChildren(parentId, pageSize, offset);
			const newChildren = response.organizationUnits || [];
			setNodeStates((prev) => {
				const existing = prev[parentId] || {
					children: [],
					expanded: true,
					hasMore: false,
					loading: false,
					offset: 0,
					totalResults: 0
				};
				const mergedChildren = offset === 0 ? newChildren : [...existing.children, ...newChildren];
				const newOffset = offset + newChildren.length;
				return {
					...prev,
					[parentId]: {
						children: mergedChildren,
						expanded: true,
						hasMore: newOffset < response.totalResults,
						loading: false,
						offset: newOffset,
						totalResults: response.totalResults
					}
				};
			});
		} catch {
			setNodeStates((prev) => ({
				...prev,
				[parentId]: {
					...prev[parentId] || {
						children: [],
						expanded: true,
						hasMore: false,
						offset: 0,
						totalResults: 0
					},
					loading: false
				}
			}));
		}
	}, [fetchChildren, pageSize]);
	(0, react.useEffect)(() => {
		if (rootOuId && !nodeStates[rootOuId]) loadChildren(rootOuId);
	}, [
		rootOuId,
		loadChildren,
		nodeStates
	]);
	const handleToggle = (0, react.useCallback)((ouId) => {
		const state = nodeStates[ouId];
		if (state?.expanded) setNodeStates((prev) => ({
			...prev,
			[ouId]: {
				...prev[ouId],
				expanded: false
			}
		}));
		else if (state?.children.length) setNodeStates((prev) => ({
			...prev,
			[ouId]: {
				...prev[ouId],
				expanded: true
			}
		}));
		else loadChildren(ouId);
	}, [nodeStates, loadChildren]);
	const handleLoadMore = (0, react.useCallback)((parentId) => {
		const state = nodeStates[parentId];
		if (state) loadChildren(parentId, state.offset);
	}, [nodeStates, loadChildren]);
	const renderLoadingPlaceholders = (depth) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: [
		0,
		1,
		2
	].map((i) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: styles["loadingPlaceholder"],
		style: { paddingLeft: `${(depth + 1) * 20}px` },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: styles["skeleton"],
			style: { width: `${100 - i * 20}px` }
		})
	}, `skeleton-${i}`)) });
	const renderNode = (ou, depth = 0) => {
		const state = nodeStates[ou.id];
		const isSelected = selectedOuId === ou.id;
		const isExpanded = state?.expanded || false;
		const isLoading = state?.loading || false;
		const hasChildren = !state || state.totalResults > 0 || state.children.length > 0;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react.default.Fragment, { children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: (0, __emotion_css.cx)(styles["node"], isSelected && styles["nodeSelected"]),
				style: { paddingLeft: `${depth * 20 + 12}px` },
				role: "treeitem",
				"aria-selected": isSelected,
				"aria-expanded": hasChildren ? isExpanded : void 0,
				onClick: () => onSelect(ou.id),
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onSelect(ou.id);
					}
				},
				tabIndex: 0,
				children: [hasChildren ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					className: styles["toggleButton"],
					onClick: (e) => {
						e.stopPropagation();
						handleToggle(ou.id);
					},
					"aria-label": isExpanded ? "Collapse" : "Expand",
					type: "button",
					children: isExpanded ? "▾" : "▸"
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: styles["togglePlaceholder"] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: styles["nodeName"],
					children: ou.name
				})]
			}),
			isExpanded && isLoading && !state?.children.length && renderLoadingPlaceholders(depth),
			isExpanded && state?.children.map((child) => renderNode(child, depth + 1)),
			isExpanded && state?.hasMore && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				className: styles["loadMoreButton"],
				style: { paddingLeft: `${(depth + 1) * 20 + 12}px` },
				onClick: () => handleLoadMore(ou.id),
				disabled: isLoading,
				type: "button",
				children: isLoading ? "Loading..." : "Load more"
			})
		] }, ou.id);
	};
	const rootState = nodeStates[rootOuId];
	const isRootLoading = rootState?.loading && !rootState?.children.length;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, __emotion_css.cx)(styles["container"], className),
		role: "tree",
		"aria-label": "Organization unit picker",
		children: [
			isRootLoading && renderLoadingPlaceholders(0),
			rootState?.children.map((ou) => renderNode(ou, 0)),
			rootState?.hasMore && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				className: styles["loadMoreButton"],
				onClick: () => handleLoadMore(rootOuId),
				disabled: rootState?.loading,
				type: "button",
				children: rootState?.loading ? "Loading..." : "Load more"
			})
		]
	});
};
var OrganizationUnitPicker_default = OrganizationUnitPicker;

//#endregion
exports.default = OrganizationUnitPicker_default;
//# sourceMappingURL=OrganizationUnitPicker.cjs.map