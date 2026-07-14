const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_FieldFactory = require('../factories/FieldFactory.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

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
	return require_FieldFactory.createField({
		className: inputClassName,
		error,
		label: config["label"] || "",
		name: fieldName,
		onChange: (newValue) => onInputChange(fieldName, newValue),
		options,
		placeholder: config["placeholder"] || "",
		required: config["required"] || false,
		type: __thunderid_browser.FieldType.Select,
		value
	});
};
var SelectInput_default = SelectInput;

//#endregion
exports.default = SelectInput_default;
//# sourceMappingURL=SelectInput.cjs.map