import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import BaseUser_default from "./BaseUser.js";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/User/User.tsx
/**
* A component that uses render props to expose the authenticated user object.
* This component automatically retrieves the user from ThunderID context.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { IUser } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <User fallback={<p>Please sign in</p>}>
*       {(user) => (
*         <div>
*           <h1>Welcome, {user.displayName}!</h1>
*           <p>Email: {user.email}</p>
*         </div>
*       )}
*     </User>
*   );
* }
* ```
*/
const User = ({ children, fallback = null }) => {
	const { user } = useThunderID_default();
	return /* @__PURE__ */ jsx(BaseUser_default, {
		user,
		fallback,
		children
	});
};
User.displayName = "User";
var User_default = User;

//#endregion
export { User_default as default };
//# sourceMappingURL=User.js.map