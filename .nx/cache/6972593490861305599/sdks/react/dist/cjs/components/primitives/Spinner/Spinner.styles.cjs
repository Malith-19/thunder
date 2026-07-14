const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Spinner/Spinner.styles.ts
/**
* Creates styles for the Spinner component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param size - The size of the spinner
* @param color - The color of the spinner
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, size, color) => (0, react.useMemo)(() => {
	const spinnerColor = color || theme.vars.colors.primary.main;
	const spinnerSizes = {
		large: "32px",
		medium: "20px",
		small: "16px"
	};
	const spinnerSize = spinnerSizes[size];
	const spinner = __emotion_css.css`
      width: ${spinnerSize};
      height: ${spinnerSize};
      border: 2px solid transparent;
      border-top: 2px solid ${spinnerColor};
      border-radius: 50%;
      animation: ${__emotion_css.keyframes`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `} 1s linear infinite;
      display: inline-block;
    `;
	const spinnerSmall = __emotion_css.css`
      width: ${spinnerSizes["small"]};
      height: ${spinnerSizes["small"]};
    `;
	const spinnerMedium = __emotion_css.css`
      width: ${spinnerSizes["medium"]};
      height: ${spinnerSizes["medium"]};
    `;
	return {
		spinner,
		spinnerLarge: __emotion_css.css`
      width: ${spinnerSizes["large"]};
      height: ${spinnerSizes["large"]};
    `,
		spinnerMedium,
		spinnerSmall
	};
}, [
	theme,
	colorScheme,
	size,
	color
]);
var Spinner_styles_default = useStyles;

//#endregion
exports.default = Spinner_styles_default;
//# sourceMappingURL=Spinner.styles.cjs.map