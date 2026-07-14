import { VALID_PERMISSION_DELIMITERS } from "../models/permissions.js";

//#region src/utils/isValidPermissionDelimiter.ts
function isValidPermissionDelimiter(value) {
	return VALID_PERMISSION_DELIMITERS.includes(value);
}

//#endregion
export { isValidPermissionDelimiter };