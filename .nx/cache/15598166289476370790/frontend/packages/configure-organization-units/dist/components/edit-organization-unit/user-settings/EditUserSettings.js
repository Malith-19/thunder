import ManageUsersSection from "./ManageUsersSection.js";
import { Stack } from "@wso2/oxygen-ui";
import { jsx } from "react/jsx-runtime";

//#region src/components/edit-organization-unit/user-settings/EditUserSettings.tsx
/**
* Users tab content for the Organization Unit edit page.
*
* Displays sections for:
* - Managing users belonging to the organization unit (DataGrid)
*
* @param props - Component props
* @returns Users tab content
*/
function EditUserSettings({ organizationUnitId }) {
	return /* @__PURE__ */ jsx(Stack, {
		spacing: 3,
		children: /* @__PURE__ */ jsx(ManageUsersSection, { organizationUnitId })
	});
}

//#endregion
export { EditUserSettings as default };