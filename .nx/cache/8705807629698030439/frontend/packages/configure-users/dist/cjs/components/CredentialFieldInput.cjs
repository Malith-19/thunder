const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/CredentialFieldInput.tsx
function CredentialFieldInput({ id, value, placeholder, required, error, helperText = void 0, color, onChange, onBlur, inputRef, name, ariaLabel = void 0 }) {
	const [showPassword, setShowPassword] = (0, react.useState)(false);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
		id,
		name,
		value,
		type: showPassword ? "text" : "password",
		placeholder,
		fullWidth: true,
		required,
		variant: "outlined",
		error,
		helperText,
		color,
		onChange,
		onBlur,
		inputRef,
		slotProps: {
			htmlInput: { "aria-label": ariaLabel },
			input: { endAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
				position: "end",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					"aria-label": showPassword ? "hide password" : "show password",
					onClick: () => setShowPassword((prev) => !prev),
					edge: "end",
					children: showPassword ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.EyeClosed, {}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Eye, {})
				})
			}) }
		}
	});
}
var CredentialFieldInput_default = CredentialFieldInput;

//#endregion
exports.default = CredentialFieldInput_default;