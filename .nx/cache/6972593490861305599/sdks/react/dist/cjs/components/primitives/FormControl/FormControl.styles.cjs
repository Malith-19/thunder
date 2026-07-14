const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

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
const useStyles = (theme, colorScheme, helperTextAlign, helperTextMarginLeft, hasError) => (0, react.useMemo)(() => {
	return {
		formControl: __emotion_css.css`
      text-align: start;
      font-family: ${theme.vars.typography.fontFamily};
    `,
		helperText: __emotion_css.css`
      margin-top: calc(${theme.vars.spacing.unit} / 2);
      text-align: ${helperTextAlign === "left" ? "start" : helperTextAlign};
      ${helperTextMarginLeft && `margin-inline-start: ${helperTextMarginLeft};`}
    `,
		helperTextError: __emotion_css.css`
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
exports.default = FormControl_styles_default;
//# sourceMappingURL=FormControl.styles.cjs.map