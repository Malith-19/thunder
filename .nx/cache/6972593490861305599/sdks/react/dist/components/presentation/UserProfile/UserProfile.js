import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import useUser_default from "../../../contexts/User/useUser.js";
import useTranslation_default from "../../../hooks/useTranslation.js";
import BaseUserProfile_default from "./BaseUserProfile.js";
import updateMeProfile_default from "../../../api/updateMeProfile.js";
import { ThunderIDError } from "@thunderid/browser";
import { useState } from "react";
import { jsx } from "react/jsx-runtime";

//#region src/components/presentation/UserProfile/UserProfile.tsx
/**
* UserProfile component displays the authenticated user's profile information in a
* structured and styled format. It shows user details such as display name, email,
* username, and other available profile information from ThunderID.
*
* This component is the React-specific implementation that uses the BaseUserProfile
* and automatically retrieves the user data from ThunderID context if not provided.
*
* @example
* ```tsx
* // Basic usage - will use user from ThunderID context
* <UserProfile />
*
* // With explicit user data
* <UserProfile user={specificUser} />
*
* // With card layout and custom fallback
* <UserProfile
*   cardLayout={true}
*   fallback={<div>Please sign in to view your profile</div>}
* />
*
* // With field filtering - only show specific fields
* <UserProfile
*   showFields={['name.givenName', 'name.familyName', 'emails']}
* />
*
* // With field hiding - hide specific fields
* <UserProfile
*   hideFields={['phoneNumbers', 'addresses']}
* />
* ```
*/
const UserProfile = ({ preferences,...rest }) => {
	const { baseUrl, instanceId } = useThunderID_default();
	const { profile, flattenedProfile, schemas, onUpdateProfile } = useUser_default();
	const { t } = useTranslation_default(preferences?.i18n);
	const [error, setError] = useState(null);
	const handleProfileUpdate = async (payload) => {
		setError(null);
		try {
			onUpdateProfile(await updateMeProfile_default({
				baseUrl,
				instanceId,
				payload
			}));
		} catch (caughtError) {
			let message = t("user.profile.update.generic.error");
			if (caughtError instanceof ThunderIDError) message = caughtError?.message;
			setError(message);
		}
	};
	return /* @__PURE__ */ jsx(BaseUserProfile_default, {
		profile: profile ?? void 0,
		flattenedProfile: flattenedProfile ?? void 0,
		schemas: schemas ?? void 0,
		onUpdate: handleProfileUpdate,
		error,
		preferences,
		...rest
	});
};
var UserProfile_default = UserProfile;

//#endregion
export { UserProfile_default as default };
//# sourceMappingURL=UserProfile.js.map