const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/Organization/OrganizationContext.ts
/**
* Context object for managing organization data and related operations.
*/
const OrganizationContext = (0, react.createContext)({
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
exports.default = OrganizationContext_default;
//# sourceMappingURL=OrganizationContext.cjs.map