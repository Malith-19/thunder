const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_FormControl = require('../FormControl/FormControl.cjs');
const require_InputLabel = require('../InputLabel/InputLabel.cjs');
const require_Checkbox = require('../Checkbox/Checkbox.cjs');
const require_DatePicker = require('../DatePicker/DatePicker.cjs');
const require_TextField = require('../TextField/TextField.cjs');
const require_MultiInput_styles = require('./MultiInput.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/MultiInput/MultiInput.tsx
const MultiInput = ({ label, error, required, className, disabled, helperText, placeholder = "Enter value", values = [], onChange, type = "text", fieldType = "STRING", startIcon, endIcon, minFields = 1, maxFields, style = {} }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const canAddMore = !maxFields || values.length < maxFields;
	const canRemove = values.length > minFields;
	const styles = require_MultiInput_styles.default(theme, colorScheme, !!disabled, !!error, canAddMore, canRemove);
	const PlusIcon = ({ iconClassName }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		className: (0, __emotion_css.cx)(styles["icon"], iconClassName),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 5v14M5 12h14" })
	});
	const BinIcon = ({ iconClassName }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		className: (0, __emotion_css.cx)(styles["icon"], iconClassName),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6" })
	});
	const handleAddValue = (0, react.useCallback)((newValue) => {
		if (newValue.trim() !== "" && (!maxFields || values.length < maxFields)) onChange([...values, newValue.trim()]);
	}, [
		values,
		onChange,
		maxFields
	]);
	const handleRemoveValue = (0, react.useCallback)((index) => {
		if (values.length > minFields) onChange(values.filter((_, i) => i !== index));
	}, [
		values,
		onChange,
		minFields
	]);
	const renderInputField = (0, react.useCallback)((value, onValueChange, attachedEndIcon, onEndIconClick) => {
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
			case "DATE_TIME": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_DatePicker.default, { ...commonProps });
			case "BOOLEAN": return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Checkbox.default, {
				...commonProps,
				checked: value === "true" || Boolean(value),
				onChange: (e) => onValueChange(e.target.checked ? "true" : "false")
			});
			default: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TextField.default, {
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
	const [currentInputValue, setCurrentInputValue] = (0, react.useState)("");
	const handleInputSubmit = (0, react.useCallback)(() => {
		if (currentInputValue.trim() !== "") {
			handleAddValue(currentInputValue);
			setCurrentInputValue("");
		}
	}, [currentInputValue, handleAddValue]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_FormControl.default, {
		error,
		helperText,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("multi-input")), className),
		style,
		children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_InputLabel.default, {
			required,
			error: !!error,
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("multi-input", "container")), styles["container"]),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("multi-input", "input-row")), styles["inputRow"]),
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("multi-input", "input-wrapper")), styles["inputWrapper"]),
					children: renderInputField(currentInputValue, setCurrentInputValue, canAddMore ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PlusIcon, { iconClassName: styles["plusIcon"] }) : void 0, canAddMore ? handleInputSubmit : void 0)
				})
			}), values.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("multi-input", "list-container")), styles["listContainer"]),
				children: values.map((value, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("multi-input", "list-item")), styles["listItem"]),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("multi-input", "list-item-text")), styles["listItemText"]),
						children: value
					}), canRemove && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => handleRemoveValue(index),
						disabled,
						className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("multi-input", "remove-button")), styles["removeButton"]),
						title: "Remove value",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BinIcon, { iconClassName: styles["icon"] })
					})]
				}, index))
			})]
		})]
	});
};
var MultiInput_default = MultiInput;

//#endregion
exports.default = MultiInput_default;
//# sourceMappingURL=MultiInput.cjs.map