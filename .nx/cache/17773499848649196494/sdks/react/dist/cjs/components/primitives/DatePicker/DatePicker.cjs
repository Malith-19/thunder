const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_FormControl = require('../FormControl/FormControl.cjs');
const require_InputLabel = require('../InputLabel/InputLabel.cjs');
const require_DatePicker_styles = require('./DatePicker.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/DatePicker/DatePicker.tsx
const DatePicker = ({ label, error, className, required, disabled, helperText, dateFormat = "yyyy-MM-dd", style = {},...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const hasError = !!error;
	const styles = require_DatePicker_styles.default(theme, colorScheme, hasError, !!disabled);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_FormControl.default, {
		error,
		helperText,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("date-picker")), className),
		style,
		children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InputLabel.default, {
			required,
			error: hasError,
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("date-picker", "label")), styles["label"]),
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
			type: "date",
			pattern: "\\d{4}-\\d{2}-\\d{2}",
			placeholder: dateFormat,
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("date-picker", "input")), styles["input"], styles["errorInput"], styles["disabledInput"], {
				[(0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("date-picker", "input", "error"))]: hasError,
				[(0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("date-picker", "input", "disabled"))]: disabled
			}),
			disabled,
			"aria-invalid": hasError,
			"aria-required": required,
			...rest
		})]
	});
};
var DatePicker_default = DatePicker;

//#endregion
exports.default = DatePicker_default;
//# sourceMappingURL=DatePicker.cjs.map