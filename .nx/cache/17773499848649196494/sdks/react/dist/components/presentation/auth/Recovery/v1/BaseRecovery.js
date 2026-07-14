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
import BaseSignUp_styles_default from "../../SignUp/BaseSignUp.styles.js";
import { renderRecoveryComponents } from "./RecoveryOptionFactory.js";
import { EmbeddedFlowComponentType, EmbeddedFlowStatus, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/auth/Recovery/v1/BaseRecovery.tsx
/**
* Internal component that renders the recovery UI and manages flow state.
*
* @internal
*/
const BaseRecoveryContent = ({ onInitialize, onSubmit, onError, onFlowChange, onComplete, className = "", inputClassName = "", buttonClassName = "", errorClassName = "", messageClassName = "", size = "medium", variant = "outlined", isInitialized, children, showTitle = true, showSubtitle = true }) => {
	const { theme, colorScheme } = useTheme_default();
	const { t } = useTranslation_default();
	const { subtitle: flowSubtitle, title: flowTitle, messages: flowMessages, addMessage, clearMessages } = useFlow_default();
	useThunderID_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	const handleError = useCallback((error) => {
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
	const [isLoading, setIsLoading] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const initializationAttemptedRef = useRef(false);
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
	const { values: formValues, touched: touchedFields, errors: formErrors, isValid: isFormValid, setValue: setFormValue, setTouched: setFormTouched, validateForm, touchAllFields, reset: resetForm } = useForm({
		fields: currentFlow?.data?.components ? extractFormFields(currentFlow.data.components) : [],
		initialValues: {},
		requiredMessage: t("validations.required.field.error"),
		validateOnBlur: true,
		validateOnChange: true
	});
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
	const handleInputChange = useCallback((name, value) => {
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
			if (response.flowStatus === EmbeddedFlowStatus.Complete) {
				onComplete?.(response);
				return;
			}
			if (response.flowStatus === EmbeddedFlowStatus.Incomplete) {
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
	if (children) return /* @__PURE__ */ jsx("div", {
		className: containerClasses,
		children
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
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: t("errors.heading") }), /* @__PURE__ */ jsx(Alert_default.Description, { children: t("errors.recovery.flow.initialization.failure") })]
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
				children: flowTitle || t("recovery.heading")
			}), showSubtitle && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles.subtitle,
				children: flowSubtitle || t("recovery.subheading")
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
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseSignUp_styles_default(theme, colorScheme);
	return /* @__PURE__ */ jsxs("div", { children: [showLogo && /* @__PURE__ */ jsx("div", {
		className: styles.logoContainer,
		children: /* @__PURE__ */ jsx(Logo_default, { size: "large" })
	}), /* @__PURE__ */ jsx(FlowProvider_default, { children: /* @__PURE__ */ jsx(BaseRecoveryContent, {
		showLogo,
		...rest
	}) })] });
};
var BaseRecovery_default = BaseRecovery;

//#endregion
export { BaseRecovery_default as default };
//# sourceMappingURL=BaseRecovery.js.map