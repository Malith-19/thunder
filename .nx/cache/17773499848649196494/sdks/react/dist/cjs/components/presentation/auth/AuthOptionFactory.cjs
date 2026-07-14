const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_Button = require('../../primitives/Button/Button.cjs');
const require_Typography = require('../../primitives/Typography/Typography.cjs');
const require_DatePicker = require('../../primitives/DatePicker/DatePicker.cjs');
const require_Select = require('../../primitives/Select/Select.cjs');
const require_FieldFactory = require('../../factories/FieldFactory.cjs');
const require_FacebookButton = require('../../adapters/FacebookButton.cjs');
const require_GitHubButton = require('../../adapters/GitHubButton.cjs');
const require_GoogleButton = require('../../adapters/GoogleButton.cjs');
const require_LinkedInButton = require('../../adapters/LinkedInButton.cjs');
const require_MicrosoftButton = require('../../adapters/MicrosoftButton.cjs');
const require_SignInWithEthereumButton = require('../../adapters/SignInWithEthereumButton.cjs');
const require_Divider = require('../../primitives/Divider/Divider.cjs');
const require_OrganizationUnitPicker = require('./OrganizationUnitPicker/v2/OrganizationUnitPicker.cjs');
const require_ConsentCheckboxList = require('../../adapters/ConsentCheckboxList.cjs');
const require_Consent = require('../../adapters/Consent.cjs');
const require_FlowTimer = require('../../adapters/FlowTimer.cjs');
const require_ImageComponent = require('../../adapters/ImageComponent.cjs');
const require_SmsOtpButton = require('../../adapters/SmsOtpButton.cjs');
const require_CopyableText = require('../../primitives/CopyableText/CopyableText.cjs');
const require_flowIconRegistry = require('../../primitives/Icons/flowIconRegistry.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);
let dompurify = require("dompurify");
dompurify = require_rolldown_runtime.__toESM(dompurify);

//#region src/components/presentation/auth/AuthOptionFactory.tsx
const logger = (0, __thunderid_browser.createPackageComponentLogger)("@thunderid/react", "AuthOptionFactory");
/**
* Replaces `emoji:` URIs embedded in HTML before DOMPurify sanitization.
*
* DOMPurify strips unknown URI schemes from attributes (e.g. `src="emoji:🦊"` → `src=""`).
* This function converts:
*   - `<img src="emoji:X" alt="Y">` → `<span role="img" aria-label="Y">X</span>`
*   - Any remaining `emoji:X` text occurrences → `X`
*/
/** Ensures rich-text content (including all inner elements from the server) always word-wraps. */
const richTextClass = __emotion_css.css`
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
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.EmailInput: return __thunderid_browser.FieldType.Email;
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.PhoneInput: return __thunderid_browser.FieldType.Tel;
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.PasswordInput: return __thunderid_browser.FieldType.Password;
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.TextInput:
		default: return __thunderid_browser.FieldType.Text;
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
		return (0, __thunderid_browser.resolveFlowTemplateLiterals)(text, {
			meta: options.meta,
			t: options.t || ((k) => k)
		});
	};
	switch (component.type) {
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.TextInput:
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.PasswordInput:
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.EmailInput:
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.PhoneInput: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			const fieldType = getFieldType(component.type);
			return (0, react.cloneElement)(require_FieldFactory.createField({
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
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.OtpInput: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			return (0, react.cloneElement)(require_FieldFactory.createField({
				className: options.inputClassName,
				error,
				label: resolve(component.label) || "",
				name: identifier,
				onBlur: () => options.onInputBlur?.(identifier),
				onChange: (newValue) => onInputChange(identifier, newValue),
				placeholder: resolve(component.placeholder) || "",
				required: component.required || false,
				type: __thunderid_browser.FieldType.Otp,
				value
			}), { key });
		}
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.Action: {
			const actionId = component.id;
			const eventType = component.eventType || "";
			const buttonText = resolve(component.label);
			const componentVariant = component.variant || "";
			const shouldSkipValidation = eventType.toUpperCase() === __thunderid_browser.EmbeddedFlowEventTypeV2.Trigger;
			const handleClick = () => {
				if (options.onSubmit) {
					const formData = {};
					Object.keys(formValues).forEach((field) => {
						formData[field] = formValues[field];
					});
					const consentPrompt = options.additionalData?.["consentPrompt"];
					if (consentPrompt && eventType.toUpperCase() === __thunderid_browser.EmbeddedFlowEventTypeV2.Submit) {
						const isDeny = componentVariant.toLowerCase() !== "primary";
						const decisions = { purposes: consentPrompt.purposes.map((p) => ({
							approved: !isDeny,
							elements: [...p.essential.map((e) => ({
								approved: !isDeny,
								name: e.name
							})), ...p.optional.map((e) => ({
								approved: isDeny ? false : formValues[require_ConsentCheckboxList.getConsentOptionalKey(p.purposeId, e.name)] !== "false",
								name: e.name
							}))],
							purposeName: p.purposeName
						})) };
						formData["consent_decisions"] = JSON.stringify(decisions);
					}
					options.onSubmit(component, formData, shouldSkipValidation);
				}
			};
			if (matchesSocialProvider(actionId, eventType, buttonText, "google", authType, componentVariant)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_GoogleButton.default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "github", authType, componentVariant)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_GitHubButton.default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "facebook", authType, componentVariant)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FacebookButton.default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "microsoft", authType, componentVariant)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_MicrosoftButton.default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "linkedin", authType, componentVariant)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_LinkedInButton.default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (matchesSocialProvider(actionId, eventType, buttonText, "ethereum", authType, componentVariant)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SignInWithEthereumButton.default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			if (actionId === "prompt_mobile" || eventType === "prompt_mobile") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SmsOtpButton.default, {
				onClick: handleClick,
				className: options.buttonClassName
			}, key);
			const startIconEl = component.startIcon ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
				src: component.startIcon,
				alt: "",
				"aria-hidden": "true",
				style: {
					height: "1.25em",
					objectFit: "contain",
					width: "1.25em"
				}
			}) : null;
			const endIconEl = component.endIcon ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
				src: component.endIcon,
				alt: "",
				"aria-hidden": "true",
				style: {
					height: "1.25em",
					objectFit: "contain",
					width: "1.25em"
				}
			}) : null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
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
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.Text: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
			variant: getTypographyVariant(component.variant),
			style: {
				marginBottom: 2,
				textAlign: typeof component?.align === "string" ? component.align : "left"
			},
			children: resolve(component.label)
		}, key);
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.Divider: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Divider.default, { children: resolve(component.label) || "" }, key);
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.Select: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			const selectOptions = (component.options || []).map((opt) => ({
				label: typeof opt === "string" ? opt : String(opt.label ?? opt.value ?? ""),
				value: typeof opt === "string" ? opt : String(opt.value ?? "")
			}));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Select.default, {
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
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.DateInput: {
			const identifier = component.ref;
			const value = formValues[identifier] || "";
			const error = touchedFields[identifier] || false ? formErrors[identifier] : void 0;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_DatePicker.default, {
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
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.OuSelect: {
			const identifier = component.ref ?? component.id;
			const rootOuId = options.additionalData?.["rootOuId"];
			if (!rootOuId || !options.fetchOrganizationUnitChildren) {
				logger.warn("OU_SELECT requires additionalData.rootOuId and fetchOrganizationUnitChildren. Skipping render.");
				return null;
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationUnitPicker.default, {
				rootOuId,
				selectedOuId: formValues[identifier] || null,
				onSelect: (ouId) => onInputChange(identifier, ouId),
				fetchChildren: options.fetchOrganizationUnitChildren
			}, key);
		}
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.Block:
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
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("form", {
					id: component.id,
					style: formStyles,
					children: blockComponents
				}, key);
			}
			return null;
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.RichText: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: richTextClass,
			dangerouslySetInnerHTML: { __html: dompurify.default.sanitize((0, __thunderid_browser.resolveEmojiUrisInHtml)(resolve(component.label))) }
		}, key);
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.Image: {
			const explicitHeight = resolve(component.height?.toString());
			const explicitWidth = resolve(component.width?.toString());
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ImageComponent.default, {
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
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.Icon: {
			const iconName = component.name || "";
			const IconComponent = require_flowIconRegistry.default[iconName];
			if (!IconComponent) {
				logger.warn(`Unknown icon name: "${iconName}". Skipping render.`);
				return null;
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconComponent, {
				size: component.size || 24,
				color: component.color || "currentColor"
			}, key);
		}
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.Stack: {
			const direction = component.direction || "row";
			const gap = component.gap ?? 2;
			const align = component.align || "center";
			const justify = component.justify || "flex-start";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
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
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.Consent: {
			const consentPromptRawData = options.additionalData?.["consentPrompt"];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Consent.default, {
				consentData: consentPromptRawData,
				formValues,
				onInputChange
			}, key);
		}
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.Timer: {
			const textTemplate = resolve(component.label) || "Time remaining: {time}";
			const timeoutMs = Number(options.additionalData?.["stepTimeout"]) || 0;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FlowTimer.default, {
				expiresIn: timeoutMs > 0 ? Math.max(0, Math.floor((timeoutMs - Date.now()) / 1e3)) : 0,
				textTemplate
			}, key);
		}
		case __thunderid_browser.EmbeddedFlowComponentTypeV2.CopyableText: {
			const sourceKey = component.source;
			const value = sourceKey && options.additionalData ? String(options.additionalData[sourceKey] ?? "") : "";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CopyableText.default, {
				label: resolve(component.label) || void 0,
				value
			}, key);
		}
		default:
			logger.warn(`Unsupported component type: ${component.type}. Skipping render.`);
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
exports.renderInviteUserComponents = renderInviteUserComponents;
exports.renderRecoveryComponents = renderRecoveryComponents;
exports.renderSignInComponents = renderSignInComponents;
exports.renderSignUpComponents = renderSignUpComponents;
//# sourceMappingURL=AuthOptionFactory.cjs.map