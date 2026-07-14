import useThunderID_default from "../../../../../contexts/ThunderID/useThunderID.js";
import BaseInviteUser_default from "./BaseInviteUser.js";
import { EmbeddedFlowType, getOrganizationUnitChildren } from "@thunderid/browser";
import { useCallback } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/auth/InviteUser/v2/InviteUser.tsx
/**
* InviteUser component for initiating invite user flow.
*
* This component is designed for admin users in the thunder-develop app to:
* 1. Select a user type (if multiple available)
* 2. Enter user details (username, email)
* 3. Generate an invite link for the end user
*
* The component uses the authenticated ThunderID SDK context to make API calls
* with the admin's access token (requires 'system' scope).
*
* @example
* ```tsx
* import { InviteUser } from '@thunderid/react';
*
* const InviteUserPage = () => {
*   const [inviteLink, setInviteLink] = useState<string>();
*
*   return (
*     <InviteUser
*       onInviteLinkGenerated={(link, executionId) => setInviteLink(link)}
*       onError={(error) => console.error(error)}
*     >
*       {({ values, components, isLoading, handleInputChange, handleSubmit, inviteLink, isInviteGenerated }) => (
*         <div>
*           {isInviteGenerated ? (
*             <div>
*               <h2>Invite Link Generated!</h2>
*               <p>{inviteLink}</p>
*             </div>
*           ) : (
*             // Render form based on components
*           )}
*         </div>
*       )}
*     </InviteUser>
*   );
* };
* ```
*/
const InviteUser = ({ onError, onFlowChange, className, children, size = "medium", variant = "outlined", showTitle = true, showSubtitle = true }) => {
	const { http, baseUrl, getAccessToken, isInitialized } = useThunderID_default();
	/**
	* Initialize the invite user flow.
	* Makes an authenticated request to /flow/execute with flowType: USER_ONBOARDING.
	*/
	const handleInitialize = async (payload) => {
		return (await http.request({
			data: {
				...payload,
				flowType: EmbeddedFlowType.UserOnboarding,
				verbose: true
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			url: `${baseUrl}/flow/execute`
		})).data;
	};
	/**
	* Submit flow step data.
	* Makes an authenticated request to /flow/execute with the step data.
	*/
	const handleSubmit = async (payload) => {
		return (await http.request({
			data: {
				...payload,
				verbose: true
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			url: `${baseUrl}/flow/execute`
		})).data;
	};
	return /* @__PURE__ */ jsx(BaseInviteUser_default, {
		onInitialize: handleInitialize,
		onSubmit: handleSubmit,
		onError,
		onFlowChange,
		className,
		fetchOrganizationUnitChildren: useCallback(async (parentId, limit, offset) => {
			return getOrganizationUnitChildren({
				baseUrl,
				headers: { Authorization: `Bearer ${await getAccessToken()}` },
				limit,
				offset,
				organizationUnitId: parentId
			});
		}, [baseUrl, getAccessToken]),
		isInitialized,
		size,
		variant,
		showTitle,
		showSubtitle,
		children
	});
};
var InviteUser_default = InviteUser;

//#endregion
export { InviteUser_default as default };
//# sourceMappingURL=InviteUser.js.map