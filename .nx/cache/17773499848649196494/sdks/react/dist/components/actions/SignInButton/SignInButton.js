import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import BaseSignInButton_default from "./BaseSignInButton.js";
import { ThunderIDRuntimeError, navigate } from "@thunderid/browser";
import { forwardRef, useState } from "react";
import { jsx } from "react/jsx-runtime";

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
const SignInButton = forwardRef(({ children, onClick, preferences, signInOptions: overriddenSignInOptions, tokenRequest: overriddenTokenRequest,...rest }, ref) => {
	const { signIn, signInUrl, signInOptions, tokenRequest, meta } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [isLoading, setIsLoading] = useState(false);
	const handleSignIn = async (e) => {
		try {
			setIsLoading(true);
			if (signInUrl) navigate(signInUrl);
			else {
				const mergedParams = (overriddenTokenRequest ?? tokenRequest)?.params;
				await signIn(overriddenSignInOptions ?? signInOptions, void 0, void 0, void 0, mergedParams && Object.keys(mergedParams).length > 0 ? { params: mergedParams } : void 0);
			}
			if (onClick) onClick(e);
		} catch (error) {
			throw new ThunderIDRuntimeError(`Sign in failed: ${error instanceof Error ? error.message : String(JSON.stringify(error))}`, "SignInButton-handleSignIn-RuntimeError-001", "react", "Something went wrong while trying to sign in. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsx(BaseSignInButton_default, {
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
export { SignInButton_default as default };
//# sourceMappingURL=SignInButton.js.map