const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/PasswordField/PasswordField.styles.ts
/**
* Creates styles for the PasswordField component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param showPassword - Whether the password is currently visible
* @param disabled - Whether the component is disabled
* @param hasError - Whether the component has an error
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, showPassword, disabled, hasError) => (0, react.useMemo)(() => {
	const toggleIcon = __emotion_css.css`
      cursor: ${disabled ? "not-allowed" : "pointer"};
      color: ${theme.vars.colors.text.secondary};
      opacity: ${disabled ? .6 : 1};
      transition: color 0.2s ease;

      &:hover {
        color: ${!disabled ? theme.vars.colors.text.primary : theme.vars.colors.text.secondary};
      }
    `;
	const visibleIcon = __emotion_css.css`
      color: ${theme.vars.colors.primary.main};
    `;
	return {
		hiddenIcon: __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
    `,
		toggleIcon,
		visibleIcon
	};
}, [
	theme,
	colorScheme,
	showPassword,
	disabled,
	hasError
]);
var PasswordField_styles_default = useStyles;

//#endregion
exports.default = PasswordField_styles_default;
//# sourceMappingURL=PasswordField.styles.cjs.map