const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_Button = require('../../primitives/Button/Button.cjs');
const require_Typography = require('../../primitives/Typography/Typography.cjs');
const require_Avatar = require('../../primitives/Avatar/Avatar.cjs');
const require_BaseOrganizationSwitcher_styles = require('./BaseOrganizationSwitcher.styles.cjs');
const require_Building = require('../../primitives/Icons/Building.cjs');
const require_Check = require('../../primitives/Icons/Check.cjs');
const require_ChevronDown = require('../../primitives/Icons/ChevronDown.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);
let __floating_ui_react = require("@floating-ui/react");
__floating_ui_react = require_rolldown_runtime.__toESM(__floating_ui_react);

//#region src/components/presentation/OrganizationSwitcher/BaseOrganizationSwitcher.tsx
/**
* BaseOrganizationSwitcher component displays an organization selector with a dropdown menu.
* When clicked, it shows a popover with available organizations to switch between.
* This component serves as the base for framework-specific implementations.
*/
const BaseOrganizationSwitcher = ({ organizations, currentOrganization, loading = false, error, onOrganizationSwitch, onManageProfile, className = "", style, renderOrganization, renderLoading, renderError, showRole = false, showMemberCount = true, menuItems = [], portalId = "thunderid-organization-switcher", showTriggerLabel = true, avatarSize = 24, fallback = null, preferences }) => {
	const { theme, colorScheme, direction } = require_useTheme.default();
	const styles = require_BaseOrganizationSwitcher_styles.default(theme, colorScheme);
	const [isOpen, setIsOpen] = (0, react.useState)(false);
	const [hoveredItemIndex, setHoveredItemIndex] = (0, react.useState)(null);
	const { t } = require_useTranslation.default(preferences?.i18n);
	const isRTL = direction === "rtl";
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
	if (fallback && !currentOrganization && !loading && organizations.length === 0) return fallback;
	const handleOrganizationSwitch = (organization) => {
		onOrganizationSwitch(organization);
		setIsOpen(false);
	};
	const handleMenuItemClick = (item) => {
		if (item.onClick) item.onClick();
		setIsOpen(false);
	};
	const switchableOrganizations = organizations.filter((org) => org.id !== currentOrganization?.id);
	const defaultRenderOrganization = (organization, isSelected) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Avatar.Avatar, {
			variant: "square",
			imageUrl: organization.avatar,
			name: organization.name,
			size: avatarSize * 1.25,
			alt: `${organization.name} avatar`
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, __emotion_css.cx)(styles["organizationInfo"]),
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body2",
				fontWeight: "medium",
				className: (0, __emotion_css.cx)(styles["organizationName"]),
				children: organization.name
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: (0, __emotion_css.cx)(styles["organizationMeta"]),
				children: [
					showMemberCount && organization.memberCount !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
						organization.memberCount,
						" ",
						organization.memberCount === 1 ? t("organization.switcher.member") : t("organization.switcher.members")
					] }),
					showRole && organization.role && showMemberCount && organization.memberCount !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: " • " }),
					showRole && organization.role && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: (0, __emotion_css.cx)(styles["roleCapitalized"]),
						children: organization.role
					})
				]
			})]
		}),
		isSelected && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Check.default, {
			width: "16",
			height: "16",
			color: theme.vars.colors.text.primary
		})
	] });
	const defaultRenderLoading = () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, __emotion_css.cx)(styles["loadingContainer"]),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
			variant: "caption",
			className: (0, __emotion_css.cx)(styles["loadingText"]),
			children: t("organization.switcher.loading.placeholder.organizations")
		})
	});
	const defaultRenderError = (errorMessage) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, __emotion_css.cx)(styles["errorContainer"]),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
			variant: "caption",
			className: (0, __emotion_css.cx)(styles["errorText"]),
			children: errorMessage
		})
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, __emotion_css.cx)(styles["root"], className),
		style,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Button.default, {
			ref: refs.setReference,
			className: (0, __emotion_css.cx)(styles["trigger"]),
			color: "tertiary",
			variant: "outline",
			size: "medium",
			...getReferenceProps(),
			children: [currentOrganization ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Avatar.Avatar, {
				variant: "square",
				imageUrl: currentOrganization.avatar,
				name: currentOrganization.name,
				size: avatarSize,
				alt: `${currentOrganization.name} avatar`
			}), showTriggerLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body2",
				className: (0, __emotion_css.cx)(styles["triggerLabel"]),
				children: currentOrganization.name
			})] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Building.default, {
				width: avatarSize,
				height: avatarSize
			}), showTriggerLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
				variant: "body2",
				className: (0, __emotion_css.cx)(styles["triggerLabel"]),
				children: t("elements.fields.organization.select.label")
			})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				style: {
					display: "inline-flex",
					transform: isRTL ? "scaleX(-1)" : "none"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ChevronDown.default, {
					width: "16",
					height: "16"
				})
			})]
		}), isOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__floating_ui_react.FloatingPortal, {
			id: portalId,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__floating_ui_react.FloatingFocusManager, {
				context,
				modal: false,
				initialFocus: -1,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					ref: refs.setFloating,
					className: (0, __emotion_css.cx)(styles["content"]),
					style: floatingStyles,
					...getFloatingProps(),
					children: [
						currentOrganization && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: (0, __emotion_css.cx)(styles["header"]),
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Avatar.Avatar, {
									variant: "square",
									imageUrl: currentOrganization.avatar,
									name: currentOrganization.name,
									size: avatarSize * 1.5,
									alt: `${currentOrganization.name} avatar`
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: (0, __emotion_css.cx)(styles["headerInfo"]),
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
										noWrap: true,
										className: (0, __emotion_css.cx)(styles["headerName"]),
										variant: "body1",
										fontWeight: "medium",
										children: currentOrganization.name
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: (0, __emotion_css.cx)(styles["headerMeta"]),
										children: [showMemberCount && currentOrganization.memberCount !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Typography.default, {
											noWrap: true,
											variant: "caption",
											color: "secondary",
											children: [
												currentOrganization.memberCount,
												" ",
												currentOrganization.memberCount === 1 ? t("organization.switcher.member") : t("organization.switcher.members"),
												showRole && currentOrganization.role && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [" • ", currentOrganization.role] })
											]
										}), showRole && currentOrganization.role && (!showMemberCount || currentOrganization.memberCount === void 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
											noWrap: true,
											className: (0, __emotion_css.cx)(styles["headerRole"]),
											variant: "caption",
											color: "secondary",
											children: currentOrganization.role
										})]
									})]
								}),
								onManageProfile && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
									onClick: onManageProfile,
									color: "tertiary",
									variant: "outline",
									size: "small",
									"aria-label": "Manage Organization Profile",
									className: (0, __emotion_css.cx)(styles["manageButton"]),
									endIcon: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
										width: "16",
										height: "16",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
											cx: "12",
											cy: "12",
											r: "3"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })]
									}),
									children: t("organization.switcher.buttons.manage.text")
								})
							]
						}),
						organizations.length > 1 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: (0, __emotion_css.cx)(styles["header"], styles["sectionHeaderContainer"]),
							style: { borderTop: currentOrganization ? `1px solid ${theme.vars.colors.border}` : "none" },
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
								variant: "caption",
								fontWeight: 600,
								className: (0, __emotion_css.cx)(styles["sectionHeader"]),
								children: t("organization.switcher.switch.organization")
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: (0, __emotion_css.cx)(styles["menu"]),
							children: (() => {
								if (loading) return renderLoading ? renderLoading() : defaultRenderLoading();
								if (error) return renderError ? renderError(error) : defaultRenderError(error);
								return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [switchableOrganizations.map((organization) => {
									const isSelected = false;
									return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
										onClick: () => handleOrganizationSwitch(organization),
										className: (0, __emotion_css.cx)(styles["menuItem"]),
										color: "tertiary",
										variant: "text",
										size: "small",
										style: { backgroundColor: hoveredItemIndex === switchableOrganizations.indexOf(organization) ? theme.vars.colors.action?.hover : "transparent" },
										onMouseEnter: () => setHoveredItemIndex(switchableOrganizations.indexOf(organization)),
										onMouseLeave: () => setHoveredItemIndex(null),
										children: renderOrganization ? renderOrganization(organization, isSelected) : defaultRenderOrganization(organization, isSelected)
									}, organization.id);
								}), menuItems.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { className: (0, __emotion_css.cx)(styles["menuDivider"]) }), menuItems.map((item, index) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: item.href ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("a", {
									href: item.href,
									style: { backgroundColor: hoveredItemIndex === switchableOrganizations.length + index ? theme.vars.colors.action?.hover : "transparent" },
									className: (0, __emotion_css.cx)(styles["menuItem"]),
									onMouseEnter: () => setHoveredItemIndex(switchableOrganizations.length + index),
									onMouseLeave: () => setHoveredItemIndex(null),
									onFocus: () => setHoveredItemIndex(switchableOrganizations.length + index),
									onBlur: () => setHoveredItemIndex(null),
									children: [item.icon, /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: item.label })]
								}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
									onClick: () => handleMenuItemClick(item),
									style: { backgroundColor: hoveredItemIndex === switchableOrganizations.length + index ? theme.vars.colors.action?.hover : "transparent" },
									className: (0, __emotion_css.cx)(styles["menuItem"]),
									color: "tertiary",
									variant: "text",
									size: "small",
									startIcon: item.icon,
									onMouseEnter: () => setHoveredItemIndex(switchableOrganizations.length + index),
									onMouseLeave: () => setHoveredItemIndex(null),
									children: item.label
								}) }, index))] })] });
							})()
						})
					]
				})
			})
		})]
	});
};
var BaseOrganizationSwitcher_default = BaseOrganizationSwitcher;

//#endregion
exports.BaseOrganizationSwitcher = BaseOrganizationSwitcher;
exports.default = BaseOrganizationSwitcher_default;
//# sourceMappingURL=BaseOrganizationSwitcher.cjs.map