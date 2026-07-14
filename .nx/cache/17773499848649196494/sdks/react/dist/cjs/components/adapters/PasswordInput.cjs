const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_FieldFactory = require('../factories/FieldFactory.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/components/adapters/PasswordInput.tsx
/**
* Password input component for sign-up forms.
*/
const PasswordInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	const error = touchedFields[fieldName] ? formErrors[fieldName] : void 0;
	const validations = config["validations"] || [];
	const validationHints = [];
	validations.forEach((validation) => {
		if (validation.name === "LengthValidator") {
			const minLength = validation.conditions?.find((c) => c.key === "min.length")?.value;
			const maxLength = validation.conditions?.find((c) => c.key === "max.length")?.value;
			if (minLength || maxLength) validationHints.push(`Length: ${minLength || "0"}-${maxLength || "∞"} characters`);
		} else if (validation.name === "UpperCaseValidator") {
			const minLength = validation.conditions?.find((c) => c.key === "min.length")?.value;
			if (minLength && parseInt(minLength, 10) > 0) validationHints.push("Must contain uppercase letter(s)");
		} else if (validation.name === "LowerCaseValidator") {
			const minLength = validation.conditions?.find((c) => c.key === "min.length")?.value;
			if (minLength && parseInt(minLength, 10) > 0) validationHints.push("Must contain lowercase letter(s)");
		} else if (validation.name === "NumeralValidator") {
			const minLength = validation.conditions?.find((c) => c.key === "min.length")?.value;
			if (minLength && parseInt(minLength, 10) > 0) validationHints.push("Must contain number(s)");
		} else if (validation.name === "SpecialCharacterValidator") {
			const minLength = validation.conditions?.find((c) => c.key === "min.length")?.value;
			if (minLength && parseInt(minLength, 10) > 0) validationHints.push("Must contain special character(s)");
		}
	});
	return require_FieldFactory.createField({
		className: inputClassName,
		error,
		label: config["label"] || "Password",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "Enter your password",
		required: config["required"] || false,
		type: __thunderid_browser.FieldType.Password,
		value
	});
};
var PasswordInput_default = PasswordInput;

//#endregion
exports.default = PasswordInput_default;
//# sourceMappingURL=PasswordInput.cjs.map