const require_rolldown_runtime = require('../../../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../../../contexts/ThunderID/useThunderID.cjs');
const require_BaseRecovery = require('./BaseRecovery.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/Recovery/v1/Recovery.tsx
/**
* Recovery component for ThunderID V1 that provides an embedded account/password recovery flow.
*/
const Recovery = ({ className, size = "medium", afterRecoveryUrl, onError, onComplete, children,...rest }) => {
	const { recover, isInitialized } = require_useThunderID.default();
	const handleInitialize = async (payload) => {
		return await recover(payload || { flowType: __thunderid_browser.EmbeddedFlowType.Recovery });
	};
	const handleOnSubmit = async (payload) => await recover(payload);
	const handleComplete = (response) => {
		onComplete?.(response);
		if (afterRecoveryUrl) window.location.href = afterRecoveryUrl;
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseRecovery.default, {
		afterRecoveryUrl,
		onInitialize: handleInitialize,
		onSubmit: handleOnSubmit,
		onError,
		onComplete: handleComplete,
		className,
		size,
		isInitialized,
		showLogo: true,
		showTitle: false,
		showSubtitle: false,
		children,
		...rest
	});
};
var Recovery_default = Recovery;

//#endregion
exports.default = Recovery_default;
//# sourceMappingURL=Recovery.cjs.map