const require_rolldown_runtime = require('../../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/auth/SignUp/BaseSignUp.styles.ts
/**
* Creates styles for the BaseSignUp component
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme) => (0, react.useMemo)(() => {
	const signUp = __emotion_css.css`
      min-width: 420px;
      margin: 0 auto;
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const card = __emotion_css.css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      gap: calc(${theme.vars.spacing.unit} * 2);
      min-width: 420px;
    `;
	const logoContainer = __emotion_css.css`
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const header = __emotion_css.css`
      gap: 0;
      align-items: center;
    `;
	const title = __emotion_css.css`
      margin: 0 0 calc(${theme.vars.spacing.unit} * 1) 0;
      color: ${theme.vars.colors.text.primary};
    `;
	const subtitle = __emotion_css.css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `;
	const messageItem = __emotion_css.css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `;
	const errorContainer = __emotion_css.css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const contentContainer = __emotion_css.css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const loadingContainer = __emotion_css.css`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 4);
    `;
	const loadingText = __emotion_css.css`
      margin-top: calc(${theme.vars.spacing.unit} * 2);
      color: ${theme.vars.colors.text.secondary};
    `;
	const divider = __emotion_css.css`
      margin: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
	const centeredContainer = __emotion_css.css`
      text-align: center;
      padding: calc(${theme.vars.spacing.unit} * 4);
    `;
	const passkeyContainer = __emotion_css.css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const passkeyText = __emotion_css.css`
      margin-top: calc(${theme.vars.spacing.unit} * 1);
      color: ${theme.vars.colors.text.secondary};
    `;
	const form = __emotion_css.css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 2);
    `;
	const formDivider = __emotion_css.css`
      margin: calc(${theme.vars.spacing.unit} * 1) 0;
    `;
	const authenticatorSection = __emotion_css.css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} * 1);
    `;
	const authenticatorItem = __emotion_css.css`
      width: 100%;
    `;
	const noAuthenticatorCard = __emotion_css.css`
      background: ${theme.vars.colors.background.surface};
      border-radius: ${theme.vars.borderRadius.large};
      padding: calc(${theme.vars.spacing.unit} * 2);
    `;
	const errorAlert = __emotion_css.css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 2);
    `;
	const messagesAlert = __emotion_css.css`
      margin-bottom: calc(${theme.vars.spacing.unit} * 1);
    `;
	const flowMessagesContainer = __emotion_css.css`
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
		flowMessageItem: __emotion_css.css`
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
exports.default = BaseSignUp_styles_default;
//# sourceMappingURL=BaseSignUp.styles.cjs.map