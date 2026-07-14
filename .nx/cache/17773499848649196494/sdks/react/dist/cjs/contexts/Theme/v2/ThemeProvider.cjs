const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_FlowMetaContext = require('../../FlowMeta/FlowMetaContext.cjs');
const require_applyThemeToDOM = require('../../../utils/applyThemeToDOM.cjs');
const require_normalizeThemeConfig = require('../../../utils/normalizeThemeConfig.cjs');
const require_ThemeContext = require('../ThemeContext.cjs');
const require_buildThemeConfigFromFlowMeta = require('../../../utils/v2/buildThemeConfigFromFlowMeta.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

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
	const themeOverride = require_normalizeThemeConfig.default(themeOverrideProp);
	const flowMetaContext = (0, react.useContext)(require_FlowMetaContext.default);
	const flowMetaTheme = flowMetaContext?.meta?.design?.theme ?? null;
	const isLoading = flowMetaContext?.isLoading ?? false;
	const error = flowMetaContext?.error ?? null;
	const [colorScheme, setColorScheme] = (0, react.useState)(() => flowMetaTheme?.defaultColorScheme ?? "light");
	(0, react.useEffect)(() => {
		if (flowMetaTheme?.defaultColorScheme) setColorScheme(flowMetaTheme.defaultColorScheme);
	}, [flowMetaTheme?.defaultColorScheme]);
	const toggleTheme = (0, react.useCallback)(() => {
		setColorScheme((prev) => prev === "light" ? "dark" : "light");
	}, []);
	const finalThemeConfig = (0, react.useMemo)(() => {
		if (!flowMetaTheme) return themeOverride;
		const metaConfig = require_buildThemeConfigFromFlowMeta.default(flowMetaTheme, colorScheme);
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
	const theme = (0, react.useMemo)(() => (0, __thunderid_browser.createTheme)(finalThemeConfig, colorScheme === "dark"), [finalThemeConfig, colorScheme]);
	const direction = flowMetaTheme?.direction ?? "ltr";
	(0, react.useEffect)(() => {
		require_applyThemeToDOM.default(theme);
	}, [theme]);
	(0, react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ThemeContext.default.Provider, {
		value,
		children
	});
};
var ThemeProvider_default = ThemeProvider;

//#endregion
exports.default = ThemeProvider_default;
//# sourceMappingURL=ThemeProvider.cjs.map