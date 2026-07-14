const require_rolldown_runtime = require('../../_virtual/rolldown_runtime.cjs');
const require_EmojiPicker = require('./EmojiPicker/EmojiPicker.cjs');
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
	const { t } = (0, react_i18next.useTranslation)("elements");
	const [pendingEmoji, setPendingEmoji] = (0, react.useState)(() => {
		if (!open || isUrl(value)) return "";
		return value.startsWith(EMOJI_SCHEME) ? value.slice(6) : value;
	});
	const [pendingUrl, setPendingUrl] = (0, react.useState)(() => open && isUrl(value) ? value : "");
	const [prevOpen, setPrevOpen] = (0, react.useState)(open);
	const [prevValue, setPrevValue] = (0, react.useState)(value);
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
	const handleEmojiChange = (0, react.useCallback)((char) => {
		setPendingEmoji(char);
		setPendingUrl("");
	}, []);
	const handleUrlChange = (0, react.useCallback)((url) => {
		setPendingUrl(url);
		if (url) setPendingEmoji("");
	}, []);
	const handleSelect = (0, react.useCallback)(() => {
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Dialog, {
		open,
		onClose,
		maxWidth: "sm",
		fullWidth: true,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogTitle, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
				direction: "row",
				alignItems: "center",
				justifyContent: "space-between",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
					variant: "h5",
					children: t("resource_logo_dialog.title", "Choose a Logo")
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.IconButton, {
					"aria-label": t("resource_logo_dialog.actions.close", "Close"),
					onClick: onClose,
					size: "small",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui_icons_react.X, { size: 20 })
				})]
			}) }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.DialogContent, {
				dividers: true,
				sx: { p: 0 },
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_EmojiPicker.default, {
					value: pendingEmoji,
					onChange: handleEmojiChange
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Stack, {
					spacing: 2,
					sx: {
						px: 2,
						pb: 2
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Divider, { children: t("resource_logo_dialog.divider.or", "Or") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.Box, { children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Typography, {
							variant: "subtitle2",
							gutterBottom: true,
							children: t("resource_logo_dialog.url_section.label", "Use a custom image URL")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.TextField, {
							fullWidth: true,
							size: "small",
							placeholder: t("resource_logo_dialog.url_section.placeholder", "https://example.com/logo.png"),
							value: pendingUrl,
							onChange: (e) => handleUrlChange(e.target.value)
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.FormHelperText, { children: t("resource_logo_dialog.url_section.helper_text", "Enter a direct URL to a custom logo image") })
					] })]
				})] })
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(__wso2_oxygen_ui.DialogActions, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				onClick: onClose,
				variant: "outlined",
				children: t("resource_logo_dialog.actions.cancel", "Cancel")
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__wso2_oxygen_ui.Button, {
				onClick: handleSelect,
				variant: "contained",
				disabled: !canSelect,
				children: t("resource_logo_dialog.actions.select", "Select")
			})] })
		]
	});
}

//#endregion
exports.default = ResourceLogoDialog;