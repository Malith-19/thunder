const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/ArrayFieldInput.tsx
/**
* Array input component for adding multiple values as chips
*/
function ArrayFieldInput({ value, onChange, fieldLabel }) {
	const [inputValue, setInputValue] = (0, react.useState)("");
	const currentValue = Array.isArray(value) ? value : [];
	const handleAdd = () => {
		if (inputValue.trim()) {
			onChange([...currentValue, inputValue.trim()]);
			setInputValue("");
		}
	};
	const handleDelete = (indexToDelete) => {
		onChange(currentValue.filter((_, index) => index !== indexToDelete));
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAdd();
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			gap: 1,
			mb: 1
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
			value: inputValue,
			onChange: (e) => setInputValue(e.target.value),
			onKeyDown: handleKeyDown,
			placeholder: `Add ${fieldLabel.toLowerCase()}`,
			fullWidth: true,
			size: "small",
			variant: "outlined"
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
			size: "small",
			onClick: handleAdd,
			disabled: !inputValue.trim(),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Plus, { size: 16 })
		})]
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			flexWrap: "wrap",
			gap: 1
		},
		children: currentValue.length > 0 && currentValue.map((item, itemIndex) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Chip, {
			label: String(item),
			onDelete: () => handleDelete(itemIndex),
			variant: "outlined",
			size: "medium"
		}, `chip-${item}`))
	})] });
}
var ArrayFieldInput_default = ArrayFieldInput;

//#endregion
exports.default = ArrayFieldInput_default;