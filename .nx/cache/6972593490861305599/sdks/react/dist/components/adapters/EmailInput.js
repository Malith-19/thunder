import { createField } from "../factories/FieldFactory.js";
import { FieldType } from "@thunderid/browser";

//#region src/components/adapters/EmailInput.tsx
/**
* Email input component for sign-up forms.
*/
const EmailInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	return createField({
		className: inputClassName,
		error: touchedFields[fieldName] ? formErrors[fieldName] : void 0,
		label: config["label"] || "Email",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "Enter your email",
		required: config["required"] || false,
		type: FieldType.Email,
		value
	});
};
var EmailInput_default = EmailInput;

//#endregion
export { EmailInput_default as default };
//# sourceMappingURL=EmailInput.js.map