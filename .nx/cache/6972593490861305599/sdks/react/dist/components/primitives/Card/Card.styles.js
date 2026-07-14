import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/Card/Card.styles.ts
/**
* Creates styles for the Card component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param variant - The card variant
* @param clickable - Whether the card is clickable
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, variant, clickable) => useMemo(() => {
	const baseCard = css`
      border-radius: ${theme.vars.borderRadius.medium};
      background-color: ${theme.vars.colors.background.surface};
      font-family: ${theme.vars.typography.fontFamily};
      transition: all 0.2s ease-in-out;
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	const variantStyles = {
		default: css`
        /* Base styles only */
      `,
		elevated: css`
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: none;
      `,
		outlined: css`
        border: 1px solid ${theme.vars.colors.border};
      `
	};
	const clickableStyles = css`
      cursor: pointer;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `;
	const headerStyles = css`
      padding: 0 calc(${theme.vars.spacing.unit} * 2);
      margin-top: calc(${theme.vars.spacing.unit} * 2);
      display: flex;
      flex-direction: column;
      gap: ${theme.vars.spacing.unit};
    `;
	const titleStyles = css`
      margin: 0;
      /* Typography component will handle color, fontSize, fontWeight, lineHeight */
    `;
	const descriptionStyles = css`
      margin: 0;
      color: ${theme.vars.colors.text.secondary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      line-height: 1.5;
    `;
	const actionStyles = css`
      margin-top: ${theme.vars.spacing.unit};
    `;
	const contentStyles = css`
      padding: 0 calc(${theme.vars.spacing.unit} * 2);
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
      flex: 1;
    `;
	const footerStyles = css`
      padding: 0 calc(${theme.vars.spacing.unit} * 2) calc(${theme.vars.spacing.unit} * 2);
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
    `;
	return {
		action: actionStyles,
		card: baseCard,
		clickable: clickable ? clickableStyles : "",
		content: contentStyles,
		description: descriptionStyles,
		footer: footerStyles,
		header: headerStyles,
		title: titleStyles,
		variant: variantStyles[variant]
	};
}, [
	theme,
	colorScheme,
	variant,
	clickable
]);
var Card_styles_default = useStyles;

//#endregion
export { Card_styles_default as default };
//# sourceMappingURL=Card.styles.js.map