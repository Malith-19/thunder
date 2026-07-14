import { jsx, jsxs } from "react/jsx-runtime";
import { getDisplayNameForCode, toFlagEmoji } from "@thunderid/i18n";
import { Box, Button, CircularProgress, IconButton, PageTitle, Typography } from "@wso2/oxygen-ui";
import { ArrowLeft } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation("translations");
	return /* @__PURE__ */ jsxs(PageTitle, { children: [/* @__PURE__ */ jsx(PageTitle.Header, { children: /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			alignItems: "center",
			gap: 1
		},
		children: [/* @__PURE__ */ jsx(IconButton, {
			onClick: onBack,
			children: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 })
		}), selectedLanguage ? /* @__PURE__ */ jsxs(Box, {
			sx: {
				display: "flex",
				alignItems: "center",
				gap: 1
			},
			children: [/* @__PURE__ */ jsx(Typography, {
				component: "span",
				sx: {
					fontSize: "inherit",
					userSelect: "none"
				},
				children: toFlagEmoji(selectedLanguage)
			}), getDisplayNameForCode(selectedLanguage)]
		}) : t("page.title")]
	}) }), /* @__PURE__ */ jsx(PageTitle.Actions, { children: /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			gap: 1,
			alignItems: "center"
		},
		children: [
			hasDirtyChanges && /* @__PURE__ */ jsx(Typography, {
				variant: "caption",
				color: "warning.main",
				sx: { fontWeight: 500 },
				children: t("editor.unsavedCount", { count: dirtyCount })
			}),
			/* @__PURE__ */ jsx(Button, {
				size: "small",
				onClick: onDiscard,
				disabled: !hasDirtyChanges || isSaving,
				children: t("actions.discardChanges")
			}),
			!isFallbackLanguage && /* @__PURE__ */ jsx(Button, {
				size: "small",
				onClick: onResetToDefault,
				disabled: !hasNamespace || isSaving,
				children: t("actions.resetToDefault")
			}),
			/* @__PURE__ */ jsx(Button, {
				size: "small",
				variant: "contained",
				onClick: onSave,
				disabled: !hasDirtyChanges || isSaving,
				startIcon: isSaving ? /* @__PURE__ */ jsx(CircularProgress, {
					size: 14,
					color: "inherit"
				}) : void 0,
				children: t("actions.saveChanges")
			})
		]
	}) })] });
}

//#endregion
export { TranslationEditorHeader as default };