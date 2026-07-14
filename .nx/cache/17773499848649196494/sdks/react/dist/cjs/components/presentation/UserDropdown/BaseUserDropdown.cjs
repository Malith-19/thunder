const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_Button = require('../../primitives/Button/Button.cjs');
const require_Typography = require('../../primitives/Typography/Typography.cjs');
const require_getMappedUserProfileValue = require('../../../utils/getMappedUserProfileValue.cjs');
const require_getDisplayName = require('../../../utils/getDisplayName.cjs');
const require_Avatar = require('../../primitives/Avatar/Avatar.cjs');
const require_LogOut = require('../../primitives/Icons/LogOut.cjs');
const require_User = require('../../primitives/Icons/User.cjs');
const require_BaseUserDropdown_styles = require('./BaseUserDropdown.styles.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);
let __floating_ui_react = require("@floating-ui/react");
__floating_ui_react = require_rolldown_runtime.__toESM(__floating_ui_react);

//#region src/components/presentation/UserDropdown/BaseUserDropdown.tsx
/**
* BaseUserDropdown component displays a user avatar with a dropdown menu.
* When clicked, it shows a popover with customizable menu items.
* This component serves as the base for framework-specific implementations.
*/
const BaseUserDropdown = ({ fallback = null, className = "", user, isLoading = false, portalId = "thunderid-user-dropdown", menuItems = [], showTriggerLabel = false, avatarSize = 32, onManageProfile, onSignOut, attributeMapping = {} }) => {
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_BaseUserDropdown_styles.default(theme, colorScheme);
	const [isOpen, setIsOpen] = (0, react.useState)(false);
	const [hoveredItemIndex, setHoveredItemIndex] = (0, react.useState)(null);
	const { refs, floatingStyles, context } = (0, __floating_ui_react.useFloating)({
		middleware: [
			(0, __floating_ui_react.offset)(5),
			(0, __floating_ui_react.flip)({ fallbackAxisSideDirection: "end" }),
			(0, __floating_ui_react.shift)({ padding: 5 })
		],
		onOpenChange: setIsOpen,
		open: isOpen,
		placement: "bottom-end",
		whileElementsMounted: __floating_ui_react.autoUpdate
	});
	const { getReferenceProps, getFloatingProps } = (0, __floating_ui_react.useInteractions)([
		(0, __floating_ui_react.useClick)(context),
		(0, __floating_ui_react.useDismiss)(context),
		(0, __floating_ui_react.useRole)(context)
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
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_User.default, {
			width: "16",
			height: "16"
		}),
		label: "Manage Profile",
		onClick: onManageProfile
	});
	if (onSignOut) defaultMenuItems.push({
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_LogOut.default, {
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown"), className),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Button.default, {
			ref: refs.setReference,
			className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__trigger"), styles["trigger"]),
			color: "tertiary",
			variant: "text",
			size: "medium",
			"data-testid": "thunderid-user-dropdown-trigger",
			...getReferenceProps(),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Avatar.Avatar, {
				imageUrl: require_getMappedUserProfileValue.default("picture", mergedMappings, user),
				name: require_getDisplayName.default(mergedMappings, user),
				size: avatarSize,
				alt: `${require_getDisplayName.default(mergedMappings, user)}'s avatar`
			}), showTriggerLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body2",
				className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__trigger-label"), styles["userName"]),
				children: require_getDisplayName.default(mergedMappings, user)
			})]
		}), isOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__floating_ui_react.FloatingPortal, {
			id: portalId,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__floating_ui_react.FloatingFocusManager, {
				context,
				modal: false,
				initialFocus: -1,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					ref: refs.setFloating,
					className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__content"), styles["dropdownContent"]),
					style: {
						...floatingStyles,
						zIndex: 9999
					},
					...getFloatingProps(),
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__header"), styles["dropdownHeader"]),
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Avatar.Avatar, {
							imageUrl: require_getMappedUserProfileValue.default("picture", mergedMappings, user),
							name: require_getDisplayName.default(mergedMappings, user),
							size: avatarSize * 1.25,
							alt: `${require_getDisplayName.default(mergedMappings, user)}'s avatar`
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__header-info"), styles["headerInfo"]),
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
								noWrap: true,
								className: (0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__header-name"),
								variant: "body1",
								fontWeight: "medium",
								children: require_getDisplayName.default(mergedMappings, user)
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
								noWrap: true,
								className: (0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__header-email"),
								variant: "caption",
								color: "secondary",
								children: require_getMappedUserProfileValue.default("username", mergedMappings, user) || require_getMappedUserProfileValue.default("email", mergedMappings, user)
							})]
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__menu"), styles["dropdownMenu"]),
						children: allMenuItems.map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: (() => {
							if (item.label === "") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__menu-divider"), styles["divider"]) });
							if (item.href) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("a", {
								href: item.href,
								style: { backgroundColor: hoveredItemIndex === index ? theme.vars.colors.action?.hover : "transparent" },
								className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__menu-item"), styles["menuItemAnchor"]),
								onMouseEnter: () => setHoveredItemIndex(index),
								onMouseLeave: () => setHoveredItemIndex(null),
								onFocus: () => setHoveredItemIndex(index),
								onBlur: () => setHoveredItemIndex(null),
								children: [item.icon, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: item.label })]
							});
							return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
								onClick: () => handleMenuItemClick(item),
								style: { backgroundColor: hoveredItemIndex === index ? theme.vars.colors.action?.hover : "transparent" },
								className: (0, __emotion_css.cx)((0, __thunderid_browser.withVendorCSSClassPrefix)("user-dropdown__menu-item"), styles["menuItem"]),
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
exports.BaseUserDropdown = BaseUserDropdown;
exports.default = BaseUserDropdown_default;
//# sourceMappingURL=BaseUserDropdown.cjs.map