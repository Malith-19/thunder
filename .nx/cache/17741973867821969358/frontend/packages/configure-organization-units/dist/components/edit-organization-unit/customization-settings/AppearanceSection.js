import { useTranslation } from "react-i18next";
import { Autocomplete, Box, CircularProgress, TextField, Typography } from "@wso2/oxygen-ui";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { SettingsCard } from "@thunderid/components";
import { useGetThemes } from "@thunderid/design";

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
	const { t } = useTranslation();
	const { data: themesData, isLoading: loadingThemes } = useGetThemes();
	const themeOptions = themesData?.themes ?? [];
	return /* @__PURE__ */ jsx(SettingsCard, {
		title: t("organizationUnits:edit.customization.sections.appearance"),
		description: t("organizationUnits:edit.customization.sections.appearance.description"),
		children: /* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
			variant: "subtitle2",
			gutterBottom: true,
			children: t("organizationUnits:edit.customization.labels.theme")
		}), /* @__PURE__ */ jsx(Autocomplete, {
			fullWidth: true,
			options: themeOptions,
			getOptionLabel: (option) => typeof option === "string" ? option : option.displayName,
			value: themeOptions.find((theme) => theme.id === (editedOU.themeId ?? organizationUnit.themeId)) ?? null,
			onChange: (_event, newValue) => onFieldChange("themeId", newValue?.id ?? ""),
			loading: loadingThemes,
			renderInput: (params) => /* @__PURE__ */ jsx(TextField, {
				...params,
				placeholder: t("organizationUnits:edit.customization.theme.placeholder"),
				helperText: t("organizationUnits:edit.customization.theme.hint"),
				InputProps: {
					...params.InputProps,
					endAdornment: /* @__PURE__ */ jsxs(Fragment, { children: [loadingThemes ? /* @__PURE__ */ jsx(CircularProgress, {
						color: "inherit",
						size: 20
					}) : null, params.InputProps.endAdornment] })
				}
			})
		})] })
	});
}

//#endregion
export { AppearanceSection as default };