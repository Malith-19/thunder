const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_FlowProvider = require('../../../../../contexts/Flow/FlowProvider.cjs');
const require_useThunderID = require('../../../../../contexts/ThunderID/useThunderID.cjs');
const require_useFlow = require('../../../../../contexts/Flow/useFlow.cjs');
const require_useTheme = require('../../../../../contexts/Theme/useTheme.cjs');
const require_useTranslation = require('../../../../../hooks/useTranslation.cjs');
const require_useForm = require('../../../../../hooks/useForm.cjs');
const require_Spinner = require('../../../../primitives/Spinner/Spinner.cjs');
const require_Typography = require('../../../../primitives/Typography/Typography.cjs');
const require_Alert = require('../../../../primitives/Alert/Alert.cjs');
const require_Card = require('../../../../primitives/Card/Card.cjs');
const require_Logo = require('../../../../primitives/Logo/Logo.cjs');
const require_SignUpOptionFactory = require('./SignUpOptionFactory.cjs');
const require_BaseSignUp_styles = require('../BaseSignUp.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/auth/SignUp/v1/BaseSignUp.tsx
const logger = (0, __thunderid_browser.createPackageComponentLogger)("@thunderid/react", "BaseSignUp");
/**
* Component that consumes FlowContext and renders the sign-up UI.
*
* @internal
*/
const BaseSignUpContent = ({ afterSignUpUrl, onInitialize, onSubmit, onError, onFlowChange, onComplete, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const { t } = require_useTranslation.default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = require_useFlow.default();
	require_useThunderID.default();
	const styles = require_BaseSignUp_styles.default(theme, colorScheme);
	const handleError = (0, react.useCallback)((error) => {
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
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const [isFlowInitialized, setIsFlowInitialized] = (0, react.useState)(false);
	const [currentFlow, setCurrentFlow] = (0, react.useState)(null);
	const initializationAttemptedRef = (0, react.useRef)(false);
	/**
	* Extract form fields from flow components
	*/
	const extractFormFields = (0, react.useCallback)((components) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === __thunderid_browser.EmbeddedFlowComponentType.Input) {
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
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, validateForm, reset: resetForm } = require_useForm.useForm({
		fields: currentFlow?.data?.components ? extractFormFields(currentFlow.data.components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: true
	});
	/**
	* Setup form fields based on the current flow.
	*/
	const setupFormFields = (0, react.useCallback)((flowResponse) => {
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
		if (response?.type === __thunderid_browser.EmbeddedFlowResponseType.Redirection && response?.data?.redirectURL) {
			/**
			* Open a popup window to handle redirection prompts for social sign-up
			*/
			const redirectUrl = response.data.redirectURL;
			const popup = window.open(redirectUrl, "oauth_popup", "width=500,height=600,scrollbars=yes,resizable=yes");
			if (!popup) {
				logger.error("Failed to open popup window");
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
						if (continueResponse.flowStatus === __thunderid_browser.EmbeddedFlowStatus.Complete) onComplete?.(continueResponse);
						else if (continueResponse.flowStatus === __thunderid_browser.EmbeddedFlowStatus.Incomplete) {
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
								logger.error("OAuth error:");
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
									if (continueResponse.flowStatus === __thunderid_browser.EmbeddedFlowStatus.Complete) onComplete?.(continueResponse);
									else if (continueResponse.flowStatus === __thunderid_browser.EmbeddedFlowStatus.Incomplete) {
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
					logger.error("Error monitoring popup:");
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
			if (response.flowStatus === __thunderid_browser.EmbeddedFlowStatus.Complete) {
				onComplete?.(response);
				return;
			}
			if (response.flowStatus === __thunderid_browser.EmbeddedFlowStatus.Incomplete) {
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
	const containerClasses = (0, __emotion_css.cx)([
		(0, __thunderid_browser.withVendorCSSClassPrefix)("signup"),
		(0, __thunderid_browser.withVendorCSSClassPrefix)(`signup--${size}`),
		(0, __thunderid_browser.withVendorCSSClassPrefix)(`signup--${variant}`)
	], className);
	const inputClasses = (0, __emotion_css.cx)([
		(0, __thunderid_browser.withVendorCSSClassPrefix)("signup__input"),
		size === "small" && (0, __thunderid_browser.withVendorCSSClassPrefix)("signup__input--small"),
		size === "large" && (0, __thunderid_browser.withVendorCSSClassPrefix)("signup__input--large")
	], inputClassName);
	const buttonClasses = (0, __emotion_css.cx)([
		(0, __thunderid_browser.withVendorCSSClassPrefix)("signup__button"),
		size === "small" && (0, __thunderid_browser.withVendorCSSClassPrefix)("signup__button--small"),
		size === "large" && (0, __thunderid_browser.withVendorCSSClassPrefix)("signup__button--large")
	], buttonClassName);
	const errorClasses = (0, __emotion_css.cx)([(0, __thunderid_browser.withVendorCSSClassPrefix)("signup__error")], errorClassName);
	const messageClasses = (0, __emotion_css.cx)([(0, __thunderid_browser.withVendorCSSClassPrefix)("signup__messages")], messageClassName);
	/**
	* Render form components based on flow data using the factory
	*/
	const renderComponents = (0, react.useCallback)((components) => require_SignUpOptionFactory.renderSignUpComponents(components, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
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
	(0, react.useEffect)(() => {
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
					if (response.flowStatus === __thunderid_browser.EmbeddedFlowStatus.Complete) {
						onComplete?.(response);
						return;
					}
					if (response.flowStatus === __thunderid_browser.EmbeddedFlowStatus.Incomplete) setupFormFields(response);
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
	if (children) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
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
	if (!isFlowInitialized && isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default, {
		className: (0, __emotion_css.cx)(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Content, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: styles.loadingContainer,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Spinner.default, { size: "medium" })
		}) })
	});
	if (!currentFlow) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default, {
		className: (0, __emotion_css.cx)(containerClasses, styles.card),
		variant,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Content, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Alert.default, {
			variant: "error",
			className: errorClasses,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Title, { children: t("errors.heading") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: t("errors.signup.flow.initialization.failure") })]
		}) })
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default, {
		className: (0, __emotion_css.cx)(containerClasses, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default.Header, {
			className: styles.header,
			children: [showTitle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Title, {
				level: 2,
				className: styles.title,
				children: flowTitle || t("signup.heading")
			}), showSubtitle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body1",
				className: styles.subtitle,
				children: flowSubtitle || t("signup.subheading")
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default.Content, { children: [flowMessages && flowMessages.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: styles.flowMessagesContainer,
			children: flowMessages.map((message, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default, {
				variant: message.type?.toLowerCase() === "error" ? "error" : "info",
				className: (0, __emotion_css.cx)(styles.flowMessageItem, messageClasses),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: message.message })
			}, message.id || index))
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: styles.contentContainer,
			children: currentFlow.data?.components && currentFlow.data.components.length > 0 ? renderComponents(currentFlow.data.components) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default, {
				variant: "warning",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
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
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_BaseSignUp_styles.default(theme, colorScheme);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [showLogo && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Logo.default, { size: "large" })
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FlowProvider.default, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BaseSignUpContent, {
		showLogo,
		...rest
	}) })] });
};
var BaseSignUp_default = BaseSignUp;

//#endregion
exports.default = BaseSignUp_default;
//# sourceMappingURL=BaseSignUp.cjs.map