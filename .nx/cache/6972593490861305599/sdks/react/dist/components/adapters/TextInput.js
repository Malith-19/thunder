import { createField } from "../factories/FieldFactory.js";
import { FieldType } from "@thunderid/browser";

//#region src/components/adapters/TextInput.tsx
/**
* Text input component for sign-up forms.
*/
const TextInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	return createField({
		className: inputClassName,
		error: touchedFields[fieldName] ? formErrors[fieldName] : void 0,
		label: config["label"] || "",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		type: FieldType.Text,
		value
	});
};
var TextInput_default = TextInput;

//#endregion
export { TextInput_default as default };
//# sourceMappingURL=TextInput.js.map