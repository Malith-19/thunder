import { useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Alert, Box } from "@wso2/oxygen-ui";
import { useTranslation } from "react-i18next";
import Editor from "@monaco-editor/react";

//#region src/components/edit-translation/TranslationJsonEditor.tsx
/**
* Monaco-based JSON editor for bulk-editing translation key-value pairs.
*
* Displays the current translation values as formatted JSON and notifies the
* parent whenever the editor content is valid JSON that parses to a flat
* `Record<string, string>`. Invalid JSON is indicated with a warning alert;
* the {@link TranslationJsonEditorProps.onChange} callback is suppressed until
* the content is valid again.
*
* @param props - The component props
* @param props.values - Current merged translation values shown in the editor
* @param props.colorMode - Current color mode used to apply the Monaco editor theme
* @param props.onChange - Callback invoked with the parsed record when the JSON is valid
*
* @returns JSX element rendering the Monaco JSON editor
*
* @example
* ```tsx
* import TranslationJsonEditor from './TranslationJsonEditor';
*
* function Editor() {
*   const [changes, setChanges] = useState<Record<string, string>>({});
*   return (
*     <TranslationJsonEditor
*       values={{'actions.save': 'Save'}}
*       colorMode="light"
*       onChange={setChanges}
*     />
*   );
* }
* ```
*
* @public
*/
function TranslationJsonEditor({ values, serverKeys, isCustomNamespace, colorMode, onChange }) {
	const { t } = useTranslation("translations");
	const [jsonText, setJsonText] = useState(() => JSON.stringify(values, null, 2));
	const [jsonError, setJsonError] = useState(false);
	const debounceRef = useRef(null);
	const [prevValues, setPrevValues] = useState(values);
	if (prevValues !== values) {
		setPrevValues(values);
		setJsonText(JSON.stringify(values, null, 2));
		setJsonError(false);
	}
	const handleEditorChange = (raw) => {
		const text = raw ?? "";
		setJsonText(text);
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			try {
				const parsed = JSON.parse(text);
				if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
					const record = parsed;
					let stringRecord = Object.fromEntries(Object.entries(record).filter(([, v]) => typeof v === "string"));
					if (!isCustomNamespace) {
						const allowed = new Set(serverKeys);
						stringRecord = Object.fromEntries(Object.entries(stringRecord).filter(([k]) => allowed.has(k)));
					}
					setJsonError(false);
					onChange(stringRecord);
				} else setJsonError(true);
			} catch {
				setJsonError(true);
			}
		}, 400);
	};
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			height: "100%"
		},
		children: [
			!isCustomNamespace && /* @__PURE__ */ jsx(Alert, {
				severity: "info",
				sx: {
					flexShrink: 0,
					borderRadius: 0,
					border: "none"
				},
				children: t("editor.readOnlyKeys")
			}),
			jsonError && jsonText.trim().length > 0 && /* @__PURE__ */ jsx(Alert, {
				severity: "warning",
				sx: {
					flexShrink: 0,
					borderRadius: 0,
					border: "none"
				},
				children: t("editor.jsonInvalid")
			}),
			/* @__PURE__ */ jsx(Box, {
				sx: {
					flex: 1,
					overflow: "hidden",
					borderRadius: 0,
					border: "1px solid",
					borderColor: jsonError ? "warning.main" : "divider"
				},
				children: /* @__PURE__ */ jsx(Editor, {
					height: "100%",
					language: "json",
					theme: colorMode === "dark" ? "vs-dark" : "vs",
					value: jsonText,
					onChange: handleEditorChange,
					options: {
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						automaticLayout: true,
						fontSize: 12,
						tabSize: 2,
						wordWrap: "on",
						lineNumbers: "off",
						folding: false
					}
				})
			})
		]
	});
}

//#endregion
export { TranslationJsonEditor as default };