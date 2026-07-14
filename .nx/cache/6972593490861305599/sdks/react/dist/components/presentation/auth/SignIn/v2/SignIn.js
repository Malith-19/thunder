import useThunderID_default from "../../../../../contexts/ThunderID/useThunderID.js";
import useTranslation_default from "../../../../../hooks/useTranslation.js";
import { extractErrorMessage, normalizeFlowResponse } from "../../../../../utils/v2/flowTransformer.js";
import BaseSignIn_default from "./BaseSignIn.js";
import { useOAuthCallback } from "../../../../../hooks/v2/useOAuthCallback.js";
import { initiateOAuthRedirect } from "../../../../../utils/oauth.js";
import { handlePasskeyAuthentication, handlePasskeyRegistration } from "../../../../../utils/v2/passkey.js";
import { EmbeddedFlowType, EmbeddedSignInFlowStatusV2, EmbeddedSignInFlowTypeV2, ThunderIDAPIError, ThunderIDRuntimeError, logger } from "@thunderid/browser";
import { useEffect, useRef, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/SignIn/v2/SignIn.tsx
/**
* A component-driven SignIn component that provides authentication flow with pre-built styling.
* This component handles the flow API calls for authentication and delegates UI logic to BaseSignIn.
* It automatically transforms simple input-based responses into component-driven UI format.
*
* @example
* // Default UI
* ```tsx
* import { SignIn } from '@thunderid/react/component-driven';
*
* const App = () => {
*   return (
*     <SignIn
*       onSuccess={(authData) => {
*         console.log('Authentication successful:', authData);
*       }}
*       onError={(error) => {
*         console.error('Authentication failed:', error);
*       }}
*       size="medium"
*       variant="outlined"
*     />
*   );
* };
* ```
*
* @example
* // Custom UI with render props
* ```tsx
* import { SignIn } from '@thunderid/react/component-driven';
*
* const App = () => {
*   return (
*     <SignIn
*       onSuccess={(authData) => console.log('Success:', authData)}
*       onError={(error) => console.error('Error:', error)}
*     >
*       {({signIn, isLoading, components, error, isInitialized}) => (
*         <div className="custom-signin">
*           <h1>Custom Sign In</h1>
*           {!isInitialized ? (
*             <p>Initializing...</p>
*           ) : error ? (
*             <div className="error">{error.message}</div>
*           ) : (
*             <form onSubmit={(e) => {
*               e.preventDefault();
*               signIn({inputs: {username: 'user', password: 'pass'}});
*             }}>
*               <button type="submit" disabled={isLoading}>
*                 {isLoading ? 'Signing in...' : 'Sign In'}
*               </button>
*             </form>
*           )}
*         </div>
*       )}
*     </SignIn>
*   );
* };
* ```
*/
const SignIn = ({ className, preferences, size = "medium", onSuccess, onError, variant, children }) => {
	const { applicationId, afterSignInUrl, signIn, isInitialized, isLoading, meta, getStorageManager, scopes } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [components, setComponents] = useState([]);
	const [additionalData, setAdditionalData] = useState({});
	const [serverFieldErrors, setServerFieldErrors] = useState(null);
	const [currentExecutionId, setCurrentExecutionId] = useState(null);
	const challengeTokenRef = useRef(null);
	const [isStorageReady, setIsStorageReady] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [flowError, setFlowError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isTimeoutDisabled, setIsTimeoutDisabled] = useState(false);
	const [passkeyState, setPasskeyState] = useState({
		actionId: null,
		challenge: null,
		creationOptions: null,
		error: null,
		executionId: null,
		isActive: false
	});
	const initializationAttemptedRef = useRef(false);
	const oauthCodeProcessedRef = useRef(false);
	const passkeyProcessedRef = useRef(false);
	/**
	* Sets executionId between sessionStorage and state.
	* This ensures both are always in sync.
	*/
	const setExecutionId = (executionId) => {
		setCurrentExecutionId(executionId);
		if (executionId) sessionStorage.setItem("thunderid_execution_id", executionId);
		else sessionStorage.removeItem("thunderid_execution_id");
	};
	/**
	* Restore any challenge token persisted before an OAuth redirect.
	* Waits for SDK initialization before reading from storage.
	*/
	useEffect(() => {
		if (!isInitialized) return;
		(async () => {
			try {
				const tempData = await (await getStorageManager())?.getTemporaryData();
				if (tempData?.challengeToken) challengeTokenRef.current = tempData.challengeToken;
			} finally {
				setIsStorageReady(true);
			}
		})();
	}, [isInitialized]);
	/**
	* Updates challengeTokenRef immediately (stale-closure safe) and persists via
	* the provider's StorageManager so the token survives OAuth redirects.
	*/
	const setChallengeToken = async (challengeToken) => {
		challengeTokenRef.current = challengeToken;
		try {
			const storageManager = await getStorageManager();
			if (storageManager) if (challengeToken) await storageManager.setTemporaryDataParameter("challengeToken", challengeToken);
			else await storageManager.removeTemporaryDataParameter("challengeToken");
		} catch {
			logger.warn("Failed to persist challenge token in storage.");
		}
	};
	/**
	* Clear all flow-related storage and state.
	*/
	const clearFlowState = async () => {
		setExecutionId(null);
		await setChallengeToken(null);
		setIsFlowInitialized(false);
		try {
			await (await getStorageManager())?.removeHybridDataParameter?.("authId");
		} catch {
			logger.warn("Failed to clear authId from hybrid storage.");
		}
		setIsTimeoutDisabled(false);
		oauthCodeProcessedRef.current = false;
	};
	/**
	* Parse URL parameters used in flows.
	*/
	const getUrlParams = () => {
		const urlParams = new URL(window?.location?.href ?? "").searchParams;
		return {
			applicationId: urlParams.get("applicationId"),
			authId: urlParams.get("authId"),
			code: urlParams.get("code"),
			error: urlParams.get("error"),
			errorDescription: urlParams.get("error_description"),
			executionId: urlParams.get("executionId"),
			nonce: urlParams.get("nonce"),
			state: urlParams.get("state")
		};
	};
	/**
	* Handle authId from URL and persist it via the storage manager so it survives URL cleanup.
	* ThunderIDReactClient.signIn() reads authId from storageManager.getHybridDataParameter('authId'),
	* not from raw sessionStorage, so we must use the same storage path here.
	*/
	const handleAuthId = async (authId) => {
		if (authId) try {
			await (await getStorageManager())?.setHybridDataParameter?.("authId", authId);
		} catch {
			logger.warn("Failed to store authId in hybrid storage.");
		}
	};
	/**
	* Clean up OAuth-related URL parameters from the browser URL.
	*/
	const cleanupOAuthUrlParams = (includeNonce = false) => {
		if (!window?.location?.href) return;
		const url = new URL(window.location.href);
		url.searchParams.delete("error");
		url.searchParams.delete("error_description");
		url.searchParams.delete("code");
		url.searchParams.delete("state");
		if (includeNonce) url.searchParams.delete("nonce");
		window?.history?.replaceState({}, "", url.toString());
	};
	/**
	* Clean up flow-related URL parameters (executionId, authId) from the browser URL.
	* Used after executionId is set in state to prevent using invalidated executionId from URL.
	*/
	const cleanupFlowUrlParams = () => {
		if (!window?.location?.href) return;
		const url = new URL(window.location.href);
		url.searchParams.delete("executionId");
		url.searchParams.delete("authId");
		url.searchParams.delete("applicationId");
		window?.history?.replaceState({}, "", url.toString());
	};
	/**
	* Set error state and call onError callback.
	* Ensures isFlowInitialized is true so errors can be displayed in the UI.
	*/
	const setError = (error) => {
		setFlowError(error);
		setIsFlowInitialized(true);
		onError?.(error);
	};
	/**
	* Handle OAuth error from URL parameters.
	* Clears flow state, creates error, and cleans up URL.
	*/
	const handleOAuthError = (error, errorDescription) => {
		clearFlowState();
		setError(new ThunderIDRuntimeError(errorDescription || `OAuth error: ${error}`, "SIGN_IN_ERROR", "react"));
		cleanupOAuthUrlParams(true);
	};
	/**
	* Handle REDIRECTION response by storing flow state and redirecting to OAuth provider.
	*/
	const handleRedirection = async (response) => {
		if (response.type === EmbeddedSignInFlowTypeV2.Redirection) {
			const redirectURL = response.data?.redirectURL || response?.redirectURL;
			if (redirectURL && window?.location) {
				if (response.executionId) setExecutionId(response.executionId);
				await setChallengeToken(response.challengeToken ?? null);
				await handleAuthId(getUrlParams().authId);
				initiateOAuthRedirect(redirectURL);
				return true;
			}
		}
		return false;
	};
	/**
	* Initialize the authentication flow.
	* Priority: executionId > applicationId (from context) > applicationId (from URL)
	*/
	const initializeFlow = async () => {
		const urlParams = getUrlParams();
		oauthCodeProcessedRef.current = false;
		setServerFieldErrors(null);
		await handleAuthId(urlParams.authId);
		const effectiveApplicationId = applicationId || urlParams.applicationId;
		const storedExecutionId = !urlParams.executionId ? sessionStorage.getItem("thunderid_execution_id") : null;
		const resumeExecutionId = urlParams.executionId || storedExecutionId;
		if (!resumeExecutionId && !effectiveApplicationId) {
			const error = new ThunderIDRuntimeError("Either executionId or applicationId is required for authentication", "SIGN_IN_ERROR", "react");
			setError(error);
			throw error;
		}
		try {
			setFlowError(null);
			let response;
			if (resumeExecutionId) try {
				response = await signIn({
					executionId: resumeExecutionId,
					...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
				});
			} catch (resumeError) {
				if (storedExecutionId && resumeExecutionId === storedExecutionId && resumeError instanceof ThunderIDAPIError && resumeError.statusCode === 400) {
					setExecutionId(null);
					try {
						await (await getStorageManager())?.removeHybridDataParameter?.("authId");
					} catch {
						logger.warn("Failed to clear authId from hybrid storage.");
					}
					if (!effectiveApplicationId) {
						setError(new ThunderIDRuntimeError(t("errors.signin.session.expired") || "Your session has expired. Please return to the application and sign in again.", "SIGN_IN_ERROR", "react"));
						return;
					}
					response = await signIn({
						applicationId: effectiveApplicationId,
						flowType: EmbeddedFlowType.Authentication,
						...scopes && { scopes }
					});
				} else throw resumeError;
			}
			else response = await signIn({
				applicationId: effectiveApplicationId,
				flowType: EmbeddedFlowType.Authentication,
				...scopes && { scopes }
			});
			if (await handleRedirection(response)) return;
			const { executionId: normalizedExecutionId, components: normalizedComponents, additionalData: normalizedAdditionalData } = normalizeFlowResponse(response, t, { resolveTranslations: false }, meta);
			await setChallengeToken(response.challengeToken ?? null);
			if (normalizedExecutionId && normalizedComponents) {
				setExecutionId(normalizedExecutionId);
				setComponents(normalizedComponents);
				setAdditionalData(normalizedAdditionalData ?? {});
				setIsFlowInitialized(true);
				setIsTimeoutDisabled(false);
				cleanupFlowUrlParams();
			}
		} catch (error) {
			const err = error;
			await clearFlowState();
			setError(err instanceof ThunderIDRuntimeError ? err : new Error(extractErrorMessage(err, t)));
			initializationAttemptedRef.current = false;
		}
	};
	/**
	* Initialize the flow and handle cleanup of stale flow state.
	*/
	useEffect(() => {
		const urlParams = getUrlParams();
		if (urlParams.error) {
			handleOAuthError(urlParams.error, urlParams.errorDescription);
			return;
		}
		handleAuthId(urlParams.authId);
	}, []);
	useEffect(() => {
		const currentUrlParams = getUrlParams();
		if (isInitialized && isStorageReady && !isLoading && !isFlowInitialized && !initializationAttemptedRef.current && !currentExecutionId && !currentUrlParams.code && !currentUrlParams.state && !isSubmitting && !oauthCodeProcessedRef.current) {
			initializationAttemptedRef.current = true;
			initializeFlow();
		}
	}, [
		isInitialized,
		isStorageReady,
		isLoading,
		isFlowInitialized,
		currentExecutionId
	]);
	/**
	* Handle step timeout if configured in additionalData.
	*/
	useEffect(() => {
		const timeoutMs = Number(additionalData?.["stepTimeout"]) || 0;
		if (timeoutMs <= 0 || !isFlowInitialized) {
			setIsTimeoutDisabled(false);
			return;
		}
		const remaining = Math.max(0, Math.floor((timeoutMs - Date.now()) / 1e3));
		const handleTimeout = () => {
			const errorMessage = t("errors.signin.timeout") || "Time allowed to complete the step has expired.";
			setError(new Error(errorMessage));
			setIsTimeoutDisabled(true);
		};
		if (remaining <= 0) {
			handleTimeout();
			return;
		}
		const timerId = setTimeout(() => {
			handleTimeout();
		}, remaining * 1e3);
		return () => clearTimeout(timerId);
	}, [
		additionalData?.["stepTimeout"],
		isFlowInitialized,
		t
	]);
	/**
	* Handle form submission from BaseSignIn or render props.
	*/
	const handleSubmit = async (payload) => {
		const effectiveExecutionId = payload.executionId || currentExecutionId;
		if (!effectiveExecutionId) throw new Error("No active flow ID");
		const processedInputs = { ...payload.inputs };
		if (additionalData?.["consentPrompt"]) try {
			const consentPromptRawData = additionalData["consentPrompt"];
			const purposes = typeof consentPromptRawData === "string" ? JSON.parse(consentPromptRawData) : consentPromptRawData.purposes || consentPromptRawData;
			let isDeny = false;
			if (payload.action) {
				const findAction = (comps) => {
					if (!comps || comps.length === 0) return null;
					const found = comps.find((c) => c.id === payload.action);
					if (found) return found;
					return comps.reduce((acc, c) => {
						if (acc) return acc;
						if (c.components) return findAction(c.components);
						return null;
					}, null);
				};
				const submitAction = findAction(components);
				if (submitAction && submitAction.variant?.toLowerCase() !== "primary") isDeny = true;
			}
			const decisions = { purposes: purposes.map((p) => ({
				approved: !isDeny,
				elements: [...(p.essential || []).map((e) => ({
					approved: !isDeny,
					name: e.name
				})), ...(p.optional || []).map((e) => {
					const key = `__consent_opt__${p.purposeId}__${e.name}`;
					return {
						approved: isDeny ? false : processedInputs[key] !== "false",
						name: e.name
					};
				})],
				purposeName: p.purposeName
			})) };
			processedInputs["consent_decisions"] = JSON.stringify(decisions);
			Object.keys(processedInputs).forEach((key) => {
				if (key.startsWith("__consent_opt__")) delete processedInputs[key];
			});
		} catch (e) {}
		try {
			setIsSubmitting(true);
			setFlowError(null);
			setServerFieldErrors(null);
			const response = await signIn({
				executionId: effectiveExecutionId,
				...payload,
				inputs: processedInputs,
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
			});
			if (await handleRedirection(response)) return;
			if (response.data?.additionalData?.["passkeyChallenge"] || response.data?.additionalData?.["passkeyCreationOptions"]) {
				const { passkeyChallenge, passkeyCreationOptions } = response.data.additionalData;
				const effectiveExecutionIdForPasskey = response.executionId || effectiveExecutionId;
				passkeyProcessedRef.current = false;
				await setChallengeToken(response.challengeToken ?? null);
				setPasskeyState({
					actionId: "submit",
					challenge: passkeyChallenge,
					creationOptions: passkeyCreationOptions,
					error: null,
					executionId: effectiveExecutionIdForPasskey,
					isActive: true
				});
				setIsSubmitting(false);
				return;
			}
			const { executionId: normalizedExecutionId, components: normalizedComponents, additionalData: normalizedAdditionalData } = normalizeFlowResponse(response, t, { resolveTranslations: false }, meta);
			if (response.flowStatus === EmbeddedSignInFlowStatusV2.Error) {
				await clearFlowState();
				const err = new Error(extractErrorMessage(response, t));
				setError(err);
				cleanupFlowUrlParams();
				throw err;
			}
			if (response.flowStatus === EmbeddedSignInFlowStatusV2.Complete) {
				const finalRedirectUrl = response?.redirectUrl || response?.redirect_uri || afterSignInUrl;
				setIsSubmitting(false);
				setExecutionId(null);
				await setChallengeToken(null);
				setIsFlowInitialized(false);
				sessionStorage.removeItem("thunderid_execution_id");
				try {
					await (await getStorageManager())?.removeHybridDataParameter?.("authId");
				} catch {
					logger.warn("Failed to clear authId from hybrid storage after completion.");
				}
				cleanupOAuthUrlParams(true);
				if (onSuccess) onSuccess({
					redirectUrl: finalRedirectUrl,
					...response.data || {}
				});
				if (finalRedirectUrl && window?.location) window.location.href = finalRedirectUrl;
				return;
			}
			await setChallengeToken(response.challengeToken ?? null);
			if (normalizedExecutionId && normalizedComponents) {
				setExecutionId(normalizedExecutionId);
				setComponents(normalizedComponents);
				setAdditionalData(normalizedAdditionalData ?? {});
				setIsTimeoutDisabled(false);
				setIsFlowInitialized(true);
				cleanupFlowUrlParams();
				const responseFieldErrors = response.data?.fieldErrors;
				if (responseFieldErrors && responseFieldErrors.length > 0) setServerFieldErrors(responseFieldErrors);
				if (response?.error) setFlowError(new Error(extractErrorMessage(response, t)));
			}
		} catch (error) {
			const err = error;
			await clearFlowState();
			setError(err instanceof ThunderIDRuntimeError ? err : new Error(extractErrorMessage(err, t)));
			return;
		} finally {
			setIsSubmitting(false);
		}
	};
	/**
	* Handle authentication errors.
	*/
	const handleError = (error) => {
		setError(error);
	};
	useOAuthCallback({
		currentExecutionId,
		isInitialized: isInitialized && !isLoading && isStorageReady,
		isSubmitting,
		onError: (err) => {
			clearFlowState();
			setError(err instanceof Error ? err : new Error(String(err)));
		},
		onSubmit: async (payload) => handleSubmit({
			executionId: payload.executionId,
			inputs: payload.inputs
		}),
		processedRef: oauthCodeProcessedRef,
		setExecutionId
	});
	/**
	* Handle passkey authentication/registration when passkey state becomes active.
	* This effect auto-triggers the browser passkey popup and submits the result.
	*/
	useEffect(() => {
		if (!passkeyState.isActive || !passkeyState.challenge && !passkeyState.creationOptions || !passkeyState.executionId) return;
		if (passkeyProcessedRef.current) return;
		passkeyProcessedRef.current = true;
		const performPasskeyProcess = async () => {
			let inputs;
			if (passkeyState.challenge) {
				const passkeyResponse = await handlePasskeyAuthentication(passkeyState.challenge);
				const passkeyResponseObj = JSON.parse(passkeyResponse);
				inputs = {
					authenticatorData: passkeyResponseObj.response.authenticatorData,
					clientDataJSON: passkeyResponseObj.response.clientDataJSON,
					credentialId: passkeyResponseObj.id,
					signature: passkeyResponseObj.response.signature,
					userHandle: passkeyResponseObj.response.userHandle
				};
			} else if (passkeyState.creationOptions) {
				const passkeyResponse = await handlePasskeyRegistration(passkeyState.creationOptions);
				const passkeyResponseObj = JSON.parse(passkeyResponse);
				inputs = {
					attestationObject: passkeyResponseObj.response.attestationObject,
					clientDataJSON: passkeyResponseObj.response.clientDataJSON,
					credentialId: passkeyResponseObj.id
				};
			} else throw new Error("No passkey challenge or creation options available");
			await handleSubmit({
				executionId: passkeyState.executionId ?? void 0,
				inputs
			});
		};
		performPasskeyProcess().then(() => {
			setPasskeyState({
				actionId: null,
				challenge: null,
				creationOptions: null,
				error: null,
				executionId: null,
				isActive: false
			});
		}).catch((error) => {
			setPasskeyState((prev) => ({
				...prev,
				error,
				isActive: false
			}));
			setFlowError(error);
			onError?.(error);
		});
	}, [
		passkeyState.isActive,
		passkeyState.challenge,
		passkeyState.creationOptions,
		passkeyState.executionId
	]);
	if (children) {
		const renderPropFieldErrors = {};
		if (serverFieldErrors) {
			for (const fe of serverFieldErrors) if (!(fe.identifier in renderPropFieldErrors)) renderPropFieldErrors[fe.identifier] = fe.message;
		}
		return /* @__PURE__ */ jsx(Fragment, { children: children({
			additionalData,
			components,
			error: flowError,
			fieldErrors: renderPropFieldErrors,
			initialize: initializeFlow,
			isInitialized: isFlowInitialized,
			isLoading: isLoading || isSubmitting || !isInitialized,
			isTimeoutDisabled,
			meta,
			onSubmit: handleSubmit
		}) });
	}
	return /* @__PURE__ */ jsx(BaseSignIn_default, {
		additionalData,
		components,
		isLoading: isLoading || !isInitialized || !isFlowInitialized,
		isTimeoutDisabled,
		onSubmit: handleSubmit,
		onError: handleError,
		error: flowError,
		className,
		size,
		variant,
		preferences,
		serverFieldErrors
	});
};
var SignIn_default = SignIn;

//#endregion
export { SignIn_default as default };
//# sourceMappingURL=SignIn.js.map