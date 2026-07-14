import { Box, Chip, IconButton, TextField } from "@wso2/oxygen-ui";
import { Plus } from "@wso2/oxygen-ui-icons-react";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/ArrayFieldInput.tsx
/**
* Array input component for adding multiple values as chips
*/
function ArrayFieldInput({ value, onChange, fieldLabel }) {
	const [inputValue, setInputValue] = useState("");
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
	return /* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			gap: 1,
			mb: 1
		},
		children: [/* @__PURE__ */ jsx(TextField, {
			value: inputValue,
			onChange: (e) => setInputValue(e.target.value),
			onKeyDown: handleKeyDown,
			placeholder: `Add ${fieldLabel.toLowerCase()}`,
			fullWidth: true,
			size: "small",
			variant: "outlined"
		}), /* @__PURE__ */ jsx(IconButton, {
			size: "small",
			onClick: handleAdd,
			disabled: !inputValue.trim(),
			children: /* @__PURE__ */ jsx(Plus, { size: 16 })
		})]
	}), /* @__PURE__ */ jsx(Box, {
		sx: {
			display: "flex",
			flexWrap: "wrap",
			gap: 1
		},
		children: currentValue.length > 0 && currentValue.map((item, itemIndex) => /* @__PURE__ */ jsx(Chip, {
			label: String(item),
			onDelete: () => handleDelete(itemIndex),
			variant: "outlined",
			size: "medium"
		}, `chip-${item}`))
	})] });
}
var ArrayFieldInput_default = ArrayFieldInput;

//#endregion
export { ArrayFieldInput_default as default };