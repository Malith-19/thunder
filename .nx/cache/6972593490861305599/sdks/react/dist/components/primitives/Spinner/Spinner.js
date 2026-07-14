import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Spinner_styles_default from "./Spinner.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";
import { cx } from "@emotion/css";

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
	const { theme, colorScheme } = useTheme_default();
	const styles = Spinner_styles_default(theme, colorScheme, size, color);
	return /* @__PURE__ */ jsx("span", {
		className: cx(withVendorCSSClassPrefix(bem("spinner")), styles["spinner"], size === "small" && styles["spinnerSmall"], size === "medium" && styles["spinnerMedium"], size === "large" && styles["spinnerLarge"], className),
		style,
		role: "status",
		"aria-label": "Loading"
	});
};
var Spinner_default = Spinner;

//#endregion
export { Spinner_default as default };
//# sourceMappingURL=Spinner.js.map