import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/Checkbox/Checkbox.styles.ts
/**
* Creates styles for the Checkbox component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param hasError - Whether the checkbox has an error state
* @param required - Whether the checkbox is required
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, hasError, required) => useMemo(() => {
	const containerStyles = css`
      display: flex;
      align-items: center;
    `;
	const inputStyles = css`
      width: calc(${theme.vars.spacing.unit} * 2.5);
      height: calc(${theme.vars.spacing.unit} * 2.5);
      margin-inline-end: ${theme.vars.spacing.unit};
      accent-color: ${theme.vars.colors.primary.main};
      cursor: pointer;

      &:focus {
        outline: 2px solid ${theme.vars.colors.primary.main};
        outline-offset: 2px;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    `;
	const errorInputStyles = css`
      accent-color: ${theme.vars.colors.error.main};

      &:focus {
        outline-color: ${theme.vars.colors.error.main};
      }
    `;
	const labelStyles = css`
      color: ${theme.vars.colors.text.primary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-family: ${theme.vars.typography.fontFamily};
      cursor: pointer;

      &:hover {
        color: ${theme.vars.colors.text.primary};
      }
    `;
	const errorLabelStyles = css`
      color: ${theme.vars.colors.error.main};
    `;
	const requiredStyles = css`
      /* Required indicator styles will be handled by InputLabel */
    `;
	return {
		container: containerStyles,
		errorInput: hasError ? errorInputStyles : "",
		errorLabel: hasError ? errorLabelStyles : "",
		input: inputStyles,
		label: labelStyles,
		required: required ? requiredStyles : ""
	};
}, [
	theme,
	colorScheme,
	hasError,
	required
]);
var Checkbox_styles_default = useStyles;

//#endregion
export { Checkbox_styles_default as default };
//# sourceMappingURL=Checkbox.styles.js.map