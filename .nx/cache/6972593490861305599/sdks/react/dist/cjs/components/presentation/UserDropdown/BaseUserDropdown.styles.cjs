const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/UserDropdown/BaseUserDropdown.styles.ts
/**
* Creates styles for the BaseUserDropdown component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => (0, react.useMemo)(() => {
	const trigger = __emotion_css.css`
      display: inline-flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 0.75);
      padding: calc(${theme.vars.spacing.unit} * 0.5);
      background: none;
      border: none;
      cursor: pointer;
      border-radius: ${theme.vars.borderRadius.medium};
      transition: none;
      box-shadow: none;
      background-color: transparent;

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.05)"};
      }

      &:focus {
        outline: 2px solid ${theme.vars.colors.primary};
        outline-offset: 2px;
      }

      &:hover,
      &:focus,
      &:active,
      &:focus-visible {
        transition: none;
        box-shadow: none;
      }
    `;
	const userName = __emotion_css.css`
      color: ${theme.vars.colors.text.primary};
      font-size: 0.875rem;
      font-weight: 500;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const dropdownContent = __emotion_css.css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      box-shadow:
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border: 1px solid ${theme.vars.colors.border};
      font-family: ${theme.vars.typography.fontFamily};
      min-width: 250px;
      max-width: 600px;
      z-index: 1000;
      overflow: hidden;
    `;
	const dropdownMenu = __emotion_css.css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `;
	const menuItem = __emotion_css.css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 1.5) calc(${theme.vars.spacing.unit} * 2);
      width: 100%;
      color: ${theme.vars.colors.text.primary};
      text-decoration: none;
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      text-align: start;
      border-radius: ${theme.vars.borderRadius.medium};
      transition: none;
      box-shadow: none;
      background: transparent;

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.05)"};
      }

      &:hover,
      &:focus,
      &:active,
      &:focus-visible {
        transition: none;
        box-shadow: none;
      }
    `;
	const menuItemAnchor = __emotion_css.css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 1.5) calc(${theme.vars.spacing.unit} * 2);
      width: 100%;
      color: ${theme.vars.colors.text.primary};
      text-decoration: none;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 0.875rem;
      text-align: start;
      border-radius: ${theme.vars.borderRadius.medium};
      transition: background-color 0.15s ease-in-out;

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.05)"};
      }
    `;
	const divider = __emotion_css.css`
      margin: calc(${theme.vars.spacing.unit} * 0.5) 0;
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const dropdownHeader = __emotion_css.css`
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 1.5);
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const headerInfo = __emotion_css.css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} / 4);
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const headerName = __emotion_css.css`
      color: ${theme.vars.colors.text.primary};
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	return {
		divider,
		dropdownContent,
		dropdownHeader,
		dropdownMenu,
		headerEmail: __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
		headerInfo,
		headerName,
		loadingContainer: __emotion_css.css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80px;
      gap: ${theme.vars.spacing.unit};
    `,
		loadingText: __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
    `,
		menuItem,
		menuItemAnchor,
		trigger,
		userName
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.colors.border,
	theme.vars.colors.primary,
	theme.vars.colors.action?.hover,
	theme.vars.borderRadius.medium,
	theme.vars.borderRadius.large,
	theme.vars.spacing.unit,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseUserDropdown_styles_default = useStyles;

//#endregion
exports.default = BaseUserDropdown_styles_default;
//# sourceMappingURL=BaseUserDropdown.styles.cjs.map