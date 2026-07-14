import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import UserProfile_default from "../UserProfile/UserProfile.js";
import { BaseUserDropdown } from "./BaseUserDropdown.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

//#region src/components/presentation/UserDropdown/UserDropdown.tsx
/**
* UserDropdown component displays a user avatar with a dropdown menu.
* When clicked, it shows a popover with customizable menu items.
* This component is the React-specific implementation that uses the BaseUserDropdown
* and automatically retrieves the user data from ThunderID context.
*
* Supports render props for complete customization of the dropdown appearance and behavior.
*
* @example
* ```tsx
* // Basic usage - will use user from ThunderID context
* <UserDropdown menuItems={[
*   { label: 'Profile', onClick: () => {} },
*   { label: 'Settings', href: '/settings' },
*   { label: 'Sign Out', onClick: () => {} }
* ]} />
*
* // With custom configuration
* <UserDropdown
*   showTriggerLabel={true}
*   avatarSize={40}
*   fallback={<div>Please sign in</div>}
* />
*
* // Using render props for complete customization
* <UserDropdown>
*   {({ user, isLoading, openProfile, signOut }) => (
*     <div>
*       <button onClick={openProfile}>
*         {user?.name || 'Loading...'}
*       </button>
*       <button onClick={signOut}>Logout</button>
*     </div>
*   )}
* </UserDropdown>
*
* // Using partial render props
* <UserDropdown
*   renderTrigger={({ user, openProfile }) => (
*     <button onClick={openProfile} className="custom-trigger">
*       Welcome, {user?.name}!
*     </button>
*   )}
* />
* ```
*/
const UserDropdown = ({ children, renderTrigger, renderDropdown, onSignOut,...rest }) => {
	const { user, isLoading, signOut, meta } = useThunderID_default();
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const handleManageProfile = () => {
		setIsProfileOpen(true);
	};
	const handleSignOut = () => {
		signOut();
		if (onSignOut) onSignOut();
	};
	const closeProfile = () => {
		setIsProfileOpen(false);
	};
	const renderProps = {
		closeProfile,
		isLoading,
		isProfileOpen,
		meta,
		openProfile: handleManageProfile,
		signOut: handleSignOut,
		user
	};
	if (children) return /* @__PURE__ */ jsxs(Fragment, { children: [children(renderProps), /* @__PURE__ */ jsx(UserProfile_default, {
		mode: "popup",
		open: isProfileOpen,
		onOpenChange: setIsProfileOpen
	})] });
	if (renderTrigger || renderDropdown) return /* @__PURE__ */ jsxs(Fragment, { children: [renderTrigger ? renderTrigger(renderProps) : /* @__PURE__ */ jsx(BaseUserDropdown, {
		user,
		isLoading,
		onManageProfile: handleManageProfile,
		onSignOut: handleSignOut,
		...rest
	}), /* @__PURE__ */ jsx(UserProfile_default, {
		mode: "popup",
		open: isProfileOpen,
		onOpenChange: setIsProfileOpen
	})] });
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(BaseUserDropdown, {
		user,
		isLoading,
		onManageProfile: handleManageProfile,
		onSignOut: handleSignOut,
		...rest
	}), isProfileOpen && /* @__PURE__ */ jsx(UserProfile_default, {
		mode: "popup",
		open: isProfileOpen,
		onOpenChange: setIsProfileOpen
	})] });
};
var UserDropdown_default = UserDropdown;

//#endregion
export { UserDropdown_default as default };
//# sourceMappingURL=UserDropdown.js.map