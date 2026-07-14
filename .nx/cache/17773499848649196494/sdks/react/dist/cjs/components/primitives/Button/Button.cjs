const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Button_styles = require('./Button.styles.cjs');
const require_Spinner = require('../Spinner/Spinner.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Button/Button.tsx
const getSpinnerWidth = (sizeVal, spacingUnit) => {
	if (sizeVal === "small") return `calc(${spacingUnit} * 1.5)`;
	if (sizeVal === "medium") return `calc(${spacingUnit} * 2)`;
	return `calc(${spacingUnit} * 2.5)`;
};
/**
* Button component with multiple variants and types.
*
* @example
* ```tsx
* // Primary solid button
* <Button color="primary" variant="solid">
*   Click me
* </Button>
*
* // Secondary outline button
* <Button color="secondary" variant="outline" size="large">
*   Cancel
* </Button>
*
* // Text button with loading state
* <Button color="tertiary" variant="text" loading>
*   Loading...
* </Button>
*
* // Button with icons
* <Button
*   color="primary"
*   startIcon={<Icon />}
*   endIcon={<Arrow />}
* >
*   Save and Continue
* </Button>
* ```
*/
const Button = (0, react.forwardRef)(({ color = "primary", variant = "solid", size = "medium", fullWidth = false, loading = false, startIcon, endIcon, children, className, disabled, style, shape = "square",...rest }, ref) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Button_styles.default(theme, colorScheme, color, variant, size, fullWidth, disabled || false, loading, shape);
	const isIconVariant = variant === "icon";
	const spinnerWidth = getSpinnerWidth(size, theme.vars.spacing.unit);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		ref,
		style,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button")), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", variant)), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", color)), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", size)), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", shape)), fullWidth ? (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", "fullWidth")) : void 0, loading ? (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", "loading")) : void 0, disabled || loading ? (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", "disabled")) : void 0, styles["button"], styles["size"], styles["variant"], styles["fullWidth"], styles["loading"], styles["shape"], className),
		disabled: disabled || loading,
		...rest,
		children: [
			loading && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", "spinner")), styles["spinner"]),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Spinner.default, {
					size,
					color: "currentColor",
					style: {
						height: spinnerWidth,
						width: spinnerWidth
					}
				})
			}),
			!loading && isIconVariant && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", "icon")), styles["icon"]),
				children: children || startIcon || endIcon
			}),
			!loading && !isIconVariant && startIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", "start-icon")), styles["startIcon"]),
				children: startIcon
			}),
			!isIconVariant && children && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", "content")), styles["content"]),
				children
			}),
			!loading && !isIconVariant && endIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("button", "end-icon")), styles["endIcon"]),
				children: endIcon
			})
		]
	});
});
Button.displayName = "Button";
var Button_default = Button;

//#endregion
exports.default = Button_default;
//# sourceMappingURL=Button.cjs.map