const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useTheme = require('../../../contexts/Theme/useTheme.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_Spinner = require('../../primitives/Spinner/Spinner.cjs');
const require_Button = require('../../primitives/Button/Button.cjs');
const require_Typography = require('../../primitives/Typography/Typography.cjs');
const require_Avatar = require('../../primitives/Avatar/Avatar.cjs');
const require_Dialog = require('../../primitives/Dialog/Dialog.cjs');
const require_BaseOrganizationList_styles = require('./BaseOrganizationList.styles.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);
let __emotion_css = require("@emotion/css");
__emotion_css = require_rolldown_runtime.__toESM(__emotion_css);

//#region src/components/presentation/OrganizationList/BaseOrganizationList.tsx
/**
* Default organization item renderer
*/
const defaultRenderOrganization = (organization, styles, t, onOrganizationSelect, showStatus) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
	className: (0, __emotion_css.cx)(styles.organizationItem),
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, __emotion_css.cx)(styles.organizationContent),
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Avatar.Avatar, {
			variant: "square",
			name: organization.name,
			size: 48,
			alt: `${organization.name} logo`
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: (0, __emotion_css.cx)(styles.organizationInfo),
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
					variant: "h6",
					className: (0, __emotion_css.cx)(styles.organizationName),
					children: organization.name
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Typography.default, {
					variant: "body2",
					color: "textSecondary",
					className: (0, __emotion_css.cx)(styles.organizationHandle),
					children: ["@", organization.orgHandle]
				}),
				showStatus && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Typography.default, {
					variant: "body2",
					color: "textSecondary",
					className: (0, __emotion_css.cx)(styles.organizationStatus),
					children: [
						t("organization.switcher.status.label"),
						" ",
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: (0, __emotion_css.cx)(styles.statusText, organization.status === "ACTIVE" ? styles.statusTextActive : styles.statusTextInactive),
							children: organization.status
						})
					]
				})
			]
		})]
	}), organization.canSwitch && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, __emotion_css.cx)(styles.organizationActions),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
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
const defaultRenderLoading = (t, styles) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
	className: (0, __emotion_css.cx)(styles.loadingContainer),
	children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Spinner.default, { size: "medium" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
		variant: "body1",
		color: "textSecondary",
		className: (0, __emotion_css.cx)(styles.loadingText),
		children: t("organization.switcher.loading.placeholder.organizations")
	})]
});
/**
* Default error renderer
*/
const defaultRenderError = (errorMessage, t, styles) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: (0, __emotion_css.cx)(styles.errorContainer),
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Typography.default, {
		variant: "body1",
		color: "error",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: t("organization.switcher.error.prefix") }),
			" ",
			errorMessage
		]
	})
});
/**
* Default load more button renderer
*/
const defaultRenderLoadMore = (onLoadMore, isLoadingMore, t, styles) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
	onClick: onLoadMore,
	disabled: isLoadingMore,
	className: (0, __emotion_css.cx)(styles.loadMoreButton),
	type: "button",
	fullWidth: true,
	children: isLoadingMore ? t("organization.switcher.loading.more") : t("organization.switcher.buttons.load_more.text")
});
/**
* Default empty state renderer
*/
const defaultRenderEmpty = (t, styles) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: (0, __emotion_css.cx)(styles.emptyContainer),
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
		variant: "body1",
		color: "textSecondary",
		className: (0, __emotion_css.cx)(styles.emptyText),
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
	const { theme, colorScheme } = require_useTheme.default();
	const styles = require_BaseOrganizationList_styles.default(theme, colorScheme);
	const { t } = require_useTranslation.default(preferences?.i18n);
	const organizationsWithSwitchAccess = (0, react.useMemo)(() => {
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
		const loadingContent = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, __emotion_css.cx)(styles["root"], className),
			style,
			children: renderLoadingWithStyles()
		});
		if (mode === "popup") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Dialog.default.Content, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default.Heading, { children: title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)(styles["popupContent"]),
				children: loadingContent
			})] })
		});
		return loadingContent;
	}
	if (error && organizationsWithSwitchAccess?.length === 0) {
		const errorContent = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, __emotion_css.cx)(styles["root"], className),
			style,
			children: renderErrorWithStyles(error)
		});
		if (mode === "popup") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Dialog.default.Content, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default.Heading, { children: title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)(styles["popupContent"]),
				children: errorContent
			})] })
		});
		return errorContent;
	}
	if (!isLoading && organizationsWithSwitchAccess?.length === 0) {
		const emptyContent = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, __emotion_css.cx)(styles["root"], className),
			style,
			children: renderEmptyWithStyles()
		});
		if (mode === "popup") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default, {
			open,
			onOpenChange,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Dialog.default.Content, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default.Heading, { children: title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)(styles["popupContent"]),
				children: emptyContent
			})] })
		});
		return emptyContent;
	}
	const organizationListContent = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, __emotion_css.cx)(styles["root"], className),
		style,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: (0, __emotion_css.cx)(styles["header"]),
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, __emotion_css.cx)(styles["headerInfo"]),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Typography.default, {
						variant: "body2",
						color: "textSecondary",
						className: (0, __emotion_css.cx)(styles["subtitle"]),
						children: t("organization.switcher.showing.count", {
							showing: organizationsWithSwitchAccess?.length,
							total: allOrganizations?.organizations?.length || 0
						})
					})
				}), onRefresh && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Button.default, {
					onClick: onRefresh,
					className: (0, __emotion_css.cx)(styles["refreshButton"]),
					type: "button",
					variant: "outline",
					size: "small",
					children: t("organization.switcher.buttons.refresh.text")
				})]
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)(styles["listContainer"]),
				children: organizationsWithSwitchAccess?.map((organization, index) => renderOrganizationWithStyles(organization, index))
			}),
			error && organizationsWithSwitchAccess?.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)(styles["errorMargin"]),
				children: renderErrorWithStyles(error)
			}),
			hasMore && fetchMore && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, __emotion_css.cx)(styles["loadMoreMargin"]),
				children: renderLoadMoreWithStyles(fetchMore, isLoadingMore)
			})
		]
	});
	if (mode === "popup") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(require_Dialog.default.Content, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_Dialog.default.Heading, { children: title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: (0, __emotion_css.cx)(styles["popupContent"]),
			children: organizationListContent
		})] })
	});
	return organizationListContent;
};
var BaseOrganizationList_default = BaseOrganizationList;

//#endregion
exports.BaseOrganizationList = BaseOrganizationList;
exports.default = BaseOrganizationList_default;
//# sourceMappingURL=BaseOrganizationList.cjs.map