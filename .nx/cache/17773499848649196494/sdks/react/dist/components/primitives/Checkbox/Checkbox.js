import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Checkbox_styles_default from "./Checkbox.styles.js";
import FormControl_default from "../FormControl/FormControl.js";
import InputLabel_default from "../InputLabel/InputLabel.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/Checkbox/Checkbox.tsx
const Checkbox = ({ label, error, className, required, helperText, style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const hasError = !!error;
	const styles = Checkbox_styles_default(theme, colorScheme, hasError, !!required);
	return /* @__PURE__ */ jsx(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("checkbox")), className),
		helperTextMarginLeft: `calc(${theme.vars.spacing.unit} * 3.5)`,
		children: /* @__PURE__ */ jsxs("div", {
			style,
			className: cx(withVendorCSSClassPrefix(bem("checkbox", "container")), styles["container"]),
			children: [/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				className: cx(withVendorCSSClassPrefix(bem("checkbox", "input")), styles["input"], styles["errorInput"], { [withVendorCSSClassPrefix(bem("checkbox", "input", "error"))]: hasError }),
				"aria-invalid": hasError,
				"aria-required": required,
				...rest
			}), label && /* @__PURE__ */ jsx(InputLabel_default, {
				required,
				error: hasError,
				variant: "inline",
				className: cx(withVendorCSSClassPrefix(bem("checkbox", "label")), styles["label"], styles["errorLabel"], { [withVendorCSSClassPrefix(bem("checkbox", "label", "error"))]: hasError }),
				children: label
			})]
		})
	});
};
var Checkbox_default = Checkbox;

//#endregion
export { Checkbox_default as default };
//# sourceMappingURL=Checkbox.js.map