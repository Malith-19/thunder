const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../contexts/ThunderID/useThunderID.cjs');
const require_useUser = require('../../../contexts/User/useUser.cjs');
const require_useTranslation = require('../../../hooks/useTranslation.cjs');
const require_BaseUserProfile = require('./BaseUserProfile.cjs');
const require_updateMeProfile = require('../../../api/updateMeProfile.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

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
	const { baseUrl, instanceId } = require_useThunderID.default();
	const { profile, flattenedProfile, schemas, onUpdateProfile } = require_useUser.default();
	const { t } = require_useTranslation.default(preferences?.i18n);
	const [error, setError] = (0, react.useState)(null);
	const handleProfileUpdate = async (payload) => {
		setError(null);
		try {
			onUpdateProfile(await require_updateMeProfile.default({
				baseUrl,
				instanceId,
				payload
			}));
		} catch (caughtError) {
			let message = t("user.profile.update.generic.error");
			if (caughtError instanceof __thunderid_browser.ThunderIDError) message = caughtError?.message;
			setError(message);
		}
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseUserProfile.default, {
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
exports.default = UserProfile_default;
//# sourceMappingURL=UserProfile.cjs.map