import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/KeyValueInput/KeyValueInput.styles.ts
/**
* Creates styles for the KeyValueInput component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param disabled - Whether the component is disabled
* @param readOnly - Whether the component is read-only
* @param hasError - Whether the component has an error
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, disabled, readOnly, hasError) => useMemo(() => {
	const container = css`
      display: flex;
      flex-direction: column;
      font-family: ${theme.vars.typography.fontFamily};
      gap: calc(${theme.vars.spacing.unit} / 2);
    `;
	const label = css`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${theme.vars.colors.text.primary};
      margin-bottom: calc(${theme.vars.spacing.unit} / 2);
    `;
	const requiredIndicator = css`
      color: ${theme.vars.colors.error.main};
    `;
	const pairsList = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} / 4);
    `;
	const pairRow = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} / 2);
      padding: calc(${theme.vars.spacing.unit} / 2);
      border-radius: ${theme.vars.borderRadius.small};
      background-color: transparent;
      border: none;

      &:hover {
        background-color: ${theme.vars.colors.action.hover};
      }
    `;
	const pairInput = css`
      flex: 1;
      min-width: 0;
    `;
	const addRow = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} / 2);
      padding: calc(${theme.vars.spacing.unit} / 2);
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      background-color: transparent;
      margin-top: calc(${theme.vars.spacing.unit} / 2);
    `;
	const removeButton = css`
      min-width: auto;
      width: 24px;
      height: 24px;
      padding: 0;
      background-color: transparent;
      color: ${theme.vars.colors.text.secondary};
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: ${disabled ? "not-allowed" : "pointer"};

      &:hover:not(:disabled) {
        background-color: ${theme.vars.colors.action.hover};
        color: ${theme.vars.colors.error.main};
      }

      &:disabled {
        opacity: 0.6;
      }
    `;
	const addButton = css`
      min-width: auto;
      width: 24px;
      height: 24px;
      padding: 0;
      background-color: transparent;
      color: ${theme.vars.colors.primary.main};
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: ${disabled ? "not-allowed" : "pointer"};

      &:hover:not(:disabled) {
        background-color: ${theme.vars.colors.primary.main};
        color: ${theme.vars.colors.primary.contrastText};
      }

      &:disabled {
        opacity: 0.6;
      }
    `;
	const helperText = css`
      font-size: 0.75rem;
      color: ${hasError ? theme.vars.colors.error.main : theme.vars.colors.text.secondary};
      margin-top: calc(${theme.vars.spacing.unit} / 2);
    `;
	const emptyState = css`
      padding: ${theme.vars.spacing.unit};
      text-align: center;
      color: ${theme.vars.colors.text.secondary};
      font-style: italic;
      font-size: 0.75rem;
    `;
	const readOnlyPair = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} / 2);
      padding: calc(${theme.vars.spacing.unit} / 4) 0;
      min-height: 20px;
    `;
	const readOnlyKey = css`
      font-size: 0.75rem;
      font-weight: 500;
      color: ${theme.vars.colors.text.secondary};
      min-width: 80px;
      flex-shrink: 0;
    `;
	const readOnlyValue = css`
      font-size: 0.75rem;
      color: ${theme.vars.colors.text.primary};
      word-break: break-word;
      flex: 1;
    `;
	return {
		addButton,
		addRow,
		container,
		counterText: css`
      font-size: 0.75rem;
      color: ${theme.vars.colors.text.secondary};
      margin-top: calc(${theme.vars.spacing.unit} / 2);
    `,
		emptyState,
		helperText,
		label,
		pairInput,
		pairRow,
		pairsList,
		readOnlyKey,
		readOnlyPair,
		readOnlyValue,
		removeButton,
		requiredIndicator
	};
}, [
	theme,
	colorScheme,
	disabled,
	readOnly,
	hasError
]);
var KeyValueInput_styles_default = useStyles;

//#endregion
export { KeyValueInput_styles_default as default };
//# sourceMappingURL=KeyValueInput.styles.js.map