import { IconButton, InputAdornment, TextField } from "@wso2/oxygen-ui";
import { Eye, EyeClosed } from "@wso2/oxygen-ui-icons-react";
import { useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/components/CredentialFieldInput.tsx
function CredentialFieldInput({ id, value, placeholder, required, error, helperText = void 0, color, onChange, onBlur, inputRef, name, ariaLabel = void 0 }) {
	const [showPassword, setShowPassword] = useState(false);
	return /* @__PURE__ */ jsx(TextField, {
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
			input: { endAdornment: /* @__PURE__ */ jsx(InputAdornment, {
				position: "end",
				children: /* @__PURE__ */ jsx(IconButton, {
					"aria-label": showPassword ? "hide password" : "show password",
					onClick: () => setShowPassword((prev) => !prev),
					edge: "end",
					children: showPassword ? /* @__PURE__ */ jsx(EyeClosed, {}) : /* @__PURE__ */ jsx(Eye, {})
				})
			}) }
		}
	});
}
var CredentialFieldInput_default = CredentialFieldInput;

//#endregion
export { CredentialFieldInput_default as default };