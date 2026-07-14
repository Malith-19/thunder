const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../contexts/ThunderID/useThunderID.cjs');
const require_useOrganization = require('../../../contexts/Organization/useOrganization.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_BaseOrganizationSwitcher = require('./BaseOrganizationSwitcher.cjs');
const require_BuildingAlt = require('../../primitives/Icons/BuildingAlt.cjs');
const require_CreateOrganization = require('../CreateOrganization/CreateOrganization.cjs');
const require_OrganizationList = require('../OrganizationList/OrganizationList.cjs');
const require_OrganizationProfile = require('../OrganizationProfile/OrganizationProfile.cjs');
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/OrganizationSwitcher/OrganizationSwitcher.tsx
/**
* OrganizationSwitcher component that provides organization switching functionality.
* This component automatically retrieves organizations from the OrganizationContext.
* You can also override the organizations, currentOrganization, and onOrganizationSwitch
* by passing them as props.
*
* @example
* ```tsx
* import { OrganizationSwitcher } from '@thunderid/react';
*
* // Basic usage - uses OrganizationContext
* <OrganizationSwitcher />
*
* // With custom organization switch handler
* <OrganizationSwitcher
*   onOrganizationSwitch={(org) => {
*     console.log('Switching to:', org.name);
*     // Custom logic here
*   }}
* />
*
* // With fallback for unauthenticated users
* <OrganizationSwitcher
*   fallback={<div>Please sign in to view organizations</div>}
* />
* ```
*/
const OrganizationSwitcher = ({ currentOrganization: propCurrentOrganization, fallback = null, onOrganizationSwitch: propOnOrganizationSwitch, organizations: propOrganizations, preferences,...props }) => {
	const { isSignedIn } = require_useThunderID.default();
	const { currentOrganization: contextCurrentOrganization, myOrganizations: contextOrganizations, switchOrganization, isLoading, error } = require_useOrganization.default();
	const [isCreateOrgOpen, setIsCreateOrgOpen] = (0, react.useState)(false);
	const [isProfileOpen, setIsProfileOpen] = (0, react.useState)(false);
	const [isOrganizationListOpen, setIsOrganizationListOpen] = (0, react.useState)(false);
	const { t } = require_useTranslation.default(preferences?.i18n);
	if (!isSignedIn && fallback) return fallback;
	if (!isSignedIn) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, {});
	const organizations = propOrganizations || contextOrganizations || [];
	const currentOrganization = propCurrentOrganization || contextCurrentOrganization || void 0;
	const onOrganizationSwitch = propOnOrganizationSwitch || switchOrganization;
	const handleManageOrganizations = () => {
		setIsOrganizationListOpen(true);
	};
	const handleManageOrganization = () => {
		setIsProfileOpen(true);
	};
	const defaultMenuItems = [];
	if (currentOrganization) defaultMenuItems.push({
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BuildingAlt.default, {}),
		label: t("organization.switcher.manage.organizations"),
		onClick: handleManageOrganizations
	});
	defaultMenuItems.push({
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M12 5v14m-7-7h14" })
		}),
		label: t("organization.switcher.create.organization"),
		onClick: () => setIsCreateOrgOpen(true)
	});
	const menuItems = props.menuItems ? [...defaultMenuItems, ...props.menuItems] : defaultMenuItems;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseOrganizationSwitcher.BaseOrganizationSwitcher, {
			organizations,
			currentOrganization,
			onOrganizationSwitch,
			loading: isLoading,
			error: error ?? void 0,
			menuItems,
			onManageProfile: handleManageOrganization,
			preferences,
			...props
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_CreateOrganization.CreateOrganization, {
			mode: "popup",
			open: isCreateOrgOpen,
			onOpenChange: setIsCreateOrgOpen,
			onSuccess: (org) => {
				if (org && onOrganizationSwitch) onOrganizationSwitch(org);
				setIsCreateOrgOpen(false);
			}
		}),
		currentOrganization && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationProfile.default, {
			organizationId: currentOrganization.id,
			mode: "popup",
			open: isProfileOpen,
			onOpenChange: setIsProfileOpen,
			cardLayout: true,
			loadingFallback: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: t("organization.profile.loading") }),
			errorFallback: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: t("organization.profile.error") })
		}),
		/* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationList.default, {
			mode: "popup",
			open: isOrganizationListOpen,
			onOpenChange: setIsOrganizationListOpen,
			title: t("organization.switcher.manage.organizations"),
			onOrganizationSelect: (organization) => {
				if (onOrganizationSwitch) onOrganizationSwitch(organization);
				setIsOrganizationListOpen(false);
			}
		})
	] });
};
var OrganizationSwitcher_default = OrganizationSwitcher;

//#endregion
exports.default = OrganizationSwitcher_default;
//# sourceMappingURL=OrganizationSwitcher.cjs.map