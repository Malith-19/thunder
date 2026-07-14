import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/FormControl/FormControl.styles.ts
/**
* Creates styles for the FormControl component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param helperTextAlign - The alignment for helper text
* @param helperTextMarginLeft - Custom margin left for helper text
* @param hasError - Whether the form control has an error
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, helperTextAlign, helperTextMarginLeft, hasError) => useMemo(() => {
	return {
		formControl: css`
      text-align: start;
      font-family: ${theme.vars.typography.fontFamily};
    `,
		helperText: css`
      margin-top: calc(${theme.vars.spacing.unit} / 2);
      text-align: ${helperTextAlign === "left" ? "start" : helperTextAlign};
      ${helperTextMarginLeft && `margin-inline-start: ${helperTextMarginLeft};`}
    `,
		helperTextError: css`
      color: ${theme.vars.colors.error.main};
    `
	};
}, [
	theme,
	colorScheme,
	helperTextAlign,
	helperTextMarginLeft,
	hasError
]);
var FormControl_styles_default = useStyles;

//#endregion
export { FormControl_styles_default as default };
//# sourceMappingURL=FormControl.styles.js.map