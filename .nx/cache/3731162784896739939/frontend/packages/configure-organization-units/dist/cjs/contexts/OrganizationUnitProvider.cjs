const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_OrganizationUnitContext = require('./OrganizationUnitContext.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_router = require("react-router");
react_router = require_rolldown_runtime.__toESM(react_router);

//#region src/contexts/OrganizationUnitProvider.tsx
function OrganizationUnitProvider({ children }) {
	const [treeItems, setTreeItems] = (0, react.useState)([]);
	const [expandedItems, setExpandedItems] = (0, react.useState)([]);
	const [loadedItems, setLoadedItems] = (0, react.useState)(/* @__PURE__ */ new Set());
	const resetTreeState = (0, react.useCallback)(() => {
		setTreeItems([]);
		setLoadedItems(/* @__PURE__ */ new Set());
	}, []);
	const contextValue = (0, react.useMemo)(() => ({
		treeItems,
		setTreeItems,
		expandedItems,
		setExpandedItems,
		loadedItems,
		setLoadedItems,
		resetTreeState
	}), [
		treeItems,
		expandedItems,
		loadedItems,
		resetTreeState
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationUnitContext.default.Provider, {
		value: contextValue,
		children: children ?? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_router.Outlet, {})
	});
}

//#endregion
exports.default = OrganizationUnitProvider;