import useTheme_default from "../../../contexts/Theme/useTheme.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import Spinner_default from "../../primitives/Spinner/Spinner.js";
import Button_default from "../../primitives/Button/Button.js";
import Typography_default from "../../primitives/Typography/Typography.js";
import { Avatar } from "../../primitives/Avatar/Avatar.js";
import Dialog_default from "../../primitives/Dialog/Dialog.js";
import BaseOrganizationList_styles_default from "./BaseOrganizationList.styles.js";
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { cx } from "@emotion/css";

//#region src/components/presentation/OrganizationList/BaseOrganizationList.tsx
/**
* Default organization item renderer
*/
const defaultRenderOrganization = (organization, styles, t, onOrganizationSelect, showStatus) => /* @__PURE__ */ jsxs("div", {
	className: cx(styles.organizationItem),
	children: [/* @__PURE__ */ jsxs("div", {
		className: cx(styles.organizationContent),
		children: [/* @__PURE__ */ jsx(Avatar, {
			variant: "square",
			name: organization.name,
			size: 48,
			alt: `${organization.name} logo`
		}), /* @__PURE__ */ jsxs("div", {
			className: cx(styles.organizationInfo),
			children: [
				/* @__PURE__ */ jsx(Typography_default, {
					variant: "h6",
					className: cx(styles.organizationName),
					children: organization.name
				}),
				/* @__PURE__ */ jsxs(Typography_default, {
					variant: "body2",
					color: "textSecondary",
					className: cx(styles.organizationHandle),
					children: ["@", organization.orgHandle]
				}),
				showStatus && /* @__PURE__ */ jsxs(Typography_default, {
					variant: "body2",
					color: "textSecondary",
					className: cx(styles.organizationStatus),
					children: [
						t("organization.switcher.status.label"),
						" ",
						/* @__PURE__ */ jsx("span", {
							className: cx(styles.statusText, organization.status === "ACTIVE" ? styles.statusTextActive : styles.statusTextInactive),
							children: organization.status
						})
					]
				})
			]
		})]
	}), organization.canSwitch && /* @__PURE__ */ jsx("div", {
		className: cx(styles.organizationActions),
		children: /* @__PURE__ */ jsx(Button_default, {
			onClick: (e) => {
				e.stopPropagation();
				onOrganizationSelect?.(organization);
			},
			type: "button",
			size: "small",
			children: t("organization.switcher.buttons.switch.text")
		})
	})]
}, organization.id);
/**
* Default loading renderer
*/
const defaultRenderLoading = (t, styles) => /* @__PURE__ */ jsxs("div", {
	className: cx(styles.loadingContainer),
	children: [/* @__PURE__ */ jsx(Spinner_default, { size: "medium" }), /* @__PURE__ */ jsx(Typography_default, {
		variant: "body1",
		color: "textSecondary",
		className: cx(styles.loadingText),
		children: t("organization.switcher.loading.placeholder.organizations")
	})]
});
/**
* Default error renderer
*/
const defaultRenderError = (errorMessage, t, styles) => /* @__PURE__ */ jsx("div", {
	className: cx(styles.errorContainer),
	children: /* @__PURE__ */ jsxs(Typography_default, {
		variant: "body1",
		color: "error",
		children: [
			/* @__PURE__ */ jsx("strong", { children: t("organization.switcher.error.prefix") }),
			" ",
			errorMessage
		]
	})
});
/**
* Default load more button renderer
*/
const defaultRenderLoadMore = (onLoadMore, isLoadingMore, t, styles) => /* @__PURE__ */ jsx(Button_default, {
	onClick: onLoadMore,
	disabled: isLoadingMore,
	className: cx(styles.loadMoreButton),
	type: "button",
	fullWidth: true,
	children: isLoadingMore ? t("organization.switcher.loading.more") : t("organization.switcher.buttons.load_more.text")
});
/**
* Default empty state renderer
*/
const defaultRenderEmpty = (t, styles) => /* @__PURE__ */ jsx("div", {
	className: cx(styles.emptyContainer),
	children: /* @__PURE__ */ jsx(Typography_default, {
		variant: "body1",
		color: "textSecondary",
		className: cx(styles.emptyText),
		children: t("organization.switcher.no.organizations")
	})
});
/**
* BaseOrganizationList component displays a list of organizations with pagination support.
* This component serves as the base for framework-specific implementations.
*
* @example
* ```tsx
* <BaseOrganizationList
*   data={organizations}
*   isLoading={isLoading}
*   hasMore={hasMore}
*   fetchMore={fetchMore}
*   error={error}
* />
* ```
*/
const BaseOrganizationList = ({ className = "", allOrganizations, myOrganizations, error, fetchMore, hasMore = false, isLoading = false, isLoadingMore = false, mode = "inline", onOpenChange, onOrganizationSelect, onRefresh, open = false, renderEmpty, renderError, renderLoading, renderLoadMore, renderOrganization, style, title = "Organizations", showStatus, preferences }) => {
	const { theme, colorScheme } = useTheme_default();
	const styles = BaseOrganizationList_styles_default(theme, colorScheme);
	const { t } = useTranslation_default(preferences?.i18n);
	const organizationsWithSwitchAccess = useMemo(() => {
		if (!allOrganizations?.organizations) return [];
		const myOrgIds = new Set(myOrganizations?.map((org) => org.id) || []);
		return allOrganizations.organizations.map((org) => ({
			...org,
			canSwitch: myOrgIds.has(org.id)
		}));
	}, [allOrganizations?.organizations, myOrganizations]);
	const renderLoadingWithStyles = renderLoading || (() => defaultRenderLoading(t, styles));
	const renderErrorWithStyles = renderError || ((errorMsg) => defaultRenderError(errorMsg, t, styles));
	const renderEmptyWithStyles = renderEmpty || (() => defaultRenderEmpty(t, styles));
	const renderLoadMoreWithStyles = renderLoadMore || ((onLoadMore, loadingMore) => defaultRenderLoadMore(onLoadMore, loadingMore, t, styles));
	const renderOrganizationWithStyles = renderOrganization || ((org) => defaultRenderOrganization(org, styles, t, onOrganizationSelect, showStatus));
	if (isLoading && organizationsWithSwitchAccess?.length === 0) {
		const loadingContent = /* @__PURE__ */ jsx("div", {
			className: cx(styles["root"], className),
			style,
			children: renderLoadingWithStyles()
		});
		if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
				className: cx(styles["popupContent"]),
				children: loadingContent
			})] })
		});
		return loadingContent;
	}
	if (error && organizationsWithSwitchAccess?.length === 0) {
		const errorContent = /* @__PURE__ */ jsx("div", {
			className: cx(styles["root"], className),
			style,
			children: renderErrorWithStyles(error)
		});
		if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
				className: cx(styles["popupContent"]),
				children: errorContent
			})] })
		});
		return errorContent;
	}
	if (!isLoading && organizationsWithSwitchAccess?.length === 0) {
		const emptyContent = /* @__PURE__ */ jsx("div", {
			className: cx(styles["root"], className),
			style,
			children: renderEmptyWithStyles()
		});
		if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
				className: cx(styles["popupContent"]),
				children: emptyContent
			})] })
		});
		return emptyContent;
	}
	const organizationListContent = /* @__PURE__ */ jsxs("div", {
		className: cx(styles["root"], className),
		style,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: cx(styles["header"]),
				children: [/* @__PURE__ */ jsx("div", {
					className: cx(styles["headerInfo"]),
					children: /* @__PURE__ */ jsx(Typography_default, {
						variant: "body2",
						color: "textSecondary",
						className: cx(styles["subtitle"]),
						children: t("organization.switcher.showing.count", {
							showing: organizationsWithSwitchAccess?.length,
							total: allOrganizations?.organizations?.length || 0
						})
					})
				}), onRefresh && /* @__PURE__ */ jsx(Button_default, {
					onClick: onRefresh,
					className: cx(styles["refreshButton"]),
					type: "button",
					variant: "outline",
					size: "small",
					children: t("organization.switcher.buttons.refresh.text")
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: cx(styles["listContainer"]),
				children: organizationsWithSwitchAccess?.map((organization, index) => renderOrganizationWithStyles(organization, index))
			}),
			error && organizationsWithSwitchAccess?.length > 0 && /* @__PURE__ */ jsx("div", {
				className: cx(styles["errorMargin"]),
				children: renderErrorWithStyles(error)
			}),
			hasMore && fetchMore && /* @__PURE__ */ jsx("div", {
				className: cx(styles["loadMoreMargin"]),
				children: renderLoadMoreWithStyles(fetchMore, isLoadingMore)
			})
		]
	});
	if (mode === "popup") return /* @__PURE__ */ jsx(Dialog_default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(Dialog_default.Content, { children: [/* @__PURE__ */ jsx(Dialog_default.Heading, { children: title }), /* @__PURE__ */ jsx("div", {
			className: cx(styles["popupContent"]),
			children: organizationListContent
		})] })
	});
	return organizationListContent;
};
var BaseOrganizationList_default = BaseOrganizationList;

//#endregion
export { BaseOrganizationList, BaseOrganizationList_default as default };
//# sourceMappingURL=BaseOrganizationList.js.map