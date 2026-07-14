const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/OrganizationProfile/BaseOrganizationProfile.styles.ts
/**
* Creates styles for the BaseOrganizationProfile component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => (0, react.useMemo)(() => ({
	attributeItem: __emotion_css.css`
        display: flex;
        gap: ${theme.vars.spacing.unit};
        padding: calc(${theme.vars.spacing.unit} / 4) 0;
        align-items: center;
      `,
	attributeKey: __emotion_css.css`
        font-size: 0.75rem;
        font-weight: 500;
        color: ${theme.vars.colors.text.secondary};
        min-width: 80px;
        flex-shrink: 0;
      `,
	attributeValue: __emotion_css.css`
        font-size: 0.75rem;
        color: ${theme.vars.colors.text.primary};
        word-break: break-word;
        flex: 1;
      `,
	attributesList: __emotion_css.css`
        display: flex;
        flex-direction: column;
        gap: calc(${theme.vars.spacing.unit} / 4);
      `,
	card: __emotion_css.css`
        background: ${theme.vars.colors.background.surface};
        border-radius: ${theme.vars.borderRadius.large};
      `,
	editButton: __emotion_css.css`
        min-width: auto;
        padding: calc(${theme.vars.spacing.unit} / 2);
        min-height: auto;
      `,
	field: __emotion_css.css`
        display: flex;
        align-items: flex-start;
        padding: calc(${theme.vars.spacing.unit} / 2) 0;
        border-bottom: 1px solid ${theme.vars.colors.border};
        min-height: 28px;
        gap: ${theme.vars.spacing.unit};
      `,
	fieldActions: __emotion_css.css`
        display: flex;
        align-items: center;
        gap: calc(${theme.vars.spacing.unit} / 2);
      `,
	fieldContent: __emotion_css.css`
        flex: 1;
        display: flex;
        align-items: center;
        gap: ${theme.vars.spacing.unit};
      `,
	fieldInput: __emotion_css.css`
        margin-bottom: 0;
      `,
	fieldLast: __emotion_css.css`
        border-bottom: none;
      `,
	handle: __emotion_css.css`
        font-size: 1rem;
        color: ${theme.vars.colors.text.secondary};
        margin: 0;
        font-family: monospace;
      `,
	header: __emotion_css.css`
        display: flex;
        align-items: center;
        gap: calc(${theme.vars.spacing.unit} * 2);
        margin-bottom: calc(${theme.vars.spacing.unit} * 3);
        padding-bottom: calc(${theme.vars.spacing.unit} * 2);
      `,
	infoContainer: __emotion_css.css`
        display: flex;
        flex-direction: column;
        gap: ${theme.vars.spacing.unit};
      `,
	label: __emotion_css.css`
        font-size: 0.875rem;
        font-weight: 500;
        color: ${theme.vars.colors.text.secondary};
        width: 120px;
        flex-shrink: 0;
        line-height: 28px;
      `,
	name: __emotion_css.css`
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: ${theme.vars.colors.text.primary};
      `,
	orgInfo: __emotion_css.css`
        flex: 1;
      `,
	permissionBadge: __emotion_css.css`
        padding: calc(${theme.vars.spacing.unit} / 4) ${theme.vars.spacing.unit};
        border-radius: ${theme.vars.borderRadius.small};
        font-size: 0.75rem;
        background-color: ${theme.vars.colors.primary.main};
        color: ${theme.vars.colors.primary.contrastText};
        border: 1px solid ${theme.vars.colors.border};
      `,
	permissionsList: __emotion_css.css`
        display: flex;
        flex-wrap: wrap;
        gap: calc(${theme.vars.spacing.unit} / 2);
      `,
	placeholderButton: __emotion_css.css`
        font-style: italic;
        text-decoration: underline;
        opacity: 0.7;
        padding: 0;
        min-height: auto;
      `,
	popup: __emotion_css.css`
        padding: calc(${theme.vars.spacing.unit} * 2);
      `,
	root: __emotion_css.css`
        padding: calc(${theme.vars.spacing.unit} * 4);
        min-width: 600px;
        margin: 0 auto;
        font-family: ${theme.vars.typography.fontFamily};
      `,
	statusBadge: __emotion_css.css`
        padding: calc(${theme.vars.spacing.unit} / 2) ${theme.vars.spacing.unit};
        border-radius: ${theme.vars.borderRadius.small};
        font-size: 0.75rem;
        font-weight: 500;
        color: white;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `,
	value: __emotion_css.css`
        color: ${theme.vars.colors.text.primary};
        flex: 1;
        display: flex;
        align-items: center;
        gap: ${theme.vars.spacing.unit};
        overflow: hidden;
        min-height: 28px;
        line-height: 28px;
        word-break: break-word;
      `,
	valueEmpty: __emotion_css.css`
        font-style: italic;
        opacity: 0.7;
      `
}), [theme, colorScheme]);
var BaseOrganizationProfile_styles_default = useStyles;

//#endregion
exports.default = BaseOrganizationProfile_styles_default;
//# sourceMappingURL=BaseOrganizationProfile.styles.cjs.map