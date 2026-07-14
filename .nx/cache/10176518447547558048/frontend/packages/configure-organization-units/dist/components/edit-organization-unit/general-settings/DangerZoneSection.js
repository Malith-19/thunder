import { useTranslation } from "react-i18next";
import { Button, Typography } from "@wso2/oxygen-ui";
import { jsx, jsxs } from "react/jsx-runtime";
import { SettingsCard } from "@thunderid/components";

//#region src/components/edit-organization-unit/general-settings/DangerZoneSection.tsx
/**
* Section component displaying the danger zone with destructive actions.
*
* Displays a delete button for permanently removing the organization unit.
*
* @param props - Component props
* @returns Danger zone UI within a Paper
*/
function DangerZoneSection({ onDeleteClick }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs(SettingsCard, {
		title: t("organizationUnits:edit.general.sections.dangerZone.title"),
		description: t("organizationUnits:edit.general.sections.dangerZone.description"),
		children: [
			/* @__PURE__ */ jsx(Typography, {
				variant: "h6",
				gutterBottom: true,
				color: "error",
				children: t("organizationUnits:edit.general.sections.dangerZone.deleteOU.title")
			}),
			/* @__PURE__ */ jsx(Typography, {
				variant: "body2",
				color: "text.secondary",
				sx: { mb: 3 },
				children: t("organizationUnits:edit.general.sections.dangerZone.deleteOU.description")
			}),
			/* @__PURE__ */ jsx(Button, {
				variant: "contained",
				color: "error",
				onClick: onDeleteClick,
				children: t("organizationUnits:edit.general.dangerZone.delete.button.label")
			})
		]
	});
}

//#endregion
export { DangerZoneSection as default };