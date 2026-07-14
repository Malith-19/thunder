import TranslationFieldsView from "./TranslationFieldsView.js";
import TranslationJsonEditor from "./TranslationJsonEditor.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Box, Card, CircularProgress, Divider, InputAdornment, Tab, Tabs, TextField, Typography } from "@wso2/oxygen-ui";
import { Search } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";

//#region src/components/edit-translation/TranslationEditorCard.tsx
/**
* Tabbed card editor for translation key-value pairs. Renders a Fields view
* (searchable list of text inputs) and a Raw JSON view. Shows a loading
* spinner while data is being fetched.
*
* @param props - The component props
*
* @returns JSX element rendering the editor card
*
* @public
*/
function TranslationEditorCard({ selectedLanguage, isLoading, editView, search, currentValues, serverValues, isCustomNamespace, colorMode, onTabChange, onSearchChange, onFieldChange, onResetField, onJsonChange }) {
	const { t } = useTranslation("translations");
	return /* @__PURE__ */ jsx(Box, {
		sx: {
			flex: 1,
			overflow: "hidden",
			display: "flex",
			gap: 2.5,
			minHeight: 0
		},
		children: /* @__PURE__ */ jsxs(Card, {
			variant: "outlined",
			sx: {
				flex: 1,
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
				borderRadius: 2
			},
			children: [
				/* @__PURE__ */ jsx(Box, {
					sx: {
						px: 2.5,
						pt: 2,
						pb: 0,
						flexShrink: 0
					},
					children: /* @__PURE__ */ jsxs(Tabs, {
						value: editView,
						onChange: onTabChange,
						sx: { "& .MuiTab-root": {
							minHeight: 38,
							py: .5,
							fontSize: "0.8125rem",
							textTransform: "none"
						} },
						children: [/* @__PURE__ */ jsx(Tab, {
							label: t("editor.textFields"),
							value: "fields"
						}), /* @__PURE__ */ jsx(Tab, {
							label: t("editor.rawJson"),
							value: "json"
						})]
					})
				}),
				/* @__PURE__ */ jsx(Divider, {}),
				isLoading && /* @__PURE__ */ jsxs(Box, {
					sx: {
						flex: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: 1.5
					},
					children: [/* @__PURE__ */ jsx(CircularProgress, { size: 20 }), /* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						color: "text.secondary",
						children: t("editor.loading")
					})]
				}),
				selectedLanguage && !isLoading && editView === "fields" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx(Box, {
						sx: {
							px: 2.5,
							pt: 1.5,
							pb: .5,
							flexShrink: 0
						},
						children: /* @__PURE__ */ jsx(TextField, {
							size: "small",
							fullWidth: true,
							placeholder: t("editor.searchPlaceholder"),
							value: search,
							onChange: (e) => onSearchChange(e.target.value),
							InputProps: { startAdornment: /* @__PURE__ */ jsx(InputAdornment, {
								position: "start",
								children: /* @__PURE__ */ jsx(Search, { size: 14 })
							}) }
						})
					}),
					/* @__PURE__ */ jsx(Divider, { sx: { mt: 1 } }),
					/* @__PURE__ */ jsx(Box, {
						sx: {
							flex: 1,
							overflow: "auto",
							px: 2.5,
							py: 2
						},
						children: /* @__PURE__ */ jsx(TranslationFieldsView, {
							localValues: currentValues,
							serverValues,
							search,
							isCustomNamespace,
							onChange: onFieldChange,
							onResetField
						})
					})
				] }),
				selectedLanguage && !isLoading && editView === "json" && /* @__PURE__ */ jsx(Box, {
					sx: {
						flex: 1,
						overflow: "hidden",
						p: 0
					},
					children: /* @__PURE__ */ jsx(TranslationJsonEditor, {
						values: currentValues,
						serverKeys: Object.keys(serverValues),
						isCustomNamespace,
						colorMode,
						onChange: onJsonChange
					})
				})
			]
		})
	});
}

//#endregion
export { TranslationEditorCard as default };