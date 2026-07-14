const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../../../contexts/ThunderID/useThunderID.cjs');
const require_BaseSignUp = require('./BaseSignUp.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/SignUp/v2/SignUp.tsx
/**
* A styled SignUp component for ThunderIDV2 (AKA Thunder) platform that provides embedded sign-up flow with pre-built styling.
* This component handles the API calls for sign-up and delegates UI logic to BaseSignUp.
*/
const SignUp = ({ className, size = "medium", afterSignUpUrl, onError, onComplete, shouldRedirectAfterSignUp = true, children,...rest }) => {
	const { signUp, isInitialized, applicationId, scopes } = require_useThunderID.default();
	/**
	* Initialize the sign-up flow.
	*/
	const handleInitialize = async (payload) => {
		const urlParams = new URL(window.location.href).searchParams;
		const executionIdFromUrl = urlParams.get("executionId") || "";
		const applicationIdFromUrl = urlParams.get("applicationId") ?? "";
		const effectiveApplicationId = applicationId ?? applicationIdFromUrl;
		const challengeToken = payload?.challengeToken;
		let initialPayload;
		if (executionIdFromUrl) initialPayload = {
			executionId: executionIdFromUrl,
			...challengeToken ? { challengeToken } : {}
		};
		else if (!payload || !("flowType" in payload)) initialPayload = {
			...payload || {},
			flowType: __thunderid_browser.EmbeddedFlowType.Registration,
			...effectiveApplicationId && { applicationId: effectiveApplicationId },
			...scopes && { scopes }
		};
		else initialPayload = payload;
		return await signUp(initialPayload);
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
		if (!shouldRedirectAfterSignUp) return;
		const redirectURL = (response?.data)?.["redirectURL"];
		if (response?.type === __thunderid_browser.EmbeddedSignUpFlowTypeV2.Redirection && redirectURL && !redirectURL.includes("oauth") && !redirectURL.includes("auth")) {
			window.location.href = redirectURL;
			return;
		}
		const oauthRedirectUrl = response?.redirectUrl;
		if (oauthRedirectUrl) {
			window.location.href = oauthRedirectUrl;
			return;
		}
		if (response?.type !== __thunderid_browser.EmbeddedSignUpFlowTypeV2.Redirection && afterSignUpUrl && !response?.assertion) window.location.href = afterSignUpUrl;
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
		showTitle: true,
		showSubtitle: true,
		...rest
	});
};
var SignUp_default = SignUp;

//#endregion
exports.default = SignUp_default;
//# sourceMappingURL=SignUp.cjs.map