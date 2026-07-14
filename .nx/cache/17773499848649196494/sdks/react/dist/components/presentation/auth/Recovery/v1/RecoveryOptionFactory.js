import FacebookButton_default from "../../../../adapters/FacebookButton.js";
import GitHubButton_default from "../../../../adapters/GitHubButton.js";
import GoogleButton_default from "../../../../adapters/GoogleButton.js";
import LinkedInButton_default from "../../../../adapters/LinkedInButton.js";
import MicrosoftButton_default from "../../../../adapters/MicrosoftButton.js";
import SignInWithEthereumButton_default from "../../../../adapters/SignInWithEthereumButton.js";
import ImageComponent_default from "../../../../adapters/ImageComponent.js";
import CheckboxInput_default from "../../../../adapters/CheckboxInput.js";
import DateInput_default from "../../../../adapters/DateInput.js";
import DividerComponent_default from "../../../../adapters/DividerComponent.js";
import EmailInput_default from "../../../../adapters/EmailInput.js";
import FormContainer_default from "../../../../adapters/FormContainer.js";
import NumberInput_default from "../../../../adapters/NumberInput.js";
import PasswordInput_default from "../../../../adapters/PasswordInput.js";
import SelectInput_default from "../../../../adapters/SelectInput.js";
import SubmitButton_default from "../../../../adapters/SubmitButton.js";
import TelephoneInput_default from "../../../../adapters/TelephoneInput.js";
import TextInput_default from "../../../../adapters/TextInput.js";
import Typography_default from "../../../../adapters/Typography.js";
import { EmbeddedFlowComponentType } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/Recovery/v1/RecoveryOptionFactory.tsx
/**
* Creates the appropriate recovery component based on the component type.
*/
const createRecoveryComponent = ({ component, onSubmit,...rest }) => {
	switch (component.type) {
		case EmbeddedFlowComponentType.Typography: return /* @__PURE__ */ jsx(Typography_default, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType.Input: {
			const inputVariant = component.variant?.toUpperCase() ?? "";
			const inputType = component.config["type"]?.toLowerCase() ?? "";
			if (inputVariant === "EMAIL" || inputType === "email") return /* @__PURE__ */ jsx(EmailInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "PASSWORD" || inputType === "password") return /* @__PURE__ */ jsx(PasswordInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "TELEPHONE" || inputType === "tel") return /* @__PURE__ */ jsx(TelephoneInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "NUMBER" || inputType === "number") return /* @__PURE__ */ jsx(NumberInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "DATE" || inputType === "date") return /* @__PURE__ */ jsx(DateInput_default, {
				component,
				onSubmit,
				...rest
			});
			if (inputVariant === "CHECKBOX" || inputType === "checkbox") return /* @__PURE__ */ jsx(CheckboxInput_default, {
				component,
				onSubmit,
				...rest
			});
			return /* @__PURE__ */ jsx(TextInput_default, {
				component,
				onSubmit,
				...rest
			});
		}
		case EmbeddedFlowComponentType.Button: {
			const buttonVariant = component.variant?.toUpperCase();
			const buttonText = component.config["text"] || component.config["label"] || "";
			if (buttonVariant === "SOCIAL") {
				if (buttonText.toLowerCase().includes("google")) return /* @__PURE__ */ jsx(GoogleButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("github")) return /* @__PURE__ */ jsx(GitHubButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("microsoft")) return /* @__PURE__ */ jsx(MicrosoftButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("facebook")) return /* @__PURE__ */ jsx(FacebookButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("linkedin")) return /* @__PURE__ */ jsx(LinkedInButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
				if (buttonText.toLowerCase().includes("ethereum")) return /* @__PURE__ */ jsx(SignInWithEthereumButton_default, {
					onClick: () => onSubmit?.(component, {}),
					...rest,
					children: buttonText
				});
			}
			return /* @__PURE__ */ jsx(SubmitButton_default, {
				component,
				onSubmit,
				...rest
			});
		}
		case EmbeddedFlowComponentType.Form: return /* @__PURE__ */ jsx(FormContainer_default, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType.Select: return /* @__PURE__ */ jsx(SelectInput_default, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType.Divider: return /* @__PURE__ */ jsx(DividerComponent_default, {
			component,
			onSubmit,
			...rest
		});
		case EmbeddedFlowComponentType.Image: return /* @__PURE__ */ jsx(ImageComponent_default, {
			component,
			onSubmit,
			...rest
		});
		default: return /* @__PURE__ */ jsx("div", {});
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
export { renderRecoveryComponents };
//# sourceMappingURL=RecoveryOptionFactory.js.map