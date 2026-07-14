import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/OtpField/OtpField.styles.ts
/**
* Creates styles for the OtpField component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param disabled - Whether the component is disabled
* @param hasError - Whether the component has an error
* @param length - Number of OTP input fields
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, disabled, hasError, length) => useMemo(() => {
	const inputContainer = css`
      display: flex;
      gap: ${theme.vars.spacing.unit};
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    `;
	const input = css`
      width: calc(${theme.vars.spacing.unit} * 6);
      height: calc(${theme.vars.spacing.unit} * 6);
      text-align: center;
      font-size: ${theme.vars.typography.fontSizes.xl};
      font-family: ${theme.vars.typography.fontFamily};
      font-weight: 500;
      border: 2px solid ${hasError ? theme.vars.colors.error.main : theme.vars.colors.border};
      border-radius: ${theme.vars.components?.Field?.root?.borderRadius || theme.vars.borderRadius.medium};
      color: ${theme.vars.colors.text.primary};
      background-color: ${disabled ? theme.vars.colors.background.disabled : theme.vars.colors.background.surface};
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      &:focus {
        border-color: ${hasError ? theme.vars.colors.error.main : theme.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${hasError ? `${theme.vars.colors.error.main}20` : `${theme.vars.colors.primary.main}20`};
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      &::placeholder {
        color: ${theme.vars.colors.text.secondary};
        opacity: 0.7;
      }
    `;
	const inputError = css`
      border-color: ${theme.vars.colors.error.main};

      &:focus {
        border-color: ${theme.vars.colors.error.main};
        box-shadow: 0 0 0 2px ${theme.vars.colors.error.main}20;
      }
    `;
	return {
		input,
		inputContainer,
		inputDisabled: css`
      background-color: ${theme.vars.colors.background.disabled};
      cursor: not-allowed;
      opacity: 0.6;
    `,
		inputError
	};
}, [
	theme,
	colorScheme,
	disabled,
	hasError,
	length
]);
var OtpField_styles_default = useStyles;

//#endregion
export { OtpField_styles_default as default };
//# sourceMappingURL=OtpField.styles.js.map