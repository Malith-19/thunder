const require_permissions = require('../models/permissions.cjs');

//#region src/utils/isValidPermissionDelimiter.ts
function isValidPermissionDelimiter(value) {
	return require_permissions.VALID_PERMISSION_DELIMITERS.includes(value);
}

//#endregion
exports.isValidPermissionDelimiter = isValidPermissionDelimiter;