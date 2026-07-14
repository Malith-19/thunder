import useBrandingContext_default from "../contexts/Branding/useBrandingContext.js";
import { createPackageComponentLogger } from "@thunderid/browser";

//#region src/hooks/useBranding.ts
const logger$1 = createPackageComponentLogger("@thunderid/react", "useBranding");
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
		return useBrandingContext_default();
	} catch (error) {
		logger$1.warn("useBranding: BrandingProvider not available. Make sure to wrap your app with BrandingProvider or ThunderIDProvider with branding preferences.");
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
export { useBranding_default as default };
//# sourceMappingURL=useBranding.js.map