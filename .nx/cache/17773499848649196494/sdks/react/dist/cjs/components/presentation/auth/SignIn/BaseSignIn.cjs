const require_rolldown_runtime = require('../../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../../contexts/ThunderID/useThunderID.cjs');
const require_BaseSignIn = require('./v1/BaseSignIn.cjs');
const require_BaseSignIn$1 = require('./v2/BaseSignIn.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/SignIn/BaseSignIn.tsx
const BaseSignIn = (props) => {
	const { platform } = require_useThunderID.default();
	if (platform === __thunderid_browser.Platform.ThunderID) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseSignIn$1.default, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseSignIn.default, { ...props });
};
var BaseSignIn_default$2 = BaseSignIn;

//#endregion
exports.default = BaseSignIn_default$2;
//# sourceMappingURL=BaseSignIn.cjs.map