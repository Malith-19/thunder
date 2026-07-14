const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useOrganization = require('../../../contexts/Organization/useOrganization.cjs');
const require_BaseOrganization = require('./BaseOrganization.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/Organization/Organization.tsx
/**
* A component that uses render props to expose the current organization object.
* This component automatically retrieves the current organization from Organization context.
*
* @remarks This component is only supported in browser based React applications (CSR).
*
* @example
* ```tsx
* import { Organization } from '@thunderid/auth-react';
*
* const App = () => {
*   return (
*     <Organization fallback={<p>No organization selected</p>}>
*       {(organization) => (
*         <div>
*           <h1>Current Organization: {organization.name}!</h1>
*           <p>ID: {organization.id}</p>
*           <p>Role: {organization.role}</p>
*           {organization.memberCount && (
*             <p>Members: {organization.memberCount}</p>
*           )}
*         </div>
*       )}
*     </Organization>
*   );
* }
* ```
*/
const Organization = ({ children, fallback = null }) => {
	const { currentOrganization } = require_useOrganization.default();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseOrganization.default, {
		organization: currentOrganization,
		fallback,
		children
	});
};
Organization.displayName = "Organization";
var Organization_default = Organization;

//#endregion
exports.default = Organization_default;
//# sourceMappingURL=Organization.cjs.map