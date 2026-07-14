const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/CopyableText/CopyableText.styles.ts
const useStyles = (theme) => (0, react.useMemo)(() => ({
	container: __emotion_css.css`
        display: flex;
        flex-direction: column;
        gap: calc(${theme.vars.spacing.unit} * 0.5);
        width: 100%;
      `,
	copyButton: __emotion_css.css`
        flex-shrink: 0;
        white-space: nowrap;
      `,
	label: __emotion_css.css`
        color: ${theme.vars.colors.text.secondary};
        font-size: 0.875rem;
        font-weight: 500;
      `,
	valueBox: __emotion_css.css`
        align-items: center;
        background-color: ${theme.vars.colors.background.surface};
        border: 1px solid ${theme.vars.colors.border};
        border-radius: ${theme.vars.borderRadius.small};
        display: flex;
        gap: calc(${theme.vars.spacing.unit} * 1);
        padding: calc(${theme.vars.spacing.unit} * 0.75) calc(${theme.vars.spacing.unit} * 1);
      `,
	valueText: __emotion_css.css`
        color: ${theme.vars.colors.text.primary};
        flex: 1;
        font-family: monospace;
        font-size: 0.85rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      `
}), [theme]);
var CopyableText_styles_default = useStyles;

//#endregion
exports.default = CopyableText_styles_default;
//# sourceMappingURL=CopyableText.styles.cjs.map