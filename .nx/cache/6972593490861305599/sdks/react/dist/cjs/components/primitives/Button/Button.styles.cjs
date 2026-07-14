const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Button/Button.styles.ts
/**
* Creates styles for the Button component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param color - The button color
* @param variant - The button variant
* @param size - The button size
* @param fullWidth - Whether the button should take full width
* @param disabled - Whether the button is disabled
* @param loading - Whether the button is in loading state
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, color, variant, size, fullWidth, disabled, loading, shape = "square") => (0, react.useMemo)(() => {
	const iconSizeMap = {
		large: `calc(${theme.vars.spacing.unit} * 5)`,
		medium: `calc(${theme.vars.spacing.unit} * 4)`,
		small: `calc(${theme.vars.spacing.unit} * 3)`
	};
	const iconDimension = iconSizeMap[size] || iconSizeMap["medium"];
	const baseButton = __emotion_css.css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: calc(${theme.vars.spacing.unit} * 1);
      border-radius: ${shape === "round" ? "50%" : theme.vars.components?.Button?.root?.borderRadius || theme.vars.borderRadius.medium};
      font-weight: 500;
      cursor: ${disabled || loading ? "not-allowed" : "pointer"};
      outline: none;
      text-decoration: none;
      white-space: nowrap;
      width: ${fullWidth ? "100%" : "auto"};
      opacity: ${disabled || loading ? .6 : 1};
      font-family: ${theme.vars.typography.fontFamily};
      border-width: 1px;
      border-style: solid;
      ${variant === "icon" ? `
        padding: 0;
        min-width: unset;
        min-height: unset;
        width: ${iconDimension};
        height: ${iconDimension};
        justify-content: center;
        align-items: center;
      ` : ""}
    `;
	const sizeStyles = {
		large: __emotion_css.css`
        ${variant === "icon" ? `font-size: ${theme.vars.typography.fontSizes.lg};` : `padding: calc(${theme.vars.spacing.unit} * 1.5) calc(${theme.vars.spacing.unit} * 3);
             font-size: ${theme.vars.typography.fontSizes.lg};
             min-height: calc(${theme.vars.spacing.unit} * 5);`}
      `,
		medium: __emotion_css.css`
        ${variant === "icon" ? `font-size: ${theme.vars.typography.fontSizes.md};` : `padding: calc(${theme.vars.spacing.unit} * 1) calc(${theme.vars.spacing.unit} * 2);
             font-size: ${theme.vars.typography.fontSizes.md};
             min-height: calc(${theme.vars.spacing.unit} * 4);`}
      `,
		small: __emotion_css.css`
        ${variant === "icon" ? `font-size: ${theme.vars.typography.fontSizes.sm};` : `padding: calc(${theme.vars.spacing.unit} * 0.5) calc(${theme.vars.spacing.unit} * 1);
             font-size: ${theme.vars.typography.fontSizes.sm};
             min-height: calc(${theme.vars.spacing.unit} * 3);`}
      `
	};
	const variantStyles = {
		"primary-icon": __emotion_css.css`
        background-color: transparent;
        color: ${theme.vars.colors.primary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
          color: ${theme.vars.colors.primary.dark};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
          color: ${theme.vars.colors.primary.dark};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          color: ${theme.vars.colors.primary.dark};
          outline: none;
        }
      `,
		"primary-outline": __emotion_css.css`
        background-color: transparent;
        color: ${theme.vars.colors.primary.main};
        border-color: ${theme.vars.colors.primary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          color: ${theme.vars.colors.primary.contrastText};
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          color: ${theme.vars.colors.primary.contrastText};
          opacity: 0.9;
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          color: ${theme.vars.colors.primary.contrastText};
          opacity: 0.9;
        }
      `,
		"primary-solid": __emotion_css.css`
        background-color: ${theme.vars.colors.primary.main};
        color: ${theme.vars.colors.primary.contrastText};
        border-color: ${theme.vars.colors.primary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          opacity: 0.9;
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          opacity: 0.8;
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.primary.main};
          opacity: 0.8;
        }
      `,
		"primary-text": __emotion_css.css`
        background-color: transparent;
        color: ${theme.vars.colors.primary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          outline: none;
        }
      `,
		"secondary-icon": __emotion_css.css`
        background-color: transparent;
        color: ${theme.vars.colors.secondary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
          color: ${theme.vars.colors.secondary.dark};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
          color: ${theme.vars.colors.secondary.dark};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          color: ${theme.vars.colors.secondary.dark};
          outline: none;
        }
      `,
		"secondary-outline": __emotion_css.css`
        background-color: transparent;
        color: ${theme.vars.colors.secondary.main};
        border-color: ${theme.vars.colors.secondary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          color: ${theme.vars.colors.secondary.contrastText};
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          color: ${theme.vars.colors.secondary.contrastText};
          opacity: 0.9;
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          color: ${theme.vars.colors.secondary.contrastText};
          opacity: 0.9;
        }
      `,
		"secondary-solid": __emotion_css.css`
        background-color: ${theme.vars.colors.secondary.main};
        color: ${theme.vars.colors.secondary.contrastText};
        border-color: ${theme.vars.colors.secondary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          opacity: 0.9;
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          opacity: 0.8;
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.secondary.main};
          opacity: 0.8;
        }
      `,
		"secondary-text": __emotion_css.css`
        background-color: transparent;
        color: ${theme.vars.colors.secondary.main};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          outline: none;
        }
      `,
		"tertiary-icon": __emotion_css.css`
        background-color: transparent;
        color: ${theme.vars.colors.text.secondary};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
          color: ${theme.vars.colors.text.primary};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
          color: ${theme.vars.colors.text.primary};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          color: ${theme.vars.colors.text.primary};
          outline: none;
        }
      `,
		"tertiary-outline": __emotion_css.css`
        background-color: transparent;
        color: ${theme.vars.colors.text.secondary};
        border-color: ${theme.vars.colors.border};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.action.hover};
          border-color: ${theme.vars.colors.text.secondary};
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.action.selected};
          border-color: ${theme.vars.colors.text.primary};
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.action.focus};
          border-color: ${theme.vars.colors.text.primary};
        }
      `,
		"tertiary-solid": __emotion_css.css`
        background-color: ${theme.vars.colors.text.secondary};
        color: ${theme.vars.colors.background.surface};
        border-color: ${theme.vars.colors.text.secondary};
        &:hover:not(:disabled) {
          background-color: ${theme.vars.colors.text.primary};
          color: ${theme.vars.colors.background.surface};
        }
        &:active:not(:disabled) {
          background-color: ${theme.vars.colors.text.primary};
          color: ${theme.vars.colors.background.surface};
          opacity: 0.9;
        }
        &:focus:not(:disabled) {
          background-color: ${theme.vars.colors.text.primary};
          color: ${theme.vars.colors.background.surface};
          opacity: 0.9;
        }
      `,
		"tertiary-text": __emotion_css.css`
        background-color: transparent;
        color: ${theme.vars.colors.text.secondary};
        border-color: transparent;
        &:hover:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.hover};
          color: ${theme.vars.colors.text.primary};
        }
        &:active:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.selected};
          color: ${theme.vars.colors.text.primary};
        }
        &:focus:not(:disabled) {
          border-color: transparent;
          background-color: ${theme.vars.colors.action.focus};
          color: ${theme.vars.colors.text.primary};
          outline: none;
        }
      `
	};
	const spinnerStyles = __emotion_css.css`
      display: flex;
      align-items: center;
      justify-content: center;
    `;
	const iconStyles = __emotion_css.css`
      display: flex;
      align-items: center;
      justify-content: center;
    `;
	return {
		button: baseButton,
		content: __emotion_css.css`
      display: flex;
      align-items: center;
      justify-content: center;
    `,
		endIcon: iconStyles,
		fullWidth: fullWidth ? __emotion_css.css`
            width: 100%;
          ` : null,
		icon: iconStyles,
		loading: loading ? __emotion_css.css`
            pointer-events: none;
          ` : null,
		shape: shape === "round" ? __emotion_css.css`
              border-radius: 50%;
            ` : null,
		size: sizeStyles[size],
		spinner: spinnerStyles,
		startIcon: iconStyles,
		variant: variantStyles[`${color}-${variant}`] || variantStyles["primary-solid"]
	};
}, [
	theme,
	colorScheme,
	color,
	variant,
	size,
	fullWidth,
	disabled,
	loading
]);
var Button_styles_default = useStyles;

//#endregion
exports.default = Button_styles_default;
//# sourceMappingURL=Button.styles.cjs.map