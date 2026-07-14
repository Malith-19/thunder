const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/OrganizationList/OrganizationList.styles.ts
/**
* Creates styles for the OrganizationList component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => (0, react.useMemo)(() => {
	const cssOrganizationListWrapper = __emotion_css.css`
      /* Container wrapper styles for OrganizationList component */
      width: 100%;
      font-family: ${theme.vars.typography.fontFamily};

      &__container {
        position: relative;
        width: 100%;
      }

      &__error-state {
        padding: calc(${theme.vars.spacing.unit} * 2);
        background-color: color-mix(in srgb, ${theme.vars.colors.error.main} 10%, transparent);
        border: 1px solid ${theme.vars.colors.error.main};
        border-radius: ${theme.vars.borderRadius.medium};
        color: ${theme.vars.colors.error.main};
        text-align: center;
      }

      &__loading-overlay {
        position: absolute;
        inset: 0;
        background-color: color-mix(in srgb, ${theme.vars.colors.background.surface} 80%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: ${theme.vars.borderRadius.large};
        backdrop-filter: blur(2px);
      }
    `;
	return {
		container: __emotion_css.css`
        position: relative;
        width: 100%;
      `,
		errorState: __emotion_css.css`
        padding: calc(${theme.vars.spacing.unit} * 2);
        background-color: color-mix(in srgb, ${theme.vars.colors.error.main} 10%, transparent);
        border: 1px solid ${theme.vars.colors.error.main};
        border-radius: ${theme.vars.borderRadius.medium};
        color: ${theme.vars.colors.error.main};
        text-align: center;
      `,
		loadingOverlay: __emotion_css.css`
        position: absolute;
        inset: 0;
        background-color: color-mix(in srgb, ${theme.vars.colors.background.surface} 80%, transparent);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: ${theme.vars.borderRadius.large};
        backdrop-filter: blur(2px);
      `,
		root: cssOrganizationListWrapper
	};
}, [theme, colorScheme]);
var OrganizationList_styles_default = useStyles;

//#endregion
exports.default = OrganizationList_styles_default;
//# sourceMappingURL=OrganizationList.styles.cjs.map