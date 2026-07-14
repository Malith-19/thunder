const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/OrganizationSwitcher/BaseOrganizationSwitcher.styles.ts
/**
* Creates styles for the BaseOrganizationSwitcher component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => (0, react.useMemo)(() => {
	const root = __emotion_css.css`
      display: inline-block;
      position: relative;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const trigger = __emotion_css.css`
      display: inline-flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 0.75) ${theme.vars.spacing.unit};
      border: 1px solid ${theme.vars.colors.border};
      background: ${theme.vars.colors.background.surface};
      cursor: pointer;
      border-radius: ${theme.vars.borderRadius.medium};
      min-width: 160px;

      > span {
        width: 100%;
        gap: ${theme.vars.spacing.unit};
      }

      &:hover {
        background-color: ${theme.vars.colors.background.surface};
      }
    `;
	const triggerLabel = __emotion_css.css`
      color: ${theme.vars.colors.text.primary};
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    `;
	const content = __emotion_css.css`
      min-width: 280px;
      max-width: 400px;
      background-color: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.medium};
      box-shadow: ${theme.vars.shadows.medium};
      border: 1px solid ${theme.vars.colors.border};
      outline: none;
      z-index: 1000;
    `;
	const header = __emotion_css.css`
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      padding: ${theme.vars.spacing.unit} calc(${theme.vars.spacing.unit} * 2);
    `;
	const headerInfo = __emotion_css.css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} / 4);
      flex: 1;
      min-width: 0;
      overflow: hidden;
    `;
	const headerName = __emotion_css.css`
      color: ${theme.vars.colors.text.primary};
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const headerMeta = __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.75rem;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const headerRole = __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.75rem;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-transform: capitalize;
    `;
	const manageButton = __emotion_css.css`
      min-width: auto;
      margin-inline-start: auto;
    `;
	const menu = __emotion_css.css`
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
      background-color: transparent;
      cursor: pointer;
      font-size: 0.875rem;
      text-align: start;
      border-radius: ${theme.vars.borderRadius.medium};
      transition: background-color 0.15s ease-in-out;

      > span {
        gap: ${theme.vars.spacing.unit};
      }

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.04)"};
      }
    `;
	const menuDivider = __emotion_css.css`
      margin: calc(${theme.vars.spacing.unit} * 0.5) 0;
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const organizationInfo = __emotion_css.css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} / 4);
      flex: 1;
      min-width: 0;
      overflow: hidden;
    `;
	const organizationName = __emotion_css.css`
      color: ${theme.vars.colors.text.primary};
      font-size: 0.875rem;
      font-weight: 500;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const organizationMeta = __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.75rem;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const loadingContainer = __emotion_css.css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80px;
      gap: ${theme.vars.spacing.unit};
    `;
	const loadingText = __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
    `;
	const errorContainer = __emotion_css.css`
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80px;
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	const errorText = __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
      text-align: center;
    `;
	const sectionHeader = __emotion_css.css`
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: ${theme.vars.colors.text.secondary};
    `;
	const sectionHeaderContainer = __emotion_css.css`
      border-top: none;
      border-bottom: none;
      padding-bottom: calc(${theme.vars.spacing.unit} / 2);
    `;
	return {
		content,
		errorContainer,
		errorText,
		header,
		headerInfo,
		headerMeta,
		headerName,
		headerRole,
		loadingContainer,
		loadingText,
		manageButton,
		menu,
		menuDivider,
		menuItem,
		organizationInfo,
		organizationMeta,
		organizationName,
		roleCapitalized: __emotion_css.css`
      text-transform: capitalize;
    `,
		root,
		sectionHeader,
		sectionHeaderContainer,
		trigger,
		triggerLabel
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.colors.border,
	theme.vars.borderRadius.medium,
	theme.vars.shadows.medium,
	theme.vars.spacing.unit,
	theme.vars.colors.action?.hover,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseOrganizationSwitcher_styles_default = useStyles;

//#endregion
exports.default = BaseOrganizationSwitcher_styles_default;
//# sourceMappingURL=BaseOrganizationSwitcher.styles.cjs.map