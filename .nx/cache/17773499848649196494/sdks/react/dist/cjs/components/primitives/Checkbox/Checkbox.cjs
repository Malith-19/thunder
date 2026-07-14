const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Checkbox_styles = require('./Checkbox.styles.cjs');
const require_FormControl = require('../FormControl/FormControl.cjs');
const require_InputLabel = require('../InputLabel/InputLabel.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Checkbox/Checkbox.tsx
const Checkbox = ({ label, error, className, required, helperText, style = {},...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const hasError = !!error;
	const styles = require_Checkbox_styles.default(theme, colorScheme, hasError, !!required);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FormControl.default, {
		error,
		helperText,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("checkbox")), className),
		helperTextMarginLeft: `calc(${theme.vars.spacing.unit} * 3.5)`,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			style,
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("checkbox", "container")), styles["container"]),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
				type: "checkbox",
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("checkbox", "input")), styles["input"], styles["errorInput"], { [(0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("checkbox", "input", "error"))]: hasError }),
				"aria-invalid": hasError,
				"aria-required": required,
				...rest
			}), label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InputLabel.default, {
				required,
				error: hasError,
				variant: "inline",
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("checkbox", "label")), styles["label"], styles["errorLabel"], { [(0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("checkbox", "label", "error"))]: hasError }),
				children: label
			})]
		})
	});
};
var Checkbox_default = Checkbox;

//#endregion
exports.default = Checkbox_default;
//# sourceMappingURL=Checkbox.cjs.map