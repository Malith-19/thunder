import { useMemo } from "react";
import { css } from "@emotion/css";

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
const useStyles = (theme, colorScheme, showPassword, disabled, hasError) => useMemo(() => {
	const toggleIcon = css`
      cursor: ${disabled ? "not-allowed" : "pointer"};
      color: ${theme.vars.colors.text.secondary};
      opacity: ${disabled ? .6 : 1};
      transition: color 0.2s ease;

      &:hover {
        color: ${!disabled ? theme.vars.colors.text.primary : theme.vars.colors.text.secondary};
      }
    `;
	const visibleIcon = css`
      color: ${theme.vars.colors.primary.main};
    `;
	return {
		hiddenIcon: css`
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
export { PasswordField_styles_default as default };
//# sourceMappingURL=PasswordField.styles.js.map