
//#region src/utils/findTreeItem.ts
function findTreeItem(items, id) {
	return items.reduce((found, item) => {
		if (found) return found;
		if (item.id === id) return item;
		return item.children ? findTreeItem(item.children, id) : void 0;
	}, void 0);
}

//#endregion
exports.default = findTreeItem;