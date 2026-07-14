const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_InputLabel_styles = require('./InputLabel.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/InputLabel/InputLabel.tsx
const InputLabel = ({ children, required = false, error = false, variant = "block", marginBottom, className, style = {},...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_InputLabel_styles.default(theme, colorScheme, variant, error, marginBottom);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("input-label")), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("input-label", variant)), styles["label"], variant === "block" ? styles["block"] : styles["inline"], {
			[(0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("input-label", "error"))]: error,
			[styles["error"]]: error
		}, className),
		style,
		...rest,
		children: [children, required && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("input-label", "required")), styles["requiredIndicator"]),
			children: " *"
		})]
	});
};
var InputLabel_default = InputLabel;

//#endregion
exports.default = InputLabel_default;
//# sourceMappingURL=InputLabel.cjs.map