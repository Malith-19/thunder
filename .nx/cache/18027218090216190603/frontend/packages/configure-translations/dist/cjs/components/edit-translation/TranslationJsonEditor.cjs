const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __monaco_editor_react = require("@monaco-editor/react");
__monaco_editor_react = require_rolldown_runtime.__toESM(__monaco_editor_react);

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
	const { t } = (0, react_i18next.useTranslation)("translations");
	const [jsonText, setJsonText] = (0, react.useState)(() => JSON.stringify(values, null, 2));
	const [jsonError, setJsonError] = (0, react.useState)(false);
	const debounceRef = (0, react.useRef)(null);
	const [prevValues, setPrevValues] = (0, react.useState)(values);
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			flexDirection: "column",
			height: "100%"
		},
		children: [
			!isCustomNamespace && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				severity: "info",
				sx: {
					flexShrink: 0,
					borderRadius: 0,
					border: "none"
				},
				children: t("editor.readOnlyKeys")
			}),
			jsonError && jsonText.trim().length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Alert, {
				severity: "warning",
				sx: {
					flexShrink: 0,
					borderRadius: 0,
					border: "none"
				},
				children: t("editor.jsonInvalid")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
				sx: {
					flex: 1,
					overflow: "hidden",
					borderRadius: 0,
					border: "1px solid",
					borderColor: jsonError ? "warning.main" : "divider"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__monaco_editor_react.default, {
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
exports.default = TranslationJsonEditor;