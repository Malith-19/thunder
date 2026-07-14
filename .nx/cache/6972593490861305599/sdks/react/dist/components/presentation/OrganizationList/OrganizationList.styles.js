import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/presentation/OrganizationList/OrganizationList.styles.ts
/**
* Creates styles for the OrganizationList component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => useMemo(() => {
	const cssOrganizationListWrapper = css`
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
		container: css`
        position: relative;
        width: 100%;
      `,
		errorState: css`
        padding: calc(${theme.vars.spacing.unit} * 2);
        background-color: color-mix(in srgb, ${theme.vars.colors.error.main} 10%, transparent);
        border: 1px solid ${theme.vars.colors.error.main};
        border-radius: ${theme.vars.borderRadius.medium};
        color: ${theme.vars.colors.error.main};
        text-align: center;
      `,
		loadingOverlay: css`
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
export { OrganizationList_styles_default as default };
//# sourceMappingURL=OrganizationList.styles.js.map