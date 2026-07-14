const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_FacebookButton = require('../../../../adapters/FacebookButton.cjs');
const require_GitHubButton = require('../../../../adapters/GitHubButton.cjs');
const require_GoogleButton = require('../../../../adapters/GoogleButton.cjs');
const require_LinkedInButton = require('../../../../adapters/LinkedInButton.cjs');
const require_MicrosoftButton = require('../../../../adapters/MicrosoftButton.cjs');
const require_SignInWithEthereumButton = require('../../../../adapters/SignInWithEthereumButton.cjs');
const require_ImageComponent = require('../../../../adapters/ImageComponent.cjs');
const require_CheckboxInput = require('../../../../adapters/CheckboxInput.cjs');
const require_DateInput = require('../../../../adapters/DateInput.cjs');
const require_DividerComponent = require('../../../../adapters/DividerComponent.cjs');
const require_EmailInput = require('../../../../adapters/EmailInput.cjs');
const require_FormContainer = require('../../../../adapters/FormContainer.cjs');
const require_NumberInput = require('../../../../adapters/NumberInput.cjs');
const require_PasswordInput = require('../../../../adapters/PasswordInput.cjs');
const require_SelectInput = require('../../../../adapters/SelectInput.cjs');
const require_SubmitButton = require('../../../../adapters/SubmitButton.cjs');
const require_TelephoneInput = require('../../../../adapters/TelephoneInput.cjs');
const require_TextInput = require('../../../../adapters/TextInput.cjs');
const require_Typography = require('../../../../adapters/Typography.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/Recovery/v1/RecoveryOptionFactory.tsx
/**
* Creates the appropriate recovery component based on the component type.
*/
const createRecoveryComponent = ({ component, onSubmit,...rest }) => {
	switch (component.type) {
		case __thunderid_browser.EmbeddedFlowComponentType.Typography: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
			component,
			onSubmit,
			...rest
		});
		case __thunderid_browser.EmbeddedFlowComponentType.Input: {
			const inputVariant = component.variant?.toUpperCase() ?? "";
			const inputType = component.config["type"]?.toLowerCase() ?? "";
			if (inputVariant === "EMAIL" || inputType === "email") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EmailInput.default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "PASSWORD" || inputType === "password") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_PasswordInput.default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "TELEPHONE" || inputType === "tel") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TelephoneInput.default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "NUMBER" || inputType === "number") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_NumberInput.default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "DATE" || inputType === "date") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_DateInput.default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "CHECKBOX" || inputType === "checkbox") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CheckboxInput.default, {
				component,
				onSubmit,
				...rest
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextInput.default, {
				component,
				onSubmit,
				...rest
			});
		}
		case __thunderid_browser.EmbeddedFlowComponentType.Button: {
			const buttonVariant = component.variant?.toUpperCase();
			const buttonText = component.config["text"] || component.config["label"] || "";
			if (buttonVariant === "SOCIAL") {
				if (buttonText.toLowerCase().includes("google")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_GoogleButton.default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("github")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_GitHubButton.default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("microsoft")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_MicrosoftButton.default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("facebook")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FacebookButton.default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("linkedin")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_LinkedInButton.default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("ethereum")) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SignInWithEthereumButton.default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
			}
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SubmitButton.default, {
				component,
				onSubmit,
				...rest
			});
		}
		case __thunderid_browser.EmbeddedFlowComponentType.Form: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FormContainer.default, {
			component,
			onSubmit,
			...rest
		});
		case __thunderid_browser.EmbeddedFlowComponentType.Select: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_SelectInput.default, {
			component,
			onSubmit,
			...rest
		});
		case __thunderid_browser.EmbeddedFlowComponentType.Divider: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_DividerComponent.default, {
			component,
			onSubmit,
			...rest
		});
		case __thunderid_browser.EmbeddedFlowComponentType.Image: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ImageComponent.default, {
			component,
			onSubmit,
			...rest
		});
		default: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {});
	}
};
/**
* Convenience function that creates the appropriate recovery component from flow component data.
*/
const createRecoveryOptionFromComponent = (component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => createRecoveryComponent({
	component,
	formErrors,
	formValues,
	isFormValid,
	isLoading,
	onInputChange,
	touchedFields,
	...options
});
/**
* Processes an array of components and renders them as React elements for recovery flow.
*/
const renderRecoveryComponents = (components, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, options) => components.map((component, index) => createRecoveryOptionFromComponent(component, formValues, touchedFields, formErrors, isLoading, isFormValid, onInputChange, {
	...options,
	key: component.id || index
})).filter(Boolean);

//#endregion
exports.renderRecoveryComponents = renderRecoveryComponents;
//# sourceMappingURL=RecoveryOptionFactory.cjs.map