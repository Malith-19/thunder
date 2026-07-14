const require_rolldown_runtime = require('../../../../_virtual/rolldown_runtime.cjs');
const require_useThunderID = require('../../../../contexts/ThunderID/useThunderID.cjs');
const require_BaseSignUp = require('./v1/BaseSignUp.cjs');
const require_BaseSignUp$1 = require('./v2/BaseSignUp.cjs');
let __thunderid_browser = require("@thunderid/browser");
__thunderid_browser = require_rolldown_runtime.__toESM(__thunderid_browser);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = require_rolldown_runtime.__toESM(react_jsx_runtime);

//#region src/components/presentation/auth/SignUp/BaseSignUp.tsx
const BaseSignUp = (props) => {
	const { platform } = require_useThunderID.default();
	if (platform === __thunderid_browser.Platform.ThunderID) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseSignUp$1.default, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(require_BaseSignUp.default, { ...props });
};
var BaseSignUp_default$2 = BaseSignUp;

//#endregion
exports.default = BaseSignUp_default$2;
//# sourceMappingURL=BaseSignUp.cjs.map