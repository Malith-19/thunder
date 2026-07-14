import EmojiPicker from "./EmojiPicker/EmojiPicker.js";
import { useCallback, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormHelperText, IconButton, Stack, TextField, Typography } from "@wso2/oxygen-ui";
import { X } from "@wso2/oxygen-ui-icons-react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/lab/components/ResourceLogoDialog.tsx
const EMOJI_SCHEME = "emoji:";
function isUrl(value) {
	return value.startsWith("http://") || value.startsWith("https://");
}
/**
* A dialog that lets the user choose a resource logo — either by picking an
* emoji from the {@link EmojiPicker} grid or by entering a custom image URL.
*
* @public
*/
function ResourceLogoDialog({ open, onClose, value = "", onSelect }) {
	const { t } = useTranslation("elements");
	const [pendingEmoji, setPendingEmoji] = useState(() => {
		if (!open || isUrl(value)) return "";
		return value.startsWith(EMOJI_SCHEME) ? value.slice(6) : value;
	});
	const [pendingUrl, setPendingUrl] = useState(() => open && isUrl(value) ? value : "");
	const [prevOpen, setPrevOpen] = useState(open);
	const [prevValue, setPrevValue] = useState(value);
	if (prevOpen !== open || open && prevValue !== value) {
		setPrevOpen(open);
		setPrevValue(value);
		if (open) if (isUrl(value)) {
			setPendingUrl(value);
			setPendingEmoji("");
		} else {
			setPendingEmoji(value.startsWith(EMOJI_SCHEME) ? value.slice(6) : value);
			setPendingUrl("");
		}
	}
	const handleEmojiChange = useCallback((char) => {
		setPendingEmoji(char);
		setPendingUrl("");
	}, []);
	const handleUrlChange = useCallback((url) => {
		setPendingUrl(url);
		if (url) setPendingEmoji("");
	}, []);
	const handleSelect = useCallback(() => {
		if (pendingUrl) onSelect(pendingUrl);
		else if (pendingEmoji) onSelect(EMOJI_SCHEME + pendingEmoji);
		onClose();
	}, [
		pendingUrl,
		pendingEmoji,
		onSelect,
		onClose
	]);
	const canSelect = Boolean(pendingUrl || pendingEmoji);
	return /* @__PURE__ */ jsxs(Dialog, {
		open,
		onClose,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ jsx(DialogTitle, { children: /* @__PURE__ */ jsxs(Stack, {
				direction: "row",
				alignItems: "center",
				justifyContent: "space-between",
				children: [/* @__PURE__ */ jsx(Typography, {
					variant: "h5",
					children: t("resource_logo_dialog.title", "Choose a Logo")
				}), /* @__PURE__ */ jsx(IconButton, {
					"aria-label": t("resource_logo_dialog.actions.close", "Close"),
					onClick: onClose,
					size: "small",
					children: /* @__PURE__ */ jsx(X, { size: 20 })
				})]
			}) }),
			/* @__PURE__ */ jsx(DialogContent, {
				dividers: true,
				sx: { p: 0 },
				children: /* @__PURE__ */ jsxs(Stack, { children: [/* @__PURE__ */ jsx(EmojiPicker, {
					value: pendingEmoji,
					onChange: handleEmojiChange
				}), /* @__PURE__ */ jsxs(Stack, {
					spacing: 2,
					sx: {
						px: 2,
						pb: 2
					},
					children: [/* @__PURE__ */ jsx(Divider, { children: t("resource_logo_dialog.divider.or", "Or") }), /* @__PURE__ */ jsxs(Box, { children: [
						/* @__PURE__ */ jsx(Typography, {
							variant: "subtitle2",
							gutterBottom: true,
							children: t("resource_logo_dialog.url_section.label", "Use a custom image URL")
						}),
						/* @__PURE__ */ jsx(TextField, {
							fullWidth: true,
							size: "small",
							placeholder: t("resource_logo_dialog.url_section.placeholder", "https://example.com/logo.png"),
							value: pendingUrl,
							onChange: (e) => handleUrlChange(e.target.value)
						}),
						/* @__PURE__ */ jsx(FormHelperText, { children: t("resource_logo_dialog.url_section.helper_text", "Enter a direct URL to a custom logo image") })
					] })]
				})] })
			}),
			/* @__PURE__ */ jsxs(DialogActions, { children: [/* @__PURE__ */ jsx(Button, {
				onClick: onClose,
				variant: "outlined",
				children: t("resource_logo_dialog.actions.cancel", "Cancel")
			}), /* @__PURE__ */ jsx(Button, {
				onClick: handleSelect,
				variant: "contained",
				disabled: !canSelect,
				children: t("resource_logo_dialog.actions.select", "Select")
			})] })
		]
	});
}

//#endregion
export { ResourceLogoDialog as default };