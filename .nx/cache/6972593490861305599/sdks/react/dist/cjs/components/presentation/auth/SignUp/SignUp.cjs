const require_rolldown_runtime = require('../../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../../contexts/ThunderID/useThunderID.cjs');
const require_SignUp = require('./v1/SignUp.cjs');
const require_SignUp$1 = require('./v2/SignUp.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

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
	const { platform } = require_useThunderID.default();
	if (platform === __thunderid_browser.Platform.ThunderID) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SignUp$1.default, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SignUp.default, { ...props });
};
var SignUp_default$2 = SignUp;

//#endregion
exports.default = SignUp_default$2;
//# sourceMappingURL=SignUp.cjs.map