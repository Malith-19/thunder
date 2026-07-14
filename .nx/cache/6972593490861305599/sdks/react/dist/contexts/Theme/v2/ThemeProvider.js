import FlowMetaContext_default from "../../FlowMeta/FlowMetaContext.js";
import applyThemeToDOM_default from "../../../utils/applyThemeToDOM.js";
import normalizeThemeConfig_default from "../../../utils/normalizeThemeConfig.js";
import ThemeContext_default from "../ThemeContext.js";
import buildThemeConfigFromFlowMeta_default from "../../../utils/v2/buildThemeConfigFromFlowMeta.js";
import { createTheme } from "@thunderid/browser";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/contexts/Theme/v2/ThemeProvider.tsx
/**
* ThemeProvider is the v2 drop-in replacement for `ThemeProvider`.
*
* It reads the design theme from the nearest `FlowMetaContext` (provided by
* `FlowMetaProvider`) and publishes a resolved `Theme` object through the
* **same** `ThemeContext` that `useTheme` consumes.  This means all existing
* components that call `useTheme` continue to work without any changes.
*
* The `defaultColorScheme` field returned by the server is used to seed the
* active color scheme; the user can still toggle it locally via the
* `toggleTheme` value exposed in the context.
*
* @example
* ```tsx
* <FlowMetaProvider config={{ baseUrl, type: FlowMetaType.App, id: appId }}>
*   <ThemeProvider>
*     <App />   {/* useTheme() works here as usual *\/}
*   </ThemeProvider>
* </FlowMetaProvider>
* ```
*
* @example
* With user theme overrides (user values win over server values):
* ```tsx
* <ThemeProvider theme={{ colors: { primary: { main: '#ff0000' } } }}>
*   <App />
* </ThemeProvider>
* ```
*/
const ThemeProvider = ({ children, theme: themeOverrideProp }) => {
	const themeOverride = normalizeThemeConfig_default(themeOverrideProp);
	const flowMetaContext = useContext(FlowMetaContext_default);
	const flowMetaTheme = flowMetaContext?.meta?.design?.theme ?? null;
	const isLoading = flowMetaContext?.isLoading ?? false;
	const error = flowMetaContext?.error ?? null;
	const [colorScheme, setColorScheme] = useState(() => flowMetaTheme?.defaultColorScheme ?? "light");
	useEffect(() => {
		if (flowMetaTheme?.defaultColorScheme) setColorScheme(flowMetaTheme.defaultColorScheme);
	}, [flowMetaTheme?.defaultColorScheme]);
	const toggleTheme = useCallback(() => {
		setColorScheme((prev) => prev === "light" ? "dark" : "light");
	}, []);
	const finalThemeConfig = useMemo(() => {
		if (!flowMetaTheme) return themeOverride;
		const metaConfig = buildThemeConfigFromFlowMeta_default(flowMetaTheme, colorScheme);
		if (!themeOverride) return metaConfig;
		return {
			...metaConfig,
			...themeOverride,
			borderRadius: {
				...metaConfig.borderRadius,
				...themeOverride.borderRadius
			},
			colors: {
				...metaConfig.colors,
				...themeOverride.colors
			},
			...metaConfig.typography || themeOverride.typography ? { typography: {
				...metaConfig.typography,
				...themeOverride.typography
			} } : {}
		};
	}, [
		flowMetaTheme,
		colorScheme,
		themeOverride
	]);
	const theme = useMemo(() => createTheme(finalThemeConfig, colorScheme === "dark"), [finalThemeConfig, colorScheme]);
	const direction = flowMetaTheme?.direction ?? "ltr";
	useEffect(() => {
		applyThemeToDOM_default(theme);
	}, [theme]);
	useEffect(() => {
		if (typeof document !== "undefined") document.documentElement.dir = direction;
	}, [direction]);
	const value = {
		brandingError: error,
		colorScheme,
		direction,
		inheritFromBranding: false,
		isBrandingLoading: isLoading,
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