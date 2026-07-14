import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/presentation/auth/InviteUser/v2/BaseInviteUser.styles.ts
/**
* Creates styles for the BaseInviteUser component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => useMemo(() => {
	const card = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      gap: calc(${theme.vars.spacing.unit} * 2);
      min-width: 420px;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const header = css`
      gap: 0;
      align-items: center;
    `;
	const title = css`
      margin: 0 0 calc(${theme.vars.spacing.unit} * 1) 0;
      color: ${theme.vars.colors.text.primary};
    `;
	return {
		card,
		header,
		subtitle: css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `,
		title
	};
}, [
	theme.vars.colors.background.surface,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.borderRadius.large,
	theme.vars.spacing.unit,
	theme.vars.typography.fontFamily,
	colorScheme
]);
var BaseInviteUser_styles_default = useStyles;

//#endregion
export { BaseInviteUser_styles_default as default };
//# sourceMappingURL=BaseInviteUser.styles.js.map