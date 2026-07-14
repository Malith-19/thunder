import { Fragment, jsx } from "react/jsx-runtime";

//#region src/components/presentation/User/BaseUser.tsx
/**
* Base User component that provides the core functionality for displaying user information.
* This component takes a user object as a prop and uses render props to expose it.
*
* @remarks This is the base component that can be used in any context where you have
* a user object available. For React applications, use the User component which
* automatically retrieves the user from ThunderID context.
*
* @example
* ```tsx
* import { BaseUser } from '@thunderid/auth-react';
*
* const MyComponent = ({ user }) => {
*   return (
*     <BaseUser user={user} fallback={<p>No user data</p>}>
*       {(user) => (
*         <div>
*           <h1>Welcome, {user.displayName}!</h1>
*           <p>Email: {user.email}</p>
*         </div>
*       )}
*     </BaseUser>
*   );
* }
* ```
*/
const BaseUser = ({ user, children, fallback = null }) => {
	if (!user) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
	return /* @__PURE__ */ jsx(Fragment, { children: children(user) });
};
BaseUser.displayName = "BaseUser";
var BaseUser_default = BaseUser;

//#endregion
export { BaseUser_default as default };
//# sourceMappingURL=BaseUser.js.map