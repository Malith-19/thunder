const require_rolldown_runtime = require('../_virtual/rolldown_runtime.cjs');
const require_useBrandingContext = require('../contexts/Branding/useBrandingContext.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);

//#region src/hooks/useBranding.ts
const logger = (0, __thunderid_browser.createPackageComponentLogger)("@thunderid/react", "useBranding");
/**
* React hook for accessing branding preferences from the BrandingProvider context.
* This hook provides access to branding preferences, theme data, and loading states.
*
* @deprecated Consider using useBrandingContext directly for better performance.
* This hook is maintained for backward compatibility.
*
* @param config - Configuration options (deprecated, use BrandingProvider props instead)
* @returns Object containing branding preference data, theme, loading state, error, and refetch function
*
* @example
* Basic usage:
* ```tsx
* function MyComponent() {
*   const { theme, activeTheme, isLoading, error } = useBranding();
*
*   if (isLoading) return <div>Loading branding...</div>;
*   if (error) return <div>Error: {error.message}</div>;
*
*   return (
*     <div style={{ color: theme?.colors?.primary?.main }}>
*       <p>Active theme mode: {activeTheme}</p>
*       <p>Styled with ThunderID branding</p>
*     </div>
*   );
* }
* ```
*
* @example
* For new implementations, use BrandingProvider with useBrandingContext:
* ```tsx
* // In your root component
* <BrandingProvider baseUrl="https://localhost:8090">
*   <App />
* </BrandingProvider>
*
* // In your component
* function MyComponent() {
*   const { theme, activeTheme, isLoading, error } = useBrandingContext();
*   // ... rest of your component
* }
* ```
*/
const useBranding = () => {
	try {
		return require_useBrandingContext.default();
	} catch (error) {
		logger.warn("useBranding: BrandingProvider not available. Make sure to wrap your app with BrandingProvider or ThunderIDProvider with branding preferences.");
		return {
			activeTheme: null,
			brandingPreference: null,
			error: /* @__PURE__ */ new Error("BrandingProvider not available"),
			fetchBranding: async () => {},
			isLoading: false,
			refetch: async () => {},
			theme: null
		};
	}
};
var useBranding_default = useBranding;

//#endregion
exports.default = useBranding_default;
//# sourceMappingURL=useBranding.cjs.map