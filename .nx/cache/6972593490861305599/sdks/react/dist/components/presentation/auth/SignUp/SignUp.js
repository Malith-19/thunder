import useThunderID_default from "../../../../contexts/ThunderID/useThunderID.js";
import SignUp_default from "./v1/SignUp.js";
import SignUp_default$1 from "./v2/SignUp.js";
import { Platform } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignUp/SignUp.tsx
/**
* A styled SignUp component that provides embedded sign-up flow with pre-built styling.
* This component routes to the appropriate version-specific implementation based on the platform.
*
* @example
* // Default UI
* ```tsx
* import { SignUp } from '@thunderid/react';
*
* const App = () => {
*   return (
*     <SignUp
*       onSuccess={(response) => {
*         console.log('Sign-up successful:', response);
*         // Handle successful sign-up (e.g., redirect, show confirmation)
*       }}
*       onError={(error) => {
*         console.error('Sign-up failed:', error);
*       }}
*       onComplete={(redirectUrl) => {
*         // Platform-specific redirect handling (e.g., Next.js router.push)
*         router.push(redirectUrl); // or window.location.href = redirectUrl
*       }}
*       size="medium"
*       variant="outlined"
*       afterSignUpUrl="/welcome"
*     />
*   );
* };
* ```
*
* @example
* // Custom UI with render props
* ```tsx
* import { SignUp } from '@thunderid/react';
*
* const App = () => {
*   return (
*     <SignUp
*       onError={(error) => console.error('Error:', error)}
*       onComplete={(response) => console.log('Success:', response)}
*     >
*       {({values, errors, handleInputChange, handleSubmit, isLoading, components}) => (
*         <div className="custom-signup">
*           <h1>Custom Sign Up</h1>
*           {isLoading ? (
*             <p>Loading...</p>
*           ) : (
*             <form onSubmit={(e) => {
*               e.preventDefault();
*               handleSubmit(components[0], values);
*             }}>
*               <input
*                 name="username"
*                 value={values.username || ''}
*                 onChange={(e) => handleInputChange('username', e.target.value)}
*               />
*               {errors.username && <span>{errors.username}</span>}
*               <button type="submit" disabled={isLoading}>
*                 {isLoading ? 'Signing up...' : 'Sign Up'}
*               </button>
*             </form>
*           )}
*         </div>
*       )}
*     </SignUp>
*   );
* };
* ```
*/
const SignUp = (props) => {
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(SignUp_default$1, { ...props });
	return /* @__PURE__ */ jsx(SignUp_default, { ...props });
};
var SignUp_default$2 = SignUp;

//#endregion
export { SignUp_default$2 as default };
//# sourceMappingURL=SignUp.js.map