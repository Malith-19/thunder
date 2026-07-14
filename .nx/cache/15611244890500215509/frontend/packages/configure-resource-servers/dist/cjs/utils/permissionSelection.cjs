
//#region src/utils/permissionSelection.ts
function isPermissionSelected(list, resourceServerId, permission) {
	return list.some((entry) => entry.resourceServerId === resourceServerId && entry.permissions.includes(permission));
}
function togglePermission(list, resourceServerId, permission) {
	const existing = list.find((entry) => entry.resourceServerId === resourceServerId);
	if (!existing) return [...list, {
		resourceServerId,
		permissions: [permission]
	}];
	const updatedPermissions = existing.permissions.includes(permission) ? existing.permissions.filter((p) => p !== permission) : [...existing.permissions, permission];
	if (updatedPermissions.length === 0) return list.filter((entry) => entry.resourceServerId !== resourceServerId);
	return list.map((entry) => entry.resourceServerId === resourceServerId ? {
		...entry,
		permissions: updatedPermissions
	} : entry);
}
function mergePermissions(base, additions) {
	const result = base.map((entry) => ({
		...entry,
		permissions: [...entry.permissions]
	}));
	for (const addition of additions) {
		const existing = result.find((entry) => entry.resourceServerId === addition.resourceServerId);
		if (!existing) {
			result.push({
				resourceServerId: addition.resourceServerId,
				permissions: [...addition.permissions]
			});
			continue;
		}
		for (const permission of addition.permissions) if (!existing.permissions.includes(permission)) existing.permissions.push(permission);
	}
	return result;
}
function removePermissions(list, resourceServerId, permissions) {
	const entry = list.find((e) => e.resourceServerId === resourceServerId);
	if (!entry) return list;
	const updatedPermissions = entry.permissions.filter((p) => !permissions.includes(p));
	if (updatedPermissions.length === 0) return list.filter((e) => e.resourceServerId !== resourceServerId);
	return list.map((e) => e.resourceServerId === resourceServerId ? {
		...e,
		permissions: updatedPermissions
	} : e);
}
function getSubtreeSelectionState(list, resourceServerId, subtreePermissions) {
	if (subtreePermissions.length === 0) return "none";
	const selectedCount = subtreePermissions.filter((p) => isPermissionSelected(list, resourceServerId, p)).length;
	if (selectedCount === 0) return "none";
	return selectedCount === subtreePermissions.length ? "all" : "some";
}
function arePermissionsEqual(a, b) {
	if (a.length !== b.length) return false;
	return a.every((entryA) => {
		const entryB = b.find((e) => e.resourceServerId === entryA.resourceServerId);
		if (entryA.permissions.length !== entryB?.permissions.length) return false;
		return entryA.permissions.every((p) => entryB.permissions.includes(p));
	});
}

//#endregion
exports.arePermissionsEqual = arePermissionsEqual;
exports.getSubtreeSelectionState = getSubtreeSelectionState;
exports.isPermissionSelected = isPermissionSelected;
exports.mergePermissions = mergePermissions;
exports.removePermissions = removePermissions;
exports.togglePermission = togglePermission;