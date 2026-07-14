import UserContext_default from "./UserContext.js";
import { useMemo } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/User/UserProvider.tsx
/**
* UserProvider component that manages user profile data and provides it through UserContext.
*
* This provider:
* - Fetches user profile data from the ME endpoint
* - Retrieves SCIM2 schemas for profile structure
* - Generates both nested and flattened user profiles
* - Provides functions for refreshing and updating user data
* - Handles loading states and errors
*
* @example
* ```tsx
* // Basic usage
* <UserProvider>
*   <App />
* </UserProvider>
*
* // With custom error handling
* <UserProvider onError={(error) => console.error('User error:', error)}>
*   <App />
* </UserProvider>
*
* // Disable auto-fetch (fetch manually using refreshUser)
* <UserProvider autoFetch={false}>
*   <App />
* </UserProvider>
* ```
*/
const UserProvider = ({ children, profile, revalidateProfile, onUpdateProfile, updateProfile }) => {
	const contextValue = useMemo(() => ({
		flattenedProfile: profile?.flattenedProfile,
		onUpdateProfile,
		profile: profile?.profile,
		revalidateProfile,
		schemas: profile?.schemas,
		updateProfile
	}), [
		profile,
		onUpdateProfile,
		revalidateProfile,
		updateProfile
	]);
	return /* @__PURE__ */ jsx(UserContext_default.Provider, {
		value: contextValue,
		children
	});
};
var UserProvider_default = UserProvider;

//#endregion
export { UserProvider_default as default };
//# sourceMappingURL=UserProvider.js.map