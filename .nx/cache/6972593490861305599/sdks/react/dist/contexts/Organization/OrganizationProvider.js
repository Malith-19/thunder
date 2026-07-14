import OrganizationContext_default from "./OrganizationContext.js";
import { ThunderIDRuntimeError } from "@thunderid/browser";
import { useCallback, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/Organization/OrganizationProvider.tsx
/**
* OrganizationProvider component that manages organization data and provides it through OrganizationContext.
*
* This provider:
* - Fetches organization data from the organizations endpoint
* - Manages current organization state
* - Provides functions for switching organizations and refreshing data
* - Handles loading states and errors
*
* @example
* ```tsx
* // Basic usage with auto-fetch (uses internal API)
* <OrganizationProvider>
*   <App />
* </OrganizationProvider>
*
* // With custom error handling
* <OrganizationProvider onError={(error) => console.error('Organization error:', error)}>
*   <App />
* </OrganizationProvider>
*
* // With custom organization switch handler
* <OrganizationProvider
*   onOrganizationSwitch={(org) => console.log('Switched to:', org.name)}
* >
*   <App />
* </OrganizationProvider>
*
* // Disable auto-fetch (fetch manually using revalidateMyOrganizations)
* <OrganizationProvider autoFetch={false}>
*   <App />
* </OrganizationProvider>
* ```
*/
const OrganizationProvider = ({ children, currentOrganization, onError, myOrganizations, onOrganizationSwitch, revalidateMyOrganizations, getAllOrganizations: getAllOrganizations$1, createOrganization: createOrganization$1 }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	/**
	* Switches to a different organization
	*/
	const switchOrganization = useCallback(async (organization) => {
		if (!onOrganizationSwitch) throw new ThunderIDRuntimeError("onOrganizationSwitch callback is required", "OrganizationProvider-SwitchError-001", "react", "The onOrganizationSwitch callback must be provided to handle organization switching.");
		setIsLoading(true);
		setError(null);
		try {
			await onOrganizationSwitch(organization);
		} catch (switchError) {
			const errorMessage = switchError instanceof Error ? switchError.message : "Failed to switch organization";
			setError(errorMessage);
			if (onError) onError(errorMessage);
			throw switchError;
		} finally {
			setIsLoading(false);
		}
	}, [onOrganizationSwitch, onError]);
	const contextValue = useMemo(() => ({
		createOrganization: createOrganization$1,
		currentOrganization: currentOrganization ?? null,
		error,
		getAllOrganizations: getAllOrganizations$1 ?? (() => Promise.resolve({
			count: 0,
			organizations: []
		})),
		isLoading,
		myOrganizations: myOrganizations ?? [],
		revalidateMyOrganizations,
		switchOrganization
	}), [
		currentOrganization,
		error,
		isLoading,
		myOrganizations,
		switchOrganization,
		revalidateMyOrganizations,
		getAllOrganizations$1,
		createOrganization$1
	]);
	return /* @__PURE__ */ jsx(OrganizationContext_default.Provider, {
		value: contextValue,
		children
	});
};
var OrganizationProvider_default = OrganizationProvider;

//#endregion
export { OrganizationProvider_default as default };
//# sourceMappingURL=OrganizationProvider.js.map