import OrganizationUnitContext_default from "./OrganizationUnitContext.js";
import { useContext } from "react";

//#region src/contexts/useOrganizationUnit.ts
function useOrganizationUnit() {
	const context = useContext(OrganizationUnitContext_default);
	if (!context) throw new Error("useOrganizationUnit must be used within an OrganizationUnitProvider");
	return context;
}

//#endregion
export { useOrganizationUnit as default };