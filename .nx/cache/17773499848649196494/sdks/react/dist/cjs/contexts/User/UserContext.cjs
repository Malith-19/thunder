const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/User/UserContext.ts
/**
* Context object for managing user profile data and related operations.
*/
const UserContext = (0, react.createContext)({
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
exports.default = UserContext_default;
//# sourceMappingURL=UserContext.cjs.map