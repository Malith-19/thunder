const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_ComponentRendererContext = require('../../../../../contexts/ComponentRenderer/ComponentRendererContext.cjs');
const require_useThunderID = require('../../../../../contexts/ThunderID/useThunderID.cjs');
const require_useTheme = require('../../../../../contexts/Theme/useTheme.cjs');
const require_useTranslation = require('../../../../../hooks/useTranslation.cjs');
const require_Spinner = require('../../../../primitives/Spinner/Spinner.cjs');
const require_Button = require('../../../../primitives/Button/Button.cjs');
const require_Typography = require('../../../../primitives/Typography/Typography.cjs');
const require_Alert = require('../../../../primitives/Alert/Alert.cjs');
const require_Card = require('../../../../primitives/Card/Card.cjs');
const require_flowTransformer = require('../../../../../utils/v2/flowTransformer.cjs');
const require_AuthOptionFactory = require('../../AuthOptionFactory.cjs');
const require_useOAuthCallback = require('../../../../../hooks/v2/useOAuthCallback.cjs');
const require_oauth = require('../../../../../utils/oauth.cjs');
const require_BaseAcceptInvite_styles = require('./BaseAcceptInvite.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/auth/AcceptInvite/v2/BaseAcceptInvite.tsx
/**
* Base component for accept invite flow (end-user).
* Handles the flow logic for validating an invite token and setting a password.
*
* When no children are provided, renders a default UI with:
* - Loading spinner during token validation
* - Error alerts for invalid/expired tokens
* - Password form with validation
* - Success state with sign-in redirect
*
* Flow steps handled:
* 1. Validate invite token (automatic on mount)
* 2. Password input
* 3. Flow completion
*/
const BaseAcceptInvite = ({ executionId, inviteToken, onSubmit, onComplete, onError, onFlowChange, onGoToSignIn, className = "", children, preferences, size = "medium", variant = "outlined", showTitle = true, showSubtitle = true }) => {
	const { meta, isInitialized, getStorageManager } = require_useThunderID.default();
	const { t } = require_useTranslation.default(preferences?.i18n);
	const { theme } = require_useTheme.default();
	const customRenderers = (0, react.useContext)(require_ComponentRendererContext.default);
	const styles = require_BaseAcceptInvite_styles.default(theme, theme.vars.colors.text.primary);
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const [isValidatingToken, setIsValidatingToken] = (0, react.useState)(true);
	const [isTokenInvalid, setIsTokenInvalid] = (0, react.useState)(false);
	const [isComplete, setIsComplete] = (0, react.useState)(false);
	const [currentFlow, setCurrentFlow] = (0, react.useState)(null);
	const [apiError, setApiError] = (0, react.useState)(null);
	const [formValues, setFormValues] = (0, react.useState)({});
	const [formErrors, setFormErrors] = (0, react.useState)({});
	const [touchedFields, setTouchedFields] = (0, react.useState)({});
	const [isFormValid, setIsFormValid] = (0, react.useState)(true);
	const [isStorageReady, setIsStorageReady] = (0, react.useState)(false);
	const challengeTokenRef = (0, react.useRef)(null);
	/**
	* Project server-side validation errors from the most recent flow response into
	* the local formErrors state. First error per field wins; affected fields are
	* marked touched so errors render immediately.
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
	const tokenValidationAttemptedRef = (0, react.useRef)(false);
	/**
	* Restore any challenge token persisted before an OAuth redirect.
	* Waits for SDK initialization before reading from storage.
	*/
	(0, react.useEffect)(() => {
		if (!isInitialized) return;
		(async () => {
			try {
				const tempData = await (await getStorageManager())?.getTemporaryData();
				if (tempData?.challengeToken) challengeTokenRef.current = tempData.challengeToken;
			} finally {
				setIsStorageReady(true);
			}
		})();
	}, [isInitialized]);
	/**
	* Updates challengeTokenRef immediately (stale-closure safe) and persists via
	* the provider's StorageManager so the token survives OAuth redirects.
	*/
	const setChallengeToken = async (challengeToken) => {
		challengeTokenRef.current = challengeToken;
		const storageManager = await getStorageManager();
		if (storageManager) if (challengeToken) await storageManager.setTemporaryDataParameter("challengeToken", challengeToken);
		else await storageManager.removeTemporaryDataParameter("challengeToken");
	};
	/**
	* Handle error responses and extract meaningful error messages.
	* Uses the transformer's extractErrorMessage function for consistency.
	*/
	const handleError = (0, react.useCallback)((error) => {
		const errorMessage = require_flowTransformer.extractErrorMessage(error, t, "components.acceptInvite.errors.generic");
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
				defaultErrorKey: "components.acceptInvite.errors.generic",
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
	* Handle OAuth callback when returning from OAuth provider.
	* This hook processes the authorization code and continues the flow.
	*/
	require_useOAuthCallback.useOAuthCallback({
		currentExecutionId: executionId ?? null,
		isInitialized: isStorageReady,
		onComplete: () => {
			setIsValidatingToken(false);
			onComplete?.();
		},
		onError: (error) => {
			if (!error?.flowStatus) setIsTokenInvalid(true);
			setIsValidatingToken(false);
			handleError(error);
		},
		onFlowChange: (response) => {
			onFlowChange?.(response);
			if (response.flowStatus === "COMPLETE") {
				setIsComplete(true);
				if ((response.data?.components || response.data?.meta?.components || []).length > 0) setCurrentFlow(response);
			} else {
				setCurrentFlow(response);
				setFormValues({});
				setFormErrors({});
				setTouchedFields({});
			}
		},
		onProcessingStart: () => {
			setIsValidatingToken(true);
		},
		onSubmit: async (payload) => {
			const response = normalizeFlowResponseLocal(await onSubmit({
				...payload,
				...challengeTokenRef.current ? { challengeToken: challengeTokenRef.current } : {}
			}));
			await setChallengeToken(response.challengeToken ?? null);
			return response;
		},
		tokenValidationAttemptedRef
	});
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
		setIsFormValid(true);
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
				if ((comp.type === "PASSWORD_INPUT" || comp.type === "TEXT_INPUT" || comp.type === "EMAIL_INPUT" || comp.type === "PHONE_INPUT" || comp.type === "OTP_INPUT" || comp.type === "DATE_INPUT") && comp.ref) {
					const value = formValues[comp.ref];
					if (comp.required && (!value || value.trim() === "")) errors[comp.ref] = t("validations.required.field.error");
					else if (value) {
						const ruleValidator = (0, __thunderid_browser.buildValidatorFromRules)(comp.validation);
						if (ruleValidator) {
							const message = ruleValidator(value);
							if (message) errors[comp.ref] = t(message);
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
	}, [formValues, t]);
	/**
	* Handle form submission.
	*/
	const handleSubmit = (0, react.useCallback)(async (component, data) => {
		if (!currentFlow) return;
		const validation = validateForm(currentFlow.data?.components || []);
		if (!validation.isValid) {
			setIsFormValid(false);
			setFormErrors(validation.errors);
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
		try {
			const inputs = { ...data || formValues };
			const currentAdditionalData = currentFlow?.data?.additionalData ?? {};
			if (currentAdditionalData["consentPrompt"]) try {
				const raw = currentAdditionalData["consentPrompt"];
				const purposes = typeof raw === "string" ? JSON.parse(raw) : raw.purposes || raw;
				const isDeny = component?.variant?.toLowerCase() !== "primary";
				const decisions = { purposes: purposes.map((p) => ({
					approved: !isDeny,
					purposeName: p.purposeName,
					elements: [...(p.essential || []).map((e) => ({
						approved: !isDeny,
						name: e.name
					})), ...(p.optional || []).map((e) => {
						const key = `__consent_opt__${p.purposeId}__${e.name}`;
						return {
							approved: isDeny ? false : inputs[key] !== "false",
							name: e.name
						};
					})]
				})) };
				inputs["consent_decisions"] = JSON.stringify(decisions);
				Object.keys(inputs).forEach((k) => {
					if (k.startsWith("__consent_opt__")) delete inputs[k];
				});
			} catch {}
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
			if (response.type === "REDIRECTION") {
				const redirectURL = response.data?.redirectURL || response?.redirectURL;
				if (redirectURL && typeof window !== "undefined") {
					require_oauth.initiateOAuthRedirect(redirectURL);
					return;
				}
			}
			if (response.flowStatus === "COMPLETE") {
				setIsComplete(true);
				if ((response.data?.components || response.data?.meta?.components || []).length > 0) setCurrentFlow(response);
				else onComplete?.();
				return;
			}
			if (response.flowStatus === "ERROR") {
				handleError(response);
				return;
			}
			setCurrentFlow(response);
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
		onComplete,
		handleError,
		normalizeFlowResponseLocal
	]);
	/**
	* Validate invite token on component mount.
	*/
	(0, react.useEffect)(() => {
		if (tokenValidationAttemptedRef.current) return;
		if (new URLSearchParams(window.location.search).get("code")) return;
		if (!executionId || !inviteToken) {
			setIsValidatingToken(false);
			setIsTokenInvalid(true);
			handleError(/* @__PURE__ */ new Error("Invalid invite link. Missing executionId or inviteToken."));
			return;
		}
		tokenValidationAttemptedRef.current = true;
		(async () => {
			setIsValidatingToken(true);
			setApiError(null);
			try {
				if (executionId) sessionStorage.setItem("thunderid_execution_id", executionId);
				const response = normalizeFlowResponseLocal(await onSubmit({
					executionId,
					inputs: { inviteToken },
					verbose: true
				}));
				onFlowChange?.(response);
				await setChallengeToken(response.challengeToken ?? null);
				if (response.flowStatus === "ERROR") {
					setIsTokenInvalid(true);
					handleError(response);
					return;
				}
				setCurrentFlow(response);
				if (response?.error) handleError(response);
			} catch (err) {
				setIsTokenInvalid(true);
				handleError(err);
			} finally {
				setIsValidatingToken(false);
			}
		})();
	}, [
		executionId,
		inviteToken,
		onSubmit,
		onFlowChange,
		handleError,
		normalizeFlowResponseLocal
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
	const components = currentFlow?.data?.components || currentFlow?.data?.meta?.components || [];
	const { title, subtitle } = extractHeadings(components);
	const componentsWithoutHeadings = filterHeadings(components);
	const renderProps = {
		additionalData: currentFlow?.data?.additionalData ?? {},
		components,
		error: apiError,
		executionId,
		fieldErrors: formErrors,
		goToSignIn: onGoToSignIn,
		handleInputBlur,
		handleInputChange,
		handleSubmit,
		inviteToken,
		isComplete,
		isLoading,
		isTokenInvalid,
		isValid: isFormValid,
		isValidatingToken,
		meta,
		subtitle,
		title,
		touched: touchedFields,
		values: formValues
	};
	if (children) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className,
		children: children(renderProps)
	});
	if (isValidatingToken) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default, {
		className: (0, __emotion_css.cx)(className, styles.card),
		variant,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Content, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			style: {
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
				padding: "2rem"
			},
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Spinner.default, { size: "medium" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body1",
				children: "Validating your invite link..."
			})]
		}) })
	});
	if (isTokenInvalid) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default, {
		className: (0, __emotion_css.cx)(className, styles.card),
		variant,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Header, {
			className: styles.header,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Card.default.Title, {
				level: 2,
				className: styles.title,
				children: "Invalid Invite Link"
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default.Content, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Alert.default, {
			variant: "error",
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Title, { children: "Unable to verify invite" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: apiError?.message || "This invite link is invalid or has expired. Please contact your administrator for a new invite." })]
		}), onGoToSignIn && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				marginTop: "1.5rem"
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
				variant: "outline",
				onClick: onGoToSignIn,
				children: "Go to Sign In"
			})
		})] })]
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
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Card.default.Content, { children: [
			apiError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: { marginBottom: "1rem" },
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default, {
					variant: "error",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default.Description, { children: apiError.message })
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [componentsWithoutHeadings && componentsWithoutHeadings.length > 0 ? require_AuthOptionFactory.renderInviteUserComponents(componentsWithoutHeadings, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
				_customRenderers: customRenderers,
				_theme: theme,
				onInputBlur: handleInputBlur,
				onSubmit: handleSubmit,
				size,
				variant
			}) : !isLoading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Alert.default, {
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
			})] }),
			onGoToSignIn && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				style: {
					marginTop: "1.5rem",
					textAlign: "center"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Typography.default, {
					variant: "body2",
					children: [
						"Already have an account?",
						" ",
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
							variant: "text",
							onClick: onGoToSignIn,
							style: {
								minWidth: "auto",
								padding: 0
							},
							children: "Sign In"
						})
					]
				})
			})
		] })]
	});
};
var BaseAcceptInvite_default = BaseAcceptInvite;

//#endregion
exports.default = BaseAcceptInvite_default;
//# sourceMappingURL=BaseAcceptInvite.cjs.map