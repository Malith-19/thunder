const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_applyThemeToDOM = require('../../../utils/applyThemeToDOM.cjs');
const require_normalizeThemeConfig = require('../../../utils/normalizeThemeConfig.cjs');
const require_useBrandingContext = require('../../Branding/useBrandingContext.cjs');
const require_ThemeContext = require('../ThemeContext.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/contexts/Theme/v1/ThemeProvider.tsx
const logger = (0, __thunderid_browser.createPackageComponentLogger)("@thunderid/react", "ThemeProvider");
/**
* ThemeProvider component that manages theme state and provides theme context to child components.
*
* This provider integrates with ThunderID branding preferences to automatically apply
* organization-specific themes while allowing for custom theme overrides.
*
* Features:
* - Automatic theme mode detection (light/dark/system/class)
* - Integration with ThunderID branding API through useBranding hook
* - Merging of branding themes with custom theme configurations
* - CSS variable injection for easy styling
* - Loading and error states for branding integration
*
* @example
* Basic usage with branding integration:
* ```tsx
* <ThemeProvider inheritFromBranding={true}>
*   <App />
* </ThemeProvider>
* ```
*
* @example
* With custom theme overrides:
* ```tsx
* <ThemeProvider
*   theme={{
*     colors: {
*       primary: { main: '#custom-color' }
*     }
*   }}
*   inheritFromBranding={true}
* >
*   <App />
* </ThemeProvider>
* ```
*
* @example
* With branding-driven theme mode:
* ```tsx
* <ThemeProvider
*   mode="branding"
*   inheritFromBranding={true}
* >
*   <App />
* </ThemeProvider>
* ```
*/
const ThemeProvider = ({ children, theme: themeConfigProp, mode = __thunderid_browser.DEFAULT_THEME, detection = {}, inheritFromBranding = true }) => {
	const themeConfig = require_normalizeThemeConfig.default(themeConfigProp);
	const [colorScheme, setColorScheme] = (0, react.useState)(() => {
		if (mode === "light" || mode === "dark") return mode;
		if (mode === "branding") return (0, __thunderid_browser.detectThemeMode)("system", detection);
		return (0, __thunderid_browser.detectThemeMode)(mode, detection);
	});
	let brandingTheme = null;
	let brandingActiveTheme = null;
	let isBrandingLoading = false;
	let brandingError = null;
	try {
		const brandingContext = require_useBrandingContext.default();
		brandingTheme = brandingContext.theme;
		brandingActiveTheme = brandingContext.activeTheme;
		isBrandingLoading = brandingContext.isLoading;
		brandingError = brandingContext.error;
	} catch (error) {
		if (inheritFromBranding) logger.warn("ThemeProvider: inheritFromBranding is enabled but BrandingProvider is not available. Make sure to wrap your app with BrandingProvider or ThunderIDProvider with branding preferences.");
	}
	(0, react.useEffect)(() => {
		if (inheritFromBranding && brandingActiveTheme) {
			if (mode === "branding") setColorScheme(brandingActiveTheme);
			else if (mode === "system" && !isBrandingLoading) setColorScheme(brandingActiveTheme);
		}
	}, [
		inheritFromBranding,
		brandingActiveTheme,
		mode,
		isBrandingLoading
	]);
	const finalThemeConfig = (0, react.useMemo)(() => {
		if (!inheritFromBranding || !brandingTheme) return themeConfig;
		const brandingThemeConfig = {
			borderRadius: brandingTheme.borderRadius,
			colors: brandingTheme.colors,
			components: brandingTheme.components,
			images: brandingTheme.images,
			shadows: brandingTheme.shadows,
			spacing: brandingTheme.spacing
		};
		return {
			...brandingThemeConfig,
			...themeConfig,
			borderRadius: {
				...brandingThemeConfig.borderRadius,
				...themeConfig?.borderRadius
			},
			colors: {
				...brandingThemeConfig.colors,
				...themeConfig?.colors
			},
			components: {
				...brandingThemeConfig.components,
				...themeConfig?.components
			},
			images: {
				...brandingThemeConfig.images,
				...themeConfig?.images
			},
			shadows: {
				...brandingThemeConfig.shadows,
				...themeConfig?.shadows
			},
			spacing: {
				...brandingThemeConfig.spacing,
				...themeConfig?.spacing
			}
		};
	}, [
		inheritFromBranding,
		brandingTheme,
		themeConfig
	]);
	const theme = (0, react.useMemo)(() => (0, __thunderid_browser.createTheme)(finalThemeConfig, colorScheme === "dark"), [finalThemeConfig, colorScheme]);
	const direction = finalThemeConfig?.direction || "ltr";
	const handleThemeChange = (0, react.useCallback)((isDark) => {
		setColorScheme(isDark ? "dark" : "light");
	}, []);
	const toggleTheme = (0, react.useCallback)(() => {
		setColorScheme((prev) => prev === "light" ? "dark" : "light");
	}, []);
	(0, react.useEffect)(() => {
		let observer = null;
		let mediaQuery = null;
		if (mode === "branding") return;
		if (mode === "class") {
			const targetElement = detection.targetElement || document.documentElement;
			if (targetElement) observer = (0, __thunderid_browser.createClassObserver)(targetElement, handleThemeChange, detection);
		} else if (mode === "system") {
			if (!inheritFromBranding || !brandingActiveTheme) mediaQuery = (0, __thunderid_browser.createMediaQueryListener)(handleThemeChange);
		}
		return () => {
			if (observer) observer.disconnect();
			if (mediaQuery) if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", handleThemeChange);
			else mediaQuery.removeListener(handleThemeChange);
		};
	}, [
		mode,
		detection,
		handleThemeChange,
		inheritFromBranding,
		brandingActiveTheme
	]);
	(0, react.useEffect)(() => {
		require_applyThemeToDOM.default(theme);
	}, [theme]);
	(0, react.useEffect)(() => {
		if (typeof document !== "undefined") document.documentElement.dir = direction;
	}, [direction]);
	const value = {
		brandingError,
		colorScheme,
		direction,
		inheritFromBranding,
		isBrandingLoading,
		theme,
		toggleTheme
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ThemeContext.default.Provider, {
		value,
		children
	});
};
var ThemeProvider_default = ThemeProvider;

//#endregion
exports.default = ThemeProvider_default;
//# sourceMappingURL=ThemeProvider.cjs.map