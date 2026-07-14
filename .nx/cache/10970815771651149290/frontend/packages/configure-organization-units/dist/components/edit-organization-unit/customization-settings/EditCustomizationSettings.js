import AppearanceSection from "./AppearanceSection.js";
import { Stack } from "@wso2/oxygen-ui";
import { jsx } from "react/jsx-runtime";

//#region src/components/edit-organization-unit/customization-settings/EditCustomizationSettings.tsx
/**
* Customization tab content for the Organization Unit edit page.
*
* Displays sections for:
* - Appearance (theme selection)
*
* @param props - Component props
* @returns Customization settings sections wrapped in a Stack
*/
function EditCustomizationSettings({ organizationUnit, editedOU, onFieldChange }) {
	return /* @__PURE__ */ jsx(Stack, {
		spacing: 3,
		children: /* @__PURE__ */ jsx(AppearanceSection, {
			organizationUnit,
			editedOU,
			onFieldChange
		})
	});
}

//#endregion
export { EditCustomizationSettings as default };