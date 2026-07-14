import useTheme_default from "../../../contexts/Theme/useTheme.js";
import TextField_default from "../TextField/TextField.js";
import Plus_default from "../Icons/Plus.js";
import X_default from "../Icons/X.js";
import KeyValueInput_styles_default from "./KeyValueInput.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { useCallback, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/KeyValueInput/KeyValueInput.tsx
/**
* KeyValueInput component allows users to manage key-value pairs with add/remove functionality.
* It provides a user-friendly interface for editing organization attributes or similar data structures.
*
* @example
* ```tsx
* // Basic usage
* <KeyValueInput
*   label="Organization Attributes"
*   onChange={(pairs) => console.log(pairs)}
* />
*
* // With initial values
* <KeyValueInput
*   label="Organization Attributes"
*   value={{department: 'IT', location: 'New York'}}
*   onChange={(pairs) => console.log(pairs)}
* />
*
* // With add/remove callbacks
* <KeyValueInput
*   label="Custom Attributes"
*   value={attributes}
*   onChange={(pairs) => setAttributes(pairs)}
*   onAdd={(pair) => console.log('Added:', pair)}
*   onRemove={(pair, index) => console.log('Removed:', pair, 'at index:', index)}
* />
* ```
*/
const KeyValueInput = ({ className = "", disabled = false, error, helperText, keyLabel = "Key", keyPlaceholder = "Enter key", label, maxPairs, onChange, onAdd, onRemove, readOnly = false, removeButtonText = "Remove", required = false, value = {}, valueLabel = "Value", valuePlaceholder = "Enter value" }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = KeyValueInput_styles_default(theme, colorScheme, disabled, readOnly, !!error);
	const [pairs, setPairs] = useState(Array.isArray(value) ? value : Object.entries(value).map(([key, val]) => ({
		key,
		value: String(val)
	})));
	const [newKey, setNewKey] = useState("");
	const [newValue, setNewValue] = useState("");
	const handleAddPair = useCallback(() => {
		if (!newKey.trim() || !newValue.trim()) return;
		if (maxPairs && pairs.length >= maxPairs) return;
		const newPair = {
			key: newKey.trim(),
			value: newValue.trim()
		};
		const updatedPairs = [...pairs, newPair];
		setPairs(updatedPairs);
		setNewKey("");
		setNewValue("");
		if (onChange) onChange(updatedPairs);
		if (onAdd) onAdd(newPair);
	}, [
		newKey,
		newValue,
		pairs,
		maxPairs,
		onChange,
		onAdd
	]);
	const handleRemovePair = useCallback((index) => {
		const pairToRemove = pairs[index];
		const updatedPairs = pairs.filter((_, i) => i !== index);
		setPairs(updatedPairs);
		if (onChange) onChange(updatedPairs);
		if (onRemove) onRemove(pairToRemove, index);
	}, [
		pairs,
		onChange,
		onRemove
	]);
	const handleUpdatePair = useCallback((index, field, newVal) => {
		const updatedPairs = pairs.map((pair, i) => {
			if (i === index) return {
				...pair,
				[field]: newVal
			};
			return pair;
		});
		setPairs(updatedPairs);
		if (onChange) onChange(updatedPairs);
	}, [pairs, onChange]);
	const canAddMore = !maxPairs || pairs.length < maxPairs;
	const isAddDisabled = disabled || readOnly || !canAddMore || !newKey.trim() || !newValue.trim();
	const renderReadOnlyContent = () => {
		if (pairs.length === 0) return /* @__PURE__ */ jsx("div", {
			className: cx(withVendorCSSClassPrefix(bem("key-value-input", "empty-state")), styles["emptyState"]),
			children: "No attributes defined"
		});
		return pairs.map((pair, index) => /* @__PURE__ */ jsxs("div", {
			className: cx(withVendorCSSClassPrefix(bem("key-value-input", "readonly-pair")), styles["readOnlyPair"]),
			children: [/* @__PURE__ */ jsxs("span", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "readonly-key")), styles["readOnlyKey"]),
				children: [pair.key, ":"]
			}), /* @__PURE__ */ jsx("span", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "readonly-value")), styles["readOnlyValue"]),
				children: pair.value
			})]
		}, `${pair.key}-${index}`));
	};
	return /* @__PURE__ */ jsxs("div", {
		className: cx(withVendorCSSClassPrefix(bem("key-value-input")), styles["container"], className),
		children: [
			label && /* @__PURE__ */ jsxs("label", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "label")), styles["label"]),
				children: [label, required && /* @__PURE__ */ jsx("span", {
					className: cx(withVendorCSSClassPrefix(bem("key-value-input", "required")), styles["requiredIndicator"]),
					children: " *"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pairs-list")), styles["pairsList"]),
				children: [readOnly ? renderReadOnlyContent() : pairs.map((pair, index) => /* @__PURE__ */ jsxs("div", {
					className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pair-row")), styles["pairRow"]),
					children: [
						/* @__PURE__ */ jsx(TextField_default, {
							placeholder: keyPlaceholder,
							value: pair.key,
							onChange: (e) => handleUpdatePair(index, "key", e.target.value),
							disabled: disabled || readOnly,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pair-input")), styles["pairInput"]),
							"aria-label": `${keyLabel} ${index + 1}`
						}),
						/* @__PURE__ */ jsx(TextField_default, {
							placeholder: valuePlaceholder,
							value: pair.value,
							onChange: (e) => handleUpdatePair(index, "value", e.target.value),
							disabled: disabled || readOnly,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pair-input")), styles["pairInput"]),
							"aria-label": `${valueLabel} ${index + 1}`
						}),
						!readOnly && /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => handleRemovePair(index),
							disabled,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "remove-button")), styles["removeButton"]),
							"aria-label": `${removeButtonText} ${pair.key}`,
							children: /* @__PURE__ */ jsx(X_default, {
								width: 16,
								height: 16
							})
						})
					]
				}, `${pair.key}-${index}`)), !readOnly && /* @__PURE__ */ jsxs("div", {
					className: cx(withVendorCSSClassPrefix(bem("key-value-input", "add-row")), styles["addRow"]),
					children: [
						/* @__PURE__ */ jsx(TextField_default, {
							placeholder: keyPlaceholder,
							value: newKey,
							onChange: (e) => setNewKey(e.target.value),
							disabled,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pair-input")), styles["pairInput"]),
							"aria-label": "New key"
						}),
						/* @__PURE__ */ jsx(TextField_default, {
							placeholder: valuePlaceholder,
							value: newValue,
							onChange: (e) => setNewValue(e.target.value),
							disabled,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "pair-input")), styles["pairInput"]),
							"aria-label": "New value",
							onKeyPress: (e) => {
								if (e.key === "Enter" && !isAddDisabled) handleAddPair();
							}
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: handleAddPair,
							disabled: isAddDisabled,
							className: cx(withVendorCSSClassPrefix(bem("key-value-input", "add-button")), styles["addButton"]),
							"aria-label": "Add new key-value pair",
							children: /* @__PURE__ */ jsx(Plus_default, {
								width: 16,
								height: 16
							})
						})
					]
				})]
			}),
			(helperText || error) && /* @__PURE__ */ jsx("div", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "helper-text")), styles["helperText"]),
				children: error || helperText
			}),
			maxPairs && /* @__PURE__ */ jsxs("div", {
				className: cx(withVendorCSSClassPrefix(bem("key-value-input", "counter")), styles["counterText"]),
				children: [
					pairs.length,
					" of ",
					maxPairs,
					" pairs used"
				]
			})
		]
	});
};
var KeyValueInput_default = KeyValueInput;

//#endregion
export { KeyValueInput_default as default };
//# sourceMappingURL=KeyValueInput.js.map