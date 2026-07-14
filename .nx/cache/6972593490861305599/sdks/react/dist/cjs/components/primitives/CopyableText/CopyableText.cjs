const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_Button = require('../Button/Button.cjs');
const require_CopyableText_styles = require('./CopyableText.styles.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/primitives/CopyableText/CopyableText.tsx
/**
* A React component that displays a text value with an optional label and a button to copy the value to
* the clipboard. When the button is clicked, it attempts to copy the value using the Clipboard API, and
* falls back to a textarea method if the API is not supported.
* After copying, it shows a "Copied!" message for 3 seconds before resetting.
*/
const CopyableText = ({ label, value }) => {
	const { theme } = require_useTheme.default();
	const styles = require_CopyableText_styles.default(theme);
	const { t } = require_useTranslation.default();
	const [copied, setCopied] = (0, react.useState)(false);
	const handleCopy = (0, react.useCallback)(async () => {
		try {
			await navigator.clipboard.writeText(value);
		} catch {
			const textArea = document.createElement("textarea");
			textArea.value = value;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand("copy");
			document.body.removeChild(textArea);
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 3e3);
	}, [value]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: styles["container"],
		children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: styles["label"],
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: styles["valueBox"],
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: styles["valueText"],
				children: value
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
				variant: "outline",
				size: "small",
				className: styles["copyButton"],
				onClick: () => {
					handleCopy().catch(() => void 0);
				},
				children: copied ? t("elements.display.copyable_text.copied") : t("elements.display.copyable_text.copy")
			})]
		})]
	});
};
var CopyableText_default = CopyableText;

//#endregion
exports.default = CopyableText_default;
//# sourceMappingURL=CopyableText.cjs.map