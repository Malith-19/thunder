const require_rolldown_runtime = require('../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../contexts/ThunderID/useThunderID.cjs');
const require_ThunderIDProvider = require('../../../contexts/ThunderID/ThunderIDProvider.cjs');
const require_OrganizationContextController = require('./OrganizationContextController.cjs');
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/control/OrganizationContext/OrganizationContext.tsx
const OrganizationContext = ({ instanceId, baseUrl, clientId, afterSignInUrl, afterSignOutUrl, targetOrganizationId, sourceInstanceId, scopes, children,...rest }) => {
	const { isSignedIn: isSourceSignedIn, instanceId: sourceInstanceIdFromContext, baseUrl: sourceBaseUrl, clientId: sourceClientId } = require_useThunderID.default();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_ThunderIDProvider.default, {
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_OrganizationContextController.default, {
			targetOrganizationId,
			isSourceSignedIn,
			children
		})
	});
};
var OrganizationContext_default = OrganizationContext;

//#endregion
exports.default = OrganizationContext_default;
//# sourceMappingURL=OrganizationContext.cjs.map