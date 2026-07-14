import ComponentRendererContext_default from "../../../../../contexts/ComponentRenderer/ComponentRendererContext.js";
import useThunderID_default from "../../../../../contexts/ThunderID/useThunderID.js";
import useTheme_default from "../../../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../../../hooks/useTranslation.js";
import Spinner_default from "../../../../primitives/Spinner/Spinner.js";
import Button_default from "../../../../primitives/Button/Button.js";
import Typography_default from "../../../../primitives/Typography/Typography.js";
import Alert_default from "../../../../primitives/Alert/Alert.js";
import Card_default from "../../../../primitives/Card/Card.js";
import { extractErrorMessage, normalizeFlowResponse } from "../../../../../utils/v2/flowTransformer.js";
import { renderInviteUserComponents } from "../../AuthOptionFactory.js";
import { useOAuthCallback } from "../../../../../hooks/v2/useOAuthCallback.js";
import { initiateOAuthRedirect } from "../../../../../utils/oauth.js";
import BaseAcceptInvite_styles_default from "./BaseAcceptInvite.styles.js";
import { buildValidatorFromRules } from "@thunderid/browser";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

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
	const { meta, isInitialized, getStorageManager } = useThunderID_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const { theme } = useTheme_default();
	const customRenderers = useContext(ComponentRendererContext_default);
	const styles = BaseAcceptInvite_styles_default(theme, theme.vars.colors.text.primary);
	const [isLoading, setIsLoading] = useState(false);
	const [isValidatingToken, setIsValidatingToken] = useState(true);
	const [isTokenInvalid, setIsTokenInvalid] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [currentFlow, setCurrentFlow] = useState(null);
	const [apiError, setApiError] = useState(null);
	const [formValues, setFormValues] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [touchedFields, setTouchedFields] = useState({});
	const [isFormValid, setIsFormValid] = useState(true);
	const [isStorageReady, setIsStorageReady] = useState(false);
	const challengeTokenRef = useRef(null);
	/**
	* Project server-side validation errors from the most recent flow response into
	* the local formErrors state. First error per field wins; affected fields are
	* marked touched so errors render immediately.
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
	const tokenValidationAttemptedRef = useRef(false);
	/**
	* Restore any challenge token persisted before an OAuth redirect.
	* Waits for SDK initialization before reading from storage.
	*/
	useEffect(() => {
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
	const handleError = useCallback((error) => {
		const errorMessage = extractErrorMessage(error, t, "components.acceptInvite.errors.generic");
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
	useOAuthCallback({
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
		setIsFormValid(true);
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
				if ((comp.type === "PASSWORD_INPUT" || comp.type === "TEXT_INPUT" || comp.type === "EMAIL_INPUT" || comp.type === "PHONE_INPUT" || comp.type === "OTP_INPUT" || comp.type === "DATE_INPUT") && comp.ref) {
					const value = formValues[comp.ref];
					if (comp.required && (!value || value.trim() === "")) errors[comp.ref] = t("validations.required.field.error");
					else if (value) {
						const ruleValidator = buildValidatorFromRules(comp.validation);
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
	const handleSubmit = useCallback(async (component, data) => {
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
					initiateOAuthRedirect(redirectURL);
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
	useEffect(() => {
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
	if (children) return /* @__PURE__ */ jsx("div", {
		className,
		children: children(renderProps)
	});
	if (isValidatingToken) return /* @__PURE__ */ jsx(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: /* @__PURE__ */ jsx(Card_default.Content, { children: /* @__PURE__ */ jsxs("div", {
			style: {
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
				padding: "2rem"
			},
			children: [/* @__PURE__ */ jsx(Spinner_default, { size: "medium" }), /* @__PURE__ */ jsx(Typography_default, {
				variant: "body1",
				children: "Validating your invite link..."
			})]
		}) })
	});
	if (isTokenInvalid) return /* @__PURE__ */ jsxs(Card_default, {
		className: cx(className, styles.card),
		variant,
		children: [/* @__PURE__ */ jsx(Card_default.Header, {
			className: styles.header,
			children: /* @__PURE__ */ jsx(Card_default.Title, {
				level: 2,
				className: styles.title,
				children: "Invalid Invite Link"
			})
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [/* @__PURE__ */ jsxs(Alert_default, {
			variant: "error",
			children: [/* @__PURE__ */ jsx(Alert_default.Title, { children: "Unable to verify invite" }), /* @__PURE__ */ jsx(Alert_default.Description, { children: apiError?.message || "This invite link is invalid or has expired. Please contact your administrator for a new invite." })]
		}), onGoToSignIn && /* @__PURE__ */ jsx("div", {
			style: {
				display: "flex",
				justifyContent: "center",
				marginTop: "1.5rem"
			},
			children: /* @__PURE__ */ jsx(Button_default, {
				variant: "outline",
				onClick: onGoToSignIn,
				children: "Go to Sign In"
			})
		})] })]
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
		}), /* @__PURE__ */ jsxs(Card_default.Content, { children: [
			apiError && /* @__PURE__ */ jsx("div", {
				style: { marginBottom: "1rem" },
				children: /* @__PURE__ */ jsx(Alert_default, {
					variant: "error",
					children: /* @__PURE__ */ jsx(Alert_default.Description, { children: apiError.message })
				})
			}),
			/* @__PURE__ */ jsxs("div", { children: [componentsWithoutHeadings && componentsWithoutHeadings.length > 0 ? renderInviteUserComponents(componentsWithoutHeadings, formValues, touchedFields, formErrors, isLoading, isFormValid, handleInputChange, {
				_customRenderers: customRenderers,
				_theme: theme,
				onInputBlur: handleInputBlur,
				onSubmit: handleSubmit,
				size,
				variant
			}) : !isLoading && /* @__PURE__ */ jsx(Alert_default, {
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
			})] }),
			onGoToSignIn && /* @__PURE__ */ jsx("div", {
				style: {
					marginTop: "1.5rem",
					textAlign: "center"
				},
				children: /* @__PURE__ */ jsxs(Typography_default, {
					variant: "body2",
					children: [
						"Already have an account?",
						" ",
						/* @__PURE__ */ jsx(Button_default, {
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
export { BaseAcceptInvite_default as default };
//# sourceMappingURL=BaseAcceptInvite.js.map