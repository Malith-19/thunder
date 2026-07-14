import useThunderID_default from "../../contexts/ThunderID/useThunderID.js";
import { Fragment, jsx } from "react/jsx-runtime";

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
	const { isSignedIn } = useThunderID_default();
	if (!isSignedIn) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
	return /* @__PURE__ */ jsx(Fragment, { children });
};
SignedIn.displayName = "SignedIn";
var SignedIn_default = SignedIn;

//#endregion
export { SignedIn_default as default };
//# sourceMappingURL=SignedIn.js.map