import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Logo_styles_default from "./Logo.styles.js";
import { bem, withVendorCSSClassPrefix } from "@thunderid/browser";
import { jsx } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/primitives/Logo/Logo.tsx
/**
* Logo component that displays the brand logo from theme or custom source.
*
* @param props - The props for the Logo component.
* @returns The rendered Logo component.
*/
const Logo = ({ className, src, alt, title, size = "medium" }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = Logo_styles_default(theme, colorScheme, size);
	const logoConfig = theme.images?.logo;
	const logoSrc = src || logoConfig?.["url"];
	const logoAlt = alt || logoConfig?.["alt"] || "Logo";
	const logoTitle = title || logoConfig?.["title"];
	if (!logoSrc) return null;
	return /* @__PURE__ */ jsx("img", {
		src: logoSrc,
		alt: logoAlt,
		title: logoTitle,
		className: cx(withVendorCSSClassPrefix(bem("logo")), withVendorCSSClassPrefix(bem("logo", size)), styles["logo"], styles["size"], className)
	});
};
var Logo_default = Logo;

//#endregion
export { Logo_default as default };
//# sourceMappingURL=Logo.js.map