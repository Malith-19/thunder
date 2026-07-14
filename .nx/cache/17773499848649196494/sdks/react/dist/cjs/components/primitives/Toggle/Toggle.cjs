const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_FormControl = require('../FormControl/FormControl.cjs');
const require_InputLabel = require('../InputLabel/InputLabel.cjs');
const require_Toggle_styles = require('./Toggle.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Toggle/Toggle.tsx
/**
* A Toggle component that represents a boolean input. It is built on top of a hidden checkbox input
* and styled to look like a switch.
*
* The component is wrapped in a FormControl to display error messages and helper text.
* The label is associated with the input for accessibility.
*
* @param props - Props for the Toggle component
* @returns A JSX element representing the Toggle
*/
const Toggle = ({ label, error, className, required, helperText, style = {},...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const hasError = !!error;
	const styles = require_Toggle_styles.default(theme, colorScheme, hasError, !!required);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_FormControl.default, {
		error,
		helperText,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("toggle")), className),
		helperTextMarginLeft: `calc(${theme.vars.spacing.unit} * 5.5)`,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
			style,
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("toggle", "container")), styles["container"]),
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					type: "checkbox",
					role: "switch",
					className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("toggle", "input")), styles["input"]),
					"aria-invalid": hasError,
					"aria-required": required,
					...rest
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("toggle", "track")), styles["track"]),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("toggle", "thumb")), styles["thumb"]) })
				}),
				label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InputLabel.default, {
					required,
					error: hasError,
					variant: "inline",
					className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("toggle", "label")), styles["label"], styles["errorLabel"], { [(0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("toggle", "label", "error"))]: hasError }),
					children: label
				})
			]
		})
	});
};
var Toggle_default = Toggle;

//#endregion
exports.default = Toggle_default;
//# sourceMappingURL=Toggle.cjs.map