const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_FormControl = require('../FormControl/FormControl.cjs');
const require_InputLabel = require('../InputLabel/InputLabel.cjs');
const require_TextField_styles = require('./TextField.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/TextField/TextField.tsx
const TextField = ({ label, error, required, className, disabled, helperText, startIcon, endIcon, onStartIconClick, onEndIconClick, type = "text", style = {},...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const hasError = !!error;
	const styles = require_TextField_styles.default(theme, colorScheme, disabled ?? false, hasError, !!startIcon, !!endIcon);
	const inputClassName = (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("text-field", "input")), styles["input"], hasError && styles["inputError"], disabled && styles["inputDisabled"]);
	const containerClassName = (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("text-field", "container")), styles["inputContainer"]);
	const startIconClassName = (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("text-field", "start-icon")), styles["startIcon"]);
	const endIconClassName = (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("text-field", "end-icon")), styles["endIcon"]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_FormControl.default, {
		error,
		helperText,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("text-field")), className),
		style,
		children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InputLabel.default, {
			required,
			error: hasError,
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: containerClassName,
			children: [
				startIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: startIconClassName,
					onClick: onStartIconClick,
					role: onStartIconClick ? "button" : void 0,
					tabIndex: onStartIconClick && !disabled ? 0 : void 0,
					"aria-label": "Start icon",
					children: startIcon
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					className: inputClassName,
					type,
					disabled,
					"aria-invalid": hasError,
					"aria-required": required,
					...rest
				}),
				endIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: endIconClassName,
					onClick: onEndIconClick,
					role: onEndIconClick ? "button" : void 0,
					tabIndex: onEndIconClick && !disabled ? 0 : void 0,
					"aria-label": "End icon",
					children: endIcon
				})
			]
		})]
	});
};
var TextField_default = TextField;

//#endregion
exports.default = TextField_default;
//# sourceMappingURL=TextField.cjs.map