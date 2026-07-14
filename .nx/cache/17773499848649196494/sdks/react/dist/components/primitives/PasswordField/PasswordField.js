import useTheme_default from "../../../contexts/Theme/useTheme.js";
import PasswordField_styles_default from "./PasswordField.styles.js";
import Eye_default from "../Icons/Eye.js";
import EyeOff_default from "../Icons/EyeOff.js";
import TextField_default from "../TextField/TextField.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useState } from "react";
import { jsx } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/PasswordField/PasswordField.tsx
/**
* Password field component with show/hide toggle functionality.
* This component extends TextField and adds password visibility toggle functionality.
*/
const PasswordField = ({ onChange, className, disabled, error,...textFieldProps }) => {
	const { theme, colorScheme } = useTheme_default();
	const [showPassword, setShowPassword] = useState(false);
	const styles = PasswordField_styles_default(theme, colorScheme, showPassword, !!disabled, !!error);
	const togglePasswordVisibility = () => {
		if (!disabled) setShowPassword(!showPassword);
	};
	const IconComponent = showPassword ? EyeOff_default : Eye_default;
	return /* @__PURE__ */ jsx(TextField_default, {
		...textFieldProps,
		className: cx(withVendorCSSClassPrefix(bem("password-field")), className),
		type: showPassword ? "text" : "password",
		onChange: (e) => onChange(e.target.value),
		autoComplete: "current-password",
		disabled,
		error,
		endIcon: /* @__PURE__ */ jsx(IconComponent, {
			width: 16,
			height: 16,
			className: cx(withVendorCSSClassPrefix(bem("password-field", "toggle-icon")), styles["toggleIcon"], showPassword ? styles["visibleIcon"] : styles["hiddenIcon"])
		}),
		onEndIconClick: togglePasswordVisibility
	});
};
var PasswordField_default = PasswordField;

//#endregion
export { PasswordField_default as default };
//# sourceMappingURL=PasswordField.js.map