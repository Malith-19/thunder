import useTheme_default from "../../../contexts/Theme/useTheme.js";
import FormControl_styles_default from "./FormControl.styles.js";
import Typography_default from "../Typography/Typography.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/FormControl/FormControl.tsx
const FormControl = ({ children, error, helperText, className, helperTextAlign = "left", helperTextMarginLeft }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = FormControl_styles_default(theme, colorScheme, helperTextAlign, helperTextMarginLeft, !!error);
	return /* @__PURE__ */ jsxs("div", {
		className: cx(withVendorCSSClassPrefix(bem("form-control")), styles["formControl"], className),
		children: [children, (error || helperText) && /* @__PURE__ */ jsx(Typography_default, {
			variant: "caption",
			color: error ? "error" : "textSecondary",
			className: cx(withVendorCSSClassPrefix(bem("form-control", "helper-text")), styles["helperText"], {
				[withVendorCSSClassPrefix(bem("form-control", "helper-text", "error"))]: !!error,
				[styles["helperTextError"]]: !!error
			}),
			children: error || helperText
		})]
	});
};
var FormControl_default = FormControl;

//#endregion
export { FormControl_default as default };
//# sourceMappingURL=FormControl.js.map