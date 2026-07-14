const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_TextField = require('../primitives/TextField/TextField.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/adapters/TelephoneInput.tsx
/**
* Telephone input component for sign-up forms.
*/
const TelephoneInput = ({ component, formValues, touchedFields, formErrors, onInputChange, inputClassName }) => {
	const config = component.config || {};
	const fieldName = config["identifier"] || config["name"] || component.id;
	const value = formValues[fieldName] || "";
	const error = touchedFields[fieldName] ? formErrors[fieldName] : void 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
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
exports.default = TelephoneInput_default;
//# sourceMappingURL=TelephoneInput.cjs.map