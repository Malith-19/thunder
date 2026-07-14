const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_FormControl_styles = require('./FormControl.styles.cjs');
const require_Typography = require('../Typography/Typography.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/FormControl/FormControl.tsx
const FormControl = ({ children, error, helperText, className, helperTextAlign = "left", helperTextMarginLeft }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_FormControl_styles.default(theme, colorScheme, helperTextAlign, helperTextMarginLeft, !!error);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("form-control")), styles["formControl"], className),
		children: [children, (error || helperText) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
			variant: "caption",
			color: error ? "error" : "textSecondary",
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("form-control", "helper-text")), styles["helperText"], {
				[(0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("form-control", "helper-text", "error"))]: !!error,
				[styles["helperTextError"]]: !!error
			}),
			children: error || helperText
		})]
	});
};
var FormControl_default = FormControl;

//#endregion
exports.default = FormControl_default;
//# sourceMappingURL=FormControl.cjs.map