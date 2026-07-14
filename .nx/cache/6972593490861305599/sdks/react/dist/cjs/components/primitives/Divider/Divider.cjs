const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Typography = require('../Typography/Typography.cjs');
const require_Divider_styles = require('./Divider.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Divider/Divider.tsx
/**
* Divider component for separating content sections.
*
* @example
* ```tsx
* // Basic horizontal divider
* <Divider />
*
* // Divider with text
* <Divider>OR</Divider>
*
* // Vertical divider
* <Divider orientation="vertical" />
*
* // Custom styled divider
* <Divider variant="dashed" color="#ccc">Continue with</Divider>
* ```
*/
const Divider = ({ orientation = "horizontal", variant = "solid", children, color, className, style,...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Divider_styles.default(theme, colorScheme, orientation, variant, color, !!children);
	if (orientation === "vertical") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("divider")), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("divider", "vertical")), styles["divider"], styles["vertical"], className),
		style,
		role: "separator",
		"aria-orientation": "vertical",
		...rest
	});
	if (children) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("divider")), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("divider", "horizontal")), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("divider", "with-text")), styles["divider"], styles["horizontal"], className),
		style,
		role: "separator",
		"aria-orientation": "horizontal",
		...rest,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("divider", "line")), styles["line"]) }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body2",
				color: "textSecondary",
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("divider", "text")), styles["text"]),
				inline: true,
				children
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("divider", "line")), styles["line"]) })
		]
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("divider")), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("divider", "horizontal")), styles["divider"], styles["horizontal"], className),
		style,
		role: "separator",
		"aria-orientation": "horizontal",
		...rest
	});
};
var Divider_default = Divider;

//#endregion
exports.default = Divider_default;
//# sourceMappingURL=Divider.cjs.map