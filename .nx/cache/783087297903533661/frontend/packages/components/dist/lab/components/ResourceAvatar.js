import ResourceLogoDialog from "./ResourceLogoDialog.js";
import { useCallback, useState } from "react";
import { Avatar, Box, IconButton } from "@wso2/oxygen-ui";
import { Edit } from "@wso2/oxygen-ui-icons-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

//#region src/lab/components/ResourceAvatar.tsx
const EMOJI_SCHEME = "emoji:";
function isUrl(value) {
	return value.startsWith("http://") || value.startsWith("https://");
}
function resolveDisplayValue(value) {
	return value.startsWith(EMOJI_SCHEME) ? value.slice(6) : value;
}
/**
* A smart avatar that renders a resource icon from an emoji or image URL.
*
* **Read-only mode** (no `onSelect`): renders just the Avatar.
*
* **Edit mode** (`onSelect` provided): wraps the Avatar in a relative container,
* shows an overlaid pencil button, and manages a {@link ResourceLogoDialog}
* internally. No external state or dialog wiring needed by the caller.
*
* @example
* ```tsx
* // Read-only
* <ResourceAvatar value="emoji:🐼" size={40} fallback={<AppWindow />} />
*
* // Editable
* <ResourceAvatar
*   editable
*   value={app.logoUrl}
*   size={40}
*   fallback="emoji:🖥️"
*   onSelect={(val) => setApp({...app, logoUrl: val})}
* />
* ```
*
* @public
*/
function ResourceAvatar({ editable = false, value = void 0, size = 40, fallback = null, sx, onSelect = void 0, editAriaLabel = "Change logo", onClick = void 0,...rest }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [imgErrorUrl, setImgErrorUrl] = useState(null);
	const displayValue = Boolean(value) ? resolveDisplayValue(value) : "";
	const isUrlValue = Boolean(displayValue) && isUrl(displayValue);
	const imgError = imgErrorUrl === displayValue && Boolean(displayValue);
	const resolvedFallbackIcon = typeof fallback === "string" && fallback.startsWith(EMOJI_SCHEME) ? fallback.slice(6) : fallback;
	const handleOpenDialog = useCallback(() => {
		setIsDialogOpen(true);
	}, []);
	const handleCloseDialog = useCallback(() => {
		setIsDialogOpen(false);
	}, []);
	const handleImgError = useCallback(() => {
		setImgErrorUrl(displayValue);
	}, [displayValue]);
	const handleSelect = useCallback((val) => {
		onSelect?.(val);
		setIsDialogOpen(false);
	}, [onSelect]);
	let avatarContent;
	if (isUrlValue) avatarContent = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("img", {
		src: displayValue,
		alt: "logo",
		onError: handleImgError,
		style: imgError ? { display: "none" } : {
			width: "100%",
			height: "100%",
			objectFit: "cover",
			textAlign: "center"
		}
	}), imgError && resolvedFallbackIcon] });
	else avatarContent = displayValue || resolvedFallbackIcon;
	const isInteractive = Boolean(onSelect ?? onClick);
	const avatar = /* @__PURE__ */ jsx(Avatar, {
		src: void 0,
		role: isInteractive ? "button" : void 0,
		tabIndex: isInteractive ? 0 : void 0,
		onClick: onSelect ? handleOpenDialog : onClick,
		onKeyDown: isInteractive ? (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				if (onSelect) handleOpenDialog();
				else onClick?.();
			}
		} : void 0,
		sx: {
			width: size,
			height: size,
			fontSize: `${Math.round(size * .55)}px`,
			cursor: isInteractive ? "pointer" : void 0,
			...onSelect ? { "&:hover": { opacity: .8 } } : {},
			"&:focus-visible": isInteractive ? {
				outline: "2px solid",
				outlineOffset: "2px"
			} : void 0,
			...sx
		},
		...rest,
		children: avatarContent
	});
	if (!onSelect) return avatar;
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			position: "relative",
			display: "inline-flex"
		},
		children: [
			avatar,
			editable && /* @__PURE__ */ jsx(IconButton, {
				size: "small",
				"aria-label": editAriaLabel,
				onClick: handleOpenDialog,
				sx: {
					position: "absolute",
					bottom: -4,
					right: -4,
					bgcolor: "background.paper",
					boxShadow: 1,
					"&:hover": { bgcolor: "action.hover" }
				},
				children: /* @__PURE__ */ jsx(Edit, { size: 14 })
			}),
			/* @__PURE__ */ jsx(ResourceLogoDialog, {
				open: isDialogOpen,
				onClose: handleCloseDialog,
				value,
				onSelect: handleSelect
			})
		]
	});
}

//#endregion
export { ResourceAvatar as default };