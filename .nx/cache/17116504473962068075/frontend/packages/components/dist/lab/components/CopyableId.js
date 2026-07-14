import { useCallback, useEffect, useRef, useState } from "react";
import { Stack, Tooltip, Typography } from "@wso2/oxygen-ui";
import { Check, Copy } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { useLogger } from "@thunderid/logger/react";

//#region src/lab/components/CopyableId.tsx
/**
* Displays a monospace ID with click-to-copy functionality.
* Shows a check icon for 2 seconds after copying.
*/
function CopyableId({ value, copyLabel = void 0 }) {
	const { t } = useTranslation();
	const logger = useLogger("CopyableId");
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef(null);
	useEffect(() => () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	}, []);
	const handleCopy = useCallback(async () => {
		await navigator.clipboard.writeText(value);
		setCopied(true);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setCopied(false);
		}, 2e3);
	}, [value]);
	const handleClick = () => {
		handleCopy().catch((error) => {
			logger.error("Failed to copy to clipboard", error instanceof Error ? error : { error });
		});
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleCopy().catch((error) => {
				logger.error("Failed to copy to clipboard", error instanceof Error ? error : { error });
			});
		}
	};
	return /* @__PURE__ */ jsx(Tooltip, {
		title: copied ? t("common:actions.copied") : copyLabel ?? t("common:actions.copyId", "Copy ID"),
		placement: "right",
		children: /* @__PURE__ */ jsxs(Stack, {
			direction: "row",
			alignItems: "center",
			spacing: .5,
			role: "button",
			tabIndex: 0,
			"aria-label": copyLabel ?? t("common:actions.copyId", "Copy ID"),
			onClick: handleClick,
			onKeyDown: handleKeyDown,
			sx: {
				cursor: "pointer",
				width: "fit-content",
				mt: .5,
				"&:hover .copy-icon": { opacity: 1 },
				"&:focus-visible .copy-icon": { opacity: 1 }
			},
			children: [/* @__PURE__ */ jsx(Typography, {
				variant: "caption",
				sx: {
					fontFamily: "monospace",
					color: "text.disabled",
					fontSize: "0.75rem"
				},
				children: value
			}), copied ? /* @__PURE__ */ jsx(Check, { size: 12 }) : /* @__PURE__ */ jsx(Copy, {
				size: 12,
				className: "copy-icon",
				style: { opacity: .4 }
			})]
		})
	});
}

//#endregion
export { CopyableId as default };