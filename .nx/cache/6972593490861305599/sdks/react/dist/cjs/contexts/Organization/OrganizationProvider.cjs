const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_OrganizationContext = require('./OrganizationContext.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

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
const OrganizationProvider = ({ children, currentOrganization, onError, myOrganizations, onOrganizationSwitch, revalidateMyOrganizations, getAllOrganizations, createOrganization }) => {
	const [isLoading, setIsLoading] = (0, react.useState)(false);
	const [error, setError] = (0, react.useState)(null);
	/**
	* Switches to a different organization
	*/
	const switchOrganization = (0, react.useCallback)(async (organization) => {
		if (!onOrganizationSwitch) throw new __thunderid_browser.ThunderIDRuntimeError("onOrganizationSwitch callback is required", "OrganizationProvider-SwitchError-001", "react", "The onOrganizationSwitch callback must be provided to handle organization switching.");
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
	const contextValue = (0, react.useMemo)(() => ({
		createOrganization,
		currentOrganization: currentOrganization ?? null,
		error,
		getAllOrganizations: getAllOrganizations ?? (() => Promise.resolve({
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
		getAllOrganizations,
		createOrganization
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationContext.default.Provider, {
		value: contextValue,
		children
	});
};
var OrganizationProvider_default = OrganizationProvider;

//#endregion
exports.default = OrganizationProvider_default;
//# sourceMappingURL=OrganizationProvider.cjs.map