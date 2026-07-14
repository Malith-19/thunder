import useTheme_default from "../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import Button_default from "../Button/Button.js";
import CopyableText_styles_default from "./CopyableText.styles.js";
import { useCallback, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/components/primitives/CopyableText/CopyableText.tsx
/**
* A React component that displays a text value with an optional label and a button to copy the value to
* the clipboard. When the button is clicked, it attempts to copy the value using the Clipboard API, and
* falls back to a textarea method if the API is not supported.
* After copying, it shows a "Copied!" message for 3 seconds before resetting.
*/
const CopyableText = ({ label, value }) => {
	const { theme } = useTheme_default();
	const styles = CopyableText_styles_default(theme);
	const { t } = useTranslation_default();
	const [copied, setCopied] = useState(false);
	const handleCopy = useCallback(async () => {
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
	return /* @__PURE__ */ jsxs("div", {
		className: styles["container"],
		children: [label && /* @__PURE__ */ jsx("span", {
			className: styles["label"],
			children: label
		}), /* @__PURE__ */ jsxs("div", {
			className: styles["valueBox"],
			children: [/* @__PURE__ */ jsx("span", {
				className: styles["valueText"],
				children: value
			}), /* @__PURE__ */ jsx(Button_default, {
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
export { CopyableText_default as default };
//# sourceMappingURL=CopyableText.js.map