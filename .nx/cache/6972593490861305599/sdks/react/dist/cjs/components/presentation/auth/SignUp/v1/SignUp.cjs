const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../../../contexts/ThunderID/useThunderID.cjs');
const require_BaseSignUp = require('./BaseSignUp.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/SignUp/v1/SignUp.tsx
/**
* A styled SignUp component for ThunderID platform that provides embedded sign-up flow with pre-built styling.
* This component handles the API calls for sign-up and delegates UI logic to BaseSignUp.
*/
const SignUp = ({ className, size = "medium", afterSignUpUrl, onError, onComplete, shouldRedirectAfterSignUp = true, children,...rest }) => {
	const { signUp, isInitialized } = require_useThunderID.default();
	/**
	* Initialize the sign-up flow.
	*/
	const handleInitialize = async (payload) => {
		return await signUp(payload || { flowType: __thunderid_browser.EmbeddedFlowType.Registration });
	};
	/**
	* Handle sign-up steps.
	*/
	const handleOnSubmit = async (payload) => await signUp(payload);
	/**
	* Handle successful sign-up and redirect.
	*/
	const handleComplete = (response) => {
		onComplete?.(response);
		if (shouldRedirectAfterSignUp && response?.type !== __thunderid_browser.EmbeddedFlowResponseType.Redirection && afterSignUpUrl) window.location.href = afterSignUpUrl;
		if (shouldRedirectAfterSignUp && response?.type === __thunderid_browser.EmbeddedFlowResponseType.Redirection && response?.data?.redirectURL && !response.data.redirectURL.includes("oauth") && !response.data.redirectURL.includes("auth")) window.location.href = response.data.redirectURL;
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseSignUp.default, {
		afterSignUpUrl,
		onInitialize: handleInitialize,
		onSubmit: handleOnSubmit,
		onError,
		onComplete: handleComplete,
		className,
		size,
		isInitialized,
		children,
		showLogo: true,
		showTitle: false,
		showSubtitle: false,
		...rest
	});
};
var SignUp_default = SignUp;

//#endregion
exports.default = SignUp_default;
//# sourceMappingURL=SignUp.cjs.map