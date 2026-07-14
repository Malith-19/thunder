import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/presentation/auth/SignUp/BaseSignUp.styles.ts
/**
* Creates styles for the BaseSignUp component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => useMemo(() => {
	const signUp = css`
      min-width: 420px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const card = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      gap: calc(${theme.vars.spacing.unit} * 2);
      min-width: 420px;
    `;
	const logoContainer = css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const header = css`
      gap: 0;
      align-items: center;
    `;
	const title = css`
      margin: 0 0 calc(${theme.vars.spacing.unit} * 1) 0;
      color: ${theme.vars.colors.text.primary};
    `;
	const subtitle = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `;
	const messageItem = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `;
	const errorContainer = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const contentContainer = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const loadingContainer = css`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 4);
    `;
	const loadingText = css`
      margin-top: calc(${theme.vars.spacing.unit} * 2);
      color: ${theme.vars.colors.text.secondary};
    `;
	const divider = css`
      margin: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
	const centeredContainer = css`
      text-align: center;
      padding: calc(${theme.vars.spacing.unit} * 4);
    `;
	const passkeyContainer = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const passkeyText = css`
      margin-top: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `;
	const form = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const formDivider = css`
      margin: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
	const authenticatorSection = css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 1);
    `;
	const authenticatorItem = css`
      width: 100%;
    `;
	const noAuthenticatorCard = css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	const errorAlert = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const messagesAlert = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `;
	const flowMessagesContainer = css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	return {
		authenticatorItem,
		authenticatorSection,
		card,
		centeredContainer,
		contentContainer,
		divider,
		errorAlert,
		errorContainer,
		flowMessageItem: css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `,
		flowMessagesContainer,
		form,
		formDivider,
		header,
		loadingContainer,
		loadingText,
		logoContainer,
		messageItem,
		messagesAlert,
		noAuthenticatorCard,
		passkeyContainer,
		passkeyText,
		signUp,
		subtitle,
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
var BaseSignUp_styles_default = useStyles;

//#endregion
export { BaseSignUp_styles_default as default };
//# sourceMappingURL=BaseSignUp.styles.js.map