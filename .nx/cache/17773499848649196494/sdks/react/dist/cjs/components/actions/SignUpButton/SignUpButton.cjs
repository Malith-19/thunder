const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../contexts/ThunderID/useThunderID.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_BaseSignUpButton = require('./BaseSignUpButton.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/actions/SignUpButton/SignUpButton.tsx
/**
* SignUpButton component that supports both render props and traditional props patterns.
* It redirects the user to the ThunderID sign-up page configured for the application.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example Using render props pattern
* ```tsx
* <SignUpButton>
*   {({ signUp, isLoading }) => (
*     <button onClick={signUp} disabled={isLoading}>
*       {isLoading ? 'Creating Account...' : 'Create Account'}
*     </button>
*   )}
* </SignUpButton>
* ```
*
* @example Using traditional props pattern
* ```tsx
* <SignUpButton className="custom-button">Create Account</SignUpButton>
* ```
*
* @example Using component-level preferences
* ```tsx
* <SignUpButton
*   preferences={{
*     i18n: {
*       bundles: {
*         'en-US': {
*           translations: {
*             'buttons.signUp': 'Custom Sign Up Text'
*           }
*         }
*       }
*     }
*   }}
* >
*   Custom Sign Up
* </SignUpButton>
* ```
*/
const SignUpButton = (0, react.forwardRef)(({ children, onClick, preferences,...rest }, ref) => {
	const { signUp, signUpUrl, meta } = require_useThunderID.default();
	const { t } = require_useTranslation.default(preferences?.i18n);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const handleSignUp = async (e) => {
		try {
			setIsLoading(true);
			if (signUpUrl) (0, __thunderid_browser.navigate)(signUpUrl);
			else await signUp();
			if (onClick) onClick(e);
		} catch (error) {
			throw new __thunderid_browser.ThunderIDRuntimeError(`Sign up failed: ${error instanceof Error ? error.message : String(error)}`, "SignUpButton-handleSignUp-RuntimeError-001", "react", "Something went wrong while trying to sign up. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseSignUpButton.default, {
		ref,
		onClick: handleSignUp,
		isLoading,
		meta,
		signUp: handleSignUp,
		preferences,
		...rest,
		children: children ?? t("elements.buttons.signup.text")
	});
});
SignUpButton.displayName = "SignUpButton";
var SignUpButton_default = SignUpButton;

//#endregion
exports.default = SignUpButton_default;
//# sourceMappingURL=SignUpButton.cjs.map