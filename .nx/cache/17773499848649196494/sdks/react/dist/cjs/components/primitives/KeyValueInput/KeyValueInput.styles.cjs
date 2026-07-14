const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/KeyValueInput/KeyValueInput.styles.ts
/**
* Creates styles for the KeyValueInput component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param disabled - Whether the component is disabled
* @param readOnly - Whether the component is read-only
* @param hasError - Whether the component has an error
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, disabled, readOnly, hasError) => (0, react.useMemo)(() => {
	const container = __emotion_css.css`
      display: flex;
      flex-direction: column;
      font-family: ${theme.vars.typography.fontFamily};
      gap: calc(${theme.vars.spacing.unit} / 2);
    `;
	const label = __emotion_css.css`
      font-size: 0.875rem;
      font-weight: 500;
      color: ${theme.vars.colors.text.primary};
      margin-bottom: calc(${theme.vars.spacing.unit} / 2);
    `;
	const requiredIndicator = __emotion_css.css`
      color: ${theme.vars.colors.error.main};
    `;
	const pairsList = __emotion_css.css`
      display: flex;
      flex-direction: column;
      gap: calc(${theme.vars.spacing.unit} / 4);
    `;
	const pairRow = __emotion_css.css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} / 2);
      padding: calc(${theme.vars.spacing.unit} / 2);
      border-radius: ${theme.vars.borderRadius.small};
      background-color: transparent;
      border: none;

      &:hover {
        background-color: ${theme.vars.colors.action.hover};
      }
    `;
	const pairInput = __emotion_css.css`
      flex: 1;
      min-width: 0;
    `;
	const addRow = __emotion_css.css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} / 2);
      padding: calc(${theme.vars.spacing.unit} / 2);
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      background-color: transparent;
      margin-top: calc(${theme.vars.spacing.unit} / 2);
    `;
	const removeButton = __emotion_css.css`
      min-width: auto;
      width: 24px;
      height: 24px;
      padding: 0;
      background-color: transparent;
      color: ${theme.vars.colors.text.secondary};
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: ${disabled ? "not-allowed" : "pointer"};

      &:hover:not(:disabled) {
        background-color: ${theme.vars.colors.action.hover};
        color: ${theme.vars.colors.error.main};
      }

      &:disabled {
        opacity: 0.6;
      }
    `;
	const addButton = __emotion_css.css`
      min-width: auto;
      width: 24px;
      height: 24px;
      padding: 0;
      background-color: transparent;
      color: ${theme.vars.colors.primary.main};
      border: none;
      border-radius: ${theme.vars.borderRadius.small};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: ${disabled ? "not-allowed" : "pointer"};

      &:hover:not(:disabled) {
        background-color: ${theme.vars.colors.primary.main};
        color: ${theme.vars.colors.primary.contrastText};
      }

      &:disabled {
        opacity: 0.6;
      }
    `;
	const helperText = __emotion_css.css`
      font-size: 0.75rem;
      color: ${hasError ? theme.vars.colors.error.main : theme.vars.colors.text.secondary};
      margin-top: calc(${theme.vars.spacing.unit} / 2);
    `;
	const emptyState = __emotion_css.css`
      padding: ${theme.vars.spacing.unit};
      text-align: center;
      color: ${theme.vars.colors.text.secondary};
      font-style: italic;
      font-size: 0.75rem;
    `;
	const readOnlyPair = __emotion_css.css`
      display: flex;
      align-items: center;
      gap: calc(${theme.vars.spacing.unit} / 2);
      padding: calc(${theme.vars.spacing.unit} / 4) 0;
      min-height: 20px;
    `;
	const readOnlyKey = __emotion_css.css`
      font-size: 0.75rem;
      font-weight: 500;
      color: ${theme.vars.colors.text.secondary};
      min-width: 80px;
      flex-shrink: 0;
    `;
	const readOnlyValue = __emotion_css.css`
      font-size: 0.75rem;
      color: ${theme.vars.colors.text.primary};
      word-break: break-word;
      flex: 1;
    `;
	return {
		addButton,
		addRow,
		container,
		counterText: __emotion_css.css`
      font-size: 0.75rem;
      color: ${theme.vars.colors.text.secondary};
      margin-top: calc(${theme.vars.spacing.unit} / 2);
    `,
		emptyState,
		helperText,
		label,
		pairInput,
		pairRow,
		pairsList,
		readOnlyKey,
		readOnlyPair,
		readOnlyValue,
		removeButton,
		requiredIndicator
	};
}, [
	theme,
	colorScheme,
	disabled,
	readOnly,
	hasError
]);
var KeyValueInput_styles_default = useStyles;

//#endregion
exports.default = KeyValueInput_styles_default;
//# sourceMappingURL=KeyValueInput.styles.cjs.map