import useThunderID_default from "../../../../../contexts/ThunderID/useThunderID.js";
import BaseSignUp_default from "./BaseSignUp.js";
import { EmbeddedFlowType, EmbeddedSignUpFlowTypeV2 } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignUp/v2/SignUp.tsx
/**
* A styled SignUp component for ThunderIDV2 (AKA Thunder) platform that provides embedded sign-up flow with pre-built styling.
* This component handles the API calls for sign-up and delegates UI logic to BaseSignUp.
*/
const SignUp = ({ className, size = "medium", afterSignUpUrl, onError, onComplete, shouldRedirectAfterSignUp = true, children,...rest }) => {
	const { signUp, isInitialized, applicationId, scopes } = useThunderID_default();
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
			flowType: EmbeddedFlowType.Registration,
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
		if (response?.type === EmbeddedSignUpFlowTypeV2.Redirection && redirectURL && !redirectURL.includes("oauth") && !redirectURL.includes("auth")) {
			window.location.href = redirectURL;
			return;
		}
		const oauthRedirectUrl = response?.redirectUrl;
		if (oauthRedirectUrl) {
			window.location.href = oauthRedirectUrl;
			return;
		}
		if (response?.type !== EmbeddedSignUpFlowTypeV2.Redirection && afterSignUpUrl && !response?.assertion) window.location.href = afterSignUpUrl;
	};
	return /* @__PURE__ */ jsx(BaseSignUp_default, {
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
export { SignUp_default as default };
//# sourceMappingURL=SignUp.js.map