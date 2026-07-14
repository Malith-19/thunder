import ManageGroupsSection from "./ManageGroupsSection.js";
import { Stack } from "@wso2/oxygen-ui";
import { jsx } from "react/jsx-runtime";

//#region src/components/edit-organization-unit/group-settings/EditGroupSettings.tsx
/**
* Groups tab content for the Organization Unit edit page.
*
* Displays sections for:
* - Managing groups belonging to the organization unit (DataGrid)
*
* @param props - Component props
* @returns Groups tab content
*/
function EditGroupSettings({ organizationUnitId }) {
	return /* @__PURE__ */ jsx(Stack, {
		spacing: 3,
		children: /* @__PURE__ */ jsx(ManageGroupsSection, { organizationUnitId })
	});
}

//#endregion
export { EditGroupSettings as default };