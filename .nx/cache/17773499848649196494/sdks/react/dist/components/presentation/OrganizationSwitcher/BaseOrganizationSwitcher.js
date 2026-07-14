import useTheme_default from "../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import Button_default from "../../primitives/Button/Button.js";
import Typography_default from "../../primitives/Typography/Typography.js";
import { Avatar } from "../../primitives/Avatar/Avatar.js";
import BaseOrganizationSwitcher_styles_default from "./BaseOrganizationSwitcher.styles.js";
import Building_default from "../../primitives/Icons/Building.js";
import Check_default from "../../primitives/Icons/Check.js";
import ChevronDown_default from "../../primitives/Icons/ChevronDown.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";
import { FloatingFocusManager, FloatingPortal, autoUpdate, flip, offset, shift, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";

//#region src/components/presentation/OrganizationSwitcher/BaseOrganizationSwitcher.tsx
/**
* BaseOrganizationSwitcher component displays an organization selector with a dropdown menu.
* When clicked, it shows a popover with available organizations to switch between.
* This component serves as the base for framework-specific implementations.
*/
const BaseOrganizationSwitcher = ({ organizations, currentOrganization, loading = false, error, onOrganizationSwitch, onManageProfile, className = "", style, renderOrganization, renderLoading, renderError, showRole = false, showMemberCount = true, menuItems = [], portalId = "thunderid-organization-switcher", showTriggerLabel = true, avatarSize = 24, fallback = null, preferences }) => {
	const { theme, colorScheme, direction } = useTheme_default();
	const styles = BaseOrganizationSwitcher_styles_default(theme, colorScheme);
	const [isOpen, setIsOpen] = useState(false);
	const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
	const { t } = useTranslation_default(preferences?.i18n);
	const isRTL = direction === "rtl";
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
	const defaultRenderOrganization = (organization, isSelected) => /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Avatar, {
			variant: "square",
			imageUrl: organization.avatar,
			name: organization.name,
			size: avatarSize * 1.25,
			alt: `${organization.name} avatar`
		}),
		/* @__PURE__ */ jsxs("div", {
			className: cx(styles["organizationInfo"]),
			children: [/* @__PURE__ */ jsx(Typography_default, {
				variant: "body2",
				fontWeight: "medium",
				className: cx(styles["organizationName"]),
				children: organization.name
			}), /* @__PURE__ */ jsxs("div", {
				className: cx(styles["organizationMeta"]),
				children: [
					showMemberCount && organization.memberCount !== void 0 && /* @__PURE__ */ jsxs("span", { children: [
						organization.memberCount,
						" ",
						organization.memberCount === 1 ? t("organization.switcher.member") : t("organization.switcher.members")
					] }),
					showRole && organization.role && showMemberCount && organization.memberCount !== void 0 && /* @__PURE__ */ jsx("span", { children: " • " }),
					showRole && organization.role && /* @__PURE__ */ jsx("span", {
						className: cx(styles["roleCapitalized"]),
						children: organization.role
					})
				]
			})]
		}),
		isSelected && /* @__PURE__ */ jsx(Check_default, {
			width: "16",
			height: "16",
			color: theme.vars.colors.text.primary
		})
	] });
	const defaultRenderLoading = () => /* @__PURE__ */ jsx("div", {
		className: cx(styles["loadingContainer"]),
		children: /* @__PURE__ */ jsx(Typography_default, {
			variant: "caption",
			className: cx(styles["loadingText"]),
			children: t("organization.switcher.loading.placeholder.organizations")
		})
	});
	const defaultRenderError = (errorMessage) => /* @__PURE__ */ jsx("div", {
		className: cx(styles["errorContainer"]),
		children: /* @__PURE__ */ jsx(Typography_default, {
			variant: "caption",
			className: cx(styles["errorText"]),
			children: errorMessage
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: cx(styles["root"], className),
		style,
		children: [/* @__PURE__ */ jsxs(Button_default, {
			ref: refs.setReference,
			className: cx(styles["trigger"]),
			color: "tertiary",
			variant: "outline",
			size: "medium",
			...getReferenceProps(),
			children: [currentOrganization ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Avatar, {
				variant: "square",
				imageUrl: currentOrganization.avatar,
				name: currentOrganization.name,
				size: avatarSize,
				alt: `${currentOrganization.name} avatar`
			}), showTriggerLabel && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body2",
				className: cx(styles["triggerLabel"]),
				children: currentOrganization.name
			})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Building_default, {
				width: avatarSize,
				height: avatarSize
			}), showTriggerLabel && /* @__PURE__ */ jsx(Typography_default, {
				variant: "body2",
				className: cx(styles["triggerLabel"]),
				children: t("elements.fields.organization.select.label")
			})] }), /* @__PURE__ */ jsx("span", {
				style: {
					display: "inline-flex",
					transform: isRTL ? "scaleX(-1)" : "none"
				},
				children: /* @__PURE__ */ jsx(ChevronDown_default, {
					width: "16",
					height: "16"
				})
			})]
		}), isOpen && /* @__PURE__ */ jsx(FloatingPortal, {
			id: portalId,
			children: /* @__PURE__ */ jsx(FloatingFocusManager, {
				context,
				modal: false,
				initialFocus: -1,
				children: /* @__PURE__ */ jsxs("div", {
					ref: refs.setFloating,
					className: cx(styles["content"]),
					style: floatingStyles,
					...getFloatingProps(),
					children: [
						currentOrganization && /* @__PURE__ */ jsxs("div", {
							className: cx(styles["header"]),
							children: [
								/* @__PURE__ */ jsx(Avatar, {
									variant: "square",
									imageUrl: currentOrganization.avatar,
									name: currentOrganization.name,
									size: avatarSize * 1.5,
									alt: `${currentOrganization.name} avatar`
								}),
								/* @__PURE__ */ jsxs("div", {
									className: cx(styles["headerInfo"]),
									children: [/* @__PURE__ */ jsx(Typography_default, {
										noWrap: true,
										className: cx(styles["headerName"]),
										variant: "body1",
										fontWeight: "medium",
										children: currentOrganization.name
									}), /* @__PURE__ */ jsxs("div", {
										className: cx(styles["headerMeta"]),
										children: [showMemberCount && currentOrganization.memberCount !== void 0 && /* @__PURE__ */ jsxs(Typography_default, {
											noWrap: true,
											variant: "caption",
											color: "secondary",
											children: [
												currentOrganization.memberCount,
												" ",
												currentOrganization.memberCount === 1 ? t("organization.switcher.member") : t("organization.switcher.members"),
												showRole && currentOrganization.role && /* @__PURE__ */ jsxs("span", { children: [" • ", currentOrganization.role] })
											]
										}), showRole && currentOrganization.role && (!showMemberCount || currentOrganization.memberCount === void 0) && /* @__PURE__ */ jsx(Typography_default, {
											noWrap: true,
											className: cx(styles["headerRole"]),
											variant: "caption",
											color: "secondary",
											children: currentOrganization.role
										})]
									})]
								}),
								onManageProfile && /* @__PURE__ */ jsx(Button_default, {
									onClick: onManageProfile,
									color: "tertiary",
									variant: "outline",
									size: "small",
									"aria-label": "Manage Organization Profile",
									className: cx(styles["manageButton"]),
									endIcon: /* @__PURE__ */ jsxs("svg", {
										width: "16",
										height: "16",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										children: [/* @__PURE__ */ jsx("circle", {
											cx: "12",
											cy: "12",
											r: "3"
										}), /* @__PURE__ */ jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })]
									}),
									children: t("organization.switcher.buttons.manage.text")
								})
							]
						}),
						organizations.length > 1 && /* @__PURE__ */ jsx("div", {
							className: cx(styles["header"], styles["sectionHeaderContainer"]),
							style: { borderTop: currentOrganization ? `1px solid ${theme.vars.colors.border}` : "none" },
							children: /* @__PURE__ */ jsx(Typography_default, {
								variant: "caption",
								fontWeight: 600,
								className: cx(styles["sectionHeader"]),
								children: t("organization.switcher.switch.organization")
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: cx(styles["menu"]),
							children: (() => {
								if (loading) return renderLoading ? renderLoading() : defaultRenderLoading();
								if (error) return renderError ? renderError(error) : defaultRenderError(error);
								return /* @__PURE__ */ jsxs(Fragment, { children: [switchableOrganizations.map((organization) => {
									const isSelected = false;
									return /* @__PURE__ */ jsx(Button_default, {
										onClick: () => handleOrganizationSwitch(organization),
										className: cx(styles["menuItem"]),
										color: "tertiary",
										variant: "text",
										size: "small",
										style: { backgroundColor: hoveredItemIndex === switchableOrganizations.indexOf(organization) ? theme.vars.colors.action?.hover : "transparent" },
										onMouseEnter: () => setHoveredItemIndex(switchableOrganizations.indexOf(organization)),
										onMouseLeave: () => setHoveredItemIndex(null),
										children: renderOrganization ? renderOrganization(organization, isSelected) : defaultRenderOrganization(organization, isSelected)
									}, organization.id);
								}), menuItems.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", { className: cx(styles["menuDivider"]) }), menuItems.map((item, index) => /* @__PURE__ */ jsx("div", { children: item.href ? /* @__PURE__ */ jsxs("a", {
									href: item.href,
									style: { backgroundColor: hoveredItemIndex === switchableOrganizations.length + index ? theme.vars.colors.action?.hover : "transparent" },
									className: cx(styles["menuItem"]),
									onMouseEnter: () => setHoveredItemIndex(switchableOrganizations.length + index),
									onMouseLeave: () => setHoveredItemIndex(null),
									onFocus: () => setHoveredItemIndex(switchableOrganizations.length + index),
									onBlur: () => setHoveredItemIndex(null),
									children: [item.icon, /* @__PURE__ */ jsx("span", { children: item.label })]
								}) : /* @__PURE__ */ jsx(Button_default, {
									onClick: () => handleMenuItemClick(item),
									style: { backgroundColor: hoveredItemIndex === switchableOrganizations.length + index ? theme.vars.colors.action?.hover : "transparent" },
									className: cx(styles["menuItem"]),
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
export { BaseOrganizationSwitcher, BaseOrganizationSwitcher_default as default };
//# sourceMappingURL=BaseOrganizationSwitcher.js.map