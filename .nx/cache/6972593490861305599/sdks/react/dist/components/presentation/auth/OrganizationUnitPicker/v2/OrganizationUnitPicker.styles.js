import { useMemo } from "react";
import { css } from "@emotion/css";

//#region src/components/presentation/auth/OrganizationUnitPicker/v2/OrganizationUnitPicker.styles.ts
const useStyles = (theme) => useMemo(() => {
	const container = css`
      display: flex;
      flex-direction: column;
      width: 100%;
      max-height: 320px;
      overflow-y: auto;
      border: 1px solid ${theme.vars.colors.border};
      border-radius: ${theme.vars.borderRadius.medium};
      font-family: ${theme.vars.typography.fontFamily};
    `;
	const node = css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 1) calc(${theme.vars.spacing.unit} * 1.5);
      cursor: pointer;
      user-select: none;
      transition: background-color 0.15s ease;

      &:hover {
        background-color: ${theme.vars.colors.action.hover};
      }
    `;
	const nodeSelected = css`
      background-color: ${theme.vars.colors.action.selected};

      &:hover {
        background-color: ${theme.vars.colors.action.selected};
      }
    `;
	const toggleButton = css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      margin-right: calc(${theme.vars.spacing.unit} * 0.5);
      color: ${theme.vars.colors.text.secondary};
      font-size: 12px;
      flex-shrink: 0;
    `;
	const togglePlaceholder = css`
      width: 20px;
      height: 20px;
      margin-right: calc(${theme.vars.spacing.unit} * 0.5);
      flex-shrink: 0;
    `;
	const nodeName = css`
      font-size: 14px;
      color: ${theme.vars.colors.text.primary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
	return {
		container,
		loadMoreButton: css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 0.75) calc(${theme.vars.spacing.unit} * 1.5);
      border: none;
      background: none;
      cursor: pointer;
      color: ${theme.vars.colors.primary.main};
      font-size: 13px;
      font-family: ${theme.vars.typography.fontFamily};

      &:hover {
        text-decoration: underline;
      }
    `,
		loadingPlaceholder: css`
      display: flex;
      align-items: center;
      padding: calc(${theme.vars.spacing.unit} * 1) calc(${theme.vars.spacing.unit} * 1.5);
      gap: calc(${theme.vars.spacing.unit} * 1);
    `,
		node,
		nodeName,
		nodeSelected,
		skeleton: css`
      height: 14px;
      border-radius: ${theme.vars.borderRadius.small};
      background-color: ${theme.vars.colors.background.disabled};
      animation: pulse 1.5s ease-in-out infinite;

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.4;
        }
      }
    `,
		toggleButton,
		togglePlaceholder
	};
}, [
	theme.vars.colors.action.hover,
	theme.vars.colors.action.selected,
	theme.vars.colors.background.disabled,
	theme.vars.colors.border,
	theme.vars.colors.primary.main,
	theme.vars.colors.text.primary,
	theme.vars.colors.text.secondary,
	theme.vars.borderRadius.medium,
	theme.vars.borderRadius.small,
	theme.vars.spacing.unit,
	theme.vars.typography.fontFamily
]);
var OrganizationUnitPicker_styles_default = useStyles;

//#endregion
export { OrganizationUnitPicker_styles_default as default };
//# sourceMappingURL=OrganizationUnitPicker.styles.js.map