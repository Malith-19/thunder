import useTheme_default from "../../../contexts/Theme/useTheme.js";
import FormControl_default from "../FormControl/FormControl.js";
import InputLabel_default from "../InputLabel/InputLabel.js";
import DatePicker_styles_default from "./DatePicker.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/DatePicker/DatePicker.tsx
const DatePicker = ({ label, error, className, required, disabled, helperText, dateFormat = "yyyy-MM-dd", style = {},...rest }) => {
	const { theme, colorScheme } = useTheme_default();
	const hasError = !!error;
	const styles = DatePicker_styles_default(theme, colorScheme, hasError, !!disabled);
	return /* @__PURE__ */ jsxs(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("date-picker")), className),
		style,
		children: [label && /* @__PURE__ */ jsx(InputLabel_default, {
			required,
			error: hasError,
			className: cx(withVendorCSSClassPrefix(bem("date-picker", "label")), styles["label"]),
			children: label
		}), /* @__PURE__ */ jsx("input", {
			type: "date",
			pattern: "\\d{4}-\\d{2}-\\d{2}",
			placeholder: dateFormat,
			className: cx(withVendorCSSClassPrefix(bem("date-picker", "input")), styles["input"], styles["errorInput"], styles["disabledInput"], {
				[withVendorCSSClassPrefix(bem("date-picker", "input", "error"))]: hasError,
				[withVendorCSSClassPrefix(bem("date-picker", "input", "disabled"))]: disabled
			}),
			disabled,
			"aria-invalid": hasError,
			"aria-required": required,
			...rest
		})]
	});
};
var DatePicker_default = DatePicker;

//#endregion
export { DatePicker_default as default };
//# sourceMappingURL=DatePicker.js.map