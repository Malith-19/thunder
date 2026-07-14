const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/primitives/Avatar/Avatar.styles.ts
/**
* Creates styles for the Avatar component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param size - The size of the avatar in pixels
* @param variant - The avatar variant
* @param backgroundColor - The background color for the avatar
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, size, variant, backgroundColor) => (0, react.useMemo)(() => {
	const baseAvatar = __emotion_css.css`
      align-items: center;
      background: ${backgroundColor || theme.vars.colors.background.surface};
      border: ${backgroundColor ? "none" : `1px solid ${theme.vars.colors.border}`};
      border-radius: ${variant === "circular" ? "50%" : "8px"};
      color: ${backgroundColor ? "#ffffff" : theme.vars.colors.text.primary};
      display: flex;
      font-size: ${size * .4}px;
      font-family: ${theme.vars.typography.fontFamily};
      font-weight: 600;
      height: ${size}px;
      justify-content: center;
      overflow: hidden;
      text-shadow: ${backgroundColor ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none"};
      width: ${size}px;
    `;
	const variantStyles = {
		circular: __emotion_css.css`
        border-radius: 50%;
      `,
		square: __emotion_css.css`
        border-radius: 8px;
      `
	};
	const imageStyles = __emotion_css.css`
      height: 100%;
      object-fit: cover;
      width: 100%;
    `;
	const skeletonStyles = __emotion_css.css`
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: ${variant === "circular" ? "50%" : "8px"};

      @keyframes skeleton-loading {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `;
	return {
		avatar: baseAvatar,
		icon: __emotion_css.css`
      width: 60%;
      height: 60%;
      fill: ${backgroundColor ? "#ffffff" : theme.vars.colors.text.secondary};
      opacity: 0.8;
    `,
		image: imageStyles,
		skeleton: skeletonStyles,
		variant: variantStyles[variant]
	};
}, [
	theme,
	colorScheme,
	size,
	variant,
	backgroundColor
]);
var Avatar_styles_default = useStyles;

//#endregion
exports.default = Avatar_styles_default;
//# sourceMappingURL=Avatar.styles.cjs.map