import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import { EmbeddedSignInFlowStatusV2, EmbeddedSignInFlowTypeV2, navigate } from "@thunderid/browser";
import { useEffect, useRef } from "react";

//#region src/components/auth/Callback/TokenCallback.tsx
const TokenCallback = ({ onNavigate, onError, onSuccess, signInPath = "/signin", signUpPath = "/signup" }) => {
	const processingRef = useRef(false);
	const { isInitialized, isLoading, signIn, signUp, getStorageManager } = useThunderID_default();
	const navigate$1 = (path) => {
		if (onNavigate) onNavigate(path);
		else navigate(path);
	};
	const clearTokenFromUrl = () => {
		if (!window?.location?.href) return;
		const url = new URL(window.location.href);
		url.searchParams.delete("token");
		url.searchParams.delete("type");
		window.history.replaceState({}, "", url.toString());
	};
	const initiateOAuthRedirect = (redirectURL, isRegistrationFlow) => {
		const redirectUrlObj = new URL(redirectURL);
		const state = redirectUrlObj.searchParams.get("state") || crypto.randomUUID();
		sessionStorage.setItem(`thunderid_oauth_${state}`, JSON.stringify({
			path: isRegistrationFlow ? signUpPath : signInPath,
			timestamp: Date.now()
		}));
		navigate(redirectUrlObj.toString());
	};
	const buildSignInPath = (executionId, applicationId, isRegistrationFlow) => {
		const params = new URLSearchParams();
		if (executionId) params.set("executionId", executionId);
		if (applicationId) params.set("applicationId", applicationId);
		const basePath = isRegistrationFlow ? signUpPath : signInPath;
		return params.toString() ? `${basePath}?${params.toString()}` : basePath;
	};
	const redirectWithError = (error, isRegistrationFlow) => {
		sessionStorage.removeItem("thunderid_execution_id");
		onError?.(error);
		const params = new URLSearchParams();
		params.set("error", "token_verification_failed");
		params.set("error_description", error.message);
		navigate$1(`${isRegistrationFlow ? signUpPath : signInPath}?${params.toString()}`);
	};
	useEffect(() => {
		if (!isInitialized || isLoading) return;
		const processTokenCallback = async () => {
			if (processingRef.current) return;
			processingRef.current = true;
			const searchParams = new URLSearchParams(window.location.search);
			const executionId = searchParams.get("id") || searchParams.get("executionId");
			const token = searchParams.get("token");
			const applicationId = searchParams.get("applicationId");
			const isRegistrationFlow = searchParams.get("type") === "REGISTRATION";
			clearTokenFromUrl();
			try {
				const storageManager = await getStorageManager();
				if (!executionId || !token) {
					redirectWithError(/* @__PURE__ */ new Error("Missing executionId or token in callback URL"), isRegistrationFlow);
					return;
				}
				let response;
				if (isRegistrationFlow) response = await signUp({
					executionId,
					inputs: { token }
				});
				else response = await signIn({
					executionId,
					inputs: { token }
				});
				if (response.type === EmbeddedSignInFlowTypeV2.Redirection) {
					const redirectURL = response.data?.redirectURL || response?.redirectURL;
					const nextExecutionId$1 = response.executionId || executionId;
					sessionStorage.setItem("thunderid_execution_id", nextExecutionId$1);
					if (redirectURL) {
						initiateOAuthRedirect(redirectURL, isRegistrationFlow);
						return;
					}
				}
				if (response.flowStatus === EmbeddedSignInFlowStatusV2.Complete) {
					const redirectUrl = response?.redirectUrl || response?.redirect_uri;
					sessionStorage.removeItem("thunderid_execution_id");
					await storageManager.removeHybridDataParameter("authId");
					onSuccess?.({
						redirectUrl,
						...response.data || {}
					});
					if (redirectUrl) {
						window.location.href = redirectUrl;
						return;
					}
					navigate$1(isRegistrationFlow ? signUpPath : signInPath);
					return;
				}
				if (response.flowStatus === EmbeddedSignInFlowStatusV2.Error) {
					const failureReason = response?.failureReason;
					const error = new Error(failureReason || "Token validation failed. Please try again.");
					await storageManager.removeHybridDataParameter("authId");
					redirectWithError(error, isRegistrationFlow);
					return;
				}
				const nextExecutionId = response.executionId || executionId;
				sessionStorage.setItem("thunderid_execution_id", nextExecutionId);
				if (response.challengeToken) await storageManager.setTemporaryDataParameter("challengeToken", response.challengeToken);
				navigate$1(buildSignInPath(nextExecutionId, applicationId, isRegistrationFlow));
			} catch (err) {
				const error = err instanceof Error ? err : /* @__PURE__ */ new Error("Token callback processing failed");
				console.error("Token callback error:", err);
				const storageManager = await getStorageManager();
				if (storageManager) await storageManager.removeHybridDataParameter("authId");
				redirectWithError(error, isRegistrationFlow);
			}
		};
		processTokenCallback();
	}, [
		getStorageManager,
		isInitialized,
		isLoading,
		onError,
		onNavigate,
		onSuccess,
		signIn,
		signUp,
		signInPath,
		signUpPath
	]);
	return null;
};

//#endregion
export { TokenCallback };
//# sourceMappingURL=TokenCallback.js.map