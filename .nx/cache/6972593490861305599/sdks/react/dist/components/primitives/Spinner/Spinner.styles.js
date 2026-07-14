import { useMemo } from "react";
import { css, keyframes } from "@emotion/css";

//#region src/components/primitives/Spinner/Spinner.styles.ts
/**
* Creates styles for the Spinner component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param size - The size of the spinner
* @param color - The color of the spinner
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, size, color) => useMemo(() => {
	const spinnerColor = color || theme.vars.colors.primary.main;
	const spinnerSizes = {
		large: "32px",
		medium: "20px",
		small: "16px"
	};
	const spinnerSize = spinnerSizes[size];
	const spinner = css`
      width: ${spinnerSize};
      height: ${spinnerSize};
      border: 2px solid transparent;
      border-top: 2px solid ${spinnerColor};
      border-radius: 50%;
      animation: ${keyframes`
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    `} 1s linear infinite;
      display: inline-block;
    `;
	const spinnerSmall = css`
      width: ${spinnerSizes["small"]};
      height: ${spinnerSizes["small"]};
    `;
	const spinnerMedium = css`
      width: ${spinnerSizes["medium"]};
      height: ${spinnerSizes["medium"]};
    `;
	return {
		spinner,
		spinnerLarge: css`
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
export { Spinner_styles_default as default };
//# sourceMappingURL=Spinner.styles.js.map