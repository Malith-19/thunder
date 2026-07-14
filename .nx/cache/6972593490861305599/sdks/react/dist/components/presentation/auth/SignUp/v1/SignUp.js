import useThunderID_default from "../../../../../contexts/ThunderID/useThunderID.js";
import BaseSignUp_default from "./BaseSignUp.js";
import { EmbeddedFlowResponseType, EmbeddedFlowType } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignUp/v1/SignUp.tsx
/**
* A styled SignUp component for ThunderID platform that provides embedded sign-up flow with pre-built styling.
* This component handles the API calls for sign-up and delegates UI logic to BaseSignUp.
*/
const SignUp = ({ className, size = "medium", afterSignUpUrl, onError, onComplete, shouldRedirectAfterSignUp = true, children,...rest }) => {
	const { signUp, isInitialized } = useThunderID_default();
	/**
	* Initialize the sign-up flow.
	*/
	const handleInitialize = async (payload) => {
		return await signUp(payload || { flowType: EmbeddedFlowType.Registration });
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
		if (shouldRedirectAfterSignUp && response?.type !== EmbeddedFlowResponseType.Redirection && afterSignUpUrl) window.location.href = afterSignUpUrl;
		if (shouldRedirectAfterSignUp && response?.type === EmbeddedFlowResponseType.Redirection && response?.data?.redirectURL && !response.data.redirectURL.includes("oauth") && !response.data.redirectURL.includes("auth")) window.location.href = response.data.redirectURL;
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
		showLogo: true,
		showTitle: false,
		showSubtitle: false,
		...rest
	});
};
var SignUp_default = SignUp;

//#endregion
export { SignUp_default as default };
//# sourceMappingURL=SignUp.js.map