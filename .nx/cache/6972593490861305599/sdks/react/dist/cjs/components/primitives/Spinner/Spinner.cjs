const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Spinner_styles = require('./Spinner.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Spinner/Spinner.tsx
/**
* Spinner component for loading states
*
* @example
* ```tsx
* // Basic spinner
* <Spinner />
*
* // Large spinner with custom color
* <Spinner size="large" color="#3b82f6" />
*
* // Small spinner
* <Spinner size="small" />
* ```
*/
const Spinner = ({ size = "medium", color, className, style }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Spinner_styles.default(theme, colorScheme, size, color);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("spinner")), styles["spinner"], size === "small" && styles["spinnerSmall"], size === "medium" && styles["spinnerMedium"], size === "large" && styles["spinnerLarge"], className),
		style,
		role: "status",
		"aria-label": "Loading"
	});
};
var Spinner_default = Spinner;

//#endregion
exports.default = Spinner_default;
//# sourceMappingURL=Spinner.cjs.map