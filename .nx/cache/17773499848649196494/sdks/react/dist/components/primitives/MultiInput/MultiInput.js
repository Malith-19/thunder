import useTheme_default from "../../../contexts/Theme/useTheme.js";
import FormControl_default from "../FormControl/FormControl.js";
import InputLabel_default from "../InputLabel/InputLabel.js";
import Checkbox_default from "../Checkbox/Checkbox.js";
import DatePicker_default from "../DatePicker/DatePicker.js";
import TextField_default from "../TextField/TextField.js";
import MultiInput_styles_default from "./MultiInput.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useCallback, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/MultiInput/MultiInput.tsx
const MultiInput = ({ label, error, required, className, disabled, helperText, placeholder = "Enter value", values = [], onChange, type = "text", fieldType = "STRING", startIcon, endIcon, minFields = 1, maxFields, style = {} }) => {
	const { theme, colorScheme } = useTheme_default();
	const canAddMore = !maxFields || values.length < maxFields;
	const canRemove = values.length > minFields;
	const styles = MultiInput_styles_default(theme, colorScheme, !!disabled, !!error, canAddMore, canRemove);
	const PlusIcon = ({ iconClassName }) => /* @__PURE__ */ jsx("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		className: cx(styles["icon"], iconClassName),
		children: /* @__PURE__ */ jsx("path", { d: "M12 5v14M5 12h14" })
	});
	const BinIcon = ({ iconClassName }) => /* @__PURE__ */ jsx("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		className: cx(styles["icon"], iconClassName),
		children: /* @__PURE__ */ jsx("path", { d: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6" })
	});
	const handleAddValue = useCallback((newValue) => {
		if (newValue.trim() !== "" && (!maxFields || values.length < maxFields)) onChange([...values, newValue.trim()]);
	}, [
		values,
		onChange,
		maxFields
	]);
	const handleRemoveValue = useCallback((index) => {
		if (values.length > minFields) onChange(values.filter((_, i) => i !== index));
	}, [
		values,
		onChange,
		minFields
	]);
	const renderInputField = useCallback((value, onValueChange, attachedEndIcon, onEndIconClick) => {
		const handleInputChange = (e) => {
			onValueChange(e.target ? e.target.value : e);
		};
		const handleKeyDown = (e) => {
			if (e.key === "Enter" && onEndIconClick) {
				e.preventDefault();
				onEndIconClick();
			}
		};
		const commonProps = {
			disabled,
			endIcon: attachedEndIcon || endIcon,
			error,
			onChange: handleInputChange,
			onEndIconClick,
			onKeyDown: handleKeyDown,
			placeholder,
			startIcon,
			value
		};
		switch (fieldType) {
			case "DATE_TIME": return /* @__PURE__ */ jsx(DatePicker_default, { ...commonProps });
			case "BOOLEAN": return /* @__PURE__ */ jsx(Checkbox_default, {
				...commonProps,
				checked: value === "true" || Boolean(value),
				onChange: (e) => onValueChange(e.target.checked ? "true" : "false")
			});
			default: return /* @__PURE__ */ jsx(TextField_default, {
				...commonProps,
				type
			});
		}
	}, [
		placeholder,
		disabled,
		startIcon,
		endIcon,
		error,
		fieldType,
		type
	]);
	const [currentInputValue, setCurrentInputValue] = useState("");
	const handleInputSubmit = useCallback(() => {
		if (currentInputValue.trim() !== "") {
			handleAddValue(currentInputValue);
			setCurrentInputValue("");
		}
	}, [currentInputValue, handleAddValue]);
	return /* @__PURE__ */ jsxs(FormControl_default, {
		error,
		helperText,
		className: cx(withVendorCSSClassPrefix(bem("multi-input")), className),
		style,
		children: [label && /* @__PURE__ */ jsx(InputLabel_default, {
			required,
			error: !!error,
			children: label
		}), /* @__PURE__ */ jsxs("div", {
			className: cx(withVendorCSSClassPrefix(bem("multi-input", "container")), styles["container"]),
			children: [/* @__PURE__ */ jsx("div", {
				className: cx(withVendorCSSClassPrefix(bem("multi-input", "input-row")), styles["inputRow"]),
				children: /* @__PURE__ */ jsx("div", {
					className: cx(withVendorCSSClassPrefix(bem("multi-input", "input-wrapper")), styles["inputWrapper"]),
					children: renderInputField(currentInputValue, setCurrentInputValue, canAddMore ? /* @__PURE__ */ jsx(PlusIcon, { iconClassName: styles["plusIcon"] }) : void 0, canAddMore ? handleInputSubmit : void 0)
				})
			}), values.length > 0 && /* @__PURE__ */ jsx("div", {
				className: cx(withVendorCSSClassPrefix(bem("multi-input", "list-container")), styles["listContainer"]),
				children: values.map((value, index) => /* @__PURE__ */ jsxs("div", {
					className: cx(withVendorCSSClassPrefix(bem("multi-input", "list-item")), styles["listItem"]),
					children: [/* @__PURE__ */ jsx("span", {
						className: cx(withVendorCSSClassPrefix(bem("multi-input", "list-item-text")), styles["listItemText"]),
						children: value
					}), canRemove && /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => handleRemoveValue(index),
						disabled,
						className: cx(withVendorCSSClassPrefix(bem("multi-input", "remove-button")), styles["removeButton"]),
						title: "Remove value",
						children: /* @__PURE__ */ jsx(BinIcon, { iconClassName: styles["icon"] })
					})]
				}, index))
			})]
		})]
	});
};
var MultiInput_default = MultiInput;

//#endregion
export { MultiInput_default as default };
//# sourceMappingURL=MultiInput.js.map