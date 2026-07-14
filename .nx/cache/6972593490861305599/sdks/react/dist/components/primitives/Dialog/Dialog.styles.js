import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/Dialog/Dialog.styles.ts
/**
* Creates styles for the Dialog component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => useMemo(() => {
	const overlay = css`
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;
	const content = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      box-shadow: 0 2px 8px ${colorScheme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)"};
      font-family: ${theme.vars.typography.fontFamily};
      outline: none;
      overflow-y: auto;
      z-index: 10000;
    `;
	const dropdownContent = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      box-shadow: 0 2px 8px ${colorScheme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)"};
      outline: none;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      z-index: 10000;
    `;
	const header = css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 3) calc(${theme.vars.spacing.unit} * 4.5);
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const headerTitle = css`
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: ${theme.vars.colors.text.primary};
    `;
	return {
		content,
		contentBody: css`
      padding: calc(${theme.vars.spacing.unit} * 2);
    `,
		description: css`
      margin: 0;
      color: ${theme.vars.colors.text.secondary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      line-height: 1.5;
    `,
		dropdownContent,
		header,
		headerTitle,
		overlay
	};
}, [theme, colorScheme]);
var Dialog_styles_default = useStyles;

//#endregion
export { Dialog_styles_default as default };
//# sourceMappingURL=Dialog.styles.js.map