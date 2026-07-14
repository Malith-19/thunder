import UserContext_default from "./UserContext.js";
import { useContext } from "react";

//#region src/contexts/User/useUser.ts
/**
* Hook to access the User context.
*
* This hook provides access to user profile data including:
* - Raw profile API response
* - SCIM2 schemas
* - Nested user object
* - Flattened user profile
* - Functions to refresh and update user data
* - Loading states and error handling
*
* @returns {UserContextProps} The user context value containing all user-related data and functions
* @throws {Error} Throws an error if used outside of UserProvider
*
* @example
* ```tsx
* import {useUser} from '@thunderid/react';
*
* function ProfileComponent() {
*   const {
*     isLoading,
*     profile,
*     schemas,
*     user,
*     flattenedUser,
*     refreshUser,
*     updateUser,
*     error
*   } = useUser();
*
*   if (isLoading) {
*     return <div>Loading user data...</div>;
*   }
*
*   if (error) {
*     return <div>Error: {error.message}</div>;
*   }
*
*   return (
*     <div>
*       <h1>Welcome {user?.name?.givenName}!</h1>
*       <p>Email: {flattenedUser?.emails}</p>
*       <button onClick={refreshUser}>Refresh Profile</button>
*     </div>
*   );
* }
*
* // Access specific user properties
* function UserEmail() {
*   const {flattenedUser} = useUser();
*   return <span>{flattenedUser?.emails?.[0]}</span>;
* }
*
* // Update user profile
* function EditProfile() {
*   const {updateUser, user} = useUser();
*
*   const handleUpdate = async () => {
*     try {
*       await updateUser({
*         name: {
*           givenName: 'John',
*           familyName: 'Doe'
*         }
*       });
*     } catch (error) {
*       console.error('Update failed:', error);
*     }
*   };
*
*   return <button onClick={handleUpdate}>Update Name</button>;
* }
* ```
*/
const useUser = () => {
	const context = useContext(UserContext_default);
	if (!context) throw new Error("useUser must be used within a UserProvider");
	return context;
};
var useUser_default = useUser;

//#endregion
export { useUser_default as default };
//# sourceMappingURL=useUser.js.map