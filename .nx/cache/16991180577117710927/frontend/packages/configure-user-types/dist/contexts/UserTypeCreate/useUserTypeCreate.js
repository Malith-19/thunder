import UserTypeCreateContext_default from "./UserTypeCreateContext.js";
import { useContext } from "react";

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
	const context = useContext(UserTypeCreateContext_default);
	if (!context) throw new Error("useUserTypeCreate must be used within a UserTypeCreateProvider");
	return context;
}

//#endregion
export { useUserTypeCreate as default };