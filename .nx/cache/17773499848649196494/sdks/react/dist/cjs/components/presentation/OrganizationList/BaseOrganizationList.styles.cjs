const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/OrganizationList/BaseOrganizationList.styles.ts
/**
* Creates styles for the BaseOrganizationList component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => (0, react.useMemo)(() => {
	const root = __emotion_css.css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      min-width: 600px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
    `;
	const header = __emotion_css.css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: calc(${theme.vars.spacing.unit} * 3);
      padding-bottom: calc(${theme.vars.spacing.unit} * 2);
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
	const headerInfo = __emotion_css.css`
      flex: 1;
    `;
	const title = __emotion_css.css`
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: ${theme.vars.colors.text.primary};
    `;
	const subtitle = __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
      margin: 0;
    `;
	const refreshButton = __emotion_css.css`
      background-color: ${theme.vars.colors.background.surface};
      border: 1px solid ${theme.vars.colors.border};
      border-radius: ${theme.vars.borderRadius.small};
      color: ${theme.vars.colors.text.primary};
      cursor: pointer;
      font-size: 0.875rem;
      padding: ${theme.vars.spacing.unit} calc(${theme.vars.spacing.unit} * 2);
      transition: all 0.2s;
      &:hover {
        background-color: ${theme.vars.colors.background.surface};
        border-color: ${theme.vars.colors.primary.main};
      }
    `;
	const listContainer = __emotion_css.css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
    `;
	const organizationItem = __emotion_css.css`
      border: 1px solid ${theme.vars.colors.border};
      border-radius: ${theme.vars.borderRadius.medium};
      display: flex;
      justify-content: space-between;
      padding: calc(${theme.vars.spacing.unit} * 2);
      transition: all 0.2s;
      background-color: ${theme.vars.colors.background.surface};
      &:hover {
        border-color: ${theme.vars.colors.primary.main};
        box-shadow: 0 2px 8px ${theme.vars.colors.primary.main}20;
      }
    `;
	const organizationContent = __emotion_css.css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 2);
      flex: 1;
    `;
	const organizationInfo = __emotion_css.css`
      flex: 1;
    `;
	const organizationName = __emotion_css.css`
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: ${theme.vars.colors.text.primary};
    `;
	const organizationHandle = __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
      margin: 0 0 4px 0;
      font-family: monospace;
    `;
	const organizationStatus = __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 0.875rem;
      margin: 0;
    `;
	const statusText = __emotion_css.css`
      font-weight: 500;
    `;
	const statusTextActive = __emotion_css.css`
      color: ${theme.vars.colors.success.main};
    `;
	const statusTextInactive = __emotion_css.css`
      color: ${theme.vars.colors.error.main};
    `;
	const organizationActions = __emotion_css.css`
      display: flex;
      align-items: center;
    `;
	const badge = __emotion_css.css`
      border-radius: ${theme.vars.borderRadius.large};
      font-size: 0.75rem;
      font-weight: 500;
      padding: calc(${theme.vars.spacing.unit} / 2) calc(${theme.vars.spacing.unit} * 1.5);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    `;
	const badgeSuccess = __emotion_css.css`
      background-color: color-mix(in srgb, ${theme.vars.colors.success.main} 20%, transparent);
      color: ${theme.vars.colors.success.main};
    `;
	const badgeError = __emotion_css.css`
      background-color: color-mix(in srgb, ${theme.vars.colors.error.main} 20%, transparent);
      color: ${theme.vars.colors.error.main};
    `;
	const loadingContainer = __emotion_css.css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const loadingText = __emotion_css.css`
      margin-top: ${theme.vars.spacing.unit};
    `;
	const errorContainer = __emotion_css.css`
      background-color: color-mix(in srgb, ${theme.vars.colors.error.main} 20%, transparent);
      border: 1px solid ${theme.vars.colors.error.main};
      border-radius: ${theme.vars.borderRadius.medium};
      color: ${theme.vars.colors.error.main};
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	const emptyContainer = __emotion_css.css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      text-align: center;
    `;
	const emptyText = __emotion_css.css`
      color: ${theme.vars.colors.text.secondary};
      font-size: 1rem;
    `;
	const loadMoreButton = __emotion_css.css`
      background-color: ${theme.vars.colors.primary.main};
      border: none;
      border-radius: ${theme.vars.borderRadius.medium};
      color: ${theme.vars.colors.primary.contrastText};
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      padding: calc(${theme.vars.spacing.unit} * 1.5) calc(${theme.vars.spacing.unit} * 3);
      width: 100%;
      transition: all 0.2s;
      &:hover:not(:disabled) {
        background-color: ${theme.vars.colors.primary.main};
        opacity: 0.9;
      }
      &:disabled {
        background-color: ${theme.vars.colors.text.secondary};
        cursor: not-allowed;
        opacity: 0.6;
      }
    `;
	return {
		badge,
		badgeError,
		badgeSuccess,
		emptyContainer,
		emptyText,
		errorContainer,
		errorMargin: __emotion_css.css`
      margin-top: calc(${theme.vars.spacing.unit} * 2);
    `,
		header,
		headerInfo,
		listContainer,
		loadMoreButton,
		loadMoreMargin: __emotion_css.css`
      margin-top: calc(${theme.vars.spacing.unit} * 3);
    `,
		loadingContainer,
		loadingText,
		organizationActions,
		organizationContent,
		organizationHandle,
		organizationInfo,
		organizationItem,
		organizationName,
		organizationStatus,
		popupContent: __emotion_css.css`
      padding: ${theme.vars.spacing.unit};
    `,
		refreshButton,
		root,
		statusText,
		statusTextActive,
		statusTextInactive,
		subtitle,
		title
	};
}, [
	theme.vars.spacing.unit,
	theme.vars.colors.background.surface,
	theme.vars.colors.border,
	theme.vars.borderRadius.large,
	theme.vars.borderRadius.medium,
	theme.vars.borderRadius.small,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.colors.primary.main,
	theme.vars.colors.success.main,
	theme.vars.colors.error.main,
	theme.vars.colors.primary.contrastText,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseOrganizationList_styles_default = useStyles;

//#endregion
exports.default = BaseOrganizationList_styles_default;
//# sourceMappingURL=BaseOrganizationList.styles.cjs.map