const require_organization_unit_tree_constants = require('../constants/organization-unit-tree-constants.cjs');

//#region src/utils/buildTreeItems.ts
function buildTreeItems(ous) {
	return ous.map((ou) => ({
		id: ou.id,
		label: ou.name,
		handle: ou.handle,
		description: ou.description,
		logoUrl: ou.logoUrl,
		children: [{
			id: `${ou.id}${require_organization_unit_tree_constants.default.PLACEHOLDER_SUFFIX}`,
			label: "",
			handle: "",
			isPlaceholder: true
		}]
	}));
}

//#endregion
exports.default = buildTreeItems;