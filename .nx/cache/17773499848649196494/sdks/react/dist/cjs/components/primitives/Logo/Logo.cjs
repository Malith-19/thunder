const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Logo_styles = require('./Logo.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Logo/Logo.tsx
/**
* Logo component that displays the brand logo from theme or custom source.
*
* @param props - The props for the Logo component.
* @returns The rendered Logo component.
*/
const Logo = ({ className, src, alt, title, size = "medium" }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_Logo_styles.default(theme, colorScheme, size);
	const logoConfig = theme.images?.logo;
	const logoSrc = src || logoConfig?.["url"];
	const logoAlt = alt || logoConfig?.["alt"] || "Logo";
	const logoTitle = title || logoConfig?.["title"];
	if (!logoSrc) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
		src: logoSrc,
		alt: logoAlt,
		title: logoTitle,
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("logo")), (0, __thunderid_browser.withVendorCSSClassPrefix)((0, __thunderid_browser.bem)("logo", size)), styles["logo"], styles["size"], className)
	});
};
var Logo_default = Logo;

//#endregion
exports.default = Logo_default;
//# sourceMappingURL=Logo.cjs.map