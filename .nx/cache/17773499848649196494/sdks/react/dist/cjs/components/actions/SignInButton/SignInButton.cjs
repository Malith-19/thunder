const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../contexts/ThunderID/useThunderID.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_BaseSignInButton = require('./BaseSignInButton.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/actions/SignInButton/SignInButton.tsx
/**
* SignInButton component that supports both render props and traditional props patterns.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example Using render props
* ```tsx
* <SignInButton>
*   {({signIn, isLoading}) => (
*     <button onClick={signIn} disabled={isLoading}>
*       {isLoading ? 'Signing in...' : 'Sign In'}
*     </button>
*   )}
* </SignInButton>
* ```
*
* @example Using traditional props
* ```tsx
* <SignInButton className="custom-button">Sign In</SignInButton>
* ```
*
* @example Using component-level preferences
* ```tsx
* <SignInButton
*   preferences={{
*     i18n: {
*       bundles: {
*         'en-US': {
*           translations: {
*             'buttons.signIn': 'Custom Sign In Text'
*           }
*         }
*       }
*     }
*   }}
* >
*   Custom Sign In
* </SignInButton>
* ```
*/
const SignInButton = (0, react.forwardRef)(({ children, onClick, preferences, signInOptions: overriddenSignInOptions, tokenRequest: overriddenTokenRequest,...rest }, ref) => {
	const { signIn, signInUrl, signInOptions, tokenRequest, meta } = require_useThunderID.default();
	const { t } = require_useTranslation.default(preferences?.i18n);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const handleSignIn = async (e) => {
		try {
			setIsLoading(true);
			if (signInUrl) (0, __thunderid_browser.navigate)(signInUrl);
			else {
				const mergedParams = (overriddenTokenRequest ?? tokenRequest)?.params;
				await signIn(overriddenSignInOptions ?? signInOptions, void 0, void 0, void 0, mergedParams && Object.keys(mergedParams).length > 0 ? { params: mergedParams } : void 0);
			}
			if (onClick) onClick(e);
		} catch (error) {
			throw new __thunderid_browser.ThunderIDRuntimeError(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "SignInButton-handleSignIn-RuntimeError-001", "react", "Something went wrong while trying to sign in. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseSignInButton.default, {
		ref,
		onClick: handleSignIn,
		isLoading,
		meta,
		signIn: handleSignIn,
		preferences,
		...rest,
		children: children ?? t("elements.buttons.signin.text")
	});
});
SignInButton.displayName = "SignInButton";
var SignInButton_default = SignInButton;

//#endregion
exports.default = SignInButton_default;
//# sourceMappingURL=SignInButton.cjs.map