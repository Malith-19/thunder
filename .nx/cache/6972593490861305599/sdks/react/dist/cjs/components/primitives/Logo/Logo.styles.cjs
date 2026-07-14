const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Logo/Logo.styles.ts
/**
* Creates styles for the Logo component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param size - The size of the logo
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, size) => (0, react.useMemo)(() => {
	const baseLogo = __emotion_css.css`
      width: auto;
      object-fit: contain;
      display: block;
    `;
	const smallLogo = __emotion_css.css`
      height: 32px;
      max-width: 120px;
    `;
	const mediumLogo = __emotion_css.css`
      height: 48px;
      max-width: 180px;
    `;
	const largeLogo = __emotion_css.css`
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
exports.default = Logo_styles_default;
//# sourceMappingURL=Logo.styles.cjs.map