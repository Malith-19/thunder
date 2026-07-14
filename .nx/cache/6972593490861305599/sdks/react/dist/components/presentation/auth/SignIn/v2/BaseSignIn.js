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
import BaseSignIn_styles_default from "../BaseSignIn.styles.js";
import { extractErrorMessage } from "../../../../../utils/v2/flowTransformer.js";
import { renderSignInComponents } from "../../AuthOptionFactory.js";
import { buildValidatorFromRules, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useCallback, useContext, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/auth/SignIn/v2/BaseSignIn.tsx
/**
* Internal component that consumes FlowContext and renders the sign-in UI.
*/
const BaseSignInContent = ({ components = [], onSubmit, onError, error: externalError, className = "", inputClassName = "", buttonClassName = "", messageClassName = "", size = "medium", variant = "outlined", isLoading: externalIsLoading, children, additionalData = {}, isTimeoutDisabled = false, serverFieldErrors = null }) => {
	const { meta } = useThunderID_default();
	const { theme } = useTheme_default();
	const customRenderers = useContext(ComponentRendererContext_default);
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
	const styles = BaseSignIn_styles_default(theme, theme.vars.colors.text.primary);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [apiError, setApiError] = useState(null);
	const isLoading = externalIsLoading || isSubmitting;
	/**
	* Handle error responses and extract meaningful error messages
	* Uses the transformer's extractErrorMessage function for consistency
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
	* Extract form fields from flow components
	*/
	const extractFormFields = useCallback((flowComponents) => {
		const fields = [];
		const processComponents = (comps) => {
			comps.forEach((component) => {
				if (component.type === "TEXT_INPUT" || component.type === "PASSWORD_INPUT" || component.type === "EMAIL_INPUT" || component.type === "PHONE_INPUT" || component.type === "OTP_INPUT" || component.type === "SELECT" || component.type === "DATE_INPUT") {
					const identifier = component.ref;
					const ruleValidator = buildValidatorFromRules(component.validation);
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
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, setErrors: setFormErrors, clearErrors: clearFormErrors, validateForm, touchAllFields } = useForm({
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
	useEffect(() => {
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
	const messageClasses = cx([withVendorCSSClassPrefix("signin__messages")], messageClassName);
	/**
	* Render components based on flow data using the factory
	*/
	const renderComponents = useCallback((flowComponents) => renderSignInComponents(flowComponents, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
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
		return /* @__PURE__ */ jsx("div", {
			className: containerClasses,
			"data-testid": "thunderid-signin",
			children: children(renderProps)
		});
	}
	if (isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "2rem"
			},
			children: /* @__PURE__ */ jsx(Spinner_default, {})
		}) })
	});
	if (!components || components.length === 0) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx(Alert_default, {
			variant: "warning",
			children: /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				children: t("errors.signin.components.not.available")
			})
		}) })
	});
	return /* @__PURE__ */ jsx(Card_default, {
		className: cx(containerClasses, styles.card),
		"data-testid": "thunderid-signin",
		variant,
		children: /* @__PURE__ */ jsxs(Card_default.Content, { children: [
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
					variant: message.type === "error" ? "error" : "info",
					className: cx(styles.flowMessageItem, messageClasses),
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: message.message })
				}, index))
			}),
			/* @__PURE__ */ jsx("div", {
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
	const content = /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseSignInContent, { ...rest }) });
	if (!preferences) return content;
	return /* @__PURE__ */ jsx(ComponentPreferencesContext_default.Provider, {
		value: preferences,
		children: content
	});
};
var BaseSignIn_default = BaseSignIn;

//#endregion
export { BaseSignIn_default as default };
//# sourceMappingURL=BaseSignIn.js.map