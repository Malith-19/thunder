import FlowProvider_default from "../../../../../contexts/Flow/FlowProvider.js";
import useFlow_default from "../../../../../contexts/Flow/useFlow.js";
import useTheme_default from "../../../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../../../hooks/useTranslation.js";
import { useForm } from "../../../../../hooks/useForm.js";
import Spinner_default from "../../../../primitives/Spinner/Spinner.js";
import Typography_default from "../../../../primitives/Typography/Typography.js";
import { createSignInOptionFromAuthenticator } from "./options/SignInOptionFactory.js";
import Alert_default from "../../../../primitives/Alert/Alert.js";
import Card_default from "../../../../primitives/Card/Card.js";
import Divider_default from "../../../../primitives/Divider/Divider.js";
import Logo_default from "../../../../primitives/Logo/Logo.js";
import BaseSignIn_styles_default from "../BaseSignIn.styles.js";
import { ApplicationNativeAuthenticationConstants, EmbeddedSignInFlowAuthenticatorPromptType, EmbeddedSignInFlowStatus, EmbeddedSignInFlowStepType, ThunderIDAPIError, createPackageComponentLogger, handleWebAuthnAuthentication, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/auth/SignIn/v1/BaseSignIn.tsx
const logger$1 = createPackageComponentLogger("@thunderid/react", "BaseSignIn");
/**
* Check if the authenticator is a passkey/FIDO authenticator
*/
const isPasskeyAuthenticator = (authenticator) => authenticator.authenticatorId === ApplicationNativeAuthenticationConstants.SupportedAuthenticators.Passkey && authenticator.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.InternalPrompt && authenticator.metadata?.additionalData?.challengeData;
/**
* `T3JnYW5pemF0aW9uQXV0aGVudGljYXRvcjpTU08` - OrganizationSSO
*    Currently, `App-Native Authentication` doesn't support organization SSO.
*    Tracker: TODO: Create `product-is` issue for this.
*/
const HIDDEN_AUTHENTICATORS = ["T3JnYW5pemF0aW9uQXV0aGVudGljYXRvcjpTU08"];
/**
* Internal component that consumes FlowContext and renders the sign-in UI.
*/
const BaseSignInContent = ({ afterSignInUrl, onInitialize, isLoading: externalIsLoading, onSubmit, onSuccess, onError, onFlowChange, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", showTitle = true, showSubtitle = true }) => {
	const { theme } = useTheme_default();
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages } = useFlow_default();
	const styles = BaseSignIn_styles_default(theme, theme.vars.colors.text.primary);
	const [isSignInInitializationRequestLoading, setIsSignInInitializationRequestLoading] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const [currentAuthenticator, setCurrentAuthenticator] = useState(null);
	const [error, setError] = useState(null);
	const [messages, setMessages] = useState([]);
	const isLoading = externalIsLoading || isSignInInitializationRequestLoading;
	const reRenderCheckRef = useRef(false);
	const { values: formValues, touched: touchedFields, setValue: setFormValue, setTouched: setFormTouched, validateForm, touchAllFields, reset: resetForm } = useForm({
		fields: currentAuthenticator?.metadata?.params?.map((param) => ({
			initialValue: "",
			name: param.param,
			required: currentAuthenticator.requiredParams.includes(param.param),
			validator: (value) => {
				if (currentAuthenticator.requiredParams.includes(param.param) && (!value || value.trim() === "")) return t("validations.required.field.error");
				return null;
			}
		})) || [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: false
	});
	/**
	* Setup form fields based on the current authenticator.
	*/
	const setupFormFields = useCallback((authenticator) => {
		const initialValues = {};
		authenticator.metadata?.params?.forEach((param) => {
			initialValues[param.param] = "";
		});
		resetForm();
		Object.keys(initialValues).forEach((key) => {
			setFormValue(key, initialValues[key]);
		});
	}, [resetForm, setFormValue]);
	/**
	* Check if the response contains a redirection URL and perform the redirect if necessary.
	* @param response - The authentication response
	* @returns true if a redirect was performed, false otherwise
	*/
	const handleRedirectionIfNeeded = (response) => {
		if (response && "nextStep" in response && response.nextStep && response.nextStep.stepType === EmbeddedSignInFlowStepType.AuthenticatorPrompt && response.nextStep.authenticators?.length === 1) {
			const responseAuthenticator = response.nextStep.authenticators[0];
			if (responseAuthenticator.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.RedirectionPrompt && responseAuthenticator.metadata?.additionalData?.redirectUrl) {
				/**
				* Open a popup window to handle redirection prompts
				*/
				const redirectUrl = responseAuthenticator.metadata?.additionalData?.redirectUrl;
				const popup = window.open(redirectUrl, "oauth_popup", "width=500,height=600,scrollbars=yes,resizable=yes");
				if (!popup) {
					logger$1.error("Failed to open popup window");
					return false;
				}
				/**
				* Forward declarations for mutually referencing variables.
				* `messageHandler`, `cleanup`, and `popupMonitor` reference each other,
				* so they are declared with `let` first and assigned below.
				*/
				let messageHandler;
				let popupMonitor;
				const cleanup = () => {
					window.removeEventListener("message", messageHandler);
					if (popupMonitor) clearInterval(popupMonitor);
				};
				/**
				* Add an event listener to the window to capture the message from the popup
				*/
				messageHandler = async function messageEventHandler(event) {
					/**
					* Check if the message is from our popup window
					*/
					if (event.source !== popup) {
						if (event.source !== window && event.source !== window.parent) {}
						return;
					}
					/**
					* Check the origin of the message to ensure it's from a trusted source
					*/
					const expectedOrigin = afterSignInUrl ? new URL(afterSignInUrl).origin : window.location.origin;
					if (event.origin !== expectedOrigin && event.origin !== window.location.origin) return;
					const { code, state } = event.data;
					if (code && state) {
						await onSubmit({
							flowId: currentFlow.flowId,
							selectedAuthenticator: {
								authenticatorId: responseAuthenticator.authenticatorId,
								params: {
									code,
									state
								}
							}
						}, {
							method: currentFlow?.links[0].method,
							url: currentFlow?.links[0].href
						});
						popup.close();
						cleanup();
					}
				};
				window.addEventListener("message", messageHandler);
				/**
				* Monitor popup for closure and URL changes
				*/
				let hasProcessedCallback = false;
				popupMonitor = setInterval(async () => {
					try {
						if (popup.closed) {
							cleanup();
							return;
						}
						if (hasProcessedCallback) return;
						try {
							const popupUrl = popup.location.href;
							if (popupUrl && (popupUrl.includes("code=") || popupUrl.includes("error="))) {
								hasProcessedCallback = true;
								const url = new URL(popupUrl);
								const code = url.searchParams.get("code");
								const state = url.searchParams.get("state");
								if (url.searchParams.get("error")) {
									logger$1.error("OAuth error:");
									popup.close();
									cleanup();
									return;
								}
								if (code && state) {
									const submitResponse = await onSubmit({
										flowId: currentFlow.flowId,
										selectedAuthenticator: {
											authenticatorId: responseAuthenticator.authenticatorId,
											params: {
												code,
												state
											}
										}
									}, {
										method: currentFlow?.links[0].method,
										url: currentFlow?.links[0].href
									});
									popup.close();
									onFlowChange?.(submitResponse);
									if (submitResponse?.flowStatus === EmbeddedSignInFlowStatus.SuccessCompleted) onSuccess?.(submitResponse.authData);
								}
							}
						} catch (e) {}
					} catch (e) {
						logger$1.error("Error monitoring popup:");
					}
				}, 1e3);
				return true;
			}
		}
		return false;
	};
	/**
	* Handle form submission.
	*/
	const handleSubmit = async (submittedValues) => {
		if (!currentFlow || !currentAuthenticator) return;
		touchAllFields();
		if (!validateForm().isValid) return;
		setIsSignInInitializationRequestLoading(true);
		setError(null);
		setMessages([]);
		try {
			const response = await onSubmit({
				flowId: currentFlow.flowId,
				selectedAuthenticator: {
					authenticatorId: currentAuthenticator.authenticatorId,
					params: submittedValues
				}
			}, {
				method: currentFlow?.links[0].method,
				url: currentFlow?.links[0].href
			});
			onFlowChange?.(response);
			if (response?.flowStatus === EmbeddedSignInFlowStatus.SuccessCompleted) {
				onSuccess?.(response.authData);
				return;
			}
			if (response?.flowStatus === EmbeddedSignInFlowStatus.FailCompleted || response?.flowStatus === EmbeddedSignInFlowStatus.FailIncomplete) {
				setError(t("errors.signin.flow.completion.failure"));
				return;
			}
			if (handleRedirectionIfNeeded(response)) return;
			if (response && "flowId" in response && "nextStep" in response) {
				const nextStepResponse = response;
				setCurrentFlow(nextStepResponse);
				if (nextStepResponse.nextStep?.authenticators?.length > 0) if (nextStepResponse.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && nextStepResponse.nextStep.authenticators.length > 1) setCurrentAuthenticator(null);
				else {
					const nextAuthenticator = nextStepResponse.nextStep.authenticators[0];
					setCurrentAuthenticator(nextAuthenticator);
					setupFormFields(nextAuthenticator);
				}
				if (nextStepResponse.nextStep?.messages) setMessages(nextStepResponse.nextStep.messages.map((msg) => ({
					message: msg.message || "",
					type: msg.type || "INFO"
				})));
			}
		} catch (err) {
			setError(err instanceof ThunderIDAPIError ? err.message : t("errors.signin.flow.failure"));
			onError?.(err);
		} finally {
			setIsSignInInitializationRequestLoading(false);
		}
	};
	/**
	* Handle authenticator selection for multi-option prompts.
	*/
	const handleAuthenticatorSelection = async (authenticator, formData) => {
		if (!currentFlow) return;
		if (formData) touchAllFields();
		setIsSignInInitializationRequestLoading(true);
		setError(null);
		setMessages([]);
		try {
			if (isPasskeyAuthenticator(authenticator)) try {
				const challengeData = authenticator.metadata?.additionalData?.challengeData;
				if (!challengeData) throw new Error("Missing challenge data for passkey authentication");
				const tokenResponse = await handleWebAuthnAuthentication(challengeData);
				const response = await onSubmit({
					flowId: currentFlow.flowId,
					selectedAuthenticator: {
						authenticatorId: authenticator.authenticatorId,
						params: { tokenResponse }
					}
				}, {
					method: currentFlow?.links[0].method,
					url: currentFlow?.links[0].href
				});
				onFlowChange?.(response);
				if (response?.flowStatus === EmbeddedSignInFlowStatus.SuccessCompleted) {
					onSuccess?.(response.authData);
					return;
				}
				if (response?.flowStatus === EmbeddedSignInFlowStatus.FailCompleted || response?.flowStatus === EmbeddedSignInFlowStatus.FailIncomplete) {
					setError(t("errors.signin.flow.passkeys.completion.failure"));
					return;
				}
				if (response && "flowId" in response && "nextStep" in response) {
					const nextStepResponse = response;
					setCurrentFlow(nextStepResponse);
					if (nextStepResponse.nextStep?.authenticators?.length > 0) if (nextStepResponse.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && nextStepResponse.nextStep.authenticators.length > 1) setCurrentAuthenticator(null);
					else {
						const nextAuthenticator = nextStepResponse.nextStep.authenticators[0];
						if (isPasskeyAuthenticator(nextAuthenticator)) {
							handleAuthenticatorSelection(nextAuthenticator);
							return;
						}
						setCurrentAuthenticator(nextAuthenticator);
						setupFormFields(nextAuthenticator);
					}
					if (nextStepResponse.nextStep?.messages) setMessages(nextStepResponse.nextStep.messages.map((msg) => ({
						message: msg.message || "",
						type: msg.type || "INFO"
					})));
				}
			} catch (passkeyError) {
				logger$1.error("Passkey authentication error:");
				let errorMessage = passkeyError instanceof Error ? passkeyError.message : t("errors.signin.flow.passkeys.failure");
				if (passkeyError instanceof Error && passkeyError.message.includes("security")) errorMessage += " This may be due to browser security settings, an insecure connection, or device restrictions.";
				setError(errorMessage);
			}
			else if (authenticator.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.RedirectionPrompt) {
				const response = await onSubmit({
					flowId: currentFlow.flowId,
					selectedAuthenticator: {
						authenticatorId: authenticator.authenticatorId,
						params: {}
					}
				}, {
					method: currentFlow?.links[0].method,
					url: currentFlow?.links[0].href
				});
				onFlowChange?.(response);
				if (response?.flowStatus === EmbeddedSignInFlowStatus.SuccessCompleted) {
					onSuccess?.(response.authData);
					return;
				}
				if (handleRedirectionIfNeeded(response)) {}
			} else if (formData) {
				if (!validateForm().isValid) return;
				const formResponse = await onSubmit({
					flowId: currentFlow.flowId,
					selectedAuthenticator: {
						authenticatorId: authenticator.authenticatorId,
						params: formData
					}
				}, {
					method: currentFlow?.links[0].method,
					url: currentFlow?.links[0].href
				});
				onFlowChange?.(formResponse);
				if (formResponse?.flowStatus === EmbeddedSignInFlowStatus.SuccessCompleted) {
					onSuccess?.(formResponse.authData);
					return;
				}
				if (formResponse?.flowStatus === EmbeddedSignInFlowStatus.FailCompleted || formResponse?.flowStatus === EmbeddedSignInFlowStatus.FailIncomplete) {
					setError("Authentication failed. Please check your credentials and try again.");
					return;
				}
				if (handleRedirectionIfNeeded(formResponse)) return;
				if (formResponse && "flowId" in formResponse && "nextStep" in formResponse) {
					const nextStepResponse = formResponse;
					setCurrentFlow(nextStepResponse);
					if (nextStepResponse.nextStep?.authenticators?.length > 0) if (nextStepResponse.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && nextStepResponse.nextStep.authenticators.length > 1) setCurrentAuthenticator(null);
					else {
						const nextAuthenticator = nextStepResponse.nextStep.authenticators[0];
						if (isPasskeyAuthenticator(nextAuthenticator)) {
							handleAuthenticatorSelection(nextAuthenticator);
							return;
						}
						setCurrentAuthenticator(nextAuthenticator);
						setupFormFields(nextAuthenticator);
					}
					if (nextStepResponse.nextStep?.messages) setMessages(nextStepResponse.nextStep.messages.map((msg) => ({
						message: msg.message || "",
						type: msg.type || "INFO"
					})));
				}
			} else if (!(authenticator.metadata?.params && authenticator.metadata.params.length > 0)) {
				const response = await onSubmit({
					flowId: currentFlow.flowId,
					selectedAuthenticator: {
						authenticatorId: authenticator.authenticatorId,
						params: {}
					}
				}, {
					method: currentFlow?.links[0].method,
					url: currentFlow?.links[0].href
				});
				onFlowChange?.(response);
				if (response?.flowStatus === EmbeddedSignInFlowStatus.SuccessCompleted) {
					onSuccess?.(response.authData);
					return;
				}
				if (response?.flowStatus === EmbeddedSignInFlowStatus.FailCompleted || response?.flowStatus === EmbeddedSignInFlowStatus.FailIncomplete) {
					setError("Authentication failed. Please try again.");
					return;
				}
				if (handleRedirectionIfNeeded(response)) return;
				if (response && "flowId" in response && "nextStep" in response) {
					const nextStepResponse = response;
					setCurrentFlow(nextStepResponse);
					if (nextStepResponse.nextStep?.authenticators?.length > 0) if (nextStepResponse.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && nextStepResponse.nextStep.authenticators.length > 1) setCurrentAuthenticator(null);
					else {
						const nextAuthenticator = nextStepResponse.nextStep.authenticators[0];
						if (isPasskeyAuthenticator(nextAuthenticator)) {
							handleAuthenticatorSelection(nextAuthenticator);
							return;
						}
						setCurrentAuthenticator(nextAuthenticator);
						setupFormFields(nextAuthenticator);
					}
					if (nextStepResponse.nextStep?.messages) setMessages(nextStepResponse.nextStep.messages.map((msg) => ({
						message: msg.message || "",
						type: msg.type || "INFO"
					})));
				}
			} else {
				setCurrentAuthenticator(authenticator);
				setupFormFields(authenticator);
			}
		} catch (err) {
			setError(err instanceof ThunderIDAPIError ? err?.message : "Authenticator selection failed");
			onError?.(err);
		} finally {
			setIsSignInInitializationRequestLoading(false);
		}
	};
	/**
	* Handle input value changes.
	*/
	const handleInputChange = (param, value) => {
		setFormValue(param, value);
		setFormTouched(param, true);
	};
	/**
	* Check if current flow has multiple authenticator options.
	*/
	const hasMultipleOptions = useCallback(() => !!(currentFlow && "nextStep" in currentFlow && currentFlow.nextStep?.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && currentFlow.nextStep?.authenticators && currentFlow.nextStep.authenticators.length > 1), [currentFlow]);
	/**
	* Get available authenticators for selection.
	*/
	const getAvailableAuthenticators = useCallback(() => {
		if (!currentFlow || !("nextStep" in currentFlow) || !currentFlow.nextStep?.authenticators) return [];
		return currentFlow.nextStep.authenticators;
	}, [currentFlow]);
	const containerClasses = cx([
		withVendorCSSClassPrefix("signin"),
		withVendorCSSClassPrefix(`signin--${size}`),
		withVendorCSSClassPrefix(`signin--${variant}`)
	], className);
	const inputClasses = cx([
		withVendorCSSClassPrefix("signin__input"),
		size === "small" && withVendorCSSClassPrefix("signin__input--small"),
		size === "large" && withVendorCSSClassPrefix("signin__input--large")
	], inputClassName);
	const buttonClasses = cx([
		withVendorCSSClassPrefix("signin__button"),
		size === "small" && withVendorCSSClassPrefix("signin__button--small"),
		size === "large" && withVendorCSSClassPrefix("signin__button--large")
	], buttonClassName);
	const errorClasses = cx([withVendorCSSClassPrefix("signin__error")], errorClassName);
	const messageClasses = cx([withVendorCSSClassPrefix("signin__messages")], messageClassName);
	useEffect(() => {
		if (isLoading) return;
		if (reRenderCheckRef.current) return;
		reRenderCheckRef.current = true;
		(async () => {
			setIsSignInInitializationRequestLoading(true);
			setError(null);
			try {
				const response = await onInitialize?.();
				setCurrentFlow(response);
				setIsInitialized(true);
				onFlowChange?.(response);
				if (response?.flowStatus === EmbeddedSignInFlowStatus.SuccessCompleted) {
					onSuccess?.(response.authData || {});
					return;
				}
				if (response?.nextStep?.authenticators?.length > 0) if (response.nextStep.stepType === EmbeddedSignInFlowStepType.MultiOptionsPrompt && response.nextStep.authenticators.length > 1) setCurrentAuthenticator(null);
				else {
					const authenticator = response.nextStep.authenticators[0];
					setCurrentAuthenticator(authenticator);
					setupFormFields(authenticator);
				}
				if (response && "nextStep" in response && response.nextStep && "messages" in response.nextStep) setMessages((response.nextStep.messages || []).map((msg) => ({
					message: msg.message || "",
					type: msg.type || "INFO"
				})));
			} catch (err) {
				setError(err instanceof ThunderIDAPIError ? err.message : t("errors.signin.initialization"));
				onError?.(err);
			} finally {
				setIsSignInInitializationRequestLoading(false);
			}
		})();
	}, [isLoading]);
	if (!isInitialized && isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles["card"]),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs("div", {
			className: styles["loadingContainer"],
			children: [/* @__PURE__ */ jsx(Spinner_default, { size: "medium" }), /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles["loadingText"],
				children: t("messages.loading.placeholder")
			})]
		}) })
	});
	if (hasMultipleOptions() && !currentAuthenticator) {
		const availableAuthenticators = getAvailableAuthenticators();
		const userPromptAuthenticators = availableAuthenticators.filter((auth) => auth.metadata?.promptType === EmbeddedSignInFlowAuthenticatorPromptType.UserPrompt || auth.idp === "LOCAL" && auth.metadata?.params && auth.metadata.params.length > 0);
		const optionAuthenticators = availableAuthenticators.filter((auth) => !userPromptAuthenticators.includes(auth)).filter((authenticator) => !HIDDEN_AUTHENTICATORS.includes(authenticator.authenticatorId));
		return /* @__PURE__ */ jsxs(Card_default, {
			className: cx(containerClasses, styles["card"]),
			"data-testid": "thunderid-signin",
			variant,
			children: [(showTitle || showSubtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
				className: styles["header"],
				children: [showTitle && /* @__PURE__ */ jsx(Card_default.Title, {
					level: 2,
					className: styles["title"],
					children: flowTitle || t("signin.heading")
				}), showSubtitle && /* @__PURE__ */ jsx(Typography_default, {
					variant: "body1",
					className: styles["subtitle"],
					children: flowSubtitle || t("signin.subheading")
				})]
			}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [
				flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
					className: styles["flowMessagesContainer"],
					children: flowMessages.map((flowMessage, index) => /* @__PURE__ */ jsx(Alert_default, {
						variant: flowMessage.type,
						className: cx(styles["flowMessageItem"], messageClasses),
						children: /* @__PURE__ */ jsx(Alert_default.Description, { children: flowMessage.message })
					}, flowMessage.id || index))
				}),
				messages.length > 0 && /* @__PURE__ */ jsx("div", {
					className: styles["messagesContainer"],
					children: messages.map((message, index) => {
						let messageVariant;
						const lowerType = message.type.toLowerCase();
						if (lowerType === "error") messageVariant = "error";
						else if (lowerType === "warning") messageVariant = "warning";
						else if (lowerType === "success") messageVariant = "success";
						else messageVariant = "info";
						return /* @__PURE__ */ jsx(Alert_default, {
							variant: messageVariant,
							className: cx(styles["messageItem"], messageClasses),
							children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
						}, index);
					})
				}),
				error && /* @__PURE__ */ jsxs(Alert_default, {
					variant: "error",
					className: cx(styles["errorContainer"], errorClasses),
					children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: "Error" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: error })]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: styles["contentContainer"],
					children: [
						userPromptAuthenticators.map((authenticator, index) => /* @__PURE__ */ jsxs("div", {
							className: styles["authenticatorItem"],
							children: [index > 0 && /* @__PURE__ */ jsx(Divider_default, {
								className: styles["divider"],
								children: "OR"
							}), /* @__PURE__ */ jsx("form", {
								className: styles["form"],
								onSubmit: (e) => {
									e.preventDefault();
									const formData = {};
									authenticator.metadata?.params?.forEach((param) => {
										formData[param.param] = formValues[param.param] || "";
									});
									handleAuthenticatorSelection(authenticator, formData);
								},
								children: createSignInOptionFromAuthenticator(authenticator, formValues, touchedFields, isLoading, handleInputChange, (auth, formData) => handleAuthenticatorSelection(auth, formData), {
									buttonClassName: buttonClasses,
									error,
									inputClassName: inputClasses
								})
							})]
						}, authenticator.authenticatorId)),
						userPromptAuthenticators.length > 0 && optionAuthenticators.length > 0 && /* @__PURE__ */ jsx(Divider_default, {
							className: styles["divider"],
							children: "OR"
						}),
						optionAuthenticators.map((authenticator) => /* @__PURE__ */ jsx("div", {
							className: styles["authenticatorItem"],
							children: createSignInOptionFromAuthenticator(authenticator, formValues, touchedFields, isLoading, handleInputChange, (auth, formData) => handleAuthenticatorSelection(auth, formData), {
								buttonClassName: buttonClasses,
								error,
								inputClassName: inputClasses
							})
						}, authenticator.authenticatorId))
					]
				})
			] })]
		});
	}
	if (!currentAuthenticator) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles["noAuthenticatorCard"]),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: error && /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			className: styles["errorAlert"],
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") || "Error" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: error })]
		}) })
	});
	if (isPasskeyAuthenticator(currentAuthenticator) && !isLoading) {
		useEffect(() => {
			handleAuthenticatorSelection(currentAuthenticator);
		}, [currentAuthenticator]);
		return /* @__PURE__ */ jsx(Card_default, {
			className: cx(containerClasses, styles["card"]),
			"data-testid": "thunderid-signin",
			variant,
			children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs("div", {
				className: styles["centeredContainer"],
				children: [
					/* @__PURE__ */ jsx("div", {
						className: styles["passkeyContainer"],
						children: /* @__PURE__ */ jsx(Spinner_default, { size: "large" })
					}),
					/* @__PURE__ */ jsx(Typography_default, {
						variant: "body1",
						children: t("passkey.authenticating") || "Authenticating with passkey..."
					}),
					/* @__PURE__ */ jsx(Typography_default, {
						variant: "body2",
						className: styles["passkeyText"],
						children: t("passkey.instruction") || "Please use your fingerprint, face, or security key to authenticate."
					})
				]
			}) })
		});
	}
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(containerClasses, styles["card"]),
		"data-testid": "thunderid-signin",
		variant,
		children: [/* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles["header"],
			children: [
				/* @__PURE__ */ jsx(Card_default.Title, {
					level: 2,
					className: styles["title"],
					children: flowTitle || t("signin.heading")
				}),
				/* @__PURE__ */ jsx(Typography_default, {
					variant: "body1",
					className: styles["subtitle"],
					children: flowSubtitle || t("signin.subheading")
				}),
				flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
					className: styles["flowMessagesContainer"],
					children: flowMessages.map((flowMessage, index) => /* @__PURE__ */ jsx(Alert_default, {
						variant: flowMessage.type,
						className: cx(styles["flowMessageItem"], messageClasses),
						children: /* @__PURE__ */ jsx(Alert_default.Description, { children: flowMessage.message })
					}, flowMessage.id || index))
				}),
				messages.length > 0 && /* @__PURE__ */ jsx("div", {
					className: styles["messagesContainer"],
					children: messages.map((message, index) => {
						return /* @__PURE__ */ jsx(Alert_default, {
							variant: {
								error: "error",
								success: "success",
								warning: "warning"
							}[message.type.toLowerCase()] || "info",
							className: cx(styles["messageItem"], messageClasses),
							children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
						}, index);
					})
				})
			]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [error && /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			className: cx(styles["errorContainer"], errorClasses),
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") }), /* @__PURE__ */ jsx(Alert_default.Description, { children: error })]
		}), /* @__PURE__ */ jsx("form", {
			className: styles["form"],
			onSubmit: (e) => {
				e.preventDefault();
				const formData = {};
				currentAuthenticator.metadata?.params?.forEach((param) => {
					formData[param.param] = formValues[param.param] || "";
				});
				handleSubmit(formData);
			},
			children: createSignInOptionFromAuthenticator(currentAuthenticator, formValues, touchedFields, isLoading, handleInputChange, (authenticator, formData) => handleSubmit(formData || formValues), {
				buttonClassName: buttonClasses,
				error,
				inputClassName: inputClasses
			})
		})] })]
	});
};
/**
* Base SignIn component that provides native authentication flow.
* This component handles both the presentation layer and authentication flow logic.
* It accepts API functions as props to maintain framework independence.
*
* @example
* ```tsx
* import { BaseSignIn } from '@thunderid/react';
*
* const MySignIn = () => {
*   return (
*     <BaseSignIn
*       onInitialize={async () => {
*         // Your API call to initialize authentication
*         return await initializeAuth();
*       }}
*       onSubmit={async (payload) => {
*         // Your API call to handle authentication
*         return await handleAuth(payload);
*       }}
*       onSuccess={(authData) => {
*         console.log('Success:', authData);
*       }}
*       onError={(error) => {
*         console.error('Error:', error);
*       }}
*       className="max-w-md mx-auto"
*     />
*   );
* };
* ```
*/
const BaseSignIn = ({ showLogo = true,...rest }) => {
	const { theme } = useTheme_default();
	const styles = BaseSignIn_styles_default(theme, theme.vars.colors.text.primary);
	return /* @__PURE__ */ jsxs("div", { children: [showLogo && /* @__PURE__ */ jsx("div", {
		className: styles["logoContainer"],
		children: /* @__PURE__ */ jsx(Logo_default, { size: "large" })
	}), /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseSignInContent, {
		showLogo,
		...rest
	}) })] });
};
var BaseSignIn_default = BaseSignIn;

//#endregion
export { BaseSignIn_default as default };
//# sourceMappingURL=BaseSignIn.js.map