import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/Typography/Typography.styles.ts
/**
* Creates styles for the Typography component using BEM methodology
* @param theme - The theme object containing design tokens
* @param colorScheme - The current color scheme (used for memoization)
* @param variant - The typography variant
* @param align - Text alignment
* @param color - Color variant
* @param noWrap - Whether text should be truncated with ellipsis
* @param inline - Whether text should be displayed inline
* @param gutterBottom - Whether to add bottom margin
* @param fontWeight - Custom font weight
* @param fontSize - Custom font size
* @param lineHeight - Custom line height
* @returns Object containing CSS class names for component styling
*/
const useStyles = (theme, colorScheme, variant, align, color, noWrap, inline, gutterBottom, fontWeight, fontSize, lineHeight) => useMemo(() => {
	const getColorValue = (colorVariant) => {
		switch (colorVariant) {
			case "primary": return theme.colors.primary.main;
			case "secondary": return theme.colors.secondary.main;
			case "error": return theme.colors.error.main;
			case "textPrimary": return theme.colors.text.primary;
			case "textSecondary": return theme.colors.text.secondary;
			case "inherit": return "inherit";
			default: return theme.colors.text.primary;
		}
	};
	const getVariantStyles = (variantName) => {
		switch (variantName) {
			case "h1": return {
				fontSize: theme.vars.typography.fontSizes["3xl"],
				fontWeight: 600,
				letterSpacing: "-0.00735em",
				lineHeight: 1.235
			};
			case "h2": return {
				fontSize: theme.vars.typography.fontSizes["2xl"],
				fontWeight: 600,
				letterSpacing: "0em",
				lineHeight: 1.334
			};
			case "h3": return {
				fontSize: theme.vars.typography.fontSizes.xl,
				fontWeight: 600,
				letterSpacing: "0.0075em",
				lineHeight: 1.6
			};
			case "h4": return {
				fontSize: theme.vars.typography.fontSizes.lg,
				fontWeight: 600,
				letterSpacing: "0.00938em",
				lineHeight: 1.5
			};
			case "h5": return {
				fontSize: theme.vars.typography.fontSizes.md,
				fontWeight: 600,
				letterSpacing: "0em",
				lineHeight: 1.334
			};
			case "h6": return {
				fontSize: theme.vars.typography.fontSizes.sm,
				fontWeight: 500,
				letterSpacing: "0.0075em",
				lineHeight: 1.6
			};
			case "subtitle1": return {
				fontSize: theme.vars.typography.fontSizes.md,
				fontWeight: 400,
				letterSpacing: "0.00938em",
				lineHeight: 1.75
			};
			case "subtitle2": return {
				fontSize: theme.vars.typography.fontSizes.sm,
				fontWeight: 500,
				letterSpacing: "0.00714em",
				lineHeight: 1.57
			};
			case "body1": return {
				fontSize: theme.vars.typography.fontSizes.md,
				fontWeight: 400,
				letterSpacing: "0.00938em",
				lineHeight: 1.5
			};
			case "body2": return {
				fontSize: theme.vars.typography.fontSizes.sm,
				fontWeight: 400,
				letterSpacing: "0.01071em",
				lineHeight: 1.43
			};
			case "caption": return {
				fontSize: theme.vars.typography.fontSizes.xs,
				fontWeight: 400,
				letterSpacing: "0.03333em",
				lineHeight: 1.66
			};
			case "overline": return {
				fontSize: theme.vars.typography.fontSizes.xs,
				fontWeight: 400,
				letterSpacing: "0.08333em",
				lineHeight: 2.66,
				textTransform: "uppercase"
			};
			case "button": return {
				fontSize: theme.vars.typography.fontSizes.sm,
				fontWeight: 500,
				letterSpacing: "0.02857em",
				lineHeight: 1.75,
				textTransform: "uppercase"
			};
			default: return {};
		}
	};
	const variantStyles = getVariantStyles(variant);
	const colorValue = getColorValue(color);
	const typography = css`
      margin: 0;
      font-family: ${theme.vars.typography.fontFamily};
      color: ${colorValue};
      text-align: ${align};
      display: ${inline ? "inline" : "block"};
      ${variantStyles["fontSize"] ? `font-size: ${variantStyles["fontSize"]};` : ""}
      ${variantStyles["fontWeight"] ? `font-weight: ${variantStyles["fontWeight"]};` : ""}
      ${variantStyles["lineHeight"] ? `line-height: ${variantStyles["lineHeight"]};` : ""}
      ${variantStyles["letterSpacing"] ? `letter-spacing: ${variantStyles["letterSpacing"]};` : ""}
      ${variantStyles["textTransform"] ? `text-transform: ${variantStyles["textTransform"]};` : ""}

      /* Custom overrides */
      ${fontWeight ? `font-weight: ${fontWeight} !important;` : ""}
      ${fontSize ? `font-size: ${typeof fontSize === "number" ? `${fontSize}px` : fontSize} !important;` : ""}
      ${lineHeight ? `line-height: ${lineHeight} !important;` : ""}

      /* Conditional styles */
      ${noWrap ? `
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      ` : ""}

      ${gutterBottom ? `
        margin-bottom: ${theme.spacing.unit}px;
      ` : ""}
    `;
	const typographyNoWrap = css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
	const typographyInline = css`
      display: inline;
    `;
	const typographyGutterBottom = css`
      margin-bottom: ${theme.spacing.unit}px;
    `;
	const typographyH1 = css`
      font-size: ${theme.vars.typography.fontSizes["3xl"]};
      font-weight: 600;
      line-height: 1.235;
      letter-spacing: -0.00735em;
    `;
	const typographyH2 = css`
      font-size: ${theme.vars.typography.fontSizes["2xl"]};
      font-weight: 600;
      line-height: 1.334;
      letter-spacing: 0em;
    `;
	const typographyH3 = css`
      font-size: ${theme.vars.typography.fontSizes.xl};
      font-weight: 600;
      line-height: 1.6;
      letter-spacing: 0.0075em;
    `;
	const typographyH4 = css`
      font-size: ${theme.vars.typography.fontSizes.lg};
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: 0.00938em;
    `;
	const typographyH5 = css`
      font-size: ${theme.vars.typography.fontSizes.md};
      font-weight: 600;
      line-height: 1.334;
      letter-spacing: 0em;
    `;
	const typographyH6 = css`
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
    `;
	const typographySubtitle1 = css`
      font-size: ${theme.vars.typography.fontSizes.md};
      font-weight: 400;
      line-height: 1.75;
      letter-spacing: 0.00938em;
    `;
	const typographySubtitle2 = css`
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-weight: 500;
      line-height: 1.57;
      letter-spacing: 0.00714em;
    `;
	const typographyBody1 = css`
      font-size: ${theme.vars.typography.fontSizes.md};
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: 0.00938em;
    `;
	const typographyBody2 = css`
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-weight: 400;
      line-height: 1.43;
      letter-spacing: 0.01071em;
    `;
	const typographyCaption = css`
      font-size: ${theme.vars.typography.fontSizes.xs};
      font-weight: 400;
      line-height: 1.66;
      letter-spacing: 0.03333em;
    `;
	const typographyOverline = css`
      font-size: ${theme.vars.typography.fontSizes.xs};
      font-weight: 400;
      line-height: 2.66;
      letter-spacing: 0.08333em;
      text-transform: uppercase;
    `;
	return {
		typography,
		typographyBody1,
		typographyBody2,
		typographyButton: css`
      font-size: ${theme.vars.typography.fontSizes.sm};
      font-weight: 500;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
    `,
		typographyCaption,
		typographyGutterBottom,
		typographyH1,
		typographyH2,
		typographyH3,
		typographyH4,
		typographyH5,
		typographyH6,
		typographyInline,
		typographyNoWrap,
		typographyOverline,
		typographySubtitle1,
		typographySubtitle2
	};
}, [
	theme,
	colorScheme,
	variant,
	align,
	color,
	noWrap,
	inline,
	gutterBottom,
	fontWeight,
	fontSize,
	lineHeight
]);
var Typography_styles_default = useStyles;

//#endregion
export { Typography_styles_default as default };
//# sourceMappingURL=Typography.styles.js.map