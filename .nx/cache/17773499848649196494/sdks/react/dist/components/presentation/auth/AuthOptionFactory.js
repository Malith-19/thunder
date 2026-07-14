import Button_default from "../../primitives/Button/Button.js";
import Typography_default from "../../primitives/Typography/Typography.js";
import DatePicker_default from "../../primitives/DatePicker/DatePicker.js";
import Select_default from "../../primitives/Select/Select.js";
import { createField } from "../../factories/FieldFactory.js";
import FacebookButton_default from "../../adapters/FacebookButton.js";
import GitHubButton_default from "../../adapters/GitHubButton.js";
import GoogleButton_default from "../../adapters/GoogleButton.js";
import LinkedInButton_default from "../../adapters/LinkedInButton.js";
import MicrosoftButton_default from "../../adapters/MicrosoftButton.js";
import SignInWithEthereumButton_default from "../../adapters/SignInWithEthereumButton.js";
import Divider_default from "../../primitives/Divider/Divider.js";
import OrganizationUnitPicker_default from "./OrganizationUnitPicker/v2/OrganizationUnitPicker.js";
import { getConsentOptionalKey } from "../../adapters/ConsentCheckboxList.js";
import Consent_default from "../../adapters/Consent.js";
import FlowTimer_default from "../../adapters/FlowTimer.js";
import ImageComponent_default from "../../adapters/ImageComponent.js";
import SmsOtpButton_default from "../../adapters/SmsOtpButton.js";
import CopyableText_default from "../../primitives/CopyableText/CopyableText.js";
import flowIconRegistry_default from "../../primitives/Icons/flowIconRegistry.js";
import { EmbeddedFlowComponentTypeV2, EmbeddedFlowEventTypeV2, FieldType, createPackageComponentLogger, resolveEmojiUrisInHtml, resolveFlowTemplateLiterals } from "@thunderid/browser";
import { cloneElement } from "react";
import { jsx } from "react/jsx-runtime";
import { css } from "@emotion/css";
import DOMPurify from "dompurify";

//#region src/components/presentation/auth/AuthOptionFactory.tsx
const logger$1 = createPackageComponentLogger("@thunderid/react", "AuthOptionFactory");
/**
* Replaces `emoji:` URIs embedded in HTML before DOMPurify sanitization.
*
* DOMPurify strips unknown URI schemes from attributes (e.g. `src="emoji:🦊"` → `src=""`).
* This function converts:
*   - `<img src="emoji:X" alt="Y">` → `<span role="img" aria-label="Y">X</span>`
*   - Any remaining `emoji:X` text occurrences → `X`
*/
/** Ensures rich-text content (including all inner elements from the server) always word-wraps. */
const richTextClass = css`
  overflow-wrap: anywhere;
  & * {
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  & .rich-text-align-left {
    text-align: left;
  }
  & .rich-text-align-center {
    text-align: center;
  }
  & .rich-text-align-right {
    text-align: right;
  }
  & .rich-text-align-justify {
    text-align: justify;
  }
  & a,
  & .rich-text-link {
    text-decoration: underline;
  }
  & span[role='img'] {
    display: inline-block;
  }
`;
/**
* Get the appropriate FieldType for an input component.
*/
const getFieldType = (variant) => {
	switch (variant) {
		case EmbeddedFlowComponentTypeV2.EmailInput: return FieldType.Email;
		case EmbeddedFlowComponentTypeV2.PhoneInput: return FieldType.Tel;
		case EmbeddedFlowComponentTypeV2.PasswordInput: return FieldType.Password;
		case EmbeddedFlowComponentTypeV2.TextInput:
		default: return FieldType.Text;
	}
};
/**
* Get typography variant from component variant.
*/
const getTypographyVariant = (variant) => {
	return {
		BODY_1: "body1",
		BODY_2: "body2",
		BUTTON_TEXT: "button",
		CAPTION: "caption",
		HEADING_1: "h1",
		HEADING_2: "h2",
		HEADING_3: "h3",
		HEADING_4: "h4",
		HEADING_5: "h5",
		HEADING_6: "h6",
		OVERLINE: "overline",
		SUBTITLE_1: "subtitle1",
		SUBTITLE_2: "subtitle2"
	}[variant] || "h3";
};
/**
* Check if a button text or action matches a social provider.
*/
const matchesSocialProvider = (actionId, eventType, buttonText, provider, authType, _componentVariant) => {
	const providerId = `${provider}_auth`;
	const providerMatches = actionId === providerId || eventType === providerId;
	if (buttonText.toLowerCase().includes(provider)) return true;
	if (authType === "signup") return providerMatches || buttonText.toLowerCase().includes(provider);
	return providerMatches;
};
/**
* Create an auth component from flow component configuration.
*/
const createAuthComponentFromFlow = (component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, authType, options = {}) => {
	const theme = options._theme;
	const customRenderers = options._customRenderers ?? {};
	const key = options.key || component.id;
	const customRenderer = customRenderers[component.id] ?? customRenderers[component.type];
	if (customRenderer) return customRenderer(component, {
		additionalData: options.additionalData,
		authType,
		formErrors,
		formValues,
		isFormValid,
		isLoading,
		meta: options.meta,
		onInputBlur: options.onInputBlur,
		onInputChange,
		onSubmit: options.onSubmit,
		touchedFields
	});
	/** Resolve any remaining {{t()}} or {{meta()}} template expressions in a string at render time. */
	const resolve = (text) => {
		if (!text || !options.t && !options.meta) return text || "";
		return resolveFlowTemplateLiterals(text, {
			meta: options.meta,
			t: options.t || ((k) => k)
		});
	};
	switch (component.type) {
		case EmbeddedFlowComponentTypeV2.TextInput:
		case EmbeddedFlowComponentTypeV2.PasswordInput:
		case EmbeddedFlowComponentTypeV2.EmailInput:
		case EmbeddedFlowComponentTypeV2.PhoneInput: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			const fieldType = getFieldType(component.type);
			return cloneElement(createField({
				className: options.inputClassName,
				error,
				label: resolve(component.label) || "",
				name: identifier,
				onBlur: () => options.onInputBlur?.(identifier),
				onChange: (newValue) => onInputChange(identifier, newValue),
				placeholder: resolve(component.placeholder) || "",
				required: component.required || false,
				type: fieldType,
				value
			}), { key });
		}
		case EmbeddedFlowComponentTypeV2.OtpInput: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			return cloneElement(createField({
				className: options.inputClassName,
				error,
				label: resolve(component.label) || "",
				name: identifier,
				onBlur: () => options.onInputBlur?.(identifier),
				onChange: (newValue) => onInputChange(identifier, newValue),
				placeholder: resolve(component.placeholder) || "",
				required: component.required || false,
				type: FieldType.Otp,
				value
			}), { key });
		}
		case EmbeddedFlowComponentTypeV2.Action: {
			const actionId = component.id;
			const eventType = component.eventType || "";
			const buttonText = resolve(component.label);
			const componentVariant = component.variant || "";
			const shouldSkipValidation = eventType.toUpperCase() === EmbeddedFlowEventTypeV2.Trigger;
			const handleClick = () => {
				if (options.onSubmit) {
					const formData = {};
					Object.keys(formValues).forEach((field) => {
						formData[field] = formValues[field];
					});
					const consentPrompt = options.additionalData?.["consentPrompt"];
					if (consentPrompt && eventType.toUpperCase() === EmbeddedFlowEventTypeV2.Submit) {
						const isDeny = componentVariant.toLowerCase() !== "primary";
						const decisions = { purposes: consentPrompt.purposes.map((p) => ({
							approved: !isDeny,
							elements: [...p.essential.map((e) => ({
								approved: !isDeny,
								name: e.name
							})), ...p.optional.map((e) => ({
								approved: isDeny ? false : formValues[getConsentOptionalKey(p.purposeId, e.name)] !== "false",
								name: e.name
							}))],
							purposeName: p.purposeName
						})) };
						formData["consent_decisions"] = JSON.stringify(decisions);
					}
					options.onSubmit(component, formData, shouldSkipValidation);
				}
			};
			if (matchesSocialProvider(actionId, eventType, buttonText, "google", authType, componentVariant)) return /* @__PURE__ */ jsx(GoogleButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "github", authType, componentVariant)) return /* @__PURE__ */ jsx(GitHubButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "facebook", authType, componentVariant)) return /* @__PURE__ */ jsx(FacebookButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "microsoft", authType, componentVariant)) return /* @__PURE__ */ jsx(MicrosoftButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "linkedin", authType, componentVariant)) return /* @__PURE__ */ jsx(LinkedInButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "ethereum", authType, componentVariant)) return /* @__PURE__ */ jsx(SignInWithEthereumButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (actionId === "prompt_mobile" || eventType === "prompt_mobile") return /* @__PURE__ */ jsx(SmsOtpButton_default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			const startIconEl = component.startIcon ? /* @__PURE__ */ jsx("img", {
				src: component.startIcon,
				alt: "",
				"aria-hidden": "true",
				style: {
					height: "1.25em",
					objectFit: "contain",
					width: "1.25em"
				}
			}) : null;
			const endIconEl = component.endIcon ? /* @__PURE__ */ jsx("img", {
				src: component.endIcon,
				alt: "",
				"aria-hidden": "true",
				style: {
					height: "1.25em",
					objectFit: "contain",
					width: "1.25em"
				}
			}) : null;
			return /* @__PURE__ */ jsx(Button_default, {
				fullWidth: true,
				onClick: handleClick,
				disabled: isLoading || !isFormValid && !shouldSkipValidation || options.isTimeoutDisabled || component.config?.disabled,
				className: options.buttonClassName,
				"data-testid": "thunderid-signin-submit",
				variant: component.variant?.toLowerCase() === "primary" ? "solid" : "outline",
				color: component.variant?.toLowerCase() === "primary" ? "primary" : "secondary",
				startIcon: startIconEl,
				endIcon: endIconEl,
				children: buttonText || "Submit"
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Text: return /* @__PURE__ */ jsx(Typography_default, {
			variant: getTypographyVariant(component.variant),
			style: {
				marginBottom: 2,
				textAlign: typeof component?.align === "string" ? component.align : "left"
			},
			children: resolve(component.label)
		}, key);
		case EmbeddedFlowComponentTypeV2.Divider: return /* @__PURE__ */ jsx(Divider_default, { children: resolve(component.label) || "" }, key);
		case EmbeddedFlowComponentTypeV2.Select: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			const selectOptions = (component.options || []).map((opt) => ({
				label: typeof opt === "string" ? opt : String(opt.label ?? opt.value ?? ""),
				value: typeof opt === "string" ? opt : String(opt.value ?? "")
			}));
			return /* @__PURE__ */ jsx(Select_default, {
				name: identifier,
				label: resolve(component.label) || "",
				placeholder: resolve(component.placeholder),
				required: component.required,
				options: selectOptions,
				value,
				error,
				onChange: (e) => onInputChange(identifier, e.target.value),
				onBlur: () => options.onInputBlur?.(identifier),
				className: options.inputClassName
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.DateInput: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			return /* @__PURE__ */ jsx(DatePicker_default, {
				name: identifier,
				label: resolve(component.label) || "",
				placeholder: resolve(component.placeholder),
				required: component.required,
				dateFormat: component.dateFormat,
				value,
				error,
				onChange: (e) => onInputChange(identifier, e.target.value),
				onBlur: () => options.onInputBlur?.(identifier),
				className: options.inputClassName
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.OuSelect: {
			const identifier = component.ref ?? component.id;
			const rootOuId = options.additionalData?.["rootOuId"];
			if (!rootOuId || !options.fetchOrganizationUnitChildren) {
				logger$1.warn("OU_SELECT requires additionalData.rootOuId and fetchOrganizationUnitChildren. Skipping render.");
				return null;
			}
			return /* @__PURE__ */ jsx(OrganizationUnitPicker_default, {
				rootOuId,
				selectedOuId: formValues[identifier] || null,
				onSelect: (ouId) => onInputChange(identifier, ouId),
				fetchChildren: options.fetchOrganizationUnitChildren
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Block:
			if (component.components && component.components.length > 0) {
				const formStyles = {
					display: "flex",
					flexDirection: "column",
					gap: `calc(${theme?.vars?.spacing?.unit ?? "4px"} * 2)`
				};
				const blockComponents = component.components.map((childComponent, index) => createAuthComponentFromFlow(childComponent, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, authType, {
					...options,
					key: childComponent.id || `${component.id}_${index}`
				})).filter(Boolean);
				return /* @__PURE__ */ jsx("form", {
					id: component.id,
					style: formStyles,
					children: blockComponents
				}, key);
			}
			return null;
		case EmbeddedFlowComponentTypeV2.RichText: return /* @__PURE__ */ jsx("div", {
			className: richTextClass,
			dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(resolveEmojiUrisInHtml(resolve(component.label))) }
		}, key);
		case EmbeddedFlowComponentTypeV2.Image: {
			const explicitHeight = resolve(component.height?.toString());
			const explicitWidth = resolve(component.width?.toString());
			return /* @__PURE__ */ jsx(ImageComponent_default, {
				component: { config: {
					alt: resolve(component.alt) || resolve(component.label) || "Image",
					height: explicitHeight || (options.inStack ? "50" : "auto"),
					src: resolve(component.src),
					width: explicitWidth || (options.inStack ? "50" : "100%")
				} },
				formErrors: void 0,
				formValues: void 0,
				isFormValid: false,
				isLoading: false,
				onInputChange: () => {
					throw new Error("Function not implemented.");
				},
				touchedFields: void 0
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Icon: {
			const iconName = component.name || "";
			const IconComponent = flowIconRegistry_default[iconName];
			if (!IconComponent) {
				logger$1.warn(`Unknown icon name: "${iconName}". Skipping render.`);
				return null;
			}
			return /* @__PURE__ */ jsx(IconComponent, {
				size: component.size || 24,
				color: component.color || "currentColor"
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Stack: {
			const direction = component.direction || "row";
			const gap = component.gap ?? 2;
			const align = component.align || "center";
			const justify = component.justify || "flex-start";
			return /* @__PURE__ */ jsx("div", {
				style: {
					alignItems: align,
					display: "flex",
					flexDirection: direction,
					flexWrap: "wrap",
					gap: `${gap * .5}rem`,
					justifyContent: justify
				},
				children: component.components ? component.components.map((childComponent, index) => createAuthComponentFromFlow(childComponent, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, authType, {
					...options,
					inStack: true,
					key: childComponent.id || `${component.id}_${index}`
				})) : []
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Consent: {
			const consentPromptRawData = options.additionalData?.["consentPrompt"];
			return /* @__PURE__ */ jsx(Consent_default, {
				consentData: consentPromptRawData,
				formValues,
				onInputChange
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.Timer: {
			const textTemplate = resolve(component.label) || "Time remaining: {time}";
			const timeoutMs = Number(options.additionalData?.["stepTimeout"]) || 0;
			return /* @__PURE__ */ jsx(FlowTimer_default, {
				expiresIn: timeoutMs > 0 ? Math.max(0, Math.floor((timeoutMs - Date.now()) / 1e3)) : 0,
				textTemplate
			}, key);
		}
		case EmbeddedFlowComponentTypeV2.CopyableText: {
			const sourceKey = component.source;
			const value = sourceKey && options.additionalData ? String(options.additionalData[sourceKey] ?? "") : "";
			return /* @__PURE__ */ jsx(CopyableText_default, {
				label: resolve(component.label) || void 0,
				value
			}, key);
		}
		default:
			logger$1.warn(`Unsupported component type: ${component.type}. Skipping render.`);
			return null;
	}
};
/**
* Processes an array of components and renders them as React elements for sign-in.
*/
const renderSignInComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, "signin", {
	...options,
	key: component.id || index
})).filter((x) => x !== null);
/**
* Processes an array of components and renders them as React elements for sign-up.
*/
const renderSignUpComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, "signup", {
	...options,
	key: component.id || index
})).filter((x) => x !== null);
/**
* Processes an array of components and renders them as React elements for recovery flow.
*/
const renderRecoveryComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, "recovery", {
	...options,
	key: component.id || index
})).filter((x) => x !== null);
/**
* Processes an array of components and renders them as React elements for invite user.
* This is used by both InviteUser and AcceptInvite components.
*/
const renderInviteUserComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createAuthComponentFromFlow(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, "signup", {
	...options,
	key: component.id || index
})).filter((x) => x !== null);

//#endregion
export { renderInviteUserComponents, renderRecoveryComponents, renderSignInComponents, renderSignUpComponents };
//# sourceMappingURL=AuthOptionFactory.js.map