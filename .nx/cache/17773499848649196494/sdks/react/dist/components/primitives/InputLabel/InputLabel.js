import useTheme_default from "../../../contexts/Theme/useTheme.js";
import InputLabel_styles_default from "./InputLabel.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/InputLabel/InputLabel.tsx
const InputLabel = ({ children, required = false, error = false, variant = "block", marginBottom, className, style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = InputLabel_styles_default(theme, colorScheme, variant, error, marginBottom);
	return /* @__PURE__ */ jsxs("label", {
		className: cx(withVendorCSSClassPrefix(bem("input-label")), withVendorCSSClassPrefix(bem("input-label", variant)), styles["label"], variant === "block" ? styles["block"] : styles["inline"], {
			[withVendorCSSClassPrefix(bem("input-label", "error"))]: error,
			[styles["error"]]: error
		}, className),
		style,
		...rest,
		children: [children, required && /* @__PURE__ */ jsx("span", {
			className: cx(withVendorCSSClassPrefix(bem("input-label", "required")), styles["requiredIndicator"]),
			children: " *"
		})]
	});
};
var InputLabel_default = InputLabel;

//#endregion
export { InputLabel_default as default };
//# sourceMappingURL=InputLabel.js.map