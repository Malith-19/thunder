import EmailOtp_default from "./EmailOtp.js";
import IdentifierFirst_default from "./IdentifierFirst.js";
import MultiOptionButton_default from "./MultiOptionButton.js";
import SmsOtp_default from "./SmsOtp.js";
import SocialButton_default from "./SocialButton.js";
import Totp_default from "./Totp.js";
import UsernamePassword_default from "./UsernamePassword.js";
import FacebookButton_default from "../../../../../adapters/FacebookButton.js";
import GitHubButton_default from "../../../../../adapters/GitHubButton.js";
import GoogleButton_default from "../../../../../adapters/GoogleButton.js";
import LinkedInButton_default from "../../../../../adapters/LinkedInButton.js";
import MicrosoftButton_default from "../../../../../adapters/MicrosoftButton.js";
import SignInWithEthereumButton_default from "../../../../../adapters/SignInWithEthereumButton.js";
import { ApplicationNativeAuthenticationConstants, EmbeddedSignInFlowAuthenticatorKnownIdPType } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignIn/v1/options/SignInOptionFactory.tsx
/**
* Creates the appropriate sign-in option component based on the authenticator's ID.
*/
const createSignInOption = ({ authenticator, onSubmit, buttonClassName, preferences,...rest }) => {
	const hasParams = authenticator.metadata?.params && authenticator.metadata.params.length > 0;
	switch (authenticator.authenticatorId) {
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.UsernamePassword: return /* @__PURE__ */ jsx(UsernamePassword_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.IdentifierFirst: return /* @__PURE__ */ jsx(IdentifierFirst_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Google: return /* @__PURE__ */ jsx(GoogleButton_default, {
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			preferences,
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.GitHub: return /* @__PURE__ */ jsx(GitHubButton_default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Microsoft: return /* @__PURE__ */ jsx(MicrosoftButton_default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Facebook: return /* @__PURE__ */ jsx(FacebookButton_default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.LinkedIn: return /* @__PURE__ */ jsx(LinkedInButton_default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.SignInWithEthereum: return /* @__PURE__ */ jsx(SignInWithEthereumButton_default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.EmailOtp: return hasParams ? /* @__PURE__ */ jsx(EmailOtp_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		}) : /* @__PURE__ */ jsx(MultiOptionButton_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Totp: return hasParams ? /* @__PURE__ */ jsx(Totp_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		}) : /* @__PURE__ */ jsx(MultiOptionButton_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case ApplicationNativeAuthenticationConstants.SupportedAuthenticators.SmsOtp: return hasParams ? /* @__PURE__ */ jsx(SmsOtp_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		}) : /* @__PURE__ */ jsx(MultiOptionButton_default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		default:
			if (authenticator.idp !== EmbeddedSignInFlowAuthenticatorKnownIdPType.Local) return /* @__PURE__ */ jsx(SocialButton_default, {
				authenticator,
				preferences,
				className: buttonClassName,
				onClick: () => onSubmit(authenticator),
				...rest,
				children: authenticator.idp
			});
			if (hasParams) return /* @__PURE__ */ jsx(UsernamePassword_default, {
				authenticator,
				preferences,
				onSubmit,
				...rest
			});
			return /* @__PURE__ */ jsx(MultiOptionButton_default, {
				authenticator,
				preferences,
				onSubmit,
				...rest
			});
	}
};
/**
* Convenience function that creates the appropriate sign-in option component from an authenticator.
*/
const createSignInOptionFromAuthenticator = (authenticator, formValues, touchedFields, isLoading, onInputChange, onSubmit, options) => createSignInOption({
	authenticator,
	formValues,
	isLoading,
	onInputChange,
	onSubmit,
	touchedFields,
	...options
});

//#endregion
export { createSignInOption, createSignInOptionFromAuthenticator };
//# sourceMappingURL=SignInOptionFactory.js.map