import { createContext } from "react";

//#region src/contexts/User/UserContext.ts
/**
* Context object for managing user profile data and related operations.
*/
const UserContext = createContext({
	flattenedProfile: null,
	onUpdateProfile: () => null,
	profile: null,
	revalidateProfile: () => null,
	schemas: null,
	updateProfile: () => null
});
UserContext.displayName = "UserContext";
var UserContext_default = UserContext;

//#endregion
export { UserContext_default as default };
//# sourceMappingURL=UserContext.js.map