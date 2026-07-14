import UserCreateContext_default from "./UserCreateContext.js";
import { useContext } from "react";

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
	const context = useContext(UserCreateContext_default);
	if (!context) throw new Error("useUserCreate must be used within a UserCreateProvider");
	return context;
}

//#endregion
export { useUserCreate as default };