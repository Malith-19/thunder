import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Box, Button, FormControl, FormLabel, IconButton, TextField, Tooltip, Typography } from "@wso2/oxygen-ui";
import { Plus, RotateCcw } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";

//#region src/components/edit-translation/TranslationFieldsView.tsx
/**
* Scrollable list of translation key-value fields with inline dirty-state
* highlighting and per-field reset controls.
*
* Filters the displayed keys by the provided search query. Shows an empty-state
* message when there are no matching keys or no keys at all. Fields that differ
* from their server-saved values are highlighted with a warning border, and a
* reset icon button is shown to restore the saved value.
*
* @param props - The component props
* @param props.localValues - Current display values (server values merged with local edits)
* @param props.serverValues - Original server values used to detect dirtiness and to reset
* @param props.search - Current search query used to filter visible translation keys
* @param props.onChange - Callback invoked when the user edits a field value
* @param props.onResetField - Callback invoked when the user resets a field to its saved value
*
* @returns JSX element rendering the list of translation fields
*
* @example
* ```tsx
* import TranslationFieldsView from './TranslationFieldsView';
*
* function Editor() {
*   const [changes, setChanges] = useState<Record<string, string>>({});
*   return (
*     <TranslationFieldsView
*       localValues={{'actions.save': 'Enregistrer'}}
*       serverValues={{'actions.save': 'Save'}}
*       search=""
*       onChange={(key, val) => setChanges(prev => ({...prev, [key]: val}))}
*       onResetField={(key) => setChanges(prev => { const n = {...prev}; delete n[key]; return n; })}
*     />
*   );
* }
* ```
*
* @public
*/
function TranslationFieldsView({ localValues, serverValues, search, isCustomNamespace, onChange, onResetField }) {
	const { t } = useTranslation("translations");
	const [addingKey, setAddingKey] = useState(false);
	const [newKey, setNewKey] = useState("");
	const [newValue, setNewValue] = useState("");
	const allKeys = Object.keys(localValues);
	const filteredKeys = useMemo(() => {
		const q = search.toLowerCase();
		if (!q) return allKeys;
		return allKeys.filter((k) => k.toLowerCase().includes(q) || (localValues[k] ?? "").toLowerCase().includes(q));
	}, [
		allKeys,
		localValues,
		search
	]);
	const isDuplicateKey = newKey.trim() !== "" && newKey.trim() in localValues;
	const handleAddSubmit = () => {
		const key = newKey.trim();
		if (!key || isDuplicateKey) return;
		onChange(key, newValue);
		setNewKey("");
		setNewValue("");
		setAddingKey(false);
	};
	const handleAddCancel = () => {
		setNewKey("");
		setNewValue("");
		setAddingKey(false);
	};
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			gap: 2
		},
		children: [isCustomNamespace && /* @__PURE__ */ jsx(Box, { children: !addingKey ? /* @__PURE__ */ jsx(Button, {
			size: "small",
			startIcon: /* @__PURE__ */ jsx(Plus, { size: 14 }),
			onClick: () => setAddingKey(true),
			sx: { textTransform: "none" },
			children: t("editor.addKey")
		}) : /* @__PURE__ */ jsxs(Box, {
			sx: {
				display: "flex",
				flexDirection: "column",
				gap: 1,
				p: 1.5,
				border: "1px solid",
				borderColor: "divider",
				borderRadius: 1
			},
			children: [
				/* @__PURE__ */ jsxs(FormControl, {
					fullWidth: true,
					children: [/* @__PURE__ */ jsx(FormLabel, {
						htmlFor: "new-translation-key",
						children: t("editor.addKey.keyLabel")
					}), /* @__PURE__ */ jsx(TextField, {
						id: "new-translation-key",
						size: "small",
						placeholder: t("editor.addKey.keyPlaceholder"),
						value: newKey,
						onChange: (e) => setNewKey(e.target.value),
						error: isDuplicateKey,
						helperText: isDuplicateKey ? t("editor.addKey.duplicateKey") : void 0,
						sx: { "& .MuiInputBase-input": {
							fontFamily: "monospace",
							fontSize: "0.8rem"
						} }
					})]
				}),
				/* @__PURE__ */ jsxs(FormControl, {
					fullWidth: true,
					children: [/* @__PURE__ */ jsx(FormLabel, {
						htmlFor: "new-translation-value",
						children: t("editor.addKey.valueLabel")
					}), /* @__PURE__ */ jsx(TextField, {
						id: "new-translation-value",
						size: "small",
						placeholder: t("editor.addKey.valuePlaceholder"),
						value: newValue,
						onChange: (e) => setNewValue(e.target.value),
						multiline: true,
						minRows: 1,
						maxRows: 4
					})]
				}),
				/* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						gap: 1
					},
					children: [/* @__PURE__ */ jsx(Button, {
						size: "small",
						variant: "contained",
						onClick: handleAddSubmit,
						disabled: !newKey.trim() || isDuplicateKey,
						sx: { textTransform: "none" },
						children: t("editor.addKey.submit")
					}), /* @__PURE__ */ jsx(Button, {
						size: "small",
						onClick: handleAddCancel,
						sx: { textTransform: "none" },
						children: t("editor.addKey.cancel")
					})]
				})
			]
		}) }), filteredKeys.length === 0 ? /* @__PURE__ */ jsx(Box, {
			sx: {
				py: 4,
				textAlign: "center",
				color: "text.secondary"
			},
			children: /* @__PURE__ */ jsx(Typography, {
				variant: "body2",
				children: t(search ? "editor.noResults" : "editor.noKeys")
			})
		}) : filteredKeys.map((key) => {
			const value = localValues[key] ?? "";
			const isDirty = value !== (serverValues[key] ?? "");
			return /* @__PURE__ */ jsxs(FormControl, {
				fullWidth: true,
				children: [/* @__PURE__ */ jsx(FormLabel, {
					htmlFor: `field-${key}`,
					sx: {
						fontFamily: "monospace",
						fontSize: "0.7rem",
						fontWeight: isDirty ? 600 : 400,
						color: isDirty ? "warning.main" : "text.secondary"
					},
					children: key
				}), /* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						gap: .5,
						alignItems: "flex-start"
					},
					children: [/* @__PURE__ */ jsx(TextField, {
						id: `field-${key}`,
						size: "small",
						fullWidth: true,
						multiline: true,
						minRows: 1,
						maxRows: 5,
						value,
						onChange: (e) => onChange(key, e.target.value),
						sx: { "& .MuiOutlinedInput-root": isDirty ? {
							"& fieldset": { borderColor: "warning.main" },
							"&:hover fieldset": { borderColor: "warning.dark" },
							"&.Mui-focused fieldset": { borderColor: "warning.main" }
						} : {} }
					}), isDirty && /* @__PURE__ */ jsx(Tooltip, {
						title: t("editor.resetField"),
						children: /* @__PURE__ */ jsx(IconButton, {
							size: "small",
							"aria-label": t("editor.resetField"),
							onClick: () => onResetField(key),
							sx: {
								mt: .25,
								flexShrink: 0
							},
							children: /* @__PURE__ */ jsx(RotateCcw, { size: 14 })
						})
					})]
				})]
			}, key);
		})]
	});
}

//#endregion
export { TranslationFieldsView as default };