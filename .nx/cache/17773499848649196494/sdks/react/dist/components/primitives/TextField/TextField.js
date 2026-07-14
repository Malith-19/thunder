import useTheme_default from "../../../contexts/Theme/useTheme.js";
import FormControl_default from "../FormControl/FormControl.js";
import InputLabel_default from "../InputLabel/InputLabel.js";
import TextField_styles_default from "./TextField.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/TextField/TextField.tsx
const TextField = ({ label, error, required, className, disabled, helperText, startIcon, endIcon, onStartIconClick, onEndIconClick, type = "text", style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const hasError = !!error;
	const styles = TextField_styles_default(theme, colorScheme, disabled ?? false, hasError, !!startIcon, !!endIcon);
	const inputClassName = cx(withVendorCSSClassPrefix(bem("text-field", "input")), styles["input"], hasError && styles["inputError"], disabled && styles["inputDisabled"]);
	const containerClassName = cx(withVendorCSSClassPrefix(bem("text-field", "container")), styles["inputContainer"]);
	const startIconClassName = cx(withVendorCSSClassPrefix(bem("text-field", "start-icon")), styles["startIcon"]);
	const endIconClassName = cx(withVendorCSSClassPrefix(bem("text-field", "end-icon")), styles["endIcon"]);
	return /* @__PURE__ */ jsxs(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("text-field")), className),
		style,
		children: [label && /* @__PURE__ */ jsx(InputLabel_default, {
			required,
			error: hasError,
			children: label
		}), /* @__PURE__ */ jsxs("div", {
			className: containerClassName,
			children: [
				startIcon && /* @__PURE__ */ jsx("div", {
					className: startIconClassName,
					onClick: onStartIconClick,
					role: onStartIconClick ? "button" : void 0,
					tabIndex: onStartIconClick && !disabled ? 0 : void 0,
					"aria-label": "Start icon",
					children: startIcon
				}),
				/* @__PURE__ */ jsx("input", {
					className: inputClassName,
					type,
					disabled,
					"aria-invalid": hasError,
					"aria-required": required,
					...rest
				}),
				endIcon && /* @__PURE__ */ jsx("div", {
					className: endIconClassName,
					onClick: onEndIconClick,
					role: onEndIconClick ? "button" : void 0,
					tabIndex: onEndIconClick && !disabled ? 0 : void 0,
					"aria-label": "End icon",
					children: endIcon
				})
			]
		})]
	});
};
var TextField_default = TextField;

//#endregion
export { TextField_default as default };
//# sourceMappingURL=TextField.js.map