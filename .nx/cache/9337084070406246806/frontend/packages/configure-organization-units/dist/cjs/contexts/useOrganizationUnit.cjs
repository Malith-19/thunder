const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_OrganizationUnitContext = require('./OrganizationUnitContext.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);

//#region src/contexts/useOrganizationUnit.ts
function useOrganizationUnit() {
	const context = (0, react.useContext)(require_OrganizationUnitContext.default);
	if (!context) throw new Error("useOrganizationUnit must be used within an OrganizationUnitProvider");
	return context;
}

//#endregion
exports.default = useOrganizationUnit;