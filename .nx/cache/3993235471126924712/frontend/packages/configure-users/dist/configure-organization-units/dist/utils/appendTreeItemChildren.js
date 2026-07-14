import { organization_unit_tree_constants_default } from "../constants/organization-unit-tree-constants.js";

//#region ../configure-organization-units/dist/utils/appendTreeItemChildren.js
function appendTreeItemChildren(items, parentId, newChildren) {
	return items.map((item) => {
		if (item.id === parentId) {
			const existing = (item.children ?? []).filter((c) => !c.id.endsWith(organization_unit_tree_constants_default.LOAD_MORE_SUFFIX));
			return {
				...item,
				children: [...existing, ...newChildren]
			};
		}
		if (item.children && item.children.length > 0) return {
			...item,
			children: appendTreeItemChildren(item.children, parentId, newChildren)
		};
		return item;
	});
}

//#endregion
export { appendTreeItemChildren };