const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

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
const useStyles = (theme, colorScheme, variant, error, marginBottom) => (0, react.useMemo)(() => {
	const baseLabel = __emotion_css.css`
      display: ${variant};
      margin-bottom: ${marginBottom || (variant === "block" ? `calc(${theme.vars.spacing.unit} + 1px)` : "0")};
      color: ${error ? theme.vars.colors.error.main : theme.vars.colors.text.secondary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-family: ${theme.vars.typography.fontFamily};
      font-weight: ${variant === "block" ? 500 : "normal"};
    `;
	const errorLabel = __emotion_css.css`
      color: ${theme.vars.colors.error.main};
    `;
	const requiredIndicator = __emotion_css.css`
      color: ${theme.vars.colors.error.main};
    `;
	return {
		block: __emotion_css.css`
      display: block;
      font-weight: 500;
      margin-bottom: ${marginBottom || `calc(${theme.vars.spacing.unit} + 1px)`};
    `,
		error: errorLabel,
		inline: __emotion_css.css`
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
exports.default = InputLabel_styles_default;
//# sourceMappingURL=InputLabel.styles.cjs.map