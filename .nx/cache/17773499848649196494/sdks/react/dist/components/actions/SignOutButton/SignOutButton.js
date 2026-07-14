import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import BaseSignOutButton_default from "./BaseSignOutButton.js";
import { ThunderIDRuntimeError } from "@thunderid/browser";
import { forwardRef, useState } from "react";
import { jsx } from "react/jsx-runtime";

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
const SignOutButton = forwardRef(({ children, onClick, preferences,...rest }, ref) => {
	const { signOut, meta } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [isLoading, setIsLoading] = useState(false);
	const handleSignOut = async (e) => {
		try {
			setIsLoading(true);
			await signOut();
			if (onClick) onClick(e);
		} catch (error) {
			throw new ThunderIDRuntimeError(`Sign out failed: ${error instanceof Error ? error.message : String(error)}`, "SignOutButton-handleSignOut-RuntimeError-001", "react", "Something went wrong while trying to sign out. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsx(BaseSignOutButton_default, {
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
export { SignOutButton_default as default };
//# sourceMappingURL=SignOutButton.js.map