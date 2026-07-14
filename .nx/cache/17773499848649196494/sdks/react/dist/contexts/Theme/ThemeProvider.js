import useThunderID_default from "../ThunderID/useThunderID.js";
import ThemeProvider_default from "./v1/ThemeProvider.js";
import ThemeProvider_default$1 from "./v2/ThemeProvider.js";
import { Platform } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";

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
	const { platform } = useThunderID_default();
	if (platform === Platform.ThunderID) return /* @__PURE__ */ jsx(ThemeProvider_default$1, {
		theme,
		children
	});
	return /* @__PURE__ */ jsx(ThemeProvider_default, {
		detection,
		inheritFromBranding,
		mode,
		theme,
		children
	});
};
var ThemeProvider_default$2 = ThemeProvider;

//#endregion
export { ThemeProvider_default$2 as default };
//# sourceMappingURL=ThemeProvider.js.map