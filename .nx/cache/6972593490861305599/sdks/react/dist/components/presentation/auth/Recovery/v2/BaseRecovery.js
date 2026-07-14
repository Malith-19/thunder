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
import { renderRecoveryComponents } from "../../AuthOptionFactory.js";
import BaseSignUp_styles_default from "../../SignUp/BaseSignUp.styles.js";
import getAuthComponentHeadings_default from "../../../../../utils/v2/getAuthComponentHeadings.js";
import { EmbeddedFlowComponentTypeV2, EmbeddedRecoveryFlowStatusV2, buildValidatorFromRules, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/auth/Recovery/v2/BaseRecovery.tsx
/**
* Internal component that renders the V2 recovery UI and manages flow state.
*
* @internal
*/
const BaseRecoveryContent = ({ onInitialize, onSubmit, onError, onFlowChange, onComplete, error: externalError, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = useTheme_default();
	const customRenderers = useContext(ComponentRendererContext_default);
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
	const { meta } = useThunderID_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const [isLoading, setIsLoading] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const [apiError, setApiError] = useState(null);
	const initializationAttemptedRef = useRef(false);
	const challengeTokenRef = useRef(null);
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
	const normalizeFlowResponseLocal = useCallback((response) => {
		if (response?.data?.components && Array.isArray(response.data.components)) return response;
		if (response?.data) {
			const { components } = normalizeFlowResponse(response, t, {
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
	const setupFormFields = useCallback((flowResponse) => {
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
			if (response.flowStatus === EmbeddedRecoveryFlowStatusV2.Error) {
				handleError(response);
				onError?.(new Error(extractErrorMessage(response, t)));
				return;
			}
			if (response.flowStatus === EmbeddedRecoveryFlowStatusV2.Complete) {
				onComplete?.(response);
				return;
			}
			if (response.flowStatus === EmbeddedRecoveryFlowStatusV2.Incomplete) {
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
	const containerClasses = cx([
		withVendorCSSClassPrefix("recovery"),
		withVendorCSSClassPrefix(`recovery--${size}`),
		withVendorCSSClassPrefix(`recovery--${variant}`)
	], className);
	const inputClasses = cx([
		withVendorCSSClassPrefix("recovery__input"),
		size === "small" && withVendorCSSClassPrefix("recovery__input--small"),
		size === "large" && withVendorCSSClassPrefix("recovery__input--large")
	], inputClassName);
	const buttonClasses = cx([
		withVendorCSSClassPrefix("recovery__button"),
		size === "small" && withVendorCSSClassPrefix("recovery__button--small"),
		size === "large" && withVendorCSSClassPrefix("recovery__button--large")
	], buttonClassName);
	const errorClasses = cx([withVendorCSSClassPrefix("recovery__error")], errorClassName);
	const messageClasses = cx([withVendorCSSClassPrefix("recovery__messages")], messageClassName);
	const renderComponents = useCallback((components) => renderRecoveryComponents(components, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
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
	useEffect(() => {
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
					if (response.flowStatus === EmbeddedRecoveryFlowStatusV2.Error) {
						handleError(response);
						onError?.(new Error(extractErrorMessage(response, t)));
					}
					setCurrentFlow(response);
					setIsFlowInitialized(true);
					onFlowChange?.(response);
					if (response.flowStatus === EmbeddedRecoveryFlowStatusV2.Complete) {
						onComplete?.(response);
						return;
					}
					if (response.flowStatus === EmbeddedRecoveryFlowStatusV2.Incomplete) {
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
		if (typeof children === "function") return /* @__PURE__ */ jsx("div", {
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
		return /* @__PURE__ */ jsx("div", {
			className: containerClasses,
			children
		});
	}
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
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") }), /* @__PURE__ */ jsx(Alert_default.Description, { children: t("errors.recovery.flow.initialization.failure") })]
		}) })
	});
	const { title, subtitle, componentsWithoutHeadings } = getAuthComponentHeadings_default(currentFlow.data?.components || [], flowTitle, flowSubtitle, t("recovery.heading"), t("recovery.subheading"));
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
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const content = /* @__PURE__ */ jsxs("div", { children: [showLogo && /* @__PURE__ */ jsx("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ jsx(Logo_default, { size: "large" })
	}), /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseRecoveryContent, {
		showLogo,
		...rest
	}) })] });
	if (!preferences) return content;
	return /* @__PURE__ */ jsx(ComponentPreferencesContext_default.Provider, {
		value: preferences,
		children: content
	});
};
var BaseRecovery_default = BaseRecovery;

//#endregion
export { BaseRecovery_default as default };
//# sourceMappingURL=BaseRecovery.js.map