import useOrganization_default from "../../../contexts/Organization/useOrganization.js";
import BaseOrganization_default from "./BaseOrganization.js";
import { jsx } from "react/jsx-runtime";

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
	const { currentOrganization } = useOrganization_default();
	return /* @__PURE__ */ jsx(BaseOrganization_default, {
		organization: currentOrganization,
		fallback,
		children
	});
};
Organization.displayName = "Organization";
var Organization_default = Organization;

//#endregion
export { Organization_default as default };
//# sourceMappingURL=Organization.js.map