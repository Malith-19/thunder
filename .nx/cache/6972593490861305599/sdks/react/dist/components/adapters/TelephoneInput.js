import TextField_default from "../primitives/TextField/TextField.js";
import { jsx } from "react/jsx-runtime";

//#region src/components/adapters/TelephoneInput.tsx
/**
* Telephone input component for sign-up forms.
*/
const TelephoneInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	const error = touchedFields[fieldName] ? formErrors[fieldName] : void 0;
	return /* @__PURE__ */ jsx(TextField_default, {
		name: fieldName,
		type: "tel",
		label: config["label"] || "",
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		value,
		error,
		onChange: (e) => onInputChange(fieldName, e.target.value),
		className: inputClassName,
		helperText: config["hint"] || ""
	}, component.id);
};
var TelephoneInput_default = TelephoneInput;

//#endregion
export { TelephoneInput_default as default };
//# sourceMappingURL=TelephoneInput.js.map