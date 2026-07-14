import getMappedUserProfileValue_default from "./getMappedUserProfileValue.js";

//#region src/utils/getDisplayName.ts
/**
* Get the display name of a user by mapping their profile attributes.
*
* @param mergedMappings - The merged attribute mappings.
* @param user - The user object containing profile information.
* @param displayAttributes - Optional array of attribute keys or paths to try first.
*   Each entry is resolved via `getMappedUserProfileValue`. The first non-empty
*   value found is returned. If none resolve, the default fallback chain is used.
*
* @example
* ```ts
* // Default behavior — tries firstName+lastName, then username, email, name
* const displayName = getDisplayName(mergedMappings, user);
*
* // Custom attributes — try 'nickname' first, then fall back to defaults
* const displayName = getDisplayName(mergedMappings, user, ['nickname']);
*
* // Multiple custom attributes
* const displayName = getDisplayName(mergedMappings, user, ['preferred_username', 'nickname']);
* ```
*
* @returns The display name of the user.
*/
const getDisplayName = (mergedMappings, user, displayAttributes) => {
	const mappings = mergedMappings;
	if (displayAttributes && displayAttributes.length > 0) {
		let foundValue;
		displayAttributes.some((attr) => {
			const value = getMappedUserProfileValue_default(attr, mappings, user);
			if (value !== void 0 && value !== null && value !== "") {
				foundValue = String(value);
				return true;
			}
			return false;
		});
		if (foundValue !== void 0) return foundValue;
	}
	const firstName = getMappedUserProfileValue_default("firstName", mappings, user);
	const lastName = getMappedUserProfileValue_default("lastName", mappings, user);
	if (firstName && lastName) return `${firstName} ${lastName}`;
	return getMappedUserProfileValue_default("username", mappings, user) || getMappedUserProfileValue_default("email", mappings, user) || getMappedUserProfileValue_default("name", mappings, user) || "User";
};
var getDisplayName_default = getDisplayName;

//#endregion
export { getDisplayName_default as default };
//# sourceMappingURL=getDisplayName.js.map