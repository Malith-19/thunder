const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_TranslationFieldsView = require('./TranslationFieldsView.cjs');
const require_TranslationJsonEditor = require('./TranslationJsonEditor.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);

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
	const { t } = (0, react_i18next.useTranslation)("translations");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
		sx: {
			flex: 1,
			overflow: "hidden",
			display: "flex",
			gap: 2.5,
			minHeight: 0
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Card, {
			variant: "outlined",
			sx: {
				flex: 1,
				overflow: "hidden",
				display: "flex",
				flexDirection: "column",
				borderRadius: 2
			},
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						px: 2.5,
						pt: 2,
						pb: 0,
						flexShrink: 0
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Tabs, {
						value: editView,
						onChange: onTabChange,
						sx: { "& .MuiTab-root": {
							minHeight: 38,
							py: .5,
							fontSize: "0.8125rem",
							textTransform: "none"
						} },
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
							label: t("editor.textFields"),
							value: "fields"
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tab, {
							label: t("editor.rawJson"),
							value: "json"
						})]
					})
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Divider, {}),
				isLoading && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, {
					sx: {
						flex: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						gap: 1.5
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, { size: 20 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
						variant: "body2",
						color: "text.secondary",
						children: t("editor.loading")
					})]
				}),
				selectedLanguage && !isLoading && editView === "fields" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
						sx: {
							px: 2.5,
							pt: 1.5,
							pb: .5,
							flexShrink: 0
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
							size: "small",
							fullWidth: true,
							placeholder: t("editor.searchPlaceholder"),
							value: search,
							onChange: (e) => onSearchChange(e.target.value),
							InputProps: { startAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.InputAdornment, {
								position: "start",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Search, { size: 14 })
							}) }
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Divider, { sx: { mt: 1 } }),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
						sx: {
							flex: 1,
							overflow: "auto",
							px: 2.5,
							py: 2
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TranslationFieldsView.default, {
							localValues: currentValues,
							serverValues,
							search,
							isCustomNamespace,
							onChange: onFieldChange,
							onResetField
						})
					})
				] }),
				selectedLanguage && !isLoading && editView === "json" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Box, {
					sx: {
						flex: 1,
						overflow: "hidden",
						p: 0
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_TranslationJsonEditor.default, {
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
exports.default = TranslationEditorCard;