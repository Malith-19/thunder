const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/adapters/ConsentCheckboxList.styles.ts
const useStyles = (theme, colorScheme) => (0, react.useMemo)(() => ({
	bullet: __emotion_css.css`
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #9e9e9e;
        flex-shrink: 0;
      `,
	divider: __emotion_css.css`
        opacity: 0.5;
        margin: 0.25rem 0;
      `,
	labelContainer: __emotion_css.css`
        display: flex;
        align-items: center;
        gap: 0.4rem;
      `,
	listContainer: __emotion_css.css`
        display: flex;
        flex-direction: column;
      `,
	listItem: __emotion_css.css`
        padding: 0 0.25rem;
      `,
	listRow: __emotion_css.css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.125rem 0;
      `,
	typography: __emotion_css.css`
        margin: 0;
      `
}), [theme, colorScheme]);
var ConsentCheckboxList_styles_default = useStyles;

//#endregion
exports.default = ConsentCheckboxList_styles_default;
//# sourceMappingURL=ConsentCheckboxList.styles.cjs.map