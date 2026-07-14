import Checkbox_default from "../primitives/Checkbox/Checkbox.js";
import DatePicker_default from "../primitives/DatePicker/DatePicker.js";
import OtpField_default from "../primitives/OtpField/OtpField.js";
import TextField_default from "../primitives/TextField/TextField.js";
import PasswordField_default from "../primitives/PasswordField/PasswordField.js";
import Select_default from "../primitives/Select/Select.js";
import { FieldType } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

//#region src/components/factories/FieldFactory.tsx
/**
* Utility function to validate field values based on type
*/
const validateFieldValue = (value, type, required = false, touched = false) => {
	if (required && touched && (!value || value.trim() === "")) return "This field is required";
	if (!value || value.trim() === "") return null;
	switch (type) {
		case FieldType.Number: {
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
		case FieldType.Password: return /* @__PURE__ */ jsx(PasswordField_default, {
			...commonProps,
			onChange
		});
		case FieldType.Text: return /* @__PURE__ */ jsx(TextField_default, {
			...commonProps,
			type: "text",
			onChange: (e) => onChange(e.target.value),
			autoComplete: "off"
		});
		case FieldType.Email: return /* @__PURE__ */ jsx(TextField_default, {
			...commonProps,
			type: "email",
			onChange: (e) => onChange(e.target.value),
			autoComplete: "email"
		});
		case FieldType.Tel: return /* @__PURE__ */ jsx(TextField_default, {
			...commonProps,
			type: "tel",
			onChange: (e) => onChange(e.target.value),
			autoComplete: "tel"
		});
		case FieldType.Date: return /* @__PURE__ */ jsx(DatePicker_default, {
			...commonProps,
			onChange: (e) => onChange(e.target.value)
		});
		case FieldType.Checkbox: {
			const isChecked = value === "true" || value === true;
			return /* @__PURE__ */ jsx(Checkbox_default, {
				...commonProps,
				checked: isChecked,
				onChange: (e) => onChange(e.target.checked.toString())
			});
		}
		case FieldType.Otp: return /* @__PURE__ */ jsx(OtpField_default, {
			...commonProps,
			onChange: (e) => onChange(e.target.value)
		});
		case FieldType.Number: return /* @__PURE__ */ jsx(TextField_default, {
			...commonProps,
			type: "number",
			onChange: (e) => onChange(e.target.value),
			helperText: "Enter a numeric value"
		});
		case FieldType.Select: {
			const fieldOptions = options.length > 0 ? options : [];
			if (fieldOptions.length > 0) return /* @__PURE__ */ jsx(Select_default, {
				...commonProps,
				options: fieldOptions,
				onChange: (e) => onChange(e.target.value),
				helperText: "Select from available options"
			});
			return /* @__PURE__ */ jsx(TextField_default, {
				...commonProps,
				type: "text",
				onChange: (e) => onChange(e.target.value),
				helperText: "Enter multiple values separated by commas (e.g., value1, value2, value3)",
				placeholder: "value1, value2, value3"
			});
		}
		default: return /* @__PURE__ */ jsx(TextField_default, {
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
export { FieldFactory, createField, validateFieldValue };
//# sourceMappingURL=FieldFactory.js.map