const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../contexts/ThunderID/useThunderID.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/control/SignedIn.tsx
/**
* A component that only renders its children when the user is signed in.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { SignedIn } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <SignedIn fallback={<p>Please sign in to continue</p>}>
*       <p>Welcome! You are signed in.</p>
*     </SignedIn>
*   );
* }
* ```
*/
const SignedIn = ({ children, fallback = null }) => {
	const { isSignedIn } = require_useThunderID.default();
	if (!isSignedIn) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: fallback });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children });
};
SignedIn.displayName = "SignedIn";
var SignedIn_default = SignedIn;

//#endregion
exports.default = SignedIn_default;
//# sourceMappingURL=SignedIn.cjs.map