const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/LanguageSwitcher/BaseLanguageSwitcher.styles.ts
const useStyles = (theme, colorScheme) => (0, react.useMemo)(() => {
	const root = __emotion_css.css`
      display: inline-block;
      position: relative;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const trigger = __emotion_css.css`
      display: inline-flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} * 0.5);
      padding: calc(${theme.vars.spacing.unit} * 0.75) ${theme.vars.spacing.unit};
      border: 1px solid ${theme.vars.colors.border};
      background: ${theme.vars.colors.background.surface};
      cursor: pointer;
      border-radius: ${theme.vars.borderRadius.medium};
      min-width: 120px;
      font-size: 0.875rem;
      color: ${theme.vars.colors.text.primary};

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.04)"};
      }
    `;
	const triggerEmoji = __emotion_css.css`
      font-size: 1rem;
      line-height: 1;
    `;
	const triggerLabel = __emotion_css.css`
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    `;
	const content = __emotion_css.css`
      min-width: 200px;
      max-width: 320px;
      background-color: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.medium};
      box-shadow: ${theme.vars.shadows.medium};
      border: 1px solid ${theme.vars.colors.border};
      outline: none;
      z-index: 1000;
      padding: calc(${theme.vars.spacing.unit} * 0.5) 0;
    `;
	const option = __emotion_css.css`
      display: flex;
      align-items: center;
      gap: ${theme.vars.spacing.unit};
      padding: calc(${theme.vars.spacing.unit} * 1) calc(${theme.vars.spacing.unit} * 1.5);
      width: 100%;
      border: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 0.875rem;
      text-align: start;
      color: ${theme.vars.colors.text.primary};
      transition: background-color 0.15s ease-in-out;

      &:hover {
        background-color: ${theme.vars.colors.action?.hover || "rgba(0, 0, 0, 0.04)"};
      }
    `;
	const optionActive = __emotion_css.css`
      font-weight: 600;
      color: ${theme.vars.colors.primary?.main || theme.vars.colors.text.primary};
    `;
	const optionEmoji = __emotion_css.css`
      font-size: 1rem;
      line-height: 1;
      flex-shrink: 0;
    `;
	const optionLabel = __emotion_css.css`
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	return {
		checkIcon: __emotion_css.css`
      color: ${theme.vars.colors.primary?.main || theme.vars.colors.text.primary};
      flex-shrink: 0;
      margin-inline-start: auto;
    `,
		content,
		option,
		optionActive,
		optionEmoji,
		optionLabel,
		root,
		trigger,
		triggerEmoji,
		triggerLabel
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.border,
	theme.vars.borderRadius.medium,
	theme.vars.shadows.medium,
	theme.vars.spacing.unit,
	theme.vars.colors.action?.hover,
	theme.vars.typography.fontFamily,
	theme.vars.colors.primary?.main,
	colorScheme
]);
var BaseLanguageSwitcher_styles_default = useStyles;

//#endregion
exports.default = BaseLanguageSwitcher_styles_default;
//# sourceMappingURL=BaseLanguageSwitcher.styles.cjs.map