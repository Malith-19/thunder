const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_UserContext = require('./UserContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

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
	const contextValue = (0, react.useMemo)(() => ({
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_UserContext.default.Provider, {
		value: contextValue,
		children
	});
};
var UserProvider_default = UserProvider;

//#endregion
exports.default = UserProvider_default;
//# sourceMappingURL=UserProvider.cjs.map