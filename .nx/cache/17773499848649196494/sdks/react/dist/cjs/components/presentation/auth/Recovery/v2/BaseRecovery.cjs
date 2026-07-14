const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_ComponentRendererContext = require('../../../../../contexts/ComponentRenderer/ComponentRendererContext.cjs');
const require_FlowProvider = require('../../../../../contexts/Flow/FlowProvider.cjs');
const require_useThunderID = require('../../../../../contexts/ThunderID/useThunderID.cjs');
const require_useFlow = require('../../../../../contexts/Flow/useFlow.cjs');
const require_useTheme = require('../../../../../contexts/Theme/useTheme.cjs');
const require_ComponentPreferencesContext = require('../../../../../contexts/I18n/ComponentPreferencesContext.cjs');
const require_useTranslation = require('../../../../../hooks/useTranslation.cjs');
const require_useForm = require('../../../../../hooks/useForm.cjs');
const require_Spinner = require('../../../../primitives/Spinner/Spinner.cjs');
const require_Typography = require('../../../../primitives/Typography/Typography.cjs');
const require_Alert = require('../../../../primitives/Alert/Alert.cjs');
const require_Card = require('../../../../primitives/Card/Card.cjs');
const require_Logo = require('../../../../primitives/Logo/Logo.cjs');
const require_flowTransformer = require('../../../../../utils/v2/flowTransformer.cjs');
const require_AuthOptionFactory = require('../../AuthOptionFactory.cjs');
const require_BaseSignUp_styles = require('../../SignUp/BaseSignUp.styles.cjs');
const require_getAuthComponentHeadings = require('../../../../../utils/v2/getAuthComponentHeadings.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/auth/Recovery/v2/BaseRecovery.tsx
/**
* Internal component that renders the V2 recovery UI and manages flow state.
*
* @internal
*/
const BaseRecoveryContent = ({ onInitialize, onSubmit, onError, onFlowChange, onComplete, error: externalError, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const customRenderers = (0, react.useContext)(require_ComponentRendererContext.default);
	const { t } = require_useTranslation.default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = require_useFlow.default();
	const { meta } = require_useThunderID.default();
	const styles = require_BaseSignUp_styles.default(theme, colorScheme);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const [isFlowInitialized, setIsFlowInitialized] = (0, react.useState)(false);
	const [currentFlow, setCurrentFlow] = (0, react.useState)(null);
	const [apiError, setApiError] = (0, react.useState)(null);
	const initializationAttemptedRef = (0, react.useRef)(false);
	const challengeTokenRef = (0, react.useRef)(null);
	const handleError = (0, react.useCallback)((error) => {
		const errorMessage = require_flowTransformer.extractErrorMessage(error, t);
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
	const normalizeFlowResponseLocal = (0, react.useCallback)((response) => {
		if (response?.data?.components && Array.isArray(response.data.components)) return response;
		if (response?.data) {
			const { components } = require_flowTransformer.normalizeFlowResponse(response, t, {
				defaultErrorKey: "components.recovery.errors.generic",
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
	}, [t, meta]);
	const extractFormFields = (0, react.useCallback)((components) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === __thunderid_browser.EmbeddedFlowComponentTypeV2.TextInput || component.type === __thunderid_browser.EmbeddedFlowComponentTypeV2.PasswordInput || component.type === __thunderid_browser.EmbeddedFlowComponentTypeV2.EmailInput || component.type === __thunderid_browser.EmbeddedFlowComponentTypeV2.Select || component.type === __thunderid_browser.EmbeddedFlowComponentTypeV2.DateInput) {
					const fieldName = component.ref || component.id;
					const ruleValidator = (0, __thunderid_browser.buildValidatorFromRules)(component.validation);
					fields.push({
						initialValue: "",
						name: fieldName,
						required: component.required || false,
						validator: (value) => {
							if (component.required && (!value || value.trim() === "")) return t("validations.required.field.error");
							if ((component.type === __thunderid_browser.EmbeddedFlowComponentTypeV2.EmailInput || component.variant === "EMAIL") && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("field.email.invalid");
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
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, setErrors: setFormErrors, clearErrors: clearFormErrors, validateForm, touchAllFields, reset: resetForm } = require_useForm.useForm({
		fields: currentFlow?.data?.components ? extractFormFields(currentFlow.data.components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: false
	});
	/**
	* Project server-side validation errors from the most recent flow response into the
	* form's `errors` state. See BaseSignIn for the same pattern.
	*/
	(0, react.useEffect)(() => {
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
	const handleInputChange = (name, value) => {
		setFormValue(name, value);
	};
	const handleInputBlur = (name) => {
		setFormTouched(name, true);
	};
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
			const payload = {
				...currentFlow.executionId && { executionId: currentFlow.executionId },
				...component.id && { action: component.id },
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {},
				inputs: filteredInputs
			};
			const rawResponse = await onSubmit?.(payload);
			if (!rawResponse) return;
			const response = normalizeFlowResponseLocal(rawResponse);
			onFlowChange?.(response);
			if (response.challengeToken !== void 0) challengeTokenRef.current = response.challengeToken ?? null;
			if (response.flowStatus === __thunderid_browser.EmbeddedRecoveryFlowStatusV2.Error) {
				handleError(response);
				onError?.(new Error(require_flowTransformer.extractErrorMessage(response, t)));
				return;
			}
			if (response.flowStatus === __thunderid_browser.EmbeddedRecoveryFlowStatusV2.Complete) {
				onComplete?.(response);
				return;
			}
			if (response.flowStatus === __thunderid_browser.EmbeddedRecoveryFlowStatusV2.Incomplete) {
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
	const renderComponents = (0, react.useCallback)((components) => require_AuthOptionFactory.renderRecoveryComponents(components, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		_customRenderers: customRenderers,
		_theme: theme,
		buttonClassName: buttonClasses,
		inputClassName: inputClasses,
		meta,
		onInputBlur: handleInputBlur,
		onSubmit: handleSubmit,
		size,
		variant
	}), [
		customRenderers,
		buttonClasses,
		formErrors,
		formValues,
		handleInputBlur,
		handleSubmit,
		inputClasses,
		isFormValid,
		meta,
		isLoading,
		size,
		theme,
		touchedFields,
		variant
	]);
	(0, react.useEffect)(() => {
		if (isInitialized && !isFlowInitialized && !initializationAttemptedRef.current) {
			initializationAttemptedRef.current = true;
			(async () => {
				setIsLoading(true);
				setApiError(null);
				clearMessages();
				try {
					const rawResponse = await onInitialize?.();
					if (!rawResponse) return;
					const response = normalizeFlowResponseLocal(rawResponse);
					if (response.challengeToken !== void 0) challengeTokenRef.current = response.challengeToken ?? null;
					if (response.flowStatus === __thunderid_browser.EmbeddedRecoveryFlowStatusV2.Error) {
						handleError(response);
						onError?.(new Error(require_flowTransformer.extractErrorMessage(response, t)));
					}
					setCurrentFlow(response);
					setIsFlowInitialized(true);
					onFlowChange?.(response);
					if (response.flowStatus === __thunderid_browser.EmbeddedRecoveryFlowStatusV2.Complete) {
						onComplete?.(response);
						return;
					}
					if (response.flowStatus === __thunderid_browser.EmbeddedRecoveryFlowStatusV2.Incomplete) {
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
		isFlowInitialized,
		isInitialized,
		normalizeFlowResponseLocal,
		onComplete,
		onError,
		onFlowChange,
		onInitialize,
		setupFormFields,
		t
	]);
	if (children) {
		if (typeof children === "function") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: containerClasses,
			children: children({
				components: currentFlow?.data?.components || [],
				error: apiError,
				fieldErrors: formErrors,
				handleInputChange,
				handleSubmit,
				isLoading,
				isValid: isFormValid,
				messages: flowMessages || [],
				meta,
				subtitle: flowSubtitle || t("recovery.subheading"),
				title: flowTitle || t("recovery.heading"),
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
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: containerClasses,
			children
		});
	}
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
	const { title, subtitle, componentsWithoutHeadings } = require_getAuthComponentHeadings.default(currentFlow.data?.components || [], flowTitle, flowSubtitle, t("recovery.heading"), t("recovery.subheading"));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default, {
		className: (0, __emotion_css.cx)(containerClasses, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default.Header, {
			className: styles.header,
			children: [showTitle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Title, {
				level: 2,
				className: styles.title,
				children: title
			}), showSubtitle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body1",
				className: styles.subtitle,
				children: subtitle
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default.Content, { children: [
			externalError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: styles.flowMessagesContainer,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default, {
					variant: "error",
					className: (0, __emotion_css.cx)(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: externalError.message })
				})
			}),
			flowMessages && flowMessages.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: styles.flowMessagesContainer,
				children: flowMessages.map((message, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default, {
					variant: message.type?.toLowerCase() === "error" ? "error" : "info",
					className: (0, __emotion_css.cx)(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: message.message })
				}, message.id || index))
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: styles.contentContainer,
				children: componentsWithoutHeadings && componentsWithoutHeadings.length > 0 ? renderComponents(componentsWithoutHeadings) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default, {
					variant: "warning",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
						variant: "body1",
						children: t("errors.recovery.components.not.available")
					})
				})
			})
		] })]
	});
};
/**
* BaseRecovery component for ThunderIDV2 that provides an embedded account/password recovery flow.
* Accepts API functions as props to maintain framework independence.
*/
const BaseRecovery = ({ preferences, showLogo = true,...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_BaseSignUp_styles.default(theme, colorScheme);
	const content = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [showLogo && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Logo.default, { size: "large" })
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FlowProvider.default, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BaseRecoveryContent, {
		showLogo,
		...rest
	}) })] });
	if (!preferences) return content;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ComponentPreferencesContext.default.Provider, {
		value: preferences,
		children: content
	});
};
var BaseRecovery_default = BaseRecovery;

//#endregion
exports.default = BaseRecovery_default;
//# sourceMappingURL=BaseRecovery.cjs.map