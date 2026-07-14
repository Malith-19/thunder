import useTheme_default from "../../../contexts/Theme/useTheme.js";
import FormControl_default from "../FormControl/FormControl.js";
import InputLabel_default from "../InputLabel/InputLabel.js";
import Select_styles_default from "./Select.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/Select/Select.tsx
const Select = ({ label, error, className, required, disabled, helperText, placeholder, options, style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const hasError = !!error;
	const styles = Select_styles_default(theme, colorScheme, disabled ?? false, hasError);
	const selectClassName = cx(withVendorCSSClassPrefix(bem("select", "input")), styles["select"], hasError && styles["selectError"], disabled && styles["selectDisabled"]);
	return /* @__PURE__ */ jsxs(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("select")), className),
		style,
		children: [label && /* @__PURE__ */ jsx(InputLabel_default, {
			required,
			error: hasError,
			children: label
		}), /* @__PURE__ */ jsxs("select", {
			className: selectClassName,
			disabled,
			"aria-invalid": hasError,
			"aria-required": required,
			...rest,
			children: [placeholder && /* @__PURE__ */ jsx("option", {
				value: "",
				disabled: true,
				children: placeholder
			}), options.map((option) => /* @__PURE__ */ jsx("option", {
				value: option.value,
				className: styles["option"],
				children: option.label
			}, option.value))]
		})]
	});
};
var Select_default = Select;

//#endregion
export { Select_default as default };
//# sourceMappingURL=Select.js.map