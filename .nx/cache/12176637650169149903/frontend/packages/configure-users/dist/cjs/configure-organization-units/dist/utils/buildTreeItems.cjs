const require_organization_unit_tree_constants = require('../constants/organization-unit-tree-constants.cjs');

//#region ../configure-organization-units/dist/utils/buildTreeItems.js
function buildTreeItems(ous) {
	return ous.map((ou) => ({
		id: ou.id,
		label: ou.name,
		handle: ou.handle,
		description: ou.description,
		logoUrl: ou.logoUrl,
		isReadOnly: ou.isReadOnly,
		children: [{
			id: `${ou.id}${require_organization_unit_tree_constants.organization_unit_tree_constants_default.PLACEHOLDER_SUFFIX}`,
			label: "",
			handle: "",
			isPlaceholder: true
		}]
	}));
}

//#endregion
exports.buildTreeItems = buildTreeItems;