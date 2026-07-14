import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/primitives/CopyableText/CopyableText.styles.ts
const useStyles = (theme) => useMemo(() => ({
	container: css`
        display: flex;
        flex-direction: column;
        gap: calc(${theme.vars.spacing.unit} * 0.5);
        width: 100%;
      `,
	copyButton: css`
        flex-shrink: 0;
        white-space: nowrap;
      `,
	label: css`
        color: ${theme.vars.colors.text.secondary};
        font-size: 0.875rem;
        font-weight: 500;
      `,
	valueBox: css`
        align-items: center;
        background-color: ${theme.vars.colors.background.surface};
        border: 1px solid ${theme.vars.colors.border};
        border-radius: ${theme.vars.borderRadius.small};
        display: flex;
        gap: calc(${theme.vars.spacing.unit} * 1);
        padding: calc(${theme.vars.spacing.unit} * 0.75) calc(${theme.vars.spacing.unit} * 1);
      `,
	valueText: css`
        color: ${theme.vars.colors.text.primary};
        flex: 1;
        font-family: monospace;
        font-size: 0.85rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
      `
}), [theme]);
var CopyableText_styles_default = useStyles;

//#endregion
export { CopyableText_styles_default as default };
//# sourceMappingURL=CopyableText.styles.js.map