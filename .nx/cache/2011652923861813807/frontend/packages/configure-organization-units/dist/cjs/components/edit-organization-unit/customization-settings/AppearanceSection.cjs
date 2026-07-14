const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_components = require("@thunderid/components");
__thunderid_components = require_rolldown_runtime.__toESM(__thunderid_components);
let __thunderid_design = require("@thunderid/design");
__thunderid_design = require_rolldown_runtime.__toESM(__thunderid_design);

//#region src/components/edit-organization-unit/customization-settings/AppearanceSection.tsx
/**
* Section component for configuring organization unit appearance.
*
* Provides an autocomplete dropdown to select a theme from available options.
* The selected theme affects the look and feel of the organization unit's pages.
*
* @param props - Component props
* @returns Appearance configuration UI within a SettingsCard
*/
function AppearanceSection({ organizationUnit, editedOU, onFieldChange }) {
	const { t } = (0, react_i18next.useTranslation)();
	const { data: themesData, isLoading: loadingThemes } = (0, __thunderid_design.useGetThemes)();
	const themeOptions = themesData?.themes ?? [];
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__thunderid_components.SettingsCard, {
		title: t("organizationUnits:edit.customization.sections.appearance"),
		description: t("organizationUnits:edit.customization.sections.appearance.description"),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
			variant: "subtitle2",
			gutterBottom: true,
			children: t("organizationUnits:edit.customization.labels.theme")
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Autocomplete, {
			fullWidth: true,
			options: themeOptions,
			getOptionLabel: (option) => typeof option === "string" ? option : option.displayName,
			value: themeOptions.find((theme) => theme.id === (editedOU.themeId ?? organizationUnit.themeId)) ?? null,
			onChange: (_event, newValue) => onFieldChange("themeId", newValue?.id ?? ""),
			loading: loadingThemes,
			renderInput: (params) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
				...params,
				placeholder: t("organizationUnits:edit.customization.theme.placeholder"),
				helperText: t("organizationUnits:edit.customization.theme.hint"),
				InputProps: {
					...params.InputProps,
					endAdornment: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [loadingThemes ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.CircularProgress, {
						color: "inherit",
						size: 20
					}) : null, params.InputProps.endAdornment] })
				}
			})
		})] })
	});
}

//#endregion
exports.default = AppearanceSection;