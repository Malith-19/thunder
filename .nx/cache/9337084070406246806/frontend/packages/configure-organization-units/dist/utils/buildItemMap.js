//#region src/utils/buildItemMap.ts
function buildItemMap(items) {
	const map = /* @__PURE__ */ new Map();
	const visit = (list) => {
		list.forEach((item) => {
			map.set(item.id, item);
			if (item.children) visit(item.children);
		});
	};
	visit(items);
	return map;
}

//#endregion
export { buildItemMap as default };