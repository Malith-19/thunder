import BrandingContext_default from "./BrandingContext.js";
import { useContext } from "react";

//#region src/contexts/Branding/useBrandingContext.ts
/**
* Hook to access the branding context.
* This hook provides access to branding preferences, theme data, and loading states.
*
* @returns The branding context value containing branding preference data, theme, and control functions
* @throws Error if used outside of a BrandingProvider
*
* @example
* ```tsx
* function MyComponent() {
*   const { theme, activeTheme, isLoading, error } = useBrandingContext();
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
*/
const useBrandingContext = () => {
	const context = useContext(BrandingContext_default);
	if (!context) throw new Error("useBrandingContext must be used within a BrandingProvider");
	return context;
};
var useBrandingContext_default = useBrandingContext;

//#endregion
export { useBrandingContext_default as default };
//# sourceMappingURL=useBrandingContext.js.map