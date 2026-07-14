const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_BrandingContext = require('./BrandingContext.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

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
	const [theme, setTheme] = (0, react.useState)(null);
	const [activeTheme, setActiveTheme] = (0, react.useState)(null);
	(0, react.useEffect)(() => {
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
		setTheme((0, __thunderid_browser.transformBrandingPreferenceToTheme)(externalBrandingPreference, forceTheme));
	}, [
		externalBrandingPreference,
		forceTheme,
		enabled
	]);
	(0, react.useEffect)(() => {
		if (!enabled) {
			setTheme(null);
			setActiveTheme(null);
		}
	}, [enabled]);
	const fetchBranding = (0, react.useCallback)(async () => {
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BrandingContext.default.Provider, {
		value,
		children
	});
};
var BrandingProvider_default = BrandingProvider;

//#endregion
exports.default = BrandingProvider_default;
//# sourceMappingURL=BrandingProvider.cjs.map