const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Card/Card.styles.ts
/**
* Creates styles for the Card component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param variant - The card variant
* @param clickable - Whether the card is clickable
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, variant, clickable) => (0, react.useMemo)(() => {
	const baseCard = __emotion_css.css`
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
		default: __emotion_css.css`
        /* Base styles only */
      `,
		elevated: __emotion_css.css`
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border: none;
      `,
		outlined: __emotion_css.css`
        border: 1px solid ${theme.vars.colors.border};
      `
	};
	const clickableStyles = __emotion_css.css`
      cursor: pointer;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `;
	const headerStyles = __emotion_css.css`
      padding: 0 calc(${theme.vars.spacing.unit} * 2);
      margin-top: calc(${theme.vars.spacing.unit} * 2);
      display: flex;
      flex-direction: column;
      gap: ${theme.vars.spacing.unit};
    `;
	const titleStyles = __emotion_css.css`
      margin: 0;
      /* Typography component will handle color, fontSize, fontWeight, lineHeight */
    `;
	const descriptionStyles = __emotion_css.css`
      margin: 0;
      color: ${theme.vars.colors.text.secondary};
      font-size: ${theme.vars.typography.fontSizes.sm};
      line-height: 1.5;
    `;
	const actionStyles = __emotion_css.css`
      margin-top: ${theme.vars.spacing.unit};
    `;
	const contentStyles = __emotion_css.css`
      padding: 0 calc(${theme.vars.spacing.unit} * 2);
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
      flex: 1;
    `;
	const footerStyles = __emotion_css.css`
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
exports.default = Card_styles_default;
//# sourceMappingURL=Card.styles.cjs.map