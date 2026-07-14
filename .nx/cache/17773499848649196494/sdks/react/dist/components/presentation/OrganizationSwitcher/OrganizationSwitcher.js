import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import useOrganization_default from "../../../contexts/Organization/useOrganization.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import { BaseOrganizationSwitcher } from "./BaseOrganizationSwitcher.js";
import BuildingAlt_default from "../../primitives/Icons/BuildingAlt.js";
import { CreateOrganization } from "../CreateOrganization/CreateOrganization.js";
import OrganizationList_default from "../OrganizationList/OrganizationList.js";
import OrganizationProfile_default from "../OrganizationProfile/OrganizationProfile.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

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
	const { isSignedIn } = useThunderID_default();
	const { currentOrganization: contextCurrentOrganization, myOrganizations: contextOrganizations, switchOrganization, isLoading, error } = useOrganization_default();
	const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isOrganizationListOpen, setIsOrganizationListOpen] = useState(false);
	const { t } = useTranslation_default(preferences?.i18n);
	if (!isSignedIn && fallback) return fallback;
	if (!isSignedIn) return /* @__PURE__ */ jsx(Fragment, {});
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
		icon: /* @__PURE__ */ jsx(BuildingAlt_default, {}),
		label: t("organization.switcher.manage.organizations"),
		onClick: handleManageOrganizations
	});
	defaultMenuItems.push({
		icon: /* @__PURE__ */ jsx("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			children: /* @__PURE__ */ jsx("path", { d: "M12 5v14m-7-7h14" })
		}),
		label: t("organization.switcher.create.organization"),
		onClick: () => setIsCreateOrgOpen(true)
	});
	const menuItems = props.menuItems ? [...defaultMenuItems, ...props.menuItems] : defaultMenuItems;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(BaseOrganizationSwitcher, {
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
		/* @__PURE__ */ jsx(CreateOrganization, {
			mode: "popup",
			open: isCreateOrgOpen,
			onOpenChange: setIsCreateOrgOpen,
			onSuccess: (org) => {
				if (org && onOrganizationSwitch) onOrganizationSwitch(org);
				setIsCreateOrgOpen(false);
			}
		}),
		currentOrganization && /* @__PURE__ */ jsx(OrganizationProfile_default, {
			organizationId: currentOrganization.id,
			mode: "popup",
			open: isProfileOpen,
			onOpenChange: setIsProfileOpen,
			cardLayout: true,
			loadingFallback: /* @__PURE__ */ jsx("div", { children: t("organization.profile.loading") }),
			errorFallback: /* @__PURE__ */ jsx("div", { children: t("organization.profile.error") })
		}),
		/* @__PURE__ */ jsx(OrganizationList_default, {
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
export { OrganizationSwitcher_default as default };
//# sourceMappingURL=OrganizationSwitcher.js.map