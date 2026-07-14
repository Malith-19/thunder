const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let __wso2_oxygen_ui = require("@wso2/oxygen-ui");
__wso2_oxygen_ui = require_rolldown_runtime.__toESM(__wso2_oxygen_ui);
let __wso2_oxygen_ui_icons_react = require("@wso2/oxygen-ui-icons-react");
__wso2_oxygen_ui_icons_react = require_rolldown_runtime.__toESM(__wso2_oxygen_ui_icons_react);
let react_i18next = require("react-i18next");
react_i18next = require_rolldown_runtime.__toESM(react_i18next);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __thunderid_logger_react = require("@thunderid/logger/react");
__thunderid_logger_react = require_rolldown_runtime.__toESM(__thunderid_logger_react);

//#region src/lab/components/CopyableId.tsx
/**
* Displays a monospace ID with click-to-copy functionality.
* Shows a check icon for 2 seconds after copying.
*/
function CopyableId({ value, copyLabel = void 0 }) {
	const { t } = (0, react_i18next.useTranslation)();
	const logger = (0, __thunderid_logger_react.useLogger)("CopyableId");
	const [copied, setCopied] = (0, react.useState)(false);
	const timeoutRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	}, []);
	const handleCopy = (0, react.useCallback)(async () => {
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Tooltip, {
		title: copied ? t("common:actions.copied") : copyLabel ?? t("common:actions.copyId", "Copy ID"),
		placement: "right",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
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
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
				variant: "caption",
				sx: {
					fontFamily: "monospace",
					color: "text.disabled",
					fontSize: "0.75rem"
				},
				children: value
			}), copied ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Check, { size: 12 }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.Copy, {
				size: 12,
				className: "copy-icon",
				style: { opacity: .4 }
			})]
		})
	});
}

//#endregion
exports.default = CopyableId;