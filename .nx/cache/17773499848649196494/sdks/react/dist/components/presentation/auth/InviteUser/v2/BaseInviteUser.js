import ComponentRendererContext_default from "../../../../../contexts/ComponentRenderer/ComponentRendererContext.js";
import useThunderID_default from "../../../../../contexts/ThunderID/useThunderID.js";
import useTheme_default from "../../../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../../../hooks/useTranslation.js";
import Spinner_default from "../../../../primitives/Spinner/Spinner.js";
import Typography_default from "../../../../primitives/Typography/Typography.js";
import Alert_default from "../../../../primitives/Alert/Alert.js";
import Card_default from "../../../../primitives/Card/Card.js";
import { extractErrorMessage, normalizeFlowResponse } from "../../../../../utils/v2/flowTransformer.js";
import { renderInviteUserComponents } from "../../AuthOptionFactory.js";
import BaseInviteUser_styles_default from "./BaseInviteUser.styles.js";
import { EmbeddedFlowType, buildValidatorFromRules, logger } from "@thunderid/browser";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/auth/InviteUser/v2/BaseInviteUser.tsx
/**
* Base component for invite user flow.
* Handles the flow logic for creating a user and generating an invite link.
*
* When no children are provided, renders a default UI with:
* - Loading spinner during initialization
* - Error alerts for failures
* - Flow components (user type selection, user details form)
* - Invite link display with copy functionality
*
* Flow steps handled:
* 1. User type selection (if multiple types available)
* 2. User details input (username, email)
* 3. Invite link generation
*/
const BaseInviteUser = ({ onInitialize, onSubmit, onError, onFlowChange, className = "", children, fetchOrganizationUnitChildren, isInitialized = true, preferences, size = "medium", variant = "outlined", showTitle = true, showSubtitle = true }) => {
	const { meta, isInitialized: isSdkInitialized, getStorageManager } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { theme } = useTheme_default();
	const customRenderers = useContext(ComponentRendererContext_default);
	const styles = BaseInviteUser_styles_default(theme, theme.vars.colors.text.primary);
	const [isLoading, setIsLoading] = useState(false);
	const [isFlowInitialized, setIsFlowInitialized] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const [apiError, setApiError] = useState(null);
	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [touchedFields, setTouchedFields] = useState({});
	const [isFormValid, setIsFormValid] = useState(true);
	const challengeTokenRef = useRef(null);
	/**
	* Project server-side validation errors from the most recent flow response into the
	* local formErrors state so they render alongside client-side errors. First error
	* per field wins, matching the SDK's single-string-per-field render-prop shape.
	*/
	useEffect(() => {
		const responseFieldErrors = (currentFlow?.data)?.fieldErrors;
		if (!responseFieldErrors || responseFieldErrors.length === 0) return;
		const errors = {};
		const touched = {};
		for (const fe of responseFieldErrors) if (!(fe.identifier in errors)) {
			errors[fe.identifier] = fe.message;
			touched[fe.identifier] = true;
		}
		setFormErrors(errors);
		setTouchedFields((prev) => ({
			...prev,
			...touched
		}));
	}, [currentFlow]);
	const initializationAttemptedRef = useRef(false);
	/**
	* Restore any challenge token persisted before an OAuth redirect.
	*/
	useEffect(() => {
		if (!isSdkInitialized) return;
		(async () => {
			try {
				const tempData = await (await getStorageManager())?.getTemporaryData();
				if (tempData?.challengeToken) challengeTokenRef.current = tempData.challengeToken;
			} catch {}
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
			logger.warn("Failed to persist challenge token in storage.");
		}
	};
	/**
	* Handle error responses and extract meaningful error messages.
	* Uses the transformer's extractErrorMessage function for consistency.
	*/
	const handleError = useCallback((error) => {
		const errorMessage = extractErrorMessage(error, t, "components.inviteUser.errors.generic");
		setApiError(error instanceof Error ? error : new Error(errorMessage));
		onError?.(error instanceof Error ? error : new Error(errorMessage));
	}, [t, onError]);
	/**
	* Normalize flow response to ensure component-driven format.
	* Transforms data.meta.components to data.components.
	*/
	const normalizeFlowResponseLocal = useCallback((response) => {
		if (!response?.data?.meta?.components) return response;
		try {
			const { components: components$1 } = normalizeFlowResponse(response, t, {
				defaultErrorKey: "components.inviteUser.errors.generic",
				resolveTranslations: false
			}, meta);
			return {
				...response,
				data: {
					...response.data,
					components: components$1
				}
			};
		} catch {
			return response;
		}
	}, [t, children]);
	/**
	* Handle input value changes.
	*/
	const handleInputChange = useCallback((name, value) => {
		setFormValues((prev) => ({
			...prev,
			[name]: value
		}));
		setFormErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[name];
			return newErrors;
		});
	}, []);
	/**
	* Handle input blur.
	*/
	const handleInputBlur = useCallback((name) => {
		setTouchedFields((prev) => ({
			...prev,
			[name]: true
		}));
	}, []);
	/**
	* Validate required fields based on components.
	*/
	const validateForm = useCallback((components$1) => {
		const errors = {};
		const validateComponents = (comps) => {
			comps.forEach((comp) => {
				if ((comp.type === "TEXT_INPUT" || comp.type === "EMAIL_INPUT" || comp.type === "SELECT" || comp.type === "PHONE_INPUT" || comp.type === "OTP_INPUT" || comp.type === "DATE_INPUT") && comp.ref) {
					const value = formValues[comp.ref];
					if (comp.required && (!value || value.trim() === "")) errors[comp.ref] = `${comp.label || comp.ref} is required`;
					else {
						if (comp.type === "EMAIL_INPUT" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[comp.ref] = "Please enter a valid email address";
						if (value && !errors[comp.ref]) {
							const ruleValidator = buildValidatorFromRules(comp.validation);
							if (ruleValidator) {
								const message = ruleValidator(value);
								if (message) errors[comp.ref] = t(message);
							}
						}
					}
				}
				if (comp.components && Array.isArray(comp.components)) validateComponents(comp.components);
			});
		};
		validateComponents(components$1);
		return {
			errors,
			isValid: Object.keys(errors).length === 0
		};
	}, [formValues]);
	/**
	* Handle form submission.
	*/
	const handleSubmit = useCallback(async (component, data) => {
		if (!currentFlow) return;
		const validation = validateForm(currentFlow.data?.components || []);
		if (!validation.isValid) {
			setFormErrors(validation.errors);
			setIsFormValid(false);
			const touched = {};
			Object.keys(validation.errors).forEach((key) => {
				touched[key] = true;
			});
			setTouchedFields((prev) => ({
				...prev,
				...touched
			}));
			return;
		}
		setIsLoading(true);
		setApiError(null);
		setIsFormValid(true);
		try {
			const inputs = data || formValues;
			const payload = {
				executionId: currentFlow.executionId,
				inputs,
				verbose: true,
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
			};
			if (component?.id) payload["action"] = component.id;
			const response = normalizeFlowResponseLocal(await onSubmit(payload));
			onFlowChange?.(response);
			await setChallengeToken(response.challengeToken ?? null);
			if (response.flowStatus === "ERROR") {
				handleError(response);
				return;
			}
			setCurrentFlow(response);
			setFormValues({});
			setFormErrors({});
			setTouchedFields({});
			if (response?.error) handleError(response);
		} catch (err) {
			handleError(err);
		} finally {
			setIsLoading(false);
		}
	}, [
		currentFlow,
		formValues,
		validateForm,
		onSubmit,
		onFlowChange,
		handleError,
		normalizeFlowResponseLocal
	]);
	/**
	* Reset the flow to invite another user.
	*/
	const resetFlow = useCallback(() => {
		setIsFlowInitialized(false);
		setCurrentFlow(null);
		setApiError(null);
		setFormValues({});
		setFormErrors({});
		setTouchedFields({});
		initializationAttemptedRef.current = false;
	}, []);
	/**
	* Initialize the flow on component mount.
	*/
	useEffect(() => {
		if (isInitialized && !isFlowInitialized && !initializationAttemptedRef.current) {
			initializationAttemptedRef.current = true;
			(async () => {
				setIsLoading(true);
				setApiError(null);
				try {
					const response = normalizeFlowResponseLocal(await onInitialize({
						flowType: EmbeddedFlowType.UserOnboarding,
						verbose: true
					}));
					await setChallengeToken(response.challengeToken ?? null);
					setCurrentFlow(response);
					setIsFlowInitialized(true);
					onFlowChange?.(response);
					if (response.flowStatus === "ERROR") handleError(response);
				} catch (err) {
					handleError(err);
				} finally {
					setIsLoading(false);
				}
			})();
		}
	}, [
		isInitialized,
		isFlowInitialized,
		onInitialize,
		onFlowChange,
		handleError,
		normalizeFlowResponseLocal
	]);
	/**
	* Recalculate form validity whenever form values or components change.
	* This ensures the submit button is enabled/disabled correctly as the user types.
	*/
	useEffect(() => {
		if (currentFlow && isFlowInitialized) {
			const components$1 = currentFlow.data?.components || [];
			if (components$1.length > 0) setIsFormValid(validateForm(components$1).isValid);
		}
	}, [
		formValues,
		currentFlow,
		isFlowInitialized,
		validateForm
	]);
	/**
	* Extract title and subtitle from components.
	*/
	const extractHeadings = useCallback((components$1) => {
		let title$1;
		let subtitle$1;
		components$1.forEach((comp) => {
			if (comp.type === "TEXT") {
				if (comp.variant === "HEADING_1" && !title$1) title$1 = comp.label;
				else if ((comp.variant === "HEADING_2" || comp.variant === "SUBTITLE_1") && !subtitle$1) subtitle$1 = comp.label;
			}
		});
		return {
			subtitle: subtitle$1,
			title: title$1
		};
	}, []);
	/**
	* Filter out heading components for default rendering.
	*/
	const filterHeadings = useCallback((components$1) => components$1.filter((comp) => !(comp.type === "TEXT" && (comp.variant === "HEADING_1" || comp.variant === "HEADING_2"))), []);
	/**
	* Render form components using the factory.
	*/
	const renderComponents = useCallback((components$1) => renderInviteUserComponents(components$1, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
		_customRenderers: customRenderers,
		_theme: theme,
		additionalData: currentFlow?.data?.additionalData,
		fetchOrganizationUnitChildren,
		onInputBlur: handleInputBlur,
		onSubmit: handleSubmit,
		size,
		variant
	}), [
		customRenderers,
		currentFlow?.data?.additionalData,
		fetchOrganizationUnitChildren,
		formValues,
		touchedFields,
		formErrors,
		isLoading,
		isFormValid,
		handleInputChange,
		handleInputBlur,
		handleSubmit,
		size,
		theme,
		variant
	]);
	const components = currentFlow?.data?.components || currentFlow?.data?.meta?.components || [];
	const { title, subtitle } = extractHeadings(components);
	const componentsWithoutHeadings = filterHeadings(components);
	const renderProps = {
		additionalData: currentFlow?.data?.additionalData,
		components,
		error: apiError,
		executionId: currentFlow?.executionId,
		fieldErrors: formErrors,
		handleInputBlur,
		handleInputChange,
		handleSubmit,
		isLoading,
		isValid: isFormValid,
		meta,
		resetFlow,
		subtitle,
		title,
		touched: touchedFields,
		values: formValues
	};
	if (children) return /* @__PURE__ */ jsx("div", {
		className,
		children: children(renderProps)
	});
	if (!isInitialized) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "2rem"
			},
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "medium" })
		}) })
	});
	if (!isFlowInitialized && isLoading) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "2rem"
			},
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "medium" })
		}) })
	});
	if (!currentFlow && apiError) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: "Error" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: apiError.message })]
		}) })
	});
	return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && (title || subtitle) && /* @__PURE__ */ jsxs(Card_default.Header, {
			className: styles.header,
			children: [showTitle && title && /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: title
			}), showSubtitle && subtitle && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				className: styles.subtitle,
				children: subtitle
			})]
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [apiError && /* @__PURE__ */ jsx("div", {
			style: { marginBottom: "1rem" },
			children: /* @__PURE__ */ jsx(Alert_default, {
				variant: "error",
				children: /* @__PURE__ */ jsx(Alert_default.Description, { children: apiError.message })
			})
		}), /* @__PURE__ */ jsxs("div", { children: [componentsWithoutHeadings && componentsWithoutHeadings.length > 0 ? renderComponents(componentsWithoutHeadings) : !isLoading && /* @__PURE__ */ jsx(Alert_default, {
			variant: "warning",
			children: /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				children: "No form components available"
			})
		}), isLoading && /* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "1rem"
			},
			children: /* @__PURE__ */ jsx(Spinner_default, { size: "small" })
		})] })] })]
	});
};
var BaseInviteUser_default = BaseInviteUser;

//#endregion
export { BaseInviteUser_default as default };
//# sourceMappingURL=BaseInviteUser.js.map