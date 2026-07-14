import useThunderID_default from "../../contexts/ThunderID/useThunderID.js";
import { Fragment, jsx } from "react/jsx-runtime";

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
	const { isSignedIn } = useThunderID_default();
	if (!isSignedIn) return /* @__PURE__ */ jsx(Fragment, { children });
	return /* @__PURE__ */ jsx(Fragment, { children: fallback });
};
SignedOut.displayName = "SignedOut";
var SignedOut_default = SignedOut;

//#endregion
export { SignedOut_default as default };
//# sourceMappingURL=SignedOut.js.map