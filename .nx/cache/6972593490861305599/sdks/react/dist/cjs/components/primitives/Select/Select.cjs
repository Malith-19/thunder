const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_FormControl = require('../FormControl/FormControl.cjs');
const require_InputLabel = require('../InputLabel/InputLabel.cjs');
const require_Select_styles = require('./Select.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Select/Select.tsx
const Select = ({ label, error, className, required, disabled, helperText, placeholder, options, style = {},...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const hasError = !!error;
	const styles = require_Select_styles.default(theme, colorScheme, disabled ?? false, hasError);
	const selectClassName = (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("select", "input")), styles["select"], hasError && styles["selectError"], disabled && styles["selectDisabled"]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_FormControl.default, {
		error,
		helperText,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("select")), className),
		style,
		children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InputLabel.default, {
			required,
			error: hasError,
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
			className: selectClassName,
			disabled,
			"aria-invalid": hasError,
			"aria-required": required,
			...rest,
			children: [placeholder && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
				value: "",
				disabled: true,
				children: placeholder
			}), options.map((option) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
				value: option.value,
				className: styles["option"],
				children: option.label
			}, option.value))]
		})]
	});
};
var Select_default = Select;

//#endregion
exports.default = Select_default;
//# sourceMappingURL=Select.cjs.map