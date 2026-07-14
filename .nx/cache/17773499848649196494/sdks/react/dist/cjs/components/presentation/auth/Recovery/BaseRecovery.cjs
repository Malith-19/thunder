const require_rolldown_runtime = require('../../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../../contexts/ThunderID/useThunderID.cjs');
const require_BaseRecovery = require('./v1/BaseRecovery.cjs');
const require_BaseRecovery$1 = require('./v2/BaseRecovery.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/Recovery/BaseRecovery.tsx
const BaseRecovery = (props) => {
	const { platform } = require_useThunderID.default();
	if (platform === __thunderid_browser.Platform.ThunderID) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseRecovery$1.default, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseRecovery.default, { ...props });
};
var BaseRecovery_default$2 = BaseRecovery;

//#endregion
exports.default = BaseRecovery_default$2;
//# sourceMappingURL=BaseRecovery.cjs.map