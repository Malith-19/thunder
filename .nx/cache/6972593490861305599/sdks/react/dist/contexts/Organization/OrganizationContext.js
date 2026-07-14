import { createContext } from "react";

//#region src/contexts/Organization/OrganizationContext.ts
/**
* Context object for managing organization data and related operations.
*/
const OrganizationContext = createContext({
	createOrganization: () => null,
	currentOrganization: null,
	error: null,
	getAllOrganizations: () => Promise.resolve({
		count: 0,
		organizations: []
	}),
	isLoading: false,
	myOrganizations: [],
	revalidateMyOrganizations: () => Promise.resolve([]),
	switchOrganization: () => Promise.resolve()
});
OrganizationContext.displayName = "OrganizationContext";
var OrganizationContext_default = OrganizationContext;

//#endregion
export { OrganizationContext_default as default };
//# sourceMappingURL=OrganizationContext.js.map