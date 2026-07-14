import { get } from "@thunderid/browser";

//#region src/utils/getMappedUserProfileValue.ts
/**
* Retrieves a user profile value based on attribute mapping configuration.
*
* This function allows flexible mapping of component attribute names to actual
* user profile field paths. It supports both simple string mappings and arrays
* of potential field paths for fallback scenarios.
*
* @param key - The logical attribute name to retrieve (e.g., 'firstName', 'email')
* @param mappings - Object mapping logical names to user profile field paths
* @param user - The user object to extract values from
* @returns The mapped value from the user profile, or undefined if not found
*
* @example
* ```typescript
* const mappings = {
*   firstName: 'name.givenName',
*   email: 'emails[0]',
*   picture: ['profileUrl', 'profile', 'avatar'] // fallback options
* };
*
* const user = {
*   name: { givenName: 'John' },
*   emails: ['john@example.com'],
*   profileUrl: 'https://example.com/avatar.jpg'
* };
*
* getMappedUserProfileValue('firstName', mappings, user); // 'John'
* getMappedUserProfileValue('email', mappings, user); // 'john@example.com'
* getMappedUserProfileValue('picture', mappings, user); // 'https://example.com/avatar.jpg'
* ```
*/
const getMappedUserProfileValue = (key, mappings, user) => {
	if (!key || !mappings || !user) return;
	const mapping = mappings[key];
	if (!mapping) return get(user, key);
	if (Array.isArray(mapping)) {
		let foundValue;
		let found = false;
		mapping.some((path) => {
			const value = get(user, path);
			if (value !== void 0 && value !== null && value !== "") {
				foundValue = value;
				found = true;
				return true;
			}
			return false;
		});
		return found ? foundValue : void 0;
	}
	return get(user, mapping);
};
var getMappedUserProfileValue_default = getMappedUserProfileValue;

//#endregion
export { getMappedUserProfileValue_default as default };
//# sourceMappingURL=getMappedUserProfileValue.js.map