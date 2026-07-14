const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_Checkbox = require('../primitives/Checkbox/Checkbox.cjs');
const require_DatePicker = require('../primitives/DatePicker/DatePicker.cjs');
const require_OtpField = require('../primitives/OtpField/OtpField.cjs');
const require_TextField = require('../primitives/TextField/TextField.cjs');
const require_PasswordField = require('../primitives/PasswordField/PasswordField.cjs');
const require_Select = require('../primitives/Select/Select.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/factories/FieldFactory.tsx
/**
* Utility function to validate field values based on type
*/
const validateFieldValue = (value, type, required = false, touched = false) => {
	if (required && touched && (!value || value.trim() === "")) return "This field is required";
	if (!value || value.trim() === "") return null;
	switch (type) {
		case __thunderid_browser.FieldType.Number: {
			const numValue = parseInt(value, 10);
			if (Number.isNaN(numValue)) return "Please enter a valid number";
			break;
		}
		default: break;
	}
	return null;
};
/**
* Factory function to create form fields based on the EmbeddedSignInFlowAuthenticatorParamType.
*
* @param config - The field configuration
* @returns The appropriate React component for the field type
*
* @example
* ```tsx
* const field = createField({
*   param: 'username',
*   type: EmbeddedSignInFlowAuthenticatorParamType.String,
*   label: 'Username',
*   confidential: false,
*   required: true,
*   value: '',
*   onChange: (value) => console.log(value)
* });
* ```
*/
const createField = (config) => {
	const { name, type, label, required, value, onChange, onBlur, disabled = false, error, className, options = [], touched = false, placeholder } = config;
	const validationError = error || validateFieldValue(value, type, required, touched);
	const commonProps = {
		className,
		"data-testid": `thunderid-signin-${name}`,
		disabled,
		error: validationError,
		label,
		name,
		onBlur,
		placeholder,
		required,
		value
	};
	switch (type) {
		case __thunderid_browser.FieldType.Password: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_PasswordField.default, {
			...commonProps,
			onChange
		});
		case __thunderid_browser.FieldType.Text: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
			...commonProps,
			type: "text",
			onChange: (e) => onChange(e.target.value),
			autoComplete: "off"
		});
		case __thunderid_browser.FieldType.Email: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
			...commonProps,
			type: "email",
			onChange: (e) => onChange(e.target.value),
			autoComplete: "email"
		});
		case __thunderid_browser.FieldType.Tel: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
			...commonProps,
			type: "tel",
			onChange: (e) => onChange(e.target.value),
			autoComplete: "tel"
		});
		case __thunderid_browser.FieldType.Date: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_DatePicker.default, {
			...commonProps,
			onChange: (e) => onChange(e.target.value)
		});
		case __thunderid_browser.FieldType.Checkbox: {
			const isChecked = value === "true" || value === true;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Checkbox.default, {
				...commonProps,
				checked: isChecked,
				onChange: (e) => onChange(e.target.checked.toString())
			});
		}
		case __thunderid_browser.FieldType.Otp: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OtpField.default, {
			...commonProps,
			onChange: (e) => onChange(e.target.value)
		});
		case __thunderid_browser.FieldType.Number: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
			...commonProps,
			type: "number",
			onChange: (e) => onChange(e.target.value),
			helperText: "Enter a numeric value"
		});
		case __thunderid_browser.FieldType.Select: {
			const fieldOptions = options.length > 0 ? options : [];
			if (fieldOptions.length > 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Select.default, {
				...commonProps,
				options: fieldOptions,
				onChange: (e) => onChange(e.target.value),
				helperText: "Select from available options"
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
				...commonProps,
				type: "text",
				onChange: (e) => onChange(e.target.value),
				helperText: "Enter multiple values separated by commas (e.g., value1, value2, value3)",
				placeholder: "value1, value2, value3"
			});
		}
		default: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
			...commonProps,
			type: "text",
			onChange: (e) => onChange(e.target.value),
			helperText: "Unknown field type, treating as text"
		});
	}
};
/**
* React component wrapper for the field factory.
*/
const FieldFactory = (props) => createField(props);

//#endregion
exports.FieldFactory = FieldFactory;
exports.createField = createField;
exports.validateFieldValue = validateFieldValue;
//# sourceMappingURL=FieldFactory.cjs.map