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
const require_BaseSignUp_styles = require('../../SignUp/BaseSignUp.styles.cjs');
const require_RecoveryOptionFactory = require('./RecoveryOptionFactory.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/auth/Recovery/v1/BaseRecovery.tsx
/**
* Internal component that renders the recovery UI and manages flow state.
*
* @internal
*/
const BaseRecoveryContent = ({ onInitialize, onSubmit, onError, onFlowChange, onComplete, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const { t } = require_useTranslation.default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = require_useFlow.default();
	require_useThunderID.default();
	const styles = require_BaseSignUp_styles.default(theme, colorScheme);
	const handleError = (0, react.useCallback)((error) => {
		let errorMessage = t("errors.recovery.flow.failure");
		if (error && typeof error === "object") {
			if (error.code && (error.message || error.description)) errorMessage = error.description || error.message;
			else if (error instanceof Error && error.name === "ThunderIDAPIError") try {
				const errorResponse = JSON.parse(error.message);
				errorMessage = errorResponse.description || errorResponse.message || error.message;
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
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, validateForm, touchAllFields, reset: resetForm } = require_useForm.useForm({
		fields: currentFlow?.data?.components ? extractFormFields(currentFlow.data.components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: true
	});
	const setupFormFields = (0, react.useCallback)((flowResponse) => {
		const fields = extractFormFields(flowResponse.data?.components || []);
		const initialValues = {};
		fields.forEach((field) => {
			initialValues[field.name] = field.initialValue || "";
		});
		resetForm();
		Object.keys(initialValues).forEach((key) => setFormValue(key, initialValues[key]));
	}, [
		extractFormFields,
		resetForm,
		setFormValue
	]);
	const handleInputChange = (0, react.useCallback)((name, value) => {
		setFormValue(name, value);
		setFormTouched(name, true);
	}, [setFormValue, setFormTouched]);
	const handleSubmit = async (component, data, skipValidation) => {
		if (!currentFlow) return;
		if (!skipValidation) {
			touchAllFields();
			if (!validateForm().isValid) return;
		}
		setIsLoading(true);
		clearMessages();
		try {
			const filteredInputs = {};
			if (data) Object.entries(data).forEach(([key, value]) => {
				if (value !== null && value !== void 0 && value !== "") filteredInputs[key] = value;
			});
			const payload = {
				...currentFlow.flowId && { flowId: currentFlow.flowId },
				flowType: currentFlow.flowType || "RECOVERY",
				inputs: filteredInputs,
				...component.id && { actionId: component.id }
			};
			const response = await onSubmit?.(payload);
			if (!response) return;
			onFlowChange?.(response);
			if (response.flowStatus === __thunderid_browser.EmbeddedFlowStatus.Complete) {
				onComplete?.(response);
				return;
			}
			if (response.flowStatus === __thunderid_browser.EmbeddedFlowStatus.Incomplete) {
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
		(0, __thunderid_browser.withVendorCSSClassPrefix)("recovery"),
		(0, __thunderid_browser.withVendorCSSClassPrefix)(`recovery--${size}`),
		(0, __thunderid_browser.withVendorCSSClassPrefix)(`recovery--${variant}`)
	], className);
	const inputClasses = (0, __emotion_css.cx)([
		(0, __thunderid_browser.withVendorCSSClassPrefix)("recovery__input"),
		size === "small" && (0, __thunderid_browser.withVendorCSSClassPrefix)("recovery__input--small"),
		size === "large" && (0, __thunderid_browser.withVendorCSSClassPrefix)("recovery__input--large")
	], inputClassName);
	const buttonClasses = (0, __emotion_css.cx)([
		(0, __thunderid_browser.withVendorCSSClassPrefix)("recovery__button"),
		size === "small" && (0, __thunderid_browser.withVendorCSSClassPrefix)("recovery__button--small"),
		size === "large" && (0, __thunderid_browser.withVendorCSSClassPrefix)("recovery__button--large")
	], buttonClassName);
	const errorClasses = (0, __emotion_css.cx)([(0, __thunderid_browser.withVendorCSSClassPrefix)("recovery__error")], errorClassName);
	const messageClasses = (0, __emotion_css.cx)([(0, __thunderid_browser.withVendorCSSClassPrefix)("recovery__messages")], messageClassName);
	const renderComponents = (0, react.useCallback)((components) => require_RecoveryOptionFactory.renderRecoveryComponents(components, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		buttonClassName: buttonClasses,
		inputClassName: inputClasses,
		onSubmit: handleSubmit,
		size,
		variant
	}), [
		buttonClasses,
		formErrors,
		formValues,
		handleInputChange,
		handleSubmit,
		inputClasses,
		isFormValid,
		isLoading,
		size,
		touchedFields,
		variant
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
		clearMessages,
		handleError,
		isFlowInitialized,
		isInitialized,
		onComplete,
		onError,
		onFlowChange,
		onInitialize,
		setupFormFields
	]);
	if (children) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: containerClasses,
		children
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
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Title, { children: t("errors.heading") }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: t("errors.recovery.flow.initialization.failure") })]
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
				children: flowTitle || t("recovery.heading")
			}), showSubtitle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body1",
				className: styles.subtitle,
				children: flowSubtitle || t("recovery.subheading")
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
					children: t("errors.recovery.components.not.available")
				})
			})
		})] })]
	});
};
/**
* BaseRecovery component for ThunderID V1 that provides an embedded account/password recovery flow.
* Accepts API functions as props to maintain framework independence.
*
* @internal
*/
const BaseRecovery = ({ showLogo = true,...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_BaseSignUp_styles.default(theme, colorScheme);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [showLogo && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Logo.default, { size: "large" })
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FlowProvider.default, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BaseRecoveryContent, {
		showLogo,
		...rest
	}) })] });
};
var BaseRecovery_default = BaseRecovery;

//#endregion
exports.default = BaseRecovery_default;
//# sourceMappingURL=BaseRecovery.cjs.map