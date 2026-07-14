import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/presentation/UserProfile/BaseUserProfile.styles.ts
/**
* Creates styles for the BaseUserProfile component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => {
	const valuePlaceholder = css`
    font-style: italic;
    opacity: 0.7;
  `;
	const editButton = css`
    font-style: italic;
    text-decoration: underline;
    opacity: 0.7;
    padding: 0;
    min-height: auto;

    &:hover:not(:disabled) {
      background-color: transparent;
    }
  `;
	const fieldInner = css`
    flex: 1;
    display: flex;
    align-items: center;
    gap: ${theme.vars.spacing.unit};
  `;
	const fieldActions = css`
    display: flex;
    gap: calc(${theme.vars.spacing.unit} / 2);
    align-items: center;
    margin-inline-start: calc(${theme.vars.spacing.unit} * 4);
  `;
	const complexTextarea = css`
    min-height: 60px;
    width: 100%;
    padding: 8px;
    border: 1px solid ${theme.vars.colors.border};
    border-radius: ${theme.vars.borderRadius.small};
    resize: vertical;
  `;
	const objectKey = css`
    padding: ${theme.vars.spacing.unit};
    vertical-align: top;
  `;
	const objectValue = css`
    padding: ${theme.vars.spacing.unit};
    vertical-align: top;
  `;
	return useMemo(() => {
		const root = css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      min-width: 600px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
    `;
		const card = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
    `;
		const header = css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
      margin-bottom: calc(${theme.vars.spacing.unit} * 1.5);
    `;
		const profileInfo = css`
      flex: 1;
    `;
		const name = css`
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      color: ${theme.vars.colors.text.primary};
    `;
		const profileSummary = css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    `;
		const sectionRow = css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
		const sectionLabel = css`
      font-size: 0.875rem;
      font-weight: 600;
      color: ${theme.vars.colors.text.primary};
      width: 160px;
      flex-shrink: 0;
    `;
		const sectionValue = css`
      flex: 1;
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
      font-size: 0.875rem;
      color: ${theme.vars.colors.text.primary};
    `;
		const infoContainer = css`
      display: flex;
      flex-direction: column;
    `;
		const info = css`
      padding: calc(${theme.vars.spacing.unit} * 1.5) 0;
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
		const field = css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} / 2) 0;
      min-height: 28px;
    `;
		const lastField = css`
      border-bottom: none;
    `;
		const label = css`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${theme.vars.colors.text.secondary};
      width: 120px;
      flex-shrink: 0;
      line-height: 28px;
      text-align: start;
    `;
		const value = css`
      color: ${theme.vars.colors.text.primary};
      flex: 1;
      display: inline-block;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      overflow: hidden;
      min-height: 28px;
      line-height: 28px;
      word-break: break-word;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 350px;
      text-align: start;

      .${withVendorCSSClassPrefix("form-control")} {
        margin-bottom: 0;
      }

      input {
        margin: 0;
      }

      table {
        background-color: ${theme.vars.colors.background.surface};
        border-radius: ${theme.vars.borderRadius.medium};
        white-space: normal;
      }

      td {
        border-color: ${theme.vars.colors.border};
      }
    `;
		const popup = css`
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
		return {
			alert: css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 3);
    `,
			card,
			complexTextarea,
			editButton,
			field,
			fieldActions,
			fieldInner,
			header,
			info,
			infoContainer,
			label,
			lastField,
			name,
			objectKey,
			objectValue,
			popup,
			profileInfo,
			profileSummary,
			root,
			sectionLabel,
			sectionRow,
			sectionValue,
			value,
			valuePlaceholder
		};
	}, [
		theme.vars.colors.background.surface,
		theme.vars.colors.text.primary,
		theme.vars.colors.text.secondary,
		theme.vars.colors.border,
		theme.vars.borderRadius.large,
		theme.vars.borderRadius.medium,
		theme.vars.spacing.unit,
		theme.vars.typography.fontFamily,
		colorScheme
	]);
};
var BaseUserProfile_styles_default = useStyles;

//#endregion
export { BaseUserProfile_styles_default as default };
//# sourceMappingURL=BaseUserProfile.styles.js.map