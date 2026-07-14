const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/Organization/BaseOrganization.tsx
/**
* Base Organization component that provides the core functionality for displaying organization information.
* This component takes an organization object as a prop and uses render props to expose it.
*
* @remarks This is the base component that can be used in any context where you have
* an organization object available. For React applications, use the Organization component which
* automatically retrieves the current organization from Organization context.
*
* @example
* ```tsx
* import { BaseOrganization } from '@thunderid/auth-react';
*
* const MyComponent = ({ organization }) => {
*   return (
*     <BaseOrganization organization={organization} fallback={<p>No organization data</p>}>
*       {(org) => (
*         <div>
*           <h1>Organization: {org.name}</h1>
*           <p>ID: {org.id}</p>
*         </div>
*       )}
*     </BaseOrganization>
*   );
* }
* ```
*/
const BaseOrganization = ({ children, fallback = null, organization }) => {
	if (!organization) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: fallback });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: children(organization) });
};
BaseOrganization.displayName = "BaseOrganization";
var BaseOrganization_default = BaseOrganization;

//#endregion
exports.default = BaseOrganization_default;
//# sourceMappingURL=BaseOrganization.cjs.map