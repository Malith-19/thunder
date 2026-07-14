import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/Toggle/Toggle.styles.ts
const useStyles = (theme, colorScheme, hasError, required) => useMemo(() => {
	const containerStyles = css`
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    `;
	const inputStyles = css`
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
      white-space: nowrap;

      &:focus-visible + div {
        outline: 2px solid ${theme.vars.colors.primary.main};
        outline-offset: 2px;
      }

      &:disabled + div {
        cursor: not-allowed;
        opacity: 0.6;
      }
    `;
	const trackStyles = css`
      position: relative;
      display: inline-flex;
      align-items: center;
      width: 36px;
      height: 20px;
      background-color: ${theme.vars.colors.text.secondary};
      opacity: 0.2;
      border-radius: 9999px;
      transition: all 0.2s ease-in-out;

      input:checked + & {
        background-color: ${theme.vars.colors.primary.main};
        opacity: 1;
      }

      input:disabled + & {
        opacity: 0.4;
      }
    `;
	const thumbStyles = css`
      position: absolute;
      left: 2px;
      width: 16px;
      height: 16px;
      background-color: #fff;
      border-radius: 50%;
      transition: transform 0.2s ease-in-out;

      input:checked + * > & {
        transform: translateX(16px);
      }
    `;
	const labelStyles = css`
      margin-left: calc(${theme.vars.spacing.unit} * 1.5);
      color: ${theme.vars.colors.text.primary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-family: ${theme.vars.typography.fontFamily};
      cursor: pointer;

      input:disabled ~ & {
        cursor: not-allowed;
        opacity: 0.6;
      }
    `;
	const errorLabelStyles = css`
      color: ${theme.vars.colors.error.main};
    `;
	return {
		container: containerStyles,
		errorLabel: hasError ? errorLabelStyles : "",
		input: inputStyles,
		label: labelStyles,
		thumb: thumbStyles,
		track: trackStyles
	};
}, [
	theme,
	colorScheme,
	hasError,
	required
]);
var Toggle_styles_default = useStyles;

//#endregion
export { Toggle_styles_default as default };
//# sourceMappingURL=Toggle.styles.js.map