import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Typography_styles_default from "./Typography.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";
import { cx } from "@emotion/css";

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
	const { theme, colorScheme } = useTheme_default();
	const styles = Typography_styles_default(theme, colorScheme, variant, align, color, noWrap, inline, gutterBottom, fontWeight, fontSize, lineHeight);
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
	return /* @__PURE__ */ jsx(Component, {
		className: cx(withVendorCSSClassPrefix(bem("typography")), withVendorCSSClassPrefix(bem("typography", variant)), styles["typography"], getVariantClass(variant), noWrap && styles["typographyNoWrap"], inline && styles["typographyInline"], gutterBottom && styles["typographyGutterBottom"], className),
		style,
		...rest,
		children
	});
};
var Typography_default = Typography;

//#endregion
export { Typography_default as default };
//# sourceMappingURL=Typography.js.map