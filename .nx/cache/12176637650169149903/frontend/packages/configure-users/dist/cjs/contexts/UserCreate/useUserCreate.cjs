const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_UserCreateContext = require('./UserCreateContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/UserCreate/useUserCreate.ts
/**
* Hook to access the user creation context.
*
* @throws Error if used outside of UserCreateProvider
* @returns The user creation context value
*
* @public
*/
function useUserCreate() {
	const context = (0, react.useContext)(require_UserCreateContext.default);
	if (!context) throw new Error("useUserCreate must be used within a UserCreateProvider");
	return context;
}

//#endregion
exports.default = useUserCreate;