import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import BaseSignUpButton_default from "./BaseSignUpButton.js";
import { ThunderIDRuntimeError, navigate } from "@thunderid/browser";
import { forwardRef, useState } from "react";
import { jsx } from "react/jsx-runtime";

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
const SignUpButton = forwardRef(({ children, onClick, preferences,...rest }, ref) => {
	const { signUp, signUpUrl, meta } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [isLoading, setIsLoading] = useState(false);
	const handleSignUp = async (e) => {
		try {
			setIsLoading(true);
			if (signUpUrl) navigate(signUpUrl);
			else await signUp();
			if (onClick) onClick(e);
		} catch (error) {
			throw new ThunderIDRuntimeError(`Sign up failed: ${error instanceof Error ? error.message : String(error)}`, "SignUpButton-handleSignUp-RuntimeError-001", "react", "Something went wrong while trying to sign up. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsx(BaseSignUpButton_default, {
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
export { SignUpButton_default as default };
//# sourceMappingURL=SignUpButton.js.map