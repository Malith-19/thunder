import FlowProvider_default from "../../../../../contexts/Flow/FlowProvider.js";
import useThunderID_default from "../../../../../contexts/ThunderID/useThunderID.js";
import useFlow_default from "../../../../../contexts/Flow/useFlow.js";
import useTheme_default from "../../../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../../../hooks/useTranslation.js";
import { useForm } from "../../../../../hooks/useForm.js";
import Spinner_default from "../../../../primitives/Spinner/Spinner.js";
import Typography_default from "../../../../primitives/Typography/Typography.js";
import Alert_default from "../../../../primitives/Alert/Alert.js";
import Card_default from "../../../../primitives/Card/Card.js";
import Logo_default from "../../../../primitives/Logo/Logo.js";
import { renderSignUpComponents } from "./SignUpOptionFactory.js";
import BaseSignUp_styles_default from "../BaseSignUp.styles.js";
import { EmbeddedFlowComponentType, EmbeddedFlowResponseType, EmbeddedFlowStatus, createPackageComponentLogger, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/auth/SignUp/v1/BaseSignUp.tsx
const logger$1 = createPackageComponentLogger("@thunderid/react", "BaseSignUp");
/**
* Component that consumes FlowContext and renders the sign-up UI.
*
* @internal
*/
const BaseSignUpContent = ({ afterSignUpUrl, onInitialize, onSubmit, onError, onFlowChange, onComplete, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = useTheme_default();
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
	useThunderID_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const handleError = useCallback((error) => {
		let errorMessage = t("errors.signup.flow.failure");
		if (error && typeof error === "object") {
			if (error.code && (error.message || error.description)) errorMessage = error.description || error.message;
			else if (error instanceof Error && error.name === "ThunderIDAPIError") try {
				const errorResponse = JSON.parse(error.message);
				if (errorResponse.description) errorMessage = errorResponse.description;
				else if (errorResponse.message) errorMessage = errorResponse.message;
				else errorMessage = error.message;
			} catch {
				errorMessage = error.message;
			}
			else if (error.message) errorMessage = error.message;
		} else if (typeof error === "string") errorMessage = error;
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
	const [isLoading, setIsLoading] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const initializationAttemptedRef = useRef(false);
	/**
	* Extract form fields from flow components
	*/
	const extractFormFields = useCallback((components) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === EmbeddedFlowComponentType.Input) {
					const config = component.config || {};
					fields.push({
						initialValue: config.defaultValue || "",
						name: config.name || component.id,
						required: config.required || false,
						validator: (value) => {
							if (config.required && (!value || value.trim() === "")) return t("validations.required.field.error");
							if (config.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("field.email.invalid");
							if (config.type === "password" && value && value.length < 8) return t("field.password.weak");
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
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, validateForm, reset: resetForm } = useForm({
		fields: currentFlow?.data?.components ? extractFormFields(currentFlow.data.components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: true
	});
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
	* Handle input value changes.
	*/
	const handleInputChange = (name, value) => {
		setFormValue(name, value);
		setFormTouched(name, true);
	};
	/**
	* Check if the response contains a redirection URL and perform the redirect if necessary.
	* @param response - The sign-up response
	* @returns true if a redirect was performed, false otherwise
	*/
	const handleRedirectionIfNeeded = (response) => {
		if (response?.type === EmbeddedFlowResponseType.Redirection && response?.data?.redirectURL) {
			/**
			* Open a popup window to handle redirection prompts for social sign-up
			*/
			const redirectUrl = response.data.redirectURL;
			const popup = window.open(redirectUrl, "oauth_popup", "width=500,height=600,scrollbars=yes,resizable=yes");
			if (!popup) {
				logger$1.error("Failed to open popup window");
				return false;
			}
			/**
			* Use `let` for messageHandler and popupMonitor to resolve circular references:
			* messageHandler <-> cleanup <-> popupMonitor.
			* All are assigned before any of them can be invoked at runtime.
			*/
			let hasProcessedCallback = false;
			let popupMonitor;
			let messageHandler;
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
				if (event.source !== popup) return;
				/**
				* Check the origin of the message to ensure it's from a trusted source
				*/
				const expectedOrigin = afterSignUpUrl ? new URL(afterSignUpUrl).origin : window.location.origin;
				if (event.origin !== expectedOrigin && event.origin !== window.location.origin) return;
				const { code, state } = event.data;
				if (code && state) {
					const payload = {
						...currentFlow.flowId && { flowId: currentFlow.flowId },
						actionId: "",
						flowType: currentFlow.flowType || "REGISTRATION",
						inputs: {
							code,
							state
						}
					};
					try {
						const continueResponse = await onSubmit(payload);
						onFlowChange?.(continueResponse);
						if (continueResponse.flowStatus === EmbeddedFlowStatus.Complete) onComplete?.(continueResponse);
						else if (continueResponse.flowStatus === EmbeddedFlowStatus.Incomplete) {
							setCurrentFlow(continueResponse);
							setupFormFields(continueResponse);
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
									...currentFlow.flowId && { flowId: currentFlow.flowId },
									actionId: "",
									flowType: currentFlow.flowType || "REGISTRATION",
									inputs: {
										code,
										state
									}
								};
								try {
									const continueResponse = await onSubmit(payload);
									onFlowChange?.(continueResponse);
									if (continueResponse.flowStatus === EmbeddedFlowStatus.Complete) onComplete?.(continueResponse);
									else if (continueResponse.flowStatus === EmbeddedFlowStatus.Incomplete) {
										setCurrentFlow(continueResponse);
										setupFormFields(continueResponse);
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
	const handleSubmit = async (component, data) => {
		if (!currentFlow) return;
		setIsLoading(true);
		clearMessages();
		try {
			const filteredInputs = {};
			if (data) Object.entries(data).forEach(([key, value]) => {
				if (value !== null && value !== void 0 && value !== "") filteredInputs[key] = value;
			});
			const actionId = component.id;
			const response = await onSubmit({
				...currentFlow.flowId && { flowId: currentFlow.flowId },
				flowType: currentFlow.flowType || "REGISTRATION",
				inputs: filteredInputs,
				...actionId && { actionId }
			});
			onFlowChange?.(response);
			if (response.flowStatus === EmbeddedFlowStatus.Complete) {
				onComplete?.(response);
				return;
			}
			if (response.flowStatus === EmbeddedFlowStatus.Incomplete) {
				if (handleRedirectionIfNeeded(response)) return;
				setCurrentFlow(response);
				setupFormFields(response);
			}
		} catch (err) {
			handleError(err);
			onError?.(err);
		} finally {
			setIsLoading(false);
		}
	};
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
		buttonClassName: buttonClasses,
		inputClassName: inputClasses,
		onSubmit: handleSubmit,
		size,
		variant
	}), [
		formValues,
		touchedFields,
		formErrors,
		isFormValid,
		isLoading,
		size,
		variant,
		inputClasses,
		buttonClasses,
		handleSubmit
	]);
	useEffect(() => {
		if (isInitialized && !isFlowInitialized && !initializationAttemptedRef.current) {
			initializationAttemptedRef.current = true;
			(async () => {
				setIsLoading(true);
				clearMessages();
				try {
					const response = await onInitialize?.();
					setCurrentFlow(response);
					setIsFlowInitialized(true);
					onFlowChange?.(response);
					if (response.flowStatus === EmbeddedFlowStatus.Complete) {
						onComplete?.(response);
						return;
					}
					if (response.flowStatus === EmbeddedFlowStatus.Incomplete) setupFormFields(response);
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
		isFlowInitialized,
		onInitialize,
		onComplete,
		onError,
		onFlowChange,
		setupFormFields,
		afterSignUpUrl,
		t
	]);
	if (children) return /* @__PURE__ */ jsx("div", {
		className: containerClasses,
		children: children({
			components: currentFlow?.data?.components || [],
			errors: formErrors,
			handleInputChange,
			handleSubmit,
			isLoading,
			isValid: isFormValid,
			messages: flowMessages || [],
			subtitle: flowSubtitle || t("signup.subheading"),
			title: flowTitle || t("signup.heading"),
			touched: touchedFields,
			validateForm,
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
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(containerClasses, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles.header,
			children: [showTitle && /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: flowTitle || t("signup.heading")
			}), showSubtitle && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles.subtitle,
				children: flowSubtitle || t("signup.subheading")
			})]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [flowMessages && flowMessages.length > 0 && /* @__PURE__ */ jsx("div", {
			className: styles.flowMessagesContainer,
			children: flowMessages.map((message, index) => /* @__PURE__ */ jsx(Alert_default, {
				variant: message.type?.toLowerCase() === "error" ? "error" : "info",
				className: cx(styles.flowMessageItem, messageClasses),
				children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
			}, message.id || index))
		}), /* @__PURE__ */ jsx("div", {
			className: styles.contentContainer,
			children: currentFlow.data?.components && currentFlow.data.components.length > 0 ? renderComponents(currentFlow.data.components) : /* @__PURE__ */ jsx(Alert_default, {
				variant: "warning",
				children: /* @__PURE__ */ jsx(Typography_default, {
					variant: "body1",
					children: t("errors.signup.components.not.available")
				})
			})
		})] })]
	});
};
/**
* BaseSignUp component that provides embedded sign-up flow for ThunderID.
* This component handles both the presentation layer and sign-up flow logic.
* It accepts API functions as props to maintain framework independence.
*
* @internal
*/
const BaseSignUp = ({ showLogo = true,...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	return /* @__PURE__ */ jsxs("div", { children: [showLogo && /* @__PURE__ */ jsx("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ jsx(Logo_default, { size: "large" })
	}), /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseSignUpContent, {
		showLogo,
		...rest
	}) })] });
};
var BaseSignUp_default = BaseSignUp;

//#endregion
export { BaseSignUp_default as default };
//# sourceMappingURL=BaseSignUp.js.map