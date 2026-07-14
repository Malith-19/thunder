import OrganizationUnitContext_default from "./OrganizationUnitContext.js";
import { jsx } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router";

//#region src/contexts/OrganizationUnitProvider.tsx
function OrganizationUnitProvider({ children }) {
	const [treeItems, setTreeItems] = useState([]);
	const [expandedItems, setExpandedItems] = useState([]);
	const [loadedItems, setLoadedItems] = useState(/* @__PURE__ */ new Set());
	const resetTreeState = useCallback(() => {
		setTreeItems([]);
		setLoadedItems(/* @__PURE__ */ new Set());
	}, []);
	const contextValue = useMemo(() => ({
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
	return /* @__PURE__ */ jsx(OrganizationUnitContext_default.Provider, {
		value: contextValue,
		children: children ?? /* @__PURE__ */ jsx(Outlet, {})
	});
}

//#endregion
export { OrganizationUnitProvider as default };