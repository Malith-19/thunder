import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Typography_default from "../Typography/Typography.js";
import Divider_styles_default from "./Divider.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

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
	const { theme, colorScheme } = useTheme_default();
	const styles = Divider_styles_default(theme, colorScheme, orientation, variant, color, !!children);
	if (orientation === "vertical") return /* @__PURE__ */ jsx("div", {
		className: cx(withVendorCSSClassPrefix(bem("divider")), withVendorCSSClassPrefix(bem("divider", "vertical")), styles["divider"], styles["vertical"], className),
		style,
		role: "separator",
		"aria-orientation": "vertical",
		...rest
	});
	if (children) return /* @__PURE__ */ jsxs("div", {
		className: cx(withVendorCSSClassPrefix(bem("divider")), withVendorCSSClassPrefix(bem("divider", "horizontal")), withVendorCSSClassPrefix(bem("divider", "with-text")), styles["divider"], styles["horizontal"], className),
		style,
		role: "separator",
		"aria-orientation": "horizontal",
		...rest,
		children: [
			/* @__PURE__ */ jsx("div", { className: cx(withVendorCSSClassPrefix(bem("divider", "line")), styles["line"]) }),
			/* @__PURE__ */ jsx(Typography_default, {
				variant: "body2",
				color: "textSecondary",
				className: cx(withVendorCSSClassPrefix(bem("divider", "text")), styles["text"]),
				inline: true,
				children
			}),
			/* @__PURE__ */ jsx("div", { className: cx(withVendorCSSClassPrefix(bem("divider", "line")), styles["line"]) })
		]
	});
	return /* @__PURE__ */ jsx("div", {
		className: cx(withVendorCSSClassPrefix(bem("divider")), withVendorCSSClassPrefix(bem("divider", "horizontal")), styles["divider"], styles["horizontal"], className),
		style,
		role: "separator",
		"aria-orientation": "horizontal",
		...rest
	});
};
var Divider_default = Divider;

//#endregion
export { Divider_default as default };
//# sourceMappingURL=Divider.js.map