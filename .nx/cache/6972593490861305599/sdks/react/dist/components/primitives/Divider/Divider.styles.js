import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/Divider/Divider.styles.ts
/**
* Creates styles for the Divider component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param orientation - The divider orientation
* @param variant - The divider variant
* @param color - Custom color for the divider
* @param hasChildren - Whether the divider has children (text)
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, orientation, variant, color, hasChildren) => useMemo(() => {
	const baseColor = color || theme.colors.border;
	let borderStyle;
	if (variant === "solid") borderStyle = "solid";
	else if (variant === "dashed") borderStyle = "dashed";
	else borderStyle = "dotted";
	const baseDivider = css`
      margin: calc(${theme.vars.spacing.unit} * 2) 0;
    `;
	const verticalDivider = css`
      display: inline-block;
      height: 100%;
      min-height: calc(${theme.vars.spacing.unit} * 2);
      width: 1px;
      border-inline-start: 1px ${borderStyle} ${baseColor};
      margin-block: 0;
      margin-inline: calc(${theme.vars.spacing.unit} * 1);
    `;
	return {
		divider: baseDivider,
		horizontal: css`
      display: flex;
      align-items: center;
      width: 100%;
      ${!hasChildren && css`
        height: 1px;
        border-top: 1px ${borderStyle} ${baseColor};
      `}
    `,
		line: css`
      flex: 1;
      height: 1px;
      border-top: 1px ${borderStyle} ${baseColor};
    `,
		text: css`
      background-color: ${theme.vars.colors.background.surface};
      font-family: ${theme.vars.typography.fontFamily};
      padding: 0 calc(${theme.vars.spacing.unit} * 1);
      white-space: nowrap;
    `,
		vertical: verticalDivider
	};
}, [
	theme,
	colorScheme,
	orientation,
	variant,
	color,
	hasChildren
]);
var Divider_styles_default = useStyles;

//#endregion
export { Divider_styles_default as default };
//# sourceMappingURL=Divider.styles.js.map