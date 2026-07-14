import useTheme_default from "../../../contexts/Theme/useTheme.js";
import FormControl_default from "../FormControl/FormControl.js";
import InputLabel_default from "../InputLabel/InputLabel.js";
import Toggle_styles_default from "./Toggle.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

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
	const { theme, colorScheme } = useTheme_default();
	const hasError = !!error;
	const styles = Toggle_styles_default(theme, colorScheme, hasError, !!required);
	return /* @__PURE__ */ jsx(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("toggle")), className),
		helperTextMarginLeft: `calc(${theme.vars.spacing.unit} * 5.5)`,
		children: /* @__PURE__ */ jsxs("label", {
			style,
			className: cx(withVendorCSSClassPrefix(bem("toggle", "container")), styles["container"]),
			children: [
				/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					role: "switch",
					className: cx(withVendorCSSClassPrefix(bem("toggle", "input")), styles["input"]),
					"aria-invalid": hasError,
					"aria-required": required,
					...rest
				}),
				/* @__PURE__ */ jsx("div", {
					className: cx(withVendorCSSClassPrefix(bem("toggle", "track")), styles["track"]),
					children: /* @__PURE__ */ jsx("span", { className: cx(withVendorCSSClassPrefix(bem("toggle", "thumb")), styles["thumb"]) })
				}),
				label && /* @__PURE__ */ jsx(InputLabel_default, {
					required,
					error: hasError,
					variant: "inline",
					className: cx(withVendorCSSClassPrefix(bem("toggle", "label")), styles["label"], styles["errorLabel"], { [withVendorCSSClassPrefix(bem("toggle", "label", "error"))]: hasError }),
					children: label
				})
			]
		})
	});
};
var Toggle_default = Toggle;

//#endregion
export { Toggle_default as default };
//# sourceMappingURL=Toggle.js.map