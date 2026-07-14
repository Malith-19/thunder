const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_FieldFactory = require('../factories/FieldFactory.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/components/adapters/DateInput.tsx
/**
* Date input component for sign-up forms.
*/
const DateInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	return require_FieldFactory.createField({
		className: inputClassName,
		error: touchedFields[fieldName] ? formErrors[fieldName] : void 0,
		label: config["label"] || "",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		type: __thunderid_browser.FieldType.Date,
		value
	});
};
var DateInput_default = DateInput;

//#endregion
exports.default = DateInput_default;
//# sourceMappingURL=DateInput.cjs.map