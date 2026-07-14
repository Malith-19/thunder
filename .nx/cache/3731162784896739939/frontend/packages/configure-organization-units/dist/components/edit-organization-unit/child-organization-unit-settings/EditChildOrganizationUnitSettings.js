import ManageChildOrganizationUnitSection from "./ManageChildOrganizationUnitSection.js";
import { Stack } from "@wso2/oxygen-ui";
import { jsx } from "react/jsx-runtime";

//#region src/components/edit-organization-unit/child-organization-unit-settings/EditChildOrganizationUnitSettings.tsx
/**
* Child Organization Units tab content for the Organization Unit edit page.
*
* Displays sections for:
* - Managing child organization units (DataGrid with navigation)
*
* @param props - Component props
* @returns Child OUs tab content
*/
function EditChildOrganizationUnitSettings({ organizationUnitId, organizationUnitName }) {
	return /* @__PURE__ */ jsx(Stack, {
		spacing: 3,
		children: /* @__PURE__ */ jsx(ManageChildOrganizationUnitSection, {
			organizationUnitId,
			organizationUnitName
		})
	});
}

//#endregion
export { EditChildOrganizationUnitSettings as default };