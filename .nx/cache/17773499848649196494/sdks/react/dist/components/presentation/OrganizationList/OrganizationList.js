import useOrganization_default from "../../../contexts/Organization/useOrganization.js";
import useTheme_default from "../../../contexts/Theme/useTheme.js";
import { BaseOrganizationList } from "./BaseOrganizationList.js";
import OrganizationList_styles_default from "./OrganizationList.styles.js";
import { useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/OrganizationList/OrganizationList.tsx
/**
* OrganizationList component that provides organization listing functionality with pagination.
* This component uses the enhanced OrganizationContext, eliminating the polling issue and
* providing better integration with the existing context system.
*
* @example
* ```tsx
* import { OrganizationList } from '@thunderid/react';
*
* // Basic usage
* <OrganizationList />
*
* // With custom limit and filter
* <OrganizationList
*   limit={20}
*   filter="active"
*   onOrganizationSelect={(org) => {
*     console.log('Selected organization:', org.name);
*   }}
* />
*
* // As a popup dialog
* <OrganizationList
*   mode="popup"
*   open={isOpen}
*   onOpenChange={setIsOpen}
*   title="Select Organization"
* />
*
* // With custom organization renderer
* <OrganizationList
*   renderOrganization={(org) => (
*     <div key={org.id}>
*       <h3>{org.name}</h3>
*       <p>Can switch: {org.canSwitch ? 'Yes' : 'No'}</p>
*     </div>
*   )}
* />
* ```
*/
const OrganizationList = (props) => {
	const { onOrganizationSelect, className = "", style,...baseProps } = props;
	const { autoFetch, filter, limit, recursive,...filteredBaseProps } = baseProps;
	const { theme, colorScheme } = useTheme_default();
	const styles = OrganizationList_styles_default(theme, colorScheme);
	const { getAllOrganizations, error, isLoading, myOrganizations } = useOrganization_default();
	const [allOrganizations, setAllOrganizations] = useState({ organizations: [] });
	useEffect(() => {
		(async () => {
			setAllOrganizations(await getAllOrganizations());
		})();
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: cx(styles["root"], className),
		style,
		children: /* @__PURE__ */ jsx("div", {
			className: cx(styles["container"]),
			children: /* @__PURE__ */ jsx(BaseOrganizationList, {
				allOrganizations,
				myOrganizations,
				error,
				isLoading,
				onOrganizationSelect,
				...filteredBaseProps
			})
		})
	});
};
var OrganizationList_default = OrganizationList;

//#endregion
export { OrganizationList_default as default };
//# sourceMappingURL=OrganizationList.js.map