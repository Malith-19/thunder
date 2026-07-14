import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/InputLabel/InputLabel.styles.ts
/**
* Creates styles for the InputLabel component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param variant - The display variant of the label
* @param error - Whether the label has an error state
* @param marginBottom - Custom margin bottom value
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, variant, error, marginBottom) => useMemo(() => {
	const baseLabel = css`
      display: ${variant};
      margin-bottom: ${marginBottom || (variant === "block" ? `calc(${theme.vars.spacing.unit} + 1px)` : "0")};
      color: ${error ? theme.vars.colors.error.main : theme.vars.colors.text.secondary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-family: ${theme.vars.typography.fontFamily};
      font-weight: ${variant === "block" ? 500 : "normal"};
    `;
	const errorLabel = css`
      color: ${theme.vars.colors.error.main};
    `;
	const requiredIndicator = css`
      color: ${theme.vars.colors.error.main};
    `;
	return {
		block: css`
      display: block;
      font-weight: 500;
      margin-bottom: ${marginBottom || `calc(${theme.vars.spacing.unit} + 1px)`};
    `,
		error: errorLabel,
		inline: css`
      display: inline;
      font-weight: normal;
      margin-bottom: 0;
    `,
		label: baseLabel,
		requiredIndicator
	};
}, [
	theme,
	colorScheme,
	variant,
	error,
	marginBottom
]);
var InputLabel_styles_default = useStyles;

//#endregion
export { InputLabel_styles_default as default };
//# sourceMappingURL=InputLabel.styles.js.map