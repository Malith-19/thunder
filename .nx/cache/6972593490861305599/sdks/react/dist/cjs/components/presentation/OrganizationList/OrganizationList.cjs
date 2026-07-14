const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useOrganization = require('../../../contexts/Organization/useOrganization.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_BaseOrganizationList = require('./BaseOrganizationList.cjs');
const require_OrganizationList_styles = require('./OrganizationList.styles.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

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
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_OrganizationList_styles.default(theme, colorScheme);
	const { getAllOrganizations, error, isLoading, myOrganizations } = require_useOrganization.default();
	const [allOrganizations, setAllOrganizations] = (0, react.useState)({ organizations: [] });
	(0, react.useEffect)(() => {
		(async () => {
			setAllOrganizations(await getAllOrganizations());
		})();
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, __emotion_css.cx)(styles["root"], className),
		style,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, __emotion_css.cx)(styles["container"]),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseOrganizationList.BaseOrganizationList, {
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
exports.default = OrganizationList_default;
//# sourceMappingURL=OrganizationList.cjs.map