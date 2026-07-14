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
const require_BaseSignIn_styles = require('../BaseSignIn.styles.cjs');
const require_flowTransformer = require('../../../../../utils/v2/flowTransformer.cjs');
const require_AuthOptionFactory = require('../../AuthOptionFactory.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/auth/SignIn/v2/BaseSignIn.tsx
/**
* Internal component that consumes FlowContext and renders the sign-in UI.
*/
const BaseSignInContent = ({ components = [], onSubmit, onError, error: externalError, className = "", inputClassName = "", buttonClassName = "", messageClassName = "", size = "medium", variant = "outlined", isLoading: externalIsLoading, children, additionalData = {}, isTimeoutDisabled = false, serverFieldErrors = null }) => {
	const { meta } = require_useThunderID.default();
	const { theme } = require_useTheme.default();
	const customRenderers = (0, react.useContext)(require_ComponentRendererContext.default);
	const { t } = require_useTranslation.default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = require_useFlow.default();
	const styles = require_BaseSignIn_styles.default(theme, theme.vars.colors.text.primary);
	const [isSubmitting, setIsSubmitting] = (0, react.useState)(false);
	const [apiError, setApiError] = (0, react.useState)(null);
	const isLoading = externalIsLoading || isSubmitting;
	/**
	* Handle error responses and extract meaningful error messages
	* Uses the transformer's extractErrorMessage function for consistency
	*/
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
	/**
	* Extract form fields from flow components
	*/
	const extractFormFields = (0, react.useCallback)((flowComponents) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === "TEXT_INPUT" || component.type === "PASSWORD_INPUT" || component.type === "EMAIL_INPUT" || component.type === "PHONE_INPUT" || component.type === "OTP_INPUT" || component.type === "SELECT" || component.type === "DATE_INPUT") {
					const identifier = component.ref;
					const ruleValidator = (0, __thunderid_browser.buildValidatorFromRules)(component.validation);
					fields.push({
						initialValue: "",
						name: identifier,
						required: component.required || false,
						validator: (value) => {
							if (component.required && (!value || value.trim() === "")) return t("validations.required.field.error");
							if ((component.type === "EMAIL_INPUT" || component.variant === "EMAIL") && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("field.email.invalid");
							if (ruleValidator && value) {
								const ruleMessage = ruleValidator(value);
								if (ruleMessage) return t(ruleMessage);
							}
							return null;
						}
					});
				}
				if (component.components) processComponents(component.components);
			});
		};
		processComponents(flowComponents);
		return fields;
	}, [t]);
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, setErrors: setFormErrors, clearErrors: clearFormErrors, validateForm, touchAllFields } = require_useForm.useForm({
		fields: components ? extractFormFields(components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: false
	});
	/**
	* Project server-side validation errors (from `data.fieldErrors`) into the form's
	* `errors` state so they surface through the same render-prop / UI as client-side
	* errors. When the server returns multiple failing rules for one field, only the
	* first message is shown — matching the SDK's single-string-per-field contract.
	* The full FieldError[] remains available via the `serverFieldErrors` prop.
	*
	* Also marks each affected field as `touched` so the error renders immediately —
	* `useForm` only shows errors for touched fields by default.
	*/
	(0, react.useEffect)(() => {
		clearFormErrors();
		if (!serverFieldErrors || serverFieldErrors.length === 0) return;
		const errors = {};
		for (const fe of serverFieldErrors) if (!(fe.identifier in errors)) errors[fe.identifier] = fe.message;
		setFormErrors(errors);
		Object.keys(errors).forEach((field) => setFormTouched(field, true));
	}, [
		serverFieldErrors,
		setFormErrors,
		setFormTouched,
		clearFormErrors
	]);
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
	* Handle component submission (for buttons and actions).
	*/
	const handleSubmit = async (component, data, skipValidation) => {
		if (!skipValidation) {
			touchAllFields();
			if (!validateForm().isValid) return;
		}
		setIsSubmitting(true);
		setApiError(null);
		clearMessages();
		try {
			const filteredInputs = {};
			if (data) Object.keys(data).forEach((key) => {
				if (data[key] !== void 0 && data[key] !== null && data[key] !== "") filteredInputs[key] = data[key];
			});
			let payload = {};
			payload = {
				...payload,
				...component.id && { action: component.id },
				inputs: filteredInputs
			};
			await onSubmit?.(payload, component);
		} catch (err) {
			handleError(err);
			onError?.(err);
		} finally {
			setIsSubmitting(false);
		}
	};
	const containerClasses = (0, __emotion_css.cx)([
		(0, __thunderid_browser.withVendorCSSClassPrefix)("signin"),
		(0, __thunderid_browser.withVendorCSSClassPrefix)(`signin--${size}`),
		(0, __thunderid_browser.withVendorCSSClassPrefix)(`signin--${variant}`)
	], className);
	const inputClasses = (0, __emotion_css.cx)([
		(0, __thunderid_browser.withVendorCSSClassPrefix)("signin__input"),
		size === "small" && (0, __thunderid_browser.withVendorCSSClassPrefix)("signin__input--small"),
		size === "large" && (0, __thunderid_browser.withVendorCSSClassPrefix)("signin__input--large")
	], inputClassName);
	const buttonClasses = (0, __emotion_css.cx)([
		(0, __thunderid_browser.withVendorCSSClassPrefix)("signin__button"),
		size === "small" && (0, __thunderid_browser.withVendorCSSClassPrefix)("signin__button--small"),
		size === "large" && (0, __thunderid_browser.withVendorCSSClassPrefix)("signin__button--large")
	], buttonClassName);
	const messageClasses = (0, __emotion_css.cx)([(0, __thunderid_browser.withVendorCSSClassPrefix)("signin__messages")], messageClassName);
	/**
	* Render components based on flow data using the factory
	*/
	const renderComponents = (0, react.useCallback)((flowComponents) => require_AuthOptionFactory.renderSignInComponents(flowComponents, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		_customRenderers: customRenderers,
		_theme: theme,
		additionalData,
		buttonClassName: buttonClasses,
		inputClassName: inputClasses,
		isTimeoutDisabled,
		meta,
		onInputBlur: handleInputBlur,
		onSubmit: handleSubmit,
		size,
		t,
		variant
	}), [
		additionalData,
		customRenderers,
		formValues,
		touchedFields,
		formErrors,
		isFormValid,
		meta,
		t,
		theme,
		isLoading,
		size,
		variant,
		inputClasses,
		buttonClasses,
		handleInputBlur,
		handleSubmit,
		isTimeoutDisabled
	]);
	if (children) {
		const renderProps = {
			components,
			error: apiError,
			fieldErrors: formErrors,
			handleInputChange,
			handleSubmit,
			isLoading,
			isTimeoutDisabled,
			isValid: isFormValid,
			messages: flowMessages || [],
			meta,
			subtitle: flowSubtitle ?? "",
			title: flowTitle || t("signin.heading"),
			touched: touchedFields,
			validateForm: () => {
				const result = validateForm();
				return {
					fieldErrors: result.errors,
					isValid: result.isValid
				};
			},
			values: formValues
		};
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: containerClasses,
			"data-testid": "thunderid-signin",
			children: children(renderProps)
		});
	}
	if (isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default, {
		className: (0, __emotion_css.cx)(containerClasses, styles.card),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Content, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "2rem"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Spinner.default, {})
		}) })
	});
	if (!components || components.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default, {
		className: (0, __emotion_css.cx)(containerClasses, styles.card),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Content, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default, {
			variant: "warning",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body1",
				children: t("errors.signin.components.not.available")
			})
		}) })
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default, {
		className: (0, __emotion_css.cx)(containerClasses, styles.card),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default.Content, { children: [
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
					variant: message.type === "error" ? "error" : "info",
					className: (0, __emotion_css.cx)(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: message.message })
				}, index))
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: styles.contentContainer,
				children: renderComponents(components)
			})
		] })
	});
};
/**
* Base SignIn component that provides generic authentication flow.
* This component handles component-driven UI rendering and can transform input
* structure to component-driven format automatically.
*
* @example
* // Default UI
* ```tsx
* import { BaseSignIn } from '@thunderid/react';
*
* const MySignIn = () => {
*   return (
*     <BaseSignIn
*       components={components}
*       onSubmit={async (payload) => {
*         return await handleAuth(payload);
*       }}
*       onSuccess={(authData) => {
*         console.log('Success:', authData);
*       }}
*       className="max-w-md mx-auto"
*     />
*   );
* };
* ```
*
* @example
* // Custom UI with render props
* ```tsx
* <BaseSignIn components={components} onSubmit={handleSubmit}>
*   {({values, errors, handleInputChange, handleSubmit, isLoading, components}) => (
*     <div className="custom-form">
*       <input
*         name="username"
*         value={values.username || ''}
*         onChange={(e) => handleInputChange('username', e.target.value)}
*       />
*       {errors.username && <span>{errors.username}</span>}
*       <button
*         onClick={() => handleSubmit(components[0], values)}
*         disabled={isLoading}
*       >
*         Sign In
*       </button>
*     </div>
*   )}
* </BaseSignIn>
* ```
*/
const BaseSignIn = ({ preferences,...rest }) => {
	const content = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FlowProvider.default, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BaseSignInContent, { ...rest }) });
	if (!preferences) return content;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ComponentPreferencesContext.default.Provider, {
		value: preferences,
		children: content
	});
};
var BaseSignIn_default = BaseSignIn;

//#endregion
exports.default = BaseSignIn_default;
//# sourceMappingURL=BaseSignIn.cjs.map