import useTheme_default from "../../../contexts/Theme/useTheme.js";
import Button_default from "../../primitives/Button/Button.js";
import Typography_default from "../../primitives/Typography/Typography.js";
import getMappedUserProfileValue_default from "../../../utils/getMappedUserProfileValue.js";
import getDisplayName_default from "../../../utils/getDisplayName.js";
import { Avatar } from "../../primitives/Avatar/Avatar.js";
import LogOut_default from "../../primitives/Icons/LogOut.js";
import User_default from "../../primitives/Icons/User.js";
import BaseUserDropdown_styles_default from "./BaseUserDropdown.styles.js";
import { withVendorCSSClassPrefix } from "@thunderid/browser";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";
import { FloatingFocusManager, FloatingPortal, autoUpdate, flip, offset, shift, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";

//#region src/components/presentation/UserDropdown/BaseUserDropdown.tsx
/**
* BaseUserDropdown component displays a user avatar with a dropdown menu.
* When clicked, it shows a popover with customizable menu items.
* This component serves as the base for framework-specific implementations.
*/
const BaseUserDropdown = ({ fallback = null, className = "", user, isLoading = false, portalId = "thunderid-user-dropdown", menuItems = [], showTriggerLabel = false, avatarSize = 32, onManageProfile, onSignOut, attributeMapping = {} }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseUserDropdown_styles_default(theme, colorScheme);
	const [isOpen, setIsOpen] = useState(false);
	const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
	const { refs, floatingStyles, context } = useFloating({
		middleware: [
			offset(5),
			flip({ fallbackAxisSideDirection: "end" }),
			shift({ padding: 5 })
		],
		onOpenChange: setIsOpen,
		open: isOpen,
		placement: "bottom-end",
		whileElementsMounted: autoUpdate
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useClick(context),
		useDismiss(context),
		useRole(context)
	]);
	const mergedMappings = Object.fromEntries(Object.entries({
		email: ["emails"],
		firstName: ["name.givenName", "given_name"],
		lastName: ["name.familyName", "family_name"],
		picture: [
			"profile",
			"profileUrl",
			"picture",
			"URL"
		],
		username: [
			"userName",
			"username",
			"user_name"
		],
		...attributeMapping
	}).filter((entry) => entry[1] !== void 0));
	if (fallback && !user && !isLoading) return fallback;
	const handleMenuItemClick = (item) => {
		if (item.onClick) item.onClick();
		setIsOpen(false);
	};
	const defaultMenuItems = [];
	if (onManageProfile) defaultMenuItems.push({
		icon: /* @__PURE__ */ jsx(User_default, {
			width: "16",
			height: "16"
		}),
		label: "Manage Profile",
		onClick: onManageProfile
	});
	if (onSignOut) defaultMenuItems.push({
		icon: /* @__PURE__ */ jsx(LogOut_default, {
			width: "16",
			height: "16"
		}),
		label: "Sign Out",
		onClick: onSignOut
	});
	const allMenuItems = [...menuItems];
	if (defaultMenuItems.length > 0) {
		if (menuItems.length > 0) allMenuItems.push({
			label: "",
			onClick: void 0
		});
		allMenuItems.push(...defaultMenuItems);
	}
	return /* @__PURE__ */ jsxs("div", {
		className: cx(withVendorCSSClassPrefix("user-dropdown"), className),
		children: [/* @__PURE__ */ jsxs(Button_default, {
			ref: refs.setReference,
			className: cx(withVendorCSSClassPrefix("user-dropdown__trigger"), styles["trigger"]),
			color: "tertiary",
			variant: "text",
			size: "medium",
			"data-testid": "thunderid-user-dropdown-trigger",
			...getReferenceProps(),
			children: [/* @__PURE__ */ jsx(Avatar, {
				imageUrl: getMappedUserProfileValue_default("picture", mergedMappings, user),
				name: getDisplayName_default(mergedMappings, user),
				size: avatarSize,
				alt: `${getDisplayName_default(mergedMappings, user)}'s avatar`
			}), showTriggerLabel && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body2",
				className: cx(withVendorCSSClassPrefix("user-dropdown__trigger-label"), styles["userName"]),
				children: getDisplayName_default(mergedMappings, user)
			})]
		}), isOpen && /* @__PURE__ */ jsx(FloatingPortal, {
			id: portalId,
			children: /* @__PURE__ */ jsx(FloatingFocusManager, {
				context,
				modal: false,
				initialFocus: -1,
				children: /* @__PURE__ */ jsxs("div", {
					ref: refs.setFloating,
					className: cx(withVendorCSSClassPrefix("user-dropdown__content"), styles["dropdownContent"]),
					style: {
						...floatingStyles,
						zIndex: 9999
					},
					...getFloatingProps(),
					children: [/* @__PURE__ */ jsxs("div", {
						className: cx(withVendorCSSClassPrefix("user-dropdown__header"), styles["dropdownHeader"]),
						children: [/* @__PURE__ */ jsx(Avatar, {
							imageUrl: getMappedUserProfileValue_default("picture", mergedMappings, user),
							name: getDisplayName_default(mergedMappings, user),
							size: avatarSize * 1.25,
							alt: `${getDisplayName_default(mergedMappings, user)}'s avatar`
						}), /* @__PURE__ */ jsxs("div", {
							className: cx(withVendorCSSClassPrefix("user-dropdown__header-info"), styles["headerInfo"]),
							children: [/* @__PURE__ */ jsx(Typography_default, {
								noWrap: true,
								className: withVendorCSSClassPrefix("user-dropdown__header-name"),
								variant: "body1",
								fontWeight: "medium",
								children: getDisplayName_default(mergedMappings, user)
							}), /* @__PURE__ */ jsx(Typography_default, {
								noWrap: true,
								className: withVendorCSSClassPrefix("user-dropdown__header-email"),
								variant: "caption",
								color: "secondary",
								children: getMappedUserProfileValue_default("username", mergedMappings, user) || getMappedUserProfileValue_default("email", mergedMappings, user)
							})]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: cx(withVendorCSSClassPrefix("user-dropdown__menu"), styles["dropdownMenu"]),
						children: allMenuItems.map((item, index) => /* @__PURE__ */ jsx("div", { children: (() => {
							if (item.label === "") return /* @__PURE__ */ jsx("div", { className: cx(withVendorCSSClassPrefix("user-dropdown__menu-divider"), styles["divider"]) });
							if (item.href) return /* @__PURE__ */ jsxs("a", {
								href: item.href,
								style: { backgroundColor: hoveredItemIndex === index ? theme.vars.colors.action?.hover : "transparent" },
								className: cx(withVendorCSSClassPrefix("user-dropdown__menu-item"), styles["menuItemAnchor"]),
								onMouseEnter: () => setHoveredItemIndex(index),
								onMouseLeave: () => setHoveredItemIndex(null),
								onFocus: () => setHoveredItemIndex(index),
								onBlur: () => setHoveredItemIndex(null),
								children: [item.icon, /* @__PURE__ */ jsx("span", { children: item.label })]
							});
							return /* @__PURE__ */ jsx(Button_default, {
								onClick: () => handleMenuItemClick(item),
								style: { backgroundColor: hoveredItemIndex === index ? theme.vars.colors.action?.hover : "transparent" },
								className: cx(withVendorCSSClassPrefix("user-dropdown__menu-item"), styles["menuItem"]),
								color: "tertiary",
								variant: "text",
								size: "small",
								startIcon: item.icon,
								onMouseEnter: () => setHoveredItemIndex(index),
								onMouseLeave: () => setHoveredItemIndex(null),
								children: item.label
							});
						})() }, index))
					})]
				})
			})
		})]
	});
};
var BaseUserDropdown_default = BaseUserDropdown;

//#endregion
export { BaseUserDropdown, BaseUserDropdown_default as default };
//# sourceMappingURL=BaseUserDropdown.js.map