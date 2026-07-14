const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_ArrayFieldInput = require('../components/ArrayFieldInput.cjs');
const require_CredentialFieldInput = require('../components/CredentialFieldInput.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let react_hook_form = require("react-hook-form");
react_hook_form = require_rolldown_runtime.__toESM(react_hook_form);

//#region src/utils/renderSchemaField.tsx
/**
* Helper function to render a form field based on the property definition
*
* @param fieldName - The name of the field in the schema
* @param fieldDef - The property definition from the schema
* @param control - React Hook Form control object
* @param errors - Form validation errors
* @param resolveDisplayName - Optional callback to resolve display name (handles plain strings and i18n patterns)
* @returns A rendered form field component or null for unsupported types
*/
const renderSchemaField = (fieldName, fieldDef, control, errors, resolveDisplayName) => {
	const isRequired = fieldDef.required ?? false;
	let fieldLabel = fieldName;
	if (fieldDef.displayName) {
		const resolved = resolveDisplayName?.(fieldDef.displayName);
		fieldLabel = (resolved !== "" ? resolved : void 0) ?? fieldDef.displayName;
	}
	if (fieldDef.type === "string") {
		const stringDef = fieldDef;
		if (stringDef.enum && stringDef.enum.length > 0) {
			const enumOptions = stringDef.enum;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormLabel, {
					htmlFor: fieldName,
					children: [fieldLabel, isRequired && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						style: { color: "red" },
						children: " *"
					})]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
					name: fieldName,
					control,
					rules: { required: isRequired ? `${fieldLabel} is required` : false },
					render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Select, {
						...field,
						value: field.value ?? "",
						id: fieldName,
						fullWidth: true,
						required: isRequired,
						error: !!errors[fieldName],
						displayEmpty: true,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
							value: "",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("em", { children: ["Select ", fieldLabel] })
						}), enumOptions.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.MenuItem, {
							value: option,
							children: option.charAt(0).toUpperCase() + option.slice(1)
						}, option))]
					})
				}),
				errors[fieldName] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "caption",
					color: "error",
					sx: {
						mt: .5,
						ml: 1.75
					},
					children: errors[fieldName]?.message
				})
			] }, fieldName);
		}
		let validationPattern;
		if (stringDef.regex) validationPattern = {
			value: new RegExp(stringDef.regex),
			message: `${fieldLabel} format is invalid`
		};
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormLabel, {
			htmlFor: fieldName,
			children: [fieldLabel, isRequired && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: { color: "red" },
				children: " *"
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
			name: fieldName,
			control,
			rules: {
				required: isRequired ? `${fieldLabel} is required` : false,
				pattern: validationPattern
			},
			render: ({ field }) => stringDef.credential ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CredentialFieldInput.default, {
				id: fieldName,
				name: field.name,
				value: field.value ?? "",
				placeholder: `Enter ${fieldLabel.toLowerCase()}`,
				required: isRequired,
				error: !!errors[fieldName],
				helperText: errors[fieldName]?.message,
				color: errors[fieldName] ? "error" : "primary",
				onChange: field.onChange,
				onBlur: field.onBlur,
				inputRef: field.ref
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
				...field,
				value: field.value ?? "",
				id: fieldName,
				type: "text",
				placeholder: `Enter ${fieldLabel.toLowerCase()}`,
				fullWidth: true,
				required: isRequired,
				variant: "outlined",
				error: !!errors[fieldName],
				helperText: errors[fieldName]?.message,
				color: errors[fieldName] ? "error" : "primary"
			})
		})] }, fieldName);
	}
	if (fieldDef.type === "number") {
		const numberDef = fieldDef;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormLabel, {
			htmlFor: fieldName,
			children: [fieldLabel, isRequired && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: { color: "red" },
				children: " *"
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
			name: fieldName,
			control,
			rules: { required: isRequired ? `${fieldLabel} is required` : false },
			render: ({ field }) => numberDef.credential ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CredentialFieldInput.default, {
				id: fieldName,
				name: field.name,
				value: String(field.value ?? ""),
				placeholder: `Enter ${fieldLabel.toLowerCase()}`,
				required: isRequired,
				error: !!errors[fieldName],
				helperText: errors[fieldName]?.message,
				color: errors[fieldName] ? "error" : "primary",
				onChange: (e) => {
					const { value } = e.target;
					const num = Number(value);
					field.onChange(value && !Number.isNaN(num) ? num : "");
				},
				onBlur: field.onBlur,
				inputRef: field.ref
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
				...field,
				value: field.value ?? "",
				id: fieldName,
				type: "number",
				placeholder: `Enter ${fieldLabel.toLowerCase()}`,
				fullWidth: true,
				required: isRequired,
				variant: "outlined",
				error: !!errors[fieldName],
				helperText: errors[fieldName]?.message,
				color: errors[fieldName] ? "error" : "primary",
				onChange: (e) => {
					const { value } = e.target;
					field.onChange(value ? Number(value) : "");
				}
			})
		})] }, fieldName);
	}
	if (fieldDef.type === "boolean") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControl, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
		name: fieldName,
		control,
		render: ({ field }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
			sx: {
				display: "flex",
				alignItems: "center",
				py: 1
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormControlLabel, {
				control: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Checkbox, {
					id: fieldName,
					name: field.name,
					checked: !!field.value,
					onChange: (e) => field.onChange(e.target.checked),
					onBlur: field.onBlur,
					ref: field.ref
				}),
				required: isRequired,
				label: fieldLabel,
				sx: { mb: 2 }
			})
		})
	}) }, fieldName);
	if (fieldDef.type === "array") return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormControl, {
		fullWidth: true,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.FormLabel, {
			htmlFor: fieldName,
			children: [fieldLabel, isRequired && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: { color: "red" },
				children: " *"
			})]
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_hook_form.Controller, {
			name: fieldName,
			control,
			rules: {
				required: isRequired ? `${fieldLabel} is required` : false,
				validate: (value) => {
					if (isRequired && (!Array.isArray(value) || value.length === 0)) return `${fieldLabel} must have at least one value`;
					return true;
				}
			},
			render: ({ field }) => {
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ArrayFieldInput.default, {
					value: Array.isArray(field.value) ? field.value : [],
					onChange: field.onChange,
					fieldLabel
				}), errors[fieldName] && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "caption",
					color: "error",
					sx: {
						mt: .5,
						ml: 1.75
					},
					children: errors[fieldName]?.message
				})] });
			}
		})]
	}, fieldName);
	return null;
};
var renderSchemaField_default = renderSchemaField;

//#endregion
exports.default = renderSchemaField_default;