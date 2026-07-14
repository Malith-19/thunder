const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_PasswordField_styles = require('./PasswordField.styles.cjs');
const require_Eye = require('../Icons/Eye.cjs');
const require_EyeOff = require('../Icons/EyeOff.cjs');
const require_TextField = require('../TextField/TextField.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/PasswordField/PasswordField.tsx
/**
* Password field component with show/hide toggle functionality.
* This component extends TextField and adds password visibility toggle functionality.
*/
const PasswordField = ({ onChange, className, disabled, error,...textFieldProps }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const [showPassword, setShowPassword] = (0, react.useState)(false);
	const styles = require_PasswordField_styles.default(theme, colorScheme, showPassword, !!disabled, !!error);
	const togglePasswordVisibility = () => {
		if (!disabled) setShowPassword(!showPassword);
	};
	const IconComponent = showPassword ? require_EyeOff.default : require_Eye.default;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
		...textFieldProps,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("password-field")), className),
		type: showPassword ? "text" : "password",
		onChange: (e) => onChange(e.target.value),
		autoComplete: "current-password",
		disabled,
		error,
		endIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconComponent, {
			width: 16,
			height: 16,
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("password-field", "toggle-icon")), styles["toggleIcon"], showPassword ? styles["visibleIcon"] : styles["hiddenIcon"])
		}),
		onEndIconClick: togglePasswordVisibility
	});
};
var PasswordField_default = PasswordField;

//#endregion
exports.default = PasswordField_default;
//# sourceMappingURL=PasswordField.cjs.map