import { createField } from "../factories/FieldFactory.js";
import { FieldType } from "@thunderid/browser";

//#region src/components/adapters/CheckboxInput.tsx
/**
* Checkbox input component for sign-up forms.
*/
const CheckboxInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || false;
	return createField({
		className: inputClassName,
		error: touchedFields[fieldName] ? formErrors[fieldName] : void 0,
		label: config["label"] || "",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		type: FieldType.Checkbox,
		value
	});
};
var CheckboxInput_default = CheckboxInput;

//#endregion
export { CheckboxInput_default as default };
//# sourceMappingURL=CheckboxInput.js.map