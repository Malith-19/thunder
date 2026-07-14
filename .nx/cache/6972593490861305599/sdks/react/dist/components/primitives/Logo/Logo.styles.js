import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/Logo/Logo.styles.ts
/**
* Creates styles for the Logo component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param size - The size of the logo
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, size) => useMemo(() => {
	const baseLogo = css`
      width: auto;
      object-fit: contain;
      display: block;
    `;
	const smallLogo = css`
      height: 32px;
      max-width: 120px;
    `;
	const mediumLogo = css`
      height: 48px;
      max-width: 180px;
    `;
	const largeLogo = css`
      height: 64px;
      max-width: 240px;
    `;
	return {
		large: largeLogo,
		logo: baseLogo,
		medium: mediumLogo,
		size: {
			large: largeLogo,
			medium: mediumLogo,
			small: smallLogo
		}[size],
		small: smallLogo
	};
}, [
	theme,
	colorScheme,
	size
]);
var Logo_styles_default = useStyles;

//#endregion
export { Logo_styles_default as default };
//# sourceMappingURL=Logo.styles.js.map