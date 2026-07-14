const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Typography_styles = require('./Typography.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Typography/Typography.tsx
const variantMapping = {
	body1: "p",
	body2: "p",
	button: "span",
	caption: "span",
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	overline: "span",
	subtitle1: "h6",
	subtitle2: "h6"
};
/**
* Typography component for consistent text rendering throughout the application.
* Integrates with the theme system and provides semantic HTML elements.
*/
const Typography = ({ children, variant = "body1", component, align = "left", color = "textPrimary", noWrap = false, className, style = {}, inline = false, fontWeight, fontSize, lineHeight, gutterBottom = false,...rest }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Typography_styles.default(theme, colorScheme, variant, align, color, noWrap, inline, gutterBottom, fontWeight, fontSize, lineHeight);
	const Component = component || variantMapping[variant] || "span";
	const getVariantClass = (variantName) => {
		switch (variantName) {
			case "h1": return styles["typographyH1"];
			case "h2": return styles["typographyH2"];
			case "h3": return styles["typographyH3"];
			case "h4": return styles["typographyH4"];
			case "h5": return styles["typographyH5"];
			case "h6": return styles["typographyH6"];
			case "subtitle1": return styles["typographySubtitle1"];
			case "subtitle2": return styles["typographySubtitle2"];
			case "body1": return styles["typographyBody1"];
			case "body2": return styles["typographyBody2"];
			case "caption": return styles["typographyCaption"];
			case "overline": return styles["typographyOverline"];
			case "button": return styles["typographyButton"];
			default: return "";
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Component, {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("typography")), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("typography", variant)), styles["typography"], getVariantClass(variant), noWrap && styles["typographyNoWrap"], inline && styles["typographyInline"], gutterBottom && styles["typographyGutterBottom"], className),
		style,
		...rest,
		children
	});
};
var Typography_default = Typography;

//#endregion
exports.default = Typography_default;
//# sourceMappingURL=Typography.cjs.map