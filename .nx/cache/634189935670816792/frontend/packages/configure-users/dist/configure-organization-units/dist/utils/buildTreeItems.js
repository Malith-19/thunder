import { organization_unit_tree_constants_default } from "../constants/organization-unit-tree-constants.js";

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
			id: `${ou.id}${organization_unit_tree_constants_default.PLACEHOLDER_SUFFIX}`,
			label: "",
			handle: "",
			isPlaceholder: true
		}]
	}));
}

//#endregion
export { buildTreeItems };