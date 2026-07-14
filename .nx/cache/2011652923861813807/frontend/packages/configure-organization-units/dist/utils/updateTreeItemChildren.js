//#region src/utils/updateTreeItemChildren.ts
function updateTreeItemChildren(items, parentId, children) {
	return items.map((item) => {
		if (item.id === parentId) return {
			...item,
			children
		};
		if (item.children && item.children.length > 0) return {
			...item,
			children: updateTreeItemChildren(item.children, parentId, children)
		};
		return item;
	});
}

//#endregion
export { updateTreeItemChildren as default };