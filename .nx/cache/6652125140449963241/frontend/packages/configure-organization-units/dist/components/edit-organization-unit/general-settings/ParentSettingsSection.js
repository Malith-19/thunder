import useGetOrganizationUnit from "../../../api/useGetOrganizationUnit.js";
import { useTranslation } from "react-i18next";
import { CircularProgress, FormControl, FormLabel, Stack, TextField, Typography } from "@wso2/oxygen-ui";
import { jsx, jsxs } from "react/jsx-runtime";
import { SettingsCard } from "@thunderid/components";
import { Link } from "react-router";

//#region src/components/edit-organization-unit/general-settings/ParentSettingsSection.tsx
/**
* Section component displaying the parent organization unit information.
*
* Shows:
* - A link to the parent OU if one exists and is loaded
* - A loading spinner while fetching parent OU details
* - A "no parent" message if the OU has no parent
* - The raw parent ID if the parent OU details cannot be resolved
*
* @param props - Component props
* @returns Parent organization unit info within a SettingsCard
*/
function ParentSettingsSection({ organizationUnit }) {
	const { t } = useTranslation();
	const { data: parentOU, isLoading: isLoadingParent } = useGetOrganizationUnit(organizationUnit.parent ?? void 0, Boolean(organizationUnit.parent));
	const renderParentInfo = () => {
		if (!organizationUnit.parent) return /* @__PURE__ */ jsx(TextField, {
			fullWidth: true,
			id: "parent-ou-input",
			value: t("organizationUnits:edit.general.ou.noParent.label"),
			InputProps: { readOnly: true }
		});
		if (isLoadingParent) return /* @__PURE__ */ jsx(CircularProgress, { size: 16 });
		if (parentOU) {
			const navigationState = { fromOU: {
				id: organizationUnit.id,
				name: organizationUnit.name
			} };
			return /* @__PURE__ */ jsxs(Stack, {
				direction: "row",
				spacing: 1,
				alignItems: "center",
				children: [/* @__PURE__ */ jsx(Typography, {
					component: Link,
					to: `/organization-units/${parentOU.id}`,
					state: navigationState,
					"data-state": JSON.stringify(navigationState),
					variant: "body2",
					sx: {
						color: "primary.main",
						textDecoration: "none",
						"&:hover": { textDecoration: "underline" }
					},
					children: parentOU.name
				}), /* @__PURE__ */ jsxs(Typography, {
					variant: "body2",
					color: "text.secondary",
					children: [
						"(",
						parentOU.id,
						")"
					]
				})]
			});
		}
		return /* @__PURE__ */ jsx(TextField, {
			fullWidth: true,
			id: "parent-ou-input",
			value: organizationUnit.parent,
			InputProps: { readOnly: true },
			sx: { "& input": {
				fontFamily: "monospace",
				fontSize: "0.875rem"
			} }
		});
	};
	return /* @__PURE__ */ jsx(SettingsCard, {
		title: t("organizationUnits:edit.general.sections.parentOUSettings.title"),
		description: t("organizationUnits:edit.general.sections.parentOUSettings.description"),
		children: /* @__PURE__ */ jsxs(FormControl, {
			fullWidth: true,
			children: [/* @__PURE__ */ jsx(FormLabel, {
				htmlFor: "parent-ou-input",
				children: t("organizationUnits:edit.general.ou.parent.label")
			}), renderParentInfo()]
		})
	});
}

//#endregion
export { ParentSettingsSection as default };