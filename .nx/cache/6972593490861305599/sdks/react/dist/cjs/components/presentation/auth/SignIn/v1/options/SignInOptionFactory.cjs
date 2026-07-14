const require_rolldown_runtime = require('../../../../../../_virtual/rolldown_runtime.cjs');
const require_EmailOtp = require('./EmailOtp.cjs');
const require_IdentifierFirst = require('./IdentifierFirst.cjs');
const require_MultiOptionButton = require('./MultiOptionButton.cjs');
const require_SmsOtp = require('./SmsOtp.cjs');
const require_SocialButton = require('./SocialButton.cjs');
const require_Totp = require('./Totp.cjs');
const require_UsernamePassword = require('./UsernamePassword.cjs');
const require_FacebookButton = require('../../../../../adapters/FacebookButton.cjs');
const require_GitHubButton = require('../../../../../adapters/GitHubButton.cjs');
const require_GoogleButton = require('../../../../../adapters/GoogleButton.cjs');
const require_LinkedInButton = require('../../../../../adapters/LinkedInButton.cjs');
const require_MicrosoftButton = require('../../../../../adapters/MicrosoftButton.cjs');
const require_SignInWithEthereumButton = require('../../../../../adapters/SignInWithEthereumButton.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/SignIn/v1/options/SignInOptionFactory.tsx
/**
* Creates the appropriate sign-in option component based on the authenticator's ID.
*/
const createSignInOption = ({ authenticator, onSubmit, buttonClassName, preferences,...rest }) => {
	const hasParams = authenticator.metadata?.params && authenticator.metadata.params.length > 0;
	switch (authenticator.authenticatorId) {
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.UsernamePassword: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_UsernamePassword.default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.IdentifierFirst: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_IdentifierFirst.default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Google: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_GoogleButton.default, {
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			preferences,
			...rest
		});
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.GitHub: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_GitHubButton.default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Microsoft: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_MicrosoftButton.default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Facebook: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FacebookButton.default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.LinkedIn: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_LinkedInButton.default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.SignInWithEthereum: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SignInWithEthereumButton.default, {
			preferences,
			className: buttonClassName,
			onClick: () => onSubmit(authenticator),
			...rest
		});
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.EmailOtp: return hasParams ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EmailOtp.default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_MultiOptionButton.default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Totp: return hasParams ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Totp.default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_MultiOptionButton.default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		case __thunderid_browser.ApplicationNativeAuthenticationConstants.SupportedAuthenticators.SmsOtp: return hasParams ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SmsOtp.default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_MultiOptionButton.default, {
			authenticator,
			preferences,
			onSubmit,
			...rest
		});
		default:
			if (authenticator.idp !== __thunderid_browser.EmbeddedSignInFlowAuthenticatorKnownIdPType.Local) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SocialButton.default, {
				authenticator,
				preferences,
				className: buttonClassName,
				onClick: () => onSubmit(authenticator),
				...rest,
				children: authenticator.idp
			});
			if (hasParams) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_UsernamePassword.default, {
				authenticator,
				preferences,
				onSubmit,
				...rest
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_MultiOptionButton.default, {
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
exports.createSignInOption = createSignInOption;
exports.createSignInOptionFromAuthenticator = createSignInOptionFromAuthenticator;
//# sourceMappingURL=SignInOptionFactory.cjs.map