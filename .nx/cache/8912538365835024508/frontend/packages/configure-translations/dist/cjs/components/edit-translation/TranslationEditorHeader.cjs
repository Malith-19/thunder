const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_i18n = require("@thunderid/i18n");
__thunderid_i18n = require_rolldown_runtime.__toESM(__thunderid_i18n);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

//#region src/components/edit-translation/TranslationEditorHeader.tsx
/**
* Page title bar for the translations editor. Renders a back button, the
* current language name with its flag, and the action buttons (Discard,
* Reset to Default, Save).
*
* @param props - The component props
*
* @returns JSX element rendering the editor header
*
* @public
*/
function TranslationEditorHeader({ selectedLanguage, hasDirtyChanges, dirtyCount, isSaving, isFallbackLanguage, hasNamespace, onBack, onDiscard, onResetToDefault, onSave }) {
	const { t } = (0, react_i18next.useTranslation)("translations");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.PageTitle, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Header, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			alignItems: "center",
			gap: 1
		},
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
			onClick: onBack,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.ArrowLeft, { size: 16 })
		}), selectedLanguage ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
			sx: {
				display: "flex",
				alignItems: "center",
				gap: 1
			},
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				component: "span",
				sx: {
					fontSize: "inherit",
					userSelect: "none"
				},
				children: (0, __thunderid_i18n.toFlagEmoji)(selectedLanguage)
			}), (0, __thunderid_i18n.getDisplayNameForCode)(selectedLanguage)]
		}) : t("page.title")]
	}) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.PageTitle.Actions, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
		sx: {
			display: "flex",
			gap: 1,
			alignItems: "center"
		},
		children: [
			hasDirtyChanges && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "caption",
				color: "warning.main",
				sx: { fontWeight: 500 },
				children: t("editor.unsavedCount", { count: dirtyCount })
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				size: "small",
				onClick: onDiscard,
				disabled: !hasDirtyChanges || isSaving,
				children: t("actions.discardChanges")
			}),
			!isFallbackLanguage && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				size: "small",
				onClick: onResetToDefault,
				disabled: !hasNamespace || isSaving,
				children: t("actions.resetToDefault")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				size: "small",
				variant: "contained",
				onClick: onSave,
				disabled: !hasDirtyChanges || isSaving,
				startIcon: isSaving ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, {
					size: 14,
					color: "inherit"
				}) : void 0,
				children: t("actions.saveChanges")
			})
		]
	}) })] });
}

//#endregion
exports.default = TranslationEditorHeader;