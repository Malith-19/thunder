const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../contexts/ThunderID/useThunderID.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/control/SignedOut.tsx
/**
* A component that only renders its children when the user is signed out.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { SignedOut } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <SignedOut fallback={<p>You are already signed in</p>}>
*       <p>Please sign in to continue</p>
*     </SignedOut>
*   );
* }
* ```
*/
const SignedOut = ({ children, fallback = null }) => {
	const { isSignedIn } = require_useThunderID.default();
	if (!isSignedIn) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: fallback });
};
SignedOut.displayName = "SignedOut";
var SignedOut_default = SignedOut;

//#endregion
exports.default = SignedOut_default;
//# sourceMappingURL=SignedOut.cjs.map