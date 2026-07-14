import BrandingContext_default from "./BrandingContext.js";
import { transformBrandingPreferenceToTheme } from "@thunderid/browser";
import { useCallback, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/Branding/BrandingProvider.tsx
/**
* BrandingProvider component that manages branding state and provides branding context to child components.
*
* This provider receives branding preferences from a parent component (typically ThunderIDProvider)
* and transforms them into theme objects, making them available to all child components.
*
* Features:
* - Receives branding preferences as props
* - Theme transformation from branding preferences
* - Loading and error states
* - Support for custom theme forcing
*
* @example
* Basic usage (typically used within ThunderIDProvider):
* ```tsx
* <BrandingProvider
*   brandingPreference={brandingData}
*   isLoading={isFetching}
*   error={fetchError}
* >
*   <App />
* </BrandingProvider>
* ```
*
* @example
* With custom theme forcing:
* ```tsx
* <BrandingProvider
*   brandingPreference={brandingData}
*   forceTheme="dark"
*   enabled={true}
* >
*   <App />
* </BrandingProvider>
* ```
*/
const BrandingProvider = ({ children, brandingPreference: externalBrandingPreference, forceTheme, enabled = true, isLoading: externalIsLoading = false, error: externalError = null, refetch: externalRefetch }) => {
	const [theme, setTheme] = useState(null);
	const [activeTheme, setActiveTheme] = useState(null);
	useEffect(() => {
		if (!enabled || !externalBrandingPreference) {
			setTheme(null);
			setActiveTheme(null);
			return;
		}
		const activeThemeFromBranding = externalBrandingPreference?.preference?.theme?.activeTheme;
		let extractedActiveTheme = null;
		if (activeThemeFromBranding) {
			const themeMode = activeThemeFromBranding.toLowerCase();
			if (themeMode === "light" || themeMode === "dark") extractedActiveTheme = themeMode;
		}
		setActiveTheme(extractedActiveTheme);
		setTheme(transformBrandingPreferenceToTheme(externalBrandingPreference, forceTheme));
	}, [
		externalBrandingPreference,
		forceTheme,
		enabled
	]);
	useEffect(() => {
		if (!enabled) {
			setTheme(null);
			setActiveTheme(null);
		}
	}, [enabled]);
	const fetchBranding = useCallback(async () => {
		if (externalRefetch) await externalRefetch();
	}, [externalRefetch]);
	const value = {
		activeTheme,
		brandingPreference: externalBrandingPreference || null,
		error: externalError,
		fetchBranding,
		isLoading: externalIsLoading,
		refetch: externalRefetch || fetchBranding,
		theme
	};
	return /* @__PURE__ */ jsx(BrandingContext_default.Provider, {
		value,
		children
	});
};
var BrandingProvider_default = BrandingProvider;

//#endregion
export { BrandingProvider_default as default };
//# sourceMappingURL=BrandingProvider.js.map