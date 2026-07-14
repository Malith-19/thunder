import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/presentation/CreateOrganization/BaseCreateOrganization.styles.ts
/**
* Creates styles for the BaseCreateOrganization component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => useMemo(() => {
	const root = css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      min-width: 600px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const card = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      padding: calc(${theme.vars.spacing.unit} * 4);
    `;
	const content = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const form = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
      width: 100%;
    `;
	const header = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
      margin-bottom: calc(${theme.vars.spacing.unit} * 1.5);
    `;
	const field = css`
      display: flex;
      align-items: center;
      padding: ${theme.vars.spacing.unit} 0;
      border-bottom: 1px solid ${theme.vars.colors.border};
      min-height: 32px;
    `;
	const fieldGroup = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 0.5);
    `;
	const textarea = css`
      width: 100%;
      padding: ${theme.vars.spacing.unit} calc(${theme.vars.spacing.unit} * 1.5);
      border: 1px solid ${theme.vars.colors.border};
      border-radius: ${theme.vars.borderRadius.medium};
      font-size: ${theme.vars.typography.fontSizes.md};
      color: ${theme.vars.colors.text.primary};
      background-color: ${theme.vars.colors.background.surface};
      font-family: ${theme.vars.typography.fontFamily};
      min-height: 80px;
      resize: vertical;
      outline: none;
      &:focus {
        border-color: ${theme.vars.colors.primary.main};
        box-shadow: 0 0 0 2px ${theme.vars.colors.primary.main}20;
      }
      &:disabled {
        background-color: ${theme.vars.colors.background.disabled};
        color: ${theme.vars.colors.text.secondary};
        cursor: not-allowed;
      }
    `;
	const textareaError = css`
      border-color: ${theme.vars.colors.error.main};
    `;
	const input = css``;
	const avatarContainer = css`
      align-items: flex-start;
      display: flex;
      gap: calc(${theme.vars.spacing.unit} * 2);
      margin-bottom: ${theme.vars.spacing.unit};
    `;
	const actions = css`
      display: flex;
      gap: ${theme.vars.spacing.unit};
      justify-content: flex-end;
      padding-top: calc(${theme.vars.spacing.unit} * 2);
    `;
	const infoContainer = css`
      display: flex;
      flex-direction: column;
      gap: ${theme.vars.spacing.unit};
    `;
	const value = css`
      color: ${theme.vars.colors.text.primary};
      flex: 1;
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      overflow: hidden;
      min-height: 32px;
      line-height: 32px;
    `;
	const popup = css`
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	return {
		actions,
		avatarContainer,
		card,
		content,
		errorAlert: css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `,
		field,
		fieldGroup,
		form,
		header,
		infoContainer,
		input,
		popup,
		root,
		textarea,
		textareaError,
		value
	};
}, [
	theme.vars.spacing.unit,
	theme.vars.colors.background.surface,
	theme.vars.colors.border,
	theme.vars.borderRadius.large,
	theme.vars.borderRadius.medium,
	theme.vars.typography.fontSizes.md,
	theme.vars.colors.text.primary,
	theme.vars.colors.primary.main,
	theme.vars.colors.background.disabled,
	theme.vars.colors.text.secondary,
	theme.vars.colors.error.main,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseCreateOrganization_styles_default = useStyles;

//#endregion
export { BaseCreateOrganization_styles_default as default };
//# sourceMappingURL=BaseCreateOrganization.styles.js.map