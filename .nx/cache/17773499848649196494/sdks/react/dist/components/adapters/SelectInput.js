import { createField } from "../factories/FieldFactory.js";
import { FieldType } from "@thunderid/browser";

//#region src/components/adapters/SelectInput.tsx
/**
* Select input component for sign-up forms.
*/
const SelectInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	const error = touchedFields[fieldName] ? formErrors[fieldName] : void 0;
	const options = (config["options"] || []).map((option) => ({
		label: option,
		value: option
	}));
	return createField({
		className: inputClassName,
		error,
		label: config["label"] || "",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		options,
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		type: FieldType.Select,
		value
	});
};
var SelectInput_default = SelectInput;

//#endregion
export { SelectInput_default as default };
//# sourceMappingURL=SelectInput.js.map