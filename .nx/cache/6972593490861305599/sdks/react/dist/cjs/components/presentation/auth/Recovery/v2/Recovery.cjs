const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../../../contexts/ThunderID/useThunderID.cjs');
const require_BaseRecovery = require('./BaseRecovery.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react = require("react");
react = require_rolldown_runtime.__toESM(react);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/Recovery/v2/Recovery.tsx
/**
* Recovery component for ThunderIDV2 that provides an embedded account/password recovery flow.
*
* @example
* ```tsx
* // Default UI
* <Recovery
*   afterRecoveryUrl="/sign-in"
*   onComplete={(response) => console.log('Recovery complete', response)}
*   onError={(error) => console.error('Recovery failed', error)}
* />
*
* // Custom UI with render props
* <Recovery>
*   {({ values, fieldErrors, handleInputChange, handleSubmit, isLoading, components }) => (
*     <form onSubmit={(e) => { e.preventDefault(); handleSubmit(components[0], values); }}>
*       ...
*     </form>
*   )}
* </Recovery>
* ```
*/
const Recovery = ({ className, size = "medium", afterRecoveryUrl, onError, onComplete, tokenUrlParam, children,...rest }) => {
	const { recover, isInitialized, applicationId } = require_useThunderID.default();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseRecovery.default, {
		afterRecoveryUrl,
		onInitialize: (0, react.useCallback)(async (payload) => {
			const urlParams = new URL(window.location.href).searchParams;
			const applicationIdFromUrl = urlParams.get("applicationId");
			const effectiveApplicationId = applicationId ?? applicationIdFromUrl;
			if (tokenUrlParam) {
				const executionId = urlParams.get("executionId");
				const tokenValue = urlParams.get(tokenUrlParam);
				if (executionId && tokenValue) return await recover({
					executionId,
					inputs: { [tokenUrlParam]: tokenValue }
				});
			}
			return await recover(payload ?? {
				flowType: __thunderid_browser.EmbeddedFlowType.Recovery,
				...effectiveApplicationId && { applicationId: effectiveApplicationId }
			});
		}, [
			applicationId,
			tokenUrlParam,
			recover
		]),
		onSubmit: (0, react.useCallback)(async (payload) => await recover(payload), [recover]),
		onError,
		onComplete: (0, react.useCallback)((response) => {
			onComplete?.(response);
			if (afterRecoveryUrl) window.location.href = afterRecoveryUrl;
		}, [onComplete, afterRecoveryUrl]),
		className,
		size,
		isInitialized,
		showTitle: true,
		showSubtitle: true,
		children,
		...rest
	});
};
var Recovery_default = Recovery;

//#endregion
exports.default = Recovery_default;
//# sourceMappingURL=Recovery.cjs.map