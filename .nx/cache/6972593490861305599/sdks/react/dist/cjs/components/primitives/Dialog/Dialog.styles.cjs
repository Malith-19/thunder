const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Dialog/Dialog.styles.ts
/**
* Creates styles for the Dialog component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => (0, react.useMemo)(() => {
	const overlay = __emotion_css.css`
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;
	const content = __emotion_css.css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      box-shadow: 0 2px 8px ${colorScheme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)"};
      font-family: ${theme.vars.typography.fontFamily};
      outline: none;
      overflow-y: auto;
      z-index: 10000;
    `;
	const dropdownContent = __emotion_css.css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      box-shadow: 0 2px 8px ${colorScheme === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)"};
      outline: none;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      z-index: 10000;
    `;
	const header = __emotion_css.css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 3) calc(${theme.vars.spacing.unit} * 4.5);
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const headerTitle = __emotion_css.css`
      margin: 0;
      font-size: 1.2rem;
      font-weight: 600;
      color: ${theme.vars.colors.text.primary};
    `;
	return {
		content,
		contentBody: __emotion_css.css`
      padding: calc(${theme.vars.spacing.unit} * 2);
    `,
		description: __emotion_css.css`
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
exports.default = Dialog_styles_default;
//# sourceMappingURL=Dialog.styles.cjs.map