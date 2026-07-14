const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../contexts/ThunderID/useThunderID.cjs');
const require_BaseUser = require('./BaseUser.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

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
	const { user } = require_useThunderID.default();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseUser.default, {
		user,
		fallback,
		children
	});
};
User.displayName = "User";
var User_default = User;

//#endregion
exports.default = User_default;
//# sourceMappingURL=User.cjs.map