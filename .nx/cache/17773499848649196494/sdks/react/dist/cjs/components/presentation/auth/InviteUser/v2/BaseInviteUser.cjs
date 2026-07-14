const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_ComponentRendererContext = require('../../../../../contexts/ComponentRenderer/ComponentRendererContext.cjs');
const require_useThunderID = require('../../../../../contexts/ThunderID/useThunderID.cjs');
const require_useTheme = require('../../../../../contexts/Theme/useTheme.cjs');
const require_useTranslation = require('../../../../../hooks/useTranslation.cjs');
const require_Spinner = require('../../../../primitives/Spinner/Spinner.cjs');
const require_Typography = require('../../../../primitives/Typography/Typography.cjs');
const require_Alert = require('../../../../primitives/Alert/Alert.cjs');
const require_Card = require('../../../../primitives/Card/Card.cjs');
const require_flowTransformer = require('../../../../../utils/v2/flowTransformer.cjs');
const require_AuthOptionFactory = require('../../AuthOptionFactory.cjs');
const require_BaseInviteUser_styles = require('./BaseInviteUser.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

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
	const { meta, isInitialized: isSdkInitialized, getStorageManager } = require_useThunderID.default();
	const { t } = require_useTranslation.default(preferences?.i18n);
	const { theme } = require_useTheme.default();
	const customRenderers = (0, react.useContext)(require_ComponentRendererContext.default);
	const styles = require_BaseInviteUser_styles.default(theme, theme.vars.colors.text.primary);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const [isFlowInitialized, setIsFlowInitialized] = (0, react.useState)(false);
	const [currentFlow, setCurrentFlow] = (0, react.useState)(null);
	const [apiError, setApiError] = (0, react.useState)(null);
	const [formValues, setFormValues] = (0, react.useState)({});
	const [formErrors, setFormErrors] = (0, react.useState)({});
	const [touchedFields, setTouchedFields] = (0, react.useState)({});
	const [isFormValid, setIsFormValid] = (0, react.useState)(true);
	const challengeTokenRef = (0, react.useRef)(null);
	/**
	* Project server-side validation errors from the most recent flow response into the
	* local formErrors state so they render alongside client-side errors. First error
	* per field wins, matching the SDK's single-string-per-field render-prop shape.
	*/
	(0, react.useEffect)(() => {
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
	const initializationAttemptedRef = (0, react.useRef)(false);
	/**
	* Restore any challenge token persisted before an OAuth redirect.
	*/
	(0, react.useEffect)(() => {
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
			__thunderid_browser.logger.warn("Failed to persist challenge token in storage.");
		}
	};
	/**
	* Handle error responses and extract meaningful error messages.
	* Uses the transformer's extractErrorMessage function for consistency.
	*/
	const handleError = (0, react.useCallback)((error) => {
		const errorMessage = require_flowTransformer.extractErrorMessage(error, t, "components.inviteUser.errors.generic");
		setApiError(error instanceof Error ? error : new Error(errorMessage));
		onError?.(error instanceof Error ? error : new Error(errorMessage));
	}, [t, onError]);
	/**
	* Normalize flow response to ensure component-driven format.
	* Transforms data.meta.components to data.components.
	*/
	const normalizeFlowResponseLocal = (0, react.useCallback)((response) => {
		if (!response?.data?.meta?.components) return response;
		try {
			const { components: components$1 } = require_flowTransformer.normalizeFlowResponse(response, t, {
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
	const handleInputChange = (0, react.useCallback)((name, value) => {
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
	const handleInputBlur = (0, react.useCallback)((name) => {
		setTouchedFields((prev) => ({
			...prev,
			[name]: true
		}));
	}, []);
	/**
	* Validate required fields based on components.
	*/
	const validateForm = (0, react.useCallback)((components$1) => {
		const errors = {};
		const validateComponents = (comps) => {
			comps.forEach((comp) => {
				if ((comp.type === "TEXT_INPUT" || comp.type === "EMAIL_INPUT" || comp.type === "SELECT" || comp.type === "PHONE_INPUT" || comp.type === "OTP_INPUT" || comp.type === "DATE_INPUT") && comp.ref) {
					const value = formValues[comp.ref];
					if (comp.required && (!value || value.trim() === "")) errors[comp.ref] = `${comp.label || comp.ref} is required`;
					else {
						if (comp.type === "EMAIL_INPUT" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[comp.ref] = "Please enter a valid email address";
						if (value && !errors[comp.ref]) {
							const ruleValidator = (0, __thunderid_browser.buildValidatorFromRules)(comp.validation);
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
	const handleSubmit = (0, react.useCallback)(async (component, data) => {
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
	const resetFlow = (0, react.useCallback)(() => {
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
	(0, react.useEffect)(() => {
		if (isInitialized && !isFlowInitialized && !initializationAttemptedRef.current) {
			initializationAttemptedRef.current = true;
			(async () => {
				setIsLoading(true);
				setApiError(null);
				try {
					const response = normalizeFlowResponseLocal(await onInitialize({
						flowType: __thunderid_browser.EmbeddedFlowType.UserOnboarding,
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
	(0, react.useEffect)(() => {
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
	const extractHeadings = (0, react.useCallback)((components$1) => {
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
	const filterHeadings = (0, react.useCallback)((components$1) => components$1.filter((comp) => !(comp.type === "TEXT" && (comp.variant === "HEADING_1" || comp.variant === "HEADING_2"))), []);
	/**
	* Render form components using the factory.
	*/
	const renderComponents = (0, react.useCallback)((components$1) => require_AuthOptionFactory.renderInviteUserComponents(components$1, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
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
	if (children) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className,
		children: children(renderProps)
	});
	if (!isInitialized) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default, {
		className: (0, __emotion_css.cx)(className, styles.card),
		variant,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Content, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "2rem"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Spinner.default, { size: "medium" })
		}) })
	});
	if (!isFlowInitialized && isLoading) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default, {
		className: (0, __emotion_css.cx)(className, styles.card),
		variant,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Content, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "2rem"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Spinner.default, { size: "medium" })
		}) })
	});
	if (!currentFlow && apiError) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default, {
		className: (0, __emotion_css.cx)(className, styles.card),
		variant,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Content, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Alert.default, {
			variant: "error",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Title, { children: "Error" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: apiError.message })]
		}) })
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default, {
		className: (0, __emotion_css.cx)(className, styles.card),
		variant,
		children: [(showTitle || showSubtitle) && (title || subtitle) && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default.Header, {
			className: styles.header,
			children: [showTitle && title && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Title, {
				level: 2,
				className: styles.title,
				children: title
			}), showSubtitle && subtitle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body1",
				className: styles.subtitle,
				children: subtitle
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default.Content, { children: [apiError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: { marginBottom: "1rem" },
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default, {
				variant: "error",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: apiError.message })
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [componentsWithoutHeadings && componentsWithoutHeadings.length > 0 ? renderComponents(componentsWithoutHeadings) : !isLoading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default, {
			variant: "warning",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body1",
				children: "No form components available"
			})
		}), isLoading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				padding: "1rem"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Spinner.default, { size: "small" })
		})] })] })]
	});
};
var BaseInviteUser_default = BaseInviteUser;

//#endregion
exports.default = BaseInviteUser_default;
//# sourceMappingURL=BaseInviteUser.cjs.map