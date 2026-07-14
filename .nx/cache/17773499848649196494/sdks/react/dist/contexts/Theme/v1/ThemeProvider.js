import applyThemeToDOM_default from "../../../utils/applyThemeToDOM.js";
import normalizeThemeConfig_default from "../../../utils/normalizeThemeConfig.js";
import useBrandingContext_default from "../../Branding/useBrandingContext.js";
import ThemeContext_default from "../ThemeContext.js";
import { DEFAULT_THEME, createClassObserver, createMediaQueryListener, createPackageComponentLogger, createTheme, detectThemeMode } from "@thunderid/browser";
import { useCallback, useEffect, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/Theme/v1/ThemeProvider.tsx
const logger$1 = createPackageComponentLogger("@thunderid/react", "ThemeProvider");
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
const ThemeProvider = ({ children, theme: themeConfigProp, mode = DEFAULT_THEME, detection = {}, inheritFromBranding = true }) => {
	const themeConfig = normalizeThemeConfig_default(themeConfigProp);
	const [colorScheme, setColorScheme] = useState(() => {
		if (mode === "light" || mode === "dark") return mode;
		if (mode === "branding") return detectThemeMode("system", detection);
		return detectThemeMode(mode, detection);
	});
	let brandingTheme = null;
	let brandingActiveTheme = null;
	let isBrandingLoading = false;
	let brandingError = null;
	try {
		const brandingContext = useBrandingContext_default();
		brandingTheme = brandingContext.theme;
		brandingActiveTheme = brandingContext.activeTheme;
		isBrandingLoading = brandingContext.isLoading;
		brandingError = brandingContext.error;
	} catch (error) {
		if (inheritFromBranding) logger$1.warn("ThemeProvider: inheritFromBranding is enabled but BrandingProvider is not available. Make sure to wrap your app with BrandingProvider or ThunderIDProvider with branding preferences.");
	}
	useEffect(() => {
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
	const finalThemeConfig = useMemo(() => {
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
	const theme = useMemo(() => createTheme(finalThemeConfig, colorScheme === "dark"), [finalThemeConfig, colorScheme]);
	const direction = finalThemeConfig?.direction || "ltr";
	const handleThemeChange = useCallback((isDark) => {
		setColorScheme(isDark ? "dark" : "light");
	}, []);
	const toggleTheme = useCallback(() => {
		setColorScheme((prev) => prev === "light" ? "dark" : "light");
	}, []);
	useEffect(() => {
		let observer = null;
		let mediaQuery = null;
		if (mode === "branding") return;
		if (mode === "class") {
			const targetElement = detection.targetElement || document.documentElement;
			if (targetElement) observer = createClassObserver(targetElement, handleThemeChange, detection);
		} else if (mode === "system") {
			if (!inheritFromBranding || !brandingActiveTheme) mediaQuery = createMediaQueryListener(handleThemeChange);
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
	useEffect(() => {
		applyThemeToDOM_default(theme);
	}, [theme]);
	useEffect(() => {
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
	return /* @__PURE__ */ jsx(ThemeContext_default.Provider, {
		value,
		children
	});
};
var ThemeProvider_default = ThemeProvider;

//#endregion
export { ThemeProvider_default as default };
//# sourceMappingURL=ThemeProvider.js.map