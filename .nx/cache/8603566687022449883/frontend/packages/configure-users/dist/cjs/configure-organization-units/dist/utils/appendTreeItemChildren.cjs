const require_organization_unit_tree_constants = require('../constants/organization-unit-tree-constants.cjs');

//#region ../configure-organization-units/dist/utils/appendTreeItemChildren.js
function appendTreeItemChildren(items, parentId, newChildren) {
	return items.map((item) => {
		if (item.id === parentId) {
			const existing = (item.children ?? []).filter((c) => !c.id.endsWith(require_organization_unit_tree_constants.organization_unit_tree_constants_default.LOAD_MORE_SUFFIX));
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
exports.appendTreeItemChildren = appendTreeItemChildren;