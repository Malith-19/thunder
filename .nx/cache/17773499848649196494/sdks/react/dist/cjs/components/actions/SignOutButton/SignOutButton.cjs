const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../contexts/ThunderID/useThunderID.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_BaseSignOutButton = require('./BaseSignOutButton.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/actions/SignOutButton/SignOutButton.tsx
/**
* SignOutButton component that supports both render props and traditional props patterns.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example Using render props pattern
* ```tsx
* <SignOutButton>
*   {({signOut, isLoading}) => (
*     <button onClick={signOut} disabled={isLoading}>
*       {isLoading ? 'Signing out...' : 'Sign Out'}
*     </button>
*   )}
* </SignOutButton>
* ```
*
* @example Using traditional props pattern
* ```tsx
* <SignOutButton className="custom-button">Sign Out</SignOutButton>
* ```
*
* @example Using component-level preferences
* ```tsx
* <SignOutButton
*   preferences={{
*     i18n: {
*       bundles: {
*         'en-US': {
*           translations: {
*             'buttons.signOut': 'Custom Sign Out Text'
*           }
*         }
*       }
*     }
*   }}
* >
*   Custom Sign Out
* </SignOutButton>
* ```
*/
const SignOutButton = (0, react.forwardRef)(({ children, onClick, preferences,...rest }, ref) => {
	const { signOut, meta } = require_useThunderID.default();
	const { t } = require_useTranslation.default(preferences?.i18n);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const handleSignOut = async (e) => {
		try {
			setIsLoading(true);
			await signOut();
			if (onClick) onClick(e);
		} catch (error) {
			throw new __thunderid_browser.ThunderIDRuntimeError(`Sign out failed: ${error instanceof Error ? error.message : String(error)}`, "SignOutButton-handleSignOut-RuntimeError-001", "react", "Something went wrong while trying to sign out. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseSignOutButton.default, {
		ref,
		onClick: handleSignOut,
		isLoading,
		meta,
		signOut: handleSignOut,
		preferences,
		...rest,
		children: children ?? t("elements.buttons.signout.text")
	});
});
SignOutButton.displayName = "SignOutButton";
var SignOutButton_default = SignOutButton;

//#endregion
exports.default = SignOutButton_default;
//# sourceMappingURL=SignOutButton.cjs.map