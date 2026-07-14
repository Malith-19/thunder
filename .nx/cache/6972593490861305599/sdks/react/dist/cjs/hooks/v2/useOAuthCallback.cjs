const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/hooks/v2/useOAuthCallback.ts
function cleanupUrlParams() {
	if (typeof window === "undefined") return;
	const url = new URL(window.location.href);
	url.searchParams.delete("code");
	url.searchParams.delete("nonce");
	url.searchParams.delete("state");
	url.searchParams.delete("error");
	url.searchParams.delete("error_description");
	window.history.replaceState({}, "", url.toString());
}
/**
* Processes OAuth callbacks by detecting auth code in URL, resolving executionId, and submitting to server.
* Used by SignIn, SignUp, and AcceptInvite components.
*/
function useOAuthCallback({ currentExecutionId, executionIdStorageKey = "thunderid_execution_id", isInitialized, isSubmitting = false, onComplete, onError, onFlowChange, onProcessingStart, onSubmit, processedRef, setExecutionId: setExecExecutionId, tokenValidationAttemptedRef }) {
	const internalRef = (0, react.useRef)(false);
	const oauthCodeProcessedRef = processedRef ?? internalRef;
	(0, react.useEffect)(() => {
		if (!isInitialized || isSubmitting) return;
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");
		const nonce = urlParams.get("nonce");
		const state = urlParams.get("state");
		const executionIdFromUrl = urlParams.get("executionId");
		const error = urlParams.get("error");
		const errorDescription = urlParams.get("error_description");
		if (error) {
			oauthCodeProcessedRef.current = true;
			if (tokenValidationAttemptedRef) tokenValidationAttemptedRef.current = true;
			onError?.(new Error(errorDescription || error || "OAuth authentication failed"));
			cleanupUrlParams();
			return;
		}
		if (!code || oauthCodeProcessedRef.current) return;
		if (tokenValidationAttemptedRef?.current) return;
		const storedExecutionId = sessionStorage.getItem(executionIdStorageKey);
		const executionIdToUse = currentExecutionId || storedExecutionId || executionIdFromUrl || state || null;
		if (!executionIdToUse) {
			oauthCodeProcessedRef.current = true;
			onError?.(/* @__PURE__ */ new Error("Invalid flow. Missing executionId."));
			cleanupUrlParams();
			return;
		}
		oauthCodeProcessedRef.current = true;
		if (tokenValidationAttemptedRef) tokenValidationAttemptedRef.current = true;
		onProcessingStart?.();
		if (!currentExecutionId && setExecExecutionId) setExecExecutionId(executionIdToUse);
		(async () => {
			try {
				const response = await onSubmit({
					executionId: executionIdToUse,
					inputs: {
						code,
						...nonce && { nonce }
					}
				});
				onFlowChange?.(response);
				if (response?.flowStatus === "COMPLETE" || response?.status === "COMPLETE") onComplete?.();
				if (response?.flowStatus === "ERROR" || response?.status === "ERROR") onError?.(response);
				cleanupUrlParams();
			} catch (err) {
				onError?.(err);
				cleanupUrlParams();
			}
		})();
	}, [
		isInitialized,
		currentExecutionId,
		isSubmitting,
		onSubmit,
		onComplete,
		onError,
		onFlowChange,
		setExecExecutionId,
		executionIdStorageKey
	]);
}

//#endregion
exports.useOAuthCallback = useOAuthCallback;
//# sourceMappingURL=useOAuthCallback.cjs.map