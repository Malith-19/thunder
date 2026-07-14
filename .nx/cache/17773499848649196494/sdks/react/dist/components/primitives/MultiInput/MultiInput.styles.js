import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/MultiInput/MultiInput.styles.ts
/**
* Creates styles for the MultiInput component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param disabled - Whether the component is disabled
* @param hasError - Whether the component has an error
* @param canAddMore - Whether more items can be added
* @param canRemove - Whether items can be removed
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, disabled, hasError, canAddMore, canRemove) => useMemo(() => {
	const container = css`
      display: flex;
      flex-direction: column;
      gap: ${theme.vars.spacing.unit};
    `;
	const inputRow = css`
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      position: relative;
    `;
	const inputWrapper = css`
      flex: 1;
    `;
	const plusIcon = css`
      background: ${theme.vars.colors.secondary.main};
      border-radius: 50%;
      outline: 4px ${theme.vars.colors.secondary.main} auto;
      color: ${theme.vars.colors.secondary.contrastText};
    `;
	const listContainer = css`
      display: flex;
      flex-direction: column;
      gap: 0;
    `;
	const listItem = css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${theme.vars.spacing.unit} calc(${theme.vars.spacing.unit} * 1.5);
      background-color: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.medium};
      font-size: 1rem;
      font-family: ${theme.vars.typography.fontFamily};
      color: ${theme.vars.colors.text.primary};
      margin-bottom: calc(${theme.vars.spacing.unit} / 2);

      &:last-child {
        margin-bottom: 0;
      }
    `;
	const listItemText = css`
      flex: 1;
      word-break: break-word;
    `;
	const removeButton = css`
      padding: calc(${theme.vars.spacing.unit} / 2);
      min-width: auto;
      color: ${theme.vars.colors.error.main};
      background: transparent;
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      cursor: ${disabled ? "not-allowed" : "pointer"};
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) {
        background-color: ${theme.vars.colors.action.hover};
      }

      &:disabled {
        opacity: 0.6;
      }
    `;
	return {
		container,
		icon: css`
      width: 16px;
      height: 16px;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
    `,
		inputRow,
		inputWrapper,
		listContainer,
		listItem,
		listItemText,
		plusIcon,
		removeButton
	};
}, [
	theme,
	colorScheme,
	disabled,
	hasError,
	canAddMore,
	canRemove
]);
var MultiInput_styles_default = useStyles;

//#endregion
export { MultiInput_styles_default as default };
//# sourceMappingURL=MultiInput.styles.js.map