const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_OrganizationContext = require('./OrganizationContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/Organization/useOrganization.ts
/**
* Hook to access the Organization context.
*
* This hook provides access to organization data including:
* - List of organizations the user belongs to
* - Current organization
* - Functions to switch organizations and refresh data
* - Function to fetch organizations programmatically
* - Loading states and error handling
*
* @returns {OrganizationContextProps} The organization context value containing all organization-related data and functions
* @throws {Error} Throws an error if used outside of OrganizationProvider
*
* @example
* ```tsx
* import {useOrganization} from '@thunderid/react';
*
* function OrganizationSelector() {
*   const {
*     organizations,
*     currentOrganization,
*     switchOrganization,
*     revalidateMyOrganizations,
*     getOrganizations,
*     isLoading,
*     error
*   } = useOrganization();
*
*   if (isLoading) {
*     return <div>Loading organizations...</div>;
*   }
*
*   if (error) {
*     return <div>Error: {error}</div>;
*   }
*
*   return (
*     <div>
*       <h2>Current: {currentOrganization?.name}</h2>
*       <select
*         value={currentOrganization?.id || ''}
*         onChange={(e) => {
*           const org = organizations?.find(o => o.id === e.target.value);
*           if (org) switchOrganization(org);
*         }}
*       >
*         {organizations?.map(org => (
*           <option key={org.id} value={org.id}>
*             {org.name}
*           </option>
*         ))}
*       </select>
*       <button onClick={revalidateMyOrganizations}>
*         Refresh Organizations
*       </button>
*       <button onClick={async () => {
*         const fresh = await getOrganizations();
*         console.log('Fresh organizations:', fresh);
*       }}>
*         Get Organizations Manually
*       </button>
*     </div>
*   );
* }
*
* // Switch to a specific organization
* function SwitchOrgButton() {
*   const {organizations, switchOrganization} = useOrganization();
*
*   const handleSwitch = (orgId: string) => {
*     const org = organizations?.find(o => o.id === orgId);
*     if (org) {
*       switchOrganization(org);
*     }
*   };
*
*   return (
*     <button onClick={() => handleSwitch('org-123')}>
*       Switch to Organization
*     </button>
*   );
* }
* ```
*/
const useOrganization = () => {
	const context = (0, react.useContext)(require_OrganizationContext.default);
	if (!context) throw new Error("useOrganization must be used within an OrganizationProvider");
	return context;
};
var useOrganization_default = useOrganization;

//#endregion
exports.default = useOrganization_default;
//# sourceMappingURL=useOrganization.cjs.map