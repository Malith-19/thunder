const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../ThunderID/useThunderID.cjs');
const require_ThemeProvider = require('./v1/ThemeProvider.cjs');
const require_ThemeProvider$1 = require('./v2/ThemeProvider.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/contexts/Theme/ThemeProvider.tsx
/**
* ThemeProvider is the single entry-point for theme management in `@thunderid/react`.
*
* It transparently switches between two internal implementations:
*
* **v1** (`ThemeProvider` classic): Sources colors from the ThunderID Branding API.
* Used automatically when no `FlowMetaProvider` is present in the component tree.
*
* **v2** (`FlowMetaThemeProvider`): Sources colors from the `GET /flow/meta` endpoint
* via `FlowMetaProvider`. Used automatically when a `FlowMetaProvider` is present
* in the tree — or when `version="v2"` is set explicitly.
*
* The active version can also be pinned explicitly via the `version` prop.
* All components that consume `useTheme()` continue to work regardless of which
* version is active.
*
* @example
* Auto-detection (recommended):
* ```tsx
* // v2 mode – FlowMetaProvider is present
* <FlowMetaProvider config={{ baseUrl, type: FlowMetaType.App, id: appId }}>
*   <ThemeProvider>
*     <App />
*   </ThemeProvider>
* </FlowMetaProvider>
*
* // v1 mode – no FlowMetaProvider
* <ThemeProvider>
*   <App />
* </ThemeProvider>
* ```
*
* @example
* Explicit version pinning:
* ```tsx
* <ThemeProvider version="v2">
*   <App />
* </ThemeProvider>
* ```
*/
const ThemeProvider = ({ children, theme, detection, inheritFromBranding, mode }) => {
	const { platform } = require_useThunderID.default();
	if (platform === __thunderid_browser.Platform.ThunderID) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ThemeProvider$1.default, {
		theme,
		children
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ThemeProvider.default, {
		detection,
		inheritFromBranding,
		mode,
		theme,
		children
	});
};
var ThemeProvider_default$2 = ThemeProvider;

//#endregion
exports.default = ThemeProvider_default$2;
//# sourceMappingURL=ThemeProvider.cjs.map