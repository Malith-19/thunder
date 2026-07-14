const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/UserProfile/BaseUserProfile.styles.ts
/**
* Creates styles for the BaseUserProfile component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => {
	const valuePlaceholder = __emotion_css.css`
    font-style: italic;
    opacity: 0.7;
  `;
	const editButton = __emotion_css.css`
    font-style: italic;
    text-decoration: underline;
    opacity: 0.7;
    padding: 0;
    min-height: auto;

    &:hover:not(:disabled) {
      background-color: transparent;
    }
  `;
	const fieldInner = __emotion_css.css`
    flex: 1;
    display: flex;
    align-items: center;
    gap: ${theme.vars.spacing.unit};
  `;
	const fieldActions = __emotion_css.css`
    display: flex;
    gap: calc(${theme.vars.spacing.unit} / 2);
    align-items: center;
    margin-inline-start: calc(${theme.vars.spacing.unit} * 4);
  `;
	const complexTextarea = __emotion_css.css`
    min-height: 60px;
    width: 100%;
    padding: 8px;
    border: 1px solid ${theme.vars.colors.border};
    border-radius: ${theme.vars.borderRadius.small};
    resize: vertical;
  `;
	const objectKey = __emotion_css.css`
    padding: ${theme.vars.spacing.unit};
    vertical-align: top;
  `;
	const objectValue = __emotion_css.css`
    padding: ${theme.vars.spacing.unit};
    vertical-align: top;
  `;
	return (0, react.useMemo)(() => {
		const root = __emotion_css.css`
      padding: calc(${theme.vars.spacing.unit} * 4);
      min-width: 600px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
    `;
		const card = __emotion_css.css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
    `;
		const header = __emotion_css.css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
      margin-bottom: calc(${theme.vars.spacing.unit} * 1.5);
    `;
		const profileInfo = __emotion_css.css`
      flex: 1;
    `;
		const name = __emotion_css.css`
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      color: ${theme.vars.colors.text.primary};
    `;
		const profileSummary = __emotion_css.css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    `;
		const sectionRow = __emotion_css.css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
		const sectionLabel = __emotion_css.css`
      font-size: 0.875rem;
      font-weight: 600;
      color: ${theme.vars.colors.text.primary};
      width: 160px;
      flex-shrink: 0;
    `;
		const sectionValue = __emotion_css.css`
      flex: 1;
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 1.5);
      font-size: 0.875rem;
      color: ${theme.vars.colors.text.primary};
    `;
		const infoContainer = __emotion_css.css`
      display: flex;
      flex-direction: column;
    `;
		const info = __emotion_css.css`
      padding: calc(${theme.vars.spacing.unit} * 1.5) 0;
      border-bottom: 1px solid ${theme.vars.colors.border};
    `;
		const field = __emotion_css.css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} / 2) 0;
      min-height: 28px;
    `;
		const lastField = __emotion_css.css`
      border-bottom: none;
    `;
		const label = __emotion_css.css`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${theme.vars.colors.text.secondary};
      width: 120px;
      flex-shrink: 0;
      line-height: 28px;
      text-align: start;
    `;
		const value = __emotion_css.css`
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

      .${(0, __thunderid_browser.withVendorCSSClassPrefix)("form-control")} {
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
		const popup = __emotion_css.css`
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
		return {
			alert: __emotion_css.css`
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
exports.default = BaseUserProfile_styles_default;
//# sourceMappingURL=BaseUserProfile.styles.cjs.map