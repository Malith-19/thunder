const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_UserTypeCreateContext = require('./UserTypeCreateContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/UserTypeCreate/useUserTypeCreate.tsx
/**
* Hook to access the user type creation context.
*
* @throws Error if used outside of UserTypeCreateProvider
* @returns The user type creation context value
*
* @public
*/
function useUserTypeCreate() {
	const context = (0, react.useContext)(require_UserTypeCreateContext.default);
	if (!context) throw new Error("useUserTypeCreate must be used within a UserTypeCreateProvider");
	return context;
}

//#endregion
exports.default = useUserTypeCreate;