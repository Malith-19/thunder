import ComponentRendererContext_default from "../../../../../contexts/ComponentRenderer/ComponentRendererContext.js";
import FlowProvider_default from "../../../../../contexts/Flow/FlowProvider.js";
import useThunderID_default from "../../../../../contexts/ThunderID/useThunderID.js";
import useFlow_default from "../../../../../contexts/Flow/useFlow.js";
import useTheme_default from "../../../../../contexts/Theme/useTheme.js";
import ComponentPreferencesContext_default from "../../../../../contexts/I18n/ComponentPreferencesContext.js";
import useTranslation_default from "../../../../../hooks/useTranslation.js";
import { useForm } from "../../../../../hooks/useForm.js";
import Spinner_default from "../../../../primitives/Spinner/Spinner.js";
import Typography_default from "../../../../primitives/Typography/Typography.js";
import Alert_default from "../../../../primitives/Alert/Alert.js";
import Card_default from "../../../../primitives/Card/Card.js";
import Logo_default from "../../../../primitives/Logo/Logo.js";
import { extractErrorMessage, normalizeFlowResponse } from "../../../../../utils/v2/flowTransformer.js";
import { renderSignUpComponents } from "../../AuthOptionFactory.js";
import { handlePasskeyRegistration } from "../../../../../utils/v2/passkey.js";
import BaseSignUp_styles_default from "../BaseSignUp.styles.js";
import getAuthComponentHeadings_default from "../../../../../utils/v2/getAuthComponentHeadings.js";
import { EmbeddedFlowComponentTypeV2, EmbeddedSignUpFlowStatusV2, EmbeddedSignUpFlowTypeV2, buildValidatorFromRules, createPackageComponentLogger, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/auth/SignUp/v2/BaseSignUp.tsx
const logger$1 = createPackageComponentLogger("@thunderid/react", "BaseSignUp");
/**
* Internal component that consumes FlowContext and renders the sign-up UI.
*/
const BaseSignUpContent = ({ afterSignUpUrl, onInitialize, onSubmit, onError, onFlowChange, onComplete, error: externalError, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = useTheme_default();
	const customRenderers = useContext(ComponentRendererContext_default);
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
	const { meta, isInitialized: isSdkInitialized, getStorageManager } = useThunderID_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const [isLoading, setIsLoading] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const [apiError, setApiError] = useState(null);
	const [isStorageReady, setIsStorageReady] = useState(false);
	const [passkeyState, setPasskeyState] = useState({
		actionId: null,
		creationOptions: null,
		error: null,
		executionId: null,
		isActive: false
	});
	const challengeTokenRef = useRef(null);
	const initializationAttemptedRef = useRef(false);
	const passkeyProcessedRef = useRef(false);
	/**
	* Restore any challenge token persisted before an OAuth redirect.
	*/
	useEffect(() => {
		if (!isSdkInitialized) return;
		(async () => {
			try {
				const tempData = await (await getStorageManager())?.getTemporaryData();
				if (tempData?.challengeToken) challengeTokenRef.current = tempData.challengeToken;
			} catch {} finally {
				setIsStorageReady(true);
			}
		})();
	}, [isSdkInitialized]);
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
			logger$1.warn("Failed to persist challenge token in storage.");
		}
	};
	/**
	* Handle error responses and extract meaningful error messages
	* Uses the transformer's extractErrorMessage function.
	*/
	const handleError = useCallback((error) => {
		const errorMessage = extractErrorMessage(error, t);
		setApiError(error instanceof Error ? error : new Error(errorMessage));
		clearMessages();
		addMessage({
			message: errorMessage,
			type: "error"
		});
	}, [
		t,
		addMessage,
		clearMessages
	]);
	/**
	* Normalize flow response to ensure component-driven format
	* Uses normalizeFlowResponse for modern API format responses
	*/
	const normalizeFlowResponseLocal = useCallback((response) => {
		if (response?.data) {
			const { components } = normalizeFlowResponse(response, t, {
				defaultErrorKey: "components.signUp.errors.generic",
				resolveTranslations: false
			}, meta);
			return {
				...response,
				data: {
					...response.data,
					components
				}
			};
		}
		return response;
	}, [t, children]);
	/**
	* Extract form fields from flow components
	*/
	const extractFormFields = useCallback((components) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === EmbeddedFlowComponentTypeV2.TextInput || component.type === EmbeddedFlowComponentTypeV2.PasswordInput || component.type === EmbeddedFlowComponentTypeV2.EmailInput || component.type === EmbeddedFlowComponentTypeV2.Select || component.type === EmbeddedFlowComponentTypeV2.DateInput) {
					const fieldName = component.ref || component.id;
					const ruleValidator = buildValidatorFromRules(component.validation);
					fields.push({
						initialValue: "",
						name: fieldName,
						required: component.required || false,
						validator: (value) => {
							if (component.required && (!value || value.trim() === "")) return t("validations.required.field.error");
							if ((component.type === EmbeddedFlowComponentTypeV2.EmailInput || component.variant === "EMAIL") && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("field.email.invalid");
							if (ruleValidator && value) {
								const ruleMessage = ruleValidator(value);
								if (ruleMessage) return t(ruleMessage);
							}
							return null;
						}
					});
				}
				if (component.components && Array.isArray(component.components)) processComponents(component.components);
			});
		};
		processComponents(components);
		return fields;
	}, [t]);
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, setErrors: setFormErrors, clearErrors: clearFormErrors, validateForm, touchAllFields, reset: resetForm } = useForm({
		fields: (currentFlow?.data)?.components ? extractFormFields(currentFlow.data.components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: false
	});
	/**
	* Project server-side validation errors from the most recent flow response into the
	* form's `errors` state. See BaseSignIn for the same pattern: first error per field
	* wins, and the affected fields are marked touched so the error renders immediately.
	*/
	useEffect(() => {
		clearFormErrors();
		const responseFieldErrors = (currentFlow?.data)?.fieldErrors;
		if (!responseFieldErrors || responseFieldErrors.length === 0) return;
		const errors = {};
		for (const fe of responseFieldErrors) if (!(fe.identifier in errors)) errors[fe.identifier] = fe.message;
		setFormErrors(errors);
		Object.keys(errors).forEach((field) => setFormTouched(field, true));
	}, [
		currentFlow,
		setFormErrors,
		setFormTouched,
		clearFormErrors
	]);
	/**
	* Setup form fields based on the current flow.
	*/
	const setupFormFields = useCallback((flowResponse) => {
		const fields = extractFormFields(flowResponse.data?.components || []);
		const initialValues = {};
		fields.forEach((field) => {
			initialValues[field.name] = field.initialValue || "";
		});
		resetForm();
		Object.keys(initialValues).forEach((key) => {
			setFormValue(key, initialValues[key]);
		});
	}, [
		extractFormFields,
		resetForm,
		setFormValue
	]);
	/**
	* Determine whether a completed flow finished on a display-only screen.
	* Such a completion must be rendered, not redirected past.
	*/
	const isDisplayOnlyCompletion = (response) => {
		const data = response?.data;
		const components = data?.components ?? data?.meta?.components;
		return response?.flowStatus === EmbeddedSignUpFlowStatusV2.Complete && Array.isArray(components) && components.length > 0 && !response?.assertion && !data?.redirectURL && !response?.redirectUrl;
	};
	/**
	* Handle a completed flow. A flow can complete on a display-only screen; in
	* that case render the screen and skip onComplete so the wrapper does not
	* immediately redirect away from it. Otherwise hand off to onComplete.
	*/
	const handleFlowCompletion = (response) => {
		if (isDisplayOnlyCompletion(response)) {
			const normalized = normalizeFlowResponseLocal(response);
			setCurrentFlow(normalized);
			setupFormFields(normalized);
			return;
		}
		onComplete?.(response);
	};
	/**
	* Handle input value changes.
	* Only updates the value without marking as touched.
	* Touched state is set on blur to avoid premature validation.
	*/
	const handleInputChange = (name, value) => {
		setFormValue(name, value);
	};
	/**
	* Handle input blur event.
	* Marks the field as touched, which triggers validation.
	*/
	const handleInputBlur = (name) => {
		setFormTouched(name, true);
	};
	/**
	* Check if the response contains a redirection URL and perform the redirect if necessary.
	* @param response - The sign-up response
	* @returns true if a redirect was performed, false otherwise
	*/
	const handleRedirectionIfNeeded = (response) => {
		if (response?.type === EmbeddedSignUpFlowTypeV2.Redirection && (response?.data)?.redirectURL) {
			/**
			* Open a popup window to handle redirection prompts for social sign-up
			*/
			const redirectUrl = response.data.redirectURL;
			const popup = window.open(redirectUrl, "oauth_popup", "width=500,height=600,scrollbars=yes,resizable=yes");
			if (!popup) {
				logger$1.error("Failed to open popup window");
				return false;
			}
			let hasProcessedCallback = false;
			let popupMonitor = null;
			let messageHandler = null;
			/**
			* Clean up event listener and popup monitor
			*/
			const cleanup = () => {
				if (messageHandler) window.removeEventListener("message", messageHandler);
				if (popupMonitor) clearInterval(popupMonitor);
			};
			/**
			* Add an event listener to the window to capture the message from the popup
			*/
			messageHandler = async function messageEventHandler(event) {
				/**
				* Check if the message is from our popup window
				*/
				if (event.source !== popup) return;
				/**
				* Check the origin of the message to ensure it's from a trusted source
				*/
				const expectedOrigin = afterSignUpUrl ? new URL(afterSignUpUrl).origin : window.location.origin;
				if (event.origin !== expectedOrigin && event.origin !== window.location.origin) return;
				const { code, state } = event.data;
				if (code && state) {
					hasProcessedCallback = true;
					const payload = {
						...currentFlow?.executionId && { executionId: currentFlow.executionId },
						inputs: {
							code,
							state
						},
						...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
					};
					try {
						const continueResponse = await onSubmit(payload);
						onFlowChange?.(continueResponse);
						if (continueResponse.flowStatus === EmbeddedSignUpFlowStatusV2.Error) {
							handleError(continueResponse);
							onError?.(continueResponse);
						} else if (continueResponse.flowStatus === EmbeddedSignUpFlowStatusV2.Complete) handleFlowCompletion(continueResponse);
						else if (continueResponse.flowStatus === EmbeddedSignUpFlowStatusV2.Incomplete) {
							const normalizedContinueResponse = normalizeFlowResponseLocal(continueResponse);
							setCurrentFlow(normalizedContinueResponse);
							setupFormFields(normalizedContinueResponse);
							if (normalizedContinueResponse?.error) handleError(normalizedContinueResponse);
						}
						popup.close();
						cleanup();
					} catch (err) {
						handleError(err);
						onError?.(err);
						popup.close();
						cleanup();
					}
				}
			};
			window.addEventListener("message", messageHandler);
			/**
			* Monitor popup for closure and URL changes
			*/
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
								const payload = {
									...currentFlow?.executionId && { executionId: currentFlow.executionId },
									inputs: {
										code,
										state
									},
									...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
								};
								try {
									const continueResponse = await onSubmit(payload);
									onFlowChange?.(continueResponse);
									if (continueResponse.flowStatus === EmbeddedSignUpFlowStatusV2.Error) {
										handleError(continueResponse);
										onError?.(continueResponse);
									} else if (continueResponse.flowStatus === EmbeddedSignUpFlowStatusV2.Complete) handleFlowCompletion(continueResponse);
									else if (continueResponse.flowStatus === EmbeddedSignUpFlowStatusV2.Incomplete) {
										const normalizedContinueResponse = normalizeFlowResponseLocal(continueResponse);
										setCurrentFlow(normalizedContinueResponse);
										setupFormFields(normalizedContinueResponse);
										if (normalizedContinueResponse?.error) handleError(normalizedContinueResponse);
									}
									popup.close();
								} catch (err) {
									handleError(err);
									onError?.(err);
									popup.close();
								}
							}
						}
					} catch (e) {}
				} catch (e) {
					logger$1.error("Error monitoring popup:");
				}
			}, 1e3);
			return true;
		}
		return false;
	};
	/**
	* Handle component submission (for buttons outside forms).
	*/
	const handleSubmit = async (component, data, skipValidation) => {
		if (!currentFlow) return;
		if (!skipValidation) {
			touchAllFields();
			if (!validateForm().isValid) return;
		}
		setIsLoading(true);
		setApiError(null);
		clearMessages();
		try {
			const filteredInputs = {};
			if (data) Object.entries(data).forEach(([key, value]) => {
				if (value !== null && value !== void 0 && value !== "") filteredInputs[key] = value;
			});
			const response = normalizeFlowResponseLocal(await onSubmit({
				...currentFlow.executionId && { executionId: currentFlow.executionId },
				...component.id && { action: component.id },
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {},
				inputs: filteredInputs
			}));
			onFlowChange?.(response);
			await setChallengeToken(response.challengeToken ?? null);
			if (response.flowStatus === EmbeddedSignUpFlowStatusV2.Error) {
				handleError(response);
				onError?.(new Error(extractErrorMessage(response, t)));
				return;
			}
			if (response.flowStatus === EmbeddedSignUpFlowStatusV2.Complete) {
				handleFlowCompletion(response);
				return;
			}
			if (response.flowStatus === EmbeddedSignUpFlowStatusV2.Incomplete) {
				if (handleRedirectionIfNeeded(response)) return;
				if (response.data?.additionalData?.passkeyCreationOptions) {
					const { passkeyCreationOptions } = response.data.additionalData;
					const effectiveExecutionIdForPasskey = response.executionId ?? currentFlow?.executionId;
					passkeyProcessedRef.current = false;
					setPasskeyState({
						actionId: component.id || "submit",
						creationOptions: passkeyCreationOptions,
						error: null,
						executionId: effectiveExecutionIdForPasskey,
						isActive: true
					});
					setIsLoading(false);
					return;
				}
				setCurrentFlow(response);
				setupFormFields(response);
				if (response?.error) handleError(response);
			}
		} catch (err) {
			handleError(err);
			onError?.(err);
		} finally {
			setIsLoading(false);
		}
	};
	/**
	* Handle passkey registration when passkey state becomes active.
	* This effect auto-triggers the browser passkey popup and submits the result.
	*/
	useEffect(() => {
		if (!passkeyState.isActive || !passkeyState.creationOptions || !passkeyState.executionId) return;
		if (passkeyProcessedRef.current) return;
		passkeyProcessedRef.current = true;
		const performPasskeyRegistration = async () => {
			const passkeyResponse = await handlePasskeyRegistration(passkeyState.creationOptions);
			const passkeyResponseObj = JSON.parse(passkeyResponse);
			const inputs = {
				attestationObject: passkeyResponseObj.response.attestationObject,
				clientDataJSON: passkeyResponseObj.response.clientDataJSON,
				credentialId: passkeyResponseObj.id
			};
			const processedResponse = normalizeFlowResponseLocal(await onSubmit({
				executionId: passkeyState.executionId ?? void 0,
				inputs,
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
			}));
			onFlowChange?.(processedResponse);
			if (processedResponse.flowStatus === EmbeddedSignUpFlowStatusV2.Complete) handleFlowCompletion(processedResponse);
			else {
				setCurrentFlow(processedResponse);
				setupFormFields(processedResponse);
			}
		};
		performPasskeyRegistration().then(() => {
			setPasskeyState({
				actionId: null,
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
			handleError(error);
			onError?.(error);
		});
	}, [
		passkeyState.isActive,
		passkeyState.creationOptions,
		passkeyState.executionId
	]);
	const containerClasses = cx([
		withVendorCSSClassPrefix("signup"),
		withVendorCSSClassPrefix(`signup--${size}`),
		withVendorCSSClassPrefix(`signup--${variant}`)
	], className);
	const inputClasses = cx([
		withVendorCSSClassPrefix("signup__input"),
		size === "small" && withVendorCSSClassPrefix("signup__input--small"),
		size === "large" && withVendorCSSClassPrefix("signup__input--large")
	], inputClassName);
	const buttonClasses = cx([
		withVendorCSSClassPrefix("signup__button"),
		size === "small" && withVendorCSSClassPrefix("signup__button--small"),
		size === "large" && withVendorCSSClassPrefix("signup__button--large")
	], buttonClassName);
	const errorClasses = cx([withVendorCSSClassPrefix("signup__error")], errorClassName);
	const messageClasses = cx([withVendorCSSClassPrefix("signup__messages")], messageClassName);
	/**
	* Render form components based on flow data using the factory
	*/
	const renderComponents = useCallback((components) => renderSignUpComponents(components, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		_customRenderers: customRenderers,
		_theme: theme,
		buttonClassName: buttonClasses,
		inputClassName: inputClasses,
		onInputBlur: handleInputBlur,
		onSubmit: handleSubmit,
		size,
		variant
	}), [
		customRenderers,
		formValues,
		touchedFields,
		formErrors,
		isFormValid,
		isLoading,
		size,
		theme,
		variant,
		inputClasses,
		buttonClasses,
		handleSubmit,
		handleInputBlur
	]);
	/**
	* Parse URL parameters to check for OAuth redirect state.
	*/
	const getUrlParams = () => {
		const urlParams = new URL(window?.location?.href ?? "").searchParams;
		return {
			code: urlParams.get("code"),
			error: urlParams.get("error"),
			state: urlParams.get("state")
		};
	};
	useEffect(() => {
		const urlParams = getUrlParams();
		if (urlParams.code || urlParams.state) return;
		if (isInitialized && isStorageReady && !isFlowInitialized && !initializationAttemptedRef.current) {
			initializationAttemptedRef.current = true;
			(async () => {
				setIsLoading(true);
				setApiError(null);
				clearMessages();
				try {
					const payload = challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : void 0;
					const response = normalizeFlowResponseLocal(await onInitialize?.(payload));
					await setChallengeToken(response.challengeToken ?? null);
					setCurrentFlow(response);
					setIsFlowInitialized(true);
					onFlowChange?.(response);
					if (window?.location?.href) {
						const url = new URL(window.location.href);
						url.searchParams.delete("executionId");
						url.searchParams.delete("applicationId");
						window.history.replaceState({}, "", url.toString());
					}
					if (response.flowStatus === EmbeddedSignUpFlowStatusV2.Error) {
						handleError(response);
						onError?.(new Error(extractErrorMessage(response, t)));
						return;
					}
					if (response.flowStatus === EmbeddedSignUpFlowStatusV2.Complete) {
						handleFlowCompletion(response);
						return;
					}
					if (response.flowStatus === EmbeddedSignUpFlowStatusV2.Incomplete) {
						setupFormFields(response);
						if (response?.error) handleError(response);
					}
				} catch (err) {
					handleError(err);
					onError?.(err);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [
		isInitialized,
		isStorageReady,
		isFlowInitialized,
		onInitialize,
		onComplete,
		onError,
		onFlowChange,
		setupFormFields,
		normalizeFlowResponseLocal,
		afterSignUpUrl,
		t
	]);
	if (children) return /* @__PURE__ */ jsx("div", {
		className: containerClasses,
		children: children({
			components: (currentFlow?.data)?.components || [],
			error: apiError,
			fieldErrors: formErrors,
			handleInputChange,
			handleSubmit,
			isLoading,
			isValid: isFormValid,
			messages: flowMessages || [],
			subtitle: flowSubtitle || t("signup.subheading"),
			title: flowTitle || t("signup.heading"),
			touched: touchedFields,
			validateForm: () => {
				const result = validateForm();
				return {
					fieldErrors: result.errors,
					isValid: result.isValid
				};
			},
			values: formValues
		})
	});
	if (!isFlowInitialized && isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			className: styles.loadingContainer,
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "medium" })
		}) })
	});
	if (!currentFlow) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			className: errorClasses,
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") }), /* @__PURE__ */ jsx(Alert_default.Description, { children: t("errors.signup.flow.initialization.failure") })]
		}) })
	});
	const { title, subtitle, componentsWithoutHeadings } = getAuthComponentHeadings_default(currentFlow.data?.components || [], flowTitle, flowSubtitle, t("signup.heading"), t("signup.subheading"));
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles.header,
			children: [showTitle && /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: title
			}), showSubtitle && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles.subtitle,
				children: subtitle
			})]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [
			externalError && /* @__PURE__ */ jsx("div", {
				className: styles.flowMessagesContainer,
				children: /* @__PURE__ */ jsx(Alert_default, {
					variant: "error",
					className: cx(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: externalError.message })
				})
			}),
			flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
				className: styles.flowMessagesContainer,
				children: flowMessages.map((message, index) => /* @__PURE__ */ jsx(Alert_default, {
					variant: message.type?.toLowerCase() === "error" ? "error" : "info",
					className: cx(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
				}, message.id || index))
			}),
			/* @__PURE__ */ jsx("div", {
				className: styles.contentContainer,
				children: componentsWithoutHeadings && componentsWithoutHeadings.length > 0 ? renderComponents(componentsWithoutHeadings) : /* @__PURE__ */ jsx(Alert_default, {
					variant: "warning",
					children: /* @__PURE__ */ jsx(Typography_default, {
						variant: "body1",
						children: t("errors.signup.components.not.available")
					})
				})
			})
		] })]
	});
};
/**
* BaseSignUp component that provides embedded sign-up flow for ThunderIDV2.
* This component handles both the presentation layer and sign-up flow logic.
* It accepts API functions as props to maintain framework independence.
*/
const BaseSignUp = ({ preferences, showLogo = true,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const content = /* @__PURE__ */ jsxs("div", { children: [showLogo && /* @__PURE__ */ jsx("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ jsx(Logo_default, { size: "large" })
	}), /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseSignUpContent, {
		showLogo,
		...rest
	}) })] });
	if (!preferences) return content;
	return /* @__PURE__ */ jsx(ComponentPreferencesContext_default.Provider, {
		value: preferences,
		children: content
	});
};
var BaseSignUp_default = BaseSignUp;

//#endregion
export { BaseSignUp_default as default };
//# sourceMappingURL=BaseSignUp.js.map