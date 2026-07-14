import useThunderID_default from "../../../contexts/ThunderID/useThunderID.js";
import ThunderIDProvider_default from "../../../contexts/ThunderID/ThunderIDProvider.js";
import OrganizationContextController_default from "./OrganizationContextController.js";
import { jsx } from "react/jsx-runtime";

//#region src/components/control/OrganizationContext/OrganizationContext.tsx
const OrganizationContext = ({ instanceId, baseUrl, clientId, afterSignInUrl, afterSignOutUrl, targetOrganizationId, sourceInstanceId, scopes, children,...rest }) => {
	const { isSignedIn: isSourceSignedIn, instanceId: sourceInstanceIdFromContext, baseUrl: sourceBaseUrl, clientId: sourceClientId } = useThunderID_default();
	return /* @__PURE__ */ jsx(ThunderIDProvider_default, {
		instanceId,
		baseUrl: baseUrl || sourceBaseUrl,
		clientId: clientId || sourceClientId,
		afterSignInUrl,
		afterSignOutUrl,
		scopes,
		organizationChain: {
			sourceInstanceId: sourceInstanceId || sourceInstanceIdFromContext,
			targetOrganizationId
		},
		...rest,
		children: /* @__PURE__ */ jsx(OrganizationContextController_default, {
			targetOrganizationId,
			isSourceSignedIn,
			children
		})
	});
};
var OrganizationContext_default = OrganizationContext;

//#endregion
export { OrganizationContext_default as default };
//# sourceMappingURL=OrganizationContext.js.map